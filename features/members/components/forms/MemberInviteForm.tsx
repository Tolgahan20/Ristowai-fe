"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedSelect } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Building2, 
  CheckSquare, 
  Square,
  Send,
  Users,
  UserPlus,
  Clock,
  Lightbulb
} from 'lucide-react';
import styles from './MemberInviteForm.module.css';
import { useActiveVenuesByRestaurant } from '@/features/venues/hooks/use-venues';
import { useStaffByVenue } from '@/features/staff/hooks/use-staff';
import { useInviteMember } from '../../hooks/use-members';
import { memberInviteSchema, getDefaultPermissions } from '../../constants';
import { RestaurantRole, MemberInviteFormData } from '../../types';

interface MemberInviteFormProps {
  restaurantId: string | null;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function MemberInviteForm({ restaurantId, onSubmit, onCancel }: MemberInviteFormProps) {
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [inviteType, setInviteType] = useState<'new' | 'existing'>('new');
  // Fixed role as MANAGER - only managers can be invited
  const fixedRole = RestaurantRole.MANAGER;

  const { data: venues = [] } = useActiveVenuesByRestaurant(restaurantId || '');
  
  // Get staff from the first venue for now (we can expand this later)
  const firstVenueId = venues.length > 0 ? venues[0].id : '';
  const { data: staffFromVenue = [] } = useStaffByVenue(firstVenueId);
  
  // For now, just use staff from one venue - we can enhance this to aggregate from all venues
  const allStaff = staffFromVenue;
  
  const inviteMutation = useInviteMember();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<MemberInviteFormData>({
    resolver: zodResolver(memberInviteSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      role: RestaurantRole.MANAGER,
      venueAccess: [],
      permissions: getDefaultPermissions(RestaurantRole.MANAGER),
      message: '',
      inviteType: 'new',
      selectedStaffId: ''
    }
  });

  // We can use these later if needed for advanced functionality
  // const watchedInviteType = watch('inviteType');
  // const watchedSelectedStaffId = watch('selectedStaffId');

  // Auto-populate form when staff is selected
  const handleStaffSelection = (staffId: string) => {
    const selectedStaff = allStaff.find(staff => staff.id === staffId);
    if (selectedStaff) {
      setValue('selectedStaffId', staffId);
      setValue('firstName', selectedStaff.firstName);
      setValue('lastName', selectedStaff.lastName);
      setValue('email', selectedStaff.email);
    }
  };

  // Handle invite type change
  const handleInviteTypeChange = (type: 'new' | 'existing') => {
    setInviteType(type);
    setValue('inviteType', type);
    
    if (type === 'new') {
      // Clear staff selection and form
      setValue('selectedStaffId', '');
      setValue('firstName', '');
      setValue('lastName', '');
      setValue('email', '');
    }
  };

  const handleVenueToggle = (venueId: string) => {
    const newSelection = selectedVenues.includes(venueId)
      ? selectedVenues.filter(id => id !== venueId)
      : [...selectedVenues, venueId];
    
    setSelectedVenues(newSelection);
    setValue('venueAccess', newSelection);
  };

  const handleSelectAllVenues = () => {
    const allVenueIds = venues.map(v => v.id);
    setSelectedVenues(allVenueIds);
    setValue('venueAccess', allVenueIds);
  };

  const handleClearVenues = () => {
    setSelectedVenues([]);
    setValue('venueAccess', []);
  };

  const onFormSubmit = async (data: MemberInviteFormData) => {
    if (!restaurantId) return;

    try {
      await inviteMutation.mutateAsync({
        restaurantId,
        inviteData: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          role: fixedRole, // Always use MANAGER role
          venueAccess: data.venueAccess,
          permissions: getDefaultPermissions(fixedRole),
          message: data.message
        }
      });
      onSubmit();
    } catch (error) {
      console.error('Failed to invite member:', error);
      // Error is handled by the mutation hook
    }
  };

  if (!restaurantId) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <Building2 className={styles.errorIcon} />
          <Heading level={3}>Restaurant Not Selected</Heading>
          <Body>Cannot invite members without a selected restaurant.</Body>
          <SecondaryButton onClick={onCancel} className={styles.cancelButton}>
            Back to List
          </SecondaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
          <div className={styles.formSections}>
            {/* Basic Information */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <User className={styles.sectionIcon} />
                <Heading level={2} weight="semibold" className={styles.sectionTitle}>Basic Information</Heading>
              </div>

              {/* Invite Type Toggle */}
              <div className={styles.inviteTypeSection}>
                <div className={styles.inviteTypeButtons}>
                  <PrimaryButton
                    type="button"
                    onClick={() => handleInviteTypeChange('new')}
                    leftIcon={<UserPlus className="w-4 h-4" />}
                    className={`${styles.inviteTypeButton} ${inviteType === 'new' ? styles.inviteTypeButtonActive : styles.inviteTypeButtonInactive}`}
                  >
                    Create New Person
                  </PrimaryButton>
                  <PrimaryButton
                    type="button"
                    onClick={() => handleInviteTypeChange('existing')}
                    leftIcon={<Users className="w-4 h-4" />}
                    className={`${styles.inviteTypeButton} ${inviteType === 'existing' ? styles.inviteTypeButtonActive : styles.inviteTypeButtonInactive}`}
                  >
                    Select Existing Staff
                  </PrimaryButton>
                </div>
              </div>

              {/* Staff Selection (when existing is selected) */}
              {inviteType === 'existing' && (
                <div className={styles.staffSelectionContainer}>
                <div className={styles.field}>
                  <Label icon={<Users className="w-4 h-4" />}>
                    Select Staff Member
                  </Label>
                    <EnhancedSelect
                      value={watch('selectedStaffId') || ''}
                      onValueChange={handleStaffSelection}
                      placeholder="Choose a staff member..."
                      options={allStaff.map(staff => ({
                        value: staff.id,
                        label: `${staff.firstName} ${staff.lastName} - ${staff.email}`,
                        icon: <User className="w-4 h-4" />
                      }))}
                      error={errors.selectedStaffId?.message}
                    />
                    
                    {/* Helpful note about staff promotion */}
                    <div className={styles.staffPromotionNote}>
                      <Lightbulb className={styles.noteIcon} />
                      <Body className={styles.noteText}>
                        <strong>Promoting existing staff:</strong> This will give the selected staff member 
                        management access to your venues. They&apos;ll receive an email with login credentials 
                        and can manage schedules, reports, and other staff.
                      </Body>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <Input
                    {...register('firstName')}
                    label="First Name"
                    type="text"
                    placeholder="First name"
                    readOnly={inviteType === 'existing'}
                    error={errors.firstName?.message}
                  />
                </div>

                <div className={styles.field}>
                  <Input
                    {...register('lastName')}
                    label="Last Name"
                    type="text"
                    placeholder="Last name"
                    readOnly={inviteType === 'existing'}
                    error={errors.lastName?.message}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>

                <div className={styles.field}>
                  <Input
                    {...register('email')}
                    label="Email Address"
                    type="email"
                    placeholder="manager@restaurant.com"
                    readOnly={inviteType === 'existing'}
                    error={errors.email?.message}
                  />
                </div>

                <div className={styles.field}>
                  <Label className={styles.roleLabel}>
                    Role
                  </Label>
                  <div className={styles.roleDisplay}>
                    <div className={styles.roleInfo}>
                      <div className={styles.roleName}>Store Manager</div>
                      <div className={styles.roleDescription}>
                        Can manage staff, schedules, and operations for assigned venues
                      </div>
                    </div>
                  </div>
                  <Caption className={styles.roleNote}>
                    All invited team members will be assigned as Store Managers with venue-specific access.
                  </Caption>
                </div>
              </div>
            </div>

            {/* Venue Access */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <Building2 className={styles.sectionIcon} />
                <Heading level={2} weight="semibold" className={styles.sectionTitle}>Venue Access</Heading>
                <div className={styles.venueActions}>
                  <button
                    type="button"
                    onClick={handleSelectAllVenues}
                    className={styles.venueActionButton}
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleClearVenues}
                    className={styles.venueActionButton}
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className={styles.venueList}>
                {venues.map((venue) => (
                  <div
                    key={venue.id}
                    onClick={() => handleVenueToggle(venue.id)}
                    className={`${styles.venueItem} ${
                      selectedVenues.includes(venue.id) ? styles.venueItemSelected : ''
                    }`}
                  >
                    <div className={styles.venueCheckbox}>
                      {selectedVenues.includes(venue.id) ? (
                        <CheckSquare className={styles.checkboxChecked} />
                      ) : (
                        <Square className={styles.checkboxUnchecked} />
                      )}
                    </div>
                    <div className={styles.venueInfo}>
                      <div className={styles.venueName}>{venue.name}</div>
                      <div className={styles.venueAddress}>{venue.address}</div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.venueAccess && (
                <span className={styles.errorText}>{errors.venueAccess.message}</span>
              )}
            </div>

            {/* Optional Message */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <Mail className={styles.sectionIcon} />
                <Heading level={2} weight="semibold" className={styles.sectionTitle}>Welcome Message (Optional)</Heading>
              </div>

              <div className={styles.field}>
                <Textarea
                  {...register('message')}
                  label="Welcome Message"
                  placeholder="Welcome to our team! We're excited to have you..."
                  size="sm"
                  rows={3}
                  className={styles.minimalTextarea}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.formActions}>
            <SecondaryButton
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={inviteMutation.isPending}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              type="submit"
              className={styles.submitButton}
              disabled={inviteMutation.isPending || selectedVenues.length === 0}
              leftIcon={inviteMutation.isPending ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            >
              {inviteMutation.isPending ? 'Sending Invitation...' : 'Send Invitation'}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}