"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Brain, Gamepad2, Trophy, Moon, Sun, Sparkles } from "lucide-react";
import { useAppState } from "@/lib/store";
import { cn, getLevelFromXP } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { xp, streak, darkMode, dispatch } = useAppState();
  const levelInfo = getLevelFromXP(xp);

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/learn", label: "Học lý thuyết", icon: BookOpen },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/games", label: "Mini-Games", icon: Gamepad2 },
    { href: "/achievements", label: "Thành tích", icon: Trophy },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col bg-[#0062FF] dark:bg-slate-900 text-white md:flex transition-all shadow-xl">
      {/* Brand Header */}
      <div className="flex h-20 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-emerald-400 flex items-center justify-center shadow-md">
            <span className="font-black text-white text-xl">M</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            MathVerse
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {/* User Level Card */}
        <div className="bg-white/10 dark:bg-slate-800/60 rounded-2xl p-4 backdrop-blur-md border border-white/15">
          <div className="flex items-center justify-between text-xs font-bold text-blue-100 mb-1.5">
            <span>Cấp độ {levelInfo.level}</span>
            <span className="text-amber-300 flex items-center gap-1">⚡ {xp} XP</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full" 
              style={{ width: `${Math.min(100, Math.max(10, (xp % 100)))}%` }} 
            />
          </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-white/20 text-white font-bold shadow-sm backdrop-blur-md"
                    : "text-blue-100/80 hover:text-white hover:bg-white/10"
                )}
              >
                <link.icon className="h-5 w-5 shrink-0" />
                <span className="truncate min-w-0">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer & Dark Mode Switch */}
      <div className="shrink-0 p-4 border-t border-white/10">
        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          className="flex w-full items-center justify-between gap-3 rounded-full px-4 py-3 text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 transition-all"
        >
          <div className="flex items-center gap-3">
            {darkMode ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5 text-blue-200" />}
            <span>Chế độ Tối</span>
          </div>
          <div className={cn("w-9 h-5 rounded-full p-0.5 transition-colors", darkMode ? "bg-amber-400" : "bg-white/30")}>
            <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", darkMode && "translate-x-4")} />
          </div>
        </button>
      </div>
    </aside>
  );
}
