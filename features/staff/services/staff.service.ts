// Staff service using API helpers
import { apiHelpers } from '@/lib/api';
import { API_ENDPOINTS } from '@/constants/endpoints';
import type {
  CreateStaffRequest,
  UpdateStaffRequest,
  StaffResponseDto,
  CreateRoleRequest,
  UpdateRoleRequest,
  RoleResponseDto,
  RoleStats,
} from '../types';

export const staffService = {
  // ===== STAFF OPERATIONS =====
  
  async createStaff(venueId: string, data: CreateStaffRequest): Promise<StaffResponseDto> {
    const response = await apiHelpers.post<StaffResponseDto>(
      API_ENDPOINTS.STAFF.CREATE(venueId),
      data
    );
    return response.data;
  },

  async getStaffByVenue(venueId: string): Promise<StaffResponseDto[]> {
    const response = await apiHelpers.get<StaffResponseDto[]>(
      API_ENDPOINTS.STAFF.BY_VENUE(venueId)
    );
    return response.data;
  },

  async getActiveStaffByVenue(venueId: string): Promise<StaffResponseDto[]> {
    const response = await apiHelpers.get<StaffResponseDto[]>(
      API_ENDPOINTS.STAFF.BY_VENUE_ACTIVE(venueId)
    );
    return response.data;
  },

  async getStaffByRole(roleId: string, venueId?: string): Promise<StaffResponseDto[]> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.BY_ROLE(roleId)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.BY_ROLE(roleId);
    
    const response = await apiHelpers.get<StaffResponseDto[]>(url);
    return response.data;
  },

  async getStaffById(id: string, venueId?: string): Promise<StaffResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.BY_ID(id);
    
    const response = await apiHelpers.get<StaffResponseDto>(url);
    return response.data;
  },

  async updateStaff(id: string, data: UpdateStaffRequest, venueId?: string): Promise<StaffResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.BY_ID(id);
    
    const response = await apiHelpers.patch<StaffResponseDto>(url, data);
    return response.data;
  },

  async toggleStaffActive(id: string, venueId?: string): Promise<StaffResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.TOGGLE_ACTIVE(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.TOGGLE_ACTIVE(id);
    
    const response = await apiHelpers.patch<StaffResponseDto>(url, {});
    return response.data;
  },

  async generateStaffAccessToken(id: string, venueId?: string): Promise<{ accessToken: string; expiresAt: Date }> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.ACCESS_TOKEN(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.ACCESS_TOKEN(id);
    
    const response = await apiHelpers.post<{ accessToken: string; expiresAt: Date }>(url, {});
    return response.data;
  },

  async revokeStaffAccessToken(id: string, venueId?: string): Promise<void> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.ACCESS_TOKEN(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.ACCESS_TOKEN(id);
    
    await apiHelpers.delete(url);
  },

  async updateStaffOvertimeHours(id: string, hours: number, venueId?: string): Promise<StaffResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.OVERTIME_HOURS(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.OVERTIME_HOURS(id);
    
    const response = await apiHelpers.patch<StaffResponseDto>(url, { hours });
    return response.data;
  },

  async deleteStaff(id: string, venueId?: string): Promise<void> {
    const url = venueId 
      ? `${API_ENDPOINTS.STAFF.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.STAFF.BY_ID(id);
    
    await apiHelpers.delete(url);
  },

  // ===== ROLE OPERATIONS =====
  
  async createRole(venueId: string, data: CreateRoleRequest): Promise<RoleResponseDto> {
    const response = await apiHelpers.post<RoleResponseDto>(
      API_ENDPOINTS.ROLES.CREATE(venueId),
      data
    );
    return response.data;
  },

  async getRolesByVenue(venueId: string): Promise<RoleResponseDto[]> {
    const response = await apiHelpers.get<RoleResponseDto[]>(
      API_ENDPOINTS.ROLES.BY_VENUE(venueId)
    );
    return response.data;
  },

  async getActiveRolesByVenue(venueId: string): Promise<RoleResponseDto[]> {
    const response = await apiHelpers.get<RoleResponseDto[]>(
      API_ENDPOINTS.ROLES.BY_VENUE_ACTIVE(venueId)
    );
    return response.data;
  },

  async getRoleStats(venueId: string): Promise<RoleStats> {
    const response = await apiHelpers.get<RoleStats>(
      API_ENDPOINTS.ROLES.BY_VENUE_STATS(venueId)
    );
    return response.data;
  },

  async getRoleById(id: string, venueId?: string): Promise<RoleResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.ROLES.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.ROLES.BY_ID(id);
    
    const response = await apiHelpers.get<RoleResponseDto>(url);
    return response.data;
  },

  async getRoleStaffCount(id: string, venueId?: string, activeOnly?: boolean): Promise<{ count: number }> {
    const params = new URLSearchParams();
    if (venueId) params.append('venueId', venueId);
    if (activeOnly) params.append('activeOnly', 'true');
    
    const url = `${API_ENDPOINTS.ROLES.STAFF_COUNT(id)}${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await apiHelpers.get<{ count: number }>(url);
    return response.data;
  },

  async updateRole(id: string, data: UpdateRoleRequest, venueId?: string): Promise<RoleResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.ROLES.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.ROLES.BY_ID(id);
    
    const response = await apiHelpers.patch<RoleResponseDto>(url, data);
    return response.data;
  },

  async toggleRoleActive(id: string, venueId?: string): Promise<RoleResponseDto> {
    const url = venueId 
      ? `${API_ENDPOINTS.ROLES.TOGGLE_ACTIVE(id)}?venueId=${venueId}`
      : API_ENDPOINTS.ROLES.TOGGLE_ACTIVE(id);
    
    const response = await apiHelpers.patch<RoleResponseDto>(url, {});
    return response.data;
  },

  async deleteRole(id: string, venueId?: string): Promise<void> {
    const url = venueId 
      ? `${API_ENDPOINTS.ROLES.BY_ID(id)}?venueId=${venueId}`
      : API_ENDPOINTS.ROLES.BY_ID(id);
    
    await apiHelpers.delete(url);
  },
};
