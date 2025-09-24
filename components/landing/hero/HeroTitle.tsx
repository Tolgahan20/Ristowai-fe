import React from "react";
import styles from "./HeroTitle.module.css";

export function HeroTitle() {
  return (
    <h1 className={styles.heroTitle}>
      Ultimate AI
      <br />
      Chatbot <span className={styles.emoji}>⚡</span>
    </h1>
  );
}
