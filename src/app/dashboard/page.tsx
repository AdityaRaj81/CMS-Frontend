'use client'

import React from 'react'
import {
  NextHearingCard,
  MyActiveCasesCard,
  RecentCourtOrdersCard,
  AlertsNotificationsCard,
  QuickActionsCard,
  StatsCard,
} from '@/components/dashboard/DashboardCards'
import { Users, FileText, Calendar, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-legal-navy mb-2">Welcome to Legal CMS</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your cases, documents, and hearings efficiently</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard label="Active Cases" value="12" icon={<FileText className="h-6 w-6" />} color="text-legal-navy" />
        <StatsCard label="Upcoming Hearings" value="5" icon={<Calendar className="h-6 w-6" />} color="text-legal-gold" />
        <StatsCard label="Clients" value="18" icon={<Users className="h-6 w-6" />} color="text-blue-600" />
        <StatsCard label="Alerts" value="2" icon={<AlertCircle className="h-6 w-6" />} color="text-legal-red" />
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-max">
        {/* Next Hearing - Featured Card (2 columns on md+) */}
        <div className="md:col-span-2">
          <NextHearingCard />
        </div>

        {/* Quick Actions - Featured Card (2 columns on md+) */}
        <div className="md:col-span-2">
          <QuickActionsCard />
        </div>

        {/* Active Cases - 2 columns on md+ */}
        <div className="md:col-span-2">
          <MyActiveCasesCard />
        </div>

        {/* Court Orders - 2 columns on md+ */}
        <div className="md:col-span-2">
          <RecentCourtOrdersCard />
        </div>

        {/* Alerts - Full width */}
        <div className="md:col-span-2 lg:col-span-4">
          <AlertsNotificationsCard />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-legal-navy mb-4">Quick Stats</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-600">Cases Won This Year</span>
              <span className="font-semibold text-legal-navy">8</span>
            </li>
            <li className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="text-sm text-gray-600">Pending Cases</span>
              <span className="font-semibold text-legal-navy">4</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">67%</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-serif text-lg font-semibold text-legal-navy mb-4">System Status</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-600">All services operational</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-600">Last backed up: 2 hours ago</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-600">Security checks: Passed</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
