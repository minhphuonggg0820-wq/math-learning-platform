"use client";

import { motion } from 'framer-motion';
import { BookOpen, Calculator, BarChart, Triangle, FunctionSquare } from 'lucide-react';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';

const iconMap: Record<string, React.ReactNode> = {
  algebra: <Calculator className="w-10 h-10" />,
  geometry: <Triangle className="w-10 h-10" />,
  calculus: <FunctionSquare className="w-10 h-10" />,
  statistics: <BarChart className="w-10 h-10" />
};

const colorMap: Record<string, string> = {
  primary: "bg-blue-500 text-blue-500",
  emerald: "bg-emerald-500 text-emerald-500",
  amber: "bg-amber-500 text-amber-500",
  rose: "bg-rose-500 text-rose-500"
};

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
          <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Thư viện Chủ đề</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-lg">Chọn chủ đề để bắt đầu học lý thuyết và khám phá công thức toán học</p>
        </div>
      </div>

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
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
          >
            <Link href={`/learn/${topic.id}`} className="block h-full">
              <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:shadow-blue-900/20 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 ${colorMap[topic.color].split(' ')[0]}`} />
                
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-opacity-10 dark:bg-opacity-20 ${colorMap[topic.color].split(' ')[0]} ${colorMap[topic.color].split(' ')[1]}`}>
                    {iconMap[topic.id] || <BookOpen className="w-8 h-8" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{topic.title}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{topic.description}</p>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(topic.tags || []).map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{topic.lessons.length} Bài học</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className={`h-full rounded-full ${colorMap[topic.color].split(' ')[0]}`} style={{ width: '30%' }} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
