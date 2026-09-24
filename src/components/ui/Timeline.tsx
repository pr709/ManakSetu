interface TimelineProps {
  items: { year: string; label: string }[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-200" />
      {items.map((item, i) => (
        <div key={i} className="relative mb-6 last:mb-0">
          <div className={`absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 ${i === items.length - 1 ? 'border-blue-500 bg-blue-500' : 'border-slate-300 bg-white'}`} />
          <p className="text-sm font-semibold text-navy-900">{item.year}</p>
          <p className="text-sm text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
