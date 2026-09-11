import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import SMMHero from '@/components/DigitalMarketing/SMM/SMMHero';
import SMMIntro from '@/components/DigitalMarketing/SMM/SMMIntro';
import SMMWhyItMatters from '@/components/DigitalMarketing/SMM/SMMWhyItMatters';
import SMMServices from '@/components/DigitalMarketing/SMM/SMMServices';
import SMMWhyChoose from '@/components/DigitalMarketing/SMM/SMMWhyChoose';
import Footer from '@/components/Home/Footer';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const SMMFAQ = dynamic(() => import('@/components/DigitalMarketing/SMM/SMMFAQ'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));

export const metadata: Metadata = {
  title: 'Social Media Marketing Services in Dubai | SMM Services',
  description:
    'Boost your online presence with our social media marketing services in Dubai. We help brands create engaging content and campaigns.',
  keywords: [
    'social media marketing services in dubai',
    'social media marketing dubai',
    'SMM services dubai',
    'social media agency uae',
    'Instagram marketing dubai',
    'social media management dubai',
  ],
  openGraph: {
    title: 'Social Media Marketing Services in Dubai | SMM Services',
    description:
    'Boost your online presence with our social media marketing services in Dubai. We help brands create engaging content and campaigns.',
    url: 'https://halatechnology.ae/social-media-marketing-services-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Social Media Marketing Services in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Marketing Services in Dubai | SMM Services',
    description:
    'Boost your online presence with our social media marketing services in Dubai. We help brands create engaging content and campaigns.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/social-media-marketing-services-in-dubai',
  },
};

export default function SMMPage() {
  return (
    <div className="font-jakarta bg-white text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <ServiceSchema
        name="Social Media Marketing Services in Dubai"
        description="Boost your online presence with our social media marketing services in Dubai. We help brands create engaging content and campaigns."
        url="https://halatechnology.ae/smm"
        serviceType="Social Media Marketing Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <SMMHero />
        <SMMIntro />
        <SMMWhyItMatters />
        <SMMServices />
        <SMMWhyChoose />
        <CustomTestimonials />
        <SMMFAQ />
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
