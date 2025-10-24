"use client";

import { useState, useCallback } from 'react';
import { useActiveRestaurants } from '@/features/restaurants/hooks/use-restaurant';
import { useCreateVenue, useUpdateVenue, useDeleteVenue, useToggleVenueActive } from './use-venues';
import type { VenueResponseDto, CreateVenueRequest, UpdateVenueRequest } from '../types';

type ViewMode = 'list' | 'create' | 'edit' | 'details';

// Form data type that matches what the VenueForm component will send
export interface VenueFormData {
  name: string;
  timezone: string;
  address?: string;
  phone?: string;
  email?: string;
  openingTime: string; // HH:MM format
  closingTime: string; // HH:MM format
  sector?: string;
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  typicalOvertimeCost?: number;
  isActive: boolean;
}

interface VenueManagementState {
  mode: ViewMode;
  selectedVenue?: VenueResponseDto;
}

export function useVenueManagement() {
  const [state, setState] = useState<VenueManagementState>({ mode: 'list' });
  
  // Get user's restaurant (single restaurant per user)
  const { data: restaurants = [] } = useActiveRestaurants();
  const restaurant = restaurants[0];
  const restaurantId = restaurant?.id || '';

  // Mutations
  const createVenue = useCreateVenue(restaurantId);
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();
  const toggleActive = useToggleVenueActive();

  // Utility to convert time string to minutes
  const timeStringToMinutes = useCallback((timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  }, []);

  // Navigation handlers
  const handleCreateVenue = useCallback(() => {
    setState({ mode: 'create' });
  }, []);

  const handleEditVenue = useCallback((venue: VenueResponseDto) => {
    setState({ mode: 'edit', selectedVenue: venue });
  }, []);

  const handleViewVenue = useCallback((venue: VenueResponseDto) => {
    setState({ mode: 'details', selectedVenue: venue });
  }, []);

  const handleCancel = useCallback(() => {
    setState({ mode: 'list' });
  }, []);

  const handleEditFromDetails = useCallback(() => {
    if (state.selectedVenue) {
      setState({ mode: 'edit', selectedVenue: state.selectedVenue });
    }
  }, [state.selectedVenue]);

  // Form submission handler
  const handleFormSubmit = useCallback((formData: VenueFormData) => {
    // Convert form data to API format
    const apiData: CreateVenueRequest = {
      name: formData.name,
      timezone: formData.timezone,
      openingMinute: timeStringToMinutes(formData.openingTime),
      closingMinute: timeStringToMinutes(formData.closingTime),
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      sector: formData.sector,
      managerHourlyValue: formData.managerHourlyValue,
      weeklySchedulingHours: formData.weeklySchedulingHours,
      typicalOvertimeCost: formData.typicalOvertimeCost,
      isActive: formData.isActive,
    };

    if (state.mode === 'create') {
      createVenue.mutate(apiData, {
        onSuccess: () => {
          setState({ mode: 'list' });
        },
      });
    } else if (state.mode === 'edit' && state.selectedVenue) {
      const updateData: UpdateVenueRequest = apiData;
      updateVenue.mutate(
        { venueId: state.selectedVenue.id, venueData: updateData },
        {
          onSuccess: () => {
            setState({ mode: 'list' });
          },
        }
      );
    }
  }, [state.mode, state.selectedVenue, createVenue, updateVenue, timeStringToMinutes]);

  // Delete handler
  const handleDeleteVenue = useCallback((venueId: string) => {
    deleteVenue.mutate(venueId, {
      onSuccess: () => {
        if (state.selectedVenue?.id === venueId) {
          setState({ mode: 'list' });
        }
      },
    });
  }, [deleteVenue, state.selectedVenue]);

  // Toggle active handler
  const handleToggleActive = useCallback((venueId: string) => {
    toggleActive.mutate(venueId);
  }, [toggleActive]);

  const isLoading = createVenue.isPending || updateVenue.isPending || deleteVenue.isPending;

  return {
    // State
    mode: state.mode,
    selectedVenue: state.selectedVenue,
    restaurant,
    restaurantId,
    isLoading,
    
    // Handlers
    handleCreateVenue,
    handleEditVenue,
    handleViewVenue,
    handleCancel,
    handleEditFromDetails,
    handleFormSubmit,
    handleDeleteVenue,
    handleToggleActive,
  };
}

