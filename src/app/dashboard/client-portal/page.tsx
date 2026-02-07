"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Mail, Phone, FileText, Calendar } from "lucide-react";
import { useState } from "react";

export default function ClientPortalPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 98765 43210",
      activeCases: 2,
      totalCases: 5,
      lastContact: "2026-02-05",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya.singh@example.com",
      phone: "+91 98765 43211",
      activeCases: 1,
      totalCases: 3,
      lastContact: "2026-02-03",
    },
    {
      id: 3,
      name: "Amit Sharma",
      email: "amit.sharma@example.com",
      phone: "+91 98765 43212",
      activeCases: 1,
      totalCases: 2,
      lastContact: "2026-02-01",
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita.devi@example.com",
      phone: "+91 98765 43213",
      activeCases: 0,
      totalCases: 1,
      lastContact: "2026-01-28",
    },
  ];

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-2xl font-montserrat font-bold">Client Portal</h1>
              <p className="text-sm text-gold">Manage client information and access</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1 border-l-4 border-l-gold">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-charcoal">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-navy">{clients.length}</div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-1 border-l-4 border-l-navy">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-charcoal">Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-navy">
                {clients.reduce((sum, client) => sum + client.activeCases, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>

        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-montserrat">Client Directory</CardTitle>
            <CardDescription>
              {filteredClients.length} client(s) found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="border-t-2 border-t-navy hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-navy" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{client.name}</CardTitle>
                          <CardDescription>Client ID: #{client.id}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gold" />
                      <span className="text-charcoal">{client.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gold" />
                      <span className="text-charcoal">{client.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gold" />
                      <span className="text-charcoal">
                        {client.activeCases} active / {client.totalCases} total cases
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gold" />
                      <span className="text-charcoal">Last contact: {client.lastContact}</span>
                    </div>
                    <div className="pt-2 flex gap-2">
                      <Button size="sm" className="flex-1 bg-navy hover:bg-navy/90">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* RBAC Note */}
        <Card className="mt-6 border-l-4 border-l-gold">
          <CardHeader>
            <CardTitle className="text-lg font-montserrat">Role-Based Access Control</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-charcoal">
              This portal implements RBAC security. Different user roles (Admin, Lawyer, Client, Staff) 
              have different access levels to client information and case details. Clients can only view 
              their own cases, while lawyers can access their assigned clients, and admins have full access.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
