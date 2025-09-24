"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Switch.module.css"

const switchVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: styles.switchSuccess,
      warning: styles.switchWarning,
      error: styles.switchError,
      info: styles.switchInfo,
    },
    size: {
      sm: styles.switchSm,
      md: styles.switchMd,
      lg: styles.switchLg,
    },
    style: {
      default: "",
      iOS: styles.switchIOS,
      material: styles.switchMaterial,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    style: "default",
  },
})

export interface SwitchProps
  extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'style'>,
    VariantProps<typeof switchVariants> {
  label?: string
  description?: string
  error?: string
  showLabels?: boolean
  onLabel?: string
  offLabel?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({
  className,
  variant,
  size,
  style: switchStyle,
  label,
  description,
  error,
  showLabels,
  onLabel = "On",
  offLabel = "Off",
  checked,
  ...props
}, ref) => {
  return (
    <div className={styles.switchWrapper}>
      {label && (
        <label className={cn(styles.switchLabel, error && styles.switchLabelError)}>
          {label}
          {props.required && <span className={styles.switchRequired}>*</span>}
        </label>
      )}
      
      <div className={styles.switchContainer}>
        {showLabels && (
          <span className={cn(styles.switchStateLabel, !checked && styles.switchStateLabelActive)}>
            {offLabel}
          </span>
        )}
        
        <SwitchPrimitive.Root
          ref={ref}
          data-slot="switch"
          checked={checked}
          className={cn(
            styles.switch,
            switchVariants({ variant, size, style: switchStyle }),
            className
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            data-slot="switch-thumb"
            className={styles.switchThumb}
          />
        </SwitchPrimitive.Root>
        
        {showLabels && (
          <span className={cn(styles.switchStateLabel, checked && styles.switchStateLabelActive)}>
            {onLabel}
          </span>
        )}
      </div>
      
      {description && !error && (
        <p className={styles.switchDescription}>{description}</p>
      )}
      
      {error && (
        <p className={styles.switchErrorMessage}>{error}</p>
      )}
    </div>
  )
})

Switch.displayName = "Switch"

// Specialized switch variants
export const SuccessSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'variant'>
>(({ ...props }, ref) => (
  <Switch ref={ref} variant="success" {...props} />
))

export const WarningSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'variant'>
>(({ ...props }, ref) => (
  <Switch ref={ref} variant="warning" {...props} />
))

export const ErrorSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'variant'>
>(({ ...props }, ref) => (
  <Switch ref={ref} variant="error" {...props} />
))

export const IOSSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'style'>
>(({ ...props }, ref) => (
  <Switch ref={ref} style="iOS" {...props} />
))

export const MaterialSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'style'>
>(({ ...props }, ref) => (
  <Switch ref={ref} style="material" {...props} />
))

export const LabeledSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  Omit<SwitchProps, 'showLabels'>
>(({ ...props }, ref) => (
  <Switch ref={ref} showLabels {...props} />
))

SuccessSwitch.displayName = "SuccessSwitch"
WarningSwitch.displayName = "WarningSwitch"
ErrorSwitch.displayName = "ErrorSwitch"
IOSSwitch.displayName = "IOSSwitch"
MaterialSwitch.displayName = "MaterialSwitch"
LabeledSwitch.displayName = "LabeledSwitch"

export { Switch, switchVariants }
export type { SwitchProps as EnhancedSwitchProps }
