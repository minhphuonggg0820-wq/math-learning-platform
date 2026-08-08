"use client";

import { useAppState } from "@/lib/store";
import { useEffect } from "react";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useAppState();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950">{children}</div>;
}
