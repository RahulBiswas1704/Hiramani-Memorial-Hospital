// ==============================================================================
// HIRAMANI MEMORIAL HOSPITAL - UNIFIED HEALTHCARE PLATFORM TYPES
// Multi-tenant hospital isolation, patient portal, diagnostic reports,
// doctor rosters, WhatsApp bot state machine, and CMS entities.
// ==============================================================================

export type UserRole =
  | 'super_admin'
  | 'hospital_admin'
  | 'receptionist'
  | 'department_staff'
  | 'doctor'
  | 'lab_technician';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar_url?: string;
  role: UserRole;
  hospital_id: string;
  created_at: string;
}

export interface Hospital {
  id: string;
  name: string;
  slug: string;
  registration_number?: string;
  phone: string;
  emergency_contact: string;
  email?: string;
  website?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  google_maps_url?: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
}

export interface HospitalSettings {
  id: string;
  hospital_id: string;
  opd_timings: string;
  visiting_hours: string;
  reception_hours: string;
  cancellation_policy: string;
  booking_policy: string;
  advance_booking_days?: number;
  diagnostic_services_info?: string;
  admission_info?: string;
  billing_info?: string;
  insurance_info?: string;
  whatsapp_phone_number_id?: string;
  whatsapp_business_account_id?: string;
  whatsapp_display_number?: string;
  is_whatsapp_connected: boolean;
}

export interface Department {
  id: string;
  hospital_id: string;
  name: string;
  code: string;
  description?: string;
  contact_phone?: string;
  contact_email?: string;
  icon_name?: string;
  is_active: boolean;
  display_order: number;
}

export interface Doctor {
  id: string;
  hospital_id: string;
  department_id: string;
  department_name?: string;
  full_name: string;
  qualification: string;
  speciality: string;
  experience_years: number;
  bio?: string;
  consultation_fee: number;
  follow_up_fee?: number;
  room_number?: string;
  profile_image_url?: string;
  is_active: boolean;
  display_order: number;
}

export interface DoctorSchedule {
  id: string;
  hospital_id: string;
  doctor_id: string;
  day_of_week: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // HH:mm:ss or HH:mm
  end_time: string;
  slot_duration_minutes: number;
  max_patients_per_slot: number;
  is_active: boolean;
}

export interface DoctorTimeOff {
  id: string;
  hospital_id: string;
  doctor_id: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;
  reason?: string;
}

// ------------------------------------------------------------------------------
// Patient Accounts & Portal
// ------------------------------------------------------------------------------
export interface PatientAccount {
  id: string;
  user_id?: string;
  hospital_id: string;
  full_name: string;
  phone_number: string; // E.164
  email?: string;
  date_of_birth?: string; // YYYY-MM-DD
  gender?: 'male' | 'female' | 'other';
  blood_group?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  preferred_language: 'en' | 'bn' | 'hi';
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------------------------
// Appointments & Clinical Workflow
// ------------------------------------------------------------------------------
export type AppointmentStatus =
  | 'requested'
  | 'confirmed'
  | 'reschedule_requested'
  | 'cancelled'
  | 'completed'
  | 'no_show';

export type BookingChannel = 'whatsapp' | 'web_dashboard' | 'web_portal' | 'phone' | 'walk_in';

export type PaymentStatus = 'pay_at_hospital' | 'online_paid' | 'exempted';

export interface Appointment {
  id: string;
  hospital_id: string;
  booking_reference: string;
  doctor_id: string;
  doctor_name?: string;
  department_id: string;
  department_name?: string;
  patient_account_id?: string;
  patient_name: string;
  patient_phone: string;
  appointment_date: string; // YYYY-MM-DD
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  status: AppointmentStatus;
  consultation_fee: number;
  payment_status?: PaymentStatus;
  booking_channel: BookingChannel;
  administrative_note?: string;
  cancellation_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface ClinicalNote {
  id: string;
  hospital_id: string;
  appointment_id?: string;
  doctor_id: string;
  patient_phone: string;
  patient_name: string;
  diagnosis_summary?: string;
  prescription_notes?: string;
  vitals?: {
    blood_pressure?: string;
    pulse_rate?: string;
    temperature_f?: string;
    spo2_percent?: string;
    weight_kg?: string;
  };
  follow_up_date?: string;
  created_at: string;
  updated_at: string;
}

// ------------------------------------------------------------------------------
// Diagnostics & Health Packages
// ------------------------------------------------------------------------------
export interface DiagnosticCategory {
  id: string;
  hospital_id: string;
  name: string;
  code: string;
  description?: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
}

export interface DiagnosticTest {
  id: string;
  hospital_id: string;
  category_id?: string;
  category_name?: string;
  name: string;
  code: string;
  description?: string;
  price: number;
  fasting_required: boolean;
  preparation_instructions?: string;
  sample_type?: string;
  turnaround_hours: number;
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface HealthPackage {
  id: string;
  hospital_id: string;
  name: string;
  slug: string;
  description?: string;
  target_gender?: 'all' | 'male' | 'female';
  price: number;
  discounted_price: number;
  sample_count: number;
  report_delivery_hours: number;
  fasting_required: boolean;
  preparation_instructions?: string;
  tests?: DiagnosticTest[];
  is_active: boolean;
  display_order: number;
  created_at?: string;
}

export interface HealthPackageTest {
  id: string;
  package_id: string;
  test_id: string;
  display_order: number;
}

export interface DiagnosticReport {
  id: string;
  hospital_id: string;
  patient_account_id?: string;
  patient_phone: string;
  patient_name: string;
  test_id?: string;
  test_name: string;
  report_date: string; // YYYY-MM-DD
  storage_path: string;
  file_name: string;
  mime_type: string;
  file_size_bytes: number;
  technician_id?: string;
  technician_name?: string;
  status: 'processing' | 'ready' | 'delivered';
  notification_sent: boolean;
  download_count: number;
  patient_notes?: string;
  created_at: string;
  updated_at?: string;
}

// ------------------------------------------------------------------------------
// Hospital CMS & News
// ------------------------------------------------------------------------------
export type CMSCategory = 'Notice' | 'Health Advisory' | 'News' | 'Event' | 'Emergency';

export interface CMSAnnouncement {
  id: string;
  hospital_id: string;
  title: string;
  slug: string;
  category: CMSCategory;
  summary: string;
  content: string;
  image_url?: string;
  is_emergency_alert: boolean;
  is_active: boolean;
  published_at: string;
  created_at: string;
}

export interface CMSCareer {
  id: string;
  hospital_id: string;
  title: string;
  department: string;
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience_required: string;
  qualification_required: string;
  description: string;
  vacancies: number;
  is_active: boolean;
  created_at: string;
}

// ------------------------------------------------------------------------------
// Patient Queries & CRM
// ------------------------------------------------------------------------------
export type QueryCategory =
  | 'Doctor & Appointments'
  | 'Departments & Services'
  | 'Diagnostic Tests & Reports'
  | 'Admission & Surgery Enquiry'
  | 'Hospital Location & Contact'
  | 'Billing & Insurance'
  | 'Speak to Hospital Staff'
  | 'Appointments'
  | 'Billing'
  | 'Laboratory'
  | 'Medical Records'
  | 'General Enquiry'
  | 'Complaints'
  | 'Other';

export type QueryStatus =
  | 'open'
  | 'assigned'
  | 'in_progress'
  | 'waiting_for_patient'
  | 'resolved'
  | 'closed';

export type QueryPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface PatientQuery {
  id: string;
  hospital_id: string;
  ticket_number: string;
  patient_name: string;
  patient_phone: string;
  category: QueryCategory;
  subject?: string;
  description: string;
  status: QueryStatus;
  priority: QueryPriority;
  assigned_to?: string;
  assigned_to_name?: string;
  resolved_at?: string;
  resolution_summary?: string;
  created_at: string;
  updated_at: string;
}

export interface QueryNote {
  id: string;
  query_id: string;
  author_id?: string;
  author_name?: string;
  note: string;
  is_internal: boolean;
  created_at: string;
}

export type FAQCategory =
  | 'Hospital Information'
  | 'Appointments'
  | 'Doctors'
  | 'Consultation Fees'
  | 'OPD Timings'
  | 'Laboratory'
  | 'Billing'
  | 'Insurance'
  | 'Visiting Hours'
  | 'Location'
  | 'Other';

export interface FAQ {
  id: string;
  hospital_id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  keywords: string[];
  is_active: boolean;
  display_order: number;
}

export interface AuditLog {
  id: string;
  hospital_id: string;
  actor_name: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  hospital_id: string;
  recipient_phone: string;
  notification_type: 'booking_confirmation' | 'reminder' | 'cancellation' | 'query_update' | 'staff_alert';
  reference_id?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  message: string;
  created_at: string;
}

// ------------------------------------------------------------------------------
// Conversation & Bot Engine
// ------------------------------------------------------------------------------
export type BotState =
  | 'MAIN_MENU'
  | 'DOCTOR_APPOINTMENT_MENU'
  | 'DOCTOR_AVAILABILITY_SELECT'
  | 'CHECK_STATUS_INPUT'
  | 'BOOKING_DEPT'
  | 'BOOKING_DOCTOR'
  | 'BOOKING_DATE'
  | 'BOOKING_SLOT'
  | 'BOOKING_NAME'
  | 'BOOKING_PHONE'
  | 'BOOKING_CONFIRMATION'
  | 'CANCEL_RESCHEDULE_INPUT'
  | 'CANCEL_ACTION'
  | 'RESCHEDULE_DATE'
  | 'RESCHEDULE_SLOT'
  | 'DEPARTMENTS_SERVICES_MENU'
  | 'DEPARTMENT_DETAIL'
  | 'DIAGNOSTIC_REPORTS_MENU'
  | 'DIAGNOSTIC_ENQUIRY_TEXT'
  | 'ADMISSION_SURGERY_MENU'
  | 'ADMISSION_ENQUIRY_TEXT'
  | 'SURGERY_ENQUIRY_TEXT'
  | 'BILLING_INSURANCE_MENU'
  | 'BILLING_ENQUIRY_TEXT'
  | 'STAFF_ASSISTANCE_INPUT'
  | 'QUERY_CATEGORY'
  | 'QUERY_TEXT'
  | 'HUMAN_HANDOVER'
  | 'EMERGENCY'
  | 'FAQ_BROWSING';

export interface ConversationSession {
  id: string;
  hospital_id: string;
  phone: string;
  state: BotState;
  state_payload: {
    dept_id?: string;
    doctor_id?: string;
    date?: string;
    slot?: string;
    patient_name?: string;
    patient_phone?: string;
    booking_ref?: string;
    query_category?: QueryCategory;
    previous_state?: BotState;
    [key: string]: any;
  };
  is_human_handover: boolean;
  last_interaction_at: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  interactive_type?: 'buttons' | 'list';
  options?: Array<{ id: string; title: string; description?: string }>;
  status?: 'sent' | 'delivered' | 'read' | 'failed';
}
