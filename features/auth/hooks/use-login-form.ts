"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from './use-auth';
import { MESSAGES } from '@/constants/messages';
import type { LoginRequest } from '../types';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface UseLoginFormReturn {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  isSubmitting: boolean;
  showResendVerification: boolean;
  handleInputChange: (field: keyof LoginFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
  clearError: (field: keyof LoginFormErrors) => void;
}

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  rememberMe: false,
};

export function useLoginForm(): UseLoginFormReturn {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  
  const router = useRouter();
  const loginMutation = useLogin();

  const validateForm = useCallback((): boolean => {
    const newErrors: LoginFormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_REQUIRED;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_INVALID;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[field as keyof LoginFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
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

      // Prepare login data
      const loginData: LoginRequest = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        rememberMe: formData.rememberMe,
      };

      // Attempt login
      const loginResponse = await loginMutation.mutateAsync(loginData);

      // Reset form on success
      setFormData(initialFormData);
      setErrors({});

      // Check if user has completed onboarding
      if (!loginResponse.user.hasCompletedOnboarding) {
        // Redirect to onboarding if not completed
        router.push('/onboarding');
      } else {
        // Redirect to dashboard or intended page
        const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/dashboard';
        router.push(redirectTo);
      }

    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Handle different types of errors
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number; data?: { message?: string } } };
        
        switch (axiosError.response.status) {
          case 400:
            // Check if this is an email verification error
            const errorMessage = axiosError.response.data?.message || '';
            if (errorMessage.includes('not verified') || errorMessage.includes('email not verified')) {
              setErrors(prev => ({ 
                ...prev, 
                general: 'Your email address has not been verified. Please check your email or resend the verification code.' 
              }));
              setShowResendVerification(true);
            } else {
              setErrors(prev => ({ 
                ...prev, 
                general: errorMessage || MESSAGES.ERROR.VALIDATION_ERROR 
              }));
            }
            break;
          case 401:
            setErrors(prev => ({ 
              ...prev, 
              general: MESSAGES.ERROR.INVALID_CREDENTIALS 
            }));
            break;
          case 403:
            setErrors(prev => ({ 
              ...prev, 
              general: MESSAGES.ERROR.ACCOUNT_LOCKED 
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
  }, [formData, isSubmitting, validateForm, loginMutation, router]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: keyof LoginFormErrors) => {
    setErrors(prev => ({
      ...prev,
      [field]: undefined,
    }));
  }, []);

  return {
    formData,
    errors,
    isLoading: loginMutation.isPending,
    isSubmitting,
    showResendVerification,
    handleInputChange,
    handleSubmit,
    clearErrors,
    clearError,
  };
}
