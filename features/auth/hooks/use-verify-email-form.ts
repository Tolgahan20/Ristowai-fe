"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "./use-auth";

export function useVerifyEmailForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyMutation = useVerifyEmail();

  // Pre-populate email from URL params
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleOtpChange = (value: string) => {
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !otp || otp.length !== 6) {
      setError("Please enter a valid email and 6-digit verification code");
      return;
    }

    try {
      await verifyMutation.mutateAsync({
        email,
        otp,
      });

      setSuccess(true);
      setError("");

      // Redirect to login after successful verification
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (error: unknown) {
      console.error('Verification error:', error);
      
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      
      if (axiosError?.response?.status === 400) {
        setError(axiosError?.response?.data?.message || "Invalid or expired verification code. Please try again.");
      } else if (axiosError?.response?.status === 404) {
        setError("Email not found. Please check your email address.");
      } else if (axiosError?.response?.status === 429) {
        setError("Too many attempts. Please wait before trying again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    }
  };

  const resetError = () => {
    setError("");
  };

  return {
    // Form state
    email,
    setEmail,
    otp,
    setOtp: handleOtpChange,
    error,
    success,
    
    // Form handlers
    handleSubmit,
    resetError,
    
    // Mutation state
    isVerifying: verifyMutation.isPending,
    
    // Navigation
    goToLogin: () => router.push('/auth/login'),
  };
}
