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
  Sparkles,
  PhoneCall,
  Search,
} from 'lucide-react';
import { HealthPackage } from '@/types';

interface PackagesClientProps {
  initialPackages: HealthPackage[];
}

export function PackagesClient({ initialPackages }: PackagesClientProps) {
  const [selectedGender, setSelectedGender] = useState<'all' | 'male' | 'female'>('all');
  const [search, setSearch] = useState('');

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

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Institutional Editorial Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Preventive Health Screenings • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Preventive Health Checkup Packages
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Early detection of silent illnesses such as diabetes, hypertension, cardiac risk factors, and fatty liver disease ensures timely clinical intervention. Standardized tariffs with in-house laboratory investigations and doctor consultation included.
          </p>
        </div>
      </section>

      {/* 2. Step-by-Step Checkup Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#103653] text-white rounded-xl p-5 sm:p-7 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#159FDB]">
              Checkup Day Protocol & Instructions
            </span>
            <span className="text-xs text-slate-300">
              Sample Collection Desk: 07:30 AM – 11:30 AM (Daily)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <div className="w-6 h-6 rounded bg-[#15965C] text-white font-bold flex items-center justify-center text-xs">1</div>
              <div className="font-bold text-white text-sm">Overnight Fasting</div>
              <p className="text-slate-300">Fast for 10-12 hours prior to arrival. Water is permitted.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <div className="w-6 h-6 rounded bg-[#159FDB] text-white font-bold flex items-center justify-center text-xs">2</div>
              <div className="font-bold text-white text-sm">Sample Collection</div>
              <p className="text-slate-300">Report to Ground Floor Diagnostics Desk with your booking reference.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <div className="w-6 h-6 rounded bg-[#15965C] text-white font-bold flex items-center justify-center text-xs">3</div>
              <div className="font-bold text-white text-sm">Digital Delivery</div>
              <p className="text-slate-300">Reports available in 24 hours via WhatsApp & Patient Portal.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1">
              <div className="w-6 h-6 rounded bg-[#159FDB] text-white font-bold flex items-center justify-center text-xs">4</div>
              <div className="font-bold text-white text-sm">Doctor Consultation</div>
              <p className="text-slate-300">Complimentary physician review of all findings included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Search and Gender Filtering Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EBEF]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search package (e.g. 'Cardiac', 'Executive', 'Senior')..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E5EBEF] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#F7FAF9] p-1 rounded-lg border border-[#E5EBEF]">
            <button
              onClick={() => setSelectedGender('all')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                selectedGender === 'all'
                  ? 'bg-white text-[#103653] shadow-sm'
                  : 'text-[#526273] hover:text-[#103653]'
              }`}
            >
              All Packages
            </button>
            <button
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
        </div>

        {/* 4. Packages Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map(pkg => (
            <div
              key={pkg.id}
              className="p-5 sm:p-6 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-5 shadow-sm"
            >
              <div className="space-y-4">
                {/* Header Tag & Tariff */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-[#F4F8F5] text-[#15965C] border border-[#15965C]/20">
                    {pkg.target_gender === 'all'
                      ? 'Universal Package'
                      : pkg.target_gender === 'female'
                      ? 'Women Wellness'
                      : 'Men Health'}
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

                {/* Key Attributes */}
                <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] text-xs space-y-2 text-[#526273]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#159FDB]" />
                      <span>Report Delivery:</span>
                    </span>
                    <span className="font-semibold text-[#182B3D]">{pkg.report_delivery_hours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-[#159FDB]" />
                      <span>Fasting:</span>
                    </span>
                    <span className={`font-semibold ${pkg.fasting_required ? 'text-amber-700' : 'text-[#182B3D]'}`}>
                      {pkg.fasting_required ? 'Overnight Required' : 'Not Required'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#159FDB]" />
                      <span>Investigations:</span>
                    </span>
                    <span className="font-semibold text-[#182B3D]">{pkg.sample_count} Diagnostic Tests</span>
                  </div>
                </div>

                {/* Instructions */}
                {pkg.preparation_instructions && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Note:</strong> {pkg.preparation_instructions}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#E5EBEF]">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reserve Health Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Corporate & Institutional Advisory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#F4F8F5] border border-[#15965C]/20 text-xs text-[#526273] space-y-2">
          <div className="font-bold text-sm text-[#103653] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15965C]" />
            <span>Complimentary Physician Consultation Included</span>
          </div>
          <p className="leading-relaxed">
            All preventive checkup packages include a post-investigation clinical review with our Senior Consultant Physician to interpret lab findings and advise lifestyle or pharmacological recommendations. For corporate, institutional, or family group checkup bookings in Nadia district, contact our hospital desk at <strong>+91 78729 57300</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
