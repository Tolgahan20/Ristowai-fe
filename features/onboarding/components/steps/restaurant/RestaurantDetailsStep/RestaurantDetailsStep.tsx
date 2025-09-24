"use client";

import { Info, MapPin } from 'lucide-react';
import { AddressAutocomplete } from '@/components/ui/address-autocomplete/AddressAutocomplete';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedSelect } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Body, Caption } from '@/components/ui/typography';
import { useRestaurantDetails } from '@/features/onboarding/hooks/use-restaurant-details';
import styles from './RestaurantDetailsStep.module.css';

interface RestaurantDetailsStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function RestaurantDetailsStep({ stepData, onDataChange }: RestaurantDetailsStepProps) {
  const {
    formData,
    errors,
    restaurantTypes,
    handleInputChange,
    handleAddressSelect,
  } = useRestaurantDetails({
    initialData: stepData,
    onDataChange,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Card className={styles.venueNote}>
          <CardContent>
            <div className={styles.venueNoteContent}>
              <Info size={16} className={styles.venueNoteIcon} />
              <Body size="small">
                <strong>Multiple locations?</strong> Start with your main restaurant. You can easily add additional venues later from your dashboard.
              </Body>
            </div>
          </CardContent>
        </Card>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Restaurant Name */}
        <div className={styles.formGroup}>
          <Input
            label="Restaurant Name"
            required
            placeholder="Enter your restaurant name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={errors.name}
          />
        </div>

        {/* Restaurant Type */}
        <div className={styles.formGroup}>
          <Label required>Restaurant Type</Label>
          <EnhancedSelect
            value={formData.restaurantType}
            onValueChange={(value) => handleInputChange('restaurantType', value)}
            placeholder="Select restaurant type"
            options={restaurantTypes.map(type => ({ value: type, label: type }))}
            error={errors.restaurantType}
          />
        </div>

        {/* Address with Google Autocomplete */}
        <div className={styles.formGroup}>
          <Label required>Address</Label>
          <AddressAutocomplete
            value={formData.address}
            onChange={(address) => handleInputChange('address', address)}
            onSelect={handleAddressSelect}
            placeholder="Start typing your restaurant's address in Italy..."
            error={!!errors.address}
          />
          {errors.address && <Caption color="destructive">{errors.address}</Caption>}
          <Caption className={styles.addressHelp}>
            💡 Start typing and we&apos;ll suggest complete addresses from Google Maps
          </Caption>
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <Label optional>Description</Label>
          <Textarea
            placeholder="Brief description of your restaurant, cuisine type, atmosphere, etc."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />
        </div>

        {/* Contact Information */}
        <div className={styles.contactGrid}>
          <div className={styles.formGroup}>
            <Label optional>Phone Number</Label>
            <Input
              type="tel"
              placeholder="+39 081 123 4567"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
            />
          </div>

          <div className={styles.formGroup}>
            <Label optional>Email Address</Label>
            <Input
              type="email"
              placeholder="ciao@tuoristorante.it"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
            />
          </div>
        </div>

        {/* Website and Logo */}
        <div className={styles.contactGrid}>
          <div className={styles.formGroup}>
            <Label optional>Website</Label>
            <Input
              type="url"
              placeholder="https://tuoristorante.it"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              error={errors.website}
            />
          </div>

          <div className={styles.formGroup}>
            <Label optional>Logo URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/logo.jpg"
              value={formData.logoUrl}
              onChange={(e) => handleInputChange('logoUrl', e.target.value)}
              error={errors.logoUrl}
              description="Add a direct link to your restaurant's logo image"
            />
          </div>
        </div>


        {/* Location Preview */}
        {formData.latitude && formData.longitude && (
          <div className={styles.formGroup}>
            <Label>Location Coordinates</Label>
            <Card className={styles.coordinatesDisplay}>
              <CardContent>
                <Body size="small" className={styles.coordinateText}>
                  <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Latitude: {formData.latitude.toFixed(6)}, Longitude: {formData.longitude.toFixed(6)}
                </Body>
                <Caption>
                  Automatically detected from your address selection
                </Caption>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={styles.actions}>
          <Caption className={styles.fieldsNote}>
            Fields marked with <span className={styles.required}>*</span> are required
          </Caption>
        </div>
      </form>
    </div>
  );
}
