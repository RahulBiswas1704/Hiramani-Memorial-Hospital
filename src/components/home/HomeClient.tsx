'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Compass,
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
    <div className="space-y-16 sm:space-y-24 bg-white text-[#182B3D] pb-16 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 1. EDITORIAL PHOTOGRAPHY-LED HERO                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Hospital Narrative & Actions */}
            <div className="lg:col-span-7 space-y-5">
              {/* Institutional Location Badge */}
              <div className="inline-flex max-w-full items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#15965C]/30 text-xs font-semibold text-[#15965C] truncate">
                <span className="w-2 h-2 rounded-full bg-[#15965C] animate-pulse shrink-0" />
                <span className="truncate">{t.hero_tag}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#103653] tracking-tight leading-[1.18] break-words">
                <span>{t.hero_title_prefix}</span>{' '}
                <span className="text-[#15965C]">{t.hero_title_highlight}</span>{' '}
                <span>{t.hero_title_suffix}</span>
              </h1>

              {/* Narrative Description */}
              <p className="text-sm sm:text-base text-[#526273] leading-relaxed max-w-2xl">
                {t.hero_subtitle}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-lg text-sm font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>{t.cta_book_opd}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>

                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#103653] bg-white border border-[#E5EBEF] hover:bg-slate-50 transition"
                >
                  <Stethoscope className="w-4 h-4 text-[#159FDB]" />
                  <span>{t.cta_explore_doctors}</span>
                </Link>

                <a
                  href={`tel:${t.emergency_hotline.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg text-xs sm:text-sm font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/20 hover:bg-[#fee2e2] transition"
                  title="24x7 Emergency Casualty Desk"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.cta_emergency_call}</span>
                </a>
              </div>

              {/* Institutional Trust Indicators Strip */}
              <div className="pt-5 border-t border-[#E5EBEF] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs font-medium text-[#526273]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Govt. Regd. (WB CEA)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Specialist Consultants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>In-House Pathology Lab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Cashless TPA Desk</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Clinical Photography Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/hero-consultation.jpg"
                  alt="Doctor consultation at Hiramani Memorial Hospital Krishnanagar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103653]/80 via-transparent to-transparent z-10" />

                {/* Anchored Institutional Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-white/60 flex items-center gap-2.5 z-20">
                  <div className="w-8 h-8 rounded-lg bg-[#F4F8F5] text-[#15965C] flex items-center justify-center shrink-0 border border-[#15965C]/20">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs min-w-0">
                    <div className="font-bold text-[#103653] truncate">
                      Hiramani Memorial Hospital
                    </div>
                    <div className="text-[#526273] text-[11px] truncate">
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
      {/* 2. EDITORIAL RHYTHM 1: INSTITUTIONAL HERITAGE & METRICS            */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Narrative Lead with Photo */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Institutional Care & Ethics
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#103653] tracking-tight">
              Compassionate Medical Services for Krishnanagar & Nadia
            </h2>
            <p className="text-sm text-[#526273] leading-relaxed">
              Established with an uncompromising mandate: to provide the people of Krishnanagar and surrounding regions with high-standard multi-speciality clinical care, advanced diagnostics, and round-the-clock emergency support without requiring patients to travel to Kolkata.
            </p>

            <div className="relative rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[16/9] mt-3">
              <Image
                src="/images/hospital-reception.jpg"
                alt="Hiramani Memorial Hospital Reception & Patient Services Lounge"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-[#103653]/90 text-white text-[11px] font-medium px-2.5 py-1 rounded z-10">
                Central Patient Reception & Admission Helpdesk
              </div>
            </div>
          </div>

          {/* Clean Metric Column - Editorial hairline dividers, not floating cards */}
          <div className="lg:col-span-5 bg-[#F7FAF9] rounded-2xl p-6 sm:p-8 border border-[#E5EBEF] space-y-6">
            <h3 className="text-sm font-bold text-[#103653] uppercase tracking-wider border-b border-[#E5EBEF] pb-3">
              Clinical Quality & Capabilities
            </h3>

            <div className="divide-y divide-[#E5EBEF]">
              <div className="py-3 first:pt-0">
                <div className="text-2xl font-bold text-[#15965C]">24 / 7</div>
                <div className="text-sm font-bold text-[#182B3D]">Emergency Casualty & Trauma Care</div>
                <p className="text-xs text-[#526273] mt-0.5">Round-the-clock medical officer triage and emergency resuscitation.</p>
              </div>

              <div className="py-3">
                <div className="text-2xl font-bold text-[#159FDB]">8+</div>
                <div className="text-sm font-bold text-[#182B3D]">Clinical Specialities Under One Roof</div>
                <p className="text-xs text-[#526273] mt-0.5">Cardiology, General Medicine, Orthopaedics, Surgery, Paediatrics & more.</p>
              </div>

              <div className="py-3">
                <div className="text-2xl font-bold text-[#15965C]">100%</div>
                <div className="text-sm font-bold text-[#182B3D]">Transparent Standardized Tariffs</div>
                <p className="text-xs text-[#526273] mt-0.5">Clear OPD fees, published test rates, and zero hidden markups.</p>
              </div>

              <div className="py-3 last:pb-0">
                <div className="text-2xl font-bold text-[#103653]">WB CEA</div>
                <div className="text-sm font-bold text-[#182B3D]">Registered Healthcare Establishment</div>
                <p className="text-xs text-[#526273] mt-0.5">Compliant under the West Bengal Clinical Establishments Act.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. EDITORIAL RHYTHM 2: CLINICAL SPECIALITIES DIRECTORY              */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Outpatient Clinics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Medical Departments & Specialities
            </h2>
          </div>
          <Link
            href="/departments"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#15965C] hover:underline"
          >
            <span>View All Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Structured List Layout instead of repetitive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialDepartments.map(dept => {
            const icon = DEPARTMENT_ICONS[dept.code] || DEPARTMENT_ICONS[dept.id] || <Activity className="w-5 h-5 text-[#15965C]" />;
            const deptDocs = initialDoctors.filter(d => d.department_id === dept.id);

            return (
              <div
                key={dept.id}
                className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-lg bg-[#F4F8F5] inline-block">{icon}</span>
                    <span className="text-[11px] font-semibold text-[#526273]">{deptDocs.length} Doctor{deptDocs.length !== 1 ? 's' : ''}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#182B3D]">{dept.name}</h3>
                  <p className="text-xs text-[#526273] line-clamp-2 leading-relaxed">
                    {dept.description || 'Specialist consultations, clinical evaluations, and follow-up care.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5EBEF] flex items-center justify-between">
                  <Link
                    href={`/departments/${dept.code || dept.id}`}
                    className="text-xs font-medium text-[#159FDB] hover:underline"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/book?department_id=${dept.id}`}
                    className="text-xs font-bold text-[#15965C] hover:underline"
                  >
                    Book Slot ›
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. EDITORIAL RHYTHM 3: SPECIALIST CONSULTANTS DIRECTORY             */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Attending Physicians
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Consultant Doctors & OPD Chambers
            </h2>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#15965C] hover:underline"
          >
            <span>View All Doctors ({initialDoctors.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Doctor Search & Safe Department Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor by name or speciality (e.g. Cardiologist, Orthopaedics)..."
              value={searchDoctorQuery}
              onChange={e => setSearchDoctorQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E5EBEF] bg-white text-xs text-[#182B3D] focus:outline-none focus:ring-2 focus:ring-[#15965C]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDeptFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedDeptFilter === 'ALL'
                  ? 'bg-[#15965C] text-white'
                  : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
              }`}
            >
              All
            </button>
            {initialDepartments.slice(0, 4).map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDeptFilter(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedDeptFilter === d.id
                    ? 'bg-[#15965C] text-white'
                    : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.slice(0, 6).map(doc => {
            const portraitUrl = doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/hero-consultation.jpg';

            return (
              <div
                key={doc.id}
                className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex gap-3.5 items-center"
              >
                <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-[#E5EBEF]">
                  <Image
                    src={portraitUrl}
                    alt={doc.full_name}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#182B3D] truncate">{doc.full_name}</h3>
                  <p className="text-xs text-[#15965C] font-medium truncate">{doc.speciality}</p>
                  <p className="text-[11px] text-[#526273] truncate">{doc.qualification}</p>
                  <p className="text-[11px] text-[#526273]">Chamber: {doc.room_number || 'OPD-1'}</p>

                  <div className="flex items-center justify-between pt-1.5 border-t border-[#E5EBEF]">
                    <span className="text-xs font-bold text-[#103653]">₹{doc.consultation_fee}</span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/doctors/${doc.id}`}
                        className="text-[11px] font-medium text-[#526273] hover:text-[#15965C] px-2 py-1"
                      >
                        Profile
                      </Link>
                      <Link
                        href={`/book?doctor_id=${doc.id}`}
                        className="text-[11px] font-bold text-white bg-[#15965C] hover:bg-[#117A4A] px-2.5 py-1 rounded transition"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. EDITORIAL RHYTHM 4: IN-HOUSE DIAGNOSTICS & PATHOLOGY TARIFFS    */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Diagnostic Capabilities
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              In-House Automated Pathology & Radiology Tariffs
            </h2>
          </div>
          <Link
            href="/diagnostics"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#15965C] hover:underline"
          >
            <span>View All Tests & Tariffs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table View (Hidden on mobile < 768px for zero horizontal scroll) */}
        <div className="hidden md:block rounded-xl border border-[#E5EBEF] overflow-hidden bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF9] text-[#103653] font-bold border-b border-[#E5EBEF]">
              <tr>
                <th className="py-3 px-4">Test Code & Name</th>
                <th className="py-3 px-4">Sample / Modality</th>
                <th className="py-3 px-4">Fasting Protocol</th>
                <th className="py-3 px-4">Turnaround</th>
                <th className="py-3 px-4">Tariff</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EBEF] text-[#526273]">
              {filteredDiagnostics.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-semibold text-[#182B3D]">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded mr-2 border border-slate-200">
                      {item.code || (item as any).test_code}
                    </span>
                    <span>{item.name || (item as any).test_name}</span>
                  </td>
                  <td className="py-3 px-4">{item.sample_type || 'Clinical Scan'}</td>
                  <td className="py-3 px-4">
                    {item.fasting_required ? (
                      <span className="text-amber-700 font-semibold">Overnight Fasting</span>
                    ) : (
                      <span className="text-slate-500">Not Required</span>
                    )}
                  </td>
                  <td className="py-3 px-4">{item.turnaround_hours || (item as any).turnaround_time_hours || 24} Hours</td>
                  <td className="py-3 px-4 font-bold text-[#15965C]">₹{item.price}</td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(item.name || (item as any).test_name)}`}
                      className="text-xs font-bold text-[#15965C] hover:underline"
                    >
                      Enquire ›
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List View (Cleaner, no horizontal table scroll!) */}
        <div className="md:hidden divide-y divide-[#E5EBEF] border border-[#E5EBEF] rounded-xl bg-white">
          {filteredDiagnostics.map(item => (
            <div key={item.id} className="p-3.5 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1 py-0.5 rounded border border-slate-200 mr-1.5">
                    {item.code || (item as any).test_code}
                  </span>
                  <span className="text-xs font-bold text-[#182B3D]">{item.name || (item as any).test_name}</span>
                </div>
                <span className="text-xs font-bold text-[#15965C] shrink-0">₹{item.price}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#526273]">
                <span>Sample: {item.sample_type || 'Clinical Scan'}</span>
                <span>Turnaround: {item.turnaround_hours || 24}h</span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
                <span className={item.fasting_required ? 'text-amber-700 font-medium' : 'text-slate-500'}>
                  {item.fasting_required ? '• Fasting Required' : '• No Fasting'}
                </span>
                <Link
                  href={`/contact?subject=Diagnostic+Booking+${encodeURIComponent(item.name || (item as any).test_name)}`}
                  className="font-bold text-[#15965C]"
                >
                  Book Test ›
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. EDITORIAL RHYTHM 5: AUTHENTIC HOSPITAL FACILITIES SHOWCASE      */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Hospital Infrastructure
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Equipped for Critical Surgeries, Resuscitation & Diagnostic Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#E5EBEF] overflow-hidden bg-white">
            <div className="h-40 bg-slate-100 relative">
              <Image
                src="/images/ot-surgery.jpg"
                alt="Modular Operation Theatre"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 space-y-1">
              <h3 className="text-xs font-bold text-[#182B3D]">Modular Operation Theatre</h3>
              <p className="text-[11px] text-[#526273] leading-relaxed">
                Laminar airflow with HEPA filters and laparoscopic surgical towers.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5EBEF] overflow-hidden bg-white">
            <div className="h-40 bg-slate-100 relative">
              <Image
                src="/images/icu-care.jpg"
                alt="Critical Care ICU"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 space-y-1">
              <h3 className="text-xs font-bold text-[#182B3D]">Critical Care ICU</h3>
              <p className="text-[11px] text-[#526273] leading-relaxed">
                Invasive mechanical ventilators and 24x7 intensivist monitoring.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5EBEF] overflow-hidden bg-white">
            <div className="h-40 bg-slate-100 relative">
              <Image
                src="/images/lab-diagnostics.jpg"
                alt="Automated Pathology Lab"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 space-y-1">
              <h3 className="text-xs font-bold text-[#182B3D]">Automated Pathology Lab</h3>
              <p className="text-[11px] text-[#526273] leading-relaxed">
                5-part hematology and biochemistry analyzers with daily QC calibration.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#E5EBEF] overflow-hidden bg-white">
            <div className="h-40 bg-slate-100 relative">
              <Image
                src="/images/radiology-imaging.jpg"
                alt="Digital X-Ray & Ultrasound"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3.5 space-y-1">
              <h3 className="text-xs font-bold text-[#182B3D]">Digital X-Ray & Ultrasound</h3>
              <p className="text-[11px] text-[#526273] leading-relaxed">
                High-definition 2D Echocardiography with Color Doppler and pelvic USG.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. EDITORIAL RHYTHM 6: PREVENTIVE HEALTH CHECKUP PACKAGES          */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Early Detection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Preventive Health Checkup Packages
            </h2>
          </div>
          <Link href="/packages" className="inline-flex items-center gap-1 text-xs font-bold text-[#15965C] hover:underline">
            <span>View All Packages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {initialHealthPackages.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className="p-5 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F4F8F5] text-[#15965C]">
                    {pkg.target_gender === 'all' ? 'All Adults' : pkg.target_gender === 'female' ? 'Women' : 'Men'}
                  </span>
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-1">₹{pkg.price}</span>
                    <span className="text-lg font-bold text-[#15965C]">₹{pkg.discounted_price}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#182B3D]">{pkg.name}</h3>
                <p className="text-xs text-[#526273] line-clamp-2 leading-relaxed">{pkg.description}</p>

                <div className="text-[11px] text-[#526273] space-y-1 pt-1 border-t border-[#E5EBEF]">
                  <div>• Fasting: {pkg.fasting_required ? 'Overnight Required' : 'Not Required'}</div>
                  <div>• Report Delivery: Within {pkg.report_delivery_hours} Hours</div>
                  <div>• Tests: {pkg.sample_count} Diagnostic Tests Included</div>
                </div>
              </div>

              <Link
                href="/book"
                className="w-full text-center py-2 px-3 rounded-lg bg-[#F4F8F5] hover:bg-[#15965C] text-[#15965C] hover:text-white font-bold text-xs transition border border-[#15965C]/30 hover:border-transparent"
              >
                Book This Package
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. EDITORIAL RHYTHM 7: WHATSAPP BOT & KRISHNANAGAR CAMPUS TRANSIT */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: WhatsApp Assistance */}
          <div className="p-6 rounded-2xl bg-[#103653] text-white space-y-4 border border-[#103653]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
                Mobile Automation
              </span>
              <MessageCircle className="w-5 h-5 text-[#15965C]" />
            </div>

            <h3 className="text-lg font-bold">
              Book Doctor Appointments via WhatsApp
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Prefer messaging? Our bilingual automated WhatsApp assistant lets you check available doctor slots, view OPD fee schedules, and confirm appointments in seconds.
            </p>

            <div className="pt-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold transition shadow-sm"
              >
                <span>Launch WhatsApp Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Krishnanagar Campus Transit */}
          <div className="p-6 rounded-2xl bg-[#F7FAF9] border border-[#E5EBEF] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#159FDB]">
                Campus & Directions
              </span>
              <Compass className="w-5 h-5 text-[#159FDB]" />
            </div>

            <h3 className="text-lg font-bold text-[#182B3D]">
              Hospital Location & Access
            </h3>

            <p className="text-xs text-[#526273] leading-relaxed">
              40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia - 741101. Located approx. 1.5 km from Krishnanagar City Junction Railway Station.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-[#E5EBEF] hover:border-[#159FDB] text-xs font-bold text-[#103653] transition shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 text-[#159FDB]" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="tel:+917872957300"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#526273] hover:text-[#15965C]"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Reception: +91 78729 57300</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
