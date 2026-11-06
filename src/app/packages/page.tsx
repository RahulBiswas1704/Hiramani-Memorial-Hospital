import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  HeartPulse,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { HospitalRepo } from '@/lib/db/repo';

export const metadata: Metadata = {
  title: 'Preventive Health Checkup Packages | Hiramani Memorial Hospital Kolkata',
  description:
    'Comprehensive preventive health checkup packages: Basic Health, Cardiac Screening, Master Executive, Women’s Wellness, and Senior Citizen Care at Hiramani Memorial Hospital Kolkata.',
};

export const revalidate = 60;

export default async function HealthPackagesPage() {
  const packages = await HospitalRepo.getHealthPackages();

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>Preventive Healthcare & Early Detection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Preventive Health Checkup Packages
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Protect your health and that of your loved ones with customized preventive health screenings.
            Early detection of silent illnesses such as diabetes, hypertension, and cardiac risks ensures better long-term wellness.
          </p>
        </div>
      </section>

      {/* 2. Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 shadow-md hover:shadow-xl transition duration-200 flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-5">
                {/* Header Tag & Pricing */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                    {pkg.target_gender === 'all'
                      ? 'All Adults'
                      : pkg.target_gender === 'female'
                      ? 'Women Spec.'
                      : 'Men Spec.'}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1.5">₹{pkg.price}</span>
                    <span className="text-2xl font-black text-teal-700">₹{pkg.discounted_price}</span>
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
                      {pkg.fasting_required ? 'Overnight Required' : 'Not Required'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Blood / Imaging Samples:</span>
                    <span className="font-semibold text-slate-800">{pkg.sample_count} Samples</span>
                  </div>
                </div>

                {/* Instructions */}
                {pkg.preparation_instructions && (
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Preparation:</strong> {pkg.preparation_instructions}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/book"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0e4a7b] to-[#0d9488] hover:from-[#0b3459] hover:to-[#0f766e] shadow-md transition"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Health Package</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Package Guidance Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0e4a7b]" />
            <span>Package Inclusions & Consultation Policy</span>
          </div>
          <p className="leading-relaxed">
            All health packages include a complimentary post-investigation review with our Senior General Physician
            or Specialist to interpret your lab reports and guide lifestyle or medical management. Please report to the
            sample collection counter between 07:30 AM and 10:30 AM for morning fasting tests.
          </p>
        </div>
      </section>
    </div>
  );
}

