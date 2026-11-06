import { HospitalRepo } from '@/lib/db/repo';
import { HomeClient } from '@/components/home/HomeClient';

export const revalidate = 60;

export default async function HomePage() {
  const [doctors, departments, healthPackages, diagnosticTests, announcements] = await Promise.all([
    HospitalRepo.getDoctors(),
    HospitalRepo.getDepartments(),
    HospitalRepo.getHealthPackages(),
    HospitalRepo.getDiagnosticTests(),
    HospitalRepo.getCMSAnnouncements(),
  ]);

  return (
    <HomeClient
      initialDoctors={doctors}
      initialDepartments={departments}
      initialHealthPackages={healthPackages}
      initialDiagnosticTests={diagnosticTests}
      initialAnnouncements={announcements}
    />
  );
}
