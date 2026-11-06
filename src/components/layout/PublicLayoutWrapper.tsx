'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HospitalNavbar } from '@/components/layout/HospitalNavbar';
import { HospitalFooter } from '@/components/layout/HospitalFooter';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isStandaloneChat = pathname === '/chat';

  if (isDashboard || isStandaloneChat) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <HospitalNavbar />
        <main className="flex-1">{children}</main>
        <HospitalFooter />
        <FloatingChatButton />
      </div>
    </LanguageProvider>
  );
}

