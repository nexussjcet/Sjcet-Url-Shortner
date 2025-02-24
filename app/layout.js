import "./globals.css";
import { Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import Providers from "./providers";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={`${geistMono.variable} ${inter.variable}`}>
      <body className="bg-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
