"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Progress.module.css"

const progressVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: styles.progressSuccess,
      warning: styles.progressWarning,
      error: styles.progressError,
      info: styles.progressInfo,
      gradient: styles.progressGradient,
    },
    size: {
      sm: styles.progressSm,
      md: styles.progressMd,
      lg: styles.progressLg,
    },
    shape: {
      rounded: "",
      square: styles.progressSquare,
      pill: styles.progressPill,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rounded",
  },
})

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  label?: string
  showValue?: boolean
  showPercentage?: boolean
  animated?: boolean
  striped?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({
  className,
  variant,
  size,
  shape,
  value,
  label,
  showValue,
  showPercentage,
  animated,
  striped,
  ...props
}, ref) => {
  const progressValue = value || 0
  const displayValue = showPercentage ? `${Math.round(progressValue)}%` : progressValue

  return (
    <div className={styles.progressWrapper}>
      {(label || showValue || showPercentage) && (
        <div className={styles.progressHeader}>
          {label && <span className={styles.progressLabel}>{label}</span>}
          {(showValue || showPercentage) && (
            <span className={styles.progressValue}>{displayValue}</span>
          )}
        </div>
      )}
      
      <ProgressPrimitive.Root
        ref={ref}
        data-slot="progress"
        className={cn(
          styles.progress,
          progressVariants({ variant, size, shape }),
          animated && styles.progressAnimated,
          striped && styles.progressStriped,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={styles.progressIndicator}
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
})

Progress.displayName = "Progress"

// Specialized progress variants
export const SuccessProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Omit<ProgressProps, 'variant'>
>(({ ...props }, ref) => (
  <Progress ref={ref} variant="success" {...props} />
))

export const WarningProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Omit<ProgressProps, 'variant'>
>(({ ...props }, ref) => (
  <Progress ref={ref} variant="warning" {...props} />
))

export const ErrorProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Omit<ProgressProps, 'variant'>
>(({ ...props }, ref) => (
  <Progress ref={ref} variant="error" {...props} />
))

export const GradientProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Omit<ProgressProps, 'variant'>
>(({ ...props }, ref) => (
  <Progress ref={ref} variant="gradient" animated striped {...props} />
))

export const CircularProgress = React.forwardRef<
  HTMLDivElement,
  Omit<ProgressProps, 'shape'> & { size?: number }
>(({ value = 0, size = 40, variant = "default", className, ...props }, ref) => {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - ((value || 0) / 100) * circumference

  return (
    <div
      ref={ref}
      className={cn(styles.circularProgress, className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className={styles.circularProgressSvg}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={styles.circularProgressTrack}
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn(
            styles.circularProgressIndicator,
            styles[`circularProgress${variant?.charAt(0).toUpperCase()}${variant?.slice(1)}`]
          )}
          strokeWidth={4}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className={styles.circularProgressValue}>
        {Math.round(value || 0)}%
      </div>
    </div>
  )
})

SuccessProgress.displayName = "SuccessProgress"
WarningProgress.displayName = "WarningProgress"
ErrorProgress.displayName = "ErrorProgress"
GradientProgress.displayName = "GradientProgress"
CircularProgress.displayName = "CircularProgress"

export { Progress, progressVariants }
export type { ProgressProps as EnhancedProgressProps }
