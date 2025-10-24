"use client";

import { ScheduleManagement } from '@/features/schedules/components/management/ScheduleManagement';
import { DashboardLayout } from '@/features/dashboard/components/layout/DashboardLayout';

export default function SchedulesPage() {
  return (
    <DashboardLayout>
      <ScheduleManagement />
    </DashboardLayout>
  );
}

