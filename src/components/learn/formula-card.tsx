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
      "group relative flex flex-col p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-all duration-300",
      "hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:border-blue-200 dark:hover:border-blue-900/50",
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity dark:from-blue-900/10" />
      
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white break-words">{formula.name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 break-words">{formula.description}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            title="Copy LaTeX"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-emerald-500" /> : <CopyIcon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <BookmarkIcon className={cn("w-4 h-4", isBookmarked && "fill-amber-500 text-amber-500")} />
          </button>
        </div>
      </div>

      <div className="relative z-10 my-4 py-6 px-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg items-center text-center w-full min-w-0 overflow-x-auto border border-slate-100 dark:border-slate-800/50">
        <MathBlock math={formula.latex} className="text-xl" />
      </div>

      {formula.example && (
        <div className="relative z-10 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">Ví dụ</span>
          <div className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto min-w-0">
            <MathInline math={formula.example} />
          </div>
        </div>
      )}
    </div>
  );
}
