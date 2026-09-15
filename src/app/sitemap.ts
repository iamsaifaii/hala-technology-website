import type { MetadataRoute } from 'next';

import { client } from '@/sanity/lib/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://halatechnology.ae';
  const now = new Date();

  // 1. Static Routes
  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/branding-services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/graphic-design-services-in-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/video-editing-services-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/content-creation-services', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/web-development-services-in-dubai', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/best-digital-marketing-services-in-dubai', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/digital-marketing-services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/best-seo-services-in-dubai', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/social-media-marketing-services-in-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ppc-service-in-dubai', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/ai-agent-services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/whatsapp-automation-services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/case-studies', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/careers', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/blogs', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  const staticSitemap = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // 2. Dynamic Blog Routes from Sanity
  let blogSitemap: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }`);
    blogSitemap = posts.map((post: any) => {
      const cleanSlug = (post.slug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
      return {
        url: `${baseUrl}/blogs/${cleanSlug}`,
        lastModified: new Date(post._updatedAt || now),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Failed to fetch Sanity posts for sitemap", error);
  }

  return [...staticSitemap, ...blogSitemap];
}
