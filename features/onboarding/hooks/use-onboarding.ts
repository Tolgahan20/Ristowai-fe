"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

// Helper interface for error responses
interface ErrorResponse {
  message?: string;
}
import { onboardingService } from '../services/onboarding.service';
import { OnboardingType } from '../types';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type {
  OnboardingSession,
  CreateOnboardingSessionRequest,
  UpdateOnboardingSessionRequest
} from '../types';

// Query Keys
export const onboardingKeys = {
  all: ['onboarding'] as const,
  flows: () => [...onboardingKeys.all, 'flows'] as const,
  sessions: () => [...onboardingKeys.all, 'sessions'] as const,
  activeSession: () => [...onboardingKeys.sessions(), 'active'] as const,
  session: (id: string) => [...onboardingKeys.sessions(), id] as const,
  status: () => [...onboardingKeys.all, 'status'] as const,
  progress: () => [...onboardingKeys.all, 'progress'] as const,
  presets: () => [...onboardingKeys.all, 'presets'] as const,
  preset: (name: string) => [...onboardingKeys.presets(), name] as const,
  systemSummary: () => [...onboardingKeys.all, 'system-summary'] as const,
};

// ===== Flow Hooks =====

/**
 * Get all available onboarding flows
 */
export function useOnboardingFlows() {
  return useQuery({
    queryKey: onboardingKeys.flows(),
    queryFn: () => onboardingService.getAvailableFlows(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get system summary
 */
export function useOnboardingSystemSummary() {
  return useQuery({
    queryKey: onboardingKeys.systemSummary(),
    queryFn: () => onboardingService.getSystemSummary(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ===== Session Hooks =====

/**
 * Get active onboarding session
 */
export function useActiveOnboardingSession() {
  return useQuery({
    queryKey: onboardingKeys.activeSession(),
    queryFn: () => onboardingService.getActiveSession(),
    retry: (failureCount, error: AxiosError) => {
      // Don't retry on 404 (no active session)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * Get specific onboarding session
 */
export function useOnboardingSession(sessionId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: onboardingKeys.session(sessionId),
    queryFn: () => onboardingService.getSession(sessionId),
    enabled: enabled && !!sessionId,
  });
}

/**
 * Get user's onboarding sessions
 */
export function useUserOnboardingSessions() {
  return useQuery({
    queryKey: onboardingKeys.sessions(),
    queryFn: () => onboardingService.getUserSessions(),
  });
}

/**
 * Check onboarding status
 */
export function useOnboardingStatus() {
  return useQuery({
    queryKey: onboardingKeys.status(),
    queryFn: () => onboardingService.checkOnboardingStatus(),
  });
}

/**
 * Get completion progress for dashboard
 */
export function useOnboardingProgress() {
  return useQuery({
    queryKey: onboardingKeys.progress(),
    queryFn: () => onboardingService.getCompletionProgress(),
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });
}

// ===== Mutation Hooks =====

/**
 * Create onboarding session
 */
export function useCreateOnboardingSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOnboardingSessionRequest) =>
      onboardingService.createSession(data),
    onSuccess: (session) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.activeSession(), session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.sessions() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.progress() });
      
      showToast.onboarding.sessionCreated();
    },
    onError: (error) => {
      console.error('Onboarding session creation failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to create onboarding session');
    },
  });
}

/**
 * Update onboarding session
 */
export function useUpdateOnboardingSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, data }: { sessionId: string; data: UpdateOnboardingSessionRequest }) =>
      onboardingService.updateSession(sessionId, data),
    onSuccess: (session) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.session(session.id), session);
      queryClient.setQueryData(onboardingKeys.activeSession(), session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.progress() });
    },
  });
}


/**
 * Start quick setup flow
 */
export function useStartQuickSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => onboardingService.startQuickSetup(),
    onSuccess: (result) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.activeSession(), result.session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.sessions() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      // Stay on onboarding page - the useActiveOnboardingSession hook will detect the new session
      // and the page will automatically show the session instead of flow selection
      
      showToast.onboarding.sessionCreated();
    },
    onError: (error) => {
      console.error('Quick setup start failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to start quick setup');
    },
  });
}

/**
 * Start specific onboarding flow type
 */
export function useStartOnboardingFlow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { type: OnboardingType; restaurantId?: string; venueId?: string }) => 
      onboardingService.startSpecificFlow(params.type, params.restaurantId, params.venueId),
    onSuccess: (result) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.activeSession(), result.session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.sessions() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      showToast.success('Onboarding Started', `${result.session.type} session created successfully`);
    },
    onError: (error: unknown) => {
      console.error('Onboarding flow start failed:', error);
      const message = ((error as AxiosError)?.response?.data as ErrorResponse)?.message || 'Failed to start onboarding flow';
      showToast.error('Failed to Start', message);
    },
  });
}

/**
 * Resume or start onboarding
 */
export function useResumeOrStartOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => onboardingService.resumeOrStartOnboarding(),
    onSuccess: (result) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.activeSession(), result.session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.sessions() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      // Navigate to appropriate step
      // Stay on onboarding page - session will be detected automatically
      
      if (result.isNew) {
        showToast.onboarding.sessionCreated();
      } else {
        showToast.onboarding.sessionResumed();
      }
    },
    onError: (error) => {
      console.error('Resume/start onboarding failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to resume onboarding');
    },
  });
}

/**
 * Pause onboarding session
 */
export function usePauseOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => onboardingService.pauseSession(sessionId),
    onSuccess: (session) => {
      queryClient.setQueryData(onboardingKeys.session(session.id), session);
      queryClient.setQueryData(onboardingKeys.activeSession(), session);
    },
  });
}

/**
 * Cancel onboarding session
 */
export function useCancelOnboarding() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (sessionId: string) => onboardingService.cancelSession(sessionId),
    onSuccess: (session) => {
      queryClient.setQueryData(onboardingKeys.session(session.id), session);
      queryClient.removeQueries({ queryKey: onboardingKeys.activeSession() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      // Redirect to dashboard
      router.push('/dashboard');
      
      showToast.onboarding.sessionCancelled();
    },
    onError: (error) => {
      console.error('Onboarding cancellation failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to cancel onboarding');
    },
  });
}

/**
 * Go back to flow selection (cancel current session)
 */
export function useBackToFlowSelection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => onboardingService.cancelSession(sessionId),
    onSuccess: () => {
      // Clear all session-related cache
      queryClient.removeQueries({ queryKey: onboardingKeys.activeSession() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.sessions() });
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      showToast.onboarding.sessionCancelled();
    },
    onError: (error) => {
      console.error('Failed to cancel onboarding session:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to cancel session');
    },
  });
}

/**
 * Complete an onboarding step
 */
export function useCompleteOnboardingStep() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (params: { sessionId: string; stepId: string; stepData: Record<string, unknown> }) =>
      onboardingService.completeStep(params.sessionId, params.stepId, params.stepData),
    onSuccess: (result) => {
      // Debug logging
      console.log('🔍 Step completion result:', {
        sessionId: result.session.id,
        venueId: result.session.venueId,
        restaurantId: result.session.restaurantId,
        stepResult: result.stepResult
      });
      
      // Update cache
      queryClient.setQueryData(onboardingKeys.session(result.session.id), result.session);
      queryClient.setQueryData(onboardingKeys.activeSession(), result.session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      // Navigate to the updated session (which should show the next step)
      router.push(`/onboarding/${result.session.id}`);
      
      showToast.success('Step Completed', 'Successfully completed the step');
    },
    onError: (error: unknown) => {
      console.error('Step completion failed:', error);
      console.error('Error details:', (error as AxiosError)?.response?.data);
      const message = ((error as AxiosError)?.response?.data as ErrorResponse)?.message || 'Failed to complete step';
      showToast.error('Step Failed', message);
    },
  });
}

/**
 * Go back to the previous step in onboarding
 */
export function useGoBackStep() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (sessionId: string) => onboardingService.goBackStep(sessionId),
    onSuccess: (session) => {
      // Update cache
      queryClient.setQueryData(onboardingKeys.session(session.id), session);
      queryClient.setQueryData(onboardingKeys.activeSession(), session);
      queryClient.invalidateQueries({ queryKey: onboardingKeys.status() });
      
      // Navigate to the updated session (which should show the previous step)
      router.push(`/onboarding/${session.id}`);
      
      showToast.success('Went Back', 'Successfully went back to the previous step');
    },
    onError: (error: unknown) => {
      console.error('Go back step failed:', error);
      const message = ((error as AxiosError)?.response?.data as ErrorResponse)?.message || 'Failed to go back to previous step';
      showToast.error('Navigation Failed', message);
    },
  });
}

// ===== Business Preset Hooks =====

/**
 * Get business presets
 */
export function useBusinessPresets() {
  return useQuery({
    queryKey: onboardingKeys.presets(),
    queryFn: () => onboardingService.getBusinessPresets(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Get business preset details
 */
export function useBusinessPresetDetails(presetName: string, enabled: boolean = true) {
  return useQuery({
    queryKey: onboardingKeys.preset(presetName),
    queryFn: () => onboardingService.getBusinessPresetDetails(presetName),
    enabled: enabled && !!presetName,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ===== Combined Hooks =====

/**
 * Complete onboarding hook - handles the main onboarding state and navigation
 */
export function useOnboarding() {
  const { data: activeSession, isLoading: isLoadingSession } = useActiveOnboardingSession();
  const { data: onboardingStatus, isLoading: isLoadingStatus } = useOnboardingStatus();
  const { data: progress } = useOnboardingProgress();
  
  const startQuickSetup = useStartQuickSetup();
  const resumeOrStart = useResumeOrStartOnboarding();
  const completeStep = useCompleteOnboardingStep();
  const updateSession = useUpdateOnboardingSession();
  
  const router = useRouter();

  // Helper functions
  const needsOnboarding = onboardingStatus?.needsOnboarding ?? false;
  const hasActiveSession = onboardingStatus?.hasActiveSession ?? false;
  const completionPercentage = progress?.overallProgress ?? 0;
  
  const goToNextStep = (session: OnboardingSession) => {
    const currentStepIndex = session.steps.findIndex(step => step.id === session.currentStep);
    const nextStep = session.steps.find(step => 
      step.order > session.steps[currentStepIndex].order && 
      step.status === 'pending'
    );
    
    if (nextStep) {
      // Session UI will update automatically based on the new step
    } else {
      // All steps completed, go to dashboard
      router.push('/dashboard');
    }
  };

  const goToPreviousStep = (session: OnboardingSession) => {
    const currentStepIndex = session.steps.findIndex(step => step.id === session.currentStep);
    const previousStep = session.steps.find(step => 
      step.order < session.steps[currentStepIndex].order
    );
    
    if (previousStep) {
      // Session UI will update automatically based on the previous step
    }
  };

  const goToStep = (session: OnboardingSession, stepId: string) => {
    // For now, we don't support direct step navigation
    // The session progresses linearly through steps
    console.log(`Navigation to step ${stepId} requested`);
  };

  return {
    // State
    activeSession,
    onboardingStatus,
    progress,
    needsOnboarding,
    hasActiveSession,
    completionPercentage,
    isLoading: isLoadingSession || isLoadingStatus,
    
    // Actions
    startQuickSetup: startQuickSetup.mutateAsync,
    resumeOrStart: resumeOrStart.mutateAsync,
    completeStep: completeStep.mutateAsync,
    updateSession: updateSession.mutateAsync,
    
    // Navigation helpers
    goToNextStep,
    goToPreviousStep,
    goToStep,
    
    // Loading states
    isStarting: startQuickSetup.isPending,
    isResuming: resumeOrStart.isPending,
    isCompletingStep: completeStep.isPending,
    isUpdating: updateSession.isPending,
  };
}
