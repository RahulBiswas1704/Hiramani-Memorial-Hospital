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
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-xl bg-white border border-[#E5EBEF] shadow-sm text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-[#F4F8F5] text-[#15965C] flex items-center justify-center mx-auto border border-[#15965C]/20 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#15965C] bg-[#F4F8F5] px-2.5 py-1 rounded-full border border-[#15965C]/20">
            Confirmed Outpatient Appointment
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Booking Reserved Successfully
          </h2>
          <p className="text-xs text-[#526273]">
            Your appointment has been registered in the hospital OPD master ledger.
          </p>
        </div>

        {/* Appointment Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#F7FAF9] border border-[#E5EBEF] text-left space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-[#E5EBEF] pb-2.5">
            <span className="text-[#526273] text-xs">Booking Reference:</span>
            <span className="font-mono font-bold text-[#103653] text-base">
              {bookingSuccess.booking_reference}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#526273] text-xs">Patient Name:</span>
            <span className="font-bold text-[#182B3D]">{bookingSuccess.patient_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#526273] text-xs">Doctor / Specialist:</span>
            <span className="font-bold text-[#182B3D]">{bookingSuccess.doctor_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#526273] text-xs">Department:</span>
            <span className="font-medium text-[#182B3D]">{bookingSuccess.department_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#526273] text-xs">Appointment Date:</span>
            <span className="font-bold text-[#182B3D]">{bookingSuccess.appointment_date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#526273] text-xs">Consultation Slot:</span>
            <span className="font-bold text-[#15965C]">{bookingSuccess.start_time} hrs</span>
          </div>

          <div className="flex items-center justify-between border-t border-[#E5EBEF] pt-2.5">
            <span className="text-[#526273] text-xs">OPD Consultation Fee:</span>
            <span className="font-bold text-[#103653]">₹{bookingSuccess.consultation_fee} (Pay at hospital counter)</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F4F8F5] border border-[#15965C]/20 text-xs text-[#526273] text-left space-y-1">
          <div className="font-bold text-[#103653]">Next Steps for Consultation:</div>
          <div>• Please arrive at Hiramani Memorial Hospital OPD Chamber 15 minutes before your scheduled slot.</div>
          <div>• Present booking reference <strong>{bookingSuccess.booking_reference}</strong> at the reception counter.</div>
          <div>• For rescheduling or queries, contact +91 78729 57300.</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              setBookingSuccess(null);
              setPatientName('');
              setPatientPhone('');
            }}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-[#182B3D] transition"
          >
            Book Another Appointment
          </button>
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-[#15965C] hover:bg-[#117A4A] text-xs font-bold text-white transition shadow-sm"
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
      <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-[#E5EBEF] shadow-sm space-y-6">
        <div className="space-y-1 border-b border-[#E5EBEF] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
            Direct OPD Booking • Krishnanagar Campus
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#103653]">
            Schedule an Outpatient Consultation
          </h2>
          <p className="text-xs text-[#526273]">
            Real-time doctor calendar reservation with zero booking fee. Pay consultation fee directly at hospital reception.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#DC2626]/20 text-xs text-[#DC2626] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-4 text-xs">
          {/* 1. Department Selection */}
          <div>
            <label className="block font-semibold text-[#182B3D] mb-1">Select Speciality Department (Optional)</label>
            <select
              value={selectedDeptId}
              onChange={e => {
                setSelectedDeptId(e.target.value);
                setSelectedDoctorId('');
              }}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
            >
              <option value="">All Clinical Departments</option>
              {initialDepartments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Doctor Selection */}
          <div>
            <label className="block font-semibold text-[#182B3D] mb-1">Select Attending Doctor *</label>
            <select
              required
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
            >
              <option value="">-- Choose Specialist Doctor --</option>
              {filteredDoctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.full_name} — {doc.speciality} (Fee: ₹{doc.consultation_fee})
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Details Preview */}
          {selectedDoctor && (
            <div className="p-3.5 rounded-lg bg-[#F7FAF9] border border-[#E5EBEF] flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-bold text-[#103653] text-sm">{selectedDoctor.full_name}</div>
                <div className="text-[#15965C] text-xs font-semibold">{selectedDoctor.speciality} • {selectedDoctor.qualification}</div>
                <div className="text-[#526273] text-[11px]">Chamber: {selectedDoctor.room_number || 'OPD-1'}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#526273] uppercase tracking-wider block">OPD Fee</span>
                <span className="text-sm font-bold text-[#15965C]">₹{selectedDoctor.consultation_fee}</span>
              </div>
            </div>
          )}

          {/* 3. Date Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#182B3D] mb-1">Appointment Date *</label>
              <input
                type="date"
                required
                min={todayStr}
                value={appointmentDate}
                onChange={e => setAppointmentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white text-[#182B3D]"
              />
            </div>

            {/* 4. Slot Selection */}
            <div>
              <label className="block font-semibold text-[#182B3D] mb-1">Available Time Slot *</label>
              {slotsLoading ? (
                <div className="py-2.5 text-xs text-[#526273] flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#15965C]" />
                  <span>Checking doctor roster...</span>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="py-2.5 text-xs text-amber-700">
                  {selectedDoctorId ? 'No free slots for this date. Select another day.' : 'Select doctor first.'}
                </div>
              ) : (
                <select
                  required
                  value={selectedSlot}
                  onChange={e => setSelectedSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white font-mono text-[#182B3D]"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block font-semibold text-[#182B3D] mb-1">Patient Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anjali Mukherjee"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#182B3D] mb-1">Patient Mobile Phone (10 Digits) *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={patientPhone}
                onChange={e => setPatientPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EBEF] text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#15965C] bg-white"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-3 border-t border-[#E5EBEF]">
            <button
              type="submit"
              disabled={submitting || slotsLoading || !selectedDoctorId || availableSlots.length === 0}
              className="w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-bold text-white bg-[#15965C] hover:bg-[#117A4A] transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Reserving Consultation Slot...</span>
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
      <div className="lg:col-span-4 space-y-5">
        {/* WhatsApp Alternative Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-[#103653] text-white space-y-3.5 border border-[#103653]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15965C]">
              WhatsApp Booking
            </span>
            <MessageCircle className="w-4 h-4 text-[#15965C]" />
          </div>

          <h3 className="text-base font-bold leading-snug">
            Prefer Booking on WhatsApp?
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Our automated WhatsApp system checks doctor rosters, reserves confirmed slots, and delivers appointment passes directly to your phone.
          </p>

          <Link
            href="/chat"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-[#103653] bg-white hover:bg-slate-100 transition shadow-sm"
          >
            <span>Launch WhatsApp Assistant</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#15965C]" />
          </Link>
        </div>

        {/* Booking Rules & Assistance */}
        <div className="p-5 rounded-xl bg-white border border-[#E5EBEF] space-y-3 text-xs text-[#526273]">
          <div className="font-bold text-[#103653] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#15965C]" />
            <span>Booking Guidelines:</span>
          </div>

          <ul className="space-y-1.5 list-disc list-inside">
            <li>Bookings can be scheduled up to 14 days in advance.</li>
            <li>No advance payment required; pay consultation fee at hospital reception.</li>
            <li>Cancellations permitted up to 2 hours prior to scheduled slot.</li>
            <li>For emergency trauma, do not wait for OPD slots—visit Casualty immediately.</li>
          </ul>

          <div className="pt-2 border-t border-[#E5EBEF] text-[11px] text-[#526273]">
            Phone assistance: <a href="tel:+917872957300" className="font-bold text-[#103653] hover:underline">+91 78729 57300</a>
          </div>
        </div>
      </div>
    </div>
  );
}

