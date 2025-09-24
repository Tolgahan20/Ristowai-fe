import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Card.module.css"

const cardVariants = cva("", {
  variants: {
    variant: {
      default: styles.cardDefault,
      elevated: styles.cardElevated,
      outlined: styles.cardOutlined,
      ghost: styles.cardGhost,
      // Specialized variants
      stat: styles.cardStat,
      setup: styles.cardSetup,
      member: styles.cardMember,
      dashboard: styles.cardDashboard,
      interactive: styles.cardInteractive,
      gradient: styles.cardGradient,
    },
    size: {
      sm: styles.cardSm,
      md: styles.cardMd,
      lg: styles.cardLg,
      xl: styles.cardXl,
    },
    padding: {
      none: styles.cardPaddingNone,
      sm: styles.cardPaddingSm,
      md: styles.cardPaddingMd,
      lg: styles.cardPaddingLg,
      xl: styles.cardPaddingXl,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    padding: "md",
  },
})

const cardHeaderVariants = cva("", {
  variants: {
    variant: {
      default: styles.cardHeaderDefault,
      bordered: styles.cardHeaderBordered,
      highlighted: styles.cardHeaderHighlighted,
    },
    size: {
      sm: styles.cardHeaderSm,
      md: styles.cardHeaderMd,
      lg: styles.cardHeaderLg,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  clickable?: boolean
  loading?: boolean
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'actions'
}

export interface CardActionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional action button styling */
  variant?: 'default' | 'primary' | 'secondary'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, padding, clickable, loading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.card,
          cardVariants({ variant, size, padding }),
          clickable && styles.cardClickable,
          loading && styles.cardLoading,
          className
        )}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {loading && (
          <div className={styles.cardLoadingOverlay}>
            <div className={styles.cardLoadingSpinner} />
          </div>
        )}
        {children}
      </div>
    )
  }
)

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.cardHeader,
          cardHeaderVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(styles.cardTitle, className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(styles.cardDescription, className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.cardContent,
          noPadding && styles.cardContentNoPadding,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          styles.cardFooter,
          variant === 'bordered' && styles.cardFooterBordered,
          variant === 'actions' && styles.cardFooterActions,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardAction = React.forwardRef<HTMLDivElement, CardActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.cardAction, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Specialized card variants
export const StatCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="stat" {...props} />
)

export const SetupCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="setup" {...props} />
)

export const MemberCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="member" {...props} />
)

export const DashboardCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="dashboard" {...props} />
)

export const InteractiveCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant' | 'clickable'>>(
  (props, ref) => <Card ref={ref} variant="interactive" clickable {...props} />
)

export const GradientCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="gradient" {...props} />
)

Card.displayName = "Card"
CardHeader.displayName = "CardHeader"
CardTitle.displayName = "CardTitle"
CardDescription.displayName = "CardDescription"
CardContent.displayName = "CardContent"
CardFooter.displayName = "CardFooter"
CardAction.displayName = "CardAction"
StatCard.displayName = "StatCard"
SetupCard.displayName = "SetupCard"
MemberCard.displayName = "MemberCard"
DashboardCard.displayName = "DashboardCard"
InteractiveCard.displayName = "InteractiveCard"
GradientCard.displayName = "GradientCard"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
  cardVariants
}

export type {
  CardProps as EnhancedCardProps,
  CardHeaderProps as EnhancedCardHeaderProps,
  CardContentProps as EnhancedCardContentProps,
  CardFooterProps as EnhancedCardFooterProps,
  CardActionProps as EnhancedCardActionProps
}
