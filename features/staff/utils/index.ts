import type { ContractType } from '../types';
import { CONTRACT_TYPE_LABELS, DAYS_OF_WEEK } from '../constants';

export const getContractTypeLabel = (type: ContractType): string => {
  return CONTRACT_TYPE_LABELS[type] || type;
};

export const minutesToTimeString = (minutes?: number): string => {
  if (!minutes) return 'Not set';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const timeStringToMinutes = (timeString: string | number | undefined): number => {
  if (!timeString) return 0;
  
  // If it's already a number, return it
  if (typeof timeString === 'number') return timeString;
  
  // If it's a string, convert it
  if (typeof timeString === 'string') {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours || 0) * 60 + (minutes || 0);
  }
  
  return 0;
};

export const getDayName = (dayIndex: number): string => {
  return DAYS_OF_WEEK[dayIndex] || 'Unknown';
};

export const formatDisplayName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
