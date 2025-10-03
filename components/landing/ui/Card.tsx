'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

export type CardVariant = 
  | 'default' 
  | 'elevated' 
  | 'outlined' 
  | 'filled' 
  | 'glass';

export type CardSize = 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  hover = false,
  onClick,
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'outlined':
        return styles.outlined;
      case 'filled':
        return styles.filled;
      case 'glass':
        return styles.glass;
      default:
        return styles.default;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return styles.sm;
      case 'lg':
        return styles.lg;
      default:
        return styles.md;
    }
  };

  const cardClasses = cn(
    styles.card,
    getVariantClass(),
    getSizeClass(),
    hover && styles.hover,
    onClick && styles.clickable,
    className
  );

  const content = (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay }}
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      {content}
    </motion.div>
  );
};

// Card Header Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn(styles.header, className)}>
    {children}
  </div>
);

// Card Body Component
interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => (
  <div className={cn(styles.body, className)}>
    {children}
  </div>
);

// Card Footer Component
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn(styles.footer, className)}>
    {children}
  </div>
);

// Card Title Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => (
  <h3 className={cn(styles.title, className)}>
    {children}
  </h3>
);

// Card Description Component
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => (
  <p className={cn(styles.description, className)}>
    {children}
  </p>
);

// Feature Card Component
interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
  animate = true,
  delay = 0,
}) => (
  <Card
    variant="elevated"
    hover
    animate={animate}
    delay={delay}
    className={className}
  >
    <CardHeader>
      {icon && <div className={styles.iconContainer}>{icon}</div>}
    </CardHeader>
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardBody>
  </Card>
);

// Pricing Card Component
interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  features,
  highlighted = false,
  className,
  animate = true,
  delay = 0,
}) => (
  <Card
    variant={highlighted ? 'elevated' : 'outlined'}
    hover
    animate={animate}
    delay={delay}
    className={cn(highlighted && styles.highlighted, className)}
  >
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <div className={styles.priceContainer}>
        <span className={styles.price}>{price}</span>
        <span className={styles.period}>{period}</span>
      </div>
    </CardHeader>
    <CardBody>
      <ul className={styles.featuresList}>
        {features.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            {feature}
          </li>
        ))}
      </ul>
    </CardBody>
  </Card>
);

// Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatar,
  className,
  animate = true,
  delay = 0,
}) => (
  <Card
    variant="filled"
    animate={animate}
    delay={delay}
    className={className}
  >
    <CardBody>
      <blockquote className={styles.quote}>
        "{quote}"
      </blockquote>
      <div className={styles.authorContainer}>
        {avatar && (
          <img src={avatar} alt={author} className={styles.avatar} />
        )}
        <div className={styles.authorInfo}>
          <div className={styles.authorName}>{author}</div>
          {role && <div className={styles.authorRole}>{role}</div>}
        </div>
      </div>
    </CardBody>
  </Card>
);
