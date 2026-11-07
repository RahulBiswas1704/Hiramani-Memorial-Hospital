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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 pb-20">
      {/* Breadcrumb Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
        <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <Link href="/departments" className="hover:text-[#15965C] transition">Specialities</Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-[#103653] font-semibold">{dept.name}</span>
      </nav>

      {/* Main Department Header */}
      <div className="bg-white rounded-2xl border border-[#E5EBEF] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5EBEF]">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#15965C] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#15965C] inline-block" />
              <span>Clinical Department • Krishnanagar Campus</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#103653] tracking-tight">
              Department of {dept.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              href={`/book?department_id=${dept.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book Doctor</span>
            </Link>

            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#103653] bg-[#F7FAF9] hover:bg-slate-200 border border-[#E5EBEF] transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#15965C]" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>

        {/* Overview Narrative */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-[#526273]">
            Clinical Overview
          </h2>
          <p className="text-sm text-[#526273] leading-relaxed">
            {dept.description ||
              `The Department of ${dept.name} at Hiramani Memorial Hospital provides comprehensive clinical evaluations, advanced diagnostic workups, and compassionate therapies for patients across Krishnanagar, Nadia, and surrounding regions.`}
          </p>
        </div>

        {/* 3-Column Structured Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Conditions */}
          <div className="p-4 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] space-y-2.5">
            <h3 className="text-xs font-semibold text-[#103653]">
              Conditions Treated
            </h3>
            <ul className="text-xs text-[#526273] space-y-1.5">
              {details.conditions.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedures */}
          <div className="p-4 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] space-y-2.5">
            <h3 className="text-xs font-semibold text-[#103653]">
              Clinical Procedures
            </h3>
            <ul className="text-xs text-[#526273] space-y-1.5">
              {details.treatments.map((t, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#159FDB] font-bold">›</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic Support */}
          <div className="p-4 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] space-y-2.5">
            <h3 className="text-xs font-semibold text-[#103653]">
              Diagnostic Support
            </h3>
            <ul className="text-xs text-[#526273] space-y-1.5">
              {details.diagnosticCapabilities.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#15965C] font-bold">›</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Attending Doctors with Authentic Portrait Photography */}
        <div className="space-y-3 pt-6 border-t border-[#E5EBEF]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#103653]">
              Attending Consultants in this Department
            </h3>
            <span className="text-xs text-[#526273]">
              {doctors.length} Specialist{doctors.length !== 1 ? 's' : ''} Listed
            </span>
          </div>

          {doctors.length === 0 ? (
            <p className="text-xs text-[#526273] p-4 bg-[#F7FAF9] rounded-lg text-center border border-[#E5EBEF]">
              Consultant schedule being updated. Please contact reception at +91 78729 57300.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  className="p-4 rounded-lg border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex gap-3.5 items-center"
                >
                  <div className="relative w-16 h-20 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-[#E5EBEF]">
                    <Image
                      src={doc.profile_image_url || '/images/hero-consultation.jpg'}
                      alt={doc.full_name}
                      fill
                      sizes="64px"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#182B3D] truncate">{doc.full_name}</h4>
                    <p className="text-xs text-[#15965C] font-medium truncate">{doc.qualification}</p>
                    <p className="text-[11px] text-[#526273]">
                      Chamber: {doc.room_number || 'OPD Chamber'} • Fee: <strong className="text-[#103653]">₹{doc.consultation_fee}</strong>
                    </p>
                    <div className="flex items-center gap-2 pt-1.5">
                      <Link
                        href={`/doctors/${doc.id}`}
                        className="text-[11px] font-semibold text-[#526273] hover:text-[#15965C]"
                      >
                        Profile
                      </Link>
                      <Link
                        href={`/book?doctor_id=${doc.id}`}
                        className="text-[11px] font-bold text-white bg-[#15965C] hover:bg-[#117A4A] px-2.5 py-1 rounded transition"
                      >
                        Book Slot
                      </Link>
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
