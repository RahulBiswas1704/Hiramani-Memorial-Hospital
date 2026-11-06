import React from 'react';
import { Metadata } from 'next';
import { InsuranceClient } from '@/components/insurance/InsuranceClient';

export const metadata: Metadata = {
  title: 'Cashless Mediclaim, Insurance & TPA Desk | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Cashless hospitalization, private health insurance TPAs, Swasthya Sathi scheme information, and pre-authorization documentation at Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export default function InsurancePage() {
  return <InsuranceClient />;
}
