'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Stethoscope,
  Search,
  Filter,
  Building2,
  Clock,
  CalendarCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Doctor, Department } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface DoctorsDirectoryClientProps {
  initialDoctors: Doctor[];
  initialDepartments: Department[];
}

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
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            <span>Consultant Specialists & Surgeons</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Specialist Doctors
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Browse our attending medical consultants across 15+ departments. Inspect verified degrees,
            OPD chamber timings, consultation fees, and reserve your appointment slot online or via WhatsApp.
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
                placeholder="Search by doctor name (e.g. 'Dr. Subhash'), specialty, or degree..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
              />
            </div>

            {/* Department Filter */}
            <div className="sm:col-span-5 relative">
              <select
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0e4a7b] bg-white"
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
                className="text-xs font-bold text-[#0e4a7b] hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Doctors List Grid */}
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
              className="px-4 py-2 bg-[#0e4a7b] text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map(doc => (
              <div
                key={doc.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Doctor Profile Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-teal-50 border border-slate-200 flex items-center justify-center text-[#0e4a7b] shrink-0 shadow-sm">
                      <Stethoscope className="w-8 h-8 text-[#0e4a7b]" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug truncate">
                        {doc.full_name}
                      </h3>
                      <p className="text-xs font-semibold text-teal-700 truncate">
                        {doc.speciality}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {doc.qualification}
                      </p>
                    </div>
                  </div>

                  {/* Chamber & Pricing Info */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        Chamber:
                      </span>
                      <span className="font-bold text-slate-800">
                        {doc.room_number || 'OPD-101'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {t.consultation_fee}:
                      </span>
                      <span className="font-black text-[#0e4a7b]">
                        ₹{doc.consultation_fee}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500">
                      <span>Follow-up Fee:</span>
                      <span className="font-medium text-slate-700">₹{doc.follow_up_fee}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    href={`/doctors/${doc.id}`}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                  >
                    View Profile
                  </Link>
                  <Link
                    href={`/book?doctor_id=${doc.id}`}
                    className="flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] shadow-sm transition"
                  >
                    {t.book_slot}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
