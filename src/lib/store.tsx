"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { initialUserStats, badges as defaultBadges, Badge } from "./mock-data";

export interface UserState {
  xp: number;
  streak: number;
  totalLessonsCompleted: number;
  totalQuizzesCompleted: number;
  totalGamesPlayed: number;
  quizAccuracy: number;
  bestSpeedFormulaScore: number;
  bestBalanceScore: number;
  completedLessons: string[];
  badges: Badge[];
  darkMode: boolean;
  recentActivity: { type: "lesson" | "quiz" | "game" | "badge"; title: string; date: string; xp: number }[];
  streakDays: boolean[];
}

type Action =
  | { type: "ADD_XP"; payload: number }
  | { type: "COMPLETE_LESSON"; payload: { lessonId: string; title: string; xp: number } }
  | { type: "COMPLETE_QUIZ"; payload: { title: string; xp: number; accuracy: number } }
  | { type: "PLAY_GAME"; payload: { title: string; xp: number; game: "speed-formula" | "algebra-balance"; score: number } }
  | { type: "UNLOCK_BADGE"; payload: string }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "INCREMENT_STREAK" };

const initialState: UserState = {
  ...initialUserStats,
  completedLessons: ["algebra-quadratic"],
  badges: defaultBadges,
  darkMode: false,
};

function reducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case "ADD_XP":
      return { ...state, xp: state.xp + action.payload };
    case "COMPLETE_LESSON":
      if (state.completedLessons.includes(action.payload.lessonId)) return state;
      return {
        ...state,
        xp: state.xp + action.payload.xp,
        totalLessonsCompleted: state.totalLessonsCompleted + 1,
        completedLessons: [...state.completedLessons, action.payload.lessonId],
        recentActivity: [
          { type: "lesson", title: action.payload.title, date: "Vừa xong", xp: action.payload.xp },
          ...state.recentActivity.slice(0, 4),
        ],
      };
    case "COMPLETE_QUIZ":
      return {
        ...state,
        xp: state.xp + action.payload.xp,
        totalQuizzesCompleted: state.totalQuizzesCompleted + 1,
        quizAccuracy: Math.round((state.quizAccuracy + action.payload.accuracy) / 2),
        recentActivity: [
          { type: "quiz", title: action.payload.title, date: "Vừa xong", xp: action.payload.xp },
          ...state.recentActivity.slice(0, 4),
        ],
      };
    case "PLAY_GAME": {
      const updates: Partial<UserState> = {
        xp: state.xp + action.payload.xp,
        totalGamesPlayed: state.totalGamesPlayed + 1,
        recentActivity: [
          { type: "game", title: action.payload.title, date: "Vừa xong", xp: action.payload.xp },
          ...state.recentActivity.slice(0, 4),
        ],
      };
      if (action.payload.game === "speed-formula" && action.payload.score > state.bestSpeedFormulaScore) {
        updates.bestSpeedFormulaScore = action.payload.score;
      }
      if (action.payload.game === "algebra-balance" && action.payload.score > state.bestBalanceScore) {
        updates.bestBalanceScore = action.payload.score;
      }
      return { ...state, ...updates };
    }
    case "UNLOCK_BADGE":
      return {
        ...state,
        badges: state.badges.map((b) =>
          b.id === action.payload ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b
        ),
      };
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };
    case "INCREMENT_STREAK":
      return { ...state, streak: state.streak + 1 };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

import { syncUserProgressToSupabase } from "./supabase";

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    syncUserProgressToSupabase({
      xp: state.xp,
      streak: state.streak,
      completedLessons: state.completedLessons,
      totalQuizzesCompleted: state.totalQuizzesCompleted,
      totalGamesPlayed: state.totalGamesPlayed,
    });
  }, [state.xp, state.streak, state.completedLessons, state.totalQuizzesCompleted, state.totalGamesPlayed]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppState(): UserState & { dispatch: React.Dispatch<Action> } {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return { ...context.state, dispatch: context.dispatch };
}
