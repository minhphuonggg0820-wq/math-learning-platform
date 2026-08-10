"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';
import { ChevronRight, ArrowLeft, ArrowRight, PlayCircle, BookOpen, Sparkles } from 'lucide-react';
import { FormulaCard } from '@/components/learn/formula-card';
import { InteractiveSandbox } from '@/components/learn/interactive-sandbox';
import { useAppState } from '@/lib/store';
import { motion } from 'framer-motion';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useAppState();
  
  const topicId = params.topicId as string;
  const lessonId = params.lessonId as string;
  
  const topic = topics.find(t => t.id === topicId);
  const lessonIndex = topic?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const lesson = topic?.lessons[lessonIndex];

  if (!topic || !lesson) {
    return <div className="p-8 text-center text-xl">Không tìm thấy bài học.</div>;
  }

  const prevLesson = lessonIndex > 0 ? topic.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < topic.lessons.length - 1 ? topic.lessons[lessonIndex + 1] : null;

  const handleComplete = () => {
    dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId, title: lesson.title, xp: lesson.xpReward } });
    if (nextLesson) {
      router.push(`/learn/${topicId}/${nextLesson.id}`);
    } else {
      router.push(`/learn/${topicId}`);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-wider overflow-x-auto whitespace-nowrap bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 rounded-full w-fit">
        <Link href="/learn" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> Học lý thuyết
        </Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
        <Link href={`/learn/${topicId}`} className="hover:text-indigo-600 transition-colors">{topic.title}</Link>
        <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
        <span className="text-slate-800 dark:text-white truncate">{lesson.title}</span>
      </nav>

      {/* Lesson Header Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-xs font-semibold text-indigo-600 dark:text-indigo-400 border border-indigo-200/50">
          <Sparkles className="w-3.5 h-3.5" /> Bài học hiện tại
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight break-words">{lesson.title}</h1>
        <p className="text-sm sm:text-base font-medium text-slate-650 dark:text-slate-350 leading-relaxed">{lesson.description}</p>
        
        <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold border border-slate-200/50 dark:border-slate-700/50">Thời lượng: {lesson.duration} phút</span>
          <span className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold border border-amber-200/60 dark:border-amber-800/50">Phần thưởng: +{lesson.xpReward} XP</span>
        </div>
      </motion.div>

      {/* Focus Formulas Section */}
      {lesson.formulas && lesson.formulas.length > 0 && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4 pt-4"
        >
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-2 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-200/50"><PlayCircle size={20} /></span>
            Công thức trọng tâm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lesson.formulas.map(formula => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </motion.section>
      )}

      {/* Sandbox Section */}
      {lesson.sandboxConfig && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-4 pt-6"
        >
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-200/50"><PlayCircle size={20} /></span>
            Sandbox Tương tác
          </h2>
          <InteractiveSandbox config={lesson.sandboxConfig} />
        </motion.section>
      )}

      {/* Footer Navigation Actions */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevLesson ? (
            <Link href={`/learn/${topicId}/${prevLesson.id}`} className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 transition-all flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Bài trước
            </Link>
          ) : <div />}
          
          <button 
            onClick={handleComplete}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/20 transition-all active:scale-95"
          >
            Hoàn thành bài học (+{lesson.xpReward} XP)
          </button>
          
          {nextLesson ? (
            <Link href={`/learn/${topicId}/${nextLesson.id}`} className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 transition-all flex items-center justify-center gap-2">
              Bài tiếp theo <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
