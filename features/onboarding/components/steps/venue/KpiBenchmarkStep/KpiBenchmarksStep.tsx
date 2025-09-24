"use client";

import { TrendingUp, Target, DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';
import { useKpiBenchmarks } from '@/features/onboarding/hooks/use-kpi-benchmarks';
import styles from './KpiBenchmarksStep.module.css';

interface KpiBenchmarksStepProps {
  stepData: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function KpiBenchmarksStep({ stepData, onDataChange }: KpiBenchmarksStepProps) {
  const {
    formData,
    errors,
    timeSlots,
    seasons,
    handleInputChange,
    handleSeasonalFactorChange,
    togglePeakHour,
    calculateEstimatedRevenue,
  } = useKpiBenchmarks({
    initialData: stepData,
    onDataChange,
  });

  const estimatedMonthlyRevenue = calculateEstimatedRevenue();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.optionalNote}>
          <div className={styles.optionalNoteIcon}>
            <AlertTriangle size={16} />
          </div>
          <div className={styles.optionalNoteContent}>
            <p className={styles.optionalNoteText}>
              <strong>Optional Step:</strong> These benchmarks help you track performance, but you can skip this step and set them up later from your dashboard.
            </p>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        {/* Revenue Targets */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <DollarSign size={18} className={styles.sectionIcon} />
            Revenue Targets
          </h3>
          
          <div className={styles.revenueGrid}>
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetRevenue" className={styles.label}>
                  Monthly Revenue Target
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="targetRevenue"
                    type="number"
                    value={formData.targetRevenue || ''}
                    onChange={(e) => handleInputChange('targetRevenue', parseFloat(e.target.value) || 0)}
                    className={styles.input}
                    placeholder="25000"
                    min="0"
                  />
                  <span className={styles.inputSuffix}>€</span>
                </div>
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetCustomersPerDay" className={styles.label}>
                  <Users size={16} className={styles.labelIcon} />
                  Daily Customer Target
                </label>
                <input
                  id="targetCustomersPerDay"
                  type="number"
                  value={formData.targetCustomersPerDay || ''}
                  onChange={(e) => handleInputChange('targetCustomersPerDay', parseInt(e.target.value) || 0)}
                  className={styles.input}
                  placeholder="120"
                  min="0"
                />
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="averageOrderValue" className={styles.label}>
                  Average Order Value
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="averageOrderValue"
                    type="number"
                    value={formData.averageOrderValue || ''}
                    onChange={(e) => handleInputChange('averageOrderValue', parseFloat(e.target.value) || 0)}
                    className={styles.input}
                    placeholder="35"
                    min="0"
                    step="0.50"
                  />
                  <span className={styles.inputSuffix}>€</span>
                </div>
              </div>
            </div>
          </div>
          
          {estimatedMonthlyRevenue > 0 && (
            <div className={styles.calculatedMetric}>
              <TrendingUp size={16} className={styles.calculatedIcon} />
              <span className={styles.calculatedLabel}>
                Estimated Monthly Revenue: <strong>€{estimatedMonthlyRevenue.toLocaleString()}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Operational Targets */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Target size={18} className={styles.sectionIcon} />
            Operational Targets
          </h3>
          
          <div className={styles.operationalGrid}>
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetTableTurnover" className={styles.label}>
                  Table Turnover Rate
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="targetTableTurnover"
                    type="number"
                    value={formData.targetTableTurnover || ''}
                    onChange={(e) => handleInputChange('targetTableTurnover', parseFloat(e.target.value) || 0)}
                    className={styles.input}
                    placeholder="2.5"
                    min="0"
                    step="0.1"
                  />
                  <span className={styles.inputSuffix}>turns/day</span>
                </div>
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetFoodCostPercentage" className={styles.label}>
                  Food Cost Percentage
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="targetFoodCostPercentage"
                    type="number"
                    value={formData.targetFoodCostPercentage || ''}
                    onChange={(e) => handleInputChange('targetFoodCostPercentage', parseFloat(e.target.value) || 0)}
                    className={`${styles.input} ${errors.targetFoodCostPercentage ? styles.inputWarning : ''}`}
                    placeholder="30"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <span className={styles.inputSuffix}>%</span>
                </div>
                {errors.targetFoodCostPercentage && (
                  <span className={styles.warningText}>{String(errors.targetFoodCostPercentage)}</span>
                )}
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetLaborCostPercentage" className={styles.label}>
                  Labor Cost Percentage
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="targetLaborCostPercentage"
                    type="number"
                    value={formData.targetLaborCostPercentage || ''}
                    onChange={(e) => handleInputChange('targetLaborCostPercentage', parseFloat(e.target.value) || 0)}
                    className={`${styles.input} ${errors.targetLaborCostPercentage ? styles.inputWarning : ''}`}
                    placeholder="35"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <span className={styles.inputSuffix}>%</span>
                </div>
                {errors.targetLaborCostPercentage && (
                  <span className={styles.warningText}>{String(errors.targetLaborCostPercentage)}</span>
                )}
              </div>
            </div>
            
            <div className={styles.metricCard}>
              <div className={styles.formGroup}>
                <label htmlFor="targetProfitMargin" className={styles.label}>
                  Target Profit Margin
                </label>
                <div className={styles.inputWithSuffix}>
                  <input
                    id="targetProfitMargin"
                    type="number"
                    value={formData.targetProfitMargin || ''}
                    onChange={(e) => handleInputChange('targetProfitMargin', parseFloat(e.target.value) || 0)}
                    className={`${styles.input} ${errors.targetProfitMargin ? styles.inputWarning : ''}`}
                    placeholder="15"
                    min="0"
                    max="100"
                    step="0.5"
                  />
                  <span className={styles.inputSuffix}>%</span>
                </div>
                {errors.targetProfitMargin && (
                  <span className={styles.warningText}>{String(errors.targetProfitMargin)}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Peak Hours */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Clock size={18} className={styles.sectionIcon} />
            Peak Operating Hours
          </h3>
          
          <div className={styles.peakHoursGrid}>
            {timeSlots.map(slot => (
              <label key={slot.value} className={styles.peakHourItem}>
                <input
                  type="checkbox"
                  checked={formData.peakHours.includes(slot.value)}
                  onChange={() => togglePeakHour(slot.value)}
                  className={styles.peakHourCheckbox}
                />
                <span className={styles.peakHourLabel}>{slot.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Seasonal Factors */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <TrendingUp size={18} className={styles.sectionIcon} />
            Seasonal Factors
          </h3>
          
          <div className={styles.seasonalGrid}>
            {seasons.map(season => (
              <div key={season.key} className={styles.seasonalCard}>
                <div className={styles.formGroup}>
                  <label htmlFor={`seasonal-${season.key}`} className={styles.label}>
                    {season.label}
                  </label>
                  <div className={styles.inputWithSuffix}>
                    <input
                      id={`seasonal-${season.key}`}
                      type="number"
                      value={formData.seasonalFactors[season.key] || ''}
                      onChange={(e) => handleSeasonalFactorChange(season.key, parseFloat(e.target.value) || 0)}
                      className={styles.input}
                      placeholder="1.0"
                      min="0"
                      max="3"
                      step="0.1"
                    />
                    <span className={styles.inputSuffix}>×</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.seasonalNote}>
            <p className={styles.seasonalNoteText}>
              <strong>Seasonal factors:</strong> 1.0 = normal, 1.2 = 20% higher, 0.8 = 20% lower
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Additional Notes</h3>
          
          <div className={styles.additionalNotesCard}>
            <div className={styles.formGroup}>
              <label htmlFor="benchmarkNotes" className={styles.label}>
                Benchmark Notes & Goals
              </label>
              <textarea
                id="benchmarkNotes"
                value={formData.benchmarkNotes}
                onChange={(e) => handleInputChange('benchmarkNotes', e.target.value)}
                className={styles.textarea}
                placeholder="Add any specific goals, strategies, or notes about your performance targets..."
                rows={4}
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
