'use client';

import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  size?: ContainerSize;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  as: Component = 'div',
}) => {
  const getSizeClass = () => {
    switch (size) {
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
      case 'full':
        return styles.full;
      default:
        return styles.lg;
    }
  };

  const containerClasses = cn(
    styles.container,
    getSizeClass(),
    className
  );

  const content = (
    <Component className={containerClasses}>
      {children}
    </Component>
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

// Section Component
interface SectionProps extends ContainerProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'primary' | 'secondary' | 'dark';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  size = 'lg',
  padding = 'lg',
  background = 'transparent',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  as: Component = 'section',
  id,
}) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'none':
        return styles.paddingNone;
      case 'sm':
        return styles.paddingSm;
      case 'md':
        return styles.paddingMd;
      case 'lg':
        return styles.paddingLg;
      case 'xl':
        return styles.paddingXl;
      default:
        return styles.paddingLg;
    }
  };

  const getBackgroundClass = () => {
    switch (background) {
      case 'primary':
        return styles.bgPrimary;
      case 'secondary':
        return styles.bgSecondary;
      case 'dark':
        return styles.bgDark;
      default:
        return styles.bgTransparent;
    }
  };

  const getSizeClass = () => {
    switch (size) {
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
      case 'full':
        return styles.full;
      default:
        return styles.lg;
    }
  };

  const sectionClasses = cn(
    styles.section,
    styles.container,
    getSizeClass(),
    getPaddingClass(),
    getBackgroundClass(),
    className
  );

  const content = (
    <Component className={sectionClasses} id={id}>
      {children}
    </Component>
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

// Grid Component
interface GridProps extends ContainerProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 'md',
  responsive = true,
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  as: Component = 'div',
}) => {
  const getColsClass = () => {
    switch (cols) {
      case 1:
        return styles.cols1;
      case 2:
        return styles.cols2;
      case 3:
        return styles.cols3;
      case 4:
        return styles.cols4;
      case 5:
        return styles.cols5;
      case 6:
        return styles.cols6;
      default:
        return styles.cols3;
    }
  };

  const getGapClass = () => {
    switch (gap) {
      case 'sm':
        return styles.gapSm;
      case 'md':
        return styles.gapMd;
      case 'lg':
        return styles.gapLg;
      case 'xl':
        return styles.gapXl;
      default:
        return styles.gapMd;
    }
  };

  const gridClasses = cn(
    styles.grid,
    getColsClass(),
    getGapClass(),
    responsive && styles.responsive,
    className
  );

  const content = (
    <Component className={gridClasses}>
      {children}
    </Component>
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

// Flex Component
interface FlexProps extends ContainerProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Flex: React.FC<FlexProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md',
  className,
  animate = false,
  delay = 0,
  duration = 0.3,
  as: Component = 'div',
}) => {
  const getDirectionClass = () => {
    switch (direction) {
      case 'row':
        return styles.directionRow;
      case 'column':
        return styles.directionColumn;
      case 'row-reverse':
        return styles.directionRowReverse;
      case 'column-reverse':
        return styles.directionColumnReverse;
      default:
        return styles.directionRow;
    }
  };

  const getAlignClass = () => {
    switch (align) {
      case 'start':
        return styles.alignStart;
      case 'center':
        return styles.alignCenter;
      case 'end':
        return styles.alignEnd;
      case 'stretch':
        return styles.alignStretch;
      case 'baseline':
        return styles.alignBaseline;
      default:
        return styles.alignStart;
    }
  };

  const getJustifyClass = () => {
    switch (justify) {
      case 'start':
        return styles.justifyStart;
      case 'center':
        return styles.justifyCenter;
      case 'end':
        return styles.justifyEnd;
      case 'between':
        return styles.justifyBetween;
      case 'around':
        return styles.justifyAround;
      case 'evenly':
        return styles.justifyEvenly;
      default:
        return styles.justifyStart;
    }
  };

  const getGapClass = () => {
    switch (gap) {
      case 'sm':
        return styles.gapSm;
      case 'md':
        return styles.gapMd;
      case 'lg':
        return styles.gapLg;
      case 'xl':
        return styles.gapXl;
      default:
        return styles.gapMd;
    }
  };

  const flexClasses = cn(
    styles.flex,
    getDirectionClass(),
    getAlignClass(),
    getJustifyClass(),
    getGapClass(),
    wrap && styles.wrap,
    className
  );

  const content = (
    <Component className={flexClasses}>
      {children}
    </Component>
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
