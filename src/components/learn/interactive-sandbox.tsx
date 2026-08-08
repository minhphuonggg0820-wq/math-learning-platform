"use client";

import { useEffect, useRef, useState } from 'react';
import { SandboxConfig } from '@/lib/mock-data';
import { MathBlock, MathInline } from '@/components/math/katex-renderer';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface InteractiveSandboxProps {
  config: SandboxConfig;
  className?: string;
}

export function InteractiveSandbox({ config, className }: InteractiveSandboxProps) {
  const { theme, systemTheme } = useTheme();
  const [params, setParams] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    config.parameters.forEach(p => {
      initial[p.name] = p.defaultValue;
    });
    return initial;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  const handleParamChange = (name: string, value: number) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = Math.min(400, container.clientWidth * 0.75); // aspect ratio
      draw();
    };

    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, scale: number, offsetX: number, offsetY: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = isDark ? '#334155' : '#e2e8f0';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = offsetX % scale; x < width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = offsetY % scale; y < height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = isDark ? '#94a3b8' : '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, offsetY);
      ctx.lineTo(width, offsetY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(offsetX, 0);
      ctx.lineTo(offsetX, height);
      ctx.stroke();
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const scale = 40; // pixels per unit
      const offsetX = width / 2;
      const offsetY = height / 2;

      drawGrid(ctx, width, height, scale, offsetX, offsetY);

      if (config.type === 'parabola') {
        const { a, b, c } = params;
        
        ctx.beginPath();
        ctx.strokeStyle = a >= 0 ? (isDark ? '#60a5fa' : '#3b82f6') : (isDark ? '#f87171' : '#ef4444');
        ctx.lineWidth = 2;

        for (let px = 0; px < width; px++) {
          const x = (px - offsetX) / scale;
          const y = a * x * x + b * x + c;
          const py = offsetY - y * scale;
          
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Vertex
        const vx = -b / (2 * a);
        const vy = a * vx * vx + b * vx + c;
        const pvx = offsetX + vx * scale;
        const pvy = offsetY - vy * scale;

        ctx.beginPath();
        ctx.arc(pvx, pvy, 4, 0, 2 * Math.PI);
        ctx.fillStyle = isDark ? '#fbbf24' : '#f59e0b';
        ctx.fill();

      } else if (config.type === 'circle') {
         const { r } = params;
         const pr = r * scale;

         ctx.beginPath();
         ctx.arc(offsetX, offsetY, pr, 0, 2 * Math.PI);
         ctx.strokeStyle = isDark ? '#34d399' : '#10b981';
         ctx.fillStyle = isDark ? 'rgba(52, 211, 153, 0.2)' : 'rgba(16, 185, 129, 0.2)';
         ctx.lineWidth = 2;
         ctx.fill();
         ctx.stroke();
      } else if (config.type === 'trigonometry') {
         const angle = (params.angle || 0) * Math.PI / 180;
         const pr = 3 * scale; // fixed radius for unit circle visualization

         ctx.beginPath();
         ctx.arc(offsetX, offsetY, pr, 0, 2 * Math.PI);
         ctx.strokeStyle = isDark ? '#94a3b8' : '#64748b';
         ctx.lineWidth = 1;
         ctx.stroke();

         const px = offsetX + pr * Math.cos(angle);
         const py = offsetY - pr * Math.sin(angle);

         // Radius line
         ctx.beginPath();
         ctx.moveTo(offsetX, offsetY);
         ctx.lineTo(px, py);
         ctx.strokeStyle = isDark ? '#cbd5e1' : '#475569';
         ctx.lineWidth = 2;
         ctx.stroke();

         // Sin line
         ctx.beginPath();
         ctx.moveTo(px, offsetY);
         ctx.lineTo(px, py);
         ctx.strokeStyle = isDark ? '#60a5fa' : '#3b82f6';
         ctx.stroke();

         // Cos line
         ctx.beginPath();
         ctx.moveTo(offsetX, offsetY);
         ctx.lineTo(px, offsetY);
         ctx.strokeStyle = isDark ? '#34d399' : '#10b981';
         ctx.stroke();

         // Angle arc
         ctx.beginPath();
         ctx.arc(offsetX, offsetY, 30, 0, -angle, angle > 0);
         ctx.strokeStyle = isDark ? '#fbbf24' : '#f59e0b';
         ctx.stroke();
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [params, config.type, isDark]);

  // Generate dynamic formula string
  let dynamicFormula = config.formulaLatex;
  if (config.type === 'parabola') {
      const { a, b, c } = params;
      dynamicFormula = `y = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;
  } else if (config.type === 'circle') {
      dynamicFormula = `A = \\pi(${params.r})^2 = ${(Math.PI * params.r * params.r).toFixed(2)}`;
  } else if (config.type === 'trigonometry') {
      dynamicFormula = `\\sin(${params.angle}^\\circ) = ${Math.sin(params.angle * Math.PI / 180).toFixed(2)}, \\cos(${params.angle}^\\circ) = ${Math.cos(params.angle * Math.PI / 180).toFixed(2)}`;
  }

  return (
    <div className={cn("flex flex-col-reverse lg:flex-row gap-6 p-5 sm:p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm", className)}>
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Điều chỉnh tham số</h3>
          <div className="space-y-4">
            {config.parameters.map(param => (
              <div key={param.name} className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <label className="text-slate-800 dark:text-slate-200 min-w-0 truncate mr-2">
                    {param.label || param.name}: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{params[param.name]}</span>
                  </label>
                  <span className="text-xs text-slate-400 font-normal shrink-0">[{param.min}, {param.max}]</span>
                </div>
                <input
                  type="range"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={params[param.name]}
                  onChange={e => handleParamChange(param.name, parseFloat(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-indigo-600 touch-pan-x"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/50 overflow-x-auto min-w-0">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-1">Công thức tức thời</p>
          <MathBlock math={dynamicFormula} />
        </div>

        {config.type === 'parabola' && (
          <div className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Thông số biệt thức</p>
            <div className="overflow-x-auto min-w-0"><MathInline math={`\\Delta = b^2 - 4ac = ${Math.pow(params.b, 2) - 4 * params.a * params.c}`} /></div>
          </div>
        )}
      </div>

      <div 
        ref={containerRef}
        className="w-full lg:w-2/3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden min-h-[280px] sm:min-h-[360px] flex items-center justify-center relative shadow-inner"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
