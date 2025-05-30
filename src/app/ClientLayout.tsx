"use client";
import React, { useEffect, useState } from "react";
import LawrenceLoader from "@/components/ui/LawrenceLoader";
import MouseEffect from "@/components/ui/mouse-effect";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LawrenceLoader />}
      <MouseEffect />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {!loading && children}
      </ThemeProvider>
    </>
  );
}
