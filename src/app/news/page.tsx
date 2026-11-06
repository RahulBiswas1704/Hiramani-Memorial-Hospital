import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  AlertTriangle,
  Calendar,
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  BellRing,
  PhoneCall,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Hospital Notices, Health Advisories & News | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Official news, medical advisories, seasonal fever updates, community health camps, and hospital announcements from Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const announcements = await HospitalRepo.getCMSAnnouncements();

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <BellRing className="w-3.5 h-3.5 text-hospital-green" />
            <span>Official Clinical & Operational Bulletins • Krishnanagar</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Notices & Health Advisories
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Stay informed with verified clinical advisories, seasonal dengue and vector-borne alerts, OPD schedule updates, and community health camps from Hiramani Memorial Hospital administration.
          </p>
        </div>
      </section>

      {/* 2. Announcements List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {announcements.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No active bulletins published</h3>
            <p className="text-xs text-slate-500">
              Check back soon for community health updates and clinic notices.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map(item => (
              <article
                key={item.id}
                className={`p-6 sm:p-8 rounded-3xl bg-white border transition duration-200 space-y-4 ${
                  item.is_emergency_alert
                    ? 'border-amber-300 bg-amber-50/20 shadow-md'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.category === 'Health Advisory'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : item.category === 'Emergency'
                          ? 'bg-red-100 text-red-800 border border-red-200'
                          : 'bg-hospital-green/10 text-hospital-green border border-hospital-green/20'
                      }`}
                    >
                      {item.category}
                    </span>

                    {item.is_emergency_alert && (
                      <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        High Priority Alert
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {new Date(item.published_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.content}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3. Enquiry Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-hospital-greenSoft border border-hospital-green/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-700 space-y-1 text-center sm:text-left">
            <span className="font-bold text-slate-900 block text-sm">Have a question regarding public health camps or advisories?</span>
            <span>Contact the Hiramani Memorial Hospital public relations desk at our Krishnanagar campus.</span>
          </div>
          <a
            href="tel:+917872957300"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] transition shadow-sm shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Desk: +91 78729 57300</span>
          </a>
        </div>
      </section>
    </div>
  );
}
