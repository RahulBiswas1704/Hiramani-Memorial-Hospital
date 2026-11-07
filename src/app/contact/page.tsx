import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  ShieldAlert,
  ArrowRight,
  Building2,
  Navigation,
  Compass,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us, Emergency & Location | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Contact Hiramani Memorial Hospital in Krishnanagar, Nadia. Verified 24x7 Emergency Desk (+91 75010 74392), Reception desk (+91 78729 57300), Google Maps directions, and online enquiry form.',
};

export default function ContactPage() {
  return (
    <div className="space-y-10 pb-20 bg-white text-[#182B3D]">
      {/* 1. Warm Header Banner & Breadcrumb */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-12 bg-gradient-to-b from-[#F4F8F5] via-[#F7FAF9] to-white border-b border-[#E5EBEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#526273]">
            <Link href="/" className="hover:text-[#15965C] transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#103653] font-semibold">Contact & Hospital Location</span>
          </nav>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#15965C] pt-1">
            <span className="w-2 h-2 rounded-full bg-[#15965C] inline-block" />
            <span>Contact & Hospital Location • 24x7 Ready to Assist You</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#103653] tracking-tight">
            Contact Us & Hospital Location
          </h1>

          <p className="text-sm sm:text-base text-[#526273] max-w-3xl leading-relaxed">
            Need urgent medical help, doctor chamber information, or directions to our Nediarpara campus? Speak directly with our reception team or visit our 24-hour casualty emergency desk.
          </p>
        </div>
      </section>

      {/* 2. Practical Directory & Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Online Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Column: Direct Contact Details & Transit Directions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone & Helpline Directory */}
            <div className="rounded-xl border border-[#E5EBEF] bg-[#F7FAF9] p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#103653] border-b border-[#E5EBEF] pb-2">
                Emergency & Helpdesk Directory
              </h3>

              <div className="space-y-3 text-xs">
                {/* 24x7 Emergency */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#DC2626]/20">
                  <div className="w-8 h-8 rounded-md bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#DC2626] block">
                      24x7 Emergency Casualty
                    </span>
                    <a href="tel:+917501074392" className="text-sm font-bold text-[#182B3D] hover:underline">
                      +91 75010 74392
                    </a>
                    <p className="text-[#526273] text-[11px]">Immediate trauma & resuscitation response</p>
                  </div>
                </div>

                {/* Reception & OPD */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E5EBEF]">
                  <div className="w-8 h-8 rounded-md bg-[#F4F8F5] text-[#15965C] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#526273] block">
                      Reception & OPD Bookings
                    </span>
                    <a href="tel:+917872957300" className="text-sm font-bold text-[#182B3D] hover:underline">
                      +91 78729 57300
                    </a>
                    <p className="text-[#526273] text-[11px]">Doctor chamber queries & patient appointments</p>
                  </div>
                </div>

                {/* Ambulance Helpline */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E5EBEF]">
                  <div className="w-8 h-8 rounded-md bg-[#F0F7FB] text-[#159FDB] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#526273] block">
                      Ambulance & Emergency Dispatch
                    </span>
                    <a href="tel:+916294545225" className="text-sm font-bold text-[#182B3D] hover:underline">
                      +91 62945 45225
                    </a>
                    <p className="text-[#526273] text-[11px]">Oxygen-equipped emergency vehicle response</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E5EBEF]">
                  <div className="w-8 h-8 rounded-md bg-slate-100 text-[#526273] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#526273] block">
                      Administrative Email
                    </span>
                    <a href="mailto:info@hiramani.co.in" className="text-xs font-semibold text-[#182B3D] hover:underline">
                      info@hiramani.co.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Google Maps Navigation */}
            <div className="rounded-xl border border-[#E5EBEF] bg-white p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#15965C]">
                  Hospital Location & Address
                </span>
                <h3 className="text-base font-bold text-[#103653]">
                  Hiramani Memorial Hospital
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101, India.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] space-y-2.5 text-xs text-[#526273]">
                <div className="font-bold text-[#182B3D] flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#159FDB]" />
                  <span>Transit & Access Information:</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Adjacent to the Income Tax Office on Ananta Hari Mitra Road.</li>
                  <li>Approx. 1.5 km from Krishnanagar City Junction Railway Station (7–10 minutes by e-rickshaw / toto).</li>
                  <li>Conveniently accessible from NH-12 Krishnanagar Bypass.</li>
                  <li>24x7 emergency and ambulance bay directly on the main road.</li>
                </ul>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-white text-xs font-bold transition shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
