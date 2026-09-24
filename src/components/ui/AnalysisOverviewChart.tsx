import { TrendingUp } from 'lucide-react';

export default function AnalysisOverviewChart() {
  const data = [
    { label: 'Relevant Standards', value: 42, color: 'bg-blue-500' },
    { label: 'Related Standards', value: 28, color: 'bg-navy-400' },
    { label: 'Amendments', value: 15, color: 'bg-amber-500' },
    { label: 'Outdated References', value: 8, color: 'bg-red-500' },
  ];
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="font-semibold text-navy-900">{item.value}</span>
            </div>
            <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
        <TrendingUp className="h-4 w-4 text-blue-600" />
        <p className="text-xs text-blue-700">Analysis activity up 12% from last week across all categories</p>
      </div>
    </div>
  );
}
