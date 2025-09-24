"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, AlertCircle, Loader2, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Select.module.css"

const selectTriggerVariants = cva("", {
  variants: {
    variant: {
      default: "",
      error: styles.selectTriggerError,
      success: styles.selectTriggerSuccess,
      warning: styles.selectTriggerWarning,
    },
    size: {
      sm: styles.selectTriggerSm,
      md: styles.selectTriggerMd,
      lg: styles.selectTriggerLg,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

// Enhanced Select interfaces
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

export interface EnhancedSelectProps
  extends Omit<React.ComponentProps<typeof SelectPrimitive.Root>, 'children'>,
    VariantProps<typeof selectTriggerVariants> {
  label?: string
  description?: string
  error?: string
  success?: string
  warning?: string
  placeholder?: string
  options?: SelectOption[]
  groups?: SelectGroup[]
  isLoading?: boolean
  searchable?: boolean
  clearable?: boolean
  multiple?: boolean
  className?: string
  triggerClassName?: string
}

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

// Enhanced Select Component
const EnhancedSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  EnhancedSelectProps
>(({
  label,
  description,
  error,
  success,
  warning,
  placeholder,
  options = [],
  groups = [],
  isLoading,
  searchable,
  clearable,
  multiple: _multiple, // eslint-disable-line @typescript-eslint/no-unused-vars
  variant,
  size,
  className,
  triggerClassName,
  value,
  onValueChange,
  ...props
}, ref) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  
  // Determine the actual variant based on props
  const actualVariant = error ? "error" : success ? "success" : warning ? "warning" : variant

  // Filter options based on search term
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options
    return options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [options, searchTerm])

  // Filter groups based on search term
  const filteredGroups = React.useMemo(() => {
    if (!searchTerm) return groups
    return groups.map(group => ({
      ...group,
      options: group.options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.options.length > 0)
  }, [groups, searchTerm])

  const handleClear = () => {
    onValueChange?.("")
  }

  return (
    <div className={cn(styles.selectWrapper, className)}>
      {label && (
        <label className={cn(styles.selectLabel, actualVariant === "error" && styles.selectLabelError)}>
          {label}
          {props.required && <span className={styles.selectRequired}>*</span>}
        </label>
      )}
      
      <Select
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <SelectTrigger
          ref={ref}
          className={cn(
            styles.selectTrigger,
            selectTriggerVariants({ variant: actualVariant, size }),
            isLoading && styles.selectLoading,
            triggerClassName
          )}
        >
          <div className={styles.selectValue}>
            {value ? (
              <span>
                {options.find(opt => opt.value === value)?.label ||
                 groups.flatMap(g => g.options).find(opt => opt.value === value)?.label ||
                 value}
              </span>
            ) : (
              <span className={styles.selectValuePlaceholder}>
                {placeholder || "Select an option..."}
              </span>
            )}
          </div>
          
          {isLoading && (
            <div className={cn(styles.selectIcon)}>
              <Loader2 className={styles.selectLoadingIcon} />
            </div>
          )}
          {clearable && value && (
            <div className={cn(styles.selectIcon)}>
              <X 
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="cursor-pointer hover:text-destructive"
              />
            </div>
          )}
        </SelectTrigger>
        
        <SelectContent className={styles.selectContent}>
          {searchable && (
            <div className="p-2 border-b">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
          
          <div className={styles.selectViewport}>
            {/* Render filtered options */}
            {filteredOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={styles.selectItem}
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </SelectItem>
            ))}
            
            {/* Render filtered groups */}
            {filteredGroups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel className={styles.selectGroupLabel}>
                  {group.label}
                </SelectLabel>
                {group.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={styles.selectItem}
                  >
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
            
            {/* No results */}
            {searchTerm && filteredOptions.length === 0 && filteredGroups.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                No options found
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
      
      {description && !error && !success && !warning && (
        <p className={styles.selectDescription}>{description}</p>
      )}
      
      {error && (
        <p className={styles.selectErrorMessage}>
          <AlertCircle className={styles.selectMessageIcon} />
          {error}
        </p>
      )}
      
      {success && (
        <p className={styles.selectSuccessMessage}>
          <CheckIcon className={styles.selectMessageIcon} />
          {success}
        </p>
      )}
      
      {warning && (
        <p className={styles.selectWarningMessage}>
          <AlertCircle className={styles.selectMessageIcon} />
          {warning}
        </p>
      )}
    </div>
  )
})

EnhancedSelect.displayName = "EnhancedSelect"

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  EnhancedSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
}

export type {
  SelectOption as EnhancedSelectOption,
  SelectGroup as SelectGroupType,
  EnhancedSelectProps as SelectProps,
}
