import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Download, Trash2, FileText, Search, Sparkles } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/ToastContext';
import { mockAnalyses } from '@/data/mockData';
import type { AnalysisRecord, AnalysisStatus } from '@/types';

const statusMap: Record<AnalysisStatus, { type: 'success' | 'warning' | 'info'; label: string }> = {
  'Completed': { type: 'success', label: 'Completed' },
  'In Progress': { type: 'info', label: 'In Progress' },
  'Needs Review': { type: 'warning', label: 'Needs Review' },
};

export default function History() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [records, setRecords] = useState<AnalysisRecord[]>(mockAnalyses);
  const [search, setSearch] = useState('');

  const filtered = records.filter(
    (r) => !search || r.specification.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Analysis record deleted', 'info');
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Analysis History</h1>
        <p className="mt-1 text-sm text-slate-500">View, download, or delete past specification analyses.</p>
      </div>

      {/* Search */}
      <div className="mt-5 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search analyses..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-8 w-8" />}
            title={records.length === 0 ? "No analyses yet" : "No matching results"}
            description={records.length === 0 ? "Run your first specification analysis to start building your history." : "Try a different search term."}
            action={
              records.length === 0 ? (
                <button
                  onClick={() => navigate('/analyze')}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <Sparkles className="h-4 w-4" /> Analyze Specification
                </button>
              ) : (
                <button
                  onClick={() => setSearch('')}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                >
                  Clear Search
                </button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs text-slate-500">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Standards Found</th>
                  <th className="px-4 py-3 font-medium">Alerts</th>
                  <th className="px-4 py-3 font-medium">Certification</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const st = statusMap[r.status];
                  return (
                    <tr key={r.id} className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50">
                      <td className="px-4 py-3 text-slate-500 text-xs">{r.date}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-navy-900">{r.product}</p>
                        <p className="text-xs text-slate-400">{r.specification}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.standardsFound}</td>
                      <td className="px-4 py-3">
                        {r.alerts > 0 ? <span className="text-amber-600">{r.alerts}</span> : <span className="text-slate-400">0</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.certification}</td>
                      <td className="px-4 py-3"><StatusBadge status={st.type} size="sm">{st.label}</StatusBadge></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => showToast('Opening analysis details...', 'info')}
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => showToast('Report download prepared', 'success')}
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-green-600"
                            title="Download Report"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
