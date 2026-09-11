import VideoEditing from '@/components/branding/VideoEditing/VideoEditing';
import VideoEditingShowcase from '@/components/branding/VideoEditing/VideoEditingShowcase';
import VideoEditingReels from '@/components/branding/VideoEditing/VideoEditingReels';
import VideoEditingDetails from '@/components/branding/VideoEditing/VideoEditingDetails';
import VideoEditingServices from '@/components/branding/VideoEditing/VideoEditingServices';
import VideoEditingStandOut from '@/components/branding/VideoEditing/VideoEditingStandOut';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import ServiceSchema from '@/components/SEO/ServiceSchema';

const CustomTestimonials = dynamic(() => import('@/components/Home/Testimonials'));
const VideoEditingFAQ = dynamic(() => import('@/components/branding/VideoEditingFAQ'));
const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const metadata: Metadata = {
  title: 'Video Editing Services Dubai | Video Editing Agency',
  description:
    'Hala Technology offers professional video editing services in Dubai for social media, ads & corporate videos. Turn raw footage into impact.',
  keywords: [
    'video editing services dubai',
    'video editing agency dubai',
    'corporate video editing dubai',
    'social media video editing',
    'reels editing services uae',
    'video production dubai',
  ],
  openGraph: {
    title: 'Video Editing Services Dubai | Video Editing Agency',
    description:
    'Hala Technology offers professional video editing services in Dubai for social media, ads & corporate videos. Turn raw footage into impact.',
    url: 'https://halatechnology.ae/video-editing-services-dubai',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Video Editing Services Dubai - Hala Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Editing Services Dubai | Video Editing Agency',
    description:
    'Hala Technology offers professional video editing services in Dubai for social media, ads & corporate videos. Turn raw footage into impact.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  alternates: {
    canonical: 'https://halatechnology.ae/video-editing-services-dubai',
  },
};

export default function VideoEditingPage() {
  return (
    <div className="w-full">
      <ServiceSchema
        name="Video Editing Services Dubai"
        description="Hala Technology offers professional video editing services in Dubai for social media, ads & corporate videos. Turn raw footage into impact."
        url="https://halatechnology.ae/branding/video-editing"
        serviceType="Video Editing Services"
      />
      <VideoEditing />
      <VideoEditingShowcase />
      <VideoEditingReels />
      <VideoEditingDetails />
      <VideoEditingServices />
      <VideoEditingStandOut />
      <CustomTestimonials />
      <VideoEditingFAQ />
      <ContactCTA contained={true} />
      <LatestBlogsSection />
    </div>
  );
}
