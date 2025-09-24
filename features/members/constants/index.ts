import { z } from 'zod';
import { RestaurantRole, MemberStatus, MemberPermissions } from '../types';

// Role Configuration
export const RESTAURANT_ROLE_CONFIG = {
  [RestaurantRole.OWNER]: {
    label: 'Owner',
    description: 'Full access to all restaurant operations',
    color: 'purple',
    canInvite: true,
    canRemove: false,
    defaultPermissions: {
      canManageStaff: true,
      canManageSchedules: true,
      canViewReports: true,
      canManageSettings: true,
      canManageVenues: true,
      canInviteMembers: true,
      canManageBilling: true,
      canExportData: true,
      canAccessAPI: true,
      canManageIntegrations: true,
    },
  },
  [RestaurantRole.MANAGER]: {
    label: 'Manager',
    description: 'Manage staff, schedules, and operations',
    color: 'blue',
    canInvite: true,
    canRemove: true,
    defaultPermissions: {
      canManageStaff: true,
      canManageSchedules: true,
      canViewReports: true,
      canManageSettings: false,
      canManageVenues: false,
      canInviteMembers: true,
      canManageBilling: false,
      canExportData: true,
      canAccessAPI: false,
      canManageIntegrations: false,
    },
  },
  [RestaurantRole.ASSISTANT_MANAGER]: {
    label: 'Assistant Manager',
    description: 'Assist with staff and schedule management',
    color: 'green',
    canInvite: false,
    canRemove: true,
    defaultPermissions: {
      canManageStaff: true,
      canManageSchedules: true,
      canViewReports: true,
      canManageSettings: false,
      canManageVenues: false,
      canInviteMembers: false,
      canManageBilling: false,
      canExportData: true,
      canAccessAPI: false,
      canManageIntegrations: false,
    },
  },
  [RestaurantRole.SHIFT_SUPERVISOR]: {
    label: 'Shift Supervisor',
    description: 'Supervise shifts and basic staff management',
    color: 'orange',
    canInvite: false,
    canRemove: true,
    defaultPermissions: {
      canManageStaff: false,
      canManageSchedules: true,
      canViewReports: true,
      canManageSettings: false,
      canManageVenues: false,
      canInviteMembers: false,
      canManageBilling: false,
      canExportData: false,
      canAccessAPI: false,
      canManageIntegrations: false,
    },
  },
  [RestaurantRole.STAFF]: {
    label: 'Staff',
    description: 'Basic access to schedules and reports',
    color: 'gray',
    canInvite: false,
    canRemove: true,
    defaultPermissions: {
      canManageStaff: false,
      canManageSchedules: false,
      canViewReports: true,
      canManageSettings: false,
      canManageVenues: false,
      canInviteMembers: false,
      canManageBilling: false,
      canExportData: false,
      canAccessAPI: false,
      canManageIntegrations: false,
    },
  },
  [RestaurantRole.VIEWER]: {
    label: 'Viewer',
    description: 'Read-only access to reports',
    color: 'gray',
    canInvite: false,
    canRemove: true,
    defaultPermissions: {
      canManageStaff: false,
      canManageSchedules: false,
      canViewReports: true,
      canManageSettings: false,
      canManageVenues: false,
      canInviteMembers: false,
      canManageBilling: false,
      canExportData: false,
      canAccessAPI: false,
      canManageIntegrations: false,
    },
  },
} as const;

// Status Configuration
export const MEMBER_STATUS_CONFIG = {
  [MemberStatus.PENDING]: {
    label: 'Pending',
    description: 'Invitation sent, waiting for acceptance',
    color: 'yellow',
    icon: 'Clock',
  },
  [MemberStatus.ACTIVE]: {
    label: 'Active',
    description: 'Active member with full access',
    color: 'green',
    icon: 'CheckCircle',
  },
  [MemberStatus.SUSPENDED]: {
    label: 'Suspended',
    description: 'Temporarily suspended access',
    color: 'red',
    icon: 'Ban',
  },
} as const;

// Permission Configuration
export const PERMISSION_CONFIG = {
  canManageStaff: {
    label: 'Manage Staff',
    description: 'Create, edit, and manage staff members',
    category: 'staff',
  },
  canManageSchedules: {
    label: 'Manage Schedules',
    description: 'Create and modify work schedules',
    category: 'operations',
  },
  canViewReports: {
    label: 'View Reports',
    description: 'Access analytics and reports',
    category: 'reports',
  },
  canManageSettings: {
    label: 'Manage Settings',
    description: 'Modify restaurant settings',
    category: 'admin',
  },
  canManageVenues: {
    label: 'Manage Venues',
    description: 'Create and modify venues',
    category: 'admin',
  },
  canInviteMembers: {
    label: 'Invite Members',
    description: 'Send invitations to new team members',
    category: 'admin',
  },
  canManageBilling: {
    label: 'Manage Billing',
    description: 'Access billing and subscription management',
    category: 'admin',
  },
  canExportData: {
    label: 'Export Data',
    description: 'Export reports and data',
    category: 'reports',
  },
  canAccessAPI: {
    label: 'API Access',
    description: 'Access API endpoints',
    category: 'technical',
  },
  canManageIntegrations: {
    label: 'Manage Integrations',
    description: 'Configure third-party integrations',
    category: 'technical',
  },
} as const;

// Validation Schemas
export const memberInviteSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters'),
  role: z.nativeEnum(RestaurantRole),
  venueAccess: z
    .array(z.string())
    .min(1, 'At least one venue must be selected'),
  permissions: z.object({
    canManageStaff: z.boolean().default(false),
    canManageSchedules: z.boolean().default(false),
    canViewReports: z.boolean().default(true),
    canManageSettings: z.boolean().default(false),
    canManageVenues: z.boolean().default(false),
    canInviteMembers: z.boolean().default(false),
    canManageBilling: z.boolean().default(false),
    canExportData: z.boolean().default(false),
    canAccessAPI: z.boolean().default(false),
    canManageIntegrations: z.boolean().default(false),
  }),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  // Staff selection
  inviteType: z.enum(['new', 'existing']),
  selectedStaffId: z.string().optional(),
});

export const memberUpdateSchema = z.object({
  role: z.nativeEnum(RestaurantRole).optional(),
  venueAccess: z.array(z.string()).min(1, 'At least one venue must be selected').optional(),
  permissions: z.object({
    canManageStaff: z.boolean().optional(),
    canManageSchedules: z.boolean().optional(),
    canViewReports: z.boolean().optional(),
    canManageSettings: z.boolean().optional(),
    canManageVenues: z.boolean().optional(),
    canInviteMembers: z.boolean().optional(),
    canManageBilling: z.boolean().optional(),
    canExportData: z.boolean().optional(),
    canAccessAPI: z.boolean().optional(),
    canManageIntegrations: z.boolean().optional(),
  }).optional(),
  status: z.nativeEnum(MemberStatus).optional(),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
});

// Helper Functions
export function getRoleConfig(role: RestaurantRole) {
  return RESTAURANT_ROLE_CONFIG[role as keyof typeof RESTAURANT_ROLE_CONFIG];
}

export function getStatusConfig(status: MemberStatus) {
  return MEMBER_STATUS_CONFIG[status as keyof typeof MEMBER_STATUS_CONFIG];
}

export function getPermissionConfig(permission: keyof MemberPermissions) {
  return PERMISSION_CONFIG[permission];
}

export function getDefaultPermissions(role: RestaurantRole): MemberPermissions {
  return RESTAURANT_ROLE_CONFIG[role as keyof typeof RESTAURANT_ROLE_CONFIG].defaultPermissions;
}

export function canInviteMembers(role: RestaurantRole): boolean {
  return RESTAURANT_ROLE_CONFIG[role as keyof typeof RESTAURANT_ROLE_CONFIG].canInvite;
}

export function canRemoveMember(role: RestaurantRole): boolean {
  return RESTAURANT_ROLE_CONFIG[role as keyof typeof RESTAURANT_ROLE_CONFIG].canRemove;
}

export function getRoleOptions() {
  return Object.entries(RESTAURANT_ROLE_CONFIG).map(([value, config]) => ({
    value: value as RestaurantRole,
    label: config.label,
    description: config.description,
  }));
}

export function getStatusOptions() {
  return Object.entries(MEMBER_STATUS_CONFIG).map(([value, config]) => ({
    value: value as MemberStatus,
    label: config.label,
    description: config.description,
  }));
}
