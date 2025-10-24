"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import type {
  ScheduleResponseDto,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  ScheduleQueryParams,
  ScheduleStats,
} from '../types';

// Query keys
export const scheduleKeys = {
  all: ['schedules'] as const,
  lists: () => [...scheduleKeys.all, 'list'] as const,
  list: (params: ScheduleQueryParams) => [...scheduleKeys.lists(), params] as const,
  details: () => [...scheduleKeys.all, 'detail'] as const,
  detail: (id: string) => [...scheduleKeys.details(), id] as const,
  stats: (venueId: string) => [...scheduleKeys.all, 'stats', venueId] as const,
};

// Get all schedules with filtering
export function useSchedules(params: ScheduleQueryParams = {}) {
  return useQuery({
    queryKey: scheduleKeys.list(params),
    queryFn: async () => {
      // Build query params object - axios will serialize it properly
      const queryParams: Record<string, string> = {
        page: String(params.page ?? 1),
        limit: String(params.limit ?? 100),
      };
      
      if (params.venueId) queryParams.venueId = params.venueId;
      if (params.status) queryParams.status = params.status;
      if (params.startDate) queryParams.startDate = params.startDate;
      if (params.endDate) queryParams.endDate = params.endDate;
      if (params.includeShifts !== undefined) queryParams.includeShifts = String(params.includeShifts);
      if (params.includeViolations !== undefined) queryParams.includeViolations = String(params.includeViolations);
      
      const response = await api.get<{ schedules: ScheduleResponseDto[] }>('/schedules', {
        params: queryParams,
      });
      return response.data.schedules;
    },
  });
}

// Get schedules by venue
export function useSchedulesByVenue(venueId: string, params: Omit<ScheduleQueryParams, 'venueId'> = {}) {
  return useSchedules({ ...params, venueId });
}

// Get single schedule by ID
export function useSchedule(scheduleId: string, includeShifts = false, includeViolations = false) {
  return useQuery({
    queryKey: scheduleKeys.detail(scheduleId),
    queryFn: async () => {
      const queryParams: Record<string, string> = {};
      if (includeShifts) queryParams.includeShifts = 'true';
      if (includeViolations) queryParams.includeViolations = 'true';
      
      const response = await api.get<ScheduleResponseDto>(`/schedules/${scheduleId}`, {
        params: queryParams,
      });
      return response.data;
    },
    enabled: !!scheduleId,
  });
}

// Get schedule statistics
export function useScheduleStats(venueId: string) {
  return useQuery({
    queryKey: scheduleKeys.stats(venueId),
    queryFn: async () => {
      const response = await api.get<ScheduleStats>('/schedules/stats', {
        params: { venueId },
      });
      return response.data;
    },
    enabled: !!venueId,
  });
}

// Create schedule mutation
export function useCreateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateScheduleRequest) => {
      const response = await api.post<ScheduleResponseDto>('/schedules', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate all schedule lists
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      // Invalidate stats for this venue
      queryClient.invalidateQueries({ queryKey: scheduleKeys.stats(data.venueId) });
    },
  });
}

// Update schedule mutation
export function useUpdateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ scheduleId, data }: { scheduleId: string; data: UpdateScheduleRequest }) => {
      const response = await api.patch<ScheduleResponseDto>(`/schedules/${scheduleId}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate the specific schedule
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(data.id) });
      // Invalidate all schedule lists
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      // Invalidate stats
      queryClient.invalidateQueries({ queryKey: scheduleKeys.stats(data.venueId) });
    },
  });
}

// Delete schedule mutation
export function useDeleteSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: string) => {
      await api.delete(`/schedules/${scheduleId}`);
      return scheduleId;
    },
    onSuccess: () => {
      // Invalidate all schedule queries
      queryClient.invalidateQueries({ queryKey: scheduleKeys.all });
    },
  });
}

// Generate schedule shifts
export function useGenerateSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: string) => {
      const response = await api.post<ScheduleResponseDto>(`/schedules/${scheduleId}/generate`);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate the specific schedule to refresh shifts
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
    },
  });
}

// Publish schedule
export function usePublishSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: string) => {
      const response = await api.post<ScheduleResponseDto>(`/schedules/${scheduleId}/publish`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: scheduleKeys.stats(data.venueId) });
    },
  });
}

// AI optimize schedule
export function useOptimizeSchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (scheduleId: string) => {
      const response = await api.post<ScheduleResponseDto>(`/schedules/${scheduleId}/ai-optimize`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
    },
  });
}

