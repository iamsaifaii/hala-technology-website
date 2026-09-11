import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import CaseStudyHero from '@/components/CaseStudies/CaseStudyHero';
import Footer from '@/components/Home/Footer';

const CaseStudyStory = dynamic(() => import('@/components/CaseStudies/CaseStudyStory'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));

export const metadata: Metadata = {
  title: 'Our Case Studies | Hala Technology',
  description:
    'Our case studies showcase real-world results driven by innovation, strategy, and smart execution. Explore how we’ve helped businesses grow through cutting-edge technology and tailored development.',
  openGraph: {
    title: 'Our Case Studies | Hala Technology',
    description:
      'Our case studies showcase real-world results driven by innovation, strategy, and smart execution. Explore how we’ve helped businesses grow through cutting-edge technology and tailored development.',
    url: 'https://halatechnology.ae/case-studies',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Case Studies - Hala Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Case Studies | Hala Technology',
    description:
      'Our case studies showcase real-world results driven by innovation, strategy, and smart execution. Explore how we’ve helped businesses grow through cutting-edge technology and tailored development.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        <CaseStudyHero />
        <CaseStudyStory />
        <LatestBlogsSection />
        <OutroMessage />
      </main>
      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
