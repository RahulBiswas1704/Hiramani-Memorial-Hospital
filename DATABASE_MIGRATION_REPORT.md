# Hiramani Memorial Hospital — Database Migration Report
**Migration File:** `supabase/migrations/20261107000000_healthcare_platform_expansion.sql`  
**Execution Timestamp:** November 2026  
**Target Database:** PostgreSQL 15 (Supabase)  
**Safety Status:** 100% Additive • Zero Destructive Actions • Backward Compatible  

---

## 1. Migration Overview

This migration expands the Hiramani Memorial Hospital database schema to support the complete digital healthcare platform. It builds upon the existing MediConnect operational schema without dropping or altering any pre-existing tables in a breaking manner.

```
Existing Tables (Preserved 100%):
├── hospitals
├── departments
├── doctors
├── doctor_schedules
├── doctor_time_off
├── appointments (extended additively)
├── patient_queries
├── patient_query_notes
├── faqs
├── audit_logs
├── profiles
└── hospital_memberships

New Additive Tables (Phase 1 Expansion):
├── patient_accounts        (Self-service patient web portal accounts)
├── diagnostic_categories   (Pathology, Radiology, Non-Invasive Cardiology, Health Packages)
├── diagnostic_tests        (Catalog of 100+ lab investigations & scans)
├── health_packages         (Preventive checkup packages with pricing)
├── health_package_tests    (Junction table linking tests to packages)
├── diagnostic_reports      (Uploaded patient lab results with private storage metadata)
├── clinical_notes          (Doctor OPD consultation notes, diagnosis & vitals)
├── cms_announcements       (Hospital notices, health advisories & dengue alerts)
└── cms_careers             (Hospital vacancies, nurse & technician job openings)
```

---

## 2. Table-by-Table Technical Breakdown

### 2.1. `public.patient_accounts`
Allows patients to create self-service portal accounts linked with their mobile numbers and Supabase Auth identities.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT uuid_generate_v4()` | Unique internal patient ID |
| `user_id` | `UUID` | `REFERENCES auth.users(id) ON DELETE CASCADE` | Optional linkage to Supabase Auth |
| `hospital_id` | `UUID` | `NOT NULL REFERENCES hospitals(id)` | Multi-tenant hospital ID |
| `full_name` | `TEXT` | `NOT NULL` | Patient full name |
| `phone_number` | `TEXT` | `NOT NULL UNIQUE` | Normalized E.164 phone (+91XXXXXXXXXX) |
| `email` | `TEXT` | `UNIQUE` | Optional contact email |
| `date_of_birth` | `DATE` | — | Patient date of birth for pediatric/geriatric triage |
| `gender` | `TEXT` | `CHECK (gender IN ('male', 'female', 'other'))` | Patient gender |
| `blood_group` | `TEXT` | `CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))` | Clinical blood group |
| `address` | `TEXT` | — | Residential address |
| `emergency_contact_name` | `TEXT` | — | Next of kin name |
| `emergency_contact_phone`| `TEXT` | — | Next of kin phone |
| `preferred_language` | `TEXT` | `DEFAULT 'en' CHECK (IN ('en', 'bn', 'hi'))` | Preferred UI/bot language |
| `is_verified` | `BOOLEAN` | `DEFAULT TRUE NOT NULL` | Phone verification status |
| `created_at` / `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW() NOT NULL` | Audit timestamps |

**Indexes:**
- `idx_patient_accounts_phone` ON `phone_number`
- `idx_patient_accounts_user_id` ON `user_id`

---

### 2.2. Alteration to `public.appointments`
Extended without modifying existing primary keys or foreign keys:
- **Added `patient_account_id`**: `UUID REFERENCES public.patient_accounts(id) ON DELETE SET NULL`. Connects guest WhatsApp bookings to formal registered patient portal profiles.
- **Added `payment_status`**: `TEXT DEFAULT 'pay_at_hospital' CHECK (payment_status IN ('pay_at_hospital', 'online_paid', 'exempted'))`.
- **Updated `booking_channel`**: Check constraint updated to include `'web_portal'` alongside `'whatsapp'`, `'web_dashboard'`, `'phone'`, and `'walk_in'`.

---

### 2.3. `public.diagnostic_categories`
Organizes tests into clear medical sections for patient browsing and administrative management.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | Category UUID |
| `hospital_id` | `UUID` | `NOT NULL REFERENCES hospitals(id)` | Hospital reference |
| `name` | `TEXT` | `NOT NULL` | Category name (e.g., 'Pathology & Blood Tests') |
| `code` | `TEXT` | `NOT NULL` | Category code (e.g., 'PATH') |
| `description` | `TEXT` | — | Department description |
| `icon_name` | `TEXT` | `DEFAULT 'Activity' NOT NULL` | Lucide icon identifier |
| `display_order` | `INT` | `DEFAULT 0 NOT NULL` | Sorting index in UI |
| `is_active` | `BOOLEAN` | `DEFAULT TRUE NOT NULL` | Visibility toggle |

**Unique Constraint:** `(hospital_id, code)`

---

### 2.4. `public.diagnostic_tests`
Medical test and imaging investigation catalog with pricing, sample types, fasting instructions, and turnaround times.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | Test UUID |
| `hospital_id` | `UUID` | `NOT NULL REFERENCES hospitals(id)` | Hospital reference |
| `category_id` | `UUID` | `REFERENCES diagnostic_categories(id)` | Department category |
| `category_name` | `TEXT` | — | De-normalized category name |
| `name` | `TEXT` | `NOT NULL` | Test name (e.g., 'Complete Blood Count (CBC)') |
| `code` | `TEXT` | `NOT NULL` | Short test code (e.g., 'CBC-01') |
| `description` | `TEXT` | — | Clinical purpose |
| `price` | `NUMERIC(10,2)`| `NOT NULL DEFAULT 0.00` | Standard test fee (INR) |
| `fasting_required` | `BOOLEAN` | `DEFAULT FALSE NOT NULL` | Pre-test fasting requirement |
| `preparation_instructions`| `TEXT` | — | Patient instructions (e.g., 10-12h overnight fasting) |
| `sample_type` | `TEXT` | — | Sample container (e.g., Blood EDTA, Urine) |
| `turnaround_hours` | `INT` | `DEFAULT 24 NOT NULL` | Expected turnaround time |
| `is_active` | `BOOLEAN` | `DEFAULT TRUE NOT NULL` | Catalog active toggle |

**Indexes:**
- `idx_diagnostic_tests_category` ON `category_id`
- `idx_diagnostic_tests_active` ON `(hospital_id, is_active)`
**Unique Constraint:** `(hospital_id, code)`

---

### 2.5. `public.health_packages` & `public.health_package_tests`
Preventive health checkup packages (e.g., Comprehensive Health Checkup, Cardiac Wellness Panel).

- `public.health_packages`:
  - `name`, `slug` (Unique per hospital), `description`, `target_gender` (`all`, `male`, `female`).
  - `price` (Regular price), `discounted_price` (Package promotional price).
  - `sample_count`, `report_delivery_hours`, `fasting_required`, `preparation_instructions`.
- `public.health_package_tests`:
  - Many-to-many junction table between `package_id` and `test_id` with `display_order`.
  - `UNIQUE(package_id, test_id)`.

---

### 2.6. `public.diagnostic_reports`
Tracks uploaded medical investigation reports, laboratory results, and radiology scan PDFs.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | Report UUID |
| `hospital_id` | `UUID` | `NOT NULL REFERENCES hospitals(id)` | Hospital reference |
| `patient_account_id` | `UUID` | `REFERENCES patient_accounts(id)` | Patient profile linkage |
| `patient_phone` | `TEXT` | `NOT NULL` | Direct phone lookup index |
| `patient_name` | `TEXT` | `NOT NULL` | Patient name on report |
| `test_id` | `UUID` | `REFERENCES diagnostic_tests(id)` | Linked investigation |
| `test_name` | `TEXT` | `NOT NULL` | Test name |
| `report_date` | `DATE` | `NOT NULL` | Date of test/report |
| `storage_path` | `TEXT` | `NOT NULL` | File path in private bucket |
| `file_name` | `TEXT` | `NOT NULL` | Original filename |
| `mime_type` | `TEXT` | `DEFAULT 'application/pdf'` | MIME validation |
| `file_size_bytes` | `BIGINT` | `DEFAULT 0 NOT NULL` | File size for bandwidth tracking |
| `technician_name` | `TEXT` | — | Pathologist / Radiologist name |
| `status` | `TEXT` | `CHECK (IN ('processing', 'ready', 'delivered'))` | Report delivery status |
| `notification_sent` | `BOOLEAN` | `DEFAULT FALSE NOT NULL` | WhatsApp alert delivery flag |
| `download_count` | `INT` | `DEFAULT 0 NOT NULL` | Access audit counter |

**Indexes:**
- `idx_diagnostic_reports_patient` ON `patient_account_id`
- `idx_diagnostic_reports_phone` ON `patient_phone`

---

### 2.7. `public.clinical_notes`
Doctor outpatient consultation notes, recorded during or after OPD consultations.

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | Clinical note UUID |
| `hospital_id` | `UUID` | `NOT NULL REFERENCES hospitals(id)` | Hospital reference |
| `appointment_id` | `UUID` | `REFERENCES appointments(id) ON DELETE CASCADE`| Linked consultation |
| `doctor_id` | `UUID` | `NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT`| Attending physician |
| `patient_phone` | `TEXT` | `NOT NULL` | Patient phone |
| `patient_name` | `TEXT` | `NOT NULL` | Patient name |
| `diagnosis_summary` | `TEXT` | — | Clinical provisional diagnosis |
| `prescription_notes` | `TEXT` | — | Medication and dosage advice |
| `vitals` | `JSONB` | `DEFAULT '{}'::jsonb NOT NULL` | Blood pressure, pulse, SpO2, temp, weight |
| `follow_up_date` | `DATE` | — | Recommended next review date |

**Indexes:**
- `idx_clinical_notes_appointment` ON `appointment_id`
- `idx_clinical_notes_doctor` ON `doctor_id`

---

### 2.8. `public.cms_announcements` & `public.cms_careers`
Content management tables powering the public hospital website notices, health alerts, and job vacancies:
- `cms_announcements`: Supports categories (`Notice`, `Health Advisory`, `News`, `Event`, `Emergency`), emergency alert banners, markdown content, and publish dates.
- `cms_careers`: Supports hospital vacancies (Staff Nurse, Lab Technician, Pharmacist, Medical Officer), qualifications, experience, and application deadlines.

---

## 3. Seed Catalog Summary

The migration incorporates verified initial catalog data:
1. **Diagnostic Categories (4):**
   - Pathology & Blood Tests (`PATH`)
   - Radiology & Imaging (`RAD`)
   - Non-Invasive Cardiology (`CARD`)
   - Preventive Health Checkup Packages (`PKG`)
2. **Diagnostic Tests (10 Core Investigations):**
   - Complete Blood Count (CBC) — ₹350
   - Fasting Blood Sugar (FBS) — ₹120
   - HbA1c (Glycated Hemoglobin) — ₹550
   - Lipid Profile — ₹650
   - Liver Function Test (LFT) — ₹750
   - Kidney Function Test (KFT) — ₹700
   - Thyroid Stimulating Hormone (TSH) — ₹300
   - Digital Chest X-Ray PA View — ₹400
   - 12-Lead Electrocardiogram (ECG) — ₹300
   - 2D Echocardiography with Color Doppler — ₹1,800
3. **Health Packages (3 Comprehensive Packages):**
   - Comprehensive Health Checkup (`comprehensive-health-checkup`) — ₹2,499 (Original ₹3,800)
   - Healthy Heart Screening (`healthy-heart-screening`) — ₹2,199 (Original ₹3,200)
   - Diabetic Care Package (`diabetic-care-package`) — ₹1,299 (Original ₹1,900)
4. **Announcements (3 Live Advisories):**
   - Seasonal Dengue and Viral Fever Advisory (Kolkata Municipal Corporation guideline)
   - Upgraded 24x7 Digital Diagnostic Laboratory Notice
   - Sunday Specialized Cardiology & Diabetes OPD Notice
5. **Careers (3 Open Positions):**
   - Senior Staff Nurse (ICU & Critical Care)
   - Medical Lab Technician (DMLT / BMLT)
   - Resident Medical Officer (Emergency & Inpatient)

---

## 4. Execution Instructions

To execute this migration against a live Supabase project:
```bash
# Using Supabase CLI:
supabase db push

# Or using psql direct connection:
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres" \
  -f supabase/migrations/20261107000000_healthcare_platform_expansion.sql
```

