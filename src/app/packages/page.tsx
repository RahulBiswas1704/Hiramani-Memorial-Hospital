import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  HeartPulse,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  PhoneCall,
  FileText,
  UserCheck,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Preventive Health Checkup Packages | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Comprehensive preventive health checkup packages: Basic Health, Cardiac Screening, Master Executive, Women’s Wellness, and Senior Citizen Care at Hiramani Memorial Hospital, Krishnanagar, Nadia.',
};

export const revalidate = 60;

export default async function HealthPackagesPage() {
  const packages = await HospitalRepo.getHealthPackages();

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-hospital-green" />
            <span>Preventive Healthcare & Early Disease Detection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Preventive Health Checkup Packages
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Early detection of silent illnesses such as diabetes, hypertension, cardiac risk factors, and fatty liver disease ensures timely clinical intervention. Choose an age- and lifestyle-appropriate package.
          </p>
        </div>
      </section>

      {/* 2. Step-by-Step Preparation Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-hospital-slate text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
              Checkup Day Protocol
            </span>
            <span className="text-xs text-slate-400">
              Sample Collection Counter: 07:30 AM – 11:30 AM (Daily)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-hospital-green/20 text-hospital-green font-bold flex items-center justify-center">1</div>
              <div className="font-bold text-white text-sm">Overnight Fasting</div>
              <p className="text-slate-400">Fast for 10-12 hours prior to arrival. Water is permitted.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-hospital-blue/20 text-hospital-blue font-bold flex items-center justify-center">2</div>
              <div className="font-bold text-white text-sm">Sample Collection</div>
              <p className="text-slate-400">Report to the Ground Floor Diagnostic Desk with your booking SMS.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-hospital-green/20 text-hospital-green font-bold flex items-center justify-center">3</div>
              <div className="font-bold text-white text-sm">Digital Delivery</div>
              <p className="text-slate-400">Reports available in 24 hours via Patient Portal & WhatsApp.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-hospital-blue/20 text-hospital-blue font-bold flex items-center justify-center">4</div>
              <div className="font-bold text-white text-sm">Doctor Consultation</div>
              <p className="text-slate-400">Complimentary physician review of all findings included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-hospital-green shadow-sm hover:shadow-xl transition duration-200 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-5">
                {/* Header Tag & Pricing */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-hospital-green/10 text-hospital-green border border-hospital-green/20">
                    {pkg.target_gender === 'all'
                      ? 'All Adults'
                      : pkg.target_gender === 'female'
                      ? 'Women Spec.'
                      : 'Men Spec.'}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1.5">₹{pkg.price}</span>
                    <span className="text-2xl font-black text-hospital-green">₹{pkg.discounted_price}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Key Attributes */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Report Turnaround:
                    </span>
                    <span className="font-semibold text-slate-800">{pkg.report_delivery_hours} Hours</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      Fasting Status:
                    </span>
                    <span className={`font-semibold ${pkg.fasting_required ? 'text-amber-700' : 'text-slate-800'}`}>
                      {pkg.fasting_required ? 'Overnight Fasting Required' : 'Not Required'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      Sample Types:
                    </span>
                    <span className="font-semibold text-slate-800">{pkg.sample_count} Diagnostic Tests</span>
                  </div>
                </div>

                {/* Instructions */}
                {pkg.preparation_instructions && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Preparation:</strong> {pkg.preparation_instructions}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-hospital-green hover:bg-[#0f7a49] shadow-md shadow-hospital-green/20 transition"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Health Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Package Inclusions & Advisory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-hospital-blueSoft border border-hospital-blue/20 text-xs text-slate-700 space-y-3">
          <div className="font-bold text-sm text-hospital-slate flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-hospital-blue" />
            <span>Complimentary Doctor Consultation Included</span>
          </div>
          <p className="leading-relaxed">
            All preventive health checkup packages at Hiramani Memorial Hospital include a post-investigation clinical review with our Senior Consultant Physician to interpret lab results and advise dietary or pharmacological management. For corporate or group health checkup bookings in Nadia district, contact our corporate desk at +91 78729 57300.
          </p>
        </div>
      </section>
    </div>
  );
}
