"use client";

import React, { useMemo } from 'react';
import { Settings, Building2 } from 'lucide-react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { PrimaryButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboarding } from '@/features/onboarding/hooks/use-onboarding';
import { useVenueManagement, type VenueFormData } from '../../hooks/use-venue-management';
import { minutesToTime } from '../../types';
import { VenueList } from '../list/VenueList';
import { VenueForm } from '../form/VenueForm';
import { VenueDetails } from '../details/VenueDetails';
import styles from './VenueManagement.module.css';

export function VenueManagement() {
  const {
    // State
    mode,
    selectedVenue,
    restaurant,
    restaurantId,
    isLoading,
    
    // Handlers
    handleCreateVenue,
    handleEditVenue,
    handleViewVenue,
    handleCancel,
    handleEditFromDetails,
    handleFormSubmit,
    handleDeleteVenue,
    handleToggleActive,
  } = useVenueManagement();

  // Check onboarding status
  const { onboardingStatus, resumeOrStart } = useOnboarding();
  const needsOnboarding = onboardingStatus?.needsOnboarding ?? false;
  const hasActiveSession = onboardingStatus?.hasActiveSession ?? false;

  // Convert venue data to form data when editing
  const formInitialData = useMemo((): VenueFormData | undefined => {
    if (mode === 'edit' && selectedVenue) {
      return {
        name: selectedVenue.name,
        timezone: selectedVenue.timezone,
        address: selectedVenue.address,
        phone: selectedVenue.phone,
        email: selectedVenue.email,
        openingTime: minutesToTime(selectedVenue.openingMinute),
        closingTime: minutesToTime(selectedVenue.closingMinute),
        sector: selectedVenue.sector,
        managerHourlyValue: selectedVenue.managerHourlyValue,
        weeklySchedulingHours: selectedVenue.weeklySchedulingHours,
        typicalOvertimeCost: selectedVenue.typicalOvertimeCost,
        isActive: selectedVenue.isActive,
      };
    }
    return undefined;
  }, [mode, selectedVenue]);

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
              Before you can manage venues, you need to complete your restaurant setup. 
              This includes restaurant details, roles, and business configuration.
            </Body>
            
            <Caption className={styles.onboardingNote}>
              💡 <strong>What you&apos;ll set up:</strong> Restaurant details, venues, staff roles, 
              and business configuration. This usually takes about 10-15 minutes.
            </Caption>
            
            <Card className={styles.onboardingCard}>
              <CardContent>
                <div className={styles.onboardingSteps}>
                  <div className={styles.step}>
                    <div className={styles.stepIcon}>
                      <Building2 size={20} />
                    </div>
                    <div className={styles.stepContent}>
                      <Body size="small" className={styles.stepTitle}>Create Venues & Configure Settings</Body>
                      <Caption>Set up your restaurant locations and operational details</Caption>
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

  // Show loading or no restaurant state
  if (!restaurant) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Building2 size={48} />
            </div>
            <Heading level={2}>No Restaurant Found</Heading>
            <Body className={styles.emptyDescription}>
              You need to have a restaurant set up before managing venues.
            </Body>
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
              {mode === 'create' ? 'Add New Venue' : 
               mode === 'edit' ? 'Edit Venue' : 
               mode === 'details' ? 'Venue Details' : 
               'Venue Management'}
            </Heading>
            <Body className={styles.subtitle}>
              {mode === 'create' ? 'Add a new location for your restaurant' :
               mode === 'edit' ? 'Update venue information' :
               mode === 'details' ? 'View and manage venue details' :
               `Manage all locations for ${restaurant.name}`}
            </Body>
          </div>
        </div>

        {/* Content based on mode */}
        {mode === 'list' ? (
          <VenueList
            restaurantId={restaurantId}
            onCreateVenue={handleCreateVenue}
            onEditVenue={handleEditVenue}
            onViewVenue={handleViewVenue}
            onDeleteVenue={handleDeleteVenue}
            onToggleActive={handleToggleActive}
          />
        ) : mode === 'create' || mode === 'edit' ? (
          <VenueForm
            initialData={formInitialData}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        ) : mode === 'details' && selectedVenue ? (
          <VenueDetails
            venue={selectedVenue}
            onEdit={handleEditFromDetails}
            onBack={handleCancel}
          />
        ) : null}
      </div>
    </div>
  );
}

