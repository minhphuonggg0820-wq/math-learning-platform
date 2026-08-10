"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Timer, Trophy, X, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { useAppState } from '@/lib/store'
import { flashcardQuestions } from '@/lib/mock-data'
import { KatexRenderer } from '@/components/math/katex-renderer'

type GameState = 'ready' | 'playing' | 'finished'

export default function SpeedFormulaPage() {
  const [gameState, setGameState] = useState<GameState>('ready')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(1)
  const [maxCombo, setMaxCombo] = useState(1)
  const [timeLeft, setTimeLeft] = useState(60)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState([...flashcardQuestions].sort(() => Math.random() - 0.5))
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  
  const { bestSpeedFormulaScore, dispatch } = useAppState()
  const bestScore = bestSpeedFormulaScore

  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setGameState('finished')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState])

  useEffect(() => {
    if (gameState === 'finished') {
      const xp = Math.floor(score / 5)
      dispatch({ type: 'PLAY_GAME', payload: { title: 'Thử thách Phản xạ Công thức', game: 'speed-formula', score, xp } })
      
      if (score > 200) {
        const end = Date.now() + 3 * 1000;
        const colors = ['#a855f7', '#3b82f6'];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      } else if (score > bestScore) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }
  }, [gameState, score, bestScore, dispatch])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setCombo(1)
    setMaxCombo(1)
    setTimeLeft(60)
    setCorrectCount(0)
    setTotalAnswered(0)
    setQuestions([...flashcardQuestions].sort(() => Math.random() - 0.5))
    setCurrentQuestionIndex(0)
  }

  const handleAnswer = (answerIndex: number) => {
    if (feedback !== null) return // prevent multiple clicks

    const q = questions[currentQuestionIndex]
    const isCorrect = answerIndex === q.correctIndex
    
    setTotalAnswered(prev => prev + 1)
    
    if (isCorrect) {
      setFeedback('correct')
      setCorrectCount(prev => prev + 1)
      const points = 10 * combo
      setScore(prev => prev + points)
      setCombo(prev => {
        const nextCombo = prev + 1
        if (nextCombo > maxCombo) setMaxCombo(nextCombo)
        return nextCombo
      })
      
      setTimeout(() => {
        nextQuestion()
      }, 300)
    } else {
      setFeedback('wrong')
      setCombo(1)
      setScore(prev => Math.max(0, prev - 5))
      setTimeout(() => {
        nextQuestion()
      }, 1000)
    }
  }

  const nextQuestion = () => {
    setFeedback(null)
    setCurrentQuestionIndex((prev) => {
      const next = prev + 1
      if (next >= questions.length) {
        setQuestions([...flashcardQuestions].sort(() => Math.random() - 0.5))
        return 0
      }
      return next
    })
  }

  if (gameState === 'ready') {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-3xl mx-auto flex items-center justify-center text-white mb-8 shadow-xl shadow-primary/20">
            <Zap className="w-12 h-12" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Thử thách Phản xạ Công thức</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Nhận diện đúng công thức trong 60 giây. Trả lời đúng liên tiếp để tăng điểm thưởng Combo. Sai sẽ bị trừ điểm và mất Combo!
          </p>
          
          <div className="bg-card border rounded-2xl p-6 mb-8 max-w-sm mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="font-medium">Điểm cao nhất của bạn</span>
            </div>
            <div className="text-3xl font-bold text-primary">{bestScore}</div>
          </div>
          
          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            BẮT ĐẦU NGAY
          </button>
        </motion.div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
    const isNewBest = score > bestScore

    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-card border rounded-3xl p-8 md:p-12 text-center w-full shadow-xl relative overflow-hidden"
        >
          {isNewBest && (
            <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
              KỶ LỤC MỚI!
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-6">HẾT GIỜ!</h2>
          
          <div className="mb-8">
            <div className="text-muted-foreground text-lg mb-2">Điểm của bạn</div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
              className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-600"
            >
              {score}
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4">
              <div className="text-2xl font-black text-emerald-500">{correctCount}/{totalAnswered}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Đúng</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4">
              <div className="text-2xl font-black text-amber-500">{accuracy}%</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Chính xác</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/60 rounded-2xl p-4">
              <div className="text-2xl font-black text-indigo-500">x{maxCombo}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Max Combo</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md transition-all active:scale-95"
            >
              Chơi lại
            </button>
            <Link 
              href="/games"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-white font-bold py-3.5 px-8 rounded-full shadow-sm transition-all active:scale-95 text-center"
            >
              Về trang Games
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const q = questions[currentQuestionIndex]
  const isDanger = timeLeft <= 10

  return (
    <div className="container mx-auto py-6 px-4 max-w-3xl min-h-[80vh] flex flex-col space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/games" className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 transition-colors shadow-xs">
            <ArrowRight className="w-5 h-5 rotate-180 text-slate-700 dark:text-slate-350" />
          </Link>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-full font-bold">
            <Timer className={`w-5 h-5 ${isDanger ? 'text-rose-500 animate-pulse' : 'text-indigo-600'}`} />
            <span className={`text-xl font-black font-mono ${isDanger ? 'text-rose-500' : 'text-slate-850 dark:text-slate-200'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {combo > 1 && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> COMBO X{combo}
            </motion.div>
          )}

          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 px-4 py-2 rounded-full font-bold text-indigo-600 dark:text-indigo-300 text-sm">
            Điểm: <span className="font-black text-lg">{score}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {/* Play Card Box */}
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
        >
          {/* Answer Status feedback overlays */}
          <AnimatePresence>
            {feedback === 'correct' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-emerald-500/10"
              >
                <Check className="w-32 h-32 text-emerald-500/50 stroke-[3]" />
              </motion.div>
            )}
            {feedback === 'wrong' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-rose-500/10"
              >
                <X className="w-32 h-32 text-rose-500/50 stroke-[3]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mb-8">
            <p className="text-slate-500 dark:text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-4">Chọn tên đúng cho công thức bên dưới</p>
            <div className="text-2xl sm:text-4xl md:text-5xl py-6 flex justify-center overflow-x-auto max-w-full bg-slate-50/80 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-inner font-extrabold text-slate-900 dark:text-white">
              <KatexRenderer math={q.formula} inline={false} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
            {q.options.map((option, idx) => {
              let btnClass = "bg-white dark:bg-slate-900 border-slate-200/85 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-700 hover:bg-indigo-50/20"
              
              if (feedback !== null) {
                if (idx === q.correctIndex) {
                  btnClass = "bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-500/20 z-20 font-bold"
                } else if (feedback === 'wrong' && idx !== q.correctIndex) {
                  btnClass = "opacity-30 bg-slate-100 border-transparent text-slate-400"
                } else if (feedback === 'correct' && idx !== q.correctIndex) {
                  btnClass = "opacity-30 bg-slate-100 border-transparent text-slate-400"
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={feedback !== null}
                  className={`
                    p-4 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all overflow-hidden cursor-pointer flex items-center justify-center
                    ${btnClass}
                  `}
                >
                  <KatexRenderer math={option} inline={true} />
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
