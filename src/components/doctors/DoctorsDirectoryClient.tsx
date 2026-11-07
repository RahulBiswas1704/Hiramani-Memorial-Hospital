'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Stethoscope,
  Search,
  Building2,
  Clock,
  CalendarCheck,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Users,
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

const COMMON_SPECIALITY_CHIPS = [
  { label: 'All Doctors', id: '' },
  { label: 'Heart (Cardiology)', keyword: 'cardio' },
  { label: 'General Medicine & Fevers', keyword: 'medicine' },
  { label: 'Bone & Joints (Orthopaedics)', keyword: 'ortho' },
  { label: 'Children (Paediatrics)', keyword: 'paed' },
  { label: 'Women & Maternity (Gynae)', keyword: 'gynae' },
  { label: 'Surgery', keyword: 'surg' },
  { label: 'ENT (Ear, Nose, Throat)', keyword: 'ent' },
  { label: 'Skin (Dermatology)', keyword: 'derma' },
];

export function DoctorsDirectoryClient({
  initialDoctors,
  initialDepartments,
}: DoctorsDirectoryClientProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [activeChip, setActiveChip] = useState('');

  const filteredDoctors = useMemo(() => {
    return initialDoctors.filter(doc => {
      const matchSearch =
        !search ||
        doc.full_name.toLowerCase().includes(search.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(search.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(search.toLowerCase()) ||
        (doc.department_name && doc.department_name.toLowerCase().includes(search.toLowerCase()));

      const matchDept = !selectedDept || doc.department_id === selectedDept;

      const matchChip =
        !activeChip ||
        doc.speciality.toLowerCase().includes(activeChip.toLowerCase()) ||
        (doc.department_name && doc.department_name.toLowerCase().includes(activeChip.toLowerCase()));

      return matchSearch && matchDept && matchChip;
    });
  }, [initialDoctors, search, selectedDept, activeChip]);

  return (
    <div className="space-y-10 pb-20 bg-white text-[#182B3D]">
      {/* 1. Warm Human Header & Breadcrumb Trail */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-12 bg-gradient-to-b from-[#F4F8F5] via-[#F7FAF9] to-white border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-semibold">Specialist Doctors & OPD Roster</span>
          </nav>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#15965C] pt-1">
            <span className="w-2 h-2 rounded-full bg-[#15965C] inline-block" />
            <span>Visiting Specialist Doctors & Consultants • Krishnanagar Campus</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#103653] tracking-tight">
            Consultant Doctors & OPD Chamber Timings
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Consult experienced senior physicians and surgeons across 8+ medical departments. View chamber schedules, chamber room numbers, and standardized consultation fees payable directly at the hospital reception counter.
          </p>
        </div>
      </section>

      {/* 2. Patient-Friendly Search & Quick-Select Category Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Main Search Input & Department Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by doctor name (e.g. 'Dr. Sourav') or health issue (Heart, Bones, Child, Fever)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5EBEF] text-xs sm:text-sm font-medium text-[#182B3D] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-[#F7FAF9] focus:bg-white transition"
            />
          </div>

          <div className="sm:w-72 shrink-0">
            <select
              value={selectedDept}
              onChange={e => {
                setSelectedDept(e.target.value);
                setActiveChip('');
              }}
              className="w-full px-3.5 py-3 rounded-xl border border-[#E5EBEF] text-xs sm:text-sm font-medium text-[#182B3D] focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-[#F7FAF9] focus:bg-white transition"
            >
              <option value="">All Medical Departments ({initialDoctors.length})</option>
              {initialDepartments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {(search || selectedDept || activeChip) && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedDept('');
                setActiveChip('');
              }}
              className="px-4 py-3 text-xs font-bold text-[#15965C] hover:bg-[#F4F8F5] rounded-xl transition border border-[#15965C]/30 shrink-0"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Quick Problem-Based Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {COMMON_SPECIALITY_CHIPS.map(chip => (
            <button
              key={chip.label}
              onClick={() => {
                setActiveChip(chip.keyword || '');
                setSelectedDept('');
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                activeChip === (chip.keyword || '')
                  ? 'bg-[#103653] text-white shadow-sm font-bold'
                  : 'bg-[#F7FAF9] text-[#526273] hover:text-[#103653] hover:bg-slate-200/60 border border-[#E5EBEF]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#526273] flex items-center justify-between pt-1">
          <span>
            Showing <strong>{filteredDoctors.length}</strong> of {initialDoctors.length} consultant specialists
          </span>
          <span className="text-[11px] text-[#15965C] font-medium hidden sm:inline">
            Reception Helpdesk: +91 78729 57300 (8:00 AM – 8:00 PM)
          </span>
        </div>
      </section>

      {/* 3. Human Clinic Noticeboard Doctor Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDoctors.length === 0 ? (
          <div className="p-12 text-center bg-[#F7FAF9] rounded-2xl border border-[#E5EBEF] space-y-4">
            <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#103653]">No doctors matching your search</h3>
              <p className="text-xs text-[#526273] max-w-md mx-auto">
                Please check the spelling or try searching by medical condition such as Heart, Bones, Child, or Fever. You can also call our reception for direct guidance.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedDept('');
                  setActiveChip('');
                }}
                className="px-4 py-2 bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Show All Doctors
              </button>
              <a
                href="tel:+917872957300"
                className="px-4 py-2 bg-white border border-[#E5EBEF] text-[#103653] text-xs font-bold rounded-lg"
              >
                Call Reception: +91 78729 57300
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDoctors.map(doc => {
              const portraitUrl =
                doc.profile_image_url || DOCTOR_PORTRAITS[doc.full_name] || '/images/doc-sourav-mukherjee.jpg';

              return (
                <div
                  key={doc.id}
                  className="rounded-2xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition p-5 flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="space-y-3.5">
                    {/* Doctor Header & Portrait */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-100 border border-[#E5EBEF] shrink-0 shadow-sm">
                        <Image
                          src={portraitUrl}
                          alt={doc.full_name}
                          fill
                          sizes="80px"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>

                      <div className="space-y-1 min-w-0 flex-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#15965C] block">
                          {doc.department_name || doc.speciality}
                        </span>
                        <h3 className="text-base font-bold text-[#103653] leading-snug truncate">
                          {doc.full_name}
                        </h3>
                        <p className="text-xs font-medium text-[#159FDB] truncate">
                          {doc.speciality}
                        </p>
                        <p className="text-xs text-[#526273] truncate">
                          {doc.qualification}
                        </p>
                        <p className="text-[11px] text-[#526273]">
                          {doc.experience_years ? `${doc.experience_years}+ Years Experience` : 'Senior Consultant'}
                        </p>
                      </div>
                    </div>

                    {/* Chamber Room & Fee Card */}
                    <div className="p-3 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[#526273] block text-[11px]">Chamber Room</span>
                        <strong className="text-[#103653] font-bold">{doc.room_number || 'Room 101 (Ground Floor)'}</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[#526273] block text-[11px]">OPD Fee</span>
                        <span className="text-base font-extrabold text-[#15965C]">₹{doc.consultation_fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Accessible Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-[#E5EBEF]">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/book?doctor_id=${doc.id}`}
                        className="py-2.5 px-3 rounded-xl bg-[#15965C] hover:bg-[#117A4A] text-white font-bold text-xs text-center transition shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>Book Slot</span>
                      </Link>

                      <a
                        href="tel:+917872957300"
                        className="py-2.5 px-3 rounded-xl bg-[#F7FAF9] hover:bg-slate-200 text-[#103653] font-bold text-xs text-center transition flex items-center justify-center gap-1.5 border border-[#E5EBEF]"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-[#15965C]" />
                        <span>Call to Book</span>
                      </a>
                    </div>

                    <Link
                      href={`/doctors/${doc.id}`}
                      className="block text-center text-xs font-semibold text-[#526273] hover:text-[#15965C] transition py-1"
                    >
                      View Doctor Profile & Chamber Timetable ›
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Reception Telephone Guidance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-2xl bg-[#103653] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg font-bold text-white">
              Need Help Choosing the Right Doctor or Chamber Day?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Our reception desk in Nediarpara is available Monday to Saturday (8:00 AM – 8:00 PM) to check doctor availability, explain consultation fees, and assist elderly patients.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="tel:+917872957300"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Reception: +91 78729 57300</span>
            </a>

            <a
              href="tel:+917501074392"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>24x7 Emergency: +91 75010 74392</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
