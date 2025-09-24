"use client";

import { Clock, Store, Settings } from 'lucide-react';
import { useOnboardingFlows, useStartQuickSetup } from '@/features/onboarding/hooks/use-onboarding';
import styles from './OnboardingFlowSelection.module.css';

/**
 * Flow Selection Component
 * Allows users to choose their onboarding path
 */
export function OnboardingFlowSelection() {
  const { isLoading } = useOnboardingFlows();
  const startQuickSetup = useStartQuickSetup();

  const handleQuickStart = () => {
    startQuickSetup.mutate();
  };

  const handleFullSetup = () => {
    // We'll implement this when we add the full setup flow
    console.log('Full setup not yet implemented');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingSubtitle}></div>
          <div className={styles.loadingGrid}>
            {[1, 2].map((i) => (
              <div key={i} className={styles.loadingCard}>
                <div className={styles.loadingCardTitle}></div>
                <div className={styles.loadingCardDescription}></div>
                <div className={styles.loadingCardDescriptionShort}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Let&apos;s get your restaurant set up!
        </h2>
        <p className={styles.subtitle}>
          Choose how you&apos;d like to get started. You can always add more details later.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {/* Quick Start Option */}
        <div className={styles.quickStartCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconContainer} ${styles.quickStartIcon}`}>
              <Store className="h-8 w-8" />
            </div>
            <div className={styles.cardTitleContainer}>
              <h3>Quick Start</h3>
              <div className={`${styles.timeIndicator} ${styles.quickStartTime}`}>
                <Clock className="h-4 w-4" />
                5-10 minutes
              </div>
            </div>
          </div>
          <p className={styles.cardDescription}>
            Get started quickly with just the essentials. Perfect for getting your restaurant 
            listed and accessible right away.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.quickStartDot}`}></div>
              Basic restaurant information
            </li>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.quickStartDot}`}></div>
              Location and contact details
            </li>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.quickStartDot}`}></div>
              Operating hours
            </li>
          </ul>
          <button 
            className={styles.primaryButton} 
            onClick={handleQuickStart}
            disabled={startQuickSetup.isPending}
          >
            {startQuickSetup.isPending ? 'Starting...' : 'Start Quick Setup'}
          </button>
        </div>

        {/* Full Setup Option */}
        <div className={styles.fullSetupCard}>
          <div className={styles.cardHeader}>
            <div className={`${styles.iconContainer} ${styles.fullSetupIcon}`}>
              <Settings className="h-8 w-8" />
            </div>
            <div className={styles.cardTitleContainer}>
              <h3>Complete Setup</h3>
              <div className={`${styles.timeIndicator} ${styles.fullSetupTime}`}>
                <Clock className="h-4 w-4" />
                30-45 minutes
              </div>
            </div>
          </div>
          <p className={styles.cardDescription}>
            Set up everything at once including staff management, roles, and advanced features. 
            Best for when you have time to configure everything.
          </p>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.fullSetupDot}`}></div>
              Everything in Quick Start
            </li>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.fullSetupDot}`}></div>
              Staff roles and permissions
            </li>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.fullSetupDot}`}></div>
              Menu and inventory setup
            </li>
            <li className={styles.featureItem}>
              <div className={`${styles.featureDot} ${styles.fullSetupDot}`}></div>
              Advanced scheduling
            </li>
          </ul>
          <button 
            className={styles.secondaryButton} 
            onClick={handleFullSetup}
            disabled
          >
            Coming Soon
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Don&apos;t worry - you can always add more features and details later from your dashboard.
        </p>
      </div>
    </div>
  );
}
