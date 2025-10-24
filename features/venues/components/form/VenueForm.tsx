"use client";

import React from 'react';
import { Info, MapPin, Clock, Globe } from 'lucide-react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { Label } from '@/components/ui/label';
import { PrimaryButton, OutlineButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressAutocomplete } from '@/components/ui/address-autocomplete';
import { useVenueForm } from '../../hooks/use-venue-form';
import type { VenueFormData } from '../../hooks/use-venue-management';
import styles from './VenueForm.module.css';

interface VenueFormProps {
  initialData?: VenueFormData;
  onSubmit: (data: VenueFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const SECTORS = [
  'Coffee Bar',
  'Trattoria',
  'Pizzeria',
  'Ristorante',
  'Osteria',
  'Bistrot',
  'Fast Food',
  'Fine Dining',
  'Pub',
  'Other'
];

const TIMEZONES = [
  'Europe/Rome',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Madrid',
  'America/New_York',
  'America/Los_Angeles',
];

export function VenueForm({ initialData, onSubmit, onCancel, isLoading = false }: VenueFormProps) {
  const {
    formData,
    errors,
    isValid,
    handleChange,
    handleAddressChange,
    handleSwitchChange,
    handleSelectChange,
    handleSubmit,
  } = useVenueForm({
    initialData,
    onSubmit,
  });

  const isEditMode = !!initialData;

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <CardContent className={styles.cardContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Header */}
            <div className={styles.formHeader}>
              <Heading level={2} className={styles.formTitle}>
                {isEditMode ? 'Edit Venue' : 'Create New Venue'}
              </Heading>
              <Body className={styles.formDescription}>
                {isEditMode ? 'Update the details for your venue.' : 'Fill in the details to create a new venue.'}
              </Body>
            </div>

            {/* Basic Information */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Info size={20} className={styles.sectionIcon} />
                <Heading level={3} className={styles.sectionTitle}>Basic Information</Heading>
              </div>
              
              <div className={styles.formGroup}>
                <Label htmlFor="name">Venue Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Downtown Branch"
                  error={errors.name}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="sector">Business Type</Label>
                <Select
                  value={formData.sector || ''}
                  onValueChange={(value) => handleSelectChange('sector', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTORS.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="timezone">Timezone *</Label>
                <Select
                  value={formData.timezone}
                  onValueChange={(value) => handleSelectChange('timezone', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIMEZONES.map((tz) => (
                      <SelectItem key={tz} value={tz}>
                        {tz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.timezone && <Caption className={styles.errorText}>{errors.timezone}</Caption>}
              </div>

              <div className={styles.formGroup}>
                <div className={styles.switchContainer}>
                  <Label htmlFor="isActive">Active Status</Label>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
                    disabled={isLoading}
                  />
                </div>
                <Caption className={styles.switchCaption}>
                  {formData.isActive ? 'Venue is active and visible.' : 'Venue is inactive and hidden.'}
                </Caption>
              </div>
            </div>

            {/* Address & Contact */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <MapPin size={20} className={styles.sectionIcon} />
                <Heading level={3} className={styles.sectionTitle}>Address & Contact</Heading>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="address">Address</Label>
                <AddressAutocomplete
                  value={formData.address || ''}
                  onChange={handleAddressChange}
                  placeholder="Start typing address..."
                  error={!!errors.address}
                  disabled={isLoading}
                />
                {errors.address && <Caption className={styles.errorText}>{errors.address}</Caption>}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="e.g., +39 123 456 7890"
                  error={errors.phone}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  placeholder="e.g., info@venue.com"
                  error={errors.email}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Operating Hours */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Clock size={20} className={styles.sectionIcon} />
                <Heading level={3} className={styles.sectionTitle}>Operating Hours</Heading>
              </div>
              <Caption className={styles.sectionDescription}>
                Set the typical daily operating hours for this venue.
              </Caption>

              <div className={styles.timeInputsRow}>
                <div className={styles.formGroup}>
                  <Label htmlFor="openingTime">Opening Time *</Label>
                  <Input
                    id="openingTime"
                    name="openingTime"
                    type="time"
                    value={formData.openingTime}
                    onChange={handleChange}
                    error={errors.openingTime}
                    disabled={isLoading}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Label htmlFor="closingTime">Closing Time *</Label>
                  <Input
                    id="closingTime"
                    name="closingTime"
                    type="time"
                    value={formData.closingTime}
                    onChange={handleChange}
                    error={errors.closingTime}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <Globe size={20} className={styles.sectionIcon} />
                <Heading level={3} className={styles.sectionTitle}>Additional Settings</Heading>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="managerHourlyValue">Manager Hourly Value (€)</Label>
                <Input
                  id="managerHourlyValue"
                  name="managerHourlyValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.managerHourlyValue || ''}
                  onChange={handleChange}
                  placeholder="e.g., 25.00"
                  error={errors.managerHourlyValue}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="weeklySchedulingHours">Weekly Scheduling Hours</Label>
                <Input
                  id="weeklySchedulingHours"
                  name="weeklySchedulingHours"
                  type="number"
                  step="1"
                  min="0"
                  value={formData.weeklySchedulingHours || ''}
                  onChange={handleChange}
                  placeholder="e.g., 40"
                  error={errors.weeklySchedulingHours}
                  disabled={isLoading}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="typicalOvertimeCost">Typical Overtime Cost Multiplier</Label>
                <Input
                  id="typicalOvertimeCost"
                  name="typicalOvertimeCost"
                  type="number"
                  step="0.1"
                  min="1"
                  value={formData.typicalOvertimeCost || ''}
                  onChange={handleChange}
                  placeholder="e.g., 1.5"
                  error={errors.typicalOvertimeCost}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles.formActions}>
              <OutlineButton
                type="button"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </OutlineButton>
              <PrimaryButton
                type="submit"
                disabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                {isEditMode ? 'Update Venue' : 'Create Venue'}
              </PrimaryButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
