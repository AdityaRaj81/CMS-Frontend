'use client'

import React, { useState } from 'react'
import { Button, Input, Card, Badge } from '@/components/ui'
import { Search, Plus, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react'
import { format } from 'date-fns'

interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: 'individual' | 'organization'
  address: string
  caseCount: number
  createdDate: Date
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Raj Kumar',
    email: 'raj.kumar@email.com',
    phone: '+91 9876543210',
    type: 'individual',
    address: 'Patna, Bihar, India',
    caseCount: 2,
    createdDate: new Date(2024, 0, 15),
  },
  {
    id: '2',
    name: 'Sharma Associates',
    email: 'contact@sharma.in',
    phone: '+91 9876543211',
    type: 'organization',
    address: 'New Delhi, India',
    caseCount: 5,
    createdDate: new Date(2023, 6, 20),
  },
  {
    id: '3',
    name: 'ABC Industries',
    email: 'legal@abcindustries.com',
    phone: '+91 9876543212',
    type: 'organization',
    address: 'Mumbai, Maharashtra, India',
    caseCount: 3,
    createdDate: new Date(2023, 11, 10),
  },
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filteredClients, setFilteredClients] = useState(mockClients)

  const handleFilter = () => {
    let filtered = mockClients

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.phone.includes(searchTerm)
      )
    }

    if (filterType) {
      filtered = filtered.filter((c) => c.type === filterType)
    }

    setFilteredClients(filtered)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, filterType])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Clients</h1>
          <p className="text-gray-600">Manage clients and assign cases</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Plus className="h-5 w-5" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search by name, email, or phone..."
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-sans text-legal-charcoal focus:border-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-gold/20"
          >
            <option value="">All Client Types</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>
        </div>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="flex flex-col">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-legal-navy">{client.name}</h3>
                <Badge variant={client.type === 'individual' ? 'info' : 'primary'} className="mt-2 text-xs">
                  {client.type === 'individual' ? 'Individual' : 'Organization'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 mb-4 flex-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a href={`mailto:${client.email}`} className="text-gray-600 hover:text-legal-navy">
                  {client.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <a href={`tel:${client.phone}`} className="text-gray-600">
                  {client.phone}
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{client.address}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-600 mb-3">
                {client.caseCount} case{client.caseCount !== 1 ? 's' : ''} assigned
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="flex-1 gap-1">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-legal-red hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-3">
              Added {format(client.createdDate, 'dd MMM yyyy')}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
