"use client";

import { useState, useEffect } from 'react';

export interface BusinessOperationsData extends Record<string, unknown> {
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  typicalOvertimeCost?: number;
  averageStaffCount?: number;
}

export interface UseBusinessOperationsProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useBusinessOperations({ initialData = {}, onDataChange }: UseBusinessOperationsProps) {
  const [formData, setFormData] = useState<BusinessOperationsData>({
    managerHourlyValue: (initialData.managerHourlyValue as number) || undefined,
    weeklySchedulingHours: (initialData.weeklySchedulingHours as number) || undefined,
    typicalOvertimeCost: (initialData.typicalOvertimeCost as number) || undefined,
    averageStaffCount: (initialData.averageStaffCount as number) || undefined,
  });

  const [errors, setErrors] = useState<Partial<BusinessOperationsData>>({});

  // Update parent component when form data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (field: keyof BusinessOperationsData, value: string) => {
    let parsedValue: number | undefined = undefined;
    
    if (value.trim() !== '') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        parsedValue = numValue;
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: parsedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BusinessOperationsData> = {};
    
    // All fields are optional, but if provided, they should be valid
    if (formData.managerHourlyValue !== undefined && formData.managerHourlyValue < 0) {
      (newErrors as any).managerHourlyValue = 'Manager hourly value must be positive';
    }
    
    if (formData.weeklySchedulingHours !== undefined && (formData.weeklySchedulingHours < 0 || formData.weeklySchedulingHours > 40)) {
      (newErrors as any).weeklySchedulingHours = 'Weekly scheduling hours must be between 0 and 40';
    }
    
    if (formData.typicalOvertimeCost !== undefined && formData.typicalOvertimeCost < 0) {
      (newErrors as any).typicalOvertimeCost = 'Overtime cost must be positive';
    }
    
    if (formData.averageStaffCount !== undefined && (formData.averageStaffCount < 1 || formData.averageStaffCount > 500)) {
      (newErrors as any).averageStaffCount = 'Staff count must be between 1 and 500';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
  };
}
