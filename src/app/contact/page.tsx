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
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us, Emergency & Location | Hiramani Memorial Hospital Kolkata',
  description:
    'Contact Hiramani Memorial Hospital Kolkata. Verified 24x7 Emergency Desk, Reception phone, exact B.B.T. Road location, Google Maps directions, and online patient enquiry form.',
};

export default function ContactPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-slate-50 border-b border-slate-200 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Kolkata • B.B.T. Road</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact & Hospital Location
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Reach our reception helpdesk, 24x7 emergency casualty, or admission office in Nediarpara, Krishnanagar.
            Easily accessible from Krishnanagar City Junction and NH-12.
          </p>
        </div>
      </section>

      {/* 2. Key Hotlines Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Emergency */}
          <a
            href="tel:+917501074392"
            className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 shadow-sm hover:border-red-400 transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-red-800 uppercase tracking-wider">
              24x7 Emergency Desk
            </div>
            <div className="text-base font-extrabold text-red-950">
              +91 75010 74392
            </div>
            <div className="text-[11px] text-red-700">Immediate trauma & casualty response</div>
          </a>

          {/* General Reception */}
          <a
            href="tel:+917872957300"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#0e4a7b] transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0e4a7b] flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Reception Helpdesk
            </div>
            <div className="text-base font-extrabold text-slate-900">
              +91 78729 57300
            </div>
            <div className="text-[11px] text-slate-500">OPD booking & patient enquiries</div>
          </a>

          {/* Ambulance & Helpline */}
          <a
            href="tel:+916294545225"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-teal-600 transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ambulance & Helpline
            </div>
            <div className="text-base font-extrabold text-slate-900">
              +91 62945 45225
            </div>
            <div className="text-[11px] text-slate-500">Oxygen-equipped rapid dispatch</div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@hiramani.co.in"
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-indigo-600 transition space-y-2 block"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Official Email
            </div>
            <div className="text-sm font-extrabold text-slate-900 truncate">
              info@hiramani.co.in
            </div>
            <div className="text-[11px] text-slate-500">Monitored administrative inbox</div>
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
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Hospital Address
                </span>
                <h3 className="text-xl font-bold">Hiramani Memorial Hospital</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara, Krishnanagar, Nadia, West Bengal - 741101, India.
                </p>
              </div>

              {/* Map Box */}
              <div className="h-52 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-4 text-center space-y-2">
                <MapPin className="w-8 h-8 text-teal-400 animate-bounce" />
                <div className="text-xs font-bold text-white">40, Ananta Hari Mitra Road</div>
                <div className="text-[11px] text-slate-400">Near Income Tax Office, Nediarpara, Krishnanagar - 741101</div>
                <a
                  href="https://maps.google.com/?q=Hiramani+Memorial+Hospital+40+Ananta+Hari+Mitra+Road+Krishnanagar+741101"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition mt-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Driving Directions</span>
                </a>
              </div>

              {/* How to Reach Guidance */}
              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-4">
                <div className="font-bold text-white">How to Reach:</div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                  <li>Located on Ananta Hari Mitra Road in Nediarpara, right near the Income Tax Office.</li>
                  <li>Approx. 2.5 km from Krishnanagar City Junction Railway Station (10 mins by toto / e-rickshaw).</li>
                  <li>Easily connected to Krishnanagar High Road, Nediarpara arterial roads, and NH-12.</li>
                  <li>24x7 emergency and ambulance bay directly accessible from the main road.</li>
                  <li>Dedicated patient and visitor vehicle parking available inside the hospital premises.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

