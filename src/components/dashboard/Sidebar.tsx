'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  UserRoundCheck,
  Building2,
  MessageSquareText,
  HelpCircle,
  Settings,
  Users2,
  Stethoscope,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  QrCode,
} from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'WhatsApp Web (QR)', href: '/dashboard/whatsapp-web', icon: QrCode },
  { name: 'Appointments', href: '/dashboard/appointments', icon: CalendarDays },
  { name: 'Doctors & OPD', href: '/dashboard/doctors', icon: UserRoundCheck },
  { name: 'Departments', href: '/dashboard/departments', icon: Building2 },
  { name: 'Patient Queries', href: '/dashboard/queries', icon: MessageSquareText },
  { name: 'FAQs Knowledgebase', href: '/dashboard/faqs', icon: HelpCircle },
  { name: 'Hospital Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Staff & Roles', href: '/dashboard/staff', icon: Users2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('mediconnect_user');
    }
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-[#103653] text-white flex flex-col justify-between shadow-xl flex-shrink-0 min-h-screen">
      {/* Hospital Brand & Info */}
      <div>
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center font-bold shadow-sm shrink-0 border border-[#159FDB]">
              <img
                src="/logo.png"
                alt="Hiramani Memorial Hospital"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm tracking-tight leading-tight">Hiramani Memorial</div>
              <div className="text-[10px] text-slate-300">Krishnanagar, Nadia (741101)</div>
            </div>
          </Link>

          <div className="mt-3 flex items-center justify-between text-[11px] bg-[#0c2940] px-2.5 py-1.5 rounded-lg border border-white/10">
            <span className="text-slate-300">WhatsApp Mode</span>
            <span className="bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sandbox
            </span>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-white text-[#103653] shadow-sm font-bold'
                    : 'text-slate-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#15965C]' : 'text-[#159FDB]'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / User & Simulator Link */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          href="/chat"
          target="_blank"
          className="flex items-center justify-between p-2.5 bg-[#15965C]/20 hover:bg-[#15965C]/30 border border-[#15965C]/40 rounded-xl text-xs font-semibold text-emerald-200 transition shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Test Patient Bot
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-300" />
        </Link>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/15 text-[#159FDB] border border-white/10 flex items-center justify-center font-bold text-xs">
              DR
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold truncate text-white leading-tight">Dr. Debabrata Roy</div>
              <div className="text-[10px] text-slate-300 truncate">Hospital Admin</div>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            title="Sign Out"
            className="p-1.5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
