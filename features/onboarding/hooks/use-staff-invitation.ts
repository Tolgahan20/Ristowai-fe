"use client";

import { useState, useEffect } from 'react';

export interface StaffMember {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsappNumber: string; // Mandatory WhatsApp number
  roleId: string;
  contractType: string; // User-selected contract type
  weeklyContractHours: number; // User-selected weekly hours
}

export interface Role {
  id: string;
  name: string;
}

export interface StaffInvitationData extends Record<string, unknown> {
  staffMembers: StaffMember[];
}

export interface UseStaffInvitationProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useStaffInvitation({ initialData = {}, onDataChange }: UseStaffInvitationProps) {
  // Ensure existing staff members have all required fields
  const migrateStaffMember = (member: any): StaffMember => ({
    firstName: member.firstName || '',
    lastName: member.lastName || '',
    email: member.email || '',
    phone: member.phone || '',
    whatsappNumber: member.whatsappNumber || '',
    roleId: member.roleId || '',
    contractType: member.contractType || '',
    weeklyContractHours: member.weeklyContractHours || 40,
  });

  const [formData, setFormData] = useState<StaffInvitationData>({
    staffMembers: (initialData.staffMembers as any[])?.map(migrateStaffMember) || [
      { 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        whatsappNumber: '', 
        roleId: '', 
        contractType: '',
        weeklyContractHours: 40 
      }
    ],
  });

  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

  // Extract roles from previous step or stepData - convert to Role format with IDs
  const roles: Role[] = ((initialData.roles as any[]) || []).map((role, index) => ({
    id: role.id || role._id || `role_${index}`, // Use existing ID or generate one
    name: role.name || role.title || `Role ${index + 1}`, // Handle different name properties
  })).filter(role => role.name); // Only include roles with valid names

  // Don't automatically update parent - avoid infinite loops

  const addStaffMember = () => {
    setFormData(prev => ({
      ...prev,
      staffMembers: [...prev.staffMembers, { 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        whatsappNumber: '', 
        roleId: '', 
        contractType: '',
        weeklyContractHours: 40 
      }],
    }));
  };

  const removeStaffMember = (index: number) => {
    if (formData.staffMembers.length > 1) {
      setFormData(prev => ({
        ...prev,
        staffMembers: prev.staffMembers.filter((_, i) => i !== index),
      }));
      
      // Clear errors for removed staff member
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updateStaffMember = (index: number, field: keyof StaffMember, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      staffMembers: prev.staffMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      ),
    }));

    // Clear error when field is updated
    if (value) {
      const newErrors = { ...errors };
      if (newErrors[index]) {
        delete newErrors[index][field];
        if (Object.keys(newErrors[index]).length === 0) {
          delete newErrors[index];
        }
      }
      setErrors(newErrors);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStaffMembers = () => {
    const newErrors: Record<number, Record<string, string>> = {};
    let isValid = true;

    formData.staffMembers.forEach((member, index) => {
      const memberErrors: Record<string, string> = {};

      if (!member.firstName.trim()) {
        memberErrors.firstName = 'First name is required';
        isValid = false;
      }

      if (!member.lastName.trim()) {
        memberErrors.lastName = 'Last name is required';
        isValid = false;
      }

      if (!member.email.trim()) {
        memberErrors.email = 'Email is required';
        isValid = false;
      } else if (!validateEmail(member.email)) {
        memberErrors.email = 'Please enter a valid email address';
        isValid = false;
      }

      if (!member.roleId) {
        memberErrors.roleId = 'Please select a role';
        isValid = false;
      }

      if (Object.keys(memberErrors).length > 0) {
        newErrors[index] = memberErrors;
      }
    });

    // Check for duplicate emails
    const emailCounts: Record<string, number[]> = {};
    formData.staffMembers.forEach((member, index) => {
      if (member.email.trim()) {
        const email = member.email.toLowerCase();
        if (!emailCounts[email]) {
          emailCounts[email] = [];
        }
        emailCounts[email].push(index);
      }
    });

    Object.entries(emailCounts).forEach(([, indices]) => {
      if (indices.length > 1) {
        indices.forEach(index => {
          if (!newErrors[index]) newErrors[index] = {};
          newErrors[index].email = 'Email must be unique';
          isValid = false;
        });
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const getRoleName = (roleId: string): string => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  };

  const getValidStaffCount = () => {
    return formData.staffMembers.filter(member => 
      member.firstName.trim() && member.lastName.trim() && member.email.trim() && member.roleId
    ).length;
  };

  const hasErrors = (index: number) => {
    return errors[index] && Object.keys(errors[index]).length > 0;
  };

  const getFieldError = (index: number, field: string) => {
    return errors[index]?.[field];
  };

  return {
    formData,
    errors,
    roles,
    addStaffMember,
    removeStaffMember,
    updateStaffMember,
    validateStaffMembers,
    getRoleName,
    getValidStaffCount,
    hasErrors,
    getFieldError,
  };
}
