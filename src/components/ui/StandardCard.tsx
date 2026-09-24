import type { Standard } from '@/types';
import StatusBadge from './StatusBadge';
import { FileText, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

interface StandardCardProps {
  standard: Standard;
  onViewDetails?: () => void;
  onViewReferences?: () => void;
  compact?: boolean;
}

export default function StandardCard({ standard, onViewDetails, onViewReferences, compact }: StandardCardProps) {
  const statusType = (s: string) => {
    switch (s) {
      case 'CURRENT': return 'success' as const;
      case 'SUPERSEDED': return 'danger' as const;
      case 'AMENDMENT_AVAILABLE': return 'warning' as const;
      case 'REVIEW_REQUIRED': return 'warning' as const;
      default: return 'neutral' as const;
    }
  };

  const matchColor = standard.relevance && standard.relevance >= 90 ? 'text-green-600' : standard.relevance && standard.relevance >= 75 ? 'text-blue-600' : 'text-amber-600';
  const barColor = standard.relevance && standard.relevance >= 90 ? 'bg-green-500' : standard.relevance && standard.relevance >= 75 ? 'bg-blue-500' : 'bg-amber-500';

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-100">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-semibold text-navy-900">{standard.isNumber}</h4>
            <p className="text-sm text-slate-600">{standard.title}</p>
          </div>
        </div>
        <StatusBadge status={statusType(standard.status)} size="sm">
          {standard.status.replace(/_/g, ' ')}
        </StatusBadge>
      </div>

      {standard.relevance !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">AI Match Confidence</span>
            <span className={`text-sm font-bold ${matchColor}`}>{standard.relevance}%</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-700 ${barColor}`}
              style={{ width: `${standard.relevance}%` }}
            />
          </div>
        </div>
      )}

      {!compact && (
        <>
          <p className="mt-3 text-sm text-slate-600">{standard.scope}</p>

          {standard.matchReasons && standard.matchReasons.length > 0 && (
            <div className="mt-3 rounded-lg bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Why recommended?</p>
              <ul className="mt-2 space-y-1">
                {standard.matchReasons.map((reason, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={onViewDetails}
              className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800"
            >
              View Standard <ExternalLink className="h-3.5 w-3.5" />
            </button>
            {onViewReferences && (
              <button
                onClick={onViewReferences}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                View References <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
