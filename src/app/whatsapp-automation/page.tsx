import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import WhatsAppHero from '@/components/WhatsApp/WhatsAppHero';
import WhatsAppSecurity from '@/components/WhatsApp/WhatsAppSecurity';
import WhatsAppWorkflow from '@/components/WhatsApp/WhatsAppWorkflow';
import WhatsAppMobileShowcase from '@/components/WhatsApp/WhatsAppMobileShowcase';
import WhatsAppComparison from '@/components/WhatsApp/WhatsAppComparison';
import WhatsAppOfferings from '@/components/WhatsApp/WhatsAppOfferings';
import WhatsAppWhyChoose from '@/components/WhatsApp/WhatsAppWhyChoose';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const Footer = dynamic(() => import('@/components/Home/Footer'));

export const metadata: Metadata = {
  title: 'WhatsApp Automation Services | Chatbots & Workflows',
  description:
    'Boost customer engagement with our whatsApp automation services for lead generation, follow-ups and support. Automate conversations 24/7.',
  keywords: [
    'whatsapp automation services',
    'whatsapp chatbot dubai',
    'whatsapp business automation',
    'whatsapp marketing automation uae',
    'customer support automation',
    'lead generation chatbots',
  ],
  openGraph: {
    title: 'WhatsApp Automation Services | Chatbots & Workflows',
    description:
    'Boost customer engagement with our whatsApp automation services for lead generation, follow-ups and support. Automate conversations 24/7.',
    url: 'https://halatechnology.ae/whatsapp-automation-services',
    images: [
      {
        url: 'https://halatechnology.ae/hero-images/WhatsappHeroImage.png',
        secureUrl: 'https://halatechnology.ae/hero-images/WhatsappHeroImage.png',
        width: 1200,
        height: 630,
        alt: 'WhatsApp Automation Services - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WhatsApp Automation Services | Chatbots & Workflows',
    description:
    'Boost customer engagement with our whatsApp automation services for lead generation, follow-ups and support. Automate conversations 24/7.',
    images: ['https://halatechnology.ae/hero-images/WhatsappHeroImage.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/whatsapp-automation-services',
  },
};

export default function WhatsAppAutomationPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-[#111111] overflow-x-hidden min-h-screen">
      <ServiceSchema
        name="WhatsApp Automation Services"
        description="Boost customer engagement with our whatsApp automation services for lead generation, follow-ups and support. Automate conversations 24/7."
        url="https://halatechnology.ae/whatsapp-automation"
        serviceType="WhatsApp Automation and Chatbot Services"
      />
      <Navbar />
      <main className="bg-[#111111]">
        <WhatsAppHero />
        <WhatsAppSecurity />
        <WhatsAppWorkflow />
        <WhatsAppMobileShowcase />
        <WhatsAppComparison />
        <WhatsAppOfferings />
        <WhatsAppWhyChoose />
        <CustomTestimonials />
        <ContactCTA contained={true} />
        <LatestBlogsSection />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
