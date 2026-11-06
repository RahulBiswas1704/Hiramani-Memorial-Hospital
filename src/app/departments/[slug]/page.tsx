import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

interface DepartmentDetailPageProps {
  params: {
    slug: string;
  };
}

const DEPT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-8 h-8 text-hospital-green" />,
  'cardiology': <HeartPulse className="w-8 h-8 text-rose-600" />,
  'orthopaedics': <Bone className="w-8 h-8 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-8 h-8 text-pink-600" />,
  'paediatrics': <Baby className="w-8 h-8 text-sky-600" />,
  'ent': <Eye className="w-8 h-8 text-purple-600" />,
  'general-surgery': <Scissors className="w-8 h-8 text-indigo-600" />,
  'dermatology': <Sparkles className="w-8 h-8 text-emerald-600" />,
};

// Department detailed features mapping
const DEPT_FEATURES: Record<string, { conditions: string[]; treatments: string[]; diagnosticCapabilities: string[] }> = {
  'general-medicine': {
    conditions: ['Diabetes Mellitus & Hypertension', 'Infectious Fevers (Dengue, Malaria, Typhoid)', 'Respiratory Infections & Asthma', 'Thyroid & Endocrine Disorders', 'Gastrointestinal & Liver Disorders'],
    treatments: ['Comprehensive Blood Sugar Management', 'Cardiovascular Risk Profiling', 'Inpatient Medical Care & Fluid Therapy', 'Preventive Adult Health Screenings', 'Adult Immunization Schedules'],
    diagnosticCapabilities: ['Automated HbA1c & Blood Glucose', 'Lipid & Liver Function Panels', 'Blood Culture & Serology', 'Digital Chest Radiography'],
  },
  'cardiology': {
    conditions: ['Coronary Artery Disease', 'Hypertension & Arrhythmias', 'Heart Failure & Valvular Defects', 'High Cholesterol & Lipid Imbalance', 'Chest Pain & Angina Evaluation'],
    treatments: ['2D Echocardiogram with Color Doppler', '12-Lead Digital Electrocardiogram (ECG)', 'Hypertension Management Clinic', 'Cardiac Emergency Stabilization', 'Preventive Lipid Management'],
    diagnosticCapabilities: ['High-Definition 2D Echo Machine', 'Computerized 12-Lead ECG Suite', 'Cardiac Biomarkers (Troponin-I, CK-MB)', 'Electrolyte & Kidney Workup'],
  },
  'orthopaedics': {
    conditions: ['Bone Fractures & Joint Dislocations', 'Osteoarthritis & Knee Degeneration', 'Spine Disorders & Cervical Spondylosis', 'Sports Ligament & Tendon Injuries', 'Chronic Backache & Sciatica'],
    treatments: ['Closed & Open Fracture Reduction', 'Plaster Casting & Splinting', 'Intra-articular Joint Injections', 'Postoperative Physiotherapy Rehabilitation', 'Tendon & Soft Tissue Repair'],
    diagnosticCapabilities: ['Digital Orthopaedic X-Ray Imaging', 'Serum Calcium & Vitamin D3 Panels', 'Uric Acid & Rheumatoid Factor (RA)', 'Bone Mineral Assessment Coordination'],
  },
  'gynaecology-and-obstetrics': {
    conditions: ['Antenatal Pregnancy Care & Trimester Checks', 'Menstrual Irregularities & PCOS / PCOD', 'Pelvic Infections & Uterine Fibroids', 'Menopause Support & Hormonal Imbalance', 'High-Risk Pregnancy Factors'],
    treatments: ['High-Risk Pregnancy Monitoring', 'Normal & Caesarean (C-Section) Deliveries', 'Gynaecological Laparoscopy & Cystectomy', 'Pap Smears & Cervical Cancer Screening', 'Postpartum Maternal Care'],
    diagnosticCapabilities: ['Obstetric & Pelvic 2D Ultrasonography (USG)', 'Serum Beta-hCG & Hormonal Assays', 'Complete Antenatal Blood Screen', 'Non-Stress Test (NST) Monitoring'],
  },
  'paediatrics': {
    conditions: ['Newborn Care & Neonatal Jaundice', 'Childhood Viral Fevers & Respiratory Infections', 'Paediatric Asthma, Allergies & Cough', 'Childhood Growth & Nutritional Deficiencies', 'Paediatric Gastrointestinal Illness'],
    treatments: ['Routine Child Immunization Clinic (IAP Schedule)', 'Phototherapy for Neonatal Jaundice', 'Nebulization & Inpatient Paediatric Ward', 'Developmental Milestone Screening', 'Infant Feeding & Nutritional Guidance'],
    diagnosticCapabilities: ['Micro-sample Neonatal Bilirubin Test', 'Paediatric Blood Count & CRP', 'Chest X-Ray for Respiratory Distress', 'Growth Percentile Tracking'],
  },
  'ent': {
    conditions: ['Sinusitis, Nasal Polyps & Chronic Rhinitis', 'Hearing Loss & Ear Infections (Otitis Media)', 'Tonsillitis, Pharyngitis & Vocal Strain', 'Vertigo, Dizziness & Balance Disorders', 'Foreign Body Extraction from Ear/Nose'],
    treatments: ['Diagnostic Rigid & Flexible Endoscopy', 'Ear Microsuction Debridement', 'Tonsillectomy & Adenoidectomy Consults', 'Epistaxis (Nosebleed) Emergency Hemostasis', 'Audiometry Coordination'],
    diagnosticCapabilities: ['High-Resolution ENT Video Endoscope', 'Digital X-Ray PNS (Paranasal Sinuses)', 'Ear Swab Culture & Sensitivity', 'Tympanometry Coordination'],
  },
  'general-surgery': {
    conditions: ['Acute Appendicitis & Gallbladder Stones', 'Inguinal, Umbilical & Ventral Hernias', 'Hydrocele & Hemorrhoids (Piles / Fissures)', 'Soft Tissue Lipomas, Cysts & Abscesses', 'Diabetic Foot Ulcers & Gangrene'],
    treatments: ['Laparoscopic Appendectomy & Cholecystectomy', 'Hernioplasty with Tension-Free Mesh', 'Daycare Minor Surgeries & Suturing', 'Postoperative Wound Dressing & Care', 'Emergency Trauma Laparotomy'],
    diagnosticCapabilities: ['Abdominal Ultrasonography (USG)', 'Preoperative Coagulation (PT/INR)', 'Digital X-Ray Abdomen', 'Histopathology & Biopsy Workup'],
  },
  'dermatology': {
    conditions: ['Eczema, Psoriasis & Atopic Dermatitis', 'Fungal, Bacterial & Viral Skin Infections', 'Acne Vulgaris & Post-Acne Scars', 'Hair Loss, Alopecia & Dandruff', 'Allergic Urticaria & Contact Dermatitis'],
    treatments: ['Clinical Dermatology Evaluations', 'Skin Biopsy & Histopathology', 'Electrocautery for Skin Tags & Warts', 'Topical & Systemic Pharmacotherapy', 'Allergy Desensitization Guidance'],
    diagnosticCapabilities: ['KOH Mount for Fungal Microscopic Exam', 'Skin Punch Biopsy Processing', 'Serum IgE & Allergy Markers', 'Dermatoscopy Clinical Evaluation'],
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
    return { title: 'Department Not Found | Hiramani Memorial Hospital Krishnanagar' };
  }
  return {
    title: `Department of ${dept.name} | Hiramani Memorial Hospital Krishnanagar`,
    description: `Specialist doctors, chamber timings, diagnostic capabilities, and surgical services in the Department of ${dept.name} at Hiramani Memorial Hospital, Krishnanagar, Nadia.`,
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
          The requested medical department could not be located in our directory.
        </p>
        <Link
          href="/departments"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-hospital-green text-white text-xs font-bold"
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
    <Activity className="w-8 h-8 text-hospital-green" />;
  const details =
    DEPT_FEATURES[dept.code] ||
    DEPT_FEATURES[dept.code.toLowerCase()] ||
    DEPT_FEATURES[nameSlug] || {
      conditions: ['Acute & Chronic Medical Illnesses', 'Emergency Medical Stabilization', 'Preventive Consultations'],
      treatments: ['Outpatient Clinical Evaluation', 'Diagnostic Lab Workup', 'Inpatient Ward Admission'],
      diagnosticCapabilities: ['In-house Automated Pathology', 'Digital X-Ray Imaging', 'Ultrasonography'],
    };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      <Link
        href="/departments"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-hospital-green transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Medical Departments</span>
      </Link>

      {/* Main Department Header */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-hospital-green/10 border border-hospital-green/20 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
                Clinical Speciality • Krishnanagar Campus
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {dept.name}
              </h1>
            </div>
          </div>

          <Link
            href={`/book?departmentId=${dept.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-hospital-green hover:bg-[#0f7a49] shadow-md shadow-hospital-green/20 transition shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book Department Doctor</span>
          </Link>
        </div>

        {/* Overview Narrative */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Clinical Overview
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {dept.description ||
              `The Department of ${dept.name} at Hiramani Memorial Hospital provides comprehensive clinical evaluations, advanced diagnostic workups, and compassionate therapies for patients across Krishnanagar, Nadia, and surrounding regions.`}
          </p>
        </div>

        {/* 3-Column Structured Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Conditions */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-hospital-green" />
              <span>Conditions Treated</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              {details.conditions.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-hospital-green shrink-0 mt-1" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedures */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-hospital-blue" />
              <span>Clinical Procedures</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              {details.treatments.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-hospital-blue shrink-0 mt-1" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Support */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Diagnostic Support</span>
            </h3>
            <ul className="text-xs text-slate-600 space-y-2">
              {details.diagnosticCapabilities.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Attending Doctors with Authentic Portrait Photography */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-hospital-green" />
              <span>Attending Consultants in this Department</span>
            </h3>
            <span className="text-xs text-slate-500">
              {doctors.length} Specialist{doctors.length !== 1 ? 's' : ''} Listed
            </span>
          </div>

          {doctors.length === 0 ? (
            <p className="text-xs text-slate-500 p-6 bg-slate-50 rounded-2xl text-center">
              Consultant schedule being updated. Please contact reception at +91 78729 57300.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-hospital-green shadow-sm transition flex gap-4 items-center"
                >
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={doc.profile_image_url || '/images/hero-consultation.jpg'}
                      alt={doc.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <h4 className="text-base font-bold text-slate-900 truncate">{doc.full_name}</h4>
                    <p className="text-xs text-hospital-green font-semibold truncate">{doc.qualification}</p>
                    <p className="text-[11px] text-slate-500">
                      Chamber: {doc.room_number || 'OPD Chamber'} • {doc.experience_years}+ Yrs Exp
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-slate-900">
                        OPD Fee: <span className="text-hospital-green">₹{doc.consultation_fee}</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/doctors/${doc.id}`}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          Profile
                        </Link>
                        <Link
                          href={`/book?doctorId=${doc.id}`}
                          className="px-3 py-1 text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] rounded-lg transition shadow-sm"
                        >
                          Book Slot
                        </Link>
                      </div>
                    </div>
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
