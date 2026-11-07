'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  PhoneCall,
  Search,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Building2,
  ArrowRight,
  Info,
  Calendar,
  AlertTriangle,
  FileCheck,
  Hospital,
  Receipt,
  Users,
  MessageSquare,
  BadgeAlert,
  ExternalLink,
} from 'lucide-react';

interface InsuranceProvider {
  id: string;
  name: string;
  type: 'tpa' | 'insurer' | 'govt';
  typeName: string;
  tollFree?: string;
  portalUrl?: string;
  status: 'Empanelled Partner' | 'Direct Coordination' | 'Government Scheme' | 'Reimbursement Facilitation';
  verified: boolean;
  notes: string;
}

const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  {
    id: 'star-health',
    name: 'Star Health and Allied Insurance',
    type: 'insurer',
    typeName: 'Standalone Health Insurer',
    tollFree: '1800 425 2255',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Direct cashless empanelment for planned surgeries and emergency admissions.',
  },
  {
    id: 'medi-assist',
    name: 'Medi Assist Insurance TPA Pvt. Ltd.',
    type: 'tpa',
    typeName: 'Third Party Administrator (TPA)',
    tollFree: '1800 425 9449',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Processes corporate and retail health policies for major public and private underwriters.',
  },
  {
    id: 'care-health',
    name: 'Care Health Insurance (Religare)',
    type: 'insurer',
    typeName: 'Standalone Health Insurer',
    tollFree: '1800 102 4488',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Pre-authorization processing for comprehensive family floater and senior citizen policies.',
  },
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO General Insurance',
    type: 'insurer',
    typeName: 'General Insurance Company',
    tollFree: '1800 266 6400',
    status: 'Direct Coordination',
    verified: true,
    notes: 'Facilitated via in-house TPA claims desk with online portal submission.',
  },
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General Insurance',
    type: 'insurer',
    typeName: 'General Insurance Company',
    tollFree: '1800 2666',
    status: 'Direct Coordination',
    verified: true,
    notes: 'Fast-track electronic pre-auth clearance for scheduled in-patient admissions.',
  },
  {
    id: 'paramount-tpa',
    name: 'Paramount Health Services & Insurance TPA',
    type: 'tpa',
    typeName: 'Third Party Administrator (TPA)',
    tollFree: '1800 22 66 55',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Empanelled for PSU insurers including National Insurance, New India, Oriental, and United India.',
  },
  {
    id: 'vidal-tpa',
    name: 'Vidal Health Insurance TPA Pvt. Ltd.',
    type: 'tpa',
    typeName: 'Third Party Administrator (TPA)',
    tollFree: '1800 425 8885',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Empanelled administrator for corporate enterprise health covers and banking staff policies.',
  },
  {
    id: 'raksha-tpa',
    name: 'Raksha Health Insurance TPA Pvt. Ltd.',
    type: 'tpa',
    typeName: 'Third Party Administrator (TPA)',
    tollFree: '1800 180 1444',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Processes public sector insurance policies with digital query resolution.',
  },
  {
    id: 'heritage-tpa',
    name: 'Heritage Health Insurance TPA Pvt. Ltd.',
    type: 'tpa',
    typeName: 'Third Party Administrator (TPA)',
    tollFree: '1800 102 4547',
    status: 'Empanelled Partner',
    verified: true,
    notes: 'Active network across West Bengal for state PSU employees and retail health covers.',
  },
  {
    id: 'niva-bupa',
    name: 'Niva Bupa Health Insurance (Max Bupa)',
    type: 'insurer',
    typeName: 'Standalone Health Insurer',
    tollFree: '1860 500 8888',
    status: 'Direct Coordination',
    verified: true,
    notes: 'Cashless assistance with pre-authorization coordination at hospital admission desk.',
  },
  {
    id: 'bajaj-allianz',
    name: 'Bajaj Allianz General Insurance',
    type: 'insurer',
    typeName: 'General Insurance Company',
    tollFree: '1800 209 5858',
    status: 'Direct Coordination',
    verified: true,
    notes: 'HAT (Health Administration Team) pre-authorization support for in-patient care.',
  },
  {
    id: 'swasthya-sathi',
    name: 'Swasthya Sathi Scheme (Govt. of West Bengal)',
    type: 'govt',
    typeName: 'State Health Assurance Scheme',
    tollFree: '1800 345 5384',
    status: 'Government Scheme',
    verified: true,
    notes: 'Smart Card-based hospitalization assistance subject to department package availability and biometric verification.',
  },
];

export function InsuranceClient() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tpa' | 'insurer' | 'govt'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredProviders = useMemo(() => {
    return INSURANCE_PROVIDERS.filter((provider) => {
      const matchesCategory =
        activeCategory === 'all' || provider.type === activeCategory;
      const matchesSearch =
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.notes.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const faqs = [
    {
      q: 'How does the cashless hospitalization process work at Hiramani Memorial Hospital?',
      a: 'When you are advised in-patient admission, bring your health insurance card / TPA e-card, policy document, and government photo ID (Aadhaar or Voter ID) to our dedicated TPA Desk on the Ground Floor. Our team will verify your coverage, coordinate with the treating consultant to complete the pre-authorization form, and submit the medical docket electronically to your insurance company or TPA. Once the initial pre-authorization sanction letter is granted, admission proceeds without requiring an initial medical deposit.',
    },
    {
      q: 'What is the required timeline for planned vs. emergency cashless admissions?',
      a: 'For planned surgeries or scheduled admissions, please submit your pre-authorization documents at least 48 to 72 hours prior to your admission date so approval is in hand when you arrive. For emergency casualty admissions, hospitalization begins immediately to stabilize the patient, and our TPA desk submits the pre-authorization within 4 to 6 hours of admission upon clinical assessment.',
    },
    {
      q: 'Why is the initial pre-authorization sanction amount lower than the final hospital bill?',
      a: 'Insurance companies and TPAs typically approve an initial provisional sanction amount to initiate cashless care. During hospitalization, as treatment progresses, procedures are performed, or the stay length is determined, our TPA desk submits intermediate medical enhancement requests. The final authorization is confirmed at the time of discharge based on the actual itemized hospital bill and discharge summary.',
    },
    {
      q: 'What non-medical expenses are excluded from cashless claim coverage?',
      a: 'Per IRDAI regulations, health insurance policies cover medical treatments, nursing charges, bed charges within eligible room category, OT charges, doctor visit fees, investigations, and prescribed medications. Expenses typically excluded and payable out-of-pocket by the patient include: registration/admission administrative charges, non-medical consumer disposables (tissues, toiletries, thermometer), attendant cots and food, and luxury room differential charges if you choose a room category above your policy limit.',
    },
    {
      q: 'How is the Swasthya Sathi scheme handled at Hiramani Memorial Hospital?',
      a: 'Hiramani Memorial Hospital operates a dedicated government health desk. Beneficiaries must present their original, active Swasthya Sathi Smart Card bearing the head-of-household details along with the patient’s Aadhaar card. Admissions under government scheme packages are subject to state portal biometric verification, bed allocation within scheme wards, and package approval from the state health authority.',
    },
    {
      q: 'What happens if my insurance company is not listed or cashless pre-auth is denied?',
      a: 'If your insurer is not directly empanelled or if the TPA denies cashless pre-authorization due to documentation timing or pre-existing policy clauses, you can still undergo treatment under our transparent standard hospital tariff. Upon discharge, our billing department provides a comprehensive reimbursement dossier containing stamped final itemized bills, payment receipts with revenue stamps, full discharge summary, surgical operative notes, and original lab/radiology reports for you to file a direct reimbursement claim with your insurer.',
    },
  ];

  return (
    <div className="space-y-12 pb-20 bg-white text-[#182B3D]">
      {/* 1. Page Header & Breadcrumb Trail */}
      <section className="pt-6 sm:pt-10 pb-8 sm:pb-10 bg-[#F7FAF9] border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/patient-info" className="hover:text-[#15965C] transition">Patient Services</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-medium">Cashless Insurance & Swasthya Sathi</span>
          </nav>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#15965C] bg-[#15965C]/10 px-3 py-1 rounded-full w-fit">
            <CreditCard className="w-3.5 h-3.5 text-[#15965C]" />
            <span>ভর্তি ও ক্যাশলেস স্বাস্থ্যবিমা সহায়তা কেন্দ্র • Ground Floor Counter 3</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#103653] tracking-tight break-words">
            Cashless Hospitalization & Mediclaim Desk
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Hiramani Memorial Hospital provides smooth, hassle-free cashless hospitalization for families across Krishnanagar and Nadia district. Our dedicated desk at Counter 3 assists you with Swasthya Sathi, private health insurance, and TPAs from admission to final discharge so you can focus entirely on recovery.
          </p>
        </div>
      </section>

      {/* 2. Key Service Pillars & Admission Timelines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Planned Hospitalization */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm hover:border-[#15965C]/40 transition">
            <div className="w-10 h-10 rounded-lg bg-[#F4F8F5] text-[#15965C] flex items-center justify-center font-bold text-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#15965C]">
                Planned Surgery / Admission
              </span>
              <h3 className="text-base font-bold text-[#103653]">
                Bring papers 2–3 days ahead
              </h3>
            </div>
            <p className="text-xs text-[#526273] leading-relaxed">
              If your doctor has scheduled an operation or hospital stay, bring your doctor’s slip, test reports, and insurance card to Counter 3 at least 48 to 72 hours early so cashless approval is ready when you arrive.
            </p>
          </div>

          {/* Emergency Hospitalization */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-white space-y-3 shadow-sm hover:border-[#159FDB]/40 transition">
            <div className="w-10 h-10 rounded-lg bg-[#F0F8FC] text-[#159FDB] flex items-center justify-center font-bold text-sm">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#159FDB]">
                Emergency Casualty Care
              </span>
              <h3 className="text-base font-bold text-[#103653]">
                Submit papers within 4–6 hours
              </h3>
            </div>
            <p className="text-xs text-[#526273] leading-relaxed">
              In an emergency, treatment begins immediately without waiting for paperwork. Family members can submit the patient’s insurance card and Aadhaar to our desk within 4 to 6 hours after admission.
            </p>
          </div>

          {/* Dedicated Desk Location & Support */}
          <div className="p-5 rounded-xl border border-[#103653] bg-[#103653] text-white space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-sm">
              <Building2 className="w-5 h-5 text-[#159FDB]" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#159FDB]">
                In-Person Assistance
              </span>
              <h3 className="text-base font-bold text-white">
                TPA Helpdesk — Counter 3
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ground Floor, Main Hospital Building (Next to Emergency Registration), Nediarpara, Krishnanagar. Open Mon–Sat 8:00 AM – 8:00 PM with 24/7 coordination for emergency cases.
            </p>
            <div className="pt-1">
              <a
                href="tel:+917872957300"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#15965C] hover:bg-[#117A4A] px-3 py-1.5 rounded-lg transition shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Helpdesk: +91 78729 57300</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Empanelled Insurers & TPAs Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5EBEF] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15965C]">
              <ShieldCheck className="w-4 h-4 text-[#15965C]" />
              <span>সহযোগী স্বাস্থ্যবিমা ও টিপিএ তালিকা / Network Partners & TPAs</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
              Health Insurance & TPA Directory
            </h2>
            <p className="text-xs text-[#526273]">
              Search by insurer name or filter by category. If your insurer is not listed below, consult Counter 3 for fast reimbursement support.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insurer or TPA..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#E5EBEF] bg-[#F7FAF9] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#15965C] focus:border-[#15965C] transition"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCategory === 'all'
                ? 'bg-[#103653] text-white shadow-sm'
                : 'bg-[#F7FAF9] text-[#526273] hover:text-[#103653] hover:bg-slate-200/60'
            }`}
          >
            All Partners ({INSURANCE_PROVIDERS.length})
          </button>
          <button
            onClick={() => setActiveCategory('tpa')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCategory === 'tpa'
                ? 'bg-[#103653] text-white shadow-sm'
                : 'bg-[#F7FAF9] text-[#526273] hover:text-[#103653] hover:bg-slate-200/60'
            }`}
          >
            Third Party Administrators (TPAs)
          </button>
          <button
            onClick={() => setActiveCategory('insurer')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCategory === 'insurer'
                ? 'bg-[#103653] text-white shadow-sm'
                : 'bg-[#F7FAF9] text-[#526273] hover:text-[#103653] hover:bg-slate-200/60'
            }`}
          >
            Private Insurers
          </button>
          <button
            onClick={() => setActiveCategory('govt')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeCategory === 'govt'
                ? 'bg-[#103653] text-white shadow-sm'
                : 'bg-[#F7FAF9] text-[#526273] hover:text-[#103653] hover:bg-slate-200/60'
            }`}
          >
            Government Schemes (Swasthya Sathi)
          </button>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.length === 0 ? (
            <div className="col-span-full p-8 text-center rounded-xl border border-dashed border-[#E5EBEF] bg-[#F7FAF9] space-y-2">
              <p className="text-sm font-semibold text-[#103653]">No matching insurance partners found</p>
              <p className="text-xs text-[#526273]">
                Try adjusting your search terms or contact our TPA desk directly at +91 78729 57300 to confirm cashless coverage for your policy.
              </p>
            </div>
          ) : (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="p-4 rounded-xl border border-[#E5EBEF] bg-white hover:border-[#15965C] transition space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {provider.typeName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded border ${
                        provider.status === 'Empanelled Partner'
                          ? 'text-[#15965C] bg-[#F4F8F5] border-[#15965C]/20'
                          : provider.status === 'Government Scheme'
                          ? 'text-amber-800 bg-amber-50 border-amber-200'
                          : 'text-[#103653] bg-slate-100 border-slate-200'
                      }`}
                    >
                      {provider.verified && <CheckCircle2 className="w-3 h-3 text-[#15965C]" />}
                      {provider.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#103653] leading-snug">
                    {provider.name}
                  </h3>

                  <p className="text-xs text-[#526273] leading-relaxed">
                    {provider.notes}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#E5EBEF] flex items-center justify-between text-[11px] text-[#526273]">
                  {provider.tollFree ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                      <PhoneCall className="w-3 h-3 text-slate-400" />
                      <span>{provider.tollFree}</span>
                    </span>
                  ) : (
                    <span>Helpdesk Assisted</span>
                  )}
                  <Link
                    href="tel:+917872957300"
                    className="text-[11px] font-semibold text-[#15965C] hover:text-[#117A4A] inline-flex items-center gap-0.5"
                  >
                    <span>Verify Policy</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Advisory Callout */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold text-xs block">Official Empanelment & Pre-Authorization Policy:</strong>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              Cashless hospitalisation is strictly governed by individual insurance policy terms, pre-existing condition exclusions, waiting periods, room-rent eligibility caps, and written pre-authorization approval from the respective insurance underwriter or TPA. Active empanelment lists are subject to periodic renewal. Patients are advised to present their cards at Counter 3 for electronic verification prior to scheduled surgical admission.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Special Section: Swasthya Sathi & West Bengal Government Scheme */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-[#15965C]/30 bg-gradient-to-br from-[#F4F8F5] via-white to-[#F0F8FC] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5EBEF] pb-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15965C] bg-[#15965C]/10 px-3 py-1 rounded-full w-fit">
                <Hospital className="w-4 h-4 text-[#15965C]" />
                <span>পশ্চিমবঙ্গ সরকারের স্বাস্থ্য সাথী সহায়তা কেন্দ্র (কাউন্টার ৩)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
                Swasthya Sathi Scheme Guidance for Nadia Families
              </h2>
              <p className="text-xs sm:text-sm text-[#526273] max-w-2xl leading-relaxed">
                Hiramani Memorial Hospital runs a dedicated Swasthya Sathi help counter at our Krishnanagar campus to facilitate hospitalization and authorized packages under West Bengal state government norms.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15965C] text-white text-xs font-semibold shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Counter 3 Open Daily</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-2">
              <div className="text-xs font-semibold text-[#15965C] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>আসল স্মার্ট কার্ড (Original Smart Card)</span>
              </div>
              <h4 className="text-sm font-bold text-[#103653]">Valid Swasthya Sathi Card</h4>
              <p className="text-xs text-[#526273] leading-relaxed">
                The smart card issued by the Dept. of Health & Family Welfare (Govt. of WB) in the name of the female head of the family must be presented in original along with biometric verification.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-2">
              <div className="text-xs font-semibold text-[#159FDB] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4" />
                <span>প্যাকেজ ও বেড বুকিং (Package & Ward)</span>
              </div>
              <h4 className="text-sm font-bold text-[#103653]">Pre-Authorization & Ward Allocation</h4>
              <p className="text-xs text-[#526273] leading-relaxed">
                Treatments are provided under approved state scheme clinical packages and ward categories. Package pre-authorization is blocked on the state portal by the hospital nodal officer upon admission.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5EBEF] space-y-2">
              <div className="text-xs font-semibold text-[#103653] flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>নথিপত্র (Required Documents)</span>
              </div>
              <h4 className="text-sm font-bold text-[#103653]">Aadhaar & Doctor Referral</h4>
              <p className="text-xs text-[#526273] leading-relaxed">
                Please bring original Smart Card, Aadhaar Card of patient & cardholder, Khadya Sathi (Ration Card), and doctor consultation slip with diagnosis and admission advice.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#526273] border-t border-[#E5EBEF]">
            <p>
              For Swasthya Sathi package availability and bed reservation queries in Krishnanagar, speak directly with our Government Scheme Desk.
            </p>
            <div className="flex items-center gap-3 shrink-0 font-medium">
              <a
                href="tel:+917872957300"
                className="text-[#15965C] hover:text-[#117A4A] font-bold inline-flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Swasthya Sathi Helpdesk: +91 78729 57300</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-Stage Step-by-Step Cashless Hospitalization Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-semibold text-[#15965C]">
            ক্যাশলেস ভর্তি প্রক্রিয়া / 4 Simple Steps
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            How Cashless Hospitalization Works for Patients
          </h2>
          <p className="text-xs text-[#526273]">
            A clear step-by-step path designed so families don't face financial strain or confusion during emergency or planned treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#15965C]">ধাপ ১ • Step 1</span>
                <span className="text-xs text-slate-500 font-medium">Ground Floor</span>
              </div>
              <h3 className="text-sm font-bold text-[#103653]">Document Check at Counter 3</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Visit the TPA Desk (Counter 3) with insurance card or Swasthya Sathi card, doctor's admission slip, test reports, and patient Aadhaar.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5EBEF] text-[11px] font-semibold text-[#15965C] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pre-Auth Form Signed</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#159FDB]">ধাপ ২ • Step 2</span>
                <span className="text-xs text-slate-500 font-medium">Fast-Track</span>
              </div>
              <h3 className="text-sm font-bold text-[#103653]">Initial Approval Letter</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Our TPA desk sends the papers electronically to the insurance company. The insurer issues an initial approval sanctioning the admission.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5EBEF] text-[11px] font-semibold text-[#159FDB] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Medical Deposit</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#15965C]">ধাপ ৩ • Step 3</span>
                <span className="text-xs text-slate-500 font-medium">In-Ward Care</span>
              </div>
              <h3 className="text-sm font-bold text-[#103653]">Treatment & Cost Updates</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Patient receives clinical care, nursing, and medicines. If medical requirements expand, our desk files intermediate enhancement requests directly.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5EBEF] text-[11px] font-semibold text-[#15965C] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Coordinated By Desk</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#159FDB]">ধাপ ৪ • Step 4</span>
                <span className="text-xs text-slate-500 font-medium">Discharge</span>
              </div>
              <h3 className="text-sm font-bold text-[#103653]">Final Discharge & Settlement</h3>
              <p className="text-xs text-[#526273] leading-relaxed">
                Doctor issues the discharge summary. Billing submits final bills to the TPA. Patient only pays for small non-medical consumables, then heads home.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5EBEF] text-[11px] font-semibold text-[#159FDB] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Direct Insurer Settlement</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Document Checklist: Planned vs. Emergency Admission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-semibold text-[#15965C]">
            প্রয়োজনীয় কাগজপত্র / Documentation Checklist
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Mandatory Documents Checklist for Cashless Clearance
          </h2>
          <p className="text-xs text-[#526273]">
            Keep clear photocopies and original government documents ready at Counter 3 to ensure instant pre-authorization without delay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Planned Admission Checklist */}
          <div className="p-5 sm:p-6 rounded-xl border border-[#E5EBEF] bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E5EBEF] pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#15965C]" />
                <h3 className="text-sm font-bold text-[#103653]">Planned Hospitalization Checklist</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#15965C] bg-[#F4F8F5] px-2 py-0.5 rounded border border-[#15965C]/20">
                48h Prior to Admission
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-[#526273]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <span><strong>Original Health Insurance Card / Policy Schedule:</strong> Valid policy copy displaying policy number, member ID, sum insured, and validity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <span><strong>Government Photo Identity Proof:</strong> Aadhaar Card, Voter ID, or PAN Card of patient and policyholder (2 photocopies each).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <span><strong>Doctor’s Consultation Slip:</strong> Requisition slip specifying provisional diagnosis and recommended surgery or admission.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <span><strong>Diagnostic Investigation Reports:</strong> Pathology, USG, X-ray, CT scan, or ECG records supporting the diagnosis.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15965C] shrink-0 mt-0.5" />
                <span><strong>Bank Cheque / Passbook Copy:</strong> Primary insured account details for direct electronic claims settlement.</span>
              </li>
            </ul>
          </div>

          {/* Emergency Admission Checklist */}
          <div className="p-5 sm:p-6 rounded-xl border border-[#E5EBEF] bg-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E5EBEF] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#159FDB]" />
                <h3 className="text-sm font-bold text-[#103653]">Emergency Casualty Checklist</h3>
              </div>
              <span className="text-[11px] font-semibold text-[#159FDB] bg-[#F0F8FC] px-2 py-0.5 rounded border border-[#159FDB]/20">
                Within 4–6h of Admission
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-[#526273]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span><strong>Health Card / Mobile Policy E-Card:</strong> TPA Member ID or policy number stored on WhatsApp or insurance app.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span><strong>Emergency Admission Memo:</strong> Generated by Hiramani casualty emergency medical officer upon triage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span><strong>Aadhaar / Voter ID of Attendant:</strong> Identification of the family member or relative authorizing admission consent.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span><strong>First Information Report (FIR) / MLC Copy:</strong> Required strictly in accidental or trauma casualty cases.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#159FDB] shrink-0 mt-0.5" />
                <span><strong>Modest Provisional Deposit:</strong> Adjusted or refunded immediately upon insurer cashless pre-auth sanction.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. IRDAI Transparency: Covered Medical Expenses vs. Non-Medical Exclusions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-semibold text-[#15965C]">
            বিলিং স্বচ্ছতা / Transparent Hospital Charges
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Understanding Covered Items vs. Non-Medical Exclusions
          </h2>
          <p className="text-xs text-[#526273]">
            As per Insurance Regulatory and Development Authority of India (IRDAI) guidelines, medical treatments are cashless, while personal non-medical items are billed separately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Covered Expenses */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-[#F4F8F5]/60 space-y-3">
            <div className="flex items-center gap-2 text-[#15965C]">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="text-sm font-bold text-[#103653]">Covered by Health Insurance (Subject to Policy Sum)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#182B3D]">
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Bed & Room Charges (Within Cap)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Nursing & Resident Medical Fees</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Surgeon, Anesthetist & OT Fees</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Medications & IV Infusions</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>ICU, Ventilator & Oxygen Charges</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15965C] shrink-0" />
                <span>Pathology & Radiology Tests</span>
              </div>
            </div>
          </div>

          {/* Excluded Non-Medical Expenses */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2 text-slate-700">
              <BadgeAlert className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-[#103653]">Non-Medical Consumables (Payable by Family)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#526273]">
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Admission / Registration Fee</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Personal Toiletries & Tissues</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Attendant Meals & Extra Bedding</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Telephone / Laundry Charges</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Room Rent Differential (If higher tier)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white border border-[#E5EBEF]">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Insurance Deductible / Co-Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Reimbursement Claims Assistance Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-7 rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5EBEF] pb-3">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#15965C]" />
              <h3 className="text-base font-bold text-[#103653]">Direct Reimbursement Claims Assistance</h3>
            </div>
            <span className="text-xs text-[#526273] font-medium">
              For Non-Empanelled Insurers or Denied Pre-Auth Cases
            </span>
          </div>

          <p className="text-xs text-[#526273] leading-relaxed">
            If you choose to pay directly or if your insurer requires direct reimbursement filing, our dedicated billing department prepares a complete, IRDAI-compliant medical claim docket at the time of discharge, complete with all necessary original documents and hospital certifications:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-[#182B3D]">
            <div className="p-3 rounded-lg bg-white border border-[#E5EBEF] space-y-1">
              <span className="font-bold text-[#103653] block">1. Detailed Discharge Summary</span>
              <p className="text-[11px] text-[#526273]">Comprehensive clinical record signed by treating consultant physician.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#E5EBEF] space-y-1">
              <span className="font-bold text-[#103653] block">2. Itemized Final Hospital Bill</span>
              <p className="text-[11px] text-[#526273]">Detailed itemization of pharmacy, nursing, bed charges, and investigations.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#E5EBEF] space-y-1">
              <span className="font-bold text-[#103653] block">3. Stamped Payment Receipts</span>
              <p className="text-[11px] text-[#526273]">Official money receipts bearing hospital seal, serial number, and revenue stamp.</p>
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#E5EBEF] space-y-1">
              <span className="font-bold text-[#103653] block">4. Diagnostic Films & Reports</span>
              <p className="text-[11px] text-[#526273]">Original signed pathology laboratory sheets and radiology investigation films.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions (FAQ Accordion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-3">
          <span className="text-xs font-semibold text-[#15965C]">
            সাধারণ প্রশ্নোত্তর / FAQs
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Frequently Asked Questions on Cashless Mediclaim
          </h2>
          <p className="text-xs text-[#526273]">
            Clear, honest answers to help patients and families navigate insurance approvals with ease.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#E5EBEF] bg-white overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7FAF9] transition"
              >
                <span className="text-sm font-bold text-[#103653] flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#15965C] shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-[#15965C]' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#526273] leading-relaxed border-t border-[#E5EBEF] bg-[#F7FAF9]/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. Direct Helpdesk Banner & WhatsApp Entry Point */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-xl bg-[#103653] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#159FDB]">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>সহায়তার জন্য কল করুন / Dedicated Insurance Coordinator</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Need Instant Pre-Authorization Guidance?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Our on-campus insurance officers in Krishnanagar are available to review your policy details, check eligibility, and prepare pre-authorization forms before your scheduled admission.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="tel:+917872957300"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#15965C] hover:bg-[#117A4A] text-white transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>TPA Desk: +91 78729 57300</span>
            </a>

            <a
              href="https://wa.me/917872957300?text=Hello%20Hiramani%20Hospital,%20I%20would%20like%20to%20verify%20cashless%20insurance%20eligibility%20for%20my%20policy."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#159FDB]" />
              <span>WhatsApp Pre-Check</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
