import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Link2,
  BadgeCheck,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  Download,
  ArrowDown,
  Wrench,
  Shield,
} from 'lucide-react';
import StandardCard from '@/components/ui/StandardCard';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/components/ui/ToastContext';
import { mockStandards, getStandardById } from '@/data/mockStandards';
import type { Standard, RelationshipType } from '@/types';

const alliedSections: { title: string; type: RelationshipType }[] = [
  { title: 'Normative References', type: 'Normative Reference' },
  { title: 'Test Methods', type: 'Test Method' },
  { title: 'Terminology Standards', type: 'Terminology Standard' },
  { title: 'Safety Standards', type: 'Safety Standard' },
  { title: 'Installation Standards', type: 'Installation Standard' },
  { title: 'Related Product Standards', type: 'Related Product Standard' },
];

const relationshipNodes = [
  { label: 'Primary Standard', value: 'IS 2925:1984', sub: 'Industrial Safety Helmets', color: 'bg-blue-600', icon: BookOpen },
  { label: 'Test Method', value: 'IS 8515', sub: 'Impact & Penetration Test', color: 'bg-navy-600', icon: Wrench },
  { label: 'Safety Standard', value: 'IS 9473:2019', sub: 'Personal Eye Protection', color: 'bg-slate-600', icon: Shield },
  { label: 'Related Standards', value: 'IS 7524, IS 8995', sub: 'Allied Product Standards', color: 'bg-amber-600', icon: Link2 },
];

export default function Results() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedStandard, setSelectedStandard] = useState<Standard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const recommended = mockStandards.filter((s) => s.relevance && s.relevance > 85).slice(0, 4);
  const allied = mockStandards.slice(4, 11);
  const confidence = 94;

  const openDetails = (standard: Standard) => {
    setSelectedStandard(standard);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <button
        onClick={() => navigate('/analyze')}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-navy-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Analyze
      </button>

      {/* Page heading */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy-900 md:text-2xl">AI Analysis Results</h1>
          <p className="mt-1 text-sm text-slate-500">Detailed breakdown of identified standards, allied references, and compliance requirements.</p>
        </div>
        <button
          onClick={() => showToast('Report download prepared', 'success')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Download className="h-4 w-4" /> Download Report
        </button>
      </div>

      {/* Top summary with confidence */}
      <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Product</p>
            <p className="mt-1 text-base font-semibold text-navy-900">Industrial Safety Helmet</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Analysis</p>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge status="success" size="sm">Completed</StatusBadge>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">AI Match Confidence</p>
            <div className="mt-1.5 flex items-center gap-2.5">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <svg width="48" height="48" className="-rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray={2 * Math.PI * 20} strokeDashoffset={2 * Math.PI * 20 * (1 - confidence / 100)} strokeLinecap="round" className="transition-all duration-700" />
                </svg>
                <span className="absolute text-xs font-bold text-navy-900">{confidence}%</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-600">High Confidence</p>
                <p className="text-xs text-slate-500">Strong semantic match</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: 'Recommended Standards', value: '4', color: 'bg-blue-50 text-blue-600' },
          { icon: Link2, label: 'Allied Standards', value: '7', color: 'bg-navy-50 text-navy-600' },
          { icon: BadgeCheck, label: 'Certification Requirements', value: '2', color: 'bg-green-50 text-green-600' },
          { icon: AlertTriangle, label: 'Amendment Alert', value: '1', color: 'bg-amber-50 text-amber-600' },
        ].map((c) => (
          <div key={c.label} className="group rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-slate-300">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.color} transition-transform group-hover:scale-110`}>
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-bold text-navy-900">{c.value}</p>
            <p className="text-xs text-slate-500">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Recommended Standards */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-semibold text-navy-900">Recommended Standards</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {recommended.map((std) => (
            <StandardCard
              key={std.id}
              standard={std}
              onViewDetails={() => openDetails(std)}
              onViewReferences={() => navigate('/related-standards')}
            />
          ))}
        </div>
      </div>

      {/* Visual Relationship Diagram */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h2 className="text-base font-semibold text-navy-900">Standard Relationship Diagram</h2>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex flex-col items-center">
            {relationshipNodes.map((node, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`group flex items-center gap-3 rounded-xl ${node.color} px-5 py-3 text-white shadow-sm transition-transform hover:scale-105 cursor-pointer`}>
                  <node.icon className="h-5 w-5 opacity-80" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-wide opacity-80">{node.label}</p>
                    <p className="text-sm font-semibold">{node.value}</p>
                    <p className="text-[10px] opacity-75">{node.sub}</p>
                  </div>
                </div>
                {i < relationshipNodes.length - 1 && (
                  <div className="flex flex-col items-center">
                    <ArrowDown className="my-1 h-5 w-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Allied & Normative Standards */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="h-5 w-5 text-navy-600" />
          <h2 className="text-base font-semibold text-navy-900">Allied & Normative Standards</h2>
        </div>
        <div className="space-y-4">
          {alliedSections.map((section) => {
            const items = allied.filter((_, i) => i % alliedSections.length === alliedSections.indexOf(section));
            return (
              <div key={section.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
                <h3 className="text-sm font-semibold text-navy-900 mb-3">{section.title}</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {(items.length > 0 ? items : allied.slice(0, 2)).map((std) => (
                    <div
                      key={std.id}
                      className="group flex items-center justify-between rounded-lg border border-slate-200 p-3 transition-all hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer"
                      onClick={() => openDetails(std)}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-navy-900">{std.isNumber}</p>
                        <p className="text-xs text-slate-500 truncate">{std.title}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">{section.type}</span>
                          <StatusBadge
                            status={std.status === 'CURRENT' ? 'success' : std.status === 'SUPERSEDED' ? 'danger' : 'warning'}
                            size="sm"
                          >
                            {std.status.replace(/_/g, ' ')}
                          </StatusBadge>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <h3 className="text-base font-semibold text-navy-900 mb-3">Continue Analysis</h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { icon: AlertTriangle, color: 'text-amber-600', title: 'Versions & Amendments', desc: 'Check for superseded references', path: '/amendments' },
            { icon: BadgeCheck, color: 'text-green-600', title: 'Certification & Compliance', desc: 'Review certification requirements', path: '/compliance' },
            { icon: CheckCircle2, color: 'text-blue-600', title: 'Tender Readiness', desc: 'Check tender preparation status', path: '/tender-assistant' },
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="group flex items-center gap-3 rounded-lg border border-slate-200 p-4 text-left transition-all hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
            >
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <div>
                <p className="text-sm font-medium text-navy-900">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-slate-500" />
            </button>
          ))}
        </div>
      </div>

      {/* Standard Details Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedStandard ? `${selectedStandard.isNumber} — ${selectedStandard.title}` : ''}
        size="xl"
      >
        {selectedStandard && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <StatusBadge
                status={selectedStandard.status === 'CURRENT' ? 'success' : selectedStandard.status === 'SUPERSEDED' ? 'danger' : 'warning'}
              >
                {selectedStandard.status.replace(/_/g, ' ')}
              </StatusBadge>
              <span className="text-sm text-slate-500">Published: {selectedStandard.year}</span>
              <span className="text-sm text-slate-500">Latest Amendment: {selectedStandard.latestAmendment}</span>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-navy-900 mb-1">Scope</h4>
              <p className="text-sm text-slate-600">{selectedStandard.scope}</p>
            </div>

            {selectedStandard.requirements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy-900 mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {selectedStandard.requirements.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedStandard.testMethods.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy-900 mb-2">Test Methods</h4>
                <ul className="space-y-1">
                  {selectedStandard.testMethods.map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText className="h-4 w-4 text-blue-500" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedStandard.normativeReferences.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy-900 mb-2">Normative References</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStandard.normativeReferences.map((ref, i) => (
                    <span key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">{ref}</span>
                  ))}
                </div>
              </div>
            )}

            {selectedStandard.relatedStandards.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy-900 mb-2">Related Standards</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStandard.relatedStandards.map((ref, i) => {
                    const related = getStandardById(ref);
                    return (
                      <button
                        key={i}
                        onClick={() => related && openDetails(related)}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        {ref}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedStandard.certificationRequirements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-navy-900 mb-2">Certification Requirements</h4>
                <ul className="space-y-1">
                  {selectedStandard.certificationRequirements.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <BadgeCheck className="h-4 w-4 text-green-500" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2 border-t border-slate-200 pt-4">
              <button
                onClick={() => navigate('/related-standards')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-800"
              >
                View Related Standards <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => showToast('Reference download prepared', 'success')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Download className="h-3.5 w-3.5" /> Download Reference
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
