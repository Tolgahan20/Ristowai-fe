"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Dialog.module.css"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

const dialogVariants = cva("", {
  variants: {
    size: {
      sm: styles.dialogSm,
      md: styles.dialogMd,
      lg: styles.dialogLg,
      xl: styles.dialogXl,
      full: styles.dialogFull,
    },
    variant: {
      default: "",
      alert: styles.dialogAlert,
      confirm: styles.dialogConfirm,
      modal: styles.dialogModal,
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
})

export interface DialogContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  showCloseButton?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, showCloseButton = true, size, variant, ...props }, ref) => {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          styles.dialogContent,
          dialogVariants({ size, variant }),
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={styles.dialogClose}
          >
            <XIcon className={styles.dialogCloseIcon} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// Specialized dialog variants
export const AlertDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  Omit<DialogContentProps, 'variant'>
>(({ ...props }, ref) => (
  <DialogContent ref={ref} variant="alert" {...props} />
))

export const ConfirmDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  Omit<DialogContentProps, 'variant'>
>(({ ...props }, ref) => (
  <DialogContent ref={ref} variant="confirm" {...props} />
))

export const FullScreenDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  Omit<DialogContentProps, 'size'>
>(({ ...props }, ref) => (
  <DialogContent ref={ref} size="full" {...props} />
))

DialogContent.displayName = "DialogContent"
AlertDialog.displayName = "AlertDialog"
ConfirmDialog.displayName = "ConfirmDialog"
FullScreenDialog.displayName = "FullScreenDialog"

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  dialogVariants,
}
export type { DialogContentProps as EnhancedDialogContentProps}
