"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MembersService } from '../services/members.service';
import {
  RestaurantMemberResponseDto,
  InviteMemberRequest,
  UpdateMemberRequest,
  MemberStatsResponse,
} from '../types';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';

// Query Keys
export const MEMBER_QUERY_KEYS = {
  members: (restaurantId: string) => ['members', restaurantId],
  memberStats: (restaurantId: string) => ['member-stats', restaurantId],
  venueMembers: (restaurantId: string, venueId: string) => ['venue-members', restaurantId, venueId],
  userMemberships: () => ['user-memberships'],
} as const;

/**
 * Get all members for a restaurant
 */
export function useRestaurantMembers(restaurantId: string) {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.members(restaurantId),
    queryFn: () => MembersService.getRestaurantMembers(restaurantId),
    enabled: !!restaurantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get member statistics
 */
export function useMemberStats(restaurantId: string) {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.memberStats(restaurantId),
    queryFn: () => MembersService.getMemberStats(restaurantId),
    enabled: !!restaurantId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get members with venue access
 */
export function useMembersWithVenueAccess(restaurantId: string, venueId: string) {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.venueMembers(restaurantId, venueId),
    queryFn: () => MembersService.getMembersWithVenueAccess(restaurantId, venueId),
    enabled: !!restaurantId && !!venueId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Get current user's memberships
 */
export function useUserMemberships() {
  return useQuery({
    queryKey: MEMBER_QUERY_KEYS.userMemberships(),
    queryFn: () => MembersService.getUserMemberships(),
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Invite a new member
 */
export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      inviteData,
    }: {
      restaurantId: string;
      inviteData: InviteMemberRequest;
    }) => MembersService.inviteMember(restaurantId, inviteData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.members(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.memberStats(variables.restaurantId),
      });
      showToast.success(
        MESSAGES.MEMBERS?.INVITE_SUCCESS || 
        `Invitation sent to ${variables.inviteData.email} successfully`
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.INVITE_ERROR || 
        'Failed to send invitation'
      );
    },
  });
}

/**
 * Update member
 */
export function useUpdateMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      memberId,
      updateData,
    }: {
      restaurantId: string;
      memberId: string;
      updateData: UpdateMemberRequest;
    }) => MembersService.updateMember(restaurantId, memberId, updateData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.members(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.memberStats(variables.restaurantId),
      });
      showToast.success(
        MESSAGES.MEMBERS?.UPDATE_SUCCESS || 
        'Member updated successfully'
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.UPDATE_ERROR || 
        'Failed to update member'
      );
    },
  });
}

/**
 * Remove member
 */
export function useRemoveMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      memberId,
    }: {
      restaurantId: string;
      memberId: string;
    }) => MembersService.removeMember(restaurantId, memberId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.members(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.memberStats(variables.restaurantId),
      });
      showToast.success(
        MESSAGES.MEMBERS?.REMOVE_SUCCESS || 
        'Member removed successfully'
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.REMOVE_ERROR || 
        'Failed to remove member'
      );
    },
  });
}

/**
 * Accept invitation
 */
export function useAcceptInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      userId,
    }: {
      restaurantId: string;
      userId: string;
    }) => MembersService.acceptInvitation(restaurantId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.members(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.userMemberships(),
      });
      showToast.success(
        MESSAGES.MEMBERS?.ACCEPT_SUCCESS || 
        'Invitation accepted successfully'
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.ACCEPT_ERROR || 
        'Failed to accept invitation'
      );
    },
  });
}

/**
 * Decline invitation
 */
export function useDeclineInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      restaurantId,
      userId,
    }: {
      restaurantId: string;
      userId: string;
    }) => MembersService.declineInvitation(restaurantId, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.members(variables.restaurantId),
      });
      queryClient.invalidateQueries({
        queryKey: MEMBER_QUERY_KEYS.userMemberships(),
      });
      showToast.success(
        MESSAGES.MEMBERS?.DECLINE_SUCCESS || 
        'Invitation declined'
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.DECLINE_ERROR || 
        'Failed to decline invitation'
      );
    },
  });
}

/**
 * Resend invitation
 */
export function useResendInvitation() {
  return useMutation({
    mutationFn: ({
      restaurantId,
      memberId,
    }: {
      restaurantId: string;
      memberId: string;
    }) => MembersService.resendInvitation(restaurantId, memberId),
    onSuccess: () => {
      showToast.success(
        MESSAGES.MEMBERS?.RESEND_SUCCESS || 
        'Invitation resent successfully'
      );
    },
    onError: (error: any) => {
      showToast.error(
        error?.response?.data?.message || 
        MESSAGES.MEMBERS?.RESEND_ERROR || 
        'Failed to resend invitation'
      );
    },
  });
}
