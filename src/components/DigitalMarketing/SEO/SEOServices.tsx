'use client';

import { useState } from 'react';
import {
  Search, Code, FileText, Edit3, Link2, BarChart3, Plus, Minus, Target, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  {
    title: 'On-Page & Technical Foundation',
    icon: Target,
    services: [
      {
        id: 'keyword-research',
        title: 'Keyword Research',
        icon: Search,
        description: 'We find high-value keywords for your business through SEMrush and Ahrefs. These keywords help you get more visibility, more organic traffic, and connect with the right people. By analyzing search trends and competitor strategies, we create a targeted plan tailored to your niche.'
      },
      {
        id: 'technical-seo',
        title: 'Technical SEO',
        icon: Code,
        description: 'We enhance your website performance by fixing crawl errors, speeding up the site, and making sure it works on all devices. XML sitemaps and schema markup make it easier for search engines to understand your site, which improves the experience for users on all platforms.'
      },
      {
        id: 'on-page-seo',
        title: 'On-Page SEO',
        icon: FileText,
        description: 'At Hala Technology, we specialize in delivering powerful On-Page SEO services that optimize your website for maximum visibility and conversions. Our team works on all the key factors of on-page SEO to ensure your site ranks higher on Google, attracts the right audience, and delivers a seamless user experience.'
      }
    ]
  },
  {
    title: 'Content, Authority & Analytics',
    icon: TrendingUp,
    services: [
      {
        id: 'content-optimization',
        title: 'Content Optimization',
        icon: Edit3,
        description: 'We develop SEO-friendly, engaging content aligned with your audience search intent. We also create blogs, articles, and landing pages with the keywords. High-quality content improves your overall SEO performance by bringing in more visitors, building authority, and encouraging people to interact with your site.'
      },
      {
        id: 'link-building',
        title: 'Link Building',
        icon: Link2,
        description: 'The main goal of our link-building strategy is to get high-quality, relevant backlinks from trusted sites. This will improve your search engine rankings and your domain authority. We do proper outreach and content marketing to build strong interactions and make your website look more secure.'
      },
      {
        id: 'reporting-analytics',
        title: 'Reporting & Analytics',
        icon: BarChart3,
        description: 'Get clear and complete reports on how well your SEO is doing regularly. We monitor user behavior, traffic sources, and keyword rankings to assess our performance and make necessary improvements to our strategies. Analytics can help you better understand ROI and make decisions based on data that will help improving your online presence.'
      }
    ]
  }
];

export default function SEOServices() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>('keyword-research');

  const toggleService = (id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="font-jakarta bg-white text-[#111111] w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24 relative overflow-hidden border-b border-[#e5e5e5]">
      
      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* Top Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <div className="bg-[#007FFF] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-jakarta font-semibold mb-6">
            SEO Services UAE
          </div>
          <h2 className="font-jakarta font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.08] tracking-tight mb-6 text-[#111111] max-w-4xl">
            Our SEO <span className="font-jakarta pr-2">Services</span>
          </h2>
          <p className="font-jakarta text-base md:text-lg text-[#555555] max-w-2xl leading-relaxed">
            Discover how we’ve helped businesses transform through innovative solutions.
          </p>
        </div>

        {/* Main White Card with 2 Side-by-Side Columns */}
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#eeeeee]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            
            {CATEGORIES.map((category, catIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={catIndex} className="flex flex-col h-full">
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#e5e5e5] mb-4">
                    <h3 className="font-jakarta text-xl md:text-2xl font-semibold text-[#111111] tracking-tight">
                      {category.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-[#007FFF] flex items-center justify-center">
                      <CategoryIcon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Accordion List Items */}
                  <div className="flex flex-col gap-3">
                    {category.services.map((service) => {
                      const isActive = activeServiceId === service.id;
                      const IconComponent = service.icon;

                      return (
                        <div
                          key={service.id}
                          className={`flex flex-col py-4 px-5 rounded-2xl transition-colors duration-300 cursor-pointer ${
                            isActive ? 'bg-[#111111] text-white' : 'bg-white hover:bg-[#f9f9f9] text-[#111111] border border-[#e5e5e5]'
                          }`}
                          onClick={() => toggleService(service.id)}
                        >
                          {/* Accordion Trigger Header */}
                          <div className="flex items-center justify-between w-full focus:outline-none">
                            <div className="flex items-center gap-3.5">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                                isActive ? 'bg-[#007FFF] text-white' : 'bg-[#f5f5f5] text-[#111111]'
                              }`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className={`font-jakarta text-base font-semibold ${
                                isActive ? 'text-white' : 'text-[#111111]'
                              }`}>
                                {service.title}
                              </span>
                            </div>

                            {isActive ? (
                              <Minus className="w-4 h-4 text-white" />
                            ) : (
                              <Plus className="w-4 h-4 text-[#111111]" />
                            )}
                          </div>

                          {/* Accordion Body */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 pb-2 pl-12">
                                  <p className="font-jakarta text-xs md:text-sm leading-relaxed text-[#CCCCCC]">
                                    {service.description}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
