"use client";

import { DashboardLayout } from '@/features/dashboard/components/layout/DashboardLayout';
import { VenueManagement } from '@/features/venues/components';

export default function VenuesPage() {
  return (
    <DashboardLayout>
      <VenueManagement />
    </DashboardLayout>
  );
}

