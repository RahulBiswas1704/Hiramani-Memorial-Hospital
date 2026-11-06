import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { DoctorsDirectoryClient } from '@/components/doctors/DoctorsDirectoryClient';

export const metadata: Metadata = {
  title: 'Doctor Directory & OPD Timings | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Find specialist doctors and surgeons at Hiramani Memorial Hospital in Krishnanagar, Nadia. Filter by department, view verified qualifications, OPD chamber timings, and consultation fees.',
};

export const revalidate = 60;

export default async function DoctorsPage() {
  const [doctors, departments] = await Promise.all([
    HospitalRepo.getDoctors(),
    HospitalRepo.getDepartments(),
  ]);

  return (
    <DoctorsDirectoryClient
      initialDoctors={doctors}
      initialDepartments={departments}
    />
  );
}

