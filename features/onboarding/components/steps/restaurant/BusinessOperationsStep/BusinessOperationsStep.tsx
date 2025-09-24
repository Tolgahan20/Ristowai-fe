"use client";

import { DollarSign, Users, Clock, TrendingUp, Building } from 'lucide-react';
import { useBusinessOperations } from '@/features/onboarding/hooks/use-business-operations';
import styles from './BusinessOperationsStep.module.css';

interface BusinessOperationsStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function BusinessOperationsStep({ stepData, onDataChange }: BusinessOperationsStepProps) {
  const {
    formData,
    errors,
    handleInputChange,
  } = useBusinessOperations({ 
    initialData: stepData, 
    onDataChange 
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <TrendingUp size={24} />
        </div>
        <div className={styles.headerContent}>
          <h2 className={styles.title}>Business Operations & Metrics</h2>
          <p className={styles.subtitle}>
            Configure key business metrics to help Smart Shifts optimize your operations. 
            These values will be used for KPI tracking and scheduling recommendations.
          </p>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.grid}>
          {/* Manager Hourly Value */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <DollarSign size={16} className={styles.labelIcon} />
              Manager Hourly Value <span className={styles.optional}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.managerHourlyValue || ''}
                onChange={(e) => handleInputChange('managerHourlyValue', e.target.value)}
                placeholder="25.50"
                className={`${styles.input} ${errors.managerHourlyValue ? styles.inputError : ''}`}
              />
              <span className={styles.inputSuffix}>€/hour</span>
            </div>
            <p className={styles.fieldHelp}>
              Your typical manager&apos;s hourly cost (used for scheduling optimization)
            </p>
            {errors.managerHourlyValue && (
              <p className={styles.errorText}>{errors.managerHourlyValue}</p>
            )}
          </div>

          {/* Weekly Scheduling Hours */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Clock size={16} className={styles.labelIcon} />
              Weekly Scheduling Time <span className={styles.optional}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                step="0.5"
                min="0"
                max="40"
                value={formData.weeklySchedulingHours || ''}
                onChange={(e) => handleInputChange('weeklySchedulingHours', e.target.value)}
                placeholder="3.5"
                className={`${styles.input} ${errors.weeklySchedulingHours ? styles.inputError : ''}`}
              />
              <span className={styles.inputSuffix}>hours/week</span>
            </div>
            <p className={styles.fieldHelp}>
              How many hours per week you currently spend on scheduling
            </p>
            {errors.weeklySchedulingHours && (
              <p className={styles.errorText}>{errors.weeklySchedulingHours}</p>
            )}
          </div>

          {/* Typical Overtime Cost */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <TrendingUp size={16} className={styles.labelIcon} />
              Weekly Overtime Cost <span className={styles.optional}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                step="10"
                min="0"
                value={formData.typicalOvertimeCost || ''}
                onChange={(e) => handleInputChange('typicalOvertimeCost', e.target.value)}
                placeholder="150"
                className={`${styles.input} ${errors.typicalOvertimeCost ? styles.inputError : ''}`}
              />
              <span className={styles.inputSuffix}>€/week</span>
            </div>
            <p className={styles.fieldHelp}>
              Your typical weekly overtime costs (helps identify savings opportunities)
            </p>
            {errors.typicalOvertimeCost && (
              <p className={styles.errorText}>{errors.typicalOvertimeCost}</p>
            )}
          </div>

          {/* Average Staff Count */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              <Users size={16} className={styles.labelIcon} />
              Average Staff Count <span className={styles.optional}>(Optional)</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="number"
                step="1"
                min="1"
                max="500"
                value={formData.averageStaffCount || ''}
                onChange={(e) => handleInputChange('averageStaffCount', e.target.value)}
                placeholder="12"
                className={`${styles.input} ${errors.averageStaffCount ? styles.inputError : ''}`}
              />
              <span className={styles.inputSuffix}>employees</span>
            </div>
            <p className={styles.fieldHelp}>
              Average number of staff members you employ (across all positions)
            </p>
            {errors.averageStaffCount && (
              <p className={styles.errorText}>{errors.averageStaffCount}</p>
            )}
          </div>
        </div>

        {/* Main Venue Creation Notice */}
        <div className={styles.venueNotice}>
          <div className={styles.venueNoticeIcon}>
            <Building size={20} />
          </div>
          <div className={styles.venueNoticeContent}>
            <h4 className={styles.venueNoticeTitle}>Main Venue Creation</h4>
            <p className={styles.venueNoticeText}>
              After configuring these metrics, we&apos;ll automatically create your main venue 
              using your restaurant information. You can add more venues later from the dashboard.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          
          <div className={styles.helpSection}>
            <h4 className={styles.helpTitle}>Why These Metrics Matter</h4>
            <ul className={styles.helpList}>
              <li><strong>Manager Hourly Value:</strong> Helps calculate the ROI of automated scheduling</li>
              <li><strong>Scheduling Time:</strong> Shows how much time Smart Shifts can save you</li>
              <li><strong>Overtime Costs:</strong> Identifies optimization opportunities</li>
              <li><strong>Staff Count:</strong> Helps size recommendations and reports</li>
            </ul>
            <p className={styles.helpNote}>
              <strong>Note:</strong> All fields are optional but recommended for better insights and KPI tracking.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
