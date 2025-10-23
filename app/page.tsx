"use client";

import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleShortenClick = () => {
    router.push("/shorten");
  };

  return (
    <main className="relative h-[calc(100vh-4rem)] overflow-hidden">
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
                  <TypingAnimation className="text-5xl font-bold tracking-tight sm:text-7xl xl:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-300 to-blue-500 [text-shadow:0_0_20px_rgba(59,130,246,0.1)]">
                    ShortX - SJCET
                  </TypingAnimation>
                </h1>

                <p className="max-w-[800px] text-slate-300/80 text-lg md:text-2xl font-light leading-relaxed backdrop-blur-sm">
                  Transform lengthy URLs into elegant, official short links.
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                    Your trusted URL shortener.
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
