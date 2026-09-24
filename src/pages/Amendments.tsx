import { useState } from 'react';
import { AlertTriangle, ArrowRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import Timeline from '@/components/ui/Timeline';
import Modal from '@/components/ui/Modal';
import { mockAmendments } from '@/data/mockData';
import type { Amendment } from '@/types';

const statusCategories = [
  { label: 'Current', type: 'success' as const, icon: CheckCircle2 },
  { label: 'Superseded', type: 'danger' as const, icon: XCircle },
  { label: 'Amendment Available', type: 'warning' as const, icon: AlertCircle },
  { label: 'Review Required', type: 'warning' as const, icon: AlertTriangle },
];

export default function Amendments() {
  const [selectedAmendment, setSelectedAmendment] = useState<Amendment | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const statusType = (s: string) => {
    switch (s) {
      case 'CURRENT': return 'success' as const;
      case 'SUPERSEDED': return 'danger' as const;
      case 'AMENDMENT_AVAILABLE': return 'warning' as const;
      case 'REVIEW_REQUIRED': return 'warning' as const;
      default: return 'neutral' as const;
    }
  };

  const openModal = (am: Amendment) => {
    setSelectedAmendment(am);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Versions & Amendments</h1>
        <p className="mt-1 text-sm text-slate-500">Track version history, amendments, and superseded standards to ensure your references are current.</p>
      </div>

      {/* Status categories */}
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statusCategories.map((cat) => {
          const count = mockAmendments.filter((a) =>
            cat.label === 'Current' ? a.status === 'CURRENT' :
            cat.label === 'Superseded' ? a.status === 'SUPERSEDED' :
            cat.label === 'Amendment Available' ? a.status === 'AMENDMENT_AVAILABLE' :
            a.status === 'REVIEW_REQUIRED'
          ).length;
          return (
            <div key={cat.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                cat.type === 'success' ? 'bg-green-50 text-green-600' :
                cat.type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <cat.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-bold text-navy-900">{count}</p>
              <p className="text-xs text-slate-500">{cat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Amendment cards */}
      <div className="mt-6 space-y-4">
        {mockAmendments.map((am) => (
          <div key={am.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    am.status === 'CURRENT' ? 'bg-green-50 text-green-600' :
                    am.status === 'SUPERSEDED' ? 'bg-red-50 text-red-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy-900">{am.isNumber}</h3>
                    <p className="text-sm text-slate-600">{am.title}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Previous</p>
                    <p className="mt-1 text-sm font-medium text-slate-600">{am.previousVersion}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Latest</p>
                    <p className="mt-1 text-sm font-medium text-navy-900">{am.latestVersion}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <StatusBadge status={statusType(am.status)} size="sm">
                    {am.status.replace(/_/g, ' ')}
                  </StatusBadge>
                </div>

                <div className={`mt-3 rounded-lg p-3 text-sm ${
                  am.status === 'CURRENT' ? 'bg-green-50 text-green-700' :
                  am.status === 'SUPERSEDED' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {am.message}
                </div>

                <button
                  onClick={() => openModal(am)}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  View Changes <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Timeline */}
              <div className="lg:w-56 lg:border-l lg:border-slate-100 lg:pl-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Timeline</p>
                </div>
                <Timeline items={am.timeline} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedAmendment ? `${selectedAmendment.isNumber} — Version History` : ''}
        size="lg"
      >
        {selectedAmendment && (
          <div className="space-y-4">
            <div className="rounded-lg bg-amber-50 p-4">
              <p className="text-sm text-amber-700">{selectedAmendment.message}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-navy-900 mb-3">Complete Timeline</h4>
              <Timeline items={selectedAmendment.timeline} />
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Previous Version</p>
                <p className="mt-1 text-sm font-medium text-slate-600">{selectedAmendment.previousVersion}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Latest Version</p>
                <p className="mt-1 text-sm font-medium text-navy-900">{selectedAmendment.latestVersion}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
