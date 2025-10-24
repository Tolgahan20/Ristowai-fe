import { BaseEntity } from '@/types/common';

// Enums
export enum ScheduleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// Schedule Generation Summary
export interface ScheduleGenerationSummary {
  shifts: number;
  phaseFillRate: number; // 0.0 to 1.0
  hardViolations: number;
  softViolations: number;
  totalCostEur?: number;
}

// Generation Goals
export interface GenerationGoals {
  costOptimization?: boolean;
  fairRotation?: boolean;
  respectPhases?: boolean;
  overtimeCapEur?: number;
  maxShiftHours?: number;
  minRestHours?: number;
  minimizeOvertime?: boolean;
  respectPreferences?: boolean;
}

// Request DTOs
export interface CreateScheduleRequest {
  venueId: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  notes?: string;
  generationGoals?: GenerationGoals;
  lockManagerChoices?: boolean;
}

export interface UpdateScheduleRequest {
  name?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
  status?: ScheduleStatus;
  generationGoals?: GenerationGoals;
  lockManagerChoices?: boolean;
}

// Response DTOs
export interface ScheduleResponseDto extends BaseEntity {
  venueId: string;
  name: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  status: ScheduleStatus;
  lastGeneratedAt?: string;
  generatedByUserId?: string;
  generationSummary?: ScheduleGenerationSummary;
  publishedAt?: string;
  publishedByUserId?: string;
  version: number;
  parentScheduleId?: string;
  notes?: string;
  generationGoals?: GenerationGoals;
  lockManagerChoices?: boolean;
  shifts?: unknown[]; // Will be detailed later when we implement shift details
  violations?: unknown[]; // Will be detailed later when we implement violations
}

// Query parameters
export interface ScheduleQueryParams {
  venueId?: string;
  status?: ScheduleStatus;
  startDate?: string;
  endDate?: string;
  includeShifts?: boolean;
  includeViolations?: boolean;
  page?: number;
  limit?: number;
}

// Statistics
export interface ScheduleStats {
  totalSchedules: number;
  draftSchedules: number;
  publishedSchedules: number;
  archivedSchedules: number;
  totalShifts: number;
  averageCostPerSchedule: number;
}

// Form data for UI
export interface ScheduleFormData {
  name: string;
  startDate: string;
  endDate: string;
  notes?: string;
}

// Helper functions
export const getScheduleStatusColor = (status: ScheduleStatus): string => {
  switch (status) {
    case ScheduleStatus.DRAFT:
      return 'default';
    case ScheduleStatus.PUBLISHED:
      return 'success';
    case ScheduleStatus.ARCHIVED:
      return 'secondary';
    default:
      return 'default';
  }
};

export const getScheduleStatusLabel = (status: ScheduleStatus): string => {
  switch (status) {
    case ScheduleStatus.DRAFT:
      return 'Draft';
    case ScheduleStatus.PUBLISHED:
      return 'Published';
    case ScheduleStatus.ARCHIVED:
      return 'Archived';
    default:
      return status;
  }
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  
  if (start.getFullYear() !== end.getFullYear()) {
    return `${start.toLocaleDateString('en-US', { ...options, year: 'numeric' })} - ${end.toLocaleDateString('en-US', { ...options, year: 'numeric' })}`;
  }
  
  if (start.getMonth() !== end.getMonth()) {
    return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
  }
  
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
};

export const calculateScheduleDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

