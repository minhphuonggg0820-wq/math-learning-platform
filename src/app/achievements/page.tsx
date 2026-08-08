"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Star, Target, Flame, BookOpen, Brain, Gamepad2, Award } from "lucide-react"

import { useAppState } from "@/lib/store"
import { badges as mockBadges } from "@/lib/mock-data"
import { getLevelFromXP } from "@/lib/utils"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BadgeShowcase } from "@/components/gamification/badge-showcase"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

export default function AchievementsPage() {
  const { xp, streak, badges, recentActivity, dispatch } = useAppState()
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
    { id: "Học tập", label: "Học tập" },
    { id: "Quiz", label: "Quiz" },
    { id: "Streak", label: "Streak" },
    { id: "Game", label: "Game" },
    { id: "Đặc biệt", label: "Đặc biệt" },
  ]

  const filteredBadges =
    activeTab === "all"
      ? userBadges
      : userBadges.filter((b) => b.category === activeTab)

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-8">
      <div className="flex items-center gap-3">
        <Trophy className="w-10 h-10 text-amber-500" />
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Thành tích</h1>
          <p className="text-muted-foreground">Bộ sưu tập huy hiệu và thành tích của bạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-amber-50">Tổng XP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 fill-current" />
              <span className="text-4xl font-bold">{currentXP}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cấp độ hiện tại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Target className="w-8 h-8 text-blue-500" />
              <span className="text-3xl font-bold text-foreground">Lv. {currentLevel.level}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Huy hiệu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-foreground">{unlockedCount}</span>
              <span className="text-lg text-muted-foreground pb-1">/ {totalCount}</span>
            </div>
            <Progress value={(unlockedCount / totalCount) * 100} className="mt-3" size="sm" variant="accent" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chuỗi học tập</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-rose-500 fill-current" />
              <span className="text-3xl font-bold text-foreground">{streak} ngày</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Huy hiệu</h2>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto overflow-x-auto" onValueChange={setActiveTab}>
              <TabsList className="w-max">
                {categories.map((cat) => (
                  <TabsTrigger key={cat.id} value={cat.id}>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeTab} // re-animate on tab change
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6 border rounded-xl bg-card/50"
          >
            {filteredBadges.length > 0 ? (
              filteredBadges.map((badge) => (
                <motion.div key={badge.id} variants={itemVariants} className="flex justify-center">
                  <BadgeShowcase badge={badge as any} size="md" />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-muted-foreground">
                Không tìm thấy huy hiệu nào trong danh mục này.
              </div>
            )}
          </motion.div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Hoạt động Gần đây</CardTitle>
              <CardDescription>Lịch sử nhận XP của bạn</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
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
                  <div className="text-center py-4 text-muted-foreground">
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
