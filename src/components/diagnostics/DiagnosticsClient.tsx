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
    <div className="space-y-10 pb-20 bg-white text-[#182B3D]">
      {/* 1. Header Banner */}
      <section className="pt-6 sm:pt-10 pb-8 sm:pb-10 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#15965C] bg-[#15965C]/10 px-3 py-1 rounded-full w-fit">
            <Microscope className="w-3.5 h-3.5 text-[#15965C]" />
            <span>In-House Diagnostic Pathology & Imaging • Krishnanagar Campus</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Diagnostic Services & Tariff Schedule
          </h1>
          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital features modern in-house diagnostic pathology, automated biochemistry analyzers, digital X-Ray, and 2D Echocardiography with fast same-day reports for patients across Krishnanagar and Nadia.
          </p>
        </div>
      </section>

      {/* 2. Fasting & Collection Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-xl bg-[#103653] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#159FDB]">
              <Clock className="w-4 h-4 text-[#159FDB]" />
              <span>Sample Collection Hours: Daily 07:30 AM – 11:30 AM</span>
            </div>
            <p className="text-xs text-slate-300">
              For Fasting Blood Sugar and Lipid Profiles, please arrive with 10–12 hours overnight fasting. Reports delivered via WhatsApp within 24 hours.
            </p>
          </div>
          <a
            href="https://wa.me/917872957300?text=Hello%20Hiramani%20Hospital,%20I%20would%20like%20to%20enquire%20about%20a%20diagnostic%20test."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold transition shrink-0 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp Enquiry: +91 78729 57300</span>
          </a>
        </div>
      </section>

      {/* 2. Search & Category Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tests by code or name (e.g. 'CBC', 'Lipid', 'X-Ray', '2D Echo')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
            />
          </div>

          {/* View Mode Toggle on Desktop */}
          <div className="hidden sm:flex items-center gap-1 bg-[#F7FAF9] p-1 rounded-lg border border-[#E5EBEF] shrink-0">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'table' ? 'bg-white text-[#103653] shadow-sm' : 'text-[#526273] hover:text-[#103653]'
              }`}
              title="Table View"
            >
              <Table className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 ${
                viewMode === 'cards' ? 'bg-white text-[#103653] shadow-sm' : 'text-[#526273] hover:text-[#103653]'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 pb-1">
          <button
            type="button"
            onClick={() => setSelectedCat('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
              selectedCat === ''
                ? 'bg-[#15965C] text-white shadow-sm'
                : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
            }`}
          >
            All Investigations ({tests.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                selectedCat === cat.id
                  ? 'bg-[#15965C] text-white shadow-sm'
                  : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-[#526273] flex items-center justify-between pt-1">
          <span>
            Showing <strong className="text-[#182B3D]">{filteredTests.length}</strong> verified investigations
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
      </section>

      {/* 3. Render Tests: Table vs Cards (Desktop) & Clean Rows (Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTests.length === 0 ? (
          <div className="p-12 text-center bg-[#F7FAF9] rounded-xl border border-[#E5EBEF] space-y-3">
            <Microscope className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#103653]">No tests found</h3>
            <p className="text-xs text-[#526273]">
              Try searching with a different test name or clear the selected category filter.
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <>
            {/* Desktop Structured Table View */}
            <div className="hidden md:block rounded-xl border border-[#E5EBEF] overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7FAF9] text-[#103653] font-bold border-b border-[#E5EBEF]">
                  <tr>
                    <th className="py-3.5 px-4">Test Code & Name</th>
                    <th className="py-3.5 px-4">Sample / Modality</th>
                    <th className="py-3.5 px-4">Fasting Instructions</th>
                    <th className="py-3.5 px-4">Turnaround</th>
                    <th className="py-3.5 px-4">Tariff</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EBEF] text-[#526273]">
                  {filteredTests.map(test => (
                    <tr key={test.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-semibold text-[#182B3D]">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                              {test.code}
                            </span>
                            <span>{test.name}</span>
                          </div>
                          {test.description && (
                            <p className="text-[11px] text-[#526273] line-clamp-1">{test.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">{test.sample_type || 'Clinical Scan'}</td>
                      <td className="py-3.5 px-4">
                        {test.fasting_required ? (
                          <span className="text-amber-700 font-semibold">• Overnight Fasting</span>
                        ) : (
                          <span className="text-slate-500">• No Fasting Required</span>
                        )}
                        {test.preparation_instructions && (
                          <div className="text-[10px] text-slate-400 mt-0.5 max-w-xs truncate">
                            {test.preparation_instructions}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">{test.turnaround_hours} Hours</td>
                      <td className="py-3.5 px-4 font-bold text-[#15965C] text-sm">₹{test.price}</td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(test.name)}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F4F8F5] hover:bg-[#15965C] text-[#15965C] hover:text-white font-bold text-xs transition border border-[#15965C]/30"
                        >
                          <span>Enquire</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Clean List View (Zero Horizontal Scroll!) */}
            <div className="md:hidden divide-y divide-[#E5EBEF] border border-[#E5EBEF] rounded-xl bg-white shadow-sm">
              {filteredTests.map(test => (
                <div key={test.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200 mr-1.5">
                        {test.code}
                      </span>
                      <span className="text-xs font-bold text-[#182B3D]">{test.name}</span>
                    </div>
                    <span className="text-xs font-bold text-[#15965C] shrink-0">₹{test.price}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#526273]">
                    <span>Sample: {test.sample_type || 'Clinical Scan'}</span>
                    <span>Report: {test.turnaround_hours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                    <span className={test.fasting_required ? 'text-amber-700 font-semibold' : 'text-slate-500'}>
                      {test.fasting_required ? '• Overnight Fasting Required' : '• No Fasting'}
                    </span>
                    <Link
                      href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(test.name)}`}
                      className="font-bold text-[#15965C] hover:underline"
                    >
                      Enquire ›
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Clean Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTests.map(test => (
              <div
                key={test.id}
                className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {test.code}
                    </span>
                    <span className="text-sm font-bold text-[#15965C]">₹{test.price}</span>
                  </div>
                  <h3 className="text-xs font-bold text-[#182B3D] leading-snug">{test.name}</h3>
                  <p className="text-[11px] text-[#526273] line-clamp-2">{test.description || 'Clinical diagnostic investigation.'}</p>

                  <div className="text-[11px] text-[#526273] space-y-1 pt-1 border-t border-[#E5EBEF]">
                    <div>Sample: <strong>{test.sample_type || 'Clinical Scan'}</strong></div>
                    <div>Turnaround: <strong>{test.turnaround_hours} Hours</strong></div>
                    <div className={test.fasting_required ? 'text-amber-700 font-semibold' : 'text-slate-500'}>
                      {test.fasting_required ? 'Overnight Fasting Required' : 'No Fasting Required'}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(test.name)}`}
                  className="w-full text-center py-2 px-3 rounded-lg bg-[#F4F8F5] hover:bg-[#15965C] text-[#15965C] hover:text-white font-bold text-xs transition border border-[#15965C]/30"
                >
                  Book / Enquire Test
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
