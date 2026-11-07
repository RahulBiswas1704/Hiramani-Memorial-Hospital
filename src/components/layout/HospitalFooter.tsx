'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <footer className="bg-[#103653] text-slate-300 border-t border-[#0d2d46]">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP 24X7 EMERGENCY CALLOUT STRIP                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#DC2626]/10 border-b border-[#DC2626]/20 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="text-white font-bold">{t.emergency_title}:</span>{' '}
              <span className="text-slate-300">
                24x7 Casualty, Critical Care Resuscitation, and Rapid Ambulance Dispatch.
              </span>
            </div>
          </div>

          <a
            href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-bold px-4 py-2 rounded-lg transition shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency: {t.emergency_hotline}</span>
          </a>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN 4-COLUMN FOOTER CONTENT                                    */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Hospital Identity & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-[#159FDB] shrink-0 relative">
                <Image
                  src="/logo.png"
                  alt="Hiramani Memorial Hospital"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-base font-bold text-white block">Hiramani Memorial Hospital</span>
                <span className="text-xs text-[#159FDB] block">Krishnanagar, Nadia • W.B. (741101)</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Established multi-speciality hospital delivering ethical clinical care, advanced diagnostics, and compassionate healing to the residents of Krishnanagar, Nadia, and surrounding districts.
            </p>

            <div className="text-xs space-y-1.5 text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Govt. Regd Clinical Establishment (WB CEA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>In-House Automated Pathology & Radiology</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Laminar Flow Operation Theatres & ICU</span>
              </div>
            </div>
          </div>

          {/* Column 2: Patient Services & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/book" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>{t.nav_book_appointment}</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>{t.nav_doctors} & OPD Schedule</span>
                </Link>
              </li>
              <li>
                <Link href="/diagnostics" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>{t.nav_diagnostics} & Tariffs</span>
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>{t.nav_packages}</span>
                </Link>
              </li>
              <li>
                <Link href="/patient-info" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>Admission & Inpatient Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>Cashless Mediclaim Desk</span>
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition flex items-center gap-1.5 text-slate-300">
                  <span className="text-[#15965C]">›</span>
                  <span>WhatsApp MediConnect Bot</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Specialities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Clinical Specialities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/departments" className="hover:text-white transition">General Medicine & Diabetology</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Cardiology & Echo Doppler</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Orthopaedics & Joint Care</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Paediatrics & Child Health</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Gynaecology & Maternity Care</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">ENT & Micro-endoscopy</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">General & Laparoscopic Surgery</Link></li>
              <li><Link href="/departments" className="hover:text-white transition">Dermatology & Skin Care</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Verified Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Hospital Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span>40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia - 741101</span>
              </div>

              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div>Reception: <a href="tel:+917872957300" className="hover:text-white font-semibold">+91 78729 57300</a></div>
                  <div className="text-amber-300 font-semibold">24x7 Casualty: <a href="tel:+917501074392" className="hover:underline">+91 75010 74392</a></div>
                  <div>Ambulance: <a href="tel:+916294545225" className="hover:text-white font-semibold">+91 62945 45225</a></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#159FDB] shrink-0" />
                <a href="mailto:info@hiramani.co.in" className="hover:text-white">info@hiramani.co.in</a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <div>
                  <div>Casualty: 24 Hours / 7 Days</div>
                  <div>OPD Chambers: Mon - Sat (8 AM - 8 PM)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Disclaimer */}
        <div className="mt-10 pt-5 border-t border-white/10 text-xs text-slate-400 leading-relaxed">
          <p>{t.emergency_disclaimer}</p>
        </div>

        {/* Copyright & Links */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Hiramani Memorial Hospital. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-white transition">About</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <Link href="/patient-info" className="hover:text-white transition">Patient Guide</Link>
            <Link href="/login" className="hover:text-white transition">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
