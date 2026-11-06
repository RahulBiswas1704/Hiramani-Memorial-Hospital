# HIRAMANI MEMORIAL HOSPITAL — PROFESSIONAL UI/UX ART DIRECTION & VISUAL REDESIGN (V2)
**Project:** Existing Website Audit + Brand-Aligned UI/UX Agency Transformation  
**Agency Roles:** Creative Director, Brand Identity Designer, Senior UI/UX Designer, Healthcare Digital Experience Specialist, Senior Frontend Engineer  
**Date:** November 2026  
**Hospital Campus:** 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101  
**Verified Helplines:** Reception: `+91 78729 57300` | 24x7 Emergency: `+91 75010 74392` | Ambulance: `+91 62945 45225`  
**Brand Design Tokens:** Deep Navy (`#103653`), Hospital Green (`#15965C`), Medical Blue (`#159FDB`), Soft Sage (`#F4F8F5`), Clinical Slate (`#182B3D`), Hairline Border (`#E5EBEF`)  

---

## 1. Executive Summary & Creative Direction

The Hiramani Memorial Hospital web platform was originally built with a functional Next.js App Router and Supabase backend, but its visual design suffered from systemic weaknesses common in generic "AI-generated / SaaS template" websites:
- **The "Card Trap":** Almost every section consisted of repetitive 3-column bordered boxes with bubbly `rounded-3xl` corners, excessive drop shadows, and redundant nested containers.
- **Visual Monotony:** Nearly identical hero sections across subpages, repetitive icon-in-circle badges, and uniform visual density.
- **Mobile Usability Defects:** Floating WhatsApp button overlapping interactive form elements, headers overflowing on small screens, and wide diagnostic data tables causing horizontal scrollbars.
- **Identity Incongruence:** Disconnect between the official circular emblem and generic web vectors.

The design team executed a complete **V2 Visual Redesign** that transformed the platform into an authoritative **Institutional Healthcare Platform × Premium Clinical Editorial Experience**.

---

## 2. Before vs. After Comparative Audit Matrix

| Design Dimension | Baseline Application (Before) | V2 Agency Redesign (After) | Visual Impact |
| :--- | :--- | :--- | :--- |
| **Color Hierarchy** | Generic SaaS Navy (`#0e4a7b`) & Teal (`#0d9488`) | Exact Emblem Palette: Deep Navy (`#103653`), Hospital Green (`#15965C`), Medical Blue (`#159FDB`) | Strong institutional authority directly aligned with hospital registration |
| **Container Geometry** | Bubbly `rounded-3xl` cards, excessive pill badges | Restrained `rounded-xl` containers, hairline dividers (`#E5EBEF`), variable layout rhythms | Eliminates "AI website generator" look; introduces editorial dignity |
| **Typography & Scale** | Inconsistent weights, loud titles, unformatted text | Refined sans-serif typographic hierarchy (`text-[#103653]` headings, `text-[#526273]` body) | Clean editorial legibility with zero headline wrapping breaks |
| **Hero Section** | Vector stethoscopes, floating badges, card containers | Dual-column photographic editorial: verified hospital credentials + high-res clinical consultation photo | Establishes immediate medical trust and human empathy |
| **Doctor Directory** | Repetitive boxed cards with SVG avatar placeholders | Refined medical directory with verified portraits (`/images/doc-*.jpg`), OPD chamber numbers, and fees | Authentic hospital faculty presentation |
| **Diagnostics Tariff** | Generic 3-column floating card boxes | Desktop 6-column clinical tariff table + mobile stacked clean list view | Complete elimination of horizontal scroll on mobile |
| **Mobile Header** | Colliding brand title and hamburger on `< 400px` | Responsive brand title ("Hiramani Hospital" on mobile) + dedicated 40×40px hamburger toggle | 100% visible, touch-accessible, zero right-edge clipping |
| **Floating WhatsApp** | Obtrusive bouncing bubble overlapping buttons on mobile | Scaled down on mobile (`w-12 h-12`), tooltip bubble hidden on `< 640px` | Unobtrusive, zero interference with booking forms |
| **Physical Facilities** | Generic icon lists or absent imagery | 4-part architectural showcase: Operation Theatre, ICU, Diagnostic Lab, Digital Imaging | Tangible proof of Krishnanagar medical infrastructure |
| **Location & Contact** | Legacy placeholder addresses | Verified Krishnanagar address + 3 active emergency hotlines + Google Maps transit guidance | Immediate local utility for patients in Nadia district |

---

## 3. Structural Breakdown of the 8 Homepage Editorial Rhythms

To escape the "card trap," the homepage was re-architected into 8 distinct editorial rhythms that break visual monotony:

1. **Rhythm 1: Photographic Editorial Hero (`/`):**
   - Clean institutional badge: *Trusted Multi-Speciality Healthcare in Krishnanagar, Nadia*
   - Clear headline: *Excellence in Healthcare, Compassion in Healing*
   - Triple responsive action stack: Primary Book OPD (Hospital Green), Specialist Directory (Clean White), 24x7 Emergency Hotline (Clinical Rose).
   - Authentic physician consultation photography (`/images/hero-consultation.jpg`).
2. **Rhythm 2: Institutional Heritage & Accreditation:**
   - 2-column narrative section: Left features authentic hospital reception photography; right features clean hairline-divided stats (24/7 Casualty, 8+ Specialities, Transparent Tariffs, WB CEA Registration) without card nesting.
3. **Rhythm 3: Outpatient Clinical Specialities Directory:**
   - Horizontal department grid with subtle `#F4F8F5` icon badges, active consultant count, and direct booking links.
4. **Rhythm 4: Attending Medical Faculty Showcase:**
   - Consultant directory with real portraits, verified MBBS/MD degrees, chamber numbers, and direct slot booking triggers.
5. **Rhythm 5: In-House Diagnostic Tariff Table:**
   - High-density desktop investigation table with search, category filtering, turnaround hours, and fasting protocols. Dedicated mobile stacked list view.
6. **Rhythm 6: Physical Healthcare Infrastructure:**
   - Photo showcase featuring modular OT, ICU critical care unit, fully automated pathology lab, and digital radiography suite.
7. **Rhythm 7: Preventive Health Packages:**
   - Restrained 3-column packages (Basic Health, Comprehensive Executive, Senior Citizen) with inclusive test inventories and direct inquiry links.
8. **Rhythm 8: Campus Transit Gateway & Emergency Directory:**
   - Krishnanagar campus transit directions from railway station (1.5 km) and NH-12 bypass, paired with a Deep Navy WhatsApp consultation card.

---

## 4. Key Subpage Redesigns

### 4.1 About Page (`/about`)
- Narrative foundation profile detailing the hospital's establishment in Nediarpara, Krishnanagar.
- Two-column Mission and Vision statement with hairline vertical separation (no nested card boxes).
- Numbered core values (`01` Compassion, `02` Clinical Integrity, `03` Community Accessibility, `04` 24x7 Emergency Readiness).
- In-depth infrastructure photo gallery and Patient Charter.

### 4.2 Doctors Directory (`/doctors` & `/doctors/[id]`)
- Comprehensive specialist faculty directory with real-time text search and department filtering.
- Authentic clinical portrait photography for all 7 attending consultants.
- Individual doctor profiles with weekly OPD schedule tables, chamber numbers, fees, and booking triggers.

### 4.3 Clinical Departments (`/departments` & `/departments/[slug]`)
- Organized specialities directory with numbered sections (`01` General Medicine to `08` Dermatology).
- Key clinical procedures, outpatient capabilities, and attending physician rosters.

### 4.4 Diagnostics & Labs (`/diagnostics`)
- Searchable diagnostic investigation catalogue with category pills.
- Detailed specimen type, fasting requirements, turnaround times, and official tariffs.
- Dual-mode presentation: desktop table vs. mobile stacked list.

### 4.5 Contact & Hospital Location (`/contact`)
- 2-column layout: Left column features online enquiry form; right column features the verified emergency telephone directory, Krishnanagar address, and Google Maps transit route.

### 4.6 OPD Appointment Booking (`/book`)
- Real-time doctor calendar slot reservation system.
- Zero card nesting, calm Deep Navy WhatsApp assistant companion card, and verified booking confirmation voucher.

---

## 5. Visual Evidence & Screenshot Verification Index

All redesigned pages and viewports have been audited and captured using automated headless Chrome DevTools Protocol emulation:

```
docs/screenshots/audit/
├── v2_home_320_ultra_narrow.png   # 320px KaiOS / legacy smartphone (0px overflow)
├── v2_home_360_android.png        # 360px standard budget Android (0px overflow)
├── v2_home_375_iphone_se.png      # 375px compact iOS (0px overflow)
├── v2_390_home.png                # 390px iPhone 14 baseline (0px overflow)
├── v2_home_430_iphone_pro_max.png # 430px large flagship (0px overflow)
├── v2_home_768_tablet.png         # 768px iPad portrait (0px overflow)
├── v2_1280_home.png               # 1280px desktop laptop (0px overflow)
├── v2_home_1440_desktop_hd.png    # 1440px desktop high-definition (0px overflow)
├── v2_390_about.png / v2_1280_about.png
├── v2_390_doctors.png / v2_1280_doctors.png
├── v2_390_departments.png / v2_1280_departments.png
├── v2_390_diagnostics.png / v2_1280_diagnostics.png
├── v2_390_contact.png / v2_1280_contact.png
└── v2_390_book.png / v2_1280_book.png
```

---

## 6. Zero-Regression Verification Summary

- **Automated Tests:** 43 of 43 passed (Vitest v2.1.9)
- **TypeScript Typecheck:** 0 errors (`npx.cmd tsc --noEmit`)
- **Production Build:** 47 of 47 routes compiled successfully (`npm.cmd run build`)
- **Database & Storage:** Supabase PostgreSQL and private reports bucket intact
- **WhatsApp Bot:** MediConnect Baileys engine and state machine fully preserved
