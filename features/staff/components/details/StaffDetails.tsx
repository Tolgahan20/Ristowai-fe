"use client";

import React from 'react';
import styles from './StaffDetails.module.css';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  UserCheck,
  Edit,
  ArrowLeft,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Save,
  X
} from 'lucide-react';
import { Button, PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading, Body } from '@/components/ui/typography';
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter, AlertDialog } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useStaffDetails } from '../../hooks/use-staff-details';
import { getContractTypeLabel, minutesToTimeString, getInitials, getDayName } from '../../utils';
import type { StaffResponseDto } from '../../types';

interface StaffDetailsProps {
  staff: StaffResponseDto | null | undefined;
  onEdit: () => void;
  onBack: () => void;
}

export function StaffDetails({ staff, onEdit, onBack }: StaffDetailsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  
  const {
    isEditingOvertime,
    overtimeHours,
    setOvertimeHours,
    updateOvertimeMutation,
    handleToggleActive,
    handleDelete,
    handleSaveOvertime,
    startEditingOvertime,
    cancelEditingOvertime,
  } = useStaffDetails(staff);

  // Safety check - don't render if staff data is incomplete
  if (!staff || !staff.id) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingItem}></div>
          <div className={styles.loadingItemShort}></div>
          <div className={styles.loadingItemTall}></div>
        </div>
      </div>
    );
  }

  const availabilityPrefs = staff.availabilityPreferences || {};

  return (
    <div className={styles.container}>
      {/* Header */}
      <Card className={styles.headerCard}>
        <CardContent className={styles.headerContent}>
          <Button variant="ghost" size="sm" onClick={onBack} className={styles.backButton}>
            <ArrowLeft size={16} />
          </Button>
          
          <div className={styles.headerCenter}>
            <div className={styles.headerLeft}>
              <div className={`${styles.avatar} ${
                staff.isActive ? styles.avatarActive : styles.avatarInactive
              }`}>
                {getInitials(staff.fullName)}
              </div>
              
              <div className={styles.headerInfo}>
                <Heading level={1} className={styles.name}>{staff.fullName}</Heading>
                <div className={styles.badgeContainer}>
                  <div className={styles.badgeContract}>
                    {staff.contractType ? getContractTypeLabel(staff.contractType) : 'No contract type'}
                  </div>
                  {!staff.isActive && (
                    <div className={styles.badgeInactive}>Inactive</div>
                  )}
                  {staff.isMinor && (
                    <div className={styles.badgeMinor}>Minor</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <PrimaryButton onClick={onEdit} leftIcon={<Edit size={16} />}>
              Edit
            </PrimaryButton>
            <SecondaryButton onClick={handleToggleActive} leftIcon={
              staff.isActive ? <ToggleLeft size={16} /> : <ToggleRight size={16} />
            }>
              {staff.isActive ? 'Deactivate' : 'Activate'}
            </SecondaryButton>
          </div>
        </CardContent>
      </Card>

      <div className={styles.grid}>
        {/* Row 1: Personal Information & Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <User className={styles.cardIcon} />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.infoItem}>
              <Mail className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Email</Body>
                <Body className={styles.infoValue}>{staff.email}</Body>
              </div>
            </div>
            
            {staff.phone && (
              <div className={styles.infoItem}>
                <Phone className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <Body className={styles.infoLabel}>Phone</Body>
                  <Body className={styles.infoValue}>{staff.phone}</Body>
                </div>
              </div>
            )}
            
            <div className={styles.infoItem}>
              <Phone className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>WhatsApp Number</Body>
                <Body className={styles.infoValue}>{staff.whatsappNumber}</Body>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <Calendar className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Hire Date</Body>
                <Body className={styles.infoValue}>{staff.hireDate ? new Date(staff.hireDate).toLocaleDateString() : 'Not set'}</Body>
              </div>
            </div>
            
            {staff.endDate && (
              <div className={styles.infoItem}>
                <Calendar className={styles.infoIcon} />
                <div className={styles.infoContent}>
                  <Body className={styles.infoLabel}>Contract End Date</Body>
                  <Body className={styles.infoValue}>{new Date(staff.endDate).toLocaleDateString()}</Body>
                </div>
              </div>
            )}
            
            {staff.isMinor && (
              <div className={styles.warningBox}>
                <Body className={styles.warningText}>
                  ⚠️ This person is a minor. Special labor law restrictions apply.
                </Body>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <UserCheck className={styles.cardIcon} />
              Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Role</Body>
                <Body className={styles.infoValue}>{staff.primaryRoleName}</Body>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Contract Type</Body>
                <Body className={styles.infoValue}>{staff.contractType ? getContractTypeLabel(staff.contractType) : 'Not set'}</Body>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Weekly Hours</Body>
                <Body className={styles.infoValue}>{staff.weeklyContractHours}h/week</Body>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <Body className={styles.infoLabel}>Status</Body>
                <Body className={styles.infoValue}>{staff.isActive ? 'Active' : 'Inactive'}</Body>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Row 2: Overtime Management & Availability Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <Clock className={styles.cardIcon} />
              Overtime Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.overtimeGrid}>
              <div className={styles.overtimeItem}>
                <Body className={styles.overtimeLabel}>Annual Limit</Body>
                <Body className={`${styles.overtimeValue} ${styles.overtimeLimit}`}>
                  {staff.annualOvertimeLimit || 0}h
                </Body>
              </div>
              <div className={styles.overtimeItem}>
                <Body className={styles.overtimeLabel}>Remaining</Body>
                <Body className={`${styles.overtimeValue} ${styles.overtimeRemaining}`}>
                  {staff.remainingOvertimeHours || 0}h
                </Body>
              </div>
            </div>
            
            <div className={styles.overtimeManagement}>
              <div className={styles.overtimeHeader}>
                <Body className={styles.overtimeLabel}>Annual Overtime Limit</Body>
                <div className={styles.overtimeActions}>
                  {isEditingOvertime ? (
                    <>
                      <Button 
                        size="sm"
                        onClick={handleSaveOvertime}
                        disabled={updateOvertimeMutation.isPending}
                        leftIcon={<Save size={16} />}
                      >
                        Save
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={cancelEditingOvertime}
                        leftIcon={<X size={16} />}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={startEditingOvertime}
                      leftIcon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
              
              {isEditingOvertime ? (
                <input
                  type="number"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(e.target.value)}
                  className={styles.overtimeInput}
                  placeholder="Enter hours"
                />
              ) : (
                <div className={styles.overtimeDisplay}>
                  {staff.annualOvertimeLimit || 0}h
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className={styles.cardTitle}>
              <Calendar className={styles.cardIcon} />
              Availability Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.availabilityGrid}>
              <div className={styles.availabilitySection}>
                <Body className={styles.availabilitySectionTitle}>Preferred Days Off</Body>
                {availabilityPrefs.daysOff && availabilityPrefs.daysOff.length > 0 ? (
                  <div className={styles.daysOffContainer}>
                    {availabilityPrefs.daysOff.map((day, index) => (
                      <div key={index} className={styles.dayBadge}>
                        {typeof day === 'string' ? day : getDayName(day)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Body className={styles.noPreferences}>No preferred days off set</Body>
                )}
              </div>
              
              <div className={styles.availabilitySection}>
                <Body className={styles.availabilitySectionTitle}>Preferred Hours</Body>
                <div className={styles.timeInfo}>
                  <div>
                    <Body className={styles.timeLabel}>Start Time:</Body>
                    <Body className={styles.timeValue}>
                      {minutesToTimeString(availabilityPrefs.preferredStartTime)}
                    </Body>
                  </div>
                  <div>
                    <Body className={styles.timeLabel}>End Time:</Body>
                    <Body className={styles.timeValue}>
                      {minutesToTimeString(availabilityPrefs.preferredEndTime)}
                    </Body>
                  </div>
                </div>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className={styles.cardTitle}>
            <Trash2 className={styles.cardIcon} />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Body className={styles.accessDescription}>
            Once you delete a staff member, there is no going back. Please be certain.
          </Body>
          <Button variant="destructive" onClick={() => setShowDeleteDialog(true)} leftIcon={<Trash2 size={16} />}>
            Delete Staff Member
          </Button>
        </CardContent>
      </Card>
    </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialog>
          <DialogHeader>
            <DialogTitle>Delete Staff Member</DialogTitle>
            <Separator className={styles.dialogSeparator} />
            <DialogDescription>
              Are you sure you want to delete <strong>{staff.fullName}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <SecondaryButton onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </SecondaryButton>
            <Button 
              variant="destructive" 
              onClick={() => {
                handleDelete(onBack);
                setShowDeleteDialog(false);
              }}
              leftIcon={<Trash2 size={16} />}
            >
              Delete Staff Member
            </Button>
          </DialogFooter>
        </AlertDialog>
      </Dialog>
    </div>
  );
}
