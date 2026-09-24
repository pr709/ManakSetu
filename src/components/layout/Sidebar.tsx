import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileSearch,
  ClipboardList,
  History,
  BookOpen,
  GitCompareArrows,
  GitBranch,
  BadgeCheck,
  HelpCircle,
  Settings,
  ChevronLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: 'OVERVIEW',
    items: [{ path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'ANALYSIS',
    items: [
      { path: '/analyze', label: 'Analyze Specification', icon: FileSearch },
      { path: '/tender-assistant', label: 'Tender Assistant', icon: ClipboardList },
      { path: '/history', label: 'Analysis History', icon: History },
    ],
  },
  {
    title: 'STANDARDS',
    items: [
      { path: '/standards', label: 'Standards Explorer', icon: BookOpen },
      { path: '/related-standards', label: 'Related Standards', icon: GitCompareArrows },
      { path: '/amendments', label: 'Versions & Amendments', icon: GitBranch },
    ],
  },
  {
    title: 'COMPLIANCE',
    items: [{ path: '/compliance', label: 'Certification & Compliance', icon: BadgeCheck }],
  },
];

const bottomItems: NavItem[] = [
  { path: '/help', label: 'Help', icon: HelpCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-navy-900/50 lg:hidden" onClick={onMobileClose} />
      )}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-navy-900 transition-all duration-300 lg:translate-x-0 ${
          collapsed ? 'w-16' : 'w-60'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white text-lg">
            M
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white tracking-wide">MANAKSARTHI</p>
              <p className="text-[10px] text-navy-200 leading-tight">Indian Standards Intelligence</p>
            </div>
          )}
        </div>

        {/* Collapse button - desktop only */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-16 h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:text-navy-700"
        >
          <ChevronLeft className={`h-3.5 w-3.5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 scrollbar-thin">
          {groups.map((group) => (
            <div key={group.title} className="mb-4">
              {!collapsed && (
                <p className="px-3 py-1.5 text-[10px] font-semibold text-navy-300 tracking-wider">{group.title}</p>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onMobileClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white font-medium'
                          : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                      } ${collapsed ? 'justify-center' : ''}`
                    }
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom group */}
          <div className="mb-2">
            {!collapsed && (
              <p className="px-3 py-1.5 text-[10px] font-semibold text-navy-300 tracking-wider">BOTTOM</p>
            )}
            <div className="space-y-0.5">
              {bottomItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-medium'
                        : 'text-navy-100 hover:bg-navy-800 hover:text-white'
                    } ${collapsed ? 'justify-center' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Profile */}
        <div className="border-t border-navy-800 p-3">
          <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              AK
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">Arun Kumar</p>
                <p className="text-[10px] text-navy-300 truncate">Standards Analyst</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
