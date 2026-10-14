import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import dynamic from 'next/dynamic';

import JsonLd from '@/components/SEO/JsonLd';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { postQuery, postByIdQuery, allPostSlugsQuery, postPathsQuery } from '@/sanity/lib/queries';
import Navbar from '@/components/Navbar/Navbar';

const Footer = dynamic(() => import('@/components/Home/Footer'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const revalidate = 60;
export const dynamicParams = true;

/**
 * The slug-variant fallback below used to fetch every post slug in the dataset
 * on each miss. With `dynamicParams = true`, a bot hitting /blogs/<random> in a
 * loop turned that into two uncached full-collection queries per request. The
 * map is now cached and shared, so a flood of misses costs one query per hour.
 */
const getSlugIndex = unstable_cache(
  async () => {
    const all = (await client.fetch(allPostSlugsQuery)) as Array<{ _id: string; slug: string }>;
    const index: Record<string, string> = {};
    for (const p of all || []) {
      const norm = (p.slug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
      if (norm) index[norm] = p._id;
    }
    return index;
  },
  ['blog-slug-index'],
  { revalidate: 3600, tags: ['posts'] },
);

async function getPost(rawSlug: string) {
  const decodedSlug = decodeURIComponent(rawSlug || '');
  const normalizedSlug = decodedSlug.toLowerCase().trim().replace(/[\s_]+/g, '-');
  const spacedSlug = normalizedSlug.replace(/-/g, ' ');
  const underscoredSlug = normalizedSlug.replace(/-/g, '_');

  // 1. Direct query with exact and common normalized slug variations
  let post = await client.fetch(postQuery, {
    slug: rawSlug,
    decodedSlug,
    normalizedSlug,
    spacedSlug,
    underscoredSlug,
  });

  // 2. Resilient Fallback: If no direct match (e.g. CMS slug had irregular spaces/casing),
  // compare normalized slugs in memory and fetch by document _id
  if (!post) {
    try {
      const slugIndex = await getSlugIndex();
      const matchedId = slugIndex[normalizedSlug];
      if (matchedId) {
        post = await client.fetch(postByIdQuery, { id: matchedId });
      }
    } catch (err) {
      console.error('[getPost] Error in fallback slug resolution:', err);
    }
  }

  return { post, normalizedSlug };
}

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return (posts || []).map((post: { slug: string }) => ({
    slug: (post.slug || '').toLowerCase().trim().replace(/[\s_]+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { post, normalizedSlug } = await getPost(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const BASE_URL = 'https://halatechnology.ae';

  // Use backend SEO title if available, otherwise fall back to article title
  const seoTitle = post.seoTitle || post.title;

  // Use backend meta description if available, otherwise fall back to excerpt, then article title
  const seoDescription = post.metaDescription || post.excerpt || post.title;

  // Clean canonical slug: guaranteed lowercase, hyphenated, no %20 or spaces
  const rawCanonical = typeof post.slug === 'string' ? post.slug : post.slug?.current || normalizedSlug;
  const cleanCanonicalSlug = (rawCanonical || normalizedSlug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
  const canonicalUrl = `${BASE_URL}/blogs/${cleanCanonicalSlug}`;

  // OG Image: dedicated ogImage field → mainImage → site default
  const ogImageUrl = post.ogImage
    ? urlForImage(post.ogImage)?.width(1200).height(630).url()
    : post.mainImage
      ? urlForImage(post.mainImage)?.width(1200).height(630).url()
      : `${BASE_URL}/og-image.png`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Hala Technologies',
      publishedTime: post.publishedAt,
      authors: [post.authorName || 'Hala Team'],
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: seoTitle }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-80 sm:h-96 md:h-[500px] my-10 rounded-2xl overflow-hidden border border-[#eaeaea]">
          <Image
            alt={value.alt || 'Blog content image'}
            src={urlForImage(value)?.url() as string}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const rawHref = typeof value?.href === 'string' ? value.href.trim() : '';
      if (!rawHref) return <>{children}</>;

      // Resolve the href properly instead of substring-matching the domain.
      // `https://evil.com/?r=halatechnology.ae` contains our domain but is NOT
      // internal, and `javascript:` / `data:` URLs must never be rendered.
      let targetHref = rawHref;
      let isInternal = false;

      if (rawHref.startsWith('/') || rawHref.startsWith('#')) {
        isInternal = true;
      } else {
        let parsed: URL | null = null;
        try {
          parsed = new URL(rawHref);
        } catch {
          parsed = null;
        }

        // Reject anything that is not plain http(s) — blocks javascript:, data:, vbscript:
        if (!parsed || (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')) {
          return <>{children}</>;
        }

        const host = parsed.hostname.toLowerCase();
        isInternal =
          host === 'halatechnology.ae' ||
          host === 'www.halatechnology.ae' ||
          host === 'localhost';

        // Rewrite our own absolute URLs to relative paths for client-side routing
        if (isInternal) {
          targetHref = `${parsed.pathname}${parsed.search}${parsed.hash}` || '/';
        }
      }

      if (isInternal) {
        return (
          <Link
            href={targetHref}
            className="text-[#007FFF] font-semibold underline underline-offset-4 decoration-[#007FFF]/60 hover:text-[#0055b3] hover:decoration-[#0055b3] transition-colors inline"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={rawHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#007FFF] font-semibold underline underline-offset-4 decoration-[#007FFF]/60 hover:text-[#0055b3] hover:decoration-[#0055b3] transition-colors inline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold text-[#111111]">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    code: ({ children }: any) => (
      <code className="bg-[#f4f4f6] text-[#007FFF] px-1.5 py-0.5 rounded text-sm font-mono border border-[#e5e7eb]">{children}</code>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-jakarta font-bold mt-16 mb-6 text-[#111111] leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-jakarta font-bold mt-12 mb-5 text-[#111111] leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl md:text-3xl font-jakarta font-bold mt-10 mb-4 text-[#111111] leading-snug">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl md:text-2xl font-jakarta font-bold mt-8 mb-3 text-[#111111]">{children}</h4>,
    normal: ({ children }: any) => <p className="text-lg md:text-[19px] leading-relaxed mb-6 text-[#444444] font-jakarta">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#007FFF] bg-[#f8f9fa] py-4 pr-4 pl-6 text-xl my-10 text-[#333333] font-jakarta rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-lg text-[#444444] font-jakarta">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-lg text-[#444444] font-jakarta">{children}</ol>,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const decodedSlug = decodeURIComponent(rawSlug || '');
  const { post, normalizedSlug } = await getPost(rawSlug);

  if (!post) {
    notFound();
  }

  // Canonical slug enforcement: if URL visited was not the clean canonical slug (e.g. /blogs/seo%20agency%20dubai or uppercase), permanently redirect (301/308) to the clean URL
  const rawCanonical = typeof post.slug === 'string' ? post.slug : post.slug?.current || normalizedSlug;
  const cleanCanonicalSlug = (rawCanonical || normalizedSlug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
  if (cleanCanonicalSlug && rawSlug !== cleanCanonicalSlug && decodedSlug !== cleanCanonicalSlug) {
    permanentRedirect(`/blogs/${cleanCanonicalSlug}`);
  }

  return (
    <div className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <JsonLd
        id="blog-schema"
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          image: post.mainImage ? [urlForImage(post.mainImage)?.url()] : [],
          datePublished: post.publishedAt,
          dateModified: post._updatedAt || post.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://halatechnology.ae/blogs/${cleanCanonicalSlug}`,
          },
          author: [
            {
              '@type': 'Person',
              name: post.authorName || 'Hala Team',
              url: 'https://halatechnology.ae',
            },
          ],
          publisher: {
            '@type': 'Organization',
            name: 'Hala Technology',
            url: 'https://halatechnology.ae',
            logo: {
              '@type': 'ImageObject',
              url: 'https://halatechnology.ae/icon.png',
            },
          },
        }}
      />
      <Navbar />

      <main className="flex-grow w-full bg-white pt-[120px] md:pt-[160px] pb-16">
        <article className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link 
            href="/blogs" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#666666] hover:text-[#111111] transition-colors mb-10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>

          {post.categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((cat: string) => (
                <span key={cat} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f4f4] rounded-full text-xs font-semibold text-[#555555]">
                  <Tag size={12} />
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-jakarta font-semibold text-[#111111] mb-10 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-[#eaeaea]">
            <div className="flex items-center gap-3">
              {post.authorImage ? (
                <Image
                  src={urlForImage(post.authorImage)?.width(56).height(56).url() as string}
                  alt={post.authorName || 'Author'}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border border-[#eaeaea]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#f4f4f4] flex items-center justify-center border border-[#eaeaea]">
                  <User className="w-5 h-5 text-[#888]" />
                </div>
              )}
              <div>
                <p className="font-semibold text-[#111111] text-[15px]">
                  {post.authorName || 'Hala Team'}
                </p>
                <p className="text-[#666666] text-sm">Author</p>
              </div>
            </div>

            <div className="w-px h-10 bg-[#eaeaea] hidden sm:block" />

            <div className="flex items-center gap-2 text-[#666666]">
              <Calendar size={18} />
              <span className="text-[15px] font-medium">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {post.mainImage && (
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#eaeaea]">
              <Image
                src={urlForImage(post.mainImage)?.url() as string}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="blog-content prose prose-lg max-w-none text-[#444444]">
            <PortableText value={post.body} components={ptComponents} />
          </div>
          
        </article>
        
        <LatestBlogsSection title="More Latest Blogs" />
        <div className="mt-20">
          <OutroMessage />
        </div>
      </main>

      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
