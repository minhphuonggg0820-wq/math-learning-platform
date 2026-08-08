"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-6 break-words">
            {question.question}
          </h3>
          {question.questionLatex && (
            <div className="text-2xl py-4 mb-4 text-center max-w-full overflow-x-auto">
              <KaTeXRenderer math={question.questionLatex} block />
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-4">
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
                    "text-center text-lg py-6 shadow-sm",
                    disabled && value.trim().toLowerCase() === String(question.blankAnswer || question.correctAnswer).toLowerCase() && "border-emerald-500 bg-emerald-50 text-emerald-700",
                    disabled && value.trim().toLowerCase() !== String(question.blankAnswer || question.correctAnswer).toLowerCase() && "border-rose-500 bg-rose-50 text-rose-700"
                  )}
                />
              </motion.div>
              
              {disabled && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {value.trim().toLowerCase() === String(question.blankAnswer || question.correctAnswer).toLowerCase() ? (
                    <Check className="text-emerald-500 w-6 h-6" />
                  ) : (
                    <X className="text-rose-500 w-6 h-6" />
                  )}
                </div>
              )}
            </div>

            {!disabled && (
              <Button type="submit" className="w-full mt-4" disabled={!value.trim()}>
                Kiểm tra <Send className="w-4 h-4 ml-2" />
              </Button>
            )}
            
            {disabled && value.trim().toLowerCase() !== String(question.blankAnswer || question.correctAnswer).toLowerCase() && (
              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm border border-emerald-200 break-words overflow-x-auto">
                Đáp án đúng: <strong>{question.blankAnswer || question.correctAnswer}</strong>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {!disabled && question.hints && question.hints.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg mb-4 text-sm w-full max-w-md border border-amber-200 dark:border-amber-800/50 flex items-start"
            >
              <Lightbulb className="w-5 h-5 mr-2 shrink-0 text-amber-500" />
              <span>{question.hints[hintIndex]}</span>
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
