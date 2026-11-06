'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  PhoneCall,
  Clock,
  MapPin,
  CalendarCheck,
  Menu,
  X,
  Globe,
  ChevronDown,
  MessageCircle,
  User,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { useLanguage, Language } from '@/lib/i18n/LanguageContext';

export function HospitalNavbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.nav_home },
    { href: '/about', label: t.nav_about },
    { href: '/doctors', label: t.nav_doctors },
    { href: '/departments', label: t.nav_departments },
    { href: '/diagnostics', label: t.nav_diagnostics },
    { href: '/packages', label: t.nav_packages },
    { href: '/patient-info', label: t.nav_patient_info },
    { href: '/insurance', label: t.nav_insurance },
    { href: '/contact', label: t.nav_contact },
  ];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.native || 'English';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP UTILITY & EMERGENCY BANNER                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#0B3D2A] text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#082C1E]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Emergency Hotline Contact */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition group"
              title="Call 24x7 Emergency Casualty"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              <PhoneCall className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition" />
              <span className="text-white/90">{t.emergency_title}:</span>
              <span className="underline decoration-amber-400 font-extrabold tracking-wide text-amber-300">
                {t.emergency_hotline}
              </span>
            </a>

            <span className="hidden md:inline-block text-white/30">|</span>

            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-100">
              <Clock className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.hospital_timings}</span>
            </span>

            <span className="hidden lg:inline-block text-white/30">|</span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-emerald-100">
              <MapPin className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.hospital_address_short}</span>
            </span>
          </div>

          {/* Right Utilities: Portal Login & Language Selector */}
          <div className="flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-300" />
                <span>{currentLangLabel}</span>
                <ChevronDown className="w-3 h-3 text-emerald-200" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-32 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1 z-50"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  {languages.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-emerald-50 transition flex items-center justify-between ${
                        language === l.code ? 'text-[#15965C] font-bold bg-emerald-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#15965C]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Portal Link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-100 hover:text-white px-2 py-1 rounded transition"
            >
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline font-medium">{t.nav_patient_portal}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN BRAND & NAVIGATION HEADER                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Hospital Logo & Typography */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-[#159FDB] shadow-sm group-hover:scale-105 transition shrink-0 p-0.5">
              <img
                src="/logo.png"
                alt="Hiramani Memorial Hospital Official Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-none group-hover:text-[#15965C] transition whitespace-nowrap">
                Hiramani Memorial Hospital
              </span>
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 mt-1 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15965C] inline-block" />
                <span className="text-[#15965C] font-semibold">Krishnanagar, Nadia</span>
                <span>• W.B. (741101)</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1.5 border-b-2 transition ${
                    isActive
                      ? 'border-[#15965C] text-[#15965C] font-bold'
                      : 'border-transparent hover:text-[#15965C] hover:border-emerald-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: WhatsApp + Book Appointment */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#15965C] border border-emerald-200 px-3.5 py-2 rounded-lg text-xs font-bold transition shadow-sm"
              title="Launch WhatsApp OPD Chamber Bot"
            >
              <MessageCircle className="w-4 h-4 text-[#15965C]" />
              <span>{t.nav_whatsapp}</span>
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[#15965C] hover:bg-[#0E7444] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition shadow-sm hover:shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav_book_appointment}</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              href="/book"
              className="sm:hidden inline-flex items-center gap-1.5 bg-[#15965C] text-white px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MOBILE RESPONSIVE DRAWER                                        */}
      {/* ------------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Emergency Quick Call Banner in Mobile */}
          <a
            href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
            className="flex items-center justify-between p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping inline-block" />
              <div>
                <div className="text-xs font-bold text-red-800">{t.emergency_title}</div>
                <div className="text-sm font-extrabold text-red-900">{t.emergency_hotline}</div>
              </div>
            </div>
            <PhoneCall className="w-5 h-5 text-red-700" />
          </a>

          {/* Language Selector Pills in Mobile */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#15965C]" />
              <span>Language / ভাষা</span>
            </span>
            <div className="flex items-center gap-1">
              {languages.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                    language === l.code ? 'bg-[#15965C] text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Link List */}
          <nav className="grid grid-cols-1 gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-50 text-[#15965C] font-bold border-l-4 border-[#15965C]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-3">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-emerald-50 text-[#15965C] border border-emerald-200 py-2.5 px-3 rounded-xl text-xs font-bold text-center"
            >
              <MessageCircle className="w-4 h-4 text-[#15965C]" />
              <span>{t.nav_whatsapp}</span>
            </Link>

            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-[#15965C] text-white py-2.5 px-3 rounded-xl text-xs font-bold text-center"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav_book_appointment}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
