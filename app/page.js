"use client";

import { Button } from "@/components/ui/button";
import { LinkIcon, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles } from "@/components/ui/sparkles";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";

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
    <main className="relative h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-background via-background to-slate-900/20">
      <div className="absolute h-full w-full bg-gradient-to-r from-transparent via-background/30 to-background" />

      <div className="relative flex h-full items-center justify-center -mt-20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center space-y-6 text-center max-w-3xl">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-muted/50 px-4 py-2 text-base">
                  <span className="font-semibold">
                    Swift, seamless, and official link-sharing tool for SJCET!
                    🌐⚡
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-gray-500">
                  ShortX - SJCET
                </h1>
                <p className="max-w-[800px] text-muted-foreground text-lg md:text-2xl">
                  Simplify link sharing with speed and efficiency. 🚀
                  <br />
                  Trim long URLs, create official short links, and share them
                  effortlessly across SJCET. Simplify access to academic
                  resources, campus updates, and event links with ease! 🎓📎
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 cursor-pointer"
                  onClick={handleShortenClick}
                >
                  <LinkIcon className="mr-3 h-5 w-5" />
                  Shorten URL
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => router.push("/dashboard")}
                  className="text-lg px-8 py-6 cursor-pointer"
                >
                  View Dashboard
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-[2] h-[290px] w-screen overflow-hidden [mask-image:radial-gradient(100%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute">
        <Sparkles
          density={1800}
          speed={1.4}
          color="#48b6ff"
          direction="top"
          className="absolute inset-x-0 bottom-0 h-full w-full "
        />
      </div>
    </main>
  );
}
