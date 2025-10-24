"use client";

import React from 'react';
import { RegisterForm } from '@/features/auth/components/RegisterForm/RegisterForm';
import { Typography, Title, Body } from '@/components/ui/typography';
import styles from './page.module.css';

export default function RegisterPage() {
  return (
    <div className={styles.registerPage}>
      {/* Left Panel - Simple Brand */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Title 
            color="white"
          >
            Turni AI
          </Title>
          <Body 
            size="large"
            color="white"
          >
            Join thousands of restaurants optimizing their operations with AI-powered scheduling
          </Body>
        </div>
      </div>

      {/* Right Panel - Clean Form */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <Typography 
              variant="h2" 
              weight="semibold"
            >
              Create account
            </Typography>
            <Body 
              color="muted"
            >
              Start your journey with Ristowai
            </Body>
          </div>

          <RegisterForm 
            showSocialLogin={true}
            showLoginLink={true}
          />
        </div>
      </div>
    </div>
  );
}
