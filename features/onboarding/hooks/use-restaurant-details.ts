"use client";

import { useState, useEffect } from 'react';

export interface RestaurantData extends Record<string, unknown> {
  name: string;
  restaurantType: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
  latitude: number | null;
  longitude: number | null;
}

export interface UseRestaurantDetailsProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useRestaurantDetails({ initialData = {}, onDataChange }: UseRestaurantDetailsProps) {
  const [formData, setFormData] = useState<RestaurantData>({
    name: (initialData.name as string) || '',
    restaurantType: (initialData.restaurantType as string) || '',
    address: (initialData.address as string) || '',
    description: (initialData.description as string) || '',
    phone: (initialData.phone as string) || '',
    email: (initialData.email as string) || '',
    website: (initialData.website as string) || '',
    logoUrl: (initialData.logoUrl as string) || '',
    latitude: (initialData.latitude as number) || null,
    longitude: (initialData.longitude as number) || null,
  });

  const [errors, setErrors] = useState<Partial<RestaurantData>>({});

  const restaurantTypes = [
    'Fast Food',
    'Fast Casual',
    'Casual Dining',
    'Fine Dining',
    'Cafe',
    'Bakery',
    'Food Truck',
    'Bar & Grill',
    'Pizza',
    'Other'
  ];

  const daysOfWeek = [
    'monday',
    'tuesday', 
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ];

  // Update parent component when form data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (field: keyof RestaurantData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RestaurantData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Restaurant name is required';
    }

    if (!formData.restaurantType) {
      newErrors.restaurantType = 'Restaurant type is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid Italian phone number (e.g., +39 081 123 4567)';
    }

    if (formData.website && !/^https?:\/\/[^\s]+$/.test(formData.website)) {
      newErrors.website = 'Please enter a valid website URL (e.g., https://example.com)';
    }

    if (formData.logoUrl && !/^https?:\/\/[^\s]+$/.test(formData.logoUrl)) {
      newErrors.logoUrl = 'Please enter a valid logo image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleAddressSelect = (address: string, placeDetails?: unknown) => {
    handleInputChange('address', address);
    
    // Extract latitude and longitude from Google Places API response
    if (placeDetails && typeof placeDetails === 'object' && placeDetails !== null) {
      const details = placeDetails as {
        geometry?: {
          location?: {
            lat: number | (() => number);
            lng: number | (() => number);
          };
        };
      };
      
      if (details.geometry?.location) {
        const lat = typeof details.geometry.location.lat === 'function' 
          ? details.geometry.location.lat()
          : details.geometry.location.lat;
        const lng = typeof details.geometry.location.lng === 'function'
          ? details.geometry.location.lng()
          : details.geometry.location.lng;
        
        if (typeof lat === 'number' && typeof lng === 'number') {
          setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
          }));
        }
      }
    }
  };


  return {
    formData,
    errors,
    restaurantTypes,
    daysOfWeek,
    handleInputChange,
    validateForm,
    handleAddressSelect,
  };
}
