"use client";

import React from 'react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { PrimaryButton, IconButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import styles from './MemberList.module.css';
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Eye, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Ban,
  Mail,
  Building2,
  User
} from 'lucide-react';
import { RestaurantMemberResponseDto } from '../../types';
import { useMemberList } from '../../hooks/use-member-list';

interface MemberListProps {
  restaurantId: string | null;
  onInviteMember: () => void;
  onEditMember: (member: RestaurantMemberResponseDto) => void;
  onViewMember: (member: RestaurantMemberResponseDto) => void;
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

export function MemberList({ restaurantId, onInviteMember, onEditMember, onViewMember }: MemberListProps) {
  const {
    // Data
    members: filteredMembers,
    isLoading,
    error,
    
    // Search state
    searchTerm,
    
    // Dropdown state
    openDropdown,
    
    // Confirmation modal state
    memberToRemove,
    isRemoving,
    
    // Handlers
    handleSearchChange,
    handleDropdownToggle,
    handleDropdownClose,
    handleEditClick,
    handleViewClick,
    handleRemoveClick,
    handleRemoveConfirm,
    handleRemoveCancel,
    
    // Utility functions
    getMemberName,
    getMemberInitials,
    getVenueNames,
    getRoleConfig,
    getStatusConfig,
  } = useMemberList({ restaurantId: restaurantId!, onEditMember, onViewMember });

  // Don't render if restaurantId is null (parent should handle this case)
  if (!restaurantId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <Body>Loading team members...</Body>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <Building2 className={styles.errorIcon} />
          <Heading level={3}>Failed to Load Members</Heading>
          <Body>There was an error loading team members. Please try again.</Body>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerInfo}>
              <Users className={styles.headerIcon} />
              <div>
                <Heading level={2} weight="semibold" className={styles.headerTitle}>Team Members</Heading>
                <Caption className={styles.headerCount}>
                  {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
                </Caption>
              </div>
            </div>
          </div>
          <PrimaryButton
            onClick={onInviteMember}
            leftIcon={<Plus className="w-4 h-4" />}
            className={styles.inviteButton}
          >
            Invite Member
          </PrimaryButton>
        </div>

        {/* Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchInputContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search members by name, email, or role..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Members List */}
        {filteredMembers.length === 0 ? (
          <div className={styles.emptyState}>
            <Users className={styles.emptyIcon} />
            <Heading level={3} className={styles.emptyTitle}>
              {searchTerm ? 'No members found' : 'No team members yet'}
            </Heading>
            <Body className={styles.emptyDescription}>
              {searchTerm 
                ? 'Try adjusting your search terms or clear the search to see all members.'
                : 'Start building your team by inviting the first member.'
              }
            </Body>
            {!searchTerm && (
              <PrimaryButton
                onClick={onInviteMember}
                leftIcon={<Plus className="w-4 h-4" />}
                className={styles.emptyActionButton}
              >
                Invite First Member
              </PrimaryButton>
            )}
          </div>
        ) : (
          <div className={styles.membersList}>
            {filteredMembers.map((member) => (
              <div key={member.id} className={styles.memberItem}>
                {/* Avatar */}
                <div className={styles.memberAvatar}>
                  {member.user?.avatarUrl ? (
                    <img 
                      src={member.user.avatarUrl} 
                      alt={getMemberName(member)} 
                      className={styles.avatarImage} 
                    />
                  ) : (
                    <div className={`${styles.avatarPlaceholder} ${
                      member.status === 'active' ? styles.avatarActive : styles.avatarInactive
                    }`}>
                      {getMemberInitials(member)}
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className={styles.memberInfo}>
                  <Heading level={4} weight="semibold" className={styles.memberName}>
                    {getMemberName(member)}
                  </Heading>
                  <div className={styles.memberDetails}>
                    <Caption className={styles.memberEmail}>
                      <Mail className={styles.detailIcon} />
                      {member.user?.email || 'No email'}
                    </Caption>
                    <Caption className={styles.memberVenues}>
                      <Building2 className={styles.detailIcon} />
                      {getVenueNames(member.venueAccess || [])}
                    </Caption>
                  </div>
                </div>

                {/* Status & Role */}
                <div className={styles.memberMeta}>
                  <Badge variant="default" className={`${styles.roleBadge} ${styles[`role-${member.role}`]}`}>
                    {getRoleConfig(member.role as keyof typeof import('../../constants').RESTAURANT_ROLE_CONFIG).label}
                  </Badge>
                  <Badge variant="secondary" className={`${styles.statusBadge} ${styles[`status-${member.status}`]}`}>
                    <StatusIcon status={member.status} />
                    {getStatusConfig(member.status as keyof typeof import('../../constants').MEMBER_STATUS_CONFIG).label}
                  </Badge>
                </div>

                {/* Actions */}
                <div className={styles.memberActions}>
                  <div className={styles.dropdown}>
                    <IconButton
                      variant="ghost"
                      onClick={() => handleDropdownToggle(member.id)}
                      className={styles.dropdownTrigger}
                      aria-label="Member actions"
                    >
                      <MoreVertical className={styles.dropdownIcon} />
                    </IconButton>
                    
                    {openDropdown === member.id && (
                      <>
                        <div className={styles.dropdownBackdrop} onClick={handleDropdownClose} />
                        <div className={styles.dropdownMenu}>
                          <button
                            onClick={() => handleViewClick(member)}
                            className={styles.dropdownItem}
                          >
                            <Eye className={styles.dropdownItemIcon} />
                            View Details
                          </button>
                          <button
                            onClick={() => handleEditClick(member)}
                            className={styles.dropdownItem}
                          >
                            <Edit className={styles.dropdownItemIcon} />
                            Edit Member
                          </button>
                          <button
                            onClick={() => handleRemoveClick(member)}
                            className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                          >
                            <Trash2 className={styles.dropdownItemIcon} />
                            Remove Member
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal 
      <ConfirmationModal
        isOpen={!!memberToRemove}
        onClose={handleRemoveCancel}
        onConfirm={handleRemoveConfirm}
        title="Remove Team Member"
        message={memberToRemove ? `Are you sure you want to remove ${getMemberName(memberToRemove)} from your team? This action cannot be undone.` : ''}
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
        isLoading={isRemoving}
        
      />
      */}
    </>
  );
}