import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { PackagesClient } from '@/components/packages/PackagesClient';

export const metadata: Metadata = {
  title: 'Preventive Health Checkup Packages | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Comprehensive preventive health checkup packages: Basic Health, Cardiac Screening, Master Executive, Women’s Wellness, and Senior Citizen Care at Hiramani Memorial Hospital, Krishnanagar, Nadia.',
};

export const revalidate = 60;

export default async function HealthPackagesPage() {
  const packages = await HospitalRepo.getHealthPackages();

  return <PackagesClient initialPackages={packages} />;
}
