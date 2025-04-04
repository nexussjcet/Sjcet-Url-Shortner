"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  IconLink,
  IconClick,
  IconClock,
  IconLogout,
} from "@tabler/icons-react";
import { Share2Icon, Settings2Icon } from "lucide-react";
import { FileTextIcon } from "@radix-ui/react-icons";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [urls, setUrls] = useState([]);
  const [userData, setUserData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch user data
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          setUserData(userSnapshot.docs[0].data());
        }

        // Fetch URLs for the user
        const urlQuery = query(
          collection(db, "urls"),
          where("userId", "==", user.uid)
        );
        const urlSnapshot = await getDocs(urlQuery);
        const urlData = urlSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUrls(urlData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading || dataLoading) {
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

  const calculateStats = () => {
    return {
      totalUrls: urls.length,
      totalClicks: urls.reduce((acc, url) => acc + (url.clicks || 0), 0),
      activeUrls: urls.filter((url) => url.status === "active").length,
    };
  };

  const stats = calculateStats();
  const collegeStats = [
    {
      label: "Total URLs",
      value: stats.totalUrls.toString(),
      icon: IconLink,
      trend: "+12%",
    },
    {
      label: "Total Clicks",
      value: stats.totalClicks.toString(),
      icon: IconClick,
      trend: "+25%",
    },
    {
      label: "Active Links",
      value: stats.activeUrls.toString(),
      icon: IconClock,
      trend: "+8%",
    },
  ];

  const quickActions = [
    { name: "Generate URL", icon: "🔗", action: "generate" },
    { name: "Bulk Import", icon: "📥", action: "import" },
    { name: "Export Data", icon: "📤", action: "export" },
    { name: "Analytics", icon: "📊", action: "analytics" },
  ];

  const urlCategories = [
    { name: "Academic Resources", count: 156, icon: "📚" },
    { name: "Event Registration", count: 89, icon: "🎫" },
    { name: "Department Notices", count: 134, icon: "📢" },
    { name: "Student Projects", count: 78, icon: "🎯" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <Navbar />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <main className="relative min-h-screen pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
              USER DASHBOARD
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-6 hover:bg-card/40 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img
                      src={
                        userData?.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.name}`
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{userData?.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData?.email}
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {userData?.department}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm">
                      {userData?.role}
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

            <div className="lg:col-span-9 space-y-6">
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

              <div className="rounded-xl border border-white/10 bg-card/30 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Recent URLs</h3>
                <div className="space-y-4">
                  {urls.slice(0, 3).map((url) => (
                    <div
                      key={url.id}
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
                            {url.clicks?.toLocaleString() || 0} clicks
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              url.createdAt?.toDate()
                            ).toLocaleDateString()}
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
