import { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Home/HeroSection';
import MarketingSolutions from '@/components/Home/MarketingSolutions';

const OurServices = nextDynamic(() => import('@/components/Home/Services'), { ssr: true });
const IndustriesWeCover = nextDynamic(() => import('@/components/Home/IndustriesWeCover'), { ssr: true });
const CaseStudies = nextDynamic(() => import('@/components/Home/CaseStudies'), { ssr: true });
const WhyChooseHala = nextDynamic(() => import('@/components/Home/WhyChooseUs'), { ssr: true });
const OurJourney = nextDynamic(() => import('@/components/Home/OurJourney'), { ssr: true });
const HomeWorkflow = nextDynamic(() => import('@/components/Home/HomeWorkflow'), { ssr: true });
const CustomTestimonials = nextDynamic(() => import('@/components/Home/Testimonials'), { ssr: true });
const ContactConsultation = nextDynamic(() => import('@/components/Home/ContactCTA'), { ssr: true });
const LatestBlogsSection = nextDynamic(() => import('@/components/Blogs/LatestBlogsSection'), { ssr: true });
const Footer = nextDynamic(() => import('@/components/Home/Footer'), { ssr: true });
export const metadata: Metadata = {
  title: 'Digital Marketing Agency Dubai | Best Marketing Company',
  description:
    'Hala Technology is a leading digital marketing agency in Dubai helping brands grow with SEO, PPC & web development. Get a free audit today.',
  keywords: [
    'digital marketing agency dubai',
    'digital marketing agency',
    'marketing agency dubai',
    'SEO services dubai',
    'PPC agency dubai',
    'web development dubai',
    'branding agency dubai',
  ],
  openGraph: {
    title: 'Digital Marketing Agency Dubai | Best Marketing Company',
    description:
    'Hala Technology is a leading digital marketing agency in Dubai helping brands grow with SEO, PPC & web development. Get a free audit today.',
    url: 'https://halatechnology.ae',
    images: [
      {
        url: 'https://halatechnology.ae',
        width: 1200,
        height: 630,
        alt: 'Hala Technology - Digital Marketing Agency Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Agency Dubai | Best Marketing Company',
    description:
    'Hala Technology is a leading digital marketing agency in Dubai helping brands grow with SEO, PPC & web development. Get a free audit today.',
    images: ['https://halatechnology.ae/hero-images/HomeHeroimage.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae',
  },
};

export default function Home() {
  return (
    <div className="font-jakarta bg-[#111111] text-white">
      <Navbar />
      <main className="bg-[#111111]">
        <Hero />
        <MarketingSolutions />
        <OurServices />
        <IndustriesWeCover />
        <CaseStudies />
        <WhyChooseHala />
        <OurJourney />
        <HomeWorkflow />
        <CustomTestimonials />
        <LatestBlogsSection />
        <ContactConsultation contained={true} />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
