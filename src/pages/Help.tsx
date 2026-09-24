import { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, FileSearch, BookMarked, Link2, GitBranch, BadgeCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

const faqs: FAQItem[] = [
  {
    question: 'How MANAKSARTHI works',
    answer: 'MANAKSARTHI uses semantic analysis to match your product specifications against the Indian Standards database. When you submit a specification, the AI identifies the product category, extracts technical requirements, and cross-references them with relevant IS standards, normative references, test methods, and certification requirements. The system also checks for amendments and superseded versions to ensure your references are current.',
    icon: HelpCircle,
  },
  {
    question: 'How to analyze specifications',
    answer: 'Navigate to the Analyze Specification page. You can either fill in the product description form with details like product name, category, and technical specifications, or upload a tender document (PDF, DOCX, TXT). Select the analysis options you need — relevant standards, allied standards, test methods, safety standards, amendments, and certification requirements. Click "Analyze with AI" to start the analysis. Results are displayed with relevance scores and explanations for each recommendation.',
    icon: FileSearch,
  },
  {
    question: 'Indian Standards terminology',
    answer: 'IS (Indian Standard) — A standard published by the Bureau of Indian Standards (BIS). IS number format: IS [number]:[year]. For example, IS 2062:2024 refers to the 2024 version of IS 2062. The year indicates the version. Standards are periodically reviewed and updated through amendments or full revisions.',
    icon: BookMarked,
  },
  {
    question: 'Normative references',
    answer: 'Normative references are standards that are cited within another standard as indispensable requirements. When a standard references another document normatively, the referenced document becomes part of the requirements. MANAKSARTHI identifies all normative references in recommended standards to give you a complete picture of applicable requirements.',
    icon: Link2,
  },
  {
    question: 'Amendments',
    answer: 'An amendment is a formal change to an existing standard without publishing a completely new version. Amendments can modify requirements, add new clauses, or update referenced standards. MANAKSARTHI tracks amendments and alerts you when a referenced standard has an available amendment or has been superseded by a newer version.',
    icon: GitBranch,
  },
  {
    question: 'Certification terminology',
    answer: 'BIS Product Certification (ISI Mark) — Mandatory or voluntary certification by BIS confirming a product meets the relevant IS. CRS (Compulsory Registration Scheme) — Mandatory registration for electronic goods. Hallmarking — Certification for precious metals (gold/silver). MANAKSARTHI identifies which certifications apply to your product based on the identified standards.',
    icon: BadgeCheck,
  },
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Help & Documentation</h1>
        <p className="mt-1 text-sm text-slate-500">Learn how MANAKSARTHI works and understand Indian Standards terminology.</p>
      </div>

      <div className="mt-5 space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left hover:bg-slate-50/50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                <faq.icon className="h-4.5 w-4.5" />
              </div>
              <span className="flex-1 text-sm font-semibold text-navy-900">{faq.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 pl-[68px] animate-fade-in">
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact card */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-navy-900">Need more help?</h3>
            <p className="text-xs text-slate-500">This is a frontend prototype. In a production deployment, you would find contact information and support resources here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
