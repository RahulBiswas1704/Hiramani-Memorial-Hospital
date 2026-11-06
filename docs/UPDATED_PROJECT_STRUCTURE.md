# Hiramani Memorial Hospital — Updated Project Structure
**Phase:** Phase 1 Foundation & Unified Database Setup  
**Date:** November 2026  
**Architecture:** Next.js 14 App Router Unified Healthcare Platform  

---

## 1. Directory Tree Overview

```
HIRAMANI MEMORIAL HOSPITAL/
├── .env.example                               # Environment configuration template
├── .eslintrc.json                             # ESLint rules and Next.js core web vitals
├── .gitignore                                 # Git ignore patterns (.env.local, .next, node_modules)
├── DATABASE_MIGRATION_REPORT.md               # Detailed schema expansion report
├── DATABASE_PLAN.md                           # Database design & migration roadmap
├── DATABASE_SECURITY_REPORT.md                # RLS & healthcare privacy report
├── ENVIRONMENT_SETUP.md                       # Environment variables & cloud setup guide
├── EXISTING_WEBSITE_AUDIT.md                  # Comprehensive audit of hiramani.co.in
├── FEATURE_ROADMAP.md                         # 6-phase development roadmap
├── FOUNDATION_SETUP.md                        # Phase 1 foundation documentation
├── HOSPITAL_INFORMATION_CHECKLIST.md          # Content checklist for hospital administration
├── MEDICONNECT_AUDIT.md                       # Audit of legacy WhatsApp bot codebase
├── PROJECT_OVERVIEW.md                        # High-level platform architecture & objectives
├── SECURITY_PLAN.md                           # Comprehensive hospital cybersecurity plan
├── SYSTEM_ARCHITECTURE.md                     # Monolith App Router architecture blueprint
├── UPDATED_PROJECT_STRUCTURE.md               # Complete directory & route topology (this document)
├── next-env.d.ts                              # Next.js TypeScript declarations
├── package.json                               # Dependencies & npm scripts
├── postcss.config.js                          # PostCSS Tailwind plugins
├── tailwind.config.js                         # Custom healthcare color palette & UI themes
├── tsconfig.json                              # TypeScript strict configuration
├── vitest.config.ts                           # Vitest testing configuration
│
├── legacy-mediconnect/                        # Preserved reference repository
│   └── (Complete audited backup of original MediConnect codebase)
│
├── src/                                       # Core Application Source Code
│   ├── app/                                   # Next.js 14 App Router Directory
│   │   ├── globals.css                        # Healthcare design system styles & CSS variables
│   │   ├── layout.tsx                         # Root HTML layout & font declarations
│   │   ├── page.tsx                           # Root landing page & portal gateway
│   │   │
│   │   ├── api/                               # Unified REST API Endpoints
│   │   │   ├── appointments/                  # Appointment booking & cancellation API
│   │   │   │   └── route.ts
│   │   │   ├── automations/                   # Automated cron jobs & reminders
│   │   │   │   └── reminders/
│   │   │   │       └── route.ts
│   │   │   ├── chat/                          # Interactive chat simulation API
│   │   │   │   └── route.ts
│   │   │   ├── dashboard/                     # Hospital operational stats API
│   │   │   │   └── stats/
│   │   │   │       └── route.ts
│   │   │   ├── departments/                   # Department list & detail API
│   │   │   │   └── route.ts
│   │   │   ├── doctors/                       # Doctor management & OPD scheduling API
│   │   │   │   ├── route.ts
│   │   │   │   ├── slots/
│   │   │   │   │   └── route.ts
│   │   │   │   └── timeoff/
│   │   │   │       └── route.ts
│   │   │   ├── faqs/                          # Hospital FAQ management API
│   │   │   │   └── route.ts
│   │   │   ├── queries/                       # Patient CRM enquiries API
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── notes/
│   │   │   │           └── route.ts
│   │   │   ├── settings/                      # Hospital operational settings API
│   │   │   │   └── route.ts
│   │   │   ├── staff/                         # Hospital staff accounts API
│   │   │   │   └── route.ts
│   │   │   └── whatsapp/                      # Meta WhatsApp Cloud API Integration
│   │   │       ├── webhook/                   # Webhook handshake & incoming message parser
│   │   │       │   └── route.ts
│   │   │       └── web-status/                # Bridge status endpoint
│   │   │           └── route.ts
│   │   │
│   │   ├── auth/                              # Authentication Callbacks
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   │
│   │   ├── chat/                              # Web-based WhatsApp Simulator Interface
│   │   │   └── page.tsx
│   │   │
│   │   ├── login/                             # Staff & Patient Authentication Page
│   │   │   └── page.tsx
│   │   ├── forgot-password/                   # Password Reset Flow
│   │   │   └── page.tsx
│   │   │
│   │   └── dashboard/                         # Hospital Administrative ERP Portal
│   │       ├── layout.tsx                     # Dashboard layout with persistent sidebar
│   │       ├── page.tsx                       # Overview metrics, charts & upcoming OPD
│   │       ├── appointments/                  # Appointments management & booking ledger
│   │       │   └── page.tsx
│   │       ├── departments/                   # Department catalog editor
│   │       │   └── page.tsx
│   │       ├── doctors/                       # Doctor profiles, fees & schedules
│   │       │   └── page.tsx
│   │       ├── faqs/                          # Public & WhatsApp FAQ manager
│   │       │   └── page.tsx
│   │       ├── queries/                       # Patient CRM ticket resolution
│   │       │   └── page.tsx
│   │       ├── settings/                      # Hospital timing, address & contact settings
│   │       │   └── page.tsx
│   │       ├── staff/                         # Role-based staff access management
│   │       │   └── page.tsx
│   │       └── whatsapp-web/                  # WhatsApp integration monitor
│   │           └── page.tsx
│   │
│   ├── components/                            # Reusable UI & Business Components
│   │   ├── chat/                              # WhatsApp Simulator Components
│   │   │   ├── FloatingChatButton.tsx         # Floating quick-access chat pill
│   │   │   └── WhatsAppSimulator.tsx          # Full-featured interactive chat window
│   │   ├── dashboard/                         # Administrative Dashboard Components
│   │   │   └── Sidebar.tsx                    # Hospital staff navigation sidebar
│   │   └── ui/                                # Foundational shadcn/ui Design Primitives
│   │       ├── badge.tsx                      # Semantic clinical status tags
│   │       ├── button.tsx                     # Accessible healthcare blue/teal buttons
│   │       ├── card.tsx                       # Clean hospital card layouts
│   │       └── input.tsx                      # Form inputs with accessible focus states
│   │
│   ├── lib/                                   # Core Business Logic & Infrastructure
│   │   ├── utils.ts                           # Tailwind class merging & currency formatting
│   │   ├── bot/                               # WhatsApp Conversational Bot Engine
│   │   │   └── engine.ts                      # 2,187-line 7-option bilingual state machine
│   │   ├── db/                                # Unified Hospital Data Repository
│   │   │   └── repo.ts                        # Double-booking guard, slot generator & queries
│   │   ├── supabase/                          # Database & Storage Clients
│   │   │   ├── client.ts                      # Public Supabase browser client
│   │   │   └── server.ts                      # Administrative server client (service role)
│   │   └── whatsapp/                          # WhatsApp Cloud API Client
│   │       └── service.ts                     # Meta Graph API v21.0 message sender & webhook
│   │
│   ├── types/                                 # Domain TypeScript Definitions
│   │   └── index.ts                           # Models for Patients, Doctors, Tests, Packages
│   │
│   └── __tests__/                             # Automated Test Suites (Vitest)
│       ├── booking.test.ts                    # 11 tests: Slot booking, past dates, double-booking
│       ├── bot.test.ts                        # 21 tests: Bot state machine, Bengali menus
│       └── webhook.test.ts                    # 3 tests: Meta webhook verification & parsing
│
└── supabase/                                  # Database Infrastructure
    ├── migrations/                            # Version-Controlled SQL Migrations
    │   ├── 20261025000000_init_schema.sql     # Baseline hospital operational schema
    │   ├── 20261025000001_hiramani_memorial_update.sql # Branding & department updates
    │   └── 20261107000000_healthcare_platform_expansion.sql # Phase 1 additive expansion
    └── seed.sql                               # Baseline demo data seed script
```

---

## 2. Inventory of Compiled Next.js Routes (31 Routes)

When building with `npm run build`, Next.js compiles 31 routes across public, administrative, and API surfaces:

### Static Public & Portal Routes (○ / λ)
1. `/` — Root Public Platform & Gateway
2. `/chat` — Interactive WhatsApp Bot Simulator
3. `/login` — Portal Authentication
4. `/forgot-password` — Password Recovery Flow

### Administrative ERP Routes (λ Server / Protected)
5. `/dashboard` — Hospital Analytics Overview
6. `/dashboard/appointments` — Appointment Master Queue
7. `/dashboard/departments` — Department Management
8. `/dashboard/doctors` — Doctor Rosters & Schedules
9. `/dashboard/faqs` — Hospital FAQ Content Manager
10. `/dashboard/queries` — Patient CRM Support Inbox
11. `/dashboard/settings` — Hospital System Configuration
12. `/dashboard/staff` — Staff Account Roles & Permissions
13. `/dashboard/whatsapp-web` — WhatsApp Cloud API Monitor

### REST API Route Handlers (ƒ Server Endpoints)
14. `/api/appointments` — GET list / POST book / PATCH update
15. `/api/automations/reminders` — GET/POST 24h SMS/WhatsApp reminder cron
16. `/api/chat` — POST bot message processing
17. `/api/dashboard/stats` — GET aggregated hospital KPI metrics
18. `/api/departments` — GET departments / POST create
19. `/api/doctors` — GET doctors / POST create
20. `/api/doctors/slots` — GET available OPD time slots
21. `/api/doctors/timeoff` — GET / POST doctor leaves & schedule blocks
22. `/api/faqs` — GET active FAQs / POST create
23. `/api/queries` — GET patient CRM queries / POST create
24. `/api/queries/[id]/notes` — GET / POST query response notes
25. `/api/settings` — GET / PUT hospital contact & operational hours
26. `/api/staff` — GET staff list / POST invite staff
27. `/api/whatsapp/webhook` — GET webhook verification / POST incoming message handler
28. `/api/whatsapp/web-status` — GET WhatsApp cloud service status
29. `/auth/callback` — GET Supabase Auth OAuth/OTP exchange handler
30. `/_not-found` — Accessible 404 error page
31. Internal static asset handlers (`_next/static/...`)

