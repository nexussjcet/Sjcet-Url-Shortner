"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { QrCode, Copy, ExternalLink, Home } from "lucide-react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Shorten() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("Current URL updated:", currentUrl);
  }, [currentUrl]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!longUrl || !customName) {
      toast.error("URL and name are required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: longUrl, name: customName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const data = await response.json();
      if (data.success && data.shortUrl) {
        setCurrentUrl(data.shortUrl);
        toast.success("URL shortened successfully!");
        setLongUrl("");
        setCustomName("");
      } else {
        throw new Error(data.error || "Failed to get shortened URL");
      }
    } catch (error: any) {
      toast.error(error.message || "Error processing URL");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async () => {
    if (!currentUrl) return toast.error("No URL to copy!");
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const handleOpen = () => {
    if (!currentUrl) return toast.error("No URL to open!");
    window.open(currentUrl, "_blank");
  };

  const handleHome = () => router.push("/");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 sm:py-28">
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
          <Card className="w-full max-w-3xl mx-auto border-slate-900 dark:border-slate-800 shadow-xl dark:shadow-slate-900/50 shadow-slate-900/50 backdrop-blur-sm bg-slate-900/90 sm:bg-slate-900/90 sm:backdrop-blur-none">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  className="w-full p-3 rounded-md text-slate-900 sm:text-slate-900 bg-white/30 sm:bg-slate-800/70 placeholder:text-slate-500 sm:placeholder:text-slate-400"
                  placeholder="Enter URL"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  disabled={isSubmitting}
                />
                <input
                  className="w-full p-3 rounded-md text-slate-900 sm:text-slate-900 bg-white/30 sm:bg-slate-800/70 placeholder:text-slate-500 sm:placeholder:text-slate-400"
                  placeholder="Enter Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Processing..." : "Shorten"}
                </Button>
              </form>
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
            <Card className="w-full max-w-3xl mx-auto border-slate-800 shadow-xl shadow-slate-900/50 bg-white/10 backdrop-blur-sm sm:bg-slate-900/90 sm:backdrop-blur-none">
              <CardContent className="p-6 sm:p-8 text-center">
                <h3 className="text-lg font-semibold mb-2 text-slate-300">
                  Shortened URL
                </h3>
                <p className="text-indigo-400 break-all">{currentUrl}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {[
            {
              icon: <Home size={20} />,
              label: "Go Home",
              onClick: handleHome,
            },
            {
              icon: <QrCode size={20} />,
              label: "Generate QR",
              onClick: () =>
                currentUrl
                  ? setShowQR(true)
                  : toast.error("No URL to generate QR code!"),
            },
            { icon: <Copy size={20} />, label: "Copy", onClick: handleCopy },
            {
              icon: <ExternalLink size={20} />,
              label: "Open",
              onClick: handleOpen,
            },
          ].map((action) => (
            <Button
              key={action.label}
              variant="secondary"
              className="
        p-3 h-auto flex flex-col items-center gap-2
        bg-slate-800/40 backdrop-blur-sm 
        sm:bg-slate-900/90 sm:backdrop-blur-none 
        hover:bg-slate-800/60 sm:hover:bg-slate-800/80
        border border-slate-700 sm:border-slate-800
        shadow-sm
      "
              onClick={action.onClick}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-indigo-400">{action.icon}</span>
                <span className="text-sm font-medium text-slate-200">
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
                viewBox="0 0 256 256"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
