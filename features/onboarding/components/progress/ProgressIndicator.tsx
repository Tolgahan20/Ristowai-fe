"use client";

import { CheckCircle, Circle, Clock } from 'lucide-react';
import styles from './ProgressIndicator.module.css';
import type { OnboardingSession } from '@/features/onboarding/types';

interface ProgressIndicatorProps {
  session: OnboardingSession;
}

/**
 * Progress Indicator Component
 * Shows the current progress through onboarding steps
 */
export function ProgressIndicator({ session }: ProgressIndicatorProps) {
  // Use actual steps array length instead of backend totalSteps to fix mismatch
  const actualTotalSteps = session.steps.length;
  const totalSteps = Math.max(session.totalSteps, actualTotalSteps);
  const completedSteps = session.completedSteps;
  const currentStepNumber = Math.min(completedSteps + 1, totalSteps);
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  const estimatedTimeRemaining = session.metadata?.estimatedMinutes || 10; // fallback
  const currentStepIndex = completedSteps;

  return (
    <div className={styles.container}>
      {/* Progress Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>Setup Progress</h3>
          <p className={styles.subtitle}>
            Step {currentStepNumber} of {totalSteps}
          </p>
        </div>
        <div className={styles.timeSection}>
          <div className={styles.timeIndicator}>
            <Clock className="h-4 w-4" />
            <span>{estimatedTimeRemaining} min remaining</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Progress Steps */}
      <div className={styles.steps}>
        {session.steps.map((step, index) => {
          const isCompleted = index < completedSteps;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={step.id} className={styles.step}>
              <div className={styles.stepIcon}>
                {isCompleted ? (
                  <CheckCircle className={`h-5 w-5 ${styles.completedIcon}`} />
                ) : isCurrent ? (
                  <div className={styles.currentStepIndicator}>
                    <div className={styles.currentStepDot}></div>
                  </div>
                ) : (
                  <Circle className={`h-5 w-5 ${styles.upcomingIcon}`} />
                )}
              </div>
              <div className={styles.stepContent}>
                <h4 className={`${styles.stepTitle} ${isCompleted ? styles.completedText : isCurrent ? styles.currentText : styles.upcomingText}`}>
                  {step.title}
                </h4>
                <p className={`${styles.stepDescription} ${isCompleted ? styles.completedText : isCurrent ? styles.currentText : styles.upcomingText}`}>
                  {step.description}
                </p>
                {step.metadata?.estimatedMinutes && (
                  <span className={styles.stepDuration}>
                    {step.metadata.estimatedMinutes} min
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Completed</span>
          <span className={styles.summaryValue}>{completedSteps}/{totalSteps}</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Progress</span>
          <span className={styles.summaryValue}>{Math.round(progressPercentage)}%</span>
        </div>
      </div>
    </div>
  );
}
