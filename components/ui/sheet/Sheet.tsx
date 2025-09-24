"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Sheet.module.css"

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

const sheetVariants = cva("", {
  variants: {
    side: {
      top: styles.sheetTop,
      right: styles.sheetRight,
      bottom: styles.sheetBottom,
      left: styles.sheetLeft,
    },
    size: {
      sm: styles.sheetSm,
      md: styles.sheetMd,
      lg: styles.sheetLg,
      xl: styles.sheetXl,
      full: styles.sheetFull,
    },
    variant: {
      default: "",
      modal: styles.sheetModal,
      drawer: styles.sheetDrawer,
      overlay: styles.sheetOverlay,
    }
  },
  defaultVariants: {
    side: "right",
    size: "md",
    variant: "default",
  },
})

export interface SheetContentProps
  extends React.ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  side?: "top" | "right" | "bottom" | "left"
  hideCloseButton?: boolean
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({
  className,
  children,
  side = "right",
  size,
  variant,
  hideCloseButton,
  ...props
}, ref) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        className={cn(
          styles.sheetContent,
          sheetVariants({ side, size, variant }),
          className
        )}
        {...props}
      >
        <div className={styles.sheetContentInner}>
          {children}
        </div>
        
        {!hideCloseButton && (
          <SheetPrimitive.Close className={styles.sheetClose}>
            <XIcon className={styles.sheetCloseIcon} />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

// Specialized sheet variants
export const DrawerSheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  Omit<SheetContentProps, 'variant'>
>(({ side = "bottom", ...props }, ref) => (
  <SheetContent ref={ref} variant="drawer" side={side} {...props} />
))

export const ModalSheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  Omit<SheetContentProps, 'variant'>
>(({ ...props }, ref) => (
  <SheetContent ref={ref} variant="modal" {...props} />
))

export const SidebarSheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  Omit<SheetContentProps, 'side'>
>(({ ...props }, ref) => (
  <SheetContent ref={ref} side="left" size="lg" {...props} />
))

export const NotificationSheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  Omit<SheetContentProps, 'side' | 'size'>
>(({ ...props }, ref) => (
  <SheetContent ref={ref} side="right" size="sm" {...props} />
))

export const FullScreenSheet = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  Omit<SheetContentProps, 'size'>
>(({ ...props }, ref) => (
  <SheetContent ref={ref} size="full" {...props} />
))

SheetContent.displayName = "SheetContent"
DrawerSheet.displayName = "DrawerSheet"
ModalSheet.displayName = "ModalSheet"
SidebarSheet.displayName = "SidebarSheet"
NotificationSheet.displayName = "NotificationSheet"
FullScreenSheet.displayName = "FullScreenSheet"

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetPortal,
  SheetOverlay,
  sheetVariants,
}
export type { SheetContentProps as EnhancedSheetContentProps }
