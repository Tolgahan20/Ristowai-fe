"use client";

import styles from './StaffForm.module.css';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  UserCheck,
  Save,
  Plus,
  X
} from 'lucide-react';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { Heading, Caption } from '@/components/ui/typography';
import { Input } from '@/components/ui/input';
import { EnhancedSelect } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useStaffForm } from '../../hooks/use-staff-form';
import { CONTRACT_TYPE_OPTIONS, AVAILABILITY_DAYS } from '../../constants';
import type { StaffResponseDto, StaffFormData } from '../../types';

interface StaffFormProps {
  venueId: string;
  editData?: StaffResponseDto;
  onSubmit: (data: StaffFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function StaffForm({ venueId, editData, onSubmit, onCancel, isLoading }: StaffFormProps) {
  const {
    // Form state
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    
    // Data
    roles,
    
    // Local state
    selectedDaysOff,
    
    // Handlers
    handleDayOffToggle,
    onFormSubmit,
  } = useStaffForm({
    venueId,
    editData,
    onSubmit,
  });

  const isMinor = watch('isMinor');
  const isEditing = !!editData;
  
  // Watch form values to determine if form is valid
  const watchedValues = watch();
  const isFormValid = 
    watchedValues.firstName?.trim() &&
    watchedValues.lastName?.trim() &&
    watchedValues.email?.trim() &&
    watchedValues.whatsappNumber?.trim() &&
    watchedValues.primaryRoleId &&
    watchedValues.contractType &&
    watchedValues.weeklyContractHours &&
    watchedValues.hireDate;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Personal Information */}
        <Card className={styles.section}>
          <CardContent className={styles.sectionContent}>
            <Heading level={3} className={styles.sectionTitle}>
              <User className={styles.sectionIcon} />
              Personal Information
            </Heading>
            
            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label className={styles.label}>First Name *</Label>
                <Input
                  {...register('firstName')}
                  placeholder="Enter first name"
                  error={errors.firstName?.message}
                />
              </div>
              
              <div className={styles.field}>
                <Label className={styles.label}>Last Name *</Label>
                <Input
                  {...register('lastName')}
                  placeholder="Enter last name"
                  error={errors.lastName?.message}
                />
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label>Email *</Label>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Enter email address"
                  leftIcon={<Mail size={16} />}
                  error={errors.email?.message}
                />
              </div>
              
              <div className={styles.field}>
                <Label>Phone (Optional)</Label>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="Enter phone number"
                  leftIcon={<Phone size={16} />}
                />
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label>WhatsApp Number *</Label>
                <Input
                  {...register('whatsappNumber')}
                  type="tel"
                  placeholder="Enter WhatsApp number"
                  leftIcon={<Phone size={16} />}
                  error={errors.whatsappNumber?.message}
                />
              </div>
              
              <div className={styles.field}>
                {/* Empty field for grid alignment */}
              </div>
            </div>

            <div className={styles.checkboxContainer}>
              <Checkbox
                {...register('isMinor')}
                className={styles.checkbox}
                label="This person is a minor"
              />
            </div>
            
            {isMinor && (
              <Caption className={styles.warningText} color="warning">
                ⚠️ Special labor law restrictions apply to minors
              </Caption>
            )}
          </CardContent>
        </Card>


        {/* Employment Details */}
        <Card className={styles.section}>
          <CardContent className={styles.sectionContent}>
            <Heading level={3} className={styles.sectionTitle}>
              <UserCheck className={styles.sectionIcon} />
              Employment Details
            </Heading>
            
            <p className={styles.sectionNote}>
              Please provide employment information for this staff member
            </p>
            
            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label className={styles.label}>Role *</Label>
                <EnhancedSelect
                  value={watch('primaryRoleId') || 'placeholder-role'}
                  onValueChange={(value) => {
                    if (value !== 'placeholder-role') {
                      setValue('primaryRoleId', value);
                    } else {
                      setValue('primaryRoleId', '');
                    }
                  }}
                  options={[
                    { value: 'placeholder-role', label: 'Select a role' },
                    ...roles.map(role => ({
                      value: role.id,
                      label: role.displayName
                    }))
                  ]}
                  error={errors.primaryRoleId?.message}
                />
              </div>
              
              <div className={styles.field}>
                <Label className={styles.label}>Contract Type *</Label>
                <EnhancedSelect
                  value={watch('contractType') || 'placeholder-contract'}
                  onValueChange={(value) => {
                    if (value !== 'placeholder-contract') {
                      setValue('contractType', value as 'full_time' | 'part_time' | 'temporary' | 'freelance' | 'intern' | 'contract');
                    } else {
                      setValue('contractType', 'full_time');
                    }
                  }}
                  options={[
                    { value: 'placeholder-contract', label: 'Select contract type' },
                    ...CONTRACT_TYPE_OPTIONS.map(option => ({
                      value: option.value,
                      label: option.label
                    }))
                  ]}
                  error={errors.contractType?.message}
                />
              </div>
            </div>

            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label className={styles.label}>Weekly Contract Hours *</Label>
                <Input
                  {...register('weeklyContractHours', { valueAsNumber: true })}
                  type="number"
                  min="1"
                  max="80"
                  placeholder="Enter weekly hours"
                  error={errors.weeklyContractHours?.message}
                />
              </div>
              
              <div className={styles.field}>
                <Label className={styles.label}>Hire Date *</Label>
                <Input
                  {...register('hireDate')}
                  type="date"
                  leftIcon={<Calendar size={16} />}
                  error={errors.hireDate?.message}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability Preferences (Optional) */}
        <Card className={styles.section}>
          <CardContent className={styles.sectionContent}>
            <Heading level={3} className={styles.sectionTitle}>
              <Clock className={styles.sectionIcon} />
              Availability Preferences (Optional)
            </Heading>
            
            <p className={styles.sectionNote}>
              Set preferred working hours and days off
            </p>
            
            <div className={styles.formGridTwo}>
              <div className={styles.field}>
                <Label>Preferred Start Time</Label>
                <Input
                  {...register('availabilityPreferences.preferredStartTime')}
                  type="time"
                />
              </div>
              
              <div className={styles.field}>
                <Label>Preferred End Time</Label>
                <Input
                  {...register('availabilityPreferences.preferredEndTime')}
                  type="time"
                />
              </div>
            </div>

            <div className={styles.field}>
              <Label>Preferred Days Off</Label>
              <div className={styles.daysContainer}>
                <div className={styles.daysGrid}>
                  {AVAILABILITY_DAYS.map((day, index) => (
                    <label
                      key={day.value}
                      className={`${styles.dayButton} ${
                        selectedDaysOff.includes(index) ? styles.dayButtonSelected : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedDaysOff.includes(index)}
                        onChange={() => handleDayOffToggle(index)}
                        className={styles.hiddenCheckbox}
                      />
                      {day.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className={styles.actions}>
          <SecondaryButton type="button" onClick={onCancel} leftIcon={<X size={16} />}>
            Cancel
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={isLoading || !isFormValid} leftIcon={isEditing ? <Save size={16} /> : <Plus size={16} />}>
            {isEditing ? 'Save' : 'Add'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
