// Messages and text constants for the Smart Shifts frontend
// Based on backend enums and business logic

// Error Messages
export const ERROR_MESSAGES = {
  // HTTP Status Errors
  BAD_REQUEST: 'Invalid request. Please check your input.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'Access denied. You do not have permission.',
  NOT_FOUND: 'The requested resource was not found.',
  CONFLICT: 'A conflict occurred. The resource may already exist.',
  UNPROCESSABLE_ENTITY: 'The request contains invalid data.',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',
  
  // Auth Specific Errors
  INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
  ACCOUNT_LOCKED: 'Your account has been temporarily locked. Please try again later.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',

  // Feature-specific Errors
  SCHEDULE_GENERATION_FAILED: 'Schedule generation failed. Please check your phase templates and staff availability.',
  COMPLIANCE_SCAN_FAILED: 'Compliance scan failed. Please try again.',
  AI_SERVICE_UNAVAILABLE: 'AI service is currently unavailable. Using fallback method.',
  EXPORT_GENERATION_FAILED: 'Export generation failed. Please try again.',
  FILE_UPLOAD_FAILED: 'File upload failed. Please check the file size and format.',
  GPS_VERIFICATION_FAILED: 'GPS verification failed. Please ensure location services are enabled.',
  WHATSAPP_INTEGRATION_ERROR: 'WhatsApp integration error. Please check your configuration.',
  
  // Business Logic Errors
  INSUFFICIENT_STAFF: 'Insufficient staff available for the requested time period.',
  BUDGET_EXCEEDED: 'The operation would exceed the budget limit.',
  COMPLIANCE_VIOLATION: 'The operation would create compliance violations.',
  INVALID_TIME_RANGE: 'Invalid time range. Please check start and end times.',
  STAFF_UNAVAILABLE: 'The selected staff member is not available.',
  VENUE_CLOSED: 'The venue is closed during the selected time.',
  ROLE_REQUIRED: 'At least one staff member with the required role must be assigned.',
  
  // Venue Errors
  VENUE_CREATE_FAILED: 'Failed to create venue. Please try again.',
  VENUE_UPDATE_FAILED: 'Failed to update venue. Please try again.',
  VENUE_DELETE_FAILED: 'Failed to delete venue. Please try again.',
  VENUE_TOGGLE_FAILED: 'Failed to toggle venue status. Please try again.',
} as const;

export const MESSAGES = {
  // Member Management Messages
  MEMBERS: {
    // Success Messages
    INVITE_SUCCESS: 'Invitation sent successfully',
    UPDATE_SUCCESS: 'Member updated successfully',
    REMOVE_SUCCESS: 'Member removed successfully',
    ACCEPT_SUCCESS: 'Invitation accepted successfully',
    DECLINE_SUCCESS: 'Invitation declined',
    RESEND_SUCCESS: 'Invitation resent successfully',
    ACTIVATE_SUCCESS: 'Member activated successfully',
    DEACTIVATE_SUCCESS: 'Member deactivated successfully',
    
    // Error Messages
    INVITE_ERROR: 'Failed to send invitation',
    UPDATE_ERROR: 'Failed to update member',
    REMOVE_ERROR: 'Failed to remove member',
    ACCEPT_ERROR: 'Failed to accept invitation',
    DECLINE_ERROR: 'Failed to decline invitation',
    RESEND_ERROR: 'Failed to resend invitation',
    ACTIVATE_ERROR: 'Failed to activate member',
    DEACTIVATE_ERROR: 'Failed to deactivate member',
    LOAD_ERROR: 'Failed to load members',
    
    // Validation Messages
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    ROLE_REQUIRED: 'Role is required',
    VENUE_ACCESS_REQUIRED: 'At least one venue must be selected',
    
    // Confirmation Messages
    REMOVE_CONFIRM: 'Are you sure you want to remove this member? This action cannot be undone.',
    DEACTIVATE_CONFIRM: 'Are you sure you want to deactivate this member?',
    RESEND_CONFIRM: 'Resend invitation email to this member?',
    
    // Info Messages
    INVITATION_PENDING: 'Invitation pending - waiting for user to accept',
    NO_VENUE_RESTRICTIONS: 'Access to all venues',
    OWNER_CANNOT_EDIT: 'Restaurant owner role cannot be modified',
    LAST_OWNER_WARNING: 'Cannot remove the last restaurant owner',
  },
  // General Messages
  GENERAL: {
    LOADING: 'Loading...',
    SAVING: 'Saving...',
    DELETING: 'Deleting...',
    SUCCESS: 'Operation completed successfully',
    ERROR: 'Something went wrong. Please try again.',
    CONFIRM_DELETE: 'Are you sure you want to delete this item?',
    CONFIRM_ACTION: 'Are you sure you want to proceed?',
    NO_DATA: 'No data available',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    VALIDATION_ERROR: 'Please check your input and try again',
  },

  // Error Messages (imported from ERROR_MESSAGES)
  ERROR: ERROR_MESSAGES,

  // Authentication Messages
  AUTH: {
    LOGIN_SUCCESS: 'Welcome back!',
    LOGIN_ERROR: 'Invalid email or password',
    LOGOUT_SUCCESS: 'You have been logged out successfully',
    REGISTER_SUCCESS: 'Account created successfully',
    REGISTER_ERROR: 'Failed to create account',
    EMAIL_VERIFICATION_SENT: 'Verification email sent',
    EMAIL_VERIFIED: 'Email verified successfully',
    PASSWORD_RESET_SENT: 'Password reset instructions sent to your email',
    PASSWORD_RESET_SUCCESS: 'Password reset successfully',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    TOKEN_REFRESH_ERROR: 'Failed to refresh session. Please log in again.',
  },

  // Restaurant Messages
  RESTAURANT: {
    CREATED: 'Restaurant created successfully',
    UPDATED: 'Restaurant updated successfully',
    DELETED: 'Restaurant deleted successfully',
    STATUS_UPDATED: 'Restaurant status updated',
    SUBSCRIPTION_UPDATED: 'Subscription updated successfully',
    ONBOARDING_UPDATED: 'Onboarding progress updated',
    FEATURE_ACCESS_DENIED: 'This feature is not available in your current plan',
  },

  // Venue Messages
  VENUE: {
    CREATED: 'Venue created successfully',
    UPDATED: 'Venue updated successfully',
    DELETED: 'Venue deleted successfully',
    ACTIVATED: 'Venue activated successfully',
    DEACTIVATED: 'Venue deactivated successfully',
    STATUS_TOGGLED: 'Venue status updated',
    LOCATION_REQUIRED: 'Please set the venue location',
  },

  // Staff Messages
  STAFF: {
    CREATED: 'Staff member added successfully',
    UPDATED: 'Staff member updated successfully',
    DELETED: 'Staff member removed successfully',
    STATUS_TOGGLED: 'Staff status updated',
    ACCESS_TOKEN_GENERATED: 'Access token generated for staff member',
    ACCESS_TOKEN_REVOKED: 'Access token revoked',
    OVERTIME_UPDATED: 'Overtime hours updated',
    HOURLY_RATE_UPDATED: 'Hourly rate updated successfully',
    CONTRACT_UPDATED: 'Contract details updated',
  },

  // Role Messages
  ROLE: {
    CREATED: 'Role created successfully',
    UPDATED: 'Role updated successfully',
    DELETED: 'Role deleted successfully',
    STATUS_TOGGLED: 'Role status updated',
    CANNOT_DELETE_ASSIGNED: 'Cannot delete role that is assigned to staff members',
    CRITICAL_ROLE_WARNING: 'This is a critical role for operations',
  },

  // Schedule Messages
  SCHEDULE: {
    CREATED: 'Schedule created successfully',
    UPDATED: 'Schedule updated successfully',
    DELETED: 'Schedule deleted successfully',
    GENERATED: 'Schedule generated successfully',
    GENERATION_FAILED: 'Failed to generate schedule. Please try again.',
    PUBLISHED: 'Schedule published successfully',
    PUBLISH_FAILED: 'Failed to publish schedule',
    AI_OPTIMIZED: 'Schedule optimized using AI',
    OPTIMIZATION_FAILED: 'AI optimization failed',
    ALREADY_PUBLISHED: 'Schedule is already published',
    CANNOT_EDIT_PUBLISHED: 'Cannot edit published schedule',
  },

  // Shift Messages
  SHIFT: {
    CREATED: 'Shift created successfully',
    UPDATED: 'Shift updated successfully',
    DELETED: 'Shift deleted successfully',
    CONFLICT_DETECTED: 'Shift conflict detected',
    STAFF_UNAVAILABLE: 'Staff member is not available for this time',
    INVALID_TIME_RANGE: 'Invalid time range. End time must be after start time.',
    OVERTIME_WARNING: 'This shift will result in overtime',
    REST_PERIOD_VIOLATION: 'Insufficient rest period between shifts',
  },

  // Compliance Messages
  COMPLIANCE: {
    SCAN_STARTED: 'Compliance scan started',
    SCAN_COMPLETED: 'Compliance scan completed',
    VIOLATIONS_FOUND: 'Compliance violations found',
    NO_VIOLATIONS: 'No compliance violations found',
    VIOLATION_RESOLVED: 'Violation resolved successfully',
    BULK_RESOLVE_SUCCESS: 'Multiple violations resolved',
    HARD_VIOLATION: 'Hard violation: Must be resolved before publishing',
    SOFT_VIOLATION: 'Soft violation: Recommended to resolve',
    ITALIAN_LABOR_LAW: 'Italian Labor Law Compliance',
    REST_11H_VIOLATION: '11-hour rest period violation',
    SHIFT_MAX_13H_VIOLATION: 'Maximum 13-hour shift violation',
    WEEKLY_REST_24H_VIOLATION: '24-hour weekly rest violation',
    WEEKLY_AVG_48H_VIOLATION: '48-hour weekly average violation',
    OVERTIME_LIMIT_VIOLATION: 'Annual overtime limit violation',
    MINOR_PROTECTION_VIOLATION: 'Minor worker protection violation',
  },

  // Request Messages
  REQUEST: {
    CREATED: 'Request submitted successfully',
    UPDATED: 'Request updated successfully',
    DELETED: 'Request cancelled successfully',
    APPROVED: 'Request approved',
    DENIED: 'Request denied',
    PENDING_REVIEW: 'Request is pending manager review',
    AUTO_APPROVED: 'Request automatically approved',
    IMPACT_CALCULATED: 'Request impact calculated',
    BULK_ACTION_SUCCESS: 'Bulk action completed successfully',
    TIME_OFF_REQUEST: 'Time off request',
    SHIFT_SWAP_REQUEST: 'Shift swap request',
    OVERTIME_REQUEST: 'Overtime request',
    SCHEDULE_CHANGE_REQUEST: 'Schedule change request',
  },

  // WhatsApp Messages
  WHATSAPP: {
    TOKEN_GENERATED: 'WhatsApp token generated successfully',
    TOKEN_VERIFIED: 'Token verified successfully',
    TOKEN_REVOKED: 'WhatsApp access revoked',
    REQUEST_CREATED: 'Request created via WhatsApp',
    CODE_SENT: 'Verification code sent',
    CODE_RESENT: 'Verification code resent',
    EXPIRED_TOKENS_CLEANED: 'Expired tokens cleaned up',
    INTEGRATION_ENABLED: 'WhatsApp integration enabled',
    INTEGRATION_DISABLED: 'WhatsApp integration disabled',
  },

  // Incident Messages
  INCIDENT: {
    REPORTED: 'Incident reported successfully',
    UPDATED: 'Incident updated successfully',
    ACKNOWLEDGED: 'Incident acknowledged',
    RESOLVED: 'Incident resolved successfully',
    CLOSED: 'Incident closed',
    SOLUTIONS_GENERATED: 'AI solutions generated',
    SOLUTION_APPLIED: 'Solution applied successfully',
    QUICK_REPORT: 'Quick incident report created',
    STAFF_SICKNESS: 'Staff sickness reported',
    NO_SHOW: 'Staff no-show reported',
    LATE_ARRIVAL: 'Late arrival reported',
    EARLY_DEPARTURE: 'Early departure reported',
    UNEXPECTED_PEAK: 'Unexpected customer peak reported',
    EQUIPMENT_FAILURE: 'Equipment failure reported',
  },

  // Punch/Time Tracking Messages
  PUNCH: {
    IN_SUCCESS: 'Punched in successfully',
    OUT_SUCCESS: 'Punched out successfully',
    CREATED: 'Punch record created',
    UPDATED: 'Punch record updated',
    VERIFIED: 'Punch record verified',
    RECONCILED: 'Punch reconciled to timecard',
    GPS_VERIFICATION_FAILED: 'GPS verification failed',
    LOCATION_REQUIRED: 'Location verification required',
    TIMECARD_GENERATED: 'Timecard generated automatically',
    ANOMALY_DETECTED: 'Time tracking anomaly detected',
    OVERTIME_DETECTED: 'Overtime detected',
    EARLY_ARRIVAL: 'Early arrival detected',
    LATE_ARRIVAL: 'Late arrival detected',
    EARLY_DEPARTURE: 'Early departure detected',
  },

  // Export Messages
  EXPORT: {
    CREATED: 'Export job created',
    PROCESSING: 'Export is being processed',
    COMPLETED: 'Export completed successfully',
    FAILED: 'Export failed',
    CANCELLED: 'Export cancelled',
    RETRYING: 'Retrying export',
    DOWNLOADED: 'File downloaded successfully',
    EXPIRED: 'Export file has expired',
    CLEANUP_SUCCESS: 'Expired exports cleaned up',
    BULK_CREATED: 'Multiple exports created',
    SCHEDULE_EXPORT: 'Schedule export',
    PAYROLL_EXPORT: 'Payroll export',
    TIMECARD_EXPORT: 'Timecard export',
    KPI_EXPORT: 'KPI report export',
    AUDIT_EXPORT: 'Audit report export',
  },

  // Analytics Messages
  ANALYTICS: {
    KPIS_UPDATED: 'KPI data updated',
    TRACKING_STARTED: 'Manager action tracking started',
    TRACKING_COMPLETED: 'Manager action tracking completed',
    EFFICIENCY_CALCULATED: 'Manager efficiency calculated',
    DATA_REFRESHED: 'Analytics data refreshed',
    INSUFFICIENT_DATA: 'Insufficient data for analytics',
    CALCULATION_IN_PROGRESS: 'Analytics calculation in progress',
  },

  // AI Messages
  AI: {
    REQUEST_PROCESSED: 'AI request processed successfully',
    PROVIDER_UNAVAILABLE: 'AI provider temporarily unavailable',
    FALLBACK_ACTIVATED: 'Switched to backup AI provider',
    HEALTH_CHECK_PASSED: 'AI system is healthy',
    HEALTH_CHECK_FAILED: 'AI system health check failed',
    OPTIMIZATION_STARTED: 'AI optimization started',
    OPTIMIZATION_COMPLETED: 'AI optimization completed',
    LEARNING_CONTEXT_UPDATED: 'AI learning context updated',
  },

  // Phase Messages
  PHASE: {
    TEMPLATE_CREATED: 'Phase template created successfully',
    TEMPLATE_UPDATED: 'Phase template updated successfully',
    TEMPLATE_DELETED: 'Phase template deleted successfully',
    TEMPLATE_DUPLICATED: 'Phase template duplicated successfully',
    INSTANCE_CREATED: 'Phase instance created successfully',
    INSTANCE_UPDATED: 'Phase instance updated successfully',
    INSTANCE_DELETED: 'Phase instance deleted successfully',
    INSTANCES_GENERATED: 'Phase instances generated from templates',
    COVERAGE_CALCULATED: 'Phase coverage calculated',
    STATUS_UPDATED: 'Phase status updated',
    TIMELINE_GENERATED: 'Phase timeline generated',
    REQUIREMENT_NOT_MET: 'Phase requirement not met',
    COVERAGE_OPTIMAL: 'Phase coverage is optimal',
  },

  // Onboarding Messages
  ONBOARDING: {
    SESSION_CREATED: 'Onboarding session started',
    SESSION_UPDATED: 'Onboarding progress saved',
    SESSION_DELETED: 'Onboarding session cancelled',
    STEP_COMPLETED: 'Step completed successfully',
    SESSION_PAUSED: 'Onboarding session paused',
    SESSION_RESUMED: 'Onboarding session resumed',
    SESSION_CANCELLED: 'Onboarding session cancelled',
    PRESET_APPLIED: 'Business preset applied successfully',
    ROLE_MAPPING_SUGGESTED: 'Role mapping suggestions generated',
    SETUP_COMPLETED: 'Restaurant setup completed successfully',
    WELCOME_MESSAGE: 'Welcome to Smart Shifts! Let\'s set up your restaurant.',
  },

  // Business Preset Messages
  BUSINESS_PRESET: {
    APPLIED: 'Business preset applied successfully',
    ROLE_MAPPING_GENERATED: 'Role mapping suggestions generated',
    PRESET_NOT_FOUND: 'Business preset not found',
    CUSTOMIZATION_RECOMMENDED: 'Consider customizing the preset to fit your needs',
    COFFEE_BAR: 'Coffee Bar preset applied',
    TRATTORIA: 'Trattoria preset applied',
    PIZZERIA: 'Pizzeria preset applied',
    FINE_DINING: 'Fine dining preset applied',
    FAST_CASUAL: 'Fast casual preset applied',
  },

  // GDPR Messages
  GDPR: {
    REQUEST_SUBMITTED: 'GDPR request submitted successfully',
    REQUEST_PROCESSED: 'GDPR request processed',
    CONSENT_RECORDED: 'Consent recorded successfully',
    CONSENT_WITHDRAWN: 'Consent withdrawn successfully',
    DATA_EXPORT_READY: 'Your data export is ready for download',
    DATA_DELETED: 'Your data has been deleted as requested',
    RETENTION_POLICY_EXECUTED: 'Data retention policy executed',
    COMPLIANCE_REPORT_GENERATED: 'GDPR compliance report generated',
    RIGHT_TO_BE_FORGOTTEN: 'Right to be forgotten request processed',
    DATA_PORTABILITY: 'Data portability request processed',
  },

  // Validation Messages
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    PASSWORD_MIN_LENGTH_REGISTER: 'Password must be at least 8 characters',
    PASSWORD_STRENGTH: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
    FIRST_NAME_REQUIRED: 'First name is required',
    FIRST_NAME_MIN_LENGTH: 'First name must be at least 2 characters',
    LAST_NAME_REQUIRED: 'Last name is required',
    LAST_NAME_MIN_LENGTH: 'Last name must be at least 2 characters',
    PHONE_INVALID: 'Please enter a valid phone number',
    TERMS_REQUIRED: 'You must accept the terms and conditions',
    INVALID_DATE: 'Please enter a valid date',
    INVALID_TIME: 'Please enter a valid time',
    INVALID_HOURLY_RATE: 'Please enter a valid hourly rate',
    INVALID_PERCENTAGE: 'Please enter a valid percentage',
    START_AFTER_END: 'Start time must be before end time',
    DATE_IN_PAST: 'Date cannot be in the past',
    INVALID_FILE_TYPE: 'Invalid file type',
    FILE_TOO_LARGE: 'File size exceeds maximum limit',
    REQUIRED_SELECTION: 'Please make a selection',
  },

  // Business Logic Messages
  BUSINESS: {
    SCHEDULE_CONFLICT: 'Schedule conflict detected',
    INSUFFICIENT_COVERAGE: 'Insufficient phase coverage',
    BUDGET_EXCEEDED: 'Budget limit exceeded',
    COST_OPTIMIZATION_AVAILABLE: 'Cost optimization opportunities available',
    FAIR_ROTATION_APPLIED: 'Fair rotation algorithm applied',
    STAFF_OVERUTILIZATION: 'Staff overutilization detected',
    PEAK_HOURS_COVERAGE: 'Peak hours require additional coverage',
    LABOR_COST_HIGH: 'Labor cost is above target',
    EFFICIENCY_IMPROVED: 'Schedule efficiency improved',
    ROI_POSITIVE: 'Positive return on investment',
  },
} as const;

// Status Labels
export const STATUS_LABELS = {
  // General Status
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  DENIED: 'Denied',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  IN_PROGRESS: 'In Progress',
  DRAFT: 'Draft',
  PUBLISHED: 'Published',

  // Schedule Status
  SCHEDULE: {
    DRAFT: 'Draft',
    GENERATING: 'Generating',
    GENERATED: 'Generated',
    REVIEWING: 'Under Review',
    PUBLISHED: 'Published',
    ARCHIVED: 'Archived',
  },

  // Request Status
  REQUEST: {
    PENDING: 'Pending Review',
    APPROVED: 'Approved',
    DENIED: 'Denied',
    CANCELLED: 'Cancelled',
    AUTO_APPROVED: 'Auto-Approved',
    PROCESSING: 'Processing',
  },

  // Incident Status
  INCIDENT: {
    OPEN: 'Open',
    ACKNOWLEDGED: 'Acknowledged',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed',
  },

  // Export Status
  EXPORT: {
    QUEUED: 'Queued',
    PROCESSING: 'Processing',
    COMPLETED: 'Completed',
    FAILED: 'Failed',
    CANCELLED: 'Cancelled',
    EXPIRED: 'Expired',
  },

  // Compliance Violation Severity
  VIOLATION: {
    HARD: 'Hard Violation',
    SOFT: 'Soft Violation',
    RESOLVED: 'Resolved',
  },

  // Contract Types
  CONTRACT: {
    FULL_TIME: 'Full-time',
    PART_TIME: 'Part-time',
    TEMPORARY: 'Temporary',
    FREELANCE: 'Freelance',
    INTERN: 'Intern',
  },

  // Business Types
  BUSINESS_TYPE: {
    COFFEE_BAR: 'Coffee Bar',
    TRATTORIA: 'Trattoria',
    PIZZERIA: 'Pizzeria',
    FINE_DINING: 'Fine Dining',
    FAST_CASUAL: 'Fast Casual',
    BAR_PUB: 'Bar/Pub',
    HOTEL_RESTAURANT: 'Hotel Restaurant',
    CATERING: 'Catering',
    FOOD_TRUCK: 'Food Truck',
  },
} as const;
