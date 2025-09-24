"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ErrorText, Body } from "@/components/ui/typography";
import { useRegisterForm } from "../../hooks/use-register-form";
import { SocialLogin } from "../SocialLogin";
import styles from "./RegisterForm.module.css";

export interface RegisterFormProps {
  showSocialLogin?: boolean;
  showLoginLink?: boolean;
}

export function RegisterForm({
  showSocialLogin = true,
  showLoginLink = true,
}: RegisterFormProps) {
  const [socialError, setSocialError] = useState("");
  
  const {
    formData,
    errors,
    isLoading,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useRegisterForm();

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = formData.password;
    if (!password) return { strength: 0, text: "" };

    let score = 0;
    const checks = [
      password.length >= 8,
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^a-zA-Z\d]/.test(password),
    ];

    score = checks.filter(Boolean).length;

    if (score <= 1) return { strength: 1, text: "Weak", color: "strengthWeak" };
    if (score === 2) return { strength: 2, text: "Fair", color: "strengthFair" };
    if (score === 3) return { strength: 3, text: "Good", color: "strengthGood" };
    if (score >= 4) return { strength: 4, text: "Strong", color: "strengthStrong" };

    return { strength: 0, text: "", color: "" };
  }, [formData.password]);

  return (
    <div className={styles.registerContainer}>
      {showSocialLogin && (
        <>
          <SocialLogin 
            onError={(error) => setSocialError(error)}
          />

          <Separator 
            label="Or create account with email"
            labelPosition="center"
          />
        </>
      )}

      <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
        {errors.general && (
          <ErrorText className={styles.errorMessage}>
            {errors.general}
          </ErrorText>
        )}

        {socialError && (
          <ErrorText className={styles.errorMessage}>
            {socialError}
          </ErrorText>
        )}

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="firstName">First name <span className={styles.required}>*</span></Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            disabled={isSubmitting}
            autoComplete="given-name"
            autoFocus
          />
          {errors.firstName && (
            <ErrorText>{errors.firstName}</ErrorText>
          )}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="lastName">Last name <span className={styles.required}>*</span></Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            disabled={isSubmitting}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <ErrorText>{errors.lastName}</ErrorText>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="email">Email address <span className={styles.required}>*</span></Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
            disabled={isSubmitting}
            autoComplete="email"
          />
          {errors.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="phone">Phone number (optional)</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Phone number"
            disabled={isSubmitting}
            autoComplete="tel"
          />
          {errors.phone && (
            <ErrorText>{errors.phone}</ErrorText>
          )}
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="password">Password <span className={styles.required}>*</span></Label>
          <PasswordInput
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create a strong password"
            disabled={isSubmitting}
            autoComplete="new-password"
          />
          {errors.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="confirmPassword">Confirm password <span className={styles.required}>*</span></Label>
          <PasswordInput
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
            disabled={isSubmitting}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
        </div>
      </div>

      {formData.password && (
        <div className={styles.passwordStrength}>
          <div className={styles.strengthBar}>
            <div
              className={`${styles.strengthProgress} ${
                styles[passwordStrength.color || ""]
              }`}
            />
          </div>
          <div className={styles.strengthText}>
            Password strength: {passwordStrength.text}
          </div>
        </div>
      )}

      <div className={styles.checkboxGroup}>
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked)}
          disabled={isSubmitting}
        >
          <>
            I agree to the{" "}
            <Link href="/terms" className={styles.termsLink}>
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className={styles.termsLink}>
              Privacy Policy
            </Link>
            <span className={styles.checkboxRequired}> *</span>
          </>
        </Checkbox>
      </div>
      {errors.acceptTerms && (
        <ErrorText>{errors.acceptTerms}</ErrorText>
      )}

      <div className={styles.checkboxGroup}>
        <Checkbox
          id="acceptMarketing"
          checked={formData.acceptMarketing}
          onCheckedChange={(checked) =>
            handleInputChange("acceptMarketing", checked)
          }
          disabled={isSubmitting}
          label="I would like to receive marketing emails about new features and updates"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className={styles.submitButton}
        disabled={isSubmitting || isLoading}
        isLoading={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? "Creating account..." : "Create account"}
      </Button>

      </form>

      {showLoginLink && (
        <div className={styles.footer}>
          <Body className={styles.footerText} align="center">
            Already have an account?{" "}
            <Button variant="link" asChild>
              <Link href="/auth/login">
                Sign in here
              </Link>
            </Button>
          </Body>
        </div>
      )}
    </div>
  );
}

