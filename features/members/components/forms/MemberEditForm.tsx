"use client";

import React from 'react';
import {
  ArrowLeft,
  Save,
  X,
  Shield,
  Building2,
  Check,
  Clock,
  Mail,
  User,
  Settings
} from 'lucide-react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { PrimaryButton, SecondaryButton, IconButton } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';
import styles from './MemberEditForm.module.css';
import { RestaurantMemberResponseDto } from '../../types';
import { useMemberEdit } from '../../hooks/use-member-edit';

interface MemberEditFormProps {
  member: RestaurantMemberResponseDto;
  restaurantId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function MemberEditForm({ member, restaurantId, onSuccess, onCancel }: MemberEditFormProps) {
  const {
    // Form
    form,
    errors,
    isDirty,
    isSubmitting,
    
    // Data
    venues,
    venuesLoading,
    watchedRole,
    watchedVenueAccess,
    
    // Handlers
    handleSubmit,
    handleCancel,
    handleVenueToggle,
    handleSelectAllVenues,
    handleClearAllVenues,
    handlePermissionChange,
    
    // Utility functions
    getMemberName,
    getVenueName,
    getPermissionLabel,
    getPermissionDescription,
    
    // Constants
    roleOptions,
  } = useMemberEdit({ member, restaurantId, onSuccess, onCancel });

  const { register, watch } = form;
  const watchedPermissions = watch('permissions') || {};

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Header */}
        <div className={styles.header}>
          <IconButton
            type="button"
            onClick={handleCancel}
            variant="ghost"
            className={styles.backButton}
            title="Back to Details"
          >
            <ArrowLeft className={styles.backIcon} />
          </IconButton>
        </div>

        {/* Member Info */}
        <div className={styles.memberInfo}>
          <div className={styles.memberAvatar}>
            {member.user?.avatarUrl ? (
              <img 
                src={member.user.avatarUrl} 
                alt={getMemberName()} 
                className={styles.avatarImage} 
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <User className={styles.avatarIcon} />
              </div>
            )}
          </div>
          <div className={styles.memberDetails}>
            <Heading level={1} className={styles.memberName}>{getMemberName()}</Heading>
            <div className={styles.memberEmail}>
              <Mail className={styles.emailIcon} />
              {member.user?.email || 'No email'}
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div className={styles.formSections}>
          {/* Role Selection */}
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <Shield className={styles.sectionIcon} />
              <Heading level={3} weight="semibold" className={styles.sectionTitle}>Role & Responsibilities</Heading>
            </div>
            
            <div className={styles.roleOptions}>
              {roleOptions.map((option) => (
                <label key={option.value} className={styles.roleOption}>
                  <input
                    type="radio"
                    value={option.value}
                    {...register('role')}
                    className={styles.roleRadio}
                  />
                  <div className={`${styles.roleCard} ${
                    watchedRole === option.value ? styles.roleCardSelected : ''
                  }`}>
                    <div className={styles.roleCardHeader}>
                      <div className={styles.roleRadioCustom}>
                        {watchedRole === option.value && <Check className={styles.checkIcon} />}
                      </div>
                      <div className={styles.roleInfo}>
                        <Heading level={4} weight="medium" className={styles.roleName}>{option.label}</Heading>
                        <Body size="small" className={styles.roleDescription}>{option.description}</Body>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {errors.role && (
              <Caption color="destructive" className={styles.errorMessage}>{errors.role.message}</Caption>
            )}
          </div>

          {/* Venue Access */}
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <Building2 className={styles.sectionIcon} />
              <Heading level={3} weight="semibold" className={styles.sectionTitle}>Venue Access</Heading>
              <div className={styles.venueActions}>
                <button
                  type="button"
                  onClick={handleSelectAllVenues}
                  className={styles.venueActionButton}
                  disabled={venuesLoading}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearAllVenues}
                  className={styles.venueActionButton}
                  disabled={venuesLoading}
                >
                  Clear All
                </button>
              </div>
            </div>

            {venuesLoading ? (
              <div className={styles.loadingState}>
                <Clock className={styles.loadingIcon} />
                <p>Loading venues...</p>
              </div>
            ) : (
              <div className={styles.venuesList}>
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    className={`${styles.venueItem} ${
                      watchedVenueAccess?.includes(venue.id) ? styles.venueItemSelected : ''
                    }`}
                    onClick={() => handleVenueToggle(venue.id)}
                  >
                    <div className={styles.venueCheckbox}>
                      <div className={`${styles.checkbox} ${
                        watchedVenueAccess?.includes(venue.id) ? styles.checkboxChecked : styles.checkboxUnchecked
                      }`}>
                        {watchedVenueAccess?.includes(venue.id) && (
                          <Check className={styles.checkboxIcon} />
                        )}
                      </div>
                    </div>
                    <div className={styles.venueInfo}>
                      <h4 className={styles.venueName}>{venue.name}</h4>
                      <p className={styles.venueAddress}>{venue.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {errors.venueAccess && (
              <p className={styles.errorMessage}>{errors.venueAccess.message}</p>
            )}
          </div>

          {/* Permissions */}
          <div className={styles.formSection}>
            <div className={styles.sectionHeader}>
              <Settings className={styles.sectionIcon} />
              <Heading level={3} weight="semibold" className={styles.sectionTitle}>Permissions</Heading>
            </div>
            
            <div className={styles.permissionsList}>
              {Object.entries(watchedPermissions).map(([key, value]) => (
                <div key={key} className={styles.permissionItem}>
                  <div className={styles.permissionInfo}>
                    <div className={styles.permissionHeader}>
                      <Heading level={4} weight="medium" className={styles.permissionName}>
                        {getPermissionLabel(key)}
                      </Heading>
                      <div className={styles.permissionToggle}>
                        <input
                          type="checkbox"
                          checked={Boolean(value)}
                          onChange={(e) => handlePermissionChange(key, e.target.checked)}
                          className={styles.permissionCheckbox}
                        />
                        <div className={`${styles.toggle} ${value ? styles.toggleOn : styles.toggleOff}`}>
                          <div className={styles.toggleSlider} />
                        </div>
                      </div>
                    </div>
                    <Body size="small" className={styles.permissionDescription}>
                      {getPermissionDescription(key)}
                    </Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <SecondaryButton
            type="button"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isSubmitting}
          >
            <X className={styles.buttonIcon} />
            Cancel
          </SecondaryButton>
          <PrimaryButton
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isDirty}
          >
            <Save className={styles.buttonIcon} />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}