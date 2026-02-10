'use client'

import React, { useState, useEffect } from 'react'
import { Button, Input, Card, Alert } from '@/components/ui'
import { User, Mail, Phone, Building2, BarChart3, Save, Eye, EyeOff } from 'lucide-react'
import { authService, usersService } from '@/services/api'
import { useAuthStore } from '@/store/auth'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    barNumber: '',
    firmName: '',
    specialization: '',
    experience: '',
  })

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getCurrentUser()
        const data = response.data
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phone || '',
          barNumber: data.barNumber || '',
          firmName: data.firmName || '',
          specialization: data.specialization || '',
          experience: data.experience || '',
        })
      } catch (err) {
        console.error('Failed to fetch profile', err)
      }
    }
    fetchProfile()
  }, [])

  const handleProfileChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    setError('')
    setSaved(false)
    try {
      await usersService.updateProfile(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      console.error('Failed to update profile', err)
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6 max-w-full md:max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-legal-navy mb-1 md:mb-2">Profile Settings</h1>
        <p className="text-sm md:text-base text-gray-600">Manage your account and preferences</p>
      </div>

      {saved && (
        <Alert type="success" message="Profile updated successfully!" onClose={() => setSaved(false)} />
      )}
      {error && (
        <Alert type="error" message={error} onClose={() => setError('')} />
      )}

      {/* Profile Card */}
      <Card>
        <div className="mb-6 flex items-center gap-4 border-b border-gray-200 pb-6">
          <div className="h-16 w-16 rounded-full bg-legal-gold flex items-center justify-center text-legal-navy font-bold text-2xl">
            {formData.fullName?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-legal-navy">{formData.fullName}</h2>
            <p className="text-sm text-gray-500 capitalize">{formData.barNumber}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={(e) => handleProfileChange('fullName', e.target.value)}
            icon={<User className="h-5 w-5" />}
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            icon={<Mail className="h-5 w-5" />}
            disabled
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => handleProfileChange('phone', e.target.value)}
            icon={<Phone className="h-5 w-5" />}
          />

          <Input
            label="Bar License Number"
            value={formData.barNumber}
            onChange={(e) => handleProfileChange('barNumber', e.target.value)}
            icon={<BarChart3 className="h-5 w-5" />}
          />

          <Input
            label="Law Firm"
            value={formData.firmName}
            onChange={(e) => handleProfileChange('firmName', e.target.value)}
            icon={<Building2 className="h-5 w-5" />}
          />

          <Input
            label="Specialization"
            value={formData.specialization}
            onChange={(e) => handleProfileChange('specialization', e.target.value)}
          />

          <Input
            label="Years of Experience"
            type="number"
            value={formData.experience}
            onChange={(e) => handleProfileChange('experience', e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
          <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveProfile}
            loading={loading}
            className="gap-2 flex-1 sm:flex-none"
          >
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Change Password - Placeholder for now or implement if backend supports */}
      {/* ... (Keep existing password UI but maybe disable it if not implemented) ... */}
      <Card>
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Change Password</h3>
        </div>
        <p className="text-sm text-gray-500">Password change functionality coming soon.</p>
      </Card>
    </div>
  )
}
