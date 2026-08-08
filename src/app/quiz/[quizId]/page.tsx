"use client";

import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Clock, ChevronRight, RotateCcw, LayoutDashboard, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppState } from "@/lib/store";
import { quizQuestions } from "@/lib/mock-data";
import confetti from "canvas-confetti";

import MultipleChoice from "@/components/quiz/multiple-choice";
import FillBlank from "@/components/quiz/fill-blank";
import DragDrop from "@/components/quiz/drag-drop";
import StepSolver from "@/components/quiz/step-solver";
import QuizResults from "@/components/quiz/quiz-results";

type QuizState = "intro" | "playing" | "results";

export default function QuizSessionPage({ params }: { params: Promise<{ quizId: string }> }) {
  const resolvedParams = use(params);
  const quizId = resolvedParams.quizId;
  const { dispatch } = useAppState();

  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ isCorrect: boolean; timeTaken: number }[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnswerCorrect, setCurrentAnswerCorrect] = useState<boolean | null>(null);

  // Filter questions for this topic
  const questions = quizQuestions.filter((q) => q.topicId === quizId) || [];
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (quizState === "playing") {
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
    }
  }, [quizState]);

  const handleStart = () => {
    if (questions.length === 0) return;
    setQuizState("playing");
  };

  const handleAnswer = (isCorrect: boolean) => {
    setCurrentAnswerCorrect(isCorrect);
    setShowExplanation(true);
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    setAnswers((prev) => [...prev, { isCorrect, timeTaken }]);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentAnswerCorrect(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizState("results");
    const correctCount = answers.filter((a) => a.isCorrect).length;
    // Add current answer since it's not in state yet when this is called from the last next button if we changed logic, 
    // but here it's already in state because we wait for Next Question click.
    const finalScore = correctCount; 
    const xpEarned = finalScore * 10;
    
    dispatch({ 
      type: "COMPLETE_QUIZ", 
      payload: { 
        title: `Quiz ${quizId}`, 
        xp: xpEarned, 
        accuracy: Math.round((correctCount / questions.length) * 100) 
      } 
    });
    
    if (finalScore / questions.length >= 0.8) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const resetQuiz = () => {
    setQuizState("intro");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowExplanation(false);
    setCurrentAnswerCorrect(null);
  };

  if (questions.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy câu hỏi nào cho chủ đề này</h2>
        <Link href="/quiz">
          <Button>Quay lại Quiz Hub</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl min-h-[80vh] flex flex-col">
      <AnimatePresence mode="wait">
        {quizState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center"
          >
            <Card className="w-full max-w-lg text-center border-none shadow-lg">
              <CardHeader className="pb-8">
                <div className="mx-auto p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <Brain className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-3xl mb-2">Sẵn sàng chưa?</CardTitle>
                <p className="text-slate-500 dark:text-slate-400">
                  Chủ đề: <span className="font-semibold text-slate-900 dark:text-white capitalize">{quizId}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center space-x-2">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{questions.length} Câu hỏi</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">~{questions.length * 1.5} Phút</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full text-lg h-14" onClick={handleStart}>
                  Bắt đầu Quiz <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {quizState === "playing" && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {/* Header / Progress */}
            <div className="mb-8 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                  </h2>
                </div>
                <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'}>
                  {currentQuestion.difficulty}
                </Badge>
              </div>
              <Progress value={((currentQuestionIndex) / questions.length) * 100} className="h-2" />
            </div>

            {/* Question Component Render */}
            <div className="mb-8">
              {currentQuestion.type === "multiple-choice" && (
                <MultipleChoice question={currentQuestion} onAnswer={handleAnswer} disabled={showExplanation} />
              )}
              {currentQuestion.type === "fill-blank" && (
                <FillBlank question={currentQuestion} onAnswer={handleAnswer} disabled={showExplanation} />
              )}
              {currentQuestion.type === "drag-drop" && (
                <DragDrop question={currentQuestion} onAnswer={handleAnswer} disabled={showExplanation} />
              )}
              {currentQuestion.type === "step-solve" && (
                <StepSolver question={currentQuestion} onAnswer={handleAnswer} disabled={showExplanation} />
              )}
            </div>

            {/* Explanation / Next Button */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <Card className={`border-2 ${currentAnswerCorrect ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/20' : 'border-rose-500/50 bg-rose-50 dark:bg-rose-950/20'}`}>
                    <CardContent className="p-4 flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold mb-2 ${currentAnswerCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                          {currentAnswerCorrect ? "Chính xác! 🎉" : "Chưa chính xác! 💡"}
                        </h4>
                        <div className="text-sm text-slate-700 dark:text-slate-300">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end">
                    <Button size="lg" onClick={handleNextQuestion}>
                      {currentQuestionIndex < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"} <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {quizState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <QuizResults
              totalQuestions={questions.length}
              correctAnswers={answers.filter(a => a.isCorrect).length}
              timeTaken={Math.round((Date.now() - startTime) / 1000)}
              onRetry={resetQuiz}
              onBack={() => window.location.href = '/quiz'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
