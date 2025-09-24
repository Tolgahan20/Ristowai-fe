"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography, Title, Body, ErrorText, Muted } from "@/components/ui/typography";
import { useForgotPasswordForm } from "@/features/auth/hooks/use-forgot-password-form";
import styles from "./ForgotPasswordForm.module.css";

export interface ForgotPasswordFormProps {
  className?: string;
  showBackToLogin?: boolean;
}

export function ForgotPasswordForm({
  className = "",
  showBackToLogin = true,
}: ForgotPasswordFormProps) {
  const {
    email,
    setEmail,
    error,
    success,
    handleSubmit,
    isLoading,
    goToLogin,
  } = useForgotPasswordForm();

  if (success) {
    return (
      <div className={`${styles.forgotPasswordContainer} ${className}`}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Title align="center" weight="bold">Email Sent!</Title>
          <Body align="center">
            We&apos;ve sent a password reset code to your email address. Please check your inbox and follow the instructions.
          </Body>
          <div className={styles.successLoader}>
            <div className={styles.spinner}></div>
            <Muted>Redirecting to reset page...</Muted>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.forgotPasswordContainer} ${className}`}>
      <div className={styles.formHeader}>
        <Typography variant="h2" weight="semibold">
          Forgot Password
        </Typography>
        <Body color="muted">
          Enter your email address and we&apos;ll send you a code to reset your password
        </Body>
      </div>

      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
        {error && (
          <ErrorText className={styles.errorMessage}>
            {error}
          </ErrorText>
        )}

        <div className={styles.formGroup}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.warningNote}>
          <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <Muted>
            <strong>Note:</strong> If you signed up with Google/Facebook, password reset is not available. Please use social login instead.
          </Muted>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !email}
          isLoading={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>

      {showBackToLogin && (
        <div className={styles.footer}>
          <Body align="center">
            Remember your password?{" "}
            <Button variant="link" asChild>
              <button type="button" onClick={goToLogin}>
                Back to login
              </button>
            </Button>
          </Body>
        </div>
      )}
    </div>
  );
}
