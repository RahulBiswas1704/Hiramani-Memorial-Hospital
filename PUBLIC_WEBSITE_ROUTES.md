# Hiramani Memorial Hospital — Public Website Routes Inventory
**Phase:** Phase 2 Complete Public Website & Responsive Healthcare UI/UX  
**Framework:** Next.js 14 App Router  
**Generated Routes:** 44 Compiled Routes  

---

## 1. Route Topology Table

| Path | Rendering Type | Dynamic Params | Query Params Supported | Data Source | Purpose / Healthcare Functionality |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Static (ISR 60s) + Client | None | None | `HospitalRepo.getDoctors()`, `getDepartments()`, `getHealthPackages()`, `getDiagnosticTests()`, `getCMSAnnouncements()` | Main hospital landing page with 10 clinical sections, live doctor search, emergency alerts, and quick booking access. |
| `/about` | Static (SSG) | None | None | Static Clinical Content | Vision, mission, compassionate care values, hospital infrastructure (ICU, Modular OT, Lab), and Patient Charter. |
| `/doctors` | Static (ISR 60s) + Client | None | `?department_id=...` | `HospitalRepo.getDoctors()`, `HospitalRepo.getDepartments()` | Searchable doctor directory with real-time text search, department filtering, chamber info, and direct booking buttons. |
| `/doctors/[id]` | Dynamic (SSR) | `id` (Doctor UUID) | None | `HospitalRepo.getDoctorById(id)`, `HospitalRepo.getDoctorSchedules(id)` | Specialist clinical profile, degrees, room number, OPD fees, weekly consultation schedule, and direct booking CTA. |
| `/departments` | Static (ISR 60s) | None | None | `HospitalRepo.getDepartments()`, `HospitalRepo.getDoctors()` | Directory of clinical departments with medical icons, descriptions, and attending doctor counts. |
| `/departments/[slug]` | Dynamic (SSR) | `slug` (Code or URL slug) | None | `HospitalRepo.getDepartments()`, `HospitalRepo.getDoctors(deptId)` | Department profile: conditions evaluated, diagnostic procedures available, and attending consultant doctors. |
| `/diagnostics` | Static (ISR 60s) + Client | None | None | `HospitalRepo.getDiagnosticCategories()`, `HospitalRepo.getDiagnosticTests()` | Comprehensive investigation test catalog with search, category tabs, sample containers, fasting instructions, and pricing. |
| `/packages` | Static (ISR 60s) | None | None | `HospitalRepo.getHealthPackages()` | Preventive health checkup packages (Basic, Cardiac, Master Executive, Women's Wellness) with prep notes and booking CTAs. |
| `/patient-info` | Static (SSG) | None | None | Static Clinical Policies | Patient admission procedures (planned vs emergency casualty), visiting hours (11 AM - 1 PM, 5 PM - 7 PM), and room categories. |
| `/insurance` | Static (SSG) | None | None | Hospital TPA Matrix | Cashless hospitalization guide, empanelled insurance TPAs, Swasthya Sathi information, and pre-auth document checklist. |
| `/news` | Static (ISR 60s) | None | None | `HospitalRepo.getCMSAnnouncements()` | Hospital notices, dengue clinical guidelines, emergency fever alerts, and specialized Sunday clinic schedules. |
| `/careers` | Static (ISR 60s) | None | None | `HospitalRepo.getCMSCareers()` | Hospital job vacancies (ICU Staff Nurse, Medical Lab Technician, RMO) with qualifications, experience, and email application CTA. |
| `/contact` | Static + Client | None | None | `HospitalRepo.createQuery()`, `POST /api/queries` | Verified postal address, 24x7 emergency desk, Google Maps directions, and online patient enquiry form with tracking ticket. |
| `/book` | Dynamic (SSR) + Client | None | `?doctor_id=...`, `?department_id=...` | `HospitalRepo.getDoctors()`, `HospitalRepo.getDepartments()`, `/api/doctors/slots`, `POST /api/appointments` | Dedicated appointment booking page with live slot availability calculator, patient details form, and instant confirmation reference. |
| `/chat` | Static (Client) | None | None | `BotEngine`, `POST /api/chat` | Full-screen interactive web WhatsApp simulator testing the bilingual 7-menu hospital bot engine. |
| `/login` | Static (Client) | None | `?redirect=...` | Supabase Auth | Unified authentication gateway for hospital staff and registered patients. |
| `/forgot-password`| Static (Client) | None | None | Supabase Auth | Self-service password recovery flow. |
| `/sitemap.xml` | Server Route | None | None | Next.js Metadata Route | Search engine XML sitemap indexing all public URLs. |
| `/robots.txt` | Server Route | None | None | Next.js Metadata Route | Crawler access instructions allowing public pages and disallowing admin endpoints. |

---

## 2. Administrative & Operational Routes (Intact & Preserved)

The following 9 administrative ERP pages were fully preserved and tested:

- `/dashboard` — Hospital Analytics KPI Overview
- `/dashboard/appointments` — Outpatient Appointment Queue & Rescheduling Ledger
- `/dashboard/departments` — Department Management
- `/dashboard/doctors` — Doctor Profiles, OPD Days & Consultation Fees
- `/dashboard/faqs` — Hospital FAQ Content Manager
- `/dashboard/queries` — Patient CRM Support Inbox & Note Replies
- `/dashboard/settings` — Hospital System Configuration & Working Hours
- `/dashboard/staff` — Staff Account Roles & Permissions
- `/dashboard/whatsapp-web` — WhatsApp Cloud API Monitor

---

## 3. REST API Endpoints (Intact & Preserved)

- `GET /api/appointments` & `POST /api/appointments` — Appointment query & atomic slot reservation
- `GET /api/automations/reminders` — 24-hour appointment reminder cron
- `POST /api/chat` — WhatsApp bot engine chat simulator endpoint
- `GET /api/dashboard/stats` — Aggregated hospital KPI metrics
- `GET /api/departments` & `POST /api/departments` — Department catalog
- `GET /api/doctors` & `POST /api/doctors` & `PATCH /api/doctors` — Doctor management
- `GET /api/doctors/slots` — Real-time available slot calculator
- `GET /api/doctors/timeoff` & `POST /api/doctors/timeoff` — Doctor leave & blockout calendar
- `GET /api/faqs` — Hospital FAQs
- `GET /api/queries` & `POST /api/queries` — Patient CRM enquiries
- `GET /api/queries/[id]/notes` & `POST /api/queries/[id]/notes` — Query response notes
- `GET /api/settings` & `PUT /api/settings` — Hospital operational settings
- `GET /api/staff` — Staff accounts
- `GET /api/whatsapp/webhook` & `POST /api/whatsapp/webhook` — Meta WhatsApp Cloud API v21.0 webhook
- `GET /api/whatsapp/web-status` — Cloud API service status
- `GET /auth/callback` — Supabase Auth OAuth/OTP exchange handler

