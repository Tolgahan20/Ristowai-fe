import React from "react";
import styles from "./PricingSection.module.css";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out magicAI",
    features: [
      "10,000 Words / month",
      "50+ AI Templates",
      "All languages",
      "Chat support"
    ],
    buttonText: "Start Free",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "Most popular plan for small teams",
    features: [
      "100,000 Words / month",
      "100+ AI Templates",
      "All languages",
      "Chat support",
      "API Access",
      "Custom Templates"
    ],
    buttonText: "Start Premium",
    buttonStyle: "primary",
    popular: true,
  },
  {
    name: "Team",
    price: "$99",
    period: "per month",
    description: "Advanced features for growing teams",
    features: [
      "Unlimited Words / month",
      "100+ AI Templates",
      "All languages",
      "Priority support",
      "API Access",
      "Team Management"
    ],
    buttonText: "Start Team",
    buttonStyle: "secondary",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Flexible pricing.</h2>
          <p className={styles.subtitle}>
            Choose the perfect plan for your needs. Always flexible to change.
          </p>
        </div>

        <div className={styles.plansGrid}>
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`${styles.planCard} ${plan.popular ? styles.planCardPopular : ""}`}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}
              
              <div className={styles.planHeader}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <div className={styles.planPrice}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>
                <p className={styles.planDescription}>{plan.description}</p>
              </div>

              <div className={styles.planFeatures}>
                {plan.features.map((feature, i) => (
                  <div key={i} className={styles.feature}>
                    <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`${styles.planButton} ${styles[plan.buttonStyle]}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            All plans include our core AI features. Need something custom?{" "}
            <a href="#contact" className={styles.footerLink}>Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}