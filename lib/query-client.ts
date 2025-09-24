import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache time: 10 minutes
      gcTime: 10 * 60 * 1000,
      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error instanceof AxiosError && error.response?.status && error.response.status < 500) {
          return false;
        }
        // Retry up to 3 times for 5xx errors
        return failureCount < 3;
      },
      // Retry delay: exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry mutations once
      retry: 1,
      // Retry delay: 1 second
      retryDelay: 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Global error handling for queries
      console.error(`❌ Query Error [${query.queryKey.join(', ')}]:`, error);
      
      // You can add global error notifications here
      // toast.error('Something went wrong. Please try again.');
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, _mutation) => {
      // Global error handling for mutations
      console.error(`❌ Mutation Error:`, error);
      
      // You can add global error notifications here
      // toast.error('Failed to save changes. Please try again.');
    },
    onSuccess: (data, _variables, _context, _mutation) => {
      // Global success handling for mutations
      if (process.env.NEXT_PUBLIC_ENABLE_DEBUG_MODE === 'true') {
      }
      
      // You can add global success notifications here
      // toast.success('Changes saved successfully!');
    },
  }),
});

// Query key factory for consistent key management
export const queryKeys = {
  // Auth
  auth: {
    me: ['auth', 'me'] as const,
    stats: ['auth', 'stats'] as const,
  },
  
  // Restaurants
  restaurants: {
    all: ['restaurants'] as const,
    active: ['restaurants', 'active'] as const,
    byId: (id: string) => ['restaurants', id] as const,
    subscription: (id: string) => ['restaurants', id, 'subscription'] as const,
    feature: (id: string, feature: string) => ['restaurants', id, 'feature', feature] as const,
  },
  
  // Venues
  venues: {
    all: ['venues'] as const,
    byRestaurant: (restaurantId: string) => ['venues', 'restaurant', restaurantId] as const,
    byRestaurantActive: (restaurantId: string) => ['venues', 'restaurant', restaurantId, 'active'] as const,
    byId: (id: string) => ['venues', id] as const,
  },
  
  // Staff
  staff: {
    all: ['staff'] as const,
    byVenue: (venueId: string) => ['staff', 'venue', venueId] as const,
    byVenueActive: (venueId: string) => ['staff', 'venue', venueId, 'active'] as const,
    byRole: (roleId: string) => ['staff', 'role', roleId] as const,
    byId: (id: string) => ['staff', id] as const,
  },
  
  // Roles
  roles: {
    all: ['roles'] as const,
    byVenue: (venueId: string) => ['roles', 'venue', venueId] as const,
    byVenueActive: (venueId: string) => ['roles', 'venue', venueId, 'active'] as const,
    byVenueStats: (venueId: string) => ['roles', 'venue', venueId, 'stats'] as const,
    byId: (id: string) => ['roles', id] as const,
    staffCount: (id: string) => ['roles', id, 'staff-count'] as const,
  },
  
  // Schedules
  schedules: {
    all: ['schedules'] as const,
    stats: (venueId?: string) => ['schedules', 'stats', venueId] as const,
    byId: (id: string) => ['schedules', id] as const,
    compliance: (scheduleId: string) => ['schedules', scheduleId, 'compliance'] as const,
    violations: (scheduleId: string) => ['schedules', scheduleId, 'violations'] as const,
  },
  
  // Shifts
  shifts: {
    all: ['shifts'] as const,
    byStaff: (staffId: string) => ['shifts', 'staff', staffId] as const,
    byId: (id: string) => ['shifts', id] as const,
    conflicts: (id: string) => ['shifts', id, 'conflicts'] as const,
  },
  
  // Requests
  requests: {
    all: ['requests'] as const,
    stats: ['requests', 'stats'] as const,
    managerInbox: ['requests', 'manager-inbox'] as const,
    byId: (id: string) => ['requests', id] as const,
  },
  
  // Incidents
  incidents: {
    all: ['incidents'] as const,
    dashboard: ['incidents', 'dashboard'] as const,
    analytics: ['incidents', 'analytics'] as const,
    byId: (id: string) => ['incidents', id] as const,
    solutions: (id: string) => ['incidents', id, 'solutions'] as const,
  },
  
  // Punch/Time Tracking
  punch: {
    all: ['punch'] as const,
    stats: ['punch', 'stats'] as const,
    byStaff: (staffId: string) => ['punch', 'staff', staffId] as const,
    byVenue: (venueId: string) => ['punch', 'venue', venueId] as const,
    byId: (id: string) => ['punch', id] as const,
    anomalies: (venueId: string) => ['punch', 'venue', venueId, 'anomalies'] as const,
    unreconciled: (venueId: string) => ['punch', 'venue', venueId, 'unreconciled'] as const,
  },
  
  // Exports
  exports: {
    all: ['exports'] as const,
    stats: ['exports', 'stats'] as const,
    types: ['exports', 'types'] as const,
    byVenue: (venueId: string) => ['exports', 'venue', venueId] as const,
    byVenueRecent: (venueId: string) => ['exports', 'venue', venueId, 'recent'] as const,
    byVenueFailed: (venueId: string) => ['exports', 'venue', venueId, 'failed'] as const,
    byId: (id: string) => ['exports', id] as const,
  },
  
  // Analytics
  analytics: {
    kpis: ['analytics', 'kpis'] as const,
    managerUsage: (venueId: string) => ['analytics', 'manager-usage', venueId] as const,
    managerHistory: (venueId: string) => ['analytics', 'manager-history', venueId] as const,
    efficiency: (venueId: string, period: string) => ['analytics', 'efficiency', venueId, period] as const,
  },
  
  // Phase Templates
  phaseTemplates: {
    all: ['phase-templates'] as const,
    byVenue: (venueId: string) => ['phase-templates', 'venue', venueId] as const,
    byVenueActive: (venueId: string) => ['phase-templates', 'venue', venueId, 'active'] as const,
    byVenueDay: (venueId: string, dayOfWeek: number) => ['phase-templates', 'venue', venueId, 'day', dayOfWeek] as const,
    byId: (id: string) => ['phase-templates', id] as const,
  },
  
  // Phase Instances
  phaseInstances: {
    all: ['phase-instances'] as const,
    byVenue: (venueId: string) => ['phase-instances', 'venue', venueId] as const,
    byVenueDate: (venueId: string, date: string) => ['phase-instances', 'venue', venueId, 'date', date] as const,
    byVenueDateRange: (venueId: string, from: string, to: string) => ['phase-instances', 'venue', venueId, 'range', from, to] as const,
    byId: (id: string) => ['phase-instances', id] as const,
  },
  
  // Phase Coverage
  phaseCoverage: {
    instance: (instanceId: string) => ['phase-coverage', 'instance', instanceId] as const,
    venueDate: (venueId: string, date: string) => ['phase-coverage', 'venue', venueId, 'date', date] as const,
    venueRange: (venueId: string, from: string, to: string) => ['phase-coverage', 'venue', venueId, 'range', from, to] as const,
    timeline: (venueId: string, date: string) => ['phase-coverage', 'venue', venueId, 'timeline', date] as const,
  },
  
  // Onboarding
  onboarding: {
    flows: ['onboarding', 'flows'] as const,
    sessions: ['onboarding', 'sessions'] as const,
    activeSession: ['onboarding', 'sessions', 'active'] as const,
    presets: ['onboarding', 'presets'] as const,
    preset: (presetName: string) => ['onboarding', 'presets', presetName] as const,
    systemSummary: ['onboarding', 'system-summary'] as const,
    roleSuggestions: (venueId: string, presetName: string) => ['onboarding', 'venues', venueId, 'role-suggestions', presetName] as const,
  },
  
  // Business Presets
  businessPresets: {
    all: ['business-presets'] as const,
    withDetails: ['business-presets', 'all'] as const,
    byName: (presetName: string) => ['business-presets', presetName] as const,
    roleMapping: (presetName: string, venueId: string) => ['business-presets', presetName, 'role-mapping', 'venue', venueId] as const,
  },
  
  // GDPR & Audit
  gdpr: {
    complianceReport: ['gdpr', 'compliance-report'] as const,
    requests: ['gdpr', 'requests'] as const,
    consent: ['gdpr', 'consent'] as const,
    myData: ['gdpr', 'my-data'] as const,
    retentionPolicies: ['gdpr', 'retention-policies'] as const,
  },
  
  audit: {
    logs: ['audit', 'logs'] as const,
    securityEvents: ['audit', 'security-events'] as const,
    complianceReport: ['audit', 'compliance-report'] as const,
    userActivity: (userId: string) => ['audit', 'activity', userId] as const,
  },
  
  // AI
  ai: {
    health: (venueId: string) => ['ai', 'health', venueId] as const,
  },
};

// Utility functions for query management
export const queryUtils = {
  // Invalidate all queries with a specific key pattern
  invalidateQueries: (keyPattern: readonly unknown[]) => {
    return queryClient.invalidateQueries({ queryKey: keyPattern });
  },
  
  // Remove all queries with a specific key pattern
  removeQueries: (keyPattern: readonly unknown[]) => {
    return queryClient.removeQueries({ queryKey: keyPattern });
  },
  
  // Reset all queries
  resetQueries: () => {
    return queryClient.resetQueries();
  },
  
  // Clear all caches
  clear: () => {
    return queryClient.clear();
  },
  
  // Prefetch a query
  prefetchQuery: (options: Parameters<typeof queryClient.prefetchQuery>[0]) => {
    return queryClient.prefetchQuery(options);
  },
  
  // Set query data
  setQueryData: <T>(queryKey: readonly unknown[], data: T) => {
    return queryClient.setQueryData(queryKey, data);
  },
  
  // Get query data
  getQueryData: <T>(queryKey: readonly unknown[]) => {
    return queryClient.getQueryData<T>(queryKey);
  },
};
