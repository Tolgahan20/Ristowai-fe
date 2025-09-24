"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    return <div>Invalid password reset link</div>;
  }

  // You can add more logic here to handle the password reset using the token

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset your password</h1>
      <form className={styles.form}>
        <input
          type="password"
          name="new-password"
          placeholder="Enter your new password"
          className={styles.input}
          required
        />
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm your new password"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}