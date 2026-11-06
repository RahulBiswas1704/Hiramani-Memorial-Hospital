'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { PatientQuery } from '@/types';

export function ContactForm() {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [category, setCategory] = useState<PatientQuery['category']>('General Enquiry');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your enquiry.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_name: patientName,
          patient_phone: patientPhone,
          category,
          subject: subject || `${category} Enquiry from Website`,
          description,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setSubmittedTicket(data.data.ticket_number || 'TKT-RECEIVED');
      } else {
        setError(data.error || 'Failed to submit enquiry. Please try again or call our reception.');
      }
    } catch (err: any) {
      setError('Network error. Please call our reception desk directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submittedTicket) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-hospital-greenSoft border border-hospital-green/30 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-hospital-green/20 text-hospital-green flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Enquiry Registered Successfully
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{patientName}</strong>. Your enquiry has been routed to the hospital reception desk. Our patient coordinator will contact you at <strong>{patientPhone}</strong>.
        </p>
        <div className="inline-block px-4 py-2 rounded-xl bg-white border border-hospital-green/40 text-xs font-mono font-bold text-hospital-green shadow-sm">
          Tracking Reference: {submittedTicket}
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmittedTicket(null);
              setSubject('');
              setDescription('');
            }}
            className="text-xs font-bold text-hospital-green hover:underline"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-hospital-green">
          Patient Communications
        </span>
        <h3 className="text-xl font-bold text-slate-900">Send an Online Enquiry</h3>
        <p className="text-xs text-slate-500">
          Our staff reviews online enquiries daily between 08:00 AM and 08:00 PM.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Patient / Visitor Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Chandra Mondal"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Mobile Phone (10 Digits) *</label>
            <input
              type="tel"
              required
              placeholder="e.g. 9876543210"
              value={patientPhone}
              onChange={e => setPatientPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Enquiry Category *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as PatientQuery['category'])}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green bg-white"
            >
              <option value="General Enquiry">General Enquiry</option>
              <option value="Doctor & Appointments">Doctor & Appointments</option>
              <option value="Departments & Services">Departments & Services</option>
              <option value="Diagnostic Tests & Reports">Diagnostic Tests & Reports</option>
              <option value="Admission & Surgery Enquiry">Admission & Surgery Enquiry</option>
              <option value="Billing & Insurance">Billing & Insurance</option>
              <option value="Complaints">Feedback / Complaints</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Subject (Optional)</label>
          <input
            type="text"
            placeholder="Brief enquiry subject (e.g. Cardiologist availability, Echo Doppler timing)"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Message / Enquiry *</label>
          <textarea
            required
            rows={4}
            placeholder="Please describe how we can assist you with appointments, diagnostic investigations, or hospital admission..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-hospital-green"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-hospital-green hover:bg-[#0f7a49] shadow-md shadow-hospital-green/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Enquiry to Desk...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Enquiry to Hospital Desk</span>
          </>
        )}
      </button>
    </form>
  );
}
