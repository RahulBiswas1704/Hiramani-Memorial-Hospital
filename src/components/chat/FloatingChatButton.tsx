'use client';

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { WhatsAppSimulator } from './WhatsAppSimulator';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
        {!isOpen && (
          <div className="hidden sm:flex mb-2 bg-[#103653] text-white text-xs font-medium py-1 px-3 rounded-full shadow-md items-center gap-1.5 border border-[#103653]/40">
            <span className="w-2 h-2 bg-[#15965C] rounded-full animate-pulse"></span>
            <span>WhatsApp OPD Assistant</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#15965C] hover:bg-[#117A4A] text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 border-2 border-white focus:outline-none"
          title="Open WhatsApp Consultation Simulator"
          aria-label="Open WhatsApp Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex items-center justify-center sm:block">
          <div className="w-full h-full sm:w-[400px] sm:h-[620px] max-w-lg p-2 sm:p-0">
            <WhatsAppSimulator onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
