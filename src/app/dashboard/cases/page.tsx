'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Card, Badge } from '@/components/ui'
import { Search, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { CASE_CATEGORIES, COURT_LIST, CASE_STATUSES } from '@/constants'
import { useCases } from '@/hooks'

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourt, setFilterCourt] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')

  const { cases, loading, error } = useCases()

  const filteredCases = useMemo(() => {
    let filtered = [...cases]

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.caseNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.caseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.petitionerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.respondentName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterCourt) {
      filtered = filtered.filter((c) => c.courtName === filterCourt)
    }

    if (filterCategory) {
      filtered = filtered.filter((c) => c.caseType === filterCategory)
    }

    // Apply sorting
    if (sortBy === 'case-number') {
      filtered.sort((a, b) => a.caseNumber.localeCompare(b.caseNumber))
    } else if (sortBy === 'status') {
      filtered.sort((a, b) => a.status.localeCompare(b.status))
    } else {
      filtered.sort((a, b) => {
        const dateA = a.nextHearingDate ? new Date(a.nextHearingDate).getTime() : 0
        const dateB = b.nextHearingDate ? new Date(b.nextHearingDate).getTime() : 0
        return dateA - dateB
      })
    }

    return filtered
  }, [cases, searchTerm, filterCourt, filterCategory, sortBy])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-legal-navy mb-1 md:mb-2">Cases</h1>
          <p className="text-sm md:text-base text-gray-600">Manage and track all your legal cases</p>
        </div>
        <Link href="/dashboard/cases/new">
          <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
            <Plus className="h-5 w-5" />
            <span className="text-sm md:text-base">New Case</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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

      {/* Loading State */}
      {loading && (
        <Card className="p-8">
          <p className="text-center text-gray-600">Loading cases...</p>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-8 bg-red-50 border border-red-200">
          <p className="text-center text-red-600">Error: {error}</p>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCases.length === 0 && (
        <Card className="p-8">
          <p className="text-center text-gray-600">No cases found. Create your first case to get started.</p>
        </Card>
      )}

      {/* Cases Table */}
      {!loading && !error && filteredCases.length > 0 && (
        <Card className="overflow-hidden">
          <div className="mobile-scroll-x">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-xs md:text-sm">
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
                {filteredCases.map((caseItem: any) => {
                  const statusConfig = CASE_STATUSES.find((s) => s.value === caseItem.status)
                  const nextHearing = caseItem.nextHearingDate
                    ? new Date(caseItem.nextHearingDate)
                    : undefined
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
                          <p className="text-sm font-medium text-gray-900">{caseItem.caseTitle}</p>
                          <p className="text-xs text-gray-500">
                            {caseItem.petitionerName} vs {caseItem.respondentName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{caseItem.courtName}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            statusConfig?.value === 'active'
                              ? 'success'
                              : statusConfig?.value === 'pending'
                                ? 'warning'
                                : 'info'
                          }
                        >
                          {statusConfig?.label || caseItem.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {nextHearing ? format(nextHearing, 'dd MMM yyyy') : 'N/A'}
                        </span>
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
      )}

      {/* Pagination */}
      {!loading && !error && filteredCases.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs md:text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredCases.length}</span> of{' '}
            <span className="font-semibold">{cases.length}</span> cases
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none text-xs md:text-sm">
              Previous
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none text-xs md:text-sm">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
