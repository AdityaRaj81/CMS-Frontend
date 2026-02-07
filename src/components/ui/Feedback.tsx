'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: Array<{
    id: string
    label: string
    content: React.ReactNode
  }>
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  return (
    <div className={className}>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-3 font-medium transition-all duration-200 border-b-2',
              activeTab === tab.id ? 'border-legal-gold text-legal-navy' : 'border-transparent text-gray-500 hover:text-legal-charcoal'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', title, message, onClose }) => {
  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-legal-red/20 text-legal-red',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <div className={cn('rounded-lg border p-4', typeStyles[type])}>
      <div className="flex items-start justify-between">
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <p className={!title ? '' : 'text-sm mt-1'}>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-current hover:opacity-70">
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

interface ModalProps {
  isOpen: boolean
  title?: string
  children: React.ReactNode
  onClose: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, size = 'md', footer }) => {
  if (!isOpen) return null

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={cn('rounded-xl bg-white shadow-xl', sizeStyles[size])}>
        {title && (
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-serif text-xl font-semibold text-legal-navy">{title}</h2>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && <div className="border-t border-gray-200 px-6 py-4 flex justify-end gap-2">{footer}</div>}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
    </div>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeStyles = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  }

  return (
    <div className={cn('animate-spin rounded-full border-4 border-gray-300 border-t-legal-navy', sizeStyles[size])} />
  )
}

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 py-12 text-center">
      {icon && <div className="mb-4 text-4xl text-gray-400">{icon}</div>}
      <h3 className="font-serif text-lg font-semibold text-legal-charcoal">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
