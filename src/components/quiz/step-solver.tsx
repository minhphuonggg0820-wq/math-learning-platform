"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    }
  };

  const handleSkipToNext = () => {
     const newInputs = [...stepInputs];
     newInputs[currentStep] = steps[currentStep].answer;
     setStepInputs(newInputs);
     
     const newStatus = [...stepStatus];
     newStatus[currentStep] = "correct";
     setStepStatus(newStatus);

     onAnswer(false);
     setCurrentStep(steps.length);
  }

  return (
    <div className="space-y-6">
      {/* Top Question Box */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed break-words">
          {question.question}
        </h3>
        {question.questionLatex && (
          <div className="text-2xl py-3 mt-4 text-center max-w-full overflow-x-auto bg-slate-50/80 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800/80">
            <KaTeXRenderer math={question.questionLatex} block />
          </div>
        )}
      </div>

      {/* Timeline steps */}
      <div className="space-y-6 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
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
                {/* Timeline node */}
                <div className={cn(
                  "absolute -left-[35px] w-7 h-7 rounded-full border-2 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm transition-all",
                  isCompleted ? "border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-950" :
                  isCurrent ? "border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-110" :
                  "border-slate-300 text-slate-300"
                )}>
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : <span className="text-xs font-black">{index + 1}</span>}
                </div>

                {/* Step box */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                  <p className="font-bold text-slate-850 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-3 break-words">
                    {step.instruction}
                  </p>
                  
                  {step.latex && (
                    <div className="my-3 py-2.5 px-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-x-auto border border-slate-100 dark:border-slate-800/60 font-semibold text-slate-800 dark:text-slate-200">
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
                        placeholder="Nhập kết quả..."
                        className={cn(
                          "rounded-xl border-2 font-bold transition-all",
                          status === "wrong" && "border-rose-500 focus-visible:ring-rose-500",
                          status === "correct" && "border-emerald-500 text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30"
                        )}
                      />
                    </motion.div>
                    
                    {isCurrent && !disabled && (
                      <Button onClick={handleCheckStep} className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20" disabled={!stepInputs[index].trim()}>
                        Kiểm tra
                      </Button>
                    )}
                  </div>

                  {status === "wrong" && isCurrent && (
                    <div className="mt-4 p-3 bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-300 rounded-2xl text-xs sm:text-sm font-bold border border-rose-200 dark:border-rose-800/80 flex items-center justify-between flex-wrap gap-2 sm:flex-nowrap min-w-0">
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                        Chưa chính xác. Thử lại nhé!
                      </span>
                      <Button variant="link" size="sm" className="text-slate-500 hover:text-slate-800 font-bold" onClick={handleSkipToNext}>
                        Bỏ qua bước này
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 p-6 rounded-3xl text-center shadow-xs"
          >
            <h4 className="text-emerald-900 dark:text-emerald-300 font-black text-lg mb-1">Hoàn thành các bước! 🎉</h4>
            <p className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">Bạn đã giải quyết bài toán từng bước một cách xuất sắc.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
