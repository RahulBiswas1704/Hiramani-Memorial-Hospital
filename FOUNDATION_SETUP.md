# Hiramani Memorial Hospital — Foundation Setup Report
**Phase 1: Foundation and Unified Database Setup**
**Date:** November 2026  
**Status:** Completed & Verified  

---

## 1. Executive Summary

Phase 1 establishes the unified technical foundation for **Hiramani Memorial Hospital's** complete digital healthcare platform. The project unifies two previously fragmented systems into a single, high-performance, enterprise-grade architecture:

1. **The Public Hospital Website** (previously an outdated, unmaintained CodeIgniter 3 PHP site at `hiramani.co.in` suffering from broken endpoints and dummy copy).
2. **The WhatsApp Automation System** (`HIRAMANI-MEDICONNECT`, a proven Next.js 14 application with a 2,187-line bilingual bot engine, Meta WhatsApp Cloud API integration, and administrative scheduling tools).

Instead of creating disparate silos or redundant databases, Phase 1 creates a **single Next.js 14 App Router monorepo** backed by **Supabase PostgreSQL**, **Supabase Auth**, and private **Supabase Storage**. All channels—the public website, online appointment booking, patient portal, doctor schedules, diagnostic reports, and WhatsApp automation—now query a single authoritative database layer with zero risk of duplicate bookings or conflicting doctor availability.

---

## 2. Unification Architecture

```
                    ┌────────────────────────────────────────────────────────┐
                    │               PATIENT & PUBLIC CHANNELS                │
                    ├────────────────────────┬───────────────────────────────┤
                    │  Public Web Platform   │  WhatsApp Business Cloud API  │
                    │ (Next.js 14 App Router)│  (Bilingual Bot Engine v21.0) │
                    └───────────┬────────────┴───────────────┬───────────────┘
                                │                            │
                                ▼                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          UNIFIED NEXT.JS 14 APP ROUTER PLATFORM                         │
├────────────────────────┬───────────────────────────┬───────────────────────────────────┤
│    Public Hospital     │      Patient Portal       │      Doctor & Admin Portal        │
│  - Doctor Directory    │  - Self-Service Booking   │  - OPD Slot Management            │
│  - Department Showcase │  - Diagnostic Reports     │  - Patient Queue & Clinical Notes │
│  - Diagnostics Catalog │  - Appointment History    │  - CRM Query Resolution           │
│  - Health Packages     │  - WhatsApp Sync Profile  │  - Audit Logs & Hospital Settings │
├────────────────────────┴───────────────────────────┴───────────────────────────────────┤
│                               UNIFIED REPOSITORY LAYER                                 │
│                                 `src/lib/db/repo.ts`                                   │
│            (Atomic Slot Reservation • Double-Booking Guard • Concurrency Safe)          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                       SHARED DATA & STORAGE INFRASTRUCTURE                             │
│                  - Supabase PostgreSQL (Additive Schema Expansion)                     │
│                  - Row Level Security (RLS) on all 18 tables                           │
│                  - Private Supabase Storage Bucket ('patient-reports')                 │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key Unification Principles:
- **Zero Disruption to Existing WhatsApp Automation:** The existing 7-option bilingual WhatsApp bot menu (Bengali/English/Hindi) and Meta Cloud API v21.0 webhook handlers remain completely intact and functional.
- **Single Source of Truth:** Appointments booked via WhatsApp instantly occupy slots on the web portal, and appointments booked on the website immediately reflect in hospital receptionist queues and doctor calendars.
- **Graceful Dual-Mode Operation:** The platform runs in full live production mode with Supabase cloud credentials, and seamlessly operates in zero-dependency local demo mode with deterministic test fixtures when external credentials are not supplied.

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.24` | Server-side rendering, API routes, edge-ready middleware |
| **Language** | TypeScript | `^5.6.3` | Strict type safety across clinical and operational domain entities |
| **Styling** | Tailwind CSS | `^3.4.15` | Responsive healthcare design system with custom hospital palette |
| **Icons** | Lucide React | `^0.460.0` | Accessible, medical-grade UI iconography |
| **Database** | PostgreSQL / Supabase | PostgreSQL 15 | Relational data integrity, ACID transactions, RLS |
| **Authentication** | Supabase Auth | `^2.46.1` | Phone OTP authentication & role-based session management |
| **Storage** | Supabase Storage | S3-Compatible | Private encrypted bucket for diagnostic test results |
| **WhatsApp Engine** | Meta Graph API | `v21.0` | Official WhatsApp Cloud API with multi-language interactive menus |
| **Testing** | Vitest | `^2.1.8` | High-speed unit and integration testing suite |

---

## 4. Integration of Legacy MediConnect Assets

The existing `HIRAMANI-MEDICONNECT` repository was thoroughly audited and preserved in `legacy-mediconnect/`. Key assets successfully integrated into the root platform include:

1. **Bilingual Bot Engine (`src/lib/bot/engine.ts`)**:
   - Preserved all 2,187 lines of battle-tested conversational logic.
   - Retained the complete 7-option main menu with dual Bengali/English prompts:
     - 1️⃣ Doctor & Appointment (`ডাক্তার ও অ্যাপয়েন্টমেন্ট`)
     - 2️⃣ Departments & Services (`বিভাগ ও পরিষেবাসমূহ`)
     - 3️⃣ Diagnostic Tests & Reports (`ডায়াগনস্টিক পরীক্ষা ও রিপোর্ট`)
     - 4️⃣ Admission & Surgery Enquiry (`ভর্তি ও অস্ত্রোপচার অনুসন্ধান`)
     - 5️⃣ Hospital Location & Contact (`হাসপাতালের ঠিকানা ও যোগাযোগ`)
     - 6️⃣ Billing & Insurance (`বিলিং ও স্বাস্থ্যবীমা`)
     - 7️⃣ Speak to Hospital Staff (`হাসপাতাল কর্মীদের সাথে কথা বলুন`)
2. **Meta Cloud API Service (`src/lib/whatsapp/service.ts`)**:
   - Production-ready webhook payload parsing, signature verification (`X-Hub-Signature-256`), interactive button messages, and list message delivery.
3. **Comprehensive Admin Dashboard (`src/app/dashboard/...`)**:
   - Integrated administrative views for Appointments, Department management, Doctor profiles, Patient queries CRM, FAQ editor, and Hospital settings.
4. **Automated Reminders API (`src/app/api/automations/reminders/route.ts`)**:
   - Scheduled cron endpoint for triggering WhatsApp 24-hour appointment reminder messages.
5. **Interactive WhatsApp Simulator (`src/components/chat/WhatsAppSimulator.tsx`)**:
   - Fully interactive web-based simulator allowing staff and developers to test bot conversational flows directly in the browser without sending live WhatsApp SMS charges.

---

## 5. Design System Foundations

The design system is established in `tailwind.config.js` and `src/app/globals.css`, adhering to the hospital's clinical identity:

### Color Palette
- **Canvas / Background:** Pure White (`#ffffff`) and Clinical Slate (`#f8fafc`, `#f1f5f9`).
- **Primary Healthcare Blue:**
  - Base: `#0e4a7b` (Deep Medical Navy)
  - Dark: `#0a3457`
  - Light: `#1d6fa5`
  - Subdued: `#e8f2f9`
- **Secondary Clinical Teal:**
  - Base: `#0d9488` (Teal 600)
  - Dark: `#0f766e`
  - Light: `#14b8a6`
  - Subdued: `#ccfbf1`
- **Status & Feedback:**
  - Success / Confirmed: `#16a34a` (Green 600)
  - Warning / Pending: `#eab308` (Yellow 500)
  - Destructive / Cancelled: `#dc2626` (Red 600)

### UI Component Primitives
The foundational primitives are implemented under `src/components/ui/` with strict TypeScript typings and accessible ARIA attributes:
- **`Button` (`src/components/ui/button.tsx`)**: Primary, secondary, outline, ghost, link, and destructive variants with loading spinners.
- **`Card` (`src/components/ui/card.tsx`)**: Clinical card layouts (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- **`Badge` (`src/components/ui/badge.tsx`)**: Semantic status tags for appointment statuses (`confirmed`, `pending`, `completed`, `cancelled`) and test turnaround times.
- **`Input` (`src/components/ui/input.tsx`)**: Accessible text, tel, date, and search inputs styled with healthcare blue focus rings.

---

## 6. Verification and Test Results

The platform foundation was subjected to automated verification suites:

### 1. TypeScript Strict Compile Check
```powershell
npx.cmd tsc --noEmit
```
- **Result:** `Exit code 0`. Zero type errors, full domain typing across clinical models.

### 2. Automated Test Suite (Vitest)
```powershell
npm.cmd run test
```
- **Result:** `3 passed (3 files), 35 passed (35 tests) in 1.63s`
  - `src/__tests__/webhook.test.ts` (3/3 tests passed): Meta WhatsApp webhook handshake, token verification, and payload digestion.
  - `src/__tests__/booking.test.ts` (11/11 tests passed): Double-booking prevention, atomic slot reservation, past date validation, and cancellation rules.
  - `src/__tests__/bot.test.ts` (21/21 tests passed): Conversational state machine, 7-menu branching, Bengali/English language switching, and emergency disclaimer triggers.

### 3. Production Build Compilation
```powershell
npm.cmd run build
```
- **Result:** `Compiled successfully in 14.8s`. Generated 31 static and dynamic routes.

---

## 7. Next Steps for Phase 2

With the foundation, additive schema, private storage, and design system established, the platform is ready for **Phase 2: Public Hospital Website & Core Healthcare UI/UX**:
- Modern homepage with emergency banner, doctor finder, and department showcase.
- Full Doctor Directory with specialty filters and direct OPD booking.
- Diagnostic Tests & Health Packages public catalog with preparation guides.
- Bilingual language switcher (English / Bengali).

