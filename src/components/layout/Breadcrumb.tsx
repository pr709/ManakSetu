import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const routeNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analyze': 'Analyze Specification',
  '/tender-assistant': 'Tender Assistant',
  '/history': 'Analysis History',
  '/standards': 'Standards Explorer',
  '/standards/:id': 'Standard Details',
  '/related-standards': 'Related Standards',
  '/amendments': 'Versions & Amendments',
  '/compliance': 'Certification & Compliance',
  '/results': 'AI Analysis Results',
  '/help': 'Help',
  '/settings': 'Settings',
};

export default function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname;

  let current = routeNames[path];
  if (!current) {
    if (path.startsWith('/standards/')) current = 'Standard Details';
    else current = 'Dashboard';
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <span className="font-semibold text-navy-700 tracking-wide">MANAKSARTHI</span>
      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
      <span className="text-slate-600">{current}</span>
    </nav>
  );
}
