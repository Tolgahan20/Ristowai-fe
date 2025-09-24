"use client";

import { DashboardLayout } from '@/features/dashboard/components/layout/DashboardLayout';
import { MemberManagement } from '@/features/members/components/management/MemberManagement';

export default function MembersPage() {
  return (
    <DashboardLayout>
      <MemberManagement />
    </DashboardLayout>
  );
}
