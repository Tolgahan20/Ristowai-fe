import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FiClock, 
  FiTrendingUp, 
  FiCheckSquare, 
  FiShield, 
  FiMessageSquare, 
  FiBarChart
} from "react-icons/fi";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: <FiClock size={22} />,
    title: "Effortless Scheduling & Time Tracking",
    desc: <>Automate shift planning with AI, enable punch clock for staff, and export reports in one click. Save hours of manual work and guarantee coverage for every service.
</>,
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Smart Food Cost & Menu Insights",
    desc: <>Track real-time food costs, detect low-margin dishes, and get AI suggestions to optimize your menu pricing. Increase profitability without losing customer satisfaction.</>,
  },
  {
    icon: <FiCheckSquare size={22} />,
    title: "Daily Checklists & Maintenance Made Simple",
    desc: <>Organize daily/weekly checklists, register assets, and manage maintenance or tickets with full evidence trails. Keep your operations smooth and audit-ready.</>,
  },
  {
    icon: <FiShield size={22} />,
    title: "Contracts, Docs & Compliance Under Control",
    desc: <>Centralize employee documents, contracts, and compliance reminders. Avoid fines and simplify HR tasks with automated nudges and smart storage.</>,
  },
  {
    icon: <FiMessageSquare size={22} />,
    title: "AI-Powered Brand & Reputation Growth",
    desc: <>Plan your content calendar, generate posts and promotions, and reply to reviews with the right tone. Detect red flags early and boost your online reputation..</>,
  },
  {
    icon: <FiBarChart size={22} />,
    title: "Full Control in One Dashboard",
    desc: <>Monitor KPIs, track savings, manage all solutions, and export monthly reports in PDF. A true command center for restaurant managers.</>,
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
    badge: "Effortless Scheduling & Time Tracking",
    badgeColor: "#e9d8fd",
    title: "Smart Shifts",
    desc: "Automate shift planning, enable punch clock for staff, and generate exportable reports. Reduce manual errors and ensure optimal coverage for every service.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    imageBg: "#f3e8ff",
    imageAlt: "Smart Shifts UI"
  },
  food: {
    badge: "Menu Analytics & AI Pricing",
    badgeColor: "#f3e8ff",
    title: "FoodBrain",
    desc: "Control food costs, analyze your menu, and receive AI-driven pricing suggestions. Make every dish profitable and every menu decision data-backed.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    imageBg: "#e0e7ff",
    imageAlt: "FoodBrain UI"
  },
  staff: {
    badge: "Checklists, Assets & Maintenance",
    badgeColor: "#dbeafe",
    title: "Staff Pro",
    desc: "Digitize daily checklists, manage asset inventory, and streamline maintenance tickets. Empower your team to deliver consistent quality and accountability.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
    imageBg: "#f1f5f9",
    imageAlt: "Staff Pro UI"
  },
  hr: {
    badge: "Digital HR & Compliance",
    badgeColor: "#fef9c3",
    title: "HR Smart",
    desc: "Automate contracts, manage staff documentation, and receive compliance reminders. Keep your workforce organized and your business audit-ready.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    imageBg: "#fef9c3",
    imageAlt: "HR Smart UI"
  },
  marketing: {
    badge: "Automated Marketing & Reputation",
    badgeColor: "#d1fae5",
    title: "Marketing & Reviews",
    desc: "Plan campaigns with a smart content calendar, automate review replies, and test promotions. Grow your brand and boost engagement with less effort.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    imageBg: "#d1fae5",
    imageAlt: "Marketing UI"
  },
  dashboard: {
    badge: "KPIs, Smart Agenda & Reporting",
    badgeColor: "#e0e7ff",
    title: "Manager Dashboard",
    desc: "Monitor real-time KPIs, manage your agenda, and export PDF reports. Make informed decisions with actionable insights at your fingertips.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    imageBg: "#e0e7ff",
    imageAlt: "Dashboard UI"
  },
};

const banners = [
  { label: "Restaurants", color: "#F5F2F0", textColor: "#CAA153" },
  { label: "Cafés", color: "#F3F0FA", textColor: "#AA7FE6" },
  { label: "Fast food", color: "#EDF5F7", textColor: "#57CAC6" },
  { label: "Bakeries", color: "#F0F1FA", textColor: "#7F8EE6" },
  { label: "Dessert shops", color: "#EFF3F1", textColor: "#6BAB64" },
  { label: "Bars / Pubs", color: "#F8F0ED", textColor: "#EF7839" },
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("shift"); // <-- Fix initial tab key
  const content = tabContent[activeTab];

  return (
    <motion.section 
      id="features" 
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
        The future of AI.
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
      <motion.div 
        className={styles.bannersGrid}
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }} // Reduced delay from 1.6 to 1.2
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

