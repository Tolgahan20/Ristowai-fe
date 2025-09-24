import React, { useState } from "react";
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
    image: "/features/shift.png",
    imageBg: "#f3e8ff",
    imageAlt: "Smart Shifts UI"
  },
  food: {
    badge: "Menu Analytics & AI Pricing",
    badgeColor: "#f3e8ff",
    title: "FoodBrain",
    desc: "Control food costs, analyze your menu, and receive AI-driven pricing suggestions. Make every dish profitable and every menu decision data-backed.",
    image: "/features/food.png",
    imageBg: "#e0e7ff",
    imageAlt: "FoodBrain UI"
  },
  staff: {
    badge: "Checklists, Assets & Maintenance",
    badgeColor: "#dbeafe",
    title: "Staff Pro",
    desc: "Digitize daily checklists, manage asset inventory, and streamline maintenance tickets. Empower your team to deliver consistent quality and accountability.",
    image: "/features/staff.png",
    imageBg: "#f1f5f9",
    imageAlt: "Staff Pro UI"
  },
  hr: {
    badge: "Digital HR & Compliance",
    badgeColor: "#fef9c3",
    title: "HR Smart",
    desc: "Automate contracts, manage staff documentation, and receive compliance reminders. Keep your workforce organized and your business audit-ready.",
    image: "/features/hr.png",
    imageBg: "#fef9c3",
    imageAlt: "HR Smart UI"
  },
  marketing: {
    badge: "Automated Marketing & Reputation",
    badgeColor: "#d1fae5",
    title: "Marketing & Reviews",
    desc: "Plan campaigns with a smart content calendar, automate review replies, and test promotions. Grow your brand and boost engagement with less effort.",
    image: "/features/marketing.png",
    imageBg: "#d1fae5",
    imageAlt: "Marketing UI"
  },
  dashboard: {
    badge: "KPIs, Smart Agenda & Reporting",
    badgeColor: "#e0e7ff",
    title: "Manager Dashboard",
    desc: "Monitor real-time KPIs, manage your agenda, and export PDF reports. Make informed decisions with actionable insights at your fingertips.",
    image: "/features/dashboard.png",
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
    <section id="features" className={styles.featuresSection}>
      <h2 className={styles.title}>The future of AI.</h2>
      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <div className={styles.feature} key={i}>
            <span className={styles.icon}>{f.icon}</span>
            <div>
              <div className={styles.featureTitle}>{f.title}</div>
              <div className={styles.featureDesc}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.tabsBorder}>
        <div className={styles.tabsRow}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.tabButtonActive : ""}`}
              onClick={() => setActiveTab(tab.key)}
              type="button"
            >
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>
        <div className={styles.tabContentRow}>
          <div className={styles.tabCard} style={{ background: "#fff" }}>
            <div className={styles.tabBadge} style={{ background: content.badgeColor }}>
              {content.badge} <span className={styles.tabBadgeAI}>• AI</span>
            </div>
            <h3 className={styles.tabTitle}>{content.title}</h3>
            <p className={styles.tabDesc}>{content.desc}</p>
          </div>
          <div className={styles.tabImageCard} style={{ background: content.imageBg }}>
            <img src={content.image} alt={content.imageAlt} className={styles.tabImage} />
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
          </div>
        </div>
      </div>
      <div className={styles.bannersGrid}>
        {banners.map((b, i) => (
          <span
            key={b.label}
            className={styles.banner}
            style={{
              background: b.color,
              color: b.textColor,
            }}
          >
            <span className={styles.bannerDot} style={{ color: b.textColor }} />
            {b.label}
          </span>
        ))}
      </div>
    </section>
  );
}

