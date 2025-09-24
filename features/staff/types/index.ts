// Staff management types based on backend DTOs
import { BaseEntity } from '@/types/common';

export enum ContractType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  TEMPORARY = 'temporary',
  FREELANCE = 'freelance',
  INTERN = 'intern',
  CONTRACT = 'contract'
}

export interface AvailabilityPreferences {
  daysOff?: number[]; // 0=Sunday, 1=Monday, etc.
  preferredStartTime?: number; // minute of day
  preferredEndTime?: number; // minute of day
  maxHoursPerDay?: number;
  maxHoursPerWeek?: number;
}

// Create DTOs (for forms)
export interface CreateStaffRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  primaryRoleId: string;
  contractType: ContractType;
  weeklyContractHours: number;
  hireDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD for temporary contracts
  availabilityPreferences?: AvailabilityPreferences;
  isMinor?: boolean;
  annualOvertimeHours?: number;
  annualOvertimeLimit?: number;
  isActive?: boolean;
}

export interface CreateRoleRequest {
  name: string;
  level?: string;
  description?: string;
  hourlyRate?: number;
  isActive?: boolean;
}

export interface UpdateStaffRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  primaryRoleId?: string;
  contractType?: ContractType;
  weeklyContractHours?: number;
  hireDate?: string;
  endDate?: string;
  availabilityPreferences?: AvailabilityPreferences;
  isMinor?: boolean;
  annualOvertimeHours?: number;
  annualOvertimeLimit?: number;
  isActive?: boolean;
}

export interface UpdateRoleRequest {
  name?: string;
  level?: string;
  description?: string;
  hourlyRate?: number;
  isActive?: boolean;
}

// Response DTOs (from API)
export interface StaffResponseDto extends BaseEntity {
  venueId: string;
  primaryRoleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsappNumber: string;
  contractType?: ContractType;
  weeklyContractHours?: number;
  hireDate?: string;
  endDate?: string;
  availabilityPreferences?: AvailabilityPreferences;
  isMinor: boolean;
  annualOvertimeHours: number;
  annualOvertimeLimit: number;
  accessToken?: string;
  accessTokenExpiresAt?: Date;
  isActive: boolean;
  // Computed properties
  fullName: string;
  remainingOvertimeHours: number;
  primaryRoleName?: string;
  hasAccessToken: boolean;
  isAccessTokenExpired: boolean;
}

export interface RoleResponseDto extends BaseEntity {
  venueId: string;
  name: string;
  level?: string;
  description?: string;
  hourlyRate?: number;
  isActive: boolean;
  // Computed properties
  displayName: string;
  staffCount: number;
}

// Legacy interfaces for backward compatibility
export interface Staff extends StaffResponseDto {
  isCritical?: boolean; // Added for backward compatibility
}
export interface Role extends RoleResponseDto {
  isCritical?: boolean; // Added for backward compatibility
}

// Setup data interface
export interface StaffSetupData {
  roles: Role[];
  staff: Staff[];
}

// Role statistics
export interface RoleStats {
  totalRoles: number;
  activeRoles: number;
  totalStaff: number;
  rolesWithStaff: number;
}

// Staff form data
export interface StaffFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsappNumber: string;
  primaryRoleId: string;
  contractType: ContractType;
  weeklyContractHours: number;
  hireDate: string;
  endDate?: string;
  isMinor: boolean;
  availabilityPreferences?: {
    daysOff: number[];
    preferredStartTime?: number; // minutes from midnight for API
    preferredEndTime?: number; // minutes from midnight for API
    maxHoursPerDay?: number;
    maxHoursPerWeek?: number;
  };
}

// Role form data
export interface RoleFormData {
  name: string;
  level: string;
  description: string;
  hourlyRate: number;
  isActive: boolean;
}

// Utility types
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Form validation schemas
export interface FormErrors {
  [key: string]: string | undefined;
}
