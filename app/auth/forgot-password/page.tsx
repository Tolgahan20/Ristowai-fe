"use client";

import React from "react";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import styles from "./page.module.css";

export default function ForgotPasswordPage() {
  return (
    <div className={styles.forgotPasswordPage}>
      <div className={styles.formContainer}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
