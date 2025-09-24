import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import {
  RestaurantMemberResponseDto,
  InviteMemberRequest,
  UpdateMemberRequest,
  MemberStatsResponse,
} from '../types';

export class MembersService {
  /**
   * Get all members for a restaurant
   */
  static async getRestaurantMembers(restaurantId: string): Promise<RestaurantMemberResponseDto[]> {
    const response = await apiHelpers.get(API_ENDPOINTS.MEMBERS.BASE(restaurantId));
    return response.data;
  }

  /**
   * Invite a new member to the restaurant
   */
  static async inviteMember(
    restaurantId: string,
    inviteData: InviteMemberRequest
  ): Promise<RestaurantMemberResponseDto> {
    const response = await apiHelpers.post(API_ENDPOINTS.MEMBERS.INVITE(restaurantId), inviteData);
    return response.data;
  }

  /**
   * Update member role and permissions
   */
  static async updateMember(
    restaurantId: string,
    memberId: string,
    updateData: UpdateMemberRequest
  ): Promise<RestaurantMemberResponseDto> {
    const response = await apiHelpers.patch(API_ENDPOINTS.MEMBERS.BY_ID(restaurantId, memberId), updateData);
    return response.data;
  }

  /**
   * Remove member from restaurant
   */
  static async removeMember(restaurantId: string, memberId: string): Promise<void> {
    await apiHelpers.delete(API_ENDPOINTS.MEMBERS.BY_ID(restaurantId, memberId));
  }

  /**
   * Accept restaurant invitation
   */
  static async acceptInvitation(
    restaurantId: string,
    userId: string
  ): Promise<RestaurantMemberResponseDto> {
    const response = await apiHelpers.post(API_ENDPOINTS.MEMBERS.ACCEPT(restaurantId, userId));
    return response.data;
  }

  /**
   * Get members with access to specific venue
   */
  static async getMembersWithVenueAccess(
    restaurantId: string,
    venueId: string
  ): Promise<RestaurantMemberResponseDto[]> {
    const response = await apiHelpers.get(API_ENDPOINTS.MEMBERS.VENUE_ACCESS(restaurantId, venueId));
    return response.data;
  }

  /**
   * Get member statistics for restaurant
   */
  static async getMemberStats(restaurantId: string): Promise<MemberStatsResponse> {
    const response = await apiHelpers.get(API_ENDPOINTS.MEMBERS.STATS(restaurantId));
    return response.data;
  }

  /**
   * Get current user's restaurant memberships
   */
  static async getUserMemberships(): Promise<RestaurantMemberResponseDto[]> {
    const response = await apiHelpers.get(API_ENDPOINTS.MEMBERS.USER_MEMBERSHIPS);
    return response.data;
  }

  /**
   * Decline restaurant invitation
   */
  static async declineInvitation(restaurantId: string, userId: string): Promise<void> {
    await apiHelpers.post(API_ENDPOINTS.MEMBERS.DECLINE(restaurantId, userId));
  }

  /**
   * Resend invitation email
   */
  static async resendInvitation(
    restaurantId: string,
    memberId: string
  ): Promise<void> {
    await apiHelpers.post(API_ENDPOINTS.MEMBERS.RESEND(restaurantId, memberId));
  }
}
