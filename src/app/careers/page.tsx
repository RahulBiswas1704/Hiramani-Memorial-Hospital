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
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Careers & Healthcare Job Openings | Hiramani Memorial Hospital Kolkata',
  description:
    'Join our compassionate healthcare team. Explore nursing, medical lab technician, doctor, and hospital administration vacancies at Hiramani Memorial Hospital Kolkata.',
};

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await HospitalRepo.getCMSCareers();

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-teal-600" />
            <span>Join Our Clinical Team</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Careers at Hiramani Memorial Hospital
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Build your career with a healthcare institution dedicated to patient excellence, clinical dignity, and
            supportive staff development. We are continually seeking dedicated nurses, technicians, and medical professionals.
          </p>
        </div>
      </section>

      {/* 2. Open Vacancies List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Current Clinical Openings
          </h2>
          <p className="text-xs text-slate-500">
            Open positions at our Kolkata hospital. Freshers and experienced professionals are welcome to apply.
          </p>
        </div>

        {careers.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No active vacancies listed</h3>
            <p className="text-xs text-slate-500">
              You may still email your resume to our HR department for future opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-[#0e4a7b] hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
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

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1.5 text-slate-600">
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
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] transition shadow-sm"
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
        <div className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <h3 className="text-lg font-bold">How to Apply</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Interested candidates may send their updated resume along with copies of registration certificates
            (WBNC / MCI / DMLT) to <strong className="text-teal-400">info@hiramani.co.in</strong> with the job title
            in the subject line, or submit a hard copy in person at the Hospital HR Administrative Office (Mon – Sat, 10 AM – 4 PM).
          </p>
        </div>
      </section>
    </div>
  );
}

