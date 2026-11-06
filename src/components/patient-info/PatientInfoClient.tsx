'use client';

import React from 'react';
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
} from 'lucide-react';

export function PatientInfoClient() {
  const wards = [
    {
      name: 'General Inpatient Ward',
      type: 'Multi-Bed Sharing',
      features: ['Central oxygen supply', 'Nurse call bell system', 'Shared sanitized washrooms', 'Daily consultant rounds'],
      suited: 'Cost-effective clinical inpatient care',
    },
    {
      name: 'Semi-Private Room',
      type: 'Twin Sharing (2 Beds)',
      features: ['Air-conditioned comfort', 'Attendant couch / reclining chair', 'Attached private washroom', 'Television & diet service'],
      suited: 'Balanced privacy and clinical monitoring',
    },
    {
      name: 'Deluxe Private Cabin',
      type: 'Single Occupancy',
      features: ['Independent motorized hospital bed', 'Sofa-cum-bed for family attendant', 'Private refrigerator & LED TV', 'Dedicated nurse-to-bed ratio'],
      suited: 'Maximum privacy and family comfort',
    },
    {
      name: 'Intensive Care Unit (ICU / HDU)',
      type: 'Critical Care Monitoring',
      features: ['Multipara invasive monitors', 'Mechanical ventilator support', 'Continuous arterial line & ECG', '1:1 Critical care nursing'],
      suited: 'Post-operative, cardiac & trauma resuscitation',
    },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Patient & Family Hospital Guide • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Patient Information & Facilities Guide
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Essential information regarding inpatient admission protocols, visiting hours, room amenities, cashless mediclaim support, and discharge procedures at our Nediarpara hospital campus.
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
                Restricted to 1 visitor at a time to maintain infection control and patient rest.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#103653]">
              <Users className="w-4 h-4 text-[#159FDB]" />
              <span>Attendant Passes</span>
            </div>
            <p className="text-xs text-[#526273] leading-relaxed">
              One 24-hour attendant pass is issued per inpatient bed upon admission. Attendants must wear or carry the pass within clinical corridors at all times.
            </p>
            <div className="text-[11px] text-[#15965C] font-semibold pt-1">
              • Emergency replacement pass: Ground floor helpdesk
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
            Step-by-Step Inpatient Admission & Discharge
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STEP 01</span>
            <h3 className="text-sm font-bold text-[#103653]">Clinical Evaluation</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Consultant physician recommends admission via OPD prescription or emergency trauma triage.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STEP 02</span>
            <h3 className="text-sm font-bold text-[#103653]">Admission Desk</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Submit patient photo ID, emergency contact details, and any mediclaim/TPA policy card.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STEP 03</span>
            <h3 className="text-sm font-bold text-[#103653]">Ward Transfer</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Escort to selected room or bed category with nurse handover, vitals baseline, and doctor visit.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STEP 04</span>
            <h3 className="text-sm font-bold text-[#103653]">Discharge Summary</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Detailed discharge certificate, medication instructions, and digital report copies handed to family.
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

      {/* 5. Emergency Contact Assistance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#103653] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Need Immediate Admission Guidance?</h3>
            <p className="text-xs text-slate-300">
              Our 24x7 admission helpdesk in Nediarpara is available round the clock for patient queries.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#15965C] hover:bg-[#117A4A] text-white transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call +91 78729 57300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
