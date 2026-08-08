"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Brain, Gamepad2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/learn", label: "Learn", icon: BookOpen },
    { href: "/quiz", label: "Quiz", icon: Brain },
    { href: "/games", label: "Games", icon: Gamepad2 },
    { href: "/achievements", label: "Achieve", icon: Trophy },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full max-w-full items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-2 backdrop-blur-xl md:hidden">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-xl p-2 transition-all",
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            )}
          >
            <link.icon className={cn("h-5 w-5", isActive && "fill-indigo-100 dark:fill-indigo-900/30")} />
            <span className="truncate max-w-full text-[10px] font-medium">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
