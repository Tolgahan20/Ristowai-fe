"use client";

import { useState, useCallback } from 'react';
import { useCreateStaff, useUpdateStaff } from './use-staff';
import type { StaffResponseDto, CreateStaffRequest, ContractType } from '../types';

type ViewMode = 'list' | 'create' | 'edit' | 'details';

// Form data type that matches what the StaffForm component sends
interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  primaryRoleId: string;
  contractType: ContractType;
  weeklyContractHours: number;
  hireDate: string;
  endDate?: string;
  isMinor: boolean;
  availabilityPreferences?: {
    daysOff?: number[];
    preferredStartTime?: string; // HH:MM format from form
    preferredEndTime?: string; // HH:MM format from form
    maxHoursPerDay?: number;
    maxHoursPerWeek?: number;
  };
}

interface StaffManagementState {
  mode: ViewMode;
  selectedStaff?: StaffResponseDto;
  selectedVenueId?: string;
  selectedVenueName?: string;
}

export function useStaffManagement() {
  const [state, setState] = useState<StaffManagementState>({ mode: 'list' });
  
  // Mutations - only create if we have a venue
  const createStaff = useCreateStaff(state.selectedVenueId || '');
  const updateStaff = useUpdateStaff(state.selectedVenueId || '');

  // Import the utility function instead of defining it here
  const timeStringToMinutes = useCallback((timeString: string | number | undefined): number => {
    if (!timeString) return 0;
    
    // If it's already a number, return it
    if (typeof timeString === 'number') return timeString;
    
    // If it's a string, convert it
    if (typeof timeString === 'string') {
      const [hours, minutes] = timeString.split(':').map(Number);
      return (hours || 0) * 60 + (minutes || 0);
    }
    
    return 0;
  }, []);

  // Venue selection handler
  const handleVenueSelect = useCallback((venueId: string, venueName: string) => {
    setState(prev => ({ 
      ...prev, 
      selectedVenueId: venueId, 
      selectedVenueName: venueName,
      mode: 'list' // Reset to list when venue changes
    }));
  }, []);

  // Navigation handlers
  const handleCreateStaff = useCallback(() => {
    setState(prev => ({ ...prev, mode: 'create' }));
  }, []);

  const handleEditStaff = useCallback((staff: StaffResponseDto) => {
    setState(prev => ({ ...prev, mode: 'edit', selectedStaff: staff }));
  }, []);

  const handleViewStaff = useCallback((staff: StaffResponseDto) => {
    setState(prev => ({ ...prev, mode: 'details', selectedStaff: staff }));
  }, []);

  const handleCancel = useCallback(() => {
    setState(prev => ({ ...prev, mode: 'list' }));
  }, []);

  const handleEditFromDetails = useCallback(() => {
    if (state.selectedStaff) {
      setState(prev => ({ ...prev, mode: 'edit', selectedStaff: state.selectedStaff }));
    }
  }, [state.selectedStaff]);

  // Form submission handler
  const handleFormSubmit = useCallback((formData: StaffFormData) => {
    // Convert form data to API format
    const apiData: CreateStaffRequest = {
      ...formData,
      // Remove empty strings for optional fields
      phone: formData.phone || undefined,
      endDate: formData.endDate || undefined,
      // Convert time strings to minutes if they exist
      availabilityPreferences: formData.availabilityPreferences ? {
        ...formData.availabilityPreferences,
        preferredStartTime: formData.availabilityPreferences.preferredStartTime 
          ? timeStringToMinutes(formData.availabilityPreferences.preferredStartTime) 
          : undefined,
        preferredEndTime: formData.availabilityPreferences.preferredEndTime 
          ? timeStringToMinutes(formData.availabilityPreferences.preferredEndTime) 
          : undefined,
      } : undefined,
    };

    if (state.mode === 'create') {
      createStaff.mutate(apiData, {
        onSuccess: () => {
          setState(prev => ({ ...prev, mode: 'list' }));
        },
      });
    } else if (state.mode === 'edit' && state.selectedStaff) {
      updateStaff.mutate(
        { id: state.selectedStaff.id, data: apiData },
        {
          onSuccess: () => {
            setState(prev => ({ ...prev, mode: 'list' }));
          },
        }
      );
    }
  }, [state.mode, state.selectedStaff, createStaff, updateStaff, timeStringToMinutes]);

  const isLoading = createStaff.isPending || updateStaff.isPending;

  return {
    // State
    mode: state.mode,
    selectedStaff: state.selectedStaff,
    selectedVenueId: state.selectedVenueId,
    selectedVenueName: state.selectedVenueName,
    isLoading,
    
    // Handlers
    handleVenueSelect,
    handleCreateStaff,
    handleEditStaff,
    handleViewStaff,
    handleCancel,
    handleEditFromDetails,
    handleFormSubmit,
  };
}

export type { StaffFormData };
