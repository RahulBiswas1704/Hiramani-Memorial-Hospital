# Hiramani Memorial Hospital — Official Brand Design System & UI Specifications

**Version:** 2.0 (Post-Audit Visual Overhaul)  
**Authority:** Derived directly from the official circular emblem of Hiramani Memorial Hospital  
**Concept:** *Modern Institutional Hospital × Premium Editorial Web Design*  
**Scope:** Public Hospital Portal, Doctor Directory, Diagnostics, Patient Guide, and MediConnect Touchpoints  

---

## 1. Brand Identity & Logo Guidelines

The Hiramani Memorial Hospital logo is the authoritative anchor of the entire design system.

### Logo Anatomy
- **Outer Ring:** Clean concentric circles rendered in **Medical Blue (`#159FDB`)** with two anchor dots.
- **Brand Lettering:** Uppercase typographic circular path in **Brand Green (`#15965C`)**:
  - Top Arc: `HIRAMANI MEMORIAL HOSPITAL`
  - Bottom Arc: `KRISHNANAGAR, NADIA, W.B. PIN-741101`
- **Core Symbol:** Solid **Medical Blue Greek Cross (`+`)** overlaid with an unbroken white electrocardiogram (ECG / heartbeat) rhythm line.
- **Center Canvas:** Pure White (`#FFFFFF`).

### Strict Logo Rules
- **Aspect Ratio:** Always maintain 1:1 circular aspect ratio. Never stretch or distort horizontally or vertically.
- **Clear Space:** Maintain a minimum clear space equal to 25% of the logo's width around all borders.
- **Header Sizing:** Desktop: `48px × 48px` or `52px × 52px`; Mobile: `40px × 40px`.
- **Footer Sizing:** `56px × 56px` on clean circular white badge.
- **Integrity:** Never recolor the green lettering or replace the emblem with a generic vector medical icon.

---

## 2. Color Palette System

The color system is derived directly from the official emblem, expanded into an institutional healthcare palette that balances warmth, precision, and trust.

### Primary Brand Colors

| Token Name | Hex Code | RGB | Purpose & Usage |
| :--- | :---: | :---: | :--- |
| **Brand Green** | `#15965C` | `21, 150, 92` | Primary brand identity, primary CTA buttons, success indicators, verified medical credentials, and hospital branding. |
| **Brand Green Dark** | `#0E7444` | `14, 116, 68` | Hover state for Brand Green CTAs, active navigation states, high-contrast badges. |
| **Medical Blue** | `#159FDB` | `21, 159, 219` | Clinical accents, secondary action links, cross motifs, cardiology badges, and interactive elements. |
| **Medical Blue Dark** | `#0B72A2` | `11, 114, 162` | Hover state for Medical Blue buttons, deep link text. |
| **Deep Slate** | `#1E293B` | `30, 41, 59` | Primary headings, institutional titles, dark footer backgrounds, high-contrast editorial typography. |
| **Body Charcoal** | `#334155` | `51, 65, 85` | Primary body text for clinical descriptions, patient guides, and doctor qualifications. |
| **Muted Slate** | `#64748B` | `100, 116, 139` | Secondary text, captions, OPD room metadata, turnaround times. |

### Soft Backgrounds & Section Tints

| Token Name | Hex Code | Purpose & Usage |
| :--- | :---: | :--- |
| **Pure White** | `#FFFFFF` | Primary card and page background canvas. |
| **Soft Sage** | `#F4F8F5` | Alternating section background for hospital heritage, patient care, and wellness sections. Derived from Brand Green. |
| **Soft Ice** | `#F0F7FB` | Alternating section background for clinical departments, diagnostics, and test catalogs. Derived from Medical Blue. |
| **Warm Canvas** | `#F8FAFC` | Neutral background for administrative forms, search filters, and table stripes. |
| **Border Tone** | `#E2E8F0` | Subtle hairline dividers, table borders, and card boundaries. Replaces heavy borders. |

### Clinical Status & Emergency Colors

| Token Name | Hex Code | Purpose & Usage |
| :--- | :---: | :--- |
| **Emergency Red** | `#DC2626` | 24x7 Casualty desk, emergency telephone numbers, urgent medical disclaimers. |
| **Emergency Light** | `#FEF2F2` | Subtle background for casualty badges and critical care alerts. |
| **WhatsApp Emerald**| `#10B981` | WhatsApp MediConnect integrations, live chat triggers, simulated bot chat bubbles. |
| **Accreditation Gold**| `#D97706` | Govt. Clinical Establishment Registration tags, verified certification badges. |

---

## 3. Typography Hierarchy

The typographic system pairs an authoritative, institutional sans-serif with crisp geometric proportions, optimal line-heights, and clear weights.

### Font Family
- **Primary Body & Display:** System UI Grotesque (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) with enhanced font-feature settings for tabular figures (`tnum`).

### Typographic Scale

| Role | Font Size | Line Height | Weight | Tracking | Usage |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Display 1** | `42px – 52px` | `1.15` | `800` (Bold) | `-0.025em` | Hero section main headline. |
| **H1** | `32px – 40px` | `1.2` | `700` (Bold) | `-0.02em` | Page main titles (About, Doctors, Departments). |
| **H2** | `24px – 28px` | `1.3` | `700` (Bold) | `-0.015em` | Major section headers, specialty group titles. |
| **H3** | `18px – 20px` | `1.4` | `600` (Semi-Bold) | `normal` | Doctor names, package titles, facility headings. |
| **H4 / Subtitle** | `14px – 16px` | `1.4` | `600` (Semi-Bold) | `normal` | Department names, chamber numbers, test codes. |
| **Body Large** | `16px – 18px` | `1.6` | `400` (Regular) | `normal` | Lead introductory paragraphs. |
| **Body Standard**| `14px – 15px` | `1.5` | `400` (Regular) | `normal` | General descriptions, clinical criteria, FAQs. |
| **Caption / Meta**| `12px – 13px` | `1.4` | `500` (Medium) | `0.01em` | Timestamps, turnaround times, fees, tags. |
| **Overline** | `11px – 12px` | `1.2` | `700` (Bold) | `0.05em` | Section badges, uppercase clinical category tags. |

---

## 4. Layout Architecture & Anti-Card Design Principles

To eliminate the "AI-slop / SaaS template" appearance, components must obey strict structural principles:

### 1. The 40/60 Editorial Hero Layout
- **Left Column (50-55% width):**
  - Crisp hospital category tag: Green pill with pulse indicator (`#F4F8F5` background, `#15965C` text).
  - Editorial headline: *"Excellence in Healthcare, Compassion in Healing"* in Deep Slate (`#1E293B`).
  - Clear narrative description mentioning Krishnanagar and Nadia district.
  - Action row: Primary **Brand Green Button** (*Book OPD Appointment*) + Secondary Medical Blue Outline Button (*Explore Specialist Doctors*).
  - Prominent Emergency Casualty Callout (*24x7 Emergency: +91 75010 74392*).
  - Institutional Trust Bar: Clean text with checkmark icons (Govt. Regd., 50+ Consultants, In-House Diagnostics, Bilingual WhatsApp).
- **Right Column (45-50% width):**
  - **Large authentic photography feature:** High-resolution photograph of a doctor-patient consultation in a clean medical chamber.
  - Subtle floating clinical credential badge (*"Krishnanagar's Leading Multi-Speciality Care"*) anchored to the photo frame, not a floating abstract card.

### 2. Elimination of Repetitive 3x3 Card Grids
- **Specialist Doctors:** Real physician portrait photography with clean white aspect frames, verified degree tags (MBBS, MD, DM), department badges, OPD chamber info, and direct booking triggers.
- **Diagnostics Catalog:** Structured, searchable clinical directory with categorized tabs (Pathology, Non-Invasive Cardiology, Radiology) and a clean, high-density pricing table with fasting instructions.
- **Hospital Infrastructure:** Photography-led gallery displaying real clinical areas (Modular OT, ICU Monitoring, Digital Pathology, Inpatient Wards) with informative captions.

---

## 5. UI Component Specifications

### 1. Global Navigation Bar (`HospitalNavbar.tsx`)
- **Emergency Utility Top Strip (`#0F4A32` Deep Forest Green):**
  - Emergency hotline click-to-call: `+91 75010 74392` with animated pulse.
  - Reception OPD contact: `+91 78729 57300`.
  - Address: `40, Ananta Hari Mitra Road, Nediarpara, Krishnanagar - 741101`.
  - Multilingual Switcher: English | বাংলা | हिन्दी.
- **Main Navigation Bar (White, sticky with subtle shadow):**
  - Official circular emblem + crisp 2-line title (*Hiramani Memorial Hospital • Krishnanagar, Nadia*).
  - Navigation links: Home, About Us, Doctors, Specialities, Diagnostics & Labs, Health Packages, Patient Guide, Contact.
  - CTAs: WhatsApp OPD button (`#E8F5E9` green badge) + Book Appointment button (`#15965C` Brand Green).

### 2. Global Footer (`HospitalFooter.tsx`)
- Deep Institutional Slate background (`#0F172A`).
- Top banner: Red 24x7 emergency casualty bar with click-to-call hotline.
- 4-Column structure:
  1. Hospital identity with circular emblem, legal registration notice, and clinical commitment.
  2. Patient services and quick links.
  3. Clinical specialties and diagnostic tests.
  4. Verified contact details, full postal address, phone directory, and Google Maps link.
- DPDP Act 2023 & Clinical Establishment Act compliance disclaimer at bottom.

---

## 6. Tailwind CSS Token Mapping

Add the brand tokens directly to `tailwind.config.js`:

```javascript
colors: {
  hospital: {
    green: '#15965C',
    greenDark: '#0E7444',
    greenSoft: '#F4F8F5',
    blue: '#159FDB',
    blueDark: '#0B72A2',
    blueSoft: '#F0F7FB',
    slate: '#1E293B',
    charcoal: '#334155',
    muted: '#64748B',
    border: '#E2E8F0',
    emergency: '#DC2626',
    emergencySoft: '#FEF2F2',
  }
}
```

