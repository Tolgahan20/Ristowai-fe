"use client";

import { useState, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/use-auth';
import {
  RestaurantMemberResponseDto,
  MemberViewMode,
} from '../types';

interface UseMemberManagementProps {
  defaultRestaurantId?: string;
}

export function useMemberManagement({ defaultRestaurantId }: UseMemberManagementProps = {}) {
  // State
  const [mode, setMode] = useState<MemberViewMode>('list');
  const [selectedMember, setSelectedMember] = useState<RestaurantMemberResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get current user's restaurant (single restaurant setup)
  const { user, isLoading: authLoading } = useAuth();
  const restaurant = user?.restaurants?.[0];
  const restaurantId = defaultRestaurantId || restaurant?.id || null;

  // Handlers (restaurant select not needed for single restaurant setup)

  const handleInviteMember = useCallback(() => {
    setMode('invite');
    setSelectedMember(null);
  }, []);

  const handleEditMember = useCallback((member: RestaurantMemberResponseDto) => {
    setSelectedMember(member);
    setMode('edit');
  }, []);

  const handleViewMember = useCallback((member: RestaurantMemberResponseDto) => {
    setSelectedMember(member);
    setMode('details');
  }, []);

  const handleEditFromDetails = useCallback(() => {
    if (selectedMember) {
      setMode('edit');
    }
  }, [selectedMember]);

  const handleInviteSubmit = useCallback(async () => {
    if (!restaurantId) return;

    setIsLoading(true);
    try {
      // The actual API call will be handled by the component using mutation hooks
      // This is just for loading state management
      setMode('list');
      setSelectedMember(null);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  const handleEditSubmit = useCallback(async () => {
    if (!restaurantId || !selectedMember) return;

    setIsLoading(true);
    try {
      // The actual API call will be handled by the component using mutation hooks
      setMode('list');
      setSelectedMember(null);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId, selectedMember]);

  const handleCancel = useCallback(() => {
    setMode('list');
    setSelectedMember(null);
  }, []);

  const handleBack = useCallback(() => {
    setMode('list');
    setSelectedMember(null);
  }, []);

  return {
    // State
    mode,
    restaurantId,
    selectedMember,
    isLoading,
    restaurant,

    // Loading states
    authLoading,
    isReady: !authLoading && !!restaurantId,

    // Computed
    canInviteMembers: true, // Will be computed based on user permissions

    // Handlers
    handleInviteMember,
    handleEditMember,
    handleViewMember,
    handleEditFromDetails,
    handleInviteSubmit,
    handleEditSubmit,
    handleCancel,
    handleBack,
  };
}
