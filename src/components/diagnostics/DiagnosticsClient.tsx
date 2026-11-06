'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Microscope,
  Search,
  Clock,
  Activity,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  CalendarCheck,
  FileText,
  HeartPulse,
} from 'lucide-react';
import { DiagnosticCategory, DiagnosticTest } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DiagnosticsClientProps {
  categories: DiagnosticCategory[];
  tests: DiagnosticTest[];
}

export function DiagnosticsClient({ categories, tests }: DiagnosticsClientProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('');

  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchSearch =
        !search ||
        test.name.toLowerCase().includes(search.toLowerCase()) ||
        test.code.toLowerCase().includes(search.toLowerCase()) ||
        (test.description && test.description.toLowerCase().includes(search.toLowerCase()));
      const matchCat = !selectedCat || test.category_id === selectedCat;
      return matchSearch && matchCat;
    });
  }, [tests, search, selectedCat]);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Microscope className="w-3.5 h-3.5 text-teal-600" />
            <span>In-House Automated Laboratory & Radiology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Services & Test Catalog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital features modern diagnostic equipment for accurate pathology, biochemistry,
            radiology scans, and non-invasive cardiology investigations with rapid turnaround times.
          </p>
        </div>
      </section>

      {/* 2. Search & Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tests (e.g. 'CBC', 'Lipid', 'Thyroid', 'X-Ray', '2D Echo')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setSelectedCat('')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCat === ''
                  ? 'bg-[#0e4a7b] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Tests ({tests.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCat === cat.id
                    ? 'bg-[#0e4a7b] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-500 flex items-center justify-between px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredTests.length}</strong> investigations
          </span>
          {(search || selectedCat) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCat('');
              }}
              className="font-bold text-[#0e4a7b] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 3. Test Cards Grid */}
        {filteredTests.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <Microscope className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No diagnostic investigations found</h3>
            <p className="text-xs text-slate-500">
              Try searching with a different test name or clear the selected category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <div
                key={test.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      {test.code}
                    </span>
                    <span className="text-base font-black text-slate-900">
                      ₹{test.price}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {test.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {test.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Turnaround:
                      </span>
                      <span className="font-semibold">{test.turnaround_hours} Hours</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        Fasting:
                      </span>
                      <span className={`font-semibold ${test.fasting_required ? 'text-amber-700' : 'text-slate-700'}`}>
                        {test.fasting_required ? 'Overnight Required' : 'Not Required'}
                      </span>
                    </div>

                    {test.sample_type && (
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Sample:</span>
                        <span className="font-semibold text-slate-700">{test.sample_type}</span>
                      </div>
                    )}
                  </div>

                  {test.preparation_instructions && (
                    <div className="p-2.5 rounded-lg bg-sky-50/60 border border-sky-100 text-[11px] text-sky-900">
                      <strong>Prep:</strong> {test.preparation_instructions}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition"
                  >
                    Enquire / Book Investigation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

