import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import CertificationCard from '@/components/ui/CertificationCard';
import { mockCompliance } from '@/data/mockData';

export default function Compliance() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Certification & Compliance</h1>
        <p className="mt-1 text-sm text-slate-500">Review applicable certification and regulatory requirements for your identified product.</p>
      </div>

      {/* Summary banner */}
      <div className="mt-5 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-navy-900">Product: Industrial Safety Helmet</h3>
          <p className="text-sm text-slate-500">Based on AI analysis — 2 compliance requirements identified</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">1 Applicable</span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">1 Review</span>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">1 Missing</span>
        </div>
      </div>

      {/* Compliance cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {mockCompliance.map((item) => (
          <CertificationCard
            key={item.id}
            item={item}
            onViewRequirement={() => navigate('/standards')}
          />
        ))}
      </div>
    </div>
  );
}
