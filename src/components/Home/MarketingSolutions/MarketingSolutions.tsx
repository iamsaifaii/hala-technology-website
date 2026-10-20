'use client';
import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code2, MonitorPlay, Search, Share2, PenTool, MousePointerClick, Smartphone } from 'lucide-react';

const marketingTags = [
  { name: 'SEO', icon: Search },
  { name: 'PPC Ads', icon: MousePointerClick },
  { name: 'Social Media', icon: Share2 },
  { name: 'Content Strategy', icon: PenTool },
  { name: 'Web Dev', icon: Code2 },
  { name: 'App Marketing', icon: Smartphone },
  { name: 'Video Marketing', icon: MonitorPlay },
];

function MarketingSolutionsComponent() {
  const [activeTag, setActiveTag] = useState('SEO');

  const handleTagClick = useCallback((tagName: string) => {
    setActiveTag(tagName);
  }, []);

  return (
    <section className="font-jakarta w-full bg-[#111111] px-4 sm:px-6 md:px-8 lg:px-12 py-10 md:py-14 relative overflow-x-hidden z-20 gpu-layer">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-24 bg-gradient-to-b from-[#f8f6ed] to-transparent opacity-[0.03]" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
        {/* Left Column: Headline and Interactive Tags */}
        <div className="flex flex-col z-10 text-center lg:text-left items-center lg:items-start order-1">
          <h2 className="font-jakarta font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] tracking-tight text-[#f0f0f0] mb-4 md:mb-6">
            Marketing Solutions for<br className="hidden lg:block" /> <span className="font-jakarta text-white pr-2 md:pr-4">Businesses</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-medium mb-8 md:mb-12">
            Select a service to see our expertise in action.
          </p>

          {/* Pill Tags Grid */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 max-w-2xl">
            {marketingTags.map((tag) => {
              const isActive = activeTag === tag.name;
              const Icon = tag.icon;
              return (
                <button
                  key={tag.name}
                  type="button"
                  onClick={() => handleTagClick(tag.name)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-600 text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer
                    ${isActive
                      ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                      : 'bg-transparent text-zinc-300 hover:border-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Illustration and Description */}
        <div className="flex flex-col gap-6 z-10 order-2">
          {/* Custom Image Illustration */}
          <div className="relative w-full mx-auto lg:ml-auto select-none rounded-[20px] md:rounded-[32px] overflow-hidden drop-shadow-2xl">
            <Image
              src="/MS.jpg"
              alt="Marketing Illustration"
              width={1280}
              height={720}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Description Text & CTA */}
          <div className="flex flex-col bg-zinc-900/50 p-5 md:p-6 rounded-[20px] md:rounded-3xl border border-zinc-800 backdrop-blur-sm">
            <h3 className="font-jakarta font-semibold text-2xl md:text-3xl text-white mb-2 md:mb-3">
              Everything you need. One team.
            </h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
              At Hala Technology, we bring SEO, paid advertising, content creation, and social media under one roof. Instead of running isolated campaigns, we build a connected growth strategy designed to turn your audience into loyal, paying customers.
            </p>
            <Link href="/contact" className="flex items-center justify-center gap-3 w-full sm:w-auto bg-[#007FFF] text-white font-bold py-3.5 md:py-4 px-6 md:px-8 rounded-xl hover:bg-[#0066CC] transition-colors self-start shadow-[0_0_20px_rgba(0,127,255,0.2)] no-underline">
              <Search className="w-5 h-5" />
              Get a Free Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(MarketingSolutionsComponent);
