# Hiramani Memorial Hospital — UI Component Inventory
**Phase:** Phase 2 Complete Public Website & Responsive Healthcare UI/UX  
**Component Architecture:** React 18, Next.js 14 App Router, Tailwind CSS, Lucide Icons  

---

## 1. Layout & Global Navigation Components

### 1.1. `HospitalNavbar`
- **File:** `src/components/layout/HospitalNavbar.tsx`
- **Role:** Sticky global header with dual-tier navigation (Top emergency strip + Main brand navbar + Mobile drawer).
- **Key Features:**
  - Emergency hotline banner with pulsating live alert indicator and direct `tel:` protocol.
  - Interactive Language Selector dropdown (English / বাংলা / हिन्दी) driven by `useLanguage()`.
  - Desktop responsive navigation with 'More' dropdown for secondary pages.
  - Prominent CTAs: "WhatsApp OPD" and "Book Appointment".
  - Mobile slide-down navigation drawer with large touch targets and embedded emergency call card.
- **Accessibility:** Semantic `<header>` and `<nav>`, ARIA expanded tags, keyboard navigability.

### 1.2. `HospitalFooter`
- **File:** `src/components/layout/HospitalFooter.tsx`
- **Role:** Institutional 4-column healthcare footer with emergency trauma ribbon.
- **Key Features:**
  - Full-width 24x7 Emergency ribbon with direct call button.
  - Column 1: Hospital identity, registration notice, in-house pharmacy tag.
  - Column 2: Patient service quick links (Doctors, Diagnostics, Packages, Patient Guide, Careers).
  - Column 3: Clinical Specialities directory linking to individual department profiles.
  - Column 4: Contact numbers, B.B.T. Road postal address, emergency phone, and email.
  - Bottom row: Legal medical emergency disclaimer, copyright, and patient charter links.
- **Accessibility:** High contrast text (4.5:1 ratio against `#0f172a`), semantic list items.

### 1.3. `PublicLayoutWrapper`
- **File:** `src/components/layout/PublicLayoutWrapper.tsx`
- **Role:** Route-aware shell wrapping public pages with `HospitalNavbar`, `HospitalFooter`, `FloatingChatButton`, and `LanguageProvider`.
- **Key Features:**
  - Automatically isolates the Hospital Staff ERP dashboard (`/dashboard/*`) and full-screen WhatsApp simulator (`/chat`), allowing them to render their specialized layouts without interference.
  - Automatically wraps all public hospital routes (`/`, `/about`, `/doctors`, `/departments`, etc.) with the complete healthcare navigation layout.

---

## 2. Page-Level Interactive Client Components

### 2.1. `HomeClient`
- **File:** `src/components/home/HomeClient.tsx`
- **Role:** Interactive client component orchestrating the 10-section homepage.
- **Props:**
  - `initialDoctors: Doctor[]`
  - `initialDepartments: Department[]`
  - `initialHealthPackages: HealthPackage[]`
  - `initialDiagnosticTests: DiagnosticTest[]`
  - `initialAnnouncements: CMSAnnouncement[]`
- **Key Features:**
  - Live doctor search input with instant in-memory filtering by name, degree, or specialty.
  - Department dropdown filter.
  - Interactive cards for doctors, clinical departments, diagnostics, and packages.
  - Dynamic display of official hospital announcements and health advisories.

### 2.2. `DoctorsDirectoryClient`
- **File:** `src/components/doctors/DoctorsDirectoryClient.tsx`
- **Role:** Searchable, filterable specialist directory.
- **Props:**
  - `initialDoctors: Doctor[]`
  - `initialDepartments: Department[]`
- **Key Features:**
  - Real-time text search with debounce feel.
  - Department selection filter.
  - Results counter ("Showing X of Y registered specialists").
  - Clear filter action.
  - Doctor cards showing qualifications, specialty, chamber room, consultation fee, and follow-up fee.
  - Direct links to `/doctors/[id]` and `/book?doctor_id=...`.
  - Professional empty state when filters return 0 matches.

### 2.3. `DiagnosticsClient`
- **File:** `src/components/diagnostics/DiagnosticsClient.tsx`
- **Role:** Diagnostic laboratory test catalog.
- **Props:**
  - `categories: DiagnosticCategory[]`
  - `tests: DiagnosticTest[]`
- **Key Features:**
  - Instant keyword search across test names, codes, and descriptions.
  - Category pill filter tabs (Pathology, Radiology, Non-Invasive Cardiology).
  - Test cards detailing turnaround time, sample type, fasting requirement badge, preparation notes, and transparent price.
  - Direct inquiry CTA.

### 2.4. `QuickBookingClient`
- **File:** `src/components/booking/QuickBookingClient.tsx`
- **Role:** Real-time outpatient appointment booking wizard.
- **Props:**
  - `initialDoctors: Doctor[]`
  - `initialDepartments: Department[]`
  - `preselectedDoctorId?: string`
  - `preselectedDeptId?: string`
- **Key Features:**
  - Department filter narrowing doctor selection.
  - Selected doctor preview with chamber and fee display.
  - Date picker constrained to today and future dates.
  - Reactive slot availability loader fetching real unreserved slots from `/api/doctors/slots`.
  - Patient name and 10-digit mobile number input with E.164 sanitization.
  - Submits to `POST /api/appointments` using the atomic slot reservation guard.
  - Confirmation screen displaying unique Booking Reference (`APT-YYYYMMDD-XXXX`), appointment details, and counter-payment guidance.
  - Alternative WhatsApp booking callout card.

### 2.5. `ContactForm`
- **File:** `src/components/contact/ContactForm.tsx`
- **Role:** Patient CRM enquiry submission form.
- **Key Features:**
  - Fields: Full Name, 10-digit Mobile Number, Category (`General Enquiry`, `Doctor & Appointments`, `Diagnostics`, `Billing & Insurance`, `Feedback`), Subject, and Message.
  - Submits to `POST /api/queries` using the hospital database CRM layer.
  - Success feedback screen displaying generated tracking ticket number (e.g., `TKT-20261106-4819`).
  - Loading spinner and error handling.

---

## 3. Foundational UI Primitives (`src/components/ui/`)

| Component | File Path | Variants / Sizes | Description |
| :--- | :--- | :--- | :--- |
| **`Button`** | `src/components/ui/button.tsx` | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` \| `sm`, `md`, `lg` | Accessible button with focus rings and loading state support. |
| **`Card`** | `src/components/ui/card.tsx` | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` | Standardized clinical card layout primitives. |
| **`Badge`** | `src/components/ui/badge.tsx` | `default`, `secondary`, `destructive`, `outline`, `success`, `warning` | Status indicator pills for appointment statuses and medical turnaround times. |
| **`Input`** | `src/components/ui/input.tsx` | Standard input | Styled text, date, and tel inputs with accessible healthcare blue focus outlines. |

---

## 4. WhatsApp & Bot UI Components

| Component | File Path | Description |
| :--- | :--- | :--- |
| **`FloatingChatButton`** | `src/components/chat/FloatingChatButton.tsx` | Persistent bottom-right floating pill with WhatsApp green branding, unread indicator, and click-to-launch simulator trigger. |
| **`WhatsAppSimulator`** | `src/components/chat/WhatsAppSimulator.tsx` | Web-based chat modal simulating WhatsApp smartphone experience with interactive number buttons, Bengali/English menu, and live BotEngine responses. |

