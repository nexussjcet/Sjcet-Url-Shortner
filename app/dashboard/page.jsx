"use client";
import { useState } from "react";
import {
  IconLink,
  IconClick,
  IconClock,
  IconLogout,
} from "@tabler/icons-react";
import { Share2Icon, Settings2Icon } from "lucide-react";
import { FileTextIcon } from "@radix-ui/react-icons";
import { BarChart3, PieChart } from "lucide-react";

export default function Dashboard() {
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
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-slate-900/50 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="relative max-w-7xl mx-auto p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
              USER DASHBOARD
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-3 auto-rows-min">
          <div className="col-span-full lg:col-span-3 grid gap-3">
            <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-4">
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
            <div className="grid grid-cols-2 gap-3">
              {collegeStats.slice(0, 2).map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-card/30 border border-white/10 backdrop-blur-sm transition-colors hover:bg-card/50"
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
                    <span className="text-sm text-green-500">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-full lg:col-span-9 grid gap-2 sm:gap-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  type="button"
                  className="p-3 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-sm font-medium">{action.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold">
                      Traffic Analytics
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Last 7 days overview
                    </p>
                  </div>
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <div className="relative">
                  <div className="h-[200px] overflow-x-auto pb-4 sm:overflow-x-visible">
                    <div className="flex items-end justify-between h-full min-w-[500px] sm:min-w-0">
                      {analyticsData.traffic.map((day, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-8 sm:w-12 bg-primary/60 hover:bg-primary transition-colors rounded-t cursor-pointer"
                            style={{ height: `${day.value / 10}px` }}
                          />
                          <span className="text-xs mt-2 whitespace-nowrap">
                            {day.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent sm:hidden" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Domain Distribution
                  </h3>
                  <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {Object.entries(analyticsData.domainTypes).map(
                    ([domain, percentage]) => (
                      <div key={domain} className="space-y-2">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span>{domain}</span>
                          <span>{percentage}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-4 grid gap-2 sm:gap-3">
            <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-4">
                Resource Analytics
              </h3>
              <div className="space-y-4">
                {resourceStats.map((resource) => (
                  <div key={resource.name} className="flex items-center gap-4">
                    <span className="text-xl sm:text-2xl">{resource.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{resource.name}</p>
                        <span className="text-green-500 text-xs sm:text-sm">
                          {resource.growth}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {resource.count} items
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                {analyticsData.performanceMetrics.map((metric) => (
                  <div
                    key={metric.metric}
                    className="p-3 sm:p-4 rounded-lg bg-muted/50 touch-pan-x"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {metric.metric}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg sm:text-2xl font-bold">
                        {metric.value}
                      </span>
                      <span
                        className={`text-xs sm:text-sm ${
                          metric.trend.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-8 grid gap-2 sm:gap-4">
            <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Recent URLs
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {dummyUrls.map((url) => (
                  <div
                    key={url.shortUrl}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
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
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {urlCategories.map((category) => (
                <div
                  key={category.name}
                  className="p-3 sm:p-4 rounded-xl border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-medium text-xs sm:text-base">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {category.count} links
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
