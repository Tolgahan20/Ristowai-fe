"use client";

import { DashboardLayout } from '@/features/dashboard/components/layout/DashboardLayout';
import { StaffManagement } from '@/features/staff/components/management';

export default function StaffPage() {
  return (
    <DashboardLayout>
      <StaffManagement />
    </DashboardLayout>
  );
}
