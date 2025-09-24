"use client";

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { OnboardingSession } from '@/features/onboarding/components/session';
import { OnboardingLayout } from '@/features/onboarding/components/layout';
import { useOnboardingSession } from '@/features/onboarding/hooks/use-onboarding';

/**
 * Dynamic Onboarding Session Page
 * Handles URLs like /onboarding/[sessionId]
 */
export default function OnboardingSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;
  
  const { data: session, isLoading, error } = useOnboardingSession(sessionId);

  useEffect(() => {
    // If session doesn't exist, redirect to main onboarding
    if (error || (!isLoading && !session)) {
      router.push('/onboarding');
    }
  }, [error, isLoading, session, router]);

  if (isLoading) {
    return (
      <OnboardingLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </OnboardingLayout>
    );
  }

  if (!session) {
    return (
      <OnboardingLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Session Not Found</h2>
            <p className="text-gray-600 mb-4">The onboarding session you&apos;re looking for doesn&apos;t exist.</p>
            <button
              onClick={() => router.push('/onboarding')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Return to Onboarding
            </button>
          </div>
        </div>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout>
      <OnboardingSession session={session} />
    </OnboardingLayout>
  );
}
