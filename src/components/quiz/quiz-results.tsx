"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home, Star, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface QuizResultsProps {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  onRetry: () => void;
  onBack: () => void;
}

export default function QuizResults({
  totalQuestions,
  correctAnswers,
  timeTaken,
  onRetry,
  onBack,
}: QuizResultsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const xpEarned = correctAnswers * 10;
  
  // Format time
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  const timeString = `${minutes > 0 ? `${minutes}p ` : ''}${seconds}s`;

  // Calculate stars (0-3)
  let stars = 0;
  if (percentage >= 90) stars = 3;
  else if (percentage >= 70) stars = 2;
  else if (percentage >= 40) stars = 1;

  const circleCircumference = 2 * Math.PI * 60;
  const strokeDashoffset = circleCircumference - (percentage / 100) * circleCircumference;

  return (
    <Card className="w-full max-w-lg mx-auto border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden relative">
      {/* Decorative top bg */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      
      <CardContent className="p-4 sm:p-8 pt-8 sm:pt-12 relative z-10">
        <div className="flex flex-col items-center">
          
          {/* Stars */}
          <div className="flex space-x-2 mb-8">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + star * 0.1, type: "spring" }}
              >
                <Star 
                  className={`w-10 h-10 ${star <= stars ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 dark:fill-slate-800 text-slate-200 dark:text-slate-800'}`} 
                />
              </motion.div>
            ))}
          </div>

          {/* Score Circle */}
          <div className="relative w-40 h-40 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeLinecap="round"
                className="text-primary"
                initial={{ strokeDashoffset: circleCircumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                style={{
                  strokeDasharray: circleCircumference,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-4xl font-bold text-slate-900 dark:text-white"
              >
                {percentage}%
              </motion.span>
            </div>
          </div>

          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-2xl font-bold text-center mb-8 break-words"
          >
            {percentage >= 90 ? "Xuất sắc!" : 
             percentage >= 70 ? "Làm tốt lắm!" : 
             percentage >= 50 ? "Khá lắm!" : "Cần cố gắng hơn!"}
          </motion.h2>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-2 gap-4 w-full mb-8"
          >
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Target className="w-6 h-6 text-emerald-500 mb-2" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {correctAnswers}/{totalQuestions}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Chính xác</span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {timeString}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Thời gian</span>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center col-span-2">
              <Trophy className="w-6 h-6 text-amber-500 mb-2" />
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-bold text-amber-500">+{xpEarned}</span>
                <span className="text-sm font-bold text-amber-500">XP</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mt-1">Kinh nghiệm nhận được</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex w-full flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
          >
            <Button variant="outline" className="flex-1 h-12" onClick={onRetry}>
              <RotateCcw className="w-4 h-4 mr-2" /> Làm lại
            </Button>
            <Button className="flex-1 h-12" onClick={onBack}>
              <Home className="w-4 h-4 mr-2" /> Về Quiz Hub
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
