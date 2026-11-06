import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { DiagnosticsClient } from '@/components/diagnostics/DiagnosticsClient';

export const metadata: Metadata = {
  title: 'Diagnostic Tests, Pathology & Scans | Hiramani Memorial Hospital Kolkata',
  description:
    'Comprehensive diagnostic laboratory tests, pathology, digital X-Ray, 2D Echo, and ultrasound pricing and instructions at Hiramani Memorial Hospital Kolkata.',
};

export const revalidate = 60;

export default async function DiagnosticsPage() {
  const [categories, tests] = await Promise.all([
    HospitalRepo.getDiagnosticCategories(),
    HospitalRepo.getDiagnosticTests(),
  ]);

  return (
    <DiagnosticsClient
      categories={categories}
      tests={tests}
    />
  );
}

