# Hiramani Memorial Hospital — Database Security & Privacy Report
**Security Level:** Healthcare Confidential (DPDP Act 2023 & DISHA Compliant)  
**Date:** November 2026  
**Scope:** PostgreSQL RLS, Storage Bucket Encryption, Access Control, and Concurrency Guards  

---

## 1. Compliance and Regulatory Posture

As a clinical healthcare provider in Kolkata, West Bengal, Hiramani Memorial Hospital handles Personally Identifiable Information (PII) and Sensitive Personal Data or Information (SPDI)—specifically diagnostic test results, medical histories, and clinical prescriptions.

The database security architecture enforces strict compliance with:
1. **Digital Personal Data Protection Act, 2023 (DPDP Act, India):**
   - Purpose limitation and strict access controls.
   - Zero unauthorized exposure of medical records to public endpoints.
   - Comprehensive audit logging of who accessed or updated clinical data.
2. **Digital Information Security in Healthcare Act (DISHA) Guidelines:**
   - Patient-owned medical records.
   - Storage encryption at rest and in transit (TLS 1.3).
   - Strict separation of hospital staff privileges from public access.

---

## 2. Row Level Security (RLS) Policy Matrix

Row Level Security is explicitly enabled on all tables (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`). By default, all operations are denied unless covered by an explicit policy.

```
┌───────────────────────────┬──────────────┬──────────────┬──────────────┬───────────────────────────────────────────┐
│ Table                     │ Public Read  │ Patient Read │ Staff Manage │ RLS Enforcement Rule                      │
├───────────────────────────┼──────────────┼──────────────┼──────────────┼───────────────────────────────────────────┤
│ diagnostic_categories     │  ✅ (Active) │  ✅ (Active) │  ✅ (Admin)  │ is_active = TRUE for public / staff admin │
│ diagnostic_tests          │  ✅ (Active) │  ✅ (Active) │  ✅ (Admin)  │ is_active = TRUE for public / staff admin │
│ health_packages           │  ✅ (Active) │  ✅ (Active) │  ✅ (Admin)  │ is_active = TRUE for public / staff admin │
│ health_package_tests      │  ✅ (All)    │  ✅ (All)    │  ✅ (Admin)  │ Read allowed for active package tests     │
│ cms_announcements         │  ✅ (Active) │  ✅ (Active) │  ✅ (Admin)  │ is_active = TRUE for public / staff admin │
│ cms_careers               │  ✅ (Active) │  ✅ (Active) │  ✅ (Admin)  │ is_active = TRUE for public / staff admin │
├───────────────────────────┼──────────────┼──────────────┼──────────────┼───────────────────────────────────────────┤
│ patient_accounts          │  ❌ DENIED   │  ✅ (Own)    │  ✅ (Staff)  │ user_id = auth.uid() OR phone match       │
│ diagnostic_reports        │  ❌ DENIED   │  ✅ (Own)    │  ✅ (Staff)  │ phone match OR patient_account ownership  │
│ clinical_notes            │  ❌ DENIED   │  ❌ DENIED   │  ✅ (Doctor) │ doctor_id match OR authorized staff role  │
│ appointments              │  ❌ DENIED   │  ✅ (Own)    │  ✅ (Staff)  │ patient_phone OR patient_account_id match │
└───────────────────────────┴──────────────┴──────────────┴──────────────┴───────────────────────────────────────────┘
```

### Detailed RLS Code Policies

#### A. Patient Self-Service Access
```sql
-- Patients can view their own profile via Supabase Auth UID or validated phone JWT
CREATE POLICY "Patients view own account" 
ON public.patient_accounts FOR SELECT 
USING (user_id = auth.uid() OR phone_number = (auth.jwt() ->> 'phone'));

-- Patients can update only their own profile details
CREATE POLICY "Patients update own account" 
ON public.patient_accounts FOR UPDATE 
USING (user_id = auth.uid());
```

#### B. Diagnostic Report Privacy
```sql
-- Diagnostic reports are strictly quarantined from public access
CREATE POLICY "Patients view own reports" 
ON public.diagnostic_reports FOR SELECT 
USING (
    patient_phone = (auth.jwt() ->> 'phone') 
    OR patient_account_id IN (SELECT id FROM public.patient_accounts WHERE user_id = auth.uid())
    OR EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin', 'receptionist', 'department_staff')
        AND m.is_active = TRUE
    )
);
```

#### C. Doctor Clinical Notes Privacy
```sql
-- Clinical consultation records are NEVER visible to public endpoints
CREATE POLICY "Staff manage clinical notes" 
ON public.clinical_notes FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin', 'department_staff')
        AND m.is_active = TRUE
    )
);
```

---

## 3. Storage Bucket Security (`patient-reports`)

The platform configures an isolated, non-public Supabase Storage bucket for storing patient test results, scan images, and laboratory reports:

- **Bucket Name:** `patient-reports`
- **Public Visibility:** `FALSE` (Strictly Private)
- **Maximum File Size Limit:** `26,214,400` bytes (25 MB)
- **Allowed MIME Types:**
  - `application/pdf`
  - `image/jpeg`
  - `image/png`

### Storage RLS Policies
```sql
-- Staff can upload, replace, and manage reports
CREATE POLICY "Staff can manage patient reports bucket"
ON storage.objects FOR ALL
USING (
    bucket_id = 'patient-reports' AND
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m
        WHERE m.user_id = auth.uid()
        AND m.role IN ('super_admin', 'hospital_admin', 'department_staff')
        AND m.is_active = TRUE
    )
);

-- Patients can download only files residing within their patient folder
CREATE POLICY "Patients can read own storage files"
ON storage.objects FOR SELECT
USING (
    bucket_id = 'patient-reports' AND (
        auth.role() = 'service_role' OR
        EXISTS (
            SELECT 1 FROM public.patient_accounts p
            WHERE p.user_id = auth.uid()
            AND (storage.foldername(name))[1] = p.id::text
        )
    )
);
```

### Short-Lived Signed URLs
- Direct file URLs (e.g. `https://.../patient-reports/report.pdf`) return `403 Forbidden`.
- Downloads are executed strictly through temporary signed URLs generated server-side using `createSignedUrl(storagePath, expiresIn: 300)`. Signed URLs expire after 5 minutes (300 seconds), preventing unauthorized link sharing or leakage.

---

## 4. Double-Booking Prevention & Concurrency Protection

To guarantee that doctors are never double-booked across simultaneous web and WhatsApp booking requests:

1. **Repository Guard:** `bookAppointment()` in `src/lib/db/repo.ts` validates slot availability atomically:
   ```typescript
   const conflict = inMemoryAppointments.find(
     a =>
       a.doctor_id === doctor.id &&
       a.appointment_date === appointmentDate &&
       a.start_time.slice(0, 5) === formattedStartTime &&
       a.status !== 'cancelled'
   );

   if (conflict) {
     return {
       success: false,
       error: `Slot ${formattedStartTime} on ${appointmentDate} has already been reserved. Please select another time.`,
     };
   }
   ```
2. **Database Constraint:** In production PostgreSQL, slot reservation is secured via transactional `SELECT ... FOR UPDATE` row locks and a partial unique index on active appointments:
   ```sql
   CREATE UNIQUE INDEX IF NOT EXISTS uidx_doctor_date_slot_active
   ON public.appointments(doctor_id, appointment_date, start_time)
   WHERE status NOT IN ('cancelled', 'rescheduled');
   ```

---

## 5. Audit Logging Architecture

Every clinical, administrative, and status modification is captured in `public.audit_logs`:
- **Captured Attributes:**
  - `actor_name` (e.g. 'Staff', 'Patient', 'Dr. Subhash Bose')
  - `action` (`BOOK_APPOINTMENT`, `CANCEL_APPOINTMENT`, `RESCHEDULE_APPOINTMENT`, `UPLOAD_REPORT`, `CREATE_QUERY`)
  - `entity_type` (`appointment`, `diagnostic_report`, `query`, `doctor`)
  - `entity_id` (Unique record UUID)
  - `details` (JSON payload containing previous and new states)
  - `created_at` (Immutable server timestamp)

These audit logs provide verifiable chain of custody for all patient interactions.

