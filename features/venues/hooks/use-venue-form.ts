"use client";

import { useState, useEffect, useCallback } from 'react';
import type { VenueFormData } from './use-venue-management';
import { timeToMinutes, minutesToTime } from '../types';

interface UseVenueFormProps {
  initialData?: VenueFormData;
  onSubmit: (data: VenueFormData) => void;
}

export function useVenueForm({ initialData, onSubmit }: UseVenueFormProps) {
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    timezone: 'Europe/Rome',
    address: '',
    phone: '',
    email: '',
    openingTime: '09:00',
    closingTime: '22:00',
    sector: '',
    managerHourlyValue: undefined,
    weeklySchedulingHours: undefined,
    typicalOvertimeCost: undefined,
    isActive: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof VenueFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof VenueFormData, boolean>>>({});

  // Initialize form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Validation
  const validate = useCallback((data: VenueFormData): Partial<Record<keyof VenueFormData, string>> => {
    const newErrors: Partial<Record<keyof VenueFormData, string>> = {};

    if (!data.name || data.name.trim().length === 0) {
      newErrors.name = 'Venue name is required';
    }

    if (!data.timezone) {
      newErrors.timezone = 'Timezone is required';
    }

    if (!data.openingTime) {
      newErrors.openingTime = 'Opening time is required';
    }

    if (!data.closingTime) {
      newErrors.closingTime = 'Closing time is required';
    }

    if (data.openingTime && data.closingTime) {
      const openMinutes = timeToMinutes(data.openingTime);
      const closeMinutes = timeToMinutes(data.closingTime);
      if (openMinutes >= closeMinutes) {
        newErrors.closingTime = 'Closing time must be after opening time';
      }
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (data.managerHourlyValue !== undefined && data.managerHourlyValue < 0) {
      newErrors.managerHourlyValue = 'Manager hourly value must be positive';
    }

    if (data.weeklySchedulingHours !== undefined && data.weeklySchedulingHours < 0) {
      newErrors.weeklySchedulingHours = 'Weekly scheduling hours must be positive';
    }

    if (data.typicalOvertimeCost !== undefined && data.typicalOvertimeCost < 1) {
      newErrors.typicalOvertimeCost = 'Overtime cost multiplier must be at least 1';
    }

    return newErrors;
  }, []);

  // Validate on data change
  useEffect(() => {
    const newErrors = validate(formData);
    setErrors(newErrors);
  }, [formData, validate]);

  const isValid = Object.keys(errors).length === 0;

  // Handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value ? parseFloat(value) : undefined) : value,
    }));

    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleAddressChange = useCallback((address: string) => {
    setFormData(prev => ({
      ...prev,
      address,
    }));

    setTouched(prev => ({
      ...prev,
      address: true,
    }));
  }, []);

  const handleSwitchChange = useCallback((name: keyof VenueFormData, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  }, []);

  const handleSelectChange = useCallback((name: keyof VenueFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Partial<Record<keyof VenueFormData, boolean>> = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key as keyof VenueFormData] = true;
    });
    setTouched(allTouched);

    // Validate
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit
    onSubmit(formData);
  }, [formData, onSubmit, validate]);

  return {
    formData,
    errors,
    touched,
    isValid,
    handleChange,
    handleAddressChange,
    handleSwitchChange,
    handleSelectChange,
    handleSubmit,
    setFormData,
  };
}
