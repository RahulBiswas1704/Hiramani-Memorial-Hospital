import React from 'react';
import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Cashless Mediclaim, Insurance & TPA Desk | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Cashless hospitalization, private health insurance TPAs, Swasthya Sathi scheme information, and pre-authorization documentation at Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export default function InsurancePage() {
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
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <CreditCard className="w-3.5 h-3.5 text-hospital-green" />
            <span>Dedicated TPA & Mediclaim Desk • Krishnanagar Campus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Cashless Hospitalization & Insurance
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital facilitates streamlined cashless medical treatment for eligible policyholders. Our dedicated insurance desk assists patients and families with pre-authorization, document queries, and claim filing.
          </p>
        </div>
      </section>

      {/* 2. Verification Disclaimer Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-sm block">Insurance Empanelment Notice:</strong>
            <p className="text-amber-800 leading-relaxed">
              Cashless hospitalisation is subject to individual policy terms, pre-authorization approval from your respective insurance company / Third Party Administrator (TPA), and verified active empanelment at the time of admission. Partnerships marked as <em>Subject to Hospital Confirmation</em> are subject to periodic renewal. Please verify with our TPA desk upon planned admission.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Empanelled Insurers & TPAs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Network Coverage
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Health Insurance & TPA Directory
          </h2>
          <p className="text-xs text-slate-500">
            Contact our cashless helpdesk at +91 78729 57300 or +91 75010 74392 to verify pre-authorization requirements for your policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insurers.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3 hover:border-hospital-green transition"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-hospital-green/10 text-hospital-green flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.name}
                </h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block text-center ${
                  item.verified
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cashless Pre-Auth 4-Step Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Hassle-Free Process
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            How Cashless Hospitalization Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-hospital-green/10 text-hospital-green font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h4 className="text-base font-bold text-slate-900">Document Submission</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Submit your Insurance Card, Aadhaar Card, PAN Card, and Doctor Admission Advice to our TPA counter.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-hospital-blue/10 text-hospital-blue font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h4 className="text-base font-bold text-slate-900">Pre-Auth Request</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our hospital insurance team drafts and submits the cashless pre-authorization form to your TPA portal.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-hospital-green/10 text-hospital-green font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h4 className="text-base font-bold text-slate-900">Initial Approval</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              TPA issues initial sanction within 3 to 6 hours. Patient is admitted with zero or nominal refundable security deposit.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-hospital-blue/10 text-hospital-blue font-bold text-sm flex items-center justify-center">
              04
            </div>
            <h4 className="text-base font-bold text-slate-900">Final Settlement</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upon discharge, final hospital bills are sent to the insurer for authorization. Non-medical items are settled directly.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Required Documents Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Checklist of Documents for Cashless Claims
            </h3>
            <p className="text-xs text-slate-500">
              Please carry original documents along with two sets of self-attested photocopies:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Valid Health Insurance Card or Policy Schedule copy</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Government Photo ID of Patient (Aadhaar / Voter ID / Passport)</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Government Photo ID and PAN Card of Primary Proposer</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Treating Doctor’s Prescription & Admission Recommendation</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Past Medical Consultation Records & Diagnostic Reports</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
              <span>Cancelled Cheque of Proposer for direct claim credit (if required)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
            <span className="text-xs text-slate-500">
              Need assistance with your insurance claim? Visit our Cashless Desk in the central reception lobby.
            </span>
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call TPA Helpdesk: +91 78729 57300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
