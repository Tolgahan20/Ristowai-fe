"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResendVerification } from "@/features/auth/components/ResendVerification";
import { useVerifyEmailForm } from "@/features/auth/hooks/use-verify-email-form";
import styles from "./page.module.css";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    email,
    setEmail,
    otp,
    setOtp,
    error,
    success,
    handleSubmit,
    resetError,
    isVerifying,
    goToLogin,
  } = useVerifyEmailForm();

  if (!token) {
    return <div>Invalid verification link</div>;
  }

  if (success) {
    return (
      <div className={styles.verifyPage}>
        <div className={styles.formContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className={styles.successTitle}>Email Verified!</h1>
            <p className={styles.successMessage}>
              Your email has been successfully verified. You will be redirected to the login page shortly.
            </p>
            <div className={styles.successLoader}>
              <div className={styles.spinner}></div>
              <span>Redirecting...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.verifyPage}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Verify Your Email</h2>
          <p className={styles.formSubtitle}>
            Enter the 6-digit verification code sent to your email address
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.verifyForm}>
          {error && (
            <div className={styles.errorMessage}>
              <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={isVerifying}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              disabled={isVerifying}
              maxLength={6}
              className={styles.otpInput}
              required
            />
            <p className={styles.otpHelp}>
              Check your email for a 6-digit verification code
            </p>
          </div>

          <Button
            type="submit"
            className={styles.submitButton}
            disabled={isVerifying || !email || !otp || otp.length !== 6}
          >
            {isVerifying ? (
              <>
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>
        </form>

        {email && (
          <ResendVerification 
            email={email}
            onSuccess={resetError}
          />
        )}

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Already verified?{" "}
            <button
              type="button"
              onClick={goToLogin}
              className={styles.footerLink}
            >
              Go to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
