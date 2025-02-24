"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
