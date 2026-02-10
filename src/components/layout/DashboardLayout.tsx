'use client'

import React, { useState, useEffect } from 'react'
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
import { SIDEBAR_MENU } from '@/constants'
import { authService } from '@/services/api'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/utils'

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout, login } = useAuthStore()

  // Restore session
  useEffect(() => {
    const initAuth = async () => {
      if (!user) {
        const token = localStorage.getItem('auth_token')
        if (token) {
          try {
            const response = await authService.getCurrentUser()
            const userData = response.data
            login({
              id: userData.id,
              name: userData.fullName,
              email: userData.email,
              role: userData.role,
            })
          } catch (error) {
            console.error('Session restoration failed:', error)
          }
        }
      }
    }
    initAuth()
  }, [user, login])

  // Set sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (sidebarOpen && window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar')
        const menuButton = document.getElementById('menu-button')
        if (sidebar && !sidebar.contains(target) && menuButton && !menuButton.contains(target)) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sidebarOpen])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [pathname])

  const iconMap: Record<string, React.ReactNode> = {
    LayoutDashboard: <LayoutDashboard className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    File: <File className="h-5 w-5" />,
    Calendar: <Calendar className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    Settings: <Settings className="h-5 w-5" />,
  }

  return (
    <div className="flex h-screen bg-legal-ivory overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 md:w-72 lg:w-80 border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="border-b border-gray-200 px-4 md:px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-lg md:text-xl font-bold text-legal-navy">Legal CMS</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-1 md:gap-2 px-2 md:px-3 py-4 md:py-6 overflow-y-auto">
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
                    'flex items-center gap-3 rounded-lg px-3 md:px-4 py-2.5 md:py-3 transition-all duration-200',
                    isActive
                      ? 'border-r-4 border-legal-gold bg-legal-navy/10 text-legal-navy font-medium'
                      : 'text-gray-600 hover:bg-legal-navy/5 hover:text-legal-navy'
                  )}
                >
                  {icon}
                  <span className="text-sm md:text-base">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-3 md:p-4 flex-shrink-0">
          <button
            onClick={async () => {
              await authService.logout()
              logout()
              setSidebarOpen(false)
              window.location.href = '/login'
            }}
            className="w-full flex items-center gap-2 rounded-lg px-3 md:px-4 py-2 text-gray-600 hover:bg-legal-navy/5 hover:text-legal-navy text-left transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm md:text-base">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn('flex flex-1 flex-col w-full min-w-0', 'md:ml-72 lg:ml-80')}>
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-3 md:px-6 py-3 md:py-4 shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
              <button
                id="menu-button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex-shrink-0 rounded-lg p-2 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
              </button>
              <h2 className="font-serif text-sm md:text-lg font-semibold text-legal-navy truncate">
                {SIDEBAR_MENU.find((m) => m.href === pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              {/* Notifications */}
              <button className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors" aria-label="Notifications">
                <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-legal-red"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 md:gap-2 rounded-lg px-2 md:px-3 py-2 hover:bg-gray-100 transition-colors"
                  aria-label="User menu"
                >
                  <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-legal-gold flex items-center justify-center text-legal-navy font-semibold text-sm md:text-base flex-shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="hidden sm:block text-left min-w-0">
                    <p className="text-xs md:text-sm font-medium text-legal-charcoal truncate max-w-[120px]">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize truncate">{user?.role}</p>
                  </div>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-600 hidden sm:block flex-shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 md:w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-3 md:px-4 py-2 hover:bg-gray-50 text-xs md:text-sm text-legal-charcoal border-b border-gray-200"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </div>
                    </Link>
                    <button
                      onClick={async () => {
                        await authService.logout()
                        logout()
                        setDropdownOpen(false)
                        window.location.href = '/login'
                      }}
                      className="w-full text-left px-3 md:px-4 py-2 hover:bg-gray-50 text-xs md:text-sm text-legal-charcoal"
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
        <main className="flex-1 overflow-auto p-3 md:p-4 lg:p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
