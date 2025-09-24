// Staff management constants
export const DAYS_OF_WEEK = [
  'Sunday', 
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday'
] as const;

export const CONTRACT_TYPE_LABELS = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  temporary: 'Temporary',
  freelance: 'Freelance',
  intern: 'Intern',
  contract: 'Contract'
} as const;

export const AVAILABILITY_DAYS = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' }
] as const;

export const CONTRACT_TYPE_OPTIONS = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'intern', label: 'Intern' },
  { value: 'contract', label: 'Contract' }
] as const;
