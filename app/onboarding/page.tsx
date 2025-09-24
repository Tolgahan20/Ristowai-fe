"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingFlowSelection } from '@/features/onboarding/components/flow-selection';
import { OnboardingSession } from '@/features/onboarding/components/session';
import { OnboardingLayout } from '@/features/onboarding/components/layout';
import { useActiveOnboardingSession } from '@/features/onboarding/hooks/use-onboarding';

/**
 * Main Onboarding Page
 * - Shows flow selection if no active session
 * - Shows active session if one exists
 * - Redirects to dashboard if onboarding is complete
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { data: activeSession, isLoading } = useActiveOnboardingSession();

  useEffect(() => {
    // If user has completed onboarding, redirect to dashboard
    if (activeSession?.status === "completed") {
      router.push('/dashboard');
    }
  }, [activeSession, router]);

  if (isLoading) {
    return (
      <OnboardingLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout>
      {activeSession ? (
        <OnboardingSession session={activeSession} />
      ) : (
        <OnboardingFlowSelection />
      )}
    </OnboardingLayout>
  );
}

