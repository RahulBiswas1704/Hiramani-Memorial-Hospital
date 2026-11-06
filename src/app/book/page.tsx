import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { QuickBookingClient } from '@/components/booking/QuickBookingClient';

export const metadata: Metadata = {
  title: 'Book Doctor Appointment Online | Hiramani Memorial Hospital Kolkata',
  description:
    'Book outpatient doctor appointments online at Hiramani Memorial Hospital Kolkata. Select department, doctor, and confirmed time slot with instant reference.',
};

export const revalidate = 60;

interface BookPageProps {
  searchParams: {
    doctor_id?: string;
    department_id?: string;
  };
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const [doctors, departments] = await Promise.all([
    HospitalRepo.getDoctors(),
    HospitalRepo.getDepartments(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <QuickBookingClient
        initialDoctors={doctors}
        initialDepartments={departments}
        preselectedDoctorId={searchParams.doctor_id}
        preselectedDeptId={searchParams.department_id}
      />
    </div>
  );
}

