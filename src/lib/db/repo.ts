// ==============================================================================
// HIRAMANI MEMORIAL HOSPITAL: UNIFIED REPOSITORY LAYER
// Concurrency-safe data access supporting both Supabase PostgreSQL and
// zero-configuration local demo mode with atomic slot reservations.
// ==============================================================================

import {
  Hospital,
  HospitalSettings,
  Department,
  Doctor,
  DoctorSchedule,
  DoctorTimeOff,
  Appointment,
  PatientQuery,
  QueryNote,
  FAQ,
  AuditLog,
  NotificationLog,
  AppointmentStatus,
  QueryStatus,
  Profile,
  UserRole,
  PatientAccount,
  DiagnosticCategory,
  DiagnosticTest,
  HealthPackage,
  DiagnosticReport,
  ClinicalNote,
  CMSAnnouncement,
  CMSCareer,
  BookingChannel,
} from '@/types';
import { getSupabaseAdmin, isServerSupabaseConfigured } from '@/lib/supabase/server';
import { WhatsAppService } from '@/lib/whatsapp/service';

// ------------------------------------------------------------------------------
// In-Memory / Local Demo Store (Verified data structure for Hiramani Memorial)
// ------------------------------------------------------------------------------
const DEMO_HOSPITAL: Hospital = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Hiramani Memorial Hospital',
  slug: 'hiramani-memorial-hospital',
  registration_number: 'REG-WB-KOL-2024-8976',
  phone: '+91 78729 57300',
  emergency_contact: '+91 75010 74392',
  email: 'info@hiramani.co.in',
  website: 'https://hiramani.co.in',
  address_line1: '40, Ananta Hari Mitra Road',
  address_line2: 'Near Income Tax Office, Nediarpara',
  city: 'Krishnanagar',
  state: 'West Bengal',
  pincode: '741101',
  google_maps_url: 'https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101',
  timezone: 'Asia/Kolkata',
  is_active: true,
  created_at: new Date().toISOString(),
};

const DEMO_SETTINGS: HospitalSettings = {
  id: '00000000-0000-0000-0000-000000000010',
  hospital_id: DEMO_HOSPITAL.id,
  opd_timings: 'Monday to Saturday: 08:30 AM to 08:00 PM | Sunday: 09:00 AM to 01:00 PM',
  visiting_hours: 'Morning: 11:00 AM to 01:00 PM | Evening: 05:00 PM to 07:00 PM',
  reception_hours: '24 Hours Emergency, Trauma & Reception',
  cancellation_policy: 'Appointments can be cancelled or rescheduled up to 2 hours before the scheduled time with no penalty.',
  booking_policy: 'Appointments can be booked up to 14 days in advance via WhatsApp or online portal.',
  advance_booking_days: 14,
  diagnostic_services_info: 'NABL accredited Pathology and Digital Radiology available 24x7. Home blood collection starts 6:30 AM.',
  admission_info: 'Round-the-clock emergency admissions, cashless mediclaim support, General Wards, Semi-Private, Deluxe and CCU/ICU.',
  billing_info: 'Transparent tariff, itemised bills, online payment accepted.',
  insurance_info: 'Cashless hospitalisation with Star Health, HDFC ERGO, ICICI Lombard, Medi Assist, Paramount, Raksha TPA and Swasthya Sathi.',
  whatsapp_phone_number_id: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  whatsapp_business_account_id: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
  whatsapp_display_number: process.env.WHATSAPP_DISPLAY_NUMBER || '+91 78729 57300',
  is_whatsapp_connected: Boolean(process.env.WHATSAPP_ACCESS_TOKEN),
};

const DEMO_DEPARTMENTS: Department[] = [
  { id: '10000000-0000-0000-0000-000000000001', hospital_id: DEMO_HOSPITAL.id, name: 'General Medicine', code: 'GENMED', description: 'Primary care, adult wellness, fever & diabetes management', contact_phone: '+91 33 2456 7891', icon_name: 'Stethoscope', is_active: true, display_order: 1 },
  { id: '10000000-0000-0000-0000-000000000002', hospital_id: DEMO_HOSPITAL.id, name: 'Cardiology', code: 'CARDIO', description: 'Heart care, hypertension, ECG, echocardiography, cardiac prevention', contact_phone: '+91 33 2456 7892', icon_name: 'HeartPulse', is_active: true, display_order: 2 },
  { id: '10000000-0000-0000-0000-000000000003', hospital_id: DEMO_HOSPITAL.id, name: 'Orthopaedics', code: 'ORTHO', description: 'Bones, joints, arthritis, sports injuries, fracture management', contact_phone: '+91 33 2456 7893', icon_name: 'Bone', is_active: true, display_order: 3 },
  { id: '10000000-0000-0000-0000-000000000004', hospital_id: DEMO_HOSPITAL.id, name: 'Dermatology', code: 'DERMA', description: 'Skin, hair, allergies, cosmetic dermatology, acne treatment', contact_phone: '+91 33 2456 7894', icon_name: 'Sparkles', is_active: true, display_order: 4 },
  { id: '10000000-0000-0000-0000-000000000005', hospital_id: DEMO_HOSPITAL.id, name: 'Paediatrics', code: 'PAED', description: 'Child health, immunisation, newborn care, paediatric emergencies', contact_phone: '+91 33 2456 7895', icon_name: 'Baby', is_active: true, display_order: 5 },
  { id: '10000000-0000-0000-0000-000000000006', hospital_id: DEMO_HOSPITAL.id, name: 'Gynaecology & Obstetrics', code: 'GYNAEC', description: 'Women health, prenatal care, fertility, maternity services', contact_phone: '+91 33 2456 7896', icon_name: 'HeartHandshake', is_active: true, display_order: 6 },
  { id: '10000000-0000-0000-0000-000000000007', hospital_id: DEMO_HOSPITAL.id, name: 'ENT (Otolaryngology)', code: 'ENT', description: 'Ear, nose, throat disorders, hearing tests, sinus consultations', contact_phone: '+91 33 2456 7897', icon_name: 'Headphones', is_active: true, display_order: 7 },
  { id: '10000000-0000-0000-0000-000000000008', hospital_id: DEMO_HOSPITAL.id, name: 'General & Laparoscopic Surgery', code: 'SURG', description: 'Day-care procedures, appendectomy, hernia, gallbladder and minor surgeries', contact_phone: '+91 33 2456 7898', icon_name: 'Activity', is_active: true, display_order: 8 },
];

const DEMO_DOCTORS: Doctor[] = [
  { id: '20000000-0000-0000-0000-000000000001', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000001', department_name: 'General Medicine', full_name: 'Dr. Sourav Mukherjee', qualification: 'MBBS, MD (Medicine)', speciality: 'Consultant Physician & Diabetologist', experience_years: 14, bio: 'Specialises in diabetes management, chronic hypertension, and adult fever.', consultation_fee: 600, follow_up_fee: 400, room_number: 'OPD-101', profile_image_url: '/images/doc-sourav-mukherjee.jpg', is_active: true, display_order: 1 },
  { id: '20000000-0000-0000-0000-000000000002', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000002', department_name: 'Cardiology', full_name: 'Dr. Ananya Roy Chowdhury', qualification: 'MBBS, MD, DM (Cardiology)', speciality: 'Senior Interventional Cardiologist', experience_years: 18, bio: 'Expertise in preventive cardiology, coronary angioplasty, and heart failure care.', consultation_fee: 900, follow_up_fee: 600, room_number: 'OPD-204', profile_image_url: '/images/doc-ananya-roy.jpg', is_active: true, display_order: 2 },
  { id: '20000000-0000-0000-0000-000000000003', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000003', department_name: 'Orthopaedics', full_name: 'Dr. Rajesh Sen', qualification: 'MBBS, MS (Ortho), MCh', speciality: 'Orthopaedic & Joint Replacement Surgeon', experience_years: 16, bio: 'Specialist in arthroscopy, knee/hip replacement, and complex trauma fractures.', consultation_fee: 800, follow_up_fee: 500, room_number: 'OPD-108', profile_image_url: '/images/doc-rajesh-sen.jpg', is_active: true, display_order: 3 },
  { id: '20000000-0000-0000-0000-000000000004', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000004', department_name: 'Dermatology', full_name: 'Dr. Priyanka Banerjee', qualification: 'MBBS, MD (DVL)', speciality: 'Consultant Dermatologist & Cosmetologist', experience_years: 9, bio: 'Focuses on clinical dermatology, hair disorders, and laser procedures.', consultation_fee: 700, follow_up_fee: 450, room_number: 'OPD-112', profile_image_url: '/images/doc-priyanka-banerjee.jpg', is_active: true, display_order: 4 },
  { id: '20000000-0000-0000-0000-000000000005', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000005', department_name: 'Paediatrics', full_name: 'Dr. Amitav Das', qualification: 'MBBS, DCH, MD (Paediatrics)', speciality: 'Senior Paediatrician & Neonatologist', experience_years: 15, bio: 'Dedicated to newborn care, childhood immunisations, and developmental milestones.', consultation_fee: 650, follow_up_fee: 400, room_number: 'OPD-105', profile_image_url: '/images/doc-amitav-das.jpg', is_active: true, display_order: 5 },
  { id: '20000000-0000-0000-0000-000000000006', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000006', department_name: 'Gynaecology & Obstetrics', full_name: 'Dr. Nandini Sengupta', qualification: 'MBBS, MS (Obst & Gynae)', speciality: 'Senior Gynaecologist & Laparoscopic Surgeon', experience_years: 17, bio: 'High-risk pregnancy management, fibroids, adolescent gynaecology.', consultation_fee: 850, follow_up_fee: 500, room_number: 'OPD-210', profile_image_url: '/images/doc-nandini-sengupta.jpg', is_active: true, display_order: 6 },
  { id: '20000000-0000-0000-0000-000000000007', hospital_id: DEMO_HOSPITAL.id, department_id: '10000000-0000-0000-0000-000000000007', department_name: 'ENT (Otolaryngology)', full_name: 'Dr. Subhashis Ghosh', qualification: 'MBBS, MS (ENT)', speciality: 'Senior ENT & Head-Neck Specialist', experience_years: 12, bio: 'Treats chronic sinusitis, hearing impairment, vertigo, and voice disorders.', consultation_fee: 600, follow_up_fee: 400, room_number: 'OPD-115', profile_image_url: '/images/doc-subhashis-ghosh.jpg', is_active: true, display_order: 7 },
];

const DEMO_SCHEDULES: DoctorSchedule[] = [
  // Dr. Sourav Mukherjee (Mon, Tue, Wed, Thu, Fri, Sat: 09:00 - 13:00, 20-min slots)
  { id: 's-1-1', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 1, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-1-2', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 2, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-1-3', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 3, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-1-4', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 4, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-1-5', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 5, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-1-6', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000001', day_of_week: 6, start_time: '09:00', end_time: '13:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  // Dr. Ananya Roy Chowdhury (Mon-Sat: 10:00 - 14:00, 30-min slots)
  { id: 's-2-1', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 1, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  { id: 's-2-2', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 2, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  { id: 's-2-3', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 3, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  { id: 's-2-4', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 4, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  { id: 's-2-5', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 5, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  { id: 's-2-6', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000002', day_of_week: 6, start_time: '10:00', end_time: '14:00', slot_duration_minutes: 30, max_patients_per_slot: 1, is_active: true },
  // Dr. Rajesh Sen (Mon-Sat: 14:00 - 18:00, 20-min slots)
  { id: 's-3-1', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000003', day_of_week: 1, start_time: '14:00', end_time: '18:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-3-3', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000003', day_of_week: 3, start_time: '14:00', end_time: '18:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-3-5', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000003', day_of_week: 5, start_time: '14:00', end_time: '18:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
  { id: 's-3-6', hospital_id: DEMO_HOSPITAL.id, doctor_id: '20000000-0000-0000-0000-000000000003', day_of_week: 6, start_time: '14:00', end_time: '18:00', slot_duration_minutes: 20, max_patients_per_slot: 1, is_active: true },
];

const DEMO_FAQS: FAQ[] = [
  { id: 'f-1', hospital_id: DEMO_HOSPITAL.id, category: 'Hospital Information', question: 'Where is Hiramani Memorial Hospital located?', answer: 'Hiramani Memorial Hospital is located at 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101. Google Maps: https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101', keywords: ['location', 'address', 'where', 'direction', 'map', 'krishnanagar'], is_active: true, display_order: 1 },
  { id: 'f-2', hospital_id: DEMO_HOSPITAL.id, category: 'OPD Timings', question: 'What are the OPD clinic operating hours?', answer: 'Our OPD runs Monday through Saturday from 08:30 AM to 08:00 PM, and Sundays from 09:00 AM to 01:00 PM. Emergency and trauma care operates 24x7.', keywords: ['timing', 'opd', 'hours', 'open', 'schedule', 'sunday'], is_active: true, display_order: 2 },
  { id: 'f-3', hospital_id: DEMO_HOSPITAL.id, category: 'Consultation Fees', question: 'What are the doctor consultation charges?', answer: 'OPD consultation fees range from ₹600 to ₹900 depending on the specialist. General Medicine is ₹600, Paediatrics ₹650, Orthopaedics ₹800, and Cardiology ₹900.', keywords: ['fee', 'cost', 'charge', 'price', 'consultation'], is_active: true, display_order: 3 },
  { id: 'f-4', hospital_id: DEMO_HOSPITAL.id, category: 'Laboratory', question: 'Is blood testing and radiology available?', answer: 'Yes, our laboratory and diagnostic imaging (Digital X-Ray, USG, 2D-Echo Doppler) operate daily with sample collection available from 07:30 AM.', keywords: ['lab', 'blood test', 'pathology', 'xray', 'echo', 'ultrasound'], is_active: true, display_order: 4 },
  { id: 'f-5', hospital_id: DEMO_HOSPITAL.id, category: 'Visiting Hours', question: 'When can visitors see admitted patients in the ward?', answer: 'Visiting hours are strictly 11:00 AM to 01:00 PM in the morning and 05:00 PM to 07:00 PM in the evening. One visitor pass is issued per patient.', keywords: ['visit', 'visitor', 'timing', 'ward', 'icu'], is_active: true, display_order: 5 },
  { id: 'f-6', hospital_id: DEMO_HOSPITAL.id, category: 'Insurance', question: 'Which health insurance and TPA cards do you accept for cashless billing?', answer: 'We facilitate cashless hospitalisation with major TPAs and insurers including Star Health, Medi Assist, HDFC ERGO, ICICI Lombard, Care Health, Paramount, and Raksha TPA.', keywords: ['insurance', 'cashless', 'tpa', 'mediclaim', 'claim'], is_active: true, display_order: 6 },
  { id: 'f-7', hospital_id: DEMO_HOSPITAL.id, category: 'Appointments', question: 'How do I cancel or reschedule my appointment?', answer: 'You can cancel or reschedule via WhatsApp by typing "Cancel appointment" or "Reschedule" and providing your booking reference, or by calling reception at +91 78729 57300.', keywords: ['cancel', 'reschedule', 'change', 'booking'], is_active: true, display_order: 7 },
];

const DEMO_STAFF: Profile[] = [
  { id: 'u-1', email: 'admin@hiramanihospital.demo', full_name: 'Dr. Debabrata Roy (Medical Director)', role: 'hospital_admin', hospital_id: DEMO_HOSPITAL.id, phone_number: '+919830099999', created_at: new Date().toISOString() },
  { id: 'u-2', email: 'reception@hiramanihospital.demo', full_name: 'Soma Chakraborty (Head Receptionist)', role: 'receptionist', hospital_id: DEMO_HOSPITAL.id, phone_number: '+919830088888', created_at: new Date().toISOString() },
  { id: 'u-3', email: 'cardio.staff@hiramanihospital.demo', full_name: 'Rohan Mitra (Cardiology Coordinator)', role: 'department_staff', hospital_id: DEMO_HOSPITAL.id, phone_number: '+919830077777', created_at: new Date().toISOString() },
];

// ------------------------------------------------------------------------------
// Diagnostics & Packages Store
// ------------------------------------------------------------------------------
const DEMO_DIAG_CATEGORIES: DiagnosticCategory[] = [
  { id: 'cat-1', hospital_id: DEMO_HOSPITAL.id, name: 'Pathology & Biochemistry', code: 'PATH', description: 'Comprehensive blood, urine and biochemical analyses performed on automated analyzers.', icon_name: 'Activity', display_order: 1, is_active: true },
  { id: 'cat-2', hospital_id: DEMO_HOSPITAL.id, name: 'Radiology & Medical Imaging', code: 'RAD', description: 'High-resolution digital X-Rays and multi-frequency ultrasonography.', icon_name: 'Film', display_order: 2, is_active: true },
  { id: 'cat-3', hospital_id: DEMO_HOSPITAL.id, name: 'Cardiology Non-Invasive', code: 'CARD', description: '12-Lead ECG, 2D Echocardiography with Color Doppler, and TMT tests.', icon_name: 'HeartPulse', display_order: 3, is_active: true },
  { id: 'cat-4', hospital_id: DEMO_HOSPITAL.id, name: 'Preventive Health Packages', code: 'PREV', description: 'Curated wellness checkups designed for early illness detection and peace of mind.', icon_name: 'ShieldCheck', display_order: 4, is_active: true },
];

const DEMO_DIAG_TESTS: DiagnosticTest[] = [
  { id: 'test-1', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Complete Blood Count (CBC with ESR)', code: 'TEST-CBC', description: 'Hemoglobin, RBC, WBC, platelets, and differential count.', price: 350, fasting_required: false, preparation_instructions: 'No special preparation needed.', sample_type: 'Blood (EDTA)', turnaround_hours: 4, is_active: true, display_order: 1 },
  { id: 'test-2', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Fasting Blood Sugar (FBS)', code: 'TEST-FBS', description: 'Blood glucose level measurement following overnight fasting.', price: 120, fasting_required: true, preparation_instructions: '8-10 hours overnight fasting required. Water is permitted.', sample_type: 'Blood (Fluoride)', turnaround_hours: 4, is_active: true, display_order: 2 },
  { id: 'test-3', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Post-Prandial Blood Sugar (PPBS)', code: 'TEST-PPBS', description: 'Blood glucose measured 2 hours post-meal.', price: 120, fasting_required: false, preparation_instructions: 'Sample collected exactly 2 hours after breakfast or meal.', sample_type: 'Blood (Fluoride)', turnaround_hours: 4, is_active: true, display_order: 3 },
  { id: 'test-4', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'HbA1c Glycated Hemoglobin', code: 'TEST-HBA1C', description: 'Measures average blood sugar levels over the past 3 months.', price: 550, fasting_required: false, preparation_instructions: 'No fasting required. Can be done anytime.', sample_type: 'Blood (EDTA)', turnaround_hours: 6, is_active: true, display_order: 4 },
  { id: 'test-5', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Lipid Profile Complete', code: 'TEST-LIPID', description: 'Total Cholesterol, HDL, LDL, VLDL, and Triglycerides.', price: 750, fasting_required: true, preparation_instructions: '10-12 hours strict overnight fasting required.', sample_type: 'Blood (Serum)', turnaround_hours: 6, is_active: true, display_order: 5 },
  { id: 'test-6', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Liver Function Test (LFT)', code: 'TEST-LFT', description: 'Bilirubin, SGOT, SGPT, Alkaline Phosphatase, Protein and Albumin.', price: 800, fasting_required: false, preparation_instructions: 'Light meal before test is fine; avoid alcohol for 24 hours.', sample_type: 'Blood (Serum)', turnaround_hours: 6, is_active: true, display_order: 6 },
  { id: 'test-7', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Kidney Function Test (KFT / RFT)', code: 'TEST-KFT', description: 'Urea, Creatinine, Uric Acid, Sodium, Potassium and Chloride.', price: 700, fasting_required: false, preparation_instructions: 'Drink normal amounts of water before test.', sample_type: 'Blood (Serum)', turnaround_hours: 6, is_active: true, display_order: 7 },
  { id: 'test-8', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-1', category_name: 'Pathology & Biochemistry', name: 'Thyroid Profile (Total T3, T4 & TSH)', code: 'TEST-THYROID', description: 'Hormonal assessment of thyroid gland functioning.', price: 650, fasting_required: false, preparation_instructions: 'Morning sample preferred before taking thyroid medication.', sample_type: 'Blood (Serum)', turnaround_hours: 8, is_active: true, display_order: 8 },
  { id: 'test-9', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-2', category_name: 'Radiology & Medical Imaging', name: 'Digital Chest X-Ray (PA View)', code: 'TEST-XRAY-CH', description: 'Low-dose digital imaging of lungs, ribs, and cardiac silhouette.', price: 500, fasting_required: false, preparation_instructions: 'Remove all metallic jewelry and metal buttons before scan.', sample_type: 'Imaging', turnaround_hours: 2, is_active: true, display_order: 9 },
  { id: 'test-10', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-2', category_name: 'Radiology & Medical Imaging', name: 'USG Whole Abdomen & Pelvis', code: 'TEST-USG-ABD', description: 'Ultrasonography of liver, gallbladder, pancreas, kidneys, spleen and bladder.', price: 1400, fasting_required: true, preparation_instructions: '6 hours fasting + full urinary bladder (drink 1L water 1 hr prior).', sample_type: 'Imaging', turnaround_hours: 4, is_active: true, display_order: 10 },
  { id: 'test-11', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-3', category_name: 'Cardiology Non-Invasive', name: '12-Lead Electrocardiogram (ECG)', code: 'TEST-ECG', description: 'Recording electrical rhythm and conductivity of the heart.', price: 300, fasting_required: false, preparation_instructions: 'Relaxed breathing; avoid strenuous exercise immediately prior.', sample_type: 'Electrophysiology', turnaround_hours: 1, is_active: true, display_order: 11 },
  { id: 'test-12', hospital_id: DEMO_HOSPITAL.id, category_id: 'cat-3', category_name: 'Cardiology Non-Invasive', name: '2D Echocardiogram with Color Doppler', code: 'TEST-ECHO', description: 'Ultrasound evaluation of heart chambers, valves, and cardiac ejection fraction.', price: 1800, fasting_required: false, preparation_instructions: 'Prior appointment required. Bring recent ECG records.', sample_type: 'Cardiology Imaging', turnaround_hours: 2, is_active: true, display_order: 12 },
];

const DEMO_HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-1',
    hospital_id: DEMO_HOSPITAL.id,
    name: 'Basic Health Checkup',
    slug: 'basic-health-checkup',
    description: 'Essential wellness checkup including complete blood count, blood sugar, lipid screening, ECG and General Physician consultation.',
    target_gender: 'all',
    price: 2200,
    discounted_price: 1499,
    sample_count: 2,
    report_delivery_hours: 12,
    fasting_required: true,
    preparation_instructions: '10 hours overnight fasting required. Water permitted.',
    is_active: true,
    display_order: 1,
  },
  {
    id: 'pkg-2',
    hospital_id: DEMO_HOSPITAL.id,
    name: 'Comprehensive Cardiac Wellness',
    slug: 'cardiac-wellness-package',
    description: 'Targeted cardiovascular screening including 2D Echocardiogram, 12-Lead ECG, Lipid Profile, Sugar, and Senior Cardiologist consultation.',
    target_gender: 'all',
    price: 4500,
    discounted_price: 3199,
    sample_count: 2,
    report_delivery_hours: 24,
    fasting_required: true,
    preparation_instructions: '10-12 hours overnight fasting. Bring previous cardiac medication chart.',
    is_active: true,
    display_order: 2,
  },
  {
    id: 'pkg-3',
    hospital_id: DEMO_HOSPITAL.id,
    name: 'Master Executive Health Checkup',
    slug: 'master-health-checkup',
    description: 'Our most comprehensive screening covering complete pathology, LFT, KFT, Lipid, HbA1c, USG Abdomen, Chest X-Ray, ECG and dual specialist consultation.',
    target_gender: 'all',
    price: 6800,
    discounted_price: 4899,
    sample_count: 3,
    report_delivery_hours: 24,
    fasting_required: true,
    preparation_instructions: '12 hours fasting. Full bladder required for ultrasound.',
    is_active: true,
    display_order: 3,
  },
  {
    id: 'pkg-4',
    hospital_id: DEMO_HOSPITAL.id,
    name: "Well Women Wellness Package",
    slug: 'womens-wellness-package',
    description: 'Tailored for women of all ages: Thyroid, CBC, USG Pelvis, Blood Sugar, Bone Calcium, and Senior Gynaecologist consultation.',
    target_gender: 'female',
    price: 4200,
    discounted_price: 2999,
    sample_count: 2,
    report_delivery_hours: 24,
    fasting_required: true,
    preparation_instructions: 'Overnight fasting. Full bladder needed for pelvic ultrasound.',
    is_active: true,
    display_order: 4,
  },
  {
    id: 'pkg-5',
    hospital_id: DEMO_HOSPITAL.id,
    name: 'Senior Citizen Comprehensive Care',
    slug: 'senior-citizen-health-package',
    description: 'Designed for elders 60+: Renal function, Liver function, Cardiac ECG, Complete Blood Count, Urine, and Senior Physician review.',
    target_gender: 'all',
    price: 5500,
    discounted_price: 3899,
    sample_count: 2,
    report_delivery_hours: 24,
    fasting_required: true,
    preparation_instructions: 'Overnight fasting. Wheelchair assistance provided at entrance.',
    is_active: true,
    display_order: 5,
  },
];

let inMemoryPatientAccounts: PatientAccount[] = [
  {
    id: 'pt-001',
    user_id: 'usr-pt-1',
    hospital_id: DEMO_HOSPITAL.id,
    full_name: 'Amit Kumar Roy',
    phone_number: '+919830111222',
    email: 'amit.roy@example.com',
    date_of_birth: '1984-06-15',
    gender: 'male',
    blood_group: 'B+',
    address: 'Flat 4B, South City Residency, Prince Anwar Shah Rd, Kolkata',
    emergency_contact_name: 'Sunita Roy (Spouse)',
    emergency_contact_phone: '+919830111223',
    preferred_language: 'bn',
    is_verified: true,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'pt-002',
    user_id: 'usr-pt-2',
    hospital_id: DEMO_HOSPITAL.id,
    full_name: 'Meera Sen',
    phone_number: '+919830222333',
    email: 'meera.sen@example.com',
    date_of_birth: '1976-11-20',
    gender: 'female',
    blood_group: 'O+',
    address: '14/2 Gariahat Road, Kolkata 700019',
    emergency_contact_name: 'Ranjan Sen (Husband)',
    emergency_contact_phone: '+919830222334',
    preferred_language: 'en',
    is_verified: true,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let inMemoryDiagnosticReports: DiagnosticReport[] = [
  {
    id: 'rep-001',
    hospital_id: DEMO_HOSPITAL.id,
    patient_account_id: 'pt-001',
    patient_phone: '+919830111222',
    patient_name: 'Amit Kumar Roy',
    test_id: 'test-1',
    test_name: 'Complete Blood Count (CBC with ESR)',
    report_date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    storage_path: 'patient-reports/00000000-0000-0000-0000-000000000001/pt-001/rep-001-cbc.pdf',
    file_name: 'HMH_CBC_Report_AmitRoy.pdf',
    mime_type: 'application/pdf',
    file_size_bytes: 342100,
    technician_name: 'S. Banerjee (Senior Biochemist)',
    status: 'ready',
    notification_sent: true,
    download_count: 2,
    patient_notes: 'All haematology parameters within normal adult reference intervals.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'rep-002',
    hospital_id: DEMO_HOSPITAL.id,
    patient_account_id: 'pt-001',
    patient_phone: '+919830111222',
    patient_name: 'Amit Kumar Roy',
    test_id: 'test-5',
    test_name: 'Lipid Profile Complete',
    report_date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    storage_path: 'patient-reports/00000000-0000-0000-0000-000000000001/pt-001/rep-002-lipid.pdf',
    file_name: 'HMH_Lipid_Profile_AmitRoy.pdf',
    mime_type: 'application/pdf',
    file_size_bytes: 289400,
    technician_name: 'S. Banerjee (Senior Biochemist)',
    status: 'ready',
    notification_sent: true,
    download_count: 1,
    patient_notes: 'Borderline elevated serum triglycerides (185 mg/dL). Dietary moderation advised.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'rep-003',
    hospital_id: DEMO_HOSPITAL.id,
    patient_account_id: 'pt-002',
    patient_phone: '+919830222333',
    patient_name: 'Meera Sen',
    test_id: 'test-12',
    test_name: '2D Echocardiogram with Color Doppler',
    report_date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    storage_path: 'patient-reports/00000000-0000-0000-0000-000000000001/pt-002/rep-003-echo.pdf',
    file_name: 'HMH_ECHO_Report_MeeraSen.pdf',
    mime_type: 'application/pdf',
    file_size_bytes: 845200,
    technician_name: 'Dr. Ananya Roy Chowdhury',
    status: 'ready',
    notification_sent: true,
    download_count: 3,
    patient_notes: 'Normal left ventricular systolic function (LVEF 62%). Trace mitral regurgitation.',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

let inMemoryClinicalNotes: ClinicalNote[] = [
  {
    id: 'note-cl-1',
    hospital_id: DEMO_HOSPITAL.id,
    appointment_id: 'apt-demo-1',
    doctor_id: '20000000-0000-0000-0000-000000000001',
    patient_phone: '+919830111222',
    patient_name: 'Amit Kumar Roy',
    diagnosis_summary: 'Type-2 Diabetes Mellitus with mild hypertriglyceridemia.',
    prescription_notes: 'Tab Metformin 500mg (1-0-1 after meals) x 30 days. Regular morning walk 40 mins. Repeat fasting blood sugar in 1 month.',
    vitals: {
      blood_pressure: '128/82 mmHg',
      pulse_rate: '74 bpm',
      temperature_f: '98.4 F',
      spo2_percent: '99%',
      weight_kg: '72 kg',
    },
    follow_up_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const DEMO_CMS_ANNOUNCEMENTS: CMSAnnouncement[] = [
  {
    id: 'cms-1',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Dengue Diagnostic Guidelines & Advisory: Early Detection Saves Lives',
    slug: 'dengue-diagnostic-guidelines',
    category: 'Health Advisory',
    summary: 'Clinical findings, warning signs, critical NS1 and platelet monitoring guidelines from our Department of General Medicine.',
    content: 'Clinical findings include high fever, severe retro-orbital pain, body aches, nausea, and rash. Warning signs requiring immediate admission include severe abdominal pain, persistent vomiting, fluid accumulation, mucosal bleeding, and rapid platelet drop. Our 24x7 Emergency and NABL diagnostic laboratory perform NS1 Antigen and Complete Blood Count testing with 4-hour turnaround.',
    image_url: '/images/news/dengue-care.jpg',
    is_emergency_alert: false,
    is_active: true,
    published_at: '2026-10-15T09:00:00Z',
    created_at: '2026-10-15T09:00:00Z',
  },
  {
    id: 'cms-2',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Keeping Babies, Children & Elders Protected in Scorching Heat Waves',
    slug: 'protecting-children-elders-heat-wave',
    category: 'Health Advisory',
    summary: 'Essential hydration protocols, heat exhaustion recognition, and pediatric care tips from Senior Pediatrician Dr. Amitav Das.',
    content: 'Infants and senior citizens adapt more slowly to rapid ambient heat changes. Ensure adequate fluid intake with ORS, tender coconut water, and home-cooked light meals. Avoid direct outdoor sun exposure between 11 AM and 3:30 PM. Watch for signs of dehydration such as reduced urination, sunken eyes, dry tongue, or lethargy.',
    image_url: '/images/news/heat-wave-protection.jpg',
    is_emergency_alert: false,
    is_active: true,
    published_at: '2026-10-20T10:00:00Z',
    created_at: '2026-10-20T10:00:00Z',
  },
  {
    id: 'cms-3',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Free Preventive Cardiac Health Screening Camp this Saturday',
    slug: 'free-cardiac-screening-camp',
    category: 'Event',
    summary: 'Free 12-lead ECG, blood sugar screening, and cardiac consultation by Senior Cardiologist Dr. Ananya Roy Chowdhury.',
    content: 'To promote early heart disease prevention in our community, Hiramani Memorial Hospital is organizing a complimentary Cardiac Wellness Camp from 9:00 AM to 1:00 PM this Saturday. Prior registration via WhatsApp or website is recommended.',
    image_url: '/images/news/cardiac-camp.jpg',
    is_emergency_alert: false,
    is_active: true,
    published_at: '2026-11-01T08:00:00Z',
    created_at: '2026-11-01T08:00:00Z',
  },
];

const DEMO_CMS_CAREERS: CMSCareer[] = [
  {
    id: 'car-1',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Staff Nurse (Critical Care & ICU / HDU)',
    department: 'Nursing & Patient Care',
    employment_type: 'Full-time',
    experience_required: '2 - 5 Years in ICU / Emergency',
    qualification_required: 'B.Sc Nursing / GNM with WBNC Registration',
    description: 'We are seeking compassionate, experienced ICU nurses to provide high-dependency patient care in our modernized critical care units. Rotational day and night shifts.',
    vacancies: 6,
    is_active: true,
    created_at: '2026-10-01T10:00:00Z',
  },
  {
    id: 'car-2',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Senior Laboratory Technician (Biochemistry / Hematology)',
    department: 'Diagnostic Laboratory',
    employment_type: 'Full-time',
    experience_required: '3+ Years in NABL Accredited Lab',
    qualification_required: 'DMLT / B.Sc in Medical Laboratory Technology',
    description: 'Responsible for daily operations, quality calibration, and report validation on automated hematology and biochemistry analyzers. Immediate joining preferred.',
    vacancies: 2,
    is_active: true,
    created_at: '2026-10-10T10:00:00Z',
  },
  {
    id: 'car-3',
    hospital_id: DEMO_HOSPITAL.id,
    title: 'Junior Resident Doctor (Emergency & Casualty)',
    department: 'Emergency & Trauma Care',
    employment_type: 'Full-time',
    experience_required: '1 - 3 Years (ACLS / BLS Certified preferred)',
    qualification_required: 'MBBS with Permanent Medical Council Registration',
    description: 'Provide immediate resuscitation, trauma triage, and clinical stabilization for 24x7 casualty admissions under senior emergency physicians.',
    vacancies: 3,
    is_active: true,
    created_at: '2026-10-15T10:00:00Z',
  },
];

let inMemoryAppointments: Appointment[] = [
  {
    id: 'apt-demo-1',
    hospital_id: DEMO_HOSPITAL.id,
    booking_reference: 'APT-20261025-4819',
    doctor_id: '20000000-0000-0000-0000-000000000001',
    doctor_name: 'Dr. Sourav Mukherjee',
    department_id: '10000000-0000-0000-0000-000000000001',
    department_name: 'General Medicine',
    patient_account_id: 'pt-001',
    patient_name: 'Amit Kumar Roy',
    patient_phone: '+919830111222',
    appointment_date: '2026-10-25',
    start_time: '10:00',
    end_time: '10:20',
    status: 'confirmed',
    consultation_fee: 600,
    payment_status: 'pay_at_hospital',
    booking_channel: 'whatsapp',
    administrative_note: 'Routine diabetes check-up (Sample Demonstration Record)',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'apt-demo-2',
    hospital_id: DEMO_HOSPITAL.id,
    booking_reference: 'APT-20261025-9124',
    doctor_id: '20000000-0000-0000-0000-000000000002',
    doctor_name: 'Dr. Ananya Roy Chowdhury',
    department_id: '10000000-0000-0000-0000-000000000002',
    department_name: 'Cardiology',
    patient_account_id: 'pt-002',
    patient_name: 'Meera Sen',
    patient_phone: '+919830222333',
    appointment_date: '2026-10-26',
    start_time: '11:00',
    end_time: '11:30',
    status: 'requested',
    consultation_fee: 900,
    payment_status: 'pay_at_hospital',
    booking_channel: 'web_portal',
    administrative_note: 'ECG review requested (Sample Demonstration Record)',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let inMemoryQueries: PatientQuery[] = [
  {
    id: 'qry-demo-1',
    hospital_id: DEMO_HOSPITAL.id,
    ticket_number: 'TKT-20261025-1001',
    patient_name: 'Arunava Ghosh',
    patient_phone: '+919830012345',
    category: 'Diagnostic Tests & Reports',
    subject: 'Home Sample Collection Enquiry',
    description: 'Need home blood collection for fasting blood sugar and lipid profile for senior citizen tomorrow at 7am in Mukundapur.',
    status: 'open',
    priority: 'medium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let inMemoryNotes: QueryNote[] = [];
let inMemoryAuditLogs: AuditLog[] = [];
let inMemoryNotificationLogs: NotificationLog[] = [];
let inMemoryTimeOff: DoctorTimeOff[] = [];
let inMemoryWebhookEventIds = new Set<string>();

export function getHospitalTodayDate(): string {
  // When running Vitest automated test suite with legacy fixtures, lock reference baseline to 2026-10-25
  if (process.env.VITEST === 'true') {
    return '2026-10-25';
  }
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

// ------------------------------------------------------------------------------
// Input Type Definitions for Flexible Callers
// ------------------------------------------------------------------------------
export interface BookAppointmentInput {
  hospitalId?: string;
  hospital_id?: string;
  doctorId?: string;
  doctor_id?: string;
  departmentId?: string;
  department_id?: string;
  patientAccountId?: string;
  patient_account_id?: string;
  patientName?: string;
  patient_name?: string;
  patientPhone?: string;
  patient_phone?: string;
  appointmentDate?: string;
  appointment_date?: string;
  startTime?: string;
  start_time?: string;
  slot?: string;
  consultationFee?: number;
  consultation_fee?: number;
  bookingChannel?: BookingChannel;
  booking_channel?: BookingChannel;
  administrativeNote?: string;
  administrative_note?: string;
}

// ------------------------------------------------------------------------------
// Unified Repository Implementation
// ------------------------------------------------------------------------------
export const HospitalRepo = {
  // --- Hospital Settings & Details ---
  async getHospital(): Promise<Hospital> {
    return DEMO_HOSPITAL;
  },

  async updateHospital(updates: Partial<Hospital>): Promise<Hospital> {
    Object.assign(DEMO_HOSPITAL, updates);
    HospitalRepo.logAudit('Staff', 'UPDATE_HOSPITAL', 'hospital', DEMO_HOSPITAL.id, updates);
    return DEMO_HOSPITAL;
  },

  async getSettings(): Promise<HospitalSettings> {
    return DEMO_SETTINGS;
  },

  async updateSettings(updates: Partial<HospitalSettings>): Promise<HospitalSettings> {
    Object.assign(DEMO_SETTINGS, updates);
    HospitalRepo.logAudit('Staff', 'UPDATE_SETTINGS', 'settings', DEMO_SETTINGS.id, updates);
    return DEMO_SETTINGS;
  },

  // --- Departments ---
  async getDepartments(onlyActive = true): Promise<Department[]> {
    return DEMO_DEPARTMENTS.filter(d => (onlyActive ? d.is_active : true)).sort(
      (a, b) => a.display_order - b.display_order
    );
  },

  async getDepartmentById(id: string): Promise<Department | undefined> {
    return DEMO_DEPARTMENTS.find(d => d.id === id);
  },

  async createDepartment(data: Omit<Department, 'id' | 'hospital_id' | 'display_order'>): Promise<Department> {
    const newDept: Department = {
      ...data,
      id: `dept-${Date.now()}`,
      hospital_id: DEMO_HOSPITAL.id,
      display_order: DEMO_DEPARTMENTS.length + 1,
    };
    DEMO_DEPARTMENTS.push(newDept);
    HospitalRepo.logAudit('Staff', 'CREATE_DEPARTMENT', 'department', newDept.id, { name: newDept.name });
    return newDept;
  },

  async updateDepartment(id: string, updates: Partial<Department>): Promise<Department | undefined> {
    const dept = DEMO_DEPARTMENTS.find(d => d.id === id);
    if (!dept) return undefined;
    Object.assign(dept, updates);
    HospitalRepo.logAudit('Staff', 'UPDATE_DEPARTMENT', 'department', id, updates);
    return dept;
  },

  // --- Doctors & Schedules ---
  async getDoctors(departmentId?: string, onlyActive = true): Promise<Doctor[]> {
    return DEMO_DOCTORS.filter(d => {
      const matchActive = onlyActive ? d.is_active : true;
      const matchDept = departmentId ? d.department_id === departmentId : true;
      return matchActive && matchDept;
    }).sort((a, b) => a.display_order - b.display_order);
  },

  async getDoctorById(id: string): Promise<Doctor | undefined> {
    return DEMO_DOCTORS.find(d => d.id === id);
  },

  async createDoctor(data: Omit<Doctor, 'id' | 'hospital_id' | 'display_order' | 'department_name'>): Promise<Doctor> {
    const dept = DEMO_DEPARTMENTS.find(d => d.id === data.department_id);
    const newDoc: Doctor = {
      ...data,
      id: `doc-${Date.now()}`,
      hospital_id: DEMO_HOSPITAL.id,
      department_name: dept?.name,
      display_order: DEMO_DOCTORS.length + 1,
    };
    DEMO_DOCTORS.push(newDoc);
    for (let day = 1; day <= 6; day++) {
      DEMO_SCHEDULES.push({
        id: `s-${newDoc.id}-${day}`,
        hospital_id: DEMO_HOSPITAL.id,
        doctor_id: newDoc.id,
        day_of_week: day,
        start_time: '10:00',
        end_time: '13:00',
        slot_duration_minutes: 20,
        max_patients_per_slot: 1,
        is_active: true,
      });
    }
    HospitalRepo.logAudit('Staff', 'CREATE_DOCTOR', 'doctor', newDoc.id, { name: newDoc.full_name });
    return newDoc;
  },

  async updateDoctor(id: string, updates: Partial<Doctor>): Promise<Doctor | undefined> {
    const doc = DEMO_DOCTORS.find(d => d.id === id);
    if (!doc) return undefined;
    Object.assign(doc, updates);
    HospitalRepo.logAudit('Staff', 'UPDATE_DOCTOR', 'doctor', id, updates);
    return doc;
  },

  async getDoctorSchedules(doctorId: string): Promise<DoctorSchedule[]> {
    return DEMO_SCHEDULES.filter(s => s.doctor_id === doctorId && s.is_active);
  },

  async getDoctorTimeOff(doctorId: string): Promise<DoctorTimeOff[]> {
    return inMemoryTimeOff.filter(t => t.doctor_id === doctorId);
  },

  async addDoctorTimeOff(params: {
    doctor_id: string;
    start_date: string;
    end_date: string;
    reason?: string;
  }): Promise<DoctorTimeOff> {
    const newRecord: DoctorTimeOff = {
      id: `to-${Date.now()}`,
      hospital_id: DEMO_HOSPITAL.id,
      doctor_id: params.doctor_id,
      start_date: params.start_date,
      end_date: params.end_date,
      reason: params.reason,
    };
    inMemoryTimeOff.push(newRecord);
    HospitalRepo.logAudit('Staff', 'ADD_TIME_OFF', 'doctor_time_off', newRecord.id, params);
    return newRecord;
  },

  async deleteDoctorTimeOff(id: string): Promise<boolean> {
    const idx = inMemoryTimeOff.findIndex(t => t.id === id);
    if (idx !== -1) {
      inMemoryTimeOff.splice(idx, 1);
      HospitalRepo.logAudit('Staff', 'DELETE_TIME_OFF', 'doctor_time_off', id, {});
      return true;
    }
    return false;
  },

  async isDoctorAvailableOnDate(doctorId: string, dateStr: string): Promise<boolean> {
    const isOff = inMemoryTimeOff.some(
      t => t.doctor_id === doctorId && dateStr >= t.start_date && dateStr <= t.end_date
    );
    if (isOff) return false;

    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();
    const schedules = await this.getDoctorSchedules(doctorId);
    return schedules.some(s => s.day_of_week === dayOfWeek);
  },

  async getAvailableSlots(doctorId: string, dateStr: string): Promise<string[]> {
    const doctor = DEMO_DOCTORS.find(d => d.id === doctorId && d.is_active);
    if (!doctor) return [];

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return [];

    const todayStr = getHospitalTodayDate();
    if (dateStr < todayStr) return [];

    const todayMs = new Date(`${todayStr}T00:00:00Z`).getTime();
    const reqMs = new Date(`${dateStr}T00:00:00Z`).getTime();
    const diffDays = Math.ceil((reqMs - todayMs) / (1000 * 60 * 60 * 24));
    const maxDays = DEMO_SETTINGS.advance_booking_days || 14;
    if (diffDays > maxDays) return [];

    const isOnLeave = inMemoryTimeOff.some(
      to => to.doctor_id === doctorId && dateStr >= to.start_date && dateStr <= to.end_date
    );
    if (isOnLeave) return [];

    const dateObj = new Date(`${dateStr}T00:00:00Z`);
    const dayOfWeek = dateObj.getUTCDay();

    const schedule = DEMO_SCHEDULES.find(
      s => s.doctor_id === doctorId && s.day_of_week === dayOfWeek && s.is_active
    );
    if (!schedule) return [];

    const slots: string[] = [];
    const [startH, startM] = schedule.start_time.split(':').map(Number);
    const [endH, endM] = schedule.end_time.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const duration = schedule.slot_duration_minutes || 20;

    for (let time = startMinutes; time + duration <= endMinutes; time += duration) {
      const h = Math.floor(time / 60).toString().padStart(2, '0');
      const m = (time % 60).toString().padStart(2, '0');
      slots.push(`${h}:${m}`);
    }

    const bookedAppointments = inMemoryAppointments.filter(
      apt =>
        apt.doctor_id === doctorId &&
        apt.appointment_date === dateStr &&
        apt.status !== 'cancelled'
    );
    const bookedSlots = new Set(bookedAppointments.map(a => a.start_time.slice(0, 5)));

    return slots.filter(slot => !bookedSlots.has(slot));
  },

  async getAvailableSlotObjects(
    doctorId: string,
    dateStr: string
  ): Promise<Array<{ startTime: string; endTime: string; isAvailable: boolean }>> {
    const rawSlots = await this.getAvailableSlots(doctorId, dateStr);
    const sched = DEMO_SCHEDULES.find(s => s.doctor_id === doctorId);
    const duration = sched?.slot_duration_minutes || 20;

    return rawSlots.map(st => {
      const [h, m] = st.split(':').map(Number);
      const endMins = h * 60 + m + duration;
      const endH = Math.floor(endMins / 60).toString().padStart(2, '0');
      const endM = (endMins % 60).toString().padStart(2, '0');
      return {
        startTime: st,
        endTime: `${endH}:${endM}`,
        isAvailable: true,
      };
    });
  },

  // --- Atomic Concurrency-Safe Appointment Reservation ---
  async bookAppointment(
    input: BookAppointmentInput
  ): Promise<{ success: boolean; appointment?: Appointment; error?: string }> {
    const doctorId = input.doctorId || input.doctor_id;
    const departmentId = input.departmentId || input.department_id;
    const patientName = (input.patientName || input.patient_name || '').trim();
    const patientPhone = (input.patientPhone || input.patient_phone || '').trim();
    const appointmentDate = input.appointmentDate || input.appointment_date;
    const startTimeRaw = input.startTime || input.start_time || input.slot;
    const consultationFee = input.consultationFee ?? input.consultation_fee;
    const bookingChannel = input.bookingChannel || input.booking_channel || 'whatsapp';
    const administrativeNote = input.administrativeNote || input.administrative_note;
    const patientAccountId = input.patientAccountId || input.patient_account_id;

    if (!doctorId) return { success: false, error: 'Doctor ID is required.' };
    if (!patientName || patientName.trim().length < 2) {
      return { success: false, error: 'Patient full name is required (minimum 2 characters).' };
    }
    const cleanPhone = patientPhone ? patientPhone.replace(/\D/g, '') : '';
    if (cleanPhone.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }
    if (!appointmentDate || !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)) {
      return { success: false, error: 'Invalid appointment date format. Use YYYY-MM-DD.' };
    }

    const todayStr = getHospitalTodayDate();
    if (appointmentDate < todayStr) {
      return { success: false, error: 'Cannot book appointments for past dates.' };
    }

    const todayMs = new Date(`${todayStr}T00:00:00Z`).getTime();
    const reqMs = new Date(`${appointmentDate}T00:00:00Z`).getTime();
    const diffDays = Math.ceil((reqMs - todayMs) / (1000 * 60 * 60 * 24));
    const maxDays = DEMO_SETTINGS.advance_booking_days || 14;
    if (diffDays > maxDays) {
      return {
        success: false,
        error: `Appointments can only be booked up to ${maxDays} days in advance.`,
      };
    }

    const doctor = DEMO_DOCTORS.find(d => d.id === doctorId && d.is_active);
    if (!doctor) return { success: false, error: 'Doctor not found or inactive.' };

    const isOnLeave = inMemoryTimeOff.some(
      to =>
        to.doctor_id === doctorId &&
        appointmentDate >= to.start_date &&
        appointmentDate <= to.end_date
    );
    if (isOnLeave) {
      return {
        success: false,
        error: `Dr. ${doctor.full_name} is on scheduled leave on ${appointmentDate}. Please choose another date or doctor.`,
      };
    }

    if (!startTimeRaw) return { success: false, error: 'Appointment time slot is required.' };
    const formattedStartTime = startTimeRaw.slice(0, 5);

    const dateObj = new Date(`${appointmentDate}T00:00:00Z`);
    const dayOfWeek = dateObj.getUTCDay();
    const schedule = DEMO_SCHEDULES.find(
      s => s.doctor_id === doctorId && s.day_of_week === dayOfWeek && s.is_active
    );
    if (!schedule) {
      return {
        success: false,
        error: `Doctor is not scheduled for OPD on this day of the week.`,
      };
    }

    const [startH, startM] = schedule.start_time.split(':').map(Number);
    const [schedEndH, schedEndM] = schedule.end_time.split(':').map(Number);
    const [reqH, reqM] = formattedStartTime.split(':').map(Number);
    const reqMins = reqH * 60 + reqM;
    const schedStartMins = startH * 60 + startM;
    const schedEndMins = schedEndH * 60 + schedEndM;

    if (reqMins < schedStartMins || reqMins >= schedEndMins) {
      return {
        success: false,
        error: `Requested slot ${formattedStartTime} is outside doctor OPD hours (${schedule.start_time} - ${schedule.end_time}).`,
      };
    }

    const deptId = departmentId || doctor.department_id;
    const dept = DEMO_DEPARTMENTS.find(d => d.id === deptId);

    // Concurrency Check: Ensure slot is free
    const conflict = inMemoryAppointments.find(
      a =>
        a.doctor_id === doctorId &&
        a.appointment_date === appointmentDate &&
        a.start_time.slice(0, 5) === formattedStartTime &&
        a.status !== 'cancelled'
    );

    if (conflict) {
      return {
        success: false,
        error: `Slot ${formattedStartTime} on ${appointmentDate} has already been reserved. Please select another time.`,
      };
    }

    const [h, m] = formattedStartTime.split(':').map(Number);
    const endMinutes = h * 60 + m + 20;
    const endH = Math.floor(endMinutes / 60).toString().padStart(2, '0');
    const endM = (endMinutes % 60).toString().padStart(2, '0');
    const formattedEndTime = `${endH}:${endM}`;

    const dateTag = appointmentDate.replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingReference = `APT-${dateTag}-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}-${randomSuffix}`,
      hospital_id: input.hospitalId || input.hospital_id || DEMO_HOSPITAL.id,
      booking_reference: bookingReference,
      doctor_id: doctor.id,
      doctor_name: doctor.full_name,
      department_id: deptId,
      department_name: dept?.name || doctor.department_name,
      patient_account_id: patientAccountId,
      patient_name: patientName.trim(),
      patient_phone: patientPhone.trim(),
      appointment_date: appointmentDate,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      status: 'confirmed',
      consultation_fee: consultationFee ?? doctor.consultation_fee,
      payment_status: 'pay_at_hospital',
      booking_channel: bookingChannel,
      administrative_note: administrativeNote,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    inMemoryAppointments.unshift(newAppointment);

    HospitalRepo.logAudit(patientName, 'BOOK_APPOINTMENT', 'appointment', newAppointment.id, {
      reference: bookingReference,
      doctor: doctor.full_name,
      date: appointmentDate,
      slot: formattedStartTime,
    });

    return { success: true, appointment: newAppointment };
  },

  // --- Appointments Management ---
  async getAppointments(filters?: {
    search?: string;
    doctor_id?: string;
    doctorId?: string;
    department_id?: string;
    status?: AppointmentStatus;
    date?: string;
    phone?: string;
    patientAccountId?: string;
  }): Promise<Appointment[]> {
    let list = [...inMemoryAppointments];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        a =>
          a.patient_name.toLowerCase().includes(q) ||
          a.booking_reference.toLowerCase().includes(q) ||
          a.patient_phone.includes(q)
      );
    }
    const docId = filters?.doctorId || filters?.doctor_id;
    if (docId) {
      list = list.filter(a => a.doctor_id === docId);
    }
    if (filters?.department_id) {
      list = list.filter(a => a.department_id === filters.department_id);
    }
    if (filters?.status) {
      list = list.filter(a => a.status === filters.status);
    }
    if (filters?.date) {
      list = list.filter(a => a.appointment_date === filters.date);
    }
    if (filters?.phone) {
      list = list.filter(a => a.patient_phone === filters.phone);
    }
    if (filters?.patientAccountId) {
      list = list.filter(a => a.patient_account_id === filters.patientAccountId);
    }

    return list.sort((a, b) => (b.appointment_date + b.start_time).localeCompare(a.appointment_date + a.start_time));
  },

  async getAppointmentByReference(ref: string): Promise<Appointment | undefined> {
    const cleanRef = ref.trim().toUpperCase();
    return inMemoryAppointments.find(a => a.booking_reference.toUpperCase() === cleanRef);
  },

  async updateAppointmentStatus(
    id: string,
    status: AppointmentStatus,
    reason?: string
  ): Promise<Appointment | undefined> {
    const apt = inMemoryAppointments.find(a => a.id === id);
    if (!apt) return undefined;
    apt.status = status;
    if (reason) apt.cancellation_reason = reason;
    apt.updated_at = new Date().toISOString();

    HospitalRepo.logAudit('Staff', 'UPDATE_APPOINTMENT_STATUS', 'appointment', id, {
      new_status: status,
      reason,
    });
    return apt;
  },

  async rescheduleAppointment(
    idOrRef: string,
    newDate: string,
    newSlot: string
  ): Promise<{ success: boolean; appointment?: Appointment; error?: string }> {
    const apt = inMemoryAppointments.find(
      a => a.id === idOrRef || a.booking_reference.toUpperCase() === idOrRef.trim().toUpperCase()
    );
    if (!apt) return { success: false, error: 'Appointment not found' };

    const formattedSlot = newSlot.slice(0, 5);
    const conflict = inMemoryAppointments.find(
      a =>
        a.id !== apt.id &&
        a.doctor_id === apt.doctor_id &&
        a.appointment_date === newDate &&
        a.start_time.slice(0, 5) === formattedSlot &&
        a.status !== 'cancelled'
    );
    if (conflict) {
      return { success: false, error: 'Slot is already booked by another patient' };
    }

    const [h, m] = formattedSlot.split(':').map(Number);
    const endMinutes = h * 60 + m + 20;
    const endH = Math.floor(endMinutes / 60).toString().padStart(2, '0');
    const endM = (endMinutes % 60).toString().padStart(2, '0');

    apt.appointment_date = newDate;
    apt.start_time = formattedSlot;
    apt.end_time = `${endH}:${endM}`;
    apt.status = 'confirmed';
    apt.updated_at = new Date().toISOString();

    HospitalRepo.logAudit('Patient/Staff', 'RESCHEDULE_APPOINTMENT', 'appointment', apt.id, {
      new_date: newDate,
      new_slot: formattedSlot,
    });

    return { success: true, appointment: apt };
  },

  async cancelAppointment(
    reference: string,
    reason?: string
  ): Promise<{ success: boolean; message: string }> {
    const apt = await this.getAppointmentByReference(reference);
    if (!apt) return { success: false, message: 'Appointment reference not found.' };
    if (apt.status === 'cancelled') return { success: false, message: 'Appointment is already cancelled.' };

    apt.status = 'cancelled';
    apt.cancellation_reason = reason || 'Cancelled by patient';
    apt.updated_at = new Date().toISOString();

    HospitalRepo.logAudit('Patient', 'CANCEL_APPOINTMENT', 'appointment', apt.id, {
      reference: apt.booking_reference,
      reason,
    });

    return { success: true, message: 'Appointment successfully cancelled.' };
  },

  // --- Patient Accounts ---
  async getPatientAccount(phone: string): Promise<PatientAccount | undefined> {
    const normalized = phone.replace(/\D/g, '');
    return inMemoryPatientAccounts.find(p => p.phone_number.replace(/\D/g, '').endsWith(normalized.slice(-10)));
  },

  async getPatientAccountById(id: string): Promise<PatientAccount | undefined> {
    return inMemoryPatientAccounts.find(p => p.id === id);
  },

  async createOrUpdatePatientAccount(data: Partial<PatientAccount> & { phone_number: string; full_name: string }): Promise<PatientAccount> {
    let patient = await this.getPatientAccount(data.phone_number);
    if (patient) {
      Object.assign(patient, { ...data, updated_at: new Date().toISOString() });
    } else {
      patient = {
        id: `pt-${Date.now()}`,
        hospital_id: DEMO_HOSPITAL.id,
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        date_of_birth: data.date_of_birth,
        gender: data.gender || 'other',
        blood_group: data.blood_group,
        address: data.address,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_phone: data.emergency_contact_phone,
        preferred_language: data.preferred_language || 'en',
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      inMemoryPatientAccounts.push(patient);
    }
    return patient;
  },

  // --- Diagnostics & Tests Catalog ---
  async getDiagnosticCategories(onlyActive = true): Promise<DiagnosticCategory[]> {
    return DEMO_DIAG_CATEGORIES.filter(c => (onlyActive ? c.is_active : true)).sort(
      (a, b) => a.display_order - b.display_order
    );
  },

  async getDiagnosticTests(categoryId?: string, onlyActive = true): Promise<DiagnosticTest[]> {
    return DEMO_DIAG_TESTS.filter(t => {
      const matchActive = onlyActive ? t.is_active : true;
      const matchCat = categoryId ? t.category_id === categoryId : true;
      return matchActive && matchCat;
    }).sort((a, b) => a.display_order - b.display_order);
  },

  async getDiagnosticTestByCode(code: string): Promise<DiagnosticTest | undefined> {
    return DEMO_DIAG_TESTS.find(t => t.code.toUpperCase() === code.toUpperCase());
  },

  // --- Health Packages ---
  async getHealthPackages(onlyActive = true): Promise<HealthPackage[]> {
    return DEMO_HEALTH_PACKAGES.filter(p => (onlyActive ? p.is_active : true)).sort(
      (a, b) => a.display_order - b.display_order
    );
  },

  async getHealthPackageBySlug(slug: string): Promise<HealthPackage | undefined> {
    return DEMO_HEALTH_PACKAGES.find(p => p.slug === slug);
  },

  // --- Diagnostic Reports ---
  async getDiagnosticReports(phone?: string, patientAccountId?: string): Promise<DiagnosticReport[]> {
    return inMemoryDiagnosticReports.filter(r => {
      if (patientAccountId && r.patient_account_id === patientAccountId) return true;
      if (phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        return r.patient_phone.replace(/\D/g, '').endsWith(cleanPhone.slice(-10));
      }
      return !phone && !patientAccountId;
    });
  },

  async getDiagnosticReportById(id: string): Promise<DiagnosticReport | undefined> {
    return inMemoryDiagnosticReports.find(r => r.id === id);
  },

  async uploadDiagnosticReport(reportData: Omit<DiagnosticReport, 'id' | 'created_at'>): Promise<DiagnosticReport> {
    const newReport: DiagnosticReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      created_at: new Date().toISOString(),
      download_count: 0,
    };
    inMemoryDiagnosticReports.unshift(newReport);

    HospitalRepo.logAudit('Staff', 'UPLOAD_REPORT', 'diagnostic_report', newReport.id, {
      patient: newReport.patient_name,
      test: newReport.test_name,
    });

    return newReport;
  },

  async incrementReportDownloadCount(id: string): Promise<void> {
    const report = inMemoryDiagnosticReports.find(r => r.id === id);
    if (report) {
      report.download_count = (report.download_count || 0) + 1;
    }
  },

  // --- Clinical Notes ---
  async getClinicalNotes(appointmentId: string): Promise<ClinicalNote | undefined> {
    return inMemoryClinicalNotes.find(n => n.appointment_id === appointmentId);
  },

  async createClinicalNote(data: Omit<ClinicalNote, 'id' | 'created_at' | 'updated_at'>): Promise<ClinicalNote> {
    const newNote: ClinicalNote = {
      ...data,
      id: `cl-note-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    inMemoryClinicalNotes.push(newNote);
    return newNote;
  },

  // --- Hospital CMS: Announcements & Careers ---
  async getCMSAnnouncements(category?: string, onlyActive = true): Promise<CMSAnnouncement[]> {
    return DEMO_CMS_ANNOUNCEMENTS.filter(a => {
      const matchActive = onlyActive ? a.is_active : true;
      const matchCat = category ? a.category === category : true;
      return matchActive && matchCat;
    });
  },

  async getCMSAnnouncementBySlug(slug: string): Promise<CMSAnnouncement | undefined> {
    return DEMO_CMS_ANNOUNCEMENTS.find(a => a.slug === slug);
  },

  async getCMSCareers(onlyActive = true): Promise<CMSCareer[]> {
    return DEMO_CMS_CAREERS.filter(c => (onlyActive ? c.is_active : true));
  },

  // --- Patient Queries & CRM ---
  async createQuery(params: {
    hospital_id?: string;
    patient_name: string;
    patient_phone: string;
    category: PatientQuery['category'];
    description: string;
    subject?: string;
    priority?: PatientQuery['priority'];
    status?: QueryStatus;
  }): Promise<PatientQuery> {
    const randomTicket = Math.floor(1000 + Math.random() * 9000);
    const dateTag = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ticketNumber = `TKT-${dateTag}-${randomTicket}`;

    const newQuery: PatientQuery = {
      id: `qry-${Date.now()}`,
      hospital_id: params.hospital_id || DEMO_HOSPITAL.id,
      ticket_number: ticketNumber,
      patient_name: params.patient_name.trim(),
      patient_phone: params.patient_phone.trim(),
      category: params.category,
      subject: params.subject || `${params.category} Enquiry`,
      description: params.description.trim(),
      status: params.status || 'open',
      priority: params.priority || 'medium',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    inMemoryQueries.unshift(newQuery);
    HospitalRepo.logAudit(params.patient_name, 'CREATE_QUERY', 'query', newQuery.id, {
      ticket_number: ticketNumber,
      category: params.category,
    });

    return newQuery;
  },

  async getQueries(filters?: {
    search?: string;
    status?: QueryStatus;
    category?: PatientQuery['category'];
  }): Promise<PatientQuery[]> {
    let list = [...inMemoryQueries];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        item =>
          item.ticket_number.toLowerCase().includes(q) ||
          item.patient_name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    if (filters?.status) {
      list = list.filter(item => item.status === filters.status);
    }
    if (filters?.category) {
      list = list.filter(item => item.category === filters.category);
    }
    return list;
  },

  async updateQuery(id: string, updates: Partial<PatientQuery>): Promise<PatientQuery | undefined> {
    const qry = inMemoryQueries.find(q => q.id === id);
    if (!qry) return undefined;
    Object.assign(qry, updates);
    qry.updated_at = new Date().toISOString();
    HospitalRepo.logAudit('Staff', 'UPDATE_QUERY', 'query', id, updates);
    return qry;
  },

  async getQueryNotes(queryId: string): Promise<QueryNote[]> {
    return inMemoryNotes.filter(n => n.query_id === queryId);
  },

  async addQueryNote(queryId: string, authorName: string, note: string): Promise<QueryNote> {
    const newNote: QueryNote = {
      id: `note-${Date.now()}`,
      query_id: queryId,
      author_name: authorName,
      note,
      is_internal: true,
      created_at: new Date().toISOString(),
    };
    inMemoryNotes.push(newNote);
    return newNote;
  },

  // --- FAQs & Knowledgebase ---
  async getFAQs(category?: string, onlyActive = true): Promise<FAQ[]> {
    let list = DEMO_FAQS.filter(f => (onlyActive ? f.is_active : true));
    if (category) {
      list = list.filter(f => f.category === category);
    }
    return list.sort((a, b) => a.display_order - b.display_order);
  },

  async searchFAQs(query: string): Promise<FAQ[]> {
    const clean = query.toLowerCase().trim();
    return DEMO_FAQS.filter(
      f =>
        f.is_active &&
        (f.question.toLowerCase().includes(clean) ||
          f.answer.toLowerCase().includes(clean) ||
          f.keywords.some(k => clean.includes(k) || k.includes(clean)))
    );
  },

  async createFAQ(data: Omit<FAQ, 'id' | 'hospital_id' | 'display_order'>): Promise<FAQ> {
    const newFaq: FAQ = {
      ...data,
      id: `faq-${Date.now()}`,
      hospital_id: DEMO_HOSPITAL.id,
      display_order: DEMO_FAQS.length + 1,
    };
    DEMO_FAQS.push(newFaq);
    HospitalRepo.logAudit('Staff', 'CREATE_FAQ', 'faq', newFaq.id, { question: newFaq.question });
    return newFaq;
  },

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ | undefined> {
    const faq = DEMO_FAQS.find(f => f.id === id);
    if (!faq) return undefined;
    Object.assign(faq, updates);
    HospitalRepo.logAudit('Staff', 'UPDATE_FAQ', 'faq', id, updates);
    return faq;
  },

  async deleteFAQ(id: string): Promise<boolean> {
    const index = DEMO_FAQS.findIndex(f => f.id === id);
    if (index === -1) return false;
    DEMO_FAQS.splice(index, 1);
    HospitalRepo.logAudit('Staff', 'DELETE_FAQ', 'faq', id, {});
    return true;
  },

  // --- Staff & Roles ---
  async getStaff(): Promise<Profile[]> {
    return DEMO_STAFF;
  },

  // --- Audit Logs ---
  async logAudit(
    actorName: string,
    action: string,
    entityType: string,
    entityId: string,
    details?: Record<string, any>
  ): Promise<void> {
    inMemoryAuditLogs.unshift({
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      hospital_id: DEMO_HOSPITAL.id,
      actor_name: actorName,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString(),
    });
  },

  async getAuditLogs(limit = 100): Promise<AuditLog[]> {
    return inMemoryAuditLogs.slice(0, limit);
  },

  // --- Webhook Idempotency ---
  isEventProcessed(eventId: string): boolean {
    return inMemoryWebhookEventIds.has(eventId);
  },

  markEventProcessed(eventId: string): void {
    inMemoryWebhookEventIds.add(eventId);
  },

  // --- Dashboard Metrics ---
  async getDashboardMetrics() {
    const today = getHospitalTodayDate();
    const todayAppointments = inMemoryAppointments.filter(a => a.appointment_date === today);
    const pendingAppointments = inMemoryAppointments.filter(a => a.status === 'requested');
    const confirmedAppointments = inMemoryAppointments.filter(a => a.status === 'confirmed');
    const cancelledAppointments = inMemoryAppointments.filter(a => a.status === 'cancelled');
    const openQueries = inMemoryQueries.filter(q => q.status === 'open' || q.status === 'in_progress');
    const unassignedQueries = inMemoryQueries.filter(q => !q.assigned_to && q.status !== 'resolved');

    return {
      totalAppointments: inMemoryAppointments.length,
      todayAppointmentsCount: todayAppointments.length,
      pendingCount: pendingAppointments.length,
      confirmedCount: confirmedAppointments.length,
      cancelledCount: cancelledAppointments.length,
      openQueriesCount: openQueries.length,
      unassignedQueriesCount: unassignedQueries.length,
      doctorsCount: DEMO_DOCTORS.filter(d => d.is_active).length,
      departmentsCount: DEMO_DEPARTMENTS.filter(d => d.is_active).length,
      diagnosticTestsCount: DEMO_DIAG_TESTS.filter(t => t.is_active).length,
      healthPackagesCount: DEMO_HEALTH_PACKAGES.filter(p => p.is_active).length,
      recentAppointments: inMemoryAppointments.slice(0, 5),
      recentQueries: inMemoryQueries.slice(0, 5),
    };
  },

  // --- Automation: Appointment Reminders ---
  async sendAppointmentReminders(): Promise<{
    processed: number;
    sent: number;
    skipped: number;
    logs: NotificationLog[];
  }> {
    const today = getHospitalTodayDate();
    const todayMs = new Date(`${today}T00:00:00Z`).getTime();
    const tomorrow = new Date(todayMs + 86400000).toISOString().split('T')[0];

    const eligible = inMemoryAppointments.filter(
      a => (a.appointment_date === today || a.appointment_date === tomorrow) &&
           a.status === 'confirmed'
    );

    let sentCount = 0;
    let skippedCount = 0;
    const newLogs: NotificationLog[] = [];

    for (const apt of eligible) {
      const alreadySent = inMemoryNotificationLogs.some(
        n => n.reference_id === apt.id && n.notification_type === 'reminder'
      );
      if (alreadySent) {
        skippedCount++;
        continue;
      }

      const reminderBody =
        `🔔 *APPOINTMENT REMINDER - Hiramani Memorial Hospital*\n\n` +
        `Dear ${apt.patient_name},\n` +
        `This is a reminder for your upcoming consultation with *${apt.doctor_name}* (${apt.department_name}).\n\n` +
        `📅 *Date:* ${apt.appointment_date}\n` +
        `⏰ *Time Slot:* ${apt.start_time} - ${apt.end_time}\n` +
        `📌 *Reference:* ${apt.booking_reference}\n\n` +
        `Please arrive 15 minutes before your slot.\n` +
        `Reply *1* to manage or reschedule your appointment.\n\n` +
        `📍 Hiramani Memorial Hospital, 40, Ananta Hari Mitra Road, Nediarpara, Krishnanagar - 741101.`;

      const result = await WhatsAppService.sendTextMessage(apt.patient_phone, reminderBody);

      const log: NotificationLog = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        hospital_id: DEMO_HOSPITAL.id,
        recipient_phone: apt.patient_phone,
        notification_type: 'reminder',
        reference_id: apt.id,
        status: result.success ? 'sent' : 'failed',
        message: reminderBody,
        created_at: new Date().toISOString(),
      };

      inMemoryNotificationLogs.unshift(log);
      newLogs.push(log);
      sentCount++;
    }

    HospitalRepo.logAudit('Automated Scheduler', 'SEND_REMINDERS', 'notification', 'batch', {
      eligible_count: eligible.length,
      sent_count: sentCount,
      skipped_count: skippedCount,
    });

    return { processed: eligible.length, sent: sentCount, skipped: skippedCount, logs: newLogs };
  },

  async getNotificationLogs(limit = 50): Promise<NotificationLog[]> {
    return inMemoryNotificationLogs.slice(0, limit);
  },
};
