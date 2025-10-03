import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClipboardClock, UtensilsCrossed, Users, Contact, BadgeEuro, LayoutDashboard } from "lucide-react";
import { Container, Badge, Button } from "../ui";
import styles from "./HeroSection.module.css";
import titleStyles from "./HeroTitle.module.css";
import { HeroSubtitle } from "./HeroSubtitle";


const rotatingWords = ["Turni AI", "FoodBrain", "Staff Pro+", "HR Smart", "Marketing e recensioni", "Dashboard Manager"];
const rotatingIcons = [ClipboardClock, UtensilsCrossed, Users, Contact, BadgeEuro, LayoutDashboard];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const IconComponent = rotatingIcons[wordIndex];

  return (
    <motion.section 
      className={styles.heroSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Container size="full" className={styles.heroContent}>
        <Badge 
          variant="success"
          animate={true}
          delay={0.4}
          duration={0.6}
          className={styles.badge}
        >
          <b>RISTOWAI</b> &nbsp;·&nbsp; Scatena la potenza dell&apos;IA
        </Badge>
        
        <motion.div 
          className={titleStyles.heroTitle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={titleStyles.titleLine}>
            AI che semplifica
          </div>
          <div className={titleStyles.titleLine}>
            <motion.span
              className={titleStyles.rotatingWord}
              key={wordIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {rotatingWords[wordIndex]}
            </motion.span>
            <motion.span 
              className={titleStyles.iconContainer}
              key={`icon-${wordIndex}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <IconComponent className={titleStyles.icon} />
            </motion.span>
          </div>
        </motion.div>
        
        <motion.div 
          style={{ marginBottom: "0.5rem" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <HeroSubtitle />
        </motion.div>
        
        <motion.div
          className={styles.heroButtons}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Button 
            variant="primary"
            size="lg"
            className={styles.primaryButton}
          >
            Inizia la prova gratuita di 1 mese
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className={styles.secondaryButton}
          >
            Scopri come funziona
          </Button>
        </motion.div>
      </Container>
    </motion.section>
  );
}