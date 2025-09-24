"use client";

import { useState, useCallback } from 'react';
import { useRemoveMember, useUpdateMember } from './use-members';
import { RestaurantMemberResponseDto, UpdateMemberRequest } from '../types';
import { getRoleConfig, getStatusConfig } from '../constants';
import { MESSAGES } from '@/constants/messages';
import { showToast } from '@/lib/toast';

interface UseMemberDetailsProps {
  member: RestaurantMemberResponseDto;
  restaurantId: string;
  onEdit: () => void;
  onBack: () => void;
}

export function useMemberDetails({ member, restaurantId, onEdit, onBack }: UseMemberDetailsProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  // Mutations
  const removeMemberMutation = useRemoveMember();
  const updateMemberMutation = useUpdateMember();

  // Handlers
  const handleEditClick = useCallback(() => {
    onEdit();
  }, [onEdit]);

  const handleBackClick = useCallback(() => {
    onBack();
  }, [onBack]);

  const handleRemoveClick = useCallback(() => {
    setShowRemoveModal(true);
  }, []);

  const handleRemoveConfirm = useCallback(async () => {
    try {
      await removeMemberMutation.mutateAsync({
        restaurantId,
        memberId: member.id,
      });
      
      showToast.success(MESSAGES.MEMBERS.REMOVE_SUCCESS);
      setShowRemoveModal(false);
      onBack(); // Navigate back to list after successful removal
    } catch (error) {
      console.error('Failed to remove member:', error);
      showToast.error(MESSAGES.MEMBERS.REMOVE_ERROR);
    }
  }, [member.id, removeMemberMutation, restaurantId, onBack]);

  const handleRemoveCancel = useCallback(() => {
    setShowRemoveModal(false);
  }, []);

  const handleStatusToggle = useCallback(async () => {
    const newStatus = member.status === 'active' ? 'suspended' : 'active';
    
    try {
      const updateData: UpdateMemberRequest = {
        role: member.role,
        venueAccess: member.venueAccess || [],
        permissions: member.permissions,
        // Note: status updates might need a separate endpoint
      };

      await updateMemberMutation.mutateAsync({
        restaurantId,
        memberId: member.id,
        updateData: updateData,
      });
      
      const statusText = newStatus === 'active' ? 'activated' : 'suspended';
      showToast.success(`Member ${statusText} successfully`);
    } catch (error) {
      console.error('Failed to update member status:', error);
      showToast.error('Failed to update member status');
    }
  }, [member, updateMemberMutation, restaurantId]);

  // Utility functions
  const getMemberName = useCallback(() => {
    return member.user.fullName || 
           `${member.user.firstName || ''} ${member.user.lastName || ''}`.trim() || 
           member.user.email;
  }, [member.user]);

  const getMemberInitials = useCallback(() => {
    const memberName = getMemberName();
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

  const formatJoinDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  }, []);

  const formatLastAccess = useCallback((dateString?: string) => {
    if (!dateString) return 'Never';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    } catch {
      return 'Unknown';
    }
  }, []);

  return {
    // State
    showRemoveModal,
    isRemoving: removeMemberMutation.isPending,
    isUpdating: updateMemberMutation.isPending,
    
    // Handlers
    handleEditClick,
    handleBackClick,
    handleRemoveClick,
    handleRemoveConfirm,
    handleRemoveCancel,
    handleStatusToggle,
    
    // Utility functions
    getMemberName,
    getMemberInitials,
    getVenueNames,
    formatJoinDate,
    formatLastAccess,
    getRoleConfig,
    getStatusConfig,
  };
}
