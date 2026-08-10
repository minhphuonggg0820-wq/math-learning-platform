"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Brain, Gamepad2, Trophy, Moon, Sun } from "lucide-react";
import { useAppState } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { darkMode, dispatch } = useAppState();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/learn", label: "Học lý thuyết", icon: BookOpen },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/games", label: "Mini-Games", icon: Gamepad2 },
    { href: "/achievements", label: "Thành tích", icon: Trophy },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col bg-[#4285F4] text-white md:flex shadow-lg">
      {/* Brand */}
      <div className="flex h-16 items-center px-5 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 via-red-400 to-green-400 flex items-center justify-center shadow">
          <span className="font-black text-white text-base">M</span>
        </div>
        <span className="text-lg font-extrabold tracking-tight">MathVerse</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all",
                isActive
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-white/75 hover:text-white hover:bg-white/10"
              )}
            >
              <link.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-3 border-t border-white/15">
        <button
          onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          className="flex w-full items-center justify-between px-4 py-2.5 rounded-full text-[13px] font-semibold text-white/75 hover:text-white hover:bg-white/10 transition-all"
        >
          <div className="flex items-center gap-3">
            {darkMode ? <Sun className="h-[18px] w-[18px] text-amber-300" /> : <Moon className="h-[18px] w-[18px]" />}
            <span>Chế độ Tối</span>
          </div>
          <div className={cn("w-8 h-[18px] rounded-full p-0.5 transition-colors", darkMode ? "bg-amber-400" : "bg-white/30")}>
            <div className={cn("w-3.5 h-3.5 rounded-full bg-white transition-transform", darkMode && "translate-x-3.5")} />
          </div>
        </button>
      </div>
    </aside>
  );
}
