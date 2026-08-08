"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';
import { ChevronRight, Clock, Award, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topicId as string;
  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    return <div className="p-8 text-center text-xl text-slate-600">Không tìm thấy chủ đề.</div>;
  }

  const difficultyColor = {
    easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    hard: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
  };

  const difficultyText = {
    easy: "Cơ bản",
    medium: "Trung bình",
    hard: "Nâng cao"
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/learn" className="hover:text-blue-600 transition-colors">Học lý thuyết</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-slate-900 dark:text-white">{topic.title}</span>
      </nav>

      <div className="mb-10 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-words">{topic.title}</h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8">{topic.description}</p>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm w-full sm:w-fit">
            <div>
              <span className="text-slate-400 text-sm block mb-1">Tiến độ</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '25%' }} />
                </div>
                <span className="font-semibold">25%</span>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <span className="text-slate-400 text-sm block mb-1">Bài học</span>
              <span className="font-semibold text-lg">{topic.lessons.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Danh sách bài học</h2>
        
        {topic.lessons.map((lesson, index) => {
          const isCompleted = index === 0; // Mock completion
          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/learn/${topic.id}/${lesson.id}`}>
                <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:shadow-lg">
                  <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                    ${isCompleted ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">{lesson.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-1">{lesson.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:w-auto w-full pt-2 sm:pt-0">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${difficultyColor[lesson.difficulty]}`}>
                      {difficultyText[lesson.difficulty]}
                    </span>
                    <span className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {lesson.duration}p
                    </span>
                    <span className="flex items-center text-xs font-medium text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5 mr-1" />
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
  );
}
