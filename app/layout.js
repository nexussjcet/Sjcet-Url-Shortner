import { Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider, SessionProviderWrapper } from "./providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "ShortX - SJCET",
  description: "Shorten your links with ShortX - SJCET",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${geistMono.variable}`}>
        <SessionProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster
              position="top-center"
              richColors
              />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
