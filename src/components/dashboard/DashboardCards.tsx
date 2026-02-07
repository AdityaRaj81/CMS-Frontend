'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui'
import { Clock, AlertCircle, FileText, Users, Calendar, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export const NextHearingCard: React.FC<{ hearing?: any }> = ({ hearing }) => {
  const today = new Date()
  const nextDate = hearing?.date || new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="col-span-2 bg-gradient-to-br from-legal-navy/5 to-transparent border-legal-gold/30">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500">Next Hearing</p>
          <h3 className="font-serif text-2xl font-bold text-legal-navy mt-2">
            {format(nextDate, 'dd MMM yyyy')}
          </h3>
        </div>
        <Calendar className="h-8 w-8 text-legal-gold" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-legal-charcoal" />
          <span className="text-sm text-legal-charcoal">Patna High Court, Room 205</span>
        </div>

        {daysUntil <= 3 && (
          <Badge variant="danger" className="w-fit">
            <AlertCircle className="h-3 w-3 mr-1" />
            {daysUntil} days away
          </Badge>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1">
          View Details
        </Button>
        <Button variant="accent" size="sm" className="flex-1">
          Set Reminder
        </Button>
      </div>
    </Card>
  )
}

interface ActiveCaseItem {
  id: string
  title: string
  caseNumber: string
  petitioner: string
  respondent: string
  status: 'active' | 'pending' | 'closed'
}

export const MyActiveCasesCard: React.FC<{ cases?: ActiveCaseItem[] }> = ({ cases = [] }) => {
  const mockCases = cases.length > 0 ? cases : [
    { id: '1', title: 'vs. State of Bihar', caseNumber: 'PIL/2024/156', petitioner: 'Raj Kumar', respondent: 'State', status: 'active' as const },
    { id: '2', title: 'Land Dispute', caseNumber: 'CS/2024/789', petitioner: 'Sharma Associates', respondent: 'Patel Group', status: 'active' as const },
    { id: '3', title: 'Contract Breach', caseNumber: 'COM/2024/234', petitioner: 'ABC Industries', respondent: 'XYZ Corp', status: 'pending' as const },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>My Active Cases</CardTitle>
          <FileText className="h-5 w-5 text-legal-gold" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockCases.slice(0, 3).map((caseItem) => (
            <div key={caseItem.id} className="flex items-start justify-between border-b border-gray-100 pb-3 last:border-0">
              <div className="flex-1">
                <p className="font-mono text-xs font-semibold text-legal-navy">{caseItem.caseNumber}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{caseItem.title}</p>
              </div>
              <Badge variant={caseItem.status === 'active' ? 'success' : 'warning'} className="ml-2">
                {caseItem.status}
              </Badge>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Cases
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export const RecentCourtOrdersCard: React.FC<{ orders?: any[] }> = ({ orders = [] }) => {
  const mockOrders = orders.length > 0 ? orders : [
    { id: '1', caseNumber: 'PIL/2024/156', date: new Date(), status: 'received' },
    { id: '2', caseNumber: 'CS/2024/789', date: new Date(Date.now() - 24 * 60 * 60 * 1000), status: 'pending' },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Court Orders</CardTitle>
          <AlertCircle className="h-5 w-5 text-legal-red" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
              <div className="h-2 w-2 rounded-full bg-legal-red mt-2"></div>
              <div className="flex-1">
                <p className="font-mono text-xs font-semibold text-legal-navy">{order.caseNumber}</p>
                <p className="text-xs text-gray-500 mt-1">{format(order.date, 'dd MMM yyyy')}</p>
              </div>
              <Badge variant="danger" className="text-xs">
                {order.status === 'received' ? 'New' : 'Review'}
              </Badge>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-4">
          View All Orders
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}

export const AlertsNotificationsCard: React.FC<{ alerts?: any[] }> = ({ alerts = [] }) => {
  const mockAlerts = alerts.length > 0 ? alerts : [
    { id: '1', title: 'Hearing Reminder', message: 'PIL/2024/156 hearing in 3 days', type: 'hearing' },
    { id: '2', title: 'Court Order', message: 'New order received in CS/2024/789', type: 'order' },
    { id: '3', title: 'Deadline Alert', message: 'Reply due by 15 Feb for COM/2024/234', type: 'deadline' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts & Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockAlerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <div className="h-2 w-2 rounded-full bg-legal-gold mt-1.5"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-legal-charcoal">{alert.title}</p>
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const QuickActionsCard: React.FC = () => {
  const actions = [
    { label: 'New Case', icon: FileText, href: '/cases/new', color: 'bg-legal-navy text-white' },
    { label: 'Add Document', icon: Calendar, href: '/documents/upload', color: 'bg-legal-gold text-legal-navy' },
    { label: 'Schedule Hearing', icon: Clock, href: '/calendar/new', color: 'bg-blue-100 text-blue-700' },
    { label: 'Add Client', icon: Users, href: '/clients/new', color: 'bg-green-100 text-green-700' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                className={`flex flex-col items-center gap-2 rounded-lg p-4 transition-all duration-200 hover:shadow-md ${action.color}`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium text-center">{action.label}</span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export const StatsCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; color?: string }> = ({
  label,
  value,
  icon,
  color = 'text-legal-navy',
}) => {
  return (
    <Card className="flex items-center gap-4">
      <div className={`rounded-lg bg-gray-100 p-3 ${color}`}>{icon}</div>
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-legal-navy">{value}</p>
      </div>
    </Card>
  )
}
