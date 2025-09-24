"use client";

import React from 'react';
import { ArrowLeft, Settings, Users } from 'lucide-react';
import { Title, Subtitle, Heading, Body, Caption } from '@/components/ui/typography';
import { IconButton, PrimaryButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboarding } from '@/features/onboarding/hooks/use-onboarding';
import styles from './MemberManagement.module.css';
import { useMemberManagement } from '../../hooks/use-member-management';
// Single restaurant - no selector needed
import { MemberList } from '../list/MemberList';
import { MemberDetails } from '../details/MemberDetails';
import { MemberInviteForm } from '../forms/MemberInviteForm';
import { MemberEditForm } from '../forms/MemberEditForm';

interface MemberManagementProps {
  defaultRestaurantId?: string;
}

export function MemberManagement({ defaultRestaurantId }: MemberManagementProps) {
  const {
    // State
    mode,
    restaurantId,
    selectedMember,
    isLoading,
    // restaurant, // Not used in single restaurant setup

    // Loading states
    authLoading,

    // Handlers
    handleInviteMember,
    handleEditMember,
    handleViewMember,
    handleEditFromDetails,
    handleInviteSubmit,
    handleEditSubmit,
    handleCancel,
    handleBack,
  } = useMemberManagement({ defaultRestaurantId });

  // Check onboarding status
  const { onboardingStatus, resumeOrStart } = useOnboarding();
  const needsOnboarding = onboardingStatus?.needsOnboarding ?? false;
  const hasActiveSession = onboardingStatus?.hasActiveSession ?? false;

  // Show loading while authentication is loading
  if (authLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <Heading level={3}>Loading...</Heading>
            <Body>Getting your team information...</Body>
          </div>
        </div>
      </div>
    );
  }

  // Show onboarding incomplete state
  if (!authLoading && needsOnboarding) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.onboardingState}>
            <div className={styles.onboardingIcon}>
              <Settings size={48} />
            </div>
            <Heading level={2}>Complete Your Setup</Heading>
            <Body className={styles.onboardingDescription}>
              Before you can manage team members, you need to complete your restaurant setup. 
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

  // Show error state if no restaurant found after auth is loaded
  if (!authLoading && !restaurantId) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.errorState}>
            <Heading level={3}>Restaurant Not Found</Heading>
            <Body>Unable to find your restaurant information. Please contact support if this issue persists.</Body>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Dynamic Header based on mode */}
        <div className={styles.header}>
          {mode !== 'list' && (
            <IconButton 
              variant="ghost" 
              onClick={handleCancel} 
              className={styles.backButton}
              title="Back to Team"
            >
              <ArrowLeft className={styles.backIcon} />
            </IconButton>
          )}
          <div className={styles.headerInfo}>
            <Title weight="bold" className={styles.title}>
              {mode === 'invite' && 'Invite Team Member'}
              {mode === 'edit' && 'Edit Team Member'}
              {mode === 'details' && 'Team Member Details'}
              {mode === 'list' && 'Team Management'}
            </Title>
            <Subtitle className={styles.subtitle}>
              {mode === 'invite' && 'Add a new team member and assign venue access'}
              {mode === 'edit' && 'Update member information and permissions'}
              {mode === 'details' && 'View team member information and access'}
              {mode === 'list' && 'Manage team members and assign venue access'}
            </Subtitle>
          </div>
        </div>

        {/* Content based on mode */}
        {mode === 'list' ? (
          <MemberList
            restaurantId={restaurantId}
            onInviteMember={handleInviteMember}
            onEditMember={handleEditMember}
            onViewMember={handleViewMember}
          />
        ) : mode === 'invite' ? (
          <MemberInviteForm
            restaurantId={restaurantId}
            onSubmit={handleInviteSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        ) : mode === 'edit' && selectedMember ? (
          <MemberEditForm
            restaurantId={restaurantId!}
            member={selectedMember}
            onSuccess={handleEditSubmit}
            onCancel={handleCancel}
          />
        ) : mode === 'details' && selectedMember ? (
          <MemberDetails
            member={selectedMember}
            restaurantId={restaurantId!}
            onEdit={handleEditFromDetails}
            onBack={handleBack}
          />
        ) : null}
      </div>
    </div>
  );
}
