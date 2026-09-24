import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ToastProvider } from '@/components/ui/ToastContext';
import Dashboard from '@/pages/Dashboard';
import Analyze from '@/pages/Analyze';
import Results from '@/pages/Results';
import StandardsExplorer from '@/pages/StandardsExplorer';
import StandardDetail from '@/pages/StandardDetail';
import RelatedStandards from '@/pages/RelatedStandards';
import Amendments from '@/pages/Amendments';
import Compliance from '@/pages/Compliance';
import TenderAssistant from '@/pages/TenderAssistant';
import History from '@/pages/History';
import Help from '@/pages/Help';
import Settings from '@/pages/Settings';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/results" element={<Results />} />
            <Route path="/standards" element={<StandardsExplorer />} />
            <Route path="/standards/:id" element={<StandardDetail />} />
            <Route path="/related-standards" element={<RelatedStandards />} />
            <Route path="/amendments" element={<Amendments />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/tender-assistant" element={<TenderAssistant />} />
            <Route path="/history" element={<History />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
