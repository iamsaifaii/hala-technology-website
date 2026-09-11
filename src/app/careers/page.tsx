import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import CareersHero from '@/components/Careers/CareersHero';
import CareersOpenings from '@/components/Careers/CareersOpenings';
import CareersCulture from '@/components/Careers/CareersCulture';
import Footer from '@/components/Home/Footer';

const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const metadata: Metadata = {
  title: 'Careers & Job Openings in Dubai | Join Our Team | Hala Technologies',
  description:
    'Join Hala Technologies in Dubai. Explore current career opportunities for full-stack developers, graphic designers, content creators, and AI engineers.',
  openGraph: {
    title: 'Careers & Job Openings in Dubai | Join Our Team | Hala Technologies',
    description:
      'Join Hala Technologies in Dubai. Explore current career opportunities for full-stack developers, graphic designers, content creators, and AI engineers.',
    url: 'https://halatechnology.ae/careers',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hala Technologies Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers & Job Openings in Dubai | Join Our Team | Hala Technologies',
    description:
      'Join Hala Technologies in Dubai. Explore current career opportunities for full-stack developers, graphic designers, content creators, and AI engineers.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/careers',
  },
};

export default function CareersPage() {
  return (
    <div className="font-jakarta bg-white text-[#111111] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        <CareersHero />
        <CareersOpenings />
        <CareersCulture />
        <ContactCTA contained={true} />
        <LatestBlogsSection />
        <OutroMessage />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
