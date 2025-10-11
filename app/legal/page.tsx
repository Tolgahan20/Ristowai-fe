'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Legal.module.css';
import { privacyPolicyContent, termsOfServiceContent, cookiePolicyContent } from './content';

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const legalSections: LegalSection[] = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    content: (
      <div className={styles.contentSection}>
        {privacyPolicyContent}
      </div>
    ),
  },
  {
    id: 'terms-of-service',
    title: 'Termini di Servizio',
    content: (
      <div className={styles.contentSection}>
        {termsOfServiceContent}
      </div>
    ),
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    content: (
      <div className={styles.contentSection}>
        {cookiePolicyContent}
      </div>
    ),
  },
];

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState<string>('privacy-policy');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  const currentSection = legalSections.find(section => section.id === activeSection);

  return (
    <div className={styles.legalPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Image
              src="/full_logo_white.svg"
              alt="Ristowai"
              width={130}
              height={40}
            />
          </div>
          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className={styles.container}>
        {/* Sidebar Navigation */}
        <nav className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.sidebarContent}>
            <h2 className={styles.sidebarTitle}>Documenti Legali</h2>
            <ul className={styles.sidebarMenu}>
              {legalSections.map((section) => (
                <li key={section.id}>
                  <button
                    className={`${styles.sidebarMenuItem} ${
                      activeSection === section.id ? styles.sidebarMenuItemActive : ''
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span>{section.title}</span>
                    <ChevronRight size={18} />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.sidebarFooter}>
              <Link href="/" className={styles.backButton}>
                <ArrowLeft size={20} />
                <span>Torna alla Home</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentSection?.content}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
