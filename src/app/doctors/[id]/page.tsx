import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
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

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Doctor Portrait Column */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
            <div className="w-36 h-36 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-lg shrink-0">
              <img
                src={portraitUrl}
                alt={doctor.full_name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15965C] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Attending Consultant</span>
              </span>
              <div className="text-xs text-slate-500 pt-1">
                Clinical Experience: {doctor.experience_years ? `${doctor.experience_years}+ Years` : 'Senior Consultant'}
              </div>
            </div>

            <div className="w-full pt-2">
              <Link
                href={`/book?doctor=${doctor.id}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#15965C] hover:bg-[#0E7444] shadow-md transition"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book OPD Slot</span>
              </Link>
            </div>
          </div>

          {/* Doctor Detailed Info Column */}
          <div className="md:col-span-8 space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#15965C]">
                {department?.name || doctor.department_name || 'Clinical Speciality'}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {doctor.full_name}
              </h1>
              <p className="text-sm font-semibold text-[#0B72A2]">
                {doctor.speciality}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {doctor.qualification}
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clinical Overview
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctor.bio ||
                  `${doctor.full_name} is a senior attending specialist in the Department of ${
                    department?.name || doctor.speciality
                  } at Hiramani Memorial Hospital Krishnanagar, providing compassionate outpatient care, diagnostic assessment, and evidence-based clinical therapy.`}
              </p>
            </div>

            {/* Chamber & Fee Schedule Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">OPD Chamber</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  {doctor.room_number || 'OPD-101'}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Consultation Fee</div>
                <div className="text-base font-black text-[#15965C] mt-0.5">
                  ₹{doctor.consultation_fee}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Follow-up Fee (7 Days)</div>
                <div className="text-base font-bold text-slate-900 mt-0.5">
                  ₹{doctor.follow_up_fee || 400}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly OPD Schedule Roster */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#15965C]" />
              <span>Weekly OPD Consultation Roster</span>
            </h3>
            <span className="text-xs text-slate-500">Slot duration: 20 mins</span>
          </div>

          {schedules.length === 0 ? (
            <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl border border-slate-200">
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
                  <span className="font-semibold text-[#15965C] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
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
