import type { ReactNode } from 'react';

type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  children: ReactNode;
  size?: 'sm' | 'md';
}

const statusConfig: Record<StatusType, { bg: string; text: string; dot: string }> = {
  success: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  danger: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  info: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  neutral: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
};

export default function StatusBadge({ status, children, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${sizeClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {children}
    </span>
  );
}
