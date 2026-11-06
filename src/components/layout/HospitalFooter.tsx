'use client';

import React from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  CheckCircle2,
  CalendarCheck,
  Building2,
  Navigation,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function HospitalFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP 24X7 EMERGENCY CALLOUT STRIP                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-red-950/80 border-b border-red-900/40 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 border border-red-500/30 shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-white font-extrabold text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
                <span>{t.emergency_title}</span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Always Open
                </span>
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Round-the-clock emergency casualty, critical care ICU resuscitation, and rapid ambulance dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-red-950/60 transition group"
            >
              <PhoneCall className="w-4 h-4 text-white group-hover:scale-110 transition" />
              <span>Emergency Hotline: {t.emergency_hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN 4-COLUMN FOOTER CONTENT                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Hospital Identity & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-full overflow-hidden bg-white p-0.5 border-2 border-[#159FDB] shadow-md shrink-0">
                <img
                  src="/logo.png"
                  alt="Hiramani Memorial Hospital"
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">Hiramani Memorial</span>
                <span className="block text-xs font-semibold text-[#159FDB]">Hospital • Krishnanagar, Nadia</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Hiramani Memorial Hospital is a multi-speciality clinical healthcare institution committed to medical excellence,
              compassionate healing, modern diagnostic technology, and transparent ethical patient care.
            </p>

            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>Govt. Regd Clinical Establishment (WB CEA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>24x7 In-House Pathology, Radiology & Pharmacy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>Modern Modular Operation Theatres & ICU</span>
              </div>
            </div>
          </div>

          {/* Column 2: Patient Services & Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/book" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{t.nav_book_appointment}</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{t.nav_doctors} & OPD Schedule</span>
                </Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{t.nav_diagnostics}</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{t.nav_packages}</span>
                </Link>
              </li>
              <li>
                <Link href="/patient-info" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Admission & Inpatient Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Cashless Mediclaim & TPA Desk</span>
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition flex items-center gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>WhatsApp MediConnect Assistant</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Specialities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Clinical Specialities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  General Medicine & Diabetology
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  Cardiology & Preventive Heart Care
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  Orthopaedics & Joint Replacement
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  Dermatology & Cosmetology
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  Paediatrics & Neonatal Care
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  Gynaecology & High-Risk Obstetrics
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  ENT (Otolaryngology) & Head-Neck
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-white transition">
                  General & Laparoscopic Surgery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Verified Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-relaxed">
                  40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-slate-300">
                    <span className="text-slate-400">Reception & OPD:</span>{' '}
                    <a href="tel:+917872957300" className="hover:text-white font-semibold">
                      +91 78729 57300
                    </a>
                  </div>
                  <div className="text-amber-400 font-bold">
                    <span>24x7 Emergency:</span>{' '}
                    <a href="tel:+917501074392" className="hover:underline">
                      +91 75010 74392
                    </a>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-400">Helpline / Ambulance:</span>{' '}
                    <a href="tel:+916294545225" className="hover:text-white font-semibold">
                      +91 62945 45225
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#159FDB] shrink-0" />
                <span className="text-slate-300">info@hiramani.co.in</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-300">Casualty & ICU: 24 Hours / 7 Days</div>
                  <div className="text-slate-400">OPD Chamber: Mon - Sat (8 AM - 8 PM)</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full bg-[#15965C] hover:bg-[#0E7444] text-white font-bold py-2.5 px-3 rounded-lg text-xs transition shadow-sm"
                >
                  <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
                  <span>{t.nav_book_appointment}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. CLINICAL EMERGENCY DISCLAIMER                                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-12 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Medical Emergency Notice</span>
            </div>
            <p>{t.emergency_disclaimer}</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 4. COPYRIGHT & LEGAL REGULATORY STRIP                               */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hiramani Memorial Hospital. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition">About Hospital</Link>
            <Link href="/contact" className="hover:text-slate-400 transition">Contact & Location</Link>
            <Link href="/patient-info" className="hover:text-slate-400 transition">Patient Charter</Link>
            <Link href="/login" className="hover:text-slate-400 transition">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
