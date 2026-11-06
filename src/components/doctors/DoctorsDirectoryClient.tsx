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
    <div className="space-y-12 pb-16">
      {/* 1. Page Header */}
      <section className="bg-gradient-to-b from-[#F4F8F5] via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#15965C] text-xs font-bold">
            <Stethoscope className="w-3.5 h-3.5 text-[#15965C]" />
            <span>Consultant Specialists & Medical Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Specialist Doctors
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Browse our attending medical consultants across 15+ clinical departments in Krishnanagar, Nadia. Inspect verified degrees,
            OPD chamber timings, consultation fees, and reserve your appointment slot online with zero advance payment.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Search Input */}
            <div className="sm:col-span-7 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by doctor name (e.g. 'Dr. Sourav'), specialty, or degree..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15965C]"
              />
            </div>

            {/* Department Filter Dropdown */}
            <div className="sm:col-span-5 relative">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white"
              >
                <option value="">All Clinical Departments ({initialDoctors.length})</option>
                {initialDepartments.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing <strong className="text-slate-800">{filteredDoctors.length}</strong> of{' '}
              {initialDoctors.length} registered specialists
            </span>
            {(search || selectedDept) && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedDept('');
                }}
                className="text-xs font-bold text-[#15965C] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Doctors List Grid with Authentic Portrait Imagery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDoctors.length === 0 ? (
          <div className="p-16 text-center bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
            <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No specialists found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any doctor matching your current filter criteria. Try adjusting the search term or view all departments.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('');
              }}
              className="px-5 py-2.5 bg-[#15965C] text-white text-xs font-bold rounded-xl shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doc => {
              const portraitUrl =
                doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/doc-sourav-mukherjee.jpg';

              return (
                <div
                  key={doc.id}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-[#15965C] shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Doctor Portrait & Title */}
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
                        <img
                          src={portraitUrl}
                          alt={doc.full_name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-emerald-50 text-[#15965C] border border-emerald-200">
                          {doc.department_name || 'Specialist'}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 leading-snug truncate">
                          {doc.full_name}
                        </h3>
                        <p className="text-xs font-semibold text-[#0B72A2] truncate">
                          {doc.speciality}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {doc.qualification}
                        </p>
                      </div>
                    </div>

                    {/* Chamber & Fee Schedule */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Chamber:</span>
                        </span>
                        <span className="font-bold text-slate-800">
                          {doc.room_number || 'OPD-101'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{t.consultation_fee}:</span>
                        </span>
                        <span className="font-extrabold text-[#15965C] text-sm">
                          ₹{doc.consultation_fee}
                        </span>
                      </div>

                      {doc.follow_up_fee && (
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Follow-up (within 7 days):</span>
                          <span>₹{doc.follow_up_fee}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 bg-slate-50/50 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <Link
                      href={`/doctors/${doc.id}`}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold text-center transition"
                    >
                      {t.view_profile}
                    </Link>

                    <Link
                      href={`/book?doctor=${doc.id}`}
                      className="py-2.5 px-3 rounded-xl bg-[#15965C] hover:bg-[#0E7444] text-white text-xs font-bold text-center transition shadow-sm"
                    >
                      {t.book_slot}
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
