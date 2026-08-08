"use client";

import React, { useState, useEffect } from "react";
import { motion, Reorder } from "framer-motion";
import { Check, X, GripVertical, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import KaTeXRenderer from "@/components/math/katex-renderer";

interface DragDropProps {
  question: any;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export default function DragDrop({ question, onAnswer, disabled }: DragDropProps) {
  const [items, setItems] = useState<{ id: string; text?: string; latex?: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Initialize randomized items
  useEffect(() => {
    if (question.dragItems) {
      // Create a shuffled copy for the initial state
      const shuffled = [...question.dragItems].sort(() => Math.random() - 0.5);
      setItems(shuffled);
    }
  }, [question]);

  const handleSubmit = () => {
    if (disabled) return;
    setSubmitted(true);
    
    // Check if current order matches correct order
    const correctOrderIds = question.correctAnswer;
    const currentOrderIds = items.map(item => item.id);
    
    const isCorrect = JSON.stringify(correctOrderIds) === JSON.stringify(currentOrderIds);
    
    if (isCorrect) {
      onAnswer(true);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
      onAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2 break-words">
            {question.question}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Kéo thả để sắp xếp các bước theo thứ tự chính xác.
          </p>
          
          <div className="max-w-xl mx-auto">
            <motion.div animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }}>
              <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
                {items.map((item, index) => {
                  const correctOrderIds = question.correctAnswer;
                  const isItemInCorrectPos = item.id === correctOrderIds[index];
                  
                  return (
                    <Reorder.Item 
                      key={item.id} 
                      value={item} 
                      className={cn(
                        "flex items-center p-4 bg-white dark:bg-slate-800 rounded-xl border shadow-sm cursor-grab active:cursor-grabbing",
                        disabled ? "pointer-events-none" : "hover:border-primary/50",
                        submitted && isItemInCorrectPos ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "",
                        submitted && !isItemInCorrectPos ? "border-rose-500 bg-rose-50 dark:bg-rose-900/20" : ""
                      )}
                    >
                      <div className="mr-4 text-slate-400">
                        <GripVertical className="w-5 h-5" />
                      </div>
                      <div className="flex-1 flex items-center min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-medium mr-4 shrink-0">
                          {index + 1}
                        </div>
                        <div className="overflow-x-auto min-w-0 flex-1">
                          {item.latex ? <KaTeXRenderer math={item.latex} /> : (item as any).content}
                        </div>
                      </div>
                      {submitted && (
                        <div className="ml-4 shrink-0">
                          {isItemInCorrectPos ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <X className="w-5 h-5 text-rose-500" />
                          )}
                        </div>
                      )}
                    </Reorder.Item>
                  );
                })}
              </Reorder.Group>
            </motion.div>
          </div>
          
          {!disabled && (
            <div className="mt-8 flex justify-center">
              <Button size="lg" onClick={handleSubmit} className="px-8">
                Kiểm tra thứ tự
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {!disabled && question.hints && question.hints.length > 0 && (
        <div className="flex flex-col items-center mt-6">
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-4 rounded-lg mb-4 text-sm w-full max-w-md border border-amber-200 flex items-start"
            >
              <Lightbulb className="w-5 h-5 mr-2 shrink-0 text-amber-500" />
              <span>{question.hints[0]}</span>
            </motion.div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setShowHint(true)} className="text-slate-500">
            <Lightbulb className="w-4 h-4 mr-2" />
            Cần gợi ý?
          </Button>
        </div>
      )}
    </div>
  );
}
