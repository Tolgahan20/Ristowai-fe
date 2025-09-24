import { useState } from 'react';
import { useUpdateStaffOvertimeHours, useToggleStaffActive, useDeleteStaff } from './use-staff';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type { StaffResponseDto, ContractType } from '../types';

export function useStaffDetails(staff: StaffResponseDto | null | undefined) {
  const [isEditingOvertime, setIsEditingOvertime] = useState(false);
  const [overtimeHours, setOvertimeHours] = useState(staff?.annualOvertimeLimit?.toString() || '0');

  // Initialize hooks always (not conditionally)
  const updateOvertimeMutation = useUpdateStaffOvertimeHours(staff?.venueId || '');
  const toggleActiveMutation = useToggleStaffActive(staff?.venueId || '');
  const deleteStaffMutation = useDeleteStaff(staff?.venueId || '');

  const getContractTypeLabel = (type: ContractType): string => {
    const labels = {
      full_time: 'Full-time',
      part_time: 'Part-time',
      temporary: 'Temporary',
      freelance: 'Freelance',
      intern: 'Intern',
      contract: 'Contract'
    };
    return labels[type] || type;
  };

  const minutesToTimeString = (minutes?: number): string => {
    if (!minutes) return 'Not set';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const handleToggleActive = () => {
    if (!staff) return;
    
    toggleActiveMutation.mutate(staff.id, {
      onSuccess: () => showToast.success(
        staff.isActive ? MESSAGES.STAFF.STATUS_TOGGLED : MESSAGES.STAFF.STATUS_TOGGLED
      ),
      onError: () => showToast.error(MESSAGES.STAFF.UPDATED)
    });
  };


  const handleDelete = (onBack: () => void) => {
    if (!staff) return;
    
    if (confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
      deleteStaffMutation.mutate(staff.id, {
        onSuccess: () => {
          showToast.success(MESSAGES.STAFF.DELETED);
          onBack();
        },
        onError: () => showToast.error(MESSAGES.STAFF.DELETED)
      });
    }
  };

  const handleSaveOvertime = () => {
    if (!staff) return;
    
    updateOvertimeMutation.mutate(
      { 
        id: staff.id, 
        hours: parseInt(overtimeHours) 
      },
      {
        onSuccess: () => setIsEditingOvertime(false),
        onError: () => showToast.error(MESSAGES.STAFF.UPDATED)
      }
    );
  };

  const startEditingOvertime = () => {
    setIsEditingOvertime(true);
  };

  const cancelEditingOvertime = () => {
    setIsEditingOvertime(false);
    setOvertimeHours(staff?.annualOvertimeLimit?.toString() || '0');
  };

  return {
    // State
    isEditingOvertime,
    overtimeHours,
    setOvertimeHours,
    
    // Mutations
    updateOvertimeMutation,
    toggleActiveMutation,
    deleteStaffMutation,
    
    // Handlers
    handleToggleActive,
    handleDelete,
    handleSaveOvertime,
    startEditingOvertime,
    cancelEditingOvertime,
    
    // Utilities
    getContractTypeLabel,
    minutesToTimeString,
  };
}
