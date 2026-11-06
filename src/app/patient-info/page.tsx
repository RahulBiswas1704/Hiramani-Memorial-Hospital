import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  PhoneCall,
  CalendarCheck,
  CreditCard,
  Users,
  Bed,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Guide, Admission & Hospital Facilities | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Comprehensive patient guide for inpatient admissions, visiting hours, ward options, discharge procedures, and amenities at Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export default function PatientInfoPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-hospital-green" />
            <span>Patient & Family Hospital Guide • Krishnanagar Campus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Patient Information & Facilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Everything you and your family need to know regarding inpatient admission, visiting hours, ward categories, transparent billing, and discharge procedures.
          </p>
        </div>
      </section>

      {/* 2. Visiting Hours & Inpatient Policy Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-hospital-green/10 text-hospital-green flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Visiting Hours</h3>
            <div className="text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-700">Morning Session:</span>
                <span className="font-bold text-hospital-green">11:00 AM – 01:00 PM</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                <span className="font-semibold text-slate-700">Evening Session:</span>
                <span className="font-bold text-hospital-green">05:00 PM – 07:00 PM</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Restricted to 1 visitor at a time to minimize infection risks and maintain patient tranquility.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-hospital-blue/10 text-hospital-blue flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Attendant Passes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              One 24-hour attendant pass is issued per inpatient room during admission. Attendants must wear or display the pass within hospital wards at all times.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cashless & TPA Desk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our dedicated ground floor helpdesk assists with pre-authorization and claim submission for recognized mediclaim policies and government health cards.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Inpatient Admission Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Hospital Admission Pathways
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Standard Admission Procedures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Planned Admission */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-hospital-green" />
              <span>Planned Medical / Surgical Admission</span>
            </h3>
            <ol className="text-xs text-slate-600 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>Consult your specialist during OPD hours and obtain an official Admission Recommendation Slip.</li>
              <li>Visit the Admission Helpdesk in the central reception lobby with photo ID (Aadhaar or Voter ID).</li>
              <li>Select your preferred accommodation category (ICU, Deluxe Cabin, Semi-Private, or General Ward).</li>
              <li>For cashless mediclaim patients, submit policy e-card and doctor recommendation to the TPA Desk.</li>
              <li>Complete the admission deposit (if applicable) and proceed to the designated nursing station.</li>
            </ol>
          </div>

          {/* Emergency Admission */}
          <div className="p-6 sm:p-8 rounded-3xl bg-red-50/50 border border-red-200 space-y-4">
            <h3 className="text-base font-bold text-red-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>24x7 Emergency & Casualty Admission</span>
            </h3>
            <ol className="text-xs text-slate-700 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>Patients arriving in emergency casualty receive immediate medical triage and vital stabilization by the Resident Medical Officer.</li>
              <li>Clinical care commences immediately—paperwork never delays urgent life-saving resuscitation.</li>
              <li>The accompanying family member registers at the casualty counter once the patient is medically stabilized.</li>
              <li>Immediate bed allocation to ICU, High Dependency Unit (HDU), or observation as directed by the treating specialist.</li>
              <li>Direct telephone updates provided to next of kin regarding condition and ongoing interventions.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Room & Ward Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Inpatient Accommodation
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Ward & Room Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-hospital-blue/10 text-hospital-blue flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Intensive Care Unit (ICU)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Continuous multi-para invasive monitoring, motorized beds, 1:1 nurse-to-patient critical care ratio, central oxygen and ventilators.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-hospital-green/10 text-hospital-green flex items-center justify-center">
              <Bed className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Deluxe AC Cabin</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Private air-conditioned cabin with LED TV, en-suite sanitized bathroom, attendant sofa-cum-bed, and dedicated nurse call bell.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Semi-Private Room</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Twin-sharing air-conditioned room with individual privacy curtains, attendant bedside chair, and shared sanitized bathroom.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">General Medical Ward</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Separate male and female general wards equipped with clean bedding, central nursing supervision, and hygienic sanitation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Discharge Process & Pharmacy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-hospital-slate text-white space-y-4">
          <div className="flex items-center gap-2 text-hospital-green text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Smooth Inpatient Discharge</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">Discharge Procedure & Medication Guidelines</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Discharges are authorized by your attending consultant during morning rounds. The hospital billing department prepares an itemized summary within 2 to 3 hours. Your nurse will provide the signed Discharge Summary, explain follow-up dates, and deliver take-home medications from our 24x7 in-house pharmacy counter.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition"
            >
              <PhoneCall className="w-4 h-4 text-hospital-green" />
              <span>Reception Helpdesk: +91 78729 57300</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-hospital-green hover:underline"
            >
              <span>View Krishnanagar Campus Location</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
