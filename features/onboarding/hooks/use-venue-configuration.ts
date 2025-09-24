"use client";

import { useState, useEffect } from 'react';

export interface DayHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  hasSiesta?: boolean;
  siestaStart?: string;
  siestaEnd?: string;
}

export interface VenueConfigurationData extends Record<string, unknown> {
  openingHours: Record<string, DayHours>;
  managerHourlyValue: number;
  weeklySchedulingHours: number;
  typicalOvertimeCost: number;
  averageStaffCount: number;
  hasDelivery: boolean;
  hasTakeaway: boolean;
  hasReservations: boolean;
  acceptsCreditCards: boolean;
  hasWifi: boolean;
  hasParking: boolean;
  isWheelchairAccessible: boolean;
  smokingPolicy: string;
  dressCode: string;
  noiseLevel: string;
}

export interface UseVenueConfigurationProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useVenueConfiguration({ initialData = {}, onDataChange }: UseVenueConfigurationProps) {
  const [formData, setFormData] = useState<VenueConfigurationData>({
    openingHours: (initialData.openingHours as Record<string, DayHours>) || {
      monday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '23:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '23:00' },
      sunday: { isOpen: true, openTime: '10:00', closeTime: '21:00' },
    },
    managerHourlyValue: (initialData.managerHourlyValue as number) || 25,
    weeklySchedulingHours: (initialData.weeklySchedulingHours as number) || 40,
    typicalOvertimeCost: (initialData.typicalOvertimeCost as number) || 1.5,
    averageStaffCount: (initialData.averageStaffCount as number) || 8,
    hasDelivery: (initialData.hasDelivery as boolean) || false,
    hasTakeaway: (initialData.hasTakeaway as boolean) || true,
    hasReservations: (initialData.hasReservations as boolean) || true,
    acceptsCreditCards: (initialData.acceptsCreditCards as boolean) || true,
    hasWifi: (initialData.hasWifi as boolean) || true,
    hasParking: (initialData.hasParking as boolean) || false,
    isWheelchairAccessible: (initialData.isWheelchairAccessible as boolean) || true,
    smokingPolicy: (initialData.smokingPolicy as string) || 'non-smoking',
    dressCode: (initialData.dressCode as string) || 'casual',
    noiseLevel: (initialData.noiseLevel as string) || 'moderate',
  });

  const [errors, setErrors] = useState<Partial<VenueConfigurationData>>({});

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const smokingPolicies = [
    { value: 'non-smoking', label: 'Non-smoking' },
    { value: 'smoking-allowed', label: 'Smoking allowed' },
    { value: 'outdoor-smoking', label: 'Outdoor smoking only' },
    { value: 'designated-area', label: 'Designated smoking area' },
  ];

  const dressCodes = [
    { value: 'casual', label: 'Casual' },
    { value: 'smart-casual', label: 'Smart casual' },
    { value: 'business', label: 'Business attire' },
    { value: 'formal', label: 'Formal' },
    { value: 'no-dress-code', label: 'No dress code' },
  ];

  const noiseLevels = [
    { value: 'quiet', label: 'Quiet' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'lively', label: 'Lively' },
    { value: 'loud', label: 'Loud' },
  ];

  // Sync form data to parent
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (field: keyof VenueConfigurationData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleDayHoursChange = (day: string, field: keyof DayHours, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          [field]: value,
          // Auto-set siesta times when enabled
          ...(field === 'hasSiesta' && value && !prev.openingHours[day].siestaStart ? {
            siestaStart: '13:00',
            siestaEnd: '16:00',
          } : {}),
        },
      },
    }));
  };

  const toggleDayOpen = (day: string) => {
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day],
          isOpen: !prev.openingHours[day].isOpen,
        },
      },
    }));
  };



  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.managerHourlyValue || formData.managerHourlyValue <= 0) {
      newErrors.managerHourlyValue = 'Manager hourly value must be greater than 0';
    }

    if (!formData.weeklySchedulingHours || formData.weeklySchedulingHours <= 0) {
      newErrors.weeklySchedulingHours = 'Weekly scheduling hours must be greater than 0';
    }

    if (!formData.averageStaffCount || formData.averageStaffCount <= 0) {
      newErrors.averageStaffCount = 'Average staff count must be greater than 0';
    }

    // Check if at least one day is open
    const hasOpenDay = Object.values(formData.openingHours).some(day => day.isOpen);
    if (!hasOpenDay) {
      newErrors.openingHours = 'At least one day must be open';
    }

    setErrors(newErrors as Partial<VenueConfigurationData>);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    daysOfWeek,
    smokingPolicies,
    dressCodes,
    noiseLevels,
    handleInputChange,
    handleDayHoursChange,
    toggleDayOpen,
    validateForm,
  };
}
