"use client";

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { topics } from '@/lib/mock-data';
import { ChevronRight, ArrowLeft, ArrowRight, PlayCircle } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 whitespace-nowrap overflow-x-auto pb-2">
        <Link href="/learn" className="hover:text-blue-600 transition-colors">Học lý thuyết</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <Link href={`/learn/${topicId}`} className="hover:text-blue-600 transition-colors">{topic.title}</Link>
        <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
        <span className="text-slate-900 dark:text-white truncate">{lesson.title}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 break-words">{lesson.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">{lesson.description}</p>
        <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium">Thời lượng: {lesson.duration} phút</span>
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">Phần thưởng: {lesson.xpReward} XP</span>
        </div>
      </motion.div>

      {lesson.formulas && lesson.formulas.length > 0 && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><FunctionSquare size={24} /></span>
            Công thức trọng tâm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lesson.formulas.map(formula => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </motion.section>
      )}

      {lesson.sandboxConfig && (
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg"><PlayCircle size={24} /></span>
            Sandbox Tương tác
          </h2>
          <InteractiveSandbox config={lesson.sandboxConfig} />
        </motion.section>
      )}

      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevLesson ? (
            <Link href={`/learn/${topicId}/${prevLesson.id}`} className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Bài trước
            </Link>
          ) : <div />}
          
          <button 
            onClick={handleComplete}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-lg shadow-blue-600/20"
          >
            Hoàn thành bài học (+{lesson.xpReward} XP)
          </button>
          
          {nextLesson ? (
            <Link href={`/learn/${topicId}/${nextLesson.id}`} className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              Bài tiếp theo <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

// Dummy FunctionSquare for missing import in original request
const FunctionSquare = ({ size }: { size: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"/><path d="M9 11.2h5.7"/></svg>;
