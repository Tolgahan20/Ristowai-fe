"use client";

import { useState, useEffect } from 'react';

export interface Role {
  id?: string; // Include ID for existing roles
  name: string;
  description?: string;
  hourlyRate?: number;
  level?: string;
  isCritical?: boolean;
}

export interface RoleCreationData extends Record<string, unknown> {
  roles: Role[];
}

export interface UseRoleCreationProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useRoleCreation({ initialData = {} }: Omit<UseRoleCreationProps, 'onDataChange'>) {
  const [formData, setFormData] = useState<RoleCreationData>(() => {
    if (initialData.roles && Array.isArray(initialData.roles) && initialData.roles.length > 0) {
      return {
        roles: (initialData.roles as Role[]).map(role => ({
          ...role,
          description: role.description || '',
          hourlyRate: role.hourlyRate, // Keep exact value, including 0
        }))
      };
    }
    return { roles: [{ name: '', description: '', hourlyRate: 15 }] };
  });

  // Update formData when initialData.roles becomes available
  useEffect(() => {
    if (initialData.roles && Array.isArray(initialData.roles) && initialData.roles.length > 0) {
      // Only update if we don't already have the roles loaded
      if (formData.roles.length === 1 && !formData.roles[0].name) {
        setFormData({
          roles: (initialData.roles as Role[]).map(role => ({
            ...role,
            description: role.description || '',
            hourlyRate: role.hourlyRate, // Keep exact value, including 0
          }))
        });
      }
    }
  }, [initialData.roles, formData.roles]);

  const [errors, setErrors] = useState<Record<number, string>>({});

  const commonRoles = [
    { name: 'Manager', description: 'Oversees daily operations and staff management', hourlyRate: 25 },
    { name: 'Assistant Manager', description: 'Supports management and handles shift supervision', hourlyRate: 20 },
    { name: 'Barista', description: 'Prepares coffee drinks and serves customers', hourlyRate: 15 },
    { name: 'Server', description: 'Takes orders and serves food and beverages', hourlyRate: 14 },
    { name: 'Chef', description: 'Prepares food and manages kitchen operations', hourlyRate: 22 },
    { name: 'Cook', description: 'Prepares food under chef supervision', hourlyRate: 17 },
    { name: 'Cashier', description: 'Handles customer payments and basic service', hourlyRate: 13 },
    { name: 'Host/Hostess', description: 'Greets customers and manages seating', hourlyRate: 12 },
  ];


  // Don't automatically update parent - let the component handle it manually

  const addRole = () => {
    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { name: '', description: '', hourlyRate: 15 }],
    }));
  };

  const removeRole = (index: number) => {
    if (formData.roles.length > 1) {
      setFormData(prev => ({
        ...prev,
        roles: prev.roles.filter((_, i) => i !== index),
      }));
      
      // Clear error for removed role
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const updateRole = (index: number, field: keyof Role, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => 
        i === index ? { ...role, [field]: value } : role
      ),
    }));

    // Clear error when field is updated
    if (field === 'name' && value) {
      const newErrors = { ...errors };
      delete newErrors[index];
      setErrors(newErrors);
    }
  };

  const addCommonRole = (commonRole: typeof commonRoles[0]) => {
    // Check if role with same name already exists
    const exists = formData.roles.some(role => 
      role.name.toLowerCase() === commonRole.name.toLowerCase()
    );
    if (exists) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      roles: [...prev.roles, { ...commonRole }],
    }));
  };

  const validateRoles = () => {
    const newErrors: Record<number, string> = {};
    let isValid = true;

    formData.roles.forEach((role, index) => {
      if (!role.name.trim()) {
        newErrors[index] = 'Role name is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const getValidRolesCount = () => {
    return formData.roles.filter(role => role.name.trim()).length;
  };

  const getTotalHourlyCost = () => {
    return formData.roles
      .filter(role => role.name.trim() && role.hourlyRate)
      .reduce((sum, role) => sum + (role.hourlyRate || 0), 0);
  };

  const isCommonRoleAdded = (roleName: string) => {
    return formData.roles.some(role => 
      role.name.toLowerCase() === roleName.toLowerCase()
    );
  };

  const getValidRoles = () => {
    return formData.roles.filter(role => role.name.trim());
  };

  return {
    formData,
    errors,
    commonRoles,
    addRole,
    removeRole,
    updateRole,
    addCommonRole,
    validateRoles,
    getValidRolesCount,
    getTotalHourlyCost,
    isCommonRoleAdded,
    getValidRoles,
  };
}
