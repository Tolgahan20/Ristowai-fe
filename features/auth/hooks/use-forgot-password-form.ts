"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForgotPassword } from "./use-auth";

export function useForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const router = useRouter();
  const forgotPasswordMutation = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync(email);
      setSuccess(true);
      setError("");

      // Redirect to reset password page with email after success
      setTimeout(() => {
        const encodedEmail = encodeURIComponent(email);
        router.push(`/auth/reset-password?email=${encodedEmail}`);
      }, 2000);

    } catch (error: unknown) {
      console.error('Forgot password error:', error);
      
      const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
      
      if (axiosError?.response?.status === 404) {
        setError("No account found with this email address.");
      } else if (axiosError?.response?.status === 429) {
        setError("Too many requests. Please wait before trying again.");
      } else {
        setError(axiosError?.response?.data?.message || "Failed to send reset email. Please try again.");
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
    error,
    success,
    
    // Form handlers
    handleSubmit,
    resetError,
    
    // Mutation state
    isLoading: forgotPasswordMutation.isPending,
    
    // Navigation
    goToLogin: () => router.push('/auth/login'),
  };
}
