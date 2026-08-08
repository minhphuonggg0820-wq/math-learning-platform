"use client";

import Link from "next/link";
import { Brain, Flame, Sun, Moon } from "lucide-react";
import { useAppState } from "@/lib/store";
import { getLevelFromXP } from "@/lib/utils";
import { StreakDisplay } from "@/components/gamification/streak-display";

export function MobileHeader() {
  const { xp, streak, darkMode, dispatch } = useAppState();
  const levelInfo = getLevelFromXP(xp);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <span className="min-w-0 truncate bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 bg-clip-text text-xl font-black text-transparent">
          MathVerse
        </span>
      </Link>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <div className="flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/50">
          <span>Lv.{levelInfo.level}</span>
          <span className="text-amber-500">|</span>
          <span>{xp} XP</span>
        </div>

        <StreakDisplay streak={streak} />

        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
}
