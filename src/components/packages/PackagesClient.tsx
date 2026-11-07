'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HeartPulse,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Activity,
  FileText,
  ShieldCheck,
  PhoneCall,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Table as TableIcon,
  LayoutGrid,
} from 'lucide-react';
import { HealthPackage } from '@/types';

interface PackagesClientProps {
  initialPackages: HealthPackage[];
}

export function PackagesClient({ initialPackages }: PackagesClientProps) {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredPackages = initialPackages.filter(pkg => {
    const matchGender =
      selectedGender === 'all' ||
      pkg.target_gender === 'all' ||
      pkg.target_gender === selectedGender;
    const matchSearch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      (pkg.description || '').toLowerCase().includes(search.toLowerCase());
    return matchGender && matchSearch;
  });

  const faqs = [
    {
      q: 'Do I need to fast before my preventive health checkup?',
      a: 'Yes, for most comprehensive packages including Blood Sugar (FBS) and Lipid Profiles, 10–12 hours of overnight fasting is strictly required. You may drink plain water, but avoid tea, coffee, breakfast, or smoking before blood collection.',
    },
    {
      q: 'Can I take my routine morning medications (BP / Thyroid)?',
      a: 'You may take routine anti-hypertensive (blood pressure) or cardiac medications with a small sip of plain water early in the morning. However, if you take insulin or oral diabetic tablets, defer your dose until after your fasting blood sample has been collected.',
    },
    {
      q: 'When and how will my reports be delivered?',
      a: 'Most diagnostic panels are processed same-day. Complete health package dossiers with digital doctor sign-off are delivered within 24 hours directly to your WhatsApp and the online Patient Portal. Physical printed dossiers can be collected from reception.',
    },
    {
      q: 'Is physician consultation included with every checkup package?',
      a: 'Yes. Every preventive health checkup package at Hiramani Memorial Hospital includes a post-test clinical review consultation with our Senior Consultant Physician to interpret findings and advise preventative lifestyle or medical care.',
    },
    {
      q: 'How do I arrange corporate or family group checkups in Krishnanagar?',
      a: 'For corporate employee wellness screenings, factory health audits, or family group checkups, please contact our administrative desk at +91 78729 57300 for customized tariffs and reserved morning time slots.',
    },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Institutional Editorial Header & Breadcrumb */}
      <section className="pt-6 sm:pt-10 pb-8 sm:pb-10 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-medium">Health Packages</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#15965C] bg-[#15965C]/10 px-3 py-1 rounded-full w-fit">
            <HeartPulse className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Preventive Healthcare & Checkup Packages • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Preventive Health Checkup Packages
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Protect your health and your family's future with complete health evaluations. Clear package pricing, accurate lab tests, and a dedicated consultation with our Senior Consultant Physician to discuss your results.
          </p>
        </div>
      </section>

      {/* 2. Checkup Day Protocol & Instructions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#103653] text-white rounded-xl p-5 sm:p-7 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#159FDB]" />
              <span className="text-xs font-semibold text-[#159FDB]">
                Checkup Day Protocol & Guidelines
              </span>
            </div>
            <span className="text-xs text-slate-300">
              Sample Collection Desk: 07:30 AM – 11:30 AM (Daily)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#15965C] text-white font-bold flex items-center justify-center text-[10px]">1</span>
                <span className="font-bold text-white text-sm">Overnight Fasting</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Fast for 10–12 hours overnight. Drink plain water if thirsty, but avoid morning tea, milk, or biscuits.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#159FDB] text-white font-bold flex items-center justify-center text-[10px]">2</span>
                <span className="font-bold text-white text-sm">Sample Collection</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Report to Ground Floor Diagnostics Desk in Nediarpara between 07:30 AM and 11:30 AM for gentle blood collection.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#15965C] text-white font-bold flex items-center justify-center text-[10px]">3</span>
                <span className="font-bold text-white text-sm">Digital & Print Reports</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Complete verified reports delivered within 24 hours directly on WhatsApp. Printed copies available at reception.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#159FDB] text-white font-bold flex items-center justify-center text-[10px]">4</span>
                <span className="font-bold text-white text-sm">Doctor Consultation</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Every package includes a free post-checkup review with our Senior Consultant Physician to guide your lifestyle and diet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Search, Filters & View Toggle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EBEF]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search package (e.g. 'Cardiac', 'Executive', 'Senior', 'Women')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E5EBEF] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
            />
          </div>

          {/* Gender Filter Pills & View Switcher */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <div className="flex items-center gap-1 bg-[#F7FAF9] p-1 rounded-lg border border-[#E5EBEF]">
              <button
                type="button"
                onClick={() => setSelectedGender('all')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  selectedGender === 'all'
                    ? 'bg-white text-[#103653] shadow-sm'
                    : 'text-[#526273] hover:text-[#103653]'
                }`}
              >
                All Checkups
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('male')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  selectedGender === 'male'
                    ? 'bg-white text-[#103653] shadow-sm'
                    : 'text-[#526273] hover:text-[#103653]'
                }`}
              >
                Men
              </button>
              <button
                type="button"
                onClick={() => setSelectedGender('female')}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  selectedGender === 'female'
                    ? 'bg-white text-[#103653] shadow-sm'
                    : 'text-[#526273] hover:text-[#103653]'
                }`}
              >
                Women
              </button>
            </div>

            {/* View Mode Toggle (Hidden on small mobile) */}
            <div className="hidden sm:flex items-center gap-1 bg-[#F7FAF9] p-1 rounded-lg border border-[#E5EBEF]">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition ${
                  viewMode === 'grid' ? 'bg-white text-[#103653] shadow-sm' : 'text-[#526273] hover:text-[#103653]'
                }`}
                title="Card View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition ${
                  viewMode === 'table' ? 'bg-white text-[#103653] shadow-sm' : 'text-[#526273] hover:text-[#103653]'
                }`}
                title="Comparison Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-[#526273]">
          Showing <strong>{filteredPackages.length}</strong> of {initialPackages.length} health packages
        </div>

        {/* 4. Display: Table Comparison View */}
        {viewMode === 'table' && (
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-[#E5EBEF] bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7FAF9] text-[#103653] font-bold border-b border-[#E5EBEF]">
                <tr>
                  <th className="py-3 px-4">Package Name & Scope</th>
                  <th className="py-3 px-4">Target Group</th>
                  <th className="py-3 px-4">Test Count</th>
                  <th className="py-3 px-4">Fasting Requirement</th>
                  <th className="py-3 px-4">Report Time</th>
                  <th className="py-3 px-4">Package Tariff</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EBEF] text-[#526273]">
                {filteredPackages.map(pkg => (
                  <tr key={pkg.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-[#182B3D]">
                      <div className="font-bold text-sm text-[#103653]">{pkg.name}</div>
                      <div className="text-[11px] text-[#526273] line-clamp-1 max-w-sm">{pkg.description}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F4F8F5] text-[#15965C] border border-[#15965C]/20">
                        {pkg.target_gender === 'all' ? 'All Adults' : pkg.target_gender === 'female' ? 'Women' : 'Men'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#182B3D]">
                      {pkg.sample_count} Investigations
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={pkg.fasting_required ? 'text-amber-700 font-semibold' : 'text-slate-500'}>
                        {pkg.fasting_required ? '10–12h Fasting' : 'Not Required'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {pkg.report_delivery_hours} Hours
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400 line-through text-[11px]">₹{pkg.price}</span>
                        <span className="font-bold text-sm text-[#15965C]">₹{pkg.discounted_price}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/book?package_id=${pkg.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Display: Grid Cards View */}
        {(viewMode === 'grid' || true) && (
          <div className={viewMode === 'table' ? 'sm:hidden space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {filteredPackages.map(pkg => (
              <div
                key={pkg.id}
                className="p-5 sm:p-6 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-5 shadow-sm"
              >
                <div className="space-y-4">
                  {/* Category Pill & Pricing */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#F4F8F5] text-[#15965C] border border-[#15965C]/20">
                      {pkg.target_gender === 'all'
                        ? 'Universal Package'
                        : pkg.target_gender === 'female'
                        ? 'Women’s Wellness'
                        : 'Men’s Health'}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through mr-1.5">₹{pkg.price}</span>
                      <span className="text-xl font-bold text-[#15965C]">₹{pkg.discounted_price}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-[#103653] leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#526273] leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Attributes Checklist */}
                  <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] text-xs space-y-2 text-[#526273]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#159FDB]" />
                        <span>Investigations Included:</span>
                      </span>
                      <span className="font-semibold text-[#182B3D]">{pkg.sample_count} Diagnostic Tests</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#159FDB]" />
                        <span>Turnaround Time:</span>
                      </span>
                      <span className="font-semibold text-[#182B3D]">{pkg.report_delivery_hours} Hours</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#159FDB]" />
                        <span>Fasting Protocol:</span>
                      </span>
                      <span className={`font-semibold ${pkg.fasting_required ? 'text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200' : 'text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200'}`}>
                        {pkg.fasting_required ? '10–12h Overnight Fasting' : 'No Fasting Needed'}
                      </span>
                    </div>
                  </div>

                  {/* Preparation Instruction Note */}
                  {pkg.preparation_instructions && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <strong>Preparation:</strong> {pkg.preparation_instructions}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E5EBEF] flex items-center gap-2">
                  <Link
                    href={`/book?package_id=${pkg.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Book Package</span>
                  </Link>
                  <a
                    href={`https://wa.me/917872957300?text=Hello%20Hiramani%20Hospital,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(pkg.name)}%20checkup%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-[#E5EBEF] bg-white hover:bg-slate-50 text-[#15965C] transition shrink-0"
                    title="Book via WhatsApp"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Corporate & Institutional Screening Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-7 rounded-xl bg-[#F4F8F5] border border-[#15965C]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#15965C]">
              <ShieldCheck className="w-4 h-4 text-[#15965C]" />
              <span>Group & Institutional Screening Programs</span>
            </div>
            <h3 className="text-base font-bold text-[#103653]">
              Organize On-Site Employee or Community Health Camps in Nadia
            </h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              We offer customized annual health checkups for schools, banks, clubs, and offices across Krishnanagar, Ranaghat, and Nabadwip. Includes sample collection team, digital health reports, and doctor consultations.
            </p>
          </div>

          <a
            href="tel:+917872957300"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#15965C] hover:bg-[#117A4A] text-white transition shadow-sm shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Desk: +91 78729 57300</span>
          </a>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Accordion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-semibold text-[#15965C]">
            Frequently Asked Questions
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Frequently Asked Questions on Health Checkups
          </h2>
        </div>

        <div className="divide-y divide-[#E5EBEF] rounded-xl border border-[#E5EBEF] bg-white">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#103653] hover:text-[#15965C] transition gap-4"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#159FDB] shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-[#15965C]' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="pt-3 pl-6 text-xs text-[#526273] leading-relaxed border-t border-slate-100 mt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
