'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Search,
  Building2,
  Clock,
  CalendarCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Doctor, Department } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DoctorsDirectoryClientProps {
  initialDoctors: Doctor[];
  initialDepartments: Department[];
}

const DOCTOR_PORTRAITS: Record<string, string> = {
  'Dr. Sourav Mukherjee': '/images/doc-sourav-mukherjee.jpg',
  'Dr. Ananya Roy Chowdhury': '/images/doc-ananya-roy.jpg',
  'Dr. Rajesh Sen': '/images/doc-rajesh-sen.jpg',
  'Dr. Priyanka Banerjee': '/images/doc-priyanka-banerjee.jpg',
  'Dr. Amitav Das': '/images/doc-amitav-das.jpg',
  'Dr. Nandini Sengupta': '/images/doc-nandini-sengupta.jpg',
  'Dr. Subhashis Ghosh': '/images/doc-subhashis-ghosh.jpg',
};

export function DoctorsDirectoryClient({
  initialDoctors,
  initialDepartments,
}: DoctorsDirectoryClientProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');

  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter(doc => {
      const matchSearch =
        !search ||
        doc.full_name.toLowerCase().includes(search.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(search.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(search.toLowerCase());
      const matchDept = !selectedDept || doc.department_id === selectedDept;
      return matchSearch && matchDept;
    });
  }, [initialDoctors, search, selectedDept]);

  return (
    <div className="space-y-10 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header */}
      <section className="pt-8 sm:pt-12 pb-10 sm:pb-12 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] uppercase tracking-wider">
            <span>Specialist Faculty • Krishnanagar, Nadia</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Consultant Specialist Directory
          </h1>
          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Consult experienced resident and visiting physicians across 8+ clinical specialities. Inspect verified medical degrees, OPD chamber schedules, and standardized consultation fees.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-6 border-b border-[#E5EBEF]">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor by name (e.g. 'Dr. Sourav'), specialty, or degree..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium text-[#182B3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white"
            />
          </div>

          {/* Department Filter Dropdown */}
          <div className="sm:w-72 shrink-0">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium text-[#182B3D] focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white"
            >
              <option value="">All Clinical Specialities ({initialDoctors.length})</option>
              {initialDepartments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {(search || selectedDept) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('');
              }}
              className="px-3 py-2 text-xs font-bold text-[#15965C] hover:underline shrink-0"
            >
              Reset
            </button>
          )}
        </div>

        <div className="text-xs text-[#526273] pt-3">
          Showing <strong>{filteredDoctors.length}</strong> of {initialDoctors.length} consultant specialists
        </div>
      </section>

      {/* 3. Refined Medical Directory Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDoctors.length === 0 ? (
          <div className="p-12 text-center bg-[#F7FAF9] rounded-xl border border-[#E5EBEF] space-y-3">
            <Stethoscope className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-[#103653]">No doctors found</h3>
            <p className="text-xs text-[#526273] max-w-sm mx-auto">
              No consultant matching your current filter criteria. Try adjusting the search term or resetting the department filter.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('');
              }}
              className="px-4 py-2 bg-[#15965C] text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Show All Doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDoctors.map(doc => {
              const portraitUrl =
                doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/doc-sourav-mukherjee.jpg';

              return (
                <div
                  key={doc.id}
                  className="rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3.5">
                    {/* Doctor Header & Portrait */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-100 border border-[#E5EBEF] shrink-0">
                        <img
                          src={portraitUrl}
                          alt={doc.full_name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#15965C] block">
                          {doc.department_name || doc.speciality}
                        </span>
                        <h3 className="text-base font-bold text-[#103653] leading-snug truncate">
                          {doc.full_name}
                        </h3>
                        <p className="text-xs font-medium text-[#159FDB] truncate">
                          {doc.speciality}
                        </p>
                        <p className="text-[11px] text-[#526273] truncate">
                          {doc.qualification}
                        </p>
                        <p className="text-[11px] text-[#526273]">
                          {doc.experience_years ? `${doc.experience_years}+ Years Experience` : 'Senior Consultant'}
                        </p>
                      </div>
                    </div>

                    {/* Chamber & Consultation Fee */}
                    <div className="pt-2 border-t border-[#E5EBEF] flex items-center justify-between text-xs">
                      <span className="text-[#526273]">
                        Chamber: <strong className="text-[#182B3D]">{doc.room_number || 'OPD-101'}</strong>
                      </span>
                      <span className="text-[#526273]">
                        OPD Fee: <strong className="text-[#15965C] font-bold">₹{doc.consultation_fee}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="pt-3 border-t border-[#E5EBEF] flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="text-xs font-semibold text-[#526273] hover:text-[#15965C] transition py-1 text-center xs:text-left"
                    >
                      View Profile & Schedule
                    </Link>
                    <Link
                      href={`/book?doctor_id=${doc.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
