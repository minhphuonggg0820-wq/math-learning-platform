"use client";

import { useState } from 'react';
import { MathBlock, MathInline } from '@/components/math/katex-renderer';
import { BookmarkIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Formula } from '@/lib/mock-data';

interface FormulaCardProps {
  formula: Formula;
  className?: string;
}

export function FormulaCard({ formula, className }: FormulaCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula.latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "group relative flex flex-col p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300",
      "hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700/50",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:from-indigo-500/5" />
      
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white break-words">{formula.name}</h4>
          <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 break-words">{formula.description}</p>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/50"
            title="Copy LaTeX"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-800/50"
          >
            <BookmarkIcon className={cn("w-4 h-4", isBookmarked && "fill-amber-400 text-amber-400 border-amber-400")} />
          </button>
        </div>
      </div>

      <div className="relative z-10 my-4 py-5 px-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl items-center text-center w-full min-w-0 overflow-x-auto border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
        <MathBlock math={formula.latex} className="text-xl font-bold" />
      </div>

      {formula.example && (
        <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">Ví dụ minh họa</span>
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 overflow-x-auto min-w-0 bg-slate-50/50 dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/30">
            <MathInline math={formula.example} />
          </div>
        </div>
      )}
    </div>
  );
}
