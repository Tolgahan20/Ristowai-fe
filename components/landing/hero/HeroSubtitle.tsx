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
      Riduci i costi fino al 20%, aumenta i margini del +12% e risparmia tempo prezioso — senza cambiare i sistemi che già usi.

    </motion.h2>
  );
}
