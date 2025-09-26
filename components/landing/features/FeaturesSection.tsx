import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiEdit3, FiBarChart2, FiGlobe, FiFileText, FiMessageCircle } from "react-icons/fi";
import {FaPaypal} from "react-icons/fa";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: <FiEdit3 size={22} />,
    title: "AI Generator",
    desc: <>Generate <b>text, image, code, chat</b> and even more with</>,
  },
  {
    icon: <FiBarChart2 size={22} />,
    title: "Advanced Dashboard",
    desc: <>Access to valuable user insight, analytics and activity.</>,
  },
  {
    icon: <FaPaypal size={22} />,
    title: "Payment Gateways",
    desc: <>Securely process credit card, debit card, or other methods.</>,
  },
  {
    icon: <FiGlobe size={22} />,
    title: "Multi-Lingual",
    desc: <>Ability to understand and generate content in different languages</>,
  },
  {
    icon: <FiFileText size={22} />,
    title: "Custom Templates",
    desc: <>Add unlimited number of custom prompts for your customers.</>,
  },
  {
    icon: <FiMessageCircle size={22} />,
    title: "Support Platform",
    desc: <>Access and manage your support tickets from your dashboard.</>,
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

