"use client";

import React from 'react';
import { ArrowLeft, Calendar, Clock, Edit, FileText, Settings, PlayCircle, Archive, Trash2, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { PrimaryButton, OutlineButton, DestructiveButton, GhostButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ScheduleResponseDto, GenerationGoals } from '../../types';
import type { VenueResponseDto } from '@/features/venues/types';
import { ScheduleStatus } from '../../types';
import type { ScheduleFormData } from '../../hooks/use-schedule-management';
import styles from './ScheduleDetails.module.css';

interface ScheduleDetailsProps {
  schedule: ScheduleResponseDto;
  venues: VenueResponseDto[];
  onEdit: (data: ScheduleFormData) => void;
  onBack: () => void;
  onPublish: () => void;
  onGenerate: () => void;
  onDelete: () => void;
  isLoading?: boolean;
}

export function ScheduleDetails({ schedule, onEdit, onBack, onPublish, onGenerate, onDelete, isLoading = false }: ScheduleDetailsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showEditDialog, setShowEditDialog] = React.useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = React.useState(false);
  
  // Edit form state
  const [editFormData, setEditFormData] = React.useState<ScheduleFormData>({
    venueId: schedule.venueId,
    name: schedule.name,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    notes: schedule.notes,
    generationGoals: schedule.generationGoals,
    lockManagerChoices: schedule.lockManagerChoices,
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editFormData);
    setShowEditDialog(false);
  };

  const handleGoalChange = (field: keyof GenerationGoals, value: number) => {
    setEditFormData(prev => ({
      ...prev,
      generationGoals: {
        ...prev.generationGoals,
        [field]: value,
      },
    }));
  };

  const handleCheckboxChange = (field: keyof GenerationGoals | 'lockManagerChoices', checked: boolean) => {
    if (field === 'lockManagerChoices') {
      setEditFormData(prev => ({
        ...prev,
        lockManagerChoices: checked,
      }));
    } else {
      setEditFormData(prev => ({
        ...prev,
        generationGoals: {
          ...prev.generationGoals,
          [field]: checked,
        },
      }));
    }
  };

  const statusVariant = {
    [ScheduleStatus.DRAFT]: 'secondary',
    [ScheduleStatus.PUBLISHED]: 'success',
    [ScheduleStatus.ARCHIVED]: 'outline',
  } as const;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDuration = () => {
    const start = new Date(schedule.startDate);
    const end = new Date(schedule.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <OutlineButton
          onClick={onBack}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back to List
        </OutlineButton>

        <div className={styles.headerActions}>
          {schedule.status === ScheduleStatus.DRAFT && (
            <>
              <PrimaryButton
                onClick={onGenerate}
                leftIcon={<PlayCircle size={16} />}
              >
                Generate Shifts
              </PrimaryButton>
              <OutlineButton
                onClick={onPublish}
                leftIcon={<Archive size={16} />}
              >
                Publish
              </OutlineButton>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Basic Info Card */}
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.scheduleHeader}>
              <div className={styles.scheduleIcon}>
                <Calendar size={32} />
              </div>
              <div className={styles.scheduleTitle}>
                <Heading level={2} className={styles.scheduleName}>{schedule.name}</Heading>
                <Body size="small" className={styles.scheduleMeta}>
                  {formatDate(schedule.startDate)} - {formatDate(schedule.endDate)} · {getDuration()}
                </Body>
              </div>
              <div className={styles.scheduleHeaderActions}>
                <Badge variant={statusVariant[schedule.status]}>
                  {schedule.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <GhostButton className={styles.menuButton}>
                      <MoreVertical size={20} />
                    </GhostButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                      <Edit size={16} />
                      Edit Schedule
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className={styles.deleteItem}>
                      <Trash2 size={16} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className={styles.infoGrid}>
              {/* Notes */}
              {schedule.notes && (
                <div className={styles.infoSection} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.infoHeader}>
                    <FileText size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Notes</Body>
                  </div>
                  <Body className={styles.infoValue}>{schedule.notes}</Body>
                </div>
              )}
              {/* Period */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <Clock size={18} className={styles.icon} />
                  <Body size="small" className={styles.infoLabel}>Schedule Period</Body>
                </div>
                <Body className={styles.infoValue}>
                  {formatDate(schedule.startDate)}
                </Body>
                <Body className={styles.infoValue}>
                  to {formatDate(schedule.endDate)}
                </Body>
              </div>

              {/* Version */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <FileText size={18} className={styles.icon} />
                  <Body size="small" className={styles.infoLabel}>Version</Body>
                </div>
                <Body className={styles.infoValue}>Version {schedule.version}</Body>
              </div>

              {/* Last Generated */}
              {schedule.lastGeneratedAt && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <PlayCircle size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Last Generated</Body>
                  </div>
                  <Body className={styles.infoValue}>
                    {formatDateTime(schedule.lastGeneratedAt)}
                  </Body>
                </div>
              )}

              {/* Published */}
              {schedule.publishedAt && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <Archive size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Published</Body>
                  </div>
                  <Body className={styles.infoValue}>
                    {formatDateTime(schedule.publishedAt)}
                  </Body>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Generation Settings Card */}
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <Settings size={24} />
              <Heading level={3}>AI Generation Settings</Heading>
            </div>

            <div className={styles.goalsGrid}>
              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Cost Optimization</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.costOptimization ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Fair Rotation</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.fairRotation ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Respect Work Phases</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.respectPhases ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Minimize Overtime</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.minimizeOvertime ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Respect Staff Preferences</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.respectPreferences ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Overtime Budget Cap</Body>
                <Body className={styles.goalValue}>
                  €{schedule.generationGoals?.overtimeCapEur ?? 500}
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Max Shift Hours</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.maxShiftHours ?? 13}h
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Min Rest Hours</Body>
                <Body className={styles.goalValue}>
                  {schedule.generationGoals?.minRestHours ?? 11}h
                </Body>
              </div>

              <div className={styles.goalItem}>
                <Body size="small" className={styles.goalLabel}>Lock Manual Changes</Body>
                <Body className={styles.goalValue}>
                  {schedule.lockManagerChoices ? '✓ Enabled' : '✗ Disabled'}
                </Body>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generation Summary Card */}
        {schedule.generationSummary && (
          <Card className={styles.card}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <PlayCircle size={24} />
                <Heading level={3}>Generation Summary</Heading>
              </div>

              <div className={styles.summaryGrid}>
                <div className={styles.summaryItem}>
                  <Body size="large" className={styles.summaryValue}>{schedule.generationSummary.shifts}</Body>
                  <Body size="small" className={styles.summaryLabel}>Total Shifts</Body>
                </div>

                <div className={styles.summaryItem}>
                  <Body size="large" className={styles.summaryValue}>
                    {(schedule.generationSummary.phaseFillRate * 100).toFixed(0)}%
                  </Body>
                  <Body size="small" className={styles.summaryLabel}>Phase Fill Rate</Body>
                </div>

                <div className={styles.summaryItem}>
                  <Body size="large" className={styles.summaryValue}>{schedule.generationSummary.hardViolations}</Body>
                  <Body size="small" className={styles.summaryLabel}>Hard Violations</Body>
                </div>

                <div className={styles.summaryItem}>
                  <Body size="large" className={styles.summaryValue}>{schedule.generationSummary.softViolations}</Body>
                  <Body size="small" className={styles.summaryLabel}>Soft Violations</Body>
                </div>

                {schedule.generationSummary.totalCostEur !== undefined && (
                  <div className={styles.summaryItem}>
                    <Body size="large" className={styles.summaryValue}>
                      €{schedule.generationSummary.totalCostEur.toFixed(2)}
                    </Body>
                    <Body size="small" className={styles.summaryLabel}>Total Cost</Body>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className={styles.editDialog}>
          <DialogHeader>
            <DialogTitle>Edit Schedule</DialogTitle>
            <DialogDescription>Update the schedule details.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <div className={styles.formSection}>
              <Heading level={4} className={styles.sectionTitle}>
                <Calendar size={20} />
                Schedule Details
              </Heading>

              <div className={styles.formField}>
                <Label htmlFor="edit-name">Schedule Name *</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <Label htmlFor="edit-startDate">Start Date *</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={editFormData.startDate}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <Label htmlFor="edit-endDate">End Date *</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={editFormData.endDate}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className={styles.formField}>
                <Label htmlFor="edit-notes">Notes (Optional)</Label>
                <Textarea
                  id="edit-notes"
                  value={editFormData.notes || ''}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes or special instructions for this schedule..."
                  rows={3}
                />
              </div>
            </div>

            {/* AI Generation Settings */}
            <div className={styles.formSection}>
              <button
                type="button"
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className={styles.advancedToggle}
              >
                <Settings size={20} />
                <Heading level={4}>AI Generation Settings</Heading>
                {showAdvancedSettings ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {showAdvancedSettings && (
                <div className={styles.advancedContent}>
                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="edit-costOptimization"
                      checked={editFormData.generationGoals?.costOptimization ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('costOptimization', checked as boolean)}
                      label="Cost Optimization"
                      description="Prioritize schedules that minimize labor costs"
                    />

                    <Checkbox
                      id="edit-fairRotation"
                      checked={editFormData.generationGoals?.fairRotation ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('fairRotation', checked as boolean)}
                      label="Fair Rotation"
                      description="Distribute shifts evenly among staff"
                    />

                    <Checkbox
                      id="edit-respectPhases"
                      checked={editFormData.generationGoals?.respectPhases ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('respectPhases', checked as boolean)}
                      label="Respect Work Phases"
                      description="Ensure shifts align with defined work phases"
                    />

                    <Checkbox
                      id="edit-minimizeOvertime"
                      checked={editFormData.generationGoals?.minimizeOvertime ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('minimizeOvertime', checked as boolean)}
                      label="Minimize Overtime"
                      description="Reduce overtime hours where possible"
                    />

                    <Checkbox
                      id="edit-respectPreferences"
                      checked={editFormData.generationGoals?.respectPreferences ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('respectPreferences', checked as boolean)}
                      label="Respect Staff Preferences"
                      description="Consider staff availability and preferences"
                    />

                    <Checkbox
                      id="edit-lockManagerChoices"
                      checked={editFormData.lockManagerChoices ?? false}
                      onCheckedChange={(checked) => handleCheckboxChange('lockManagerChoices', checked as boolean)}
                      label="Lock Manual Changes"
                      description="Prevent AI from modifying manually assigned shifts"
                    />
                  </div>

                  <div className={styles.numericGroup}>
                    <div className={styles.formField}>
                      <Label htmlFor="edit-overtimeCapEur">Overtime Budget Cap (€)</Label>
                      <Input
                        id="edit-overtimeCapEur"
                        type="number"
                        min="0"
                        value={editFormData.generationGoals?.overtimeCapEur ?? 500}
                        onChange={(e) => handleGoalChange('overtimeCapEur', Number(e.target.value))}
                      />
                    </div>

                    <div className={styles.formField}>
                      <Label htmlFor="edit-maxShiftHours">Max Shift Hours</Label>
                      <Input
                        id="edit-maxShiftHours"
                        type="number"
                        min="1"
                        max="24"
                        value={editFormData.generationGoals?.maxShiftHours ?? 13}
                        onChange={(e) => handleGoalChange('maxShiftHours', Number(e.target.value))}
                      />
                    </div>

                    <div className={styles.formField}>
                      <Label htmlFor="edit-minRestHours">Min Rest Hours</Label>
                      <Input
                        id="edit-minRestHours"
                        type="number"
                        min="8"
                        max="24"
                        value={editFormData.generationGoals?.minRestHours ?? 11}
                        onChange={(e) => handleGoalChange('minRestHours', Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.dialogActions}>
              <OutlineButton type="button" onClick={() => setShowEditDialog(false)}>
                Cancel
              </OutlineButton>
              <PrimaryButton type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Schedule'}
              </PrimaryButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Schedule</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{schedule.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className={styles.dialogActions}>
            <OutlineButton onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </OutlineButton>
            <DestructiveButton
              onClick={() => {
                onDelete();
                setShowDeleteDialog(false);
              }}
            >
              Delete Schedule
            </DestructiveButton>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

