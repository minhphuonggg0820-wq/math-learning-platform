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
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {recentActivity && recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => {
                    let Icon = BookOpen
                    let iconColor = "text-blue-500 bg-blue-100 dark:bg-blue-900"
                    
                    if (activity.type === "quiz") {
                      Icon = Brain
                      iconColor = "text-purple-500 bg-purple-100 dark:bg-purple-900"
                    } else if (activity.type === "game") {
                      Icon = Gamepad2
                      iconColor = "text-emerald-500 bg-emerald-100 dark:bg-emerald-900"
                    } else if (activity.type === "badge") {
                      Icon = Award
                      iconColor = "text-amber-500 bg-amber-100 dark:bg-amber-900"
                    }

                    return (
                      <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${iconColor}`}>
                          <Icon size={18} />
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border bg-card shadow-sm">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <h4 className="font-bold text-sm text-foreground truncate min-w-0">{activity.title}</h4>
                            <span className="text-xs font-medium text-amber-500">+{activity.xp} XP</span>
                          </div>
                          <time className="block text-xs font-medium text-muted-foreground">
                            {new Date(activity.date).toLocaleDateString()}
                          </time>
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
