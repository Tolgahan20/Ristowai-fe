'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { LinkButton } from '../ui';
import styles from './Navigation.module.css';

interface NavigationProps {
  className?: string;
  animate?: boolean;
  topBarVisible?: boolean;
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

const navLinks: NavLink[] = [
  { label: 'Soluzioni', href: '#soluzioni' },
  { label: 'Mercato Attuale', href: '#mercato-attuale' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: ' Lista d\'attesa', href: '#lista-dattesa' },
  { label: 'Domande Frequenti', href: '#faq' },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  className,
  animate = true,
  topBarVisible = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href: string) => {
    setActiveLink(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  const navigationClasses = cn(
    styles.navigation,
    isScrolled && styles.navigationScrolled,
    !topBarVisible && styles.navigationWithTopBar,
    className
  );

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <>
      <motion.nav
        className={navigationClasses}
        initial={animate ? "hidden" : "visible"}
        animate="visible"
        variants={navVariants}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.navContainer}>
          {/* Logo */}
          <motion.a
            href="/"
            className={styles.logo}
            variants={navItemVariants}
            custom={0}
          >
            <div className={styles.logoIcon}>
              <Image 
                src={isScrolled ? "/full_logo_black.svg" : "/full_logo_white.svg"} 
                alt="magicAI Logo" 
                width={120} 
                height={120} 
              />
            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <motion.ul
            className={styles.navLinks}
            variants={navItemVariants}
            custom={1}
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={link.label}
                variants={navItemVariants}
                custom={index + 2}
              >
                <a
                  href={link.href}
                  className={cn(
                    styles.navLink,
                    activeLink === link.href && styles.navLinkActive
                  )}
                  onClick={e => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Desktop Action Buttons */}
          <motion.div
            className={styles.navActions}
            variants={navItemVariants}
            custom={navLinks.length + 2}
          >
            <motion.button
              className={styles.globeIcon}
              variants={navItemVariants}
              custom={navLinks.length + 2}
              aria-label="Language selection"
            >
            </motion.button>
            <LinkButton 
              href="/auth/login" 
              variant="outline"
              size="sm"
              className={styles.loginButton}
            >
              Accedi
            </LinkButton>
            <LinkButton 
              href="/auth/register" 
              variant="primary"
              size="sm"
              className={styles.signUpButton}
            >
              Registrati
            </LinkButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            variants={navItemVariants}
            custom={navLinks.length + 2}
            aria-label="Toggle mobile menu"
          >
            <div className={styles.hamburgerIcon}>
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLine1 : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLine2 : ''}`}></span>
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLine3 : ''}`}></span>
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Close Button */}
            <button
              className={styles.mobileMenuClose}
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              <div className={styles.hamburgerIcon}>
                <span className={`${styles.hamburgerLine} ${styles.hamburgerLine1}`}></span>
                <span className={`${styles.hamburgerLine} ${styles.hamburgerLine2}`}></span>
                <span className={`${styles.hamburgerLine} ${styles.hamburgerLine3}`}></span>
              </div>
            </button>

            <div className={styles.mobileMenuLinks}>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    styles.mobileMenuLink,
                    link.active && styles.mobileMenuLinkActive
                  )}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            <div className={styles.mobileMenuActions}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                <LinkButton 
                  href="/auth/login" 
                  variant="outline"
                  size="md"
                  className={styles.mobileLoginButton}
                  onClick={closeMobileMenu}
                >
                  Accedi
                </LinkButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <LinkButton 
                  href="/auth/register" 
                  variant="primary"
                  size="md"
                  className={styles.mobileSignUpButton}
                  onClick={closeMobileMenu}
                >
                  Registrati
                </LinkButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

