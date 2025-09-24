import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueService } from '../services/venue.service';
import { showToast } from '@/lib/toast';
import { MESSAGES } from '@/constants/messages';
import type { 
  CreateVenueRequest, 
  UpdateVenueRequest
} from '../types';

// Query keys
export const venueKeys = {
  all: ['venues'] as const,
  byRestaurant: (restaurantId: string) => [...venueKeys.all, 'restaurant', restaurantId] as const,
  activeByRestaurant: (restaurantId: string) => [...venueKeys.all, 'restaurant', restaurantId, 'active'] as const,
  byId: (venueId: string) => [...venueKeys.all, venueId] as const,
};

// Get venues by restaurant
export function useVenuesByRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: venueKeys.byRestaurant(restaurantId),
    queryFn: () => venueService.getVenuesByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
}

// Get active venues by restaurant
export function useActiveVenuesByRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: venueKeys.activeByRestaurant(restaurantId),
    queryFn: () => venueService.getActiveVenuesByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
}

// Get venue by ID
export function useVenueById(venueId: string) {
  return useQuery({
    queryKey: venueKeys.byId(venueId),
    queryFn: () => venueService.getVenueById(venueId),
    enabled: !!venueId,
  });
}

// Create venue mutation
export function useCreateVenue(restaurantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueData: CreateVenueRequest) => 
      venueService.createVenue(restaurantId, venueData),
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: venueKeys.byRestaurant(restaurantId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.activeByRestaurant(restaurantId) });
      
      showToast.success(MESSAGES.VENUE.CREATED);
    },
    onError: (error: unknown) => {
      const message = (error as any)?.response?.data?.message || MESSAGES.ERROR.VENUE_CREATE_FAILED;
      showToast.error(message);
    },
  });
}

// Update venue mutation
export function useUpdateVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ venueId, venueData }: { venueId: string; venueData: UpdateVenueRequest }) =>
      venueService.updateVenue(venueId, venueData),
    onSuccess: (updatedVenue) => {
      // Update specific venue cache
      queryClient.setQueryData(venueKeys.byId(updatedVenue.id), updatedVenue);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: venueKeys.byRestaurant(updatedVenue.restaurantId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.activeByRestaurant(updatedVenue.restaurantId) });
      
      showToast.success(MESSAGES.VENUE.UPDATED);
    },
    onError: (error: unknown) => {
      const message = (error as any)?.response?.data?.message || MESSAGES.ERROR.VENUE_UPDATE_FAILED;
      showToast.error(message);
    },
  });
}

// Delete venue mutation
export function useDeleteVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueId: string) => venueService.deleteVenue(venueId),
    onSuccess: (_, venueId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: venueKeys.byId(venueId) });
      
      // Invalidate lists (we don't know the restaurant ID here)
      queryClient.invalidateQueries({ queryKey: venueKeys.all });
      
      showToast.success(MESSAGES.VENUE.DELETED);
    },
    onError: (error: unknown) => {
      const message = (error as any)?.response?.data?.message || MESSAGES.ERROR.VENUE_DELETE_FAILED;
      showToast.error(message);
    },
  });
}

// Toggle venue active status mutation
export function useToggleVenueActive() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (venueId: string) => venueService.toggleVenueActive(venueId),
    onSuccess: (updatedVenue) => {
      // Update specific venue cache
      queryClient.setQueryData(venueKeys.byId(updatedVenue.id), updatedVenue);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: venueKeys.byRestaurant(updatedVenue.restaurantId) });
      queryClient.invalidateQueries({ queryKey: venueKeys.activeByRestaurant(updatedVenue.restaurantId) });
      
      const message = updatedVenue.isActive ? MESSAGES.VENUE.ACTIVATED : MESSAGES.VENUE.DEACTIVATED;
      showToast.success(message);
    },
    onError: (error: unknown) => {
      const message = (error as any)?.response?.data?.message || MESSAGES.ERROR.VENUE_TOGGLE_FAILED;
      showToast.error(message);
    },
  });
}
