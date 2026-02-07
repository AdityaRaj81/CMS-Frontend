export const COLORS = {
  navy: '#0B1F3A',
  gold: '#C8A951',
  charcoal: '#2B2E34',
  ivory: '#F7F5EF',
  red: '#8B1E1E',
}

export const COURT_LIST = [
  { id: 'high_court_patna', name: 'Patna High Court', type: 'high_court' },
  { id: 'district_court_patna', name: 'Patna District Court', type: 'district_court' },
  { id: 'barh_civil_court', name: 'Barh Civil Court', type: 'civil_court' },
]

export const CASE_CATEGORIES = [
  { value: 'civil', label: 'Civil' },
  { value: 'criminal', label: 'Criminal' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'family', label: 'Family' },
  { value: 'constitutional', label: 'Constitutional' },
  { value: 'tax', label: 'Tax' },
  { value: 'service', label: 'Service' },
  { value: 'other', label: 'Other' },
]

export const CASE_STATUSES = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-700' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700' },
  { value: 'under_appeal', label: 'Under Appeal', color: 'bg-blue-100 text-blue-700' },
  { value: 'disposed', label: 'Disposed', color: 'bg-red-100 text-red-700' },
]

export const USER_ROLES = [
  { value: 'admin', label: 'Administrator' },
  { value: 'advocate', label: 'Advocate' },
  { value: 'associate', label: 'Associate' },
  { value: 'client', label: 'Client' },
]

export const HEARING_TYPES = [
  { value: 'regular', label: 'Regular Hearing' },
  { value: 'ad-hoc', label: 'Ad-hoc Hearing' },
  { value: 'urgent', label: 'Urgent Hearing' },
]

export const DOCUMENT_TYPES = [
  { value: 'petition', label: 'Petition' },
  { value: 'order', label: 'Court Order' },
  { value: 'affidavit', label: 'Affidavit' },
  { value: 'judgment', label: 'Judgment' },
  { value: 'notice', label: 'Notice' },
  { value: 'other', label: 'Other' },
]

export const NOTIFICATION_TYPES = {
  hearing: { label: 'Hearing Scheduled', color: 'bg-blue-100 text-blue-700' },
  order: { label: 'Court Order Received', color: 'bg-red-100 text-red-700' },
  deadline: { label: 'Deadline Alert', color: 'bg-yellow-100 text-yellow-700' },
  system: { label: 'System Alert', color: 'bg-gray-100 text-gray-700' },
}

export const SIDEBAR_MENU = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { id: 'cases', label: 'Cases', href: '/cases', icon: 'FileText' },
  { id: 'documents', label: 'Documents', href: '/documents', icon: 'File' },
  { id: 'calendar', label: 'Calendar', href: '/calendar', icon: 'Calendar' },
  { id: 'clients', label: 'Clients', href: '/clients', icon: 'Users' },
  { id: 'admin', label: 'Admin', href: '/admin', icon: 'Settings', roles: ['admin'] },
]

export const PAGINATION_LIMIT = 25

export const DATE_FORMAT = 'dd MMM yyyy'
export const DATETIME_FORMAT = 'dd MMM yyyy HH:mm'
