import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  Building2,
  Award,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Hiramani Memorial Hospital Kolkata',
  description:
    'Learn about Hiramani Memorial Hospital, our clinical governance, vision, state-of-the-art medical infrastructure, and patient-first compassionate healing mission in Kolkata.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>Serving Kolkata & South 24 Parganas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Hiramani Memorial Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Founded with a vision to deliver exceptional clinical care with warmth, dignity, and transparency.
            We combine leading medical specialists, modern technology, and round-the-clock emergency infrastructure.
          </p>
        </div>
      </section>

      {/* 2. Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-[#0e4a7b] flex items-center justify-center">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Clinical Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To provide accessible, evidence-based, high-quality medical and surgical healthcare to every patient
              regardless of socioeconomic background. We maintain transparent pricing, ethical medical practices,
              and patient safety as our highest priorities.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Our Vision for Healing</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the most trusted community healthcare destination in South Kolkata, recognized for excellence
              in emergency trauma care, preventive health diagnostics, compassionate patient rehabilitation, and
              rapid digital access.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Our Core Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            The Pillars of Our Patient Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Clinical Integrity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every clinical decision is guided strictly by medical merit, scientific protocols, and patient welfare.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0e4a7b] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Compassion & Empathy</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We treat every patient like our own family, listening attentively and explaining diagnoses in clear Bengali, Hindi, or English.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Transparent Pricing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Clear OPD consultation fees, standardized diagnostic test rates, and itemized billing with zero unexpected markups.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">24x7 Preparedness</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Round-the-clock casualty, ICU resuscitation team, emergency pathology, and dedicated ambulance response.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Infrastructure Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Modern Clinical Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Equipped to Support Critical Emergencies & Surgeries
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Intensive Care Unit (ICU)
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Equipped with invasive and non-invasive ventilators, multi-channel central monitoring, syringe pumps,
                and dedicated critical care staff for trauma and postoperative recovery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Modular Operation Theatres
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Laminar airflow, anti-bacterial flooring, modern anaesthesia workstations, and high-definition laparoscopy
                units for sterile, safe surgical interventions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Diagnostic Imaging & Lab
              </h4>
              <p className="text-slate-400 leading-relaxed">
                In-house digital radiography (X-Ray), 2D Echocardiography with Color Doppler, ultrasonography (USG),
                and automated clinical biochemistry and haematology analyzers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Patient Charter & Quality Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6 bg-white">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Patient Rights & Quality Assurance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Your Rights as a Patient:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Right to informed consent before any clinical investigation or surgical procedure.</li>
                <li>Right to privacy and confidentiality regarding all medical records and diagnostic results.</li>
                <li>Right to know the identity, qualifications, and department of attending doctors and nurses.</li>
                <li>Right to receive an itemized, transparent bill for all medications, bed charges, and tests.</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900">Quality & Safety Standards:</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Strict adherence to infection prevention and hospital bio-medical waste segregation guidelines.</li>
                <li>Periodic clinical audits and double-check protocols for medication delivery and blood administration.</li>
                <li>Continuous maintenance and calibration of all diagnostic analyzers and patient monitors.</li>
                <li>Formal patient grievance and feedback resolution channel via the hospital CRM desk.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Registered under the West Bengal Clinical Establishments (Registration, Regulation and Transparency) Act.
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] transition"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Doctor Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

