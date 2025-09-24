import { toast } from 'sonner';
import { MESSAGES } from '@/constants/messages';

/**
 * Toast utility for consistent user notifications across the app
 * Uses sonner for beautiful toast notifications with our message constants
 */

export const showToast = {
  // ===== Success Toasts =====
  success: (message: string, description?: string) => {
    toast.success(message, { description });
  },

  // ===== Error Toasts =====
  error: (message: string, description?: string) => {
    toast.error(message, { description });
  },

  // ===== Warning Toasts =====
  warning: (message: string, description?: string) => {
    toast.warning(message, { description });
  },

  // ===== Info Toasts =====
  info: (message: string, description?: string) => {
    toast.info(message, { description });
  },

  // ===== Loading Toasts =====
  loading: (message: string) => {
    return toast.loading(message);
  },

  // ===== Promise Toasts (for async operations) =====
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    }
  ) => {
    return toast.promise(promise, messages);
  },

  // ===== Dismiss =====
  dismiss: (toastId?: string | number) => {
    toast.dismiss(toastId);
  },

  // ===== Predefined App-Specific Toasts =====
  
  // Authentication
  auth: {
    loginSuccess: () => showToast.success(MESSAGES.AUTH.LOGIN_SUCCESS),
    loginError: (error?: string) => showToast.error(MESSAGES.AUTH.LOGIN_ERROR, error),
    logoutSuccess: () => showToast.success(MESSAGES.AUTH.LOGOUT_SUCCESS),
    registerSuccess: () => showToast.success(MESSAGES.AUTH.REGISTER_SUCCESS),
    registerError: (error?: string) => showToast.error(MESSAGES.AUTH.REGISTER_ERROR, error),
    sessionExpired: () => showToast.warning(MESSAGES.AUTH.SESSION_EXPIRED),
    emailVerified: () => showToast.success(MESSAGES.AUTH.EMAIL_VERIFIED),
    passwordResetSent: () => showToast.success(MESSAGES.AUTH.PASSWORD_RESET_SENT),
  },

  // Onboarding
  onboarding: {
    sessionCreated: () => showToast.success(MESSAGES.ONBOARDING.SESSION_CREATED),
    sessionResumed: () => showToast.info(MESSAGES.ONBOARDING.SESSION_RESUMED),
    stepCompleted: (stepName?: string) => 
      showToast.success(MESSAGES.ONBOARDING.STEP_COMPLETED, stepName),
    setupCompleted: () => showToast.success(MESSAGES.ONBOARDING.SETUP_COMPLETED),
    sessionPaused: () => showToast.info(MESSAGES.ONBOARDING.SESSION_PAUSED),
    sessionCancelled: () => showToast.warning(MESSAGES.ONBOARDING.SESSION_CANCELLED),
    presetApplied: (presetName?: string) => 
      showToast.success(MESSAGES.ONBOARDING.PRESET_APPLIED, presetName),
  },

  // Restaurant
  restaurant: {
    created: (name?: string) => showToast.success(MESSAGES.RESTAURANT.CREATED, name),
    updated: (name?: string) => showToast.success(MESSAGES.RESTAURANT.UPDATED, name),
    deleted: () => showToast.success(MESSAGES.RESTAURANT.DELETED),
    statusUpdated: () => showToast.success(MESSAGES.RESTAURANT.STATUS_UPDATED),
    onboardingUpdated: () => showToast.success(MESSAGES.RESTAURANT.ONBOARDING_UPDATED),
    subscriptionUpdated: () => showToast.success(MESSAGES.RESTAURANT.SUBSCRIPTION_UPDATED),
    featureAccessDenied: () => showToast.warning(MESSAGES.RESTAURANT.FEATURE_ACCESS_DENIED),
  },

  // Venue
  venue: {
    created: (name?: string) => showToast.success(MESSAGES.VENUE.CREATED, name),
    updated: (name?: string) => showToast.success(MESSAGES.VENUE.UPDATED, name),
    deleted: () => showToast.success(MESSAGES.VENUE.DELETED),
    statusToggled: () => showToast.success(MESSAGES.VENUE.STATUS_TOGGLED),
  },

  // Staff
  staff: {
    created: (name?: string) => showToast.success(MESSAGES.STAFF.CREATED, name),
    updated: (name?: string) => showToast.success(MESSAGES.STAFF.UPDATED, name),
    deleted: () => showToast.success(MESSAGES.STAFF.DELETED),
    statusToggled: () => showToast.success(MESSAGES.STAFF.STATUS_TOGGLED),
    accessTokenGenerated: () => showToast.success(MESSAGES.STAFF.ACCESS_TOKEN_GENERATED),
  },

  // Roles
  role: {
    created: (name?: string) => showToast.success(MESSAGES.ROLE.CREATED, name),
    updated: (name?: string) => showToast.success(MESSAGES.ROLE.UPDATED, name),
    deleted: () => showToast.success(MESSAGES.ROLE.DELETED),
    cannotDeleteAssigned: () => showToast.error(MESSAGES.ROLE.CANNOT_DELETE_ASSIGNED),
  },

  // Schedule
  schedule: {
    created: () => showToast.success(MESSAGES.SCHEDULE.CREATED),
    updated: () => showToast.success(MESSAGES.SCHEDULE.UPDATED),
    generated: () => showToast.success(MESSAGES.SCHEDULE.GENERATED),
    published: () => showToast.success(MESSAGES.SCHEDULE.PUBLISHED),
    generationFailed: () => showToast.error(MESSAGES.SCHEDULE.GENERATION_FAILED),
    publishFailed: () => showToast.error(MESSAGES.SCHEDULE.PUBLISH_FAILED),
    aiOptimized: () => showToast.success(MESSAGES.SCHEDULE.AI_OPTIMIZED),
  },

  // Requests
  request: {
    created: () => showToast.success(MESSAGES.REQUEST.CREATED),
    updated: () => showToast.success(MESSAGES.REQUEST.UPDATED),
    approved: () => showToast.success(MESSAGES.REQUEST.APPROVED),
    denied: () => showToast.warning(MESSAGES.REQUEST.DENIED),
    cancelled: () => showToast.info(MESSAGES.REQUEST.DELETED),
    autoApproved: () => showToast.success(MESSAGES.REQUEST.AUTO_APPROVED),
  },

  // Incidents
  incident: {
    reported: () => showToast.success(MESSAGES.INCIDENT.REPORTED),
    acknowledged: () => showToast.info(MESSAGES.INCIDENT.ACKNOWLEDGED),
    resolved: () => showToast.success(MESSAGES.INCIDENT.RESOLVED),
    closed: () => showToast.success(MESSAGES.INCIDENT.CLOSED),
    solutionsGenerated: () => showToast.success(MESSAGES.INCIDENT.SOLUTIONS_GENERATED),
  },

  // Exports
  export: {
    created: () => showToast.success(MESSAGES.EXPORT.CREATED),
    completed: () => showToast.success(MESSAGES.EXPORT.COMPLETED),
    failed: () => showToast.error(MESSAGES.EXPORT.FAILED),
    downloaded: () => showToast.success(MESSAGES.EXPORT.DOWNLOADED),
    expired: () => showToast.warning(MESSAGES.EXPORT.EXPIRED),
  },

  // Compliance
  compliance: {
    scanCompleted: () => showToast.success(MESSAGES.COMPLIANCE.SCAN_COMPLETED),
    noViolations: () => showToast.success(MESSAGES.COMPLIANCE.NO_VIOLATIONS),
    violationsFound: () => showToast.warning(MESSAGES.COMPLIANCE.VIOLATIONS_FOUND),
    violationResolved: () => showToast.success(MESSAGES.COMPLIANCE.VIOLATION_RESOLVED),
  },

  // Generic operations
  generic: {
    saved: () => showToast.success(MESSAGES.GENERAL.SUCCESS),
    deleted: () => showToast.success(MESSAGES.GENERAL.SUCCESS),
    error: (error?: string) => showToast.error(MESSAGES.GENERAL.ERROR, error),
    loading: () => showToast.loading(MESSAGES.GENERAL.LOADING),
    networkError: () => showToast.error(MESSAGES.GENERAL.NETWORK_ERROR),
    validationError: () => showToast.error(MESSAGES.GENERAL.VALIDATION_ERROR),
    unauthorized: () => showToast.error(MESSAGES.GENERAL.UNAUTHORIZED),
  },
};

// Export individual toast functions for convenience
export const { success, error, warning, info, loading, promise, dismiss } = showToast;
