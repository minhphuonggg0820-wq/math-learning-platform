"use client";

import { useAppState } from "@/lib/store";
import { topics } from "@/lib/mock-data";
import { getLevelFromXP, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Flame, BookOpen, Brain, ChevronRight, Activity } from "lucide-react";

export default function Dashboard() {
  const { xp, streak, darkMode } = useAppState();
  const level = getLevelFromXP(xp);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="min-w-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
            Chào mừng trở lại!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Cấp độ {level.level} • Đang trên đà học tập tuyệt vời
          </p>
        </div>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <motion.div variants={item} className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/10 p-5 rounded-2xl border border-amber-200/50 dark:border-amber-800/50 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">Tổng XP</p>
              <h3 className="text-2xl font-bold text-amber-950 dark:text-amber-200 mt-1">{xp}</h3>
            </div>
            <div className="shrink-0 bg-amber-200/50 dark:bg-amber-800/50 p-2 rounded-lg">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-gradient-to-br from-rose-50 to-rose-100/50 dark:from-rose-950/30 dark:to-rose-900/10 p-5 rounded-2xl border border-rose-200/50 dark:border-rose-800/50 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-rose-800 dark:text-rose-400 text-sm font-medium">Chuỗi ngày</p>
              <h3 className="text-2xl font-bold text-rose-950 dark:text-rose-200 mt-1">{streak} ngày</h3>
            </div>
            <div className="shrink-0 bg-rose-200/50 dark:bg-rose-800/50 p-2 rounded-lg">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/30 dark:to-indigo-900/10 p-5 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-indigo-800 dark:text-indigo-400 text-sm font-medium">Bài học</p>
              <h3 className="text-2xl font-bold text-indigo-950 dark:text-indigo-200 mt-1">12</h3>
            </div>
            <div className="shrink-0 bg-indigo-200/50 dark:bg-indigo-800/50 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/10 p-5 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-emerald-800 dark:text-emerald-400 text-sm font-medium">Điểm Quiz</p>
              <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-200 mt-1">85%</h3>
            </div>
            <div className="shrink-0 bg-emerald-200/50 dark:bg-emerald-800/50 p-2 rounded-lg">
              <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Chủ đề học tập</h2>
          <Link href="/learn" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
            Xem tất cả <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {topics.slice(0, 4).map((topic) => {
            const bgMap: Record<string, string> = {
              primary: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
              emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
              amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
              rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
            };
            return (
              <motion.div key={topic.id} variants={item}>
                <Link href={`/learn/${topic.id}`}>
                  <div className="group bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", bgMap[topic.color] || bgMap.primary)}>
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{topic.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{topic.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-600 dark:text-slate-400">{topic.completedLessons}/{topic.lessonsCount} bài hoàn thành</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold">{Math.round((topic.completedLessons / topic.lessonsCount) * 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.round((topic.completedLessons / topic.lessonsCount) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Hoạt động gần đây</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">Hoàn thành bài tập Đại số</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{i === 0 ? 'Vừa xong' : `${i * 2} giờ trước`}</p>
                </div>
                <div className="shrink-0 flex items-center gap-1 font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full text-sm">
                  <Star className="w-3.5 h-3.5" /> +20 XP
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Chuỗi học tập</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-500 mb-4 shadow-inner">
              <Flame className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{streak} ngày</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Tiếp tục phát huy nhé!</p>
            
            <div className="flex justify-between items-center gap-1 overflow-x-auto">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
                const isLearned = i < 5;
                const isToday = i === 4;
                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      isLearned ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-400",
                      isToday && "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-110"
                    )}>
                      {isLearned ? '✓' : ''}
                    </div>
                    <span className={cn("text-[10px] font-medium", isToday ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500")}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
