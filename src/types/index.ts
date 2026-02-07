export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "lawyer" | "client" | "staff";
}

export interface Case {
  id: string;
  cnr: string;
  title: string;
  clientName: string;
  court: string;
  status: "active" | "pending" | "closed";
  nextHearing?: string;
  filingDate: string;
  caseType: string;
}

export interface Document {
  id: string;
  caseId: string;
  name: string;
  url: string;
  type: string;
  uploadDate: string;
}
