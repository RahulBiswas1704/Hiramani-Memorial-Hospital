# Hiramani Memorial Hospital — Environment Setup Guide
**Platform:** Next.js 14 App Router + Supabase + Meta WhatsApp Cloud API  
**Date:** November 2026  
**Status:** Phase 1 Foundation Verified  

---

## 1. Environment Variables Overview

The application uses an `.env.example` template at the root of the workspace. When configuring a local or production environment, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Complete Variable Reference

| Variable Name | Required | Target / Scope | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Yes | Client & Server | The public origin URL (e.g., `http://localhost:3000` or `https://hiramani.co.in`) |
| `NODE_ENV` | Yes | Server | Runtime environment (`development`, `production`, `test`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional in Demo | Client & Server | Supabase project REST URL (`https://<project-ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional in Demo | Client & Server | Public anonymous API key (safe for browser exposure) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional in Demo | **Server Only** | Administrative service role key with RLS bypass (NEVER expose to browser) |
| `WHATSAPP_API_VERSION` | Yes | Server | Meta Graph API version; default is `v21.0` |
| `WHATSAPP_PHONE_NUMBER_ID` | Optional in Demo | Server | 15-digit Meta Phone Number ID for the hospital's registered WhatsApp line |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Optional in Demo | Server | Meta WABA ID (WhatsApp Business Account ID) |
| `WHATSAPP_ACCESS_TOKEN` | Optional in Demo | Server | Permanent System User access token generated in Meta Business Manager |
| `WHATSAPP_APP_SECRET` | Optional in Demo | Server | Meta App Secret used for HMAC-SHA256 signature verification |
| `WHATSAPP_VERIFY_TOKEN` | Yes | Server | Arbitrary secret string configured in Meta Webhooks dashboard |
| `DEFAULT_HOSPITAL_ID` | Yes | Server | Primary multi-tenant hospital UUID (`00000000-0000-0000-0000-000000000001`) |
| `DEFAULT_TIMEZONE` | Yes | Server | Hospital operational timezone (`Asia/Kolkata`) |

---

## 2. Operation Modes

The platform supports two distinct operational modes:

### Mode A: Local Zero-Dependency Demo Mode (Default)
- **Use Case:** Local UI/UX development, automated tests (Vitest), preview builds, and staff walkthroughs without needing external cloud accounts.
- **How it works:** If `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY` contain placeholder values or are omitted, `src/lib/supabase/client.ts` and `server.ts` detect this via `isSupabaseConfigured = false`.
- **Behavior:** The unified repository layer (`src/lib/db/repo.ts`) automatically falls back to an in-memory, concurrency-safe reactive data store initialized with realistic synthetic hospital data (doctors, OPD schedules, diagnostic catalog, health packages, and announcements).
- **Zero Errors:** All features, APIs, and tests function 100% interactively without errors.

### Mode B: Live Production Cloud Mode
- **Use Case:** Production deployment on Netlify or Vercel connected to live Supabase PostgreSQL and Meta WhatsApp Business Cloud API.
- **How it works:** Populated with real credentials in `.env.local` or host dashboard environment variables.

---

## 3. Step-by-Step Supabase Cloud Setup

1. **Create a Supabase Project:**
   - Sign in to [Supabase Console](https://supabase.com/dashboard).
   - Click **New Project**, select organization, enter name `Hiramani Memorial Hospital`, and choose Region `South Asia (Mumbai)` for lowest latency to Kolkata.

2. **Execute Database Migrations:**
   Run the project migrations in chronological order:
   - Migration 1: `supabase/migrations/20261025000000_init_schema.sql` (Baseline hospital entities)
   - Migration 2: `supabase/migrations/20261025000001_hiramani_memorial_update.sql` (Hospital details & branding)
   - Migration 3: `supabase/migrations/20261107000000_healthcare_platform_expansion.sql` (Phase 1 platform expansion)

   *Method A (SQL Editor):* Copy each file's contents into the Supabase SQL Editor and click **Run**.  
   *Method B (Supabase CLI):*
   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

3. **Verify Private Storage Bucket:**
   - In Supabase Dashboard, navigate to **Storage**.
   - Confirm that the `patient-reports` bucket exists with:
     - Public: `Disabled` (Private)
     - Max file size: `25 MB`
     - Allowed MIME types: `application/pdf`, `image/jpeg`, `image/png`

4. **Copy API Keys to `.env.local`:**
   - Navigate to **Project Settings** > **API**.
   - Copy `Project URL` to `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy `anon public` key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy `service_role secret` key to `SUPABASE_SERVICE_ROLE_KEY`.

---

## 4. Meta WhatsApp Business Cloud API Setup

1. **Meta Developer App Creation:**
   - Visit [Meta for Developers](https://developers.facebook.com/).
   - Click **Create App** > Select **Other** > Choose **Business**.
   - App Name: `Hiramani Hospital MediConnect`.

2. **Add WhatsApp Product:**
   - In the App Dashboard, click **Add Product** and select **WhatsApp**.
   - Connect or select your Meta Business Account for Hiramani Memorial Hospital.

3. **Configure System User & Permanent Token:**
   - Go to [Meta Business Settings](https://business.facebook.com/settings/).
   - Under **Users** > **System Users**, create a System User `hiramani-api-bot` with role `Employee`.
   - Assign the WhatsApp app with full control.
   - Click **Generate New Token**, select permissions:
     - `whatsapp_business_messaging`
     - `whatsapp_business_management`
   - Copy token into `WHATSAPP_ACCESS_TOKEN` in `.env.local`.

4. **Configure Webhook:**
   - In Meta App Dashboard, navigate to **WhatsApp** > **Configuration**.
   - Set **Callback URL**: `https://<your-domain>/api/whatsapp/webhook`.
   - Set **Verify Token**: Enter the exact string configured in `WHATSAPP_VERIFY_TOKEN`.
   - Click **Verify and Save**.
   - In Webhook fields, click **Manage** and subscribe to:
     - `messages` (Incoming patient WhatsApp messages)

---

## 5. Security & Credential Hygiene Guidelines

- ⚠️ **Never commit `.env.local`** to Git version control (verified in `.gitignore`).
- ⚠️ **Never prefix service keys** with `NEXT_PUBLIC_`. The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS and must strictly execute in server-only route handlers.
- ⚠️ **Validate Webhook Signatures:** In production, all incoming WhatsApp payloads are verified against `WHATSAPP_APP_SECRET` using HMAC-SHA256 headers (`x-hub-signature-256`).

