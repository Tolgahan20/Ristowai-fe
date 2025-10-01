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
      I ristoranti che usano Ristowai rispariano fino al 20% e aumentano le margini del 12% in soli 2 mesi.
    </motion.h2>
  );
}
