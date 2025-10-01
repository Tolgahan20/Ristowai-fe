import React from "react";
import { motion } from "framer-motion";
import styles from "./PricingSection.module.css";
import extrasStyles from "./PricingExtras.module.css";

const plans = [
  {
    name: "Prova gratuita",
    price: "€0",
    description: "Perfetto per scoprire Ristowai.",
    features: [
      "Accesso completo a tutte le soluzioni",
      "Servizio di concierge incluso",
      "Nessun pagamento richiesto",
      "Annulla in qualsiasi momento"
    ],
    buttonText: "Inizia la prova gratuita",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Scegli la tua soluzione",
    price: "€20–30",
    period: "al mese",
    description: "Scegli solo le soluzioni che ti servono.",
    features: [
      "Smart Shifts → €20",
      "FoodBrain → €30",
      "Staff Pro+ → €20",
      "HR Smart → €20",
      "Marketing & Reviews → €20",
      "Accesso al Dashboard Manager con qualsiasi soluzione"
    ],
    buttonText: "Scegli la tua soluzione",
    buttonStyle: "secondary",
    popular: false,
  },
  {
    name: "Suite completa (Most Popular)",
    price: "€100",
    period: "al mese",
    description: "Migliore valore per i ristoranti che vogliono un controllo totale.",
    features: [
      "All 5 solutions included",
      "Dashboard Manager sbloccato",
      "Report PDF mensile",
      "Supporto prioritario",
      "Risparmia fino a €10 rispetto alle singole soluzioni",
    ],
    buttonText: "Ottieni la suite completa",
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
            Prezzi flessibili.
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Scegli il piano perfetto per le tue esigenze. Sempre flessibile e modificabile.

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
            Extras (su richiesta)
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
              <span className={extrasStyles.extrasService}>POS AI Insight</span>
              <span className={extrasStyles.extrasPrice}>€39/mese</span>
            </motion.div>
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.3 }}
            >
              <span className={extrasStyles.extrasService}>Showcase del sito web</span>
              <span className={extrasStyles.extrasPrice}>€400–800 (una volta sola)</span>
            </motion.div>
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.4 }}
            >
              <span className={extrasStyles.extrasService}>Servizi nutrizionista</span>
              <span className={extrasStyles.extrasPrice}>€50–150 (una volta sola)</span>
            </motion.div>
            <motion.div 
              className={extrasStyles.extrasItem}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 2.5 }}
            >
              <span className={extrasStyles.extrasService}>Assistenza inserimento dati</span>
              <span className={extrasStyles.extrasPrice}>€50–200 (una volta sola)</span>
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
            Tutti i piani includono le nostre funzionalità principali. Hai bisogno di qualcosa di personalizzato?{" "}
            <a href="#contact" className={styles.footerLink}>Contattaci il nostro team di vendite</a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}