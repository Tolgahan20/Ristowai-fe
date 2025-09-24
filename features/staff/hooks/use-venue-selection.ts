"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useActiveRestaurants } from '@/features/restaurants/hooks/use-restaurant';
import { useActiveVenuesByRestaurant } from '@/features/venues/hooks/use-venues';
import { usePermissions } from '@/features/auth/hooks/use-role-access';

interface UseVenueSelectionProps {
  selectedVenueId?: string;
  onVenueSelect: (venueId: string, venueName: string) => void;
}

export function useVenueSelection({ selectedVenueId, onVenueSelect }: UseVenueSelectionProps) {
  const [selectedVenue, setSelectedVenue] = useState<{ id: string; name: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Get user permissions and role info
  const { roleAccess, isBrandOwner, isStoreManager, user } = usePermissions();

  // Use ref to store the callback and prevent infinite loops
  const onVenueSelectRef = useRef(onVenueSelect);
  
  useEffect(() => {
    onVenueSelectRef.current = onVenueSelect;
  }, [onVenueSelect]);

  // Get user's restaurants and venues based on their role
  const { data: restaurants = [] } = useActiveRestaurants();
  
  // For brand owners: show all restaurants
  // For store managers: show only assigned restaurants (using first for now)
  const restaurant = restaurants[0]; // TODO: Handle multiple restaurants for brand owners
  
  const { data: allVenues = [], isLoading } = useActiveVenuesByRestaurant(restaurant?.id || '');
  
  
  // Filter venues based on user's access level and restaurant membership
  const venues = useMemo(() => {
    const hasAccess = 
      isBrandOwner() || 
      isStoreManager() || 
      (user && restaurant && user.id === restaurant.ownerId) ||
      roleAccess.canAccessAllVenues ||
      roleAccess.canAccessAllRestaurantVenues ||
      (roleAccess.restrictedToSpecificVenues && user?.restaurants?.find(r => r.id === restaurant?.id));
    
    return hasAccess ? allVenues : [];
  }, [allVenues, isBrandOwner, isStoreManager, user, restaurant, roleAccess]);

  // Update selected venue when selectedVenueId changes
  useEffect(() => {
    if (selectedVenueId && venues.length > 0) {
      const venue = venues.find(v => v.id === selectedVenueId);
      if (venue) {
        setSelectedVenue({ id: venue.id, name: venue.name });
      }
    } else if (!selectedVenueId) {
      setSelectedVenue(null);
    }
  }, [selectedVenueId, venues]);

  const handleVenueSelect = useCallback((venue: { id: string; name: string }) => {
    setSelectedVenue(venue);
    onVenueSelectRef.current(venue.id, venue.name);
  }, []);

  const hasError = !isLoading && !restaurant;
  const isEmpty = !isLoading && restaurant && venues.length === 0;
  const isSingleVenue = venues.length === 1;
  const hasMultipleVenues = venues.length > 1;
  
  // Auto-select if store manager with single venue access
  const shouldAutoSelect = isStoreManager() && isSingleVenue;
  
  // Auto-select single venue for store managers
  useEffect(() => {
    if (shouldAutoSelect && !selectedVenueId && venues.length === 1) {
      const singleVenue = venues[0];
      setSelectedVenue({ id: singleVenue.id, name: singleVenue.name });
      onVenueSelectRef.current(singleVenue.id, singleVenue.name);
    }
  }, [shouldAutoSelect, selectedVenueId, venues]);

  return {
    // Data
    restaurant,
    venues,
    selectedVenue,
    isLoading,
    
    // State flags
    hasError,
    isEmpty,
    isSingleVenue,
    hasMultipleVenues,
    shouldAutoSelect,
    
    // Role info
    roleAccess,
    isBrandOwner: isBrandOwner(),
    isStoreManager: isStoreManager(),
    
    // UI State
    isOpen,
    setIsOpen,
    
    // Handlers
    handleVenueSelect,
  };
}
