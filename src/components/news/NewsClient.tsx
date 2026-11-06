'use client';

import React from 'react';
import Link from 'next/link';
import {
  BellRing,
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  FileText,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { CMSAnnouncement } from '@/types';

interface NewsClientProps {
  announcements: CMSAnnouncement[];
}

export function NewsClient({ announcements }: NewsClientProps) {
  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <BellRing className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Official Clinical & Operational Bulletins • Krishnanagar</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Notices & Health Advisories
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Stay informed with verified clinical advisories, seasonal dengue and vector-borne alerts, OPD schedule updates, and community health camps from Hiramani Memorial Hospital administration.
          </p>
        </div>
      </section>

      {/* 2. Announcements List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Hospital Bulletin Board
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Recent Advisories & Administrative Notices
          </h2>
        </div>

        {announcements.length === 0 ? (
          <div className="p-12 text-center bg-[#F7FAF9] rounded-xl border border-[#E5EBEF] space-y-3">
            <FileText className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#103653]">No Active Bulletins</h3>
            <p className="text-xs text-[#526273] max-w-sm mx-auto">
              There are currently no urgent clinical notices or schedule disruptions. All OPD chambers and diagnostic labs are operating normally.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map(item => (
              <article
                key={item.id}
                className="p-5 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition space-y-3 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F4F8F5] text-[#15965C] border border-[#15965C]/20 uppercase">
                      {item.category}
                    </span>
                    {item.is_emergency_alert && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#DC2626] border border-[#DC2626]/20 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3" />
                        Priority Notice
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#526273] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#103653]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#526273] leading-relaxed">
                  {item.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. Community Health Desk */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] text-xs text-[#526273] space-y-2">
          <h3 className="font-bold text-sm text-[#103653]">Need Information on Clinical Camp Dates?</h3>
          <p className="leading-relaxed">
            Hiramani Memorial Hospital frequently organizes free diabetes screenings, pediatric immunization clinics, and cardiac consultation camps in Krishnanagar and adjoining rural Nadia. For upcoming camp schedules, please contact reception at <strong>+91 78729 57300</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
