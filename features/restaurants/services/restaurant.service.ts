import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type { 
  Restaurant, 
  CreateRestaurantRequest, 
  UpdateRestaurantRequest, 
  UpdateRestaurantStatusRequest, 
  UpdateSubscriptionRequest, 
  UpdateOnboardingProgressRequest,
  RestaurantSubscriptionStatus,
  RestaurantFeatureAccess
} from '../types';



class RestaurantService {
  /**
   * Create a new restaurant
   */
  async createRestaurant(data: CreateRestaurantRequest): Promise<Restaurant> {
    const response = await apiHelpers.post<Restaurant>(API_ENDPOINTS.RESTAURANTS.BASE, data);
    return response.data;
  }

  /**
   * Get all restaurants for current user
   */
  async getRestaurants(): Promise<Restaurant[]> {
    const response = await apiHelpers.get<Restaurant[]>(API_ENDPOINTS.RESTAURANTS.BASE);
    return response.data;
  }

  /**
   * Get all active restaurants for current user
   */
  async getActiveRestaurants(): Promise<Restaurant[]> {
    const response = await apiHelpers.get<Restaurant[]>(API_ENDPOINTS.RESTAURANTS.ACTIVE);
    return response.data;
  }

  /**
   * Get restaurant by ID
   */
  async getRestaurant(id: string): Promise<Restaurant> {
    const response = await apiHelpers.get<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_ID(id));
    return response.data;
  }

  /**
   * Update restaurant
   */
  async updateRestaurant(id: string, data: UpdateRestaurantRequest): Promise<Restaurant> {
    const response = await apiHelpers.patch<Restaurant>(API_ENDPOINTS.RESTAURANTS.BY_ID(id), data);
    return response.data;
  }

  /**
   * Delete restaurant
   */
  async deleteRestaurant(id: string): Promise<void> {
    await apiHelpers.delete(API_ENDPOINTS.RESTAURANTS.BY_ID(id));
  }

  /**
   * Update restaurant status
   */
  async updateRestaurantStatus(id: string, data: UpdateRestaurantStatusRequest): Promise<Restaurant> {
    const response = await apiHelpers.patch<Restaurant>(API_ENDPOINTS.RESTAURANTS.STATUS(id), data);
    return response.data;
  }

  /**
   * Update restaurant subscription
   */
  async updateSubscription(id: string, data: UpdateSubscriptionRequest): Promise<Restaurant> {
    const response = await apiHelpers.patch<Restaurant>(API_ENDPOINTS.RESTAURANTS.SUBSCRIPTION(id), data);
    return response.data;
  }

  /**
   * Update restaurant onboarding progress
   */
  async updateOnboardingProgress(id: string, data: UpdateOnboardingProgressRequest): Promise<Restaurant> {
    const response = await apiHelpers.patch<Restaurant>(API_ENDPOINTS.RESTAURANTS.ONBOARDING(id), data);
    return response.data;
  }

  /**
   * Get restaurant subscription status
   */
  async getSubscriptionStatus(id: string): Promise<RestaurantSubscriptionStatus> {
    const response = await apiHelpers.get<RestaurantSubscriptionStatus>(API_ENDPOINTS.RESTAURANTS.SUBSCRIPTION_STATUS(id));
    return response.data;
  }

  /**
   * Check if restaurant has access to a feature
   */
  async hasFeatureAccess(id: string, feature: string): Promise<RestaurantFeatureAccess> {
    const response = await apiHelpers.get<RestaurantFeatureAccess>(API_ENDPOINTS.RESTAURANTS.FEATURE(id, feature));
    return response.data;
  }
}

export const restaurantService = new RestaurantService();
