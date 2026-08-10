"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import KaTeXRenderer from "@/components/math/katex-renderer";

interface FillBlankProps {
  question: any;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export default function FillBlank({ question, onAnswer, disabled }: FillBlankProps) {
  const [value, setValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [isWrong, setIsWrong] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled || !value.trim()) return;

    const correctAns = question.blankAnswer || question.correctAnswer;
    const isCorrect = value.trim().toLowerCase() === String(correctAns).toLowerCase();
    
    if (isCorrect) {
      onAnswer(true);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500); // Reset shake
      onAnswer(false);
    }
  };

  const handleShowHint = () => {
    if (!question.hints || question.hints.length === 0) return;
    setShowHint(true);
    if (hintIndex < question.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Card Box */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="text-center">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed break-words">
            {question.question}
          </h3>
          {question.questionLatex && (
            <div className="text-2xl py-3 mt-4 text-center max-w-full overflow-x-auto bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/85">
              <KaTeXRenderer math={question.questionLatex} block />
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-6">
            <div className="relative">
              <motion.div
                animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={disabled}
                  placeholder="Nhập đáp án của bạn..."
                  className={cn(
                    "text-center text-lg py-6 rounded-2xl shadow-sm border-2 transition-all font-semibold",
                    disabled && value.trim().toLowerCase() === String(question.blankAnswer || question.correctAnswer).toLowerCase() && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-300 font-bold",
                    disabled && value.trim().toLowerCase() !== String(question.blankAnswer || question.correctAnswer).toLowerCase() && "border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300 font-bold"
                  )}
                />
              </motion.div>
              
              {disabled && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {value.trim().toLowerCase() === String(question.blankAnswer || question.correctAnswer).toLowerCase() ? (
                    <Check className="text-emerald-500 w-6 h-6 stroke-[3]" />
                  ) : (
                    <X className="text-rose-500 w-6 h-6 stroke-[3]" />
                  )}
                </div>
              )}
            </div>

            {!disabled && (
              <Button type="submit" className="w-full mt-4 h-12 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20" disabled={!value.trim()}>
                Kiểm tra <Send className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {disabled && value.trim().toLowerCase() !== String(question.blankAnswer || question.correctAnswer).toLowerCase() && (
              <div className="mt-4 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 rounded-2xl text-sm font-bold border border-emerald-200 dark:border-emerald-800/80 break-words overflow-x-auto">
                Đáp án đúng: <strong>{question.blankAnswer || question.correctAnswer}</strong>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Hints Box */}
      {!disabled && question.hints && question.hints.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50/95 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 p-4 rounded-2xl mb-4 text-sm w-full max-w-md border border-amber-200/80 dark:border-amber-800/60 flex items-start shadow-sm"
            >
              <Lightbulb className="w-5 h-5 mr-3 shrink-0 text-amber-500" />
              <span className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">{question.hints[hintIndex]}</span>
            </motion.div>
          )}
          <Button variant="ghost" size="sm" onClick={handleShowHint} className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200">
            <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
            {showHint ? "Gợi ý tiếp theo" : "Cần gợi ý?"}
          </Button>
        </div>
      )}
    </div>
  );
}
