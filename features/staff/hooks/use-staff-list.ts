"use client";

import { useState, useMemo, useCallback } from 'react';
import { 
  useStaffByVenue, 
  useDeleteStaff, 
  useToggleStaffActive,
  useGenerateStaffAccessToken,
  useRevokeStaffAccessToken 
} from './use-staff';
import { useActiveRolesByVenue } from './use-roles';
import type { StaffResponseDto, ContractType } from '../types';

interface UseStaffListProps {
  venueId: string;
}

export function useStaffList({ venueId }: UseStaffListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  // Fetch data
  const { data: staff = [], isLoading, error } = useStaffByVenue(venueId);
  const { data: roles = [] } = useActiveRolesByVenue(venueId);

  // Mutations
  const deleteStaff = useDeleteStaff(venueId);
  const toggleStaffActive = useToggleStaffActive(venueId);
  const generateAccessToken = useGenerateStaffAccessToken(venueId);
  const revokeAccessToken = useRevokeStaffAccessToken(venueId);

  // Filter staff
  const filteredStaff = useMemo(() => {
    return staff.filter(member => {
      const matchesSearch = 
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.phone && member.phone.includes(searchTerm));
      
      const matchesRole = !selectedRole || member.primaryRoleId === selectedRole;
      const matchesStatus = !showActiveOnly || member.isActive;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staff, searchTerm, selectedRole, showActiveOnly]);

  // Action handlers
  const handleDeleteStaff = useCallback(async (id: string) => {
    const member = staff.find(s => s.id === id);
    const name = member ? member.fullName : 'this staff member';
    
    if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      deleteStaff.mutate(id);
    }
  }, [deleteStaff, staff]);

  const handleToggleActive = useCallback((id: string, isActive: boolean) => {
    toggleStaffActive.mutate(id);
  }, [toggleStaffActive]);

  const handleGenerateToken = useCallback((id: string) => {
    generateAccessToken.mutate(id);
  }, [generateAccessToken]);

  const handleRevokeToken = useCallback((id: string) => {
    revokeAccessToken.mutate(id);
  }, [revokeAccessToken]);


  return {
    // Data
    staff: filteredStaff,
    roles,
    isLoading,
    error,
    
    // Filter state
    searchTerm,
    setSearchTerm,
    selectedRole,
    setSelectedRole,
    showActiveOnly,
    setShowActiveOnly,
    
    // Action handlers
    handleDeleteStaff,
    handleToggleActive,
    handleGenerateToken,
    handleRevokeToken,
    
    // Loading states
    isDeleting: deleteStaff.isPending,
    isToggling: toggleStaffActive.isPending,
    isGeneratingToken: generateAccessToken.isPending,
    isRevokingToken: revokeAccessToken.isPending,
  };
}
