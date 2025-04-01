"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleShortenClick = () => {
    if (!session) {
      toast.error("Please login to shorten URLs");
      router.push("/auth/signin");
      return;
    }
    router.push("/shorten");
  };

  return (
    <main className="relative h-[calc(100vh-5rem)] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-slate-900/50 to-transparent pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <Navbar />
      <div className="relative flex h-full items-center justify-center -mt-12">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-8 text-center max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-6 py-2.5 text-base border border-blue-500/20 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Official Link-Sharing Tool for SJCET 🌐⚡
                  </span>
                </div>
                <h1>
                  <TypingAnimation className="text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-blue-500 [text-shadow:0_0_20px_rgba(59,130,246,0.1)]">
                    ShortX - SJCET
                  </TypingAnimation>
                </h1>

                <p className="max-w-[800px] text-slate-300/80 text-lg md:text-2xl font-light leading-relaxed backdrop-blur-sm">
                  Transform lengthy URLs into elegant, official short links.
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                    Your trusted institutional URL shortener.
                  </span>
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col gap-4 min-[400px]:flex-row"
              >
                <InteractiveHoverButton
                  className="text-lg px-10 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] cursor-pointer bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 border border-blue-500/20 backdrop-blur-sm"
                  onClick={handleShortenClick}
                >
                  Start Shortening
                </InteractiveHoverButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
