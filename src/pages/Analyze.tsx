import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, FileText, Package, Tag, Layers, Building2, Wrench } from 'lucide-react';
import FileUpload from '@/components/ui/FileUpload';
import AnalysisLoader from '@/components/ui/AnalysisLoader';
import { useToast } from '@/components/ui/ToastContext';

const analysisOptions = [
  'Relevant Indian Standards',
  'Allied & Normative Standards',
  'Test Methods',
  'Safety Standards',
  'Installation Standards',
  'Latest Version & Amendments',
  'Certification Requirements',
];

const fields = [
  { key: 'productName', label: 'Product Name', icon: Package, placeholder: 'e.g., Industrial Safety Helmet' },
  { key: 'category', label: 'Product Category', icon: Tag, placeholder: 'e.g., Safety Equipment' },
  { key: 'application', label: 'Intended Application', icon: Layers, placeholder: 'e.g., Industrial head protection' },
  { key: 'sector', label: 'Industry / Sector', icon: Building2, placeholder: 'e.g., Manufacturing' },
];

type TabKey = 'product' | 'technical' | 'tender';

export default function Analyze() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>('product');
  const [analyzing, setAnalyzing] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(analysisOptions.map((o) => [o, true]))
  );

  const handleAnalyze = () => {
    setAnalyzing(true);
  };

  const handleComplete = () => {
    setAnalyzing(false);
    navigate('/results');
  };

  if (analyzing) {
    return (
      <div className="mx-auto max-w-7xl py-8">
        <AnalysisLoader onComplete={handleComplete} />
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; icon: typeof Package }[] = [
    { key: 'product', label: 'Product Description', icon: Package },
    { key: 'technical', label: 'Technical Specification', icon: Wrench },
    { key: 'tender', label: 'Tender Document', icon: FileText },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Analyze Specification</h1>
        <p className="mt-1 text-sm text-slate-500">Enter your product specification or upload a tender document for AI-powered Indian Standards analysis.</p>
      </div>

      {/* Stage indicator */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
          <span className="font-medium text-navy-900">Input</span>
        </div>
        <div className="h-px w-8 bg-slate-300" />
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-medium text-slate-400">2</span>
          <span className="text-slate-400">AI Analysis</span>
        </div>
        <div className="h-px w-8 bg-slate-300" />
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-medium text-slate-400">3</span>
          <span className="text-slate-400">Results</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {activeTab === 'product' && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card animate-fade-in">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <f.icon className="h-4 w-4 text-slate-400" /> {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <FileText className="h-4 w-4 text-slate-400" /> Description
              </label>
              <textarea
                placeholder="Describe the product, its purpose, and key characteristics..."
                className="h-24 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 scrollbar-thin"
              />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-navy-900 mb-3">Analysis Options</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {analysisOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 cursor-pointer transition-colors hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked[opt]}
                      onChange={(e) => setChecked((prev) => ({ ...prev, [opt]: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="text-sm text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleAnalyze}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                <Sparkles className="h-4 w-4" /> Analyze with AI <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card animate-fade-in">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Material</label>
                <input type="text" placeholder="e.g., HDPE, Steel" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Dimensions</label>
                <input type="text" placeholder="e.g., 300x200x150 mm" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Performance Class</label>
                <input type="text" placeholder="e.g., Class A, Type 1" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400" />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Wrench className="h-4 w-4 text-slate-400" /> Detailed Technical Specification
              </label>
              <textarea
                placeholder="Enter detailed technical specifications — materials, dimensions, performance requirements, standards references, test conditions, tolerances..."
                className="h-48 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 scrollbar-thin font-mono text-xs"
              />
            </div>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-navy-900 mb-3">Analysis Options</p>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {analysisOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 cursor-pointer transition-colors hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={checked[opt]}
                      onChange={(e) => setChecked((prev) => ({ ...prev, [opt]: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="text-sm text-slate-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleAnalyze}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                <Sparkles className="h-4 w-4" /> Analyze with AI <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tender' && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card animate-fade-in">
            <p className="text-sm text-slate-600 mb-4">Upload your tender document for automated standards analysis. The AI will extract product requirements and identify relevant Indian Standards.</p>
            <FileUpload onFileSelect={(name) => showToast(`File "${name}" ready for analysis`, 'info')} />
            <div className="mt-4 rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-blue-700">Supported formats: PDF, DOCX, TXT. Maximum file size: 10MB. No actual file processing occurs — this is a frontend prototype.</p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleAnalyze}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
              >
                <Sparkles className="h-4 w-4" /> Analyze Document <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
