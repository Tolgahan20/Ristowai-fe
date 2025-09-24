"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { staffService } from '../services/staff.service';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type {
  CreateStaffRequest,
  UpdateStaffRequest,
  StaffResponseDto,
} from '../types';

const QUERY_KEYS = {
  staff: (venueId: string) => ['staff', venueId],
  activeStaff: (venueId: string) => ['staff', venueId, 'active'],
  staffByRole: (roleId: string, venueId?: string) => ['staff', 'role', roleId, venueId],
  staffById: (id: string, venueId?: string) => ['staff', id, venueId],
} as const;

// Hook for getting all staff by venue
export function useStaffByVenue(venueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.staff(venueId),
    queryFn: () => staffService.getStaffByVenue(venueId),
    enabled: !!venueId,
    staleTime: 30000, // 30 seconds
  });
}

// Hook for getting active staff by venue
export function useActiveStaffByVenue(venueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.activeStaff(venueId),
    queryFn: () => staffService.getActiveStaffByVenue(venueId),
    enabled: !!venueId,
    staleTime: 30000, // 30 seconds
  });
}

// Hook for getting staff by role
export function useStaffByRole(roleId: string, venueId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.staffByRole(roleId, venueId),
    queryFn: () => staffService.getStaffByRole(roleId, venueId),
    enabled: !!roleId,
    staleTime: 30000,
  });
}

// Hook for getting staff by ID
export function useStaffById(id: string, venueId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.staffById(id, venueId),
    queryFn: () => staffService.getStaffById(id, venueId),
    enabled: !!id,
    staleTime: 30000,
  });
}

// Hook for creating staff
export function useCreateStaff(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStaffRequest) => staffService.createStaff(venueId, data),
    onSuccess: (data: StaffResponseDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeStaff(venueId) });
      showToast.staff.created(data.fullName);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
}

// Hook for updating staff
export function useUpdateStaff(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStaffRequest }) =>
      staffService.updateStaff(id, data, venueId),
    onSuccess: (data: StaffResponseDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeStaff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staffById(data.id, venueId) });
      showToast.staff.updated(data.fullName);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
}

// Hook for toggling staff active status
export function useToggleStaffActive(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.toggleStaffActive(id, venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeStaff(venueId) });
      showToast.staff.statusToggled();
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.SERVER_ERROR);
    },
  });
}

// Hook for generating staff access token
export function useGenerateStaffAccessToken(venueId: string) {
  return useMutation({
    mutationFn: (id: string) => staffService.generateStaffAccessToken(id, venueId),
    onSuccess: () => {
      showToast.staff.accessTokenGenerated();
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.SERVER_ERROR);
    },
  });
}

// Hook for revoking staff access token
export function useRevokeStaffAccessToken(venueId: string) {
  return useMutation({
    mutationFn: (id: string) => staffService.revokeStaffAccessToken(id, venueId),
    onSuccess: () => {
      showToast.success(MESSAGES.STAFF.ACCESS_TOKEN_REVOKED);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.SERVER_ERROR);
    },
  });
}

// Hook for updating staff overtime hours
export function useUpdateStaffOvertimeHours(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, hours }: { id: string; hours: number }) =>
      staffService.updateStaffOvertimeHours(id, hours, venueId),
    onSuccess: (data: StaffResponseDto) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staffById(data.id, venueId) });
      showToast.success(MESSAGES.STAFF.OVERTIME_UPDATED);
    },
    onError: () => {
      showToast.error(MESSAGES.ERROR.VALIDATION_ERROR);
    },
  });
}

// Hook for deleting staff
export function useDeleteStaff(venueId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => staffService.deleteStaff(id, venueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.staff(venueId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.activeStaff(venueId) });
      showToast.staff.deleted();
    },
    onError: (error: any) => {
      if (error?.response?.data?.message?.includes('assigned')) {
        showToast.error('Cannot delete staff member that has assigned shifts');
      } else {
        showToast.error(MESSAGES.ERROR.SERVER_ERROR);
      }
    },
  });
}
