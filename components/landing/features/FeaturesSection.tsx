import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FiClock, 
  FiTrendingUp, 
  FiCheckSquare, 
  FiShield, 
  FiMessageSquare, 
  FiBarChart,
  FiTrendingDown,
  FiClock as FiTime,
  FiTarget
} from "react-icons/fi";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: <FiClock size={22} />,
    title: "Pianificazione e monitoraggio del tempo senza sforzo",
    desc: <>Automatizza la pianificazione dei turni con l&apos;intelligenza artificiale, attiva il timbro cartellino per il personale ed esporta i report con un solo clic. Risparmia ore di lavoro manuale e garantisci la copertura per ogni servizio.</>,
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Costi alimentari intelligenti e approfondimenti sul menu",
    desc: <>Tieni traccia dei costi delle materie prime in tempo reale, individua i piatti con margini bassi e ottieni suggerimenti basati sull&apos;intelligenza artificiale per ottimizzare i prezzi del tuo menu. Aumenta la redditività senza compromettere la soddisfazione dei clienti.</>,
  },
  {
    icon: <FiCheckSquare size={22} />,
    title: "Liste di controllo giornaliere e manutenzione semplici",
    desc: <>Organizza liste di controllo giornaliere/settimanali, registra le risorse e gestisci la manutenzione o i ticket con tracciati completi delle prove. Mantieni le tue operazioni fluide e pronte per la revisione.</>,
  },
  {
    icon: <FiShield size={22} />,
    title: "Contratti, documenti e conformità sotto controllo",
    desc: <>Centralizza i documenti dei dipendenti, i contratti e i promemoria di conformità. Evita multe e semplifica le attività HR con promemoria automatici e archiviazione intelligente.</>,
  },
  {
    icon: <FiMessageSquare size={22} />,
    title: "Crescita del marchio e della reputazione grazie all'intelligenza artificiale",
    desc: <>Pianifica il tuo calendario dei contenuti, crea post e promozioni e rispondi alle recensioni con il tono giusto. Individua tempestivamente i segnali di allarme e migliora la tua reputazione online.</>,
  },
  {
    icon: <FiBarChart size={22} />,
    title: "Controllo totale in un'unica dashboard",
    desc: <>Monitora i KPI, tieni traccia dei risparmi, gestisci tutte le soluzioni ed esporta i report mensili in formato PDF. Un vero e proprio centro di comando per i gestori di ristoranti.</>,
  },
];

const tabs = [
  { label: <>Smart Shifts</>, key: "shift" },
  { label: <>FoodBrain</>, key: "food" },
  { label: <>Staff Pro</>, key: "staff" },
  { label: <>HR Smart</>, key: "hr" },
  { label: <>Marketing & Reviews</>, key: "marketing" },
  { label: <>Manager Dashboard</>, key: "dashboard" },

];

const tabContent: Record<string, { 
  badge: string, 
  badgeColor: string, 
  title: string, 
  desc: string, 
  image: string, 
  imageBg: string, 
  imageAlt: string 
}> = {
  shift: {
    badge: "Pianificazione Senza Sforzo e Monitoraggio Tempo",
    badgeColor: "#e9d8fd",
    title: "Smart Shifts",
    desc: "Automatizza la pianificazione dei turni, attiva il timbro cartellino per il personale e genera report esportabili. Riduci gli errori manuali e garantisci una copertura ottimale per ogni servizio.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=350&fit=crop",
    imageBg: "#f3e8ff",
    imageAlt: "Interfaccia Smart Shifts"
  },
  food: {
    badge: "Analisi Menu e Pricing AI",
    badgeColor: "#f3e8ff",
    title: "FoodBrain",
    desc: "Controlla i costi alimentari, analizza il tuo menu e ricevi suggerimenti di prezzo basati sull'AI. Rendi ogni piatto redditizio e ogni decisione sul menu supportata dai dati.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=350&fit=crop",
    imageBg: "#e0e7ff",
    imageAlt: "Interfaccia FoodBrain"
  },
  staff: {
    badge: "Checklist, Asset e Manutenzione",
    badgeColor: "#dbeafe",
    title: "Staff Pro",
    desc: "Digitalizza le checklist giornaliere, gestisci l'inventario degli asset e semplifica i ticket di manutenzione. Potenzia il tuo team per fornire qualità costante e responsabilità.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop",
    imageBg: "#f1f5f9",
    imageAlt: "Interfaccia Staff Pro"
  },
  hr: {
    badge: "HR Digitale e Conformità",
    badgeColor: "#fef9c3",
    title: "HR Smart",
    desc: "Automatizza i contratti, gestisci la documentazione del personale e ricevi promemoria di conformità. Mantieni la tua forza lavoro organizzata e la tua azienda pronta per gli audit.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop",
    imageBg: "#fef9c3",
    imageAlt: "Interfaccia HR Smart"
  },
  marketing: {
    badge: "Marketing Automatico e Reputazione",
    badgeColor: "#d1fae5",
    title: "Marketing & Recensioni",
    desc: "Pianifica campagne con un calendario dei contenuti intelligente, automatizza le risposte alle recensioni e testa le promozioni. Fai crescere il tuo brand e aumenta l'engagement con meno sforzo.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop",
    imageBg: "#d1fae5",
    imageAlt: "Interfaccia Marketing"
  },
  dashboard: {
    badge: "KPI, Agenda Intelligente e Reportistica",
    badgeColor: "#e0e7ff",
    title: "Dashboard Manager",
    desc: "Monitora i KPI in tempo reale, gestisci la tua agenda ed esporta report PDF. Prendi decisioni informate con insights azionabili a portata di mano.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop",
    imageBg: "#e0e7ff",
    imageAlt: "Interfaccia Dashboard"
  },
};

const banners = [
  { label: "Ristoranti", color: "#F5F2F0", textColor: "#CAA153" },
  { label: "Caffè", color: "#F3F0FA", textColor: "#AA7FE6" },
  { label: "Fast food", color: "#EDF5F7", textColor: "#57CAC6" },
  { label: "Panetterie", color: "#F0F1FA", textColor: "#7F8EE6" },
  { label: "Pasticcerie", color: "#EFF3F1", textColor: "#6BAB64" },
  { label: "Bar / Pub", color: "#F8F0ED", textColor: "#EF7839" },
];

const highlights = [
  {
    value: "20%",
    title: "Riduzione Costi Lavoro",
    description: "Risparmia sui costi del personale con la pianificazione intelligente dei turni e il monitoraggio automatico del tempo.",
    icon: <FiTrendingDown size={24} />,
    color: "#10b981"
  },
  {
    value: "+12%",
    title: "Margine di Profitto",
    description: "Aumenta la redditività grazie alle analisi AI del menu e ai suggerimenti di pricing ottimizzati.",
    icon: <FiTrendingUp size={24} />,
    color: "#3b82f6"
  },
  {
    value: "10+",
    title: "Ore Risparmiate",
    description: "Riduci il tempo dedicato alla programmazione e all'amministrazione con l'automazione intelligente.",
    icon: <FiTime size={24} />,
    color: "#8b5cf6"
  },
  {
    value: "25%",
    title: "Meno Errori",
    description: "Diminuisci errori e sprechi nella gestione del personale e della cucina con checklist digitali.",
    icon: <FiTarget size={24} />,
    color: "#f59e0b"
  },
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("shift"); // <-- Fix initial tab key
  const content = tabContent[activeTab];

  return (
    <motion.section 
      id="benefits" 
      className={styles.featuresSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className={styles.title}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Vantaggi di Ristowai
      </motion.h2>
      
      <motion.div 
        className={styles.featuresGrid}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {features.map((f, i) => (
          <motion.div 
            className={styles.feature} 
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <motion.span 
              className={styles.icon}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
            >
              {f.icon}
            </motion.span>
            <div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className={styles.tabsBorder}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }} // Reduced delay from 0.6 to 0.2
      >
        <motion.div 
          className={styles.tabsRow}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }} // Reduced delay from 0.8 to 0.4
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.key}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + (index * 0.05) }} // Reduced delays
              whileHover={{ 
                y: -2,
                transition: { duration: 0.2 }
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
          transition={{ duration: 0.6, delay: 0.6 }} // Reduced delay from 1.0 to 0.6
        >
          <motion.div 
            className={styles.tabCard} 
            style={{ background: "#fff" }}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }} // Reduced delay from 1.2 to 0.8
          >
            <div className={styles.tabBadge} style={{ background: content.badgeColor }}>
              {content.badge} <span className={styles.tabBadgeAI}>• AI</span>
            </div>
            <h3 className={styles.tabTitle}>{content.title}</h3>
            <p className={styles.tabDesc}>{content.desc}</p>
          </motion.div>
          <motion.div 
            className={styles.tabImageCard} 
            style={{ background: content.imageBg }}
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }} // Reduced delay from 1.4 to 1.0
          >
                <Image src={content.image} alt={content.imageAlt} width={400} height={300} className={styles.tabImage} />
            <div className={styles.tabImageCaption}>
              {activeTab === "image" && (
                <span>
                  <b>Imagine, Generate, Publish.</b>
                  <br />
                  <span style={{ color: "#6b7280", fontWeight: 400 }}>Powered by Dall-E.</span>
                </span>
              )}
              {activeTab === "text" && (
                <span>
                  <b>Generate, edit, export.</b>
                </span>
              )}
              {/* Add captions for other tabs as needed */}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Metrics Section */}
      <motion.div 
        className={styles.metricsSection}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <motion.div 
          className={styles.metricsContent}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className={styles.metricsHeader}>
            <div className={styles.metricsTitleSection}>
              <h3 className={styles.metricsTitle}>Risultati Misurabili</h3>
              <p className={styles.metricsSubtitle}>Dati reali dai nostri clienti che utilizzano Ristowai</p>
            </div>
            <div className={styles.metricsActions}>
              <button className={`${styles.metricsButton} ${styles.metricsButtonSecondary}`}>
                Demo
              </button>
              <button className={`${styles.metricsButton} ${styles.metricsButtonPrimary}`}>
                Inizia Ora
              </button>
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
                transition={{ duration: 0.4, delay: 1.4 + (index * 0.1) }}
              >
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricTitle}>{metric.title}</div>
                <div className={styles.metricDescription}>{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className={styles.bannersGrid}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.6 }} // Increased delay to accommodate highlight box
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
            transition={{ duration: 0.4, delay: 1.4 + (i * 0.05) }} // Reduced delays
            whileHover={{ 
              y: -3,
              transition: { duration: 0.2 }
            }}
          >
            <span className={styles.bannerDot} style={{ color: b.textColor }} />
            {b.label}
          </motion.span>
        ))}
      </motion.div>
    </motion.section>
  );
}

