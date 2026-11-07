import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Activity,
  HeartPulse,
  Bone,
  Users,
  Baby,
  Eye,
  Scissors,
  Sparkles,
  ChevronRight,
  ArrowRight,
  CalendarCheck,
  Stethoscope,
  PhoneCall,
  MessageCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Clinical Departments & Medical Specialities | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Explore medical departments at Hiramani Memorial Hospital in Krishnanagar, Nadia: Cardiology, General Medicine, Orthopaedics, Gynaecology, Paediatrics, ENT, General Surgery, and Dermatology.',
};

export const revalidate = 60;

const DEPT_KEY_SERVICES: Record<string, string[]> = {
  'general-medicine': ['Diabetes & Hypertension Management', 'Infectious Fevers (Dengue, Typhoid)', 'Preventive Health Screenings', 'Endocrine & Thyroid Care'],
  'cardiology': ['2D Echocardiogram with Color Doppler', '12-Lead Digital ECG Suite', 'Arrhythmia & BP Management', 'Cardiac Risk Stratification'],
  'orthopaedics': ['Fracture Reduction & Splinting', 'Osteoarthritis & Joint Injections', 'Spine & Cervical Spondylosis', 'Post-Trauma Rehabilitation'],
  'gynaecology-and-obstetrics': ['Antenatal & High-Risk Pregnancy Care', 'Normal & Caesarean Deliveries', 'PCOS & Menstrual Health', 'Gynaecological Laparoscopy'],
  'paediatrics': ['Newborn Care & Neonatal Clinic', 'Routine Vaccination Program (IAP)', 'Paediatric Fevers & Asthma', 'Childhood Growth Monitoring'],
  'ent': ['Sinus & Allergy Management', 'Ear Microsuction Cleaning', 'Tonsil & Adenoid Evaluation', 'Hearing & Balance Care'],
  'general-surgery': ['Laparoscopic Appendectomy & Cholecystectomy', 'Hernioplasty with Tension-Free Mesh', 'Daycare Minor Surgeries & Suturing', 'Wound Debridement & Trauma Care'],
  'dermatology': ['Psoriasis & Eczema Therapy', 'Fungal & Bacterial Infections', 'Acne & Skin Tag Removal', 'Allergic Dermatitis Solutions'],
};

export default async function DepartmentsPage() {
  const [departments, doctors] = await Promise.all([
    HospitalRepo.getDepartments(),
    HospitalRepo.getDoctors(),
  ]);

  return (
    <div className="space-y-10 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-12 bg-gradient-to-b from-[#F4F8F5] via-[#F7FAF9] to-white border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-semibold">Specialities & Clinical Departments</span>
          </nav>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#15965C] pt-1">
            <span className="w-2 h-2 rounded-full bg-[#15965C] inline-block" />
            <span>আমাদের বিশেষায়িত চিকিৎসা বিভাগসমূহ • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#103653] tracking-tight">
            Medical Departments & Clinical Specialities
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            From emergency heart care and high-risk pregnancy deliveries to children&apos;s healthcare, joint pain management, and laparoscopic surgeries—our experienced clinicians deliver compassionate inpatient care and outpatient chamber consultations in Krishnanagar.
          </p>
        </div>
      </section>

      {/* 2. Structured Medical Department Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-[#E5EBEF] border-y border-[#E5EBEF]">
          {departments.map((dept, index) => {
            const deptDoctors = doctors.filter(d => d.department_id === dept.id);
            const services = DEPT_KEY_SERVICES[dept.code] || [
              'Specialist OPD Consultations',
              'Diagnostic Evaluations',
              'Follow-up Care & Therapy',
            ];

            return (
              <div
                key={dept.id}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-[#F7FAF9]/60 transition px-2 sm:px-4 rounded-xl"
              >
                {/* Department Header & Scope */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#15965C] bg-[#F4F8F5] px-2 py-0.5 rounded border border-[#15965C]/20">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#526273]">
                      {deptDoctors.length} Attending Consultant{deptDoctors.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#103653]">
                    {dept.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                    {dept.description ||
                      'Comprehensive outpatient evaluations, specialized therapy, and procedural management.'}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/departments/${dept.code || dept.id}`}
                      className="text-xs font-bold text-[#159FDB] hover:underline flex items-center gap-1"
                    >
                      <span>Department Overview</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/book?department_id=${dept.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>

                {/* Key Capabilities */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-xs font-semibold text-[#526273] block">
                    Key Clinical Capabilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#182B3D]">
                    {services.map((srv, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0 mt-0.5" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Attending Doctors Roster */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-xs font-semibold text-[#526273] block">
                    Consultants in this Speciality:
                  </span>
                  {deptDoctors.length === 0 ? (
                    <p className="text-xs text-slate-400">Consultant schedule available via reception.</p>
                  ) : (
                    <div className="space-y-2">
                      {deptDoctors.map(doc => (
                        <div
                          key={doc.id}
                          className="p-3 rounded-lg border border-[#E5EBEF] bg-white flex items-center justify-between text-xs"
                        >
                          <div className="min-w-0 pr-2">
                            <Link
                              href={`/doctors/${doc.id}`}
                              className="font-bold text-[#103653] hover:text-[#15965C] transition truncate block"
                            >
                              {doc.full_name}
                            </Link>
                            <span className="text-[11px] text-[#526273] truncate block">{doc.qualification}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-bold text-[#15965C] block">₹{doc.consultation_fee}</span>
                            <Link
                              href={`/book?doctor_id=${doc.id}`}
                              className="text-[10px] text-[#159FDB] hover:underline font-semibold"
                            >
                              Book
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Triage Support Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F7FAF9] rounded-xl p-6 sm:p-8 border border-[#E5EBEF] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-[#103653]">Unsure which speciality is right for your symptoms?</h3>
            <p className="text-xs text-[#526273] max-w-xl">
              Contact our patient helpdesk. Our triage staff will recommend the appropriate consultant specialist and check current OPD chamber availability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#103653] bg-white border border-[#E5EBEF] hover:bg-slate-50 transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#15965C]" />
              <span>Reception: +91 78729 57300</span>
            </a>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
