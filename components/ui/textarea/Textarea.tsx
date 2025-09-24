import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Textarea.module.css"

const textareaVariants = cva("", {
  variants: {
    variant: {
      default: "",
      error: styles.textareaError,
      success: styles.textareaSuccess,
      warning: styles.textareaWarning,
    },
    size: {
      sm: styles.textareaSm,
      md: styles.textareaMd,
      lg: styles.textareaLg,
    },
    resize: {
      none: styles.textareaResizeNone,
      vertical: styles.textareaResizeVertical,
      horizontal: styles.textareaResizeHorizontal,
      both: styles.textareaResizeBoth,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    resize: "vertical",
  },
})

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  description?: string
  error?: string
  success?: string
  warning?: string
  characterLimit?: number
  showCharacterCount?: boolean
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    size,
    resize,
    label,
    description,
    error,
    success,
    warning,
    characterLimit,
    showCharacterCount,
    autoResize,
    value,
    onChange,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    
    // Use provided ref or fallback to internal ref
    const actualRef = ref || textareaRef
    
    // Determine the actual variant based on props
    const actualVariant = error ? "error" : success ? "success" : warning ? "warning" : variant
    
    // Character count
    const characterCount = typeof value === 'string' ? value.length : 0
    const isOverLimit = characterLimit ? characterCount > characterLimit : false
    
    // Auto resize functionality
    React.useEffect(() => {
      if (autoResize && actualRef && typeof actualRef === 'object' && actualRef.current) {
        const textarea = actualRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [value, autoResize, actualRef])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      
      // Auto resize on change
      if (autoResize) {
        const textarea = e.target
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    return (
      <div className={styles.textareaWrapper}>
        {label && (
          <label className={cn(styles.textareaLabel, actualVariant === "error" && styles.textareaLabelError)}>
            {label}
            {props.required && <span className={styles.textareaRequired}>*</span>}
          </label>
        )}
        
        <div className={styles.textareaContainer}>
          <textarea
            ref={actualRef}
            className={cn(
              styles.textarea,
              textareaVariants({ variant: actualVariant, size, resize }),
              isFocused && styles.textareaFocused,
              isOverLimit && styles.textareaOverLimit,
              autoResize && styles.textareaAutoResize,
              className
            )}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {(characterLimit || showCharacterCount) && (
            <div className={cn(
              styles.characterCount,
              isOverLimit && styles.characterCountOver
            )}>
              {characterCount}
              {characterLimit && (
                <>
                  <span className={styles.characterCountSeparator}>/</span>
                  <span>{characterLimit}</span>
                </>
              )}
            </div>
          )}
        </div>
        
        {description && !error && !success && !warning && (
          <p className={styles.textareaDescription}>{description}</p>
        )}
        
        {error && (
          <p className={styles.textareaErrorMessage}>
            <AlertCircle className={styles.textareaMessageIcon} />
            {error}
          </p>
        )}
        
        {success && (
          <p className={styles.textareaSuccessMessage}>
            <CheckCircle className={styles.textareaMessageIcon} />
            {success}
          </p>
        )}
        
        {warning && (
          <p className={styles.textareaWarningMessage}>
            <AlertCircle className={styles.textareaMessageIcon} />
            {warning}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

// Specialized textarea variants
export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, Omit<TextareaProps, 'autoResize' | 'resize'>>(
  (props, ref) => (
    <Textarea
      ref={ref}
      autoResize
      resize="none"
      {...props}
    />
  )
)

export const CommentTextarea = React.forwardRef<HTMLTextAreaElement, Omit<TextareaProps, 'placeholder' | 'rows'>>(
  (props, ref) => (
    <Textarea
      ref={ref}
      placeholder="Write your comment..."
      rows={3}
      autoResize
      {...props}
    />
  )
)

export const DescriptionTextarea = React.forwardRef<HTMLTextAreaElement, Omit<TextareaProps, 'placeholder' | 'rows'>>(
  (props, ref) => (
    <Textarea
      ref={ref}
      placeholder="Enter description..."
      rows={4}
      characterLimit={500}
      showCharacterCount
      {...props}
    />
  )
)

AutoResizeTextarea.displayName = "AutoResizeTextarea"
CommentTextarea.displayName = "CommentTextarea"
DescriptionTextarea.displayName = "DescriptionTextarea"

export { Textarea, textareaVariants }
export type { TextareaProps as EnhancedTextareaProps }
