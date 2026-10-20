'use client';

import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { X, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import Marquee from '@/components/Marquee/Marquee';
import { CLIENT_LOGOS } from '@/lib/client-logos';

const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA'), {
  ssr: false,
});

function HeroSectionComponent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const openModal  = useCallback(() => setIsBookingModalOpen(true),  []);
  const closeModal = useCallback(() => setIsBookingModalOpen(false), []);

  const handleEmailSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    openModal();
  }, [openModal]);

  return (
    <>
      {/* ─────────────────── HERO SECTION ─────────────────── */}
      <section className="relative z-0 flex flex-col items-center justify-start text-center w-full min-h-[100svh] overflow-hidden gpu-layer">

        {/* ── Background image ── */}
        <div className="absolute inset-0 z-0">
          {/* Mobile background */}
          <Image
            src="/hero-images/herohomepagephoneview.png"
            alt="Hero Background Mobile"
            fill
            sizes="100vw"
            className="object-cover object-center sm:hidden"
            priority
          />
          {/* Desktop background */}
          <Image
            src="/hero-images/herosectionhomepage.png"
            alt="Hero Background"
            fill
            sizes="100vw"
            className="object-cover object-center hidden sm:block"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full min-h-[100svh] px-5 sm:px-8 pt-24 pb-10">

          {/* Headline */}
          <h1 className="font-jakarta font-bold text-white leading-[1.08] tracking-tight mb-5 w-full max-w-[700px]
            text-[38px] xs:text-[44px] sm:text-[54px] md:text-[64px] lg:text-[72px]">
            <span className="block sm:whitespace-nowrap">Grow your brand.</span>
            <span className="block sm:whitespace-nowrap">Dominate the market.</span>
          </h1>

          {/* Email + CTA — stacked on mobile, side-by-side on sm+ */}
          <form
            onSubmit={handleEmailSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-[460px] mt-6 mb-12 sm:mb-16 md:mb-20"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="flex-1 w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/45 text-[14px] font-medium px-4 py-3.5 rounded-xl outline-none focus:border-[#007FFF]/70 transition-colors text-center sm:text-left"
            />
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#007FFF] hover:bg-[#0066CC] active:scale-[0.97] text-white font-bold text-[14px] px-5 py-3.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-lg shadow-[#007FFF]/30"
            >
              Request a Call
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* ── Logo Marquee ── */}
          <div className="w-full max-w-[800px] mt-2 sm:mt-4">
            <p className="font-jakarta text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-6 sm:mb-7 text-center">
              Trusted by leading brands
            </p>
            <Marquee duration={40} className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              {CLIENT_LOGOS.map(({ id, src, alt }) => (
                <img
                  key={id}
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="mr-10 sm:mr-14 h-7 sm:h-8 w-auto max-w-[110px] object-contain brightness-0 invert opacity-55 hover:opacity-85 transition-opacity"
                />
              ))}
            </Marquee>
          </div>

        </div>
      </section>

      {/* ── Booking Modal ── */}
      {isBookingModalOpen && (
        <div
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200 gpu-layer"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
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
