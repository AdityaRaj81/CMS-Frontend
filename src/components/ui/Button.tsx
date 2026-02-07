'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2'

    const variantStyles = {
      primary: 'bg-legal-navy text-white hover:bg-opacity-90 disabled:bg-gray-400',
      secondary: 'border border-legal-navy bg-white text-legal-navy hover:bg-legal-ivory disabled:border-gray-400 disabled:text-gray-400',
      accent: 'bg-legal-gold text-legal-navy hover:bg-opacity-90 disabled:bg-gray-400',
      danger: 'bg-legal-red text-white hover:bg-opacity-90 disabled:bg-gray-400',
      ghost: 'text-legal-navy hover:bg-legal-navy/5 disabled:text-gray-400',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    }

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
