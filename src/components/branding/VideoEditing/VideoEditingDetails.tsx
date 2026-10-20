'use client';

import { Scissors, Activity, PlaySquare } from 'lucide-react';

export default function VideoEditingDetails() {
  return (
    <section className="w-full bg-white text-[#111] py-16 md:py-24 px-6 sm:px-8 md:px-12 lg:px-16 relative z-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">

        {/* Left Side: Sticky Heading */}
        <div className="col-span-1 lg:col-span-5 relative">
          <div className="lg:sticky lg:top-[180px]">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[#007FFF]"></div>
              <span className="font-jakarta text-[13px] md:text-sm font-semibold uppercase text-[#007FFF]">
                Where Every Frame Counts
              </span>
            </div>

            <h2 className="font-jakarta text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-[#111]">
              A Complete Look at Video Editing & <br className="hidden lg:block" />
              <span className="text-[#888]">Why It Matters</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Descriptive Content */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-10 md:gap-14 lg:pt-4">

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#007FFF]/10 flex items-center justify-center text-[#007FFF] mt-1 shadow-[0_4px_20px_-5px_rgba(0,127,255,0.2)]">
              <Scissors className="w-6 h-6" />
            </div>
            <p className="font-jakarta text-lg sm:text-xl leading-[1.8] font-medium text-[#555]">
              At <strong className="font-semibold text-[#111]">Hala Technology</strong> we believe great video content isn't just about hitting record it's about how it's cut paced and presented. Our editing team transforms raw footage into polished scroll stopping videos while our custom thumbnail designs make sure viewers click before they scroll past.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mt-1 shadow-sm">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-jakarta text-2xl sm:text-3xl leading-[1.4] font-semibold text-[#111] tracking-tight">
                Editing is where a story truly starts to <span className="font-jakarta text-[#007FFF] font-medium pr-2">breathe</span>.
              </p>
              <p className="font-jakarta text-lg sm:text-xl text-[#555] leading-[1.8] font-medium">
                It's not just trimming clips and stitching them together it's the rhythm tone and feeling that turn footage into a story worth watching.
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-gray-200 via-gray-100 to-transparent my-1"></div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mt-1 shadow-sm">
              <PlaySquare className="w-6 h-6" />
            </div>
            <p className="font-jakarta text-lg sm:text-xl text-[#555] leading-[1.8] font-medium">
              At <strong className="font-semibold text-[#111]">Hala Technology</strong> we craft edits that hold attention connect with your audience work smoothly across every platform and stay true to your brand's identity and message.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
