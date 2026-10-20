'use client';

import { useState, useCallback, memo } from 'react';
import {
  TrendingUp, MonitorSmartphone, Plus, Minus, ArrowRight, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
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
    title: 'Marketing & Strategy',
    icon: TrendingUp,
    services: [
      {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        description: 'Are you struggling to reach your target audience or convert clicks into customers? At Hala Technology, we provide professional digital marketing services in Dubai that help businesses grow smarter and faster. From SEO to PPC, social media marketing to content strategies, our experts use proven methods to increase visibility, drive qualified leads, and maximize ROI.',
        href: '/digital-marketing'
      },
      {
        id: 'seo',
        title: 'Search Engine Optimization',
        description: 'Looking for professional SEO services in Dubai that help your business stand out online? At Hala Technology, we specialize in delivering data-driven, innovative, and strategic SEO solutions that not only improve rankings but also drive real results. Whether you need keyword research, on-page optimization, technical SEO or complete search engine optimization management, our team is here to turn your website into a powerful lead generating platform.',
        href: '/seo'
      },
      {
        id: 'whatsapp-automation',
        title: 'WhatsApp Automation',
        description: 'At Hala Technology, we help businesses transform WhatsApp from a simple chat tool into a powerful automated communication channel. Our WhatsApp Automation solutions streamline customer interactions, boost response times, and allow you to engage your audience around the clock without the need for constant manual effort.',
        href: '/whatsapp-automation'
      },
      {
        id: 'content-creation',
        title: 'Content Creation',
        description: 'Struggling to create content that grabs attention and drives results? At Hala Technology, we provide professional content creation services in Dubai designed to help businesses communicate their brand story effectively. From website content to social media posts, blogs to video scripts, our creative team ensures your content not only looks great but also performs.',
        href: '/branding/content-creation'
      }
    ]
  },
  {
    title: 'Design & Development',
    icon: MonitorSmartphone,
    services: [
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'Looking for professional web development services in Dubai that deliver results? At Hala Technology, we design and develop websites that don’t just look good they perform, convert, and scale with your business. From custom websites to eCommerce Platforms, our expert developers combine creativity, strategy, and the latest technology to give your brand a strong online presence.',
        href: '/website-development'
      },
      {
        id: 'graphic-designing',
        title: 'Graphic Designing',
        description: 'Looking for professional graphic design services in Dubai that make your business stand out? At Hala Technology, we specialize in delivering eye-catching, innovative, and strategic designs that not only look stunning but also convert. Whether you need logo design, social media graphics, marketing materials, or complete brand identity design, our team is here to turn your ideas into impactful visuals.',
        href: '/branding/graphic-design'
      },
      {
        id: 'video-editing',
        title: 'Video Editing',
        description: 'Looking for professional video editing services in Dubai that bring your stories to life? At Hala Technology, we specialize in transforming your raw footage into polished, engaging, and impactful videos. Whether it’s for social media, corporate presentations, ads, or events, our expert editors use creativity and the latest tools to deliver videos that truly stand out.',
        href: '/branding/video-editing'
      },
      {
        id: 'ai-agent',
        title: 'AI Agent',
        description: 'Looking to scale your business with the power of artificial intelligence? At Hala Technology, we provide advanced AI agent services in Dubai designed to automate repetitive tasks, boost efficiency, and improve customer experience. From chatbots to workflow automation, our AI solutions empower businesses to work smarter and stay ahead of the competition.',
        href: '/ai-agent'
      }
    ]
  }
];

function ServicesComponent() {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

  const toggleService = useCallback((id: string) => {
    setActiveServiceId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section className="font-jakarta bg-white text-[#111111] w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 relative overflow-hidden rounded-t-[40px] md:rounded-t-[60px] content-visibility-auto gpu-layer">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#007FFF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#007FFF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
          <div className="bg-[#007FFF] text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
            Our Services
          </div>
          <h2 className="font-jakarta font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight mb-6 text-[#111111]">
            Tailored services.<br className="hidden sm:block" />
            Hala does it <span className="font-jakarta pr-2">perfectly.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#555555] font-medium max-w-xl">
            Hala works wherever you need growth. Any platform, device, or market.
          </p>
        </div>

        {/* Bottom Section: Accordion */}
        <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-8">
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 sm:p-12 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.06)] border border-[#eeeeee]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {categories.map((category, catIndex) => (
                <div key={catIndex} className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-5 border-b border-[#e5e5e5] mb-2">
                    <h3 className="font-jakarta text-[22px] md:text-[24px] font-medium text-[#111111] tracking-tight">
                      {category.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Link 
                        href={catIndex === 0 ? '/digital-marketing' : '/website-development'}
                        className="w-8 h-8 rounded-full border border-[#d5d5d5] flex items-center justify-center bg-white transition-colors hover:border-[#007FFF] group cursor-pointer no-underline"
                        title={`Explore ${category.title}`}
                      >
                        <ArrowUpRight className="w-[14px] h-[14px] text-[#555555] group-hover:text-[#007FFF]" />
                      </Link>
                      <div className="w-8 h-8 rounded-full bg-[#007FFF] flex items-center justify-center shadow-sm">
                        <category.icon className="w-4 h-4 text-white stroke-[2.5]" />
                      </div>
                    </div>
                  </div>

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

                          <div
                            className="grid transition-all duration-300 ease-out"
                            style={{
                              gridTemplateRows: isActive ? '1fr' : '0fr',
                              opacity: isActive ? 1 : 0,
                            }}
                          >
                            <div className="overflow-hidden">
                            <div className="pt-3 pb-1 flex flex-col gap-4">
                              <p className="text-white/80 text-[13px] md:text-[14px] leading-relaxed font-medium">
                                {service.description}
                              </p>
                              <Link 
                                href={service.href || "#"} 
                                className="inline-flex items-center gap-2 text-[13px] font-bold text-[#007FFF] hover:text-white transition-colors self-start py-1 no-underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Explore Page <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                              </Link>
                            </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full bg-[#111111] rounded-[20px] p-5 md:py-5 md:px-8 flex flex-col md:flex-row items-center justify-between border-2 border-[#222222] shadow-[8px_8px_0px_0px_#000000]">
            <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-[#222222] border border-[#333333] flex flex-shrink-0 items-center justify-center">
                <svg className="w-5 h-5 text-[#007FFF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </div>
              <p className="text-white text-[14px] md:text-[15px] font-medium">
                Need bold design or reliable code or both? You're in the right place.
              </p>
            </div>
            
            <Link href="/contact" className="bg-[#007FFF] text-white font-bold text-[11px] md:text-[12px] tracking-wide px-6 py-3 rounded-full hover:scale-105 transition-transform whitespace-nowrap w-full md:w-auto shadow-md shadow-[#007FFF]/20 no-underline text-center inline-block">
              BOOK A CALL
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesComponent);
