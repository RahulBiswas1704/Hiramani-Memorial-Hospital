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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cashless Mediclaim, Insurance & TPA Desk | Hiramani Memorial Hospital Kolkata',
  description:
    'Cashless hospitalization, private health insurance TPAs, Swasthya Sathi scheme information, and pre-authorization documentation at Hiramani Memorial Hospital Kolkata.',
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
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <CreditCard className="w-3.5 h-3.5 text-teal-600" />
            <span>Dedicated TPA & Mediclaim Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Cashless Hospitalization & Insurance
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital facilitates hassle-free cashless medical treatment for eligible policyholders.
            Our dedicated insurance desk assists you with pre-authorization, claim forms, and hospital queries.
          </p>
        </div>
      </section>

      {/* 2. Verification Disclaimer Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">Insurance Empanelment Notice:</strong>
            <p className="text-amber-800">
              Cashless hospitalisation is subject to individual policy terms, pre-authorization approval from your respective
              insurance company / Third Party Administrator (TPA), and verified active empanelment at the time of admission.
              Unconfirmed partnerships below are explicitly marked as <em>Subject to Hospital Confirmation</em> pending formal
              annual renewal.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Empanelled Insurers & TPAs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Health Insurance & TPA Directory
          </h2>
          <p className="text-xs text-slate-500">
            Check with our cashless desk on +91 78729 57300 to confirm current pre-authorization protocols for your policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insurers.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0e4a7b] flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.name}
                </h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block text-center ${
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

      {/* 4. Government Health Schemes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Government Healthcare Schemes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Swasthya Sathi Scheme</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Verification Pending
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              West Bengal Government&apos;s flagship universal health scheme. Empanelment and specialty-specific package
              availability are currently being finalized with the District Health Administration. Please check with
              the helpdesk prior to planned admission.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Ayushman Bharat (PM-JAY)</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Verification Pending
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              National health protection scheme for eligible families. Documentation and hospital registration status
              are under administrative review.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Pre-Authorization Checklist */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Documents Required for Cashless Pre-Authorization
            </h3>
            <p className="text-xs text-slate-500">
              Submit these documents at the Cashless Desk to initiate the approval process with your TPA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Health Card & Policy</span>
              </div>
              <p>Original Health Insurance E-card and latest policy copy showing policyholder details.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Government ID Proof</span>
              </div>
              <p>Aadhaar Card, PAN Card, or Voter ID of the patient as well as the primary policyholder.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Doctor&apos;s Prescription</span>
              </div>
              <p>Specialist consultation prescription advising hospitalization and preliminary diagnosis.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 space-y-1.5 border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Diagnostic Test Reports</span>
              </div>
              <p>All recent blood test reports, X-Rays, ECGs, or ultrasound scans supporting the diagnosis.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-500">
              <strong>TPA Desk Hours:</strong> Monday – Saturday: 09:00 AM – 06:00 PM (Emergency pre-auth handled 24x7)
            </div>
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 font-bold text-[#0e4a7b] hover:underline"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Cashless Desk: +91 78729 57300</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
