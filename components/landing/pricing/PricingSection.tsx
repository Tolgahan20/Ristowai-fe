import React from "react";
import { motion } from "framer-motion";
import { Heading2, Body } from "../ui";
import styles from "./PricingSection.module.css";

const plans = [
  {
    name: "Moduli Singoli",
    price: "€18–35",
    period: "al mese",
    description: "Scegli solo le soluzioni che ti servono.",
    features: [
      "Turni AI, Staff Pro+, HR Smart, Marketing & Reviews → €18–22",
      "FoodBrain → €25–35",
      "Accesso al Dashboard Manager con qualsiasi soluzione"
    ],
    buttonText: "Scegli la tua soluzione",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Bundle (Most Popular)",
    price: "€100–139",
    period: "al mese",
    description: "Migliore valore per i ristoranti che vogliono un controllo totale.",
    features: [
      "Founder Edition (0–50 utenti) → €100/mese",
      "Early Growth (51–100 utenti) → €119/mese",
      "Standard (101+ utenti) → €139/mese",
      "Prezzo bloccato per sempre",
    ],
    buttonText: "Ottieni il bundle",
    buttonStyle: "primary",
    popular: true,
  },
  {
    name: "Servizi Extra",
    price: "€39–800",
    period: "variabile",
    description: "Servizi aggiuntivi per completare la tua soluzione.",
    features: [
      "POS AI Insight → €39/mese",
      "Sito vetrina → €400–800 una tantum",
      "Nutrizione & Healthy Menu → €50–150 una tantum"
    ],
    buttonText: "Scopri i servizi",
    buttonStyle: "secondary",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <motion.section 
      id="prezzi" 
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Heading2 className={styles.title}>
            Prezzi
          </Heading2>
          <Body className={styles.subtitle}>
            Scegli il piano perfetto per le tue esigenze. Sempre flessibile e modificabile.
          </Body>
        </motion.div>

        <motion.div 
          className={styles.plansGrid}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              className={`${styles.planCard} ${plan.popular ? styles.planCardPopular : ""}`}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.05) }}
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
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
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
                    transition={{ duration: 0.3, delay: 0.7 + (index * 0.05) + (i * 0.02) }}
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
                transition={{ duration: 0.3, delay: 0.8 + (index * 0.05) }}
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
          className={styles.footer}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          <Body className={styles.footerText}>
            Tutti i piani includono le nostre funzionalità principali. Hai bisogno di qualcosa di personalizzato?{" "}
            <a href="#contact" className={styles.footerLink}>Contattaci il nostro team di vendite</a>
          </Body>
        </motion.div>
      </div>
    </motion.section>
  );
}