"use client";

import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateMember } from './use-members';
import { useVenuesByRestaurant } from '@/features/venues/hooks/use-venues';
import { RestaurantMemberResponseDto, UpdateMemberRequest, RestaurantRole } from '../types';
import { RESTAURANT_ROLE_CONFIG } from '../constants';
import { MESSAGES } from '@/constants/messages';
import { showToast } from '@/lib/toast';

// Form validation schema
const memberEditSchema = z.object({
  role: z.enum(['owner', 'manager'] as const),
  venueAccess: z.array(z.string()).min(1, 'At least one venue must be selected'),
  permissions: z.object({
    canViewReports: z.boolean(),
    canManageStaff: z.boolean(),
    canManageSchedules: z.boolean(),
    canViewFinances: z.boolean(),
    canManageInventory: z.boolean(),
    canManageSettings: z.boolean(),
  }),
});

type MemberEditFormData = z.infer<typeof memberEditSchema>;

interface UseMemberEditProps {
  member: RestaurantMemberResponseDto;
  restaurantId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PERMISSION_KEYS = [
  "canViewReports",
  "canManageStaff",
  "canManageSchedules",
  "canViewFinances",
  "canManageInventory",
  "canManageSettings",
] as const;

type PermissionKeys = typeof PERMISSION_KEYS[number];

function normalizePermissions(input?: Partial<Record<PermissionKeys, boolean>>): Record<PermissionKeys, boolean> {
  return PERMISSION_KEYS.reduce((acc, key) => {
    acc[key] = input?.[key] ?? false;
    return acc;
  }, {} as Record<PermissionKeys, boolean>);
}

export function useMemberEdit({ member, restaurantId, onSuccess, onCancel }: UseMemberEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Only allow "owner" or "manager" for form default value
  const allowedRoles = ["owner", "manager"] as const;
  const initialRole =
    allowedRoles.includes(member.role as any)
      ? (member.role as "owner" | "manager")
      : "manager";

  // Form setup
  const form = useForm<MemberEditFormData>({
    resolver: zodResolver(memberEditSchema),
    defaultValues: {
      role: initialRole,
      venueAccess: member.venueAccess || [],
      permissions: normalizePermissions(member.permissions),
    },
  });

  const { watch, setValue, handleSubmit, formState: { errors, isDirty } } = form;
  const watchedRole = watch('role');
  const watchedVenueAccess = watch('venueAccess');

  // Data fetching
  const { data: venues = [], isLoading: venuesLoading } = useVenuesByRestaurant(restaurantId);
  const updateMemberMutation = useUpdateMember();

  // Update permissions based on role change
  useEffect(() => {
    const roleConfig = RESTAURANT_ROLE_CONFIG[watchedRole];
    if (roleConfig?.defaultPermissions) {
      setValue('permissions', normalizePermissions(roleConfig.defaultPermissions));
    }
  }, [watchedRole, setValue]);

  // Handlers
  const handleVenueToggle = useCallback((venueId: string) => {
    const currentAccess = watchedVenueAccess || [];
    const newAccess = currentAccess.includes(venueId)
      ? currentAccess.filter(id => id !== venueId)
      : [...currentAccess, venueId];
    
    setValue('venueAccess', newAccess, { shouldValidate: true });
  }, [watchedVenueAccess, setValue]);

  const handleSelectAllVenues = useCallback(() => {
    const allVenueIds = venues.map(venue => venue.id);
    setValue('venueAccess', allVenueIds, { shouldValidate: true });
  }, [venues, setValue]);

  const handleClearAllVenues = useCallback(() => {
    setValue('venueAccess', [], { shouldValidate: true });
  }, [setValue]);

  const handlePermissionChange = useCallback((permissionKey: string, value: boolean) => {
    const currentPermissions = watch('permissions') || {};
    setValue('permissions', {
      ...currentPermissions,
      [permissionKey]: value,
    });
  }, [watch, setValue]);

  const onSubmit = useCallback(async (data: MemberEditFormData) => {
    setIsSubmitting(true);

    try {
      const updateData: UpdateMemberRequest = {
        role: data.role as RestaurantRole, // <-- cast to RestaurantRole
        venueAccess: data.venueAccess,
        permissions: data.permissions,
      };

      await updateMemberMutation.mutateAsync({
        restaurantId,
        memberId: member.id,
        updateData,
      });

      showToast.success(MESSAGES.MEMBERS.UPDATE_SUCCESS);
      onSuccess();
    } catch (error) {
      console.error('Failed to update member:', error);
      showToast.error(MESSAGES.MEMBERS.UPDATE_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  }, [updateMemberMutation, restaurantId, member.id, onSuccess]);

  const handleCancel = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (!confirmed) return;
    }
    onCancel();
  }, [isDirty, onCancel]);

  // Utility functions
  const getMemberName = useCallback(() => {
    if (!member.user) return "Unknown Member";
    return member.user.fullName ||
      `${member.user.firstName || ''} ${member.user.lastName || ''}`.trim() ||
      member.user.email ||
      "Unknown Member";
  }, [member]);

  const getVenueName = useCallback((venueId: string) => {
    const venue = venues.find(v => v.id === venueId);
    return venue?.name || 'Unknown Venue';
  }, [venues]);

  const getPermissionLabel = useCallback((key: string) => {
    const labels: Record<string, string> = {
      canViewReports: 'View Reports',
      canManageStaff: 'Manage Staff',
      canManageSchedules: 'Manage Schedules',
      canViewFinances: 'View Finances',
      canManageInventory: 'Manage Inventory',
      canManageSettings: 'Manage Settings',
    };
    return labels[key] || key;
  }, []);

  const getPermissionDescription = useCallback((key: string) => {
    const descriptions: Record<string, string> = {
      canViewReports: 'Access to analytics and performance reports',
      canManageStaff: 'Hire, edit, and manage staff members',
      canManageSchedules: 'Create and modify work schedules',
      canViewFinances: 'Access financial data and revenue reports',
      canManageInventory: 'Track and manage inventory levels',
      canManageSettings: 'Modify venue and system settings',
    };
    return descriptions[key] || '';
  }, []);

  return {
    // Form
    form,
    errors,
    isDirty,
    isSubmitting: isSubmitting || updateMemberMutation.isPending,

    // Data
    venues,
    venuesLoading,
    watchedRole,
    watchedVenueAccess,

    // Handlers
    handleSubmit: form.handleSubmit(onSubmit), // <-- use form.handleSubmit
    handleCancel,
    handleVenueToggle,
    handleSelectAllVenues,
    handleClearAllVenues,
    handlePermissionChange,

    // Utility functions
    getMemberName,
    getVenueName,
    getPermissionLabel,
    getPermissionDescription,

    // Constants
    roleOptions: Object.entries(RESTAURANT_ROLE_CONFIG).map(([key, config]) => ({
      value: key,
      label: config.label,
      description: config.description,
    })),
  };
}