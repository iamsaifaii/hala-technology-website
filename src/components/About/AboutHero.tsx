'use client';

import { motion } from 'framer-motion';
import { 
  Code2, 
  Target, 
  TrendingUp, 
  Palette 
} from 'lucide-react';

const companyLogos = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  src: `/Companies Logos/${i + 1}.png`,
  alt: `Company Logo ${i + 1}`,
}));

const services = [
  {
    icon: Code2,
    title: 'Web Engineering',
    desc: 'High-speed Next.js & React web applications tailored for growth.',
  },
  {
    icon: TrendingUp,
    title: 'Organic SEO',
    desc: 'Data-driven SEO strategies to dominate top Google search ranks.',
  },
  {
    icon: Target,
    title: 'Performance Ads',
    desc: 'Targeted ROI marketing campaigns with real-time conversion tracking.',
  },
  {
    icon: Palette,
    title: 'Brand & Media',
    desc: 'Bespoke brand design systems, UI/UX, and high-converting creative media.',
  },
];

const stats = [
  { value: '150+', label: 'Projects Delivered', desc: 'Crafted for scaling brands' },
  { value: '99.4%', label: 'Client Retention', desc: 'Long-term strategic partners' },
  { value: '15+', label: 'Global Markets', desc: 'Serving clients worldwide' },
  { value: '10x', label: 'Average ROI Impact', desc: 'Driven by data & innovation' },
];

export default function AboutHero() {
  return (
    <section className="bg-white text-black w-full pt-[100px] sm:pt-[130px] md:pt-[150px] pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-10 lg:px-14 relative overflow-hidden select-none border-b border-gray-100">
      <div className="max-w-[1280px] w-full mx-auto flex flex-col items-center relative z-10">
        
        {/* Simple & Responsive Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black text-white text-xs sm:text-sm font-jakarta font-semibold tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ABOUT HALA TECHNOLOGY</span>
        </motion.div>

        {/* Clean Responsive Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mb-6 sm:mb-8"
        >
          <h1 className="font-jakarta font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-black mb-4 sm:mb-6">
            Engineering Bold Digital Solutions That Drive Growth
          </h1>
          <p className="font-jakarta text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto px-2">
            Hala Technology helps ambitious companies scale through high-performance web development, SEO, performance marketing, and brand identity.
          </p>
        </motion.div>

        {/* Responsive 4-Pillar Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 w-full max-w-5xl mb-12 sm:mb-16"
        >
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-start p-5 sm:p-6 rounded-2xl bg-gray-50 border border-gray-200/90 hover:bg-white hover:border-black hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 text-left group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-jakarta font-bold text-base sm:text-lg text-black mb-1.5">
                  {item.title}
                </h3>
                <p className="font-jakarta text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Responsive Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 w-full max-w-5xl mb-14 sm:mb-20"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-white border border-gray-200 text-center hover:border-black transition-all duration-300"
            >
              <span className="font-jakarta text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-black tracking-tight mb-1">
                {stat.value}
              </span>
              <span className="font-jakarta text-xs sm:text-sm font-bold text-black mb-0.5">
                {stat.label}
              </span>
              <span className="font-jakarta text-[11px] sm:text-xs text-gray-500">
                {stat.desc}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Responsive Companies We Work With Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="w-full flex flex-col items-center"
        >
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-8 sm:w-12 h-[1px] bg-black/20" />
            <p className="font-jakarta text-xs sm:text-sm uppercase tracking-widest text-black font-bold text-center">
              Companies We Work With
            </p>
            <span className="w-8 sm:w-12 h-[1px] bg-black/20" />
          </div>

          <div className="w-full relative flex items-center overflow-hidden py-3 rounded-2xl bg-gray-50/80 border border-gray-200/80">
            {/* Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-[12%] sm:w-[15%] bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[12%] sm:w-[15%] bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none" />

            {/* Marquee Track 1 */}
            <div className="flex items-center gap-8 sm:gap-14 md:gap-18 px-4 sm:px-6 animate-marquee whitespace-nowrap min-w-max shrink-0">
              {companyLogos.map((logo) => (
                <div key={`first-${logo.id}`} className="flex items-center justify-center px-2 sm:px-4 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Marquee Track 2 */}
            <div className="flex items-center gap-8 sm:gap-14 md:gap-18 px-4 sm:px-6 animate-marquee whitespace-nowrap min-w-max shrink-0" aria-hidden="true">
              {companyLogos.map((logo) => (
                <div key={`second-${logo.id}`} className="flex items-center justify-center px-2 sm:px-4 shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-8 sm:max-h-10 md:max-h-12 w-auto object-contain opacity-80 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
