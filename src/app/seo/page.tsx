import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import SEOHero from '@/components/DigitalMarketing/SEO/SEOHero';
import SEOIntro from '@/components/DigitalMarketing/SEO/SEOIntro';
import SEOPerformanceShowcase from '@/components/DigitalMarketing/SEO/SEOPerformanceShowcase';
import SEOServices from '@/components/DigitalMarketing/SEO/SEOServices';
import SEOWhyChoose from '@/components/DigitalMarketing/SEO/SEOWhyChoose';
import Footer from '@/components/Home/Footer';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const SEOFAQ = dynamic(() => import('@/components/DigitalMarketing/SEO/SEOFAQ'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));

export const metadata: Metadata = {
  title: 'Best SEO Services in Dubai | On-Page & Technical SEO',
  description:
    'Looking for the best SEO services in Dubai? Hala Technology helps improve Google rankings with technical, on-page and content optimization.',
  keywords: [
    'best seo services in dubai',
    'SEO services dubai',
    'technical SEO dubai',
    'on-page SEO services',
    'search engine optimization dubai',
    'local SEO dubai',
  ],
  openGraph: {
    title: 'Best SEO Services in Dubai | On-Page & Technical SEO',
    description:
    'Looking for the best SEO services in Dubai? Hala Technology helps improve Google rankings with technical, on-page and content optimization.',
    url: 'https://halatechnology.ae/best-seo-services-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/hero-images/SEOPAGEIMAGE.png',
        secureUrl: 'https://halatechnology.ae/hero-images/SEOPAGEIMAGE.png',
        width: 1200,
        height: 630,
        alt: 'Best SEO Services in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best SEO Services in Dubai | On-Page & Technical SEO',
    description:
    'Looking for the best SEO services in Dubai? Hala Technology helps improve Google rankings with technical, on-page and content optimization.',
    images: ['https://halatechnology.ae/hero-images/SEOPAGEIMAGE.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/best-seo-services-in-dubai',
  },
};

export default function SEOPage() {
  return (
    <div className="font-jakarta bg-white text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <ServiceSchema
        name="SEO Services in Dubai"
        description="Looking for the best SEO services in Dubai? Hala Technology helps improve Google rankings with technical, on-page and content optimization."
        url="https://halatechnology.ae/seo"
        serviceType="Search Engine Optimization Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <SEOHero />
        <SEOIntro />
        <SEOPerformanceShowcase />
        <SEOServices />
        <SEOWhyChoose />
        <CustomTestimonials />
        <SEOFAQ />
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
