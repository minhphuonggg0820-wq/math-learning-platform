"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Star, Trophy, Target, BookOpen, Clock } from "lucide-react";
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
    description: "Các khái niệm đại số từ cơ bản đến nâng cao",
    questionCount: 15,
    difficulty: "Medium",
    xpReward: 150,
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    id: "geometry",
    title: "Hình học không gian",
    description: "Khám phá các hình khối và định lý",
    questionCount: 10,
    difficulty: "Hard",
    xpReward: 200,
    icon: <Target className="w-6 h-6 text-primary" />,
  },
  {
    id: "calculus",
    title: "Đạo hàm và Tích phân",
    description: "Luyện tập các bài toán giải tích",
    questionCount: 20,
    difficulty: "Hard",
    xpReward: 250,
    icon: <Brain className="w-6 h-6 text-primary" />,
  },
  {
    id: "trigonometry",
    title: "Hàm số Lượng giác",
    description: "Giải quyết các bài toán về sin, cos, tan",
    questionCount: 12,
    difficulty: "Easy",
    xpReward: 100,
    icon: <Star className="w-6 h-6 text-primary" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
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
    <div className="container py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <div className="p-4 bg-primary/10 rounded-full">
          <Brain className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Quiz Tương tác
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Kiểm tra kiến thức của bạn với các câu hỏi tương tác. Vượt qua thử thách và kiếm XP để tăng cấp.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600 dark:text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Quizzes Hoàn thành</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalQuizzesCompleted}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tỉ lệ Chính xác (TB)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{quizAccuracy}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400">
              <Star className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tổng XP từ Quiz</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{xp}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={activeTopic === topic.id ? "default" : "outline"}
              onClick={() => setActiveTopic(topic.id)}
              className="rounded-full"
            >
              {topic.label}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {difficulties.map((diff) => (
            <Button
              key={diff}
              variant={activeDifficulty === diff ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveDifficulty(activeDifficulty === diff ? null : diff)}
              className="rounded-full"
            >
              {diff}
            </Button>
          ))}
        </div>
      </div>

      {/* Quiz Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {filteredQuizzes.map((quiz) => (
          <motion.div key={quiz.id} variants={itemVariants}>
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1 flex-1 min-w-0 pr-2">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit mb-4">
                    {quiz.icon}
                  </div>
                  <CardTitle className="text-xl truncate">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </div>
                <Badge variant={quiz.difficulty === "Easy" ? "secondary" : quiz.difficulty === "Medium" ? "default" : "destructive"}>
                  {quiz.difficulty}
                </Badge>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-center flex-wrap gap-3 sm:gap-6 text-sm text-slate-500 dark:text-slate-400 mt-4">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {quiz.questionCount} câu hỏi
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-amber-500" />
                    {quiz.xpReward} XP
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    ~{Math.ceil(quiz.questionCount * 1.5)} phút
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/quiz/${quiz.id}`} className="w-full">
                  <Button className="w-full">Bắt đầu Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          Không tìm thấy bài quiz nào phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}
