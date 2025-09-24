// Restaurant-related types

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  businessType?: string;
  description?: string;
  timezone: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  currency: string;
  locale: string;
  status: RestaurantStatus;
  subscriptionTier: SubscriptionTier;
  hasCompletedOnboarding: boolean;
  onboardingProgress?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum RestaurantStatus {
  PENDING_SETUP = 'PENDING_SETUP',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE'
}

export interface CreateRestaurantRequest {
  name: string;
  businessType?: string;
  description?: string;
  timezone?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  currency?: string;
  locale?: string;
}

export interface UpdateRestaurantRequest {
  name?: string;
  businessType?: string;
  description?: string;
  timezone?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  openingHours?: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  currency?: string;
  locale?: string;
}

export interface UpdateRestaurantStatusRequest {
  status: RestaurantStatus;
}

export interface UpdateSubscriptionRequest {
  subscriptionTier: SubscriptionTier;
  subscriptionExpiresAt?: Date;
}

export interface UpdateOnboardingProgressRequest {
  onboardingProgress: number;
  hasCompletedOnboarding?: boolean;
}

export interface RestaurantSubscriptionStatus {
  isActive: boolean;
  tier: SubscriptionTier;
  expiresAt?: Date;
  trialDaysRemaining?: number;
}

export interface RestaurantFeatureAccess {
  hasAccess: boolean;
  reason?: string;
}
