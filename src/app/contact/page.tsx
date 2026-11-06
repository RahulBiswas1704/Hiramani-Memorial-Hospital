import React from 'react';
import { Metadata } from 'next';
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
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us, Emergency & Location | Hiramani Memorial Hospital Krishnanagar',
  description:
    'Contact Hiramani Memorial Hospital in Krishnanagar, Nadia. Verified 24x7 Emergency Desk (+91 75010 74392), Reception desk (+91 78729 57300), Google Maps directions, and online enquiry form.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-hospital-greenSoft via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-hospital-green/10 border border-hospital-green/20 text-hospital-green text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-hospital-green" />
            <span>Krishnanagar • Nadia • West Bengal (PIN: 741101)</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact & Hospital Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Reach our patient reception helpdesk, 24x7 emergency casualty, or admission office in Nediarpara, Krishnanagar. Easily accessible from Krishnanagar City Junction railway station and NH-12.
          </p>
        </div>
      </section>

      {/* 2. Key Hotlines Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Emergency Hotline */}
          <a
            href="tel:+917501074392"
            className="p-5 rounded-3xl bg-red-50 border border-red-200 text-red-900 shadow-sm hover:border-red-400 transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-red-800 uppercase tracking-wider">
              24x7 Emergency Desk
            </div>
            <div className="text-base font-black text-red-950">
              +91 75010 74392
            </div>
            <div className="text-[11px] text-red-700">Immediate trauma & casualty triage</div>
          </a>

          {/* Reception Helpdesk */}
          <a
            href="tel:+917872957300"
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-hospital-green transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-hospital-green/10 text-hospital-green flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Reception / OPD Helpdesk
            </div>
            <div className="text-base font-black text-slate-900">
              +91 78729 57300
            </div>
            <div className="text-[11px] text-slate-500">Doctor chamber bookings & general enquiries</div>
          </a>

          {/* Ambulance Hotline */}
          <a
            href="tel:+916294545225"
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-hospital-blue transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-hospital-blue/10 text-hospital-blue flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Ambulance & Helpline
            </div>
            <div className="text-base font-black text-slate-900">
              +91 62945 45225
            </div>
            <div className="text-[11px] text-slate-500">Oxygen-equipped critical dispatch</div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@hiramani.co.in"
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-slate-400 transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Official Email
            </div>
            <div className="text-sm font-extrabold text-slate-900 truncate">
              info@hiramani.co.in
            </div>
            <div className="text-[11px] text-slate-500">Administrative & grievance desk</div>
          </a>
        </div>
      </section>

      {/* 3. Main Form and Map Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Location & Directions Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-hospital-slate text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800 shadow-md">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
                  Official Campus Address
                </span>
                <h3 className="text-xl font-bold">Hiramani Memorial Hospital</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101, India.
                </p>
              </div>

              {/* Map Box */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-hospital-green/20 text-hospital-green flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-sm font-bold text-white">Nediarpara, Krishnanagar</div>
                <div className="text-[11px] text-slate-400">Near Income Tax Office • Landmark Location</div>
                <a
                  href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-hospital-green hover:bg-[#0f7a49] text-white text-xs font-bold transition shadow-sm mt-2"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* Transit & How to Reach */}
              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-hospital-blue" />
                  <span>How to Reach the Hospital:</span>
                </div>
                <ul className="space-y-2 list-disc list-inside text-slate-400">
                  <li>Located centrally on Ananta Hari Mitra Road in Nediarpara, right adjacent to the Krishnanagar Income Tax Office.</li>
                  <li>Approx. 2.5 km from Krishnanagar City Junction Railway Station (10 mins by e-rickshaw / toto).</li>
                  <li>Connected conveniently to Krishnanagar High Road, Nediarpara arterial roads, and the NH-12 Krishnanagar Bypass.</li>
                  <li>24x7 emergency and ambulance bay directly accessible from the main road entrance.</li>
                  <li>Designated patient and visitor vehicle parking area available inside the hospital premises.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
