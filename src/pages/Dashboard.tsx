import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Target,
  AlertTriangle,
  BadgeCheck,
  Sparkles,
  Upload,
  ArrowRight,
  FileText,
  Package,
  Wrench,
  Shield,
  FlaskConical,
  GitBranch,
  Link2,
} from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import InsightCard from '@/components/ui/InsightCard';
import ChartCard from '@/components/ui/ChartCard';
import AnalysisOverviewChart from '@/components/ui/AnalysisOverviewChart';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';
import { mockInsights, mockAnalyses } from '@/data/mockData';
import type { AnalysisStatus } from '@/types';

const statusMap: Record<AnalysisStatus, { type: 'success' | 'warning' | 'info'; label: string }> = {
  'Completed': { type: 'success', label: 'Completed' },
  'In Progress': { type: 'info', label: 'In Progress' },
  'Needs Review': { type: 'warning', label: 'Needs Review' },
};

const aiChips = [
  { label: 'Product Standards', icon: BookOpen },
  { label: 'Allied Standards', icon: Link2 },
  { label: 'Test Methods', icon: FlaskConical },
  { label: 'Safety', icon: Shield },
  { label: 'Amendments', icon: GitBranch },
  { label: 'Certification', icon: BadgeCheck },
];

type TabKey = 'product' | 'technical' | 'tender';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('product');
  const [specText, setSpecText] = useState('');

  const examples = [
    'Structural steel for industrial construction',
    'Cement procurement specification',
    'Electrical cable technical requirement',
  ];

  const handleAnalyze = () => {
    navigate('/analyze');
  };

  const tabs: { key: TabKey; label: string; icon: typeof Package }[] = [
    { key: 'product', label: 'Product Description', icon: Package },
    { key: 'technical', label: 'Technical Specification', icon: Wrench },
    { key: 'tender', label: 'Tender Document', icon: FileText },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Indian Standards Intelligence</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Identify relevant Indian Standards, allied standards, amendments, and certification requirements through intelligent specification analysis.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/standards')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Explore Standards <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleAnalyze}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Sparkles className="h-4 w-4" /> Analyze Specification
          </button>
        </div>
      </div>

      {/* Stats with sparklines */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Standards Analyzed" value="1,284" supportText="Updated from mock records" trend={{ value: '8%', positive: true }} sparkData={[12, 18, 15, 22, 28, 25, 32]} sparkColor="#2563eb" />
        <StatCard icon={Target} label="Standards Identified" value="3,846" supportText="Across specifications" trend={{ value: '12%', positive: true }} sparkData={[20, 25, 30, 35, 42, 48, 55]} sparkColor="#1e3a5f" />
        <StatCard icon={AlertTriangle} label="Outdated References" value="126" supportText="Require review" trend={{ value: '3%', positive: false }} sparkData={[8, 12, 10, 15, 13, 18, 14]} sparkColor="#d97706" />
        <StatCard icon={BadgeCheck} label="Certification Alerts" value="74" supportText="Require attention" sparkData={[5, 8, 6, 10, 7, 9, 12]} sparkColor="#16a34a" />
      </div>

      {/* Main content — two column */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT — AI Analysis card (primary focus) */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-navy-900">AI Specification Analysis</h3>
                <p className="text-sm text-slate-500">Paste a product description or technical requirement to identify relevant Indian Standards.</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-100 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" /> {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-5">
              {activeTab === 'tender' ? (
                <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-10 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer" onClick={handleAnalyze}>
                  <Upload className="mx-auto h-8 w-8 text-slate-400" />
                  <p className="mt-2 text-sm font-medium text-navy-900">Drop your tender document here</p>
                  <p className="mt-1 text-xs text-slate-400">or click to browse — PDF • DOCX • TXT</p>
                </div>
              ) : (
                <>
                  <textarea
                    value={specText}
                    onChange={(e) => setSpecText(e.target.value)}
                    placeholder={activeTab === 'product' ? 'Enter product description — name, category, application, key characteristics...' : 'Enter technical specification — materials, dimensions, performance requirements, standards references...'}
                    className="h-36 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 scrollbar-thin"
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
                        <Upload className="h-4 w-4" /> Upload Tender Document
                      </button>
                      <span className="text-xs text-slate-400">PDF • DOCX • TXT</span>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                    >
                      <Sparkles className="h-4 w-4" /> Analyze with AI <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </>
              )}

              {/* AI capability chips */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-xs font-medium text-slate-400 mb-2">AI can identify:</p>
                <div className="flex flex-wrap gap-2">
                  {aiChips.map((chip) => (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <chip.icon className="h-3 w-3" />
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Example suggestions */}
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="text-xs font-medium text-slate-400 mb-2">Try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => { setSpecText(ex); setActiveTab('product'); }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — AI Insights panel */}
        <div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="text-base font-semibold text-navy-900">AI Insights</h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">From your latest analysis</p>
            <div className="mt-4 space-y-2.5">
              {mockInsights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} onClick={() => navigate('/results')} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Overview chart + Recent Analyses */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Standards Analysis Overview" action={<span className="text-xs text-slate-400">Last 30 days</span>}>
          <AnalysisOverviewChart />
        </ChartCard>

        {/* Recent Analyses */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-navy-900">Recent Analyses</h3>
            <button
              onClick={() => navigate('/history')}
              className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              View all
            </button>
          </div>
          {mockAnalyses.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="No analyses yet"
              description="Run your first specification analysis to see results here."
              action={
                <button onClick={handleAnalyze} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Analyze Specification
                </button>
              }
            />
          ) : (
            <div className="mt-4 overflow-x-auto scrollbar-thin">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs text-slate-400">
                    <th className="pb-2 pr-3 font-medium">Specification</th>
                    <th className="pb-2 pr-3 font-medium">Standards</th>
                    <th className="pb-2 pr-3 font-medium">Alerts</th>
                    <th className="pb-2 pr-3 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAnalyses.slice(0, 5).map((a) => {
                    const st = statusMap[a.status];
                    return (
                      <tr key={a.id} className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/50">
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                            <span className="font-medium text-navy-900">{a.specification}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3 text-slate-600">{a.standardsFound}</td>
                        <td className="py-2.5 pr-3">
                          {a.alerts > 0 ? <span className="text-amber-600">{a.alerts}</span> : <span className="text-slate-400">0</span>}
                        </td>
                        <td className="py-2.5 pr-3 text-slate-500 text-xs">{a.date}</td>
                        <td className="py-2.5"><StatusBadge status={st.type} size="sm">{st.label}</StatusBadge></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
