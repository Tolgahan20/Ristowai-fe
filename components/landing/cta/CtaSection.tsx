import React from "react";
import styles from "./CtaSection.module.css";

export function CtaSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeText}>RISTOWAI</span>
            <span className={styles.badgeSeparator}>•</span>
            <span className={styles.badgeSubtext}> OWN FOREVER.</span>
          </div>
          
          <h2 className={styles.title}>
            Start your
            <br />
            free trial.
          </h2>
          
          <p className={styles.subtitle}>
            Unlock your business potential by letting the AI
            <br />
            work and save money and time for you.
          </p>
          
          <button className={styles.ctaButton}>
            Start your free 1-month trial
            <svg className={styles.ctaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
