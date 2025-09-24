"use client";

import React from 'react';
import { Settings, Users, Building2 } from 'lucide-react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { PrimaryButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboarding } from '@/features/onboarding/hooks/use-onboarding';
import styles from './StaffManagement.module.css';
import { useStaffManagement } from '../../hooks/use-staff-management';
import { VenueSelector } from '../shared/VenueSelector';
import { StaffList } from '../list/StaffList';
import { StaffDetails } from '../details/StaffDetails';
import { StaffForm } from '../form';

export function StaffManagement() {
  const {
    // State
    mode,
    selectedVenueId,
    selectedStaff,
    isLoading,
    
    // Handlers
    handleVenueSelect,
    handleCreateStaff,
    handleEditStaff,
    handleViewStaff,
    handleEditFromDetails,
    handleFormSubmit,
    handleCancel,
  } = useStaffManagement();

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
              Before you can manage staff members, you need to complete your restaurant setup. 
              This includes creating venues, roles, and configuring your business settings.
            </Body>
            
            <Caption className={styles.onboardingNote}>
              💡 <strong>What you&apos;ll set up:</strong> Restaurant details, venue information, staff roles, 
              and business configuration. This usually takes about 10-15 minutes.
            </Caption>
            
            <Card className={styles.onboardingCard}>
              <CardContent>
                <div className={styles.onboardingSteps}>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>
                      <Users size={20} />
                    </div>
                    <div className={styles.stepContent}>
                      <Body size="small" className={styles.stepTitle}>Create Venues & Roles</Body>
                      <Caption>Set up your restaurant locations and staff positions</Caption>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className={styles.onboardingActions}>
              <PrimaryButton 
                onClick={() => resumeOrStart()}
                leftIcon={<Settings size={16} />}
                isLoading={false}
              >
                {hasActiveSession ? 'Resume Setup' : 'Start Setup'}
              </PrimaryButton>
            </div>
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
              {mode === 'create' ? 'Add Staff Member' : 
               mode === 'edit' ? 'Edit Staff Member' : 
               mode === 'details' ? 'Staff Member Details' : 
               'Staff Management'}
            </Heading>
            <Body className={styles.subtitle}>
              {mode === 'create' ? 'Add a new team member to your staff' :
               mode === 'edit' ? 'Update staff member information' :
               mode === 'details' ? 'View and manage staff member details' :
               selectedVenueId 
                ? `Managing staff for ${selectedVenueId}` 
                : 'Select a venue to manage staff'}
            </Body>
          </div>
          
          {selectedVenueId && (
            <VenueSelector
              selectedVenueId={selectedVenueId || null}
              onVenueSelect={handleVenueSelect}
            />
          )}
        </div>

        {/* Content based on mode */}
        {!selectedVenueId ? (
          <div className={styles.venueSelection}>
            <div className={styles.venueSelectionCard}>
              <div className={styles.venueSelectionContent}>
                <div className={styles.venueSelectionIcon}>
                  <Building2 size={32} />
                </div>
                <Heading level={2} className={styles.venueSelectionTitle}>Select a Venue</Heading>
                <Body className={styles.venueSelectionDescription}>
                  Choose a venue to manage your staff members and start building your team.
                </Body>
                <div className={styles.venueSelectionSelector}>
                  <VenueSelector
                    selectedVenueId={selectedVenueId || null}
                    onVenueSelect={handleVenueSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : mode === 'list' ? (
          <StaffList
            venueId={selectedVenueId}
            onCreateStaff={handleCreateStaff}
            onEditStaff={handleEditStaff}
            onViewStaff={handleViewStaff}
          />
        ) : mode === 'create' || mode === 'edit' ? (
          <StaffForm
            venueId={selectedVenueId}
            editData={mode === 'edit' ? selectedStaff : undefined}
            onSubmit={(formData) => {
              // Convert preferredStartTime and preferredEndTime to string if needed
              const converted = {
                ...formData,
                availabilityPreferences: formData.availabilityPreferences
                  ? {
                      ...formData.availabilityPreferences,
                      preferredStartTime: formData.availabilityPreferences.preferredStartTime !== undefined
                        ? String(formData.availabilityPreferences.preferredStartTime)
                        : undefined,
                      preferredEndTime: formData.availabilityPreferences.preferredEndTime !== undefined
                        ? String(formData.availabilityPreferences.preferredEndTime)
                        : undefined,
                    }
                  : undefined,
              };
              handleFormSubmit(converted);
            }}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        ) : mode === 'details' && selectedStaff ? (
          <StaffDetails
            staff={selectedStaff}
            onEdit={handleEditFromDetails}
            onBack={handleCancel}
          />
        ) : null}
      </div>
    </div>
  );
}
