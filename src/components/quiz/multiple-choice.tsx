"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4 break-words">
            {question.question}
          </h3>
          {question.questionLatex && (
            <div className="text-xl overflow-x-auto py-2">
              <KaTeXRenderer math={question.questionLatex} block />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(question.optionsLatex || question.options || []).map((option: any, index: number) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === question.correctAnswer;
          const showStatus = disabled;

          let stateClass = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800";
          
          if (showStatus) {
            if (isCorrect) {
              stateClass = "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400";
            } else if (isSelected && !isCorrect) {
              stateClass = "bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400";
            } else {
              stateClass = "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50";
            }
          }

          return (
            <motion.button
              key={index}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(index)}
              disabled={disabled}
              className={cn(
                "relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center shadow-sm",
                stateClass
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 font-medium",
                showStatus && isCorrect ? "border-emerald-500 bg-emerald-500 text-white" :
                showStatus && isSelected && !isCorrect ? "border-rose-500 bg-rose-500 text-white" :
                "border-slate-300 dark:border-slate-600 text-slate-500"
              )}>
                {showStatus && isCorrect ? <Check className="w-5 h-5" /> : 
                 showStatus && isSelected && !isCorrect ? <X className="w-5 h-5" /> : 
                 String.fromCharCode(65 + index)}
              </div>
              <div className="flex-1 overflow-x-auto text-base min-w-0">
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

      {!disabled && question.hints && question.hints.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg mb-4 text-sm w-full border border-amber-200 dark:border-amber-800/50 flex items-start"
            >
              <Lightbulb className="w-5 h-5 mr-2 shrink-0 text-amber-500" />
              <span className="min-w-0 break-words">{question.hints[hintIndex]}</span>
            </motion.div>
          )}
          <Button variant="ghost" size="sm" onClick={handleShowHint} className="text-slate-500">
            <Lightbulb className="w-4 h-4 mr-2" />
            {showHint ? "Gợi ý tiếp theo" : "Cần gợi ý?"}
          </Button>
        </div>
      )}
    </div>
  );
}
