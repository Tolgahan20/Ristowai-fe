import React, { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import titleStyles from "./HeroTitle.module.css";
import { HeroSubtitle } from "./HeroSubtitle";
import { PlayButton } from "./PlayButton";

const rotatingWords = ["Staff", "Cost", "Operations"];

export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let fadeOut: NodeJS.Timeout;
    let fadeIn: NodeJS.Timeout;
    const animate = () => {
      fadeOut = setTimeout(() => setFade(false), 1700);
      fadeIn = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setFade(true);
      }, 2000);
    };
    animate();
    const interval = setInterval(animate, 2000);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeOut);
      clearTimeout(fadeIn);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <span className={styles.badge}>
          <b>RISTOWAI</b> &nbsp;·&nbsp; Unleash the Power of AI
        </span>
        <h1 className={titleStyles.heroTitle}>
          AI that simplifies
          <br />
          <span
            style={{
              display: "inline-block",
              minHeight: "1em",
              transition: "opacity 0.6s cubic-bezier(.4,0,.2,1)",
              opacity: fade ? 1 : 0,
              willChange: "opacity",
            }}
          >
            {rotatingWords[wordIndex]}
          </span>
          <span className={titleStyles.emoji}>⚡</span>
        </h1>
        <div style={{ marginBottom: "0.5rem" }}>
          <HeroSubtitle />
        </div>
        <PlayButton />
      </div>
      <svg className={styles.heroWave} viewBox="0 0 1440 110" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          d="M0,0 Q720,180 1440,0 L1440,110 L0,110 Z"
          fill="#F7F8FA"
        />
      </svg>
    </section>
  );
}