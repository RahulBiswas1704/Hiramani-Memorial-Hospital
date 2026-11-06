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
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Hospital Notices, Health Advisories & News | Hiramani Memorial Hospital Kolkata',
  description:
    'Official news, medical advisories, viral fever updates, health camp announcements, and hospital notices from Hiramani Memorial Hospital Kolkata.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const announcements = await HospitalRepo.getCMSAnnouncements();

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-teal-600" />
            <span>Official Hospital Bulletins</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Notices & Health Advisories
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Stay informed with verified clinical advisories, seasonal infection alerts, operational notices, and
            specialized outpatient camp announcements from Hiramani Memorial Hospital administration.
          </p>
        </div>
      </section>

      {/* 2. Announcements List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {announcements.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No active notices published</h3>
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
                          : 'bg-sky-100 text-sky-800 border border-sky-200'
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

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {item.content}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

