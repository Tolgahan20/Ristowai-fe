"use client";

import React from 'react';
import { ArrowLeft, Building2, MapPin, Clock, Phone, Mail, Globe, Edit, DollarSign, Calendar } from 'lucide-react';
import { Heading, Body } from '@/components/ui/typography';
import { PrimaryButton, OutlineButton } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VenueResponseDto } from '../../types';
import { minutesToTime } from '../../types';
import styles from './VenueDetails.module.css';

interface VenueDetailsProps {
  venue: VenueResponseDto;
  onEdit: () => void;
  onBack: () => void;
}

export function VenueDetails({ venue, onEdit, onBack }: VenueDetailsProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <OutlineButton
          onClick={onBack}
          leftIcon={<ArrowLeft size={16} />}
        >
          Back to List
        </OutlineButton>

        <div className={styles.headerActions}>
          <Badge variant={venue.isActive ? 'success' : 'secondary'}>
            {venue.isActive ? 'Active' : 'Inactive'}
          </Badge>
          <PrimaryButton
            onClick={onEdit}
            leftIcon={<Edit size={16} />}
          >
            Edit Venue
          </PrimaryButton>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Basic Info Card */}
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.venueHeader}>
              <div className={styles.venueIcon}>
                <Building2 size={32} />
              </div>
              <div className={styles.venueTitle}>
                <Heading level={2} className={styles.venueName}>{venue.name}</Heading>
                {venue.sector && <Body size="small" className={styles.venueSector}>{venue.sector}</Body>}
              </div>
            </div>

            <div className={styles.infoGrid}>
              {/* Address */}
              {venue.address && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <MapPin size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Address</Body>
                  </div>
                  <Body className={styles.infoValue}>{venue.address}</Body>
                </div>
              )}

              {/* Operating Hours */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <Clock size={18} className={styles.icon} />
                  <Body size="small" className={styles.infoLabel}>Operating Hours</Body>
                </div>
                <Body className={styles.infoValue}>
                  {minutesToTime(venue.openingMinute)} - {minutesToTime(venue.closingMinute)}
                </Body>
              </div>

              {/* Timezone */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <Globe size={18} className={styles.icon} />
                  <Body size="small" className={styles.infoLabel}>Timezone</Body>
                </div>
                <Body className={styles.infoValue}>{venue.timezone}</Body>
              </div>

              {/* Contact Phone */}
              {venue.phone && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <Phone size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Phone</Body>
                  </div>
                  <Body className={styles.infoValue}>{venue.phone}</Body>
                </div>
              )}

              {/* Contact Email */}
              {venue.email && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <Mail size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Email</Body>
                  </div>
                  <Body className={styles.infoValue}>{venue.email}</Body>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings Card */}
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <Heading level={3} className={styles.sectionTitle}>Additional Settings</Heading>
            
            <div className={styles.infoGrid}>
              {/* Manager Hourly Value */}
              {venue.managerHourlyValue && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <DollarSign size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Manager Hourly Value</Body>
                  </div>
                  <Body className={styles.infoValue}>€{Number(venue.managerHourlyValue).toFixed(2)}</Body>
                </div>
              )}

              {/* Weekly Scheduling Hours */}
              {venue.weeklySchedulingHours && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <Calendar size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Weekly Scheduling Hours</Body>
                  </div>
                  <Body className={styles.infoValue}>{venue.weeklySchedulingHours} hours</Body>
                </div>
              )}

              {/* Typical Overtime Cost */}
              {venue.typicalOvertimeCost && (
                <div className={styles.infoSection}>
                  <div className={styles.infoHeader}>
                    <DollarSign size={18} className={styles.icon} />
                    <Body size="small" className={styles.infoLabel}>Overtime Cost Multiplier</Body>
                  </div>
                  <Body className={styles.infoValue}>{venue.typicalOvertimeCost}x</Body>
                </div>
              )}

              {/* Currency & Locale */}
              <div className={styles.infoSection}>
                <div className={styles.infoHeader}>
                  <Globe size={18} className={styles.icon} />
                  <Body size="small" className={styles.infoLabel}>Currency & Locale</Body>
                </div>
                <Body className={styles.infoValue}>{venue.currency} / {venue.locale}</Body>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
