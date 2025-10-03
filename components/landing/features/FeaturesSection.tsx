import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heading2, Body } from "../ui";
import styles from "./FeaturesSection.module.css";

const tabs = [
  { label: <>Smart Shifts</>, key: "shift" },
  { label: <>FoodBrain</>, key: "food" },
  { label: <>Staff Pro</>, key: "staff" },
  { label: <>HR Smart</>, key: "hr" },
  { label: <>Marketing & Reviews</>, key: "marketing" },
  { label: <>Manager Dashboard</>, key: "dashboard" },
];

const tabContent: Record<
  string,
  {
    badge: string;
    badgeColor: string;
    title: string;
    desc: string;
    features: string[];
    image: string;
    imageBg: string;
    imageAlt: string;
  }
> = {
  shift: {
    badge: "Turni AI",
    badgeColor: "#e9d8fd",
    title: "Smart Shifts",
    desc: "Turni pronti in pochi secondi, senza errori e sempre in regola.",
    features: [
      "<30 sec Output",
      "Punch Clock",
      "Ricalcolo imprevisto",
      "Banche Ore",
      "Alert legali",
      "Export Payroll",
    ],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=350&fit=crop",
    imageBg: "rgba(243, 232, 255, 0.1)",
    imageAlt: "Interfaccia Smart Shifts",
  },
  food: {
    badge: "FoodBrain",
    badgeColor: "#dcfce7",
    title: "FoodBrain",
    desc: "Menu ottimizzato: più margini, meno sprechi.",
    features: [
      "Analisi % Target",
      "Analisi Full Menu",
      "Esperimenti Piatti/Drink",
      "Suggerimenti Pricing",
    ],
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=350&fit=crop",
    imageBg: "rgba(220, 252, 231, 0.1)",
    imageAlt: "Analisi Menu FoodBrain",
  },
  staff: {
    badge: "Staff Pro+",
    badgeColor: "#fef3c7",
    title: "Staff Pro+",
    desc: "Tutto lo staff organizzato e conforme, senza carta e confusione.",
    features: [
      "HACCP digitale",
      "Export per ASL",
      "Analisi Emotivo Staff (Burnout-free)",
      "Canali Comunicazioni",
      "Checklist & Manutenzioni",
      "Regolamenti & Dress Code",
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop",
    imageBg: "rgba(254, 243, 199, 0.1)",
    imageAlt: "Gestione Staff Pro",
  },
  hr: {
    badge: "HR Smart",
    badgeColor: "#e0e7ff",
    title: "HR Smart",
    desc: "HR più veloce: assumi, integra e gestisci documenti senza stress.",
    features: [
      "Creazioni Annunci di Lavoro",
      "Screening CV con Pointmatch",
      "Onboarding Assunzione",
      "Welcome Kit",
      "Portale HR Smart",
      "Gestione Certificati",
    ],
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=350&fit=crop",
    imageBg: "rgba(224, 231, 255, 0.1)",
    imageAlt: "HR Smart Dashboard",
  },
  marketing: {
    badge: "Marketing & Reviews",
    badgeColor: "#fce7f3",
    title: "Marketing & Reviews",
    desc: "Più clienti e reputazione online, senza perdere tempo nelle risposte.",
    features: [
      "Analisi Identità locale",
      "Rafforzamento Brand con suggerimenti social",
      "Auto-risposta recensioni con analisi critiche e alert",
    ],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=350&fit=crop",
    imageBg: "rgba(252, 231, 243, 0.1)",
    imageAlt: "Marketing e Reviews",
  },
  dashboard: {
    badge: "Dashboard Manager",
    badgeColor: "#f0fdf4",
    title: "Manager Dashboard",
    desc: "Tutti i numeri del tuo locale in un solo sguardo.",
    features: [
      "KPI per modulo acquistato o bundle",
      "Agenda intelligente con alert scadenze/priorità",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop",
    imageBg: "rgba(240, 253, 244, 0.1)",
    imageAlt: "Dashboard Manager",
  },
};

const banners = [
  {
    label: "Ristoranti",
    color: "rgba(245, 158, 11, 0.15)",
    textColor: "#f59e0b",
    dotColor: "#f59e0b",
  },
  {
    label: "Caffè",
    color: "rgba(139, 92, 246, 0.15)",
    textColor: "#8b5cf6",
    dotColor: "#8b5cf6",
  },
  {
    label: "Fast food",
    color: "rgba(6, 182, 212, 0.15)",
    textColor: "#06b6d4",
    dotColor: "#06b6d4",
  },
  {
    label: "Panetterie",
    color: "rgba(59, 130, 246, 0.15)",
    textColor: "#3b82f6",
    dotColor: "#3b82f6",
  },
  {
    label: "Pasticcerie",
    color: "rgba(16, 185, 129, 0.15)",
    textColor: "#10b981",
    dotColor: "#10b981",
  },
  {
    label: "Bar / Pub",
    color: "rgba(239, 68, 68, 0.15)",
    textColor: "#ef4444",
    dotColor: "#ef4444",
  },
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("shift"); // <-- Fix initial tab key
  const content = tabContent[activeTab];

  return (
    <div id="benefits" className={styles.featuresSection}>
      <Heading2
        className={styles.title}
        animate={true}
        delay={0.2}
        duration={0.6}
      >
        Vantaggi di Ristowai
      </Heading2>

      <motion.div
        className={styles.tabsBorder}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.1 }} // Reduced delay from 0.6 to 0.2
      >
        <motion.div
          className={styles.tabsRow}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }} // Reduced delay from 0.8 to 0.4
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.key}
              className={`${styles.tabButton} ${
                activeTab === tab.key ? styles.tabButtonActive : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.02 }} // Reduced delays
              whileHover={{
                y: -2,
                transition: { duration: 0.2 },
              }}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className={styles.tabContentRow}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.4 }} // Reduced delay from 1.0 to 0.6
        >
          <motion.div
            className={styles.tabCard}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Heading2 className={styles.tabTitle}>{content.title}</Heading2>
            <Body className={styles.tabDesc}>{content.desc}</Body>
            <div className={styles.featuresList}>
              {content.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureBullet}></div>
                  <span className={styles.featureText}>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className={styles.tabImageCard}
            style={{ background: content.imageBg }}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.6 }} // Reduced delay from 1.4 to 1.0
          >
            <Image
              src={content.image}
              alt={content.imageAlt}
              width={400}
              height={300}
              className={styles.tabImage}
            />
            <div className={styles.tabImageCaption}>
              {activeTab === "shift" && (
                <span>
                  <b>Pianificazione Intelligente</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    Ottimizza i turni automaticamente
                  </span>
                </span>
              )}
              {activeTab === "food" && (
                <span>
                  <b>Analisi Menu AI</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    Pricing ottimizzato per ogni piatto
                  </span>
                </span>
              )}
              {activeTab === "staff" && (
                <span>
                  <b>Checklist Digitali</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    Gestione asset e manutenzione
                  </span>
                </span>
              )}
              {activeTab === "hr" && (
                <span>
                  <b>HR Automatizzato</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    Conformità e documentazione
                  </span>
                </span>
              )}
              {activeTab === "marketing" && (
                <span>
                  <b>Marketing Automatico</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    Gestione recensioni e campagne
                  </span>
                </span>
              )}
              {activeTab === "dashboard" && (
                <span>
                  <b>Dashboard Manager</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>
                    KPI e reportistica in tempo reale
                  </span>
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Metrics Section - COMMENTED OUT */}
      {/* <motion.div 
        className={styles.metricsSection}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <motion.div 
          className={styles.metricsContent}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <div className={styles.metricsHeader}>
            <div className={styles.metricsTitleSection}>
              <h3 className={styles.metricsTitle}>Risultati Misurabili</h3>
              <p className={styles.metricsSubtitle}>Dati reali dai nostri clienti che utilizzano Ristowai</p>
            </div>
            <div className={styles.metricsActions}>
              <Button 
                variant="outline"
                size="md"
                className={styles.metricsButtonSecondary}
              >
                Demo
              </Button>
              <Button 
                variant="primary"
                size="md"
                className={styles.metricsButtonPrimary}
              >
                Inizia Ora
              </Button>
            </div>
          </div>
          <div className={styles.metricsGrid}>
            {highlights.map((metric, index) => (
              <motion.div 
                key={index}
                className={styles.metricItem}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.9 + (index * 0.05) }}
              >
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricTitle}>{metric.title}</div>
                <div className={styles.metricDescription}>{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div> */}

      <motion.div
        className={styles.bannersGrid}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.0 }} // Increased delay to accommodate highlight box
      >
        {banners.map((b, i) => (
          <motion.span
            key={b.label}
            className={styles.banner}
            style={{
              background: b.color,
              color: b.textColor,
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 1.1 + i * 0.02 }} // Reduced delays
            whileHover={{
              y: -3,
              transition: { duration: 0.2 },
            }}
          >
            <span
              className={styles.bannerDot}
              style={{ backgroundColor: b.dotColor }}
            />
            {b.label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
