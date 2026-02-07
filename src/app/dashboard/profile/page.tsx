'use client'

import React, { useState } from 'react'
import { Button, Input, Card, Alert } from '@/components/ui'
import { User, Mail, Phone, Building2, BarChart3, Save, Eye, EyeOff } from 'lucide-react'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'John Advocate',
    email: 'john@lawfirm.com',
    phone: '+91 9876543210',
    barNumber: 'BIH/015/2020',
    firm: 'Sharma & Associates',
    specialization: 'Constitutional Law',
    experience: '15',
  })

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

  const handleProfileChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {saved && (
        <Alert type="success" message="Profile updated successfully!" onClose={() => setSaved(false)} />
      )}

      {/* Profile Card */}
      <Card>
        <div className="mb-6 flex items-center gap-4 border-b border-gray-200 pb-6">
          <div className="h-16 w-16 rounded-full bg-legal-gold flex items-center justify-center text-legal-navy font-bold text-2xl">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-legal-navy">{formData.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{formData.barNumber}</p>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => handleProfileChange('name', e.target.value)}
            icon={<User className="h-5 w-5" />}
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleProfileChange('email', e.target.value)}
            icon={<Mail className="h-5 w-5" />}
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
            value={formData.firm}
            onChange={(e) => handleProfileChange('firm', e.target.value)}
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

        <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveProfile}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Profile
          </Button>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Change Password</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-legal-charcoal">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-legal-charcoal">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-legal-charcoal">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10 focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20"
              />
              <button
                onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Update Password
          </Button>
        </div>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Two-Factor Authentication</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-legal-gold/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-legal-navy"></div>
            </label>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            When enabled, you will be required to enter a verification code from your authenticator app when logging in.
          </p>
        </div>
      </Card>

      {/* Account Preferences */}
      <Card>
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          {[
            { id: 'email-hearing', label: 'Email notifications for upcoming hearings', checked: true },
            { id: 'email-orders', label: 'Notify when court orders are received', checked: true },
            { id: 'email-deadline', label: 'Deadline reminder emails', checked: true },
            { id: 'email-weekly', label: 'Weekly summary report', checked: false },
          ].map((pref) => (
            <div key={pref.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                id={pref.id}
                defaultChecked={pref.checked}
                className="h-4 w-4 rounded border-gray-300 accent-legal-gold"
              />
              <label htmlFor={pref.id} className="text-sm text-gray-600 cursor-pointer">
                {pref.label}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Save Preferences
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-l-4 border-legal-red">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-lg font-semibold text-legal-red">Danger Zone</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Delete Account</p>
            <p className="text-sm text-gray-500 mt-1">This action cannot be undone. All your data will be permanently deleted.</p>
          </div>
          <Button variant="danger" size="sm">
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  )
}
