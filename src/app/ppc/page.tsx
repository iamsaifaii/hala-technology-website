import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import PPCHero from '@/components/DigitalMarketing/PPC/PPCHero';
import PPCIntro from '@/components/DigitalMarketing/PPC/PPCIntro';
import PPCWhyItMatters from '@/components/DigitalMarketing/PPC/PPCWhyItMatters';
import PPCServices from '@/components/DigitalMarketing/PPC/PPCServices';
import PPCWhyChoose from '@/components/DigitalMarketing/PPC/PPCWhyChoose';
import Footer from '@/components/Home/Footer';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const PPCFAQ = dynamic(() => import('@/components/DigitalMarketing/PPC/PPCFAQ'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));

export const metadata: Metadata = {
  title: 'PPC Service in Dubai | Google Ads & Paid Search',
  description:
    'Looking for PPC service in Dubai? Reach high-intent customers with optimized Google Ads campaigns built around your business goals.',
  keywords: [
    'ppc service in Dubai',
    'PPC agency dubai',
    'Google Ads dubai',
    'pay per click advertising dubai',
    'search engine marketing dubai',
    'paid search dubai',
  ],
  openGraph: {
    title: 'PPC Service in Dubai | Google Ads & Paid Search',
    description:
    'Looking for PPC service in Dubai? Reach high-intent customers with optimized Google Ads campaigns built around your business goals.',
    url: 'https://halatechnology.ae/ppc-service-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/hero-images/PPCPAGEIMAGE.png',
        secureUrl: 'https://halatechnology.ae/hero-images/PPCPAGEIMAGE.png',
        width: 1200,
        height: 630,
        alt: 'PPC Service in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPC Service in Dubai | Google Ads & Paid Search',
    description:
    'Looking for PPC service in Dubai? Reach high-intent customers with optimized Google Ads campaigns built around your business goals.',
    images: ['https://halatechnology.ae/hero-images/PPCPAGEIMAGE.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/ppc-service-in-dubai',
  },
};

export default function PPCPage() {
  return (
    <div className="font-jakarta bg-white text-[#111111] overflow-x-hidden min-h-screen flex flex-col">
      <ServiceSchema
        name="PPC Service in Dubai"
        description="Looking for PPC service in Dubai? Reach high-intent customers with optimized Google Ads campaigns built around your business goals."
        url="https://halatechnology.ae/ppc"
        serviceType="Pay-Per-Click Advertising Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <PPCHero />
        <PPCIntro />
        <PPCWhyItMatters />
        <PPCServices />
        <PPCWhyChoose />
        <CustomTestimonials />
        <PPCFAQ />
        <ContactCTA contained={true} />
        <LatestBlogsSection />
        <OutroMessage />
      </main>
      <div className="bg-[#111111] w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
