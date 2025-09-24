"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckIcon, MinusIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Checkbox.module.css"

const checkboxVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: styles.checkboxSuccess,
      warning: styles.checkboxWarning,
      error: styles.checkboxError,
      info: styles.checkboxInfo,
    },
    size: {
      sm: styles.checkboxSm,
      md: styles.checkboxMd,
      lg: styles.checkboxLg,
    },
    shape: {
      square: "",
      rounded: styles.checkboxRounded,
      circle: styles.checkboxCircle,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "square",
  },
})

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({
  className,
  variant,
  size,
  shape,
  label,
  description,
  error,
  indeterminate,
  checked,
  ...props
}, ref) => {
  const actualVariant = error ? "error" : variant

  return (
    <div className={styles.checkboxWrapper}>
      <div className={styles.checkboxContainer}>
        <CheckboxPrimitive.Root
          ref={ref}
          data-slot="checkbox"
          checked={indeterminate ? "indeterminate" : checked}
          className={cn(
            styles.checkbox,
            checkboxVariants({ variant: actualVariant, size, shape }),
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className={styles.checkboxIndicator}
          >
            {indeterminate ? (
              <MinusIcon className={styles.checkboxIcon} />
            ) : (
              <CheckIcon className={styles.checkboxIcon} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        {(label || description || error) && (
          <div className={styles.checkboxContent}>
            {label && (
              <label 
                className={cn(styles.checkboxLabel, error && styles.checkboxLabelError)}
                onClick={() => {
                  const checkbox = ref as React.RefObject<HTMLButtonElement>
                  checkbox.current?.click()
                }}
              >
                {label}
                {props.required && <span className={styles.checkboxRequired}>*</span>}
              </label>
            )}
            
            {description && !error && (
              <p className={styles.checkboxDescription}>{description}</p>
            )}
            
            {error && (
              <p className={styles.checkboxError}>
                <AlertCircle className={styles.checkboxErrorIcon} />
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

Checkbox.displayName = "Checkbox"

// Specialized checkbox variants
export const SuccessCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<CheckboxProps, 'variant'>
>(({ ...props }, ref) => (
  <Checkbox ref={ref} variant="success" {...props} />
))

export const WarningCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<CheckboxProps, 'variant'>
>(({ ...props }, ref) => (
  <Checkbox ref={ref} variant="warning" {...props} />
))

export const ErrorCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<CheckboxProps, 'variant'>
>(({ ...props }, ref) => (
  <Checkbox ref={ref} variant="error" {...props} />
))

export const IndeterminateCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<CheckboxProps, 'indeterminate'>
>(({ ...props }, ref) => (
  <Checkbox ref={ref} indeterminate {...props} />
))

export const CircleCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<CheckboxProps, 'shape'>
>(({ ...props }, ref) => (
  <Checkbox ref={ref} shape="circle" {...props} />
))

export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical'
    spacing?: 'sm' | 'md' | 'lg'
  }
>(({ className, orientation = "vertical", spacing = "md", children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      styles.checkboxGroup,
      styles[`checkboxGroup${orientation?.charAt(0).toUpperCase()}${orientation?.slice(1)}`],
      styles[`checkboxGroupSpacing${spacing?.charAt(0).toUpperCase()}${spacing?.slice(1)}`],
      className
    )}
    role="group"
    {...props}
  >
    {children}
  </div>
))

SuccessCheckbox.displayName = "SuccessCheckbox"
WarningCheckbox.displayName = "WarningCheckbox"
ErrorCheckbox.displayName = "ErrorCheckbox"
IndeterminateCheckbox.displayName = "IndeterminateCheckbox"
CircleCheckbox.displayName = "CircleCheckbox"
CheckboxGroup.displayName = "CheckboxGroup"

export { Checkbox, checkboxVariants }
export type { CheckboxProps as EnhancedCheckboxProps }
