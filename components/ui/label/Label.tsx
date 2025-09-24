"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Label.module.css"

const labelVariants = cva("", {
  variants: {
    variant: {
      default: "",
      error: styles.labelError,
      success: styles.labelSuccess,
      warning: styles.labelWarning,
      muted: styles.labelMuted,
    },
    size: {
      xs: styles.labelXs,
      sm: styles.labelSm,
      md: styles.labelMd,
      lg: styles.labelLg,
    },
    weight: {
      normal: styles.labelWeightNormal,
      medium: styles.labelWeightMedium,
      semibold: styles.labelWeightSemibold,
      bold: styles.labelWeightBold,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "medium",
  },
})

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  required?: boolean
  optional?: boolean
  tooltip?: string
  description?: string
  icon?: React.ReactNode
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({
  className,
  variant,
  size,
  weight,
  required,
  optional,
  tooltip,
  description,
  icon,
  children,
  ...props
}, ref) => {
  return (
    <div className={styles.labelWrapper}>
      <LabelPrimitive.Root
        ref={ref}
        data-slot="label"
        className={cn(
          styles.label,
          labelVariants({ variant, size, weight }),
          className
        )}
        {...props}
      >
        {icon && (
          <span className={styles.labelIcon}>
            {icon}
          </span>
        )}
        
        <span className={styles.labelText}>
          {children}
        </span>
        
        {required && (
          <span className={styles.labelRequired} aria-label="Required field">
            *
          </span>
        )}
        
        {optional && (
          <span className={styles.labelOptional} aria-label="Optional field">
            (optional)
          </span>
        )}
        
        {tooltip && (
          <button
            type="button"
            className={styles.labelTooltipTrigger}
            aria-label="More information"
            title={tooltip}
          >
            <HelpCircle className={styles.labelTooltipIcon} />
          </button>
        )}
      </LabelPrimitive.Root>
      
      {description && (
        <p className={styles.labelDescription}>
          {description}
        </p>
      )}
    </div>
  )
})

Label.displayName = "Label"

// Specialized label variants
export const ErrorLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  Omit<LabelProps, 'variant' | 'icon'>
>(({ children, ...props }, ref) => (
  <Label
    ref={ref}
    variant="error"
    icon={<AlertCircle />}
    {...props}
  >
    {children}
  </Label>
))

export const InfoLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  Omit<LabelProps, 'variant' | 'icon'>
>(({ children, ...props }, ref) => (
  <Label
    ref={ref}
    variant="default"
    icon={<Info />}
    {...props}
  >
    {children}
  </Label>
))

export const RequiredLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  Omit<LabelProps, 'required'>
>(({ children, ...props }, ref) => (
  <Label
    ref={ref}
    required
    {...props}
  >
    {children}
  </Label>
))

export const OptionalLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  Omit<LabelProps, 'optional'>
>(({ children, ...props }, ref) => (
  <Label
    ref={ref}
    optional
    {...props}
  >
    {children}
  </Label>
))

ErrorLabel.displayName = "ErrorLabel"
InfoLabel.displayName = "InfoLabel"
RequiredLabel.displayName = "RequiredLabel"
OptionalLabel.displayName = "OptionalLabel"

export { Label, labelVariants }
export type { LabelProps as EnhancedLabelProps }
