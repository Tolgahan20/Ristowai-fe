"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import styles from "./Form.module.css"

const formVariants = cva("", {
  variants: {
    layout: {
      default: "",
      horizontal: styles.formHorizontal,
      inline: styles.formInline,
      grid: styles.formGrid,
    },
    spacing: {
      compact: styles.formCompact,
      default: "",
      relaxed: styles.formRelaxed,
    },
    variant: {
      default: "",
      card: styles.formCard,
      modal: styles.formModal,
      sidebar: styles.formSidebar,
    }
  },
  defaultVariants: {
    layout: "default",
    spacing: "default",
    variant: "default",
  },
})

const formItemVariants = cva("", {
  variants: {
    layout: {
      default: styles.formItemDefault,
      horizontal: styles.formItemHorizontal,
      inline: styles.formItemInline,
    },
    spacing: {
      compact: styles.formItemCompact,
      default: "",
      relaxed: styles.formItemRelaxed,
    }
  },
  defaultVariants: {
    layout: "default",
    spacing: "default",
  },
})

export interface FormProps
  extends React.ComponentProps<"form">,
    VariantProps<typeof formVariants> {}

export interface FormItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof formItemVariants> {}

// Enhanced Form Wrapper
const EnhancedForm = React.forwardRef<
  HTMLFormElement,
  FormProps
>(({ className, layout, spacing, variant, ...props }, ref) => (
  <form
    ref={ref}
    className={cn(
      styles.form,
      formVariants({ layout, spacing, variant }),
      className
    )}
    {...props}
  />
))

EnhancedForm.displayName = "EnhancedForm"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  FormItemProps
>(({ className, layout, spacing, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        ref={ref}
        data-slot="form-item"
        className={cn(
          styles.formItem,
          formItemVariants({ layout, spacing }),
          className
        )}
        {...props}
      />
    </FormItemContext.Provider>
  )
})

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentProps<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        styles.formLabel,
        error && styles.formLabelError,
        className
      )}
      htmlFor={formItemId}
      {...props}
    />
  )
})

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentProps<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      className={cn(styles.formControl, error && styles.formControlError)}
      {...props}
    />
  )
})

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      data-slot="form-description"
      id={formDescriptionId}
      className={cn(styles.formDescription, className)}
      {...props}
    />
  )
})

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p"> & { variant?: 'error' | 'success' | 'warning' | 'info' }
>(({ className, variant = 'error', ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  const getIcon = () => {
    if (error || variant === 'error') return <AlertCircle className={styles.formMessageIcon} />
    if (variant === 'success') return <CheckCircle className={styles.formMessageIcon} />
    if (variant === 'warning') return <AlertTriangle className={styles.formMessageIcon} />
    if (variant === 'info') return <Info className={styles.formMessageIcon} />
    return null
  }

  return (
    <p
      ref={ref}
      data-slot="form-message"
      id={formMessageId}
      className={cn(
        styles.formMessage,
        styles[`formMessage${variant?.charAt(0).toUpperCase()}${variant?.slice(1)}`],
        className
      )}
      {...props}
    >
      {getIcon()}
      {body}
    </p>
  )
})

// Specialized form components
export const HorizontalForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'layout'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} layout="horizontal" {...props} />
))

export const InlineForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'layout'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} layout="inline" {...props} />
))

export const GridForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'layout'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} layout="grid" {...props} />
))

export const CardForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'variant'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} variant="card" {...props} />
))

export const ModalForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'variant'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} variant="modal" {...props} />
))

export const CompactForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'spacing'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} spacing="compact" {...props} />
))

export const RelaxedForm = React.forwardRef<
  HTMLFormElement,
  Omit<FormProps, 'spacing'>
>(({ ...props }, ref) => (
  <EnhancedForm ref={ref} spacing="relaxed" {...props} />
))

// Form section component
export const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    description?: string
    collapsible?: boolean
    defaultCollapsed?: boolean
  }
>(({ className, title, description, collapsible, defaultCollapsed, children, ...props }, ref) => {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  return (
    <div
      ref={ref}
      className={cn(styles.formSection, className)}
      {...props}
    >
      {(title || description) && (
        <div className={styles.formSectionHeader}>
          {title && (
            <h3 className={styles.formSectionTitle}>
              {title}
              {collapsible && (
                <button
                  type="button"
                  className={styles.formSectionToggle}
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  aria-expanded={!isCollapsed}
                >
                  {isCollapsed ? '+' : '−'}
                </button>
              )}
            </h3>
          )}
          {description && (
            <p className={styles.formSectionDescription}>{description}</p>
          )}
        </div>
      )}
      
      {(!collapsible || !isCollapsed) && (
        <div className={styles.formSectionContent}>
          {children}
        </div>
      )}
    </div>
  )
})

// Display names
FormItem.displayName = "FormItem"
FormLabel.displayName = "FormLabel"
FormControl.displayName = "FormControl"
FormDescription.displayName = "FormDescription"
FormMessage.displayName = "FormMessage"
HorizontalForm.displayName = "HorizontalForm"
InlineForm.displayName = "InlineForm"
GridForm.displayName = "GridForm"
CardForm.displayName = "CardForm"
ModalForm.displayName = "ModalForm"
CompactForm.displayName = "CompactForm"
RelaxedForm.displayName = "RelaxedForm"
FormSection.displayName = "FormSection"

export {
  useFormField,
  Form,
  EnhancedForm,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  formVariants,
  formItemVariants,
}
export type { FormProps as EnhancedFormProps, FormItemProps as EnhancedFormItemProps }
