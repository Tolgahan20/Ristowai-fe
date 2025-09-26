import React from "react";
import { motion } from "framer-motion";
import styles from "./PricingSection.module.css";
import extrasStyles from "./PricingExtras.module.css";

const plans = [
  {
    name: "Free Trial",
    price: "€0",
    description: "Perfect for discovering Ristowai.",
    features: [
      "Full access to all solutions",
      "Guided or concierge onboarding",
      "No payment required",
      "Cancel anytime"
    ],
    buttonText: "Start Free Trial",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Pick Your Solution",
    price: "€20–30",
    period: "per month",
    description: "Choose only the tools you need.",
    features: [
      "Smart Shifts → €20",
      "FoodBrain → €30",
      "Staff Pro+ → €20",
      "HR Smart → €20",
      "Marketing & Reviews → €20",
      "Access Manager Dashboard with any solution"
    ],
    buttonText: "Choose a Solution",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Full Suite (Most Popular)",
    price: "€100",
    period: "per month",
    description: "Best value for restaurants that want full control.",
    features: [
      "All 5 solutions included",
      "Manager Dashboard unlocked",
      "Monthly PDF report",
      "Priority support",
      "Save up to €10 vs single modules",
    ],
    buttonText: "Get Full Suite",
    buttonStyle: "primary",
    popular: true,
  },
];

export function PricingSection() {
  return (
    <motion.section 
      id="pricing" 
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className={styles.title}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Flexible pricing.
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Choose the perfect plan for your needs. Always flexible to change.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.plansGrid}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`${styles.planCard} ${plan.popular ? styles.planCardPopular : ""}`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 + (index * 0.1) }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              {plan.popular && (
                <motion.div 
                  className={styles.popularBadge}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + (index * 0.1) }}
                >
                  Most Popular
                </motion.div>
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
                  <motion.div 
                    key={i} 
                    className={styles.feature}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 1.4 + (index * 0.1) + (i * 0.05) }}
                  >
                    <svg className={styles.checkIcon} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                className={`${styles.planButton} ${styles[plan.buttonStyle]}`}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.6 + (index * 0.1) }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={extrasStyles.extrasSection}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.h3 
            className={extrasStyles.extrasTitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            Extras (on request)
          </motion.h3>
          <motion.div 
            className={extrasStyles.extrasList}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2.0 }}
          >
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.2 }}
            >
              <span className={extrasStyles.extrasService}>Website showcase</span>
              <span className={extrasStyles.extrasPrice}>€400–800 (one-time)</span>
            </motion.div>
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.3 }}
            >
              <span className={extrasStyles.extrasService}>Nutritionist consultation</span>
              <span className={extrasStyles.extrasPrice}>€50</span>
            </motion.div>
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.4 }}
            >
              <span className={extrasStyles.extrasService}>Full healthy menu design</span>
              <span className={extrasStyles.extrasPrice}>€100–150</span>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className={styles.footer}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 2.6 }}
        >
          <p className={styles.footerText}>
            All plans include our core AI features. Need something custom?{" "}
            <a href="#contact" className={styles.footerLink}>Contact our sales team</a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}