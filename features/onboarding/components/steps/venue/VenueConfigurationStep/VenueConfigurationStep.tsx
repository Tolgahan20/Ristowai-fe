"use client";

import { Clock, DollarSign, Users, Settings, Wifi, Car } from 'lucide-react';
import { useVenueConfiguration } from '@/features/onboarding/hooks/use-venue-configuration';
import styles from './VenueConfigurationStep.module.css';

interface VenueConfigurationStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function VenueConfigurationStep({ stepData, onDataChange }: VenueConfigurationStepProps) {
  const {
    formData,
    errors,
    daysOfWeek,
    smokingPolicies,
    dressCodes,
    noiseLevels,
    handleInputChange,
    handleDayHoursChange,
    toggleDayOpen,
  } = useVenueConfiguration({
    initialData: stepData,
    onDataChange,
  });

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Opening Hours */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Clock size={18} className={styles.sectionIcon} />
            Operating Hours
          </h3>
          
          <div className={styles.hoursGrid}>
            {daysOfWeek.map(({ key, label }) => (
              <div key={key} className={styles.dayRow}>
                <div className={styles.dayHeader}>
                  <label className={styles.dayLabel}>
                    <input
                      type="checkbox"
                      checked={formData.openingHours[key]?.isOpen || false}
                      onChange={() => toggleDayOpen(key)}
                      className={styles.dayCheckbox}
                    />
                    <span className={styles.dayName}>{label}</span>
                  </label>
                </div>
                
                {formData.openingHours[key]?.isOpen && (
                  <div className={styles.timeInputs}>
                    <div className={styles.timeGroup}>
                      <input
                        type="time"
                        value={formData.openingHours[key]?.openTime || ''}
                        onChange={(e) => handleDayHoursChange(key, 'openTime', e.target.value)}
                        className={styles.timeInput}
                      />
                      <span className={styles.timeSeparator}>to</span>
                      <input
                        type="time"
                        value={formData.openingHours[key]?.closeTime || ''}
                        onChange={(e) => handleDayHoursChange(key, 'closeTime', e.target.value)}
                        className={styles.timeInput}
                      />
                    </div>
                    
                    {/* Siesta Option */}
                    <div className={styles.siestaContainer}>
                      <label className={styles.siestaLabel}>
                        <input
                          type="checkbox"
                          checked={formData.openingHours[key]?.hasSiesta || false}
                          onChange={(e) => handleDayHoursChange(key, 'hasSiesta', e.target.checked)}
                          className={styles.siestaCheckbox}
                        />
                        <span>Siesta Break</span>
                      </label>
                      
                      {formData.openingHours[key]?.hasSiesta && (
                        <div className={styles.siestaTimeInputs}>
                          <input
                            type="time"
                            value={formData.openingHours[key]?.siestaStart || ''}
                            onChange={(e) => handleDayHoursChange(key, 'siestaStart', e.target.value)}
                            className={styles.siestaTimeInput}
                          />
                          <span className={styles.timeSeparator}>to</span>
                          <input
                            type="time"
                            value={formData.openingHours[key]?.siestaEnd || ''}
                            onChange={(e) => handleDayHoursChange(key, 'siestaEnd', e.target.value)}
                            className={styles.siestaTimeInput}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {!formData.openingHours[key]?.isOpen && (
                  <div className={styles.closedIndicator}>
                    <span className={styles.closedText}>Closed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {errors.openingHours && (
            <span className={styles.errorText}>{String(errors.openingHours)}</span>
          )}
        </div>

        {/* Business Metrics */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <DollarSign size={18} className={styles.sectionIcon} />
            Business Metrics
          </h3>
          
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="managerHourlyValue" className={styles.label}>
                  Manager Hourly Rate <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="managerHourlyValue"
                    type="number"
                    value={formData.managerHourlyValue || ''}
                    onChange={(e) => handleInputChange('managerHourlyValue', parseFloat(e.target.value) || 0)}
                    className={`${styles.inputWithSuffix} ${errors.managerHourlyValue ? styles.inputError : ''}`}
                    placeholder="25"
                    min="0"
                    step="0.50"
                  />
                  <span className={styles.inputSuffix}>€/hr</span>
                </div>
                {errors.managerHourlyValue && (
                  <span className={styles.errorText}>{errors.managerHourlyValue}</span>
                )}
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="weeklySchedulingHours" className={styles.label}>
                  Weekly Scheduling Hours <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="weeklySchedulingHours"
                    type="number"
                    value={formData.weeklySchedulingHours || ''}
                    onChange={(e) => handleInputChange('weeklySchedulingHours', parseInt(e.target.value) || 0)}
                    className={`${styles.inputWithSuffix} ${errors.weeklySchedulingHours ? styles.inputError : ''}`}
                    placeholder="40"
                    min="1"
                  />
                  <span className={styles.inputSuffix}>hrs</span>
                </div>
                {errors.weeklySchedulingHours && (
                  <span className={styles.errorText}>{errors.weeklySchedulingHours}</span>
                )}
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="typicalOvertimeCost" className={styles.label}>
                  Overtime Multiplier
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    id="typicalOvertimeCost"
                    type="number"
                    value={formData.typicalOvertimeCost || ''}
                    onChange={(e) => handleInputChange('typicalOvertimeCost', parseFloat(e.target.value) || 0)}
                    className={styles.inputWithSuffix}
                    placeholder="1.5"
                    min="1"
                    step="0.1"
                  />
                  <span className={styles.inputSuffix}>×</span>
                </div>
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="averageStaffCount" className={styles.label}>
                  <Users size={16} className={styles.labelIcon} />
                  Average Staff Count <span className={styles.required}>*</span>
                </label>
                <input
                  id="averageStaffCount"
                  type="number"
                  value={formData.averageStaffCount || ''}
                  onChange={(e) => handleInputChange('averageStaffCount', parseInt(e.target.value) || 0)}
                  className={`${styles.input} ${errors.averageStaffCount ? styles.inputError : ''}`}
                  placeholder="8"
                  min="1"
                />
                {errors.averageStaffCount && (
                  <span className={styles.errorText}>{errors.averageStaffCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Services & Features */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Settings size={18} className={styles.sectionIcon} />
            Services & Features
          </h3>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureGroup}>
              <h4 className={styles.featureGroupTitle}>Services</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.hasDelivery}
                    onChange={(e) => handleInputChange('hasDelivery', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <span className={styles.featureLabel}>Delivery Service</span>
                </label>
                
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.hasTakeaway}
                    onChange={(e) => handleInputChange('hasTakeaway', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <span className={styles.featureLabel}>Takeaway</span>
                </label>
                
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.hasReservations}
                    onChange={(e) => handleInputChange('hasReservations', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <span className={styles.featureLabel}>Reservations</span>
                </label>
              </div>
            </div>
            
            <div className={styles.featureGroup}>
              <h4 className={styles.featureGroupTitle}>Amenities</h4>
              <div className={styles.featuresList}>
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.hasWifi}
                    onChange={(e) => handleInputChange('hasWifi', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <Wifi size={16} className={styles.featureIcon} />
                  <span className={styles.featureLabel}>WiFi</span>
                </label>
                
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.hasParking}
                    onChange={(e) => handleInputChange('hasParking', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <Car size={16} className={styles.featureIcon} />
                  <span className={styles.featureLabel}>Parking</span>
                </label>
                
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.acceptsCreditCards}
                    onChange={(e) => handleInputChange('acceptsCreditCards', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <span className={styles.featureLabel}>Credit Cards</span>
                </label>
                
                <label className={styles.featureItem}>
                  <input
                    type="checkbox"
                    checked={formData.isWheelchairAccessible}
                    onChange={(e) => handleInputChange('isWheelchairAccessible', e.target.checked)}
                    className={styles.featureCheckbox}
                  />
                  <span className={styles.featureLabel}>Wheelchair Accessible</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Policies */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Venue Policies</h3>
          
          <div className={styles.policiesGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="smokingPolicy" className={styles.label}>
                Smoking Policy
              </label>
              <select
                id="smokingPolicy"
                value={formData.smokingPolicy}
                onChange={(e) => handleInputChange('smokingPolicy', e.target.value)}
                className={styles.select}
              >
                {smokingPolicies.map(policy => (
                  <option key={policy.value} value={policy.value}>
                    {policy.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="dressCode" className={styles.label}>
                Dress Code
              </label>
              <select
                id="dressCode"
                value={formData.dressCode}
                onChange={(e) => handleInputChange('dressCode', e.target.value)}
                className={styles.select}
              >
                {dressCodes.map(code => (
                  <option key={code.value} value={code.value}>
                    {code.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="noiseLevel" className={styles.label}>
                Noise Level
              </label>
              <select
                id="noiseLevel"
                value={formData.noiseLevel}
                onChange={(e) => handleInputChange('noiseLevel', e.target.value)}
                className={styles.select}
              >
                {noiseLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
