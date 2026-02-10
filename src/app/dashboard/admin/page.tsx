'use client'

import React, { useState } from 'react'
import { Button, Input, Select, Card, Badge, Tabs } from '@/components/ui'
import { Search, Plus, Edit, Trash2, Shield } from 'lucide-react'
import { USER_ROLES } from '@/constants'

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinedDate: Date
}

interface Permission {
  id: string
  name: string
  description: string
  allowed: boolean
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@cms.com',
    role: 'admin',
    status: 'active',
    joinedDate: new Date(2023, 11, 1),
  },
  {
    id: '2',
    name: 'John Advocate',
    email: 'john@lawfirm.com',
    role: 'advocate',
    status: 'active',
    joinedDate: new Date(2024, 0, 15),
  },
  {
    id: '3',
    name: 'Sarah Associate',
    email: 'sarah@lawfirm.com',
    role: 'associate',
    status: 'active',
    joinedDate: new Date(2024, 0, 20),
  },
  {
    id: '4',
    name: 'Client User',
    email: 'client@example.com',
    role: 'client',
    status: 'inactive',
    joinedDate: new Date(2024, 1, 10),
  },
]

const permissions: Permission[] = [
  { id: '1', name: 'View Cases', description: 'Can view case details and information', allowed: true },
  { id: '2', name: 'Create Cases', description: 'Can create new cases', allowed: true },
  { id: '3', name: 'Edit Cases', description: 'Can edit existing cases', allowed: false },
  { id: '4', name: 'Delete Cases', description: 'Can delete cases', allowed: false },
  { id: '5', name: 'Upload Documents', description: 'Can upload case documents', allowed: true },
  { id: '6', name: 'Manage Users', description: 'Can manage user accounts', allowed: false },
  { id: '7', name: 'View Reports', description: 'Can access admin reports', allowed: false },
  { id: '8', name: 'Export Data', description: 'Can export case data', allowed: true },
]

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)

  const handleFilter = () => {
    let filtered = mockUsers

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterRole) {
      filtered = filtered.filter((u) => u.role === filterRole)
    }

    setFilteredUsers(filtered)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, filterRole])

  const tabsContent = [
    {
      id: 'users',
      label: 'User Management',
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-serif text-base md:text-lg font-semibold text-legal-navy">Users</h3>
            <Button variant="primary" size="sm" className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="text-sm">Add User</span>
            </Button>
          </div>

          {/* Filters */}
          <Card className="border-2 border-legal-gold/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Search by name or email..."
                icon={<Search className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                options={[{ value: '', label: 'All Roles' }, ...USER_ROLES]}
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              />
            </div>
          </Card>

          {/* Users Table - Mobile Responsive */}
          <Card className="overflow-hidden">
            <div className="mobile-scroll-x">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-xs md:text-sm">
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const roleLabel = USER_ROLES.find((r) => r.value === user.role)?.label
                    return (
                      <tr
                        key={user.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{user.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="primary" className="text-xs capitalize">
                            {roleLabel}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={user.status === 'active' ? 'success' : 'warning'}
                            className="text-xs capitalize"
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-600">
                            {user.joinedDate.toLocaleDateString('en-IN')}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-red transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'permissions',
      label: 'Role Permissions',
      content: (
        <div className="space-y-4 md:space-y-6">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Manage Permissions</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {USER_ROLES.map((role) => (
              <Card
                key={role.value}
                className="border-l-4 border-legal-gold cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-legal-gold" />
                  <span className="font-medium text-gray-900 capitalize">{role.label}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Permissions Table */}
          <Card className="overflow-hidden">
            <div className="mb-4 border-b border-gray-200 pb-4">
              <h4 className="font-serif text-base font-semibold text-legal-navy">Admin Permissions</h4>
            </div>

            <div className="space-y-3">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                  <div>
                    <p className="font-medium text-gray-900">{permission.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permission.allowed}
                      readOnly
                      className="h-4 w-4 rounded border-gray-300 accent-legal-gold"
                    />
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
              <Button variant="secondary" size="sm" className="flex-1">
                Reset to Default
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div className="space-y-4 md:space-y-6">
          <h3 className="font-serif text-lg font-semibold text-legal-navy">Security Settings</h3>

          <Card>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">Password Policy</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded accent-legal-gold" defaultChecked />
                    <span className="text-gray-600">Minimum 12 characters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded accent-legal-gold" defaultChecked />
                    <span className="text-gray-600">Mixed case and numbers required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded accent-legal-gold" defaultChecked />
                    <span className="text-gray-600">Special characters required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded accent-legal-gold" />
                    <span className="text-gray-600">Expire passwords after 90 days</span>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Require 2FA for admin users</span>
                  <input type="checkbox" className="h-4 w-4 rounded accent-legal-gold" defaultChecked />
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Session Management</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <label className="text-gray-600">Session timeout (minutes)</label>
                    <input type="number" defaultValue="30" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6 pt-6 border-t border-gray-200">
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Save Settings
              </Button>
            </div>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage users, roles, and system permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">Total Users</p>
            <p className="text-2xl font-bold text-legal-navy">{mockUsers.length}</p>
          </div>
        </Card>
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">Active Users</p>
            <p className="text-2xl font-bold text-green-600">
              {mockUsers.filter((u) => u.status === 'active').length}
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">Roles Configured</p>
            <p className="text-2xl font-bold text-legal-gold">{USER_ROLES.length}</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <Tabs tabs={tabsContent} />
      </Card>
    </div>
  )
}
