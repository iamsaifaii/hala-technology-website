'use client';

import Link from 'next/link';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function TrustedSection() {
  return (
    <section className="relative w-full bg-white py-20 lg:py-32 px-6 overflow-hidden rounded-t-[40px] md:rounded-t-[60px] z-20 -mt-8 md:-mt-10">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 text-left flex flex-col items-start max-w-2xl lg:max-w-none">
          <h2 className="font-jakarta text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] leading-[1.2] mb-6">
            Web Design That Works as Hard as Your Business
          </h2>
          
          <p className="font-jakarta text-base sm:text-lg text-[#555555] leading-relaxed mb-6">
            Your website should stand out just like your business does. We build responsive pages that perform seamlessly across every device helping you stay ahead of the competition. Every website we deliver runs smoothly offers a clean user experience and is optimized to rank higher in search results.
          </p>
          
          <p className="font-jakarta text-base sm:text-lg text-[#555555] leading-relaxed mb-10">
            From the first discovery call to final launch our team works closely with you to understand your brand your audience and your goals ensuring every design decision is intentional informed and built to drive results.
          </p>

          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#007FFF] hover:bg-[#0066CC] active:scale-[0.98] transition-all duration-200 text-white font-jakarta font-semibold text-base px-8 py-4 rounded-xl w-fit">
            Get Started
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Image / Placeholder Side */}
        <div className="flex-1 w-full flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[600px] aspect-[4/3] rounded-3xl overflow-hidden border border-gray-100 bg-[#F4F5F7] flex items-center justify-center">
            <Image 
              src="/website mockup images/feature-image.png" 
              alt="Trusted Web Design" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover" 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
