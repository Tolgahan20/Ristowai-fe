"use client";

import { useState, useEffect } from 'react';

export interface VenueData extends Record<string, unknown> {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  capacity: number;
  phone: string;
  email: string;
  description: string;
  timezone: string;
  currency: string;
  locale: string;
}

export interface UseVenueDetailsProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useVenueDetails({ initialData = {}, onDataChange }: UseVenueDetailsProps) {
  const [formData, setFormData] = useState<VenueData>({
    name: (initialData.name as string) || '',
    address: (initialData.address as string) || '',
    city: (initialData.city as string) || '',
    state: (initialData.state as string) || '',
    country: (initialData.country as string) || '',
    zipCode: (initialData.zipCode as string) || '',
    latitude: (initialData.latitude as number) || null,
    longitude: (initialData.longitude as number) || null,
    capacity: (initialData.capacity as number) || 0,
    phone: (initialData.phone as string) || '',
    email: (initialData.email as string) || '',
    description: (initialData.description as string) || '',
    timezone: (initialData.timezone as string) || 'Europe/Rome',
    currency: (initialData.currency as string) || 'EUR',
    locale: (initialData.locale as string) || 'it-IT',
  });

  const [errors, setErrors] = useState<Partial<VenueData>>({});

  const timezones = [
    'Europe/Rome',
    'Europe/London',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  const currencies = [
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'AUD', name: 'Australian Dollar (A$)' },
  ];

  const locales = [
    { code: 'it-IT', name: 'Italian (Italy)' },
    { code: 'en-US', name: 'English (United States)' },
    { code: 'en-GB', name: 'English (United Kingdom)' },
    { code: 'fr-FR', name: 'French (France)' },
    { code: 'de-DE', name: 'German (Germany)' },
    { code: 'es-ES', name: 'Spanish (Spain)' },
    { code: 'ja-JP', name: 'Japanese (Japan)' },
  ];

  // Sync form data to parent
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (field: keyof VenueData, value: string | number) => {
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


  const validateForm = (): boolean => {
    const newErrors: Partial<VenueData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Venue name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }


    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    timezones,
    currencies,
    locales,
    handleInputChange,
    validateForm,
  };
}
