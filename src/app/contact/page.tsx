import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import ContactHero from '@/components/Contact/ContactHero';
import ContactInfoCards from '@/components/Contact/ContactInfoCards';
import Footer from '@/components/Home/Footer';

const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactFAQ = dynamic(() => import('@/components/Contact/ContactFAQ'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const metadata: Metadata = {
  title: 'Contact Us | Schedule a Consultation | Hala Technology Dubai',
  description:
    'Get in touch with Hala Smart Technologies in Dubai. Schedule a 15-minute guided tour, request a custom proposal, or speak directly with our strategic consultants.',
  openGraph: {
    title: 'Contact Us | Schedule a Consultation | Hala Technology Dubai',
    description:
      'Get in touch with Hala Smart Technologies in Dubai. Schedule a 15-minute guided tour, request a custom proposal, or speak directly with our strategic consultants.',
    url: 'https://halatechnology.ae/contact',
    images: [
      {
        url: 'https://halatechnology.ae/hero-images/HomeHeroimage.png',
        width: 1200,
        height: 630,
        alt: 'Contact Hala Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Schedule a Consultation | Hala Technology Dubai',
    description:
      'Get in touch with Hala Smart Technologies in Dubai. Schedule a 15-minute guided tour, request a custom proposal, or speak directly with our strategic consultants.',
    images: ['https://halatechnology.ae/hero-images/HomeHeroimage.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        {/* 1. Case Study Style Hero Section */}
        <ContactHero />

        {/* 2. Creative Interactive Contact & Location Cards */}
        <ContactInfoCards />

        {/* 3. Interactive Schedule Section */}
        <ContactCTA contained={true} />

        {/* 4. Signature Outro Message */}
        <OutroMessage />

        {/* 5. Contact Specific FAQs */}
        <ContactFAQ />

        {/* 6. Next Steps & Blog Section */}
        <LatestBlogsSection />
      </main>

      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
