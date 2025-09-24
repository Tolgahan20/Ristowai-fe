import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Button.module.css"

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: styles.buttonDefault,
      primary: styles.buttonPrimary,
      secondary: styles.buttonSecondary,
      destructive: styles.buttonDestructive,
      outline: styles.buttonOutline,
      ghost: styles.buttonGhost,
      link: styles.buttonLink,
      // Semantic variants
      success: styles.buttonSuccess,
      warning: styles.buttonWarning,
      info: styles.buttonInfo,
      // Brand variants
      brand: styles.buttonBrand,
      whatsapp: styles.buttonWhatsapp,
      // Special variants
      gradient: styles.buttonGradient,
    },
    size: {
      xs: styles.buttonXs,
      sm: styles.buttonSm,
      md: styles.buttonMd,
      lg: styles.buttonLg,
      xl: styles.buttonXl,
      icon: styles.buttonIcon,
    },
    state: {
      default: "",
      loading: styles.buttonLoading,
      disabled: styles.buttonDisabled,
    },
    width: {
      auto: "",
      full: styles.buttonFullWidth,
      fit: styles.buttonFitContent,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    state: "default",
    width: "auto",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    state,
    width,
    asChild = false,
    isLoading,
    loadingText,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const actualState = disabled ? "disabled" : isLoading ? "loading" : state
    const isDisabled = disabled || isLoading

    return (
      <Comp
        className={cn(
          styles.button,
          buttonVariants({ variant, size, state: actualState, width }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        data-loading={isLoading}
        {...props}
      >
        <span className={styles.buttonContent}>
          {leftIcon && !isLoading && (
            <span className={styles.leftIcon}>{leftIcon}</span>
          )}
          
          {isLoading && (
            <span className={styles.loadingIconContainer}>
              <Loader2 className={styles.loadingIcon} />
            </span>
          )}
          
          <span className={cn(styles.buttonText, isLoading && styles.buttonTextLoading)}>
            {isLoading && loadingText ? loadingText : children}
          </span>
          
          {rightIcon && !isLoading && (
            <span className={styles.rightIcon}>{rightIcon}</span>
          )}
        </span>
      </Comp>
    )
  }
)

Button.displayName = "Button"

// Specialized button variants
export const PrimaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="primary" {...props} />
)

export const SecondaryButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="secondary" {...props} />
)

export const DestructiveButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="destructive" {...props} />
)

export const OutlineButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="outline" {...props} />
)

export const GhostButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="ghost" {...props} />
)

export const LinkButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="link" {...props} />
)

export const SuccessButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="success" {...props} />
)

export const WarningButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="warning" {...props} />
)

export const InfoButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="info" {...props} />
)

export const BrandButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="brand" {...props} />
)

export const WhatsAppButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="whatsapp" {...props} />
)

export const GradientButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'variant'>>(
  (props, ref) => <Button ref={ref} variant="gradient" {...props} />
)

// Icon button variant
export const IconButton = React.forwardRef<HTMLButtonElement, Omit<ButtonProps, 'size'>>(
  (props, ref) => <Button ref={ref} size="icon" {...props} />
)

// Loading button variant
export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = true, ...props }, ref) => <Button ref={ref} isLoading={isLoading} {...props} />
)

PrimaryButton.displayName = "PrimaryButton"
SecondaryButton.displayName = "SecondaryButton"
DestructiveButton.displayName = "DestructiveButton"
OutlineButton.displayName = "OutlineButton"
GhostButton.displayName = "GhostButton"
LinkButton.displayName = "LinkButton"
SuccessButton.displayName = "SuccessButton"
WarningButton.displayName = "WarningButton"
InfoButton.displayName = "InfoButton"
BrandButton.displayName = "BrandButton"
WhatsAppButton.displayName = "WhatsAppButton"
GradientButton.displayName = "GradientButton"
IconButton.displayName = "IconButton"
LoadingButton.displayName = "LoadingButton"

export { Button, buttonVariants }
export type { ButtonProps as EnhancedButtonProps }
