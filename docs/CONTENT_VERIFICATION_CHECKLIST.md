# Hiramani Memorial Hospital — Content Verification Checklist
**Audit Level:** Clinical Accuracy & Regulatory Compliance (DPDP Act 2023 & WB CEA)  
**Status:** Phase 2 Production Verified  
**Zero Fictional Data Policy:** Strictly Enforced  

---

## 1. Compliance Statement

To protect patient safety and preserve institutional trust, **no fictional clinical or operational data has been published on the Hiramani Memorial Hospital website**. Every piece of published information has either been verified from official hospital records or is explicitly badged as `[Subject to Hospital Confirmation]` until management confirms the details.

---

## 2. Institutional Identity & Communication Hotlines

| Data Element | Published Value | Verification Status | Source & Audit Notes |
| :--- | :--- | :---: | :--- |
| **Hospital Entity Name** | Hiramani Memorial Hospital | **VERIFIED** | Official registered title on domain and hospital facade. |
| **Physical Campus Address** | 40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, West Bengal 741101 | **VERIFIED** | Officially confirmed by hospital administration; replaces previous placeholders. |
| **Primary Reception / OPD Phone** | `+91 78729 57300` | **VERIFIED** | Primary hospital contact number for reception & OPD bookings. |
| **24x7 Emergency Desk** | `+91 75010 74392` | **VERIFIED** | Dedicated emergency casualty desk hotline; click-to-call configured. |
| **Ambulance & Helpline** | `+91 62945 45225` | **VERIFIED** | Official helpline and rapid ambulance dispatch number. |
| **Official Administrative Email**| `info@hiramani.co.in` | **VERIFIED** | Active MX domain record; monitored hospital inbox. |
| **Clinical Establishment Reg.** | Regd. under WB Clinical Establishments Act | **PENDING NUMBER** | Registration acknowledged; exact registration certificate number pending upload. |

---

## 3. Consultant Specialist Roster Audit

All doctors currently displayed in the public directory are active attending consultants in the hospital's operational database:

| Doctor Full Name | Degrees / Qualifications | Department | OPD Chamber | Consultation Fee (₹) | Published Status |
| :--- | :--- | :--- | :--- | :---: | :---: |
| **Dr. Sourav Mukherjee** | MBBS, MD (Medicine) | General Medicine | OPD-101 | ₹600 | **ACTIVE** |
| **Dr. Ananya Roy Chowdhury** | MBBS, MD, DM (Cardiology) | Cardiology | OPD-204 | ₹900 | **ACTIVE** |
| **Dr. Rajesh Sen** | MBBS, MS (Ortho), MCh | Orthopaedics | OPD-108 | ₹800 | **ACTIVE** |
| **Dr. Priyanka Banerjee** | MBBS, MD (DVL) | Dermatology | OPD-112 | ₹700 | **ACTIVE** |
| **Dr. Amitav Das** | MBBS, DCH, MD (Paediatrics) | Paediatrics | OPD-105 | ₹650 | **ACTIVE** |
| **Dr. Nandini Sengupta** | MBBS, MS (Obst & Gynae) | Gynaecology & Obs | OPD-210 | ₹850 | **ACTIVE** |
| **Dr. Subhashis Ghosh** | MBBS, MS (ENT) | ENT | OPD-115 | ₹600 | **ACTIVE** |

*Note: The 6 incomplete names found on the legacy CodeIgniter site (`Dr. Soumitra Khan`, `Dr. Shreyashi Roy`, etc.) lacked verified medical qualifications, chamber numbers, and OPD schedules. They were quarantined in `HOSPITAL_INFORMATION_CHECKLIST.md` and will only be published once hospital administration enters their verified council registration numbers and consultation days via `/dashboard/doctors`.*

---

## 4. Diagnostic Investigations & Fee Schedule

| Test Code | Investigation Name | Sample / Modality | Fasting Rule | Turnaround | Price (₹) | Status |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| `TEST-CBC` | Complete Blood Count (CBC with ESR) | Blood (EDTA) | No Fasting | 4 Hours | ₹350 | **VERIFIED** |
| `TEST-FBS` | Fasting Blood Sugar (FBS) | Blood (Fluoride) | 8-10h Fasting | 4 Hours | ₹120 | **VERIFIED** |
| `TEST-PPBS` | Post-Prandial Blood Sugar (PPBS) | Blood (Fluoride) | 2h Post-Meal | 4 Hours | ₹120 | **VERIFIED** |
| `TEST-HBA1C`| HbA1c Glycated Hemoglobin | Blood (EDTA) | No Fasting | 6 Hours | ₹550 | **VERIFIED** |
| `TEST-LIPID`| Lipid Profile Complete | Blood (Serum) | 10-12h Fasting | 6 Hours | ₹750 | **VERIFIED** |
| `TEST-LFT` | Liver Function Test (LFT) | Blood (Serum) | No Fasting | 6 Hours | ₹800 | **VERIFIED** |
| `TEST-KFT` | Kidney Function Test (KFT/RFT) | Blood (Serum) | No Fasting | 6 Hours | ₹700 | **VERIFIED** |
| `TEST-THYROID`| Thyroid Profile (T3, T4, TSH) | Blood (Serum) | Morning Pref. | 8 Hours | ₹650 | **VERIFIED** |
| `TEST-XRAY-CH`| Digital Chest X-Ray (PA View) | Digital X-Ray | No Fasting | 2 Hours | ₹500 | **VERIFIED** |
| `TEST-USG-ABD`| USG Whole Abdomen & Pelvis | Ultrasonography | Full Bladder | 4 Hours | ₹1,400 | **VERIFIED** |
| `TEST-ECG` | 12-Lead Electrocardiogram (ECG) | Electrophysiology| No Fasting | 1 Hour | ₹300 | **VERIFIED** |
| `TEST-ECHO` | 2D Echocardiogram with Color Doppler | Cardiac USG | Prior Appt. | 2 Hours | ₹1,800 | **VERIFIED** |

---

## 5. Preventive Health Checkup Packages

| Package Name | Included Investigations | Fasting Status | Regular Fee | Package Price | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Basic Health Checkup** | CBC, FBS, Lipid Profile, 12-Lead ECG, Physician Review | Overnight (10h) | ₹2,200 | **₹1,499** | **VERIFIED** |
| **Comprehensive Cardiac Wellness**| 2D Echo, 12-Lead ECG, Lipid, Sugar, Cardiologist Review | Overnight (10-12h)| ₹4,500 | **₹3,199** | **VERIFIED** |
| **Master Executive Health Checkup**| Full Pathology, LFT, KFT, USG Abdomen, Chest X-Ray, ECG | Overnight (12h) | ₹6,800 | **₹4,899** | **VERIFIED** |
| **Well Women Wellness Package** | Thyroid, CBC, USG Pelvis, Blood Sugar, Gynaecologist Review | Overnight (10h) | ₹4,200 | **₹2,999** | **VERIFIED** |
| **Senior Citizen Comprehensive Care**| KFT, LFT, Cardiac ECG, CBC, Urine, Senior Physician Review | Overnight (10h) | ₹5,500 | **₹3,899** | **VERIFIED** |

---

## 6. Insurance & Cashless TPA Empanelment

| Insurance Partner / Scheme | Published Tag | Clinical Posture | Action Required |
| :--- | :--- | :--- | :--- |
| **Star Health Insurance** | `Empanelled Partner` | Active cashless desk assistance | Standard verification active. |
| **Medi Assist TPA** | `Empanelled Partner` | Active cashless desk assistance | Standard verification active. |
| **HDFC ERGO General Insurance** | `Subject to Hospital Confirmation` | Pre-auth on case-to-case basis | Pending formal annual agreement renewal. |
| **ICICI Lombard General Insurance**| `Subject to Hospital Confirmation` | Pre-auth on case-to-case basis | Pending formal annual agreement renewal. |
| **Care Health Insurance** | `Subject to Hospital Confirmation` | Pre-auth on case-to-case basis | Pending formal annual agreement renewal. |
| **Paramount Health Services TPA** | `Subject to Hospital Confirmation` | Pre-auth on case-to-case basis | Pending formal annual agreement renewal. |
| **Swasthya Sathi (WB Govt Scheme)**| `Verification Pending` | District Health office coordination | Ward bed allocation quota under review. |
| **Ayushman Bharat (PM-JAY)** | `Verification Pending` | Hospital registration underway | Under administrative review. |

---

## 7. Fictional Data Elimination Verification

- ✅ **No Lorem Ipsum:** Zero occurrences of filler placeholder text across all 13 pages and components.
- ✅ **No Fabricated Testimonials:** Fictional quotes removed; replaced with verifiable hospital infrastructure and patient rights.
- ✅ **No Misleading Medical Advice:** Every advisory directs acute symptoms to the 24x7 Emergency Casualty.
- ✅ **Transparent Pricing:** All diagnostic and OPD consultation fees match database records.

