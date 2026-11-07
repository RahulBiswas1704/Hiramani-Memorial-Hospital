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
  CheckCircle2,
  Users,
  Baby,
  Bone,
  Eye,
  Scissors,
  Microscope,
  FileText,
  Building2,
  Navigation,
  Compass,
  AlertTriangle,
  CreditCard,
  Heart,
  BadgeAlert,
  UserCheck,
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

const DOCTOR_PORTRAITS: Record<string, string> = {
  'Dr. Sourav Mukherjee': '/images/doc-sourav-mukherjee.jpg',
  'Dr. Ananya Roy Chowdhury': '/images/doc-ananya-roy.jpg',
  'Dr. Rajesh Sen': '/images/doc-rajesh-sen.jpg',
  'Dr. Priyanka Banerjee': '/images/doc-priyanka-banerjee.jpg',
  'Dr. Amitav Das': '/images/doc-amitav-das.jpg',
  'Dr. Nandini Sengupta': '/images/doc-nandini-sengupta.jpg',
  'Dr. Subhashis Ghosh': '/images/doc-subhashis-ghosh.jpg',
};

// Plain human descriptions for departments
const DEPARTMENT_GUIDES: Record<string, { plainDesc: string; commonIssues: string }> = {
  'general-medicine': {
    plainDesc: 'Daily illness, fevers, blood sugar & pressure',
    commonIssues: 'Fever, Diabetes, Blood Pressure, Thyroid, Weakness',
  },
  'cardiology': {
    plainDesc: 'Heart specialist & chest pain clinic',
    commonIssues: 'Chest Pain, High BP, Breathlessness, Palpitations',
  },
  'orthopaedics': {
    plainDesc: 'Bone fractures, joint pain & spine care',
    commonIssues: 'Knee Pain, Fractures, Backache, Arthritis, Joint Stiffness',
  },
  'gynaecology-and-obstetrics': {
    plainDesc: 'Pregnancy care, normal & C-section delivery',
    commonIssues: 'Pregnancy Care, Delivery, Menstrual Issues, PCOS',
  },
  'paediatrics': {
    plainDesc: 'Child health, baby care & vaccinations',
    commonIssues: 'Childhood Fever, Cough, Baby Growth, Vaccinations',
  },
  'ent': {
    plainDesc: 'Ear, nose, throat & sinusitis clinic',
    commonIssues: 'Ear Pain, Hearing Loss, Sinus, Tonsils, Sore Throat',
  },
  'general-surgery': {
    plainDesc: 'Laparoscopic appendix, gallstone & hernia surgery',
    commonIssues: 'Appendix, Gallstones, Hernia, Piles, Cysts',
  },
  'dermatology': {
    plainDesc: 'Skin infections, allergy, eczema & hair care',
    commonIssues: 'Skin Rash, Fungal Infection, Acne, Hair Fall, Allergies',
  },
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

  return (
    <div className="space-y-12 sm:space-y-20 bg-white text-[#182B3D] pb-16 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* 1. WARM, HUMAN HERO BANNER (PATIENT-FIRST NARRATIVE)                */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative pt-6 sm:pt-10 pb-10 sm:pb-14 bg-gradient-to-b from-[#F4F8F5] via-[#F7FAF9] to-white border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Reassuring Human Messaging */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              {/* Warm Local Reassurance Line */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#15965C]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15965C] animate-pulse shrink-0" />
                <span>কৃষ্ণনগর ও সমগ্র নদিয়ার জন্য বিশ্বস্ত চিকিৎসা প্রতিষ্ঠান</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-[#526273] font-medium hidden sm:inline">Nediarpara, Krishnanagar</span>
              </div>

              {/* Main Headline in Warm, Human Tone */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#103653] tracking-tight leading-[1.2]">
                Here to Care for You <br className="hidden sm:inline" />
                <span className="text-[#15965C]">and Your Family.</span>
              </h1>

              {/* Bengali & English Patient Subtitle */}
              <p className="text-sm sm:text-base text-[#526273] leading-relaxed max-w-2xl">
                হীরামনি মেমোরিয়াল হাসপাতাল কৃষ্ণনগরে ২৪ ঘণ্টা জরুরি বিভাগ, অভিজ্ঞ বিশেষজ্ঞ ডাক্তারদের ওপিডি চেম্বার, মডার্ন আইসিইউ এবং সাশ্রয়ী প্যাথলজি ল্যাব নিয়ে সর্বদা আপনার সেবায় প্রস্তুত। কলকাতা যাওয়ার প্রয়োজন ছাড়াই বিশ্বস্ত স্বাস্থ্যসেবা এখন ঘরের কাছেই।
              </p>

              {/* Primary Call / WhatsApp Actions - Large, High-Contrast Tap Targets */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* 1. Book OPD Appointment */}
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-md hover:shadow-lg"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Doctor Appointment</span>
                </Link>

                {/* 2. WhatsApp Direct Booking */}
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#103653] bg-white border-2 border-[#15965C]/40 hover:bg-[#F4F8F5] transition shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#15965C]" />
                  <span>Book via WhatsApp</span>
                </Link>

                {/* 3. 24x7 Emergency One-Tap Call */}
                <a
                  href="tel:+917501074392"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/30 hover:bg-[#FEE2E2] transition shadow-sm"
                  title="Call 24x7 Emergency Casualty"
                >
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                  <span>24x7 Emergency: +91 75010 74392</span>
                </a>
              </div>

              {/* Trust Reassurance Strip */}
              <div className="pt-4 border-t border-[#E5EBEF] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-[#526273]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Govt. Regd. (WB CEA)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Swasthya Sathi Helpdesk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>In-House Pathology Lab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>Cashless Mediclaim TPA</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Clinical Photo Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
                <Image
                  src="/images/hero-consultation.jpg"
                  alt="Doctor consultation at Hiramani Memorial Hospital Krishnanagar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#103653]/85 via-[#103653]/20 to-transparent z-10" />

                {/* Anchored Campus Location Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 flex items-center gap-3 z-20 shadow-md">
                  <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] text-[#15965C] flex items-center justify-center shrink-0 border border-[#15965C]/20">
                    <MapPin className="w-5 h-5 text-[#15965C]" />
                  </div>
                  <div className="text-xs min-w-0">
                    <div className="font-bold text-[#103653] text-sm truncate">
                      Hiramani Memorial Hospital
                    </div>
                    <div className="text-[#526273] text-xs truncate">
                      40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. THE BIG 4 ACTION HUB (ELDERLY & PATIENT-FRIENDLY QUICK TARGETS) */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: 24x7 Emergency Calling */}
          <a
            href="tel:+917501074392"
            className="p-5 rounded-2xl bg-white border-2 border-red-200 hover:border-red-400 transition shadow-md hover:shadow-lg flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                  24 Hours Open
                </span>
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#DC2626] transition">
                Emergency & Casualty
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                জরুরি চিকিৎসার জন্য এখনই ফোন করুন। Immediate doctor response for chest pain, accidents, or acute distress.
              </p>
            </div>
            <div className="pt-2 border-t border-red-100 flex items-center justify-between text-xs font-bold text-[#DC2626]">
              <span>Call: +91 75010 74392</span>
              <span>Tap to Dial ›</span>
            </div>
          </a>

          {/* Card 2: Book on WhatsApp */}
          <Link
            href="/chat"
            className="p-5 rounded-2xl bg-white border-2 border-emerald-200 hover:border-[#15965C] transition shadow-md hover:shadow-lg flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#15965C] flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#15965C] bg-emerald-50 px-2 py-0.5 rounded">
                  Fast & Easy
                </span>
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#15965C] transition">
                Book on WhatsApp
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                হোয়াটসঅ্যাপে ডাক্তার বুকিং করুন। Check doctor timings, fees, and reserve your consultation pass on WhatsApp.
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-[#15965C]">
              <span>WhatsApp: +91 78729 57300</span>
              <span>Start Chat ›</span>
            </div>
          </Link>

          {/* Card 3: Reception Desk Assistance */}
          <a
            href="tel:+917872957300"
            className="p-5 rounded-2xl bg-white border-2 border-sky-200 hover:border-[#159FDB] transition shadow-md hover:shadow-lg flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-sky-50 text-[#159FDB] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#159FDB] bg-sky-50 px-2 py-0.5 rounded">
                  8 AM – 8 PM
                </span>
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#159FDB] transition">
                Reception Helpdesk
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                হাসপাতাল রিসেপশনে কথা বলুন। Speak directly with our reception staff for general enquiries, doctor availability, and reports.
              </p>
            </div>
            <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs font-bold text-[#103653]">
              <span>Call: +91 78729 57300</span>
              <span>Speak to Staff ›</span>
            </div>
          </a>

          {/* Card 4: Location & How to Reach */}
          <a
            href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#103653] transition shadow-md hover:shadow-lg flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-slate-100 text-[#103653] flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Nediarpara
                </span>
              </div>
              <h3 className="text-base font-bold text-[#103653] transition">
                How to Reach Us
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                ইনকাম ট্যাক্স অফিসের কাছে। 5 minutes from Krishnanagar City Junction Railway Station. Easy rickshaw/toto access.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#103653]">
              <span>Near Income Tax Office</span>
              <span>View Map ›</span>
            </div>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. "HOW CAN WE HELP YOU TODAY?" (4 SIMPLE PATIENT PATHWAYS)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[#E5EBEF] pb-4 space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            রোগীদের জন্য সহজ সেবা নির্দেশিকা
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#103653]">
            How Can We Help You Today?
          </h2>
          <p className="text-xs sm:text-sm text-[#526273]">
            Select the service you need for direct phone numbers, doctor timings, and simple guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pathway 1: See a Specialist Doctor */}
          <Link
            href="/doctors"
            className="p-5 rounded-2xl border border-[#E5EBEF] bg-[#F7FAF9] hover:bg-white hover:border-[#15965C] transition space-y-3 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F5] text-[#15965C] flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#15965C] transition">
                1. I want to see a Doctor
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                ডাক্তার দেখাতে চাই। Consult senior specialists in Cardiology, Medicine, Orthopaedics, Surgery, Paediatrics, and Gynaecology.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5EBEF] text-xs font-bold text-[#15965C] flex items-center gap-1">
              <span>View Doctor Chambers & Fees</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pathway 2: Blood Tests & Scans */}
          <Link
            href="/diagnostics"
            className="p-5 rounded-2xl border border-[#E5EBEF] bg-[#F7FAF9] hover:bg-white hover:border-[#159FDB] transition space-y-3 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F0F8FC] text-[#159FDB] flex items-center justify-center font-bold">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#159FDB] transition">
                2. I need a Blood Test or Scan
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                রক্ত পরীক্ষা ও এক্স-রে। Automated pathology, digital X-Ray, 2D Echo Doppler & ultrasound with same-day reports.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5EBEF] text-xs font-bold text-[#159FDB] flex items-center gap-1">
              <span>View Test Tariffs & Fasting Rules</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pathway 3: Admission & Swasthya Sathi */}
          <Link
            href="/insurance"
            className="p-5 rounded-2xl border border-[#E5EBEF] bg-[#F7FAF9] hover:bg-white hover:border-amber-500 transition space-y-3 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-amber-800 transition">
                3. Admission & Swasthya Sathi
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                ভর্তি ও স্বাস্থ্যসাথী কার্ড। Cashless hospitalization across major TPAs and guidance for Swasthya Sathi at Counter 3.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5EBEF] text-xs font-bold text-amber-800 flex items-center gap-1">
              <span>Admission & Cashless Guide</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          {/* Pathway 4: Health Checkup Packages */}
          <Link
            href="/packages"
            className="p-5 rounded-2xl border border-[#E5EBEF] bg-[#F7FAF9] hover:bg-white hover:border-[#15965C] transition space-y-3 flex flex-col justify-between group shadow-sm"
          >
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F4F8F5] text-[#15965C] flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#103653] group-hover:text-[#15965C] transition">
                4. Health Checkup Packages
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                স্বাস্থ্য পরীক্ষা প্যাকেজ। Preventive full-body checkup packages for parents, women, and families starting at ₹1,499.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5EBEF] text-xs font-bold text-[#15965C] flex items-center gap-1">
              <span>Compare Health Packages</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. DOCTOR CHAMBER ROSTER (HUMAN CLINIC NOTICEBOARD STYLE)          */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              আমাদের অভিজ্ঞ চিকিৎসকগণ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#103653]">
              Visiting Specialist Doctors & OPD Chamber Timings
            </h2>
            <p className="text-xs sm:text-sm text-[#526273]">
              Consult senior doctors with transparent fees. Pay directly at the hospital reception counter.
            </p>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#15965C] hover:underline shrink-0"
          >
            <span>View All {initialDoctors.length} Doctors</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Plain Language Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by doctor name or condition (e.g. Heart, Bone, Child, Fever)..."
              value={searchDoctorQuery}
              onChange={e => setSearchDoctorQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] focus:bg-white text-xs sm:text-sm text-[#182B3D] focus:outline-none focus:ring-2 focus:ring-[#15965C] transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedDeptFilter('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedDeptFilter === 'ALL'
                  ? 'bg-[#103653] text-white shadow-sm'
                  : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
              }`}
            >
              All Specialities
            </button>
            {initialDepartments.slice(0, 5).map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDeptFilter(d.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedDeptFilter === d.id
                    ? 'bg-[#103653] text-white shadow-sm'
                    : 'bg-white border border-[#E5EBEF] text-[#526273] hover:bg-slate-50'
                }`}
              >
                {d.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Roster Grid (Human Noticeboard Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.slice(0, 6).map(doc => {
            const portraitUrl = doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/hero-consultation.jpg';

            return (
              <div
                key={doc.id}
                className="p-5 rounded-2xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  {/* Doctor Info Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-[#E5EBEF] shadow-sm">
                      <Image
                        src={portraitUrl}
                        alt={doc.full_name}
                        fill
                        sizes="80px"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#15965C] block">
                        {doc.department_name || doc.speciality}
                      </span>
                      <h3 className="text-base font-bold text-[#103653] leading-snug truncate">
                        {doc.full_name}
                      </h3>
                      <p className="text-xs text-[#526273] font-medium truncate">
                        {doc.qualification}
                      </p>
                      <p className="text-xs text-[#159FDB] font-medium">
                        Chamber: Room {doc.room_number || 'OPD-1'}
                      </p>
                    </div>
                  </div>

                  {/* Consultation Fee & Practical Notice */}
                  <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#526273] block text-[11px]">Consultation Fee</span>
                      <span className="font-extrabold text-[#103653] text-sm">₹{doc.consultation_fee}</span>
                    </div>
                    <span className="text-[11px] text-[#15965C] font-semibold bg-[#F4F8F5] px-2 py-0.5 rounded border border-[#15965C]/20">
                      Pay at Counter
                    </span>
                  </div>
                </div>

                {/* Patient Friendly Tap Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5EBEF]">
                  <Link
                    href={`/book?doctor_id=${doc.id}`}
                    className="py-2.5 px-3 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-white font-bold text-xs text-center transition shadow-sm flex items-center justify-center gap-1"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </Link>

                  <a
                    href="tel:+917872957300"
                    className="py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#103653] font-bold text-xs text-center transition flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#15965C]" />
                    <span>Call Desk</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. SWASTHYA SATHI & CASHLESS ADMISSION REASSURANCE BANNER          */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-[#15965C]/30 bg-gradient-to-br from-[#F4F8F5] via-white to-[#F0F8FC] p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5EBEF] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
                হাসপাতাল ভর্তি ও স্বাস্থ্যসাথী সেবা
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
                Swasthya Sathi & Cashless Mediclaim Desk
              </h2>
              <p className="text-xs sm:text-sm text-[#526273] max-w-2xl">
                Have a Swasthya Sathi Smart Card or private health insurance policy? Visit Counter 3 on the Ground Floor in Krishnanagar for immediate assistance.
              </p>
            </div>

            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#103653] hover:bg-[#0c2a41] text-white text-xs sm:text-sm font-bold transition shadow-sm shrink-0"
            >
              <PhoneCall className="w-4 h-4 text-[#159FDB]" />
              <span>TPA Helpline: +91 78729 57300</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#526273]">
            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-1.5">
              <div className="font-bold text-[#103653] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>Swasthya Sathi Smart Card</span>
              </div>
              <p className="leading-relaxed">
                Bring your original Swasthya Sathi card, patient Aadhaar, and doctor referral slip for on-spot biometric verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-1.5">
              <div className="font-bold text-[#103653] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>Private Health Insurance (TPA)</span>
              </div>
              <p className="leading-relaxed">
                Empanelled with Star Health, Medi Assist, Care, Paramount, Vidal, Raksha, and major national insurance providers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-1.5">
              <div className="font-bold text-[#103653] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#15965C]" />
                <span>Zero Advance Deposit</span>
              </div>
              <p className="leading-relaxed">
                Eligible cashless admissions proceed without upfront hospital room or doctor advance charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. COMMON BLOOD TESTS & SCANS WITH CLEAR FASTING GUIDELINES        */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              প্যাথলজি ও রেডিওলজি রেট চার্ট
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Popular Diagnostic Tests & Transparent Rates
            </h2>
            <p className="text-xs sm:text-sm text-[#526273]">
              Clear test rates with simple fasting instructions. Same-day reports delivered to WhatsApp.
            </p>
          </div>
          <Link
            href="/diagnostics"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#15965C] hover:underline shrink-0"
          >
            <span>View All Tests & Tariffs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialDiagnosticTests.slice(0, 8).map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-3 shadow-sm"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                    {item.code || (item as any).test_code}
                  </span>
                  <span className="text-base font-bold text-[#15965C]">
                    ₹{item.price}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[#103653] leading-snug line-clamp-2">
                  {item.name || (item as any).test_name}
                </h3>

                <p className="text-xs text-[#526273]">
                  Sample: {item.sample_type || 'Clinical Scan'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5EBEF] space-y-2">
                <div className="text-[11px]">
                  {item.fasting_required ? (
                    <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block truncate">
                      • 10-12h Overnight Fasting
                    </span>
                  ) : (
                    <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded block truncate">
                      • No Fasting Needed
                    </span>
                  )}
                </div>

                <a
                  href={`tel:+917872957300`}
                  className="w-full py-1.5 px-2 rounded-lg bg-[#F7FAF9] hover:bg-[#F4F8F5] text-[#15965C] text-xs font-bold text-center block transition border border-[#E5EBEF]"
                >
                  Call to Book Test
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. REAL HOSPITAL INFRASTRUCTURE (MODULAR OT, ICU, PATHOLOGY)       */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            হাসপাতালের আধুনিক পরিকাঠামো
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Modern Clinical Facilities & Critical Care
          </h2>
          <p className="text-xs sm:text-sm text-[#526273]">
            Equipped with sterile laminar airflow theatres, intensive ventilators, and calibrated diagnostic machinery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-[#E5EBEF] overflow-hidden bg-white shadow-sm">
            <div className="h-44 bg-slate-100 relative">
              <Image
                src="/images/ot-surgery.jpg"
                alt="Modular Operation Theatre"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[#103653]">Modular Operation Theatre</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                HEPA filtered sterile airflow with high-definition laparoscopic surgical towers for safe general & gynaecological surgeries.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EBEF] overflow-hidden bg-white shadow-sm">
            <div className="h-44 bg-slate-100 relative">
              <Image
                src="/images/icu-care.jpg"
                alt="Critical Care ICU"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[#103653]">Intensive Care Unit (ICU)</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Mechanical ventilators, multipara cardiac monitors, and 24x7 resident medical officers for critical emergency cases.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EBEF] overflow-hidden bg-white shadow-sm">
            <div className="h-44 bg-slate-100 relative">
              <Image
                src="/images/lab-diagnostics.jpg"
                alt="Automated Pathology Lab"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[#103653]">Automated Pathology Lab</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                5-part hematology and biochemistry analyzers with daily internal quality controls for accurate test results.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5EBEF] overflow-hidden bg-white shadow-sm">
            <div className="h-44 bg-slate-100 relative">
              <Image
                src="/images/radiology-imaging.jpg"
                alt="Digital X-Ray & Ultrasound"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-bold text-[#103653]">Digital X-Ray & 2D Echo</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Low-radiation digital radiography, abdominal USG, and high-frequency 2D Echocardiography with Color Doppler.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. LOCAL CAMPUS DIRECTIONS & VISITING HOURS GUIDE                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Visiting Hours & Rules */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F7FAF9] border border-[#E5EBEF] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[#15965C]">
                <Clock className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">হাসপাতালে রোগী দেখার সময়</span>
              </div>
              <h3 className="text-lg font-bold text-[#103653]">
                Visiting Hours & Family Guidelines
              </h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                To protect our recovering patients from hospital infections, please adhere to official visiting hours:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-[#E5EBEF] flex items-center justify-between">
                  <span className="font-semibold text-[#182B3D]">General & Private Wards</span>
                  <span className="font-bold text-[#15965C]">04:30 PM – 06:30 PM</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#E5EBEF] flex items-center justify-between">
                  <span className="font-semibold text-[#182B3D]">ICU / Critical Care</span>
                  <span className="font-bold text-[#DC2626]">05:00 PM – 06:00 PM (1 Person)</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-[#526273] pt-2 border-t border-[#E5EBEF]">
              Need special attendant passes? Inquire at the main reception desk on the Ground Floor.
            </div>
          </div>

          {/* Krishnanagar Transit Guide */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-[#103653] text-white space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#159FDB]">
                  <Compass className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">কৃষ্ণনগর ক্যাম্পাস ও যাতায়াত</span>
                </div>
                <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded font-mono text-slate-200">
                  PIN-741101
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                How to Reach Hiramani Memorial Hospital
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Address:</strong> 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia - 741101.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">🚆 By Train (Station)</span>
                  <p className="text-[11px] text-slate-300">Approx. 1.5 km (5 mins by Toto/Auto) from Krishnanagar City Junction.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
                  <span className="font-bold text-white block">🚌 By Bus / Highway</span>
                  <p className="text-[11px] text-slate-300">Easy rickshaw access from Krishnanagar Bus Stand & NH-12 (NH-34).</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
              <a
                href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold transition shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="tel:+917872957300"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
              >
                <PhoneCall className="w-4 h-4 text-[#159FDB]" />
                <span>Reception: +91 78729 57300</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
