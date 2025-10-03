'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'dark' 
  | 'white' 
  | 'success'
  | 'warning'
  | 'error';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  animate?: boolean;
  delay?: number;
  duration?: number;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  animate = false,
  delay = 0,
  duration = 0.3,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'dark':
        return styles.dark;
      case 'white':
        return styles.white;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.primary;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.xs;
      case 'sm':
        return styles.sm;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      default:
        return styles.md;
    }
  };

  const buttonClasses = cn(
    styles.button,
    getVariantClass(),
    getSizeClass(),
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.div>
  );
};

// Link Button Component
interface LinkButtonProps extends Omit<ButtonProps, 'disabled'> {
  href: string;
  target?: string;
  rel?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  target,
  rel,
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  animate = false,
  delay = 0,
  duration = 0.3,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'dark':
        return styles.dark;
      case 'white':
        return styles.white;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.primary;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.xs;
      case 'sm':
        return styles.sm;
      case 'lg':
        return styles.lg;
      case 'xl':
        return styles.xl;
      default:
        return styles.md;
    }
  };

  const buttonClasses = cn(
    styles.button,
    getVariantClass(),
    getSizeClass(),
    loading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <a
      href={href}
      target={target}
      rel={rel}
      className={buttonClasses}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </a>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.div>
  );
};

// Icon Button Component
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'secondary':
        return styles.secondary;
      case 'outline':
        return styles.outline;
      case 'ghost':
        return styles.ghost;
      case 'dark':
        return styles.dark;
      case 'white':
        return styles.white;
      case 'success':
        return styles.success;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.ghost;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return styles.iconXs;
      case 'sm':
        return styles.iconSm;
      case 'lg':
        return styles.iconLg;
      case 'xl':
        return styles.iconXl;
      default:
        return styles.iconMd;
    }
  };

  const buttonClasses = cn(
    styles.button,
    styles.iconButton,
    getVariantClass(),
    getSizeClass(),
    className
  );

  const content = (
    <button className={buttonClasses} {...props}>
      {icon}
    </button>
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

// Button Group Component
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'md',
}) => {
  const groupClasses = cn(
    styles.buttonGroup,
    orientation === 'vertical' && styles.vertical,
    spacing === 'sm' && styles.spacingSm,
    spacing === 'lg' && styles.spacingLg,
    className
  );

  return (
    <div className={groupClasses}>
      {children}
    </div>
  );
};
