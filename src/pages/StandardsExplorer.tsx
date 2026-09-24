import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, ChevronRight, Filter } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { mockStandards } from '@/data/mockStandards';

const industries = ['All', 'Construction', 'Manufacturing', 'Electrical'];
const categories = ['All', 'Safety Equipment', 'Structural Steel', 'Cement', 'Electrical Cables', 'Structural Design', 'Building Materials', 'Steel Products'];
const standardTypes = ['All', 'Product Standard', 'Design Code', 'Dimensional Standard'];
const statuses = ['All', 'CURRENT', 'AMENDMENT_AVAILABLE', 'SUPERSEDED'];
const years = ['All', '2024', '2023', '2022', '2021', '2019', '2018', '2016', '2015', '2013', '1987', '1984'];

export default function StandardsExplorer() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All',
    category: 'All',
    standardType: 'All',
    status: 'All',
    year: 'All',
  });

  const filtered = useMemo(() => {
    return mockStandards.filter((s) => {
      const matchSearch =
        !search ||
        s.isNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase()) ||
        s.industry.toLowerCase().includes(search.toLowerCase());
      const matchIndustry = filters.industry === 'All' || s.industry === filters.industry;
      const matchCategory = filters.category === 'All' || s.category === filters.category;
      const matchType = filters.standardType === 'All' || s.standardType === filters.standardType;
      const matchStatus = filters.status === 'All' || s.status === filters.status;
      const matchYear = filters.year === 'All' || s.year === filters.year;
      return matchSearch && matchIndustry && matchCategory && matchType && matchStatus && matchYear;
    });
  }, [search, filters]);

  const hasFilters = search || Object.values(filters).some((v) => v !== 'All');

  const clearFilters = () => {
    setSearch('');
    setFilters({ industry: 'All', category: 'All', standardType: 'All', status: 'All', year: 'All' });
  };

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
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Standards Explorer</h1>
        <p className="mt-1 text-sm text-slate-500">Search and browse the complete database of Indian Standards.</p>
      </div>

      {/* Search */}
      <div className="mt-5 relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by IS number, title, product or industry..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Filters */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Filter className="h-4 w-4" /> Filters:
        </div>
        {([
          { key: 'industry', label: 'Industry', options: industries },
          { key: 'category', label: 'Category', options: categories },
          { key: 'standardType', label: 'Type', options: standardTypes },
          { key: 'status', label: 'Status', options: statuses },
          { key: 'year', label: 'Year', options: years },
        ] as const).map((f) => (
          <select
            key={f.key}
            value={filters[f.key]}
            onChange={(e) => setFilters((prev) => ({ ...prev, [f.key]: e.target.value }))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 focus:border-blue-400 focus:outline-none"
          >
            {f.options.map((o) => (
              <option key={o} value={o}>{o === 'All' ? `${f.label}: All` : o.replace(/_/g, ' ')}</option>
            ))}
          </select>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200"
          >
            <X className="h-3.5 w-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="mt-4 text-sm text-slate-500">{filtered.length} standards found</p>

      {/* Table */}
      <div className="mt-3 rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-7 w-7" />}
            title="No standards found"
            description="Try adjusting your search or filters."
            action={<button onClick={clearFilters} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">Clear Filters</button>}
          />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-medium">IS Number</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Latest Version</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-navy-900">{s.isNumber}</td>
                    <td className="px-4 py-3 text-slate-600">{s.title}</td>
                    <td className="px-4 py-3 text-slate-500">{s.category}</td>
                    <td className="px-4 py-3 text-slate-500">{s.year}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={statusType(s.status)} size="sm">
                        {s.status.replace(/_/g, ' ')}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => navigate(`/standards/${s.id}`)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        View <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
