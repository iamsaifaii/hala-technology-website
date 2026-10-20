'use client';

import { ArrowRight, MapPin, Clock } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-24 bg-white border-b border-[#e5e5e5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        
        {/* Editorial Top Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowRight className="w-3.5 h-3.5 text-[#007FFF]" />
          <span className="font-jakarta text-xs md:text-sm text-[#666666] font-medium tracking-wide">
            Hala Technology • Contact &amp; Consultation
          </span>
        </div>

        {/* Main Heading with EB Garamond Typography matching Case Study style */}
        <h1 className="font-jakarta text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-semibold text-[#111111] leading-[1.05] tracking-tight mb-8 max-w-[1050px]">
          Let’s build something <span className="font-jakarta">extraordinary</span> together.
        </h1>

        {/* Subtitle / Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full pt-8 border-t border-[#f0f0f0]">
          <div className="md:col-span-7 lg:col-span-8">
            <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-[#555555] leading-relaxed">
              Whether you’re looking to scale your digital presence, build a bespoke web platform, or accelerate growth with performance marketing—our team in Dubai is ready to connect.
            </p>
          </div>
          <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-between items-start md:items-end gap-3">
            <div className="flex flex-col items-start md:items-end">
              <span className="font-jakarta text-xs uppercase tracking-wider text-[#888888] font-semibold mb-1">
                Global Headquarters
              </span>
              <span className="font-jakarta text-sm font-medium text-[#111111] flex items-center gap-1.5 text-right">
                <MapPin className="w-4 h-4 text-[#007FFF] shrink-0" /> 1803, Latifa Tower, Sheikh Zayed Road, Dubai
              </span>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="font-jakarta text-xs uppercase tracking-wider text-[#888888] font-semibold mb-1">
                Average Response Time
              </span>
              <span className="font-jakarta text-sm font-medium text-[#111111] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#007FFF] shrink-0" /> Under 1 Hour (Business Hours)
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
