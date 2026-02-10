'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Badge, Tabs, TextArea } from '@/components/ui'
import { ArrowLeft, Copy, Activity, Clock, FileText, Download as DownloadIcon } from 'lucide-react'
import { format } from 'date-fns'

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState('')

  // Mock case data
  const caseData = {
    id: params.id,
    caseNumber: 'PIL/2024/156',
    cnr: 'BIH01010022401901856',
    title: 'Petition vs. State of Bihar',
    petitioner: 'Raj Kumar',
    respondent: 'State of Bihar',
    court: 'Patna High Court',
    judge: 'Hon. Justice Vikram Singh',
    nextHearing: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    filedDate: new Date(2024, 0, 15),
    status: 'active',
    description: 'PIL for safeguarding constitutional rights under Article 32 of the Indian Constitution',
  }

  const courtDates = [
    { date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), type: 'Hearing', status: 'Scheduled' },
    { date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), type: 'Arguments', status: 'Pending' },
    { date: new Date(2024, 5, 15), type: 'Judgment', status: 'Expected' },
  ]

  const documents = [
    { id: '1', name: 'Petition.pdf', type: 'petition', size: '2.4 MB', uploadedDate: new Date(2024, 0, 15) },
    { id: '2', name: 'Affidavit_1.pdf', type: 'affidavit', size: '1.8 MB', uploadedDate: new Date(2024, 1, 10) },
    { id: '3', name: 'Court_Order_1.pdf', type: 'order', size: '892 KB', uploadedDate: new Date(2024, 1, 20) },
    { id: '4', name: 'Reply_Notice.pdf', type: 'notice', size: '645 KB', uploadedDate: new Date(2024, 2, 5) },
  ]

  const activities = [
    { id: '1', type: 'document', description: 'Reply Notice uploaded', user: 'You', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: '2', type: 'status', description: 'Case status changed to Active', user: 'System', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { id: '3', type: 'hearing', description: 'New hearing scheduled', user: 'Admin', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
  ]

  const tabsContent = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Case Summary</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{caseData.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Parties Involved</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-500">Petitioner</p>
                  <p className="font-medium text-gray-900">{caseData.petitioner}</p>
                </div>
                <div>
                  <p className="text-gray-500">Respondent</p>
                  <p className="font-medium text-gray-900">{caseData.respondent}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <Card>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Judge</p>
                <p className="font-medium text-gray-900">{caseData.judge}</p>
              </div>
            </Card>
            <Card>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Filed Date</p>
                <p className="font-medium text-gray-900">{format(caseData.filedDate, 'dd MMM yyyy')}</p>
              </div>
            </Card>
            <Card>
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Duration</p>
                <p className="font-medium text-gray-900">14 months</p>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    {
      id: 'court-status',
      label: 'Court Status',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {courtDates.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-legal-gold">
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-legal-gold flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600">{item.type}</p>
                    <p className="text-base font-medium text-gray-900 mt-1">{format(item.date, 'dd MMM yyyy')}</p>
                    <Badge variant={item.status === 'Scheduled' ? 'success' : item.status === 'Pending' ? 'warning' : 'info'} className="mt-2 text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-legal-navy/5 border-legal-navy/20">
            <div className="text-sm">
              <p className="text-gray-600 mb-2">Last Updated</p>
              <p className="font-medium text-gray-900">{format(new Date(), 'dd MMM yyyy HH:mm')}</p>
              <p className="text-xs text-gray-500 mt-2">Auto-fetched from court registry</p>
            </div>
          </Card>
        </div>
      ),
    },
    {
      id: 'documents',
      label: 'Documents',
      content: (
        <div className="space-y-3 md:space-y-4">
          <div className="flex flex-col sm:flex-row justify-end mb-3 md:mb-4">
            <Button variant="secondary" size="sm" className="gap-2 w-full sm:w-auto">
              <DownloadIcon className="h-4 w-4" />
              Download All
            </Button>
          </div>

          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-legal-gold" />
                  <div>
                    <p className="font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {doc.size} • {format(doc.uploadedDate, 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-legal-navy transition-colors" title="View">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-legal-navy transition-colors" title="Download">
                    <DownloadIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'notes',
      label: 'Notes',
      content: (
        <div className="space-y-4">
          <TextArea
            label="Add Case Notes"
            placeholder="Write important notes, observations, or case details here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
          />
          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              Cancel
            </Button>
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none">
              Save Notes
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Previous Notes</h4>
            <div className="space-y-3 text-sm">
              <div className="border border-gray-200 rounded-lg p-3">
                <p className="text-gray-600 mb-1">Added by <span className="font-medium">You</span> • {format(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 'dd MMM yyyy')}</p>
                <p className="text-gray-700">Next hearing arguments need to focus on constitutional aspects and precedent cases.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'activity',
      label: 'Activity Log',
      content: (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4 border-l-2 border-gray-200 pl-4 py-2">
              <div className="h-8 w-8 rounded-full bg-legal-gold/20 flex items-center justify-center flex-shrink-0">
                {activity.type === 'document' && <FileText className="h-4 w-4 text-legal-gold" />}
                {activity.type === 'status' && <Activity className="h-4 w-4 text-legal-gold" />}
                {activity.type === 'hearing' && <Clock className="h-4 w-4 text-legal-gold" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  By <span className="font-medium">{activity.user}</span> • {format(activity.date, 'dd MMM yyyy HH:mm')}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/dashboard/cases" className="flex items-center gap-2 text-legal-navy hover:text-legal-gold transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cases</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-legal-navy mb-2">{caseData.title}</h1>
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span className="font-mono text-sm font-semibold text-gray-600">{caseData.caseNumber}</span>
              <Copy className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              <Badge variant="success">Active</Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <Button variant="secondary" size="sm" className="flex-1 sm:flex-none">
              Edit
            </Button>
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none">
              Schedule Hearing
            </Button>
          </div>
        </div>
      </div>

      {/* Case Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">CNR Number</p>
            <p className="font-mono font-semibold text-gray-900 break-all">{caseData.cnr}</p>
          </div>
        </Card>
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">Court</p>
            <p className="font-medium text-gray-900">{caseData.court}</p>
          </div>
        </Card>
        <Card>
          <div className="text-sm">
            <p className="text-gray-500 mb-1">Next Hearing</p>
            <p className="font-medium text-gray-900">{format(caseData.nextHearing, 'dd MMM yyyy')}</p>
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
