import {
  CheckCircle2,
  AlertTriangle,
  FlaskConical,
  Replace,
  Shield,
  BadgeCheck,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import ProgressCircle from '@/components/ui/ProgressCircle';
import { mockChecklist, mockSuggestedImprovements } from '@/data/mockData';
import type { LucideIcon } from 'lucide-react';

const improvementIcons: Record<string, LucideIcon> = {
  flask: FlaskConical,
  replace: Replace,
  shield: Shield,
  badge: BadgeCheck,
};

export default function TenderAssistant() {
  const completedCount = mockChecklist.filter((c) => c.done).length;
  const totalCount = mockChecklist.length;
  const complianceScore = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Tender Assistant</h1>
        <p className="mt-1 text-sm text-slate-500">Ensure your tender specification is complete with all required standards, references, and certifications.</p>
      </div>

      {/* Tender Readiness with progress circle */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-navy-900">Tender Readiness</h2>
            <p className="text-sm text-slate-500">Product: Industrial Safety Helmet</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Progress circle */}
          <div className="flex shrink-0 flex-col items-center gap-2">
            <ProgressCircle
              value={completedCount}
              max={totalCount}
              size={130}
              strokeWidth={10}
              color={complianceScore >= 80 ? '#16a34a' : complianceScore >= 60 ? '#d97706' : '#dc2626'}
              label="Ready"
              sublabel={`${completedCount}/${totalCount} checks`}
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-navy-900">Compliance Score</p>
              <p className="text-xs text-slate-500">{complianceScore >= 80 ? 'Nearly ready' : complianceScore >= 60 ? 'Needs attention' : 'Not ready'}</p>
            </div>
          </div>

          {/* Checklist */}
          <div className="flex-1">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">Progress: {completedCount} / {totalCount} checks complete</span>
                <span className="text-sm font-semibold text-blue-600">{complianceScore}%</span>
              </div>
              <ProgressBar value={completedCount} max={totalCount} color={complianceScore >= 80 ? 'green' : 'amber'} />
            </div>
            <div className="space-y-2">
              {mockChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-sm ${
                    item.done ? 'border-green-200 bg-green-50/30' : 'border-amber-200 bg-amber-50/30'
                  }`}
                >
                  {item.done ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                  )}
                  <span className={`text-sm font-medium ${item.done ? 'text-slate-700' : 'text-amber-700'}`}>
                    {item.label}
                  </span>
                  <span className={`ml-auto text-xs font-medium ${item.done ? 'text-green-600' : 'text-amber-600'}`}>
                    {item.done ? 'Complete' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Improvements */}
      <div className="mt-6">
        <h2 className="text-base font-semibold text-navy-900 mb-3">Suggested Improvements</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockSuggestedImprovements.map((imp) => {
            const Icon = improvementIcons[imp.icon] || CheckCircle2;
            return (
              <div
                key={imp.id}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-slate-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-navy-900">{imp.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{imp.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Action */}
      <div className="mt-6 flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
          Generate Tender Report <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
