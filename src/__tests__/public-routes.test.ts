import { describe, it, expect } from 'vitest';
import { HospitalRepo } from '../lib/db/repo';

describe('Phase 2 Public Website & Healthcare Data Layer', () => {
  it('loads active hospital departments with codes and descriptions', async () => {
    const departments = await HospitalRepo.getDepartments();
    expect(departments.length).toBeGreaterThanOrEqual(8);

    const cardiology = departments.find(d => d.code === 'CARDIO' || d.code.toLowerCase().includes('cardio'));
    expect(cardiology).toBeDefined();
    expect(cardiology?.name).toBe('Cardiology');

    const generalMedicine = departments.find(d => d.code === 'GENMED' || d.code.toLowerCase().includes('genmed'));
    expect(generalMedicine).toBeDefined();
  });

  it('loads verified doctor specialists with fees and chambers', async () => {
    const doctors = await HospitalRepo.getDoctors();
    expect(doctors.length).toBeGreaterThanOrEqual(7);

    for (const doc of doctors) {
      expect(doc.full_name).toBeTruthy();
      expect(doc.qualification).toBeTruthy();
      expect(doc.consultation_fee).toBeGreaterThan(0);
      expect(doc.is_active).toBe(true);
    }

    const firstDoc = doctors[0];
    const retrieved = await HospitalRepo.getDoctorById(firstDoc.id);
    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(firstDoc.id);
  });

  it('retrieves doctor weekly OPD consultation schedules', async () => {
    const doctors = await HospitalRepo.getDoctors();
    const doc = doctors[0];
    const schedules = await HospitalRepo.getDoctorSchedules(doc.id);
    expect(Array.isArray(schedules)).toBe(true);
    expect(schedules.length).toBeGreaterThan(0);

    const firstSchedule = schedules[0];
    expect(firstSchedule.start_time).toBeTruthy();
    expect(firstSchedule.end_time).toBeTruthy();
    expect(firstSchedule.day_of_week).toBeGreaterThanOrEqual(0);
    expect(firstSchedule.day_of_week).toBeLessThanOrEqual(6);
  });

  it('retrieves diagnostic categories and test catalog with transparent pricing', async () => {
    const categories = await HospitalRepo.getDiagnosticCategories();
    expect(categories.length).toBeGreaterThanOrEqual(3);

    const tests = await HospitalRepo.getDiagnosticTests();
    expect(tests.length).toBeGreaterThanOrEqual(10);

    const cbc = tests.find(t => t.code === 'TEST-CBC');
    expect(cbc).toBeDefined();
    expect(cbc?.price).toBe(350);
    expect(cbc?.sample_type).toContain('EDTA');

    const echo = tests.find(t => t.code === 'TEST-ECHO');
    expect(echo).toBeDefined();
    expect(echo?.price).toBe(1800);
  });

  it('retrieves preventive health packages with inclusions and discounts', async () => {
    const packages = await HospitalRepo.getHealthPackages();
    expect(packages.length).toBeGreaterThanOrEqual(4);

    const cardiac = packages.find(p => p.slug === 'cardiac-wellness-package');
    expect(cardiac).toBeDefined();
    expect(cardiac?.discounted_price).toBeLessThan(cardiac?.price || 0);
    expect(cardiac?.fasting_required).toBe(true);
  });

  it('retrieves published CMS announcements and emergency health advisories', async () => {
    const announcements = await HospitalRepo.getCMSAnnouncements();
    expect(announcements.length).toBeGreaterThanOrEqual(2);

    const dengueAdvisory = announcements.find(a => a.category === 'Health Advisory');
    expect(dengueAdvisory).toBeDefined();
    expect(typeof dengueAdvisory?.is_emergency_alert).toBe('boolean');
  });

  it('retrieves open hospital career vacancies', async () => {
    const careers = await HospitalRepo.getCMSCareers();
    expect(careers.length).toBeGreaterThanOrEqual(3);

    const icuNurse = careers.find(c => c.title.includes('ICU'));
    expect(icuNurse).toBeDefined();
    expect(icuNurse?.vacancies).toBeGreaterThan(0);
  });

  it('creates an online patient enquiry with unique tracking ticket', async () => {
    const query = await HospitalRepo.createQuery({
      patient_name: 'Priya Mukherjee',
      patient_phone: '+91 98301 23456',
      category: 'Diagnostic Tests & Reports',
      subject: 'Enquiry for 2D Echo appointment',
      description: 'Does the hospital require prior booking for 2D Echocardiogram?',
    });

    expect(query).toBeDefined();
    expect(query.id).toBeTruthy();
    expect(query.ticket_number).toMatch(/^TKT-\d{8}-\d{4}$/);
    expect(query.status).toBe('open');
    expect(query.patient_name).toBe('Priya Mukherjee');
  });
});
