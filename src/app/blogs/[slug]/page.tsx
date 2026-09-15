import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { postQuery, postPathsQuery } from '@/sanity/lib/queries';
import Navbar from '@/components/Navbar/Navbar';

const Footer = dynamic(() => import('@/components/Home/Footer'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));
const LatestBlogsSection = dynamic(() => import('@/components/Blogs/LatestBlogsSection'));

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await client.fetch(postPathsQuery);
  return (posts || []).map((post: { slug: string }) => ({
    slug: (post.slug || '').toLowerCase().trim().replace(/[\s_]+/g, '-'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const decodedSlug = decodeURIComponent(rawSlug);
  const normalizedSlug = decodedSlug.toLowerCase().trim().replace(/[\s_]+/g, '-');
  const post = await client.fetch(postQuery, { slug: rawSlug, decodedSlug, normalizedSlug });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const BASE_URL = 'https://halatechnology.ae';

  // Use backend SEO title if available, otherwise fall back to article title
  const seoTitle = post.seoTitle || post.title;

  // Use backend meta description if available, otherwise fall back to excerpt, then article title
  const seoDescription = post.metaDescription || post.excerpt || post.title;

  // Canonical URL: article's own clean canonical URL
  const canonicalSlug = typeof post.slug === 'string' ? post.slug : post.slug?.current || normalizedSlug;
  const canonicalUrl = `${BASE_URL}/blogs/${canonicalSlug}`;

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
      const rawHref = value?.href || '';
      const isInternal =
        rawHref.startsWith('/') ||
        rawHref.startsWith('#') ||
        rawHref.includes('halatechnology.ae') ||
        rawHref.includes('localhost');

      // Convert full halatechnology.ae URLs to relative paths for instant client-side routing
      let targetHref = rawHref;
      if (rawHref.includes('halatechnology.ae')) {
        targetHref = rawHref.replace(/^https?:\/\/(www\.)?halatechnology\.ae/, '') || '/';
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
  const decodedSlug = decodeURIComponent(rawSlug);
  const normalizedSlug = decodedSlug.toLowerCase().trim().replace(/[\s_]+/g, '-');
  const post = await client.fetch(postQuery, { slug: rawSlug, decodedSlug, normalizedSlug });

  if (!post) {
    notFound();
  }

  // Canonical slug enforcement: if URL visited was not the clean canonical slug (e.g. SEO%20Consulting%20Services), permanently redirect (301/308)
  const canonicalSlug = typeof post.slug === 'string' ? post.slug : post.slug?.current;
  if (canonicalSlug && rawSlug !== canonicalSlug && decodedSlug !== canonicalSlug) {
    permanentRedirect(`/blogs/${canonicalSlug}`);
  }

  return (
    <div className="font-jakarta bg-[#111111] text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.mainImage ? [urlForImage(post.mainImage)?.url()] : [],
            "datePublished": post.publishedAt,
            "author": [{
              "@type": "Person",
              "name": post.authorName || 'Hala Team',
              "url": "https://halatechnology.ae"
            }]
          })
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
