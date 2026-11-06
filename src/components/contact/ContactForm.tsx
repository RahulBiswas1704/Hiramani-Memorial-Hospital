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
      <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-emerald-950">
          Enquiry Received Successfully
        </h3>
        <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
          Thank you, <strong>{patientName}</strong>. Your enquiry has been registered in the hospital CRM system.
          Our patient helpdesk will reach you at <strong>{patientPhone}</strong> shortly.
        </p>
        <div className="inline-block px-4 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-900 shadow-sm">
          Tracking Ticket: {submittedTicket}
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmittedTicket(null);
              setSubject('');
              setDescription('');
            }}
            className="text-xs font-bold text-emerald-800 hover:underline"
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
        <h3 className="text-lg font-bold text-slate-900">Send an Online Enquiry</h3>
        <p className="text-xs text-slate-500">
          Our staff responds to general enquiries during normal working hours (8 AM – 8 PM).
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
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
            placeholder="e.g. Ramesh Chandra"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Category *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as PatientQuery['category'])}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b] bg-white"
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
            placeholder="Brief enquiry subject..."
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Your Message / Enquiry *</label>
          <textarea
            required
            rows={4}
            placeholder="How can we assist you with doctor appointments, tests, or admission?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0e4a7b]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0e4a7b] hover:bg-[#0b3459] shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Enquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Enquiry to Hospital Desk</span>
          </>
        )}
      </button>
    </form>
  );
}
