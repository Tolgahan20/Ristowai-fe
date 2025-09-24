"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyResetOTP, useResetPassword } from "./use-auth";

export function useResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyOtpMutation = useVerifyResetOTP();
  const resetPasswordMutation = useResetPassword();

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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !otp || otp.length !== 6) {
      setError("Please enter a valid email and 6-digit verification code");
      return;
    }

    try {
      await verifyOtpMutation.mutateAsync({ email, otp });
      setIsOtpVerified(true);
      setError("");
    } catch (error: unknown) {
      console.error('OTP verification error:', error);
      
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      
      if (axiosError?.response?.status === 400) {
        setError("Invalid or expired verification code. Please try again.");
      } else if (axiosError?.response?.status === 404) {
        setError("Email not found. Please check your email address.");
      } else if (axiosError?.response?.status === 429) {
        setError("Too many attempts. Please wait before trying again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({ 
        email, 
        otp, 
        newPassword 
      });
      
      setSuccess(true);
      setError("");

      // Redirect to login after successful password reset
      setTimeout(() => {
        router.push('/auth/login?message=password-reset-success');
      }, 2000);

    } catch (error: unknown) {
      console.error('Password reset error:', error);
      
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      
      if (axiosError?.response?.status === 400) {
        setError("Invalid or expired verification code. Please request a new one.");
      } else if (axiosError?.response?.status === 429) {
        setError("Too many attempts. Please wait before trying again.");
      } else {
        setError(axiosError?.response?.data?.message || "Failed to reset password. Please try again.");
      }
    }
  };

  const resetError = () => {
    setError("");
  };

  const goBackToOtp = () => {
    setIsOtpVerified(false);
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return {
    // Form state
    email,
    setEmail,
    otp,
    setOtp: handleOtpChange,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isOtpVerified,
    
    // Form handlers
    handleVerifyOtp,
    handleResetPassword,
    resetError,
    goBackToOtp,
    
    // Mutation state
    isVerifyingOtp: verifyOtpMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    
    // Navigation
    goToLogin: () => router.push('/auth/login'),
    goToForgotPassword: () => router.push('/auth/forgot-password'),
  };
}
