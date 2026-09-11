import BrandingHeroSection from '@/components/branding/BrandingHeroSection';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const BrandingShowcase = dynamic(() => import('@/components/branding/BrandingShowcase'));
const BrandingServices = dynamic(() => import('@/components/branding/BrandingServices'));
const BrandingExpertise = dynamic(() => import('@/components/branding/BrandingExpertise'));
const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const BrandingFAQ = dynamic(() => import('@/components/branding/BrandingFAQ'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const HomeWorkflow = dynamic(() => import('@/components/Home/HomeWorkflow'));

export const metadata: Metadata = {
  title: 'Branding Services in Dubai | Hala Technology',
  description:
    'Looking for branding services in Dubai? Hala Technology crafts unique brand identities that help your business stand out. Book a free consultation.',
  keywords: [
    'branding services',
    'branding services in dubai',
    'best branding agency UAE',
    'brand identity dubai',
    'corporate branding',
    'brand strategy dubai',
  ],
  openGraph: {
    title: 'Branding Services in Dubai | Hala Technology',
    description:
      'Looking for branding services in Dubai? Hala Technology crafts unique brand identities that help your business stand out. Book a free consultation.',
    url: 'https://halatechnology.ae/branding-services',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Branding Services in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding Services in Dubai | Hala Technology',
    description:
      'Looking for branding services in Dubai? Hala Technology crafts unique brand identities that help your business stand out. Book a free consultation.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/branding-services',
  },
};

const BRANDING_IMAGES = [
  '/Branding Section Images/3.png',
  '/Branding Section Images/4.png',
  '/Branding Section Images/7.png',
  '/Branding Section Images/11.png',
  '/Branding Section Images/10.png',
  '/Branding Section Images/13.png',
  '/Branding Section Images/16.png',
  '/Branding Section Images/18.png',
  '/Branding Section Images/17.png',
  '/Branding Section Images/1.png',
  '/Branding Section Images/9.png',
  '/Branding Section Images/12.png',
  '/Branding Section Images/15.png'
];

export default function BrandingPage() {
  return (
    <div className="w-full">
      <ServiceSchema
        name="Branding Services in Dubai"
        description="Looking for branding services in Dubai? Hala Technology crafts unique brand identities that help your business stand out."
        url="https://halatechnology.ae/branding"
        serviceType="Branding Services"
      />
      <BrandingHeroSection />
      
      {/* Branding Showcase Section */}
      <BrandingShowcase />
      
      {/* Branding Services Section */}
      <BrandingServices />
      
      {/* Workflow Section */}
      <HomeWorkflow forceMobileView={true} images={BRANDING_IMAGES} />
      
      {/* Branding Expertise Section */}
      <BrandingExpertise />
      
      {/* Testimonials Section */}
      <CustomTestimonials />

      {/* FAQ Section */}
      <BrandingFAQ />
      <ContactCTA contained={true} />

      {/* Dynamic Target Page Blogs Section */}
      <LatestBlogsSection />

      {/* Outro Message */}
      <OutroMessage />
    </div>
  );
}
