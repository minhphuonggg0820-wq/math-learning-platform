"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLevelFromXP } from "@/lib/utils";
import { useState, useEffect } from "react";

export function XpBar({ xp }: { xp: number }) {
  const levelInfo = getLevelFromXP(xp);
  const xpInCurrentLevel = levelInfo.currentXP;
  const xpRequired = levelInfo.requiredXP;
  const progress = Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequired) * 100));

  const [prevXp, setPrevXp] = useState(xp);
  const [showFloat, setShowFloat] = useState(false);
  const [xpDiff, setXpDiff] = useState(0);

  useEffect(() => {
    if (xp > prevXp) {
      setXpDiff(xp - prevXp);
      setShowFloat(true);
      const timer = setTimeout(() => setShowFloat(false), 2000);
      setPrevXp(xp);
      return () => clearTimeout(timer);
    }
  }, [xp, prevXp]);

  return (
    <div className="relative w-full">
      <div className="flex justify-between text-xs font-medium mb-1.5">
        <span className="text-slate-600 dark:text-slate-400 truncate min-w-0">XP hiện tại: {Math.floor(xpInCurrentLevel)}</span>
        <span className="text-slate-500 dark:text-slate-500 shrink-0 ml-2">{Math.floor(xpRequired)}</span>
      </div>
      <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/20" style={{ animation: "shimmer 2s infinite" }} />
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showFloat && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1.2 }}
            exit={{ opacity: 0, y: -30 }}
            className="absolute -top-2 right-0 text-amber-500 font-bold text-sm pointer-events-none drop-shadow-md"
          >
            +{xpDiff} XP
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
