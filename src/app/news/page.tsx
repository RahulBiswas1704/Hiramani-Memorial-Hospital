import React from 'react';
import { Metadata } from 'next';
import { HospitalRepo } from '@/lib/db/repo';
import { NewsClient } from '@/components/news/NewsClient';

export const metadata: Metadata = {
  title: 'Hospital Notices, Health Advisories & News | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Official news, medical advisories, seasonal fever updates, community health camps, and hospital announcements from Hiramani Memorial Hospital in Krishnanagar, Nadia.',
};

export const revalidate = 60;

export default async function NewsPage() {
  const announcements = await HospitalRepo.getCMSAnnouncements();

  return <NewsClient announcements={announcements} />;
}
