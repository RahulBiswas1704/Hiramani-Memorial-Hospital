# System Architecture Specification
## Hiramani Memorial Hospital: Unified Digital Healthcare Platform

---

### 1. Architectural Principles & System Vision

The Hiramani Memorial Hospital Digital Healthcare Platform is designed as a **unified, high-reliability healthcare system** that connects patients, clinical specialists, administrative staff, and automated communication channels.

```
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       PATIENT & PUBLIC CHANNELS                                   │
│                                                                                                   │
│     ┌────────────────────────┐      ┌────────────────────────┐      ┌───────────────────────┐     │
│     │  Public Hospital Web   │      │  Patient Health Portal │      │ WhatsApp Cloud Bot    │     │
│     │   (Responsive UI)      │      │  (Self-Service / Auth) │      │  (Trilingual / 24x7)  │     │
│     └───────────┬────────────┘      └───────────┬────────────┘      └───────────┬───────────┘     │
└─────────────────┼───────────────────────────────┼───────────────────────────────┼─────────────────┘
                  │                               │                               │
                  ▼                               ▼                               ▼
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                APPLICATION & API ORCHESTRATION LAYER                              │
│                                      (Next.js App Router)                                         │
│                                                                                                   │
│  ┌───────────────────────────────┐  ┌──────────────────────────────┐  ┌────────────────────────┐  │
│  │ Route Group: (public)         │  │ Route Group: (patient)       │  │ Route Group: (admin)   │  │
│  │ • Home, About, Doctors        │  │ • Auth, Profile, History     │  │ • Doctors, Depts, Roster│ │
│  │ • Diagnostics, Packages, Book │  │ • Report Vault, Inquiries    │  │ • Appointments, CMS    │  │
│  └──────────────┬────────────────┘  └──────────────┬───────────────┘  └───────────┬────────────┘  │
│                 │                                  │                              │               │
│  ┌──────────────┴──────────────────────────────────┴──────────────────────────────┴────────────┐  │
│  │                                  Shared Services & Business Logic                           │  │
│  │  • Appointment Booking Engine (Atomic Reservation & Slot Generator)                         │  │
│  │  • Conversational Bot Engine (Trilingual State Machine: Bengali / English / Hindi)          │  │
│  │  • AI Hospital Assistant (RAG Knowledge Engine with Clinical Safety Guardrails)             │  │
│  │  • Diagnostic Report Service (Encrypted Upload, Signing & Notification Dispatcher)          │  │
│  └──────────────────────────────────────────────┬──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┼─────────────────────────────────────────────────┘
                                                  │
                                                  ▼
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     DATA & INFRASTRUCTURE LAYER                                   │
│                                                                                                   │
│  ┌──────────────────────────────────────────────┐    ┌─────────────────────────────────────────┐  │
│  │ Supabase PostgreSQL (Managed Relational DB)  │    │ Supabase Private Storage                │  │
│  │ • Multi-role Row Level Security (RLS)        │    │ • Encrypted Diagnostic Report PDF Vault │  │
│  │ • Double-Booking Prevention Unique Indexes   │    │ • Time-Limited Signed URLs (HMAC Token) │  │
│  │ • Automated Transaction Rollbacks            │    │ • Zero Public Access to Patient Records │  │
│  └──────────────────────────────────────────────┘    └─────────────────────────────────────────┘  │
│                                                                                                   │
│  ┌──────────────────────────────────────────────┐    ┌─────────────────────────────────────────┐  │
│  │ Meta WhatsApp Business Platform (Cloud API)  │    │ AI Knowledge Base & Retrieval (RAG)     │  │
│  │ • Graph API v21.0 Webhook Delivery           │    │ • Verified Hospital Operational Facts   │  │
│  │ • HMAC SHA-256 Webhook Verification          │    │ • Strict Medical Non-Diagnosis Safety   │  │
│  └──────────────────────────────────────────────┘    └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Monorepo vs. Microservices Architecture Decision

**Architectural Decision**: A **Single Unified Next.js Application (Modular Monolith)** is selected.

#### Rationalization:
1. **Single Source of Truth**: Operating a separate Next.js app for the website and a separate app for WhatsApp would require distributed transaction coordination, duplicate database connections, or message broker overhead (e.g., Kafka/RabbitMQ), adding high operational complexity and failure modes.
2. **Shared Domain Entities**: The exact same TypeScript types (`Doctor`, `Department`, `Appointment`, `TimeSlot`) and data access repositories (`HospitalRepo`) are shared across Web Booking, WhatsApp Webhook, Admin Portal, and AI Assistant.
3. **Simplicity & Zero Cold-Start Synchronization**: An appointment booked on WhatsApp instantly reflects on the hospital reception dashboard and blocks the web calendar slot within milliseconds without asynchronous polling or sync jobs.

---

### 3. Application Topology & Route Group Layout

Next.js App Router Route Groups enable clear separation of concerns with isolated layouts:

```
src/app/
├── (public)/                       # Public Hospital Website Layout
│   ├── page.tsx                    # Modern Homepage
│   ├── about/page.tsx              # About Hospital, History, Leadership, Vision
│   ├── doctors/
│   │   ├── page.tsx                # Searchable Doctor Directory & Filter
│   │   └── [id]/page.tsx           # Doctor Profile, Credentials, OPD Schedule
│   ├── departments/
│   │   ├── page.tsx                # All Medical & Surgical Specialties
│   │   └── [slug]/page.tsx         # Department Details, Equipment, Specialists
│   ├── services/page.tsx           # Emergency, ICU, OT, Dialysis, Blood Bank
│   ├── diagnostics/
│   │   ├── page.tsx                # Diagnostic Services, Pathology & Radiology
│   │   └── [testId]/page.tsx       # Test Details, Fasting Requirements, Pricing
│   ├── packages/page.tsx           # Preventive Health Checkup Packages
│   ├── book/page.tsx               # Online Appointment Booking Wizard
│   ├── patient-info/page.tsx       # Admission Guide, Visiting Hours, Patient Rights
│   ├── insurance/page.tsx          # Cashless Mediclaim, TPAs & Govt Schemes
│   ├── news/
│   │   ├── page.tsx                # Health Advisories & Hospital Announcements
│   │   └── [slug]/page.tsx         # Article Reader (Dengue, Health Tips)
│   ├── careers/page.tsx            # Job Openings & Application Form
│   └── contact/page.tsx            # Verified Address, Map, Emergency Hotlines
│
├── (patient)/                      # Patient Health Portal Layout
│   ├── portal/
│   │   ├── login/page.tsx          # Mobile OTP / Password Authentication
│   │   ├── register/page.tsx       # Patient Registration
│   │   ├── dashboard/page.tsx      # Patient Overview & Upcoming Appointments
│   │   ├── appointments/page.tsx   # Booking History, Reschedule & Cancellation
│   │   ├── reports/page.tsx        # Diagnostic Lab Reports & Secure PDF Viewer
│   │   ├── queries/page.tsx        # Inquiries & Ticket Status Tracking
│   │   └── profile/page.tsx        # Demographics & Emergency Contacts
│   └── layout.tsx                  # Patient Authenticated Shell
│
├── (staff)/                        # Doctor & Clinical Staff Portal Layout
│   ├── staff/login/page.tsx        # Role-Based Staff Authentication
│   ├── doctor/
│   │   ├── schedule/page.tsx       # Weekly OPD Calendar & Shift Timings
│   │   ├── queue/page.tsx          # Live Daily Patient Queue (Arrived / Attended)
│   │   └── availability/page.tsx   # Leave Application & Emergency Time-Off
│   └── layout.tsx                  # Staff Clinical Shell
│
├── (admin)/                        # Hospital Admin ERP Dashboard Layout
│   ├── dashboard/
│   │   ├── page.tsx                # Executive KPI Analytics & Daily Overview
│   │   ├── doctors/page.tsx        # Doctor CRUD, Slot & Fee Management
│   │   ├── departments/page.tsx    # Department CRUD & Specialty Mapping
│   │   ├── appointments/page.tsx   # Unified Appointment Calendar & Roster
│   │   ├── queries/page.tsx        # WhatsApp & Web Inquiry Ticketing Hub
│   │   ├── diagnostics/page.tsx    # Test Catalog & Health Package Manager
│   │   ├── reports/page.tsx        # PDF Report Upload & Patient Assignment
│   │   ├── staff/page.tsx          # Staff Account Management & Role Assignment
│   │   ├── cms/page.tsx            # News, Announcements & FAQ Manager
│   │   └── settings/page.tsx       # Hospital Information & WhatsApp Settings
│   └── layout.tsx                  # Enterprise Admin Shell (Sidebar, Header)
│
└── api/                            # Backend Server-Side API Handlers
    ├── appointments/route.ts       # Unified Appointment CRUD & Booking
    ├── doctors/
    │   ├── route.ts                # Doctor Directory API
    │   └── slots/route.ts          # Real-time Available Slot Calculator
    ├── departments/route.ts        # Department Directory API
    ├── diagnostics/
    │   ├── tests/route.ts          # Test Catalog & Pricing API
    │   ├── packages/route.ts       # Health Packages API
    │   └── reports/
    │       ├── upload/route.ts     # Staff Report Upload Handler
    │       └── download/route.ts   # Signed URL Generator with Patient Verification
    ├── patient/
    │   ├── auth/route.ts           # Patient OTP Verification
    │   └── profile/route.ts        # Patient Profile Management
    ├── whatsapp/
    │   └── webhook/route.ts        # Meta WhatsApp Cloud API Webhook
    ├── ai/
    │   └── chat/route.ts           # AI Hospital Assistant RAG Handler
    └── queries/route.ts            # Support Ticket Management
```

---

### 4. Appointment Booking & Concurrency Engine

The unified booking engine prevents double-booking across all channels:

```
                  ┌────────────────────────┐      ┌────────────────────────┐
                  │ Web Booking Form       │      │ WhatsApp Bot / Cloud   │
                  └───────────┬────────────┘      └───────────┬────────────┘
                              │                               │
                              ▼                               ▼
                 ┌─────────────────────────────────────────────────────────┐
                 │       Unified Appointment Booking Controller            │
                 │              (/api/appointments/route.ts)               │
                 └────────────────────────────┬────────────────────────────┘
                                              │
                      ┌───────────────────────┴────────────────────────┐
                      ▼                                                ▼
         ┌─────────────────────────┐                      ┌─────────────────────────┐
         │ 1. Input Sanitization   │                      │ 2. Advance Booking Rule │
         │    & Phone Normalization│                      │    (e.g., <= 14 Days)   │
         └────────────┬────────────┘                      └────────────┬────────────┘
                      │                                                │
                      └───────────────────────┬────────────────────────┘
                                              │
                                              ▼
                             ┌─────────────────────────────────┐
                             │ 3. Check Doctor Time-Off/Leave  │
                             │    (public.doctor_time_off)     │
                             └────────────────┬────────────────┘
                                              │ (If Doctor Available)
                                              ▼
                             ┌─────────────────────────────────┐
                             │ 4. Atomic PostgreSQL Insert     │
                             │    with Unique Slot Index Check │
                             └────────────────┬────────────────┘
                                              │
                                              ├─── [Success] ───► Commit & Return Reference (APT-YYYYMMDD-XXXX)
                                              │                   Trigger WhatsApp / SMS Confirmation
                                              │
                                              └─── [Conflict] ──► Rollback (HTTP 409 Conflict)
                                                                  "Slot already reserved. Please select another time."
```

#### Database Partial Unique Constraint:
```sql
CREATE UNIQUE INDEX idx_appointments_no_double_booking 
ON public.appointments(doctor_id, appointment_date, start_time) 
WHERE status NOT IN ('cancelled');
```
* Even under high traffic, this ensures two requests attempting to book the same slot at the same second cannot both succeed.

---

### 5. WhatsApp Cloud API Integration Architecture

To ensure enterprise reliability, the platform standardizes exclusively on **Meta's Official WhatsApp Business Platform (Cloud API v21.0)**:

```
┌────────────────────────┐
│ Meta WhatsApp Cloud    │
│ Servers (Facebook/Meta)│
└───────────┬────────────┘
            │
            │ HTTPS POST (Inbound Patient Message)
            │ Header: x-hub-signature-256: sha256=<HMAC>
            ▼
┌────────────────────────────────────────────────────────┐
│ Next.js Webhook Endpoint                               │
│ (/api/whatsapp/webhook/route.ts)                       │
├────────────────────────────────────────────────────────┤
│ 1. Webhook Signature Verification                      │
│    crypto.timingSafeEqual(calculated, received)        │
│ 2. Fast 200 OK Response (Within 2.5s to prevent retries│
│ 3. Asynchronous Bot Execution:                         │
│    BotEngine.processMessage(phone, userMessage)        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ BotEngine State Machine (Trilingual)                   │
├────────────────────────────────────────────────────────┤
│ • Emergency Keyword Interceptor (Bypass to emergency)  │
│ • State Session Loader (Supabase patient_conversations)│
│ • Menu Parser (1-7 numbered options & natural intent)  │
│ • Dynamic Slot Query (HospitalRepo.getAvailableSlots)  │
│ • Ticket Generation (Support & Human Handover)         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ Outbound Meta Graph API v21.0 Client                   │
│ (https://graph.facebook.com/v21.0/<phone_id>/messages) │
├────────────────────────────────────────────────────────┤
│ • Interactive List Messages (Departments, Doctors)     │
│ • Quick Reply Action Buttons (Dates, Confirm/Cancel)   │
│ • Formatted Multilingual Text Messages                 │
└────────────────────────────────────────────────────────┘
```

---

### 6. AI Hospital Information Assistant Architecture

```
                               ┌───────────────────────────┐
                               │ Patient Prompt (Web / WA) │
                               │ (Bengali, English, Hindi) │
                               └─────────────┬─────────────┘
                                             │
                                             ▼
                               ┌───────────────────────────┐
                               │ Clinical Safety Boundary  │
                               │ Classifier                │
                               └─────────────┬─────────────┘
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             │                                                               │
      [Medical Diagnosis / Prescription]                              [Hospital Logistics / Info]
             │                                                               │
             ▼                                                               ▼
┌───────────────────────────┐                                 ┌─────────────────────────────┐
│ Immediate Safety Refusal  │                                 │ Knowledge Base Retriever    │
│ "I cannot diagnose or     │                                 │ (Hospital verified data:    │
│ prescribe. Please consult │                                 │ timings, fees, tests, maps) │
│ our specialists or visit  │                                 └──────────────┬──────────────┘
│ the 24x7 emergency desk." │                                                │
└───────────────────────────┘                                                ▼
                                                              ┌─────────────────────────────┐
                                                              │ Grounded Trilingual         │
                                                              │ Response Generation         │
                                                              │ + Permanent Emergency Banner│
                                                              └──────────────┬──────────────┘
                                                                             │
                                                              [Unresolved / Complex Enquiry]
                                                                             │
                                                                             ▼
                                                              ┌─────────────────────────────┐
                                                              │ Escalate & Create Support   │
                                                              │ Ticket for Reception Desk   │
                                                              └─────────────────────────────┘
```

#### Guardrail Principles:
1. **Zero Hallucination Grounding**: The assistant answers ONLY from verified hospital facts stored in the hospital database.
2. **Absolute Non-Prescription Policy**: Any query asking for drug dosages, symptom interpretations, or medical treatments is politely redirected to an in-person doctor consultation.
3. **Mandatory Emergency Disclaimer**: Every output features:
   > *"Urgent medical emergency? Do not wait for a chat response. Call our 24/7 Emergency Hotline immediately at +91 9477589578."*

---

### 7. Private Diagnostic Document Storage Architecture

Patient reports (Pathology blood tests, X-Ray scans, CT reports, ECGs) constitute sensitive personal health information and must be protected:

```
┌────────────────────────────────────────────────────────────────────────────────┐
│ UPLOAD WORKFLOW (Lab Technician / Hospital Admin)                              │
│                                                                                │
│ Lab Technician Dashboard                                                       │
│   └── Uploads PDF (Blood_Test_Report.pdf)                                      │
│   └── Enters Patient ID / Phone & Selects Test Type                            │
│   └── POST /api/diagnostics/reports/upload                                     │
│         └── Server-side validation (MIME type application/pdf, max 10MB)       │
│         └── Writes file to private Supabase Storage bucket:                    │
│             `patient-reports/{hospital_id}/{patient_id}/{report_uuid}.pdf`     │
│         └── Inserts record into `public.diagnostic_reports`                    │
│         └── Triggers WhatsApp notification to patient with notification link   │
└────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────┐
│ DOWNLOAD WORKFLOW (Authenticated Patient)                                      │
│                                                                                │
│ Patient logs into Portal (/portal/reports)                                     │
│   └── Clicks "Download Report"                                                 │
│   └── GET /api/diagnostics/reports/download?reportId=<uuid>                    │
│         └── Verifies session: Caller auth.uid === report.patient_id            │
│         └── Generates time-limited signed HMAC URL (valid for 5 minutes)       │
│         └── Logs download event in `public.audit_logs`                         │
│         └── Client receives secure download URL directly from storage          │
└────────────────────────────────────────────────────────────────────────────────┘
```
* **Zero Public Buckets**: The storage bucket has zero public read permissions. Files are inaccessible without a cryptographically signed signature.

---

### 8. Recommended Project Folder Structure

```
Hiramani Memorial Hospital/
├── docs/                                  # Architectural & Implementation Docs
│   ├── PROJECT_OVERVIEW.md
│   ├── EXISTING_WEBSITE_AUDIT.md
│   ├── MEDICONNECT_AUDIT.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── DATABASE_PLAN.md
│   ├── FEATURE_ROADMAP.md
│   ├── SECURITY_PLAN.md
│   └── HOSPITAL_INFORMATION_CHECKLIST.md
│
├── public/                                # Public Static Assets
│   ├── brand/                             # Hospital logos, badges, icons
│   ├── images/                            # Department, facility, doctor photos
│   └── icons/                             # Healthcare custom SVG icons
│
├── src/
│   ├── app/                               # Next.js App Router
│   │   ├── (public)/                      # Public Hospital Website
│   │   │   ├── page.tsx                   # Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── doctors/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── departments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── diagnostics/page.tsx
│   │   │   ├── packages/page.tsx
│   │   │   ├── book/page.tsx
│   │   │   ├── patient-info/page.tsx
│   │   │   ├── insurance/page.tsx
│   │   │   ├── news/page.tsx
│   │   │   ├── careers/page.tsx
│   │   │   └── contact/page.tsx
│   │   │
│   │   ├── (patient)/                     # Patient Portal
│   │   │   ├── portal/
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── appointments/page.tsx
│   │   │   │   ├── reports/page.tsx
│   │   │   │   └── profile/page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (doctor)/                      # Clinical Staff Portal
│   │   │   └── doctor/
│   │   │       ├── schedule/page.tsx
│   │   │       └── queue/page.tsx
│   │   │
│   │   ├── (admin)/                       # Hospital ERP Admin Dashboard
│   │   │   └── dashboard/
│   │   │       ├── page.tsx               # Analytics Overview
│   │   │       ├── doctors/page.tsx
│   │   │       ├── departments/page.tsx
│   │   │       ├── appointments/page.tsx
│   │   │       ├── queries/page.tsx
│   │   │       ├── diagnostics/page.tsx
│   │   │       ├── reports/page.tsx
│   │   │       ├── staff/page.tsx
│   │   │       ├── cms/page.tsx
│   │   │       └── settings/page.tsx
│   │   │
│   │   ├── api/                           # Backend API Endpoints
│   │   │   ├── appointments/route.ts
│   │   │   ├── doctors/route.ts
│   │   │   ├── departments/route.ts
│   │   │   ├── diagnostics/route.ts
│   │   │   ├── whatsapp/webhook/route.ts
│   │   │   ├── ai/chat/route.ts
│   │   │   └── patient/auth/route.ts
│   │   │
│   │   ├── globals.css
│   │   └── layout.tsx                     # Root App Shell
│   │
│   ├── components/                        # Reusable UI Component Library
│   │   ├── ui/                            # Base shadcn/ui components (Button, Dialog, etc.)
│   │   ├── public/                        # Website components (Navbar, Hero, DoctorCard)
│   │   ├── patient/                       # Patient Portal components (ReportCard, etc.)
│   │   ├── admin/                         # Admin ERP components (StatsCard, Table, etc.)
│   │   ├── booking/                       # Multi-step Appointment Booking Wizard
│   │   ├── chat/                          # WhatsApp Simulator & AI Chat Widget
│   │   └── layout/                        # Header, Footer, EmergencyBar
│   │
│   ├── lib/                               # Core Business Logic & Infrastructure
│   │   ├── bot/                           # Trilingual Bot Engine (from MediConnect)
│   │   │   ├── engine.ts                  # State Machine & Intent Matcher
│   │   │   ├── prompts.ts                 # Bengali / English / Hindi strings
│   │   │   └── safety.ts                  # Emergency bypass & clinical guardrails
│   │   ├── db/                            # Database Repository Layer
│   │   │   └── repo.ts                    # Concurrency-safe Supabase PostgreSQL queries
│   │   ├── whatsapp/                      # Meta Cloud API Client
│   │   │   └── service.ts                 # Graph API v21.0 & Webhook verification
│   │   ├── ai/                            # AI Assistant Service
│   │   │   └── assistant.ts               # RAG Grounding & Medical Guardrails
│   │   ├── supabase/                      # Supabase Clients
│   │   │   ├── client.ts                  # Public Client (Anon key)
│   │   │   ├── server.ts                  # Server Client (Cookies)
│   │   │   └── admin.ts                   # Admin Client (Service Role Key)
│   │   └── utils/                         # Date helpers, phone normalizers, validators
│   │
│   └── types/                             # Authoritative TypeScript Definitions
│       ├── database.ts                    # Supabase Auto-generated Database Types
│       └── index.ts                       # Clinical, Booking, Bot, and User types
│
├── supabase/                              # Database Migrations & Seeds
│   ├── migrations/                        # Version-controlled SQL migrations
│   └── seed.sql                           # Verified initial hospital data
│
├── .env.example                           # Required Environment Variables Template
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

