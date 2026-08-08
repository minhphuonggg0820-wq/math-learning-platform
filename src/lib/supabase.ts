import { createClient } from "@supabase/supabase-js";

// Hardcoded Supabase credentials as requested
export const SUPABASE_URL = "https://vkglbowpjrbwyfplzxif.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZ2xib3dwanJid3lmcGx6eGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzM5NzYsImV4cCI6MjEwMTc0OTk3Nn0.TuPv7Q_8U49vwaCD6K9avfYJQWusZcmNsIigMr0yU5M";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to sync user progress to Supabase
export async function syncUserProgressToSupabase(userState: {
  xp: number;
  streak: number;
  completedLessons: string[];
  totalQuizzesCompleted: number;
  totalGamesPlayed: number;
}) {
  try {
    const { data, error } = await supabase
      .from("user_progress")
      .upsert({
        id: "default_user",
        xp: userState.xp,
        streak: userState.streak,
        completed_lessons: userState.completedLessons,
        quizzes_completed: userState.totalQuizzesCompleted,
        games_played: userState.totalGamesPlayed,
        updated_at: new Date().toISOString(),
      });
    if (error) {
      console.warn("Supabase sync warning (table may need schema creation):", error.message);
    }
    return { data, error };
  } catch (err) {
    console.warn("Supabase connection error:", err);
    return { data: null, error: err };
  }
}
