import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import Website from '@/components/WebsiteDevelopment/Website';
import WebDesignShowcase from '@/components/WebsiteDevelopment/WebDesignShowcase';
import TrustedSection from '@/components/WebsiteDevelopment/TrustedSection';
import WebsiteServices from '@/components/WebsiteDevelopment/WebsiteServices';
import FeaturedWork from '@/components/WebsiteDevelopment/FeaturedWork';
import WebDesignGrowth from '@/components/WebsiteDevelopment/WebDesignGrowth';
import ProcessSection from '@/components/WebsiteDevelopment/ProcessSection';
import Testimonials from '@/components/Home/Testimonials/Testimonials';
import WebDevFAQ from '@/components/WebsiteDevelopment/WebDevFAQ';
import Footer from '@/components/Home/Footer';
import dynamic from 'next/dynamic';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const metadata: Metadata = {
  title: 'Web Development Services in Dubai | Hala Technology',
  description:
    'Build a fast, modern website with web development services in Dubai. Hala Technology creates custom, responsive and conversion-focused websites.',
  keywords: [
    'web development services in dubai',
    'web development dubai',
    'website design dubai',
    'custom web development uae',
    'e-commerce website development dubai',
    'responsive web design dubai',
  ],
  openGraph: {
    title: 'Web Development Services in Dubai | Hala Technology',
    description:
      'Build a fast, modern website with web development services in Dubai. Hala Technology creates custom, responsive and conversion-focused websites.',
    url: 'https://halatechnology.ae/web-development-services-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Web Development Services in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Development Services in Dubai | Hala Technology',
    description:
      'Build a fast, modern website with web development services in Dubai. Hala Technology creates custom, responsive and conversion-focused websites.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/web-development-services-in-dubai',
  },
};

export default function WebsiteDevelopmentPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <ServiceSchema
        name="Web Development Services in Dubai"
        description="Build a fast, modern website with web development services in Dubai. Hala Technology creates custom, responsive and conversion-focused websites."
        url="https://halatechnology.ae/website-development"
        serviceType="Web Development Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <Website />
        <TrustedSection />
        <WebsiteServices />
        <FeaturedWork />
        <WebDesignGrowth />
        <ProcessSection />
        <WebDesignShowcase />
        <Testimonials />
        <WebDevFAQ />
        <ContactCTA contained={true} />
        <LatestBlogsSection />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
