'use client';

import { LayoutDashboard, Lock, Zap, Star, Layers } from 'lucide-react';

const growthPoints = [
  {
    id: 1,
    title: 'Strategic Architecture',
    description: 'Custom-tailored layout built around your customer journey to maximize conversions and user engagement.',
    icon: LayoutDashboard,
    gradient: 'from-[#007FFF] via-[#0052D4] to-[#4364F7]'
  },
  {
    id: 2,
    title: 'Ironclad Security',
    description: 'SSL encryption, GDPR compliance, and enterprise protection keeping your business and customer data safe.',
    icon: Lock,
    gradient: 'from-[#111111] via-[#1E293B] to-[#007FFF]'
  },
  {
    id: 3,
    title: 'Lightning Fast Speed',
    description: 'Optimized code and smart asset delivery loading in milliseconds, lowering bounce rates and boosting SEO.',
    icon: Zap,
    gradient: 'from-[#007FFF] via-[#00C6FF] to-[#0072FF]'
  },
  {
    id: 4,
    title: 'Top-Notch Quality',
    description: 'State-of-the-art visual design with smooth micro-interactions that leave a lasting impression on visitors.',
    icon: Star,
    gradient: 'from-[#2563EB] via-[#3B82F6] to-[#60A5FA]'
  },
  {
    id: 5,
    title: 'Flexible & Scalable',
    description: 'Future-proof CMS and modular architecture, allowing your site to seamlessly expand alongside your business.',
    icon: Layers,
    gradient: 'from-[#0F172A] via-[#1E1B4B] to-[#007FFF]'
  }
];

export default function WebDesignGrowth() {
  return (
    <section className="w-full bg-white text-[#111111] py-20 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        
        {/* Top Eyebrow Badge */}
        <span className="text-xs font-bold tracking-[0.2em] text-[#007FFF] uppercase mb-4">
          GROWTH BENEFITS
        </span>

        <h2 className="font-jakarta font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#111111] text-center tracking-tight leading-[1.12] mb-6 max-w-4xl">
          Web Design in UAE{' '}
          <span className="text-[#111111] inline-block">
            Built to Fuel Growth
          </span>
        </h2>

        {/* Subtitle / Paragraph */}
        <p className="text-center font-jakarta text-base sm:text-lg text-[#666666] font-medium max-w-2xl leading-relaxed mb-14 sm:mb-16">
          Hala Technology replaces slow outdated websites with fast custom built platforms designed to scale with your business.
        </p>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-6 w-full">
          {growthPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.id} className="flex flex-col items-start text-left group">
                
                {/* Visual Gradient Box */}
                <div
                  className={`w-full aspect-square rounded-[24px] sm:rounded-[28px] bg-gradient-to-br ${point.gradient} p-6 flex items-center justify-center relative overflow-hidden shadow-sm mb-5 transition-transform duration-500 group-hover:-translate-y-1.5`}
                >
                  {/* Subtle Background Glow inside the box */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Frosted Glass Icon Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-inner transition-transform duration-500 group-hover:scale-110">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-jakarta font-bold text-lg sm:text-xl text-[#111111] tracking-tight mb-2">
                  {point.title}
                </h3>

                {/* Card Description */}
                <p className="text-[#666666] text-xs sm:text-sm font-medium leading-relaxed">
                  {point.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
