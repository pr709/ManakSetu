interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'amber' | 'red';
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export default function ProgressBar({ value, max = 100, color = 'blue', size = 'md', showLabel = false }: ProgressBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
  };
  const h = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs font-medium text-slate-600">
          <span>{value} / {max}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-slate-200 ${h}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
