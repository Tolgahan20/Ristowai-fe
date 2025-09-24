"use client";

import { useMemo } from 'react';
import { useAuth } from './use-auth';

export type UserRole = 
  | 'super_admin'
  | 'restaurant_owner' 
  | 'restaurant_manager'
  | 'venue_manager'
  | 'staff'
  | 'user';

export type AccessLevel = 'full' | 'restricted' | 'none';

export interface RoleAccess {
  // Can see all venues across all restaurants
  canAccessAllVenues: boolean;
  
  // Can see all venues within their assigned restaurants
  canAccessAllRestaurantVenues: boolean;
  
  // Can only see specific venues they're assigned to
  restrictedToSpecificVenues: boolean;
  
  // Can manage staff (create, edit, delete)
  canManageStaff: boolean;
  
  // Can only view staff (read-only)
  canViewStaff: boolean;
  
  // Access level summary
  accessLevel: AccessLevel;
}

/**
 * Hook to determine user's access rights based on their role
 */
export function useRoleAccess(): RoleAccess {
  const { user } = useAuth();
  
  const roleAccess = useMemo((): RoleAccess => {
    if (!user?.role) {
      return {
        canAccessAllVenues: false,
        canAccessAllRestaurantVenues: false,
        restrictedToSpecificVenues: false,
        canManageStaff: false,
        canViewStaff: false,
        accessLevel: 'none',
      };
    }

    const role = user.role as UserRole;

    switch (role) {
      case 'super_admin':
        return {
          canAccessAllVenues: true,
          canAccessAllRestaurantVenues: true,
          restrictedToSpecificVenues: false,
          canManageStaff: true,
          canViewStaff: true,
          accessLevel: 'full',
        };

      case 'restaurant_owner':
        return {
          canAccessAllVenues: false,
          canAccessAllRestaurantVenues: true, // Can see all venues in their restaurants
          restrictedToSpecificVenues: false,
          canManageStaff: true,
          canViewStaff: true,
          accessLevel: 'full',
        };

      case 'restaurant_manager':
        return {
          canAccessAllVenues: false,
          canAccessAllRestaurantVenues: true, // Can see all venues in assigned restaurants
          restrictedToSpecificVenues: false,
          canManageStaff: true,
          canViewStaff: true,
          accessLevel: 'full',
        };

      case 'venue_manager':
        return {
          canAccessAllVenues: false,
          canAccessAllRestaurantVenues: false,
          restrictedToSpecificVenues: true, // Only specific venues
          canManageStaff: true,
          canViewStaff: true,
          accessLevel: 'restricted',
        };

      case 'staff':
        return {
          canAccessAllVenues: false,
          canAccessAllRestaurantVenues: false,
          restrictedToSpecificVenues: true, // Only their venue
          canManageStaff: false,
          canViewStaff: true, // Can view colleagues
          accessLevel: 'restricted',
        };

      case 'user':
      default:
        return {
          canAccessAllVenues: false,
          canAccessAllRestaurantVenues: false,
          restrictedToSpecificVenues: false,
          canManageStaff: false,
          canViewStaff: false,
          accessLevel: 'none',
        };
    }
  }, [user?.role]);

  return roleAccess;
}

/**
 * Hook to check specific permissions
 */
export function usePermissions() {
  const { user } = useAuth();
  const roleAccess = useRoleAccess();

  const hasPermission = (permission: keyof RoleAccess): boolean => {
    return roleAccess[permission] === true;
  };

  const isRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const isBrandOwner = (): boolean => {
    return isRole('super_admin') || isRole('restaurant_owner');
  };

  const isStoreManager = (): boolean => {
    return isRole('restaurant_manager') || isRole('venue_manager');
  };

  const canAccessVenue = (venueId: string): boolean => {
    // TODO: This would need to check against user's actual venue assignments
    // For now, we'll use role-based logic
    if (roleAccess.canAccessAllVenues) return true;
    if (roleAccess.canAccessAllRestaurantVenues) return true;
    
    // For restricted access, you'd need to check against user's venue assignments
    // This could come from user.restaurants[].venues or a separate API call
    return roleAccess.restrictedToSpecificVenues;
  };

  return {
    roleAccess,
    hasPermission,
    isRole,
    isBrandOwner,
    isStoreManager,
    canAccessVenue,
    user,
  };
}
