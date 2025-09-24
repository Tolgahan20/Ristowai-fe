"use client";

import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ProgressIndicator } from '../progress';
import { 
  RestaurantDetailsStep, 
  RestaurantSettingsStep, 
  BusinessOperationsStep, 
  VenueDetailsStep, 
  VenueConfigurationStep, 
  KpiBenchmarksStep,
  VenueSelectionStep,
  RoleCreationStep,
  StaffInvitationStep,
  WhatsAppConfigurationStep
} from '../steps';
import { useCompleteOnboardingStep, useGoBackStep } from '@/features/onboarding/hooks/use-onboarding';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './OnboardingSession.module.css';
import type { OnboardingSession as OnboardingSessionType } from '@/features/onboarding/types';

interface OnboardingSessionProps {
  session: OnboardingSessionType;
}

/**
 * OnboardingSession Component
 * Manages the active onboarding session flow
 */
export function OnboardingSession({ session }: OnboardingSessionProps) {
  const router = useRouter();
  const completeStep = useCompleteOnboardingStep();
  const goBackStep = useGoBackStep();
  const [, setShowCancelModal] = useState(false);
  const [currentStepData, setCurrentStepData] = useState<Record<string, unknown>>({});

  const currentStep = session.steps[session.completedSteps];
  // Use actual steps array length instead of backend totalSteps to fix mismatch
  const actualTotalSteps = session.steps.length;
  const totalSteps = Math.max(session.totalSteps, actualTotalSteps);
  const isLastStep = session.completedSteps === totalSteps - 1;
  // Allow proceeding if step has data (either current form data or existing step data)
  const canProceed = currentStep && (
    Object.keys(currentStepData).length > 0 || 
    (currentStep.data && Object.keys(currentStep.data).length > 0)
  );

  // Initialize currentStepData with existing step data when the step changes
  useEffect(() => {
    if (currentStep?.data && Object.keys(currentStep.data).length > 0) {
      setCurrentStepData(currentStep.data);
    } else {
      setCurrentStepData({});
    }
  }, [currentStep?.id, session.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // currentStep.data intentionally excluded to prevent infinite loops
 

  // Update URL to include session ID
  useEffect(() => {
    const currentUrl = `/onboarding/${session.id}`;
    if (window.location.pathname !== currentUrl) {
      window.history.replaceState(null, '', currentUrl);
    }
  }, [session.id]);

  const handleStepComplete = () => {
    if (!currentStep) return;
    
    console.log('🔍 Frontend completing step:', currentStep.id, 'with data:', currentStepData);
    
    completeStep.mutate({
      sessionId: session.id,
      stepId: currentStep.id,
      stepData: currentStepData,
    });
  };

  const handleStepBack = () => {
    if (session.completedSteps > 0) {
      goBackStep.mutate(session.id);
    }
  };

  const handleStepDataChange = useCallback((data: Record<string, unknown>) => {
    setCurrentStepData(data);
  }, []);

 

  if (!currentStep) {
    return (
      <div className={styles.container}>
        <div className={styles.completedContainer}>
          <div className={styles.completedIcon}>
            <div className={styles.checkmark}>✓</div>
          </div>
          <h2 className={styles.completedTitle}>Setup Complete!</h2>
          <p className={styles.completedDescription}>
            Your restaurant setup is now complete. You can start using your dashboard.
          </p>
          <div className={styles.completedActions}>
            <button
              className={styles.dashboardButton}
              onClick={() => router.push('/dashboard')}
            >
              <ArrowRight className="h-5 w-5" />
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Session Header */}
      <div className={styles.sessionHeader}>
        <div className={styles.sessionInfo}>
          <h2 className={styles.sessionTitle}>Setup in Progress</h2>
          <p className={styles.sessionDescription}>
            Complete your restaurant setup to start using Smart Shifts
          </p>
        </div>
        <button
          className={styles.backToFlowButton}
          onClick={() => setShowCancelModal(true)}
          title="Go back to flow selection"
        >
          <X className="h-4 w-4" />
          Choose Different Setup
        </button>
      </div>

      <div className={styles.content}>
        {/* Progress Sidebar */}
        <div className={styles.sidebar}>
          <ProgressIndicator session={session} />
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          <div className={styles.stepHeader}>
            <h3 className={styles.stepTitle}>{currentStep.title}</h3>
            <p className={styles.stepDescription}>{currentStep.description}</p>
          </div>

          <div className={styles.stepContent}>
            {/* Step-specific content will be rendered here */}
            {renderStepContent(currentStep.id, currentStepData, handleStepDataChange, session)}
          </div>

          {/* Navigation */}
          <div className={styles.navigation}>
            <button
              className={styles.backButton}
              onClick={handleStepBack}
              disabled={session.completedSteps === 0 || goBackStep.isPending}
              title={session.completedSteps === 0 ? "You're on the first step" : "Go back to previous step"}
            >
              <ArrowLeft className="h-4 w-4" />
              {goBackStep.isPending ? 'Going Back...' : session.completedSteps === 0 ? 'First Step' : 'Back'}
            </button>

            <button
              className={styles.nextButton}
              onClick={handleStepComplete}
              disabled={completeStep.isPending || !canProceed}
            >
              {completeStep.isPending ? (
                'Processing...'
              ) : isLastStep ? (
                'Complete Setup'
              ) : currentStep?.data && Object.keys(currentStep.data).length > 0 ? (
                <>
                  Save & Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
    </div>
  );
}

/**
 * Renders step-specific content based on step ID
 * This will be expanded with actual step components
 */
function renderStepContent(
  stepId: string,
  stepData: Record<string, unknown>,
  onDataChange: (data: Record<string, unknown>) => void,
  session: OnboardingSessionType
) {
  // Collect data from all completed steps to make available to current step
  const completedStepsData: Record<string, unknown> = {};
  session.steps.slice(0, session.completedSteps).forEach(step => {
    if (step.data) {
      Object.assign(completedStepsData, step.data);
    }
  });

  // Debug session data
  console.log('🔍 Current session:', { 
    sessionId: session.id, 
    venueId: session.venueId, 
    restaurantId: session.restaurantId 
  });

  // Merge session context, completed steps data, and current step data
  const enhancedStepData = {
    restaurantId: session.restaurantId,
    venueId: session.venueId, // Default from session
    ...completedStepsData, // Data from previous completed steps (can override venueId)
    ...stepData, // Current step data (takes priority over everything)
  };
  
  console.log('🔍 Enhanced step data:', { 
    venueId: enhancedStepData.venueId, 
    completedStepsData, 
    stepData 
  });
  switch (stepId) {
    case 'restaurant_details':
      return (
        <RestaurantDetailsStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'restaurant_settings':
      return (
        <RestaurantSettingsStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );

    case 'business_operations':
      return (
        <BusinessOperationsStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'venue_details':
      return (
        <VenueDetailsStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'venue_configuration':
      return (
        <VenueConfigurationStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'venue_kpi_benchmarks':
      return (
        <KpiBenchmarksStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'venue_selection':
      return (
        <VenueSelectionStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'role_creation':
      return (
        <RoleCreationStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'staff_invitation':
      return (
        <StaffInvitationStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    case 'whatsapp_configuration':
      return (
        <WhatsAppConfigurationStep 
          stepData={enhancedStepData} 
          onDataChange={onDataChange} 
        />
      );
    
    default:
      return (
        <div className={styles.placeholderContent}>
          <h3>Step: {stepId}</h3>
          <p>This step component is not implemented yet.</p>
          
          {/* Show current data */}
          {Object.keys(stepData).length > 0 && (
            <div className={styles.dataPreview}>
              <h4>Current Data:</h4>
              <pre>{JSON.stringify(stepData, null, 2)}</pre>
            </div>
          )}
          
          <button 
            onClick={() => onDataChange({ completed: true, stepId })}
            className={styles.placeholderButton}
          >
            Mark as Complete (Temporary)
          </button>
        </div>
      );
  }
}
