'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { captureLead } from '@/lib/capture-lead';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';

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

export default function SMMHero() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const openModal = useCallback(() => setIsBookingModalOpen(true), []);
  const closeModal = useCallback(() => setIsBookingModalOpen(false), []);

  return (
    <>
    <section className="relative z-0 flex flex-col w-full min-h-[100svh] overflow-hidden gpu-layer pt-10">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-images/webdevheropagee.png"
          alt="Social Media Marketing Services Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-20 flex flex-col justify-center flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-28 pt-24 pb-24 sm:pb-10">

        {/* Headline */}
        <h1 className="font-jakarta font-bold text-white leading-[1.08] tracking-tight mb-5 w-full max-w-[900px] text-left
          text-[38px] xs:text-[44px] sm:text-[54px] md:text-[64px] lg:text-[72px]">
          <span className="block">Social Media Marketing</span>
          <span className="block">That Drives Growth.</span>
        </h1>

        {/* Subtitle */}
        <p className="font-jakarta text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] max-w-[720px] font-medium text-white/90 leading-relaxed text-left">
          Engage your audience, build brand loyalty, and drive measurable growth with data-driven Social Media Marketing across all major platforms.
        </p>

        {/* Email + CTA — stacked on mobile, side-by-side on sm+ */}
        <form
          onSubmit={(e) => { e.preventDefault(); captureLead(email, 'smm-hero'); openModal(); }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-[460px] mt-8 mb-10 sm:mb-12"
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
            Grow Your Social Presence
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

      </div>

      {/* Social Icons (Right side, lower corner) */}
      <div className="absolute bottom-12 sm:bottom-20 lg:bottom-24 right-5 sm:right-10 lg:right-16 z-20 flex gap-4 sm:gap-5 text-white/30">
        <Link href="https://instagram.com" target="_blank" className="hover:text-white/70 transition-colors"><InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
        <Link href="https://facebook.com" target="_blank" className="hover:text-white/70 transition-colors"><FacebookIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
        <Link href="https://linkedin.com" target="_blank" className="hover:text-white/70 transition-colors"><LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
      </div>
    </section>
      {/* Interactive Booking Modal Popup */}
      {isBookingModalOpen && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200 gpu-layer"
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
            <ContactCTA formOnly={true} initialEmail={email} />
          </div>
        </div>
      )}
    </>
  );
}
