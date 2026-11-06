'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'bn' | 'hi';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_doctors: string;
  nav_departments: string;
  nav_diagnostics: string;
  nav_packages: string;
  nav_patient_info: string;
  nav_insurance: string;
  nav_news: string;
  nav_careers: string;
  nav_contact: string;
  nav_book_appointment: string;
  nav_patient_portal: string;
  nav_emergency: string;
  nav_whatsapp: string;

  // Emergency & Topbar
  emergency_title: string;
  emergency_hotline: string;
  ambulance_service: string;
  hospital_timings: string;
  reception_phone: string;
  hospital_address_short: string;

  // Hero
  hero_tag: string;
  hero_title_prefix: string;
  hero_title_highlight: string;
  hero_title_suffix: string;
  hero_subtitle: string;
  cta_book_opd: string;
  cta_explore_doctors: string;
  cta_whatsapp_help: string;
  cta_emergency_call: string;

  // Quick Action Cards
  quick_find_doctor: string;
  quick_find_doctor_desc: string;
  quick_book_opd: string;
  quick_book_opd_desc: string;
  quick_diagnostics: string;
  quick_diagnostics_desc: string;
  quick_packages: string;
  quick_packages_desc: string;
  quick_whatsapp: string;
  quick_whatsapp_desc: string;
  quick_emergency: string;
  quick_emergency_desc: string;

  // Section Headers
  section_specialities_title: string;
  section_specialities_subtitle: string;
  section_doctors_title: string;
  section_doctors_subtitle: string;
  section_diagnostics_title: string;
  section_diagnostics_subtitle: string;
  section_packages_title: string;
  section_packages_subtitle: string;
  section_announcements_title: string;
  section_announcements_subtitle: string;

  // Common CTAs & Labels
  view_all_doctors: string;
  view_all_departments: string;
  view_all_tests: string;
  view_all_packages: string;
  view_all_news: string;
  book_slot: string;
  view_profile: string;
  fasting_required: string;
  no_fasting: string;
  turnaround_time: string;
  consultation_fee: string;
  emergency_disclaimer: string;
  pending_confirmation: string;
}

const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_doctors: 'Doctors',
    nav_departments: 'Specialities',
    nav_diagnostics: 'Diagnostics & Labs',
    nav_packages: 'Health Packages',
    nav_patient_info: 'Patient Guide',
    nav_insurance: 'Cashless & TPA',
    nav_news: 'Notices & News',
    nav_careers: 'Careers',
    nav_contact: 'Contact & Location',
    nav_book_appointment: 'Book Appointment',
    nav_patient_portal: 'Patient Portal',
    nav_emergency: '24x7 Emergency',
    nav_whatsapp: 'WhatsApp OPD',

    emergency_title: '24x7 Emergency & Trauma',
    emergency_hotline: '+91 75010 74392',
    ambulance_service: 'Ambulance / Helpline: +91 62945 45225',
    hospital_timings: '24x7 Emergency | OPD: 08:00 AM - 08:00 PM',
    reception_phone: '+91 78729 57300',
    hospital_address_short: '40, Ananta Hari Mitra Road, Nediarpara, Krishnanagar - 741101',

    hero_tag: 'Trusted Multi-Speciality Healthcare in Krishnanagar, Nadia',
    hero_title_prefix: 'Excellence in Healthcare, ',
    hero_title_highlight: 'Compassion in Healing',
    hero_title_suffix: '',
    hero_subtitle: 'Hiramani Memorial Hospital delivers comprehensive medical care with 15+ specialities, modular operating theatres, advanced diagnostic imaging, and seamless 24x7 appointment booking.',
    cta_book_opd: 'Book OPD Appointment',
    cta_explore_doctors: 'Find a Specialist',
    cta_whatsapp_help: 'Chat on WhatsApp',
    cta_emergency_call: 'Emergency: +91 75010 74392',

    quick_find_doctor: 'Find a Specialist',
    quick_find_doctor_desc: 'Search 50+ experienced doctors across 15+ clinical departments.',
    quick_book_opd: 'Instant OPD Booking',
    quick_book_opd_desc: 'Reserve confirmed consultation slots with zero advance payment.',
    quick_diagnostics: 'Diagnostic Services',
    quick_diagnostics_desc: 'In-house digital pathology, X-Ray, 2D Echo, and ultrasound.',
    quick_packages: 'Health Packages',
    quick_packages_desc: 'Preventive checkup packages starting from ₹1,499 for your whole family.',
    quick_whatsapp: 'WhatsApp MediConnect',
    quick_whatsapp_desc: 'Instant 24x7 bilingual appointment booking & enquiry on your phone.',
    quick_emergency: 'Emergency & Ambulance',
    quick_emergency_desc: 'Round-the-clock casualty, critical care ICU, and ambulance dispatch.',

    section_specialities_title: 'Clinical Departments & Specialities',
    section_specialities_subtitle: 'Modern medical infrastructure backed by dedicated clinical teams and surgeons.',
    section_doctors_title: 'Our Specialist Doctors',
    section_doctors_subtitle: 'Consult renowned physicians and surgeons across general and super-specialities.',
    section_diagnostics_title: 'Advanced Diagnostic Investigations',
    section_diagnostics_subtitle: 'Accurate and timely pathology, cardiology, and radiology investigations.',
    section_packages_title: 'Preventive Health Checkup Packages',
    section_packages_subtitle: 'Tailored health assessments designed for early detection and comprehensive wellness.',
    section_announcements_title: 'Hospital Notices & Health Advisories',
    section_announcements_subtitle: 'Official updates, health awareness bulletins, and specialized clinic schedules.',

    view_all_doctors: 'View All Doctors',
    view_all_departments: 'View All Specialities',
    view_all_tests: 'Explore Test Directory',
    view_all_packages: 'View All Health Packages',
    view_all_news: 'View All Announcements',
    book_slot: 'Book Slot',
    view_profile: 'View Profile',
    fasting_required: 'Fasting Required',
    no_fasting: 'No Fasting Required',
    turnaround_time: 'Report within',
    consultation_fee: 'OPD Fee',
    emergency_disclaimer: 'For acute emergencies (chest pain, severe breathlessness, head trauma), visit our 24x7 Emergency Casualty directly or call the emergency desk.',
    pending_confirmation: 'Subject to Hospital Confirmation',
  },
  bn: {
    nav_home: 'হোম',
    nav_about: 'আমাদের সম্পর্কে',
    nav_doctors: 'ডাক্তারগণ',
    nav_departments: 'বিভাগসমূহ',
    nav_diagnostics: 'ডায়াগনস্টিক ও ল্যাব',
    nav_packages: 'স্বাস্থ্য প্যাকেজ',
    nav_patient_info: 'রোগীদের নির্দেশিকা',
    nav_insurance: 'ক্যাশলেস ও বিমা',
    nav_news: 'বিজ্ঞপ্তি ও খবর',
    nav_careers: 'কর্মসংস্থান',
    nav_contact: 'যোগাযোগ ও অবস্থান',
    nav_book_appointment: 'অ্যাপয়েন্টমেন্ট বুকিং',
    nav_patient_portal: 'পেশেন্ট পোর্টাল',
    nav_emergency: '২৪x৭ জরুরি বিভাগ',
    nav_whatsapp: 'হোয়াটসঅ্যাপ ওপিডি',

    emergency_title: '২৪x৭ জরুরি ও ট্রমা কেয়ার',
    emergency_hotline: '+91 75010 74392',
    ambulance_service: 'অ্যাম্বুলেন্স / হেল্পলাইন: +91 62945 45225',
    hospital_timings: '২৪x৭ জরুরি পরিষেবা | ওপিডি: সকাল ৮টা - রাত ৮টা',
    reception_phone: '+91 78729 57300',
    hospital_address_short: '৪০, অনন্ত হরি মিত্র রোড, নেদিয়ারপাড়া, কৃষ্ণনগর - ৭৪১১০১',

    hero_tag: 'কৃষ্ণনগর, নদিয়ায় আপনার ও পরিবারের বিশ্বস্ত মাল্টি-স্পেশালিটি হাসপাতাল',
    hero_title_prefix: 'উন্নত চিকিৎসা সেবা, ',
    hero_title_highlight: 'সহমর্মিতাপূর্ণ নিরাময়',
    hero_title_suffix: '',
    hero_subtitle: 'হীরামনি মেমোরিয়াল হাসপাতাল ১৫টিরও বেশি স্পেশালিটি, মডুলার ওটি, আধুনিক ডায়াগনস্টিক ল্যাব এবং ২৪x৭ সহজে অ্যাপয়েন্টমেন্ট বুকিংয়ের মাধ্যমে উন্নত চিকিৎসা প্রদান করে।',
    cta_book_opd: 'ওপিডি অ্যাপয়েন্টমেন্ট বুক করুন',
    cta_explore_doctors: 'বিশেষজ্ঞ ডাক্তার খুঁজুন',
    cta_whatsapp_help: 'হোয়াটসঅ্যাপে চ্যাট করুন',
    cta_emergency_call: 'জরুরি হেল্পলাইন: +91 75010 74392',

    quick_find_doctor: 'বিশেষজ্ঞ ডাক্তার',
    quick_find_doctor_desc: '১৫+ বিভাগে ৫০+ অভিজ্ঞ চিকিৎসকদের সাথে পরামর্শ করুন।',
    quick_book_opd: 'সহজ ওপিডি বুকিং',
    quick_book_opd_desc: 'কোনো অগ্রিম অর্থ প্রদান ছাড়াই কনসালটেশন স্লট বুক করুন।',
    quick_diagnostics: 'ডায়াগনস্টিক সেবা',
    quick_diagnostics_desc: 'ডিজিটাল প্যাথলজি, এক্স-রে, ২ডি ইকো এবং আল্ট্রাসাউন্ড।',
    quick_packages: 'স্বাস্থ্য প্যাকেজ',
    quick_packages_desc: 'মাত্র ₹১,৪৯৯ থেকে শুরু হওয়া প্রতিরোধমূলক হেলথ চেকআপ।',
    quick_whatsapp: 'হোয়াটসঅ্যাপ মেডিকানেক্ট',
    quick_whatsapp_desc: 'আপনার ফোনে ২৪x৭ বাংলা ও ইংরেজিতে তাৎক্ষণিক বুকিং ও তথ্য।',
    quick_emergency: 'জরুরি ও অ্যাম্বুলেন্স',
    quick_emergency_desc: '২৪ ঘণ্টা ক্যাজুয়াল্টি, আইসিইউ এবং সার্বক্ষণিক অ্যাম্বুলেন্স।',

    section_specialities_title: 'চিকিৎসা বিভাগ ও স্পেশালিটি',
    section_specialities_subtitle: 'দক্ষ চিকিৎসক ও সার্জনদের তত্ত্বাবধানে আধুনিক স্বাস্থ্য পরিকাঠামো।',
    section_doctors_title: 'আমাদের বিশেষজ্ঞ চিকিৎসকগণ',
    section_doctors_subtitle: 'জেনারেল ও সুপার-স্পেশালিটির স্বনামধন্য চিকিৎসকদের পরামর্শ নিন।',
    section_diagnostics_title: 'উন্নত ডায়াগনস্টিক পরীক্ষা ও সেবা',
    section_diagnostics_subtitle: 'নির্ভুল ও দ্রুত প্যাথলজি, কার্ডিওলজি এবং রেডিওলজি পরীক্ষা।',
    section_packages_title: 'প্রতিরোধমূলক স্বাস্থ্য প্যাকেজ',
    section_packages_subtitle: 'রোগের আগাম শনাক্তকরণ ও সুস্থ জীবনের জন্য বিশেষ স্বাস্থ্য পরীক্ষা।',
    section_announcements_title: 'হাসপাতাল বিজ্ঞপ্তি ও স্বাস্থ্য সচেতনতা',
    section_announcements_subtitle: 'অফিসিয়াল ঘোষণা, স্বাস্থ্য বুলেটিন ও বিশেষ ক্লিনিক সংক্রান্ত তথ্য।',

    view_all_doctors: 'সব ডাক্তার দেখুন',
    view_all_departments: 'সব বিভাগ দেখুন',
    view_all_tests: 'সব পরীক্ষা দেখুন',
    view_all_packages: 'সব স্বাস্থ্য প্যাকেজ দেখুন',
    view_all_news: 'সব খবর ও বিজ্ঞপ্তি',
    book_slot: 'স্লট বুক করুন',
    view_profile: 'প্রোফাইল দেখুন',
    fasting_required: 'খালি পেটে থাকা প্রয়োজন',
    no_fasting: 'খালি পেটে থাকার প্রয়োজন নেই',
    turnaround_time: 'রিপোর্ট পাওয়ার সময়',
    consultation_fee: 'ওপিডি ফি',
    emergency_disclaimer: 'তীব্র জরুরি পরিস্থিতিতে (বুকে ব্যথা, তীব্র শ্বাসকষ্ট, মাথায় আঘাত) সরাসরি আমাদের জরুরি বিভাগে আসুন অথবা হেল্পলাইনে যোগাযোগ করুন।',
    pending_confirmation: 'হাসপাতাল প্রশাসনের অনুমোদনের অপেক্ষায়',
  },
  hi: {
    nav_home: 'होम',
    nav_about: 'हमारे बारे में',
    nav_doctors: 'चिकित्सक',
    nav_departments: 'विभाग',
    nav_diagnostics: 'डायग्नोस्टिक्स व लैब',
    nav_packages: 'स्वास्थ्य पैकेज',
    nav_patient_info: 'मरीज गाइड',
    nav_insurance: 'कैशलेस व बीमा',
    nav_news: 'सूचनाएं व समाचार',
    nav_careers: 'करियर',
    nav_contact: 'संपर्क व पता',
    nav_book_appointment: 'अपॉइंटमेंट बुक करें',
    nav_patient_portal: 'पेशेंट पोर्टल',
    nav_emergency: '24x7 आपातकालीन',
    nav_whatsapp: 'व्हाट्सएप ओपीडी',

    emergency_title: '24x7 आपातकालीन व ट्रॉमा केयर',
    emergency_hotline: '+91 75010 74392',
    ambulance_service: 'एम्बुलेंस / हेल्पलाइन: +91 62945 45225',
    hospital_timings: '24x7 आपातकालीन सेवा | ओपीडी: सुबह 8:00 - रात 8:00',
    reception_phone: '+91 78729 57300',
    hospital_address_short: '40, अनन्त हरि मित्र रोड, नेदियारपाड़ा, कृष्णनगर - 741101',

    hero_tag: 'कृष्णनगर, नदिया में आपका विश्वसनीय मल्टी-स्पेशियलिटी अस्पताल',
    hero_title_prefix: 'उत्कृष्ट चिकित्सा सेवा, ',
    hero_title_highlight: 'संवेदनशील उपचार',
    hero_title_suffix: '',
    hero_subtitle: 'हीरामणि मेमोरियल हॉस्पिटल 15+ विशेषज्ञताओं, मॉड्यूलर ओटी, आधुनिक पैथोलॉजी और 24x7 सहज अपॉइंटमेंट बुकिंग के साथ उच्चतम स्तर की चिकित्सा सुविधा प्रदान करता है।',
    cta_book_opd: 'ओपीडी अपॉइंटमेंट बुक करें',
    cta_explore_doctors: 'विशेषज्ञ डॉक्टर खोजें',
    cta_whatsapp_help: 'व्हाट्सएप पर चैट करें',
    cta_emergency_call: 'आपातकालीन: +91 75010 74392',

    quick_find_doctor: 'विशेषज्ञ चिकित्सक',
    quick_find_doctor_desc: '15+ विभागों में 50+ अनुभवी डॉक्टरों से परामर्श लें।',
    quick_book_opd: 'त्वरित ओपीडी बुकिंग',
    quick_book_opd_desc: 'बिना किसी अग्रिम शुल्क के अपना परामर्श स्लॉट आरक्षित करें।',
    quick_diagnostics: 'डायग्नोस्टिक सेवाएं',
    quick_diagnostics_desc: 'डिजिटल पैथोलॉजी, एक्स-रे, 2D इको और सोनोग्राफी।',
    quick_packages: 'स्वास्थ्य पैकेज',
    quick_packages_desc: 'मात्र ₹1,499 से शुरू होने वाले संपूर्ण पारिवारिक हेल्थ चेकअप।',
    quick_whatsapp: 'व्हाट्सएप मेडीकनेक्ट',
    quick_whatsapp_desc: 'अपने फोन पर 24x7 हिंदी, बंगाली और अंग्रेजी में त्वरित बुकिंग।',
    quick_emergency: 'आपातकालीन व एम्बुलेंस',
    quick_emergency_desc: '24 घंटे आकस्मिक चिकित्सा, आईसीयू और एम्बुलेंस सुविधा।',

    section_specialities_title: 'चिकित्सा विभाग व विशेषताएं',
    section_specialities_subtitle: 'अनुभवी चिकित्सकों और सर्जनों के साथ आधुनिक चिकित्सा अवसंरचना।',
    section_doctors_title: 'हमारे विशेषज्ञ चिकित्सक',
    section_doctors_subtitle: 'जनरल व सुपर-स्पेशियलिटी के प्रतिष्ठित डॉक्टरों से परामर्श लें।',
    section_diagnostics_title: 'उन्नत डायग्नोस्टिक जांचें',
    section_diagnostics_subtitle: 'सटीक और त्वरित पैथोलॉजी, कार्डियोलॉजी और रेडियोलॉजी जांच।',
    section_packages_title: 'निवारक स्वास्थ्य जांच पैकेज',
    section_packages_subtitle: 'रोगों की प्रारंभिक पहचान और समग्र स्वास्थ्य के लिए विशेष जांच पैकेज।',
    section_announcements_title: 'अस्पताल सूचनाएं व स्वास्थ्य परामर्श',
    section_announcements_subtitle: 'आधिकारिक अपडेट, स्वास्थ्य बुलेटिन और विशेष ओपीडी शिविर सूचनाएं।',

    view_all_doctors: 'सभी डॉक्टर देखें',
    view_all_departments: 'सभी विभाग देखें',
    view_all_tests: 'सभी जांचें देखें',
    view_all_packages: 'सभी पैकेज देखें',
    view_all_news: 'सभी सूचनाएं देखें',
    book_slot: 'स्लॉट बुक करें',
    view_profile: 'प्रोफाइल देखें',
    fasting_required: 'खाली पेट रहना अनिवार्य',
    no_fasting: 'खाली पेट रहने की आवश्यकता नहीं',
    turnaround_time: 'रिपोर्ट समय',
    consultation_fee: 'ओपीडी शुल्क',
    emergency_disclaimer: 'गंभीर आपात स्थिति में तुरंत हमारे आपातकालीन विभाग (कैजुअल्टी) में पधारें या हेल्पलाइन पर संपर्क करें।',
    pending_confirmation: 'अस्पताल प्रबंधन द्वारा पुष्टि प्रतीक्षित',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: TRANSLATIONS.en,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hmh_preferred_language') as Language;
      if (saved && (saved === 'en' || saved === 'bn' || saved === 'hi')) {
        setLanguageState(saved);
      }
    } catch {
      // LocalStorage access fails in restricted environments
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('hmh_preferred_language', lang);
    } catch {
      // Ignore storage errors
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

