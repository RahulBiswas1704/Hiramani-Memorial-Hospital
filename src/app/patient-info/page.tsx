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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patient Guide, Admission & Hospital Facilities | Hiramani Memorial Hospital Kolkata',
  description:
    'Comprehensive patient guide for admissions, visiting hours, ward categories, discharge procedures, and inpatient amenities at Hiramani Memorial Hospital Kolkata.',
};

export default function PatientInfoPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Patient & Visitor Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Patient Information & Facilities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Everything you and your family need to know about inpatient admission, visiting policies, room types,
            discharge protocols, and hospital amenities.
          </p>
        </div>
      </section>

      {/* 2. Visiting Hours & Inpatient Policy Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0e4a7b] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Visiting Hours</h3>
            <div className="text-xs text-slate-600 space-y-1">
              <div><strong>Morning:</strong> 11:00 AM – 01:00 PM</div>
              <div><strong>Evening:</strong> 05:00 PM – 07:00 PM</div>
              <p className="text-slate-400 pt-1">
                Restricted to 1 visitor at a time to minimize infection risks and maintain patient tranquility.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Attendant Passes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              One 24-hour attendant pass is issued per inpatient room during admission. Attendants must carry the pass
              at all times within hospital premises.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Cashless & TPA Desk</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our dedicated insurance desk assists with pre-authorization and document filing for recognized private
              mediclaim policies and government healthcare schemes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Inpatient Admission Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Admission Procedure
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Planned Admission */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              Planned Surgical / Medical Admission
            </h3>
            <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Consult your specialist during OPD hours and obtain an Admission Recommendation Slip.</li>
              <li>Visit the Admission Helpdesk in the main lobby with your Government ID proof (Aadhaar/Voter ID).</li>
              <li>Select your preferred room/ward category based on availability.</li>
              <li>For insurance patients, submit your TPA e-card and policy documents to the Cashless Desk at least 24 hours prior.</li>
              <li>Complete admission paperwork and proceed to the designated nursing station.</li>
            </ol>
          </div>

          {/* Emergency Admission */}
          <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 space-y-4">
            <h3 className="text-base font-bold text-red-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Emergency & Casualty Admission
            </h3>
            <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Patients arriving in emergency casualty receive immediate medical triage and stabilization by the Resident Medical Officer.</li>
              <li>Clinical care commences immediately—paperwork never delays emergency treatment.</li>
              <li>The patient’s family or attendant completes registration at the emergency admission counter once the patient is stabilized.</li>
              <li>Direct transfer to the ICU, HDU, or Emergency Observation Ward as indicated by the attending specialist.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Room & Ward Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Accommodation & Ward Options
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-slate-900">Intensive Care Unit (ICU)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Continuous multi-para invasive monitoring, motorized beds, dedicated critical care nurse-to-patient ratio of 1:1, and central oxygen.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-slate-900">Deluxe AC Cabin</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Private air-conditioned room with television, attached private bathroom, sofa-cum-bed for attendant, and personalized nursing care.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-slate-900">Semi-Private Room</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dual-sharing air-conditioned room with privacy curtains, bedside attendant chair, and shared clean bathroom.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-base font-bold text-slate-900">General Medical Ward</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Separate male and female general wards equipped with clean bedding, ceiling fans, central nursing station, and hygienic sanitation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Discharge Process & Pharmacy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <h3 className="text-lg font-bold">Discharge Procedure & Medication Guidelines</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Discharge is authorized by your attending consultant during morning rounds. The hospital billing department
            prepares an itemized summary within 2 to 3 hours. Your nurse will provide the Discharge Summary, explain
            prescriptions, schedule your follow-up OPD appointment, and deliver take-home medications from our 24x7 in-house pharmacy.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:underline"
            >
              <span>Have questions about admission? Contact our Reception Desk</span>
              <PhoneCall className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

