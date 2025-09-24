// Authentication service using our API instance
import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  RegisterResponse,
  LoginResponse,
  ForgotPasswordRequest,
  VerifyResetOtpRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
  FirebaseAuthRequest,
  FirebaseAuthResponse
} from '../types';
import type { ApiResponse } from '@/types/common';

export const authService = {
  // Login with email and password
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiHelpers.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // The backend returns { message, user } directly (no wrapper)
    return response.data;
  },

  // Register new user
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await apiHelpers.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    // The backend returns { message, user } directly (no wrapper)
    return response.data;
  },


  // Get current user profile
  async getProfile(): Promise<User> {
    const response = await apiHelpers.get<{ user: User }>(
      API_ENDPOINTS.AUTH.ME
    );
    
    return response.data.user;
  },

  // Get user statistics
  async getStats(): Promise<{
    totalLogins: number;
    lastLoginDays: number;
    accountAge: number;
    restaurantsCount: number;
    venuesCount: number;
  }> {
    const response = await apiHelpers.get<ApiResponse<{
      totalLogins: number;
      lastLoginDays: number;
      accountAge: number;
      restaurantsCount: number;
      venuesCount: number;
    }>>(API_ENDPOINTS.AUTH.STATS);
    return response.data.data!;
  },

  // Refresh access token (handled by cookies automatically)
  async refreshToken(): Promise<AuthResponse> {
    const response = await apiHelpers.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    
    // Note: New tokens are automatically set as HTTP-only cookies by the backend
    return response.data.data!;
  },

  // Forgot password
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiHelpers.post<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email } as ForgotPasswordRequest
    );
    return response.data;
  },

  // Verify reset OTP
  async verifyResetOTP(email: string, otp: string): Promise<{ message: string }> {
    const response = await apiHelpers.post<{ message: string }>(
      API_ENDPOINTS.AUTH.VERIFY_RESET_OTP,
      { email, otp } as VerifyResetOtpRequest
    );
    return response.data;
  },

  // Reset password
  async resetPassword(email: string, otp: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiHelpers.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { email, otp, newPassword } as ResetPasswordRequest
    );
    return response.data;
  },

  // Firebase authentication
  async authenticateWithFirebase(idToken: string): Promise<FirebaseAuthResponse> {
    const response = await apiHelpers.post<FirebaseAuthResponse>(
      API_ENDPOINTS.AUTH.FIREBASE,
      { idToken } as FirebaseAuthRequest
    );
    return response.data;
  },

  // Verify email
  async verifyEmail(email: string, otp: string): Promise<void> {
    await apiHelpers.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { email, otp } as VerifyEmailRequest
    );
  },

  // Resend verification email
  async resendVerification(email: string): Promise<void> {
    await apiHelpers.post<ApiResponse<void>>(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      { email } as ResendVerificationRequest
    );
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiHelpers.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Failed to logout from server:', error);
    } finally {
      // Clear local storage (cookies are cleared by the server)
      this.clearLocalAuth();
    }
  },

  // Logout from all devices
  async logoutAll(): Promise<void> {
    try {
      await apiHelpers.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT_ALL);
    } catch (error) {
      console.warn('Failed to logout from all devices:', error);
    } finally {
      this.clearLocalAuth();
    }
  },

  // Clear local authentication data (only UI state, not tokens)
  clearLocalAuth(): void {
    // Clear UI state in localStorage
    localStorage.removeItem('active_restaurant');
    localStorage.removeItem('active_venue');
    localStorage.removeItem('preferences');
    // Note: Tokens are HTTP-only cookies and cleared by the server during logout
  },

  // Check if user has valid session (by making an API call)
  async checkSession(): Promise<{ isAuthenticated: boolean; user?: User }> {
    try {
      const user = await this.getProfile();
      return { isAuthenticated: true, user };
    } catch {
      this.clearLocalAuth();
      return { isAuthenticated: false };
    }
  },

  // Simple auth check - use with caution, prefer checkSession() for reliability
  async quickAuthCheck(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch {
      return false;
    }
  },

};