'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  CalendarCheck,
  PhoneCall,
  Search,
  MessageCircle,
  Activity,
  HeartPulse,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  Users,
  Baby,
  Bone,
  Eye,
  Scissors,
  Microscope,
  FileText,
  BadgeAlert,
  Building2,
  Syringe,
} from 'lucide-react';
import { Doctor, Department, HealthPackage, DiagnosticTest, CMSAnnouncement } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface HomeClientProps {
  initialDoctors: Doctor[];
  initialDepartments: Department[];
  initialHealthPackages: HealthPackage[];
  initialDiagnosticTests: DiagnosticTest[];
  initialAnnouncements: CMSAnnouncement[];
}

// Icon mapping helper for departments
const DEPARTMENT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-6 h-6 text-teal-600" />,
  'cardiology': <HeartPulse className="w-6 h-6 text-rose-600" />,
  'orthopaedics': <Bone className="w-6 h-6 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-6 h-6 text-pink-600" />,
  'paediatrics': <Baby className="w-6 h-6 text-sky-600" />,
  'ent': <Eye className="w-6 h-6 text-purple-600" />,
  'general-surgery': <Scissors className="w-6 h-6 text-indigo-600" />,
  'dermatology': <Sparkles className="w-6 h-6 text-emerald-600" />,
  'GENMED': <Activity className="w-6 h-6 text-teal-600" />,
  'CARDIO': <HeartPulse className="w-6 h-6 text-rose-600" />,
  'ORTHO': <Bone className="w-6 h-6 text-amber-600" />,
  'GYNAEC': <Users className="w-6 h-6 text-pink-600" />,
  'PAED': <Baby className="w-6 h-6 text-sky-600" />,
  'ENT': <Eye className="w-6 h-6 text-purple-600" />,
  'SURG': <Scissors className="w-6 h-6 text-indigo-600" />,
  'DERMA': <Sparkles className="w-6 h-6 text-emerald-600" />,
};

export function HomeClient({
  initialDoctors,
  initialDepartments,
  initialHealthPackages,
  initialDiagnosticTests,
  initialAnnouncements,
}: HomeClientProps) {
  const { t, language } = useLanguage();

  // Search & Filter state for Doctors
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState('');

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter(doc => {
      const matchSearch =
        !doctorSearch ||
        doc.full_name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(doctorSearch.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(doctorSearch.toLowerCase());
      const matchDept = !selectedDeptId || doc.department_id === selectedDeptId;
      return matchSearch && matchDept;
    });
  }, [initialDoctors, doctorSearch, selectedDeptId]);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO SECTION                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>{t.hero_tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {t.hero_title_prefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0e4a7b] to-[#0d9488]">
                  {t.hero_title_highlight}
                </span>
                {t.hero_title_suffix}
              </h1>

              {/* Supporting Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.hero_subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#0e4a7b] to-[#0d9488] hover:from-[#0b3459] hover:to-[#0f766e] shadow-lg shadow-sky-900/15 hover:shadow-xl transition group"
                >
                  <CalendarCheck className="w-5 h-5 group-hover:scale-110 transition" />
                  <span>{t.cta_book_opd}</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/doctors"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#0e4a7b] bg-white border-2 border-slate-200 hover:border-[#0e4a7b] hover:bg-sky-50/50 shadow-sm transition"
                >
                  <Stethoscope className="w-5 h-5 text-[#0e4a7b]" />
                  <span>{t.cta_explore_doctors}</span>
                </Link>

                <a
                  href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition"
                  title="24x7 Emergency Desk"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>{t.cta_emergency_call}</span>
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>24x7 Emergency Desk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>50+ Top Consultants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Digital Lab & X-Ray</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Bilingual WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Right Card / Clinical Visual Highlight */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0e4a7b] flex items-center justify-center text-white shadow-md">
                      <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Hospital OPD Chamber</h2>
                      <p className="text-xs text-slate-500">Walk-in & Confirmed Bookings</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                    Live OPD
                  </span>
                </div>

                {/* Quick Info Points */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Clock className="w-4 h-4 text-[#0e4a7b] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800">OPD Chamber Hours</div>
                      <div className="text-slate-500">Monday – Saturday: 08:00 AM – 08:00 PM</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800">Emergency & Ambulance</div>
                      <div className="text-slate-500">24 Hours / 365 Days continuous coverage</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-800">Cashless Insurance Desk</div>
                      <div className="text-slate-500">Assistance for Star Health, Medi Assist, TPAs</div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp MediConnect CTA inside Hero Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                      Smart Healthcare
                    </span>
                    <MessageCircle className="w-4 h-4 text-emerald-200" />
                  </div>
                  <h3 className="text-sm font-extrabold leading-snug">
                    Book on WhatsApp in 60 Seconds
                  </h3>
                  <p className="text-[11px] text-emerald-100 leading-relaxed">
                    Chat in Bengali or English to view available doctor slots, fees, and get instant booking reference.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/chat"
                      className="inline-flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-extrabold px-3 py-1.5 rounded-lg transition shadow-sm"
                    >
                      <span>Try WhatsApp Simulator</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. QUICK ACCESS CARDS (6 PILLARS)                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: Find Doctor */}
          <Link
            href="/doctors"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-[#0e4a7b] transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0e4a7b] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0e4a7b] group-hover:text-white transition">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0e4a7b] transition">
                {t.quick_find_doctor}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.quick_find_doctor_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-[#0e4a7b] group-hover:translate-x-1 transition">
              <span>Search Specialists</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 2: Book OPD */}
          <Link
            href="/book"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-teal-600 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition">
                {t.quick_book_opd}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.quick_book_opd_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-teal-700 group-hover:translate-x-1 transition">
              <span>Reserve Slot Now</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 3: Diagnostics */}
          <Link
            href="/diagnostics"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-indigo-600 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition">
                {t.quick_diagnostics}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.quick_diagnostics_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition">
              <span>Explore Test Catalog</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 4: Health Packages */}
          <Link
            href="/packages"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-amber-600 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition">
                {t.quick_packages}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.quick_packages_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-amber-700 group-hover:translate-x-1 transition">
              <span>View Packages</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 5: WhatsApp MediConnect */}
          <Link
            href="/chat"
            className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-xl hover:border-emerald-600 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                {t.quick_whatsapp}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.quick_whatsapp_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>Launch Bot Simulator</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Card 6: Emergency & Trauma */}
          <a
            href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
            className="group p-6 rounded-2xl bg-red-50/80 border border-red-200 shadow-md hover:shadow-xl hover:border-red-600 transition duration-200 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-red-950 group-hover:text-red-700 transition">
                {t.quick_emergency}
              </h3>
              <p className="text-xs text-red-800/80 leading-relaxed">
                {t.quick_emergency_desc}
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-bold text-red-700 group-hover:translate-x-1 transition">
              <span>Direct Emergency Helpline</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ABOUT HOSPITAL SECTION                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                About Hiramani Memorial Hospital
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Dedicated to Clinical Excellence and Compassionate Patient Healing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Situated in Krishnanagar, Nadia (W.B. PIN-741101), Hiramani Memorial Hospital was established to deliver world-class medical
                care at affordable costs. With a patient-centric philosophy, our hospital combines experienced senior consultants,
                dedicated nursing staff, modern diagnostics, and an advanced modular operating theatre to serve the community.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600" />
                    <span>Patient-Centric Care</span>
                  </div>
                  <p className="text-slate-500">
                    Transparent consultation fees, zero hidden diagnostic charges, and compassionate care.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#0e4a7b]" />
                    <span>Advanced Facilities</span>
                  </div>
                  <p className="text-slate-500">
                    Modern ICU, Digital X-Ray, 2D Echocardiography, and fully equipped pathology laboratory.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0e4a7b] hover:text-[#0b3459] transition"
                >
                  <span>Read Full Hospital Profile & Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Hospital Metrics Pillar */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-[#0e4a7b]">50+</div>
                <div className="text-xs font-bold text-slate-700">Senior Doctors</div>
                <div className="text-[11px] text-slate-400">Across 15+ specialities</div>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-teal-600">24x7</div>
                <div className="text-xs font-bold text-slate-700">Emergency & ICU</div>
                <div className="text-[11px] text-slate-400">Always prepared for trauma</div>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-indigo-600">100+</div>
                <div className="text-xs font-bold text-slate-700">Diagnostic Tests</div>
                <div className="text-[11px] text-slate-400">Pathology, ECG & Scans</div>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-2">
                <div className="text-3xl sm:text-4xl font-black text-emerald-600">50K+</div>
                <div className="text-xs font-bold text-slate-700">Patients Healed</div>
                <div className="text-[11px] text-slate-400">Trusted in South 24 Pgs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. MEDICAL SPECIALITIES SECTION                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Centres of Clinical Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_specialities_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.section_specialities_subtitle}
            </p>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e4a7b] hover:text-[#0b3459] transition"
          >
            <span>{t.view_all_departments}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialDepartments.slice(0, 8).map(dept => {
            const icon = DEPARTMENT_ICONS[dept.code] || <Activity className="w-6 h-6 text-teal-600" />;
            return (
              <Link
                key={dept.id}
                href={`/departments/${dept.code}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0e4a7b] hover:shadow-lg transition duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition">
                    {icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0e4a7b] transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {dept.description || 'Specialized outpatient consultations, diagnosis and inpatient care.'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-teal-700 pt-2 border-t border-slate-100">
                  <span>Explore Speciality</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FIND A DOCTOR INTERACTIVE SEARCH & DIRECTORY PREVIEW            */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-r from-[#0e4a7b] to-[#0a3457] rounded-3xl p-8 sm:p-10 text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
              Verified Specialist Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.section_doctors_title}
            </h2>
            <p className="text-xs sm:text-sm text-sky-100">
              {t.section_doctors_subtitle}
            </p>
          </div>

          {/* Search Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
            <div className="sm:col-span-7 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search doctor name, degrees (MD, MS), or condition..."
                value={doctorSearch}
                onChange={e => setDoctorSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-inner"
              />
            </div>

            <div className="sm:col-span-5">
              <select
                value={selectedDeptId}
                onChange={e => setSelectedDeptId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">All Clinical Departments</option>
                {initialDepartments.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doctor Results Cards */}
        {filteredDoctors.length === 0 ? (
          <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <Stethoscope className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No doctors match your search</h4>
            <p className="text-xs text-slate-500">
              Try searching for a different keyword or view all departments.
            </p>
            <button
              onClick={() => {
                setDoctorSearch('');
                setSelectedDeptId('');
              }}
              className="text-xs font-bold text-[#0e4a7b] hover:underline"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.slice(0, 6).map(doc => (
              <div
                key={doc.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-100 to-teal-50 border border-slate-200 flex items-center justify-center text-[#0e4a7b] font-extrabold text-lg shrink-0 shadow-sm">
                      <Stethoscope className="w-7 h-7 text-[#0e4a7b]" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {doc.full_name}
                      </h3>
                      <p className="text-xs font-semibold text-teal-700 truncate">
                        {doc.speciality}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {doc.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Chamber & Fee Details */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Building2 className="w-3.5 h-3.5" />
                        Chamber:
                      </span>
                      <span className="font-semibold text-slate-800">{doc.room_number || 'OPD-1'}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {t.consultation_fee}:
                      </span>
                      <span className="font-bold text-[#0e4a7b]">
                        ₹{doc.consultation_fee}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    {t.view_profile}
                  </Link>
                  <Link
                    href={`/book?doctor_id=${doc.id}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] shadow-sm transition"
                  >
                    {t.book_slot}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-2">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#0e4a7b] bg-sky-50 hover:bg-sky-100 border border-sky-200 transition"
          >
            <span>{t.view_all_doctors} ({initialDoctors.length} Specialists)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. DIAGNOSTIC SERVICES & LAB SHOWCASE                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Modern Diagnostic Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_diagnostics_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.section_diagnostics_subtitle}
            </p>
          </div>
          <Link
            href="/diagnostics"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e4a7b] hover:text-[#0b3459] transition"
          >
            <span>{t.view_all_tests}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialDiagnosticTests.slice(0, 6).map(test => (
            <div
              key={test.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {test.code}
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    ₹{test.price}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {test.name}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2">
                  {test.description}
                </p>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.turnaround_time} {test.turnaround_hours} hours</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-slate-400" />
                    <span className={test.fasting_required ? 'text-amber-700 font-medium' : 'text-slate-600'}>
                      {test.fasting_required ? t.fasting_required : t.no_fasting}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition"
                >
                  Enquire & Book Test
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. HEALTH PACKAGES SHOWCASE                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Comprehensive Health Checkups
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_packages_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.section_packages_subtitle}
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e4a7b] hover:text-[#0b3459] transition"
          >
            <span>{t.view_all_packages}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialHealthPackages.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-teal-500 shadow-md hover:shadow-xl transition duration-200 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                    {pkg.target_gender === 'all' ? 'All Adults' : pkg.target_gender === 'female' ? 'Women' : 'Men'}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1.5">₹{pkg.price}</span>
                    <span className="text-xl font-black text-teal-700">₹{pkg.discounted_price}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {pkg.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Report Delivery:</span>
                    <span className="font-semibold">{pkg.report_delivery_hours} Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Fasting:</span>
                    <span className="font-semibold text-amber-700">
                      {pkg.fasting_required ? 'Overnight Required' : 'Not Required'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Health Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. HOSPITAL INFRASTRUCTURE & FACILITIES                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Infrastructure & Care Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Patient Safety and Critical Recovery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            A modern healthcare ecosystem equipped for high-acuity trauma, planned elective surgeries, and prompt diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">24x7 Critical Care ICU</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipped with multi-para monitors, invasive ventilators, central oxygen, defibrillators, and 24x7 intensivist coverage.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Modular Operating Theatres</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              HEPA-filtered laminar airflow surgical suites for General, Laparoscopic, Orthopaedic, and Gynaecological operations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0e4a7b] flex items-center justify-center">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2D Echo & Cardiology Lab</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-resolution Color Doppler 2D Echocardiogram, 12-lead digital ECG, and cardiologist-led hypertension clinics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Fully Automated Pathology</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clinical biochemistry, haematology, serology, microbiology, and routine urine/stool analysis with same-day reports.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Inpatient Cabins & Wards</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Comfortable AC and Non-AC private cabins, semi-private rooms, and general male/female medical wards with nursing buzzers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cashless TPA Desk</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated insurance desk to coordinate cashless hospitalisation pre-authorisations with major private insurers and TPAs.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. ANNOUNCEMENTS & ADVISORIES                                      */}
      {/* ------------------------------------------------------------------ */}
      {initialAnnouncements.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Official Updates & Health Bulletins
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t.section_announcements_title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {t.section_announcements_subtitle}
              </p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e4a7b] hover:text-[#0b3459] transition"
            >
              <span>{t.view_all_news}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialAnnouncements.map(item => (
              <div
                key={item.id}
                className={`p-6 rounded-2xl bg-white border transition flex flex-col justify-between space-y-4 ${
                  item.is_emergency_alert
                    ? 'border-amber-300 bg-amber-50/40 shadow-md'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === 'Health Advisory'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.published_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0e4a7b] hover:underline"
                  >
                    <span>Read Advisory Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 10. LOCATION, CONTACT & MAP GUIDE                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Hospital Location & Transport
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Conveniently Located in Krishnanagar, Nadia
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Hiramani Memorial Hospital is strategically situated for accessible medical and emergency transport across Krishnanagar, Nadia district, and surrounding regions.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Full Postal Address</div>
                    <div>40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">Direct Hospital Numbers</div>
                    <div className="text-amber-400 font-bold">Emergency: +91 75010 74392</div>
                    <div className="text-slate-300">Reception: +91 78729 57300</div>
                    <div className="text-slate-300">Helpline: +91 62945 45225</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Patient Inpatient Visiting Hours</div>
                    <div>Morning: 11:00 AM – 01:00 PM | Evening: 05:00 PM – 07:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 transition"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions & Enquiry</span>
                </Link>

                <a
                  href="tel:+917501074392"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Emergency Desk</span>
                </a>
              </div>
            </div>

            {/* Map / Directions Display Card */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="text-xs font-bold text-teal-400">Map & Access</span>
                <span className="text-[11px] text-slate-400">Krishnanagar, Nadia</span>
              </div>

              <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <MapPin className="w-8 h-8 text-teal-400 animate-bounce" />
                <div className="text-xs font-bold text-white">40, Ananta Hari Mitra Road</div>
                <div className="text-[11px] text-slate-400">Near Income Tax Office, Nediarpara, Krishnanagar - 741101</div>
                <a
                  href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:underline pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Dedicated ambulance bay at emergency entrance.</div>
                <div>• Wheelchair access and stretcher ramps available.</div>
                <div>• Ample patient visitor parking inside hospital premises.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
