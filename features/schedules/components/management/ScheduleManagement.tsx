"use client";

import React from 'react';
import { Settings, Calendar } from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { PrimaryButton } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOnboarding } from '@/features/onboarding/hooks/use-onboarding';
import { useScheduleManagement } from '../../hooks/use-schedule-management';
import { ScheduleList } from '../list';
import { ScheduleForm } from '../form';
import { ScheduleDetails } from '../details';
import styles from './ScheduleManagement.module.css';

export function ScheduleManagement() {
  const {
    mode,
    selectedSchedule,
    restaurant,
    venues,
    selectedVenue,
    isLoading,
    handleCreateSchedule,
    handleEditSchedule,
    handleViewSchedule,
    handleCancel,
    handleVenueChange,
    handleFormSubmit,
    handleDeleteSchedule,
    handlePublishSchedule,
    handleGenerateSchedule,
  } = useScheduleManagement();

  // Check onboarding status
  const { onboardingStatus, resumeOrStart } = useOnboarding();
  const needsOnboarding = onboardingStatus?.needsOnboarding ?? false;
  const hasActiveSession = onboardingStatus?.hasActiveSession ?? false;

  // Show onboarding incomplete state
  if (needsOnboarding) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.onboardingState}>
            <div className={styles.onboardingIcon}>
              <Settings size={48} />
            </div>
            <Heading level={2}>Complete Your Setup</Heading>
            <Body className={styles.onboardingDescription}>
              Before you can manage schedules, you need to complete your restaurant setup. This includes venues, roles,
              and staff configuration.
            </Body>

            <div className={styles.onboardingActions}>
              <PrimaryButton onClick={() => resumeOrStart()} leftIcon={<Settings size={16} />} isLoading={false}>
                {hasActiveSession ? 'Resume Setup' : 'Start Setup'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyState}>
            <Calendar size={48} className={styles.emptyIcon} />
            <Heading level={2}>No Restaurant Found</Heading>
            <Body className={styles.emptyDescription}>
              You need to have a restaurant set up before managing schedules.
            </Body>
          </div>
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyState}>
            <Calendar size={48} className={styles.emptyIcon} />
            <Heading level={2}>No Venues Found</Heading>
            <Body className={styles.emptyDescription}>
              You need to create at least one venue before managing schedules.
            </Body>
            <PrimaryButton onClick={() => (window.location.href = '/dashboard/venues')}>Go to Venues</PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <Heading level={1} className={styles.title}>
              {mode === 'create'
                ? 'Create Schedule'
                : mode === 'edit'
                ? 'Edit Schedule'
                : mode === 'details'
                ? 'Schedule Details'
                : 'Schedule Management'}
            </Heading>
            <Body className={styles.subtitle}>
              {mode === 'create'
                ? 'Create a new schedule for your venue'
                : mode === 'edit'
                ? 'Update schedule information'
                : mode === 'details'
                ? 'View and manage schedule details'
                : `Manage schedules for ${restaurant.name}`}
            </Body>
          </div>

          {/* Venue Selector (only in list mode) */}
          {mode === 'list' && venues.length > 1 && (
            <div className={styles.venueSelector}>
              <Select value={selectedVenue?.id} onValueChange={handleVenueChange}>
                <SelectTrigger className={styles.venueSelectorTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {venues.map((venue) => (
                    <SelectItem key={venue.id} value={venue.id}>
                      {venue.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Content based on mode */}
        {mode === 'list' ? (
          <ScheduleList
            venueId={selectedVenue.id}
            onCreateSchedule={handleCreateSchedule}
            onEditSchedule={handleEditSchedule}
            onViewSchedule={handleViewSchedule}
            onDeleteSchedule={handleDeleteSchedule}
            onPublishSchedule={handlePublishSchedule}
            onGenerateSchedule={handleGenerateSchedule}
          />
        ) : mode === 'create' || mode === 'edit' ? (
          <ScheduleForm
            initialData={mode === 'edit' ? selectedSchedule : undefined}
            venues={venues}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        ) : mode === 'details' && selectedSchedule ? (
          <ScheduleDetails
            schedule={selectedSchedule}
            venues={venues}
            onEdit={handleFormSubmit}
            onBack={handleCancel}
            onPublish={() => handlePublishSchedule(selectedSchedule.id)}
            onGenerate={() => handleGenerateSchedule(selectedSchedule.id)}
            onDelete={() => handleDeleteSchedule(selectedSchedule.id)}
            isLoading={isLoading}
          />
        ) : null}
      </div>
    </div>
  );
}

