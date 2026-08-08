"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StreakDisplay({ streak }: { streak: number }) {
  const isHot = streak >= 7;
  const colorClass = isHot 
    ? "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" 
    : streak > 0 
      ? "text-orange-500" 
      : "text-slate-400";

  return (
    <div className="flex items-center gap-1.5 font-bold shrink-0 whitespace-nowrap">
      <motion.div
        animate={isHot ? {
          scale: [1, 1.2, 1],
          rotate: [-5, 5, -5]
        } : {}}
        transition={isHot ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      >
        <Flame className={cn("w-5 h-5", colorClass, isHot && "fill-rose-500/30")} />
      </motion.div>
      <span className={cn(colorClass)}>{streak}</span>
    </div>
  );
}
