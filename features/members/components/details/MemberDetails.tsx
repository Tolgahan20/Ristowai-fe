"use client";

import React from 'react';
import {
  Edit,
  Mail,
  User,
  Building2,
  Calendar,
  Clock,
  Shield,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  UserX,
  UserCheck
} from 'lucide-react';
import { Heading } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import styles from './MemberDetails.module.css';
import { RestaurantMemberResponseDto } from '../../types';
import { useMemberDetails } from '../../hooks/use-member-details';

interface MemberDetailsProps {
  member: RestaurantMemberResponseDto;
  restaurantId: string;
  onEdit: () => void;
  onBack: () => void;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending': return <Clock className={styles.statusIcon} />;
    case 'active': return <CheckCircle className={styles.statusIcon} />;
    case 'suspended': return <Ban className={styles.statusIcon} />;
    case 'removed': return <XCircle className={styles.statusIcon} />;
    default: return <User className={styles.statusIcon} />;
  }
};

export function MemberDetails({ member, restaurantId, onEdit, onBack }: MemberDetailsProps) {
  const {
    // State

    isRemoving,
    isUpdating,
    
    // Handlers
    handleEditClick,
    handleRemoveClick,
    handleStatusToggle,
    
    // Utility functions
    getMemberName,
    getMemberInitials,
    getVenueNames,
    formatLastAccess,
    getRoleConfig,
    getStatusConfig,
  } = useMemberDetails({ member, restaurantId, onEdit, onBack });

  const roleConfig = getRoleConfig(member.role);
  const statusConfig = getStatusConfig(member.status);

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerActions}>
            <PrimaryButton
              onClick={handleEditClick}
              className={styles.editButton}
              disabled={isUpdating}
            >
              <Edit className={styles.buttonIcon} />
              Edit Member
            </PrimaryButton>
          </div>
        </div>

        {/* Member Profile */}
        <Card className={styles.profileSection}>
          <CardContent className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              {member.user?.avatarUrl ? (
                <img 
                  src={member.user.avatarUrl} 
                  alt={getMemberName()} 
                  className={styles.avatarImage} 
                />
              ) : (
                <div className={`${styles.avatarPlaceholder} ${
                  member.status === 'active' ? styles.avatarActive : styles.avatarInactive
                }`}>
                  {getMemberInitials()}
                </div>
              )}
            </div>
            <div className={styles.profileInfo}>
              <Heading level={1} className={styles.memberName}>{getMemberName()}</Heading>
              <div className={styles.memberMeta}>
                <Badge variant="secondary" className={`${styles.roleBadge} ${styles[`role-${member.role}`]}`}>
                  <Shield className={styles.badgeIcon} />
                  {roleConfig.label}
                </Badge>
                <Badge variant="secondary" className={`${styles.statusBadge} ${styles[`status-${member.status}`]}`}>
                  <StatusIcon status={member.status} />
                  {statusConfig.label}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Grid */}
        <div className={styles.detailsGrid}>
          {/* Contact Information */}
          <Card className={styles.detailCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <Mail className={styles.cardIcon} />
                <Heading level={3} weight="semibold" className={styles.cardTitle}>Contact Information</Heading>
              </div>
              <div className={styles.detailRows}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Email</span>
                  <span className={styles.detailValue}>{member.user?.email || 'No email'}</span>
                </div>

                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Full Name</span>
                  <span className={styles.detailValue}>
                    {member.user?.firstName || ''} {member.user?.lastName || ''}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access & Permissions */}
          <Card className={styles.detailCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <Building2 className={styles.cardIcon} />
                <Heading level={3} weight="semibold" className={styles.cardTitle}>Access & Permissions</Heading>
              </div>
              <div className={styles.detailRows}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Venue Access</span>
                  <span className={styles.detailValue}>
                    {getVenueNames(member.venueAccess || [])}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Role</span>
                  <span className={styles.detailValue}>{roleConfig.label}</span>
                </div>
                {roleConfig.description && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Responsibilities</span>
                    <span className={styles.detailValue}>{roleConfig.description}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Permissions Details */}
          <Card className={styles.detailCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <Shield className={styles.cardIcon} />
                <Heading level={3} weight="semibold" className={styles.cardTitle}>Permissions</Heading>
              </div>
              <div className={styles.permissionsList}>
                {Object.entries(member.permissions || {}).map(([key, value]) => (
                  <div key={key} className={styles.permissionItem}>
                    <span className={styles.permissionLabel}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                    <span className={`${styles.permissionValue} ${value ? styles.allowed : styles.denied}`}>
                      {value ? <CheckCircle className={styles.permissionIcon} /> : <XCircle className={styles.permissionIcon} />}
                      {value ? 'Allowed' : 'Denied'}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity & Status */}
          <Card className={styles.detailCard}>
            <CardContent className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <Calendar className={styles.cardIcon} />
                <Heading level={3} weight="semibold" className={styles.cardTitle}>Activity & Status</Heading>
              </div>
              <div className={styles.detailRows}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Member Since</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Last Access</span>
                  <span className={styles.detailValue}>
                    {formatLastAccess(member.lastAccessAt)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Access Count</span>
                  <span className={styles.detailValue}>
                    {member.accessCount || 0} times
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status</span>
                  <span className={styles.detailValue}>
                    <Badge variant="secondary" className={`${styles.statusBadge} ${styles[`status-${member.status}`]}`}>
                      <StatusIcon status={member.status} />
                      {statusConfig.label}
                    </Badge>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className={styles.actionsSection}>
          <CardContent className={styles.actionsGrid}>
            <SecondaryButton
              onClick={handleStatusToggle}
              className={`${styles.actionButton} ${
                member.status === 'active' ? styles.suspendButton : styles.activateButton
              }`}
              disabled={isUpdating}
            >
              {member.status === 'active' ? (
                <>
                  <UserX className={styles.buttonIcon} />
                  Suspend Member
                </>
              ) : (
                <>
                  <UserCheck className={styles.buttonIcon} />
                  Activate Member
                </>
              )}
            </SecondaryButton>
            
            <SecondaryButton
              onClick={handleRemoveClick}
              className={`${styles.actionButton} ${styles.removeButton}`}
              disabled={isRemoving || isUpdating}
            >
              <Trash2 className={styles.buttonIcon} />
              Remove Member
            </SecondaryButton>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Modal */}
      {/* Uncomment and use the modal if you have the component and props available */}
      {/* 
      <ConfirmationModal
        isOpen={showRemoveModal}
        onClose={handleRemoveCancel}
        onConfirm={handleRemoveConfirm}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${getMemberName()} from your team? This action cannot be undone and they will lose access to all venues.`}
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
        isLoading={isRemoving}
      />
      */}
    </>
  );
}