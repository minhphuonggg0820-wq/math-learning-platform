"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Star, Trophy, Target, BookOpen, Clock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppState } from "@/lib/store";

const topics = [
  { id: "all", label: "Tất cả" },
  { id: "algebra", label: "Đại số" },
  { id: "geometry", label: "Hình học" },
  { id: "calculus", label: "Giải tích" },
  { id: "trigonometry", label: "Lượng giác" },
];

const difficulties = ["Easy", "Medium", "Hard"];

// Mock quiz groups (topics)
const quizTopics = [
  {
    id: "algebra",
    title: "Đại số cơ bản & nâng cao",
    description: "Các khái niệm đại số từ phương trình, hệ phương trình đến biểu thức chứa căn",
    questionCount: 15,
    difficulty: "Medium",
    xpReward: 150,
    icon: <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
  },
  {
    id: "geometry",
    title: "Hình học không gian",
    description: "Khám phá các hình khối, công thức thể tích, diện tích xung quanh và định lý Pytago",
    questionCount: 10,
    difficulty: "Hard",
    xpReward: 200,
    icon: <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
  },
  {
    id: "calculus",
    title: "Đạo hàm và Tích phân",
    description: "Luyện tập các bài toán giải tích, tìm cực trị, tính diện tích hình phẳng",
    questionCount: 20,
    difficulty: "Hard",
    xpReward: 250,
    icon: <Brain className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
  },
  {
    id: "trigonometry",
    title: "Hàm số Lượng giác",
    description: "Giải quyết các phương trình và hệ thức về sin, cos, tan, cotan",
    questionCount: 12,
    difficulty: "Easy",
    xpReward: 100,
    icon: <Star className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function QuizHubPage() {
  const [activeTopic, setActiveTopic] = useState("all");
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);
  const { xp, totalQuizzesCompleted, quizAccuracy } = useAppState();

  const filteredQuizzes = quizTopics.filter((quiz) => {
    const matchesTopic = activeTopic === "all" || quiz.id === activeTopic;
    const matchesDifficulty = !activeDifficulty || quiz.difficulty === activeDifficulty;
    return matchesTopic && matchesDifficulty;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start sm:items-center gap-4">
          <div className="p-3.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-indigo-300 shrink-0">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-purple-300 mb-2 border border-white/15">
              <Sparkles className="w-3.5 h-3.5" /> Thử thách Thấu hiểu Toán học
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Quiz Tương tác</h1>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Kiểm tra kiến thức, nâng cao tư duy phản xạ toán học và nhận điểm thưởng XP siêu hấp dẫn.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/50 dark:border-emerald-800/40 rounded-2xl text-emerald-600 dark:text-emerald-400 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Đã hoàn thành</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalQuizzesCompleted} Quizzes</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/40 rounded-2xl text-indigo-600 dark:text-indigo-400 shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Chính xác Trung bình</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{quizAccuracy}%</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/50 dark:border-amber-800/40 rounded-2xl text-amber-600 dark:text-amber-400 shrink-0">
            <Star className="w-6 h-6 fill-amber-400/20" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">XP Thưởng Quiz</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{xp} XP</h3>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Difficulty Controls */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start w-full md:w-auto">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTopic === topic.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Độ khó:</span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                activeDifficulty === diff
                  ? diff === "Easy"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
                    : diff === "Medium"
                    ? "bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800"
                    : "bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800"
                  : "bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredQuizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={itemVariants}>
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-indigo-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/50 shrink-0">
                    {quiz.icon}
                  </div>
                  <Badge 
                    variant={quiz.difficulty === "Easy" ? "secondary" : quiz.difficulty === "Medium" ? "default" : "destructive"}
                    className="font-bold px-3 py-1 rounded-full text-xs"
                  >
                    {quiz.difficulty}
                  </Badge>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                  {quiz.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {quiz.description}
                </p>
              </div>

              <div className="mt-6 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    {quiz.questionCount} câu hỏi
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    +{quiz.xpReward} XP
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-500" />
                    ~{Math.ceil(quiz.questionCount * 1.5)} phút
                  </div>
                </div>

                <Link href={`/quiz/${quiz.id}`} className="block w-full">
                  <button className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.01]">
                    Bắt đầu Quiz <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8">
          Không tìm thấy bài quiz nào phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}
