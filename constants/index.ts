// Central export for all constants
export * from './endpoints';
export * from './messages';
export * from './enums';

// Application Constants
export const APP_CONFIG = {
  NAME: 'Smart Shifts',
  VERSION: '1.0.0',
  DESCRIPTION: 'AI-Powered Restaurant Scheduling System',
  LOCALE: 'it-IT',
  CURRENCY: 'EUR',
  TIMEZONE: 'Europe/Rome',
} as const;

// UI Constants
export const UI_CONFIG = {
  // Breakpoints (matching Tailwind CSS)
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Animation durations (in milliseconds)
  ANIMATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Debounce delays
  DEBOUNCE: {
    SEARCH: 300,
    INPUT: 500,
    API_CALL: 1000,
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },
  
  // File upload
  FILE_UPLOAD: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: ['.pdf', '.csv', '.xlsx', '.png', '.jpg', '.jpeg'],
    CHUNK_SIZE: 1024 * 1024, // 1MB chunks
  },
} as const;

// Business Logic Constants
export const BUSINESS_CONFIG = {
  // Time constants
  TIME: {
    MINUTES_PER_DAY: 1440,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    DAYS_PER_WEEK: 7,
  },
  
  // Italian Labor Law Constants
  LABOR_LAW: {
    MAX_DAILY_HOURS: 8,
    MAX_SHIFT_HOURS: 13,
    MIN_REST_HOURS: 11,
    WEEKLY_REST_HOURS: 24,
    MAX_WEEKLY_HOURS: 48,
    MAX_YEARLY_OVERTIME: 250,
    MINOR_MAX_DAILY_HOURS: 8,
    MINOR_MIN_REST_HOURS: 12,
    BREAK_REQUIRED_AFTER_HOURS: 6,
  },
  
  // Cost calculation
  COST: {
    OVERTIME_MULTIPLIER: 1.5,
    NIGHT_SHIFT_MULTIPLIER: 1.25,
    HOLIDAY_MULTIPLIER: 2.0,
    SUNDAY_MULTIPLIER: 1.3,
  },
  
  // Schedule generation
  SCHEDULE: {
    MAX_GENERATION_ATTEMPTS: 3,
    MIN_STAFF_PER_PHASE: 1,
    MAX_CONSECUTIVE_DAYS: 6,
    FAIR_ROTATION_WEIGHT: 0.3,
    COST_OPTIMIZATION_WEIGHT: 0.4,
    COMPLIANCE_WEIGHT: 0.3,
  },
} as const;

// Route Constants
export const ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Dashboard
  DASHBOARD: '/',
  
  // Restaurant Management
  RESTAURANTS: '/restaurants',
  RESTAURANT_DETAIL: (id: string) => `/restaurants/${id}`,
  RESTAURANT_SETTINGS: (id: string) => `/restaurants/${id}/settings`,
  
  // Venue Management
  VENUES: '/venues',
  VENUE_DETAIL: (id: string) => `/venues/${id}`,
  VENUE_SETTINGS: (id: string) => `/venues/${id}/settings`,
  
  // Staff Management
  STAFF: '/staff',
  STAFF_DETAIL: (id: string) => `/staff/${id}`,
  STAFF_SCHEDULE: (id: string) => `/staff/${id}/schedule`,
  
  // Roles
  ROLES: '/roles',
  ROLE_DETAIL: (id: string) => `/roles/${id}`,
  
  // Schedules
  SCHEDULES: '/schedules',
  SCHEDULE_DETAIL: (id: string) => `/schedules/${id}`,
  SCHEDULE_BUILDER: '/schedules/builder',
  SCHEDULE_CALENDAR: '/schedules/calendar',
  
  // Compliance
  COMPLIANCE: '/compliance',
  COMPLIANCE_VIOLATIONS: '/compliance/violations',
  COMPLIANCE_REPORTS: '/compliance/reports',
  
  // Requests
  REQUESTS: '/requests',
  REQUEST_DETAIL: (id: string) => `/requests/${id}`,
  
  // Incidents
  INCIDENTS: '/incidents',
  INCIDENT_DETAIL: (id: string) => `/incidents/${id}`,
  INCIDENT_DASHBOARD: '/incidents/dashboard',
  
  // Time Tracking
  PUNCH: '/punch',
  TIMECARDS: '/timecards',
  
  // Analytics
  ANALYTICS: '/analytics',
  ANALYTICS_KPIS: '/analytics/kpis',
  ANALYTICS_REPORTS: '/analytics/reports',
  
  // Exports
  EXPORTS: '/exports',
  
  // Settings
  SETTINGS: '/settings',
  PROFILE: '/profile',
  
  // Onboarding
  ONBOARDING: '/onboarding',
  
  // Help & Support
  HELP: '/help',
  SUPPORT: '/support',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  ACTIVE_RESTAURANT: 'active_restaurant',
  ACTIVE_VENUE: 'active_venue',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_PROGRESS: 'onboarding_progress',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  RECENT_SEARCHES: 'recent_searches',
  PREFERENCES: 'preferences',
} as const;

// Event Names for Custom Events
export const EVENTS = {
  AUTH_STATE_CHANGED: 'auth:state_changed',
  RESTAURANT_SWITCHED: 'restaurant:switched',
  VENUE_SWITCHED: 'venue:switched',
  SCHEDULE_UPDATED: 'schedule:updated',
  NOTIFICATION_RECEIVED: 'notification:received',
  COMPLIANCE_VIOLATION: 'compliance:violation',
  EXPORT_COMPLETED: 'export:completed',
  THEME_CHANGED: 'theme:changed',
  SIDEBAR_TOGGLED: 'sidebar:toggled',
} as const;

// Date/Time Formats
export const DATE_FORMATS = {
  ISO_DATE: 'YYYY-MM-DD',
  DISPLAY_DATE: 'DD/MM/YYYY',
  DISPLAY_DATE_TIME: 'DD/MM/YYYY HH:mm',
  TIME_24H: 'HH:mm',
  TIME_12H: 'hh:mm A',
  MONTH_YEAR: 'MMMM YYYY',
  DAY_MONTH: 'DD MMM',
  FULL_DATE: 'dddd, DD MMMM YYYY',
} as const;

// Color Constants (for charts, status indicators, etc.)
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#64748B',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#06B6D4',
  
  // Status colors
  STATUS: {
    ACTIVE: '#10B981',
    INACTIVE: '#94A3B8',
    PENDING: '#F59E0B',
    APPROVED: '#10B981',
    DENIED: '#EF4444',
    CANCELLED: '#64748B',
  },
  
  // Violation severity colors
  VIOLATION: {
    HARD: '#EF4444',
    SOFT: '#F59E0B',
    RESOLVED: '#10B981',
  },
  
  // Chart colors
  CHART: [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#06B6D4',
    '#84CC16',
    '#F97316',
    '#EC4899',
    '#14B8A6',
  ],
} as const;
