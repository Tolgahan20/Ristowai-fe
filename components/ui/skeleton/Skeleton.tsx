"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Skeleton.module.css"

const skeletonVariants = cva("", {
  variants: {
    variant: {
      default: "",
      text: styles.skeletonText,
      avatar: styles.skeletonAvatar,
      card: styles.skeletonCard,
      image: styles.skeletonImage,
      button: styles.skeletonButton,
    },
    animation: {
      pulse: styles.skeletonPulse,
      wave: styles.skeletonWave,
      shimmer: styles.skeletonShimmer,
      none: styles.skeletonNoAnimation,
    },
    speed: {
      slow: styles.skeletonSlow,
      normal: "",
      fast: styles.skeletonFast,
    }
  },
  defaultVariants: {
    variant: "default",
    animation: "pulse",
    speed: "normal",
  },
})

export interface SkeletonProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
  count?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({
  className,
  variant,
  animation,
  speed,
  width,
  height,
  count = 1,
  style,
  ...props
}, ref) => {
  const skeletonStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  }

  if (count > 1) {
    return (
      <div className={styles.skeletonGroup}>
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            data-slot="skeleton"
            className={cn(
              styles.skeleton,
              skeletonVariants({ variant, animation, speed }),
              className
            )}
            style={skeletonStyle}
            {...props}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(
        styles.skeleton,
        skeletonVariants({ variant, animation, speed }),
        className
      )}
      style={skeletonStyle}
      {...props}
    />
  )
})

Skeleton.displayName = "Skeleton"

// Specialized skeleton variants
export const TextSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'> & { lines?: number }
>(({ lines = 1, ...props }, ref) => (
  <Skeleton ref={ref} variant="text" count={lines} {...props} />
))

export const AvatarSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ ...props }, ref) => (
  <Skeleton ref={ref} variant="avatar" {...props} />
))

export const CardSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ ...props }, ref) => (
  <Skeleton ref={ref} variant="card" {...props} />
))

export const ImageSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ ...props }, ref) => (
  <Skeleton ref={ref} variant="image" {...props} />
))

export const ButtonSkeleton = React.forwardRef<
  HTMLDivElement,
  Omit<SkeletonProps, 'variant'>
>(({ ...props }, ref) => (
  <Skeleton ref={ref} variant="button" {...props} />
))

// Skeleton layouts
export const ProfileSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.profileSkeleton, className)} {...props}>
    <AvatarSkeleton />
    <div className={styles.profileSkeletonContent}>
      <TextSkeleton width="60%" />
      <TextSkeleton width="40%" />
    </div>
  </div>
))

export const PostSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.postSkeleton, className)} {...props}>
    <ProfileSkeleton />
    <TextSkeleton lines={3} />
    <ImageSkeleton />
    <div className={styles.postSkeletonActions}>
      <ButtonSkeleton width={80} />
      <ButtonSkeleton width={80} />
      <ButtonSkeleton width={80} />
    </div>
  </div>
))

export const TableSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { rows?: number; columns?: number }
>(({ className, rows = 5, columns = 4, ...props }, ref) => (
  <div ref={ref} className={cn(styles.tableSkeleton, className)} {...props}>
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className={styles.tableSkeletonRow}>
        {Array.from({ length: columns }, (_, colIndex) => (
          <TextSkeleton key={colIndex} />
        ))}
      </div>
    ))}
  </div>
))

TextSkeleton.displayName = "TextSkeleton"
AvatarSkeleton.displayName = "AvatarSkeleton"
CardSkeleton.displayName = "CardSkeleton"
ImageSkeleton.displayName = "ImageSkeleton"
ButtonSkeleton.displayName = "ButtonSkeleton"
ProfileSkeleton.displayName = "ProfileSkeleton"
PostSkeleton.displayName = "PostSkeleton"
TableSkeleton.displayName = "TableSkeleton"

export { Skeleton, skeletonVariants }
export type { SkeletonProps as EnhancedSkeletonProps }
