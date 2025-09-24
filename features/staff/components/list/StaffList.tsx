"use client";

import React from 'react';
import styles from './StaffList.module.css';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ToggleLeft, 
  ToggleRight,
  Clock,
  Mail,
  Phone
} from 'lucide-react';
import { Button, PrimaryButton } from '@/components/ui/button';
import { Heading, Body } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { EnhancedSelect } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useStaffList } from '../../hooks/use-staff-list';
import { getContractTypeLabel, getInitials } from '../../utils';
import type { StaffResponseDto } from '../../types';

interface StaffListProps {
  venueId: string;
  onCreateStaff: () => void;
  onEditStaff: (staff: StaffResponseDto) => void;
  onViewStaff: (staff: StaffResponseDto) => void;
}

export function StaffList({ venueId, onCreateStaff, onEditStaff, onViewStaff }: StaffListProps) {
  const {
    // Data
    staff: filteredStaff,
    roles,
    isLoading,
    error,
    
    // Filters
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    showActiveOnly,
    setShowActiveOnly,
    
    // Actions
    handleDeleteStaff,
    handleToggleActive,
  } = useStaffList({ venueId });

  if (error) {
    return (
      <div className={styles.errorState}>
        <p className={styles.errorText}>Failed to load staff members</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Users className={styles.icon} />
          <Heading level={2}>Staff Members</Heading>
          <div className={styles.count}>{filteredStaff.length}</div>
        </div>
        <PrimaryButton onClick={onCreateStaff} leftIcon={<Plus size={16} />}>
          Add Staff Member
        </PrimaryButton>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Input
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>
        
        <div className={styles.filterControls}>
          <Filter className={styles.filterIcon} />
          <EnhancedSelect
            value={selectedRole || 'all'}
            onValueChange={(value) => setSelectedRole(value === 'all' ? '' : value)}
            options={[
              { value: 'all', label: 'All Roles' },
              ...roles.map(role => ({
                value: role.id,
                label: role.displayName
              }))
            ]}
            placeholder="All Roles"
          />
          
          <Checkbox
            checked={showActiveOnly}
            onCheckedChange={(checked) => setShowActiveOnly(checked === true)}
            id="active-only"
            label="Active Only"
          />
        
        </div>
      </div>

      {/* Staff List */}
      {isLoading ? (
        <div className={styles.loadingContainer}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.loadingItem}>
              <div className={styles.loadingContent}>
                <div className={styles.loadingAvatar}></div>
                <div className={styles.loadingDetails}>
                  <div className={styles.loadingLine}></div>
                  <div className={styles.loadingLineShort}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredStaff.length === 0 ? (
        <Card className={styles.emptyStateCard}>
          <CardContent className={styles.emptyStateContent}>
            <div className={styles.emptyIconContainer}>
              <Users className={styles.emptyIcon} />
            </div>
            <Heading level={3} className={styles.emptyTitle}>
              {searchTerm || selectedRole ? 'No matches found' : 'No staff members yet'}
            </Heading>
            <Body className={styles.emptyDescription}>
              {searchTerm || selectedRole 
                ? "Try adjusting your search terms or filters to find what you're looking for."
                : "Build your team by adding staff members to get started with scheduling and management."
              }
            </Body>
            {!searchTerm && !selectedRole && (
              <div className={styles.emptyActions}>
                <PrimaryButton onClick={onCreateStaff} leftIcon={<Plus size={16} />}>
                  Add Your First Staff Member
                </PrimaryButton>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={styles.staffList}>
          {filteredStaff.map(member => (
            <div
              key={member.id}
              className={`${styles.staffItem} ${!member.isActive ? styles.staffItemInactive : ''}`}
            >
              <div className={styles.staffItemContent}>
                <div className={styles.staffInfo}>
                  <div className={styles.avatarContainer}>
                    <div className={`${styles.avatar} ${
                      member.isActive ? styles.avatarActive : styles.avatarInactive
                    }`}>
                      {getInitials(member.fullName)}
                    </div>
                  </div>
                  
                  <div className={styles.staffDetails}>
                    <div className={styles.staffHeader}>
                      <Heading 
                        level={3} 
                        className={styles.staffName}
                        onClick={() => onViewStaff(member)}
                      >
                        {member.fullName}
                      </Heading>
                      <span className={styles.badgeContainer}>
                        {!member.isActive && (
                          <span className={styles.badgeInactive}>Inactive</span>
                        )}
                        {member.isMinor && (
                          <span className={styles.badgeMinor}>Minor</span>
                        )}
                      </span>
                    </div>
                    
                    <div className={styles.staffMeta}>
                      <span className={styles.roleName}>{member.primaryRoleName || 'Role not found'}</span>
                      <div className={styles.badgeContract}>
                        {member.contractType ? getContractTypeLabel(member.contractType) : 'No contract type'}
                      </div>
                      <span className={styles.hoursInfo}>{member.weeklyContractHours}h/week</span>
                    </div>
                    
                    <div className={styles.contactInfo}>
                      <span className={styles.contactItem}>
                        <Mail className={styles.contactIcon} />
                        <span>{member.email}</span>
                      </span>
                      {member.phone && (
                        <span className={styles.contactItem}>
                          <Phone className={styles.contactIcon} />
                          <span>{member.phone}</span>
                        </span>
                      )}
                      {member.whatsappNumber && (
                        <span className={styles.contactItem}>
                          <Phone className={styles.contactIcon} />
                          <span>{member.whatsappNumber}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={styles.staffActions}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className={styles.buttonIcon} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewStaff(member)}>
                        <Users className={styles.buttonIcon} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditStaff(member)}>
                        <Edit className={styles.buttonIcon} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleToggleActive(member.id, member.isActive)}>
                        {member.isActive ? (
                          <>
                            <ToggleLeft className={styles.buttonIcon} />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <ToggleRight className={styles.buttonIcon} />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteStaff(member.id)}
                        className={styles.deleteAction}
                      >
                        <Trash2 className={styles.buttonIcon} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className={styles.additionalInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <Clock className={styles.infoIcon} />
                    <span>Hired: {member.hireDate ? new Date(member.hireDate).toLocaleDateString() : 'Not set'}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span>Overtime: {member.annualOvertimeLimit || 0}h remaining</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
