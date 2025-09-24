"use client";

// React Query hooks for authentication

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { queryKeys } from "@/lib/query-client";
import { MESSAGES } from "@/constants/messages";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RegisterResponse,
  LoginResponse,
  FirebaseAuthResponse,
} from "../types";
import { AxiosError } from "axios";

// Hook for getting current user profile (cookie-based auth)
export function useProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.getProfile,
    enabled: enabled,
    retry: (failureCount, error: AxiosError) => {
      // Don't retry on 401 (unauthorized) - cookies are invalid
      if (error?.response?.status === 401) {
        return false;
      }
      // Retry on other errors up to 2 times
      return failureCount < 2;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true, // Recheck when window gains focus
    refetchOnReconnect: true, // Recheck when reconnecting
  });
}

// Hook for getting user statistics
export function useAuthStats() {
  return useQuery({
    queryKey: queryKeys.auth.stats,
    queryFn: authService.getStats,
    retry: (failureCount, error: AxiosError) => {
      // Don't retry on 401 (unauthorized) - cookies are invalid
      if (error?.response?.status === 401) {
        return false;
      }
      // Retry on other errors up to 2 times
      return failureCount < 2;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (data: LoginResponse) => {
      // Set user data in cache - convert LoginResponse user to User format
      queryClient.setQueryData(queryKeys.auth.me, {
        ...data.user,
        isEmailVerified: true, // If login succeeds, email must be verified
        lastLoginAt: new Date().toISOString(),
        tokenVersion: 0, // Default value
      });

      // Show success message
      console.log(MESSAGES.AUTH.LOGIN_SUCCESS, data.message);
    },
    onError: (error) => {
      console.error(MESSAGES.AUTH.LOGIN_ERROR, error);
    },
  });
}

// Hook for register mutation
export function useRegister() {
  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: (data: RegisterResponse) => {
      // Registration successful - don't set user in cache since they need to verify email
      // The user will be properly authenticated after email verification
      console.log(MESSAGES.AUTH.REGISTER_SUCCESS, data.message);
    },
    onError: (error) => {
      console.error(MESSAGES.AUTH.REGISTER_ERROR, error);
    },
  });
}

// Hook for Firebase authentication
export function useFirebaseAuth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idToken: string) =>
      authService.authenticateWithFirebase(idToken),
    onSuccess: (data: FirebaseAuthResponse) => {
      // Convert Firebase response to User format for caching
      const user = {
        id: data.userId,
        email: data.email,
        firstName: data.name.split(' ')[0] || '',
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        profileImageUrl: data.picture,
        isEmailVerified: data.emailVerified,
        lastLoginAt: new Date().toISOString(),
        tokenVersion: 0,
        hasCompletedOnboarding: data.hasCompletedOnboarding,
      };
      
      queryClient.setQueryData(queryKeys.auth.me, user);
      console.log(MESSAGES.AUTH.LOGIN_SUCCESS);
    },
    onError: (error) => {
      console.error(MESSAGES.AUTH.LOGIN_ERROR, error);
    },
  });
}

// Hook for logout mutation
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      console.log(MESSAGES.AUTH.LOGOUT_SUCCESS);

      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still clear cache and redirect even on error
      queryClient.clear();
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    },
  });
}

// Hook for logout from all devices
export function useLogoutAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logoutAll,
    onSuccess: () => {
      queryClient.clear();
      console.log(MESSAGES.AUTH.LOGOUT_SUCCESS);

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    },
  });
}

// Hook for forgot password (request OTP)
export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: (data) => {
      console.log('Password reset OTP sent:', data.message);
    },
    onError: (error) => {
      console.error('Failed to send password reset OTP:', error);
    },
  });
}

// Hook for verify reset OTP
export function useVerifyResetOTP() {
  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => 
      authService.verifyResetOTP(email, otp),
    onSuccess: (data) => {
      console.log('OTP verified:', data.message);
    },
    onError: (error) => {
      console.error('Failed to verify OTP:', error);
    },
  });
}

// Hook for reset password
export function useResetPassword() {
  return useMutation({
    mutationFn: ({ email, otp, newPassword }: { email: string; otp: string; newPassword: string }) => 
      authService.resetPassword(email, otp, newPassword),
    onSuccess: (data) => {
      console.log('Password reset successful:', data.message);
    },
    onError: (error) => {
      console.error('Failed to reset password:', error);
    },
  });
}

// Hook for email verification
export function useVerifyEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) =>
      authService.verifyEmail(email, otp),
    onSuccess: () => {
      // Refetch user profile to get updated verification status
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      console.log(MESSAGES.AUTH.EMAIL_VERIFIED);
    },
  });
}

// Hook for resending verification email
export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authService.resendVerification(email),
    onSuccess: () => {
      console.log(MESSAGES.AUTH.EMAIL_VERIFICATION_SENT);
    },
  });
}

// Hook for token refresh
export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data: AuthResponse) => {
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
    onError: () => {
      // Clear auth and redirect to login
      authService.clearLocalAuth();
      queryClient.clear();

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    },
  });
}

// Combined auth state hook for cookie-based authentication
export function useAuth() {
  const queryClient = useQueryClient();
  const profileQuery = useProfile();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  
  // For cookie-based auth, we determine auth state from the profile query
  const isAuthenticated = !profileQuery.isError && !!profileQuery.data;
  const user = profileQuery.data;
  
  return {
    // Auth state
    isAuthenticated,
    user,
    isLoading: profileQuery.isLoading || loginMutation.isPending,
    isError: profileQuery.isError,
    error: profileQuery.error,
    
    // Auth actions
    login: loginMutation.mutateAsync,
    logout: logoutMutation,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    
    // Utility functions
    clearAuth: () => {
      authService.clearLocalAuth();
      queryClient.clear();
    },
    
    refetchProfile: profileQuery.refetch,
    
    // Session check (makes API call to verify cookie validity)
    checkSession: authService.checkSession,
  };
}
