"use client";

import { ReactNode } from 'react';
import styles from './OnboardingLayout.module.css';

interface OnboardingLayoutProps {
  children: ReactNode;
}

/**
 * Layout component for onboarding pages
 * Provides consistent styling and structure for the onboarding flow
 */
export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>
            Welcome Setup
          </h1>
          <div className={styles.headerSupport}>
            Need help? <a href="/support" className={styles.supportLink}>Contact Support</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.contentCard}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>Your data is secure and encrypted. We&apos;ll never share your information.</p>
      </footer>
    </div>
  );
}
