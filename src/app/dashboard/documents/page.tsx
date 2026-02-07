"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Download, Eye, Upload } from "lucide-react";
import { useState } from "react";

export default function DocumentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: 1,
      name: "Petition-BRPT01-123456-2024.pdf",
      caseTitle: "Civil Suit No. 123/2024",
      caseCnr: "BRPT01-123456-2024",
      type: "Petition",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Evidence-Documents.pdf",
      caseTitle: "Civil Suit No. 123/2024",
      caseCnr: "BRPT01-123456-2024",
      type: "Evidence",
      uploadDate: "2024-02-01",
      size: "5.8 MB",
    },
    {
      id: 3,
      name: "Court-Order-Criminal-456.pdf",
      caseTitle: "Criminal Case No. 456/2024",
      caseCnr: "BRPT01-234567-2024",
      type: "Court Order",
      uploadDate: "2024-02-05",
      size: "1.2 MB",
    },
    {
      id: 4,
      name: "Affidavit-Property-Dispute.pdf",
      caseTitle: "Property Dispute No. 789/2024",
      caseCnr: "BRPT01-345678-2024",
      type: "Affidavit",
      uploadDate: "2024-02-10",
      size: "3.1 MB",
    },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.caseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.caseCnr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-navy/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="border-l border-gold pl-4">
              <h1 className="text-2xl font-montserrat font-bold">Document Management</h1>
              <p className="text-sm text-gold">View and manage case documents</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Upload */}
        <Card className="mb-8 border-t-4 border-t-gold">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Input
                placeholder="Search documents by name, case title, or CNR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-navy hover:bg-navy/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-montserrat">All Documents</CardTitle>
            <CardDescription>
              {filteredDocuments.length} document(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-navy">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Document Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Case Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">CNR</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Upload Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Size</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr
                      key={doc.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gold" />
                          <span className="text-sm font-medium">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{doc.caseTitle}</td>
                      <td className="py-3 px-4 text-sm font-mono">{doc.caseCnr}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{doc.uploadDate}</td>
                      <td className="py-3 px-4 text-sm">{doc.size}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => alert(`Viewing ${doc.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => alert(`Downloading ${doc.name}`)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
