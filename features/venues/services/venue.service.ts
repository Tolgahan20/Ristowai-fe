import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { 
  CreateVenueRequest, 
  UpdateVenueRequest, 
  VenueResponseDto 
} from '../types';

export const venueService = {
  // Create a new venue for a restaurant
  async createVenue(restaurantId: string, venueData: CreateVenueRequest): Promise<VenueResponseDto> {
    const response = await apiHelpers.post<VenueResponseDto>(
      API_ENDPOINTS.VENUES.CREATE(restaurantId),
      venueData
    );
    return response.data;
  },

  // Get all venues for a restaurant
  async getVenuesByRestaurant(restaurantId: string): Promise<VenueResponseDto[]> {
    const response = await apiHelpers.get<VenueResponseDto[]>(
      API_ENDPOINTS.VENUES.BY_RESTAURANT(restaurantId)
    );
    return response.data;
  },

  // Get all active venues for a restaurant
  async getActiveVenuesByRestaurant(restaurantId: string): Promise<VenueResponseDto[]> {
    const response = await apiHelpers.get<VenueResponseDto[]>(
      API_ENDPOINTS.VENUES.ACTIVE_BY_RESTAURANT(restaurantId)
    );
    return response.data;
  },

  // Get venue by ID
  async getVenueById(venueId: string): Promise<VenueResponseDto> {
    const response = await apiHelpers.get<VenueResponseDto>(
      API_ENDPOINTS.VENUES.BY_ID(venueId)
    );
    return response.data;
  },

  // Update a venue
  async updateVenue(venueId: string, venueData: UpdateVenueRequest): Promise<VenueResponseDto> {
    const response = await apiHelpers.patch<VenueResponseDto>(
      API_ENDPOINTS.VENUES.UPDATE(venueId),
      venueData
    );
    return response.data;
  },

  // Delete a venue
  async deleteVenue(venueId: string): Promise<void> {
    await apiHelpers.delete(API_ENDPOINTS.VENUES.DELETE(venueId));
  },

  // Toggle venue active status
  async toggleVenueActive(venueId: string): Promise<VenueResponseDto> {
    const response = await apiHelpers.patch<VenueResponseDto>(
      API_ENDPOINTS.VENUES.TOGGLE_ACTIVE(venueId)
    );
    return response.data;
  },
};
