"use client";

import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Heading, Body, Caption } from '@/components/ui/typography';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { PrimaryButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import styles from './SetupCard.module.css';

export interface SetupCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple';
  estimatedTime: string;
  isCompleted: boolean;
  isStarting?: boolean;
  onStartFlow: () => void;
}

export function SetupCard({
  title,
  description,
  icon: Icon,
  color,
  estimatedTime,
  isCompleted,
  isStarting = false,
  onStartFlow,
}: SetupCardProps) {
  return (
    <Card variant="ghost" className={styles.setupCard}>
      <CardHeader className={styles.setupCardHeader}>
        <div className={`${styles.setupCardIcon} ${styles[`setupCardIcon--${color}`]}`}>
          <Icon size={20} />
        </div>
      </CardHeader>

      <CardContent className={styles.setupCardContent}>
        <Heading level={5} weight="semibold" className={styles.setupCardTitle}>
          {title}
        </Heading>
        <Body size="small" className={styles.setupCardDescription}>
          {description}
        </Body>
      </CardContent>

      <CardFooter className={styles.setupCardFooter}>
        <Body size="small" className={styles.setupCardTime}>~{estimatedTime}</Body>
        {isCompleted ? (
          <Badge variant="success" className={styles.completedBadge}>
            Completed
          </Badge>
        ) : (
          <PrimaryButton
            onClick={onStartFlow}
            disabled={isStarting}
            size="sm"
            className={styles.setupCardButton}
          >
            <span className={styles.buttonContent}>
              <span>{isStarting ? 'Starting...' : 'Start Setup'}</span>
              {!isStarting && <ArrowRight size={14} className={styles.buttonIcon} />}
            </span>
          </PrimaryButton>
        )}
      </CardFooter>
    </Card>
  );
}
