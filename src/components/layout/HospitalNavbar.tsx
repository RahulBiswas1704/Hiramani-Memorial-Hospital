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
  Stethoscope,
  Globe,
  ChevronDown,
  MessageCircle,
  AlertTriangle,
  User,
  ShieldCheck,
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
    { href: '/news', label: t.nav_news },
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
      {/* 1. TOP EMERGENCY & UTILITY BAR (Desktop & Mobile)                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#0a3457] text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Emergency Hotline Contact */}
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition group"
              title="Call 24x7 Emergency Casualty"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              <PhoneCall className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition" />
              <span>{t.emergency_title}:</span>
              <span className="underline decoration-amber-400 font-extrabold tracking-wide">
                {t.emergency_hotline}
              </span>
            </a>

            <span className="hidden md:inline-block text-slate-400">|</span>

            <span className="hidden md:inline-flex items-center gap-1 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-sky-300" />
              <span>{t.hospital_timings}</span>
            </span>

            <span className="hidden lg:inline-block text-slate-400">|</span>

            <span className="hidden lg:inline-flex items-center gap-1 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-teal-300" />
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
                className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-md text-xs font-semibold transition"
                aria-label="Select Language"
              >
                <Globe className="w-3 h-3 text-sky-200" />
                <span>{currentLangLabel}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
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
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-sky-50 transition flex items-center justify-between ${
                        language === l.code ? 'text-[#0e4a7b] font-bold bg-sky-50/70' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.native}</span>
                      {language === l.code && <span className="w-1.5 h-1.5 rounded-full bg-[#0e4a7b]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Portal Link */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs text-sky-200 hover:text-white px-2 py-1 rounded transition"
            >
              <User className="w-3 h-3" />
              <span className="hidden sm:inline">{t.nav_patient_portal}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN BRAND & NAVIGATION HEADER                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Hospital Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-teal-500 shadow-md group-hover:scale-105 transition shrink-0 p-0.5">
              <img
                src="/logo.png"
                alt="Hiramani Memorial Hospital Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold text-[#0e4a7b] tracking-tight leading-tight group-hover:text-[#0b3459] transition">
                Hiramani Memorial Hospital
              </span>
              <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                <span>Multi-Speciality Healthcare</span>
                <span className="text-teal-600 font-bold">• Krishnanagar, Nadia (PIN-741101)</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 text-sm font-semibold text-slate-700">
            {navLinks.slice(0, 7).map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition py-1 border-b-2 ${
                    isActive
                      ? 'border-[#0e4a7b] text-[#0e4a7b] font-bold'
                      : 'border-transparent hover:text-[#0e4a7b] hover:border-sky-300'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* More Links Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 py-1 text-slate-700 hover:text-[#0e4a7b] transition font-semibold"
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 hidden group-hover:block z-50">
                {navLinks.slice(7).map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0e4a7b] transition"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-slate-100 my-1" />
                <Link
                  href="/careers"
                  className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0e4a7b] transition"
                >
                  {t.nav_careers}
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#0e4a7b] transition"
                >
                  Staff ERP Dashboard
                </Link>
              </div>
            </div>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
              title="Launch WhatsApp Bot Simulator"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.nav_whatsapp}</span>
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0e4a7b] to-[#0d9488] hover:from-[#0b3459] hover:to-[#0f766e] shadow-md shadow-sky-950/10 hover:shadow-lg transition group"
            >
              <CalendarCheck className="w-4 h-4 text-white group-hover:scale-110 transition" />
              <span>{t.nav_book_appointment}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/book"
              className="inline-flex items-center gap-1 bg-[#0e4a7b] text-white text-xs font-bold px-3 py-2 rounded-lg"
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
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MOBILE RESPONSIVE DRAWER                                        */}
      {/* ------------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-4 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Emergency Quick Call Banner in Mobile */}
          <a
            href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
            className="flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-200 text-red-900"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping inline-block" />
              <div>
                <div className="text-xs font-bold text-red-800">{t.emergency_title}</div>
                <div className="text-sm font-extrabold text-red-900">{t.emergency_hotline}</div>
              </div>
            </div>
            <PhoneCall className="w-5 h-5 text-red-700" />
          </a>

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
                      ? 'bg-sky-50 text-[#0e4a7b] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.nav_careers}
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>Hospital Staff ERP</span>
            </Link>
          </nav>

          {/* Mobile CTAs */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0e4a7b] to-[#0d9488]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav_book_appointment}</span>
            </Link>

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t.nav_whatsapp}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

