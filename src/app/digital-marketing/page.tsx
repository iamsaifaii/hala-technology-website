import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import DigitalMarketingHero from '@/components/DigitalMarketing/DigitalMarketingHero';
import DigitalMarketingIntro from '@/components/DigitalMarketing/DigitalMarketingIntro';
import DigitalMarketingServices from '@/components/DigitalMarketing/DigitalMarketingServices';
import DigitalMarketingWhyChoose from '@/components/DigitalMarketing/DigitalMarketingWhyChoose';
import Footer from '@/components/Home/Footer';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const DigitalMarketingFAQ = dynamic(() => import('@/components/DigitalMarketing/DigitalMarketingFAQ'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const metadata: Metadata = {
  title: 'Best Digital Marketing Services in Dubai | SEO, PPC & SMM',
  description:
    'Looking for digital marketing services in Dubai? Hala Technology helps businesses attract leads through SEO, PPC, social media and content.',
  keywords: [
    'best digital marketing services in dubai',
    'digital marketing services',
    'digital marketing agency dubai',
    'SEO services dubai',
    'PPC services dubai',
    'social media marketing dubai',
  ],
  openGraph: {
    title: 'Best Digital Marketing Services in Dubai | SEO, PPC & SMM',
    description:
    'Looking for digital marketing services in Dubai? Hala Technology helps businesses attract leads through SEO, PPC, social media and content.',
    url: 'https://halatechnology.ae/best-digital-marketing-services-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Services - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Digital Marketing Services in Dubai | SEO, PPC & SMM',
    description:
    'Looking for digital marketing services in Dubai? Hala Technology helps businesses attract leads through SEO, PPC, social media and content.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/best-digital-marketing-services-in-dubai',
  },
};

export default function DigitalMarketingPage() {
  return (
    <div className="font-jakarta bg-white text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <ServiceSchema
        name="Digital Marketing Services in Dubai"
        description="Looking for digital marketing services in Dubai? Hala Technology helps businesses attract leads through SEO, PPC, social media and content."
        url="https://halatechnology.ae/digital-marketing"
        serviceType="Digital Marketing Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <DigitalMarketingHero />
        <DigitalMarketingIntro />
        <DigitalMarketingServices />
        <DigitalMarketingWhyChoose />
        <CustomTestimonials />
        <DigitalMarketingFAQ />
        <ContactCTA contained={true} />
        <LatestBlogsSection />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
