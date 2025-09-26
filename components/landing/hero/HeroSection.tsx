import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sparkles, Rocket } from "lucide-react";
import styles from "./HeroSection.module.css";
import titleStyles from "./HeroTitle.module.css";
import { HeroSubtitle } from "./HeroSubtitle";
import { PlayButton } from "./PlayButton";

const rotatingWords = ["Staff", "Cost", "Operations"];
const rotatingIcons = [Zap, Sparkles, Rocket];

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
      <motion.div 
        className={styles.heroContent}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.span 
          className={styles.badge}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <b>RISTOWAI</b> &nbsp;·&nbsp; Unleash the Power of AI
        </motion.span>
        
        <motion.h1 
          className={titleStyles.heroTitle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AI that simplifies
          <br />
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
        </motion.h1>
        
        <motion.div 
          style={{ marginBottom: "0.5rem" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <HeroSubtitle />
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <PlayButton />
        </motion.div>
      </motion.div>
      
      <svg 
        className={styles.heroWave} 
        viewBox="0 0 1440 110" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="none"
      >
        {/* Desktop wave */}
        <path
          className={styles.wavePathDesktop}
          d="M0,0 Q720,180 1440,0 L1440,110 L0,110 Z"
          fill="#F7F8FA"
        />
        {/* Mobile wave - softer curve */}
        <path
          className={styles.wavePathMobile}
          d="M0,0 Q720,120 1440,0 L1440,110 L0,110 Z"
          fill="#F7F8FA"
        />
        {/* Small mobile wave - even softer */}
        <path
          className={styles.wavePathSmallMobile}
          d="M0,0 Q720,100 1440,0 L1440,110 L0,110 Z"
          fill="#F7F8FA"
        />
      </svg>
    </motion.section>
  );
}