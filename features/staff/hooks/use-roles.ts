"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '../services/staff.service';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type {
  CreateRoleRequest,
  UpdateRoleRequest,
  RoleResponseDto,
} from '../types';

const QUERY_KEYS = {
  roles: (venueId: string) => ['roles', venueId],
  activeRoles: (venueId: string) => ['roles', venueId, 'active'],
  roleStats: (venueId: string) => ['roles', venueId, 'stats'],
  roleById: (id: string, venueId?: string) => ['roles', id, venueId],
  roleStaffCount: (id: string, venueId?: string, activeOnly?: boolean) => 
    ['roles', id, 'staff-count', venueId, activeOnly],
} as const;

// Hook for getting all roles by venue
export function useRolesByVenue(venueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.roles(venueId),
    queryFn: () => staffService.getRolesByVenue(venueId),
    enabled: !!venueId,
    staleTime: 30000, // 30 seconds
  });
}

// Hook for getting active roles by venue
export function useActiveRolesByVenue(venueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.activeRoles(venueId),
    queryFn: () => staffService.getActiveRolesByVenue(venueId),
    enabled: !!venueId,
    staleTime: 30000,
  });
}

// Hook for getting role statistics
export function useRoleStats(venueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.roleStats(venueId),
    queryFn: () => staffService.getRoleStats(venueId),
    enabled: !!venueId,
    staleTime: 60000, // 1 minute
  });
}

// Hook for getting role by ID
export function useRoleById(id: string, venueId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.roleById(id, venueId),
    queryFn: () => staffService.getRoleById(id, venueId),
    enabled: !!id,
    staleTime: 30000,
  });
}

// Hook for getting role staff count
export function useRoleStaffCount(id: string, venueId?: string, activeOnly?: boolean) {
  return useQuery({
    queryKey: QUERY_KEYS.roleStaffCount(id, venueId, activeOnly),
    queryFn: () => staffService.getRoleStaffCount(id, venueId, activeOnly),
    enabled: !!id,
    staleTime: 30000,
  });
}

// Hook for creating roles
export function useCreateRole(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => staffService.createRole(venueId, data),
    onSuccess: (data: RoleResponseDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeRoles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleStats(venueId) });
      showToast.role.created(data.name);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
}

// Hook for updating roles
export function useUpdateRole(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoleRequest }) =>
      staffService.updateRole(id, data, venueId),
    onSuccess: (data: RoleResponseDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeRoles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleById(data.id, venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleStats(venueId) });
      showToast.role.updated(data.displayName);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
}

// Hook for toggling role active status
export function useToggleRoleActive(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.toggleRoleActive(id, venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeRoles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleStats(venueId) });
      showToast.success(MESSAGES.ROLE.STATUS_TOGGLED);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.SERVER_ERROR);
    },
  });
}

// Hook for deleting roles
export function useDeleteRole(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.deleteRole(id, venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeRoles(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.roleStats(venueId) });
      showToast.role.deleted();
    },
    onError: (error: any) => {
      if (error?.response?.data?.message?.includes('assigned')) {
        showToast.role.cannotDeleteAssigned();
      } else {
        showToast.error(MESSAGES.ERROR.SERVER_ERROR);
      }
    },
  });
}
