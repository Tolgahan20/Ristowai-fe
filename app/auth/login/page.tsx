"use client";

import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';
import { Typography, Title, Body } from '@/components/ui/typography';
import styles from './page.module.css';



export default function LoginPage() {
  return (
    <div className={styles.loginPage}>
      {/* Left Panel - Simple Brand */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Title 
            color="white"
          >
            Smart Shifts
          </Title>
          <Body 
            size="large"
            color="white"
          >
            Streamline your restaurant operations with AI-powered scheduling
          </Body>
        </div>
      </div>

      {/* Right Panel - Clean Form */}
      <div className={styles.formPanel}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <Typography 
              variant="h2" 
              className={styles.formTitle}
              weight="semibold"
            >
              Sign in
            </Typography>
            <Body 
              className={styles.formSubtitle}
              color="muted"
            >
              Welcome back to your account
            </Body>
          </div>

          <LoginForm 
            showSocialLogin={true}
            showRegisterLink={true}
          />
        </div>
      </div>
    </div>
  );
}
