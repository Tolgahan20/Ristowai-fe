"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { siGoogle, siFacebook } from "simple-icons";
import { useSocialLogin } from "../../hooks/use-social-login";
import styles from "./SocialLogin.module.css";

export interface SocialLoginProps {
  className?: string;
  onError?: (error: string) => void;
}

export function SocialLogin({ className, onError }: SocialLoginProps) {
  const {
    isLoading,
    error,
    loginWithGoogle,
    loginWithFacebook,
  } = useSocialLogin();

  // Handle error callbacks
  useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);


  return (
    <div className={`${styles.socialLogin} ${className || ''}`}>
      <div className={styles.socialButtons}>
        <Button
          variant="outline"
          className={styles.socialButton}
          type="button"
          onClick={loginWithGoogle}
          disabled={isLoading}
          leftIcon={
            <svg
              className={styles.socialIcon}
              fill={`#${siGoogle.hex}`}
              viewBox="0 0 24 24"
            >
              <path d={siGoogle.path} />
            </svg>
          }
        >
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className={styles.socialButton}
          type="button"
          onClick={loginWithFacebook}
          disabled={isLoading}
          leftIcon={
            <svg
              className={styles.socialIcon}
              fill={`#${siFacebook.hex}`}
              viewBox="0 0 24 24"
            >
              <path d={siFacebook.path} />
            </svg>
          }
        >
          Continue with Facebook
        </Button>
      </div>
    </div>
  );
}
