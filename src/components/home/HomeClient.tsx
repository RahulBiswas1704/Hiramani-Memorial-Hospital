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
  Building2,
  Syringe,
  Check,
  Navigation,
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

// Icon mapping helper for clinical departments
const DEPARTMENT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-5 h-5 text-[#15965C]" />,
  'cardiology': <HeartPulse className="w-5 h-5 text-[#159FDB]" />,
  'orthopaedics': <Bone className="w-5 h-5 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-5 h-5 text-pink-600" />,
  'paediatrics': <Baby className="w-5 h-5 text-sky-600" />,
  'ent': <Eye className="w-5 h-5 text-purple-600" />,
  'general-surgery': <Scissors className="w-5 h-5 text-indigo-600" />,
  'dermatology': <Sparkles className="w-5 h-5 text-emerald-600" />,
  'GENMED': <Activity className="w-5 h-5 text-[#15965C]" />,
  'CARDIO': <HeartPulse className="w-5 h-5 text-[#159FDB]" />,
  'ORTHO': <Bone className="w-5 h-5 text-amber-600" />,
  'GYNAEC': <Users className="w-5 h-5 text-pink-600" />,
  'PAED': <Baby className="w-5 h-5 text-sky-600" />,
  'ENT': <Eye className="w-5 h-5 text-purple-600" />,
  'SURG': <Scissors className="w-5 h-5 text-indigo-600" />,
  'DERMA': <Sparkles className="w-5 h-5 text-emerald-600" />,
};

// Fallback doctor portrait mapping
const DOCTOR_PORTRAITS: Record<string, string> = {
  'Dr. Sourav Mukherjee': '/images/doc-sourav-mukherjee.jpg',
  'Dr. Ananya Roy Chowdhury': '/images/doc-ananya-roy.jpg',
  'Dr. Rajesh Sen': '/images/doc-rajesh-sen.jpg',
  'Dr. Priyanka Banerjee': '/images/doc-priyanka-banerjee.jpg',
  'Dr. Amitav Das': '/images/doc-amitav-das.jpg',
  'Dr. Nandini Sengupta': '/images/doc-nandini-sengupta.jpg',
  'Dr. Subhashis Ghosh': '/images/doc-subhashis-ghosh.jpg',
};

export function HomeClient({
  initialDoctors,
  initialDepartments,
  initialHealthPackages,
  initialDiagnosticTests,
  initialAnnouncements,
}: HomeClientProps) {
  const { t } = useLanguage();
  const [searchDoctorQuery, setSearchDoctorQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [diagCategoryFilter, setDiagCategoryFilter] = useState('ALL');

  // Filter doctors for inline search
  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter(doc => {
      const matchSearch =
        doc.full_name.toLowerCase().includes(searchDoctorQuery.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchDoctorQuery.toLowerCase()) ||
        (doc.department_name && doc.department_name.toLowerCase().includes(searchDoctorQuery.toLowerCase()));

      const matchDept =
        selectedDeptFilter === 'ALL' ||
        doc.department_id === selectedDeptFilter ||
        doc.department_name === selectedDeptFilter;

      return matchSearch && matchDept;
    });
  }, [initialDoctors, searchDoctorQuery, selectedDeptFilter]);

  // Filter diagnostics
  const filteredDiagnostics = useMemo(() => {
    if (diagCategoryFilter === 'ALL') return initialDiagnosticTests.slice(0, 8);
    return initialDiagnosticTests.filter(t => (t.category_name || (t as any).category) === diagCategoryFilter).slice(0, 8);
  }, [initialDiagnosticTests, diagCategoryFilter]);

  return (
    <div className="space-y-16 sm:space-y-24 bg-white text-slate-800 pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* SECTION 1: EDITORIAL PHOTOGRAPHY-LED HERO                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-gradient-to-b from-[#F4F8F5]/80 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Hospital Narrative & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Institutional Location Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#15965C]/30 text-xs font-bold text-[#15965C] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#15965C] animate-pulse" />
                <span>{t.hero_tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                <span>{t.hero_title_prefix}</span>
                <span className="text-[#15965C] block sm:inline">{t.hero_title_highlight}</span>
                <span>{t.hero_title_suffix}</span>
              </h1>

              {/* Narrative Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {t.hero_subtitle}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#15965C] hover:bg-[#0E7444] shadow-md hover:shadow-lg transition group"
                >
                  <CalendarCheck className="w-5 h-5 text-white/90" />
                  <span>{t.cta_book_opd}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition" />
                </Link>

                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold text-[#0B72A2] bg-white border-2 border-[#159FDB] hover:bg-[#F0F7FB] transition shadow-sm"
                >
                  <Stethoscope className="w-5 h-5 text-[#159FDB]" />
                  <span>{t.cta_explore_doctors}</span>
                </Link>

                <a
                  href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 transition"
                  title="24x7 Emergency Casualty Desk"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>{t.cta_emergency_call}</span>
                </a>
              </div>

              {/* Institutional Trust Indicators Strip */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Govt. Regd. (WB CEA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>50+ Top Consultants</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>In-House Pathology & X-Ray</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Cashless Mediclaim Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Clinical Photography Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[14/11] bg-slate-100">
                <img
                  src="/images/hero-consultation.jpg"
                  alt="Doctor consultation at Hiramani Memorial Hospital Krishnanagar"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Anchored Institutional Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-white/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#15965C] flex items-center justify-center shrink-0 border border-emerald-100">
                    <ShieldCheck className="w-5 h-5 text-[#15965C]" />
                  </div>
                  <div className="text-xs">
                    <div className="font-extrabold text-slate-900 leading-tight">
                      Hiramani Memorial Hospital
                    </div>
                    <div className="text-slate-500 font-medium">
                      Nediarpara, Krishnanagar • Serving Nadia District
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 2: 4-PILLAR INSTITUTIONAL GATEWAY                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1: Doctor Consultations */}
          <Link
            href="/doctors"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#15965C] hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#15965C] flex items-center justify-center group-hover:bg-[#15965C] group-hover:text-white transition">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#15965C] transition">
                Specialist Doctor Chambers
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Consult 50+ senior physicians and surgeons across 15+ specialties with fixed OPD chamber rosters.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#15965C] group-hover:translate-x-1 transition">
              <span>View Doctor Directory</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Pillar 2: Diagnostics & Labs */}
          <Link
            href="/diagnostics"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#159FDB] hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0B72A2] flex items-center justify-center group-hover:bg-[#159FDB] group-hover:text-white transition">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B72A2] transition">
                In-House Diagnostics & Scans
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated clinical pathology, digital X-Ray, 2D Echocardiography, and ultrasound with rapid report delivery.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-[#0B72A2] group-hover:translate-x-1 transition">
              <span>Explore Investigation Tariff</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          {/* Pillar 3: 24x7 Emergency & Critical Care */}
          <a
            href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
            className="group p-6 rounded-2xl bg-red-50/70 border border-red-200 hover:border-red-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-red-950 group-hover:text-red-700 transition">
                  24x7 Emergency Casualty
                </h3>
                <span className="text-[10px] bg-red-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Always Open
                </span>
              </div>
              <p className="text-xs text-red-900/80 leading-relaxed">
                Immediate casualty resuscitation, critical care ICU beds, and equipped ambulance dispatch.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-red-700 group-hover:translate-x-1 transition">
              <span>Emergency: {t.emergency_hotline}</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          {/* Pillar 4: Cashless & WhatsApp Booking */}
          <Link
            href="/insurance"
            className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                Cashless Mediclaim & TPA
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hassle-free pre-authorization for major health insurance providers and preventive family checkup packages.
              </p>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition">
              <span>View Empaneled Insurers</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 3: EDITORIAL HOSPITAL INTRODUCTION (IMAGE + NARRATIVE)     */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-[#F4F8F5] py-16 sm:py-20 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Authentic Hospital Reception Photography */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-slate-200">
                <img
                  src="/images/hospital-reception.jpg"
                  alt="Hiramani Memorial Hospital reception and admission lobby"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-bold text-white drop-shadow">
                  Hospital Reception & Admission Lounge
                </div>
              </div>
            </div>

            {/* Right: Hospital Narrative & Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#15965C]">
                  About Hiramani Memorial Hospital
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Dedicated to Clinical Excellence and Compassionate Patient Healing
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Situated at Nediarpara, Krishnanagar (Nadia district, West Bengal - 741101), Hiramani Memorial Hospital was established with a singular vision: to deliver premier, multi-speciality clinical healthcare at fair and transparent tariffs.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Backed by full-time medical consultants, modern modular operating theatres, an in-house automated pathology laboratory, and 24x7 emergency casualty response, our clinical team serves patients across Krishnanagar and surrounding sub-divisions with empathy and clinical precision.
              </p>

              {/* 4 Clean Inline Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-[#15965C]">15+</div>
                  <div className="text-[11px] font-bold text-slate-600">Clinical Departments</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-[#159FDB]">50+</div>
                  <div className="text-[11px] font-bold text-slate-600">Senior Consultants</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-red-600">24x7</div>
                  <div className="text-[11px] font-bold text-slate-600">Casualty & ICU</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <div className="text-2xl font-black text-amber-600">100+</div>
                  <div className="text-[11px] font-bold text-slate-600">Diagnostic Tests</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#15965C] hover:text-[#0E7444] transition group"
                >
                  <span>Read Full Hospital Profile & Clinical Charter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 4: CLINICAL SPECIALITIES & DEPARTMENTS                     */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#15965C]">
              Centres of Clinical Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_specialities_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              {t.section_specialities_subtitle}
            </p>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] hover:text-[#0E7444] transition self-start md:self-auto"
          >
            <span>{t.view_all_departments}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8-Department Medical Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialDepartments.slice(0, 8).map(dept => {
            const icon = DEPARTMENT_ICONS[dept.code] || DEPARTMENT_ICONS[dept.id] || (
              <Activity className="w-5 h-5 text-[#15965C]" />
            );
            return (
              <Link
                key={dept.id}
                href={`/departments/${dept.code ? dept.code.toLowerCase() : dept.id}`}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#15965C] hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition">
                    {icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#15965C] transition">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {dept.description || 'Comprehensive clinical diagnosis, outpatient consultations, and inpatient care.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-[#15965C] transition">
                  <span>Explore Speciality</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 5: SPECIALIST DOCTORS WITH REAL PORTRAITS                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#15965C]">
              Consultant Specialists & Surgeons
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_doctors_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              {t.section_doctors_subtitle}
            </p>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] hover:text-[#0E7444] transition self-start md:self-auto"
          >
            <span>{t.view_all_doctors}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Doctor Search & Department Filter Bar */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor by name, qualification, or clinical specialty..."
              value={searchDoctorQuery}
              onChange={e => setSearchDoctorQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15965C]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedDeptFilter('ALL')}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedDeptFilter === 'ALL'
                  ? 'bg-[#15965C] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Specialities
            </button>
            {initialDepartments.slice(0, 5).map(dept => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptFilter(dept.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedDeptFilter === dept.id
                    ? 'bg-[#15965C] text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid with Authentic Portrait Imagery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.slice(0, 6).map(doc => {
            const portraitUrl =
              doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/doc-sourav-mukherjee.jpg';

            return (
              <div
                key={doc.id}
                className="group rounded-2xl bg-white border border-slate-200 hover:border-[#15965C] hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
              >
                {/* Top: Portrait + Primary Details */}
                <div className="p-5 flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={portraitUrl}
                      alt={doc.full_name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-[#15965C] border border-emerald-200">
                      {doc.department_name || 'Specialist'}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 truncate">
                      {doc.full_name}
                    </h3>
                    <p className="text-xs font-semibold text-[#0B72A2] truncate">
                      {doc.speciality}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {doc.qualification}
                    </p>
                  </div>
                </div>

                {/* Middle: Chamber & Fee Schedule */}
                <div className="px-5 py-3 bg-slate-50/70 border-y border-slate-100 text-xs text-slate-600 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Chamber</span>
                    <span className="font-bold text-slate-800">{doc.room_number || 'OPD Desk'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">OPD Consultation Fee</span>
                    <span className="font-bold text-[#15965C]">₹{doc.consultation_fee}</span>
                  </div>
                </div>

                {/* Bottom: Action Buttons */}
                <div className="p-4 grid grid-cols-2 gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="text-center py-2 px-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition"
                  >
                    View Roster
                  </Link>

                  <Link
                    href={`/book?doctor=${doc.id}`}
                    className="text-center py-2 px-3 rounded-lg bg-[#15965C] hover:bg-[#0E7444] text-white text-xs font-bold transition shadow-sm"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 6: DIAGNOSTICS & LABORATORY INVESTIGATIONS                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#15965C]">
              In-House Automated Pathology & Radiology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_diagnostics_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              {t.section_diagnostics_subtitle}
            </p>
          </div>
          <Link
            href="/diagnostics"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] hover:text-[#0E7444] transition self-start md:self-auto"
          >
            <span>{t.view_all_tests}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Structured High-Density Investigation Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F4F8F5] text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Test Code & Investigation</th>
                  <th className="py-3.5 px-4">Sample / Modality</th>
                  <th className="py-3.5 px-4">Fasting Protocol</th>
                  <th className="py-3.5 px-4">Turnaround Time</th>
                  <th className="py-3.5 px-4">Tariff</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredDiagnostics.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.code || (item as any).test_code}
                        </span>
                        <span>{item.name || (item as any).test_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{item.sample_type || 'Clinical Scan'}</td>
                    <td className="py-3.5 px-4">
                      {item.fasting_required ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Fasting Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                          No Fasting
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 flex items-center gap-1.5 pt-4">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.turnaround_hours || (item as any).turnaround_time_hours || 24} Hours</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#15965C] text-sm">₹{item.price}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <Link
                        href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(item.name || (item as any).test_name)}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-[#15965C] text-[#15965C] hover:text-white font-bold text-xs transition border border-emerald-200"
                      >
                        <span>Enquire</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 7: CLINICAL FACILITIES & INFRASTRUCTURE SHOWCASE           */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#159FDB]">
              Hospital Infrastructure & Patient Safety
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Modern Facilities Built for Clinical Precision
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Hiramani Memorial Hospital combines sterile modular infrastructure with 24x7 critical care resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Facility 1: Modular OT */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 space-y-3 group">
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/images/ot-surgery.jpg"
                  alt="Modular Operation Theatre at Hiramani Memorial Hospital"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-bold text-white">Modular Operation Theatres</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Laminar airflow, HEPA filtration, and advanced laparoscopic surgical towers for sterile operative care.
                </p>
              </div>
            </div>

            {/* Facility 2: ICU & Critical Care */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 space-y-3 group">
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/images/icu-care.jpg"
                  alt="ICU and Critical Care at Hiramani Memorial Hospital"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-bold text-white">Intensive Critical Care (ICU)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  24x7 multi-parameter patient monitoring, invasive ventilators, defibrillators, and central oxygen delivery.
                </p>
              </div>
            </div>

            {/* Facility 3: Automated Pathology Lab */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 space-y-3 group">
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/images/lab-diagnostics.jpg"
                  alt="Automated pathology laboratory"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-bold text-white">Automated Pathology Lab</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fully automated 5-part hematology and clinical biochemistry analyzers ensuring rapid and reliable findings.
                </p>
              </div>
            </div>

            {/* Facility 4: Digital Radiology & Imaging */}
            <div className="rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 space-y-3 group">
              <div className="aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src="/images/radiology-imaging.jpg"
                  alt="Digital Radiology and Ultrasound Suite"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h3 className="text-base font-bold text-white">Digital Radiology & USG</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Low-dose high-frequency digital X-Ray, 2D Echocardiogram, and high-resolution color Doppler ultrasound.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 8: PREVENTIVE HEALTH CHECKUP PACKAGES                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#15965C]">
              Preventive Wellness & Early Detection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.section_packages_title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Comprehensive clinical checkups starting from ₹1,499 for you and your family.
            </p>
          </div>
          <Link
            href="/packages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] hover:text-[#0E7444] transition self-start md:self-auto"
          >
            <span>{t.view_all_packages}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialHealthPackages.slice(0, 4).map(pkg => (
            <div
              key={pkg.id}
              className="rounded-2xl bg-white border border-slate-200 hover:border-[#15965C] hover:shadow-lg transition p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#15965C] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 uppercase">
                    Checkup Plan
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900">₹{pkg.price}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {pkg.description}
                </p>

                <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
                  <div className="font-semibold text-slate-800">Key Investigations Included:</div>
                  <ul className="space-y-1 text-slate-500">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15965C]" />
                      <span>Complete Blood Count & Sugar</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15965C]" />
                      <span>Lipid, Liver & Kidney Profile</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#15965C]" />
                      <span>Physician Clinical Consultation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/book"
                  className="block w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-[#15965C] hover:bg-[#0E7444] text-white transition shadow-sm"
                >
                  Book Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 9: WHATSAPP MEDICONNECT INTEGRATION                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-8 sm:p-12 shadow-xl border border-emerald-600/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp MediConnect Automation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Book Confirmed Doctor Appointments Instantly on WhatsApp
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                Chat in Bengali (বাংলা) or English with our automated hospital assistant. Check doctor schedules, view chamber numbers, receive instant booking confirmations, and get diagnostic test preparation rules directly on your phone.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-900 font-bold text-xs sm:text-sm hover:bg-emerald-50 transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Launch WhatsApp Simulator</span>
                </Link>
                <a
                  href="https://wa.me/917872957300?text=Hi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-950/40 border border-white/30 text-white font-bold text-xs sm:text-sm hover:bg-emerald-950/60 transition"
                >
                  <span>Chat on WhatsApp: +91 78729 57300</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-3 text-xs text-emerald-50">
              <div className="font-extrabold text-white text-sm">Key Features on WhatsApp:</div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Zero advance booking payment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Immediate emergency triage & helpline bypass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Bilingual conversational booking in Bengali & English</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Instant automated ticket reference dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SECTION 10: HOSPITAL LOCATION & KRISHNANAGAR TRANSIT GATEWAY       */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#159FDB]">
                  Hospital Campus & Location
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Easy Access from Krishnanagar Junction & NH-12
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Hiramani Memorial Hospital is situated at Nediarpara, right on Ananta Hari Mitra Road near the Income Tax Office. Directly accessible for emergency ambulances and patient vehicles.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Full Postal Address:</span>
                    <span>40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Direct Telephone Numbers:</span>
                    <span className="text-amber-400 font-bold">Emergency: +91 75010 74392</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span>Reception: +91 78729 57300</span>
                    <span className="text-slate-400 mx-2">|</span>
                    <span>Helpline: +91 62945 45225</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Visiting Hours for Inpatient Wards:</span>
                    <span>Morning: 11:00 AM – 01:00 PM | Evening: 05:00 PM – 07:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition shadow"
                >
                  <MapPin className="w-4 h-4 text-[#15965C]" />
                  <span>Get Directions & Transit Details</span>
                </Link>

                <a
                  href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency Desk</span>
                </a>
              </div>
            </div>

            {/* Right: Map Preview Card */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-[#159FDB]">Campus GPS Coordinates</span>
                <span className="text-[11px] text-slate-400">Lat: 23.4013, Long: 88.5028</span>
              </div>

              <div className="h-44 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <MapPin className="w-7 h-7 text-[#15965C] animate-bounce" />
                <div className="text-xs font-bold text-white">40, Ananta Hari Mitra Road</div>
                <div className="text-[11px] text-slate-400">Near Income Tax Office, Nediarpara, Krishnanagar</div>
                <a
                  href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#159FDB] hover:underline pt-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <div>• Approx. 2.5 km from Krishnanagar City Junction Railway Station (toto / auto).</div>
                <div>• Direct casualty and emergency ambulance bay from Ananta Hari Mitra Road.</div>
                <div>• Patient and visitor parking available inside hospital premises.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
