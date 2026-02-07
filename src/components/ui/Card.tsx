'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-md hover:border-legal-gold',
        className
      )}
      {...props}
    />
  )
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 border-b border-gray-200 pb-4', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-serif text-xl font-semibold text-legal-navy', className)} {...props} />
  )
)

CardTitle.displayName = 'CardTitle'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
)

CardContent.displayName = 'CardContent'
