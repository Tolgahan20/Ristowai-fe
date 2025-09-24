import { BaseEntity } from '@/types/common';

// Request DTOs
export interface CreateVenueRequest {
  name: string;
  timezone: string;
  address?: string;
  phone?: string;
  email?: string;
  openingMinute: number; // 0-1439, e.g., 360 for 06:00
  closingMinute: number; // 0-1439, e.g., 1260 for 21:00
  sector?: string; // 'Coffee Bar', 'Trattoria', 'Pizzeria', etc.
  currency?: string;
  locale?: string;
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  typicalOvertimeCost?: number;
  isActive?: boolean;
}

export interface UpdateVenueRequest {
  name?: string;
  timezone?: string;
  address?: string;
  phone?: string;
  email?: string;
  openingMinute?: number;
  closingMinute?: number;
  sector?: string;
  currency?: string;
  locale?: string;
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  typicalOvertimeCost?: number;
  isActive?: boolean;
}

// Response DTOs
export interface VenueResponseDto extends BaseEntity {
  restaurantId: string;
  name: string;
  timezone: string;
  address?: string;
  phone?: string;
  email?: string;
  openingMinute: number;
  closingMinute: number;
  sector?: string;
  currency: string;
  locale: string;
  managerHourlyValue?: number;
  weeklySchedulingHours?: number;
  typicalOvertimeCost?: number;
  baselineManagerHoursPerWeek?: number;
  avgOvertimeCostEurPerHour?: number;
  accountantSummary?: {
    sendMonthly?: boolean;
    closingDay?: number;
    deliverToEmails?: string[];
    formats?: string[];
  };
  isActive: boolean;
  whatsappConfig?: {
    staffGroupId?: string;
    managersGroupId?: string;
    emergencyGroupId?: string;
    enableNotifications?: boolean;
    notificationTypes?: string[];
    businessHours?: {
      start: string;
      end: string;
      quietHours?: boolean;
    };
  };
}

// Legacy interface for backward compatibility
export interface Venue extends VenueResponseDto {}

// Utility types
export interface VenueFormData extends Omit<CreateVenueRequest, 'openingMinute' | 'closingMinute'> {
  openingTime: string; // HH:MM format for form display
  closingTime: string; // HH:MM format for form display
}

export interface VenueStats {
  totalVenues: number;
  activeVenues: number;
  inactiveVenues: number;
  totalStaff: number;
  averageHourlyRate: number;
}

// Helper functions
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const formatVenueHours = (venue: VenueResponseDto): string => {
  const openTime = minutesToTime(venue.openingMinute);
  const closeTime = minutesToTime(venue.closingMinute);
  return `${openTime} - ${closeTime}`;
};
