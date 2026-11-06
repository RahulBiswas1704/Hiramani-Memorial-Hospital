# Existing Website Technical Audit
## Comprehensive Analysis of `https://www.hiramani.co.in/`

---

### 1. Executive Summary & Audit Overview

A live technical inspection and content audit was conducted on **`https://www.hiramani.co.in/`**. 

The current website is an uncompleted deployment of a third-party commercial PHP script (**"Smart Hospital: Hospital Management System"**, developed by QCode and branded by JBMatrix Technology Pvt. Ltd.) hosted on Hostinger. While the website presents an initial visual shell, it suffers from **severe production errors, exposed PHP stack traces, placeholder "Lorem Ipsum" content, a broken appointment booking form, and zero patient self-service or diagnostic report functionality**.

The existing website cannot be salvaged via cosmetic styling patches; its underlying server-side architecture is insecure, unmaintained, and disconnected from the hospital's WhatsApp operational workflows.

---

### 2. Technology Stack & Infrastructure Profile

| Parameter | Observed Production Configuration | Risk / Evaluation |
| :--- | :--- | :--- |
| **Server Engine** | LiteSpeed / Hostinger Cloud (`hcdn` Mum-edge8) | Shared hosting infrastructure. |
| **Backend Runtime** | PHP 8.0.30 (`X-Powered-By: PHP/8.0.30`) | Approaching End-Of-Life; legacy PHP version. |
| **Web Framework** | CodeIgniter 3.x (revealed by `ci_smarthospital` session cookies) | Legacy MVC architecture; lacks modern reactive UI and API primitives. |
| **CMS / Script Base** | Smart Hospital v3.x/v4.x (CodeCanyon commercial script) | Stock template customized with minimal data. |
| **Control Panel** | Hostinger hPanel | Managed shared hosting. |
| **Filesystem Path Exposed** | `/home/u347631071/domains/hiramani.co.in/public_html/` | High security risk; leaked by unsuppressed PHP warnings. |
| **Frontend Assets** | Bootstrap 3.3.7, jQuery, FontAwesome 4.7, Yellow Theme CSS | Deprecated frontend libraries with known CVEs and poor mobile performance. |
| **Domain & SSL** | `https://hiramani.co.in` (Valid Let's Encrypt SSL) | HTTPS is active; CSP header sets `upgrade-insecure-requests`. |

---

### 3. Critical Production Bugs & Security Vulnerabilities

```
CRITICAL AUDIT FINDINGS:
├── [SEV-1] Production Stack Trace & Server Path Disclosure
│   └── Trigger: Visiting /read/dengue-diagnostic-guidelines or other news pages
│   └── Output: "A PHP Error was encountered Severity: Warning Message: Undefined variable $patientpanel"
│   └── Leak: Full internal path "/home/u347631071/domains/hiramani.co.in/public_html/application/views/themes/yellow/layout.php"
├── [SEV-2] HTTP 500 Fatal Error on Public Gallery
│   └── Trigger: Visiting https://hiramani.co.in/page/gallery
│   └── Output: "HTTP Error 500: Internal Server Error" (Crashes public visitor session)
├── [SEV-3] Broken Online Appointment Booking
│   └── Bug 1: Dropdown contains administrative department "Accounts" as a medical specialist
│   └── Bug 2: Doctor dropdown is completely empty (<option value="">Select</option>)
│   └── Bug 3: Form submission fails to sync with real doctor rosters or calendars
└── [SEV-4] Demo Contamination & Vendor Data Leaks
    └── Footer: "Developed By JBMatrix Technology Pvt. Ltd. ... (For Demo Call 9477589578)"
    └── Contact Page: Lists dummy hospital "Medifine Center" and dummy phone "078729 57300"
```

#### Detailed Breakdown of Bugs:

1. **Information Leakage via PHP Error Handling**:
   Production PHP environments must never display raw runtime warnings to end users (`display_errors = Off`). Visiting any blog or announcement article triggers:
   ```text
   A PHP Error was encountered
   Severity: Warning
   Message: Undefined variable $patientpanel
   Filename: yellow/layout.php
   Line Number: 44
   Backtrace:
   File: /home/u347631071/domains/hiramani.co.in/public_html/application/views/themes/yellow/layout.php
   Line: 44
   Function: _error_handler
   File: /home/u347631071/domains/hiramani.co.in/public_html/application/core/MY_Controller.php
   ```
   This gives potential attackers exact server usernames (`u347631071`), directory structures, and code architecture details.

2. **Uncaught HTTP 500 Server Error**:
   The primary navigation link `/page/gallery` crashes with an unhandled `500 Internal Server Error`. In CodeIgniter, this typically indicates a missing database table or unreadable media folder permissions.

3. **Defective Appointment Booking Module**:
   The appointment booking page (`/form/appointment`) has two major architectural failures:
   * **Specialist Selection**: Lists `Gynaecology & Obstetrics`, `Orthopedic`, `Cardiologist`, `Dermatologist`, `Endocrinologist`, `General Medicine`, and inexplicably `Accounts` (ID 7) as a clinical specialty.
   * **Doctor Cascading Ajax Failure**: Selecting any specialty fails to populate the `Doctor` select menu. The dropdown remains frozen on `Select`, preventing patients from actually completing a booking.

4. **Vendor Demo Artifacts & Placeholder Content**:
   The website is polluted with vendor marketing and generic template text:
   * **Footer**: `Developed By JBMatrix Technology Pvt. Ltd. https://jbmatrix.com (For Demo Call 9477589578)` — Exposes vendor sales contact rather than hospital leadership.
   * **Contact Page**: Displays the title `Medifine Center` alongside lorem ipsum text and an unverified telephone number `078729 57300`.
   * **Patient Testimonials**: Shows 6 identical cards for a fictional patient `James Gandofin` with `Lorem ipsum dolor sit amet...`.
   * **Departments Page**: Every department (Emergency Care, ENT, Eye Care, Diabetes Care, Radiology, Lab Diagnostics, Surgery, Blood Bank) displays the exact same placeholder copy: `Lorem Ipsum is simply dummy text of the printing and typesetting industry...`.

---

### 4. Page-by-Page Inventory & Content Status

| URL / Page | Current Content State | Data Recoverable? | Recommended Action |
| :--- | :--- | :--- | :--- |
| **`/` (Homepage)** | Generic carousel, broken doctor cards, vendor phone number, lorem ipsum sections. | Partial (Logo, contact email). | **Complete Redesign**: Build modern Next.js healthcare homepage. |
| **`/page/about-hospitals`** | Basic paragraph on hospital mission; hardcoded clinic hours (Internist, Family doctor, Pediatrician). | High (Core institutional text). | **Refactor & Expand**: Integrate verified mission, values, bed capacity, and accreditation. |
| **`/page/vision-and-mission`** | High-level statements on compassionate care, clinical excellence, and innovation. | High (Text statements). | **Integrate**: Incorporate directly into the modern About Us experience. |
| **`/page/meet-our-doctors`** | 6 doctor names repeated in a loop: Dr. Soumitra Khan, Dr. Shreyashi Roy, Dr. Runa Majumder, Dr. Animesh Mukherjee, Dr. Amit Dey, Dr. Chandranouli Chowdhury. No qualifications, no timings. | Medium (Names only). | **Quarantine & Verify**: Require hospital management confirmation before publishing OPD schedules. |
| **`/form/appointment`** | Non-functional form; "Accounts" listed as clinical department; empty doctor dropdown. | None (Broken). | **Replace**: Implement modern multi-step booking wizard synchronized with Supabase DB. |
| **`/page/departments`** | 12 department cards all populated with Lorem Ipsum. | Department names only. | **Replace**: Build clinical specialty pages with real services, diagnostic equipment, and faculty. |
| **`/page/contact-us`** | Lorem ipsum body text; lists "Medifine Center"; conflicting phone numbers (`+91 9477589578` vs `078729 57300`). | Partial (Address requires GPS validation). | **Rebuild**: Add verified address, GPS coordinates, interactive Map, 24x7 emergency dispatch. |
| **`/page/events`** | 3 dated entries (Free Workshop for Exercise, Happy Women's Day, World Health Day). | Historical record. | **Migrate to News & Announcements CMS**. |
| **`/page/faq`** | 10 FAQ entries all populated with `Anim pariatur cliche reprehenderit, enim eiusmod high life...`. | None (Fictional mock). | **Replace**: Populate with verified hospital FAQs from MediConnect approved knowledgebase. |
| **`/page/gallery`** | Crashes with HTTP 500 error. | None. | **Rebuild**: High-definition facility showcase (OPD, IPD, OT, ICU, Diagnostics). |
| **`/page/testimonials`** | Fictional cards for `James Gandofin` with lorem ipsum. | None (Mock). | **Replace**: Authentic patient stories with proper consent. |
| **`/read/dengue-guidelines`** | Real clinical summary on Dengue warning signs, marred by PHP warning headers. | Clinical text. | **Clean & Republish**: Move to modern Health Education Blog. |
| **`/read/scorching-heat-wave`** | Nurse Madison Parker quote from Beacon Medical Group (copied from an overseas website). | Plagiarized mock copy. | **Deprecate**: Replace with localized health advisories written by hospital clinicians. |
| **`/site/userlogin`** | Stock Smart Hospital ERP staff/patient login; no self-service sign-up or report retrieval. | None. | **Replace**: Implement role-based Patient Portal and Staff Portals. |

---

### 5. Content Salvage Matrix

```
┌───────────────────────────────────────────────┬───────────────────────────────────────────────┐
│              SALVAGEABLE ASSETS               │           CRITICAL OMISSIONS TO FIX           │
├───────────────────────────────────────────────┼───────────────────────────────────────────────┤
│ • Official Logo & Favicon Assets              │ • Zero Diagnostic Test catalog or pricing    │
│ • Hospital Name: Hiramani Memorial Hospital   │ • Zero Diagnostic Report access / download    │
│ • Primary Contact Email: info@hiramani.co.in  │ • Zero Cashless Insurance / TPA information   │
│ • Initial Core Specialty Names:               │ • Zero Bed / ICU / Surgical package details   │
│   - Gynaecology & Obstetrics                  │ • Zero Patient Portal for tracking visits     │
│   - Orthopaedics                              │ • Conflicting phone numbers across pages      │
│   - Cardiology                                │ • Complete absence of Bengali / Hindi support │
│   - Dermatology                               │ • Complete lack of integration with WhatsApp   │
│   - Paediatrics                               │ • Broken Appointment booking engine           │
│   - General Medicine                          │ • Exposed file paths and PHP stack traces     │
│   - ENT                                       │ • Broken gallery throwing HTTP 500            │
└───────────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

### 6. Architectural Conclusion

The current website `https://www.hiramani.co.in/` represents a stalled, vulnerable installation of legacy software. Modifying or patching this PHP application would:
1. Preserve dangerous legacy attack surfaces and path disclosures.
2. Perpetuate data isolation between the website and the WhatsApp automation engine.
3. Fail to provide modern reactive patient portals, real-time doctor slot management, or trilingual AI capabilities.

**Recommendation**: Decommission the front-facing CodeIgniter presentation layer and replace it with a unified Next.js digital healthcare platform connected to the central Supabase PostgreSQL database.

