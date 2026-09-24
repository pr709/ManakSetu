import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, ChevronRight, ArrowDown, GitBranch } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { mockStandards, getRelatedStandards } from '@/data/mockStandards';
import type { Standard, RelationshipType } from '@/types';

const relationshipTypes: ('All' | RelationshipType)[] = [
  'All',
  'Normative Reference',
  'Test Method',
  'Terminology Standard',
  'Safety Standard',
  'Installation Standard',
  'Related Product Standard',
];

const relationshipMap: Record<string, RelationshipType[]> = {
  'IS 2062:2024': ['Normative Reference', 'Related Product Standard', 'Test Method'],
  'IS 800:2023': ['Normative Reference', 'Related Product Standard'],
  'IS 808:2021': ['Related Product Standard'],
  'IS 875:1987': ['Normative Reference'],
};

export default function RelatedStandards() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterRel, setFilterRel] = useState<'All' | RelationshipType>('All');
  const [selectedId, setSelectedId] = useState<string>('is-2062');

  const selected = mockStandards.find((s) => s.id === selectedId) || mockStandards[1];
  const related = getRelatedStandards(selected);

  const filtered = useMemo(() => {
    return related.filter((s) => {
      const matchSearch = !search || s.isNumber.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase());
      const matchRel = filterRel === 'All';
      return matchSearch && matchRel;
    });
  }, [search, filterRel, related]);

  const statusType = (s: string) => {
    switch (s) {
      case 'CURRENT': return 'success' as const;
      case 'SUPERSEDED': return 'danger' as const;
      case 'AMENDMENT_AVAILABLE': return 'warning' as const;
      case 'REVIEW_REQUIRED': return 'warning' as const;
      default: return 'neutral' as const;
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Related Standards</h1>
        <p className="mt-1 text-sm text-slate-500">Explore relationships between Indian Standards — normative references, test methods, and more.</p>
      </div>

      {/* Primary standard selector */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-card">
        <label className="text-sm font-medium text-slate-700 mb-2 block">Select Primary Standard</label>
        <div className="flex flex-wrap gap-2">
          {mockStandards.filter((s) => s.relatedStandards.length > 0).map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                s.id === selectedId
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s.isNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Relationship graph */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-navy-900">Relationship Graph — {selected.isNumber}</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-xl bg-blue-600 px-6 py-3 text-center text-white shadow-sm">
            <p className="text-[10px] uppercase tracking-wide opacity-80">Primary Standard</p>
            <p className="text-sm font-semibold">{selected.isNumber}</p>
            <p className="text-xs opacity-90">{selected.title}</p>
          </div>
          {filtered.map((rel, i) => (
            <div key={rel.id} className="flex flex-col items-center">
              <ArrowDown className="my-1 h-5 w-5 text-slate-300" />
              <button
                onClick={() => navigate(`/standards/${rel.id}`)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-center shadow-sm hover:border-blue-300 hover:bg-blue-50/30"
              >
                <p className="text-sm font-semibold text-navy-900">{rel.isNumber}</p>
                <p className="text-xs text-slate-500">{rel.title}</p>
                <span className="mt-1 inline-block rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                  {(relationshipMap[selected.isNumber]?.[i] || 'Related Standard')}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Search and filter */}
      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search related standards..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
        <select
          value={filterRel}
          onChange={(e) => setFilterRel(e.target.value as 'All' | RelationshipType)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 focus:border-blue-400 focus:outline-none"
        >
          {relationshipTypes.map((t) => (
            <option key={t} value={t}>{t === 'All' ? 'All Relationships' : t}</option>
          ))}
        </select>
      </div>

      {/* Related standards cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((rel, i) => (
          <div
            key={rel.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover cursor-pointer"
            onClick={() => navigate(`/standards/${rel.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-900">{rel.isNumber}</p>
                  <p className="text-xs text-slate-500">{rel.title}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                {relationshipMap[selected.isNumber]?.[i] || 'Related Standard'}
              </span>
              <StatusBadge status={statusType(rel.status)} size="sm">
                {rel.status.replace(/_/g, ' ')}
              </StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
