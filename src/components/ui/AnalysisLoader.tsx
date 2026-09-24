import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Brain, Cpu, Search, Link2, GitBranch, BadgeCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const steps: { label: string; icon: LucideIcon }[] = [
  { label: 'Understanding', icon: Brain },
  { label: 'Classification', icon: Cpu },
  { label: 'Standard Matching', icon: Search },
  { label: 'Allied Standards', icon: Link2 },
  { label: 'Version Check', icon: GitBranch },
  { label: 'Certification', icon: BadgeCheck },
];

interface AnalysisLoaderProps {
  onComplete: () => void;
}

export default function AnalysisLoader({ onComplete }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep >= steps.length) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 700);
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const progress = Math.min(100, (currentStep / steps.length) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-card">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Sparkles className="h-6 w-6" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-purple-500" />
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-navy-900">AI Analysis in Progress</h3>
            <p className="text-sm text-slate-500">Analyzing your specification against the Indian Standards database</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-slate-500">Processing</span>
            <span className="text-xs font-semibold text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            const pending = i > currentStep;
            return (
              <div
                key={i}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-400 ${
                  done
                    ? 'border-green-200 bg-green-50/40'
                    : active
                    ? 'border-blue-300 bg-blue-50/50 scale-105 shadow-sm'
                    : 'border-slate-200 bg-slate-50/30 opacity-50'
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : active ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  ) : (
                    <step.icon className="h-5 w-5 text-slate-400" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    done ? 'text-green-700' : active ? 'text-blue-700' : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current step label */}
        {currentStep < steps.length && (
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" />
            <span className="animate-pulse-subtle">{steps[currentStep].label}...</span>
          </div>
        )}
        {currentStep >= steps.length && (
          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Analysis complete — preparing results</span>
          </div>
        )}
      </div>
    </div>
  );
}
