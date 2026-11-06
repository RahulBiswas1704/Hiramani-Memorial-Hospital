import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  FileText,
  Activity,
  Microscope,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Learn about Hiramani Memorial Hospital in Krishnanagar, Nadia. Discover our clinical governance, hospital infrastructure, modular OTs, critical care ICU, and patient-first compassionate healing mission.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* 1. Institutional Hero & Mission */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <Award className="w-3.5 h-3.5 text-hospital-green" />
            <span>Serving Krishnanagar, Nadia & Gangetic Bengal</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Ethical Healthcare, Advanced Diagnostics & Compassionate Healing
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Hiramani Memorial Hospital was established with an uncompromising mandate: to provide the people of Krishnanagar, Nadia, and surrounding regions with high-standard multi-speciality clinical care, advanced diagnostic laboratories, and round-the-clock emergency support without requiring patients to travel to Kolkata.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-hospital-green hover:bg-[#0f7a49] shadow-md shadow-hospital-green/20 transition"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
                <a
                  href="tel:+917501074392"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-300 hover:border-hospital-blue transition"
                >
                  <PhoneCall className="w-4 h-4 text-rose-600" />
                  <span>24x7 Emergency Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 aspect-[4/3]">
                <Image
                  src="/images/hospital-reception.jpg"
                  alt="Hiramani Memorial Hospital Reception & Patient Services Lounge"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-300">Krishnanagar Facility</div>
                  <div className="text-sm font-semibold">Central Patient Reception & Admission Helpdesk</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Institutional Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-hospital-green">24/7</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Emergency & Trauma Care</div>
            <p className="text-[11px] text-slate-500">Casualty and critical stabilization</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-hospital-blue">8+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Clinical Specialities</div>
            <p className="text-[11px] text-slate-500">From Cardiology to General Surgery</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-hospital-green">100%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Transparent Pricing</div>
            <p className="text-[11px] text-slate-500">Itemized billing & standardized rates</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-hospital-blue">WB CEA</div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Registered Establishment</div>
            <p className="text-[11px] text-slate-500">Full statutory health compliance</p>
          </div>
        </div>
      </section>

      {/* 3. Clinical Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-hospital-green" />
            <div className="w-12 h-12 rounded-2xl bg-hospital-green/10 text-hospital-green flex items-center justify-center">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Clinical Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To provide accessible, evidence-based, high-quality medical and surgical healthcare to every resident of Krishnanagar and Nadia district. We maintain complete transparency in diagnostic test reports, consultation fees, and procedural costs, ensuring dignity and patient safety at every touchpoint.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-hospital-blue" />
            <div className="w-12 h-12 rounded-2xl bg-hospital-blue/10 text-hospital-blue flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Our Institutional Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be the foremost and most trusted healthcare destination in Krishnanagar, recognized for excellence in early disease detection, maternal and child wellness, emergency resuscitation, and modern surgical precision, empowered by compassionate doctors and rapid digital patient workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Real Infrastructure Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Infrastructure & Technology
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Equipped for Critical Emergencies, Surgeries & Precision Testing
          </h2>
          <p className="text-sm text-slate-600">
            Our campus at 40, Ananta Hari Mitra Road houses specialized facilities designed for sterile operating conditions, intensive critical monitoring, and rapid pathology reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-44 bg-slate-100">
              <Image
                src="/images/ot-surgery.jpg"
                alt="Modular Operation Theatre at Hiramani Memorial Hospital"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Modular Operation Theatre</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Laminar airflow, HEPA filtration, modern anaesthesia workstations, and high-definition laparoscopy for sterile general and gynaecological surgeries.
                </p>
              </div>
              <div className="text-[11px] font-bold text-hospital-green pt-2 border-t border-slate-100">
                Laminar Airflow • Sterile Protocols
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-44 bg-slate-100">
              <Image
                src="/images/icu-care.jpg"
                alt="Critical Care Unit at Hiramani Memorial Hospital"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Intensive Care Unit (ICU)</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Invasive and non-invasive mechanical ventilators, central multipara monitoring, infusion syringe pumps, and round-the-clock intensivist support.
                </p>
              </div>
              <div className="text-[11px] font-bold text-hospital-blue pt-2 border-t border-slate-100">
                24x7 Intensivist • Dedicated Monitoring
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-44 bg-slate-100">
              <Image
                src="/images/lab-diagnostics.jpg"
                alt="Pathology & Biochemistry Laboratory"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Automated Pathology Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Automated clinical haematology 5-part analyzers, biochemistry analyzers, hormonal assays, and microbiology testing with quality control calibration.
                </p>
              </div>
              <div className="text-[11px] font-bold text-hospital-green pt-2 border-t border-slate-100">
                Same-Day Reports • Quality Control
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            <div className="relative h-44 bg-slate-100">
              <Image
                src="/images/radiology-imaging.jpg"
                alt="Digital Radiography & Ultrasonography"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Radiology & Ultrasound</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  High-frequency digital X-Ray imaging, high-resolution 2D Echocardiography with Color Doppler, and comprehensive abdominal/pelvic ultrasonography.
                </p>
              </div>
              <div className="text-[11px] font-bold text-hospital-blue pt-2 border-t border-slate-100">
                Digital X-Ray • 2D Echo Doppler
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Patient Charter & Quality Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 bg-white shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
              Patient Care Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Patient Rights & Clinical Assurance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Your Rights as a Patient:</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
                  <span>Right to informed medical consent before any diagnostic scan, invasive test, or surgical intervention.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
                  <span>Right to complete privacy and strict confidentiality regarding personal medical data and diagnosis.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
                  <span>Right to know the identity, qualifications, and registration numbers of attending doctors and nurses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-green shrink-0 mt-0.5" />
                  <span>Right to receive clear, itemized bills with standardized tariffs and zero hidden administrative charges.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base">Quality & Infection Control:</h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-blue shrink-0 mt-0.5" />
                  <span>Strict biomedical waste segregation and bio-hazard sterilization adhering to WBPCB norms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-blue shrink-0 mt-0.5" />
                  <span>Routine clinical audits and double-check verification for medication delivery and blood administration.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-blue shrink-0 mt-0.5" />
                  <span>Calibration and preventative maintenance cycles for all digital ICU and clinical lab equipment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-hospital-blue shrink-0 mt-0.5" />
                  <span>Direct patient grievance redressal desk located at the main reception lobby.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Registered under the West Bengal Clinical Establishments (Registration, Regulation and Transparency) Act.
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Locate Hospital</span>
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] transition shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book OPD Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
