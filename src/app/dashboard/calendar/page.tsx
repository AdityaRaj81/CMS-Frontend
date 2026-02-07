'use client'

import React, { useState } from 'react'
import { Button, Card, Badge } from '@/components/ui'
import { ChevronLeft, ChevronRight, Plus, Dot } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns'

interface Hearing {
  id: string
  date: Date
  time: string
  caseNumber: string
  court: string
  type: 'regular' | 'ad-hoc' | 'urgent'
}

const mockHearings: Hearing[] = [
  {
    id: '1',
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    time: '10:30 AM',
    caseNumber: 'PIL/2024/156',
    court: 'Patna High Court',
    type: 'regular',
  },
  {
    id: '2',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    time: '2:00 PM',
    caseNumber: 'CS/2024/789',
    court: 'Patna District Court',
    type: 'urgent',
  },
  {
    id: '3',
    date: new Date(new Date().setDate(new Date().getDate() + 14)),
    time: '11:00 AM',
    caseNumber: 'COM/2024/234',
    court: 'Barh Civil Court',
    type: 'regular',
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get hearings for selected date
  const selectedHearings = selectedDate
    ? mockHearings.filter((h) => isSameDay(new Date(h.date), selectedDate))
    : []

  const getHearingsForDate = (date: Date) => {
    return mockHearings.filter((h) => isSameDay(new Date(h.date), date))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-legal-navy mb-2">Calendar</h1>
          <p className="text-gray-600">Schedule and manage hearing dates</p>
        </div>
        <Button variant="primary" size="md" className="gap-2">
          <Plus className="h-5 w-5" />
          Schedule Hearing
        </Button>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <h2 className="font-serif text-xl font-semibold text-legal-navy">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center font-semibold text-gray-600 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Previous month days */}
              {Array(daysInMonth[0].getDay())
                .fill(null)
                .map((_, idx) => (
                  <div key={`prev-${idx}`} className="aspect-square" />
                ))}

              {/* Current month days */}
              {daysInMonth.map((date) => {
                const dayHearings = getHearingsForDate(date)
                const isSelected = selectedDate && isSameDay(date, selectedDate)
                const isToday = isSameDay(date, new Date())

                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square rounded-lg p-2 text-center transition-all duration-200 flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-legal-navy text-white'
                        : isToday
                        ? 'bg-legal-gold/20 text-legal-navy border-2 border-legal-gold'
                        : dayHearings.length > 0
                        ? 'bg-blue-50 text-legal-navy border-2 border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm font-semibold">{format(date, 'd')}</span>
                    {dayHearings.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {dayHearings.slice(0, 2).map((_, idx) => (
                          <Dot key={idx} className="h-1.5 w-1.5 fill-current" />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Hearings List */}
        <div>
          <Card className="sticky top-6">
            <div className="mb-4">
              <h3 className="font-serif text-lg font-semibold text-legal-navy">
                {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select Date'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {selectedHearings.length} hearing{selectedHearings.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="space-y-3">
              {selectedHearings.length > 0 ? (
                selectedHearings.map((hearing) => (
                  <div
                    key={hearing.id}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-xs font-semibold text-legal-navy">{hearing.caseNumber}</p>
                        <p className="text-xs text-gray-600 mt-1">{hearing.court}</p>
                        <p className="text-sm font-medium text-gray-900 mt-2">{hearing.time}</p>
                      </div>
                      <Badge variant={hearing.type === 'urgent' ? 'danger' : 'info'} className="text-xs flex-shrink-0">
                        {hearing.type}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-3 border-t border-gray-100 pt-3">
                      <Button variant="secondary" size="sm" className="flex-1 text-xs">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 text-xs">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500">No hearings scheduled</p>
                  <Button variant="secondary" size="sm" className="mt-4 w-full gap-1">
                    <Plus className="h-4 w-4" />
                    Add Hearing
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Upcoming Hearings */}
      <Card>
        <div className="mb-4 border-b border-gray-200 pb-4">
          <h3 className="font-serif text-xl font-semibold text-legal-navy">All Upcoming Hearings</h3>
        </div>
        <div className="space-y-3">
          {mockHearings.map((hearing) => (
            <div key={hearing.id} className="flex items-start gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
              <div className="h-10 w-10 rounded-full bg-legal-gold/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-legal-gold">{format(new Date(hearing.date), 'd')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{hearing.caseNumber}</p>
                <p className="text-xs text-gray-500 mt-0.5">{hearing.time} • {hearing.court}</p>
              </div>
              <Badge variant={hearing.type === 'urgent' ? 'danger' : 'info'} className="text-xs flex-shrink-0">
                {hearing.type}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
