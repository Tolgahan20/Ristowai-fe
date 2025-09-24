"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantService } from '../services/restaurant.service';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type { CreateRestaurantRequest, UpdateRestaurantRequest, RestaurantStatus } from '../types';

// Query Keys
export const restaurantKeys = {
  all: ['restaurants'] as const,
  lists: () => [...restaurantKeys.all, 'list'] as const,
  active: () => [...restaurantKeys.all, 'active'] as const,
  detail: (id: string) => [...restaurantKeys.all, 'detail', id] as const,
  subscription: (id: string) => [...restaurantKeys.all, 'subscription', id] as const,
  feature: (id: string, feature: string) => [...restaurantKeys.all, 'feature', id, feature] as const,
};

// ===== Query Hooks =====

/**
 * Get all restaurants for current user
 */
export function useRestaurants() {
  return useQuery({
    queryKey: restaurantKeys.lists(),
    queryFn: () => restaurantService.getRestaurants(),
  });
}

/**
 * Get active restaurants for current user
 */
export function useActiveRestaurants() {
  return useQuery({
    queryKey: restaurantKeys.active(),
    queryFn: () => restaurantService.getActiveRestaurants(),
  });
}

/**
 * Get restaurant by ID
 */
export function useRestaurant(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: restaurantKeys.detail(id),
    queryFn: () => restaurantService.getRestaurant(id),
    enabled: enabled && !!id,
  });
}

/**
 * Get restaurant subscription status
 */
export function useRestaurantSubscription(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: restaurantKeys.subscription(id),
    queryFn: () => restaurantService.getSubscriptionStatus(id),
    enabled: enabled && !!id,
  });
}

/**
 * Check restaurant feature access
 */
export function useRestaurantFeature(id: string, feature: string, enabled: boolean = true) {
  return useQuery({
    queryKey: restaurantKeys.feature(id, feature),
    queryFn: () => restaurantService.hasFeatureAccess(id, feature),
    enabled: enabled && !!id && !!feature,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ===== Mutation Hooks =====

/**
 * Create restaurant
 */
export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantRequest) => restaurantService.createRestaurant(data),
    onSuccess: (restaurant) => {
      // Invalidate and refetch restaurant lists
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.active() });
      
      // Set the new restaurant in cache
      queryClient.setQueryData(restaurantKeys.detail(restaurant.id), restaurant);
      
      showToast.restaurant.created(restaurant.name);
    },
    onError: (error) => {
      console.error('Restaurant creation failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to create restaurant');
    },
  });
}

/**
 * Update restaurant
 */
export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRestaurantRequest }) =>
      restaurantService.updateRestaurant(id, data),
    onSuccess: (restaurant) => {
      // Update restaurant in cache
      queryClient.setQueryData(restaurantKeys.detail(restaurant.id), restaurant);
      
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.active() });
      
      showToast.restaurant.updated(restaurant.name);
    },
    onError: (error) => {
      console.error('Restaurant update failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to update restaurant');
    },
  });
}

/**
 * Delete restaurant
 */
export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantService.deleteRestaurant(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: restaurantKeys.detail(deletedId) });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.active() });
      
      showToast.restaurant.deleted();
    },
    onError: (error) => {
      console.error('Restaurant deletion failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to delete restaurant');
    },
  });
}

/**
 * Update restaurant status
 */
export function useUpdateRestaurantStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RestaurantStatus }) =>
      restaurantService.updateRestaurantStatus(id, { status }),
    onSuccess: (restaurant) => {
      // Update restaurant in cache
      queryClient.setQueryData(restaurantKeys.detail(restaurant.id), restaurant);
      queryClient.invalidateQueries({ queryKey: restaurantKeys.lists() });
      queryClient.invalidateQueries({ queryKey: restaurantKeys.active() });
      
      showToast.restaurant.statusUpdated();
    },
    onError: (error) => {
      console.error('Restaurant status update failed:', error);
      showToast.error(MESSAGES.GENERAL.ERROR, 'Failed to update restaurant status');
    },
  });
}

/**
 * Update onboarding progress
 */
export function useUpdateOnboardingProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      progress, 
      completed 
    }: { 
      id: string; 
      progress: number; 
      completed?: boolean 
    }) =>
      restaurantService.updateOnboardingProgress(id, {
        onboardingProgress: progress,
        hasCompletedOnboarding: completed
      }),
    onSuccess: (restaurant) => {
      // Update restaurant in cache
      queryClient.setQueryData(restaurantKeys.detail(restaurant.id), restaurant);
      
      // Invalidate auth queries since onboarding status affects user profile
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      
      showToast.restaurant.onboardingUpdated();
    },
  });
}

// ===== Combined Hooks =====

/**
 * Main restaurant hook with common operations
 */
export function useRestaurantManagement() {
  const createRestaurant = useCreateRestaurant();
  const updateRestaurant = useUpdateRestaurant();
  const deleteRestaurant = useDeleteRestaurant();
  const updateStatus = useUpdateRestaurantStatus();
  const updateOnboarding = useUpdateOnboardingProgress();

  return {
    // Mutations
    createRestaurant: createRestaurant.mutateAsync,
    updateRestaurant: updateRestaurant.mutateAsync,
    deleteRestaurant: deleteRestaurant.mutateAsync,
    updateStatus: updateStatus.mutateAsync,
    updateOnboarding: updateOnboarding.mutateAsync,
    
    // Loading states
    isCreating: createRestaurant.isPending,
    isUpdating: updateRestaurant.isPending,
    isDeleting: deleteRestaurant.isPending,
    isUpdatingStatus: updateStatus.isPending,
    isUpdatingOnboarding: updateOnboarding.isPending,
  };
}
