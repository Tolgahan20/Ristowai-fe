"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from './use-auth';
import { MESSAGES } from '@/constants/messages';
import type { RegisterRequest } from '../types';

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
}

export interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  acceptTerms?: string;
  general?: string;
}

export interface UseRegisterFormReturn {
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  isLoading: boolean;
  isSubmitting: boolean;
  handleInputChange: (field: keyof RegisterFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
  clearError: (field: keyof RegisterFormErrors) => void;
}

const initialFormData: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  acceptTerms: false,
  acceptMarketing: false,
};

export function useRegisterForm(): UseRegisterFormReturn {
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const registerMutation = useRegister();

  const validateForm = useCallback((): boolean => {
    const newErrors: RegisterFormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = MESSAGES.VALIDATION.FIRST_NAME_REQUIRED;
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = MESSAGES.VALIDATION.FIRST_NAME_MIN_LENGTH;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = MESSAGES.VALIDATION.LAST_NAME_REQUIRED;
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = MESSAGES.VALIDATION.LAST_NAME_MIN_LENGTH;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_REQUIRED;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_INVALID;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_REQUIRED;
    } else if (formData.password.length < 8) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH_REGISTER;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_STRENGTH;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = MESSAGES.VALIDATION.CONFIRM_PASSWORD_REQUIRED;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = MESSAGES.VALIDATION.PASSWORDS_DO_NOT_MATCH;
    }

    // Phone validation (optional but if provided, must be valid Italian format)
    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/\s|-|\(|\)/g, '');
      // Italian phone number formats: +39xxxxxxxxxx or 39xxxxxxxxxx or xxxxxxxxxx (10 digits)
      const italianPhoneRegex = /^(\+39|39)?[0-9]{10}$/;
      if (!italianPhoneRegex.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid Italian phone number (e.g., +39 123 456 7890)';
      }
    }

    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = MESSAGES.VALIDATION.TERMS_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof RegisterFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[field as keyof RegisterFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Clear confirm password error when password changes
    if (field === 'password' && errors.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: undefined,
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors(prev => ({ ...prev, general: undefined }));

    try {
      // Validate form
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      // Prepare registration data - start with required fields only
      const registerData: RegisterRequest = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      // Add optional fields only if they have values
      if (formData.phone.trim()) {
        // Normalize Italian phone number format
        let normalizedPhone = formData.phone.replace(/\s|-|\(|\)/g, '');
        // Add +39 prefix if not present
        if (!normalizedPhone.startsWith('+39') && !normalizedPhone.startsWith('39')) {
          normalizedPhone = '+39' + normalizedPhone;
        } else if (normalizedPhone.startsWith('39') && !normalizedPhone.startsWith('+39')) {
          normalizedPhone = '+' + normalizedPhone;
        }
        registerData.phone = normalizedPhone;
      }

      if (formData.acceptMarketing) {
        registerData.marketingOptIn = true;
      }

      if (formData.acceptTerms) {
        const now = new Date().toISOString();
        registerData.termsAcceptedAt = now;
        registerData.privacyPolicyAcceptedAt = now;
      }

      // Attempt registration
       await registerMutation.mutateAsync(registerData);


      // Reset form on success
      setFormData(initialFormData);
      setErrors({});

      // Redirect to verification page with email parameter
      // Note: Even if email sending fails, registration was successful
      const email = encodeURIComponent(formData.email.trim().toLowerCase());
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || `/auth/verify-email?email=${email}`;
      
      // Use setTimeout to ensure state updates are complete before redirect
      setTimeout(() => {
        router.push(redirectTo);
      }, 100);

    } catch (error: unknown) {
      console.error('Registration error:', error);
      
      // Handle different types of errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data?: { message?: string; errors?: Record<string, string[]> } } };
        
        switch (axiosError.response.status) {
          case 200:
          case 201:
            const email = encodeURIComponent(formData.email.trim().toLowerCase());
            const redirectTo = `/auth/verify-email?email=${email}`;
            setTimeout(() => {
              router.push(redirectTo);
            }, 100);
            return;
          case 400:
            // Handle validation errors from backend
            if (axiosError.response.data?.errors) {
              const backendErrors = axiosError.response.data.errors;
              const newErrors: RegisterFormErrors = {};
              
              Object.keys(backendErrors).forEach(field => {
                if (field in formData) {
                  newErrors[field as keyof RegisterFormErrors] = backendErrors[field][0];
                }
              });
              
              setErrors(prev => ({ ...prev, ...newErrors }));
            } else {
              setErrors(prev => ({ 
                ...prev, 
                general: axiosError.response.data?.message || MESSAGES.ERROR.VALIDATION_ERROR 
              }));
            }
            break;
          case 409:
            setErrors(prev => ({ 
              ...prev, 
              email: MESSAGES.ERROR.EMAIL_ALREADY_EXISTS 
            }));
            break;
          case 422:
            setErrors(prev => ({ 
              ...prev, 
              general: axiosError.response.data?.message || MESSAGES.ERROR.VALIDATION_ERROR 
            }));
            break;
          case 429:
            setErrors(prev => ({ 
              ...prev, 
              general: MESSAGES.ERROR.TOO_MANY_REQUESTS 
            }));
            break;
          case 500:
            setErrors(prev => ({ 
              ...prev, 
              general: MESSAGES.ERROR.SERVER_ERROR 
            }));
            break;
          default:
            setErrors(prev => ({ 
              ...prev, 
              general: axiosError.response.data?.message || MESSAGES.ERROR.NETWORK_ERROR 
            }));
        }
      } else {
        setErrors(prev => ({ 
          ...prev, 
          general: MESSAGES.ERROR.NETWORK_ERROR 
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, validateForm, registerMutation, router]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: keyof RegisterFormErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  return {
    formData,
    errors,
    isLoading: registerMutation.isPending,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    clearErrors,
    clearError,
  };
}