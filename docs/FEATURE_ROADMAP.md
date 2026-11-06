# Feature Roadmap & Phased Implementation Plan
## Hiramani Memorial Hospital: Complete Digital Platform

---

### 1. Phased Architecture Overview

To ensure zero downtime, prevent regression in the existing WhatsApp automation, and maintain clinical safety standards, development is structured into **nine sequential phases**. Each phase delivers verifiable, production-ready modules.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 PHASED DEVELOPMENT TIMELINE                                      │
├─────────────────┬───────────────────┬───────────────────┬───────────────────┬────────────────────┤
│ Phase 1:        │ Phase 2:          │ Phase 3:          │ Phase 4:          │ Phase 5:           │
│ Foundation &    │ Public Hospital   │ Unified Booking   │ Patient Portal &  │ Doctor & Staff     │
│ DB Migration    │ Web Experience    │ Engine (Web + WA) │ Diagnostic Reports│ Clinical Roster    │
├─────────────────┼───────────────────┼───────────────────┼───────────────────┼────────────────────┤
│ Phase 6:        │ Phase 7:          │ Phase 8:          │ Phase 9:          │                    │
│ Admin ERP &     │ Trilingual WA     │ AI Hospital       │ Security Hardening│                    │
│ Content CMS     │ Bot Upgrade       │ Assistant (RAG)   │ & Launch          │                    │
└─────────────────┴───────────────────┴───────────────────┴───────────────────┴────────────────────┘
```

---

### 2. Detailed Phase Specifications

---

#### Phase 1: Architecture Foundation & Database Expansion
* **Objective**: Establish the unified Next.js App Router codebase and execute the additive PostgreSQL database migration.
* **Key Deliverables**:
  1. Initialize workspace with Next.js 14/15, Tailwind CSS, Lucide icons, and shadcn/ui components.
  2. Implement Supabase client libraries (`server.ts`, `client.ts`, `admin.ts`).
  3. Execute Migration `20261107000000_healthcare_platform_expansion.sql` to create `patient_accounts`, `diagnostic_tests`, `health_packages`, `diagnostic_reports`, and `clinical_notes`.
  4. Configure private Supabase Storage bucket `patient-reports` with zero-public-access RLS policies.
  5. Seed database with verified initial hospital data and quarantine unverified data in `HOSPITAL_INFORMATION_CHECKLIST.md`.
* **Success Criteria**: Migration applies cleanly with zero errors; all foreign keys, partial unique indexes, and RLS policies are active.

---

#### Phase 2: Public Hospital Website & Responsive Healthcare UI/UX
* **Objective**: Build the patient-facing web portal replacing the broken CodeIgniter PHP site and SaaS marketing page.
* **Key Deliverables**:
  1. **Hospital Navbar & Header**: Emergency hotline bar (`+91 9477589578`), OPD quick-call, multilingual language selector (Bengali/English/Hindi), primary navigation.
  2. **Modern Homepage**:
     * Hero section with immediate CTAs: "Book Appointment", "Download Lab Reports", "Emergency Help".
     * Quick Search: Find doctor by specialty or name.
     * Core Specialties & Clinical Highlights.
     * Diagnostic Services & Health Checkup highlights.
     * 24x7 Emergency, Trauma, and Ambulance banner.
     * Patient reviews & hospital accreditations.
  3. **About Hospital**: Vision, mission, compassionate care philosophy, hospital infrastructure, and leadership.
  4. **Doctors Directory (`/doctors`)**: Searchable, filterable list of specialists with degrees, departments, OPD consultation days, fees, and "Book Slot" buttons.
  5. **Doctor Profile Page (`/doctors/[id]`)**: Full biography, qualifications, clinical interests, weekly OPD calendar, and direct booking trigger.
  6. **Departments & Specialties (`/departments`)**: In-depth clinical pages for General Medicine, Cardiology, Orthopaedics, Gynaecology, Paediatrics, ENT, Dermatology, General Surgery, and Emergency Care.
  7. **Diagnostic Services & Tests (`/diagnostics`)**: Pathology and radiology catalog with test codes, fasting requirements, turnaround times, and pricing.
  8. **Health Packages (`/packages`)**: Comprehensive checkup packages with test breakdowns and transparent pricing.
  9. **Patient Guide & Facilities (`/patient-info`)**: Admission procedures, visiting hours, ward categories, and patient rights.
  10. **Cashless Insurance & TPA (`/insurance`)**: Accepted insurance providers (Star Health, HDFC ERGO, ICICI Lombard, Medi Assist) and government schemes (Swasthya Sathi).
  11. **News & Health Blog (`/news`)**: Evidence-based medical advisories (e.g., Dengue guidelines) and hospital announcements.
  12. **Careers (`/careers`)**: Current openings for doctors, nurses, technicians, and online resume submission.
  13. **Contact & Emergency (`/contact`)**: Interactive Google Map, GPS navigation, verified phone numbers, and inquiry form.
* **Success Criteria**: Fully responsive on mobile, tablet, and desktop; zero Lorem Ipsum; 100% accessible navigation; zero console errors.

---

#### Phase 3: Unified Appointment Booking Engine
* **Objective**: Deploy the multi-step appointment wizard and guarantee synchronization across Web and WhatsApp.
* **Key Deliverables**:
  1. **Multi-Step Booking Wizard (`/book`)**:
     * Step 1: Select Department & Specialty.
     * Step 2: Select Doctor & View Consultation Fee.
     * Step 3: Interactive Date Picker (constrained by doctor's weekly roster and leave dates).
     * Step 4: Real-time Slot Picker (showing unreserved morning/evening slots).
     * Step 5: Patient Details & Mobile Number Input (E.164 validation).
     * Step 6: Confirmation Screen with unique Booking Reference (`HMH-YYYYMM-XXXX`).
  2. **Slot Availability Calculator (`/api/doctors/slots`)**: Server-side engine calculating free slots by checking doctor weekly schedules against existing active appointments and approved leaves.
  3. **Atomic Booking Transaction**: Insert with partial unique index enforcement preventing race condition double-bookings.
  4. **Automated Notification**: Dispatches instant WhatsApp confirmation message with appointment details and calendar attachment.
* **Success Criteria**: Simulated concurrent bookings on the same slot result in exactly one confirmation and one clean conflict notification; no double bookings possible.

---

#### Phase 4: Patient Health Portal & Secure Diagnostic Report Access
* **Objective**: Provide patients with self-service access to their appointment history and laboratory reports.
* **Key Deliverables**:
  1. **Patient Authentication (`/portal/login`)**: Mobile OTP or password authentication with phone number verification.
  2. **Patient Dashboard (`/portal/dashboard`)**: Upcoming doctor visits, quick actions, active prescription links.
  3. **Appointment Management (`/portal/appointments`)**: View past visits, cancel or reschedule appointments within the 2-hour policy window.
  4. **Diagnostic Reports Vault (`/portal/reports`)**:
     * Searchable list of laboratory and radiology reports.
     * Secure PDF viewer with zoom and print controls.
     * Download handler using short-lived signed URLs (5-minute expiry).
  5. **Patient Support History (`/portal/queries`)**: Track tickets submitted via web or WhatsApp.
* **Success Criteria**: Patients can securely log in and download their diagnostic PDFs; direct URL tampering returns HTTP 403 Forbidden.

---

#### Phase 5: Doctor & Clinical Staff Portal
* **Objective**: Equip clinicians and hospital receptionists with operational queue tools.
* **Key Deliverables**:
  1. **Staff Authentication (`/staff/login`)**: Secure login with role enforcement.
  2. **Doctor OPD Roster (`/doctor/schedule`)**: Daily and weekly schedule calendar.
  3. **Live OPD Queue Manager (`/doctor/queue`)**:
     * Real-time list of booked patients for the current session.
     * Status transitions: `Waiting` -> `In Consultation` -> `Completed` / `No-Show`.
  4. **Clinical Consultation Notes**: Doctor can input basic diagnosis summary and follow-up recommendations.
  5. **Doctor Availability & Leave (`/doctor/availability`)**: Block out personal emergency leave dates, automatically locking appointment booking for those days.
* **Success Criteria**: Marking a doctor on leave immediately disables that doctor's booking slots across both web and WhatsApp interfaces.

---

#### Phase 6: Hospital Admin Dashboard & CMS
* **Objective**: Provide hospital management with end-to-end operational control and content management.
* **Key Deliverables**:
  1. **Executive Analytics (`/dashboard`)**: Daily appointments count, department utilization, revenue metrics, WhatsApp traffic.
  2. **Doctor & Specialty Manager (`/dashboard/doctors`)**: Add/edit doctors, qualifications, room assignments, slot durations, and fees.
  3. **Diagnostic Catalog Manager (`/dashboard/diagnostics`)**: Edit test directory, preparation instructions, and health package pricing.
  4. **Report Upload Module (`/dashboard/reports`)**: Lab technicians upload PDF reports tagged to patient phone/booking reference with automatic WhatsApp alerts.
  5. **WhatsApp & Web Support CRM (`/dashboard/queries`)**: Central inbox for patient inquiries, department assignment, and internal notes.
  6. **Hospital CMS (`/dashboard/cms`)**: Publish hospital announcements, update visiting hours, manage career openings, and edit approved FAQs.
  7. **Audit Trail (`/dashboard/audit`)**: Security logs recording sensitive data accesses.
* **Success Criteria**: Hospital admins can update doctor consultation fees or post emergency announcements without touching code.

---

#### Phase 7: WhatsApp Automation Enhancement & Trilingual Expansion
* **Objective**: Upgrade the existing `BotEngine` with trilingual support (Bengali, English, Hindi) and Meta Cloud API production settings.
* **Key Deliverables**:
  1. Preserve the 2,187-line `BotEngine` state machine and exact bilingual greeting.
  2. Expand intent parsing and message templates to include Hindi language prompts.
  3. Connect all appointment booking and inquiry ticket creation directly to the authoritative Supabase PostgreSQL database.
  4. Deprecate the experimental Baileys Web bridge and configure Meta WhatsApp Cloud API v21.0 webhooks with HMAC-SHA256 verification.
  5. Retain the web-based `WhatsAppSimulator` component for testing and patient demo.
* **Success Criteria**: The bot handles end-to-end appointment bookings and inquiries in Bengali, English, and Hindi, persisting data to PostgreSQL.

---

#### Phase 8: AI-Powered Hospital Information Assistant
* **Objective**: Embed an intelligent, conversational healthcare information agent grounded exclusively on hospital facts.
* **Key Deliverables**:
  1. **Verified Knowledge Retrieval (RAG)**: Connect assistant to hospital FAQs, doctor profiles, OPD schedules, diagnostic test preps, and admission policies.
  2. **Clinical Safety Boundary Classifier**: Strict prompt guardrails blocking symptom diagnosis, treatment suggestions, or drug prescriptions.
  3. **Trilingual Interaction**: Natural conversational understanding in Bengali, English, and Hindi.
  4. **Emergency Interception**: Intercepts acute symptoms and triggers urgent emergency hotline banner.
  5. **Support Ticket Escalation**: Converts complex or unanswered patient queries into reception support tickets.
  6. **Floating Web Widget**: Collapsible AI chat assistant accessible on all public website pages.
* **Success Criteria**: The assistant accurately answers "What is the fee for Cardiology?" and "Do I need fasting for a Lipid Profile?", while refusing "What medicine should I take for fever?" with a consultation recommendation.

---

#### Phase 9: Security Hardening, Verification & Production Deployment
* **Objective**: Conduct comprehensive security audits, load tests, and configure production hosting.
* **Key Deliverables**:
  1. Penetration testing: SQL injection, cross-site scripting (XSS), CSRF, and broken object level authorization (BOLA) tests.
  2. Audit logging verification for patient health information access.
  3. End-to-end integration tests using Vitest.
  4. Production environment configuration and SSL/CDN setup.
  5. Staff training handover documentation and operation runbooks.
* **Success Criteria**: 100% test pass rate; zero critical vulnerabilities; sub-second page loads on 4G mobile connections.

