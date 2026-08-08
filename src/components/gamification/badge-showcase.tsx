"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Variable,
  Flame,
  Trophy,
  Crown,
  Zap,
  Scale,
  Shapes,
  Target,
  Compass,
  Lock,
} from "lucide-react"

import { cn } from "@/lib/utils"

export interface Badge {
  id: string
  name: string
  description: string
  requirement: string
  icon: string
  category: string
  unlockedAt?: string | null
}

interface BadgeShowcaseProps {
  badge: Badge
  size?: "sm" | "md" | "lg"
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Variable,
  Flame,
  Trophy,
  Crown,
  Zap,
  Scale,
  Shapes,
  Target,
  Compass,
}

export function BadgeShowcase({ badge, size = "md" }: BadgeShowcaseProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isUnlocked = !!badge.unlockedAt

  const IconComponent = iconMap[badge.icon] || Trophy

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-24 h-24 text-4xl",
    lg: "w-32 h-32 text-5xl",
  }

  const iconSizes = {
    sm: 24,
    md: 40,
    lg: 56,
  }

  return (
    <div
      className="relative flex flex-col items-center gap-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={isUnlocked ? { scale: 1.1 } : {}}
        whileTap={isUnlocked ? { scale: 0.95 } : {}}
        className={cn(
          "relative flex items-center justify-center rounded-full border-4 shadow-sm transition-colors cursor-pointer",
          sizeClasses[size],
          isUnlocked
            ? "bg-amber-100 border-amber-400 text-amber-600 dark:bg-amber-950/50 dark:border-amber-600 dark:text-amber-400"
            : "bg-slate-100 border-slate-300 text-slate-400 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-600 grayscale"
        )}
      >
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 rounded-full border-amber-400/50 dark:border-amber-500/50"
            animate={{
              boxShadow: isHovered
                ? "0 0 20px 5px rgba(251, 191, 36, 0.4)"
                : "0 0 0px 0px rgba(251, 191, 36, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        <IconComponent size={iconSizes[size]} className="z-10" />

        {!isUnlocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/20 backdrop-blur-[1px] z-20">
            <Lock size={iconSizes[size] * 0.5} className="text-slate-500 drop-shadow-md" />
          </div>
        )}
      </motion.div>

      <div className="text-center w-full">
        <h4
          className={cn(
            "font-semibold line-clamp-1",
            size === "sm" ? "text-xs" : "text-sm",
            !isUnlocked && "text-muted-foreground"
          )}
        >
          {badge.name}
        </h4>
        {isUnlocked && badge.unlockedAt && size !== "sm" && (
          <p className="text-[10px] text-muted-foreground mt-0.5">
            {new Date(badge.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 w-48 z-50 p-3 bg-popover text-popover-foreground text-sm rounded-lg shadow-xl border max-w-[calc(100vw-2rem)] break-words left-1/2 -translate-x-1/2"
        >
          <p className="font-semibold mb-1">{badge.name}</p>
          <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
          
          <div className="mt-2 pt-2 border-t">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
              Yêu cầu
            </span>
            <p className="text-xs">{badge.requirement}</p>
          </div>
          
          {!isUnlocked && (
            <div className="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
              <Lock size={12} /> Chưa mở khóa
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
