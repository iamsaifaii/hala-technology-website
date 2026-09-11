import ContentCreation from '@/components/branding/ContentCreation/ContentCreation';
import LatestBlogsSection from '@/components/Blogs/LatestBlogsSection';
import { Metadata } from 'next';
import ServiceSchema from '@/components/SEO/ServiceSchema';

export const metadata: Metadata = {
  title: 'Content Creation Services | Social Media & Web Content',
  description:
    'Hala Technology provides content creation services in Dubai, from website copy to social posts and video scripts, built to tell your brand story.',
  keywords: [
    'content creation services',
    'content creation services dubai',
    'social media content creation',
    'copywriting services dubai',
    'brand storytelling uae',
    'digital content marketing',
  ],
  openGraph: {
    title: 'Content Creation Services | Social Media & Web Content',
    description:
    'Hala Technology provides content creation services in Dubai, from website copy to social posts and video scripts, built to tell your brand story.',
    url: 'https://halatechnology.ae/content-creation-services',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Content Creation Services - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Creation Services | Social Media & Web Content',
    description:
    'Hala Technology provides content creation services in Dubai, from website copy to social posts and video scripts, built to tell your brand story.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/content-creation-services',
  },
};

export default function ContentCreationPage() {
  return (
    <div className="w-full">
      <ServiceSchema
        name="Content Creation Services"
        description="Hala Technology provides content creation services in Dubai, from website copy to social posts and video scripts, built to tell your brand story."
        url="https://halatechnology.ae/branding/content-creation"
        serviceType="Content Creation Services"
      />
      <ContentCreation />
      <LatestBlogsSection />
    </div>
  );
}
