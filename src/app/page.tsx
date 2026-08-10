"use client";

import { useAppState } from "@/lib/store";
import { topics } from "@/lib/mock-data";
import { getLevelFromXP, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Bell, 
  User, 
  FileText, 
  Pyramid, 
  Zap, 
  Heart, 
  Flame, 
  BookOpen, 
  Brain, 
  Check,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const { xp, streak, recentActivity } = useAppState();
  const levelInfo = getLevelFromXP(xp);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-xs">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          </button>
          
          <div className="w-10 h-10 rounded-full bg-amber-200 dark:bg-amber-800 border-2 border-white dark:border-slate-800 flex items-center justify-center text-amber-900 dark:text-amber-100 font-bold overflow-hidden shadow-xs">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-[#FFF0DB] dark:bg-slate-900 p-6 sm:p-8 shadow-sm border border-amber-200/50 dark:border-slate-800"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Hi, Math Explorer! 👋
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base font-semibold">
              Giữ vững chuỗi {streak} ngày học liên tục nhé!
            </p>

            <div className="pt-2 flex justify-center md:justify-start">
              <Link 
                href="/quiz" 
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FF6542] hover:bg-[#FF532B] text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <FileText className="w-5 h-5" /> Làm Quiz
              </Link>
            </div>
          </div>

          {/* Student Vector Graphic */}
          <div className="relative w-64 h-48 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Checkmark bubble */}
              <circle cx="220" cy="40" r="20" fill="#E8F8EE" />
              <path d="M212 40L218 46L228 34" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Heart bubble */}
              <circle cx="265" cy="70" r="18" fill="#FFEBEB" />
              <path d="M265 77S256 71 256 65A4.5 4.5 0 01265 62A4.5 4.5 0 01274 65C274 71 265 77 265 77Z" fill="#FF4D4D" />
              
              {/* Gear icon */}
              <circle cx="275" cy="105" r="8" fill="#FCD34D" />

              {/* Student Person */}
              <path d="M120 180C120 145 150 120 180 120C210 120 240 145 240 180H120Z" fill="#38BDF8" />
              <circle cx="180" cy="90" r="30" fill="#FFD0B0" />
              <path d="M150 85C150 65 165 50 180 50C195 50 210 65 210 85C200 80 190 85 180 80C170 85 160 80 150 85Z" fill="#1E293B" />
              <circle cx="170" cy="85" r="3" fill="#1E293B" />
              <circle cx="190" cy="85" r="3" fill="#1E293B" />
              <path d="M175 98C175 98 180 102 185 98" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

              {/* Laptop */}
              <path d="M130 145L220 145L210 175L140 175Z" fill="#0F172A" />
              <rect x="145" y="125" width="60" height="40" rx="4" fill="#1E293B" />
              <circle cx="175" cy="145" r="4" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Topic Cards Grid (3 Pastel Cards) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {/* Card 1: Hình học */}
        <motion.div variants={itemVariants}>
          <Link href="/learn/geometry">
            <div className="group bg-[#D8E6FF] dark:bg-blue-950/60 rounded-3xl p-6 shadow-xs border border-blue-200/50 dark:border-blue-800/50 flex flex-col justify-between h-48 hover:shadow-md transition-all hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#B8D2FF] text-blue-700 flex items-center justify-center mb-4 shadow-xs">
                  <Pyramid className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Hình học</h3>
              </div>

              <div>
                <div className="w-full h-1.5 bg-white/60 dark:bg-blue-900/60 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-600 rounded-full w-0" />
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">0/3 bài hoàn thành</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 2: Giải tích */}
        <motion.div variants={itemVariants}>
          <Link href="/learn/calculus">
            <div className="group bg-[#D1F2D9] dark:bg-emerald-950/60 rounded-3xl p-6 shadow-xs border border-emerald-200/50 dark:border-emerald-800/50 flex flex-col justify-between h-48 hover:shadow-md transition-all hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#AEE5C0] text-emerald-700 flex items-center justify-center mb-4 shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Giải tích</h3>
              </div>

              <div>
                <div className="w-full h-1.5 bg-white/60 dark:bg-emerald-900/60 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-600 rounded-full w-0" />
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">0/3 bài hoàn thành</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Card 3: Lượng giác */}
        <motion.div variants={itemVariants}>
          <Link href="/learn/trigonometry">
            <div className="group bg-[#FFE0E0] dark:bg-rose-950/60 rounded-3xl p-6 shadow-xs border border-rose-200/50 dark:border-rose-800/50 flex flex-col justify-between h-48 hover:shadow-md transition-all hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFC4C4] text-rose-700 flex items-center justify-center mb-4 shadow-xs">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Lượng giác</h3>
              </div>

              <div>
                <div className="w-full h-1.5 bg-white/60 dark:bg-rose-900/60 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-rose-500 rounded-full w-1/4" />
                </div>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">1/4 bài hoàn thành</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Weekly Streak Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Chuỗi học tập</h3>
          <Link href="/achievements" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Xem lịch sử
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-slate-900 dark:text-white">{streak} ngày 🔥</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">liên tục</span>
          </div>

          <div className="w-full lg:w-auto flex justify-between items-center gap-3 overflow-x-auto py-2">
            {[
              { day: "T2", status: "done" },
              { day: "T3", status: "done" },
              { day: "T4", status: "done" },
              { day: "T5", status: "done" },
              { day: "T6", status: "today" },
              { day: "T7", status: "upcoming" },
              { day: "CN", status: "upcoming" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-12 h-12 rounded-full border-4 flex items-center justify-center text-sm font-bold transition-all",
                  item.status === "today" && "border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 scale-110 shadow-md",
                  item.status === "done" && "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/50",
                  item.status === "upcoming" && "border-slate-200 dark:border-slate-700 text-slate-400"
                )}>
                  {item.day}
                </div>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[11px] font-bold",
                  item.status === "today" ? "bg-emerald-500 text-white" : "text-slate-400"
                )}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
