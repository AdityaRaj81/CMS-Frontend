'use client'

import React from 'react'
import Link from 'next/link'
import { Button, Input, Alert } from '@/components/ui'
import { Lock, Mail } from 'lucide-react'
import { authService } from '@/services/api'
import { useAuthStore } from '@/store/auth'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const { login: storeLogin } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authService.login(email, password)
      const data = response.data

      // Store JWT token
      localStorage.setItem('auth_token', data.jwtToken)
      document.cookie = `auth_token=${data.jwtToken}; path=/; max-age=86400; SameSite=Strict`

      // Store user info in store
      storeLogin({
        id: data.userId,
        name: data.fullName,
        email: data.email,
        role: data.role as any,
      })

      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (err: any) {
      console.error('Login error:', err)
      if (err.response?.status === 401) {
        setError('Invalid email or password')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-legal-navy to-legal-navy/80 px-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-legal-ivory mb-2">Legal CMS</h1>
          <p className="text-legal-gold font-medium">Professional Case Management System</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 font-serif text-2xl font-semibold text-legal-navy">Secure Login</h2>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="advocate@lawfirm.com"
              icon={<Mail className="h-5 w-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="h-5 w-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-legal-gold hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-legal-ivory/70">
          <p>© 2026 Legal CMS. All rights reserved.</p>
          <p className="mt-2">For Indian Law Firms • Patna High Court</p>
        </div>
      </div>
    </div>
  )
}
