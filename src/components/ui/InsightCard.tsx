import type { InsightItem } from '@/types';
import { BookOpen, Link2, AlertTriangle, BadgeCheck, ChevronRight, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  link: Link2,
  alert: AlertTriangle,
  badge: BadgeCheck,
};

const statusColors: Record<string, { bg: string; text: string; ring: string; actionBg: string; actionText: string }> = {
  success: { bg: 'bg-green-50', text: 'text-green-600', ring: 'group-hover:border-green-300', actionBg: 'bg-green-600', actionText: 'text-white' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'group-hover:border-amber-300', actionBg: 'bg-amber-500', actionText: 'text-white' },
  danger: { bg: 'bg-red-50', text: 'text-red-600', ring: 'group-hover:border-red-300', actionBg: 'bg-red-500', actionText: 'text-white' },
  info: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'group-hover:border-blue-300', actionBg: 'bg-blue-600', actionText: 'text-white' },
};

interface InsightCardProps {
  insight: InsightItem;
  onClick?: () => void;
}

export default function InsightCard({ insight, onClick }: InsightCardProps) {
  const Icon = iconMap[insight.icon] ?? BookOpen;
  const colors = statusColors[insight.status];
  const actionLabel = insight.status === 'warning' || insight.status === 'danger' ? 'Review' : 'View';

  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left transition-all duration-300 hover:shadow-card-hover ${colors.ring}`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text} transition-transform group-hover:scale-110`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-navy-900">{insight.title}</p>
        <p className="text-xs text-slate-500">{insight.description}</p>
      </div>
      <span className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100 ${colors.actionBg} ${colors.actionText}`}>
        {actionLabel}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500" />
    </button>
  );
}
