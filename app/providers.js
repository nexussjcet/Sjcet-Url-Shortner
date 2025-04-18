"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProviderWrapper({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
