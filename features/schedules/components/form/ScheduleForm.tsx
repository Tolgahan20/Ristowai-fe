"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Info, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { Label } from '@/components/ui/label';
import { PrimaryButton, OutlineButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { ScheduleFormData } from '../../hooks/use-schedule-management';
import type { ScheduleResponseDto, GenerationGoals } from '../../types';
import type { VenueResponseDto } from '@/features/venues/types';
import styles from './ScheduleForm.module.css';

interface ScheduleFormProps {
  initialData?: ScheduleResponseDto;
  venues: VenueResponseDto[];
  onSubmit: (data: ScheduleFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ScheduleForm({ initialData, venues, onSubmit, onCancel, isLoading = false }: ScheduleFormProps) {
  const [formData, setFormData] = useState<ScheduleFormData>({
    venueId: initialData?.venueId || venues[0]?.id || '',
    name: initialData?.name || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    notes: initialData?.notes || '',
    generationGoals: initialData?.generationGoals || {
      costOptimization: true,
      fairRotation: true,
      respectPhases: true,
      overtimeCapEur: 500,
      maxShiftHours: 13,
      minRestHours: 11,
      minimizeOvertime: true,
      respectPreferences: true,
    },
    lockManagerChoices: initialData?.lockManagerChoices || false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ScheduleFormData, string>>>({});
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const isEditMode = !!initialData;

  // Auto-generate name based on start date
  useEffect(() => {
    if (!isEditMode && formData.startDate && !formData.name) {
      const date = new Date(formData.startDate);
      const weekNumber = getWeekNumber(date);
      const year = date.getFullYear();
      setFormData((prev) => ({ ...prev, name: `Week ${weekNumber} - ${year}` }));
    }
  }, [formData.startDate, formData.name, isEditMode]);

  // Auto-set end date to 6 days after start date (for weekly schedule)
  useEffect(() => {
    if (!isEditMode && formData.startDate && !formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(end.getDate() + 6); // 7 days total (including start day)
      setFormData((prev) => ({ ...prev, endDate: end.toISOString().split('T')[0] }));
    }
  }, [formData.startDate, formData.endDate, isEditMode]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ScheduleFormData, string>> = {};

    if (!formData.venueId) {
      newErrors.venueId = 'Please select a venue';
    }

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Schedule name is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof ScheduleFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGoalChange = (field: keyof GenerationGoals, value: boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      generationGoals: {
        ...prev.generationGoals,
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (field: keyof ScheduleFormData, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }));
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Header */}
            <div className={styles.formHeader}>
              <Heading level={2} className={styles.formTitle}>
                {isEditMode ? 'Edit Schedule' : 'Create New Schedule'}
              </Heading>
              <Body className={styles.formDescription}>
                {isEditMode
                  ? 'Update the schedule details.'
                  : 'Create a new schedule for a specific time period. You can generate shifts automatically after creation.'}
              </Body>
            </div>

            {/* Venue Selection */}
            {!isEditMode && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <Info size={20} className={styles.sectionIcon} />
                  <Heading level={3} className={styles.sectionTitle}>
                    Venue
                  </Heading>
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="venueId">Select Venue *</Label>
                  <Select value={formData.venueId} onValueChange={(value) => handleChange('venueId', value)}>
                    <SelectTrigger id="venueId">
                      <SelectValue placeholder="Select a venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {venues.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.venueId && <Body size="small" className={styles.errorText}>{errors.venueId}</Body>}
                </div>
              </div>
            )}

            {/* Schedule Details */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Calendar size={20} className={styles.sectionIcon} />
                <Heading level={3} className={styles.sectionTitle}>
                  Schedule Details
                </Heading>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="name">Schedule Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g., Week 3 - January 2024"
                  error={errors.name}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.dateRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    error={errors.startDate}
                    disabled={isLoading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    error={errors.endDate}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ''}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Add any notes or special instructions for this schedule..."
                  rows={3}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* AI Generation Settings */}
            <div className={styles.section}>
              <button
                type="button"
                className={styles.advancedToggle}
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              >
                <div className={styles.sectionHeader}>
                  <Settings size={20} className={styles.sectionIcon} />
                  <Heading level={3} className={styles.sectionTitle}>
                    AI Generation Settings
                  </Heading>
                </div>
                {showAdvancedSettings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {showAdvancedSettings && (
                <div className={styles.advancedContent}>
                  <Body size="small" className={styles.sectionDescription}>
                    Configure how the AI generates shifts for this schedule. These settings help optimize for cost, fairness, and compliance.
                  </Body>

                  {/* Boolean Options */}
                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="costOptimization"
                      label="Cost Optimization"
                      description="Minimize labor costs while meeting coverage requirements"
                      checked={formData.generationGoals?.costOptimization ?? true}
                      onCheckedChange={(checked) => handleGoalChange('costOptimization', checked as boolean)}
                      disabled={isLoading}
                    />

                    <Checkbox
                      id="fairRotation"
                      label="Fair Rotation"
                      description="Distribute desirable and undesirable shifts fairly among staff"
                      checked={formData.generationGoals?.fairRotation ?? true}
                      onCheckedChange={(checked) => handleGoalChange('fairRotation', checked as boolean)}
                      disabled={isLoading}
                    />

                    <Checkbox
                      id="respectPhases"
                      label="Respect Work Phases"
                      description="Honor staff work phase preferences (morning, evening, night)"
                      checked={formData.generationGoals?.respectPhases ?? true}
                      onCheckedChange={(checked) => handleGoalChange('respectPhases', checked as boolean)}
                      disabled={isLoading}
                    />

                    <Checkbox
                      id="minimizeOvertime"
                      label="Minimize Overtime"
                      description="Try to avoid overtime hours when possible"
                      checked={formData.generationGoals?.minimizeOvertime ?? true}
                      onCheckedChange={(checked) => handleGoalChange('minimizeOvertime', checked as boolean)}
                      disabled={isLoading}
                    />

                    <Checkbox
                      id="respectPreferences"
                      label="Respect Staff Preferences"
                      description="Consider individual staff scheduling preferences"
                      checked={formData.generationGoals?.respectPreferences ?? true}
                      onCheckedChange={(checked) => handleGoalChange('respectPreferences', checked as boolean)}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Numeric Options */}
                  <div className={styles.numericGroup}>
                    <div className={styles.formGroup}>
                      <Label htmlFor="overtimeCapEur">Overtime Budget Cap (€)</Label>
                      <Input
                        id="overtimeCapEur"
                        type="number"
                        min={0}
                        step={10}
                        value={formData.generationGoals?.overtimeCapEur ?? 500}
                        onChange={(e) => handleGoalChange('overtimeCapEur', parseFloat(e.target.value) || 0)}
                        disabled={isLoading}
                      />
                      <Body size="small" className={styles.fieldDescription}>
                        Maximum overtime cost allowed for this schedule period
                      </Body>
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="maxShiftHours">Maximum Shift Hours</Label>
                      <Input
                        id="maxShiftHours"
                        type="number"
                        min={1}
                        max={24}
                        step={0.5}
                        value={formData.generationGoals?.maxShiftHours ?? 13}
                        onChange={(e) => handleGoalChange('maxShiftHours', parseFloat(e.target.value) || 13)}
                        disabled={isLoading}
                      />
                      <Body size="small" className={styles.fieldDescription}>
                        Maximum duration for a single shift (hours)
                      </Body>
                    </div>

                    <div className={styles.formGroup}>
                      <Label htmlFor="minRestHours">Minimum Rest Hours</Label>
                      <Input
                        id="minRestHours"
                        type="number"
                        min={8}
                        max={24}
                        step={0.5}
                        value={formData.generationGoals?.minRestHours ?? 11}
                        onChange={(e) => handleGoalChange('minRestHours', parseFloat(e.target.value) || 11)}
                        disabled={isLoading}
                      />
                      <Body size="small" className={styles.fieldDescription}>
                        Minimum rest time required between shifts (hours)
                      </Body>
                    </div>
                  </div>

                  {/* Lock Manager Choices */}
                  <Checkbox
                    id="lockManagerChoices"
                    label="Lock Manual Changes"
                    description="Prevent AI from modifying shifts you manually create or edit"
                    checked={formData.lockManagerChoices ?? false}
                    onCheckedChange={(checked) => handleCheckboxChange('lockManagerChoices', checked as boolean)}
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              <OutlineButton type="button" onClick={onCancel} disabled={isLoading}>
                Cancel
              </OutlineButton>
              <PrimaryButton type="submit" disabled={isLoading} isLoading={isLoading}>
                {isEditMode ? 'Update Schedule' : 'Create Schedule'}
              </PrimaryButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to get week number
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

