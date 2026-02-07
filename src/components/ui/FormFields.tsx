'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-legal-charcoal">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            type={type}
            className={cn(
              'w-full rounded-lg border bg-white px-4 py-2.5 font-sans text-legal-charcoal transition-all duration-200',
              icon ? 'pl-11' : '',
              error ? 'border-legal-red focus:border-legal-red focus:ring-2 focus:ring-legal-red/20' : 'border-gray-300 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error ? <p className="mt-1 text-xs text-legal-red">{error}</p> : helperText ? <p className="mt-1 text-xs text-gray-500">{helperText}</p> : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: Array<{ value: string; label: string }>
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-legal-charcoal">{label}</label>}
        <select
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5 font-sans text-legal-charcoal transition-all duration-200',
            error ? 'border-legal-red focus:border-legal-red focus:ring-2 focus:ring-legal-red/20' : 'border-gray-300 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20',
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? <p className="mt-1 text-xs text-legal-red">{error}</p> : helperText ? <p className="mt-1 text-xs text-gray-500">{helperText}</p> : null}
      </div>
    )
  }
)

Select.displayName = 'Select'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="mb-2 block text-sm font-medium text-legal-charcoal">{label}</label>}
        <textarea
          className={cn(
            'w-full rounded-lg border bg-white px-4 py-2.5 font-sans text-legal-charcoal transition-all duration-200',
            error ? 'border-legal-red focus:border-legal-red focus:ring-2 focus:ring-legal-red/20' : 'border-gray-300 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? <p className="mt-1 text-xs text-legal-red">{error}</p> : helperText ? <p className="mt-1 text-xs text-gray-500">{helperText}</p> : null}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
