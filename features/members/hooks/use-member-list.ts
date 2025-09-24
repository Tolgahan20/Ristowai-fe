"use client";

import { useState, useCallback } from 'react';
import { useRestaurantMembers, useRemoveMember } from './use-members';
import { RestaurantMemberResponseDto } from '../types';
import { getRoleConfig, getStatusConfig } from '../constants';
import { MESSAGES } from '@/constants/messages';
import { showToast } from '@/lib/toast';

interface UseMemberListProps {
  restaurantId: string;
  onEditMember: (member: RestaurantMemberResponseDto) => void;
  onViewMember: (member: RestaurantMemberResponseDto) => void;
}

export function useMemberList({ restaurantId, onEditMember, onViewMember }: UseMemberListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<RestaurantMemberResponseDto | null>(null);

  // Data fetching
  const { data: members = [], isLoading, error } = useRestaurantMembers(restaurantId);
  const removeMemberMutation = useRemoveMember();

  // Filter members based on search term
  const filteredMembers = members.filter(member => {
    if (!member?.user) return false;
    
    const fullName = member.user.fullName || `${member.user.firstName || ''} ${member.user.lastName || ''}`.trim();
    const email = member.user.email || '';
    const roleLabel = getRoleConfig(member.role as keyof typeof import('../constants').RESTAURANT_ROLE_CONFIG).label || '';
    
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           roleLabel.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleDropdownToggle = useCallback((memberId: string) => {
    setOpenDropdown(prev => prev === memberId ? null : memberId);
  }, []);

  const handleDropdownClose = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  const handleEditClick = useCallback((member: RestaurantMemberResponseDto) => {
    onEditMember(member);
    setOpenDropdown(null);
  }, [onEditMember]);

  const handleViewClick = useCallback((member: RestaurantMemberResponseDto) => {
    onViewMember(member);
    setOpenDropdown(null);
  }, [onViewMember]);

  const handleRemoveClick = useCallback((member: RestaurantMemberResponseDto) => {
    setMemberToRemove(member);
    setOpenDropdown(null);
  }, []);

  const handleRemoveConfirm = useCallback(async () => {
    if (!memberToRemove) return;

    try {
      await removeMemberMutation.mutateAsync({
        restaurantId,
        memberId: memberToRemove.id,
      });
      
      showToast.success(MESSAGES.MEMBERS.REMOVE_SUCCESS);
      setMemberToRemove(null);
    } catch (error) {
      console.error('Failed to remove member:', error);
      showToast.error(MESSAGES.MEMBERS.REMOVE_ERROR);
    }
  }, [memberToRemove, removeMemberMutation, restaurantId]);

  const handleRemoveCancel = useCallback(() => {
    setMemberToRemove(null);
  }, []);

  // Utility functions
  const getMemberName = useCallback((member: RestaurantMemberResponseDto | null) => {
    if (!member?.user) return 'Unknown Member';
    return member.user.fullName || 
           `${member.user.firstName || ''} ${member.user.lastName || ''}`.trim() || 
           member.user.email || 'Unknown Member';
  }, []);

  const getMemberInitials = useCallback((member: RestaurantMemberResponseDto | null) => {
    if (!member?.user) return '?';
    const memberName = getMemberName(member);
    return memberName.split(' ')
      .map(n => n[0]?.toUpperCase())
      .filter(Boolean)
      .join('')
      .slice(0, 2) || '?';
  }, [getMemberName]);

  const getVenueNames = useCallback((venueAccess: string[]) => {
    // This would ideally get venue names from a venues cache/query
    // For now, we'll just show the access count
    return venueAccess.length === 1 ? '1 venue' : `${venueAccess.length} venues`;
  }, []);

  return {
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
    isRemoving: removeMemberMutation.isPending,
    
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
    
    // Helper functions for rendering
    getRoleConfig,
    getStatusConfig,
  };
}
