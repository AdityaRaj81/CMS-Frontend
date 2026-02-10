'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Input, Select, Card, Badge } from '@/components/ui'
import { Upload, Search, Download, Eye, Trash2, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { DOCUMENT_TYPES } from '@/constants'
import { documentsService, casesService } from '@/services/api'

interface Document {
  id: string
  title: string
  caseNumber: string
  type: string
  fileSize: number
  uploadedDate: Date
  uploadedBy: string
  description: string
  fileUrl: string
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showViewer, setShowViewer] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch documents and cases
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [docsRes, casesRes] = await Promise.all([
          documentsService.getAll(),
          casesService.getAll()
        ])

        const casesMap = new Map(casesRes.data.map((c: any) => [c.id, c.caseNumber]))

        const mappedDocs = docsRes.data.map((d: any) => ({
          id: String(d.id),
          title: d.fileName,
          caseNumber: casesMap.get(d.caseId) || `Case #${d.caseId}`,
          type: d.documentType?.toLowerCase() || 'other',
          fileSize: 0, // Backend doesn't return size yet
          uploadedDate: new Date(d.uploadedAt),
          uploadedBy: d.uploadedByName || 'Unknown',
          description: '', // Backend doesn't have description
          fileUrl: d.fileUrl
        }))

        setDocuments(mappedDocs)
        setFilteredDocuments(mappedDocs)
      } catch (err) {
        console.error('Failed to fetch data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleFilter = () => {
    let filtered = [...documents]

    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType) {
      filtered = filtered.filter((d) => d.type === filterType)
    }

    // Sort
    if (sortBy === 'date') {
      filtered.sort((a, b) => b.uploadedDate.getTime() - a.uploadedDate.getTime())
    } else if (sortBy === 'date-old') {
      filtered.sort((a, b) => a.uploadedDate.getTime() - b.uploadedDate.getTime())
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    setFilteredDocuments(filtered)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, filterType, sortBy, documents])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Unknown'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-0">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-legal-navy mb-1 md:mb-2">Documents</h1>
          <p className="text-sm md:text-base text-gray-600">Global document management and in-app PDF viewer</p>
        </div>
        <Link href="/dashboard/documents/upload">
          <Button variant="primary" size="md" className="gap-2 w-full sm:w-auto">
            <Upload className="h-5 w-5" />
            <span className="text-sm md:text-base">Upload Document</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Input
            placeholder="Search by title, case number, or description..."
            icon={<Search className="h-5 w-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            options={[
              { value: '', label: 'All Document Types' },
              ...DOCUMENT_TYPES,
            ]}
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          />

          <Select
            options={[
              { value: 'date', label: 'Sort by Date (Newest)' },
              { value: 'date-old', label: 'Sort by Date (Oldest)' },
              { value: 'name', label: 'Sort by Name' },
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="p-8">
          <p className="text-center text-gray-600">Loading documents...</p>
        </Card>
      )}

      {/* Empty State */}
      {!loading && filteredDocuments.length === 0 && (
        <Card className="p-8">
          <p className="text-center text-gray-600">No documents found.</p>
        </Card>
      )}

      {/* Documents Grid/List */}
      {!loading && filteredDocuments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Document List */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="mobile-scroll-x">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-xs md:text-sm">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Case
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => {
                      const typeConfig = DOCUMENT_TYPES.find((t) => t.value === doc.type)
                      return (
                        <tr
                          key={doc.id}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{doc.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono text-sm font-semibold text-legal-navy">{doc.caseNumber}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="primary" className="text-xs">
                              {typeConfig?.label || doc.type}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{formatFileSize(doc.fileSize)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{format(doc.uploadedDate, 'dd MMM yyyy')}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedDoc(doc)
                                  setShowViewer(true)
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-legal-navy transition-colors">
                                <Download className="h-4 w-4" />
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

          {/* Document Viewer Preview */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="sticky top-6">
              {selectedDoc && showViewer ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-legal-navy mb-2">{selectedDoc.title}</h3>
                    <p className="text-xs text-gray-500">{selectedDoc.caseNumber}</p>
                  </div>

                  {/* PDF Placeholder */}
                  <div className="bg-gray-100 border-2 border-gray-300 rounded-lg h-56 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-12 w-12 mx-auto mb-2 bg-legal-gold/20 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-legal-gold" />
                      </div>
                      <p className="text-xs text-gray-500">PDF Viewer</p>
                      <p className="text-xs text-gray-400 mt-1">{formatFileSize(selectedDoc.fileSize)}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Uploaded by:</span>
                      <span className="font-medium">{selectedDoc.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{format(selectedDoc.uploadedDate, 'dd MMM yyyy')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <Button variant="secondary" size="sm" className="flex-1 gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => setShowViewer(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Select a document to preview</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
