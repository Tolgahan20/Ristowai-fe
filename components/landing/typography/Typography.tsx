'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Typography.module.css';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
}

// Hero Title Component
export const HeroTitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0,
  duration = 0.6
}) => {
  const content = (
    <h1 className={cn(styles.heroTitle, className)}>
      {children}
    </h1>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Hero Subtitle Component
export const HeroSubtitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0.2,
  duration = 0.6
}) => {
  const content = (
    <p className={cn(styles.heroSubtitle, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Section Title Component
export const SectionTitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0,
  duration = 0.6
}) => {
  const content = (
    <h2 className={cn(styles.sectionTitle, className)}>
      {children}
    </h2>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Section Subtitle Component
export const SectionSubtitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0.1,
  duration = 0.6
}) => {
  const content = (
    <p className={cn(styles.sectionSubtitle, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Card Title Component
export const CardTitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <h3 className={cn(styles.cardTitle, className)}>
      {children}
    </h3>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Card Subtitle Component
export const CardSubtitle: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0.1,
  duration = 0.4
}) => {
  const content = (
    <p className={cn(styles.cardSubtitle, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Body Text Component
export const BodyText: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <p className={cn(styles.bodyText, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Body Text Large Component
export const BodyTextLarge: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <p className={cn(styles.bodyTextLarge, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Body Text Small Component
export const BodyTextSmall: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <p className={cn(styles.bodyTextSmall, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Label Component
export const Label: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <span className={cn(styles.label, className)}>
      {children}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Price Amount Component
export const PriceAmount: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <div className={cn(styles.priceAmount, className)}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Price Period Component
export const PricePeriod: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0.1,
  duration = 0.4
}) => {
  const content = (
    <span className={cn(styles.pricePeriod, className)}>
      {children}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Testimonial Quote Component
export const TestimonialQuote: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0,
  duration = 0.6
}) => {
  const content = (
    <blockquote className={cn(styles.testimonialQuote, className)}>
      &quot;{children}&quot;
    </blockquote>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Testimonial Author Component
export const TestimonialAuthor: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = true,
  delay = 0.2,
  duration = 0.6
}) => {
  const content = (
    <div className={cn(styles.testimonialAuthor, className)}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Navigation Link Component
export const NavLink: React.FC<TypographyProps & { href?: string; active?: boolean }> = ({ 
  children, 
  className, 
  href,
  active = false,
  animate = false,
  delay = 0,
  duration = 0.2
}) => {
  const content = (
    <a 
      href={href} 
      className={cn(
        active ? styles.navLinkActive : styles.navLink, 
        className
      )}
    >
      {children}
    </a>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Footer Text Component
export const FooterText: React.FC<TypographyProps> = ({ 
  children, 
  className, 
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <p className={cn(styles.footerText, className)}>
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};

// Footer Link Component
export const FooterLink: React.FC<TypographyProps & { href?: string }> = ({ 
  children, 
  className, 
  href,
  animate = false,
  delay = 0,
  duration = 0.4
}) => {
  const content = (
    <a 
      href={href} 
      className={cn(styles.footerLink, className)}
    >
      {children}
    </a>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};
