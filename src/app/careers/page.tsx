import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  CheckCircle2,
  Mail,
  Building2,
  Clock,
  ArrowRight,
  Award,
  PhoneCall,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Careers & Healthcare Job Openings | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Join our clinical healthcare team in Krishnanagar, Nadia. Explore nursing, medical lab technician, doctor, and hospital administration vacancies at Hiramani Memorial Hospital.',
};

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await HospitalRepo.getCMSCareers();

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5 text-hospital-green" />
            <span>Join Our Clinical Team • Krishnanagar Campus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Careers at Hiramani Memorial Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Build your medical career with a healthcare institution dedicated to clinical excellence, patient dignity, and supportive professional development. We welcome applications from dedicated nursing staff, lab technicians, and medical officers.
          </p>
        </div>
      </section>

      {/* 2. Open Vacancies List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Active Job Openings
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Current Clinical & Administrative Vacancies
          </h2>
          <p className="text-xs text-slate-500">
            Open positions at our Krishnanagar hospital campus. Experienced professionals and qualified freshers may apply.
          </p>
        </div>

        {careers.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No active vacancies listed</h3>
            <p className="text-xs text-slate-500">
              You may still email your resume to our HR department for future openings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-hospital-green hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-hospital-green bg-hospital-green/10 px-3 py-1 rounded-full border border-hospital-green/20">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {job.employment_type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {job.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div>
                      <strong>Qualification:</strong> {job.qualification_required}
                    </div>
                    <div>
                      <strong>Experience:</strong> {job.experience_required}
                    </div>
                    <div>
                      <strong>Vacancies:</strong> {job.vacancies} Position{job.vacancies > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={`mailto:info@hiramani.co.in?subject=Application for ${encodeURIComponent(job.title)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-hospital-green hover:bg-[#0f7a49] transition shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Apply via Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. General Application Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-hospital-slate text-white space-y-4">
          <div className="flex items-center gap-2 text-hospital-green text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Recruitment Policy</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">How to Submit Your Application</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Interested candidates may send their updated resume along with copies of registration certificates (WBNC / WBMC / DMLT) to <strong className="text-hospital-green">info@hiramani.co.in</strong> with the job title in the subject line, or submit a hard copy in person at the Hospital HR Administrative Office, 40, Ananta Hari Mitra Road, Nediarpara, Krishnanagar - 741101 (Mon – Sat, 10:00 AM – 04:00 PM).
          </p>
        </div>
      </section>
    </div>
  );
}
