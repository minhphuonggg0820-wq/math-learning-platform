"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Zap, Scale, Sparkles, Trophy, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAppState } from '@/lib/store'

export default function GamesPage() {
  const { bestSpeedFormulaScore, bestBalanceScore } = useAppState()
  
  const speedScore = bestSpeedFormulaScore;
  const algebraScore = bestBalanceScore;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-700/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-purple-300 shrink-0">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-teal-300 mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" /> Học mà chơi - Chơi mà học
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Mini-Games Toán học</h1>
            <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Thách thức khả năng phản xạ công thức và giải phương trình trực quan qua các trò chơi giải trí thú vị.
            </p>
          </div>
        </div>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/30 transition-all duration-300 group h-full flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl -mr-16 -mt-16 z-0 group-hover:scale-150 transition-transform" />
            
            <div className="relative z-10 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/25">
                  <Zap className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold border border-amber-200/60 dark:border-amber-800/50">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> Kỷ lục: {speedScore}
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Phản xạ Công thức
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Nhận diện chính xác tên các công thức Toán học dưới áp lực thời gian 60s. Giữ vững Combo để nhân bội số điểm!
              </p>
            </div>
            
            <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/games/speed-formula" className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all">
                Chơi ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm hover:shadow-xl dark:hover:shadow-teal-950/30 transition-all duration-300 group h-full flex flex-col justify-between hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl -mr-16 -mt-16 z-0 group-hover:scale-150 transition-transform" />
            
            <div className="relative z-10 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
                  <Scale className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/50">
                  <Trophy className="w-3.5 h-3.5 text-emerald-500" /> Kỷ lục: {algebraScore}
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Cân bằng Đại số
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Tìm giá trị <span className="italic font-serif font-bold">x</span> để cán cân phương trình đạt thăng bằng. Trực quan hóa việc giải phương trình đại số.
              </p>
            </div>
            
            <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/games/algebra-balance" className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all">
                Chơi ngay <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
