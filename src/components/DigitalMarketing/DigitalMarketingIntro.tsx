'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function DigitalMarketingIntro() {
  return (
    <div id="intro" className="w-full">
      {/* Dark Intro Section */}
      <section className="relative bg-[#111111] z-20 pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 flex flex-col items-center border-b border-[#222222] overflow-hidden">
        <div className="max-w-[900px] text-center relative z-20">
          
          <span className="font-jakarta text-xs md:text-sm font-semibold text-[#007FFF] uppercase tracking-widest block mb-4">
            The Digital Shift
          </span>

          <h2 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-8">
            Being Online Isn’t Enough Anymore. <span className="font-jakarta">To Grow, You Must Stand Out.</span>
          </h2>

          <p className="font-jakarta text-base sm:text-lg md:text-xl leading-[1.7] mb-8 text-[#E8E6E1]">
            Hala Technology is a results-driven digital marketing company in Dubai specializing in SEO, social media marketing, PPC, and web design. We help businesses boost online visibility, attract quality leads, and increase sales through data-driven strategies.
          </p>

          <p className="font-jakarta text-base sm:text-lg md:text-xl leading-[1.7] text-[#CCCCCC]">
            With expert marketers and proven results, Hala Technology delivers customized digital solutions to help your brand grow and succeed in the UAE market.
          </p>

        </div>
      </section>

      {/* White 2-Column Section with Rounded Top Corners */}
      <section className="relative bg-white z-30 rounded-t-[40px] md:rounded-t-[60px] -mt-8 md:-mt-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#e5e5e5] overflow-hidden">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Left */}
          <div className="flex flex-col items-start text-left">
            <span className="font-jakarta text-xs font-bold text-[#007FFF] uppercase tracking-widest mb-3">
              Core Overview
            </span>

            <h2 className="font-jakarta text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-6">
              What is Digital Marketing and <span className="font-jakarta">Why It Matters</span>
            </h2>

            <p className="font-jakarta text-base md:text-lg text-[#555555] leading-relaxed mb-8">
              Digital marketing helps your business connect with people online. It makes your brand more visible, builds trust with customers, and creates new opportunities for growth. At Hala Technology, we combine strategy, creativity and analytics to design campaigns that deliver real results. Whether your goal is more traffic, higher sales or stronger brand awareness, our full-service solutions create measurable growth for your business.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 bg-[#007FFF] hover:bg-[#0066CC] transition-colors duration-300 text-white font-jakarta font-semibold text-sm md:text-base px-8 py-3.5 rounded-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right Image Container Placeholder */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#e5e5e5] bg-[#f9f9f9]">
            <Image
              src="/seo.jpg"
              alt="What is Digital Marketing and Why It Matters"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
