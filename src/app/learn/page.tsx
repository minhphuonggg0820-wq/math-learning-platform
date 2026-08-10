"use client";

import { motion } from 'framer-motion';
import { BookOpen, Calculator, BarChart, Triangle, FunctionSquare, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';

const iconMap: Record<string, React.ReactNode> = {
  algebra: <Calculator className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
  geometry: <Triangle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
  calculus: <FunctionSquare className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
  statistics: <BarChart className="w-8 h-8 text-rose-600 dark:text-rose-400" />
};

const badgeColorMap: Record<string, string> = {
  primary: "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800/50",
  emerald: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/50",
  amber: "bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/50",
  rose: "bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/50"
};

const barColorMap: Record<string, string> = {
  primary: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500"
};

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-emerald-400 shrink-0">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-emerald-300 mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" /> Thư viện Kiến thức Standard
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Thư viện Chủ đề Toán</h1>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Khám phá lý thuyết Toán học trọng tâm, công thức cốt lõi và các công cụ mô phỏng tương tác trực quan.
            </p>
          </div>
        </div>
      </div>

      {/* Topic Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        {topics.map((topic) => {
          const percent = Math.round((topic.completedLessons / topic.lessonsCount) * 100);
          return (
            <motion.div
              key={topic.id}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <Link href={`/learn/${topic.id}`} className="block h-full">
                <div className="h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-indigo-950/30 hover:border-indigo-300 dark:hover:border-indigo-700 group relative overflow-hidden">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className={`p-3.5 rounded-2xl border shadow-sm transition-transform group-hover:scale-110 ${badgeColorMap[topic.color] || badgeColorMap.primary}`}>
                        {iconMap[topic.id] || <BookOpen className="w-8 h-8 text-indigo-600" />}
                      </div>
                      <span className="inline-flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        Khám phá <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </span>
                    </div>

                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {topic.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {(topic.tags || ["Lý thuyết", "Công thức", "Bài tập"]).map(tag => (
                        <span key={tag} className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-500 dark:text-slate-400">{topic.lessons.length} Bài học</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className={`h-full rounded-full ${barColorMap[topic.color] || barColorMap.primary}`} style={{ width: `${percent}%` }} />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-bold">{percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
