'use client';

import { CLIENT_LOGOS } from '@/lib/client-logos';

// Two independent marquee rows. Each row loops on its own, so the halves do not
// need to be equal length; the split is derived rather than hardcoded so it
// stays balanced as logos are added or retired.
const SPLIT = Math.ceil(CLIENT_LOGOS.length / 2);
const logosRow1 = CLIENT_LOGOS.slice(0, SPLIT);
const logosRow2 = CLIENT_LOGOS.slice(SPLIT);

const row1 = [...logosRow1, ...logosRow1, ...logosRow1, ...logosRow1];
const row2 = [...logosRow2, ...logosRow2, ...logosRow2, ...logosRow2];

export default function OurJourney() {
  return (
    <section className="bg-white text-[#111111] w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-14 relative overflow-hidden">
      {/* ── High-performance GPU compositor keyframes ── */}
      <style>{`
        @keyframes oj-scroll-right {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes oj-scroll-left {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .oj-marquee-right {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(-50%, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: oj-scroll-right 36s linear infinite;
        }
        .oj-marquee-left {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: oj-scroll-left 36s linear infinite;
        }
        @media (max-width: 640px) {
          .oj-marquee-right,
          .oj-marquee-left {
            animation-duration: 24s;
          }
        }
      `}</style>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <h2 className="font-jakarta font-bold text-[28px] sm:text-3xl md:text-[36px] leading-[1.3] tracking-tight text-[#171a22]">
            Our Journey of Innovation &amp; Impact
          </h2>
        </div>

        {/* Marquee Track Container with Edge Gradient Fades */}
        <div className="w-full relative overflow-hidden flex flex-col py-2 select-none">
          {/* Subtle edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Row 1 — Scrolls Right */}
          <div className="mb-6 md:mb-10 w-full overflow-hidden group">
            <div className="oj-marquee-right group-hover:[animation-play-state:paused]">
              {row1.map((logo, index) => (
                <div
                  key={`r1-${index}`}
                  className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 md:h-20 shrink-0 flex items-center justify-center px-3 sm:px-5"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-7 sm:max-h-9 md:max-h-12 max-w-full w-auto object-contain pointer-events-none select-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — Scrolls Left */}
          <div className="w-full overflow-hidden group">
            <div className="oj-marquee-left group-hover:[animation-play-state:paused]">
              {row2.map((logo, index) => (
                <div
                  key={`r2-${index}`}
                  className="w-28 sm:w-36 md:w-44 h-12 sm:h-16 md:h-20 shrink-0 flex items-center justify-center px-3 sm:px-5"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-7 sm:max-h-9 md:max-h-12 max-w-full w-auto object-contain pointer-events-none select-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
