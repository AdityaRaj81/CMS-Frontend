'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  children: React.ReactNode
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variantStyles = {
      primary: 'bg-legal-navy/10 text-legal-navy',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-legal-red/10 text-legal-red',
      info: 'bg-blue-100 text-blue-700',
    }

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center rounded-full px-3 py-1 text-sm font-medium', variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'
