import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  BadgeCheck,
  Download,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { useToast } from '@/components/ui/ToastContext';
import { getStandardById } from '@/data/mockStandards';

export default function StandardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const standard = getStandardById(id || '');

  if (!standard) {
    return (
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate('/standards')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-900">
          <ArrowLeft className="h-4 w-4" /> Back to Standards
        </button>
        <p className="text-slate-500">Standard not found.</p>
      </div>
    );
  }

  const statusType = standard.status === 'CURRENT' ? 'success' as const : standard.status === 'SUPERSEDED' ? 'danger' as const : 'warning' as const;

  return (
    <div className="mx-auto max-w-5xl">
      <button onClick={() => navigate('/standards')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-900">
        <ArrowLeft className="h-4 w-4" /> Back to Standards Explorer
      </button>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-navy-900">{standard.isNumber}</h1>
              <p className="text-base text-slate-600">{standard.title}</p>
            </div>
          </div>
          <StatusBadge status={statusType}>{standard.status.replace(/_/g, ' ')}</StatusBadge>
        </div>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Published Year</p>
            <p className="mt-1 text-sm font-medium text-navy-900">{standard.year}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Latest Amendment</p>
            <p className="mt-1 text-sm font-medium text-navy-900">{standard.latestAmendment}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Category</p>
            <p className="mt-1 text-sm font-medium text-navy-900">{standard.category}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Industry</p>
            <p className="mt-1 text-sm font-medium text-navy-900">{standard.industry}</p>
          </div>
        </div>

        {/* Scope */}
        <div className="mt-5 border-t border-slate-100 pt-4">
          <h3 className="text-sm font-semibold text-navy-900 mb-1">Scope</h3>
          <p className="text-sm text-slate-600">{standard.scope}</p>
        </div>

        {/* Requirements */}
        {standard.requirements.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-navy-900 mb-2">Requirements</h3>
            <ul className="space-y-1.5">
              {standard.requirements.map((r, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Test Methods */}
        {standard.testMethods.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-navy-900 mb-2">Test Methods</h3>
            <ul className="space-y-1.5">
              {standard.testMethods.map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <FileText className="h-4 w-4 text-blue-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Normative References */}
        {standard.normativeReferences.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-navy-900 mb-2">Normative References</h3>
            <div className="flex flex-wrap gap-2">
              {standard.normativeReferences.map((ref, i) => (
                <span key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">{ref}</span>
              ))}
            </div>
          </div>
        )}

        {/* Related Standards */}
        {standard.relatedStandards.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-navy-900 mb-2">Related Standards</h3>
            <div className="flex flex-wrap gap-2">
              {standard.relatedStandards.map((ref, i) => {
                const related = getStandardById(ref);
                return (
                  <button
                    key={i}
                    onClick={() => related && navigate(`/standards/${related.id}`)}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100"
                  >
                    {ref}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Certification */}
        {standard.certificationRequirements.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-navy-900 mb-2">Certification Requirements</h3>
            <ul className="space-y-1.5">
              {standard.certificationRequirements.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <BadgeCheck className="h-4 w-4 text-green-500" /> {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => navigate('/related-standards')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-navy-700 px-4 py-2 text-sm font-medium text-white hover:bg-navy-800"
          >
            <BookOpen className="h-4 w-4" /> View Related Standards <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => showToast('Reference download prepared', 'success')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" /> Download Reference
          </button>
        </div>
      </div>
    </div>
  );
}
