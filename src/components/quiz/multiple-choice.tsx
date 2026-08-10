"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import KaTeXRenderer from "@/components/math/katex-renderer";

interface MultipleChoiceProps {
  question: any;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export default function MultipleChoice({ question, onAnswer, disabled }: MultipleChoiceProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setSelectedOption(index);
    const isCorrect = index === question.correctAnswer;
    onAnswer(isCorrect);
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
      {/* Question Box */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed break-words">
          {question.question}
        </h3>
        {question.questionLatex && (
          <div className="text-xl sm:text-2xl overflow-x-auto py-3 mt-2 bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <KaTeXRenderer math={question.questionLatex} block />
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(question.optionsLatex || question.options || []).map((option: any, index: number) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctAnswer;
          const showStatus = disabled;

          let stateClass = "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20";
          
          if (showStatus) {
            if (isCorrect) {
              stateClass = "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold shadow-md shadow-emerald-500/10";
            } else if (isSelected && !isCorrect) {
              stateClass = "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-300 font-bold shadow-md shadow-rose-500/10";
            } else {
              stateClass = "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-50";
            }
          }

          return (
            <motion.button
              key={index}
              whileHover={!disabled ? { scale: 1.015 } : {}}
              whileTap={!disabled ? { scale: 0.985 } : {}}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              className={cn(
                "relative p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-center shadow-sm cursor-pointer",
                stateClass
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl border-2 flex items-center justify-center mr-4 shrink-0 font-extrabold text-sm transition-colors shadow-xs",
                showStatus && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
                showStatus && isSelected && !isCorrect ? "border-rose-500 bg-rose-500 text-white" :
                "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              )}>
                {showStatus && isCorrect ? <Check className="w-5 h-5 stroke-[3]" /> : 
                 showStatus && isSelected && !isCorrect ? <X className="w-5 h-5 stroke-[3]" /> : 
                 String.fromCharCode(65 + index)}
              </div>
              <div className="flex-1 overflow-x-auto text-base sm:text-lg min-w-0 font-medium">
                {question.optionsLatex ? (
                  <KaTeXRenderer math={option} />
                ) : (
                  <span className="break-words">{option}</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Hint Callout */}
      {!disabled && question.hints && question.hints.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50/90 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 p-4 rounded-2xl mb-4 text-sm w-full border border-amber-200/80 dark:border-amber-800/60 flex items-start shadow-sm"
            >
              <Lightbulb className="w-5 h-5 mr-3 shrink-0 text-amber-500" />
              <span className="min-w-0 break-words font-medium">{question.hints[hintIndex]}</span>
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
