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
  ArrowLeft,
  CalendarCheck,
  Stethoscope,
  Building2,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

interface DepartmentDetailPageProps {
  params: {
    slug: string;
  };
}

const DEPT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-10 h-10 text-teal-600" />,
  'cardiology': <HeartPulse className="w-10 h-10 text-rose-600" />,
  'orthopaedics': <Bone className="w-10 h-10 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-10 h-10 text-pink-600" />,
  'paediatrics': <Baby className="w-10 h-10 text-sky-600" />,
  'ent': <Eye className="w-10 h-10 text-purple-600" />,
  'general-surgery': <Scissors className="w-10 h-10 text-indigo-600" />,
  'dermatology': <Sparkles className="w-10 h-10 text-emerald-600" />,
};

// Department detailed features mapping
const DEPT_FEATURES: Record<string, { conditions: string[]; treatments: string[] }> = {
  'general-medicine': {
    conditions: ['Diabetes Mellitus & Hypertension', 'Infectious Fevers (Dengue, Malaria, Typhoid)', 'Respiratory Infections & Asthma', 'Thyroid & Endocrine Disorders'],
    treatments: ['Comprehensive Blood Sugar Management', 'Cardiovascular Risk Profiling', 'Inpatient Medical Care & Fluid Therapy', 'Preventive Adult Health Screenings'],
  },
  'cardiology': {
    conditions: ['Coronary Artery Disease', 'Hypertension & Arrhythmias', 'Heart Failure & Valvular Defects', 'High Cholesterol & Lipid Imbalance'],
    treatments: ['2D Echocardiogram with Color Doppler', '12-Lead Digital Electrocardiogram (ECG)', 'Hypertension Management Clinic', 'Cardiac Emergency Stabilization'],
  },
  'orthopaedics': {
    conditions: ['Bone Fractures & Dislocations', 'Osteoarthritis & Knee Pain', 'Spine Disorders & Cervical Spondylosis', 'Sports Ligament Injuries'],
    treatments: ['Closed & Open Fracture Reduction', 'Plaster Casting & Splinting', 'Joint Injections & Pain Management', 'Postoperative Physiotherapy Rehabilitation'],
  },
  'gynaecology-and-obstetrics': {
    conditions: ['Antenatal Pregnancy Care', 'Menstrual Irregularities & PCOS', 'Pelvic Infections & Fibroids', 'Menopause Support'],
    treatments: ['High-Risk Pregnancy Monitoring', 'Normal & Caesarean Deliveries', 'Gynaecological Laparoscopy', 'Pap Smears & Cervical Screening'],
  },
  'paediatrics': {
    conditions: ['Newborn Care & Neonatal Jaundice', 'Childhood Viral Fevers & Cough', 'Paediatric Asthma & Allergies', 'Childhood Growth & Nutrition Issues'],
    treatments: ['Routine Child Immunization Clinic', 'Phototherapy for Neonatal Jaundice', 'Nebulization & Inpatient Paediatric Ward', 'Developmental Milestone Screening'],
  },
  'ent': {
    conditions: ['Sinusitis & Nasal Polyps', 'Hearing Loss & Ear Infections (Otitis)', 'Tonsillitis & Pharyngitis', 'Vertigo & Balance Disorders'],
    treatments: ['Diagnostic Endoscopy', 'Ear Microsuction Cleaning', 'Tonsillectomy & Adenoidectomy Consults', 'Audiometry Coordination'],
  },
  'general-surgery': {
    conditions: ['Appendicitis & Gallbladder Stones', 'Inguinal & Umbilical Hernias', 'Hydrocele & Hemorrhoids (Piles)', 'Soft Tissue Cysts & Abscesses'],
    treatments: ['Laparoscopic Appendectomy & Cholecystectomy', 'Hernioplasty with Tension-Free Mesh', 'Daycare Minor Surgeries & Suturing', 'Postoperative Wound Dressing & Care'],
  },
  'dermatology': {
    conditions: ['Eczema, Psoriasis & Dermatitis', 'Fungal, Bacterial & Viral Skin Infections', 'Acne Vulgaris & Pigmentation', 'Hair Loss & Alopecia'],
    treatments: ['Clinical Dermatology Evaluations', 'Skin Biopsy & Histopathology', 'Electrocautery for Skin Tags & Warts', 'Topical & Systemic Pharmacotherapy'],
  },
};

function findDepartment(departments: any[], slug: string) {
  const cleanSlug = slug.toLowerCase().trim();
  return departments.find(d => {
    const code = (d.code || '').toLowerCase();
    const nameSlug = (d.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return (
      d.id === slug ||
      code === cleanSlug ||
      nameSlug === cleanSlug ||
      cleanSlug.includes(code) ||
      code.includes(cleanSlug)
    );
  });
}

export async function generateMetadata({ params }: DepartmentDetailPageProps): Promise<Metadata> {
  const departments = await HospitalRepo.getDepartments();
  const dept = findDepartment(departments, params.slug);
  if (!dept) {
    return { title: 'Department Not Found | Hiramani Memorial Hospital' };
  }
  return {
    title: `Department of ${dept.name} | Hiramani Memorial Hospital Kolkata`,
    description: `Expert doctors, treatments, and outpatient timings in the Department of ${dept.name} at Hiramani Memorial Hospital Kolkata.`,
  };
}

export default async function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const departments = await HospitalRepo.getDepartments();
  const dept = findDepartment(departments, params.slug);

  if (!dept) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Activity className="w-16 h-16 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-800">Department Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested medical department could not be located.
        </p>
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e4a7b] text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View All Departments</span>
        </Link>
      </div>
    );
  }

  const doctors = await HospitalRepo.getDoctors(dept.id);
  const nameSlug = (dept.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const icon =
    DEPT_ICONS[dept.code] ||
    DEPT_ICONS[dept.code.toLowerCase()] ||
    DEPT_ICONS[nameSlug] ||
    <Activity className="w-10 h-10 text-teal-600" />;
  const details =
    DEPT_FEATURES[dept.code] ||
    DEPT_FEATURES[dept.code.toLowerCase()] ||
    DEPT_FEATURES[nameSlug] || {
      conditions: ['Acute & Chronic Medical Illnesses', 'Emergency Medical Stabilization', 'Preventive Consultations'],
      treatments: ['Outpatient Clinical Evaluation', 'Diagnostic Lab Workup', 'Inpatient Ward Admission'],
    };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        href="/departments"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0e4a7b] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Medical Departments</span>
      </Link>

      {/* Main Department Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Clinical Speciality
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {dept.name}
              </h1>
            </div>
          </div>

          <Link
            href={`/book?department_id=${dept.id}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] shadow-md transition"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Department Doctor</span>
          </Link>
        </div>

        {/* Overview */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            About the Department
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {dept.description ||
              `The Department of ${dept.name} at Hiramani Memorial Hospital provides comprehensive clinical evaluations, advanced diagnostic workups, and compassionate therapies for patients across Kolkata and South 24 Parganas.`}
          </p>
        </div>

        {/* Conditions Treated & Procedures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Common Conditions Evaluated
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              {details.conditions.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0e4a7b]" />
              Procedures & Services Available
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              {details.treatments.map((t, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0e4a7b] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Attending Doctors */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#0e4a7b]" />
            <span>Consultant Doctors in this Department</span>
          </h3>

          {doctors.length === 0 ? (
            <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl">
              No doctors currently listed for this department. Please contact reception at +91 78729 57300.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">{doc.full_name}</h4>
                    <p className="text-xs text-teal-700 font-semibold">{doc.qualification}</p>
                    <p className="text-[11px] text-slate-500">Chamber: {doc.room_number || 'OPD-1'}</p>
                    <p className="text-xs font-bold text-[#0e4a7b] pt-1">
                      Consultation Fee: ₹{doc.consultation_fee}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition"
                    >
                      Profile
                    </Link>
                    <Link
                      href={`/book?doctor_id=${doc.id}`}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] rounded-lg text-center shadow-sm transition"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
