"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, ArrowRight, Lightbulb, CheckCircle2, XCircle, Trophy } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { useAppState } from '@/lib/store'
import { balanceChallenges } from '@/lib/mock-data'
import { KatexRenderer } from '@/components/math/katex-renderer'

type GameState = 'ready' | 'playing' | 'finished'
type Difficulty = 'Dễ' | 'Trung bình' | 'Khó'

export default function AlgebraBalancePage() {
  const [gameState, setGameState] = useState<GameState>('ready')
  const [difficulty, setDifficulty] = useState<Difficulty>('Dễ')
  const [challenges, setChallenges] = useState<typeof balanceChallenges>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  
  const [inputValue, setInputValue] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [tiltAngle, setTiltAngle] = useState(0) // < 0: left heavy, > 0: right heavy, 0: balanced
  
  const { bestBalanceScore, dispatch } = useAppState()
  const bestScore = bestBalanceScore

  const difficultyMap: Record<Difficulty, 'easy' | 'medium' | 'hard'> = {
    'Dễ': 'easy',
    'Trung bình': 'medium',
    'Khó': 'hard',
  };

  const startGame = () => {
    const filtered = balanceChallenges.filter(c => c.difficulty === difficultyMap[difficulty])
    setChallenges(filtered.sort(() => Math.random() - 0.5)) // Shuffle
    setCurrentIndex(0)
    setScore(0)
    setGameState('playing')
    resetRound()
  }

  const resetRound = () => {
    setInputValue('')
    setFeedback(null)
    setShowHint(false)
    setTiltAngle(Math.random() > 0.5 ? -15 : 15) 
  }

  const handleCheck = () => {
    if (!inputValue.trim()) return

    const numVal = parseFloat(inputValue)
    const currentChallenge = challenges[currentIndex]
    
    if (isNaN(numVal)) return

    if (numVal === currentChallenge.missingValue) {
      setFeedback('correct')
      setTiltAngle(0)
      setScore(prev => prev + 1)
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#14b8a6']
      })
      
      setTimeout(() => {
        if (currentIndex + 1 < challenges.length) {
          setCurrentIndex(prev => prev + 1)
          resetRound()
        } else {
          endGame()
        }
      }, 2000)
    } else {
      setFeedback('wrong')
      setTiltAngle(numVal < currentChallenge.missingValue ? -25 : 25)
    }
  }

  const endGame = () => {
    setGameState('finished')
  }

  useEffect(() => {
    if (gameState === 'finished') {
      const xp = score * 5
      dispatch({ type: 'PLAY_GAME', payload: { title: 'Cân bằng Đại số', game: 'algebra-balance', score, xp } })
      
      if (score === challenges.length && score > 0) {
        const end = Date.now() + 2 * 1000;
        const colors = ['#10b981', '#14b8a6'];
        (function frame() {
          confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
          confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }
    }
  }, [gameState, score, challenges.length, dispatch])

  if (gameState === 'ready') {
    return (
      <div className="container mx-auto py-12 px-4 max-w-3xl flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center w-full"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mx-auto flex items-center justify-center text-white mb-8 shadow-xl shadow-emerald-500/20">
            <Scale className="w-12 h-12" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Cân bằng Đại số</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Tìm giá trị của <span className="italic font-serif">x</span> để phương trình thăng bằng. Luyện tập giải phương trình bậc nhất trực quan.
          </p>
          
          <div className="bg-card border rounded-2xl p-6 mb-8 max-w-sm mx-auto shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
              <Trophy className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Điểm cao nhất</span>
            </div>
            <div className="text-3xl font-bold text-emerald-600">{bestScore}</div>
          </div>
          
          <div className="mb-8">
            <div className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">Chọn độ khó</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {(['Dễ', 'Trung bình', 'Khó'] as Difficulty[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    difficulty === d 
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 dark:bg-emerald-900/50 dark:text-emerald-300' 
                      : 'bg-muted border-2 border-transparent hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startGame}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            BẮT ĐẦU NGAY
          </button>
        </motion.div>
      </div>
    )
  }

  if (gameState === 'finished') {
    const accuracy = challenges.length > 0 ? Math.round((score / challenges.length) * 100) : 0
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          className="bg-card border rounded-3xl p-8 md:p-12 text-center w-full shadow-xl"
        >
          <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold mb-6">Hoàn thành!</h2>
          
          <div className="mb-8">
            <div className="text-muted-foreground text-lg mb-2">Số câu đúng</div>
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600">
              {score} <span className="text-3xl text-muted-foreground">/ {challenges.length}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
            <div>
              <div className="text-xl font-bold text-emerald-500">{accuracy}%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Chính xác</div>
            </div>
            <div>
              <div className="text-xl font-bold text-amber-500">+{score * 5}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">XP</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={startGame}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-xl shadow-md transition-colors"
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

  const currentChallenge = challenges[currentIndex]

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl min-h-[80vh] flex flex-col">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/games" className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Link>
        
        <div className="bg-muted px-4 py-2 rounded-full font-medium">
          Câu {currentIndex + 1} / {challenges.length}
        </div>
        
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-500" />
          <span className="text-2xl font-bold">{score}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        {/* Scale Animation Area */}
        <div className="w-full max-w-2xl h-80 relative flex items-end justify-center mb-12">
          {feedback === 'correct' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl z-0"
            />
          )}

          {/* SVG Balance Scale */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-end">
            {/* The Beam and Pans - rotated together */}
            <motion.div 
              animate={{ rotate: tiltAngle }}
              transition={{ type: "spring", stiffness: 50, damping: 10 }}
              className="w-4/5 h-2 bg-slate-400 dark:bg-slate-500 rounded-full relative mb-[150px] origin-bottom shadow-md"
              style={{ originY: '100%' }}
            >
              {/* Left Pan */}
              <div className="absolute left-0 -translate-x-1/2 top-full flex flex-col items-center">
                <div className="w-1 h-32 bg-slate-300 dark:bg-slate-600 origin-top"></div>
                <div className="w-24 h-6 bg-emerald-500/80 rounded-b-xl border-t-2 border-emerald-600 shadow-lg flex items-center justify-center p-2 relative -mt-1">
                  <div className="absolute bottom-full mb-2 bg-background border shadow-sm px-3 py-1 rounded-lg text-lg font-bold min-w-16 text-center max-w-[140px] sm:max-w-xs overflow-x-auto">
                    <KatexRenderer math={currentChallenge.leftSide} inline={true} />
                  </div>
                </div>
              </div>

              {/* Right Pan */}
              <div className="absolute right-0 translate-x-1/2 top-full flex flex-col items-center">
                <div className="w-1 h-32 bg-slate-300 dark:bg-slate-600 origin-top"></div>
                <div className="w-24 h-6 bg-teal-500/80 rounded-b-xl border-t-2 border-teal-600 shadow-lg flex items-center justify-center p-2 relative -mt-1">
                  <div className="absolute bottom-full mb-2 bg-background border shadow-sm px-3 py-1 rounded-lg text-lg font-bold min-w-16 text-center max-w-[140px] sm:max-w-xs overflow-x-auto">
                    <KatexRenderer math={currentChallenge.rightSide} inline={true} />
                  </div>
                </div>
              </div>
              
              {/* Center Pivot Point on Beam */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-600 dark:bg-slate-300 z-20 border-2 border-background" />
            </motion.div>

            {/* Fulcrum Base */}
            <div className="w-32 h-40 absolute bottom-0 flex flex-col items-center z-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-300 dark:fill-slate-700 stroke-slate-400 dark:stroke-slate-600" preserveAspectRatio="none">
                <path d="M50 0 L100 100 L0 100 Z" strokeWidth="2" />
              </svg>
              <div className="w-40 h-4 bg-slate-400 dark:bg-slate-600 rounded-full mt-[-2px] shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-md bg-card border rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="text-2xl flex items-center gap-3">
              <span className="italic font-serif">x</span> = 
              <input
                type="number"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setFeedback(null)
                }}
                disabled={feedback === 'correct'}
                className={`w-32 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 bg-background transition-colors
                  ${feedback === 'correct' ? 'border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 
                    feedback === 'wrong' ? 'border-destructive text-destructive bg-destructive/10' : 'border-input'}
                `}
                placeholder="?"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheck()
                }}
              />
            </div>

            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleCheck}
                disabled={!inputValue.trim() || feedback === 'correct'}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {feedback === 'correct' ? (
                  <><CheckCircle2 className="w-5 h-5" /> Chính xác!</>
                ) : (
                  'Kiểm tra'
                )}
              </button>
              
              <AnimatePresence>
                {feedback === 'wrong' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-destructive text-sm text-center flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Chưa cân bằng, thử lại nhé!
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => setShowHint(true)}
                disabled={feedback === 'correct'}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 mt-2 transition-colors"
              >
                <Lightbulb className="w-4 h-4" /> Xem gợi ý
              </button>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 p-4 rounded-xl text-sm text-center border border-amber-200 dark:border-amber-900"
                  >
                    <p className="font-medium">{currentChallenge.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
