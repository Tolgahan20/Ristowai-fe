"use client";

import { useState, useEffect } from 'react';

export interface TimeSlot {
  open: string;
  close: string;
}

export interface DayHours {
  open: string;
  close: string;
  closed: boolean;
  // Support for siesta/split hours (e.g., Italian restaurants)
  hasSiesta?: boolean;
  siestaStart?: string;
  siestaEnd?: string;
  // Alternative: multiple time slots
  timeSlots?: TimeSlot[];
}

export interface RestaurantSettingsData extends Record<string, unknown> {
  timezone: string;
  openingHours: Record<string, DayHours>;
}

export interface UseRestaurantSettingsProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

const timezones = [
  { value: 'Europe/Rome', label: 'Central European Time (Italy)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (UK)' },
  { value: 'Europe/Paris', label: 'Central European Time (France)' },
  { value: 'Europe/Berlin', label: 'Central European Time (Germany)' },
  { value: 'Europe/Madrid', label: 'Central European Time (Spain)' },
  { value: 'America/New_York', label: 'Eastern Time (US)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US)' },
];

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

const defaultDayHours: DayHours = {
  open: '09:00',
  close: '22:00',
  closed: false,
  hasSiesta: false,
  siestaStart: '13:00',
  siestaEnd: '16:00',
};

export function useRestaurantSettings({ initialData = {}, onDataChange }: UseRestaurantSettingsProps) {
  const [formData, setFormData] = useState<RestaurantSettingsData>(() => {
    const existingHours = initialData.openingHours as Record<string, DayHours> || {};
    
    return {
      timezone: (initialData.timezone as string) || 'Europe/Rome',
      openingHours: {
        monday: existingHours.monday || { ...defaultDayHours },
        tuesday: existingHours.tuesday || { ...defaultDayHours },
        wednesday: existingHours.wednesday || { ...defaultDayHours },
        thursday: existingHours.thursday || { ...defaultDayHours },
        friday: existingHours.friday || { ...defaultDayHours, close: '23:00' },
        saturday: existingHours.saturday || { ...defaultDayHours, open: '10:00', close: '23:00' },
        sunday: existingHours.sunday || { ...defaultDayHours, open: '10:00', close: '21:00' },
      }
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update parent component when form data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleTimezoneChange = (timezone: string) => {
    setFormData(prev => ({ ...prev, timezone }));
  };

  const handleDayHoursChange = (day: string, field: keyof DayHours, value: string | boolean) => {
    setFormData(prev => {
      const updatedDay = {
        ...prev.openingHours[day],
        [field]: value,
      };

      // When enabling siesta, set default times if not already set
      if (field === 'hasSiesta' && value === true) {
        if (!updatedDay.siestaStart) {
          updatedDay.siestaStart = '13:00';
        }
        if (!updatedDay.siestaEnd) {
          updatedDay.siestaEnd = '16:00';
        }
      }

      return {
        ...prev,
        openingHours: {
          ...prev.openingHours,
          [day]: updatedDay,
        }
      };
    });

    // Clear errors for this day
    if (errors[day]) {
      setErrors(prev => ({ ...prev, [day]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate opening hours
    Object.entries(formData.openingHours).forEach(([day, hours]) => {
      if (!hours.closed) {
        if (!hours.open || !hours.close) {
          newErrors[day] = 'Please set opening and closing times';
        } else if (hours.open >= hours.close) {
          newErrors[day] = 'Opening time must be before closing time';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const copyToAllDays = (day: string) => {
    const sourceHours = formData.openingHours[day];
    const updatedHours = { ...formData.openingHours };
    
    daysOfWeek.forEach(({ key }) => {
      if (key !== day) {
        updatedHours[key] = { ...sourceHours };
      }
    });

    setFormData(prev => ({ ...prev, openingHours: updatedHours }));
  };

  return {
    formData,
    errors,
    timezones,
    daysOfWeek,
    handleTimezoneChange,
    handleDayHoursChange,
    validateForm,
    copyToAllDays,
  };
}
