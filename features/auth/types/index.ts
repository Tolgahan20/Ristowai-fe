// Authentication related types
import { BaseEntity } from '@/types/common';
import type { Restaurant } from '@/features/restaurants/types';

// User and Authentication
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  status: string;
  avatarUrl?: string;
  hasCompletedOnboarding: boolean;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  locale: string;
  timezone: string;
  restaurants?: Restaurant[];
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  authProvider?: string;
  socialId?: string;
  avatarUrl?: string;
  locale?: string;
  timezone?: string;
  marketingOptIn?: boolean;
  termsAcceptedAt?: string;
  privacyPolicyAcceptedAt?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
  };
}

export interface LoginResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    hasCompletedOnboarding: boolean;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  email: string;
  otp: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface FirebaseAuthRequest {
  idToken: string;
}

export interface FirebaseAuthResponse {
  userId: string;
  email: string;
  name: string;
  picture?: string;
  emailVerified: boolean;
  provider: string;
  isNewUser: boolean;
  hasCompletedOnboarding: boolean;
  accessToken: string;
  expiresIn: number;
}

export interface ProfileResponse {
  user: User;
}
