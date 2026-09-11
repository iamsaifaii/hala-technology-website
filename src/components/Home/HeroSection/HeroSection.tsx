'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Star, Mail, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA'), {
  ssr: false,
});

// Client logos for marquee
const clientLogos = [
  '/Companies Logos/1.png',
  '/Companies Logos/2.png',
  '/Companies Logos/3.png',
  '/Companies Logos/4.png',
  '/Companies Logos/5.png',
  '/Companies Logos/6.png',
  '/Companies Logos/7.png',
  '/Companies Logos/8.png',
  '/Companies Logos/9.png',
  '/Companies Logos/10.png',
  '/Companies Logos/11.png',
  '/Companies Logos/12.png',
  '/Companies Logos/13.png',
  '/Companies Logos/14.png',
  '/Companies Logos/15.png',
  '/Companies Logos/16.png',
  '/Companies Logos/17.png',
  '/Companies Logos/18.png',
  '/Companies Logos/19.png',
  '/Companies Logos/20.png',
];

function HeroSectionComponent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const openModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeModal = useCallback(() => setIsBookingModalOpen(false), []);

  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      openModal();
    },
    [openModal]
  );

  return (
    <>
      {/* ─────────────────── MODERN HERO SECTION ─────────────────── */}
      <section className="relative z-0 flex flex-col items-center justify-between text-center w-full min-h-[100svh] overflow-hidden bg-[#07090E] pt-24 pb-10">

        {/* ── Background Elements & Atmospheric Glow ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Mobile background curve */}
          <Image
            src="/hero-images/herohomepagephoneview.png"
            alt="Hero Background Mobile"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-40 sm:hidden"
            priority
          />
          {/* Desktop background curve */}
          <Image
            src="/hero-images/herosectionhomepage.png"
            alt="Hero Background Desktop"
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-45 hidden sm:block"
            priority
          />

          {/* Deep ambient radial glow orbs */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[300px] sm:h-[420px] bg-[#007FFF]/20 blur-[120px] sm:blur-[150px] rounded-full" />
          <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-[#38BDF8]/15 blur-[100px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#4F46E5]/15 blur-[120px] rounded-full" />

          {/* Subtle Cyber Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Vignettes for rich cinematic contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/80 via-transparent to-[#111111]" />
        </div>

        {/* ── Main Center Content ── */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-5 sm:px-8 my-auto">

          {/* Glowing Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md mb-6 shadow-sm hover:border-[#007FFF]/50 hover:bg-white/[0.08] transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007FFF]" />
            </span>
            <span className="text-[11px] sm:text-[12px] font-semibold tracking-wide text-white/85 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              Dubai's Leading AI & Digital Growth Agency
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-jakarta font-extrabold text-white leading-[1.08] tracking-tight mb-5 w-full
            text-[36px] xs:text-[44px] sm:text-[56px] md:text-[66px] lg:text-[74px]">
            <span>Grow your brand.</span>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-[#60A5FA] via-[#00D2FF] to-[#38BDF8] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,127,255,0.35)]">
              Dominate the market.
            </span>
          </h1>

          {/* Subtitle Value Proposition */}
          <p className="max-w-2xl text-[14px] xs:text-[15px] sm:text-[18px] text-white/70 font-normal leading-relaxed mb-8 sm:mb-10 px-2">
            We engineer high-performance web platforms, intelligent AI agents, and ROI-driven marketing campaigns that turn ambitious businesses into market leaders.
          </p>

          {/* ── Unified Glass CTA Capsule ── */}
          <form
            onSubmit={handleEmailSubmit}
            className="w-full max-w-[500px] mb-5 relative group"
          >
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),_0_0_25px_rgba(0,127,255,0.18)] focus-within:border-[#007FFF] focus-within:ring-2 focus-within:ring-[#007FFF]/40 focus-within:shadow-[0_0_35px_rgba(0,127,255,0.4)] transition-all duration-300 gap-2">
              <div className="flex items-center px-4 py-2 sm:py-0 flex-1">
                <Mail className="w-4 h-4 text-[#38BDF8] mr-2.5 flex-shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="w-full bg-transparent text-white placeholder-white/45 text-[14px] sm:text-[15px] font-medium outline-none"
                />
              </div>

              <button
                type="submit"
                className="relative group/btn flex items-center justify-center gap-2 bg-gradient-to-r from-[#007FFF] via-[#0066FF] to-[#0052CC] hover:from-[#006fe6] hover:to-[#0048aa] active:scale-[0.98] text-white font-bold text-[14px] sm:text-[15px] px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-full transition-all duration-200 shadow-lg shadow-[#007FFF]/35 cursor-pointer whitespace-nowrap overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Request a Call
                  <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-1 transition-transform duration-200" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </button>
            </div>
          </form>

          {/* Micro-Trust & Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-white/60 text-[11px] sm:text-[13px] font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#38BDF8]" />
              Free 30-Min Strategy Call
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-400 fill-amber-400" />
              4.9/5 Rating (120+ UAE Brands)
            </span>
          </div>

        </div>

        {/* ── Infinite Smooth Client Logo Marquee ── */}
        <div className="relative z-20 w-full max-w-5xl px-4 mt-6">
          <p className="font-jakarta text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/35 mb-5 text-center">
            Trusted by leading brands across the UAE & Middle East
          </p>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-8 sm:gap-12 w-max hover:[animation-play-state:paused]">
              {/* First Track */}
              <div className="flex items-center gap-8 sm:gap-12 shrink-0 animate-[marquee_32s_linear_infinite]">
                {clientLogos.map((src, i) => (
                  <div key={`logo-a-${i}`} className="flex items-center justify-center h-8 sm:h-9 w-24 sm:w-28 shrink-0">
                    <img
                      src={src}
                      alt={`Partner Logo ${i + 1}`}
                      className="max-h-7 sm:max-h-8 w-auto object-contain filter brightness-0 invert opacity-45 hover:opacity-90 hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate Track for Seamless Loop */}
              <div className="flex items-center gap-8 sm:gap-12 shrink-0 animate-[marquee_32s_linear_infinite]" aria-hidden="true">
                {clientLogos.map((src, i) => (
                  <div key={`logo-b-${i}`} className="flex items-center justify-center h-8 sm:h-9 w-24 sm:w-28 shrink-0">
                    <img
                      src={src}
                      alt={`Partner Logo ${i + 1}`}
                      className="max-h-7 sm:max-h-8 w-auto object-contain filter brightness-0 invert opacity-45 hover:opacity-90 hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Booking Modal (Connected to ContactCTA) ── */}
      {isBookingModalOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="relative w-full max-w-[480px] max-h-[92vh] overflow-y-auto custom-scrollbar my-auto">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3.5 right-3.5 z-50 text-white/70 hover:text-white bg-black/80 hover:bg-black/95 p-2 rounded-full border border-white/20 transition-all cursor-pointer backdrop-blur-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <ContactCTA formOnly={true} />
          </div>
        </div>
      )}
    </>
  );
}

export default memo(HeroSectionComponent);
