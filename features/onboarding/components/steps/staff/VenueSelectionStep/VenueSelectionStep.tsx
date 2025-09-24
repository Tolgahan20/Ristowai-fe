"use client";

import { useState } from 'react';
import { Building2, MapPin, Users } from 'lucide-react';
import { useProfile } from '@/features/auth/hooks/use-auth';
import { useVenuesByRestaurant } from '@/features/venues/hooks/use-venues';
import styles from './VenueSelectionStep.module.css';

interface VenueSelectionStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function VenueSelectionStep({ stepData, onDataChange }: VenueSelectionStepProps) {
  const [selectedVenueId, setSelectedVenueId] = useState<string>((stepData.venueId as string) || '');
  
  // Get current user with their restaurants
  const { data: profileData, isLoading: isLoadingProfile } = useProfile();
  const restaurants = profileData?.restaurants || [];
  
  // Get venues for the user's restaurant (one restaurant per account as per business rule)
  const restaurantId = restaurants[0]?.id;
  
  const { data: venues = [], isLoading: isLoadingVenues, error } = useVenuesByRestaurant(restaurantId || '');
  
  const isLoading = isLoadingProfile || isLoadingVenues;

  const handleVenueSelect = (venueId: string) => {
    setSelectedVenueId(venueId);
    
    // Update step data immediately when venue is selected
    const selectedVenue = venues.find(venue => venue.id === venueId);
    onDataChange({
      venueId: venueId,
      venueName: selectedVenue?.name || '',
      venueAddress: selectedVenue?.address || '',
    });
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading your venues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>Failed to load venues. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <Building2 size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No Restaurant Found</h3>
          <p className={styles.emptyDescription}>
            You need to create a restaurant first before adding staff. Please go to restaurant setup.
          </p>
          <button 
            onClick={() => window.location.href = '/onboarding'} 
            className={styles.setupButton}
          >
            Go to Restaurant Setup
          </button>
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <Building2 size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No Venues Found</h3>
          <p className={styles.emptyDescription}>
            You need to create a venue first before adding staff. Please go to venue setup and create a venue.
          </p>
          <button 
            onClick={() => window.location.href = '/onboarding'} 
            className={styles.setupButton}
          >
            Go to Venue Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        
        {/* Header */}
        <div className={styles.header}>
          <Building2 size={24} className={styles.headerIcon} />
          <div>
            <h2 className={styles.title}>Select a Venue</h2>
            <p className={styles.subtitle}>
              Choose which venue you want to add staff and roles to
            </p>
          </div>
        </div>

        {/* Venue List */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Building2 size={18} className={styles.sectionIcon} />
            Available Venues
          </h3>
          <div className={styles.venueGrid}>
            {venues.map((venue) => (
              <div
                key={venue.id}
                className={`${styles.venueCard} ${
                  selectedVenueId === venue.id ? styles.venueCardSelected : ''
                }`}
                onClick={() => handleVenueSelect(venue.id)}
              >
                <div className={styles.venueCardHeader}>
                  <Building2 size={20} className={styles.venueIcon} />
                  <h4 className={styles.venueName}>{venue.name}</h4>
                  {selectedVenueId === venue.id && (
                    <div className={styles.selectedBadge}>✓</div>
                  )}
                </div>
                
                <div className={styles.venueDetails}>
                  <div className={styles.venueDetail}>
                    <MapPin size={14} className={styles.detailIcon} />
                    <span className={styles.detailText}>{venue.address}</span>
                  </div>
                  
                  <div className={styles.venueDetail}>
                    <Users size={14} className={styles.detailIcon} />
                    <span className={styles.detailText}>
                      Staff setup ready
                    </span>
                  </div>
                </div>

                <div className={styles.venueFooter}>
                  <span className={`${styles.statusBadge} ${
                    venue.isActive ? styles.statusActive : styles.statusInactive
                  }`}>
                    {venue.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {selectedVenueId && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <Building2 size={18} className={styles.sectionIcon} />
              Selection Summary
            </h3>
            <div className={styles.summaryCard}>
              <div className={styles.summaryHeader}>
                <Building2 size={20} className={styles.summaryIcon} />
                <div>
                  <h4 className={styles.summaryTitle}>
                    {venues.find(v => v.id === selectedVenueId)?.name}
                  </h4>
                  <p className={styles.summarySubtitle}>
                    {venues.find(v => v.id === selectedVenueId)?.address}
                  </p>
                </div>
              </div>
              <p className={styles.summaryMessage}>
                ✅ You&apos;ll be adding staff and roles to this venue
              </p>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
