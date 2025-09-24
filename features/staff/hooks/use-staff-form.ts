"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { useActiveRolesByVenue } from "./use-roles";
import { timeStringToMinutes, minutesToTimeString } from "../utils";
import type { StaffResponseDto, StaffFormData, ContractType } from "../types";

const staffSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
  isMinor: z.boolean(),
  primaryRoleId: z.string().min(1, "Role is required"),
  contractType: z.enum([
    "full_time",
    "part_time",
    "temporary",
    "freelance",
    "intern",
    "contract",
  ]),
  weeklyContractHours: z
    .number()
    .min(1, "Weekly hours must be at least 1")
    .max(80, "Weekly hours cannot exceed 80"),
  hireDate: z.string().min(1, "Hire date is required"),
  endDate: z.string().optional(),
  availabilityPreferences: z
    .object({
      preferredStartTime: z.string().optional(),
      preferredEndTime: z.string().optional(),
      daysOff: z.array(z.number()).optional(),
      maxHoursPerDay: z.number().optional(),
      maxHoursPerWeek: z.number().optional(),
    })
    .optional(),
});

type StaffFormValues = z.infer<typeof staffSchema>;

interface UseStaffFormProps {
  venueId: string;
  editData?: StaffResponseDto;
  onSubmit: (data: StaffFormData) => void;
}

export function useStaffForm({
  venueId,
  editData,
  onSubmit,
}: UseStaffFormProps) {
  const [selectedDaysOff, setSelectedDaysOff] = useState<number[]>(
    editData?.availabilityPreferences?.daysOff || []
  );

  // Get roles for the venue
  const { data: roles = [] } = useActiveRolesByVenue(venueId);

  // Form setup
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      whatsappNumber: "",
      isMinor: false,
      primaryRoleId: "",
      contractType: undefined,
      weeklyContractHours: undefined,
      hireDate: "",
      endDate: "",
      availabilityPreferences: {
        preferredStartTime: "",
        preferredEndTime: "",
        daysOff: [],
        maxHoursPerDay: 8,
        maxHoursPerWeek: 40,
      },
    },
  });

  // Populate form with edit data
  useEffect(() => {
    if (editData) {
      const availabilityPrefs = editData.availabilityPreferences || {};

      // Use setTimeout to ensure the form reset happens after the component is fully rendered
      setTimeout(() => {
        form.reset({
          firstName: editData.firstName,
          lastName: editData.lastName,
          email: editData.email,
          phone: editData.phone || "",
          whatsappNumber: editData.whatsappNumber || "",
          isMinor: editData.isMinor || false,
          primaryRoleId: editData.primaryRoleId || "",
          contractType: editData.contractType || "full_time",
          weeklyContractHours: editData.weeklyContractHours || 40,
          hireDate: editData.hireDate
            ? new Date(editData.hireDate).toISOString().split("T")[0]
            : "",
          endDate: editData.endDate
            ? new Date(editData.endDate).toISOString().split("T")[0]
            : "",
          availabilityPreferences: {
            preferredStartTime: availabilityPrefs.preferredStartTime 
              ? (typeof availabilityPrefs.preferredStartTime === 'number' 
                  ? minutesToTimeString(availabilityPrefs.preferredStartTime)
                  : availabilityPrefs.preferredStartTime)
              : "",
            preferredEndTime: availabilityPrefs.preferredEndTime 
              ? (typeof availabilityPrefs.preferredEndTime === 'number' 
                  ? minutesToTimeString(availabilityPrefs.preferredEndTime)
                  : availabilityPrefs.preferredEndTime)
              : "",
            daysOff: availabilityPrefs.daysOff || [],
            maxHoursPerDay: availabilityPrefs.maxHoursPerDay || 8,
            maxHoursPerWeek: availabilityPrefs.maxHoursPerWeek || 40,
          },
        });

        setSelectedDaysOff(availabilityPrefs.daysOff || []);
      }, 0);
    }
  }, [editData, form]);

  // Handle day off toggle
  const handleDayOffToggle = useCallback(
    (day: number) => {
      setSelectedDaysOff((prev) => {
        const updated = prev.includes(day)
          ? prev.filter((d) => d !== day)
          : [...prev, day];

        // Also update form
        form.setValue("availabilityPreferences.daysOff", updated);
        return updated;
      });
    },
    [form]
  );

  // Form submission handler
  const onFormSubmit = useCallback(
    (data: StaffFormValues) => {
      const processedData: StaffFormData = {
        ...data,
        // Remove empty strings for optional fields
        phone: data.phone || undefined,
        endDate: data.endDate || undefined,
        // Ensure mandatory fields are properly typed
        contractType: data.contractType as ContractType,
        availabilityPreferences: data.availabilityPreferences
          ? {
              ...data.availabilityPreferences,
              preferredStartTime: data.availabilityPreferences
                .preferredStartTime
                ? timeStringToMinutes(
                    data.availabilityPreferences.preferredStartTime
                  )
                : undefined,
              preferredEndTime: data.availabilityPreferences.preferredEndTime
                ? timeStringToMinutes(
                    data.availabilityPreferences.preferredEndTime
                  )
                : undefined,
              daysOff: selectedDaysOff,
            }
          : undefined,
      };

      onSubmit(processedData);
    },
    [onSubmit, selectedDaysOff]
  );

  return {
    // Form methods
    register: form.register,
    handleSubmit: form.handleSubmit,
    watch: form.watch,
    setValue: form.setValue,
    formState: form.formState,

    // Data
    roles,

    // Local state
    selectedDaysOff,

    // Handlers
    handleDayOffToggle,
    onFormSubmit,
  };
}
