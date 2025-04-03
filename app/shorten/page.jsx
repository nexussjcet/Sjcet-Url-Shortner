"use client";
import { useState } from "react";
import Form from "@/components/Form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { QrCode, History, Copy, ExternalLink } from "lucide-react";
import QRCode from "react-qr-code";

export default function ShortenPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-slate-900/50 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        </motion.div>

        <div className="pt-20 sm:pt-12 pb-8 text-center relative">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-600 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            URL Shortener
          </motion.h1>
          <p className="mx-auto max-w-[600px] text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Transform your long URLs into memorable short links
          </p>
        </div>

        <motion.div
          className="relative z-10 mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="w-full max-w-3xl mx-auto border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-slate-900/50 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
            <CardContent className="p-6">
              <Form />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
          {[
            { icon: <QrCode size={20} />, label: "Generate QR" },
            { icon: <History size={20} />, label: "History" },
            { icon: <Copy size={20} />, label: "Copy" },
            { icon: <ExternalLink size={20} />, label: "Open" },
          ].map((action, index) => (
            <Button
              key={index}
              variant="secondary"
              className="p-3 h-auto flex flex-col items-center gap-2 bg-white/50 dark:bg-slate-900/50 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 shadow-sm"
              asChild
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
        </div>
      </div>
    </div>
  );
}
