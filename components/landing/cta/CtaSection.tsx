import React from "react";
import { motion } from "framer-motion";
import styles from "./CtaSection.module.css";

export function CtaSection() {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className={styles.badgeText}>RISTOWAI</span>
            <span className={styles.badgeSeparator}>•</span>
            <span className={styles.badgeSubtext}> OWN FOREVER.</span>
          </motion.div>
          
          <motion.h2 
            className={styles.title}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Start your
            <br />
            free trial.
          </motion.h2>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Unlock your business potential by letting the AI
            <br />
            work and save money and time for you.
          </motion.p>
          
          <motion.button 
            className={styles.ctaButton}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            Start your free 1-month trial
            <motion.svg 
              className={styles.ctaIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              whileHover={{ 
                x: 3,
                transition: { duration: 0.2 }
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
