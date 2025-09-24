"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Typography, Title, Body, ErrorText, Muted } from "@/components/ui/typography";
import { useResetPasswordForm } from "@/features/auth/hooks/use-reset-password-form";
import styles from "./ResetPasswordForm.module.css";

export interface ResetPasswordFormProps {
  className?: string;
  showBackToLogin?: boolean;
}

export function ResetPasswordForm({
  className = "",
  showBackToLogin = true,
}: ResetPasswordFormProps) {
  const {
    email,
    setEmail,
    otp,
    setOtp,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    isOtpVerified,
    handleVerifyOtp,
    handleResetPassword,
    goBackToOtp,
    isVerifyingOtp,
    isResettingPassword,
    goToLogin,
    goToForgotPassword,
  } = useResetPasswordForm();

  if (success) {
    return (
      <div className={`${styles.resetPasswordContainer} ${className}`}>
        <div className={styles.successState}>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Title align="center" weight="bold">Password Reset!</Title>
          <Body align="center">
            Your password has been successfully reset. You can now login with your new password.
          </Body>
          <div className={styles.successLoader}>
            <div className={styles.spinner}></div>
            <Muted>Redirecting to login...</Muted>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.resetPasswordContainer} ${className}`}>
      <div className={styles.formHeader}>
        <Typography variant="h2" weight="semibold">
          {isOtpVerified ? "Set New Password" : "Reset Password"}
        </Typography>
        <Body color="muted">
          {isOtpVerified 
            ? "Enter your new password below" 
            : "Enter the verification code sent to your email"
          }
        </Body>
      </div>

      {!isOtpVerified ? (
        // OTP Verification Step
        <form onSubmit={handleVerifyOtp} className={styles.resetPasswordForm}>
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
              disabled={true}
              required
            />
            <Muted className={styles.emailHelp}>
              Email address from your reset request
            </Muted>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              disabled={isVerifyingOtp}
              maxLength={6}
              className={styles.otpInput}
              required
            />
            <Muted className={styles.otpHelp}>
              Check your email for a 6-digit verification code
            </Muted>
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
            disabled={isVerifyingOtp || !email || !otp || otp.length !== 6}
            isLoading={isVerifyingOtp}
          >
            {isVerifyingOtp ? "Verifying..." : "Verify Code"}
          </Button>
        </form>
      ) : (
        // Password Reset Step
        <form onSubmit={handleResetPassword} className={styles.resetPasswordForm}>
          {error && (
            <ErrorText className={styles.errorMessage}>
              {error}
            </ErrorText>
          )}

          <div className={styles.formGroup}>
            <Label htmlFor="newPassword">New Password</Label>
            <PasswordInput
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              disabled={isResettingPassword}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <PasswordInput
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              disabled={isResettingPassword}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="button"
              variant="outline"
              onClick={goBackToOtp}
              className={styles.backButton}
              disabled={isResettingPassword}
            >
              Back to verification
            </Button>

            <Button
              type="submit"
              variant="primary"
              className={styles.submitButton}
              disabled={isResettingPassword || !newPassword || !confirmPassword}
              isLoading={isResettingPassword}
            >
              {isResettingPassword ? "Resetting..." : "Reset Password"}
            </Button>
          </div>
        </form>
      )}

      {showBackToLogin && (
        <div className={styles.footer}>
          <Body className={styles.footerText} align="center">
            {!isOtpVerified ? (
              <>
                Didn&apos;t receive the code?{" "}
                <Button variant="link" asChild>
                  <button type="button" onClick={goToForgotPassword}>
                    Request new code
                  </button>
                </Button>
              </>
            ) : (
              <>
                Remember your password?{" "}
                <Button variant="link" asChild>
                  <button type="button" onClick={goToLogin}>
                    Back to login
                  </button>
                </Button>
              </>
            )}
          </Body>
        </div>
      )}
    </div>
  );
}
