import GraphicDesignHero from '@/components/branding/GraphicDesign/GraphicDesignHero';
import GraphicDesignServices from '@/components/branding/GraphicDesign/GraphicDesignServices';
import BrandingShowcase from '@/components/branding/BrandingShowcase';
import HomeWorkflow from '@/components/Home/HomeWorkflow';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const GraphicDesignFAQ = dynamic(() => import('@/components/branding/GraphicDesignFAQ'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));

export const metadata: Metadata = {
  title: 'Graphic Design Services in Dubai | Graphic Design Agency',
  description:
    'Need creative visuals? Get graphic design services in Dubai for logos, ads and social media designs tailored to your business and audience.',
  keywords: [
    'graphic design services in dubai',
    'graphic design agency dubai',
    'logo design dubai',
    'social media design dubai',
    'creative design agency uae',
    'brochure design dubai',
  ],
  openGraph: {
    title: 'Graphic Design Services in Dubai | Graphic Design Agency',
    description:
    'Need creative visuals? Get graphic design services in Dubai for logos, ads and social media designs tailored to your business and audience.',
    url: 'https://halatechnology.ae/graphic-design-services-in-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Graphic Design Services in Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Graphic Design Services in Dubai | Graphic Design Agency',
    description:
    'Need creative visuals? Get graphic design services in Dubai for logos, ads and social media designs tailored to your business and audience.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/graphic-design-services-in-dubai',
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

export default function GraphicDesignPage() {
  return (
    <div className="w-full">
      <ServiceSchema
        name="Graphic Design Services in Dubai"
        description="Need creative visuals? Get graphic design services in Dubai for logos, ads and social media designs tailored to your business and audience."
        url="https://halatechnology.ae/branding/graphic-design"
        serviceType="Graphic Design Services"
      />
      <GraphicDesignHero />
      <BrandingShowcase 
        mainImageDesktop="/Graphisc desgin images/mainimage.png"
        mainImageMobile="/Graphisc desgin images/mainimage.png"
        desktopObjectFit="contain"
      />
      <GraphicDesignServices />
      <HomeWorkflow forceMobileView={true} images={BRANDING_IMAGES} />
      <CustomTestimonials />
      <GraphicDesignFAQ />
      <ContactCTA contained={true} />
      <LatestBlogsSection />
      <OutroMessage />
    </div>
  );
}
