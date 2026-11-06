'use client';

import React from 'react';
import {
  Briefcase,
  CheckCircle2,
  Mail,
  Building2,
  Clock,
  ArrowRight,
  Award,
  PhoneCall,
  MapPin,
} from 'lucide-react';
import { CMSCareer } from '@/types';

interface CareersClientProps {
  careers: CMSCareer[];
}

export function CareersClient({ careers }: CareersClientProps) {
  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Join Our Clinical Team • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Careers at Hiramani Memorial Hospital
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Build your medical career with a healthcare institution dedicated to clinical excellence, patient dignity, and supportive professional development in Nadia district.
          </p>
        </div>
      </section>

      {/* 2. Active Job Openings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Active Vacancies
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Current Clinical & Administrative Openings
          </h2>
        </div>

        {careers.length === 0 ? (
          <div className="p-10 text-center bg-[#F7FAF9] rounded-xl border border-[#E5EBEF] space-y-3">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#103653]">No Current Vacancies</h3>
            <p className="text-xs text-[#526273] max-w-sm mx-auto">
              We are not actively recruiting for specific openings right now, but we welcome unsolicited resumes from qualified nurses, technicians, and doctors.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {careers.map(job => (
              <div
                key={job.id}
                className="p-5 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#F4F8F5] text-[#15965C] border border-[#15965C]/20">
                      {job.department}
                    </span>
                    <span className="text-xs text-[#526273] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {job.employment_type || 'Full-time'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#103653]">
                    {job.title}
                  </h3>

                  <p className="text-xs text-[#526273] leading-relaxed">
                    {job.description}
                  </p>

                  <div className="pt-2 border-t border-[#E5EBEF] text-xs text-[#526273] space-y-1">
                    <div>Qualification: <strong className="text-[#182B3D]">{job.qualification_required || 'Relevant Degree / Diploma'}</strong></div>
                    <div>Experience: <strong className="text-[#182B3D]">{job.experience_required || '1-3 Years'}</strong></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5EBEF] flex items-center justify-between">
                  <span className="text-xs text-[#526273] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#159FDB]" />
                    <span>Nediarpara Campus</span>
                  </span>
                  <a
                    href="mailto:careers@hiramani.co.in"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#15965C] hover:underline"
                  >
                    <span>Apply via Email</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. General Recruitment Inquiries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] text-xs text-[#526273] space-y-2">
          <h3 className="font-bold text-sm text-[#103653] flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#15965C]" />
            <span>How to Submit an Open Application</span>
          </h3>
          <p className="leading-relaxed">
            Interested candidates for nursing, medical lab technology, pharmacology, or administration may send their detailed curriculum vitae to <strong>careers@hiramani.co.in</strong> or submit a physical copy in a sealed envelope at our hospital reception desk: 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar - 741101.
          </p>
        </div>
      </section>
    </div>
  );
}
