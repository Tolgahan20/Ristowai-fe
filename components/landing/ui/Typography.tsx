'use client';

import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './Typography.module.css';

export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body' | 'bodyLarge' | 'bodySmall'
  | 'caption' | 'overline' | 'subtitle'
  | 'hero' | 'display';

export type TypographyColor = 
  | 'primary' | 'secondary' | 'tertiary' | 'muted'
  | 'white' | 'success' | 'warning' | 'error';

export type TypographyWeight = 
  | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight,
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  as,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'h4':
        return styles.h4;
      case 'h5':
        return styles.h5;
      case 'h6':
        return styles.h6;
      case 'body':
        return styles.body;
      case 'bodyLarge':
        return styles.bodyLarge;
      case 'bodySmall':
        return styles.bodySmall;
      case 'caption':
        return styles.caption;
      case 'overline':
        return styles.overline;
      case 'subtitle':
        return styles.subtitle;
      case 'hero':
        return styles.hero;
      case 'display':
        return styles.display;
      default:
        return styles.body;
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return styles.colorPrimary;
      case 'secondary':
        return styles.colorSecondary;
      case 'tertiary':
        return styles.colorTertiary;
      case 'muted':
        return styles.colorMuted;
      case 'white':
        return styles.colorWhite;
      case 'success':
        return styles.colorSuccess;
      case 'warning':
        return styles.colorWarning;
      case 'error':
        return styles.colorError;
      default:
        return styles.colorPrimary;
    }
  };

  const getWeightClass = () => {
    if (weight) {
      switch (weight) {
        case 'normal':
          return styles.weightNormal;
        case 'medium':
          return styles.weightMedium;
        case 'semibold':
          return styles.weightSemibold;
        case 'bold':
          return styles.weightBold;
        case 'extrabold':
          return styles.weightExtrabold;
        default:
          return '';
      }
    }
    return '';
  };

  const getDefaultElement = (): keyof JSX.IntrinsicElements => {
    switch (variant) {
      case 'h1':
      case 'hero':
      case 'display':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      case 'subtitle':
        return 'h6';
      case 'body':
      case 'bodyLarge':
      case 'bodySmall':
        return 'p';
      case 'caption':
      case 'overline':
        return 'span';
      default:
        return 'p';
    }
  };

  const Element = (as || getDefaultElement()) as keyof JSX.IntrinsicElements;
  const typographyClasses = cn(
    styles.typography,
    getVariantClass(),
    getColorClass(),
    getWeightClass(),
    className
  );

  const content = (
    <Element className={typographyClasses}>
      {children}
    </Element>
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

// Convenience Components
export const Heading1: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Heading2: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading3: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Heading4: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h4" {...props} />
);

export const Heading5: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h5" {...props} />
);

export const Heading6: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h6" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="body" {...props} />
);

export const BodyLarge: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="bodyLarge" {...props} />
);

export const BodySmall: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="bodySmall" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="caption" {...props} />
);

export const Overline: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="overline" {...props} />
);

export const Subtitle: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="subtitle" {...props} />
);

export const Hero: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="hero" {...props} />
);

export const Display: React.FC<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="display" {...props} />
);

// Specialized Components
interface LinkProps extends Omit<TypographyProps, 'variant'> {
  href: string;
  target?: string;
  rel?: string;
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  rel,
  external = false,
  className,
  animate = false,
  delay = 0,
  duration = 0.2,
  ...props
}) => {
  const linkClasses = cn(
    styles.link,
    className
  );

  const content = (
    <a
      href={href}
      target={target || (external ? '_blank' : undefined)}
      rel={rel || (external ? 'noopener noreferrer' : undefined)}
      className={linkClasses}
    >
      {props.children}
    </a>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={{ y: -1 }}
    >
      {content}
    </motion.div>
  );
};

interface PriceProps extends Omit<TypographyProps, 'variant'> {
  amount: string | number;
  period?: string;
  currency?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  period,
  currency = '€',
  className,
  animate = false,
  delay = 0,
  duration = 0.4,
}) => {
  const priceClasses = cn(
    styles.price,
    className
  );

  const content = (
    <div className={priceClasses}>
      <span className={styles.priceAmount}>
        {currency}{amount}
      </span>
      {period && (
        <span className={styles.pricePeriod}>
          {period}
        </span>
      )}
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

interface BadgeProps extends Omit<TypographyProps, 'variant'> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  style,
  ...props
}) => {
  const getBadgeVariantClass = () => {
    switch (variant) {
      case 'success':
        return styles.badgeSuccess;
      case 'warning':
        return styles.badgeWarning;
      case 'error':
        return styles.badgeError;
      case 'info':
        return styles.badgeInfo;
      default:
        return styles.badgeDefault;
    }
  };

  const badgeClasses = cn(
    styles.badge,
    getBadgeVariantClass(),
    className
  );

  const content = (
    <span className={badgeClasses} style={style}>
      {props.children}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
    >
      {content}
    </motion.div>
  );
};
