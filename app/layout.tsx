import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "ShortX - SJCET",
  description: "Shorten your links with ShortX - SJCET",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${montserrat.variable} bg-black`}>
        <FlickeringGrid
          className="z-0 absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#4B0082"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
