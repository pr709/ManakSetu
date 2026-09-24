import type { LucideIcon } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';
import MiniSparkline from './MiniSparkline';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  supportText: string;
  trend?: { value: string; positive: boolean };
  sparkData?: number[];
  sparkColor?: string;
}

export default function StatCard({ icon: Icon, label, value, supportText, trend, sparkData, sparkColor }: StatCardProps) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-600 transition-colors group-hover:bg-navy-100">
          <Icon className="h-5 w-5" />
        </div>
        <button className="rounded-md p-1 text-slate-300 opacity-0 transition-opacity hover:bg-slate-50 hover:text-slate-600 group-hover:opacity-100">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-0.5 text-2xl font-semibold text-navy-900">{value}</p>
        </div>
        {sparkData && (
          <div className="shrink-0 pb-1">
            <MiniSparkline data={sparkData} color={sparkColor} />
          </div>
        )}
      </div>
      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-xs text-slate-400">{supportText}</p>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-amber-600'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
