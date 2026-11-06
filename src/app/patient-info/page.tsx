import React from 'react';
import { Metadata } from 'next';
import { PatientInfoClient } from '@/components/patient-info/PatientInfoClient';

export const metadata: Metadata = {
  title: 'Patient Guide, Admission & Hospital Facilities | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Comprehensive patient guide for inpatient admissions, visiting hours, ward options, discharge procedures, and amenities at Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export default function PatientInfoPage() {
  return <PatientInfoClient />;
}
