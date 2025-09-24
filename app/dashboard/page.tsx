"use client";

import { DashboardLayout } from '@/features/dashboard/components/layout/DashboardLayout';
import { DashboardOverview } from '@/features/dashboard/components/overview/DashboardOverview';


export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  );
}
