"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Typography.module.css"

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      h6: styles.h6,
      body: styles.body,
      large: styles.large,
      small: styles.small,
      muted: styles.muted,
      lead: styles.lead,
      blockquote: styles.blockquote,
      code: styles.code,
      kbd: styles.kbd,
      caption: styles.caption,
      overline: styles.overline,
      subtitle1: styles.subtitle1,
      subtitle2: styles.subtitle2,
    },
    weight: {
      thin: styles.weightThin,
      light: styles.weightLight,
      normal: styles.weightNormal,
      medium: styles.weightMedium,
      semibold: styles.weightSemibold,
      bold: styles.weightBold,
      extrabold: styles.weightExtrabold,
    },
    align: {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
      justify: styles.alignJustify,
    },
    color: {
      default: "",
      primary: styles.colorPrimary,
      secondary: styles.colorSecondary,
      muted: styles.colorMuted,
      accent: styles.colorAccent,
      destructive: styles.colorDestructive,
      success: styles.colorSuccess,
      warning: styles.colorWarning,
      info: styles.colorInfo,
      brand: styles.colorBrand,
      white: styles.colorWhite,
    },
    transform: {
      none: "",
      uppercase: styles.transformUppercase,
      lowercase: styles.transformLowercase,
      capitalize: styles.transformCapitalize,
    },
    spacing: {
      none: styles.spacingNone,
      tight: styles.spacingTight,
      normal: "",
      relaxed: styles.spacingRelaxed,
      loose: styles.spacingLoose,
    },
    decoration: {
      none: "",
      underline: styles.decorationUnderline,
      strikethrough: styles.decorationStrikethrough,
      gradient: styles.decorationGradient,
    }
  },
  defaultVariants: {
    variant: "body",
    weight: "normal",
    align: "left",
    color: "default",
    transform: "none",
    spacing: "normal",
    decoration: "none",
  },
})

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements
  truncate?: boolean
  lineClamp?: number
  noWrap?: boolean
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ 
    className, 
    variant = "body", 
    weight, 
    align, 
    color, 
    transform, 
    spacing, 
    decoration,
    as,
    truncate,
    lineClamp,
    noWrap,
    children,
    ...props 
  }, ref) => {
    // Determine the HTML element based on variant or explicit 'as' prop
    const getElementType = () => {
      if (as) return as
      switch (variant) {
        case "h1": return "h1"
        case "h2": return "h2"
        case "h3": return "h3"
        case "h4": return "h4"
        case "h5": return "h5"
        case "h6": return "h6"
        case "blockquote": return "blockquote"
        case "code": return "code"
        case "kbd": return "kbd"
        case "lead": return "p"
        case "caption": return "caption"
        case "overline": return "span"
        default: return "p"
      }
    }

    const Element = getElementType() as keyof React.JSX.IntrinsicElements

    const computedClassName = cn(
      styles.typography,
      typographyVariants({ variant, weight, align, color, transform, spacing, decoration }),
      {
        [styles.truncate]: truncate,
        [styles.noWrap]: noWrap,
        [styles.lineClamp]: lineClamp,
      },
      className
    )

    const style = lineClamp ? { 
      WebkitLineClamp: lineClamp,
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden'
    } : undefined

    return React.createElement(
      Element,
      {
        ref,
        className: computedClassName,
        style,
        ...props
      },
      children
    )
  }
)

// Specialized Typography Components
export const Heading = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }
>(({ level = 1, ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant={`h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"} 
    {...props} 
  />
))

export const Title = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="h1" 
    {...props} 
  />
))

export const Subtitle = React.forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant'> & { level?: 1 | 2 }
>(({ level = 1, ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant={level === 1 ? "subtitle1" : "subtitle2"} 
    {...props} 
  />
))

export const Body = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'> & { size?: 'large' | 'normal' | 'small' }
>(({ size = 'normal', ...props }, ref) => {
  const variant = size === 'large' ? 'large' : size === 'small' ? 'small' : 'body'
  return (
    <Typography 
      ref={ref} 
      variant={variant} 
      {...props} 
    />
  )
})

export const Lead = React.forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="lead" 
    {...props} 
  />
))

export const Muted = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'variant' | 'color'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="muted" 
    color="muted"
    {...props} 
  />
))

export const Caption = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="caption" 
    {...props} 
  />
))

export const Overline = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'variant'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="overline" 
    {...props} 
  />
))

export const Quote = React.forwardRef<
  HTMLQuoteElement,
  Omit<TypographyProps, 'variant'> & { cite?: string; author?: string }
>(({ cite, author, children, ...props }, ref) => (
  <div className={styles.quoteWrapper}>
    <Typography 
      ref={ref} 
      variant="blockquote" 
      {...props} 
    >
      {children}
    </Typography>
    {(cite || author) && (
      <footer className={styles.quoteFooter}>
        {author && <span className={styles.quoteAuthor}>{author}</span>}
        {cite && (
          <cite className={styles.quoteCite}>
            <a href={cite} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </cite>
        )}
      </footer>
    )}
  </div>
))

export const Code = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'> & { block?: boolean }
>(({ block, ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="code" 
    as={block ? "pre" : "code"}
    className={cn(block && styles.codeBlock)}
    {...props} 
  />
))

export const Kbd = React.forwardRef<
  HTMLElement,
  Omit<TypographyProps, 'variant'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    variant="kbd" 
    {...props} 
  />
))

// Semantic text components
export const ErrorText = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'color'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    color="destructive" 
    variant="small"
    {...props} 
  />
))

export const SuccessText = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'color'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    color="success" 
    variant="small"
    {...props} 
  />
))

export const WarningText = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'color'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    color="warning" 
    variant="small"
    {...props} 
  />
))

export const InfoText = React.forwardRef<
  HTMLSpanElement,
  Omit<TypographyProps, 'color'>
>(({ ...props }, ref) => (
  <Typography 
    ref={ref} 
    color="info" 
    variant="small"
    {...props} 
  />
))

// Layout text components
export const TextStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { spacing?: 'tight' | 'normal' | 'relaxed' }
>(({ className, spacing = 'normal', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.textStack, styles[`textStack${spacing.charAt(0).toUpperCase()}${spacing.slice(1)}`], className)}
    {...props}
  />
))

// Display names
Typography.displayName = "Typography"
Heading.displayName = "Heading"
Title.displayName = "Title"
Subtitle.displayName = "Subtitle"
Body.displayName = "Body"
Lead.displayName = "Lead"
Muted.displayName = "Muted"
Caption.displayName = "Caption"
Overline.displayName = "Overline"
Quote.displayName = "Quote"
Code.displayName = "Code"
Kbd.displayName = "Kbd"
ErrorText.displayName = "ErrorText"
SuccessText.displayName = "SuccessText"
WarningText.displayName = "WarningText"
InfoText.displayName = "InfoText"
TextStack.displayName = "TextStack"

export { Typography, typographyVariants }
export type { TypographyProps as EnhancedTypographyProps }
