# Security, Privacy & Access Control Plan
## Healthcare Compliance, DPDP Act 2023 & Architecture Safeguards

---

### 1. Healthcare Regulatory Framework & Privacy Compliance

Hiramani Memorial Hospital operates within the legal and regulatory framework of the Republic of India. The platform is architected to comply with:

1. **Digital Personal Data Protection (DPDP) Act, 2023**:
   * **Data Fiduciary**: Hiramani Memorial Hospital acts as the Data Fiduciary; technology infrastructure acts as Data Processor.
   * **Notice and Consent**: Explicit, clear consent is recorded before capturing patient contact numbers or initiating WhatsApp communications.
   * **Data Minimization**: Only information essential for clinical scheduling and report delivery (name, phone, age, gender) is collected.
   * **Right to Erasure & Correction**: Patients have mechanisms to request correction of demographic records or deletion of historical contact logs.

2. **Digital Information Security in Healthcare Act (DISHA) Principles**:
   * Patient health data (diagnostic reports, consultation notes) is classified as **Sensitive Personal Data (SPD)**.
   * Encryption in transit (TLS 1.3) and encryption at rest (AES-256) are mandatory.

3. **NMC Telemedicine Practice Guidelines**:
   * The digital platform facilitates in-person OPD consultation scheduling and logistics; it does not replace physician clinical discretion.

---

### 2. Comprehensive Role-Based Access Control (RBAC) Matrix

Access permissions are enforced at two levels: **Next.js Server Middleware** and **PostgreSQL Row Level Security (RLS)**.

| Role | Appointments | Patient Profiles | Diagnostic Tests | Patient Reports | Hospital Settings | Audit Logs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Anonymous Visitor** | Create (via Booking Wizard) | None | Read Active | None | Read Public | None |
| **Authenticated Patient** | Read/Cancel Own | Read/Update Own | Read Active | Read/Download Own | Read Public | None |
| **Receptionist** | Full Management | Read/Create (Walk-ins) | Read Active | None | Read Public | Create Ticket |
| **Doctor** | Read Assigned | Read Assigned | Read Active | Read Assigned | Read Public | Add Clinical Notes |
| **Lab Technician** | Read Patient Info | Read Patient Info | Full Management | Create / Upload | Read Public | Upload Log |
| **Billing / TPA Staff** | Read Fees / Status | Read Billing Info | Read Active | None | Read Public | Payment Log |
| **Hospital Admin** | Full Management | Full Management | Full Management | Full Management | Full Management | Read All Logs |
| **Super Admin** | Full System Access | Full System Access | Full System Access | Full System Access | Full System Access | Full System Access |

---

### 3. Patient Document Privacy & Storage Architecture

Diagnostic laboratory and radiology reports contain sensitive medical data. They are protected by an isolated private vault:

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             SECURE STORAGE VAULT ARCHITECTURE                    │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  [Private Supabase Bucket: "patient-reports"]                                    │
│  ├── Visibility: PRIVATE (Zero public read access)                              │
│  ├── Encryption: AES-256 Server-Side Encryption                                  │
│  └── Path Structure:                                                             │
│      patient-reports/{hospital_id}/{patient_account_id}/{report_uuid}.pdf        │
│                                                                                  │
│  DOWNLOAD AUTHENTICATION FLOW:                                                   │
│  1. Patient requests: GET /api/diagnostics/reports/download?id=<uuid>            │
│  2. Server verifies caller session: auth.uid === report.patient_account_id       │
│  3. Server signs short-lived HMAC URL (Valid for 300 seconds / 5 minutes)        │
│  4. Server logs access in `public.audit_logs`:                                    │
│     (user_id, action="REPORT_DOWNLOAD", report_id, ip_address, timestamp)        │
│  5. Client redirected to signed URL; token expires immediately after download.   │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4. Application & API Defense Safeguards

#### A. Webhook Signature Verification (Meta WhatsApp Cloud API)
To prevent webhook spoofing, all incoming requests from Meta are validated using HMAC-SHA256 signature verification with timing-attack prevention:
```typescript
public static verifyWebhookSignature(rawBody: string, signatureHeader?: string | null): boolean {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) {
    return false;
  }
  const signature = signatureHeader.substring(7);
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET!)
    .update(rawBody)
    .digest('hex');

  const sigBuffer = Buffer.from(signature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}
```

#### B. Race Condition & Double-Booking Protection
Concurrency control is handled via PostgreSQL database constraints rather than application-layer locks:
```sql
CREATE UNIQUE INDEX idx_appointments_no_double_booking 
ON public.appointments(doctor_id, appointment_date, start_time) 
WHERE status NOT IN ('cancelled');
```
* If two patients simultaneously submit a booking for `Dr. Sourav Mukherjee` on `2026-11-10 at 10:00 AM`, the database accepts the first commit and rejects the second with a unique constraint violation. The application intercepts this and returns a polite conflict response (`HTTP 409: Slot has just been reserved`).

#### C. Input Sanitization & Server-Side Validation
* All incoming requests are validated against strict **Zod schemas**.
* Mobile numbers are validated against Indian E.164 telecommunications standards (`/^(?:\+91|91)?[6789]\d{9}$/`).
* SQL queries utilize parameterized statements via Supabase client, preventing SQL injection.

#### D. Rate Limiting & Abuse Prevention
* OTP verification and booking endpoints are rate-limited (e.g., maximum 5 OTP requests per phone number per hour; maximum 10 booking attempts per IP per 10 minutes) to prevent SMS/WhatsApp resource exhaustion and denial-of-service.

---

### 5. Clinical Safety & Medical Liability Guardrails

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          CLINICAL SAFETY MANDATES                                │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  1. NO MEDICAL DIAGNOSIS                                                         │
│     The AI assistant and WhatsApp bot are strictly forbidden from interpreting   │
│     symptoms or offering medical diagnoses (e.g., "You might have malaria").     │
│                                                                                  │
│  2. NO PRESCRIPTION OR DOSAGE ADVICE                                             │
│     The platform will never recommend medications, suggest dosages, or adjust   │
│     prescriptions. Such requests are met with immediate consultation guidance.   │
│                                                                                  │
│  3. PERMANENT EMERGENCY CALL-TO-ACTION                                           │
│     Every response, webpage, and conversational menu carries an immutable         │
│     emergency disclaimer:                                                        │
│     "জরুরি চিকিৎসার জন্য WhatsApp বার্তার অপেক্ষা করবেন না। আমাদের 24/7 জরুরি   │
│      নম্বরে (+91 9477589578) কল করুন।"                                          │
│     "In case of medical emergency, do not wait for chat replies. Call our        │
│      24/7 Emergency Desk immediately."                                           │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 6. Development & Test Data Sanitization Rules

1. **Zero Real Patient Data**: Development, testing, and staging environments must never contain real patient names, phone numbers, or clinical documents.
2. **Synthetic Seed Data**: Only clearly fictional test data (e.g., `Dr. Sourav Mukherjee`, `patient_phone: +919830012345`) may be used in seeds and automated Vitest suites.
3. **Secret Isolation**: Production environment variables (`SUPABASE_SERVICE_ROLE_KEY`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_APP_SECRET`) must never be committed to git repositories or exposed in client-side bundles.

