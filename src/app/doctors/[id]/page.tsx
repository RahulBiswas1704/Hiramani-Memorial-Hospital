import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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

const DOCTOR_PORTRAITS: Record<string, string> = {
  'Dr. Sourav Mukherjee': '/images/doc-sourav-mukherjee.jpg',
  'Dr. Ananya Roy Chowdhury': '/images/doc-ananya-roy.jpg',
  'Dr. Rajesh Sen': '/images/doc-rajesh-sen.jpg',
  'Dr. Priyanka Banerjee': '/images/doc-priyanka-banerjee.jpg',
  'Dr. Amitav Das': '/images/doc-amitav-das.jpg',
  'Dr. Nandini Sengupta': '/images/doc-nandini-sengupta.jpg',
  'Dr. Subhashis Ghosh': '/images/doc-subhashis-ghosh.jpg',
};

export async function generateMetadata({ params }: DoctorProfilePageProps): Promise<Metadata> {
  const doctor = await HospitalRepo.getDoctorById(params.id);
  if (!doctor) {
    return {
      title: 'Doctor Not Found | Hiramani Memorial Hospital',
    };
  }
  return {
    title: `${doctor.full_name} (${doctor.speciality}) | Hiramani Memorial Hospital Krishnanagar`,
    description: `Consult ${doctor.full_name}, ${doctor.qualification}, practicing in ${doctor.speciality} at Hiramani Memorial Hospital Krishnanagar, Nadia. Chamber OPD timings, fees, and booking.`,
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#15965C] text-white text-xs font-bold"
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

  const portraitUrl =
    doctor.profile_image_url || DOCTOR_PORTRAITS[doctor.full_name] || '/images/doc-sourav-mukherjee.jpg';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#15965C] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Specialist Directory</span>
      </Link>

      {/* Main Profile Container */}
      <div className="bg-white rounded-xl border border-[#E5EBEF] p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Doctor Portrait Column */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-[#F7FAF9] rounded-xl border border-[#E5EBEF] space-y-4">
            <div className="relative w-32 h-36 rounded-lg overflow-hidden bg-slate-100 border border-[#E5EBEF] shadow-sm shrink-0">
              <Image
                src={portraitUrl}
                alt={doctor.full_name}
                fill
                priority
                sizes="128px"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15965C] bg-[#F4F8F5] border border-[#15965C]/30 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Attending Consultant</span>
              </span>
              <div className="text-xs text-[#526273] pt-1">
                Experience: {doctor.experience_years ? `${doctor.experience_years}+ Years` : 'Senior Consultant'}
              </div>
            </div>

            <div className="w-full pt-2">
              <Link
                href={`/book?doctor_id=${doctor.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book OPD Slot</span>
              </Link>
            </div>
          </div>

          {/* Doctor Detailed Info Column */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-1.5 border-b border-[#E5EBEF] pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
                {department?.name || doctor.department_name || 'Clinical Speciality'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#103653] tracking-tight">
                {doctor.full_name}
              </h1>
              <p className="text-sm font-semibold text-[#159FDB]">
                {doctor.speciality}
              </p>
              <p className="text-xs text-[#526273]">
                {doctor.qualification}
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#526273]">
                Clinical Overview
              </h3>
              <p className="text-xs sm:text-sm text-[#526273] leading-relaxed">
                {doctor.bio ||
                  `${doctor.full_name} is a senior attending specialist in the Department of ${
                    department?.name || doctor.speciality
                  } at Hiramani Memorial Hospital Krishnanagar, providing compassionate outpatient care, diagnostic assessment, and evidence-based clinical therapy.`}
              </p>
            </div>

            {/* Chamber & Fee Schedule Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
                <div className="text-xs text-[#526273]">OPD Chamber</div>
                <div className="text-sm font-bold text-[#182B3D] mt-0.5">
                  {doctor.room_number || 'OPD-101'}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
                <div className="text-xs text-[#526273]">Consultation Fee</div>
                <div className="text-sm font-bold text-[#15965C] mt-0.5">
                  ₹{doctor.consultation_fee}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF]">
                <div className="text-xs text-[#526273]">Follow-up Fee (7 Days)</div>
                <div className="text-sm font-bold text-[#182B3D] mt-0.5">
                  ₹{doctor.follow_up_fee || 400}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly OPD Schedule Roster */}
        <div className="space-y-3 pt-6 border-t border-[#E5EBEF]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#103653] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#15965C]" />
              <span>Weekly OPD Consultation Roster</span>
            </h3>
            <span className="text-xs text-[#526273]">Slot duration: 20 mins</span>
          </div>

          {schedules.length === 0 ? (
            <p className="text-xs text-[#526273] p-4 bg-[#F7FAF9] rounded-lg border border-[#E5EBEF]">
              No fixed OPD schedules published. Please contact reception at +91 78729 57300 for today&apos;s OPD timings.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {schedules.map(sch => (
                <div
                  key={sch.id}
                  className="p-3 rounded-lg border border-[#E5EBEF] bg-[#F7FAF9] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#182B3D]">{DAYS[sch.day_of_week]}</span>
                  <span className="font-bold text-[#15965C] bg-[#F4F8F5] px-2 py-0.5 rounded border border-[#15965C]/20">
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
