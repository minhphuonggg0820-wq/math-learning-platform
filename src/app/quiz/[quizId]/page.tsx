"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Target, Clock, ChevronRight, Sparkles, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import MultipleChoice from "@/components/quiz/multiple-choice";
import FillBlank from "@/components/quiz/fill-blank";
import DragDrop from "@/components/quiz/drag-drop";
import StepSolver from "@/components/quiz/step-solver";
import QuizResults from "@/components/quiz/quiz-results";
import { useAppState } from "@/lib/store";

// Mock quiz data by topic ID
const quizData: Record<string, any[]> = {
  algebra: [
    {
      id: "alg_q1",
      type: "multiple-choice",
      question: "Phương trình nào sau đây là phương trình bậc hai một ẩn?",
      options: [
        "2x + 1 = 0",
        "x^2 - 4x + 3 = 0",
        "x^3 - x = 0",
        "x + y = 2"
      ],
      optionsLatex: [
        "2x + 1 = 0",
        "x^2 - 4x + 3 = 0",
        "x^3 - x = 0",
        "x + y = 2"
      ],
      correctAnswer: 1,
      difficulty: "easy",
      explanation: "Phương trình bậc hai một ẩn có dạng tổng quát ax^2 + bx + c = 0 (a ≠ 0). Do đó x^2 - 4x + 3 = 0 là phương trình bậc hai."
    },
    {
      id: "alg_q2",
      type: "fill-blank",
      question: "Tìm nghiệm nguyên dương của phương trình sau:",
      questionLatex: "x^2 - 9 = 0",
      blankAnswer: "3",
      difficulty: "easy",
      hints: ["Phương trình tương đương với x^2 = 9", "Lấy căn bậc hai hai vế ta được x = 3 hoặc x = -3, chọn giá trị dương."],
      explanation: "Ta có x^2 = 9 <=> x = 3 hoặc x = -3. Nghiệm nguyên dương là x = 3."
    },
    {
      id: "alg_q3",
      type: "drag-drop",
      question: "Giải hệ phương trình sau. Hãy sắp xếp các bước biến đổi theo thứ tự hợp lý từ trên xuống dưới:",
      questionLatex: "\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}",
      dragItems: [
        { id: "step1", content: "Cộng hai vế phương trình: (x + y) + (2x - y) = 5 + 1" },
        { id: "step2", content: "Thu gọn ta được phương trình: 3x = 6" },
        { id: "step3", content: "Giải ra ta được: x = 2" },
        { id: "step4", content: "Thay x = 2 vào phương trình đầu: 2 + y = 5 => y = 3" },
        { id: "step5", content: "Kết luận nghiệm của hệ phương trình là (x, y) = (2, 3)" }
      ],
      correctAnswer: ["step1", "step2", "step3", "step4", "step5"],
      difficulty: "medium",
      hints: ["Hãy thử cộng hai phương trình đại số để khử biến y đầu tiên."],
      explanation: "Cộng vế theo vế để khử y, tìm x = 2, thế x vào để tìm y = 3."
    },
    {
      id: "alg_q4",
      type: "step-solve",
      question: "Giải phương trình bậc hai sau bằng phương pháp lập biệt thức Delta:",
      questionLatex: "x^2 - 5x + 6 = 0",
      steps: [
        { instruction: "Bước 1: Xác định hệ số a, b, c. Hệ số b bằng bao nhiêu?", answer: "-5" },
        { instruction: "Bước 2: Tính biệt thức Delta = b^2 - 4ac. Giá trị của Delta bằng bao nhiêu?", answer: "1" },
        { instruction: "Bước 3: Phương trình có hai nghiệm phân biệt. Nghiệm nhỏ hơn (x1) bằng bao nhiêu?", answer: "2" },
        { instruction: "Bước 4: Nghiệm lớn hơn (x2) bằng bao nhiêu?", answer: "3" }
      ],
      difficulty: "hard",
      explanation: "Hệ số a = 1, b = -5, c = 6. Delta = (-5)^2 - 4*1*6 = 1. Nghiệm x1 = (5 - 1)/2 = 2, x2 = (5 + 1)/2 = 3."
    }
  ],
  geometry: [
    {
      id: "geo_q1",
      type: "multiple-choice",
      question: "Diện tích xung quanh của hình chóp đều có chu vi đáy C và trung đoạn d được tính bằng công thức:",
      options: [
        "S_{xq} = C \\cdot d",
        "S_{xq} = \\frac{1}{2} C \\cdot d",
        "S_{xq} = 2C \\cdot d",
        "S_{xq} = \\frac{1}{3} C \\cdot d"
      ],
      optionsLatex: [
        "S_{xq} = C \\cdot d",
        "S_{xq} = \\frac{1}{2} C \\cdot d",
        "S_{xq} = 2C \\cdot d",
        "S_{xq} = \\frac{1}{3} C \\cdot d"
      ],
      correctAnswer: 1,
      difficulty: "medium",
      explanation: "Diện tích xung quanh của hình chóp đều bằng nửa tích chu vi đáy với trung đoạn: S_{xq} = 1/2 * C * d."
    }
  ]
};

export default function QuizPlayPage() {
  const params = useParams();
  const { dispatch } = useAppState();
  const quizId = (params.quizId as string) || "algebra";

  // State
  const [quizState, setQuizState] = useState<"intro" | "playing" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnswerCorrect, setCurrentAnswerCorrect] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState(0);

  // Load questions
  const questions = quizData[quizId] || quizData.algebra;
  const currentQuestion = questions[currentQuestionIndex];

  const handleStart = () => {
    setQuizState("playing");
    setStartTime(Date.now());
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (showExplanation) return;
    setCurrentAnswerCorrect(isCorrect);
    setShowExplanation(true);
    
    // Save answer
    setAnswers((prev) => [
      ...prev,
      { questionId: currentQuestion.id, isCorrect }
    ]);
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setCurrentAnswerCorrect(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed!
      const correctCount = answers.filter((a) => a.isCorrect).length;
      const xpEarned = correctCount * 10;
      
      dispatch({
        type: "COMPLETE_QUIZ",
        payload: {
          title: `Hoàn thành bài Quiz ${quizId === "algebra" ? "Đại số" : quizId === "geometry" ? "Hình học" : "Lượng giác"}`,
          xp: xpEarned,
          accuracy: Math.round((correctCount / questions.length) * 100)
        }
      });
      
      setQuizState("results");
    }
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
      <div className="container py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Không tìm thấy câu hỏi nào cho chủ đề này</h2>
        <Link href="/quiz">
          <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6">Quay lại Quiz Hub</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl min-h-[80vh] flex flex-col">
      <AnimatePresence mode="wait">
        {/* Intro Card */}
        {quizState === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex items-center justify-center"
          >
            <Card className="w-full max-w-lg text-center border border-slate-200/80 dark:border-slate-800 shadow-xl rounded-3xl overflow-hidden p-6 sm:p-8">
              <CardHeader className="pb-6">
                <div className="mx-auto p-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200/50 rounded-2xl w-20 h-20 flex items-center justify-center mb-6">
                  <Brain className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-3xl font-black text-slate-900 dark:text-white">Sẵn sàng chưa?</CardTitle>
                <p className="text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  Chủ đề: <span className="font-extrabold text-indigo-600 dark:text-indigo-400 capitalize">{quizId}</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl flex items-center justify-center space-x-2.5">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{questions.length} Câu hỏi</span>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl flex items-center justify-center space-x-2.5">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">~{questions.length * 1.5} Phút</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-6">
                <Button size="lg" className="w-full text-lg h-14 rounded-full font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-98 transition-all" onClick={handleStart}>
                  Bắt đầu Quiz <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}

        {/* Gameplay Stage */}
        {quizState === "playing" && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
            {/* Top Progress bar */}
            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                  </h2>
                </div>
                <Badge variant={currentQuestion.difficulty === 'easy' ? 'secondary' : currentQuestion.difficulty === 'medium' ? 'default' : 'destructive'} className="font-bold rounded-full">
                  {currentQuestion.difficulty.toUpperCase()}
                </Badge>
              </div>
              <Progress value={((currentQuestionIndex) / questions.length) * 100} className="h-2 rounded-full" />
            </div>

            {/* Question Card Box */}
            <div className="mb-6">
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

            {/* Explanation & Next Trigger */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <Card className={`border-2 rounded-3xl ${currentAnswerCorrect ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/20' : 'border-rose-500/50 bg-rose-50 dark:bg-rose-950/20'}`}>
                    <CardContent className="p-5 flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-black text-lg mb-1 flex items-center gap-2 ${currentAnswerCorrect ? 'text-emerald-800 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                          {currentAnswerCorrect ? (
                            <>
                              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</span>
                              Chính xác! 🎉
                            </>
                          ) : (
                            <>
                              <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">✗</span>
                              Chưa chính xác! 💡
                            </>
                          )}
                        </h4>
                        <div className="text-sm font-semibold text-slate-700 dark:text-slate-350 leading-relaxed mt-2 p-3 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-white/20">
                          {currentQuestion.explanation}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end">
                    <Button size="lg" className="rounded-full h-12 font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95" onClick={handleNextQuestion}>
                      {currentQuestionIndex < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"} <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Screen */}
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
