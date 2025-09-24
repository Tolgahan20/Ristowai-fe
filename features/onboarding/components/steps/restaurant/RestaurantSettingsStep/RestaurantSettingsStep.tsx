"use client";

import { useRestaurantSettings } from '@/features/onboarding/hooks/use-restaurant-settings';
import styles from './RestaurantSettingsStep.module.css';

interface RestaurantSettingsStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function RestaurantSettingsStep({ stepData, onDataChange }: RestaurantSettingsStepProps) {
  const {
    formData,
    errors,
    timezones,
    daysOfWeek,
    handleTimezoneChange,
    handleDayHoursChange,
    copyToAllDays,
  } = useRestaurantSettings({
    initialData: stepData,
    onDataChange,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Restaurant Settings</h3>
        <p className={styles.subtitle}>
          Configure your restaurant&apos;s timezone and operating hours. You can always update these later.
        </p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Timezone Selection */}
        <div className={styles.formGroup}>
          <label htmlFor="timezone" className={styles.label}>
            Timezone <span className={styles.required}>*</span>
          </label>
          <select
            id="timezone"
            className={styles.select}
            value={formData.timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
          <p className={styles.helpText}>
            This will be used for scheduling and time displays throughout the system.
          </p>
        </div>

        {/* Opening Hours */}
        <div className={styles.formGroup}>
          <div className={styles.hoursHeader}>
            <h4 className={styles.hoursTitle}>Operating Hours</h4>
          </div>
          
          <div className={styles.hoursGrid}>
            {daysOfWeek.map(({ key, label }) => {
              const dayHours = formData.openingHours[key];
              return (
                <div key={key} className={styles.dayRow}>
                  <div className={styles.dayInfo}>
                    <span className={styles.dayLabel}>{label}</span>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={dayHours.closed}
                        onChange={(e) => handleDayHoursChange(key, 'closed', e.target.checked)}
                        className={styles.checkbox}
                      />
                      Closed
                    </label>
                  </div>
                  
                  {!dayHours.closed && (
                    <div className={styles.timeInputs}>
                      <div className={styles.timeGroup}>
                        <label className={styles.timeLabel}>Open</label>
                        <input
                          type="time"
                          value={dayHours.open}
                          onChange={(e) => handleDayHoursChange(key, 'open', e.target.value)}
                          className={styles.timeInput}
                        />
                      </div>
                      <span className={styles.timeSeparator}>to</span>
                      <div className={styles.timeGroup}>
                        <label className={styles.timeLabel}>Close</label>
                        <input
                          type="time"
                          value={dayHours.close}
                          onChange={(e) => handleDayHoursChange(key, 'close', e.target.value)}
                          className={styles.timeInput}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToAllDays(key)}
                        className={styles.copyButton}
                        title="Copy these hours to all other days"
                      >
                        Copy to All
                      </button>
                    </div>
                  )}

                  {!dayHours.closed && (
                    <div className={styles.siestaContainer}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={dayHours.hasSiesta || false}
                          onChange={(e) => handleDayHoursChange(key, 'hasSiesta', e.target.checked)}
                          className={styles.checkbox}
                        />
                        Siesta Break (Italian style)
                      </label>
                      
                      {dayHours.hasSiesta && (
                        <div className={styles.siestaTimeInputs}>
                          <div className={styles.timeGroup}>
                            <label className={styles.timeLabel}>Break Start</label>
                            <input
                              type="time"
                              value={dayHours.siestaStart || '13:00'}
                              onChange={(e) => handleDayHoursChange(key, 'siestaStart', e.target.value)}
                              className={styles.timeInput}
                            />
                          </div>
                          <span className={styles.timeSeparator}>to</span>
                          <div className={styles.timeGroup}>
                            <label className={styles.timeLabel}>Break End</label>
                            <input
                              type="time"
                              value={dayHours.siestaEnd || '16:00'}
                              onChange={(e) => handleDayHoursChange(key, 'siestaEnd', e.target.value)}
                              className={styles.timeInput}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {dayHours.closed && (
                    <div className={styles.closedIndicator}>
                      <span className={styles.closedText}>Closed all day</span>
                    </div>
                  )}
                  
                  {errors[key] && (
                    <span className={styles.errorText}>{errors[key]}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Notes */}
        <div className={styles.infoBox}>
          <h5 className={styles.infoTitle}>💡 Helpful Tips</h5>
          <ul className={styles.infoList}>
            <li>Use 24-hour format for accurate scheduling</li>
            <li>You can set different hours for each day of the week</li>
            <li>Mark days as &quot;Closed&quot; if you don&apos;t operate on those days</li>
            <li>These hours will be used for staff scheduling and customer information</li>
          </ul>
        </div>
      </form>
    </div>
  );
}
