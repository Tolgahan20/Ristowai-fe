import { useState, useCallback } from 'react';
import type { VenueFormData, CreateVenueRequest, UpdateVenueRequest, VenueResponseDto } from '../types';
import { timeToMinutes, minutesToTime } from '../types';

interface UseVenueFormProps {
  initialData?: VenueResponseDto;
  onSubmit: (data: CreateVenueRequest | UpdateVenueRequest) => Promise<void>;
  onCancel?: () => void;
}

interface FormErrors {
  [key: string]: string;
}

export function useVenueForm({ initialData, onSubmit, onCancel }: UseVenueFormProps) {
  const [formData, setFormData] = useState<VenueFormData>({
    name: initialData?.name || '',
    timezone: initialData?.timezone || 'Europe/Rome',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    openingTime: initialData ? minutesToTime(initialData.openingMinute) : '06:00',
    closingTime: initialData ? minutesToTime(initialData.closingMinute) : '22:00',
    sector: initialData?.sector || '',
    currency: initialData?.currency || 'EUR',
    locale: initialData?.locale || 'it-IT',
    managerHourlyValue: initialData?.managerHourlyValue || 25,
    weeklySchedulingHours: initialData?.weeklySchedulingHours || 4,
    typicalOvertimeCost: initialData?.typicalOvertimeCost || 200,
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback((data: VenueFormData): FormErrors => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!data.name.trim()) {
      newErrors.name = 'Venue name is required';
    } else if (data.name.length < 2) {
      newErrors.name = 'Venue name must be at least 2 characters';
    }

    if (!data.timezone.trim()) {
      newErrors.timezone = 'Timezone is required';
    }

    // Validate email if provided
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone if provided
    if (data.phone && data.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.openingTime)) {
      newErrors.openingTime = 'Please enter a valid opening time (HH:MM)';
    }
    if (!timeRegex.test(data.closingTime)) {
      newErrors.closingTime = 'Please enter a valid closing time (HH:MM)';
    }

    // Validate time range
    if (data.openingTime && data.closingTime) {
      const openingMinutes = timeToMinutes(data.openingTime);
      const closingMinutes = timeToMinutes(data.closingTime);
      
      if (openingMinutes >= closingMinutes) {
        newErrors.closingTime = 'Closing time must be after opening time';
      }
    }

    // Validate hourly rate
    if (data.managerHourlyValue && (data.managerHourlyValue < 0 || data.managerHourlyValue > 1000)) {
      newErrors.managerHourlyValue = 'Please enter a valid hourly rate (0-1000)';
    }

    // Validate weekly hours
    if (data.weeklySchedulingHours && (data.weeklySchedulingHours < 0 || data.weeklySchedulingHours > 168)) {
      newErrors.weeklySchedulingHours = 'Please enter valid weekly hours (0-168)';
    }

    // Validate overtime cost
    if (data.typicalOvertimeCost && (data.typicalOvertimeCost < 0 || data.typicalOvertimeCost > 10000)) {
      newErrors.typicalOvertimeCost = 'Please enter a valid overtime cost (0-10000)';
    }

    return newErrors;
  }, []);

  const handleInputChange = useCallback((field: keyof VenueFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(async () => {
    const formErrors = validateForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Convert form data to API format
      const { openingTime, closingTime, ...restData } = formData;
      const submitData = {
        ...restData,
        openingMinute: timeToMinutes(openingTime),
        closingMinute: timeToMinutes(closingTime),
      };

      await onSubmit(submitData);
    } catch (error: any) {
      // Handle validation errors from API
      if (error?.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  const resetForm = useCallback(() => {
    setFormData({
      name: initialData?.name || '',
      timezone: initialData?.timezone || 'Europe/Rome',
      address: initialData?.address || '',
      phone: initialData?.phone || '',
      email: initialData?.email || '',
      openingTime: initialData ? minutesToTime(initialData.openingMinute) : '06:00',
      closingTime: initialData ? minutesToTime(initialData.closingMinute) : '22:00',
      sector: initialData?.sector || '',
      currency: initialData?.currency || 'EUR',
      locale: initialData?.locale || 'it-IT',
      managerHourlyValue: initialData?.managerHourlyValue || 25,
      weeklySchedulingHours: initialData?.weeklySchedulingHours || 4,
      typicalOvertimeCost: initialData?.typicalOvertimeCost || 200,
      isActive: initialData?.isActive ?? true,
    });
    setErrors({});
  }, [initialData]);

  const isValid = Object.keys(validateForm(formData)).length === 0;

  return {
    formData,
    errors,
    isSubmitting,
    isValid,
    handleInputChange,
    handleSubmit,
    handleCancel,
    resetForm,
  };
}
