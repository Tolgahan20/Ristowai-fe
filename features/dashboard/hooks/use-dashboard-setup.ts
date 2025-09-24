"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Store, Users, Settings } from 'lucide-react';
import { 
  useStartOnboardingFlow, 
  useUserOnboardingSessions,
  useCancelOnboarding 
} from '@/features/onboarding/hooks/use-onboarding';
import { OnboardingStatus, OnboardingType } from '@/features/onboarding/types';
import { useActiveRestaurants } from '@/features/restaurants/hooks/use-restaurant';

interface SetupCard {
  id: string;
  title: string;
  description: string;
  icon: typeof Store;
  color: string;
  type: OnboardingType;
  estimatedTime: string;
}

export function useDashboardSetup() {
  const router = useRouter();
  const startOnboardingFlow = useStartOnboardingFlow();
  const { data: userSessions = [] } = useUserOnboardingSessions();
  const cancelOnboarding = useCancelOnboarding();
  const { data: restaurants = [] } = useActiveRestaurants();
  const restaurant = restaurants[0]; // Get first restaurant
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check which flows have been completed
  const completedFlows = new Set(
    mounted ? userSessions
      .filter(session => session.status === OnboardingStatus.COMPLETED)
      .map(session => session.type) : []
  );

  // Check if there's an active session (not completed)
  const activeSession = mounted ? userSessions.find(session => 
    session.status === OnboardingStatus.IN_PROGRESS
  ) : null;

  const setupCards: SetupCard[] = [
    {
      id: 'venue',
      title: 'Venue Setup',
      description: 'Configure your restaurant locations and operational settings',
      icon: Store,
      color: 'blue',
      type: OnboardingType.VENUE_SETUP,
      estimatedTime: '15 min'
    },
    {
      id: 'staff',
      title: 'Staff & Roles Setup',
      description: 'Create job roles and add your team members',
      icon: Users,
      color: 'green',
      type: OnboardingType.STAFF_SETUP,
      estimatedTime: '20 min'
    },
    {
      id: 'phases',
      title: 'Phase Templates Setup',
      description: 'Configure operational phases and scheduling templates',
      icon: Settings,
      color: 'purple',
      type: OnboardingType.PHASE_SETUP,
      estimatedTime: '15 min'
    }
  ];

  const handleStartFlow = async (type: OnboardingType) => {
    try {
      const result = await startOnboardingFlow.mutateAsync({ 
        type, 
        restaurantId: restaurant?.id // Optional - backend can work without it
      });
      
      // Navigate to onboarding page with the new session
      router.push(`/onboarding/${result.session.id}`);
    } catch (error: unknown) {
      // Check if it's an active session error
      if ((error as any)?.response?.data?.message?.includes('active onboarding session')) {
        setShowSessionModal(true);
      } else {
        console.error('Failed to start onboarding flow:', error);
      }
    }
  };

  const handleResumeActiveSession = () => {
    if (activeSession) {
      router.push(`/onboarding/${activeSession.id}`);
    }
    setShowSessionModal(false);
  };

  const handleCancelActiveSession = async () => {
    if (activeSession) {
      try {
        await cancelOnboarding.mutateAsync(activeSession.id);
        setShowSessionModal(false);
      } catch (error) {
        console.error('Failed to cancel session:', error);
      }
    }
  };

  return {
    // Data
    setupCards,
    completedFlows,
    activeSession,
    showSessionModal,
    mounted,
    
    // Actions
    handleStartFlow,
    handleResumeActiveSession,
    handleCancelActiveSession,
    setShowSessionModal,
    
    // Loading states
    isStarting: startOnboardingFlow.isPending,
    isCancelling: cancelOnboarding.isPending,
  };
}
