"use client";

import { useAppState } from "@/lib/store";
import { topics } from "@/lib/mock-data";
import { getLevelFromXP, cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Star, 
  Flame, 
  BookOpen, 
  Brain, 
  ChevronRight, 
  Sparkles, 
  Calculator, 
  Triangle, 
  FunctionSquare, 
  BarChart, 
  Gamepad2, 
  Award,
  ArrowRight
} from "lucide-react";
import { XpBar } from "@/components/gamification/xp-bar";

const topicIcons: Record<string, React.ReactNode> = {
  algebra: <Calculator className="w-6 h-6" />,
  geometry: <Triangle className="w-6 h-6" />,
  calculus: <FunctionSquare className="w-6 h-6" />,
  statistics: <BarChart className="w-6 h-6" />
};

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
      {/* Hero Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-emerald-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-700/50"
      >
        {/* Background decorative glows */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" /> Thống trị Toán học mỗi ngày
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Chào mừng trở lại, Math Explorer! 👋
            </h1>
            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              Bạn đang ở <strong className="text-white font-bold">Cấp độ {levelInfo.level}</strong> với <strong className="text-amber-300 font-bold">{xp} XP</strong>. Hãy giữ vững chuỗi <strong className="text-rose-300 font-bold">{streak} ngày</strong> học liên tục nhé!
            </p>

            <div className="pt-2 max-w-md">
              <XpBar xp={xp} />
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full sm:w-auto">
            <Link 
              href="/learn" 
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
            >
              Học bài tiếp theo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/quiz" 
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              Làm Quiz <Brain className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
      >
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/20 p-5 rounded-2xl border border-amber-200/60 dark:border-amber-800/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">Tổng XP</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-950 dark:text-amber-100 mt-1">{xp}</h3>
            </div>
            <div className="shrink-0 bg-amber-500/15 dark:bg-amber-500/30 p-2.5 rounded-xl border border-amber-400/30">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-400/30" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gradient-to-br from-rose-50 to-rose-100/60 dark:from-rose-950/40 dark:to-rose-900/20 p-5 rounded-2xl border border-rose-200/60 dark:border-rose-800/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-rose-800 dark:text-rose-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">Chuỗi ngày</p>
              <h3 className="text-2xl sm:text-3xl font-black text-rose-950 dark:text-rose-100 mt-1">{streak} ngày</h3>
            </div>
            <div className="shrink-0 bg-rose-500/15 dark:bg-rose-500/30 p-2.5 rounded-xl border border-rose-400/30">
              <Flame className="w-5 h-5 text-rose-600 dark:text-rose-400 fill-rose-400/30" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-50 to-indigo-100/60 dark:from-indigo-950/40 dark:to-indigo-900/20 p-5 rounded-2xl border border-indigo-200/60 dark:border-indigo-800/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">Bài học</p>
              <h3 className="text-2xl sm:text-3xl font-black text-indigo-950 dark:text-indigo-100 mt-1">12</h3>
            </div>
            <div className="shrink-0 bg-indigo-500/15 dark:bg-indigo-500/30 p-2.5 rounded-xl border border-indigo-400/30">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/20 p-5 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold tracking-wide uppercase">Điểm Quiz</p>
              <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 mt-1">85%</h3>
            </div>
            <div className="shrink-0 bg-emerald-500/15 dark:bg-emerald-500/30 p-2.5 rounded-xl border border-emerald-400/30">
              <Brain className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Topic Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Chủ đề học tập</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Lý thuyết trọng tâm & mô phỏng tương tác</p>
          </div>
          <Link href="/learn" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center transition-colors">
            Xem tất cả <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {topics.slice(0, 4).map((topic) => {
            const bgMap: Record<string, string> = {
              primary: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50",
              emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
              amber: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
              rose: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
            };
            const icon = topicIcons[topic.id] || <BookOpen className="w-6 h-6" />;
            const percent = Math.round((topic.completedLessons / topic.lessonsCount) * 100);

            return (
              <motion.div key={topic.id} variants={itemVariants}>
                <Link href={`/learn/${topic.id}`}>
                  <div className="group h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-600 flex flex-col justify-between">
                    <div>
                      <div className={cn("w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm", bgMap[topic.color] || bgMap.primary)}>
                        {icon}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-500 dark:text-slate-400">{topic.completedLessons}/{topic.lessonsCount} bài hoàn thành</span>
                        <span className="text-indigo-600 dark:text-indigo-400">{percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500" 
                          style={{ width: `${percent}%` }}
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

      {/* Main Grid: Activity Feed & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Hoạt động gần đây</h2>
            <Link href="/achievements" className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
              Xem lịch sử
            </Link>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-2.5">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((act, i) => {
                let Icon = BookOpen;
                let badgeStyle = "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50";
                
                if (act.type === "quiz") {
                  Icon = Brain;
                  badgeStyle = "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/50";
                } else if (act.type === "game") {
                  Icon = Gamepad2;
                  badgeStyle = "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50";
                } else if (act.type === "badge") {
                  Icon = Award;
                  badgeStyle = "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50";
                }

                return (
                  <div 
                    key={i} 
                    className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-slate-100 dark:border-slate-800/40"
                  >
                    <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-sm", badgeStyle)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-800 dark:text-slate-200 text-sm truncate">{act.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{act.date}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full text-xs border border-amber-200/50">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> +{act.xp} XP
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                Chưa có hoạt động gần đây.
              </div>
            )}
          </div>
        </div>

        {/* Streak Tracker Section */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Chuỗi học tập</h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/50 text-rose-500 mb-4 shadow-sm">
              <Flame className="w-10 h-10 fill-rose-500/20" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">{streak} ngày liên tục</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Bạn đang học với phong độ rất tuyệt vời!
            </p>
            
            <div className="w-full flex justify-between items-center gap-1 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, i) => {
                const isLearned = i < 5;
                const isToday = i === 4;
                return (
                  <div key={day} className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold transition-all shadow-sm",
                      isLearned 
                        ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400",
                      isToday && "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900 scale-105"
                    )}>
                      {isLearned ? '✓' : day[1]}
                    </div>
                    <span className={cn("text-[10px] font-bold", isToday ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400")}>
                      {day}
                    </span>
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
