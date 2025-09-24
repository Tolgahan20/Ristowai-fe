"use client";

import { Info, MapPin, Users, Phone, Mail, Globe } from 'lucide-react';
import { AddressAutocomplete } from '@/components/ui/address-autocomplete/AddressAutocomplete';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedSelect } from '@/components/ui/select';
import { Heading, Caption } from '@/components/ui/typography';
import { useVenueDetails } from '@/features/onboarding/hooks/use-venue-details';
import styles from './VenueDetailsStep.module.css';

interface VenueDetailsStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function VenueDetailsStep({ stepData, onDataChange }: VenueDetailsStepProps) {
  const {
    formData,
    errors,
    timezones,
    currencies,
    locales,
    handleInputChange,
  } = useVenueDetails({
    initialData: stepData,
    onDataChange,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.venueNote}>
          <Info size={16} className={styles.venueNoteIcon} />
          <Caption>Configure your location details, contact information, and operational settings.</Caption>
        </div>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Basic Information */}
        <div className={styles.section}>
          <Heading level={3} className={styles.sectionTitle}>Basic Information</Heading>
          
          {/* Venue Name */}
          <div className={styles.formGroup}>
            <Input
              label="Venue Name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., Trattoria Bella Vista"
              error={errors.name}
            />
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your venue's atmosphere, cuisine, or unique features..."
              rows={3}
              size="sm"
            />
          </div>

          {/* Capacity */}
          <div className={styles.formGroup}>
            <Label required icon={<Users size={16} />}>
              Seating Capacity
            </Label>
            <Input
              type="number"
              value={formData.capacity?.toString() ?? '0'}
              onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
              placeholder="80"
              min="1"
              error={errors.capacity?.toString()}
            />
          </div>
        </div>

        {/* Location */}
        <div className={styles.section}>
          <Heading level={3} className={styles.sectionTitle}>
            <MapPin size={18} className={styles.sectionIcon} />
            Location Details
          </Heading>
          
          {/* Address */}
          <div className={styles.formGroup}>
            <Label required>Address</Label>
            <AddressAutocomplete
              value={formData.address}
              onChange={(value) => handleInputChange('address', value)}
              onSelect={(address, placeDetails) => {
                handleInputChange('address', address);
                if (placeDetails?.geometry?.location) {
                  const lat = typeof placeDetails.geometry.location.lat === 'function' 
                    ? placeDetails.geometry.location.lat() 
                    : placeDetails.geometry.location.lat;
                  const lng = typeof placeDetails.geometry.location.lng === 'function' 
                    ? placeDetails.geometry.location.lng() 
                    : placeDetails.geometry.location.lng;
                  
                  // Update with extracted location data
                  handleInputChange('latitude', lat);
                  handleInputChange('longitude', lng);
                }
              }}
              placeholder="Start typing your address..."
              error={!!errors.address}
            />
            {errors.address && <Caption color="destructive">{errors.address}</Caption>}
          </div>

          {/* City, State, Zip */}
          <div className={styles.addressRow}>
            <div className={styles.formGroup}>
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Milano"
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label>State/Region</Label>
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Lombardia"
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label>ZIP Code</Label>
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="20121"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <Label>Country</Label>
            <Input
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              placeholder="Italy"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.section}>
          <Heading level={3} className={styles.sectionTitle}>
            <Phone size={18} className={styles.sectionIcon} />
            Contact Information
          </Heading>
          
          <div className={styles.contactRow}>
            <div className={styles.formGroup}>
              <Label required icon={<Phone size={16} />}>
                Phone
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+39 02 1234567"
                error={errors.phone}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label required icon={<Mail size={16} />}>
                Email
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="info@venue.com"
                error={errors.email}
              />
            </div>
          </div>
        </div>

        {/* Regional Settings */}
        <div className={styles.section}>
          <Heading level={3} className={styles.sectionTitle}>
            <Globe size={18} className={styles.sectionIcon} />
            Regional Settings
          </Heading>
          
          <div className={styles.regionalRow}>
            <div className={styles.formGroup}>
              <Label>Timezone</Label>
              <EnhancedSelect
                value={formData.timezone}
                onValueChange={(value) => handleInputChange('timezone', value)}
                placeholder="Select timezone"
                options={timezones.map(tz => ({ value: tz, label: tz }))}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label>Currency</Label>
              <EnhancedSelect
                value={formData.currency}
                onValueChange={(value) => handleInputChange('currency', value)}
                placeholder="Select currency"
                options={currencies.map(curr => ({ value: curr.code, label: curr.name }))}
              />
            </div>
            
            <div className={styles.formGroup}>
              <Label>Language</Label>
              <EnhancedSelect
                value={formData.locale}
                onValueChange={(value) => handleInputChange('locale', value)}
                placeholder="Select language"
                options={locales.map(loc => ({ value: loc.code, label: loc.name }))}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
