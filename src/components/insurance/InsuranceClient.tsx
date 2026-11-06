'use client';

import React from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  PhoneCall,
  HelpCircle,
  ChevronRight,
  Building2,
} from 'lucide-react';

export function InsuranceClient() {
  const insurers = [
    { name: 'Star Health and Allied Insurance', status: 'Empanelled Partner', verified: true },
    { name: 'Medi Assist Insurance TPA', status: 'Empanelled Partner', verified: true },
    { name: 'HDFC ERGO General Insurance', status: 'Subject to Hospital Confirmation', verified: false },
    { name: 'ICICI Lombard General Insurance', status: 'Subject to Hospital Confirmation', verified: false },
    { name: 'Care Health Insurance', status: 'Subject to Hospital Confirmation', verified: false },
    { name: 'Paramount Health Services TPA', status: 'Subject to Hospital Confirmation', verified: false },
    { name: 'Raksha Health Insurance TPA', status: 'Subject to Hospital Confirmation', verified: false },
    { name: 'Vidal Health Insurance TPA', status: 'Subject to Hospital Confirmation', verified: false },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Dedicated TPA & Mediclaim Desk • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Cashless Hospitalization & Insurance
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital facilitates streamlined cashless medical treatment for eligible policyholders. Our dedicated insurance desk assists patients and families with pre-authorization, document submission, and claim approvals.
          </p>
        </div>
      </section>

      {/* 2. Verification Disclaimer Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-sm block">Insurance Empanelment Notice:</strong>
            <p className="text-amber-800 leading-relaxed">
              Cashless hospitalisation is subject to individual policy terms, pre-authorization approval from your respective insurance company / Third Party Administrator (TPA), and active empanelment at the time of admission. Partnerships marked as <em>Subject to Hospital Confirmation</em> undergo periodic renewal. Please verify with our TPA desk prior to planned admission.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Empanelled Insurers & TPAs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Network Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Health Insurance & TPA Directory
          </h2>
          <p className="text-xs text-[#526273]">
            Contact our cashless helpdesk at +91 78729 57300 to verify pre-authorization requirements for your policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insurers.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition space-y-2.5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Partner {String(idx + 1).padStart(2, '0')}
                </span>
                {item.verified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15965C] bg-[#F4F8F5] px-2 py-0.5 rounded border border-[#15965C]/20">
                    <CheckCircle2 className="w-3 h-3 text-[#15965C]" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Verify at Desk
                  </span>
                )}
              </div>

              <h3 className="text-xs font-bold text-[#103653] leading-snug">
                {item.name}
              </h3>

              <div className="pt-2 border-t border-[#E5EBEF] text-[11px] text-[#526273]">
                <span>Status: <strong>{item.status}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Pre-Authorization Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Cashless Workflow
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            How to Avail Cashless Hospitalization
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STAGE 01</span>
            <h3 className="text-sm font-bold text-[#103653]">Pre-Authorization Submission</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Submit your TPA card, Aadhaar, and doctor advice at the insurance desk at least 48h prior to planned surgery.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STAGE 02</span>
            <h3 className="text-sm font-bold text-[#103653]">Insurer Approval</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              TPA desk coordinates directly with your insurance provider to secure the initial pre-authorization sanction letter.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#15965C]">STAGE 03</span>
            <h3 className="text-sm font-bold text-[#103653]">Cashless Admission</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Patient is admitted with zero cash deposit towards approved medical expenses (non-medical items excluded).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
            <span className="text-xs font-bold text-[#159FDB]">STAGE 04</span>
            <h3 className="text-sm font-bold text-[#103653]">Final Settlement</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Upon discharge, hospital sends the final bill and discharge summary directly to the TPA for claim closure.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Documents Required Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl border border-[#E5EBEF] bg-white space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-[#103653] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#15965C]" />
            <span>Checklist of Documents for Cashless Pre-Authorization</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs text-[#526273]">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
              <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
              <span>Original Health Insurance Card / Policy</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
              <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
              <span>Government Photo ID (Aadhaar / Voter)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
              <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
              <span>Doctor Consultation Prescription</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
              <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0" />
              <span>Relevant Diagnostic & Lab Reports</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TPA Desk Direct Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#103653] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">Have Questions About Your Health Policy?</h3>
            <p className="text-xs text-slate-300">
              Speak directly with our in-house TPA claims coordinator in Nediarpara, Krishnanagar.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#15965C] hover:bg-[#117A4A] text-white transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>TPA Desk: +91 78729 57300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
