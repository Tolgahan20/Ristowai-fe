import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type {
  OnboardingSession,
  OnboardingFlow,
  CreateOnboardingSessionRequest,
  UpdateOnboardingSessionRequest,
  StepResult,
  BusinessPreset
} from '../types';
import { OnboardingType } from '../types';

class OnboardingService {
  // ===== Flow Management =====
  
  /**
   * Get all available onboarding flows
   */
  async getAvailableFlows(): Promise<Record<OnboardingType, OnboardingFlow>> {
    const response = await apiHelpers.get<Record<OnboardingType, OnboardingFlow>>(API_ENDPOINTS.ONBOARDING.FLOWS);
    return response.data;
  }

  /**
   * Get system summary with available flows and presets
   */
  async getSystemSummary(): Promise<{
    onboardingSystem: {
      version: string;
      totalFlows: number;
      availableFlows: string[];
      businessPresets: {
        total: number;
        available: string[];
      };
      features: Record<string, boolean>;
      status: string;
    };
    flows: Record<string, unknown>;
    presets: Record<string, unknown>;
  }> {
    const response = await apiHelpers.get(API_ENDPOINTS.ONBOARDING.SYSTEM_SUMMARY);
    return response.data;
  }

  // ===== Session Management =====

  /**
   * Create a new onboarding session
   */
  async createSession(data: CreateOnboardingSessionRequest): Promise<OnboardingSession> {
    const response = await apiHelpers.post<OnboardingSession>(API_ENDPOINTS.ONBOARDING.SESSIONS, data);
    return response.data;
  }

  /**
   * Get all user onboarding sessions
   */
  async getUserSessions(): Promise<OnboardingSession[]> {
    const response = await apiHelpers.get<OnboardingSession[]>(API_ENDPOINTS.ONBOARDING.SESSIONS);
    return response.data;
  }

  /**
   * Get active onboarding session for current user
   */
  async getActiveSession(): Promise<OnboardingSession | null> {
    const response = await apiHelpers.get<OnboardingSession | null>(API_ENDPOINTS.ONBOARDING.ACTIVE_SESSION);
    return response.data;
  }

  /**
   * Get specific onboarding session by ID
   */
  async getSession(sessionId: string): Promise<OnboardingSession> {
    const response = await apiHelpers.get<OnboardingSession>(API_ENDPOINTS.ONBOARDING.SESSION_BY_ID(sessionId));
    return response.data;
  }

  /**
   * Update onboarding session
   */
  async updateSession(
    sessionId: string, 
    data: UpdateOnboardingSessionRequest
  ): Promise<OnboardingSession> {
    const response = await apiHelpers.patch<OnboardingSession>(API_ENDPOINTS.ONBOARDING.SESSION_BY_ID(sessionId), data);
    return response.data;
  }

  /**
   * Delete onboarding session
   */
  async deleteSession(sessionId: string): Promise<void> {
    await apiHelpers.delete(API_ENDPOINTS.ONBOARDING.SESSION_BY_ID(sessionId));
  }

  // ===== Step Management =====

  /**
   * Complete an onboarding step
   */
  async completeStep(
    sessionId: string,
    stepId: string,
    stepData: Record<string, unknown>
  ): Promise<{ session: OnboardingSession; stepResult: any }> {
    const response = await apiHelpers.post<{ session: OnboardingSession; stepResult: any }>(
      API_ENDPOINTS.ONBOARDING.COMPLETE_STEP(sessionId, stepId),
      stepData
    );
    return response.data;
  }

  /**
   * Go back to the previous step in onboarding
   */
  async goBackStep(sessionId: string): Promise<OnboardingSession> {
    const response = await apiHelpers.post<OnboardingSession>(
      API_ENDPOINTS.ONBOARDING.BACK_STEP(sessionId)
    );
    return response.data;
  }

  // ===== Session Control =====

  /**
   * Pause onboarding session
   */
  async pauseSession(sessionId: string): Promise<OnboardingSession> {
    const response = await apiHelpers.post<OnboardingSession>(API_ENDPOINTS.ONBOARDING.PAUSE(sessionId));
    return response.data;
  }

  /**
   * Resume onboarding session
   */
  async resumeSession(sessionId: string): Promise<OnboardingSession> {
    const response = await apiHelpers.post<OnboardingSession>(API_ENDPOINTS.ONBOARDING.RESUME(sessionId));
    return response.data;
  }

  /**
   * Cancel onboarding session
   */
  async cancelSession(sessionId: string): Promise<OnboardingSession> {
    const response = await apiHelpers.post<OnboardingSession>(API_ENDPOINTS.ONBOARDING.CANCEL(sessionId));
    return response.data;
  }

  // ===== Business Presets =====

  /**
   * Get available business presets
   */
  async getBusinessPresets(): Promise<string[]> {
    const response = await apiHelpers.get<string[]>(API_ENDPOINTS.ONBOARDING.PRESETS);
    return response.data;
  }

  /**
   * Get business preset details by name
   */
  async getBusinessPresetDetails(presetName: string): Promise<BusinessPreset> {
    const response = await apiHelpers.get<BusinessPreset>(API_ENDPOINTS.ONBOARDING.PRESET_BY_NAME(presetName));
    return response.data;
  }

  /**
   * Get role mapping suggestions for venue and preset
   */
  async getRoleMappingSuggestions(
    venueId: string,
    presetName: string
  ): Promise<Record<string, { suggested?: string; alternatives: string[] }>> {
    const response = await apiHelpers.get(
      API_ENDPOINTS.ONBOARDING.ROLE_SUGGESTIONS(venueId, presetName)
    );
    return response.data;
  }

  // ===== Helper Methods =====

  /**
   * Quick start flow - creates session and completes initial steps
   */
  async startQuickSetup(): Promise<{
    session: OnboardingSession;
    nextStep: string;
  }> {
    // Create RESTAURANT_SETUP session for quick start
    const session = await this.createSession({
      type: OnboardingType.RESTAURANT_SETUP
    });

    return {
      session,
      nextStep: session.currentStep
    };
  }

  /**
   * Start specific onboarding flow type
   */
  async startSpecificFlow(
    type: OnboardingType, 
    restaurantId?: string, 
    venueId?: string
  ): Promise<{
    session: OnboardingSession;
    nextStep: string;
  }> {
    const session = await this.createSession({
      type,
      restaurantId,
      venueId
    });

    return {
      session,
      nextStep: session.currentStep
    };
  }

  /**
   * Check if user needs onboarding
   */
  async checkOnboardingStatus(): Promise<{
    needsOnboarding: boolean;
    hasActiveSession: boolean;
    activeSession?: OnboardingSession;
    completionPercentage: number;
  }> {
    try {
      const activeSession = await this.getActiveSession();
      
      if (activeSession) {
        return {
          needsOnboarding: true,
          hasActiveSession: true,
          activeSession,
          completionPercentage: activeSession.progressPercentage
        };
      }

      // Check if user completed onboarding by checking profile
      // This will be handled by the auth hook
      return {
        needsOnboarding: false,
        hasActiveSession: false,
        completionPercentage: 100
      };
    } catch {
      // If no active session found, user might need to start onboarding
      return {
        needsOnboarding: true,
        hasActiveSession: false,
        completionPercentage: 0
      };
    }
  }

  /**
   * Resume or start onboarding
   */
  async resumeOrStartOnboarding(): Promise<{
    session: OnboardingSession;
    isNew: boolean;
  }> {
    const activeSession = await this.getActiveSession();
    
    if (activeSession) {
      // Resume existing session
      const resumedSession = await this.resumeSession(activeSession.id);
      return {
        session: resumedSession,
        isNew: false
      };
    } else {
      // Start new quick setup
      const { session } = await this.startQuickSetup();
      return {
        session,
        isNew: true
      };
    }
  }

  /**
   * Get completion sections for dashboard banner
   */
  async getCompletionProgress(): Promise<{
    overallProgress: number;
    sections: Array<{
      id: string;
      title: string;
      description: string;
      isComplete: boolean;
      estimatedMinutes: number;
      stepIds: string[];
    }>;
    activeSession?: OnboardingSession;
  }> {
    const activeSession = await this.getActiveSession();
    
    if (!activeSession) {
      return {
        overallProgress: 100,
        sections: [],
      };
    }

    // Define completion sections based on remaining steps
    const sections = [
      {
        id: 'staff_setup',
        title: 'Add Staff Roles',
        description: 'Create job positions for your team',
        estimatedMinutes: 8,
        stepIds: ['role_creation']
      },
      {
        id: 'phase_setup', 
        title: 'Configure Scheduling',
        description: 'Set up your operational phases and scheduling templates',
        estimatedMinutes: 15,
        stepIds: ['business_preset_selection', 'role_mapping', 'phase_customization']
      },
      {
        id: 'team_invites',
        title: 'Invite Your Team',
        description: 'Send invitations to your staff members',
        estimatedMinutes: 5,
        stepIds: ['staff_invitation']
      },
      {
        id: 'kpi_setup',
        title: 'Set Performance Benchmarks',
        description: 'Configure KPI tracking and baseline metrics',
        estimatedMinutes: 5,
        stepIds: ['venue_kpi_benchmarks']
      }
    ];

    // Check completion status for each section
    const sectionsWithStatus = sections.map(section => ({
      ...section,
      isComplete: section.stepIds.every(stepId => 
        activeSession.steps.find(step => step.id === stepId)?.status === 'completed'
      )
    }));

    return {
      overallProgress: activeSession.progressPercentage,
      sections: sectionsWithStatus,
      activeSession
    };
  }
}

export const onboardingService = new OnboardingService();