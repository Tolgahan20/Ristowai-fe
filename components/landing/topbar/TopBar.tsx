'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LinkButton } from '../ui';
import styles from './TopBar.module.css';

interface TopBarProps {
  className?: string;
  onClose?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  className,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.topBar} ${className || ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <p className={styles.topBarText}>
          <span className={styles.topbarTitle}>OFFERTA LIMITATA</span>
          Unisciti al programma di beta testing per beneficiare dell&apos;accesso anticipato e prezzi ridotti.{' '}
          <LinkButton 
            href="/beta-signup" 
            variant="ghost"
            size="sm"
            className={styles.betaLink}
          >
            Registrati ora
          </LinkButton>
        </p>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close offer"
        >
          <svg
            className={styles.closeIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
