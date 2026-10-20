import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Calendar, User } from 'lucide-react';
import dynamic from 'next/dynamic';

import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { postsQuery } from '@/sanity/lib/queries';
import Navbar from '@/components/Navbar/Navbar';

const Footer = dynamic(() => import('@/components/Home/Footer'));
const OutroMessage = dynamic(() => import('@/components/About/OutroMessage'));

export const metadata: Metadata = {
  title: 'Insights & Resources | Hala Technologies',
  description: 'Explore the latest insights, strategies, and news on digital marketing, development, and branding from Hala Technologies.',
  alternates: {
    canonical: 'https://halatechnology.ae/blogs',
  },
};

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await client.fetch(postsQuery);

  return (
    <div className="font-jakarta bg-white text-[#111] overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full">
        {/* Editorial Hero Section (Matching Contact Hero) */}
        <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-24 bg-white border-b border-[#e5e5e5]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <ArrowRight className="w-3.5 h-3.5 text-[#007FFF]" />
              <span className="font-jakarta text-xs md:text-sm text-[#666666] font-medium tracking-wide">
                Hala Technology • Insights &amp; Resources
              </span>
            </div>

            <h1 className="font-jakarta text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-semibold text-[#111111] leading-[1.05] tracking-tight mb-8 max-w-[1050px]">
              Explore our latest <span className="font-jakarta">insights</span> and strategies.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full pt-8 border-t border-[#f0f0f0]">
              <div className="md:col-span-8 lg:col-span-9">
                <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-[#555555] leading-relaxed">
                  Dive into our thoughts on digital marketing, web development, branding, and everything in between. Discover how we drive growth for businesses worldwide.
                </p>
              </div>
              <div className="md:col-span-4 lg:col-span-3 flex flex-col items-start md:items-end justify-start">
                 <span className="font-jakarta text-xs uppercase tracking-wider text-[#888888] font-semibold mb-1">
                   Total Articles
                 </span>
                 <span className="font-jakarta text-xl font-semibold text-[#111111]">
                   {posts?.length || 0} Published
                 </span>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Grid Section */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            {posts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {posts.map((post: any) => {
                  const rawSlug = typeof post.slug === 'string' ? post.slug : post.slug?.current;
                  const cleanSlug = (rawSlug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
                  const postHref = cleanSlug ? `/blogs/${cleanSlug}` : '/blogs';
                  return (
                    <Link href={postHref} key={post._id} className="group block h-full">
                    <div className="bg-white rounded-xl overflow-hidden border border-[#eaeaea] h-full flex flex-col">
                      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#f4f4f4]">
                        {post.mainImage ? (
                          <Image
                            src={urlForImage(post.mainImage)?.url() as string}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#888]">
                            <span className="font-jakarta text-sm">No Image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                      </div>
                      
                      <div className="p-6 md:p-8 flex-grow flex flex-col">
                        <h2 className="text-xl md:text-2xl font-jakarta font-semibold text-[#111111] mb-4 line-clamp-2 leading-tight">
                          {post.title}
                        </h2>
                        
                        <div className="mt-auto pt-6 flex flex-col gap-5">
                          <div className="flex items-center justify-between border-b border-[#eaeaea] pb-5">
                            <div className="flex items-center gap-3">
                            {post.authorImage ? (
                              <Image
                                src={urlForImage(post.authorImage)?.width(40).height(40).url() as string}
                                alt={post.authorName || 'Author'}
                                width={32}
                                height={32}
                                className="rounded-full object-cover border border-[#eaeaea]"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-[#f4f4f4] flex items-center justify-center border border-[#eaeaea]">
                                <User className="w-4 h-4 text-[#888]" />
                              </div>
                            )}
                            <span className="font-jakarta font-medium text-sm text-[#666666]">
                              {post.authorName || 'Hala Team'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[#888888]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-jakarta text-xs font-medium">
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-[#007FFF] font-jakarta text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            View full article <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-3xl border border-[#eaeaea] px-4">
                <h3 className="text-2xl md:text-3xl font-jakarta font-semibold text-[#111111] mb-4">No insights published yet.</h3>
                <p className="text-[#666666] font-jakarta text-lg">Check back soon for new articles and resources.</p>
              </div>
            )}
          </div>
        </section>

        <OutroMessage />
      </main>

      <div className="bg-white w-full relative z-20">
        <Footer />
      </div>
    </div>
  );
}
