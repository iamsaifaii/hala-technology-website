import { Metadata } from 'next';
import Navbar from '@/components/Navbar/Navbar';
import AIAgentHero from '@/components/AIAgent/AIAgentHero';
import AIAgentCatalog from '@/components/AIAgent/AIAgentCatalog';
import AIAgentTransform from '@/components/AIAgent/AIAgentTransform';
import AIAgentFeatures from '@/components/AIAgent/AIAgentFeatures';
import AIAgentDesktopShowcase from '@/components/AIAgent/AIAgentDesktopShowcase';
import AIAgentOfferings from '@/components/AIAgent/AIAgentOfferings';
import AIAgentWhyChoose from '@/components/AIAgent/AIAgentWhyChoose';
import CustomTestimonials from '@/components/Home/Testimonials';
import LatestBlogsSection from '@/components/Blogs/LatestBlogsSection';
import ContactCTA from '@/components/Home/ContactCTA/ContactCTA';
import Footer from '@/components/Home/Footer';
import ServiceSchema from '@/components/SEO/ServiceSchema';

export const metadata: Metadata = {
  title: 'AI Agent Services | AI Chatbots & Automation',
  description:
    'Transform your business with our AI agent services that automate workflows, handle customer queries and help teams work more efficiently.',
  keywords: [
    'AI agent services',
    'AI chatbots dubai',
    'AI automation uae',
    'customer service automation',
    'intelligent agents dubai',
    'AI workflow automation',
  ],
  openGraph: {
    title: 'AI Agent Services | AI Chatbots & Automation',
    description:
    'Transform your business with our AI agent services that automate workflows, handle customer queries and help teams work more efficiently.',
    url: 'https://halatechnology.ae/ai-agent-services',
    images: [
      {
        url: 'https://halatechnology.ae/hero-images/AiagentHeroimage.png',
        secureUrl: 'https://halatechnology.ae/hero-images/AiagentHeroimage.png',
        width: 1200,
        height: 630,
        alt: 'AI Agent Services - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Agent Services | AI Chatbots & Automation',
    description:
    'Transform your business with our AI agent services that automate workflows, handle customer queries and help teams work more efficiently.',
    images: ['https://halatechnology.ae/hero-images/AiagentHeroimage.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/ai-agent-services',
  },
};

export default function AIAgentPage() {
  const jakartaStyle = { fontFamily: "'Plus Jakarta Sans', var(--font-plus-jakarta), sans-serif" };

  return (
    <div 
      style={jakartaStyle}
      className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col"
    >
      <ServiceSchema
        name="AI Agent Services"
        description="Transform your business with our AI agent services that automate workflows, handle customer queries and help teams work more efficiently."
        url="https://halatechnology.ae/ai-agent"
        serviceType="AI Agent and Automation Services"
      />
      <Navbar />
      <main className="flex-grow w-full">
        <AIAgentHero />
        <AIAgentCatalog />
        <AIAgentTransform />
        <AIAgentFeatures />
        <AIAgentDesktopShowcase />
        <AIAgentOfferings />
        <AIAgentWhyChoose />
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
