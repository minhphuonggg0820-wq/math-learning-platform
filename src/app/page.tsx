"use client";

import { useAppState } from "@/lib/store";
import { topics } from "@/lib/mock-data";
import { getLevelFromXP, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bell, User, FileText, Pyramid, Zap, Heart, Flame, Check, ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const { xp, streak, recentActivity } = useAppState();
  const levelInfo = getLevelFromXP(xp);

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 transition shadow-sm">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-800" />
          </button>
          <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-white dark:border-slate-800 flex items-center justify-center text-amber-700 font-bold shadow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-[#FFF0DB] dark:bg-slate-900 p-8 border border-amber-200/40 dark:border-slate-800"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
                Hi, Math Explorer! 👋
              </h2>
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Giữ vững chuỗi {streak} ngày học liên tục nhé!
            </p>
            <div className="pt-1">
              <Link 
                href="/quiz" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF6542] hover:bg-[#E5533A] text-white font-bold text-sm shadow-md transition-all hover:shadow-lg active:scale-95"
              >
                <FileText className="w-4 h-4" /> Làm Quiz
              </Link>
            </div>
          </div>

          {/* Student SVG */}
          <div className="relative w-52 h-40 shrink-0 hidden md:flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="220" cy="40" r="20" fill="#E8F8EE" />
              <path d="M212 40L218 46L228 34" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="265" cy="70" r="18" fill="#FFEBEB" />
              <path d="M265 77S256 71 256 65A4.5 4.5 0 01265 62A4.5 4.5 0 01274 65C274 71 265 77 265 77Z" fill="#FF4D4D" />
              <circle cx="275" cy="105" r="8" fill="#FCD34D" />
              <path d="M120 180C120 145 150 120 180 120C210 120 240 145 240 180H120Z" fill="#38BDF8" />
              <circle cx="180" cy="90" r="30" fill="#FFD0B0" />
              <path d="M150 85C150 65 165 50 180 50C195 50 210 65 210 85C200 80 190 85 180 80C170 85 160 80 150 85Z" fill="#1E293B" />
              <circle cx="170" cy="85" r="3" fill="#1E293B" />
              <circle cx="190" cy="85" r="3" fill="#1E293B" />
              <path d="M175 98C175 98 180 102 185 98" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
              <path d="M130 145L220 145L210 175L140 175Z" fill="#0F172A" />
              <rect x="145" y="125" width="60" height="40" rx="4" fill="#1E293B" />
              <circle cx="175" cy="145" r="4" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Topic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Hình học */}
        <Link href="/learn/geometry">
          <div className="bg-[#D8E6FF] dark:bg-blue-950/50 rounded-2xl p-5 h-44 flex flex-col justify-between border border-blue-200/40 dark:border-blue-800/40 hover:shadow-md transition-all hover:-translate-y-0.5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#B8D2FF] text-blue-600 flex items-center justify-center mb-3">
                <Pyramid className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hình học</h3>
            </div>
            <div>
              <div className="w-full h-1.5 bg-white/50 dark:bg-blue-900/50 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">0/3 bài hoàn thành</p>
            </div>
          </div>
        </Link>

        {/* Giải tích */}
        <Link href="/learn/calculus">
          <div className="bg-[#D1F2D9] dark:bg-emerald-950/50 rounded-2xl p-5 h-44 flex flex-col justify-between border border-emerald-200/40 dark:border-emerald-800/40 hover:shadow-md transition-all hover:-translate-y-0.5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#AEE5C0] text-emerald-600 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Giải tích</h3>
            </div>
            <div>
              <div className="w-full h-1.5 bg-white/50 dark:bg-emerald-900/50 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0%' }} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">0/3 bài hoàn thành</p>
            </div>
          </div>
        </Link>

        {/* Lượng giác */}
        <Link href="/learn/trigonometry">
          <div className="bg-[#FFE0E0] dark:bg-rose-950/50 rounded-2xl p-5 h-44 flex flex-col justify-between border border-rose-200/40 dark:border-rose-800/40 hover:shadow-md transition-all hover:-translate-y-0.5">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FFC4C4] text-rose-600 flex items-center justify-center mb-3">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Lượng giác</h3>
            </div>
            <div>
              <div className="w-full h-1.5 bg-white/50 dark:bg-rose-900/50 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '25%' }} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">1/4 bài hoàn thành</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Streak Tracker */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">Chuỗi học tập</h3>
          <Link href="/achievements" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Xem lịch sử
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800 dark:text-white">{streak} ngày</span>
            <Flame className="w-7 h-7 text-orange-500 fill-orange-400" />
            <span className="text-xl font-bold text-slate-800 dark:text-white">liên tục</span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto py-1">
            {[
              { day: "T2", label: "T2", status: "done" },
              { day: "T3", label: "T3", status: "done" },
              { day: "T4", label: "K4", status: "done" },
              { day: "T5", label: "T5", status: "done" },
              { day: "T6", label: "T6", status: "today" },
              { day: "T7", label: "Sở", status: "upcoming" },
              { day: "CN", label: "CN", status: "upcoming" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "w-11 h-11 rounded-full border-[3px] flex items-center justify-center text-sm font-bold",
                  item.status === "today" && "border-green-500 text-green-600 bg-green-50 dark:bg-green-950/40 shadow",
                  item.status === "done" && "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/40",
                  item.status === "upcoming" && "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600"
                )}>
                  {item.day}
                </div>
                <span className="text-[10px] font-semibold text-slate-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
