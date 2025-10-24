"use client";

import React, { useState } from 'react';
import { Building2, MapPin, Clock, Phone, Mail, MoreVertical, Edit, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { PrimaryButton, GhostButton, DestructiveButton, OutlineButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useVenuesByRestaurant } from '../../hooks/use-venues';
import type { VenueResponseDto } from '../../types';
import styles from './VenueList.module.css';

interface VenueListProps {
  restaurantId: string;
  onCreateVenue: () => void;
  onEditVenue: (venue: VenueResponseDto) => void;
  onViewVenue: (venue: VenueResponseDto) => void;
  onDeleteVenue: (venueId: string) => void;
  onToggleActive: (venueId: string) => void;
}

export function VenueList({
  restaurantId,
  onCreateVenue,
  onEditVenue,
  onViewVenue,
  onDeleteVenue,
  onToggleActive,
}: VenueListProps) {
  const { data: venues = [], isLoading } = useVenuesByRestaurant(restaurantId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<VenueResponseDto | null>(null);

  const handleDeleteClick = (venue: VenueResponseDto) => {
    setVenueToDelete(venue);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (venueToDelete) {
      onDeleteVenue(venueToDelete.id);
      setDeleteDialogOpen(false);
      setVenueToDelete(null);
    }
  };

  // Convert minutes to time string
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <Heading level={3}>Loading venues...</Heading>
        </div>
      </div>
    );
  }

  if (venues.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Building2 size={48} />
          </div>
          <Heading level={2}>No Venues Yet</Heading>
          <Body className={styles.emptyDescription}>
            Get started by adding your first venue location. You can manage all your restaurant locations from here.
          </Body>
          <PrimaryButton 
            onClick={onCreateVenue}
            leftIcon={<Building2 size={16} />}
          >
            Add First Venue
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <Body size="small" className={styles.headerLabel}>Total Venues</Body>
          <Heading level={3}>{venues.length}</Heading>
        </div>
        <PrimaryButton 
          onClick={onCreateVenue}
          leftIcon={<Building2 size={16} />}
        >
          Add Venue
        </PrimaryButton>
      </div>

      <div className={styles.venueGrid}>
        {venues.map((venue) => (
          <Card key={venue.id} className={styles.venueCard}>
            <CardContent className={styles.cardContent}>
              {/* Header */}
              <div className={styles.cardHeader}>
                <div className={styles.venueName}>
                  <Building2 size={20} className={styles.venueIcon} />
                  <Heading level={4}>{venue.name}</Heading>
                </div>
                <div className={styles.cardActions}>
                  <Badge variant={venue.isActive ? 'success' : 'secondary'}>
                    {venue.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <GhostButton>
                        <MoreVertical size={16} />
                      </GhostButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewVenue(venue)}>
                        <Eye size={16} />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditVenue(venue)}>
                        <Edit size={16} />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleActive(venue.id)}>
                        {venue.isActive ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                        <span>{venue.isActive ? 'Deactivate' : 'Activate'}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(venue)}
                        className={styles.deleteItem}
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Address */}
              <div className={styles.venueInfo}>
                {venue.address && (
                  <div className={styles.infoItem}>
                    <MapPin size={16} className={styles.infoIcon} />
                    <Body size="small">{venue.address}</Body>
                  </div>
                )}

                {/* Operating Hours */}
                <div className={styles.infoItem}>
                  <Clock size={16} className={styles.infoIcon} />
                  <Body size="small">
                    {minutesToTime(venue.openingMinute)} - {minutesToTime(venue.closingMinute)}
                  </Body>
                </div>

                {/* Contact Info */}
                {venue.phone && (
                  <div className={styles.infoItem}>
                    <Phone size={16} className={styles.infoIcon} />
                    <Body size="small">{venue.phone}</Body>
                  </div>
                )}

                {venue.email && (
                  <div className={styles.infoItem}>
                    <Mail size={16} className={styles.infoIcon} />
                    <Body size="small">{venue.email}</Body>
                  </div>
                )}

                {/* Sector */}
                {venue.sector && (
                  <div className={styles.infoItem}>
                    <Building2 size={16} className={styles.infoIcon} />
                    <Body size="small">{venue.sector}</Body>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Venue</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{venueToDelete?.name}&quot;? This action cannot be undone.
              All staff members associated with this venue will need to be reassigned.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <OutlineButton 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </OutlineButton>
            <DestructiveButton 
              onClick={confirmDelete}
            >
              Delete
            </DestructiveButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

