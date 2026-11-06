# Hiramani Memorial Hospital: Digital Healthcare Platform
## Project Overview & Strategic Scope

---

### 1. Executive Summary

**Hiramani Memorial Hospital** is an established healthcare institution serving patients in Kolkata and greater West Bengal. This initiative transforms the hospital's digital presence from an outdated, disconnected legacy website into a **unified, enterprise-grade digital healthcare platform**.

The unified platform bridges the public hospital experience, real-time doctor availability, verified online appointment booking, a secure patient health portal with diagnostic report retrieval, hospital administration tools, clinical staff dashboards, and an automated trilingual WhatsApp patient service system.

By integrating the hospital's public presence with the existing **HIRAMANI-MEDICONNECT** WhatsApp automation engine and consolidating all workflows onto a single authoritative PostgreSQL database, the institution eliminates fragmented patient records, eliminates double-booking, accelerates OPD registration, and provides patients with 24/7 self-service access in **Bengali, English, and Hindi**.

---

### 2. Vision and Core Objectives

```
                                  ┌────────────────────────────────────────┐
                                  │       PATIENT & CITIZEN ACCESS         │
                                  ├───────────────────┬────────────────────┤
                                  │   Web Platform    │  WhatsApp Bot & AI │
                                  │ (Desktop / Mobile)│  (Cloud API / Trilingual)
                                  └─────────┬─────────┴──────────┬─────────┘
                                            │                    │
                                            ▼                    ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             UNIFIED HEALTHCARE APPLICATION LAYER                                 │
│                                (Next.js 14/15 App Router)                                        │
├───────────────────────┬────────────────────────┬────────────────────────┬────────────────────────┤
│ Public Hospital Web   │ Patient Health Portal  │ Doctor & Staff Portal  │ Hospital Admin ERP     │
│ • Doctor Directory    │ • Appointment History  │ • OPD Roster & Queue   │ • Analytics & KPIs     │
│ • Depts & Specialties │ • Diagnostic Reports   │ • Patient Notes        │ • Doctor & OPD Mgmt    │
│ • Health Packages     │ • Report Downloads     │ • Leave / Availability │ • WhatsApp Support Hub │
│ • Emergency Services  │ • Support Inquiries    │ • Schedule Exceptions  │ • Audit & Access Logs  │
└───────────────────────┴────────────────────────┴────────────────────────┴────────────────────────┘
                                            │
                                            ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             CENTRAL DATA & INFRASTRUCTURE LAYER                                  │
│                                    (Supabase PostgreSQL)                                         │
├───────────────────────┬────────────────────────┬────────────────────────┬────────────────────────┤
│ Authoritative Relational│ Row Level Security   │ Encrypted Storage      │ Meta WhatsApp Cloud    │
│ OPD & Doctor Database │ (Role-Based Access)    │ (Diagnostic PDFs)      │ Graph API v21.0 Webhook│
└───────────────────────┴────────────────────────┴────────────────────────┴────────────────────────┘
```

#### Primary Objectives:
1. **Single Source of Truth**: Eliminate dual databases. Whether an appointment is booked via WhatsApp, the public website, or at the hospital reception desk, it interacts with the exact same scheduling engine, slot limits, and doctor roster.
2. **Frictionless Patient Experience**: Empower patients to discover specialists, check consultation fees, verify OPD timings, book verified appointments, and securely download diagnostic lab reports without standing in hospital queues.
3. **Preserve & Modernize WhatsApp Automation**: Integrate the existing `HIRAMANI-MEDICONNECT` repository, preserving its proven multi-turn conversational engine, 7-category menu, and Bengali-English bilingual welcome flow, while upgrading it to production Meta WhatsApp Cloud API with trilingual (Bengali, English, Hindi) support.
4. **Healthcare Data Protection & Compliance**: Adhere to the **Digital Personal Data Protection (DPDP) Act 2023** and Indian healthcare privacy guidelines. Enforce strict role-based access control (RBAC), private encrypted storage for medical documents, and audit logging for sensitive data access.
5. **Operational Efficiency for Hospital Staff**: Provide receptionists, doctors, and hospital administrators with responsive dashboards to manage daily queues, track patient tickets, handle WhatsApp inquiries, and manage department operations.
6. **Safety First**: Incorporate clinical safety boundaries. The AI hospital assistant and WhatsApp bot provide verified logistical, operational, and scheduling information only; they never diagnose medical conditions, never prescribe medications, and feature permanent emergency call-to-action safeguards.

---

### 3. Stakeholder Ecosystem & User Personas

| Stakeholder | Key Touchpoints | Core Needs & Workflows |
| :--- | :--- | :--- |
| **Patients & Families** | Public Web, Patient Portal, WhatsApp, AI Assistant | Find doctors by specialty, book OPD appointments, view real-time fees, download pathology/radiology reports, ask questions in native language (Bengali/English/Hindi). |
| **Emergency Walk-ins** | Web Emergency Banner, WhatsApp Emergency Bypass | Instant one-tap access to 24x7 emergency desk, ambulance dispatch, trauma center directions. |
| **Doctors & Specialists** | Doctor Portal, Daily OPD Queue | View scheduled appointments, mark attendance, review slot availability, block emergency leave, add consultation notes. |
| **Front Desk & Reception** | Staff Dashboard, WhatsApp Query Inbox | Manage walk-in bookings, verify patient check-ins, resolve patient inquiries, reassign tickets. |
| **Lab Technicians & Radiologists** | Diagnostic Admin Module | Upload verified PDF diagnostic reports linked to patient ID, mark reports as ready, notify patients via WhatsApp/SMS. |
| **Hospital Administrators** | Central Admin Dashboard | Oversee doctor schedules, manage departments, monitor WhatsApp engagement, review audit trails, update website announcements. |

---

### 4. Scope of the Unified Platform

#### Module A: Public Hospital Website
* **Homepage**: Hospital identity, emergency hotline, OPD search, core departments, top specialists, patient testimonials, accreditations.
* **About Hospital**: Institutional history, board of directors, mission, vision, clinical ethics, infrastructure highlights.
* **Doctors Directory**: Real-time searchable directory filtered by specialty, qualification, language, OPD days, and consultation fees.
* **Departments & Specialties**: Comprehensive clinical guides for General Medicine, Cardiology, Orthopaedics, Gynaecology & Obstetrics, Paediatrics, ENT, Dermatology, Surgery, Emergency Care.
* **Diagnostic Services & Pathology**: Full diagnostic catalog (Pathology, Digital X-Ray, Ultrasonography, CT Scan, 2D Echo, ECG, TMT), preparation instructions (fasting/non-fasting), and sample collection procedures.
* **Preventive Health Packages**: Executive Checkup, Cardiac Wellness, Diabetic Package, Women’s Health, Senior Citizen Care with transparent pricing.
* **Online Appointment Booking**: Responsive, mobile-first booking wizard with live calendar slots, patient validation, and instant confirmation.
* **Patient Information & Facilities**: In-patient admission guide, visiting hours, room tariffs, discharge process, patient rights.
* **Cashless Insurance & TPA**: Supported health insurance partners (Star Health, HDFC ERGO, ICICI Lombard, Medi Assist, etc.), government schemes (Swasthya Sathi, Ayushman Bharat), and billing helpdesk.
* **News & Health Blog**: Medical advisories, community health camp alerts, seasonal illness guidelines (e.g., Dengue management).
* **Careers**: Job listings for nursing, medical officers, administrative staff, and application submission.
* **Contact & Emergency**: Interactive Google Map, GPS navigation, 24x7 emergency numbers, ambulance dispatch contact, grievance redressal.

#### Module B: Patient Health Portal
* **Authentication**: Passwordless OTP login via verified WhatsApp/mobile number or secure email authentication.
* **Patient Profile**: Demographics, blood group, emergency contact details, language preference.
* **Appointment Management**: View upcoming appointments, booking history, cancel or reschedule with 2-hour cutoff rule.
* **Diagnostic Report Vault**: Searchable repository of verified laboratory and radiology reports with secure PDF viewing and downloading.
* **Support Inquiries**: Track patient inquiries and tickets submitted via web or WhatsApp.

#### Module C: Doctor & Clinical Staff Portal
* **Staff Login**: Secure multi-factor authentication with role isolation.
* **OPD Schedule Viewer**: Daily, weekly, and monthly calendar views of patient bookings.
* **Queue Management**: Mark patient as Arrived, In Consultation, Completed, or No-Show.
* **Availability Controls**: Mark on-leave days, emergency block-outs, or schedule shift changes.

#### Module D: Hospital Admin Dashboard
* **Executive KPIs**: Real-time counts of daily OPD bookings, confirmed visits, pending lab reports, open WhatsApp inquiries.
* **Doctor & Roster Management**: Add/edit doctors, assign departments, configure weekly OPD slots, consultation fees, and room numbers.
* **Department Management**: Add/edit departments, clinical capabilities, and head of department details.
* **Inquiry & Ticket Management**: Real-time inbox for general inquiries, admission requests, surgery quotes, and complaints with internal staff notes.
* **Diagnostic Catalog & Report Upload**: Upload PDF reports tagged to patient phone/booking reference with automatic patient notification triggers.
* **Content Management System (CMS)**: Post announcements, edit FAQs, update visiting hours, manage career openings.
* **Security & Audit Logs**: Immutable audit log of staff logins, patient record accesses, and appointment cancellations.

#### Module E: Unified WhatsApp Automation
* **Preserve Proven Logic**: Retain `BotEngine` from `HIRAMANI-MEDICONNECT` including the bilingual welcome message and 7-option menu.
* **Trilingual Capability**: Expand conversational flow to fully support Bengali, English, and Hindi.
* **Cloud API Integration**: Direct integration with Meta WhatsApp Business Platform Graph API v21.0.
* **Single Booking Engine**: WhatsApp appointment bookings commit directly to the shared Supabase PostgreSQL database, triggering instant calendar sync across web and reception portals.

#### Module F: AI-Powered Hospital Information Assistant
* **Verified Knowledge Base**: Answers patient questions strictly based on approved hospital data (doctor timings, fees, test preps, hospital policies).
* **Zero Medical Hallucination**: Guardrails preventing symptom diagnosis, treatment recommendations, or drug prescriptions.
* **Human Escalation**: Seamlessly converts complex or unanswered queries into categorized support tickets for hospital reception.
* **Trilingual Processing**: Converses fluently in Bengali, English, and Hindi.

---

### 5. Architectural Non-Negotiables

1. **No Data Silos**: One PostgreSQL database serves the public website, patient portal, staff portal, and WhatsApp bot.
2. **Codebase Cohesion**: Modern Next.js App Router monorepo architecture avoiding unnecessary microservice complexity.
3. **Defensive Security**: Row Level Security (RLS) at the database layer, encrypted storage with time-limited signed URLs for diagnostic reports, and HMAC-SHA256 verification for incoming Meta webhooks.
4. **No Placeholder Content**: No Lorem Ipsum, no unverified doctor rosters, no dummy telephone numbers in production code. Any unverified hospital data is explicitly quarantined in `HOSPITAL_INFORMATION_CHECKLIST.md`.

