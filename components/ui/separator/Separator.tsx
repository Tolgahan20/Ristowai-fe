"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Separator.module.css"

const separatorVariants = cva("", {
  variants: {
    variant: {
      default: "",
      dashed: styles.separatorDashed,
      dotted: styles.separatorDotted,
      gradient: styles.separatorGradient,
      thick: styles.separatorThick,
    },
    spacing: {
      none: styles.separatorSpacingNone,
      sm: styles.separatorSpacingSm,
      md: styles.separatorSpacingMd,
      lg: styles.separatorSpacingLg,
      xl: styles.separatorSpacingXl,
    },
    color: {
      default: "",
      muted: styles.separatorMuted,
      accent: styles.separatorAccent,
      brand: styles.separatorBrand,
    }
  },
  defaultVariants: {
    variant: "default",
    spacing: "md",
    color: "default",
  },
})

export interface SeparatorProps
  extends Omit<React.ComponentProps<typeof SeparatorPrimitive.Root>, 'color'>,
    VariantProps<typeof separatorVariants> {
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  spacing,
  color,
  label,
  labelPosition = "center",
  ...props
}, ref) => {
  if (label) {
    return (
      <div
        className={cn(
          styles.separatorWithLabel,
          styles[`separatorWithLabel${orientation?.charAt(0).toUpperCase()}${orientation?.slice(1)}`],
          separatorVariants({ variant, spacing, color })
        )}
      >
        <SeparatorPrimitive.Root
          ref={ref}
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn(
            styles.separator,
            styles[`separator${orientation?.charAt(0).toUpperCase()}${orientation?.slice(1)}`],
            className
          )}
          {...props}
        />
        <span 
          className={cn(
            styles.separatorLabel,
            styles[`separatorLabel${labelPosition?.charAt(0).toUpperCase()}${labelPosition?.slice(1)}`]
          )}
        >
          {label}
        </span>
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        styles.separator,
        styles[`separator${orientation?.charAt(0).toUpperCase()}${orientation?.slice(1)}`],
        separatorVariants({ variant, spacing, color }),
        className
      )}
      {...props}
    />
  )
})

Separator.displayName = "Separator"

// Specialized separator variants
export const DashedSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, 'variant'>
>(({ ...props }, ref) => (
  <Separator ref={ref} variant="dashed" {...props} />
))

export const DottedSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, 'variant'>
>(({ ...props }, ref) => (
  <Separator ref={ref} variant="dotted" {...props} />
))

export const GradientSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, 'variant'>
>(({ ...props }, ref) => (
  <Separator ref={ref} variant="gradient" {...props} />
))

export const ThickSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<SeparatorProps, 'variant'>
>(({ ...props }, ref) => (
  <Separator ref={ref} variant="thick" {...props} />
))

export const LabeledSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps & { children: React.ReactNode }
>(({ children, ...props }, ref) => (
  <Separator ref={ref} label={children as string} {...props} />
))

DashedSeparator.displayName = "DashedSeparator"
DottedSeparator.displayName = "DottedSeparator"
GradientSeparator.displayName = "GradientSeparator"
ThickSeparator.displayName = "ThickSeparator"
LabeledSeparator.displayName = "LabeledSeparator"

export { Separator, separatorVariants }
export type { SeparatorProps as EnhancedSeparatorProps }
