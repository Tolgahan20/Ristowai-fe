"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorText, Body, Muted } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { useLoginForm } from "../../hooks/use-login-form";
import { ResendVerification } from "../ResendVerification";
import { SocialLogin } from "../SocialLogin";
import styles from "./LoginForm.module.css";

export interface LoginFormProps {
  onForgotPassword?: () => void;
  showSocialLogin?: boolean;
  showRegisterLink?: boolean;
}

export function LoginForm({
  onForgotPassword,
  showSocialLogin = true,
  showRegisterLink = true,
}: LoginFormProps) {
  const [socialError, setSocialError] = useState("");
  
  const {
    formData,
    errors,
    isLoading,
    isSubmitting,
    showResendVerification,
    handleInputChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>

      {errors.general && (
        <div className={styles.errorMessage}>
          <AlertCircle className={styles.errorIcon} />
          <ErrorText>{errors.general}</ErrorText>
        </div>
      )}

      {socialError && (
        <div className={styles.errorMessage}>
          <AlertCircle className={styles.errorIcon} />
          <ErrorText>{socialError}</ErrorText>
        </div>
      )}

      <div className={styles.formGroup}>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email"
          disabled={isSubmitting}
          autoComplete="email"
          autoFocus
          variant={errors.email ? "error" : "default"}
          error={errors.email}
        />
      </div>

      <div className={styles.formGroup}>
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          placeholder="Enter your password"
          disabled={isSubmitting}
          autoComplete="current-password"
          variant={errors.password ? "error" : "default"}
          error={errors.password}
        />
      </div>


      <div className={styles.forgotPassword}>
        {onForgotPassword ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onForgotPassword}
            disabled={isSubmitting}
            className={styles.forgotPasswordLink}
          >
            Forgot your password?
          </Button>
        ) : (
          <Button
            asChild
            variant="link"
            size="sm"
            className={styles.forgotPasswordLink}
          >
            <Link href="/auth/forgot-password">
              Forgot your password?
            </Link>
          </Button>
        )}
      </div>

      {/* Show resend verification if user has unverified email */}
      {showResendVerification && (
        <ResendVerification 
          email={formData.email}
          redirectToVerification={true}
          onSuccess={() => {
            console.log('Verification email resent successfully');
          }}
        />
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className={styles.submitButton}
        disabled={isSubmitting || isLoading}
        isLoading={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {showSocialLogin && (
        <>
          <Separator 
            label="Or continue with" 
            className={styles.divider}
          />

          <SocialLogin 
            onError={(error) => setSocialError(error)}
          />
        </>
      )}

      {showRegisterLink && (
        <div className={styles.footer}>
          <Body className={styles.footerText} color="muted" align="center">
            Don&apos;t have an account?{" "}
            <Button asChild variant="link" size="sm">
              <Link href="/auth/register">
                Sign up for free
              </Link>
            </Button>
          </Body>
        </div>
      )}
    </form>
  );
}
