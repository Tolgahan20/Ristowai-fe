import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Info, 
  User, 
  Crown,
  Shield,
  Briefcase,
  Clock4,
  UserCheck,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Badge.module.css"

const badgeVariants = cva("", {
  variants: {
    variant: {
      default: styles.badgeDefault,
      primary: styles.badgePrimary,
      secondary: styles.badgeSecondary,
      destructive: styles.badgeDestructive,
      outline: styles.badgeOutline,
      // Semantic variants
      success: styles.badgeSuccess,
      warning: styles.badgeWarning,
      error: styles.badgeError,
      info: styles.badgeInfo,
      // Status variants
      active: styles.badgeActive,
      inactive: styles.badgeInactive,
      pending: styles.badgePending,
      suspended: styles.badgeSuspended,
      removed: styles.badgeRemoved,
      // Role variants
      owner: styles.badgeOwner,
      manager: styles.badgeManager,
      staff: styles.badgeStaff,
      // Employment type variants
      fulltime: styles.badgeFullTime,
      parttime: styles.badgePartTime,
      contract: styles.badgeContract,
      temporary: styles.badgeTemporary,
      freelance: styles.badgeFreelance,
      intern: styles.badgeIntern,
      // Special variants
      minor: styles.badgeMinor,
      vip: styles.badgeVip,
      new: styles.badgeNew,
    },
    size: {
      xs: styles.badgeXs,
      sm: styles.badgeSm,
      md: styles.badgeMd,
      lg: styles.badgeLg,
    },
    shape: {
      rounded: styles.badgeRounded,
      pill: styles.badgePill,
      square: styles.badgeSquare,
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rounded",
  },
})

const statusIcons = {
  active: CheckCircle,
  inactive: XCircle,
  pending: Clock,
  suspended: AlertTriangle,
  removed: X,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
}

const roleIcons = {
  owner: Crown,
  manager: Shield,
  staff: User,
}

const employmentIcons = {
  fulltime: Briefcase,
  parttime: Clock4,
  contract: UserCheck,
  temporary: Clock,
  freelance: User,
  intern: User,
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
  showIcon?: boolean
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant,
    size,
    shape,
    asChild = false,
    showIcon = false,
    icon,
    dismissible = false,
    onDismiss,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "div"
    
    // Auto-detect icon based on variant
    const getIcon = () => {
      if (icon) return icon
      if (!showIcon) return null
      
      if (variant && statusIcons[variant as keyof typeof statusIcons]) {
        const IconComponent = statusIcons[variant as keyof typeof statusIcons]
        return <IconComponent />
      }
      
      if (variant && roleIcons[variant as keyof typeof roleIcons]) {
        const IconComponent = roleIcons[variant as keyof typeof roleIcons]
        return <IconComponent />
      }
      
      if (variant && employmentIcons[variant as keyof typeof employmentIcons]) {
        const IconComponent = employmentIcons[variant as keyof typeof employmentIcons]
        return <IconComponent />
      }
      
      return null
    }

    const renderIcon = getIcon()

    return (
      <Comp
        ref={ref}
        className={cn(
          styles.badge,
          badgeVariants({ variant, size, shape }),
          dismissible && styles.badgeDismissible,
          className
        )}
        {...props}
      >
        {renderIcon && (
          <span className={styles.badgeIcon}>
            {renderIcon}
          </span>
        )}
        
        <span className={styles.badgeText}>
          {children}
        </span>
        
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className={styles.dismissButton}
            aria-label="Remove badge"
          >
            <X className={styles.dismissIcon} />
          </button>
        )}
      </Comp>
    )
  }
)

Badge.displayName = "Badge"

// Specialized badge variants
export const StatusBadge = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'showIcon'> & { status: 'active' | 'inactive' | 'pending' | 'suspended' | 'removed' }>(
  ({ status, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={status}
      showIcon
      {...props}
    />
  )
)

export const RoleBadge = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'showIcon' | 'variant'> & { role: 'owner' | 'manager' | 'staff' }>(
  ({ role, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={role}
      showIcon
      {...props}
    />
  )
)

export const EmploymentBadge = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'showIcon' | 'variant'> & { type: 'fulltime' | 'parttime' | 'contract' | 'temporary' | 'freelance' | 'intern' }>(
  ({ type, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={type}
      showIcon
      {...props}
    />
  )
)

export const SemanticBadge = React.forwardRef<HTMLDivElement, Omit<BadgeProps, 'showIcon' | 'variant'> & { semantic: 'success' | 'warning' | 'error' | 'info' }>(
  ({ semantic, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={semantic}
      showIcon
      {...props}
    />
  )
)

StatusBadge.displayName = "StatusBadge"
RoleBadge.displayName = "RoleBadge"
EmploymentBadge.displayName = "EmploymentBadge"
SemanticBadge.displayName = "SemanticBadge"

export { Badge, badgeVariants }
export type { BadgeProps as EnhancedBadgeProps }
