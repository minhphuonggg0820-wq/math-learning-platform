"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, Zap, Scale } from 'lucide-react'
import Link from 'next/link'
import { useAppState } from '@/lib/store'

export default function GamesPage() {
  const { bestSpeedFormulaScore, bestBalanceScore } = useAppState()
  
  const speedScore = bestSpeedFormulaScore;
  const algebraScore = bestBalanceScore;

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-xl">
          <Gamepad2 className="w-8 h-8 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold">Mini-Games Toán học</h1>
          <p className="text-muted-foreground mt-1">Ôn tập kiến thức Toán qua các trò chơi thú vị</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
            <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 z-0 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-colors" />
            
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-md">
                <Zap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Thử thách Phản xạ Công thức</h2>
              <p className="text-muted-foreground mb-6">Nhận diện công thức Toán học dưới áp lực thời gian. Kiểm tra độ nhanh nhạy của bạn!</p>
              
              <div className="bg-muted/50 rounded-lg p-3 inline-block mb-6">
                <span className="text-sm font-medium">Điểm cao nhất: </span>
                <span className="text-lg font-bold text-primary">{speedScore}</span>
              </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <Link href="/games/speed-formula" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow hover:opacity-90 h-10 px-8 w-full">
                Chơi ngay
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
            <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl -mr-16 -mt-16 z-0 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-colors" />
            
            <div className="relative z-10 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-6 shadow-md">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Cân bằng Đại số</h2>
              <p className="text-muted-foreground mb-6">Tìm giá trị x để cân thăng bằng phương trình. Trực quan hóa việc giải phương trình bậc nhất.</p>
              
              <div className="bg-muted/50 rounded-lg p-3 inline-block mb-6">
                <span className="text-sm font-medium">Điểm cao nhất: </span>
                <span className="text-lg font-bold text-emerald-600">{algebraScore}</span>
              </div>
            </div>
            
            <div className="relative z-10 mt-auto">
              <Link href="/games/algebra-balance" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-primary-foreground shadow hover:opacity-90 h-10 px-8 w-full">
                Chơi ngay
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
