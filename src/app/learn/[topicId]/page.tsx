"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ChevronRight, Clock, Award, CheckCircle2, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    return <div className="p-8 text-center text-xl text-slate-600">Không tìm thấy chủ đề.</div>;
  }

  const difficultyColor = {
    easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800"
  };

  const difficultyText = {
    easy: "Cơ bản",
    medium: "Trung bình",
    hard: "Nâng cao"
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider overflow-x-auto whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 rounded-full w-fit">
        <Link href="/learn" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> Học lý thuyết
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
        <span className="text-slate-800 dark:text-white">{topic.title}</span>
      </nav>

      {/* Hero Header Card */}
      <div className="mb-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl border border-indigo-700/50 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-purple-300 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" /> Khám phá kiến thức
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">{topic.title}</h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed">{topic.description}</p>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm w-full sm:w-fit">
            <div>
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider block mb-1">Tiến độ của bạn</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 rounded-full bg-white/20 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="font-extrabold text-sm text-emerald-300">25%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20 hidden sm:block" />
            <div>
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider block mb-1">Tổng bài học</span>
              <span className="font-black text-xl text-white">{topic.lessons.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">Danh sách bài học</h2>
        
        <div className="space-y-3.5">
          {topic.lessons.map((lesson, index) => {
            const isCompleted = index === 0;
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link href={`/learn/${topic.id}/${lesson.id}`} className="block">
                  <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-950/20">
                    <div className={cn(
                      "shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-sm border transition-colors",
                      isCompleted 
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200/60 dark:bg-emerald-950/50" 
                        : "bg-slate-100 text-slate-500 border-slate-200/50 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-0.5 truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm line-clamp-1 leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:w-auto w-full pt-2 sm:pt-0 shrink-0">
                      <span className={cn("px-2.5 py-1 text-[11px] font-bold rounded-full border", difficultyColor[lesson.difficulty])}>
                        {difficultyText[lesson.difficulty]}
                      </span>
                      <span className="flex items-center text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {lesson.duration}p
                      </span>
                      <span className="flex items-center text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50 px-2.5 py-1 rounded-full">
                        <Award className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-400/20" />
                        +{lesson.xpReward} XP
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
