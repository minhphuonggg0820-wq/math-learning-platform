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
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-500">{correctCount}/{totalAnswered}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Đúng</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Chính xác</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-500">x{maxCombo}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">Max Combo</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={startGame}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-xl shadow-md transition-colors"
            >
              Chơi lại
            </button>
            <Link 
              href="/games"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-3 px-8 rounded-xl shadow-sm transition-colors"
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
    <div className="container mx-auto py-6 px-4 max-w-3xl min-h-[80vh] flex flex-col">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/games" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
          <div className="flex items-center gap-2">
            <Timer className={`w-6 h-6 ${isDanger ? 'text-destructive animate-pulse' : 'text-primary'}`} />
            <span className={`text-2xl font-bold font-mono ${isDanger ? 'text-destructive' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <AnimatePresence>
            {combo > 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                key={combo}
                className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 font-black px-3 py-1 rounded-lg text-lg flex items-center gap-1"
              >
                <Zap className="w-4 h-4" /> x{combo}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-3xl font-black text-primary">{score}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-3 mb-10 overflow-hidden">
        <motion.div 
          className={`h-full rounded-full ${isDanger ? 'bg-destructive' : 'bg-primary'}`}
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 60) * 100}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>

      {/* Game Card */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            rotate: feedback === 'wrong' ? [-2, 2, -2, 2, 0] : 0 
          }}
          transition={{ duration: 0.3 }}
          className={`w-full max-w-2xl bg-card border-2 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden
            ${feedback === 'correct' ? 'border-emerald-500 bg-emerald-500/5' : 
              feedback === 'wrong' ? 'border-destructive bg-destructive/5' : 'border-border'}
          `}
        >
          {/* Card feedback overlay */}
          <AnimatePresence>
            {feedback === 'correct' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-emerald-500/10"
              >
                <Check className="w-32 h-32 text-emerald-500/50" />
              </motion.div>
            )}
            {feedback === 'wrong' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-destructive/10"
              >
                <X className="w-32 h-32 text-destructive/50" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mb-12">
            <p className="text-muted-foreground font-medium mb-6">Chọn tên đúng cho công thức bên dưới:</p>
            <div className="text-2xl sm:text-4xl md:text-5xl py-6 flex justify-center overflow-x-auto max-w-full">
              <KatexRenderer math={q.formula} inline={false} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-20">
            {q.options.map((option, idx) => {
              let btnClass = "bg-muted hover:bg-muted/80 text-foreground border-transparent"
              
              if (feedback !== null) {
                if (idx === q.correctIndex) {
                  btnClass = "bg-emerald-500 text-white border-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20"
                } else if (feedback === 'wrong' && idx !== q.correctIndex) {
                  btnClass = "opacity-30 bg-muted text-muted-foreground border-transparent"
                } else if (feedback === 'correct' && idx !== q.correctIndex) {
                  btnClass = "opacity-30 bg-muted text-muted-foreground border-transparent"
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={feedback !== null}
                  className={`
                    p-4 rounded-xl border-2 font-medium text-lg transition-all overflow-hidden
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
