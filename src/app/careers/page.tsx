import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { CareersClient } from '@/components/careers/CareersClient';

export const metadata: Metadata = {
  title: 'Careers & Healthcare Job Openings | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Join our clinical healthcare team in Krishnanagar, Nadia. Explore nursing, medical lab technician, doctor, and hospital administration vacancies at Hiramani Memorial Hospital.',
};

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await HospitalRepo.getCMSCareers();

  return <CareersClient careers={careers} />;
}
