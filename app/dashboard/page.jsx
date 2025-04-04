"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  IconLink,
  IconClick,
  IconClock,
  IconLogout,
} from "@tabler/icons-react";
import { Share2Icon, Settings2Icon } from "lucide-react";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BarChart3, PieChart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  const userData = {
    name: "Dr. John Doe",
    email: "john.doe@sjcet.ac.in",
    department: "Computer Science",
    role: "Faculty",
    joinDate: "January 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  };

  const collegeStats = [
    { label: "Department URLs", value: "256", icon: IconLink, trend: "+12%" },
    { label: "Student Access", value: "2,521", icon: IconClick, trend: "+25%" },
    { label: "Faculty Links", value: "192", icon: IconClock, trend: "+8%" },
  ];

  const analyticsData = {
    traffic: [
      { date: "Mon", value: 450 },
      { date: "Tue", value: 680 },
      { date: "Wed", value: 890 },
      { date: "Thu", value: 750 },
      { date: "Fri", value: 920 },
      { date: "Sat", value: 840 },
      { date: "Sun", value: 760 },
    ],
    domainTypes: {
      "sjcet.ac.in": 45,
      academic: 30,
      events: 15,
      other: 10,
    },
    topDepartments: [
      { name: "Computer Science", percentage: 35 },
      { name: "Mechanical", percentage: 25 },
      { name: "Electronics", percentage: 20 },
      { name: "Civil", percentage: 15 },
    ],
    performanceMetrics: [
      { metric: "Student Engagement", value: "82.5%", trend: "+4.4%" },
      { metric: "Resource Access", value: "68.2%", trend: "+5.1%" },
      { metric: "Content Sharing", value: "92%", trend: "+2.2%" },
    ],
  };

  const urlCategories = [
    { name: "Academic Resources", count: 156, icon: "📚" },
    { name: "Event Registration", count: 89, icon: "🎫" },
    { name: "Department Notices", count: 134, icon: "📢" },
    { name: "Student Projects", count: 78, icon: "🎯" },
  ];

  const dummyUrls = [
    {
      originalUrl: "https://sjcet.ac.in/resources/computer-science/algorithms",
      shortUrl: "sjct.in/algos",
      clicks: 328,
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      originalUrl: "https://sjcet.ac.in/events/techfest-2024",
      shortUrl: "sjct.in/techfest",
      clicks: 892,
      createdAt: "2024-01-14",
      status: "active",
    },
    {
      originalUrl: "https://sjcet.ac.in/projects/student-projects-2024",
      shortUrl: "sjct.in/projects24",
      clicks: 1205,
      createdAt: "2024-01-13",
      status: "active",
    },
  ];

  const quickActions = [
    { name: "Generate URL", icon: "🔗", action: "generate" },
    { name: "Bulk Import", icon: "📥", action: "import" },
    { name: "Export Data", icon: "📤", action: "export" },
    { name: "Analytics", icon: "📊", action: "analytics" },
  ];

  const resourceStats = [
    { name: "Study Materials", count: 245, growth: "+12%", icon: "📚" },
    { name: "Research Papers", count: 89, growth: "+8%", icon: "📝" },
    { name: "Lab Resources", count: 156, growth: "+15%", icon: "🧪" },
    { name: "Department Circulars", count: 67, growth: "+5%", icon: "📢" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <Navbar />

      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Main content */}
      <main className="relative min-h-screen pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
              USER DASHBOARD
            </h1>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Profile Section - Left Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Card */}
              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-6 hover:bg-card/40 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {userData.department}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm">
                      {userData.role}
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-sm hover:text-primary"
                    >
                      <Settings2Icon className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-sm text-red-500 hover:text-red-600"
                    >
                      <IconLogout className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {collegeStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="p-5 rounded-xl bg-card/30 border border-white/10 backdrop-blur-sm transition-all hover:bg-card/50 hover:scale-102"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <stat.icon className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                          <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                      </div>
                      <span className="text-sm text-green-500">
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-9 space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    type="button"
                    className="p-4 rounded-xl border border-white/10 bg-card/30 hover:bg-card/50 transition-all hover:scale-102"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-medium">{action.name}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Recent URLs */}
              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent URLs</h3>
                <div className="space-y-4">
                  {dummyUrls.map((url) => (
                    <div
                      key={url.shortUrl}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="space-y-2 sm:space-y-1 mb-3 sm:mb-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[250px] sm:max-w-[300px] lg:max-w-[400px]">
                          {url.originalUrl}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-primary text-xs sm:text-base">
                            {url.shortUrl}
                          </p>
                          <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-500">
                            {url.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                        <div className="text-right">
                          <p className="text-xs sm:text-sm font-medium">
                            {url.clicks.toLocaleString()} clicks
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {url.createdAt}
                          </p>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            type="button"
                            className="p-1.5 sm:p-2 hover:bg-white/5 rounded transition-colors"
                          >
                            <Share2Icon className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 sm:p-2 hover:bg-white/5 rounded transition-colors"
                          >
                            <FileTextIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* URL Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {urlCategories.map((category) => (
                  <div
                    key={category.name}
                    className="p-4 sm:p-6 rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all"
                  >
                    <div className="flex flex-col gap-3 items-center text-center">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-primary">
                          {category.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {category.count} active links
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
