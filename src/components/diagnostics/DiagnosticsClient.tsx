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
  Table,
  LayoutGrid,
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
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

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
      <section className="bg-gradient-to-b from-[#F0F7FB] via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-[#159FDB]/40 text-[#0B72A2] text-xs font-bold">
            <Microscope className="w-3.5 h-3.5 text-[#159FDB]" />
            <span>In-House Automated Laboratory & Digital Radiology</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Services & Test Catalog
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital features in-house diagnostic instrumentation for clinical pathology, biochemistry,
            radiology imaging, and non-invasive cardiology investigations with rapid turnaround times in Krishnanagar, Nadia.
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
              placeholder="Search tests by code or name (e.g. 'CBC', 'Lipid', 'Thyroid', 'X-Ray', '2D Echo')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C]"
            />
          </div>

          {/* Category Filter Pills & View Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCat('')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCat === ''
                    ? 'bg-[#15965C] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Investigations ({tests.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCat === cat.id
                      ? 'bg-[#15965C] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Structured Table View"
              >
                <Table className="w-4 h-4" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-500 flex items-center justify-between px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredTests.length}</strong> verified investigations
          </span>
          {(search || selectedCat) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedCat('');
              }}
              className="font-bold text-[#15965C] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* 3. Render Tests: Table Mode (Default) vs Card Mode */}
        {filteredTests.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <Microscope className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No diagnostic investigations found</h3>
            <p className="text-xs text-slate-500">
              Try searching with a different test name or clear the selected category filter.
            </p>
          </div>
        ) : viewMode === 'table' ? (
          /* Structured Clinical Tariff Table */
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#F4F8F5] text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">Test Code & Name</th>
                    <th className="py-4 px-4">Sample / Modality</th>
                    <th className="py-4 px-4">Fasting Instructions</th>
                    <th className="py-4 px-4">Turnaround Time</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTests.map(test => (
                    <tr key={test.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              {test.code}
                            </span>
                            <span className="font-bold text-slate-900">{test.name}</span>
                          </div>
                          {test.description && (
                            <p className="text-xs text-slate-500 line-clamp-1">{test.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {test.sample_type || 'Clinical Scan'}
                      </td>
                      <td className="py-4 px-4">
                        {test.fasting_required ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Fasting Required
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                            No Fasting
                          </span>
                        )}
                        {test.preparation_instructions && (
                          <div className="text-[11px] text-slate-400 mt-0.5 max-w-xs line-clamp-1">
                            {test.preparation_instructions}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{test.turnaround_hours} Hours</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-extrabold text-[#15965C] text-sm">
                        ₹{test.price}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <Link
                          href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(test.name)}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-[#15965C] text-[#15965C] hover:text-white font-bold text-xs transition border border-emerald-200"
                        >
                          <span>Enquire</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map(test => (
              <div
                key={test.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#15965C] shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-[#15965C] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
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
                        <span>Turnaround:</span>
                      </span>
                      <span className="font-semibold">{test.turnaround_hours} Hours</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        <span>Fasting:</span>
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
                    <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-950">
                      <strong>Prep:</strong> {test.preparation_instructions}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(test.name)}`}
                    className="w-full inline-flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold text-[#15965C] bg-emerald-50 hover:bg-[#15965C] hover:text-white border border-emerald-200 transition"
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
