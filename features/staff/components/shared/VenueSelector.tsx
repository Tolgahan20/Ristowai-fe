"use client";

import React, { useRef, useEffect } from 'react';
import { Building2, AlertCircle, MapPin, Loader2 } from 'lucide-react';
import { useVenueSelection } from '../../hooks/use-venue-selection';
import { EnhancedSelect } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Body } from '@/components/ui/typography';
import styles from './VenueSelector.module.css';

interface VenueSelectorProps {
  selectedVenueId: string | null;
  onVenueSelect: (venueId: string, venueName: string) => void;
}

export function VenueSelector({ selectedVenueId, onVenueSelect }: VenueSelectorProps) {
  // Use ref to store the callback and prevent infinite loops
  const onVenueSelectRef = useRef(onVenueSelect);
  
  useEffect(() => {
    onVenueSelectRef.current = onVenueSelect;
  }, [onVenueSelect]);
  
  const {
    restaurant,
    venues,
    selectedVenue,
    isLoading,
    hasError,
    handleVenueSelect,
    shouldAutoSelect,
    isBrandOwner,
  } = useVenueSelection({ 
    selectedVenueId: selectedVenueId || undefined, 
    onVenueSelect: (venueId: string, venueName: string) => onVenueSelectRef.current(venueId, venueName)
  });

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <Building2 className={styles.loadingIcon} />
        <div className={styles.loadingSpinnerContainer}>
          <Loader2 className={styles.loadingSpinner} />
          <Body size="small">Loading venues...</Body>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.errorState}>
        <AlertCircle className={styles.errorIcon} />
        <Body size="small" color="destructive">Unable to load venues</Body>
      </div>
    );
  }

  // For store managers with single venue - show as read-only
  if (shouldAutoSelect && selectedVenue) {
    return (
      <div className={styles.autoSelectContainer}>
        <Label 
          icon={<Building2 className="w-4 h-4 text-green-600" />}
        >
          Your Venue
        </Label>
        
        <div className={styles.autoSelectDisplay}>
          <div className={styles.venueName}>{selectedVenue.name}</div>
          {restaurant?.address && (
            <div className={styles.addressContainer}>
              <MapPin className={styles.addressIcon} />
              <span>{restaurant.address}</span>
            </div>
          )}
          <Body size="small" className={styles.autoAssignedText}>Auto-assigned</Body>
        </div>
      </div>
    );
  }

  // Convert venues to EnhancedSelect options format
  const venueOptions = venues.map(venue => ({
    value: venue.id,
    label: venue.name,
    icon: <Building2 className="w-4 h-4" />,
  }));


  return (
    <div className={styles.mainContainer}> 
      <EnhancedSelect
        value={selectedVenueId || ''}
        onValueChange={(value) => {
          const venue = venues.find(v => v.id === value);
          if (venue) {
            handleVenueSelect({ id: venue.id, name: venue.name });
          }
        }}
        options={venueOptions}
        placeholder={
          isBrandOwner 
            ? 'Choose a venue to manage...' 
            : 'Select your venue...'
        }
      />
      
      {selectedVenue && restaurant?.address && (
        <div className={styles.addressDisplay}>
          <MapPin className={styles.addressDisplayIcon} />
          <span>{restaurant.address}</span>
        </div>
      )}
    </div>
  );
}
