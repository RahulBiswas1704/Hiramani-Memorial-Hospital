-- ==============================================================================
-- HIRAMANI MEMORIAL HOSPITAL: PHASE 1 HEALTHCARE PLATFORM EXPANSION
-- Migration: 20261107000000_healthcare_platform_expansion.sql
-- Additive Schema: Patient Accounts, Diagnostic Services & Reports,
-- Health Packages, Clinical Doctor Notes, Hospital CMS, and Storage Buckets
-- ==============================================================================

-- 1. PATIENT_ACCOUNTS (Self-service patient portal accounts linked to Supabase auth)
CREATE TABLE IF NOT EXISTS public.patient_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL UNIQUE, -- E.164 normalized format (+91XXXXXXXXXX)
    email TEXT UNIQUE,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    blood_group TEXT CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    preferred_language TEXT DEFAULT 'en' CHECK (preferred_language IN ('en', 'bn', 'hi')),
    is_verified BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for instant lookup by phone and auth user_id
CREATE INDEX IF NOT EXISTS idx_patient_accounts_phone ON public.patient_accounts(phone_number);
CREATE INDEX IF NOT EXISTS idx_patient_accounts_user_id ON public.patient_accounts(user_id);

-- 2. UPDATE APPOINTMENTS TABLE FOR PATIENT PORTAL LINKAGE
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'appointments' 
        AND column_name = 'patient_account_id'
    ) THEN
        ALTER TABLE public.appointments 
        ADD COLUMN patient_account_id UUID REFERENCES public.patient_accounts(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'appointments' 
        AND column_name = 'payment_status'
    ) THEN
        ALTER TABLE public.appointments 
        ADD COLUMN payment_status TEXT DEFAULT 'pay_at_hospital' 
        CHECK (payment_status IN ('pay_at_hospital', 'online_paid', 'exempted'));
    END IF;
END $$;

-- Update booking_channel check constraint to include 'web_portal'
ALTER TABLE public.appointments 
DROP CONSTRAINT IF EXISTS appointments_booking_channel_check;

ALTER TABLE public.appointments 
ADD CONSTRAINT appointments_booking_channel_check 
CHECK (booking_channel IN ('whatsapp', 'web_dashboard', 'web_portal', 'phone', 'walk_in'));

-- 3. DIAGNOSTIC_CATEGORIES (Pathology, Radiology, Non-Invasive Cardiology, Health Packages)
CREATE TABLE IF NOT EXISTS public.diagnostic_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    icon_name TEXT DEFAULT 'Activity' NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(hospital_id, code)
);

-- 4. DIAGNOSTIC_TESTS (Catalog of medical investigations and lab tests)
CREATE TABLE IF NOT EXISTS public.diagnostic_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.diagnostic_categories(id) ON DELETE SET NULL,
    category_name TEXT,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    fasting_required BOOLEAN DEFAULT FALSE NOT NULL,
    preparation_instructions TEXT,
    sample_type TEXT, -- e.g., 'Blood (EDTA)', 'Urine Routine', 'Imaging'
    turnaround_hours INT DEFAULT 24 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(hospital_id, code)
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_tests_category ON public.diagnostic_tests(category_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_tests_active ON public.diagnostic_tests(hospital_id, is_active);

-- 5. HEALTH_PACKAGES (Preventive health checkup packages)
CREATE TABLE IF NOT EXISTS public.health_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    target_gender TEXT DEFAULT 'all' CHECK (target_gender IN ('all', 'male', 'female')),
    price NUMERIC(10, 2) NOT NULL,
    discounted_price NUMERIC(10, 2) NOT NULL,
    sample_count INT DEFAULT 1,
    report_delivery_hours INT DEFAULT 24,
    fasting_required BOOLEAN DEFAULT TRUE NOT NULL,
    preparation_instructions TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    display_order INT DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(hospital_id, slug)
);

-- 6. HEALTH_PACKAGE_TESTS (Junction table mapping tests included in packages)
CREATE TABLE IF NOT EXISTS public.health_package_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.health_packages(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.diagnostic_tests(id) ON DELETE CASCADE,
    display_order INT DEFAULT 0 NOT NULL,
    UNIQUE(package_id, test_id)
);

-- 7. DIAGNOSTIC_REPORTS (Uploaded patient test results & PDFs)
CREATE TABLE IF NOT EXISTS public.diagnostic_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    patient_account_id UUID REFERENCES public.patient_accounts(id) ON DELETE SET NULL,
    patient_phone TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    test_id UUID REFERENCES public.diagnostic_tests(id) ON DELETE SET NULL,
    test_name TEXT NOT NULL,
    report_date DATE NOT NULL,
    storage_path TEXT NOT NULL, -- Path in private Supabase Storage bucket 'patient-reports'
    file_name TEXT NOT NULL,
    mime_type TEXT DEFAULT 'application/pdf' NOT NULL,
    file_size_bytes BIGINT DEFAULT 0 NOT NULL,
    technician_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    technician_name TEXT,
    status TEXT DEFAULT 'ready' CHECK (status IN ('processing', 'ready', 'delivered')),
    notification_sent BOOLEAN DEFAULT FALSE NOT NULL,
    download_count INT DEFAULT 0 NOT NULL,
    patient_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_diagnostic_reports_patient ON public.diagnostic_reports(patient_account_id);
CREATE INDEX IF NOT EXISTS idx_diagnostic_reports_phone ON public.diagnostic_reports(patient_phone);

-- 8. CLINICAL_NOTES (Doctor OPD consultation records)
CREATE TABLE IF NOT EXISTS public.clinical_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(id) ON DELETE RESTRICT,
    patient_phone TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    diagnosis_summary TEXT,
    prescription_notes TEXT,
    vitals JSONB DEFAULT '{}'::jsonb NOT NULL,
    follow_up_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_clinical_notes_appointment ON public.clinical_notes(appointment_id);
CREATE INDEX IF NOT EXISTS idx_clinical_notes_doctor ON public.clinical_notes(doctor_id);

-- 9. CMS_ANNOUNCEMENTS (Hospital news, advisories, dengue alerts)
CREATE TABLE IF NOT EXISTS public.cms_announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Notice', 'Health Advisory', 'News', 'Event', 'Emergency')),
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    is_emergency_alert BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    published_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(hospital_id, slug)
);

-- 10. CMS_CAREERS (Job openings and requirements)
CREATE TABLE IF NOT EXISTS public.cms_careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES public.hospitals(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full-time' CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
    experience_required TEXT NOT NULL,
    qualification_required TEXT NOT NULL,
    description TEXT NOT NULL,
    vacancies INT DEFAULT 1 NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.patient_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_package_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_careers ENABLE ROW LEVEL SECURITY;

-- Public Read for Catalog & CMS
CREATE POLICY "Public can view active diagnostic categories" 
ON public.diagnostic_categories FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active diagnostic tests" 
ON public.diagnostic_tests FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active health packages" 
ON public.health_packages FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active package test mappings" 
ON public.health_package_tests FOR SELECT USING (TRUE);

CREATE POLICY "Public can view active CMS announcements" 
ON public.cms_announcements FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active career openings" 
ON public.cms_careers FOR SELECT USING (is_active = TRUE);

-- Patient Accounts: Patient can view and edit their own account
CREATE POLICY "Patients view own account" 
ON public.patient_accounts FOR SELECT 
USING (user_id = auth.uid() OR phone_number = (auth.jwt() ->> 'phone'));

CREATE POLICY "Patients update own account" 
ON public.patient_accounts FOR UPDATE 
USING (user_id = auth.uid());

-- Diagnostic Reports: Patients view own reports; Staff have full access
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

-- Staff Management Policies: Staff can manage all records
CREATE POLICY "Staff manage diagnostic categories" 
ON public.diagnostic_categories FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin')
    )
);

CREATE POLICY "Staff manage diagnostic tests" 
ON public.diagnostic_tests FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin')
    )
);

CREATE POLICY "Staff manage diagnostic reports" 
ON public.diagnostic_reports FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin', 'department_staff')
    )
);

CREATE POLICY "Staff manage clinical notes" 
ON public.clinical_notes FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.hospital_memberships m 
        WHERE m.user_id = auth.uid() 
        AND m.role IN ('super_admin', 'hospital_admin', 'department_staff')
    )
);

-- ==============================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION (Private 'patient-reports' Bucket)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'patient-reports',
    'patient-reports',
    FALSE,
    26214400, -- 25 MB max file size
    ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
    public = FALSE,
    file_size_limit = 26214400,
    allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png'];

-- Storage RLS: Staff can upload and read all patient reports
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

-- Storage RLS: Authenticated patients can download their own files via signed URLs
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
