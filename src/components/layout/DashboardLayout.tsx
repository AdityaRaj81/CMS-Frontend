'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  File,
  Calendar,
  Users,
  Settings,
  LogOut,
  User,
  Menu,
  X,
  Bell,
  ChevronDown,
} from 'lucide-react'
import { Button } from './ui'
import { SIDEBAR_MENU } from '@/constants'
import { useAuthStore } from '@/store/auth'
import { UserRole } from '@/types'
import { cn } from '@/lib/utils'

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuthStore()

  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    File: <File className="h-5 w-5" />,
    Calendar: <Calendar className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Settings: <Settings className="h-5 w-5" />,
  }

  return (
    <div className="flex h-screen bg-legal-ivory">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-80 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-xl font-bold text-legal-navy">Legal CMS</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-2 px-3 py-6">
          {SIDEBAR_MENU.map((item) => {
            // Check role-based access
            if (item.roles && !item.roles.includes(user?.role || '')) {
              return null
            }

            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const icon = iconMap[item.icon as keyof typeof iconMap]

            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200',
                    isActive
                      ? 'border-r-4 border-legal-gold bg-legal-navy/10 text-legal-navy font-medium'
                      : 'text-gray-600 hover:bg-legal-navy/5 hover:text-legal-navy'
                  )}
                >
                  {icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
          <button className="w-full flex items-center gap-2 rounded-lg px-4 py-2 text-gray-600 hover:bg-legal-navy/5 text-left">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex flex-1 flex-col', sidebarOpen ? 'ml-80' : '')}>
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <h2 className="font-serif text-lg font-semibold text-legal-navy">
                {SIDEBAR_MENU.find((m) => m.href === pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative rounded-lg p-2 hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-legal-red"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  <div className="h-8 w-8 rounded-full bg-legal-gold flex items-center justify-center text-legal-navy font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-legal-charcoal">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-50 text-sm text-legal-charcoal border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setDropdownOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-legal-charcoal"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
