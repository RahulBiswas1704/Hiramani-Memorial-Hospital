# Hospital Management Information Confirmation Checklist
## Mandatory Data Required from Hiramani Memorial Hospital Administration

---

### 1. Purpose of this Checklist

During our deep technical audits of `https://www.hiramani.co.in/` and the `HIRAMANI-MEDICONNECT` repository, significant contradictions, missing clinical details, and vendor demo artifacts were discovered.

To maintain medical accuracy, legal compliance, and patient trust, **no fictional clinical or operational data will be published to the live platform**. Hospital management must review and confirm the items in this checklist before production deployment.

---

### 2. Information Categories Requiring Confirmation

```
CHECKLIST COMPLETION STATUS:
├── 1. Institutional Identity & Physical Location  [CONFIRMED & APPLIED]
├── 2. Emergency & Communication Hotlines         [CONFIRMED & APPLIED]
├── 3. Authoritative Specialist & Doctor Roster    [CRITICAL - PENDING]
├── 4. Active Medical Departments & Facilities    [PENDING CONFIRMATION]
├── 5. Diagnostic Test Catalog & Pricing           [CRITICAL - PENDING]
├── 6. Preventive Health Packages                  [PENDING CONFIRMATION]
├── 7. Cashless Mediclaim, TPA & Govt Schemes      [PENDING CONFIRMATION]
├── 8. Operational Rules & Visiting Hours          [PENDING CONFIRMATION]
└── 9. Meta WhatsApp Business Account Credentials  [TECHNICAL - PENDING]
```

---

### 3. Detailed Itemized Verification Tables

#### Category 1: Institutional Identity & Location

| Item # | Data Element | Confirmed & Applied Value | Status |
| :---: | :--- | :--- | :---: |
| **1.1** | **Hospital Legal Name** | Hiramani Memorial Hospital | **CONFIRMED** |
| **1.2** | **Clinical Establishment Reg. No.** | Regd. under WB Clinical Establishments Act | **PENDING CERTIFICATE** |
| **1.3** | **Physical Street Address** | **40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, West Bengal 741101** | **CONFIRMED & APPLIED** |
| **1.4** | **Google Maps GPS Coordinates** | Krishnanagar, Nadia (Lat: 23.4013, Long: 88.5028) | **CONFIRMED & APPLIED** |

---

#### Category 2: Emergency & Communication Hotlines

| Item # | Data Element | Confirmed & Applied Value | Status |
| :---: | :--- | :--- | :---: |
| **2.1** | **Primary Reception / OPD Phone** | **+91 78729 57300** | **CONFIRMED & APPLIED** |
| **2.2** | **24x7 Emergency Hotline** | **+91 75010 74392** | **CONFIRMED & APPLIED** |
| **2.3** | **Helpline & Ambulance Dispatch** | **+91 62945 45225** | **CONFIRMED & APPLIED** |
| **2.4** | **Official Email Address** | `info@hiramani.co.in` | **CONFIRMED** |
| **2.5** | **WhatsApp Business Number** | `+91 78729 57300` | **CONFIRMED & APPLIED** |

---

#### Category 3: Authoritative Specialist & Doctor Roster (CRITICAL)

The old website lists 6 names with no qualifications or schedules (`Dr. Soumitra Khan`, `Dr. Shreyashi Roy`, `Dr. Runa Majumder`, `Dr. Animesh Mukherjee`, `Dr. Amit Dey`, `Dr. Chandranouli Chowdhury`). The MediConnect seed lists 7 different doctors with full credentials and timings.

*Please populate the authoritative roster for all attending consultants:*

| Doctor Full Name | Degrees / Qualifications (e.g. MBBS, MD, MS, DM) | Department & Specialty | OPD Consultation Days (e.g. Mon, Wed, Fri) | Shift Timings (e.g. 10 AM - 1 PM) | Slot Duration (mins) | OPD Fee (₹) | Follow-up Fee (₹) | Room / Chamber |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *[Doctor 1]* | | | | | | | | |
| *[Doctor 2]* | | | | | | | | |
| *[Doctor 3]* | | | | | | | | |
| *[Doctor 4]* | | | | | | | | |
| *[Doctor 5]* | | | | | | | | |
| *[Doctor 6]* | | | | | | | | |
| *[Doctor 7]* | | | | | | | | |

---

#### Category 4: Medical Departments & In-Patient Facilities

| Item # | Department / Facility | Currently Active at Hiramani? (Yes/No) | Key Facilities / Equipment to Highlight |
| :---: | :--- | :---: | :--- |
| **4.1** | **General Medicine & Diabetology** | [ ] | |
| **4.2** | **Cardiology** | [ ] | ECG, 2D-Echo, TMT, Holter |
| **4.3** | **Orthopaedics & Joint Surgery** | [ ] | Trauma care, Fracture clinic, Arthroscopy |
| **4.4** | **Gynaecology & Obstetrics** | [ ] | Labour room, Prenatal clinic, Laparoscopy |
| **4.5** | **Paediatrics & Neonatology** | [ ] | Immunization clinic, NICU, Phototherapy |
| **4.6** | **ENT (Otolaryngology)** | [ ] | Audiometry, Endoscopy |
| **4.7** | **Dermatology & Cosmetology** | [ ] | Clinical dermatology, Laser, Skin biopsy |
| **4.8** | **General & Laparoscopic Surgery** | [ ] | Modular OT, Day-care surgeries |
| **4.9** | **Intensive Care Unit (ICU/HDU)** | [ ] | Total bed capacity, Ventilator beds |
| **4.10** | **Dialysis Unit** | [ ] | Number of dialysis stations |
| **4.11** | **Blood Bank / Storage Center** | [ ] | Component separation, 24x7 blood bank |

---

#### Category 5: Diagnostic Test Catalog & Pricing (CRITICAL)

*Confirm available laboratory and imaging tests with transparent pricing:*

| Test Code | Test Name | Category (Pathology / Radiology) | Fasting Required? (Yes/No) | Special Patient Preparation | Turnaround Time (Hours) | Test Price (₹) |
| :--- | :--- | :--- | :---: | :--- | :---: | :---: |
| `CBC` | Complete Blood Count (CBC) | Pathology | No | None | 4 hrs | |
| `FBS` | Fasting Blood Sugar (FBS) | Pathology | Yes | 8-10 hrs overnight fasting | 4 hrs | |
| `PPBS` | Post Prandial Blood Sugar | Pathology | No | Exactly 2 hrs after meal | 4 hrs | |
| `HBA1C` | HbA1c Glycated Hemoglobin | Pathology | No | None | 6 hrs | |
| `LIPID` | Lipid Profile Complete | Pathology | Yes | 10-12 hrs fasting | 6 hrs | |
| `LFT` | Liver Function Test (LFT) | Pathology | No | None | 6 hrs | |
| `KFT` | Kidney Function Test (KFT/Urea/Creat) | Pathology | No | None | 6 hrs | |
| `THYROID` | Thyroid Profile (T3, T4, TSH) | Pathology | No | Morning sample preferred | 8 hrs | |
| `XRAY-CH` | Digital Chest X-Ray (PA View) | Radiology | No | Remove metallic items | 2 hrs | |
| `USG-ABD` | USG Whole Abdomen | Radiology | Yes | Overnight fast + full bladder | 4 hrs | |
| `ECG-12` | 12-Lead Electrocardiogram | Cardiology | No | Relaxed supine position | 30 mins | |
| `ECHO-2D` | 2D Echocardiography + Doppler | Cardiology | No | By appointment | 2 hrs | |

---

#### Category 6: Preventive Health Checkup Packages

| Package Name | Included Tests & Consultations | Target Demographic | Regular Price (₹) | Package Price (₹) |
| :--- | :--- | :--- | :--- | :--- |
| **Basic Health Checkup** | CBC, Blood Sugar, Lipid, ECG, Urine, General Physician Consultation | Adults | | |
| **Comprehensive Cardiac Care** | Lipid, Sugar, ECG, 2D-Echo, TMT, Cardiologist Consultation | Adults 35+ | | |
| **Master Health Checkup** | Complete Pathology, LFT, KFT, USG, X-Ray, ECG, Physician Consult | Annual checkup | | |
| **Well Women Package** | Thyroid, CBC, USG Pelvis, Pap Smear, Gynaecologist Consultation | Women 25+ | | |
| **Senior Citizen Package** | KFT, Electrolytes, Bone Density, Cardiac, Eye & Ortho Consultation | Seniors 60+ | | |

---

#### Category 7: Cashless Mediclaim, TPA & Government Schemes

| Scheme / Insurer | Empanelled at Hiramani? (Yes/No) | Cashless Available for IPD? (Yes/No) | Desk Contact / Notes |
| :--- | :---: | :---: | :--- |
| **Swasthya Sathi (WB Govt)** | [ ] | [ ] | |
| **Ayushman Bharat (PM-JAY)** | [ ] | [ ] | |
| **Star Health Insurance** | [ ] | [ ] | |
| **HDFC ERGO** | [ ] | [ ] | |
| **ICICI Lombard** | [ ] | [ ] | |
| **Care Health Insurance** | [ ] | [ ] | |
| **Medi Assist TPA** | [ ] | [ ] | |
| **Paramount Health TPA** | [ ] | [ ] | |
| **Raksha Health TPA** | [ ] | [ ] | |

---

#### Category 8: Operational Rules & Hospital Policies

| Policy Question | Recommended Default | Hospital Management Decision |
| :--- | :--- | :--- |
| **OPD Booking Advance Days** | Up to 14 days in advance | [ ] 7 Days &nbsp;&nbsp; [ ] 14 Days &nbsp;&nbsp; [ ] 30 Days |
| **Appointment Cancellation Policy** | Up to 2 hours prior to scheduled slot | [ ] 2 Hours &nbsp;&nbsp; [ ] 4 Hours &nbsp;&nbsp; [ ] Same day allowed |
| **Inpatient Visiting Hours** | 11:00 AM – 1:00 PM and 5:00 PM – 7:00 PM | |
| **Visitor Pass Policy** | 1 Attendant pass per patient | |
| **Home Sample Collection** | Available from 6:30 AM within 5 km | [ ] Yes &nbsp;&nbsp; [ ] No &nbsp;&nbsp; Radius: _____ km |

---

#### Category 9: Meta WhatsApp Business Platform Credentials (Technical)

*Required from Hospital IT / Social Media administrator to activate live Meta Cloud API:*

* [ ] **Meta Business Account ID (WABA ID)**
* [ ] **WhatsApp Phone Number ID**
* [ ] **System User Permanent Access Token** (with `whatsapp_business_messaging` permissions)
* [ ] **Meta App Secret** (for HMAC-SHA256 signature verification)
* [ ] **Webhook Verify Token** (Configured as `mediconnect_secure_webhook_verify_token_2026`)

