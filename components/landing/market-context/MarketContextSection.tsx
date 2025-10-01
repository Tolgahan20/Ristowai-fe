import React from "react";
import { motion } from "framer-motion";
import { 
  FiMapPin, 
  FiGlobe, 
  FiZap
} from "react-icons/fi";
import styles from "./MarketContextSection.module.css";

const marketData = [
  {
    icon: <FiMapPin size={24} />,
    title: "Italia",
    subtitle: "70% dei ristoranti utilizza ancora Excel/carta",
    description: "La maggior parte dei ristoranti italiani gestisce ancora inventario, turni e costi manualmente, perdendo tempo prezioso e commettendo errori costosi."
  },
  {
    icon: <FiGlobe size={24} />,
    title: "Globale", 
    subtitle: "Le soluzioni AI foodtech riducono i costi del 15-25%",
    description: "I ristoranti che adottano tecnologie AI avanzate vedono riduzioni significative nei costi operativi e miglioramenti nella redditività."
  },
  {
    icon: <FiZap size={24} />,
    title: "Ristowai",
    subtitle: "Portiamo questo cambiamento ai ristoranti italiani",
    description: "Soluzioni AI personalizzate per le esigenze locali italiane, combinando tecnologia avanzata con la tradizione culinaria del paese."
  },
];

export function MarketContextSection() {
  return (
    <motion.section 
      id="market-context" 
      className={styles.marketContextSection}
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
            Contesto del Mercato
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            La trasformazione digitale del settore ristorazione in Italia
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.contentContainer}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={styles.marketGrid}>
            {marketData.map((item, index) => (
              <motion.div 
                key={index}
                className={styles.marketItem}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 1.0 + (index * 0.1) }}
              >
                <div className={styles.marketIcon}>
                  {item.icon}
                </div>
                <div className={styles.marketContent}>
                  <h3 className={styles.marketTitle}>{item.title}</h3>
                  <p className={styles.marketSubtitle}>{item.subtitle}</p>
                  <p className={styles.marketDescription}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
