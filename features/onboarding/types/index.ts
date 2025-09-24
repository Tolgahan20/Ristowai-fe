// Onboarding types that mirror backend enums and DTOs

export enum OnboardingType {
  RESTAURANT_SETUP = 'restaurant_setup',
  VENUE_SETUP = 'venue_setup', 
  STAFF_SETUP = 'staff_setup',
  PHASE_SETUP = 'phase_setup',
  FULL_SETUP = 'full_setup'
}

export enum OnboardingStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress', 
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum StepStatus {
  PENDING = 'pending',
  CURRENT = 'current',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

// Step definition from backend flows
export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  order: number;
  status: StepStatus;
  isRequired: boolean;
  nextStep?: string;
  data?: Record<string, any>;
  metadata?: {
    estimatedMinutes?: number;
    handler?: string;
    dependencies?: string[];
    validationRules?: Record<string, any>;
  };
}

// Session response from backend
export interface OnboardingSession {
  id: string;
  userId: string;
  type: OnboardingType;
  status: OnboardingStatus;
  currentStep: string;
  steps: OnboardingStep[];
  restaurantId?: string;
  venueId?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  
  // Progress metrics
  totalSteps: number;
  completedSteps: number;
  progressPercentage: number;
  estimatedTimeRemaining: number;
  progressMessage: string;
  
  context?: Record<string, any>;
  metadata?: Record<string, any>;
}

// Request DTOs
export interface CreateOnboardingSessionRequest {
  type: OnboardingType;
  restaurantId?: string;
  venueId?: string;
  context?: Record<string, any>;
}

export interface UpdateOnboardingSessionRequest {
  status?: OnboardingStatus;
  currentStep?: string;
  context?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface CompleteStepRequest {
  stepData: Record<string, any>;
}

export interface StepResult {
  session: OnboardingSession;
  stepResult: {
    success: boolean;
    data: Record<string, any>;
    nextStepData?: Record<string, any>;
    message?: string;
    errors?: string[];
  };
}

// Flow configuration
export interface OnboardingFlow {
  type: OnboardingType;
  name: string;
  description: string;
  estimatedTotalMinutes: number;
  steps: Array<{
    id: string;
    title: string;
    description: string;
    order: number;
    isRequired: boolean;
    estimatedMinutes: number;
    dependencies?: string[];
    nextStep?: string;
    handler: string;
    validationRules?: Record<string, any>;
  }>;
}

// Frontend-specific types
export interface QuickStartConfig {
  steps: string[]; // Step IDs to complete in quick start
  redirectPath: string; // Where to go after quick start
}

export interface CompletionSection {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  estimatedMinutes: number;
  priority: 'high' | 'medium' | 'low';
  stepIds: string[]; // Backend step IDs this section represents
  icon?: string;
  benefits?: string[];
}

export interface OnboardingProgress {
  overall: {
    percentage: number;
    completedSections: number;
    totalSections: number;
    estimatedTimeRemaining: number;
  };
  sections: CompletionSection[];
  activeSession?: OnboardingSession;
  canStartNewSession: boolean;
}

// Business presets (for phase setup)
export interface BusinessPreset {
  name: string;
  description: string;
  phases: Array<{
    name: string;
    priority: 'HARD' | 'SOFT';
    estimatedMinutes: number;
  }>;
}

// Form data types for each step
export interface RestaurantDetailsForm {
  name: string;
  restaurantType: string;
  address: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface RestaurantSettingsForm {
  timezone: string;
  currency: string;
  locale: string;
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
}

export interface VenueDetailsForm {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  capacity?: number;
  sector?: string;
}

export interface VenueConfigurationForm {
  openingMinute: number;
  closingMinute: number;
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  whatsappConfig?: {
    staffGroupId?: string;
    managersGroupId?: string;
    enableNotifications?: boolean;
  };
}

export interface RoleCreationForm {
  roles: Array<{
    name: string;
    description?: string;
    hourlyRateMin?: number;
    hourlyRateMax?: number;
    isCritical?: boolean;
    permissions?: string[];
  }>;
}

export interface StaffInvitationForm {
  staff: Array<{
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    roleId: string;
    hourlyRate?: number;
  }>;
}

export interface BusinessPresetSelectionForm {
  businessPreset: string;
  customizations?: Record<string, any>;
}

export interface RoleMappingForm {
  mapping: Record<string, string>; // phaseRoleId -> venueRoleId
  customizations?: Record<string, any>;
}
