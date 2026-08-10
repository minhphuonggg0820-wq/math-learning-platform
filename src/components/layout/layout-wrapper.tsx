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

  return <div className="flex min-h-screen w-full bg-[#FAF6F0] dark:bg-[#0d1117] text-slate-900 dark:text-slate-50">{children}</div>;
}
