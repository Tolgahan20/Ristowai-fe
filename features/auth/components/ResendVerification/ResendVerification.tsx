"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResendVerification } from "../../hooks/use-auth";
import styles from "./ResendVerification.module.css";

export interface ResendVerificationProps {
  email: string;
  onSuccess?: () => void;
  className?: string;
  redirectToVerification?: boolean;
}

export function ResendVerification({ 
  email, 
  onSuccess,
  className,
  redirectToVerification = false
}: ResendVerificationProps) {
  const [isResent, setIsResent] = useState(false);
  const resendMutation = useResendVerification();
  const router = useRouter();

  const handleResend = async () => {
    try {
      await resendMutation.mutateAsync(email);
      setIsResent(true);
      onSuccess?.();
      
      // If redirectToVerification is true, redirect to verification page after a short delay
      if (redirectToVerification) {
        setTimeout(() => {
          const encodedEmail = encodeURIComponent(email);
          router.push(`/auth/verify-email?email=${encodedEmail}`);
        }, 2000); // 2 second delay to show success message
      } else {
        // Reset the "sent" state after 30 seconds
        setTimeout(() => setIsResent(false), 30000);
      }
    } catch (error) {
      console.error('Failed to resend verification:', error);
    }
  };

  if (isResent) {
    return (
      <div className={`${styles.resendContainer} ${className || ''}`}>
        <div className={styles.successMessage}>
          <svg className={styles.successIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Verification email sent! {redirectToVerification ? 'Redirecting to verification page...' : 'Check your inbox.'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.resendContainer} ${className || ''}`}>
      <p className={styles.resendText}>
        Didn&apos;t receive the verification email?
      </p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleResend}
        disabled={resendMutation.isPending}
        className={styles.resendButton}
      >
        {resendMutation.isPending ? (
          <>
            <svg className={styles.spinner} viewBox="0 0 24 24">
              <circle
                className={styles.spinnerCircle}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            Sending...
          </>
        ) : (
          'Resend verification email'
        )}
      </Button>
    </div>
  );
}
