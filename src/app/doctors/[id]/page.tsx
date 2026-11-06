import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Stethoscope,
  Building2,
  Clock,
  CalendarCheck,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  PhoneCall,
  User,
  Award,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

interface DoctorProfilePageProps {
  params: {
    id: string;
  };
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export async function generateMetadata({ params }: DoctorProfilePageProps): Promise<Metadata> {
  const doctor = await HospitalRepo.getDoctorById(params.id);
  if (!doctor) {
    return {
      title: 'Doctor Not Found | Hiramani Memorial Hospital',
    };
  }
  return {
    title: `${doctor.full_name} (${doctor.speciality}) | Hiramani Memorial Hospital Kolkata`,
    description: `Consult ${doctor.full_name}, ${doctor.qualification}, practicing in ${doctor.speciality} at Hiramani Memorial Hospital Kolkata. Chamber OPD timings, fees, and booking.`,
  };
}

export default async function DoctorProfilePage({ params }: DoctorProfilePageProps) {
  const doctor = await HospitalRepo.getDoctorById(params.id);

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Stethoscope className="w-16 h-16 text-slate-400 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-800">Doctor Profile Not Found</h1>
        <p className="text-sm text-slate-500">
          The specialist you are searching for may have been updated or moved.
        </p>
        <div className="pt-2">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e4a7b] text-white text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Doctor Directory</span>
          </Link>
        </div>
      </div>
    );
  }

  const [schedules, department] = await Promise.all([
    HospitalRepo.getDoctorSchedules(doctor.id),
    doctor.department_id ? HospitalRepo.getDepartmentById(doctor.department_id) : Promise.resolve(undefined),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0e4a7b] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Specialist Directory</span>
      </Link>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Doctor Avatar / Icon */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-[#0e4a7b] to-[#0d9488] flex items-center justify-center text-white shadow-xl shadow-sky-950/10">
              <Stethoscope className="w-14 h-14" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Active Consultant
              </span>
              <div className="text-xs text-slate-500 pt-1">
                Experience: {doctor.experience_years ? `${doctor.experience_years}+ Years` : 'Senior Consultant'}
              </div>
            </div>
            <div className="w-full pt-2">
              <Link
                href={`/book?doctor_id=${doctor.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0e4a7b] to-[#0d9488] hover:from-[#0b3459] hover:to-[#0f766e] shadow-md transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book OPD Slot</span>
              </Link>
            </div>
          </div>

          {/* Doctor Detailed Info */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                {department?.name || doctor.department_name || 'Medical Department'}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {doctor.full_name}
              </h1>
              <p className="text-sm font-semibold text-slate-700">
                {doctor.qualification}
              </p>
              <p className="text-xs text-teal-700 font-bold">
                Speciality: {doctor.speciality}
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Professional Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctor.bio ||
                  `${doctor.full_name} is a senior attending specialist in the Department of ${
                    department?.name || doctor.speciality
                  } at Hiramani Memorial Hospital Kolkata, providing compassionate outpatient care, diagnostic assessment, and evidence-based clinical therapy.`}
              </p>
            </div>

            {/* Chamber & Pricing Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">Chamber Room</div>
                <div className="text-base font-bold text-slate-900">
                  {doctor.room_number || 'OPD-101'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">Consultation Fee</div>
                <div className="text-base font-black text-[#0e4a7b]">
                  ₹{doctor.consultation_fee}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500">Follow-up Fee</div>
                <div className="text-base font-bold text-slate-900">
                  ₹{doctor.follow_up_fee}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly OPD Schedule Roster */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Weekly OPD Consultation Schedule</span>
            </h3>
            <span className="text-xs text-slate-500">Slot duration: 20 mins</span>
          </div>

          {schedules.length === 0 ? (
            <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl">
              No fixed OPD schedules published. Please contact reception at +91 78729 57300 for today&apos;s OPD timings.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {schedules.map(sch => (
                <div
                  key={sch.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-800">{DAYS[sch.day_of_week]}</span>
                  <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {sch.start_time.slice(0, 5)} - {sch.end_time.slice(0, 5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
