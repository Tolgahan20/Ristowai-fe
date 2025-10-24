"use client";

import { useState, useCallback } from 'react';
import { useActiveRestaurants } from '@/features/restaurants/hooks/use-restaurant';
import { useVenuesByRestaurant } from '@/features/venues/hooks/use-venues';
import {
  useCreateSchedule,
  useUpdateSchedule,
  useDeleteSchedule,
  usePublishSchedule,
  useGenerateSchedule,
} from './use-schedules';
import type {
  ScheduleResponseDto,
  CreateScheduleRequest,
  UpdateScheduleRequest,
  GenerationGoals,
} from '../types';

type ViewMode = 'list' | 'create' | 'edit' | 'details';

// Form data type for UI
export interface ScheduleFormData {
  venueId: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  notes?: string;
  generationGoals?: GenerationGoals;
  lockManagerChoices?: boolean;
}

interface ScheduleManagementState {
  mode: ViewMode;
  selectedSchedule?: ScheduleResponseDto;
  selectedVenueId?: string;
}

export function useScheduleManagement() {
  const [state, setState] = useState<ScheduleManagementState>({
    mode: 'list',
  });

  // Get user's restaurant and venues
  const { data: restaurants = [] } = useActiveRestaurants();
  const restaurant = restaurants[0];
  const restaurantId = restaurant?.id || '';

  const { data: venues = [] } = useVenuesByRestaurant(restaurantId);
  const selectedVenue = venues.find((v) => v.id === state.selectedVenueId) || venues[0];

  // Mutations
  const createSchedule = useCreateSchedule();
  const updateSchedule = useUpdateSchedule();
  const deleteSchedule = useDeleteSchedule();
  const publishSchedule = usePublishSchedule();
  const generateSchedule = useGenerateSchedule();

  // Navigation handlers
  const handleCreateSchedule = useCallback(() => {
    setState({ mode: 'create', selectedVenueId: selectedVenue?.id });
  }, [selectedVenue]);

  const handleEditSchedule = useCallback((schedule: ScheduleResponseDto) => {
    setState({ mode: 'edit', selectedSchedule: schedule, selectedVenueId: schedule.venueId });
  }, []);

  const handleViewSchedule = useCallback((schedule: ScheduleResponseDto) => {
    setState({ mode: 'details', selectedSchedule: schedule, selectedVenueId: schedule.venueId });
  }, []);

  const handleCancel = useCallback(() => {
    setState((prev) => ({ mode: 'list', selectedVenueId: prev.selectedVenueId }));
  }, []);

  const handleVenueChange = useCallback((venueId: string) => {
    setState((prev) => ({ ...prev, selectedVenueId: venueId }));
  }, []);

  // Form submission handler
  const handleFormSubmit = useCallback(
    (formData: ScheduleFormData) => {
      if (state.mode === 'create') {
        const createData: CreateScheduleRequest = {
          venueId: formData.venueId,
          name: formData.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          notes: formData.notes,
          generationGoals: formData.generationGoals,
          lockManagerChoices: formData.lockManagerChoices,
        };

        createSchedule.mutate(createData, {
          onSuccess: () => {
            setState((prev) => ({ mode: 'list', selectedVenueId: prev.selectedVenueId }));
          },
        });
      } else if ((state.mode === 'edit' || state.mode === 'details') && state.selectedSchedule) {
        const updateData: UpdateScheduleRequest = {
          name: formData.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          notes: formData.notes,
          generationGoals: formData.generationGoals,
          lockManagerChoices: formData.lockManagerChoices,
        };

        updateSchedule.mutate(
          { scheduleId: state.selectedSchedule.id, data: updateData },
          {
            onSuccess: () => {
              // Stay in details mode if we were editing from details view
              if (state.mode === 'details') {
                // The query will automatically refetch and update
                return;
              }
              setState((prev) => ({ mode: 'list', selectedVenueId: prev.selectedVenueId }));
            },
          }
        );
      }
    },
    [state.mode, state.selectedSchedule, createSchedule, updateSchedule]
  );

  // Delete handler
  const handleDeleteSchedule = useCallback(
    (scheduleId: string) => {
      deleteSchedule.mutate(scheduleId, {
        onSuccess: () => {
          if (state.selectedSchedule?.id === scheduleId) {
            setState((prev) => ({ mode: 'list', selectedVenueId: prev.selectedVenueId }));
          }
        },
      });
    },
    [deleteSchedule, state.selectedSchedule]
  );

  // Publish handler
  const handlePublishSchedule = useCallback(
    (scheduleId: string) => {
      publishSchedule.mutate(scheduleId);
    },
    [publishSchedule]
  );

  // Generate handler
  const handleGenerateSchedule = useCallback(
    (scheduleId: string) => {
      generateSchedule.mutate(scheduleId);
    },
    [generateSchedule]
  );

  const isLoading =
    createSchedule.isPending ||
    updateSchedule.isPending ||
    deleteSchedule.isPending ||
    publishSchedule.isPending ||
    generateSchedule.isPending;

  return {
    // State
    mode: state.mode,
    selectedSchedule: state.selectedSchedule,
    restaurant,
    restaurantId,
    venues,
    selectedVenue,

    // Loading state
    isLoading,

    // Handlers
    handleCreateSchedule,
    handleEditSchedule,
    handleViewSchedule,
    handleCancel,
    handleVenueChange,
    handleFormSubmit,
    handleDeleteSchedule,
    handlePublishSchedule,
    handleGenerateSchedule,
  };
}

