# HIRAMANI MEMORIAL HOSPITAL — NEW DESIGN SYSTEM (V2)
**Brand Identity & Art Direction:** Modern Institutional Healthcare + Premium Editorial Design  
**Hospital Campus:** 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101  
**Source of Truth:** Official Registered Circular Emblem of Hiramani Memorial Hospital  

---

## 1. Design Philosophy: Escaping the "AI Card Trap"

The previous visual design suffered from repetitive "AI template / SaaS starter" artifacts:
- Every paragraph and feature was placed inside a bordered, heavily rounded rectangular card (`rounded-3xl border shadow-sm`).
- Every page had an identical 3-column card grid.
- Every icon was enclosed in a rounded square or circle container (`w-10 h-10 rounded-xl bg-...`).
- Exaggerated bubbly radii and saturated multi-color gradients dominated sections.
- Visual density was chaotic with universal heavy font weights (`font-black`, `tracking-tight`).

### The New Direction: Institutional Authority × Editorial Elegance
The redesigned interface draws inspiration from established institutional hospitals:
1. **Editorial Layouts:** Clean typography, thoughtful whitespace, balanced columns, and narrative hierarchy replace floating cards.
2. **Restrained Color Accents:** The official Hospital Green (`#15965C`) and Medical Blue (`#159FDB`) are applied purposefully to guide patient actions, rather than painting entire pages in heavy gradients.
3. **Structured Data Density:** Diagnostic tariffs, outpatient clinic rosters, and visiting policies are structured as clear, legible lists and tables.
4. **Authentic Photography:** High-resolution photography of real clinical interactions, modular operating suites, intensive care units, and pathology facilities anchors every key section.
5. **Page-Specific Visual Character:** The Homepage, About, Doctors, Departments, Diagnostics, Contact, and Booking pages each feature tailored layouts reflecting their specific informational purpose.

---

## 2. Color Palette & Semantic Tokens

The color palette directly references the official hospital logo's green lettering, blue cross, and white canvas:

| Color Name | Hex Code | Role & Usage |
|---|---|---|
| **Hospital Green** | `#15965C` | Primary brand color, primary CTA buttons, verified badges, active states |
| **Hospital Green Hover** | `#117A4A` | Interactive hover state for primary buttons |
| **Hospital Green Soft** | `#F4F8F5` | Calming background tint for primary highlights and subtle contrast zones |
| **Medical Blue** | `#159FDB` | Secondary brand color (logo cross), secondary accents, info pills |
| **Medical Blue Soft** | `#F0F7FB` | Soft tint for clinical advisories and secondary highlights |
| **Deep Navy** | `#103653` | Institutional headers, authoritative titles, strong visual anchors |
| **Dark Text** | `#182B3D` | Primary high-contrast body titles and headings (WCAG AAA compliant) |
| **Body Text** | `#526273` | Legible, calm body text and narrative descriptions |
| **Light Canvas** | `#F7FAF9` | Gentle background tint alternating with crisp white |
| **Pure White** | `#FFFFFF` | Primary surface background for cards, tables, and navigation |
| **Subtle Border** | `#E5EBEF` | Hairline structural separation; never thick or heavy |
| **Emergency Red** | `#DC2626` | 24x7 Emergency hotline, casualty indicators, critical triage |
| **Emergency Soft** | `#FEF2F2` | Subtle background for urgent medical alerts |

---

## 3. Typography System

The platform uses a clean, legible modern sans-serif typography stack optimized for cross-platform rendering and Bengali script support:
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Bengali", Arial, sans-serif;
```

### Scale & Hierarchy

| Semantic Level | Desktop Size / Weight | Mobile Size / Weight | Line Height | Usage |
|---|---|---|---|---|
| **Display Hero** | `2.75rem` (`44px`) / Bold (`700`) | `2rem` (`32px`) / Bold (`700`) | `1.15` | Homepage hero statement |
| **Page Title (H1)** | `2.25rem` (`36px`) / Bold (`700`) | `1.75rem` (`28px`) / Bold (`700`) | `1.2` | Subpage introductory titles |
| **Section Title (H2)** | `1.75rem` (`28px`) / Bold (`700`) | `1.375rem` (`22px`) / Bold (`700`) | `1.25` | Section headings |
| **Card / Item Title (H3)**| `1.125rem` (`18px`) / SemiBold (`600`) | `1rem` (`16px`) / SemiBold (`600`) | `1.3` | Doctor names, test names |
| **Body Large** | `1.0625rem` (`17px`) / Regular (`400`)| `0.9375rem` (`15px`) / Regular (`400`)| `1.6` | Hero subtitles, editorial leads |
| **Body Regular** | `0.875rem` (`14px`) / Regular (`400`) | `0.875rem` (`14px`) / Regular (`400`) | `1.55` | General content, descriptions |
| **Caption / Small** | `0.75rem` (`12px`) / Medium (`500`)  | `0.75rem` (`12px`) / Medium (`500`)  | `1.4` | Timings, room numbers, labels |
| **Eyebrow / Overline**| `0.6875rem` (`11px`) / Bold (`700`)  | `0.6875rem` (`11px`) / Bold (`700`)  | `1.2` | Uppercase category identifiers |

---

## 4. Architectural Component Principles

1. **Restrained Corner Radii:**
   - Universal `rounded-3xl` (24px) has been replaced by restrained `rounded-xl` (12px) for cards and `rounded-lg` (8px) for interactive inputs and buttons.
2. **Selective Borders & Eliminating Nested Boxes:**
   - Instead of putting a box inside a card inside a container, information flows with clear typographic hierarchy and horizontal dividers (`divide-y divide-[#E5EBEF]`).
3. **Structured Tables & Lists Over Repetitive Grids:**
   - Diagnostics and doctor timings are presented in structured, searchable data tables and clean horizontal rows.
4. **Purposeful Buttons:**
   - **Primary CTA:** Solid Hospital Green (`#15965C`) with crisp white text.
   - **Secondary CTA:** Clean white background with `#E5EBEF` border and `#103653` deep navy text.
   - **Emergency CTA:** Restrained `#DC2626` badge or hotline link.
   - **Text Action:** Inline bold green text with subtle chevron arrow (`text-[#15965C] hover:underline`).

---

## 5. Mobile Ergonomics & Viewport Protection

To permanently eliminate horizontal overflow, clipping, and touch collisions:
- `html, body` enforce `overflow-x: hidden; max-width: 100vw;`.
- Flex containers containing non-breaking elements strictly enforce `min-w-0` to allow children to shrink.
- Floating WhatsApp button is repositioned to `bottom-4 right-4` with unobtrusive `w-12 h-12` dimensions on mobile, and the bouncing desktop tooltip is suppressed on screens $< 640\text{ px}$.
- All touch targets satisfy the $\ge 44 \times 44\text{ px}$ accessibility requirement.
- Navigation header collapses cleanly without text squishing on viewports down to $320\text{ px}$.

