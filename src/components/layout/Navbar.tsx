import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Settings as SettingsIcon,
  User,
  LogOut,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Plus,
  BadgeCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { mockNotifications } from '@/data/mockData';
import type { Notification } from '@/types';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

const notifIconMap: Record<string, LucideIcon> = {
  amendment: AlertTriangle,
  superseded: XCircle,
  analysis: CheckCircle2,
  new_standard: Plus,
  certification: BadgeCheck,
};

const notifColors: Record<string, string> = {
  amendment: 'bg-amber-100 text-amber-600',
  superseded: 'bg-red-100 text-red-600',
  analysis: 'bg-blue-100 text-blue-600',
  new_standard: 'bg-green-100 text-green-600',
  certification: 'bg-purple-100 text-purple-600',
};

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
      <button
        onClick={onMobileMenuToggle}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden md:block">
        <Breadcrumb />
      </div>

      {/* Search */}
      <div className="ml-auto hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search standards, products, specifications..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto md:ml-0">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg animate-slide-up">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h4 className="text-sm font-semibold text-navy-900">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">{unreadCount} new</span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto scrollbar-thin">
                {notifications.map((n) => {
                  const Icon = notifIconMap[n.type] || Bell;
                  return (
                    <div
                      key={n.id}
                      className={`group flex gap-3 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-slate-50/50 ${!n.read ? 'bg-blue-50/40' : ''}`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notifColors[n.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy-900">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.description}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                className="w-full border-t border-slate-200 py-2.5 text-center text-sm text-blue-600 transition-colors hover:bg-slate-50"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate('/help')}
          className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              AK
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-medium text-navy-900 leading-tight">Arun Kumar</p>
              <p className="text-[10px] text-slate-500 leading-tight">Standards Analyst</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg animate-slide-up">
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-navy-900">Arun Kumar</p>
                <p className="text-xs text-slate-500">Standards Analyst</p>
              </div>
              <div className="py-1">
                <button
                  onClick={() => { setProfileOpen(false); navigate('/settings'); }}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                >
                  <SettingsIcon className="h-4 w-4" /> Workspace Settings
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50">
                  <User className="h-4 w-4" /> Profile
                </button>
                <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
