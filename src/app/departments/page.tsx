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
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Clinical Departments & Medical Specialities | Hiramani Memorial Hospital Kolkata',
  description:
    'Explore medical departments at Hiramani Memorial Hospital Kolkata: Cardiology, General Medicine, Orthopaedics, Gynaecology, Paediatrics, ENT, Laparoscopic Surgery, and Dermatology.',
};

export const revalidate = 60;

const DEPT_ICONS: Record<string, React.ReactNode> = {
  'general-medicine': <Activity className="w-7 h-7 text-teal-600" />,
  'cardiology': <HeartPulse className="w-7 h-7 text-rose-600" />,
  'orthopaedics': <Bone className="w-7 h-7 text-amber-600" />,
  'gynaecology-and-obstetrics': <Users className="w-7 h-7 text-pink-600" />,
  'paediatrics': <Baby className="w-7 h-7 text-sky-600" />,
  'ent': <Eye className="w-7 h-7 text-purple-600" />,
  'general-surgery': <Scissors className="w-7 h-7 text-indigo-600" />,
  'dermatology': <Sparkles className="w-7 h-7 text-emerald-600" />,
};

export default async function DepartmentsPage() {
  const [departments, doctors] = await Promise.all([
    HospitalRepo.getDepartments(),
    HospitalRepo.getDoctors(),
  ]);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Clinical Specialities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Medical Departments & Specialities
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Our multi-speciality departments are staffed by experienced clinicians and supported by advanced diagnostic
            laboratories and modern operating suites.
          </p>
        </div>
      </section>

      {/* 2. Departments Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(dept => {
            const icon = DEPT_ICONS[dept.code] || <Activity className="w-7 h-7 text-teal-600" />;
            const deptDoctors = doctors.filter(d => d.department_id === dept.id);

            return (
              <div
                key={dept.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#0e4a7b] shadow-sm hover:shadow-lg transition duration-200 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {icon}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-teal-700 font-semibold">
                      {deptDoctors.length} Specialist Consultant{deptDoctors.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {dept.description ||
                      'Outpatient consultations, routine clinical evaluations, and specialized therapy provided by senior attending doctors.'}
                  </p>

                  {/* Doctors in this department preview */}
                  {deptDoctors.length > 0 && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                      <span className="font-bold text-slate-700 block">Attending Doctors:</span>
                      <ul className="text-slate-600 space-y-0.5">
                        {deptDoctors.slice(0, 2).map(d => (
                          <li key={d.id} className="truncate">• {d.full_name} ({d.qualification})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/departments/${dept.code}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0e4a7b] hover:underline"
                  >
                    <span>Department Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/book?department_id=${dept.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] px-3 py-1.5 rounded-lg transition shadow-sm"
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
    </div>
  );
}

