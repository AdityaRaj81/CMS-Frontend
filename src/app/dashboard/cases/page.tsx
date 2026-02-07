"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ArrowLeft, Calendar, MapPin } from "lucide-react";

export default function CasesPage() {
  const router = useRouter();
  const [cnr, setCnr] = useState("");
  const [selectedCourt, setSelectedCourt] = useState<"patna" | "barh" | "">("");
  const [autoFetchedDate, setAutoFetchedDate] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock CNR auto-date fetch function
  const handleCNRAutoFetch = () => {
    if (cnr && selectedCourt) {
      // Simulate fetching date from court system
      const mockDate = new Date();
      mockDate.setDate(mockDate.getDate() + Math.floor(Math.random() * 30));
      setAutoFetchedDate(mockDate.toLocaleDateString("en-IN"));
      
      // Mock search results
      setSearchResults([
        {
          id: 1,
          cnr: cnr,
          title: "Civil Suit No. 123/2024",
          clientName: "Rajesh Kumar",
          court: `District Court, ${selectedCourt === "patna" ? "Patna" : "Barh"}`,
          status: "active",
          nextHearing: mockDate.toLocaleDateString("en-IN"),
          filingDate: "2024-01-15",
          caseType: "Civil",
        },
      ]);
    }
  };

  const allCases = [
    {
      id: 1,
      cnr: "BRPT01-123456-2024",
      title: "Civil Suit No. 123/2024",
      clientName: "Rajesh Kumar",
      court: "District Court, Patna",
      status: "active",
      nextHearing: "2026-02-15",
      filingDate: "2024-01-15",
      caseType: "Civil",
    },
    {
      id: 2,
      cnr: "BRPT01-234567-2024",
      title: "Criminal Case No. 456/2024",
      clientName: "Priya Singh",
      court: "Sessions Court, Barh",
      status: "pending",
      nextHearing: "2026-02-20",
      filingDate: "2024-02-10",
      caseType: "Criminal",
    },
    {
      id: 3,
      cnr: "BRPT01-345678-2024",
      title: "Property Dispute No. 789/2024",
      clientName: "Amit Sharma",
      court: "District Court, Patna",
      status: "active",
      nextHearing: "2026-02-18",
      filingDate: "2024-03-05",
      caseType: "Civil",
    },
    {
      id: 4,
      cnr: "BRPT01-456789-2024",
      title: "Family Court Case No. 234/2024",
      clientName: "Sunita Devi",
      court: "Family Court, Patna",
      status: "closed",
      nextHearing: null,
      filingDate: "2024-01-20",
      caseType: "Family",
    },
  ];

  const displayedCases = searchResults.length > 0 ? searchResults : allCases;

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
              <h1 className="text-2xl font-montserrat font-bold">Case Search</h1>
              <p className="text-sm text-gold">Search and manage cases</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* CNR Auto-Date Fetch */}
        <Card className="mb-8 border-t-4 border-t-gold">
          <CardHeader>
            <CardTitle className="text-xl font-montserrat flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              CNR Auto-Date Fetch
            </CardTitle>
            <CardDescription>
              Automatically fetch hearing dates from Patna and Barh courts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="cnr">CNR Number</Label>
                <Input
                  id="cnr"
                  placeholder="BRPT01-123456-2024"
                  value={cnr}
                  onChange={(e) => setCnr(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <select
                  id="court"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value as "patna" | "barh" | "")}
                >
                  <option value="">Select Court</option>
                  <option value="patna">District Court, Patna</option>
                  <option value="barh">Sessions Court, Barh</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleCNRAutoFetch}
                  className="w-full bg-navy hover:bg-navy/90"
                  disabled={!cnr || !selectedCourt}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Fetch Details
                </Button>
              </div>
            </div>
            {autoFetchedDate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-800">
                  <Calendar className="w-5 h-5" />
                  <span className="font-semibold">Next Hearing Date:</span>
                  <span className="text-lg">{autoFetchedDate}</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Successfully fetched from {selectedCourt === "patna" ? "Patna" : "Barh"} court system
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-montserrat">
              {searchResults.length > 0 ? "Search Results" : "All Cases"}
            </CardTitle>
            <CardDescription>
              {displayedCases.length} case(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-navy">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">CNR</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Case Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Court</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Next Hearing</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm font-mono">{caseItem.cnr}</td>
                      <td className="py-3 px-4 text-sm font-medium">{caseItem.title}</td>
                      <td className="py-3 px-4 text-sm">{caseItem.clientName}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-gold" />
                          {caseItem.court}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{caseItem.caseType}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            caseItem.status === "active"
                              ? "bg-green-100 text-green-800"
                              : caseItem.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {caseItem.nextHearing || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                        >
                          View Details
                        </Button>
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
