'use client';

import React from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
  HeartPulse,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function HospitalFooter() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP 24X7 EMERGENCY STRIP                                        */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-900/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 border border-red-500/30 shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-white font-extrabold text-sm sm:text-base flex items-center justify-center md:justify-start gap-2">
                <span>{t.emergency_title}</span>
                <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Always Open
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Round-the-clock casualty, ICU resuscitation, critical care, and rapid ambulance dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-red-900/40 transition group"
            >
              <PhoneCall className="w-4 h-4 text-white group-hover:scale-110 transition" />
              <span>Call Emergency: {t.emergency_hotline}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN 4-COLUMN FOOTER CONTENT                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Hospital Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-teal-500 shadow-md shrink-0">
                <img
                  src="/logo.png"
                  alt="Hiramani Memorial Hospital"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight">Hiramani Memorial</span>
                <span className="block text-xs font-semibold text-teal-400">Hospital • Krishnanagar, Nadia</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Hiramani Memorial Hospital is a multi-speciality healthcare institution committed to clinical excellence,
              compassionate patient care, modern diagnostic capabilities, and transparent medical ethics.
            </p>

            <div className="pt-2 text-xs space-y-1 text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>Govt. Regd Clinical Establishment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                <span>24x7 In-House Pathology & Pharmacy</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/doctors" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>{t.nav_doctors} Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Medical Specialities</span>
                </Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Diagnostics & Lab Investigations</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Preventive Health Packages</span>
                </Link>
              </li>
              <li>
                <Link href="/patient-info" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Admission & Visiting Hours</span>
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Cashless Mediclaim & TPA Desk</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Hospital Notices & Advisories</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-400 transition flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-teal-500" />
                  <span>Careers & Nursing Openings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Specialities */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Clinical Specialities
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/departments/general-medicine" className="hover:text-teal-400 transition">
                  General Medicine & Diabetology
                </Link>
              </li>
              <li>
                <Link href="/departments/cardiology" className="hover:text-teal-400 transition">
                  Cardiology & 2D Echo
                </Link>
              </li>
              <li>
                <Link href="/departments/orthopaedics" className="hover:text-teal-400 transition">
                  Orthopaedics & Joint Replacement
                </Link>
              </li>
              <li>
                <Link href="/departments/gynaecology-and-obstetrics" className="hover:text-teal-400 transition">
                  Gynaecology & Obstetrics
                </Link>
              </li>
              <li>
                <Link href="/departments/paediatrics" className="hover:text-teal-400 transition">
                  Paediatrics & Neonatology
                </Link>
              </li>
              <li>
                <Link href="/departments/ent" className="hover:text-teal-400 transition">
                  ENT (Ear, Nose & Throat)
                </Link>
              </li>
              <li>
                <Link href="/departments/general-surgery" className="hover:text-teal-400 transition">
                  General & Laparoscopic Surgery
                </Link>
              </li>
              <li>
                <Link href="/departments/dermatology" className="hover:text-teal-400 transition">
                  Dermatology & Cosmetology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-slate-300">
                    <span className="text-slate-400">Reception:</span>{' '}
                    <a href="tel:+917872957300" className="hover:text-teal-400 font-semibold">
                      +91 78729 57300
                    </a>
                  </div>
                  <div className="text-amber-400 font-bold">
                    <span>Emergency:</span>{' '}
                    <a href="tel:+917501074392" className="hover:underline">
                      +91 75010 74392
                    </a>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-slate-400">Helpline:</span>{' '}
                    <a href="tel:+916294545225" className="hover:text-teal-400 font-semibold">
                      +91 62945 45225
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">info@hiramani.co.in</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-300">Emergency & ICU: 24 Hours / 7 Days</div>
                  <div className="text-slate-400">OPD Chamber: Mon - Sat (8 AM - 8 PM)</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition"
                >
                  {t.nav_book_appointment}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. CLINICAL EMERGENCY DISCLAIMER                                   */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-12 pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>Medical Disclaimer</span>
            </div>
            <p>{t.emergency_disclaimer}</p>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 4. COPYRIGHT & ATTRIBUTION                                         */}
        {/* ------------------------------------------------------------------ */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Hiramani Memorial Hospital. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/patient-info" className="hover:text-slate-200 transition">
              Patient Charter
            </Link>
            <Link href="/insurance" className="hover:text-slate-200 transition">
              TPA Desk
            </Link>
            <Link href="/contact" className="hover:text-slate-200 transition">
              Helpdesk
            </Link>
            <Link href="/login" className="hover:text-slate-200 transition">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

