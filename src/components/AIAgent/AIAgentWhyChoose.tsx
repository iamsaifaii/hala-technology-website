'use client';

import { Target, Lightbulb, Zap } from 'lucide-react';

const reasons = [
  { title: 'Real Results', icon: Target },
  { title: 'Innovation', icon: Lightbulb },
  { title: 'Smart Execution', icon: Zap },
];

export default function AIAgentWhyChoose() {
  return (
    <section className="font-jakarta bg-white w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-6 md:pt-8 pb-10 md:pb-16 flex justify-center">
      <div className="max-w-[1200px] w-full bg-white rounded-[32px] border border-[#E2E8F0] p-8 md:p-14 lg:p-16 relative shadow-lg overflow-hidden">
        
        {/* Content Container */}
        <div className="flex flex-col items-center text-center relative z-10">
          
          {/* Title */}
          <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-[#111111] mb-6 md:mb-8">
            Why Choose Hala Technology?
          </h2>

          {/* Description */}
          <p className="text-[#555555] text-base md:text-lg lg:text-xl font-medium max-w-4xl leading-[1.7] mb-10 md:mb-12">
            At Hala Technology, we don’t just use AI Agents, we use it to solve real marketing challenges. Our AI Agents help you reach the right audience, increase traffic, and turn leads into loyal customers. We focus on delivering real results through trust, innovation, and smart execution. Whether you’re a startup or an established business, we make sure your marketing works smarter and delivers real growth.
          </p>

          {/* Buttons / Pills */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-2.5 md:gap-3 bg-white border border-[#E2E8F0] rounded-full px-5 md:px-6 py-2.5 md:py-3 shadow-sm hover:shadow-md hover:border-[#007FFF] transition-all cursor-default group"
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#007FFF] stroke-[2.5]" />
                  <span className="font-semibold text-[#111111] text-sm md:text-base whitespace-nowrap">
                    {reason.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
