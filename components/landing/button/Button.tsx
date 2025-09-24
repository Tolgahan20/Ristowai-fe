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
  | 'play' 
  | 'watchVideo' 
  | 'joinCommunity' 
  | 'pricing';

export type ButtonSize = 'small' | 'default' | 'large' | 'xlarge';

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
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  className,
  loading = false,
  animate = false,
  delay = 0,
  duration = 0.3,
  icon,
  iconPosition = 'left',
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
      case 'play':
        return styles.playButton;
      case 'watchVideo':
        return styles.watchVideo;
      case 'joinCommunity':
        return styles.joinCommunity;
      case 'pricing':
        return styles.pricing;
      default:
        return styles.primary;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      case 'xlarge':
        return styles.xlarge;
      default:
        return '';
    }
  };

  const buttonClasses = cn(
    styles.button,
    getVariantClass(),
    getSizeClass(),
    loading && styles.loading,
    className
  );

  const content = (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
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

// Specialized Button Components

export const PlayButton: React.FC<Omit<ButtonProps, 'variant'> & { size?: 'small' | 'default' | 'large' }> = ({
  children,
  size = 'default',
  className,
  animate = true,
  delay = 0.3,
  duration = 0.6,
  ...props
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.circularSmall;
      case 'large':
        return styles.circularLarge;
      default:
        return styles.circular;
    }
  };

  const buttonClasses = cn(
    styles.button,
    styles.playButton,
    getSizeClass(),
    className
  );

  const content = (
    <button className={buttonClasses} {...props}>
      {children ? (
        <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          {children}
        </>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="ml-1"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.05 }}
    >
      {content}
    </motion.div>
  );
};

export const WatchVideoButton: React.FC<Omit<ButtonProps, 'variant'>> = ({
  children = 'Watch Video',
  className,
  animate = true,
  delay = 0,
  duration = 0.6,
  ...props
}) => {
  return (
    <Button
      variant="watchVideo"
      className={className}
      animate={animate}
      delay={delay}
      duration={duration}
      {...props}
    >
      {children}
    </Button>
  );
};

export const JoinCommunityButton: React.FC<Omit<ButtonProps, 'variant'>> = ({
  children = 'Join our community',
  className,
  animate = true,
  delay = 0,
  duration = 0.6,
  ...props
}) => {
  return (
    <Button
      variant="joinCommunity"
      className={className}
      animate={animate}
      delay={delay}
      duration={duration}
      {...props}
    >
      {children}
    </Button>
  );
};

export const PricingButton: React.FC<Omit<ButtonProps, 'variant'>> = ({
  children,
  className,
  animate = false,
  delay = 0,
  duration = 0.4,
  ...props
}) => {
  return (
    <Button
      variant="pricing"
      className={className}
      animate={animate}
      delay={delay}
      duration={duration}
      {...props}
    >
      {children}
    </Button>
  );
};

// Link Button Component
interface LinkButtonProps {
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
  href: string;
  target?: string;
  rel?: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  target,
  rel,
  variant = 'primary',
  size = 'default',
  children,
  className,
  loading = false,
  animate = false,
  delay = 0,
  duration = 0.3,
  icon,
  iconPosition = 'left',
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
      case 'play':
        return styles.playButton;
      case 'watchVideo':
        return styles.watchVideo;
      case 'joinCommunity':
        return styles.joinCommunity;
      case 'pricing':
        return styles.pricing;
      default:
        return styles.primary;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      case 'xlarge':
        return styles.xlarge;
      default:
        return '';
    }
  };

  const buttonClasses = cn(
    styles.button,
    getVariantClass(),
    getSizeClass(),
    loading && styles.loading,
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
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
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
