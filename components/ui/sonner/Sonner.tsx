"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps as SonnerToasterProps, toast } from "sonner"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Sonner.module.css"

const toasterVariants = cva("", {
  variants: {
    position: {
      "top-left": styles.toasterTopLeft,
      "top-center": styles.toasterTopCenter,
      "top-right": styles.toasterTopRight,
      "bottom-left": styles.toasterBottomLeft,
      "bottom-center": styles.toasterBottomCenter,
      "bottom-right": styles.toasterBottomRight,
    },
    variant: {
      default: "",
      rich: styles.toasterRich,
      minimal: styles.toasterMinimal,
      compact: styles.toasterCompact,
    }
  },
  defaultVariants: {
    position: "bottom-right",
    variant: "default",
  },
})

export interface ToasterProps extends Omit<SonnerToasterProps, 'position'>, VariantProps<typeof toasterVariants> {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}

const Toaster = React.forwardRef<
  HTMLDivElement,
  ToasterProps
>(({ className, position = "bottom-right", variant, ...props }, ref) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      ref={ref}
      theme={theme as SonnerToasterProps["theme"]}
      className={cn(
        styles.toaster,
        toasterVariants({ position, variant }),
        className
      )}
      position={position}
      style={
        {
          "--normal-bg": "var(--surface-primary)",
          "--normal-text": "var(--text-primary)",
          "--normal-border": "var(--border-medium)",
          "--success-bg": "var(--success)",
          "--success-text": "white",
          "--error-bg": "var(--error)",
          "--error-text": "white",
          "--warning-bg": "var(--warning)",
          "--warning-text": "white",
          "--info-bg": "var(--info)",
          "--info-text": "white",
        } as React.CSSProperties
      }
      {...props}
    />
  )
})

Toaster.displayName = "Toaster"

// Enhanced toast functions with variants
export const showToast = {
  success: (message: string, options?: Parameters<typeof toast.success>[1]) =>
    toast.success(message, { className: styles.toastSuccess, ...options }),
  
  error: (message: string, options?: Parameters<typeof toast.error>[1]) =>
    toast.error(message, { className: styles.toastError, ...options }),
  
  warning: (message: string, options?: Parameters<typeof toast>[1]) =>
    toast(message, { className: styles.toastWarning, ...options }),
  
  info: (message: string, options?: Parameters<typeof toast>[1]) =>
    toast(message, { className: styles.toastInfo, ...options }),
  
  loading: (message: string, options?: Parameters<typeof toast.loading>[1]) =>
    toast.loading(message, { className: styles.toastLoading, ...options }),
  
  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading?: string
      success?: string | ((data: T) => string)
      error?: string | ((error: unknown) => string)
    }
  ) =>
    toast.promise(promise, msgs),
  
  custom: (jsx: React.ReactNode, options?: Parameters<typeof toast>[1]) =>
    toast(jsx, { className: styles.toastCustom, ...options }),
}

// Specialized toaster variants
export const RichToaster = React.forwardRef<
  HTMLDivElement,
  Omit<ToasterProps, 'variant'>
>(({ ...props }, ref) => (
  <Toaster ref={ref} variant="rich" {...props} />
))

export const MinimalToaster = React.forwardRef<
  HTMLDivElement,
  Omit<ToasterProps, 'variant'>
>(({ ...props }, ref) => (
  <Toaster ref={ref} variant="minimal" {...props} />
))

export const CompactToaster = React.forwardRef<
  HTMLDivElement,
  Omit<ToasterProps, 'variant'>
>(({ ...props }, ref) => (
  <Toaster ref={ref} variant="compact" {...props} />
))

RichToaster.displayName = "RichToaster"
MinimalToaster.displayName = "MinimalToaster"
CompactToaster.displayName = "CompactToaster"

export { Toaster, toasterVariants }
export type { ToasterProps as EnhancedToasterProps }
