"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "./use-auth";
import { signInWithGoogle, signInWithFacebook, getIdToken } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";

export type SocialProvider = 'google' | 'facebook';

export function useSocialLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const firebaseAuthMutation = useFirebaseAuth();

  const loginWithProvider = async (provider: SocialProvider) => {
    setIsLoading(true);
    setError("");

    try {
      // Authenticate with Firebase
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      } else if (provider === 'facebook') {
        result = await signInWithFacebook();
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }
      
      // Get Firebase ID token
      const idToken = await getIdToken(result.user);
      
      // Send token to backend for verification and JWT creation
      const response = await firebaseAuthMutation.mutateAsync(idToken);
      
      // Handle navigation based on user status
      if (!response.isNewUser && response.hasCompletedOnboarding) {
        // Existing user with completed onboarding - redirect to dashboard
        router.push('/dashboard');
      } else {
        // New user or existing user without completed onboarding - redirect to onboarding
        router.push('/onboarding');
      }
      
    } catch (error: unknown) {
      console.error(`${provider} login error:`, error);
      
      let errorMessage = `${provider} login failed`;
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Sign-in was cancelled';
            break;
          case 'auth/popup-blocked':
            errorMessage = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your internet connection and try again.';
            break;
          default:
            errorMessage = error.message || errorMessage;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => loginWithProvider('google');
  const loginWithFacebook = () => loginWithProvider('facebook');

  const resetError = () => {
    setError("");
  };

  return {
    // State
    isLoading,
    error,
    
    // Actions
    loginWithGoogle,
    loginWithFacebook,
    resetError,
    
    // Utilities
    isGoogleLoading: isLoading,
    isFacebookLoading: isLoading,
  };
}
