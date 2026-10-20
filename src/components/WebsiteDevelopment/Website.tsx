'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Sparkles, ArrowRight, ArrowUpRight, X } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ContactCTA = dynamic(() => import('@/components/Home/ContactCTA/ContactCTA'), {
  ssr: false,
});

function FloatingMapCard() {
  return (
    <div className="absolute bottom-28 sm:bottom-28 right-4 sm:right-10 lg:right-12 z-20 w-[110px] sm:w-[160px] lg:w-[180px] hidden xs:block">
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
        {/* Mockup image */}
        <div className="relative h-[100px] sm:h-[135px] lg:h-[150px] overflow-hidden bg-[#111]">
          <Image
            src="/website mockup images/123.png"
            alt="Web Development Mockup"
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        {/* Arrow button */}
        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-black/90 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

function LiveTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m} GST+4`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

export default function Website() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const openModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeModal = useCallback(() => setIsBookingModalOpen(false), []);

  return (
    <div className="relative w-full overflow-hidden">
      <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden select-none">

        {/* ── Background Image ── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-images/webdevheropagee.png"
            alt="Web Development Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 flex flex-col justify-center flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-10">

          {/* Headline */}
          <h1 className="font-jakarta font-bold text-white tracking-tight leading-[1.05] mb-6 sm:mb-8
            text-[30px] xs:text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-[72px]
            max-w-[100%] sm:max-w-[600px] lg:max-w-[700px] pr-4 sm:pr-0">
            We Build Websites{' '}
            <br className="hidden sm:block" />
            <span className="text-white inline-block sm:whitespace-nowrap">
              That Convert Visitors.
            </span>
          </h1>

          {/* Description */}
          <p className="font-jakarta text-white/70 text-[15px] sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-[380px] sm:max-w-[420px] font-semibold">
            Strategy Design Speed Combined to build websites that actually perform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2 max-w-[280px] sm:max-w-none">
            <Link
              href="/work"
              className="inline-flex items-center justify-center font-jakarta font-semibold text-[14px] sm:text-[15px] text-white border border-white/50 hover:border-white hover:bg-white/10 backdrop-blur-sm px-6 py-3.5 sm:py-3 rounded-full transition-all duration-200 text-center"
            >
              See Our Works
            </Link>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center font-jakarta font-semibold text-[14px] sm:text-[15px] text-white bg-[#2563EB] hover:bg-[#1d4ed8] active:scale-[0.97] px-6 py-3.5 sm:py-3 rounded-full transition-all duration-200 shadow-lg shadow-blue-700/40 text-center"
            >
              Let's build a website
            </button>
          </div>
        </div>

        {/* ── Floating Map Card (bottom-right) ── */}
        <FloatingMapCard />

        {/* ── Bottom Info Bar ── */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 pb-16 sm:pb-20 md:pb-24 flex items-center justify-between gap-4">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 lg:gap-4 text-white/50 text-[11px] sm:text-[12px] lg:text-[13px] font-jakarta font-medium">
            <span>Web Expert</span>
            <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
            <span>UI/UX Design</span>
            <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0 hidden xs:block" />
            <span className="hidden xs:block">Web App Builder</span>
          </div>
          <div className="flex gap-4 sm:gap-5 text-white/30">
            <Link href="https://instagram.com" target="_blank" className="hover:text-white/70 transition-colors"><InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
            <Link href="https://facebook.com" target="_blank" className="hover:text-white/70 transition-colors"><FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-white/70 transition-colors"><LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
          </div>
        </div>
      </section>

      {/* ── Intro Section ── */}
      <section className="relative bg-[#111111] z-20 rounded-t-[40px] md:rounded-t-[60px] -mt-8 md:-mt-12 pt-10 pb-12 md:pt-16 md:pb-16 px-6 flex flex-col items-center">
        <div className="max-w-[900px] text-center relative z-30">
          <p className="font-jakarta text-xl md:text-2xl lg:text-3xl leading-[1.6] md:leading-[1.7] mb-10 md:mb-14 text-[#E8E6E1]">
            At Hala Technology we don&apos;t just build websites we craft powerful digital experiences that drive real business growth. As Dubai&apos;s trusted web design agency we combine modern technology with bold purposeful design to create solutions that don&apos;t just compete they lead.
          </p>
          <p className="font-jakarta text-lg md:text-xl lg:text-2xl leading-[1.6] mb-12 md:mb-16 text-[#E8E6E1]/80">
            From startups to established enterprises UAE&apos;s most ambitious brands trust us to deliver results across every industry. Your website isn&apos;t just a digital business card it&apos;s your hardest working salesperson open 24/7 building trust and closing deals while you sleep.
          </p>
          <Link href="/contact" className="inline-block bg-[#222222] hover:bg-[#333333] transition-colors duration-300 text-white font-jakarta font-semibold text-[14px] md:text-[15px] px-8 py-4 rounded-md shadow-md border border-[#333333]">
            Start Your Project
          </Link>
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
    </div>
  );
}

export { Website };
