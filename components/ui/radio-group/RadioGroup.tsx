"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cva, type VariantProps } from "class-variance-authority"
import { CircleIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./RadioGroup.module.css"

const radioGroupVariants = cva("", {
  variants: {
    orientation: {
      vertical: styles.radioGroupVertical,
      horizontal: styles.radioGroupHorizontal,
    },
    spacing: {
      sm: styles.radioGroupSpacingSm,
      md: styles.radioGroupSpacingMd,
      lg: styles.radioGroupSpacingLg,
    },
    variant: {
      default: "",
      card: styles.radioGroupCard,
      button: styles.radioGroupButton,
    }
  },
  defaultVariants: {
    orientation: "vertical",
    spacing: "md",
    variant: "default",
  },
})

const radioGroupItemVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: styles.radioGroupItemSuccess,
      warning: styles.radioGroupItemWarning,
      error: styles.radioGroupItemError,
      info: styles.radioGroupItemInfo,
    },
    size: {
      sm: styles.radioGroupItemSm,
      md: styles.radioGroupItemMd,
      lg: styles.radioGroupItemLg,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface RadioGroupProps
  extends Omit<React.ComponentProps<typeof RadioGroupPrimitive.Root>, 'orientation'>,
    VariantProps<typeof radioGroupVariants> {
  label?: string
  description?: string
  error?: string
}

export interface RadioGroupItemProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioGroupItemVariants> {
  label?: string
  description?: string
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({
  className,
  orientation,
  spacing,
  variant,
  label,
  description,
  error,
  children,
  ...props
}, ref) => {
  return (
    <div className={styles.radioGroupWrapper}>
      {(label || description) && (
        <div className={styles.radioGroupHeader}>
          {label && (
            <label className={cn(styles.radioGroupLabel, error && styles.radioGroupLabelError)}>
              {label}
              {props.required && <span className={styles.radioGroupRequired}>*</span>}
            </label>
          )}
          {description && !error && (
            <p className={styles.radioGroupDescription}>{description}</p>
          )}
        </div>
      )}
      
      <RadioGroupPrimitive.Root
        ref={ref}
        data-slot="radio-group"
        className={cn(
          styles.radioGroup,
          radioGroupVariants({ orientation, spacing, variant }),
          className
        )}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
      
      {error && (
        <p className={styles.radioGroupError}>
          <AlertCircle className={styles.radioGroupErrorIcon} />
          {error}
        </p>
      )}
    </div>
  )
})

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({
  className,
  variant,
  size,
  label,
  description,
  children,
  ...props
}, ref) => {
  if (label || description) {
    return (
      <div className={styles.radioGroupItemWrapper}>
        <RadioGroupPrimitive.Item
          ref={ref}
          data-slot="radio-group-item"
          className={cn(
            styles.radioGroupItem,
            radioGroupItemVariants({ variant, size }),
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator
            data-slot="radio-group-indicator"
            className={styles.radioGroupIndicator}
          >
            <CircleIcon className={styles.radioGroupIcon} />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        
        {(label || description) && (
          <div className={styles.radioGroupItemContent}>
            {label && (
              <label 
                className={styles.radioGroupItemLabel}
                onClick={() => {
                  const radio = ref as React.RefObject<HTMLButtonElement>
                  radio.current?.click()
                }}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={styles.radioGroupItemDescription}>{description}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        styles.radioGroupItem,
        radioGroupItemVariants({ variant, size }),
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className={styles.radioGroupIndicator}
      >
        <CircleIcon className={styles.radioGroupIcon} />
      </RadioGroupPrimitive.Indicator>
      {children}
    </RadioGroupPrimitive.Item>
  )
})

RadioGroup.displayName = "RadioGroup"
RadioGroupItem.displayName = "RadioGroupItem"

// Specialized radio group variants
export const HorizontalRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  Omit<RadioGroupProps, 'orientation'>
>(({ ...props }, ref) => (
  <RadioGroup ref={ref} orientation="horizontal" {...props} />
))

export const CardRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  Omit<RadioGroupProps, 'variant'>
>(({ ...props }, ref) => (
  <RadioGroup ref={ref} variant="card" {...props} />
))

export const ButtonRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  Omit<RadioGroupProps, 'variant'>
>(({ ...props }, ref) => (
  <RadioGroup ref={ref} variant="button" {...props} />
))

HorizontalRadioGroup.displayName = "HorizontalRadioGroup"
CardRadioGroup.displayName = "CardRadioGroup"
ButtonRadioGroup.displayName = "ButtonRadioGroup"

export { RadioGroup, RadioGroupItem, radioGroupVariants, radioGroupItemVariants }
export type { RadioGroupProps as EnhancedRadioGroupProps, RadioGroupItemProps as EnhancedRadioGroupItemProps }
