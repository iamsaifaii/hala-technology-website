import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { latestPostsQuery, latestPostsByCategoryQuery } from '@/sanity/lib/queries';

interface LatestBlogsSectionProps {
  category?: string;
  title?: string;
  subtitle?: string;
}

export default async function LatestBlogsSection({ 
  category, 
  title = "Our Latest Blogs", 
  subtitle = "Discover our most recent thoughts, news, and strategies."
}: LatestBlogsSectionProps) {
  
  // Fetch 3 latest posts with automatic 60s cache revalidation
  const fetchOptions = { next: { revalidate: 60 } };

  const posts = category 
    ? await client.fetch(latestPostsByCategoryQuery, { category }, fetchOptions)
    : await client.fetch(latestPostsQuery, {}, fetchOptions);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 md:py-28 bg-white border-t border-[#eaeaea]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-jakarta font-semibold text-[#111111] mb-4 tracking-tight">
              {title}
            </h2>
            <p className="text-[#666666] font-jakarta text-lg">
              {subtitle}
            </p>
          </div>
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-[#111111] font-jakarta font-semibold hover:text-[#007FFF] transition-colors group whitespace-nowrap"
          >
            View all articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post: any) => {
            const rawSlug = typeof post.slug === 'string' ? post.slug : post.slug?.current;
            const cleanSlug = (rawSlug || '').toLowerCase().trim().replace(/[\s_]+/g, '-');
            const postHref = cleanSlug ? `/blogs/${cleanSlug}` : '/blogs';
            const displayDate = post.publishedAt || post._createdAt;

            return (
              <Link href={postHref} key={post._id} className="group block h-full">
                <div className="bg-white rounded-xl overflow-hidden border border-[#eaeaea] h-full flex flex-col hover:border-[#007FFF]/40 hover:shadow-lg transition-all duration-300">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#f4f4f4]">
                    {post.mainImage ? (
                      <Image
                        src={urlForImage(post.mainImage)?.url() as string}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#888]">
                        <span className="font-jakarta text-sm">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-6 md:p-8 flex-grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-jakarta font-semibold text-[#111111] mb-4 line-clamp-2 leading-tight group-hover:text-[#007FFF] transition-colors">
                      {post.title}
                    </h3>
                    
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
                        {displayDate && (
                          <div className="flex items-center gap-1.5 text-[#888888]">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-jakarta text-xs font-medium">
                              {new Date(displayDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
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

      </div>
    </section>
  );
}
