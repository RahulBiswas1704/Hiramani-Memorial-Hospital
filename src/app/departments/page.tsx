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
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Clinical Departments & Medical Specialities | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Explore medical departments at Hiramani Memorial Hospital in Krishnanagar, Nadia: Cardiology, General Medicine, Orthopaedics, Gynaecology, Paediatrics, ENT, General Surgery, and Dermatology.',
};

export const revalidate = 60;

const DEPT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-6 h-6 text-hospital-green" />,
  'cardiology': <HeartPulse className="w-6 h-6 text-rose-600" />,
  'orthopaedics': <Bone className="w-6 h-6 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-6 h-6 text-pink-600" />,
  'paediatrics': <Baby className="w-6 h-6 text-sky-600" />,
  'ent': <Eye className="w-6 h-6 text-purple-600" />,
  'general-surgery': <Scissors className="w-6 h-6 text-indigo-600" />,
  'dermatology': <Sparkles className="w-6 h-6 text-emerald-600" />,
};

const DEPT_KEY_SERVICES: Record<string, string[]> = {
  'general-medicine': ['Diabetes & Hypertension Care', 'Infectious Fevers (Dengue, Typhoid)', 'Preventive Health Screenings', 'Adult Immunization'],
  'cardiology': ['2D Echocardiogram Doppler', '12-Lead Digital ECG', 'Arrhythmia & BP Management', 'Cardiac Risk Stratification'],
  'orthopaedics': ['Fracture Reduction & Casting', 'Joint Pain & Osteoarthritis', 'Spine & Cervical Care', 'Post-Trauma Rehabilitation'],
  'gynaecology-and-obstetrics': ['Antenatal & Maternity Care', 'Normal & C-Section Delivery', 'PCOS & Menstrual Health', 'Gynaecological Laparoscopy'],
  'paediatrics': ['Newborn Care & Neonatal Clinic', 'Routine Vaccination Program', 'Paediatric Fevers & Asthma', 'Childhood Growth Monitoring'],
  'ent': ['Sinus & Allergy Treatment', 'Ear Microsuction Cleaning', 'Tonsil & Adenoid Evaluation', 'Hearing & Balance Disorders'],
  'general-surgery': ['Laparoscopic Appendectomy', 'Hernioplasty & Mesh Repair', 'Daycare Minor Surgeries', 'Wound Debridement & Trauma Care'],
  'dermatology': ['Psoriasis & Eczema Therapy', 'Fungal & Bacterial Infections', 'Acne & Skin Tag Removal', 'Allergic Dermatitis Solutions'],
};

export default async function DepartmentsPage() {
  const [departments, doctors] = await Promise.all([
    HospitalRepo.getDepartments(),
    HospitalRepo.getDoctors(),
  ]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <Activity className="w-3.5 h-3.5 text-hospital-green" />
            <span>Comprehensive Clinical Care in Krishnanagar, Nadia</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Medical Departments & Specialities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Our multi-speciality departments are staffed by experienced visiting and resident clinicians, backed by continuous diagnostic imaging, computerized pathology, and 24x7 emergency backup.
          </p>
        </div>
      </section>

      {/* 2. Structured Departments Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(dept => {
            const icon = DEPT_ICONS[dept.code] || <Activity className="w-6 h-6 text-hospital-green" />;
            const deptDoctors = doctors.filter(d => d.department_id === dept.id);
            const services = DEPT_KEY_SERVICES[dept.code] || [
              'Specialist OPD Consultations',
              'Diagnostic Evaluations',
              'Follow-up Care & Prescription',
            ];

            return (
              <div
                key={dept.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-hospital-green shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-hospital-green/10 text-hospital-green border border-hospital-green/20">
                      {deptDoctors.length} Attending Doctor{deptDoctors.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {dept.description ||
                        'Comprehensive outpatient evaluations, specialized therapy, and procedural management.'}
                    </p>
                  </div>

                  {/* Key Services Pill List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Key Capabilities:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {services.slice(0, 3).map((srv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-hospital-blue shrink-0" />
                          <span className="truncate">{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Doctors List */}
                  {deptDoctors.length > 0 && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                        Consultants:
                      </span>
                      {deptDoctors.map(doc => (
                        <Link
                          key={doc.id}
                          href={`/doctors/${doc.id}`}
                          className="flex items-center justify-between py-0.5 text-slate-700 hover:text-hospital-green font-medium transition"
                        >
                          <span className="truncate">{doc.full_name}</span>
                          <span className="text-[11px] font-bold text-hospital-green shrink-0">₹{doc.consultation_fee}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/departments/${dept.code || dept.id}`}
                    className="text-xs font-bold text-hospital-blue hover:text-hospital-green flex items-center gap-1 transition"
                  >
                    <span>Department Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/book?departmentId=${dept.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] transition shadow-sm"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>Book OPD</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Clinical Support Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-hospital-slate text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Unsure which speciality is right for your symptoms?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Contact our patient reception desk. Our triage staff will recommend the appropriate consultant specialist and check current chamber availability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-hospital-green" />
              <span>Reception: +91 78729 57300</span>
            </a>
            <Link
              href="/whatsapp"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
