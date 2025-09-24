import React from "react";
import styles from "./PlayButton.module.css";

export function PlayButton() {
  return (
    <div className={styles.playButtonWrapper}>
      <button className={styles.playButton} aria-label="See how it works">
        <svg className={styles.playIcon} fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="11" fill="none" />
          <polygon points="10,8 16,12 10,16" fill="currentColor" />
        </svg>
      </button>
      <span className={styles.playText}>See how it works</span>
    </div>
  );
}
