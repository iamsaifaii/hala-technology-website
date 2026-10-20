import { ArrowRight } from 'lucide-react';

export default function CaseStudyHero() {
  return (
    <section className="relative w-full pt-[140px] pb-16 md:pt-[180px] md:pb-24 bg-white border-b border-[#e5e5e5]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        
        {/* Editorial Top Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
          <span className="font-jakarta text-xs md:text-sm text-[#666666] font-medium tracking-wide">
            Hala Technology
          </span>
        </div>

        {/* Main Heading with Classic Typography */}
        <h1 className="font-jakarta text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-semibold text-[#111111] leading-[1.05] tracking-tight mb-8 max-w-[1000px]">
          Our <span className="font-jakarta">Case Studies</span> &amp; Client Stories
        </h1>

        {/* Subtitle / Overview */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full pt-6 border-t border-[#f0f0f0]">
          <div className="md:col-span-8">
            <p className="font-jakarta text-lg sm:text-xl md:text-2xl text-[#555555] leading-relaxed">
              A curated documentation of real-world results driven by innovation, strategic execution, and smart technology solutions.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end items-start md:items-end">
            <span className="font-jakarta text-xs uppercase tracking-wider text-[#888888] font-semibold mb-1">
              Documentation Index
            </span>
            <span className="font-jakarta text-sm font-medium text-[#111111]">
              4 Verified Client Projects
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
