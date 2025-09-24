"use client";

import { useEffect } from 'react';
import { Plus, Trash2, UserPlus, Mail, Phone, Info } from 'lucide-react';
import { useStaffInvitation } from '@/features/onboarding/hooks/use-staff-invitation';
import { useActiveRolesByVenue } from '@/features/staff/hooks/use-roles';
import { 
  PrimaryButton, 
  IconButton, 
  Input, 
  EnhancedSelect, 
  Label, 
  Heading, 
  Body, 
  Caption,
  Card,
  CardContent
} from '@/components/ui';
import styles from './StaffInvitationStep.module.css';

interface StaffInvitationStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function StaffInvitationStep({ stepData, onDataChange }: StaffInvitationStepProps) {
  const {
    formData,
    roles,
    addStaffMember,
    removeStaffMember,
    updateStaffMember,
    getValidStaffCount,
    hasErrors,
    getFieldError,
  } = useStaffInvitation({
    initialData: stepData,
    onDataChange,
  });

  // Get venueId from stepData
  const venueId = (stepData.venueId as string) || '';
  
  // Get roles from the venue (these should have been created in the previous step)
  const { data: venueRoles = [] } = useActiveRolesByVenue(venueId);
  
  // Use roles from the hook first (from previous step), fallback to venue roles from API
  const availableRoles = roles.length > 0 ? roles : venueRoles;
  
  // Roles are loading correctly

  // Pass current staff data to parent when staff data changes
  useEffect(() => {
    const validStaffMembers = formData.staffMembers.filter(member => 
      member.firstName?.trim() && 
      member.lastName?.trim() && 
      member.email?.trim() && 
      member.whatsappNumber?.trim() && 
      member.roleId && 
      member.contractType
    );
    
    // Always pass the current staff data, even if empty (backend handles optional staff)
    const dataToSend = {
      venueId: venueId || stepData.venueId, // Use venueId from either source
      staffMembers: formData.staffMembers,
      readyToCreateStaff: validStaffMembers.length > 0,
    };
    
    console.log('🔍 Frontend sending staff data:', dataToSend);
    onDataChange(dataToSend);
  }, [formData.staffMembers, venueId, stepData.venueId, onDataChange]);

  // Don't automatically update parent on every render - only when staff data actually changes


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Header */}
        <div className={styles.section}>
          <div className={styles.header}>
            <div className={styles.headerIcon}>
              <UserPlus size={20} />
            </div>
            <div className={styles.headerContent}>
              <Heading level={2}>Invite Staff Members</Heading>
              <Body>
                Add your team members and assign them to the roles you created. You can skip this step and add staff later.
              </Body>
            </div>
          </div>
          
          {/* Guidance Message */}
          <div className={styles.guidanceBanner}>
            <div className={styles.guidanceIcon}>
              <Info size={16} />
            </div>
            <div className={styles.guidanceContent}>
              <Body size="small" className={styles.guidanceTitle}>
                <strong>Need management access?</strong>
              </Body>
              <Body size="small" className={styles.guidanceText}>
                Staff added here work shifts and receive schedules. For <strong>management access</strong> 
                (reports, schedules, invitations), visit <strong>Members</strong> after onboarding.
              </Body>
            </div>
          </div>
        </div>

        {/* Roles Summary */}
        {availableRoles.length > 0 && (
          <div className={styles.section}>
            <Heading level={3}>Available Roles</Heading>
            <Card className={styles.rolesCard}>
              <CardContent>
                <div className={styles.rolesList}>
                  {availableRoles.map((role, index) => (
                    <div key={role.id || index} className={styles.roleChip}>
                      <span className={styles.roleName}>{role.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Staff Members Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Heading level={3}>Team Members</Heading>
            <PrimaryButton onClick={addStaffMember} leftIcon={<Plus size={16} />} size="sm">
              Add Staff Member
            </PrimaryButton>
          </div>

          <div className={styles.staffList}>
            {formData.staffMembers.map((member, index) => (
              <div key={index} className={`${styles.staffCard} ${hasErrors(index) ? styles.staffCardError : ''}`}>
                <div className={styles.staffCardHeader}>
                  <Caption>Staff Member {index + 1}</Caption>
                  {formData.staffMembers.length > 1 && (
                    <IconButton
                      onClick={() => removeStaffMember(index)}
                      variant="destructive"
                      title="Remove staff member"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  )}
                </div>

                <div className={styles.staffForm}>
                  <div className={styles.nameRow}>
                    <div className={styles.inputGroup}>
                      <Label required>First Name</Label>
                      <Input
                        type="text"
                        value={member.firstName}
                        onChange={(e) => updateStaffMember(index, 'firstName', e.target.value)}
                        error={getFieldError(index, 'firstName')}
                        placeholder="Mario"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <Label required>Last Name</Label>
                      <Input
                        type="text"
                        value={member.lastName}
                        onChange={(e) => updateStaffMember(index, 'lastName', e.target.value)}
                        error={getFieldError(index, 'lastName')}
                        placeholder="Rossi"
                      />
                    </div>
                  </div>

                  <div className={styles.contactRow}>
                    <div className={styles.inputGroup}>
                      <Label required icon={<Mail size={16} />}>Email Address</Label>
                      <Input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateStaffMember(index, 'email', e.target.value)}
                        error={getFieldError(index, 'email')}
                        placeholder="mario.rossi@example.com"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <Label icon={<Phone size={16} />}>Phone Number</Label>
                      <Input
                        type="tel"
                        value={member.phone || ''}
                        onChange={(e) => updateStaffMember(index, 'phone', e.target.value)}
                        placeholder="+39 333 123 4567"
                      />
                    </div>
                  </div>

                  <div className={styles.contactRow}>
                    <div className={styles.inputGroup}>
                      <Label required icon={<Phone size={16} />}>WhatsApp Number</Label>
                      <Input
                        type="tel"
                        value={member.whatsappNumber || ''}
                        onChange={(e) => updateStaffMember(index, 'whatsappNumber', e.target.value)}
                        error={getFieldError(index, 'whatsappNumber')}
                        placeholder="+39 333 123 4567"
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <Label required>Contract Type</Label>
                      <EnhancedSelect
                        value={member.contractType || ''}
                        onValueChange={(value: string) => updateStaffMember(index, 'contractType', value)}
                        error={getFieldError(index, 'contractType')}
                        placeholder="Select contract type..."
                        options={[
                          { value: 'full_time', label: 'Full Time' },
                          { value: 'part_time', label: 'Part Time' },
                          { value: 'temporary', label: 'Temporary' },
                          { value: 'freelance', label: 'Freelance' }
                        ]}
                      />
                    </div>
                  </div>

                  <div className={styles.contactRow}>
                    <div className={styles.inputGroup}>
                      <Label required>Weekly Contract Hours</Label>
                      <Input
                        type="number"
                        min="1"
                        max="60"
                        value={member.weeklyContractHours || ''}
                        onChange={(e) => updateStaffMember(index, 'weeklyContractHours', parseInt(e.target.value) || 0)}
                        error={getFieldError(index, 'weeklyContractHours')}
                        placeholder="40"
                      />
                    </div>
                  </div>

                  <div className={styles.roleRow}>
                    <div className={styles.inputGroup}>
                      <Label required>Assigned Role</Label>
                      <EnhancedSelect
                        value={member.roleId}
                        onValueChange={(value: string) => updateStaffMember(index, 'roleId', value)}
                        error={getFieldError(index, 'roleId')}
                        placeholder="Select a role..."
                        options={availableRoles.map((role) => ({
                          value: role.id,
                          label: role.name
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={styles.section}>
          <Heading level={3}>Summary</Heading>
          <div className={styles.summaryStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{getValidStaffCount()}</span>
              <span className={styles.statLabel}>Staff Members</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{availableRoles.length}</span>
              <span className={styles.statLabel}>Available Roles</span>
            </div>
          </div>
          
          {venueId && availableRoles.length > 0 && getValidStaffCount() > 0 && (
            <Caption color="success" className={styles.readyMessage}>
              ✅ Ready to invite {getValidStaffCount()} staff member(s) to this venue
            </Caption>
          )}
          
          {!venueId && (
            <Caption color="warning" className={styles.warningMessage}>
              ⚠️ Venue ID not found - staff will be created after venue setup
            </Caption>
          )}
          
          {venueId && availableRoles.length === 0 && (
            <Caption color="warning" className={styles.warningMessage}>
              ⚠️ No roles available - please create roles first
            </Caption>
          )}
        </div>

      </form>
    </div>
  );
}
