import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}k`;
  return xp.toString();
}

export function getLevelFromXP(xp: number): { level: number; currentXP: number; requiredXP: number } {
  const baseXP = 100;
  const multiplier = 1.5;
  let level = 1;
  let totalRequired = baseXP;

  while (xp >= totalRequired) {
    level++;
    totalRequired += Math.floor(baseXP * Math.pow(multiplier, level - 1));
  }

  const prevRequired = totalRequired - Math.floor(baseXP * Math.pow(multiplier, level - 1));
  return {
    level,
    currentXP: xp - prevRequired,
    requiredXP: totalRequired - prevRequired,
  };
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return "🏆";
  if (streak >= 14) return "🔥";
  if (streak >= 7) return "⚡";
  if (streak >= 3) return "✨";
  return "💫";
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
