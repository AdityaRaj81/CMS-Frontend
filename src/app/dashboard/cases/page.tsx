'use client'

import React, { useState } from 'react'
import { Button, Input, Select, Card, Badge } from '@/components/ui'
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { CASE_CATEGORIES, COURT_LIST, CASE_STATUSES } from '@/constants'

interface Case {
  id: string
  caseNumber: string
  title: string
  petitioner: string
  respondent: string
  court: string
  category: string
  status: string
  nextHearing: Date
}

const mockCases: Case[] = [
  {
    id: '1',
    caseNumber: 'PIL/2024/156',
    title: 'vs. State of Bihar',
    petitioner: 'Raj Kumar',
    respondent: 'State of Bihar',
    court: 'Patna High Court',
    category: 'civil',
    status: 'active',
    nextHearing: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    caseNumber: 'CS/2024/789',
    title: 'Land Dispute Settlement',
    petitioner: 'Sharma Associates',
    respondent: 'Patel Group',
    court: 'Patna District Court',
    category: 'commercial',
    status: 'active',
    nextHearing: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    caseNumber: 'COM/2024/234',
    title: 'Contract Breach Case',
    petitioner: 'ABC Industries',
    respondent: 'XYZ Corporation',
    court: 'Barh Civil Court',
    category: 'commercial',
    status: 'pending',
    nextHearing: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    caseNumber: 'FAM/2024/567',
    title: 'Property Division',
    petitioner: 'Ms. Priya Singh',
    respondent: 'Mr. Ajay Singh',
    court: 'Patna District Court',
    category: 'family',
    status: 'closed',
    nextHearing: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
]

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourt, setFilterCourt] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [filteredCases, setFilteredCases] = useState(mockCases)

  const handleFilter = () => {
    let filtered = mockCases

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.petitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.respondent.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCourt) {
      filtered = filtered.filter((c) => c.court === filterCourt)
    }

    if (filterCategory) {
      filtered = filtered.filter((c) => c.category === filterCategory)
    }

    setFilteredCases(filtered)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, filterCourt, filterCategory])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Cases</h1>
          <p className="text-gray-600">Manage and track all your legal cases</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Plus className="h-5 w-5" />
          New Case
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search case number, party name, CNR..."
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            options={[
              { value: '', label: 'All Courts' },
              ...COURT_LIST.map((c) => ({ value: c.name, label: c.name })),
            ]}
            value={filterCourt}
            onChange={(e) => setFilterCourt(e.target.value)}
          />

          <Select
            options={[
              { value: '', label: 'All Categories' },
              ...CASE_CATEGORIES,
            ]}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          />

          <Select
            options={[
              { value: 'date', label: 'Sort by Date' },
              { value: 'case-number', label: 'Sort by Case Number' },
              { value: 'status', label: 'Sort by Status' },
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </Card>

      {/* Cases Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Case Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Court
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Next Hearing
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => {
                const statusConfig = CASE_STATUSES.find((s) => s.value === caseItem.status)
                return (
                  <tr
                    key={caseItem.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-semibold text-legal-navy">{caseItem.caseNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{caseItem.title}</p>
                        <p className="text-xs text-gray-500">
                          {caseItem.petitioner} vs {caseItem.respondent.split(' ').pop()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{caseItem.court}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={statusConfig?.value === 'active' ? 'success' : statusConfig?.value === 'pending' ? 'warning' : 'info'}>
                        {statusConfig?.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{format(caseItem.nextHearing, 'dd MMM yyyy')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{filteredCases.length}</span> of{' '}
          <span className="font-semibold">{mockCases.length}</span> cases
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Previous
          </Button>
          <Button variant="secondary" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
