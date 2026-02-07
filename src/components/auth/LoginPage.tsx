'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button, Input, Alert } from '@/components/ui'
import { Lock, Mail } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

export const LoginPage: React.FC = () => {
  const router = useRouter()
  const { login } = useAuthStore()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login - in production, validate credentials
      if (email && password) {
        // Set mock user based on email
        const mockUser = {
          id: '1',
          name: email.includes('admin') ? 'Admin User' : 'John Advocate',
          email: email,
          role: email.includes('admin') ? 'admin' : 'advocate',
        }
        
        login(mockUser as any)
        localStorage.setItem('auth_token', 'mock_token')
        router.push('/dashboard')
      } else {
        setError('Please enter valid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
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

          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-600">
              Demo credentials:
              <br />
              <span className="font-mono text-xs mt-2 block">admin@cms.com / password123</span>
            </p>
          </div>
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
