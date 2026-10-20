'use client';

import { useState } from 'react';
import {
  PenTool, Megaphone, Plus, Minus, ArrowRight, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { ElementType } from 'react';

// ─── Types ────────────────────────────────────────────
interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href?: string;
}

interface ServiceCategory {
  title: string;
  icon: ElementType;
  services: ServiceItem[];
}

const categories: ServiceCategory[] = [
  {
    title: 'Content & Copywriting',
    icon: PenTool,
    services: [
      {
        id: 'website-writing',
        title: 'Writing for Websites',
        description: 'Search engine optimized, engaging copy for homepages, service pages, about pages, and landing pages that speak directly to your target audience.',
        href: '#'
      },
      {
        id: 'blog-writing',
        title: 'Blog & Article Writing',
        description: 'Informative, engaging, and search-engine-optimized articles that build authority, drive traffic, and further your marketing goals.',
        href: '#'
      },
      {
        id: 'product-descriptions',
        title: 'Product Descriptions',
        description: 'Convincing, value-driven product copy with the best possible conversion rates and consumer confidence.',
        href: '#'
      },
    ]
  },
  {
    title: 'Social & Marketing',
    icon: Megaphone,
    services: [
      {
        id: 'social-media',
        title: 'Social Media Content',
        description: 'Platform-specific captions, visuals, post ideas, story templates, and reels scripts that hold your audience and keep your brand alive.',
        href: '#'
      },
      {
        id: 'ad-copy',
        title: 'Ad Copywriting',
        description: 'Copy for Google Ads, Meta Ads, and other platforms that is compelling and appealing in order to get people to pause and click.',
        href: '#'
      },
      {
        id: 'email-content',
        title: 'Email & Newsletter Content',
        description: 'Appealing email copy that informs leads, pushes offers, and brings your visitors back.',
        href: '#'
      },
      {
        id: 'video-scripts',
        title: 'Video Scriptwriting',
        description: 'Scriptwriting for YouTube content, brand explainers, reels, and ad creatives that make your message stick.',
        href: '#'
      }
    ]
  }
];

export default function ContentCreationServices() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="font-jakarta bg-white text-[#111111] w-full px-5 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 relative overflow-hidden">
      
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#007FFF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#007FFF]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Top Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <div className="bg-[#007FFF] text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
            What We Offer
          </div>
          <h2 className="font-jakarta font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight mb-6 text-[#111111]">
            Content Built to <br className="hidden md:block" />
            <span className="font-jakarta pr-2">Perform &amp; Convert</span>
          </h2>
          <p className="text-lg md:text-xl text-[#555555] font-medium max-w-2xl">
            At Hala Technology we blend creativity with strategy to deliver content that actually works. Every piece is original tailored and aligned with your brand's voice and goals.
          </p>
        </div>

        {/* Bottom Section: Exact Screenshot Layout with Accordion */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
          
          {/* Main White Card with Two Columns */}
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-12 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#eeeeee]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              
              {categories.map((category, catIndex) => (
                <div key={catIndex} className="flex flex-col h-full">
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#e5e5e5] mb-2">
                    <h3 className="font-jakarta text-[22px] md:text-[24px] font-medium text-[#111111] tracking-tight">
                      {category.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-[#d5d5d5] flex items-center justify-center bg-white transition-colors hover:border-[#007FFF] group cursor-pointer">
                        <ArrowUpRight className="w-[14px] h-[14px] text-[#555555] group-hover:text-[#007FFF]" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#007FFF] flex items-center justify-center shadow-sm">
                        <category.icon className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

                  {/* Accordion List Items */}
                  <div className="flex flex-col h-full">
                    {category.services.map((service, srvIndex) => {
                      const isActive = activeServiceId === service.id;
                      const isLast = srvIndex === category.services.length - 1;

                      return (
                        <div 
                          key={service.id}
                          className={`flex flex-col py-4 px-4 -mx-4 rounded-xl group transition-colors duration-500 cursor-pointer ${
                            isActive ? 'bg-[#111111]' : 'hover:bg-[#111111]'
                          } ${
                            !isActive && !isLast ? 'border-b border-[#e5e5e5] hover:border-transparent' : ''
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          {/* Accordion Trigger Header */}
                          <div className="flex items-center justify-between w-full focus:outline-none">
                            <span className={`text-[14px] md:text-[15px] font-medium transition-colors duration-500 ${
                              isActive ? 'text-white' : 'text-[#111111] group-hover:text-white'
                            }`}>
                              {service.title}
                            </span>
                            {isActive ? (
                              <Minus className="w-[16px] h-[16px] text-white transition-all duration-500" />
                            ) : (
                              <Plus className="w-[16px] h-[16px] text-[#111111] group-hover:text-white transition-all duration-500" />
                            )}
                          </div>

                          {/* Accordion Body */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 pb-1 flex flex-col gap-4">
                                  <p className="text-white/80 text-[13px] md:text-[14px] leading-relaxed font-medium">
                                    {service.description}
                                  </p>
                                  <Link 
                                    href={service.href || "#"} 
                                    className="inline-flex items-center gap-2 text-[12px] font-bold text-[#007FFF] hover:text-white transition-colors self-start"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Contact Now <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                                  </Link>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="w-full bg-[#111111] rounded-[20px] p-5 md:py-5 md:px-8 flex flex-col md:flex-row items-center justify-between border-2 border-[#222222] shadow-[8px_8px_0px_0px_#000000]">
            <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-[#222222] border border-[#333333] flex flex-shrink-0 items-center justify-center">
                <svg className="w-5 h-5 text-[#007FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
              </div>
              <p className="text-white text-[14px] md:text-[15px] font-medium">
                Ready to empower your brand with high-quality content? Let's talk strategy.
              </p>
            </div>
            
            <Link href="/contact" className="inline-flex items-center justify-center bg-[#007FFF] text-white font-bold text-[11px] md:text-[12px] tracking-wide px-6 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap w-full md:w-auto shadow-md shadow-[#007FFF]/20">
              BOOK A CALL
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
