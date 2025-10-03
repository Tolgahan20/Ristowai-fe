import React from "react";
import { motion } from "framer-motion";
import styles from "./CtaSection.module.css";

export function CtaSection() {
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, backgroundColor: "#000000" }}
      whileInView={{ opacity: 1, backgroundColor: "#000000" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className={styles.badgeText}>RISTOWAI</span>
            <span className={styles.badgeSeparator}>•</span>
            <span className={styles.badgeSubtext}> PROPRIETÀ PER SEMPRE.</span>
          </motion.div>
          
          <motion.h2 
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            Inizia oggi la tua prova gratuita di 1 mese
          </motion.h2>
          
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            Riduci i costi fino al 20%, aumenta i margini e risparmia tempo prezioso — senza cambiare i sistemi che già usi. Nessun pagamento richiesto.
          </motion.p>
          
          <motion.button 
            className={styles.ctaButton}
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            Inizia gratis ora
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
