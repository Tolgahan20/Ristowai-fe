"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { User, Crown, Shield, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Avatar.module.css"

const avatarVariants = cva("", {
  variants: {
    size: {
      xs: styles.avatarXs,
      sm: styles.avatarSm,
      md: styles.avatarMd,
      lg: styles.avatarLg,
      xl: styles.avatarXl,
      "2xl": styles.avatar2xl,
    },
    variant: {
      default: "",
      bordered: styles.avatarBordered,
      ring: styles.avatarRing,
      square: styles.avatarSquare,
    },
    status: {
      none: "",
      online: styles.avatarOnline,
      offline: styles.avatarOffline,
      away: styles.avatarAway,
      busy: styles.avatarBusy,
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    status: "none",
  },
})

export interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  showStatus?: boolean
  role?: 'owner' | 'manager' | 'staff' | 'vip'
  loading?: boolean
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({
  className,
  size,
  variant,
  status,
  src,
  alt,
  fallback,
  showStatus,
  role,
  loading,
  children,
  ...props
}, ref) => {
  const initials = React.useMemo(() => {
    if (fallback) return fallback
    if (alt) {
      return alt
        .split(' ')
        .slice(0, 2)
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
    }
    return '??'
  }, [fallback, alt])

  const getRoleIcon = () => {
    switch (role) {
      case 'owner': return <Crown className={styles.roleIcon} />
      case 'manager': return <Shield className={styles.roleIcon} />
      case 'vip': return <Star className={styles.roleIcon} />
      default: return null
    }
  }

  return (
    <div className={styles.avatarWrapper}>
      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar"
        className={cn(
          styles.avatar,
          avatarVariants({ size, variant, status }),
          loading && styles.avatarLoading,
          className
        )}
        {...props}
      >
        {src && (
          <AvatarImage
            src={src}
            alt={alt}
            className={styles.avatarImage}
          />
        )}
        
        <AvatarFallback className={styles.avatarFallback}>
          {children || (
            loading ? (
              <div className={styles.avatarLoadingSpinner} />
            ) : initials.length === 2 ? (
              initials
            ) : (
              <User className={styles.avatarIcon} />
            )
          )}
        </AvatarFallback>

        {loading && (
          <div className={styles.avatarLoadingOverlay}>
            <div className={styles.avatarLoadingSpinner} />
          </div>
        )}
      </AvatarPrimitive.Root>

      {showStatus && status !== 'none' && (
        <div className={cn(styles.statusIndicator, styles[`status${status?.charAt(0).toUpperCase()}${status?.slice(1)}`])} />
      )}

      {role && (
        <div className={styles.roleIndicator}>
          {getRoleIcon()}
        </div>
      )}
    </div>
  )
})

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn(styles.avatarImageBase, className)}
    {...props}
  />
))

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(styles.avatarFallbackBase, className)}
    {...props}
  />
))

// Specialized avatar variants
export const UserAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  Omit<AvatarProps, 'showStatus'> & { user: { name: string; avatar?: string; status?: 'online' | 'offline' | 'away' | 'busy' } }
>(({ user, ...props }, ref) => (
  <Avatar
    ref={ref}
    src={user.avatar}
    alt={user.name}
    status={user.status}
    showStatus
    {...props}
  />
))

export const StaffAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  Omit<AvatarProps, 'role'> & { staff: { name: string; avatar?: string; role: 'owner' | 'manager' | 'staff' } }
>(({ staff, ...props }, ref) => (
  <Avatar
    ref={ref}
    src={staff.avatar}
    alt={staff.name}
    role={staff.role}
    variant="bordered"
    {...props}
  />
))

export const LoadingAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  Omit<AvatarProps, 'loading'>
>(({ ...props }, ref) => (
  <Avatar
    ref={ref}
    loading
    {...props}
  />
))

export const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    max?: number
    size?: AvatarProps['size']
    spacing?: 'none' | 'sm' | 'md' | 'lg'
  }
>(({ className, max = 5, size = "md", spacing = "md", children, ...props }, ref) => {
  const avatars = React.Children.toArray(children).slice(0, max)
  const remainingCount = React.Children.count(children) - max

  return (
    <div
      ref={ref}
      className={cn(
        styles.avatarGroup,
        styles[`avatarGroupSpacing${spacing?.charAt(0).toUpperCase()}${spacing?.slice(1)}`],
        className
      )}
      {...props}
    >
      {avatars.map((avatar, index) => {
        const avatarElement = avatar as React.ReactElement<AvatarProps>
        return React.cloneElement(avatarElement, {
          key: index,
          size,
          className: cn(styles.avatarGroupItem, avatarElement.props?.className || '')
        })
      })}
      
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className={styles.avatarGroupMore}
          fallback={`+${remainingCount}`}
        />
      )}
    </div>
  )
})

Avatar.displayName = "Avatar"
AvatarImage.displayName = "AvatarImage"
AvatarFallback.displayName = "AvatarFallback"
UserAvatar.displayName = "UserAvatar"
StaffAvatar.displayName = "StaffAvatar"
LoadingAvatar.displayName = "LoadingAvatar"
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, avatarVariants }
export type { AvatarProps as EnhancedAvatarProps }
