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
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-legal-navy mb-2">Cases</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage and track all your legal cases</p>
        </div>
        <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto touch-manipulation">
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">New Case</span>
          <span className="sm:hidden">New</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredCases.map((caseItem) => {
            const statusConfig = CASE_STATUSES.find((s) => s.value === caseItem.status)
            return (
              <div
                key={caseItem.id}
                className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className="font-mono text-sm font-semibold text-legal-navy block mb-1">
                      {caseItem.caseNumber}
                    </span>
                    <p className="text-sm font-medium text-gray-900 mb-1">{caseItem.title}</p>
                    <p className="text-xs text-gray-500">
                      {caseItem.petitioner} vs {caseItem.respondent.split(' ').pop()}
                    </p>
                  </div>
                  <Badge variant={statusConfig?.value === 'active' ? 'success' : statusConfig?.value === 'pending' ? 'warning' : 'info'}>
                    {statusConfig?.label}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600 space-y-1 mb-3">
                  <div>{caseItem.court}</div>
                  <div>Next: {format(caseItem.nextHearing, 'dd MMM yyyy')}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors touch-manipulation flex items-center justify-center gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors touch-manipulation">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="py-2 px-3 bg-red-50 hover:bg-red-100 rounded-lg text-legal-red transition-colors touch-manipulation">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
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
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors touch-manipulation">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors touch-manipulation">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-red transition-colors touch-manipulation">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
          Showing <span className="font-semibold">{filteredCases.length}</span> of{' '}
          <span className="font-semibold">{mockCases.length}</span> cases
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="secondary" size="sm" className="touch-manipulation">
            Previous
          </Button>
          <Button variant="secondary" size="sm" className="touch-manipulation">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
