"use client";

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Component, ReactNode, ErrorInfo } from 'react';
import { cn } from '@/lib/utils';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class MathErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Math rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

export function MathInline({ math, className }: { math: string; className?: string }) {
  return (
    <MathErrorBoundary fallback={() => <span className={cn("text-red-500 font-mono text-sm", className)}>{math}</span>}>
      <span className={cn("dark:text-slate-200", className)}>
        <InlineMath math={math} />
      </span>
    </MathErrorBoundary>
  );
}

export function MathBlock({ math, className }: { math: string; className?: string }) {
  return (
    <MathErrorBoundary fallback={() => <div className={cn("text-red-500 p-4 bg-red-50 dark:bg-red-950/20 rounded-md font-mono text-sm", className)}>{math}</div>}>
      <div className={cn("overflow-x-auto py-2 text-center dark:text-slate-200", className)}>
        <BlockMath math={math} />
      </div>
    </MathErrorBoundary>
  );
}

export function KatexRenderer({ math, inline, block, className }: { math: string; inline?: boolean; block?: boolean; className?: string }) {
  if (inline && !block) {
    return <MathInline math={math} className={className} />;
  }
  return <MathBlock math={math} className={className} />;
}

export default KatexRenderer;
