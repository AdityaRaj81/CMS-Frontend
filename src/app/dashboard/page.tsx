"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { 
  FileText, 
  Users, 
  Calendar, 
  TrendingUp, 
  Search,
  LogOut,
  Scale
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (!user) return null;

  const stats = [
    { title: "Active Cases", value: "24", icon: FileText, trend: "+3 this week" },
    { title: "Total Clients", value: "87", icon: Users, trend: "+5 this month" },
    { title: "Hearings Today", value: "3", icon: Calendar, trend: "2 upcoming" },
    { title: "Success Rate", value: "94%", icon: TrendingUp, trend: "Above average" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Header */}
      <header className="bg-navy text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Scale className="w-8 h-8 text-gold" />
              <div>
                <h1 className="text-2xl font-montserrat font-bold">Legal CMS</h1>
                <p className="text-sm text-gold">Case Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gold capitalize">{user.role}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-gold text-white hover:bg-gold hover:text-navy"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Bento Layout */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-montserrat font-bold text-navy mb-2">
            Dashboard
          </h2>
          <p className="text-charcoal">Welcome back, {user.name.split(" ")[0]}!</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-l-4 border-l-gold hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-charcoal">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-5 h-5 text-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-navy">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Large Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Search */}
          <Card 
            className="lg:col-span-2 hover:shadow-xl transition-shadow cursor-pointer border-t-4 border-t-navy"
            onClick={() => router.push("/dashboard/cases")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-navy rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <CardTitle className="text-xl font-montserrat">Case Search</CardTitle>
                  <CardDescription>Search and manage all your cases</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-charcoal mb-4">
                Access CNR auto-date fetch for Patna and Barh courts. Search cases by CNR number,
                client name, or case type.
              </p>
              <Button className="bg-navy hover:bg-navy/90">
                Search Cases
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-t-4 border-t-gold">
            <CardHeader>
              <CardTitle className="text-xl font-montserrat">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => router.push("/dashboard/cases")}
                variant="outline"
                className="w-full justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                View All Cases
              </Button>
              <Button
                onClick={() => router.push("/dashboard/documents")}
                variant="outline"
                className="w-full justify-start"
              >
                <FileText className="w-4 h-4 mr-2" />
                Documents
              </Button>
              <Button
                onClick={() => router.push("/dashboard/client-portal")}
                variant="outline"
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-2" />
                Client Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Cases Table */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-xl font-montserrat">Recent Cases</CardTitle>
            <CardDescription>Your most recently accessed cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">CNR</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">Case Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">Court</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-charcoal">Next Hearing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      cnr: "BRPT01-123456-2024",
                      title: "Civil Suit No. 123/2024",
                      client: "Rajesh Kumar",
                      court: "District Court, Patna",
                      status: "Active",
                      nextHearing: "Feb 15, 2026",
                    },
                    {
                      cnr: "BRPT01-234567-2024",
                      title: "Criminal Case No. 456/2024",
                      client: "Priya Singh",
                      court: "Sessions Court, Barh",
                      status: "Pending",
                      nextHearing: "Feb 20, 2026",
                    },
                    {
                      cnr: "BRPT01-345678-2024",
                      title: "Property Dispute No. 789/2024",
                      client: "Amit Sharma",
                      court: "District Court, Patna",
                      status: "Active",
                      nextHearing: "Feb 18, 2026",
                    },
                  ].map((caseItem, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/dashboard/cases/${index + 1}`)}
                    >
                      <td className="py-3 px-4 text-sm">{caseItem.cnr}</td>
                      <td className="py-3 px-4 text-sm font-medium">{caseItem.title}</td>
                      <td className="py-3 px-4 text-sm">{caseItem.client}</td>
                      <td className="py-3 px-4 text-sm">{caseItem.court}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            caseItem.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{caseItem.nextHearing}</td>
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
