import * as React from "react"
import { Eye, EyeOff, Search, AlertCircle, CheckCircle, Loader2, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Input.module.css"

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "",
      error: styles.inputError,
      success: styles.inputSuccess,
      warning: styles.inputWarning,
    },
    size: {
      sm: styles.inputSm,
      md: styles.inputMd,
      lg: styles.inputLg,
    },
    state: {
      default: "",
      loading: styles.inputLoading,
      disabled: styles.inputDisabled,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    state: "default",
  },
})

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  description?: string
  error?: string
  success?: string
  warning?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = "text",
    variant,
    size,
    state,
    label,
    description,
    error,
    success,
    warning,
    leftIcon,
    rightIcon,
    isLoading,
    clearable,
    onClear,
    disabled,
    value,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    
    // Determine the actual variant based on props
    const actualVariant = error ? "error" : success ? "success" : warning ? "warning" : variant
    const actualState = disabled ? "disabled" : isLoading ? "loading" : state

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const handleClear = () => {
      onClear?.()
    }

    const inputType = type === "password" && showPassword ? "text" : type

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={cn(styles.label, actualVariant === "error" && styles.labelError)}>
            {label}
            {props.required && <span className={styles.required}>*</span>}
          </label>
        )}
        
        <div 
          className={cn(
            styles.inputContainer,
            inputVariants({ variant: actualVariant, size, state: actualState }),
            isFocused && styles.inputFocused,
            className
          )}
        >
          {leftIcon && (
            <div className={styles.leftIcon}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            disabled={disabled || isLoading}
            value={value}
            className={cn(
              styles.input,
              leftIcon && styles.inputWithLeftIcon,
              (rightIcon || type === "password" || clearable || isLoading) && styles.inputWithRightIcon,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          <div className={styles.rightIconContainer}>
            {isLoading && (
              <Loader2 className={cn(styles.rightIcon, styles.loadingIcon)} />
            )}
            
            {clearable && value && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                tabIndex={-1}
              >
                <X className={styles.rightIcon} />
              </button>
            )}
            
            {type === "password" && !isLoading && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggle}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className={styles.rightIcon} />
                ) : (
                  <Eye className={styles.rightIcon} />
                )}
              </button>
            )}
            
            {rightIcon && !isLoading && (
              <div className={styles.rightIcon}>
                {rightIcon}
              </div>
            )}
          </div>
        </div>
        
        {description && !error && !success && !warning && (
          <p className={styles.description}>{description}</p>
        )}
        
        {error && (
          <p className={styles.errorMessage}>
            <AlertCircle className={styles.messageIcon} />
            {error}
          </p>
        )}
        
        {success && (
          <p className={styles.successMessage}>
            <CheckCircle className={styles.messageIcon} />
            {success}
          </p>
        )}
        
        {warning && (
          <p className={styles.warningMessage}>
            <AlertCircle className={styles.messageIcon} />
            {warning}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// Specialized input variants
export const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon' | 'type'>>(
  (props, ref) => (
    <Input
      ref={ref}
      type="search"
      leftIcon={<Search />}
      placeholder="Search..."
      clearable
      {...props}
    />
  )
)

SearchInput.displayName = "SearchInput"

export const PasswordInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (props, ref) => (
    <Input
      ref={ref}
      type="password"
      {...props}
    />
  )
)

PasswordInput.displayName = "PasswordInput"

export { Input, inputVariants }
export type { InputProps as EnhancedInputProps }
