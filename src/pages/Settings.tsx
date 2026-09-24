import { useState } from 'react';
import { Building2, Palette, Bell, SlidersHorizontal, Check } from 'lucide-react';
import { useToast } from '@/components/ui/ToastContext';

type Section = 'workspace' | 'appearance' | 'notifications' | 'analysis';

export default function Settings() {
  const { showToast } = useToast();
  const [active, setActive] = useState<Section>('workspace');
  const [notifications, setNotifications] = useState({
    amendmentAlerts: true,
    supersededAlerts: true,
    analysisCompleted: true,
    newStandards: false,
    certificationAlerts: true,
  });
  const [analysisPrefs, setAnalysisPrefs] = useState({
    relevantStandards: true,
    alliedStandards: true,
    testMethods: true,
    safetyStandards: true,
    installationStandards: false,
    latestVersions: true,
    certificationRequirements: true,
  });

  const sections: { key: Section; label: string; icon: typeof Building2 }[] = [
    { key: 'workspace', label: 'Workspace', icon: Building2 },
    { key: 'appearance', label: 'Appearance', icon: Palette },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'analysis', label: 'Analysis Preferences', icon: SlidersHorizontal },
  ];

  const handleSave = () => {
    showToast('Settings saved successfully', 'success');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-navy-900 md:text-2xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">Manage your workspace, appearance, and analysis preferences.</p>
      </div>

      <div className="mt-5 flex flex-col gap-6 md:flex-row">
        {/* Sidebar */}
        <div className="md:w-52 shrink-0">
          <div className="flex gap-1 overflow-x-auto md:flex-col scrollbar-thin">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  active === s.key ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-card">
          {active === 'workspace' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-navy-900">Workspace</h3>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Workspace Name</label>
                <input
                  type="text"
                  defaultValue="MANAKSARTHI"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Organization</label>
                <input
                  type="text"
                  defaultValue="Bureau of Indian Standards"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Default Industry</label>
                <select className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-navy-900 focus:border-blue-400 focus:outline-none">
                  <option>Construction</option>
                  <option>Manufacturing</option>
                  <option>Electrical</option>
                </select>
              </div>
            </div>
          )}

          {active === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-navy-900">Appearance</h3>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Theme</label>
                <div className="flex gap-3">
                  {['Light', 'Dark', 'System'].map((t) => (
                    <button
                      key={t}
                      onClick={() => showToast(`${t} theme is not available in prototype`, 'info')}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${
                        t === 'Light' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t === 'Light' && <Check className="mr-1.5 inline h-3.5 w-3.5" />}
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Density</label>
                <div className="flex gap-3">
                  {['Comfortable', 'Compact'].map((d) => (
                    <button
                      key={d}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${
                        d === 'Comfortable' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {d === 'Comfortable' && <Check className="mr-1.5 inline h-3.5 w-3.5" />}
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-navy-900">Notifications</h3>
              {Object.entries({
                amendmentAlerts: 'Amendment alerts',
                supersededAlerts: 'Superseded standard alerts',
                analysisCompleted: 'Analysis completed notifications',
                newStandards: 'New standard published alerts',
                certificationAlerts: 'Certification requirement alerts',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 cursor-pointer hover:bg-slate-50">
                  <span className="text-sm text-slate-700">{label}</span>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${notifications[key as keyof typeof notifications] ? 'left-[22px]' : 'left-0.5'}`} />
                  </button>
                </label>
              ))}
            </div>
          )}

          {active === 'analysis' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-navy-900">Analysis Preferences</h3>
              <p className="text-sm text-slate-500">Default options selected when running a new analysis.</p>
              {Object.entries({
                relevantStandards: 'Relevant Indian Standards',
                alliedStandards: 'Allied & Normative Standards',
                testMethods: 'Test Methods',
                safetyStandards: 'Safety Standards',
                installationStandards: 'Installation Standards',
                latestVersions: 'Latest Version & Amendments',
                certificationRequirements: 'Certification Requirements',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={analysisPrefs[key as keyof typeof analysisPrefs]}
                    onChange={(e) => setAnalysisPrefs((prev) => ({ ...prev, [key]: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400"
                  />
                  <span className="text-sm text-slate-700">{label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Save */}
          <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              <Check className="h-4 w-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
