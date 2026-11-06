'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Stethoscope,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Doctor, Department } from '@/types';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface QuickBookingClientProps {
  initialDoctors: Doctor[];
  initialDepartments: Department[];
  preselectedDoctorId?: string;
  preselectedDeptId?: string;
}

export function QuickBookingClient({
  initialDoctors,
  initialDepartments,
  preselectedDoctorId,
  preselectedDeptId,
}: QuickBookingClientProps) {
  const { t } = useLanguage();

  const [selectedDeptId, setSelectedDeptId] = useState(preselectedDeptId || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDoctorId || '');

  // Default to today in YYYY-MM-DD
  const todayStr = new Date().toISOString().slice(0, 10);
  const [appointmentDate, setAppointmentDate] = useState(todayStr);

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available doctors based on department
  const filteredDoctors = initialDoctors.filter(d => {
    if (!selectedDeptId) return true;
    return d.department_id === selectedDeptId;
  });

  const selectedDoctor = initialDoctors.find(d => d.id === selectedDoctorId);

  // Fetch available slots when doctor or date changes
  useEffect(() => {
    if (!selectedDoctorId || !appointmentDate) {
      setAvailableSlots([]);
      setSelectedSlot('');
      return;
    }

    let isMounted = true;
    setSlotsLoading(true);
    setErrorMessage(null);

    fetch(`/api/doctors/slots?doctorId=${selectedDoctorId}&date=${appointmentDate}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.slots)) {
          setAvailableSlots(data.slots);
          setSelectedSlot(data.slots.length > 0 ? data.slots[0] : '');
        } else {
          setAvailableSlots([]);
          setSelectedSlot('');
        }
      })
      .catch(() => {
        if (isMounted) {
          // Fallback slots if API fails
          setAvailableSlots(['10:00', '10:20', '10:40', '11:00', '11:20']);
          setSelectedSlot('10:00');
        }
      })
      .finally(() => {
        if (isMounted) setSlotsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDoctorId, appointmentDate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedDoctorId) {
      setErrorMessage('Please select a doctor.');
      return;
    }
    if (!appointmentDate) {
      setErrorMessage('Please select an appointment date.');
      return;
    }
    if (!selectedSlot) {
      setErrorMessage('Please select an available time slot.');
      return;
    }
    if (!patientName.trim()) {
      setErrorMessage('Please enter the patient’s full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          appointmentDate,
          startTime: selectedSlot,
          patientName: patientName.trim(),
          patientPhone: patientPhone.trim(),
          bookingChannel: 'web_portal',
        }),
      });

      const data = await res.json();
      if (data.success && data.appointment) {
        setBookingSuccess(data.appointment);
      } else {
        setErrorMessage(data.error || 'Failed to book appointment. Please try another slot.');
      }
    } catch (err: any) {
      setErrorMessage('Network error while reserving slot. Please call the hospital helpdesk.');
    } finally {
      setSubmitting(false);
    }
  };

  // Success view
  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-emerald-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Confirmed Outpatient Appointment
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Booking Reserved Successfully
          </h2>
          <p className="text-xs text-slate-500">
            Your appointment has been registered in the hospital OPD master ledger.
          </p>
        </div>

        {/* Appointment Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Booking Reference:</span>
            <span className="font-mono font-black text-[#0e4a7b] text-base">
              {bookingSuccess.booking_reference}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Patient Name:</span>
            <span className="font-bold text-slate-900">{bookingSuccess.patient_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Doctor / Specialist:</span>
            <span className="font-bold text-slate-900">{bookingSuccess.doctor_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Department:</span>
            <span className="font-medium text-slate-800">{bookingSuccess.department_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Appointment Date:</span>
            <span className="font-bold text-slate-900">{bookingSuccess.appointment_date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Consultation Slot:</span>
            <span className="font-black text-hospital-green">{bookingSuccess.start_time} hrs</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-2">
            <span className="text-slate-500">OPD Consultation Fee:</span>
            <span className="font-black text-slate-900">₹{bookingSuccess.consultation_fee} (Pay at hospital counter)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-hospital-greenSoft border border-hospital-green/20 text-xs text-slate-700 text-left space-y-1">
          <div className="font-bold text-slate-900">Next Steps for Consultation:</div>
          <div>• Please arrive at Hiramani Memorial Hospital OPD Chamber 15 minutes before your scheduled slot.</div>
          <div>• Present booking reference <strong>{bookingSuccess.booking_reference}</strong> at the reception counter.</div>
          <div>• For rescheduling or queries, contact +91 78729 57300.</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setBookingSuccess(null);
              setPatientName('');
              setPatientPhone('');
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
          >
            Book Another Appointment
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-hospital-green hover:bg-[#0f7a49] text-xs font-bold text-white transition shadow-sm"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Booking Form */}
      <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
            Direct OPD Booking • Krishnanagar Campus
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Schedule an Outpatient Consultation
          </h2>
          <p className="text-xs text-slate-500">
            Real-time doctor calendar reservation with zero booking fee. Pay fee directly at the hospital reception.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-5 text-xs">
          {/* 1. Department Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Department (Optional)</label>
            <select
              value={selectedDeptId}
              onChange={e => {
                setSelectedDeptId(e.target.value);
                setSelectedDoctorId('');
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green bg-white"
            >
              <option value="">All Departments</option>
              {initialDepartments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Doctor Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Select Specialist Doctor *</label>
            <select
              required
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green bg-white"
            >
              <option value="">-- Choose Doctor --</option>
              {filteredDoctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.full_name} — {doc.speciality} (Fee: ₹{doc.consultation_fee})
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Details Preview */}
          {selectedDoctor && (
            <div className="p-4 rounded-2xl bg-hospital-greenSoft border border-hospital-green/20 flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-sm">{selectedDoctor.full_name}</div>
                <div className="text-hospital-green font-semibold">{selectedDoctor.speciality} • {selectedDoctor.qualification}</div>
                <div className="text-slate-500">Chamber: {selectedDoctor.room_number || 'OPD-1'}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Consultation Fee</span>
                <span className="text-base font-black text-hospital-green">₹{selectedDoctor.consultation_fee}</span>
              </div>
            </div>
          )}

          {/* 3. Date Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Appointment Date *</label>
              <input
                type="date"
                required
                min={todayStr}
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
              />
            </div>

            {/* 4. Slot Selection */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Available Time Slot *</label>
              {slotsLoading ? (
                <div className="py-2.5 text-xs text-slate-500 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-hospital-green" />
                  <span>Checking doctor roster...</span>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="py-2.5 text-xs text-amber-700">
                  {selectedDoctorId ? 'No free slots for this date. Try another day.' : 'Select doctor first.'}
                </div>
              ) : (
                <select
                  required
                  value={selectedSlot}
                  onChange={e => setSelectedSlot(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green bg-white font-mono"
                >
                  {availableSlots.map(s => (
                    <option key={s} value={s}>
                      {s} hrs (Available)
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* 5. Patient Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anjali Mukherjee"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Patient Mobile Phone *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={patientPhone}
                onChange={e => setPatientPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={submitting || slotsLoading || !selectedDoctorId || availableSlots.length === 0}
              className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-hospital-green hover:bg-[#0f7a49] shadow-md shadow-hospital-green/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving OPD Consultation...</span>
                </>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  <span>Confirm OPD Appointment Slot</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Guidance & WhatsApp Alternative */}
      <div className="lg:col-span-4 space-y-6">
        {/* WhatsApp Alternative Card */}
        <div className="p-6 rounded-3xl bg-hospital-slate text-white space-y-4 shadow-lg border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
              Instant Booking
            </span>
            <MessageCircle className="w-5 h-5 text-hospital-green" />
          </div>

          <h3 className="text-lg font-bold leading-snug">
            Book on WhatsApp in Bengali, Hindi or English
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Our automated WhatsApp assistant checks doctor rosters, confirms slots, and sends an appointment token directly to your chat.
          </p>

          <Link
            href="/chat"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition shadow-sm"
          >
            <span>Launch WhatsApp Assistant</span>
            <ArrowRight className="w-4 h-4 text-hospital-green" />
          </Link>
        </div>

        {/* Booking Rules & Assistance */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs text-slate-600">
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-hospital-green" />
            <span>Booking Guidelines:</span>
          </div>

          <ul className="space-y-2 list-disc list-inside">
            <li>Bookings can be scheduled up to 14 days in advance.</li>
            <li>No online payment required; pay consultation fee at hospital reception.</li>
            <li>Same-day cancellations allowed up to 2 hours prior to slot.</li>
            <li>For emergency medical needs, do not wait for OPD slots—visit Casualty immediately.</li>
          </ul>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            For phone-assisted booking, call: <strong className="text-slate-800">+91 78729 57300</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

