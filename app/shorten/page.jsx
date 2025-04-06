"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  QrCode,
  History,
  Copy,
  ExternalLink,
  Home,
  LayoutDashboard,
} from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function ShortenPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    console.log("Current URL updated:", currentUrl);
  }, [currentUrl]);

  const handleFormSuccess = (response) => {
    if (response && response.shortenedUrl) {
      setCurrentUrl(response.shortenedUrl);
      toast.success("URL shortened successfully!");
    } else {
      toast.error("Failed to get shortened URL");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleCopy = async () => {
    if (!currentUrl) {
      toast.error("No URL to copy!");
      return;
    }
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
    }
  };

  const handleOpen = () => {
    if (!currentUrl) {
      toast.error("No URL to open!");
      return;
    }
    window.open(currentUrl, "_blank");
  };

  const handleHistory = () => {
    router.push("/dashboard");
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <Navbar />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-slate-900/50 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 sm:py-28">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        </motion.div>

        <motion.div
          className="text-center relative mb-8 sm:mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-600 mb-4">
            URL Shortener
          </h1>
          <p className="mx-auto max-w-[600px] text-base sm:text-lg text-slate-300 animate-fade-in">
            Transform your long URLs into memorable short links
          </p>
        </motion.div>

        <motion.div
          className="relative z-10 mb-8 sm:mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Card className="w-full max-w-3xl mx-auto border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardContent className="p-6 sm:p-8">
              <Form userId={user.uid} onSuccess={handleFormSuccess} />
            </CardContent>
          </Card>
        </motion.div>

        {currentUrl && (
          <motion.div
            className="relative z-10 mb-8 sm:mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="w-full max-w-3xl mx-auto border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-slate-900/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    Shortened URL
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400 break-all">
                    {currentUrl}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            {
              icon: <QrCode size={20} />,
              label: "Generate QR",
              onClick: () =>
                currentUrl
                  ? setShowQR(true)
                  : toast.error("No URL to generate QR code!"),
            },
            {
              icon: <History size={20} />,
              label: "History",
              onClick: handleHistory,
            },
            { icon: <Copy size={20} />, label: "Copy", onClick: handleCopy },
            {
              icon: <ExternalLink size={20} />,
              label: "Open",
              onClick: handleOpen,
            },
            {
              icon: <Home size={20} />,
              label: "Home",
              onClick: handleHome,
            },
            {
              icon: <LayoutDashboard size={20} />,
              label: "Dashboard",
              onClick: handleDashboard,
            },
          ].map((action, index) => (
            <Button
              key={index}
              variant="secondary"
              className="p-3 h-auto flex flex-col items-center gap-2 bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              onClick={action.onClick}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-indigo-600 dark:text-indigo-400">
                  {action.icon}
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {action.label}
                </span>
              </motion.div>
            </Button>
          ))}
        </motion.div>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            {currentUrl && (
              <QRCode
                value={currentUrl}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
                viewBox={`0 0 256 256`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
