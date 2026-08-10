"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Star, Target, Flame, BookOpen, Brain, Gamepad2, Award, Sparkles } from "lucide-react"

import { useAppState } from "@/lib/store"
import { getLevelFromXP } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BadgeShowcase } from "@/components/gamification/badge-showcase"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function AchievementsPage() {
  const { xp, streak, badges, recentActivity } = useAppState()
  const [activeTab, setActiveTab] = useState("all")

  const userBadges = badges.map((badge) => ({
    ...badge,
    unlockedAt: badge.unlocked ? new Date().toISOString() : null,
  }))

  const unlockedCount = badges.filter((b) => b.unlocked).length
  const totalCount = badges.length
  
  const currentXP = xp
  const currentLevel = getLevelFromXP(currentXP)

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "learning", label: "Học tập" },
    { id: "quiz", label: "Quiz" },
    { id: "streak", label: "Streak" },
    { id: "game", label: "Game" },
    { id: "special", label: "Đặc biệt" },
  ]

  const filteredBadges =
    activeTab === "all"
      ? userBadges
      : userBadges.filter((b) => b.category === activeTab)

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-700/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-amber-300 shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-amber-300 mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" /> Bộ sưu tập danh dự
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Thành tích & Huy hiệu</h1>
            <p className="text-amber-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Theo dõi cột mốc phát triển, thu thập huy hiệu danh giá và lịch sử nhận điểm XP của bạn.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-5 rounded-2xl shadow-lg border border-amber-400/30 flex flex-col justify-between">
          <p className="text-xs font-bold text-amber-100 uppercase tracking-wider">Tổng XP Tích lũy</p>
          <div className="flex items-center gap-2 mt-2">
            <Star className="w-8 h-8 fill-amber-200 text-amber-200" />
            <span className="text-3xl font-black">{currentXP}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cấp độ Hiện tại</p>
          <div className="flex items-center gap-2 mt-2">
            <Target className="w-8 h-8 text-indigo-500" />
            <span className="text-3xl font-black text-slate-900 dark:text-white">Lv. {currentLevel.level}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Huy hiệu Đã mở</p>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{unlockedCount}/{totalCount}</span>
          </div>
          <div className="mt-2">
            <div className="text-3xl font-black text-slate-900 dark:text-white">{unlockedCount}</div>
            <Progress value={(unlockedCount / totalCount) * 100} className="mt-2.5 h-2" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chuỗi ngày Liên tục</p>
          <div className="flex items-center gap-2 mt-2">
            <Flame className="w-8 h-8 text-rose-500 fill-rose-500/20" />
            <span className="text-3xl font-black text-slate-900 dark:text-white">{streak} ngày</span>
          </div>
        </div>
      </div>

      {/* Badges Section & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Huy hiệu đạt được</h2>
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/50">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === cat.id
                      ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm"
          >
            {filteredBadges.length > 0 ? (
              filteredBadges.map((badge) => (
                <motion.div key={badge.id} variants={itemVariants} className="flex justify-center">
                  <BadgeShowcase badge={badge} size="md" />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                Không tìm thấy huy hiệu nào trong danh mục này.
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80">
              <CardTitle className="text-xl font-extrabold">Hoạt động Gần đây</CardTitle>
              <CardDescription>Lịch sử nhận XP của bạn</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => {
                    let Icon = BookOpen
                    let iconColor = "text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50"
                    
                    if (activity.type === "quiz") {
                      Icon = Brain
                      iconColor = "text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/50"
                    } else if (activity.type === "game") {
                      Icon = Gamepad2
                      iconColor = "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200/50"
                    } else if (activity.type === "badge") {
                      Icon = Award
                      iconColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50"
                    }

                    return (
                      <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl border shrink-0 ${iconColor}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate min-w-0">{activity.title}</h4>
                          <time className="block text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                            {new Date(activity.date).toLocaleDateString()}
                          </time>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full text-xs border border-amber-200/50">
                          +{activity.xp} XP
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400 text-sm">
                    Chưa có hoạt động nào.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
