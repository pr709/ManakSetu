import type { ComplianceItem } from '@/types';
import StatusBadge from './StatusBadge';
import { ArrowRight, CheckCircle2, AlertCircle, XCircle, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const statusConfig: Record<string, { type: 'success' | 'warning' | 'danger' | 'neutral'; icon: LucideIcon }> = {
  'Applicable': { type: 'success', icon: CheckCircle2 },
  'Complete': { type: 'success', icon: CheckCircle2 },
  'Review Required': { type: 'warning', icon: AlertCircle },
  'Missing': { type: 'danger', icon: XCircle },
};

interface CertificationCardProps {
  item: ComplianceItem;
  onViewRequirement?: () => void;
}

export default function CertificationCard({ item, onViewRequirement }: CertificationCardProps) {
  const config = statusConfig[item.applicability] ?? { type: 'neutral' as const, icon: HelpCircle };
  const Icon = config.icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            config.type === 'success' ? 'bg-green-50 text-green-600' :
            config.type === 'warning' ? 'bg-amber-50 text-amber-600' :
            config.type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'
          }`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-navy-900">{item.name}</h4>
            <p className="mt-0.5 text-sm text-slate-500">Related: {item.relatedStandard}</p>
          </div>
        </div>
        <StatusBadge status={config.type} size="sm">{item.applicability}</StatusBadge>
      </div>
      <p className="mt-3 text-sm text-slate-600">{item.explanation}</p>
      <button
        onClick={onViewRequirement}
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View Requirement <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
