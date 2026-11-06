import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
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
  Activity,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Learn about Hiramani Memorial Hospital in Krishnanagar, Nadia. Discover our clinical governance, hospital infrastructure, modular OTs, critical care ICU, and patient-first compassionate healing mission.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-20 pb-20 bg-white text-[#182B3D]">
      {/* 1. EDITORIAL HEADER & INSTITUTIONAL PROFILE */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-14 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <span>Institutional Profile • Krishnanagar, Nadia</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight max-w-4xl leading-[1.18] break-words">
            Providing Accessible, Evidence-Based Healthcare to Nadia District
          </h1>

          <p className="text-base sm:text-lg text-[#526273] max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital was established with an uncompromising mandate: to provide the people of Krishnanagar, Nadia, and surrounding regions with high-standard multi-speciality clinical care, advanced diagnostic laboratories, and round-the-clock emergency support without requiring patients to travel to Kolkata.
          </p>
        </div>
      </section>

      {/* 2. HOSPITAL INTRODUCTION WITH AUTHENTIC PHOTOGRAPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Our Foundation & Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#103653]">
              A Dedicated Healthcare Centre in the Heart of Krishnanagar
            </h2>
            <div className="space-y-3 text-sm text-[#526273] leading-relaxed">
              <p>
                Located centrally on Ananta Hari Mitra Road in Nediarpara (adjacent to the Income Tax Office), Hiramani Memorial Hospital serves as a reliable healthcare sanctuary for families across Krishnanagar, Nabadwip, Shantipur, Chapra, and the wider Nadia district.
              </p>
              <p>
                Our multi-speciality hospital unites experienced visiting and resident medical specialists across Cardiology, General Medicine, Orthopaedics, Gynaecology, Paediatrics, ENT, General Surgery, and Dermatology under one coordinated umbrella.
              </p>
              <p>
                With continuous 24x7 emergency casualty response, fully monitored intensive care units, modern laminar flow operating theatres, and in-house automated pathology, we bridge the gap between quality medical infrastructure and compassionate patient care.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Outpatient Consultation</span>
              </Link>
              <a
                href="tel:+917501074392"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-[#DC2626] bg-[#FEF2F2] border border-[#DC2626]/20 hover:bg-[#fee2e2] transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>24x7 Emergency Desk</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[4/3] bg-slate-100 shadow-md">
              <img
                src="/images/hospital-reception.jpg"
                alt="Hiramani Memorial Hospital Reception & Patient Services Lounge"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#103653]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                <div className="font-bold">Main Reception & Admission Helpdesk</div>
                <div className="text-slate-300 text-[11px]">40, Ananta Hari Mitra Road, Nediarpara, Krishnanagar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION IN AN ELEGANT COMPOSITION (NO SEPARATE CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-y border-[#E5EBEF] py-12 bg-[#F7FAF9]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#15965C] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#15965C]" />
              <span>Our Clinical Mission</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Dignified, Transparent & Evidence-Based Healing
            </h3>
            <p className="text-sm text-[#526273] leading-relaxed">
              To provide accessible, evidence-based, high-quality medical and surgical healthcare to every resident of Krishnanagar and Nadia district. We maintain complete transparency in diagnostic test reports, consultation fees, and procedural costs, ensuring dignity, safety, and medical ethics at every touchpoint.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#159FDB] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#159FDB]" />
              <span>Our Institutional Vision</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#103653]">
              The Trusted Healthcare Center for Nadia District
            </h3>
            <p className="text-sm text-[#526273] leading-relaxed">
              To be the foremost healthcare destination in Krishnanagar, recognized for excellence in early disease detection, maternal and child wellness, emergency resuscitation, and modern surgical precision, empowered by experienced clinicians and patient-friendly digital workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES: CLEAN NUMBERED EDITORIAL LIST (NO ICON BOXES OR CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Our Operating Principles
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            The Pillars of Our Patient Care
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          <div className="space-y-2 border-l-2 border-[#15965C] pl-4">
            <span className="text-xs font-mono font-bold text-[#15965C]">01</span>
            <h3 className="text-sm font-bold text-[#182B3D]">Clinical Integrity</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Every medical recommendation is guided solely by clinical merit, validated scientific protocols, and patient safety.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-[#159FDB] pl-4">
            <span className="text-xs font-mono font-bold text-[#159FDB]">02</span>
            <h3 className="text-sm font-bold text-[#182B3D]">Compassion & Empathy</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              We listen with patience and explain medical findings in clear Bengali, Hindi, or English so families feel respected and informed.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-[#15965C] pl-4">
            <span className="text-xs font-mono font-bold text-[#15965C]">03</span>
            <h3 className="text-sm font-bold text-[#182B3D]">Transparent Pricing</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Clear OPD consultation fees, standardized diagnostic test rates, and itemized billing with zero unexpected markups.
            </p>
          </div>

          <div className="space-y-2 border-l-2 border-[#103653] pl-4">
            <span className="text-xs font-mono font-bold text-[#103653]">04</span>
            <h3 className="text-sm font-bold text-[#182B3D]">24x7 Preparedness</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Round-the-clock emergency casualty, ICU resuscitation team, emergency pathology, and rapid ambulance response.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOSPITAL INFRASTRUCTURE SHOWCASE WITH ACTUAL PHOTOGRAPHS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Modern Facilities
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Clinical Infrastructure & Diagnostic Equipment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
              <img
                src="/images/ot-surgery.jpg"
                alt="Modular Operation Theatre"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xs font-bold text-[#182B3D]">Modular Operation Theatre</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Laminar airflow, HEPA filtration, and advanced laparoscopy towers for sterile general and gynaecological surgeries.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
              <img
                src="/images/icu-care.jpg"
                alt="Critical Care Unit"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xs font-bold text-[#182B3D]">Intensive Care Unit (ICU)</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              Invasive and non-invasive mechanical ventilators, central multipara monitoring, and round-the-clock critical care support.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
              <img
                src="/images/lab-diagnostics.jpg"
                alt="Automated Pathology Lab"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xs font-bold text-[#182B3D]">Automated Pathology Lab</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              5-part automated clinical haematology, biochemistry analyzers, hormonal assays, and quality control calibration.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="rounded-xl overflow-hidden border border-[#E5EBEF] aspect-[4/3] bg-slate-100">
              <img
                src="/images/radiology-imaging.jpg"
                alt="Digital Radiography & Ultrasonography"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xs font-bold text-[#182B3D]">Radiology & 2D Echo</h3>
            <p className="text-xs text-[#526273] leading-relaxed">
              High-frequency digital X-Ray imaging, high-resolution 2D Echocardiography with Color Doppler, and abdominal ultrasonography.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PATIENT CHARTER & QUALITY STANDARDS (CLEAN EDITORIAL SECTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-[#E5EBEF] rounded-2xl p-6 sm:p-10 bg-[#F7FAF9] space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              Regulatory Compliance & Quality
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Patient Rights & Safety Assurance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#526273] leading-relaxed">
            <div className="space-y-3">
              <h3 className="font-bold text-[#182B3D] text-sm">Your Rights as a Patient:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Right to informed consent before any clinical investigation or surgical procedure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Right to complete privacy and confidentiality regarding all medical records and diagnostic results.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Right to know the identity, qualifications, and department of attending doctors and nurses.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>Right to receive an itemized, transparent bill with standardized charges and zero hidden costs.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-[#182B3D] text-sm">Quality & Infection Control:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#159FDB] font-bold">›</span>
                  <span>Strict biomedical waste segregation adhering to West Bengal Pollution Control Board guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#159FDB] font-bold">›</span>
                  <span>Routine clinical audits and verification protocols for medication delivery and blood administration.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#159FDB] font-bold">›</span>
                  <span>Continuous preventative calibration of all diagnostic analyzers and patient monitors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#159FDB] font-bold">›</span>
                  <span>Direct patient grievance resolution channel available at the main reception helpdesk.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EBEF] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-[#526273]">
              Registered establishment under the West Bengal Clinical Establishments Act.
            </span>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
