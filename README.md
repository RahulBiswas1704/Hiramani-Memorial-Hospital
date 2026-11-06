# 🏥 Hiramani Memorial Hospital — Complete Digital Healthcare Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20%26%20Storage-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Tests-43%20Passing-brightgreen?logo=vitest)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

A modern, production-grade digital healthcare platform engineered for **Hiramani Memorial Hospital**, Krishnanagar, Nadia, West Bengal. This platform unifies the public hospital web presence, multilingual patient communication, doctor scheduling, diagnostic test bookings, WhatsApp automated healthcare bot (MediConnect), and hospital administration ERP into a cohesive, secure ecosystem.

---

## 📍 Hospital Identity & Verified Contact Information

*Verified and confirmed by Hiramani Memorial Hospital administration:*

- **Legal Entity:** Hiramani Memorial Hospital
- **Postal Address:** 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal, PIN - 741101, India
- **Primary Reception & OPD Booking:** `+91 78729 57300`
- **24x7 Emergency & Casualty Desk:** `+91 75010 74392`
- **Helpline & Ambulance Dispatch:** `+91 62945 45225`
- **Official Administrative Email:** `info@hiramani.co.in`
- **Official Domain:** [https://www.hiramani.co.in](https://www.hiramani.co.in)
- **Clinical Accreditation:** Registered under the West Bengal Clinical Establishments Act

---

## 🌟 Key Platform Modules

### 1. Public Hospital Website & Responsive Healthcare UI/UX
- **Modern Homepage (`/`):** 10 clinical sections covering emergency care, specialty quick-access, consultant finder, in-house pathology, preventive checkup packages, and transparent tariff disclosures.
- **Stateful Multilingual Engine:** Full seamless language switching between **English**, **Bengali (`বাংলা`)**, and **Hindi (`हिन्दी`)** powered by React Context without flickering or layout shifts.
- **Consultant Specialist Directory (`/doctors` & `/doctors/[id]`):** Searchable by doctor name, clinical specialty, and OPD days. Individual doctor profiles display medical qualifications, chamber number, and verified consultation fees.
- **Clinical Departments (`/departments` & `/departments/[slug]`):** Dedicated pages for 15+ specialties (Cardiology, General Medicine, Orthopaedics, Dermatology, Paediatrics, Gynaecology & Obstetrics, ENT, etc.).
- **Diagnostics & Lab Investigations (`/diagnostics`):** Full catalog of in-house pathology, radiology, digital X-Ray, 2D Echo, and USG scans with fasting instructions, turnaround times, and pricing.
- **Preventive Health Packages (`/packages`):** Tiered wellness checkups (Basic Wellness, Comprehensive Cardiac, Senior Citizen Care, Executive Health) with itemized test lists.
- **Patient Inpatient Guide (`/patient-info`):** Comprehensive guide on admission procedures, visitor guidelines, ICU protocols, discharge workflows, and patient charter of rights.
- **Cashless Mediclaim & TPA Desk (`/insurance`):** Step-by-step pre-authorization guide, empaneled TPA directory, and clear advisories on non-empaneled cashless policies.
- **Contact & Krishnanagar Transit Guide (`/contact`):** Interactive map embed, click-to-call hotlines, driving instructions from Krishnanagar City Junction (2.5 km) and NH-12, and integrated patient enquiry ticket creation.

### 2. WhatsApp Healthcare Automation (MediConnect)
- **WhatsApp Web & Cloud Integration:** Powered by Baileys multi-device protocol with QR-code dashboard pairing, automatic reconnection, and message session management.
- **Immediate Emergency Bypass:** Instant triage detection in English & Bengali (e.g., *"emergency"*, *"heart attack"*, *"বুকে ব্যথা"*, *"রক্তপাত"*) immediately routing patients to the 24x7 casualty desk (`+91 75010 74392`) and ambulance helpline (`+91 62945 45225`).
- **Interactive Multi-Step OPD Booking:** Real-time doctor selection, slot verification, booking confirmation, and WhatsApp ticket dispatch.
- **In-Browser WhatsApp Simulator (`/chat`):** Live simulator allowing hospital staff and patients to test the entire conversational flow directly from any browser.

### 3. Hospital Administration & Staff ERP Dashboard (`/dashboard`)
- **Executive Analytics:** Overview of daily OPD visits, confirmed appointments, pending queries, and bed occupancy metrics.
- **Appointment Roster (`/dashboard/appointments`):** Daily doctor chamber lists with check-in timestamps, status filters (Confirmed, Completed, Rescheduled, Cancelled), and search.
- **Doctor & Schedule Management (`/dashboard/doctors`):** Manage consultants, OPD chamber assignments, consultation fees, and weekly schedules.
- **Patient Enquiry CRM (`/dashboard/queries`):** Track enquiries submitted via website contact forms and WhatsApp, assign priority levels, and log internal clinical notes.
- **WhatsApp Device Hub (`/dashboard/whatsapp-web`):** Real-time WhatsApp connection status, QR code display, socket lifecycle monitor, and manual resync tools.

### 4. Data Security, Privacy & Compliance
- **DPDP Act 2023 & Clinical Establishment Act:** Zero fictional data policy. Private patient reports stored in segregated Supabase Storage buckets with strict Row-Level Security (RLS).
- **Audit-Logged Clinical Access:** All appointment modifications, cancellations, and doctor notes include strict timestamping and role-based permissions (`admin`, `staff`, `doctor`, `patient`).
- **Concurrency & Race-Condition Safe:** Atomic booking transactions prevent duplicate appointment slot bookings.

---

## 🏗️ Technical Architecture & Stack

```
HIRAMANI MEMORIAL HOSPITAL PLATFORM
├── src/
│   ├── app/                      # Next.js 14 App Router (47 compiled routes)
│   │   ├── (public)/             # Public pages (/, /about, /doctors, /contact, etc.)
│   │   ├── dashboard/            # Role-protected Admin & Staff ERP
│   │   ├── api/                  # REST API routes (Appointments, Doctors, Bot, Webhook)
│   │   └── layout.tsx            # Global metadata, Schema.org JSON-LD, Fonts
│   ├── components/               # Modular UI Components
│   │   ├── layout/               # HospitalNavbar, HospitalFooter, LanguageSwitcher
│   │   ├── home/                 # Hero, QuickAccess, Specialties, TrustSignals
│   │   ├── booking/              # QuickBookingClient, SlotPicker
│   │   ├── chat/                 # WhatsAppSimulator, FloatingChatButton
│   │   └── dashboard/            # Sidebar, AnalyticsCards, AppointmentTable
│   ├── lib/                      # Core Business Logic & Repositories
│   │   ├── db/repo.ts            # Unified Database Repository (Supabase/Local)
│   │   ├── bot/engine.ts         # Conversational WhatsApp Bot State Machine
│   │   ├── whatsapp/             # Baileys Socket Client & Webhook Service
│   │   └── i18n/                 # English, Bengali & Hindi Translation Engine
│   └── types/                    # Enterprise TypeScript Definitions
├── supabase/                     # PostgreSQL Migrations & RLS Policies
│   └── migrations/               # Additive schema expansions
└── docs/                         # Architecture, Security, Roadmap & Audit Docs
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.17+ or v20+
- **Package Manager:** npm or yarn
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RahulBiswas1704/Hiramani-Memorial-Hospital.git
   cd Hiramani-Memorial-Hospital
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Fill in your Supabase project credentials and WhatsApp Business configuration.*

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Execute Test Suites:**
   ```bash
   npm run test
   ```

6. **Production Build:**
   ```bash
   npm run build
   ```

---

## 🧪 Verification & Test Suite

The repository includes comprehensive automated test coverage via Vitest:

| Test Suite | Tests | Purpose | Status |
| :--- | :---: | :--- | :---: |
| `src/__tests__/bot.test.ts` | 21 | Emergency keyword triage, menu navigation, isolation | ✅ **Passed** |
| `src/__tests__/booking.test.ts` | 11 | Slot reservation, double-booking prevention, concurrency | ✅ **Passed** |
| `src/__tests__/public-routes.test.ts` | 8 | Public website directories, pricing, enquiry tickets | ✅ **Passed** |
| `src/__tests__/webhook.test.ts` | 3 | WhatsApp webhook signatures and message dispatches | ✅ **Passed** |

---

## 📄 Documentation Reference

Detailed architectural and regulatory documentation is maintained in the root and `/docs`:
- `SYSTEM_ARCHITECTURE.md`: Complete architectural blueprint and data flow models.
- `SECURITY_PLAN.md`: DPDP Act 2023, data encryption, and RLS specifications.
- `FEATURE_ROADMAP.md`: Multi-phase execution roadmap from research to full launch.
- `CONTENT_VERIFICATION_CHECKLIST.md`: Clinical data verification status and source audit trail.

---

## 🔒 License & Copyright

Copyright © 2026 **Hiramani Memorial Hospital**. All rights reserved.  
Unauthorized copying, modification, distribution, or reproduction of this software via any medium is strictly prohibited.
