// API Endpoints Constants
// Based on backend API documentation

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FIREBASE: '/auth/firebase',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_RESET_OTP: '/auth/verify-reset-otp',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    STATS: '/auth/stats',
    LOGOUT_ALL: '/auth/logout-all',
  },

  // Restaurants
  RESTAURANTS: {
    BASE: '/restaurants',
    ACTIVE: '/restaurants/active',
    BY_ID: (id: string) => `/restaurants/${id}`,
    STATUS: (id: string) => `/restaurants/${id}/status`,
    SUBSCRIPTION: (id: string) => `/restaurants/${id}/subscription`,
    ONBOARDING: (id: string) => `/restaurants/${id}/onboarding`,
    SUBSCRIPTION_STATUS: (id: string) => `/restaurants/${id}/subscription-status`,
    FEATURE: (id: string, feature: string) => `/restaurants/${id}/feature/${feature}`,
  },

  // Restaurant Members
  MEMBERS: {
    BASE: (restaurantId: string) => `/restaurants/${restaurantId}/members`,
    INVITE: (restaurantId: string) => `/restaurants/${restaurantId}/members/invite`,
    BY_ID: (restaurantId: string, memberId: string) => `/restaurants/${restaurantId}/members/${memberId}`,
    ACCEPT: (restaurantId: string, userId: string) => `/restaurants/${restaurantId}/members/${userId}/accept`,
    DECLINE: (restaurantId: string, userId: string) => `/restaurants/${restaurantId}/members/${userId}/decline`,
    RESEND: (restaurantId: string, memberId: string) => `/restaurants/${restaurantId}/members/${memberId}/resend-invitation`,
    VENUE_ACCESS: (restaurantId: string, venueId: string) => `/restaurants/${restaurantId}/members/venues/${venueId}/access`,
    STATS: (restaurantId: string) => `/restaurants/${restaurantId}/members/stats`,
    USER_MEMBERSHIPS: '/user/restaurant-memberships',
  },

  // Venues
  VENUES: {
    CREATE: (restaurantId: string) => `/venues/${restaurantId}`,
    BY_RESTAURANT: (restaurantId: string) => `/venues/restaurant/${restaurantId}`,
    ACTIVE_BY_RESTAURANT: (restaurantId: string) => `/venues/restaurant/${restaurantId}/active`,
    BY_ID: (id: string) => `/venues/${id}`,
    UPDATE: (id: string) => `/venues/${id}`,
    DELETE: (id: string) => `/venues/${id}`,
    TOGGLE_ACTIVE: (id: string) => `/venues/${id}/toggle-active`,
  },

  // Staff
  STAFF: {
    BASE: '/staff',
    CREATE: (venueId: string) => `/staff/venue/${venueId}`,
    BY_VENUE: (venueId: string) => `/staff/venue/${venueId}`,
    BY_VENUE_ACTIVE: (venueId: string) => `/staff/venue/${venueId}/active`,
    BY_ROLE: (roleId: string) => `/staff/role/${roleId}`,
    BY_ID: (id: string) => `/staff/${id}`,
    UPDATE: (id: string) => `/staff/${id}`,
    DELETE: (id: string) => `/staff/${id}`,
    TOGGLE_ACTIVE: (id: string) => `/staff/${id}/toggle-active`,
    ACCESS_TOKEN: (id: string) => `/staff/${id}/access-token`,
    OVERTIME_HOURS: (id: string) => `/staff/${id}/overtime-hours`,
  },

  // Roles
  ROLES: {
    BASE: '/roles',
    CREATE: (venueId: string) => `/roles/venue/${venueId}`,
    BY_VENUE: (venueId: string) => `/roles/venue/${venueId}`,
    BY_VENUE_ACTIVE: (venueId: string) => `/roles/venue/${venueId}/active`,
    BY_VENUE_STATS: (venueId: string) => `/roles/venue/${venueId}/stats`,
    BY_ID: (id: string) => `/roles/${id}`,
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
    STAFF_COUNT: (id: string) => `/roles/${id}/staff-count`,
    TOGGLE_ACTIVE: (id: string) => `/roles/${id}/toggle-active`,
  },

  // Schedules
  SCHEDULES: {
    BASE: '/schedules',
    STATS: '/schedules/stats',
    BY_ID: (id: string) => `/schedules/${id}`,
    GENERATE: (id: string) => `/schedules/${id}/generate`,
    PUBLISH: (id: string) => `/schedules/${id}/publish`,
    AI_OPTIMIZE: (id: string) => `/schedules/${id}/ai-optimize`,
  },

  // Shifts
  SHIFTS: {
    BASE: '/shifts',
    BY_STAFF: (staffId: string) => `/shifts/staff/${staffId}`,
    BY_ID: (id: string) => `/shifts/${id}`,
    CONFLICTS: (id: string) => `/shifts/${id}/conflicts`,
  },

  // Compliance
  COMPLIANCE: {
    VALIDATE: (scheduleId: string) => `/schedules/${scheduleId}/compliance/validate`,
    SCAN: (scheduleId: string) => `/schedules/${scheduleId}/compliance/scan`,
    VIOLATIONS: (scheduleId: string) => `/schedules/${scheduleId}/compliance/violations`,
    VIOLATION_RESOLUTION: (scheduleId: string, violationId: string) => 
      `/schedules/${scheduleId}/compliance/violations/${violationId}/resolution-plan`,
    RESOLVE_VIOLATION: (scheduleId: string, violationId: string) => 
      `/schedules/${scheduleId}/compliance/violations/${violationId}/resolve`,
    BULK_RESOLVE: (scheduleId: string) => `/schedules/${scheduleId}/compliance/violations/bulk-resolve`,
    VALIDATE_SHIFT: (scheduleId: string, shiftId: string) => 
      `/schedules/${scheduleId}/compliance/shifts/${shiftId}/validate`,
    RULES: (scheduleId: string) => `/schedules/${scheduleId}/compliance/rules`,
    RULE_DETAILS: (scheduleId: string, ruleCode: string) => 
      `/schedules/${scheduleId}/compliance/rules/${ruleCode}`,
    STATISTICS: (scheduleId: string) => `/schedules/${scheduleId}/compliance/statistics`,
    SUMMARY_REPORT: (scheduleId: string) => `/schedules/${scheduleId}/compliance/reports/summary`,
    TRENDS_REPORT: (scheduleId: string) => `/schedules/${scheduleId}/compliance/reports/trends`,
  },

  // Requests
  REQUESTS: {
    BASE: '/requests',
    CALCULATE_IMPACT: '/requests/calculate-impact',
    BULK_ACTION: '/requests/bulk-action',
    STATS: '/requests/stats',
    MANAGER_INBOX: '/requests/manager-inbox',
    BY_ID: (id: string) => `/requests/${id}`,
    REVIEW: (id: string) => `/requests/${id}/review`,
  },

  // WhatsApp Requests
  WHATSAPP_REQUESTS: {
    GENERATE_TOKEN: '/whatsapp-requests/generate-token',
    VERIFY_TOKEN: '/whatsapp-requests/verify-token',
    CREATE_REQUEST: '/whatsapp-requests/create-request',
    RESEND_CODE: (token: string) => `/whatsapp-requests/resend-code/${token}`,
    STAFF_STATS: (staffId: string) => `/whatsapp-requests/staff-stats/${staffId}`,
    VENUE_STATS: '/whatsapp-requests/venue-stats',
    REVOKE_TOKEN: (staffId: string) => `/whatsapp-requests/revoke-token/${staffId}`,
    CLEANUP_EXPIRED: '/whatsapp-requests/cleanup-expired',
  },

  // Request Workflows
  REQUEST_WORKFLOWS: {
    EVALUATE_APPROVAL: (id: string) => `/requests/workflow/${id}/evaluate-approval`,
    PROCESS_AUTO_APPROVAL: (id: string) => `/requests/workflow/${id}/process-auto-approval`,
    REBALANCE: (id: string) => `/requests/workflow/${id}/rebalance`,
    APPROVAL_STATS: '/requests/workflow/approval-stats',
    REBALANCING_STATS: '/requests/workflow/rebalancing-stats',
    BATCH_PROCESS: '/requests/workflow/batch-process',
    HEALTH_CHECK: '/requests/workflow/health-check',
  },

  // Incidents
  INCIDENTS: {
    BASE: '/incidents',
    QUICK: '/incidents/quick',
    DASHBOARD: '/incidents/dashboard',
    BY_ID: (id: string) => `/incidents/${id}`,
    ACKNOWLEDGE: (id: string) => `/incidents/${id}/acknowledge`,
    GENERATE_SOLUTIONS: (id: string) => `/incidents/${id}/solutions/generate`,
    APPLY_SOLUTION: (id: string, solutionId: string) => `/incidents/${id}/solutions/${solutionId}/apply`,
    RESOLVE: (id: string) => `/incidents/${id}/resolve`,
    CLOSE: (id: string) => `/incidents/${id}/close`,
    ANALYTICS_TRENDS: '/incidents/analytics/trends',
  },

  // Punch/Time Tracking
  PUNCH: {
    BASE: '/punch',
    BY_STAFF_SLUG: (staffSlug: string) => `/punch/staff/${staffSlug}`,
    BY_MANAGER: (staffId: string, venueId: string) => `/punch/staff/${staffId}/venue/${venueId}`,
    STATS: '/punch/stats',
    BY_STAFF: (staffId: string) => `/punch/staff/${staffId}`,
    BY_VENUE: (venueId: string) => `/punch/venue/${venueId}`,
    BY_ID: (id: string) => `/punch/${id}`,
    VERIFY: (id: string) => `/punch/${id}/verify`,
    RECONCILE: (id: string) => `/punch/${id}/reconcile`,
    ANOMALIES: (venueId: string) => `/punch/venue/${venueId}/anomalies`,
    UNRECONCILED: (venueId: string) => `/punch/venue/${venueId}/unreconciled`,
  },

  // Exports
  EXPORTS: {
    BASE: '/exports',
    BULK: '/exports/bulk',
    STATS: '/exports/stats',
    BY_VENUE: (venueId: string) => `/exports/venue/${venueId}`,
    BY_ID: (id: string) => `/exports/${id}`,
    DOWNLOAD: (id: string) => `/exports/${id}/download`,
    RETRY: (id: string) => `/exports/${id}/retry`,
    CLEANUP: '/exports/cleanup',
    SUPPORTED_TYPES: '/exports/types/supported',
    RECENT: (venueId: string) => `/exports/venue/${venueId}/recent`,
    FAILED: (venueId: string) => `/exports/venue/${venueId}/failed`,
  },

  // Analytics
  ANALYTICS: {
    KPIS: '/analytics/kpis',
    MANAGER_USAGE_START: '/analytics/manager-usage/start',
    MANAGER_USAGE_COMPLETE: (usageId: string) => `/analytics/manager-usage/${usageId}/complete`,
    MANAGER_USAGE_ACTIVE: (venueId: string) => `/analytics/manager-usage/active/${venueId}`,
    MANAGER_USAGE_HISTORY: (venueId: string) => `/analytics/manager-usage/history/${venueId}`,
    MANAGER_EFFICIENCY: (venueId: string, period: string) => 
      `/analytics/manager-usage/efficiency/${venueId}/${period}`,
    CALCULATE_KPIS: (venueId: string) => `/analytics/kpis/calculate/${venueId}`,
  },

  // AI
  AI: {
    REQUEST: (venueId: string) => `/ai/request/${venueId}`,
    HEALTH: (venueId: string) => `/ai/health/${venueId}`,
  },

  // Phase Templates
  PHASE_TEMPLATES: {
    BY_VENUE: (venueId: string) => `/phase-templates/venue/${venueId}`,
    BY_VENUE_ACTIVE: (venueId: string) => `/phase-templates/venue/${venueId}/active`,
    BY_VENUE_DAY: (venueId: string, dayOfWeek: number) => 
      `/phase-templates/venue/${venueId}/day/${dayOfWeek}`,
    BY_ID: (id: string) => `/phase-templates/${id}`,
    TOGGLE_ACTIVE: (id: string) => `/phase-templates/${id}/toggle-active`,
    DUPLICATE: (id: string) => `/phase-templates/${id}/duplicate`,
  },

  // Phase Instances
  PHASE_INSTANCES: {
    BY_VENUE: (venueId: string) => `/phase-instances/venue/${venueId}`,
    FROM_TEMPLATE: (venueId: string, templateId: string) => 
      `/phase-instances/venue/${venueId}/from-template/${templateId}`,
    GENERATE: (venueId: string) => `/phase-instances/venue/${venueId}/generate`,
    BY_VENUE_DATE: (venueId: string, date: string) => 
      `/phase-instances/venue/${venueId}/date/${date}`,
    BY_VENUE_DATE_RANGE: (venueId: string) => `/phase-instances/venue/${venueId}/date-range`,
    BY_ID: (id: string) => `/phase-instances/${id}`,
    STATUS: (id: string) => `/phase-instances/${id}/status`,
  },

  // Phase Coverage
  PHASE_COVERAGE: {
    INSTANCE: (instanceId: string) => `/phases/coverage/instance/${instanceId}`,
    VENUE_DATE: (venueId: string, date: string) => `/phases/coverage/venue/${venueId}/date/${date}`,
    VENUE_RANGE: (venueId: string) => `/phases/coverage/venue/${venueId}/range`,
    UPDATE_STATUS: (instanceId: string) => `/phases/coverage/instance/${instanceId}/update-status`,
    UPDATE_STATUS_BATCH: (venueId: string) => `/phases/coverage/venue/${venueId}/update-status-batch`,
    GENERATE_INSTANCES: (venueId: string) => `/phases/coverage/venue/${venueId}/generate-instances`,
    TIMELINE: (venueId: string, date: string) => `/phases/coverage/venue/${venueId}/timeline/${date}`,
  },

  // Onboarding
  ONBOARDING: {
    FLOWS: '/onboarding/flows',
    SESSIONS: '/onboarding/sessions',
    ACTIVE_SESSION: '/onboarding/sessions/active',
    SESSION_BY_ID: (id: string) => `/onboarding/sessions/${id}`,
    COMPLETE_STEP: (id: string, stepId: string) => `/onboarding/sessions/${id}/steps/${stepId}`,
    BACK_STEP: (id: string) => `/onboarding/sessions/${id}/back`,
    PAUSE: (id: string) => `/onboarding/sessions/${id}/pause`,
    RESUME: (id: string) => `/onboarding/sessions/${id}/resume`,
    CANCEL: (id: string) => `/onboarding/sessions/${id}/cancel`,
    PRESETS: '/onboarding/presets',
    PRESET_BY_NAME: (presetName: string) => `/onboarding/presets/${presetName}`,
    ROLE_SUGGESTIONS: (venueId: string, presetName: string) => 
      `/onboarding/venues/${venueId}/role-suggestions/${presetName}`,
    SYSTEM_SUMMARY: '/onboarding/system-summary',
  },

  // Business Presets
  BUSINESS_PRESETS: {
    BASE: '/business-presets',
    ALL: '/business-presets/all',
    BY_NAME: (presetName: string) => `/business-presets/${presetName}`,
    ROLE_MAPPING: (presetName: string, venueId: string) => 
      `/business-presets/${presetName}/role-mapping/venue/${venueId}`,
    APPLY: (presetName: string, venueId: string) => 
      `/business-presets/${presetName}/apply/venue/${venueId}`,
  },

  // Audit & Security
  AUDIT: {
    LOGS: '/audit/logs',
    LOG_BY_ID: (id: string) => `/audit/logs/${id}`,
    SECURITY_EVENTS: '/audit/security-events',
    COMPLIANCE_REPORT: '/audit/compliance-report',
    CREATE_LOG: '/audit/log',
    USER_ACTIVITY: (userId: string) => `/audit/activity/${userId}`,
  },

  // GDPR & Data Protection
  GDPR: {
    COMPLIANCE_REPORT: '/gdpr/compliance-report',
    REQUESTS: '/gdpr/requests',
    PROCESS_REQUEST: (id: string) => `/gdpr/requests/${id}/process`,
    CONSENT: '/gdpr/consent',
    WITHDRAW_CONSENT: (type: string) => `/gdpr/consent/${type}`,
    MY_DATA: '/gdpr/my-data',
    DATA_EXPORT: '/gdpr/data-export',
    RETENTION_POLICIES: '/gdpr/retention-policies',
    EXECUTE_RETENTION: (id: string) => `/gdpr/retention-policies/${id}/execute`,
    ANALYZE_RETENTION: (id: string) => `/gdpr/retention-policies/${id}/analyze`,
  },
} as const;
