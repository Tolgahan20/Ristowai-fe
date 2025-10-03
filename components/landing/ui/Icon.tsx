'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './Icon.module.css';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type IconVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error'
  | 'outlined'
  | 'filled';

interface IconProps {
  icon: React.ReactNode;
  size?: IconSize;
  variant?: IconVariant;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
  spin?: boolean;
  pulse?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  spin = false,
  pulse = false,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.xs;
      case 'sm':
        return styles.sm;
      case 'md':
        return styles.md;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      case '2xl':
        return styles.xl2;
      default:
        return styles.md;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      case 'outlined':
        return styles.outlined;
      case 'filled':
        return styles.filled;
      default:
        return styles.default;
    }
  };

  const iconClasses = cn(
    styles.icon,
    getSizeClass(),
    getVariantClass(),
    spin && styles.spin,
    pulse && styles.pulse,
    className
  );

  const content = (
    <span className={iconClasses}>
      {icon}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.div>
  );
};

// Icon Button Component
interface IconButtonProps extends IconProps {
  onClick?: () => void;
  disabled?: boolean;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  spin = false,
  pulse = false,
  onClick,
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.buttonXs;
      case 'sm':
        return styles.buttonSm;
      case 'md':
        return styles.buttonMd;
      case 'lg':
        return styles.buttonLg;
      case 'xl':
        return styles.buttonXl;
      case '2xl':
        return styles.buttonXl2;
      default:
        return styles.buttonMd;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary;
      case 'secondary':
        return styles.buttonSecondary;
      case 'success':
        return styles.buttonSuccess;
      case 'warning':
        return styles.buttonWarning;
      case 'error':
        return styles.buttonError;
      case 'outlined':
        return styles.buttonOutlined;
      case 'filled':
        return styles.buttonFilled;
      default:
        return styles.buttonDefault;
    }
  };

  const buttonClasses = cn(
    styles.iconButton,
    getSizeClass(),
    getVariantClass(),
    spin && styles.spin,
    pulse && styles.pulse,
    disabled && styles.disabled,
    className
  );

  const content = (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.div>
  );
};

// Icon Badge Component
interface IconBadgeProps extends IconProps {
  count?: number;
  max?: number;
  showZero?: boolean;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  size = 'md',
  variant = 'default',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  spin = false,
  pulse = false,
  count,
  max = 99,
  showZero = false,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.badgeXs;
      case 'sm':
        return styles.badgeSm;
      case 'md':
        return styles.badgeMd;
      case 'lg':
        return styles.badgeLg;
      case 'xl':
        return styles.badgeXl;
      case '2xl':
        return styles.badgeXl2;
      default:
        return styles.badgeMd;
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.badgePrimary;
      case 'secondary':
        return styles.badgeSecondary;
      case 'success':
        return styles.badgeSuccess;
      case 'warning':
        return styles.badgeWarning;
      case 'error':
        return styles.badgeError;
      case 'outlined':
        return styles.badgeOutlined;
      case 'filled':
        return styles.badgeFilled;
      default:
        return styles.badgeDefault;
    }
  };

  const displayCount = count !== undefined && (count > 0 || showZero) 
    ? count > max ? `${max}+` : count.toString()
    : null;

  const badgeClasses = cn(
    styles.iconBadge,
    getSizeClass(),
    getVariantClass(),
    spin && styles.spin,
    pulse && styles.pulse,
    className
  );

  const content = (
    <div className={badgeClasses}>
      <span className={styles.iconWrapper}>
        {icon}
      </span>
      {displayCount && (
        <span className={styles.badgeCount}>
          {displayCount}
        </span>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.05 }}
    >
      {content}
    </motion.div>
  );
};
