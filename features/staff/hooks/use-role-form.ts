"use client";

import { useState, useCallback } from 'react';
import { MESSAGES } from '@/constants/messages';
import type { RoleFormData, FormErrors, CreateRoleRequest, UpdateRoleRequest, RoleResponseDto } from '../types';

export interface UseRoleFormProps {
  initialData?: RoleResponseDto;
  onSuccess?: () => void;
}

export interface UseRoleFormReturn {
  formData: RoleFormData;
  errors: FormErrors;
  isValid: boolean;
  isDirty: boolean;
  handleInputChange: (field: keyof RoleFormData, value: string | number | boolean) => void;
  setFormData: (data: Partial<RoleFormData>) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  clearErrors: () => void;
  clearError: (field: string) => void;
  getSubmitData: () => CreateRoleRequest | UpdateRoleRequest;
}

const initialFormData: RoleFormData = {
  name: '',
  level: '',
  description: '',
  hourlyRate: 15,
  isActive: true,
};

export function useRoleForm({ initialData, onSuccess }: UseRoleFormProps = {}): UseRoleFormReturn {
  const [formData, setFormDataState] = useState<RoleFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        level: initialData.level || '',
        description: initialData.description || '',
        hourlyRate: initialData.hourlyRate || 15,
        isActive: initialData.isActive,
      };
    }
    return initialFormData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = MESSAGES.VALIDATION.REQUIRED_FIELD;
    } else if (formData.name.length < 2) {
      newErrors.name = 'Role name must be at least 2 characters';
    }

    if (formData.hourlyRate <= 0) {
      newErrors.hourlyRate = MESSAGES.VALIDATION.INVALID_HOURLY_RATE;
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof RoleFormData, value: string | number | boolean) => {
    setFormDataState(prev => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  }, [errors]);

  const setFormData = useCallback((data: Partial<RoleFormData>) => {
    setFormDataState(prev => ({
      ...prev,
      ...data,
    }));
    setIsDirty(true);
  }, []);

  const resetForm = useCallback(() => {
    if (initialData) {
      setFormDataState({
        name: initialData.name,
        level: initialData.level || '',
        description: initialData.description || '',
        hourlyRate: initialData.hourlyRate || 15,
        isActive: initialData.isActive,
      });
    } else {
      setFormDataState(initialFormData);
    }
    setErrors({});
    setIsDirty(false);
  }, [initialData]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  const getSubmitData = useCallback((): CreateRoleRequest | UpdateRoleRequest => {
    return {
      name: formData.name.trim(),
      level: formData.level.trim() || undefined,
      description: formData.description.trim() || undefined,
      hourlyRate: formData.hourlyRate || undefined,
      isActive: formData.isActive,
    };
  }, [formData]);

  const isValid = Object.keys(errors).length === 0 && formData.name.trim().length >= 2;

  return {
    formData,
    errors,
    isValid,
    isDirty,
    handleInputChange,
    setFormData,
    validateForm,
    resetForm,
    clearErrors,
    clearError,
    getSubmitData,
  };
}
