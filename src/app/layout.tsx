import type { Metadata } from 'next';
import './globals.css';
import { PublicLayoutWrapper } from '@/components/layout/PublicLayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.hiramani.co.in'),
  title: {
    default: 'Hiramani Memorial Hospital | Multi-Speciality Hospital in Krishnanagar, Nadia',
    template: '%s | Hiramani Memorial Hospital',
  },
  description:
    'Hiramani Memorial Hospital in Krishnanagar, Nadia (W.B. PIN-741101) is a leading multi-speciality hospital offering 24x7 Emergency, OPD Consultations, In-house Digital Pathology, 2D Echo, Modular OT, and WhatsApp appointment booking.',
  keywords: [
    'Hiramani Memorial Hospital',
    'Hospital in Krishnanagar',
    'Hospital in Nadia',
    'Hospital in West Bengal',
    'Emergency Hospital Krishnanagar',
    'Doctor Appointment Krishnanagar',
    'Pathology Lab Krishnanagar',
    'Cardiologist Nadia',
    'Orthopaedic Surgeon Krishnanagar',
    'Health Checkup Packages Nadia',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  authors: [{ name: 'Hiramani Memorial Hospital Administration' }],
  creator: 'Hiramani Memorial Hospital',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.hiramani.co.in',
    title: 'Hiramani Memorial Hospital | Multi-Speciality Hospital in Krishnanagar, Nadia',
    description:
      'Excellence in healthcare and compassionate healing. 24x7 Emergency, Specialist OPD Doctors, Pathology & Health Checkup Packages in Krishnanagar, Nadia, West Bengal (PIN-741101).',
    siteName: 'Hiramani Memorial Hospital',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Hiramani Memorial Hospital Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Hiramani Memorial Hospital Krishnanagar, Nadia',
    description: '24x7 Emergency & Multi-Speciality Healthcare in Krishnanagar, Nadia (PIN-741101).',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: 'Hiramani Memorial Hospital',
  alternateName: 'Hiramani Hospital Krishnanagar',
  url: 'https://www.hiramani.co.in',
  logo: 'https://www.hiramani.co.in/logo.png',
  telephone: '+91-7872957300',
  emergencyTelephone: '+91-7501074392',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '40, Ananta Hari Mitra Road, Near Income Tax Office, Nediarpara',
    addressLocality: 'Krishnanagar',
    addressRegion: 'West Bengal',
    postalCode: '741101',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '23.4013',
    longitude: '88.5028',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
      description: '24x7 Emergency and Trauma Services',
    },
  ],
  medicalSpecialty: [
    'Cardiology',
    'General Medicine',
    'Orthopedics',
    'Gynecology',
    'Pediatrics',
    'Otolaryngology',
    'General Surgery',
    'Dermatology',
    'Diagnostic Pathology',
    'Radiology',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: 'Outpatient Doctor Consultation',
    },
    {
      '@type': 'MedicalTest',
      name: 'Diagnostic Pathology and Blood Tests',
    },
    {
      '@type': 'MedicalTest',
      name: '2D Echocardiography and ECG',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased font-sans">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
