"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Brain, Gamepad2, Trophy, Moon, Sun, Flame, Menu } from "lucide-react";
import { useAppState } from "@/lib/store";
import { cn, getLevelFromXP } from "@/lib/utils";
import { XpBar } from "@/components/gamification/xp-bar";
import { StreakDisplay } from "@/components/gamification/streak-display";

export function Sidebar() {
  const pathname = usePathname();
  const { xp, streak, darkMode, dispatch } = useAppState();

  const links = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/learn", label: "Học lý thuyết", icon: BookOpen },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/games", label: "Mini-Games", icon: Gamepad2 },
    { href: "/achievements", label: "Thành tích", icon: Trophy },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl md:flex transition-all">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-2xl font-bold text-transparent">
            MathVerse
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-6 space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="min-w-0 truncate text-sm font-medium text-slate-600 dark:text-slate-400">Cấp độ {getLevelFromXP(xp).level}</span>
            <StreakDisplay streak={streak} />
          </div>
          <XpBar xp={xp} />
        </div>

        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20 dark:bg-indigo-600 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="truncate min-w-0">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 p-4">
        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
        >
          {darkMode ? (
            <>
              <Sun className="h-5 w-5 text-amber-500" />
              <span className="truncate min-w-0">Chế độ Sáng</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-slate-700" />
              <span className="truncate min-w-0">Chế độ Tối</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
