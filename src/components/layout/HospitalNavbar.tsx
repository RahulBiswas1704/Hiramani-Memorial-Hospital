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
    { href: '/departments', label: 'Specialities' },
    { href: '/diagnostics', label: t.nav_diagnostics },
    { href: '/packages', label: 'Packages' },
    { href: '/patient-info', label: t.nav_patient_info },
    { href: '/insurance', label: 'Cashless TPA' },
    { href: '/contact', label: t.nav_contact },
  ];

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.native || 'English';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5EBEF] shadow-sm">
      {/* ------------------------------------------------------------------ */}
      {/* 1. INSTITUTIONAL TOP BAR                                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#103653] text-white text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-[#0d2d46]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 min-w-0">
          {/* Emergency Hotline Contact */}
          <div className="flex items-center gap-2 sm:gap-4 truncate min-w-0">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold text-amber-300 hover:text-white transition shrink-0"
              title="Call 24x7 Emergency Casualty"
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse shrink-0" />
              <PhoneCall className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden xs:inline text-white/90">{t.emergency_title}:</span>
              <span className="font-bold tracking-wide text-amber-300">{t.emergency_hotline}</span>
            </a>

            <span className="hidden md:inline-block text-white/30">|</span>

            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-200 truncate">
              <Clock className="w-3.5 h-3.5 text-[#159FDB] shrink-0" />
              <span className="truncate">{t.hospital_timings}</span>
            </span>

            <span className="hidden lg:inline-block text-white/30">|</span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-200 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#159FDB] shrink-0" />
              <span className="truncate">Nediarpara, Krishnanagar - 741101</span>
            </span>
          </div>

          {/* Right Utilities: Portal Login & Language Selector */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-2 sm:px-2.5 py-1 rounded text-xs font-medium transition"
                aria-label="Select Language"
              >
                <Globe className="w-3 h-3 text-[#159FDB]" />
                <span>{currentLangLabel}</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {langDropdownOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-32 bg-white text-[#182B3D] rounded-lg shadow-xl border border-[#E5EBEF] py-1 z-50"
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
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[#F4F8F5] transition flex items-center justify-between ${
                        language === l.code ? 'text-[#15965C] font-bold bg-[#F4F8F5]' : 'text-[#182B3D]'
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
              className="inline-flex items-center gap-1 text-xs text-white/90 hover:text-white px-1.5 sm:px-2 py-1 rounded transition"
            >
              <User className="w-3.5 h-3.5 text-[#159FDB]" />
              <span className="hidden sm:inline font-medium">{t.nav_patient_portal}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN BRAND & NAVIGATION HEADER                                  */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 min-w-0 gap-2">
          {/* Official Hospital Logo & Typography */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white border border-[#159FDB] shadow-sm shrink-0 p-0.5">
              <img
                src="/logo.png"
                alt="Hiramani Memorial Hospital Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-[#182B3D] tracking-tight leading-none group-hover:text-[#15965C] transition">
                <span className="hidden xs:inline">Hiramani Memorial Hospital</span>
                <span className="xs:hidden">Hiramani Hospital</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#526273] flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15965C] inline-block shrink-0" />
                <span className="text-[#15965C] font-semibold">Krishnanagar</span>
                <span className="hidden sm:inline text-slate-400">• Nadia, WB</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-4 text-xs 2xl:text-sm font-semibold text-[#182B3D]">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1.5 border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-[#15965C] text-[#15965C] font-bold'
                      : 'border-transparent text-[#526273] hover:text-[#15965C]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs: WhatsApp + Book Appointment */}
          <div className="hidden sm:flex items-center gap-1.5 2xl:gap-2.5 shrink-0">
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-[#F4F8F5] hover:bg-[#E8F5EE] text-[#15965C] border border-[#15965C]/30 px-2.5 2xl:px-3 py-2 rounded-lg text-xs font-bold transition shadow-sm"
              title="Launch WhatsApp OPD Chamber Bot"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#15965C]" />
              <span className="hidden 2xl:inline">{t.nav_whatsapp}</span>
              <span className="2xl:hidden">WhatsApp</span>
            </Link>

            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 bg-[#15965C] hover:bg-[#117A4A] text-white px-2.5 2xl:px-3.5 py-2 rounded-lg text-xs font-bold transition shadow-sm hover:shadow-md"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">{t.nav_book_appointment}</span>
              <span className="2xl:hidden">Book OPD</span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-1.5 xl:hidden shrink-0">
            <Link
              href="/book"
              className="hidden xs:inline-flex items-center gap-1 bg-[#15965C] hover:bg-[#117A4A] text-white px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg text-[#182B3D] hover:bg-slate-100 transition focus:outline-none flex items-center justify-center border border-[#E5EBEF]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#182B3D]" /> : <Menu className="w-5 h-5 text-[#182B3D]" />}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MOBILE SLIDE-DOWN NAVIGATION DRAWER                             */}
      {/* ------------------------------------------------------------------ */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E5EBEF] bg-white px-4 py-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Quick Action Buttons in Mobile Drawer */}
          <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-[#E5EBEF]">
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t.nav_book_appointment}</span>
            </Link>

            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-xs font-bold text-[#15965C] bg-[#F4F8F5] border border-[#15965C]/30 hover:bg-[#E8F5EE]"
            >
              <MessageCircle className="w-4 h-4 text-[#15965C]" />
              <span>{t.nav_whatsapp}</span>
            </Link>
          </div>

          {/* Navigation Links List */}
          <nav className="flex flex-col space-y-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                    isActive
                      ? 'bg-[#F4F8F5] text-[#15965C] font-bold'
                      : 'text-[#182B3D] hover:bg-slate-50 hover:text-[#15965C]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#15965C]" />}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Footer Info & Emergency Calling */}
          <div className="pt-4 border-t border-[#E5EBEF] space-y-3">
            <a
              href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
              className="w-full py-3 px-4 rounded-lg bg-[#FEF2F2] border border-[#DC2626]/30 text-[#DC2626] font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              <PhoneCall className="w-4 h-4 text-[#DC2626]" />
              <span>{t.emergency_title}: {t.emergency_hotline}</span>
            </a>

            <div className="text-xs text-[#526273] px-2 space-y-1">
              <div className="font-semibold text-[#182B3D]">Hiramani Memorial Hospital</div>
              <div>40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia - 741101</div>
              <div className="text-[11px] text-[#15965C] font-semibold pt-1">
                Reception: +91 78729 57300 • Emergency: +91 75010 74392
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
