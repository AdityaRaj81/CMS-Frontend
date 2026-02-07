'use client'

import React, { useState } from 'react'
import { Button, Input, Select, Card, Badge } from '@/components/ui'
import { Upload, Search, Download, Eye, Trash2, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { DOCUMENT_TYPES } from '@/constants'

interface Document {
  id: string
  title: string
  caseNumber: string
  type: string
  fileSize: number
  uploadedDate: Date
  uploadedBy: string
  description: string
}

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Petition.pdf',
    caseNumber: 'PIL/2024/156',
    type: 'petition',
    fileSize: 2400,
    uploadedDate: new Date(2024, 0, 15),
    uploadedBy: 'You',
    description: 'Main petition filed before court',
  },
  {
    id: '2',
    title: 'Affidavit_Applicant.pdf',
    caseNumber: 'PIL/2024/156',
    type: 'affidavit',
    fileSize: 1800,
    uploadedDate: new Date(2024, 1, 10),
    uploadedBy: 'Associate',
    description: 'Affidavit supporting the petition',
  },
  {
    id: '3',
    title: 'Court_Order_01.pdf',
    caseNumber: 'CS/2024/789',
    type: 'order',
    fileSize: 892,
    uploadedDate: new Date(2024, 1, 20),
    uploadedBy: 'System',
    description: 'Interim order from Hon. Court',
  },
  {
    id: '4',
    title: 'Notice_Response.pdf',
    caseNumber: 'FAM/2024/567',
    type: 'notice',
    fileSize: 645,
    uploadedDate: new Date(2024, 2, 5),
    uploadedBy: 'You',
    description: 'Response to court notice',
  },
  {
    id: '5',
    title: 'Judgment_Final.pdf',
    caseNumber: 'CS/2024/789',
    type: 'judgment',
    fileSize: 3200,
    uploadedDate: new Date(2024, 2, 15),
    uploadedBy: 'System',
    description: 'Final judgment delivered',
  },
]

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showViewer, setShowViewer] = useState(false)

  const handleFilter = () => {
    let filtered = mockDocuments

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

    setFilteredDocuments(filtered)
  }

  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, filterType])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Documents</h1>
          <p className="text-gray-600">Global document management and in-app PDF viewer</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Upload className="h-5 w-5" />
          Upload Document
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-2 border-legal-gold/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              { value: 'size', label: 'Sort by Size' },
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </Card>

      {/* Documents Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
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
                            {typeConfig?.label}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{formatFileSize(doc.fileSize * 1024)}</span>
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
        <div className="lg:col-span-1">
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
                    <p className="text-xs text-gray-400 mt-1">{formatFileSize(selectedDoc.fileSize * 1024)}</p>
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
    </div>
  )
}
