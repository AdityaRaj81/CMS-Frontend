"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Eye } from "lucide-react";

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Mock case data
  const caseData = {
    id: resolvedParams.id,
    cnr: "BRPT01-123456-2024",
    title: "Civil Suit No. 123/2024",
    clientName: "Rajesh Kumar",
    court: "District Court, Patna",
    status: "active",
    nextHearing: "February 15, 2026",
    filingDate: "January 15, 2024",
    caseType: "Civil",
    description: "Property dispute case regarding land ownership in Patna district.",
    documents: [
      { id: "1", name: "Petition.pdf", type: "Petition", uploadDate: "2024-01-15" },
      { id: "2", name: "Evidence-Documents.pdf", type: "Evidence", uploadDate: "2024-02-01" },
      { id: "3", name: "Court-Order-1.pdf", type: "Court Order", uploadDate: "2024-02-05" },
      { id: "4", name: "Affidavit.pdf", type: "Affidavit", uploadDate: "2024-02-10" },
    ],
  };

  const handleViewDocument = (docId: string) => {
    setSelectedDocument(docId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/dashboard/cases")}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-navy/80"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cases
            </Button>
            <div className="border-l border-gold pl-4">
              <h1 className="text-2xl font-montserrat font-bold">{caseData.title}</h1>
              <p className="text-sm text-gold">{caseData.cnr}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-t-4 border-t-navy">
              <CardHeader>
                <CardTitle className="text-xl font-montserrat">Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Client Name</p>
                    <p className="font-semibold text-navy">{caseData.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Case Type</p>
                    <p className="font-semibold text-navy">{caseData.caseType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Court</p>
                    <p className="font-semibold text-navy">{caseData.court}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {caseData.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Filing Date</p>
                    <p className="font-semibold text-navy">{caseData.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Hearing</p>
                    <p className="font-semibold text-navy">{caseData.nextHearing}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-charcoal">{caseData.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* PDF Viewer */}
            {selectedDocument && (
              <Card className="border-t-4 border-t-gold">
                <CardHeader>
                  <CardTitle className="text-xl font-montserrat flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold" />
                    PDF Viewer
                  </CardTitle>
                  <CardDescription>
                    Viewing: {caseData.documents.find((d) => d.id === selectedDocument)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">PDF Viewer</p>
                      <p className="text-sm text-gray-500">
                        Document: {caseData.documents.find((d) => d.id === selectedDocument)?.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        (PDF rendering would be displayed here using a library like react-pdf)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Documents Sidebar */}
          <div>
            <Card className="border-t-4 border-t-gold sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl font-montserrat">Documents</CardTitle>
                <CardDescription>{caseData.documents.length} files</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {caseData.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-3 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                      selectedDocument === doc.id ? "border-gold bg-gold/5" : "border-gray-200"
                    }`}
                    onClick={() => handleViewDocument(doc.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-navy" />
                          <p className="font-medium text-sm text-navy">{doc.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{doc.type}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded: {doc.uploadDate}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocument(doc.id);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Downloading ${doc.name}`);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
