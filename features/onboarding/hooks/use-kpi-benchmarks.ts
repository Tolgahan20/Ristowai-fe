"use client";

import { useState, useEffect } from 'react';

export interface KpiBenchmarksData extends Record<string, unknown> {
  targetRevenue: number;
  targetCustomersPerDay: number;
  averageOrderValue: number;
  targetTableTurnover: number;
  targetFoodCostPercentage: number;
  targetLaborCostPercentage: number;
  targetProfitMargin: number;
  peakHours: string[];
  seasonalFactors: Record<string, number>;
  benchmarkNotes: string;
}

export interface UseKpiBenchmarksProps {
  initialData?: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
}

export function useKpiBenchmarks({ initialData = {}, onDataChange }: UseKpiBenchmarksProps) {
  const [formData, setFormData] = useState<KpiBenchmarksData>({
    targetRevenue: (initialData.targetRevenue as number) || 0,
    targetCustomersPerDay: (initialData.targetCustomersPerDay as number) || 0,
    averageOrderValue: (initialData.averageOrderValue as number) || 0,
    targetTableTurnover: (initialData.targetTableTurnover as number) || 2.5,
    targetFoodCostPercentage: (initialData.targetFoodCostPercentage as number) || 30,
    targetLaborCostPercentage: (initialData.targetLaborCostPercentage as number) || 35,
    targetProfitMargin: (initialData.targetProfitMargin as number) || 15,
    peakHours: (initialData.peakHours as string[]) || [],
    seasonalFactors: (initialData.seasonalFactors as Record<string, number>) || {
      spring: 1.0,
      summer: 1.2,
      autumn: 1.0,
      winter: 0.8,
    },
    benchmarkNotes: (initialData.benchmarkNotes as string) || '',
  });

  const [errors, setErrors] = useState<Partial<KpiBenchmarksData>>({});

  const timeSlots = [
    { value: '06:00-09:00', label: 'Early Morning (6-9 AM)' },
    { value: '09:00-12:00', label: 'Morning (9 AM-12 PM)' },
    { value: '12:00-15:00', label: 'Lunch (12-3 PM)' },
    { value: '15:00-18:00', label: 'Afternoon (3-6 PM)' },
    { value: '18:00-21:00', label: 'Dinner (6-9 PM)' },
    { value: '21:00-24:00', label: 'Late Evening (9 PM-12 AM)' },
  ];

  const seasons = [
    { key: 'spring', label: 'Spring' },
    { key: 'summer', label: 'Summer' },
    { key: 'autumn', label: 'Autumn' },
    { key: 'winter', label: 'Winter' },
  ];

  // Sync form data to parent
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  const handleInputChange = (field: keyof KpiBenchmarksData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSeasonalFactorChange = (season: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      seasonalFactors: {
        ...prev.seasonalFactors,
        [season]: value,
      },
    }));
  };

  const togglePeakHour = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      peakHours: prev.peakHours.includes(timeSlot)
        ? prev.peakHours.filter(h => h !== timeSlot)
        : [...prev.peakHours, timeSlot],
    }));
  };


  const calculateEstimatedRevenue = () => {
    if (formData.targetCustomersPerDay && formData.averageOrderValue) {
      return formData.targetCustomersPerDay * formData.averageOrderValue * 30; // Monthly estimate
    }
    return 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<KpiBenchmarksData> = {};

    // All fields are optional for KPI benchmarks, but we can provide warnings
    if (formData.targetFoodCostPercentage > 40) {
      (newErrors as any).targetFoodCostPercentage = 'Food cost percentage seems high (>40%)';
    }

    if (formData.targetLaborCostPercentage > 45) {
      (newErrors as any).targetLaborCostPercentage = 'Labor cost percentage seems high (>45%)';
    }

    if (formData.targetProfitMargin < 5) {
      (newErrors as any).targetProfitMargin = 'Profit margin seems low (<5%)';
    }

    setErrors(newErrors);
    return true; // Always valid since all fields are optional
  };

  return {
    formData,
    errors,
    timeSlots,
    seasons,
    handleInputChange,
    handleSeasonalFactorChange,
    togglePeakHour,
    calculateEstimatedRevenue,
    validateForm,
  };
}
