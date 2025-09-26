import React from "react";
import { motion } from "framer-motion";
import styles from "./HeroSubtitle.module.css";

export function HeroSubtitle() {
  return (
    <motion.h2 
      className={styles.heroSubtitle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      One platform. Five smart solutions. Extra services on demand.
    </motion.h2>
  );
}
