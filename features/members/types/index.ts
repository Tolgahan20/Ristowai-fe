// Member Types and Interfaces
export interface RestaurantMember {
  id: string;
  userId: string;
  restaurantId: string;
  role: RestaurantRole;
  status: MemberStatus;
  permissions: MemberPermissions;
  venueAccess?: string[];
  invitedByUserId?: string;
  invitedAt?: string;
  joinedAt?: string;
  invitationMessage?: string;
  lastAccessAt?: string;
  lastAccessIp?: string;
  accessCount: number;
  preferences?: MemberPreferences;
  notes?: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl?: string;
    status: string;
  };
  restaurant: {
    id: string;
    name: string;
  };
  invitedBy?: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
}

export interface MemberPermissions {
  canManageStaff?: boolean;
  canManageSchedules?: boolean;
  canViewReports?: boolean;
  canManageSettings?: boolean;
  canManageVenues?: boolean;
  canInviteMembers?: boolean;
  canManageBilling?: boolean;
  canExportData?: boolean;
  canAccessAPI?: boolean;
  canManageIntegrations?: boolean;
}

export interface MemberPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  notificationTypes?: string[];
  language?: string;
  timezone?: string;
}

export enum RestaurantRole {
  OWNER = 'owner',
  MANAGER = 'manager',
  ASSISTANT_MANAGER = 'assistant_manager',
  SHIFT_SUPERVISOR = 'shift_supervisor',
  STAFF = 'staff',
  VIEWER = 'viewer',
}

export enum MemberStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  REMOVED = 'removed',
}

// DTOs for API requests
export interface InviteMemberRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: RestaurantRole;
  permissions?: Partial<MemberPermissions>;
  venueAccess?: string[];
  message?: string;
}

export interface UpdateMemberRequest {
  role?: RestaurantRole;
  permissions?: Partial<MemberPermissions>;
  venueAccess?: string[];
  status?: MemberStatus;
  notes?: string;
}

// Form data interfaces
export interface MemberInviteFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: RestaurantRole;
  venueAccess: string[];
  permissions: MemberPermissions;
  message?: string;
  // Staff selection options
  inviteType: 'new' | 'existing';
  selectedStaffId?: string;
}

export interface MemberEditFormData {
  role: RestaurantRole;
  venueAccess: string[];
  permissions: MemberPermissions;
  status: MemberStatus;
  notes: string;
}

// Response types
export type RestaurantMemberResponseDto = RestaurantMember;

export interface MemberStatsResponse {
  totalMembers: number;
  activeMembers: number;
  pendingInvitations: number;
  membersByRole: Record<RestaurantRole, number>;
}

// Utility types
export type MemberViewMode = 'list' | 'invite' | 'edit' | 'details';

export interface MemberListItem {
  id: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
  };
  role: RestaurantRole;
  status: MemberStatus;
  venueAccess?: string[];
  joinedAt?: string;
  lastAccessAt?: string;
}
