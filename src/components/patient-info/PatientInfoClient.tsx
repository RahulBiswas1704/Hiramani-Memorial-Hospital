'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText,
  CreditCard,
  Users,
  Bed,
  PhoneCall,
  CalendarCheck,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Accessibility,
  Utensils,
  Pill,
  Zap,
} from 'lucide-react';

export function PatientInfoClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const wards = [
    {
      name: 'General Inpatient Ward',
      type: 'Multi-Bed Sharing',
      features: ['Central piped medical oxygen', 'Nurse call bell at bedside', 'Shared sanitized washrooms', 'Daily consultant rounds & vitals tracking'],
      suited: 'Cost-effective clinical inpatient care',
    },
    {
      name: 'Semi-Private Room',
      type: 'Twin Sharing (2 Beds)',
      features: ['Individual air-conditioning control', 'Attendant couch / reclining chair', 'Attached sanitized private washroom', 'In-room television & diet service'],
      suited: 'Balanced privacy and clinical monitoring',
    },
    {
      name: 'Deluxe Private Cabin',
      type: 'Single Occupancy',
      features: ['Motorized multi-position hospital bed', 'Sofa-cum-bed for family attendant', 'Private refrigerator & LED television', 'Dedicated nurse-to-bed allocation'],
      suited: 'Maximum privacy and family comfort',
    },
    {
      name: 'Intensive Care Unit (ICU / HDU)',
      type: 'Critical Care Monitoring',
      features: ['Multipara invasive physiological monitors', 'Mechanical ventilator support systems', 'Continuous arterial line & 12-lead ECG', '1:1 Critical care nursing surveillance'],
      suited: 'Post-operative, cardiac & trauma resuscitation',
    },
  ];

  const amenities = [
    {
      icon: <Pill className="w-5 h-5 text-[#15965C]" />,
      title: '24x7 In-House Pharmacy',
      desc: 'Genuine medicines, surgical consumables, and emergency IV formulations available round the clock at hospital billing counter.',
    },
    {
      icon: <Accessibility className="w-5 h-5 text-[#159FDB]" />,
      title: 'Wheelchair & Stretcher Transit',
      desc: 'Free wheelchair assistance, stretcher trolleys, and dedicated wide bed-lifts connecting all inpatient floors seamlessly.',
    },
    {
      icon: <Utensils className="w-5 h-5 text-[#15965C]" />,
      title: 'Therapeutic Diet Service',
      desc: 'Hygienic meals tailored to doctor instructions (diabetic, low-sodium, renal, or liquid diets) prepared fresh daily.',
    },
    {
      icon: <Zap className="w-5 h-5 text-[#159FDB]" />,
      title: 'Uninterrupted Power & Oxygen',
      desc: '100% generator power backup and piped central oxygen manifold ensuring zero downtime in ICU and OT suites.',
    },
    {
      icon: <Users className="w-5 h-5 text-[#15965C]" />,
      title: 'Attendant Waiting Lounges',
      desc: 'Comfortable waiting areas with filtered drinking water, mobile charging points, and sanitized restrooms for patient families.',
    },
    {
      icon: <CreditCard className="w-5 h-5 text-[#159FDB]" />,
      title: 'Cashless & Digital Billing',
      desc: 'Transparent itemized invoices with support for private mediclaim, TPA pre-authorization, UPI, and debit cards.',
    },
  ];

  const faqs = [
    {
      q: 'What documents are required at the time of hospital admission?',
      a: 'Please carry: 1) Doctor admission advice or OPD prescription, 2) Patient Government Photo ID (Aadhaar/Voter Card), 3) All past medical files and investigation reports, 4) TPA or health insurance card if availing cashless hospitalization.',
    },
    {
      q: 'Are visitors allowed outside scheduled visiting hours?',
      a: 'To maintain patient recovery, infection control, and sterile clinical environments, visitors are strictly permitted only during 11:00 AM – 01:00 PM and 05:00 PM – 07:00 PM. One primary attendant holding an official 24-hour pass is permitted at bedside.',
    },
    {
      q: 'How are inpatient billing updates communicated to families?',
      a: 'An interim itemized bill is available daily at the billing desk upon request. Our financial counselor reviews estimated surgical packages, bed charges, and medication usage with family members to ensure complete transparency before discharge.',
    },
    {
      q: 'What is the discharge procedure and timeline?',
      a: 'Discharges are initiated following morning doctor rounds (typically between 10:00 AM and 01:00 PM). Once the treating physician prepares the discharge summary, pharmacy accounts and TPA approvals are finalized, and take-home medications are explained.',
    },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Header & Breadcrumb */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-semibold">Patient Information & Guide</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider pt-1">
            <Building2 className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Patient & Family Hospital Guide • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Patient Information & Facilities Guide
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Essential information regarding inpatient admission protocols, visiting hours, ward options, amenities, cashless mediclaim support, and discharge procedures at our Nediarpara hospital campus.
          </p>
        </div>
      </section>

      {/* 2. Visiting Hours & Inpatient Timetable */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#103653]">
              <Clock className="w-4 h-4 text-[#15965C]" />
              <span>Ward Visiting Hours</span>
            </div>
            <div className="space-y-2 text-xs text-[#526273]">
              <div className="flex items-center justify-between border-b border-[#E5EBEF] pb-1.5">
                <span className="font-semibold text-[#182B3D]">Morning Session:</span>
                <span className="font-bold text-[#15965C]">11:00 AM – 01:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#E5EBEF] pb-1.5">
                <span className="font-semibold text-[#182B3D]">Evening Session:</span>
                <span className="font-bold text-[#15965C]">05:00 PM – 07:00 PM</span>
              </div>
              <p className="text-[11px] text-[#526273] pt-1">
                Restricted to 1 visitor at a time to maintain infection control and clinical tranquility.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#103653]">
              <Users className="w-4 h-4 text-[#159FDB]" />
              <span>Attendant Passes</span>
            </div>
            <p className="text-xs text-[#526273] leading-relaxed">
              One 24-hour attendant pass is issued per inpatient bed upon admission. Attendants must wear or display the pass within clinical corridors at all times.
            </p>
            <div className="text-[11px] text-[#15965C] font-semibold pt-1">
              • Replacement or lost passes: Ground floor admission helpdesk
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#103653]">
              <CreditCard className="w-4 h-4 text-[#15965C]" />
              <span>Transparent Billing</span>
            </div>
            <p className="text-xs text-[#526273] leading-relaxed">
              Daily itemized billing summaries are available for inpatient families. Advance deposits and final invoices comply strictly with West Bengal Clinical Establishments regulations.
            </p>
            <div className="text-[11px] text-[#526273]">
              UPI, debit/credit cards, and cash accepted at billing counter.
            </div>
          </div>
        </div>
      </section>

      {/* 3. Inpatient Admission Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Hospital Admission Process
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Step-by-Step Inpatient Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STEP 01</span>
            <h3 className="text-sm font-bold text-[#103653]">Clinical Evaluation</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Consultant physician evaluates patient in OPD chamber or 24x7 emergency triage and recommends admission.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STEP 02</span>
            <h3 className="text-sm font-bold text-[#103653]">Admission Desk</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Family presents doctor prescription, Government ID card, and mediclaim policy details at the counter.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STEP 03</span>
            <h3 className="text-sm font-bold text-[#103653]">Ward Allocation</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Patient is escorted to selected ward/cabin with nurse handover, vitals baseline, and initial medication setup.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STEP 04</span>
            <h3 className="text-sm font-bold text-[#103653]">Active Care</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Round-the-clock nursing supervision, scheduled consultant rounds, therapeutic meals, and lab investigations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STEP 05</span>
            <h3 className="text-sm font-bold text-[#103653]">Discharge Summary</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Detailed discharge certificate, diet advice, take-home prescription, and follow-up appointment booking.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Ward Categories & Room Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Inpatient Accommodation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Ward Categories & Clinical Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {wards.map((ward, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition space-y-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[#E5EBEF] pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#103653]">{ward.name}</h3>
                  <span className="text-xs text-[#159FDB] font-medium">{ward.type}</span>
                </div>
                <Bed className="w-5 h-5 text-slate-400" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526273]">
                {ward.features.map((feat, fidx) => (
                  <div key={fidx} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-[#526273] border-t border-[#E5EBEF] flex items-center justify-between">
                <span>Recommended: <strong>{ward.suited}</strong></span>
                <Link href="/contact" className="text-xs font-bold text-[#15965C] hover:underline">
                  Inquire Tariff ›
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Hospital Amenities & Infrastructure Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Campus Amenities
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Patient Services & Support Facilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-2.5 shadow-sm"
            >
              <div className="p-2 rounded-lg bg-[#F7FAF9] inline-block border border-[#E5EBEF]">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-[#103653]">{item.title}</h3>
              <p className="text-xs text-[#526273] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Patient Rights & Responsibilities Charter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] space-y-6">
          <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Institutional Ethics & Governance
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Patient Rights & Responsibilities Charter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#526273]">
            {/* Patient Rights */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#103653] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#15965C]" />
                <span>Your Rights as a Patient:</span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0 mt-0.5" />
                  <span>Right to receive dignified, respectful, and non-discriminatory clinical care regardless of background.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0 mt-0.5" />
                  <span>Right to informed consent and comprehensive explanation of diagnoses, risks, and treatment options.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0 mt-0.5" />
                  <span>Right to strict confidentiality of your digital health records and clinical notes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0 mt-0.5" />
                  <span>Right to receive transparent, itemized billing statements with clear medication and lab costs.</span>
                </li>
              </ul>
            </div>

            {/* Patient Responsibilities */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#103653] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#159FDB]" />
                <span>Patient & Family Responsibilities:</span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159FDB] shrink-0 mt-0.5" />
                  <span>Provide accurate, complete medical history including allergies, current medications, and past surgeries.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159FDB] shrink-0 mt-0.5" />
                  <span>Adhere to hospital visiting hours and room attendant limitations to maintain patient safety.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159FDB] shrink-0 mt-0.5" />
                  <span>Respect the 100% smoke-free and tobacco-free status of the entire Krishnanagar medical campus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#159FDB] shrink-0 mt-0.5" />
                  <span>Treat nursing staff, doctors, and fellow patients with courtesy and mutual respect.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Admission Guidance FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Common Queries
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Frequently Asked Questions on Hospital Admission
          </h2>
        </div>

        <div className="divide-y divide-[#E5EBEF] rounded-xl border border-[#E5EBEF] bg-white">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#103653] hover:text-[#15965C] transition gap-4"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#159FDB] shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-[#15965C]' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="pt-3 pl-6 text-xs text-[#526273] leading-relaxed border-t border-slate-100 mt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. 24x7 Admission Helpline Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#103653] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Need Urgent Inpatient Admission Guidance?</h3>
            <p className="text-xs text-slate-300">
              Our 24x7 admission helpdesk in Nediarpara is available round the clock for bed availability & triage queries.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#15965C] hover:bg-[#117A4A] text-white transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpdesk: +91 78729 57300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
