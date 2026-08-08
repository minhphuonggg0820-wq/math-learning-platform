"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import KaTeXRenderer from "@/components/math/katex-renderer";

interface StepSolverProps {
  question: any;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
}

export default function StepSolver({ question, onAnswer, disabled }: StepSolverProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepInputs, setStepInputs] = useState<string[]>(Array(question.steps?.length || 0).fill(""));
  const [stepStatus, setStepStatus] = useState<("idle" | "wrong" | "correct")[]>(Array(question.steps?.length || 0).fill("idle"));
  const [wrongShake, setWrongShake] = useState(false);

  const steps = question.steps || [];
  const isFinished = currentStep >= steps.length;

  const handleCheckStep = () => {
    if (disabled || isFinished) return;

    const currentVal = stepInputs[currentStep].trim().toLowerCase();
    const correctVal = steps[currentStep].answer.toString().toLowerCase();

    if (currentVal === correctVal) {
      const newStatus = [...stepStatus];
      newStatus[currentStep] = "correct";
      setStepStatus(newStatus);
      
      if (currentStep === steps.length - 1) {
        onAnswer(true);
      }
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
    } else {
      const newStatus = [...stepStatus];
      newStatus[currentStep] = "wrong";
      setStepStatus(newStatus);
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
      
      // If wrong, you might decide to let them retry or fail the whole question.
      // For this implementation, we allow retry but maybe penalize score later.
      // Let's just mark it wrong visually but let them keep trying.
    }
  };

  const handleSkipToNext = () => {
     // Show correct answer and move on, marks question as wrong overall
     const newInputs = [...stepInputs];
     newInputs[currentStep] = steps[currentStep].answer;
     setStepInputs(newInputs);
     
     const newStatus = [...stepStatus];
     newStatus[currentStep] = "correct";
     setStepStatus(newStatus);

     onAnswer(false); // They used skip, so wrong answer
     setCurrentStep(steps.length);
  }

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-sm bg-slate-50 dark:bg-slate-900 mb-6">
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

      <div className="space-y-4 relative pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
        <AnimatePresence>
          {steps.map((step: any, index: number) => {
            if (index > currentStep) return null;
            
            const isCurrent = index === currentStep;
            const isCompleted = index < currentStep;
            const status = stepStatus[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "relative mb-8",
                  isCompleted ? "opacity-75" : "opacity-100"
                )}
              >
                <div className={cn(
                  "absolute -left-[27px] w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-950",
                  isCompleted ? "border-emerald-500 text-emerald-500" :
                  isCurrent ? "border-primary text-primary" :
                  "border-slate-300 text-slate-300"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{index + 1}</span>}
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <p className="font-medium text-slate-800 dark:text-slate-200 mb-3 break-words">
                    {step.instruction}
                  </p>
                  
                  {step.latex && (
                    <div className="my-3 py-2 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg overflow-x-auto">
                      <KaTeXRenderer math={step.latex} />
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-3 flex-wrap sm:flex-nowrap">
                    <motion.div animate={isCurrent && wrongShake ? { x: [-5, 5, -5, 5, 0] } : {}} className="flex-1 max-w-xs">
                      <Input
                        value={stepInputs[index]}
                        onChange={(e) => {
                          const newInputs = [...stepInputs];
                          newInputs[index] = e.target.value;
                          setStepInputs(newInputs);
                          
                          if (status === "wrong") {
                            const newStatus = [...stepStatus];
                            newStatus[index] = "idle";
                            setStepStatus(newStatus);
                          }
                        }}
                        disabled={disabled || isCompleted}
                        placeholder="Nhập kết quả bước này..."
                        className={cn(
                          status === "wrong" && "border-rose-500 focus-visible:ring-rose-500",
                          status === "correct" && "border-emerald-500 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20"
                        )}
                      />
                    </motion.div>
                    
                    {isCurrent && !disabled && (
                      <Button onClick={handleCheckStep} disabled={!stepInputs[index].trim()}>
                        Kiểm tra
                      </Button>
                    )}
                  </div>

                  {status === "wrong" && isCurrent && (
                    <div className="mt-3 text-sm text-rose-500 flex justify-between items-center flex-wrap gap-2 sm:flex-nowrap min-w-0">
                      <span>Chưa chính xác. Thử lại nhé!</span>
                      <Button variant="link" size="sm" className="text-slate-500" onClick={handleSkipToNext}>
                        Bỏ qua câu này
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 p-6 rounded-xl text-center"
          >
            <h4 className="text-emerald-700 dark:text-emerald-400 font-bold text-lg mb-2">Hoàn thành các bước!</h4>
            <p className="text-emerald-600 dark:text-emerald-500">Bạn đã giải quyết bài toán từng bước một cách xuất sắc.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
