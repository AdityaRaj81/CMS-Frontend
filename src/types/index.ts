// User roles
export enum UserRole {
  ADMIN = 'admin',
  ADVOCATE = 'advocate',
  CLIENT = 'client',
  ASSOCIATE = 'associate',
}

// Case status
export enum CaseStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  PENDING = 'pending',
  UNDER_APPEAL = 'under_appeal',
  DISPOSED = 'disposed',
}

// Court types
export enum CourtType {
  HIGH_COURT = 'high_court',
  DISTRICT_COURT = 'district_court',
  CIVIL_COURT = 'civil_court',
  CRIMINAL_COURT = 'criminal_court',
  SUPREME_COURT = 'supreme_court',
}

// Case categories
export enum CaseCategory {
  CIVIL = 'civil',
  CRIMINAL = 'criminal',
  COMMERCIAL = 'commercial',
  FAMILY = 'family',
  CONSTITUTIONAL = 'constitutional',
  TAX = 'tax',
  SERVICE = 'service',
  OTHER = 'other',
}

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  barNumber?: string;
  firmId?: string;
};

export type Case = {
  id: string;
  title: string;
  caseNumber: string;
  cnr: string;
  court: CourtType;
  courtName: string;
  category: CaseCategory;
  status: CaseStatus;
  petitioner: string;
  respondent: string;
  judge?: string;
  nextHearing?: Date;
  lastHearing?: Date;
  createdAt: Date;
  updatedAt: Date;
  advocates: string[];
  clients: string[];
  description?: string;
};

export type Hearing = {
  id: string;
  caseId: string;
  date: Date;
  time?: string;
  court?: string;
  type: 'regular' | 'ad-hoc' | 'urgent';
  status: 'scheduled' | 'completed' | 'postponed' | 'cancelled';
  notes?: string;
};

export type Document = {
  id: string;
  caseId?: string;
  title: string;
  type: 'petition' | 'order' | 'affidavit' | 'judgment' | 'notice' | 'other';
  fileUrl: string;
  fileSize: number;
  uploadedBy: string;
  uploadedAt: Date;
  description?: string;
};

export type CourtOrder = {
  id: string;
  caseId: string;
  orderDate: Date;
  content: string;
  documentId?: string;
  status: 'received' | 'pending' | 'reviewed';
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'individual' | 'organization';
  cases: string[];
  createdAt: Date;
};

export type Activity = {
  id: string;
  caseId: string;
  type: 'hearing' | 'document' | 'order' | 'status_change' | 'note';
  description: string;
  createdBy: string;
  createdAt: Date;
  metadata?: Record<string, any>;
};

export type NotificationAlert = {
  id: string;
  userId: string;
  type: 'hearing' | 'order' | 'deadline' | 'system';
  title: string;
  message: string;
  caseId?: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
};
