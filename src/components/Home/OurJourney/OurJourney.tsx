'use client';

const logosRow1 = [
  { id: 1,  src: '/Companies Logos/1.png',  alt: 'Company Logo 1' },
  { id: 2,  src: '/Companies Logos/2.png',  alt: 'Company Logo 2' },
  { id: 3,  src: '/Companies Logos/3.png',  alt: 'Company Logo 3' },
  { id: 4,  src: '/Companies Logos/4.png',  alt: 'Company Logo 4' },
  { id: 5,  src: '/Companies Logos/5.png',  alt: 'Company Logo 5' },
  { id: 6,  src: '/Companies Logos/6.png',  alt: 'Company Logo 6' },
  { id: 7,  src: '/Companies Logos/7.png',  alt: 'Company Logo 7' },
  { id: 8,  src: '/Companies Logos/8.png',  alt: 'Company Logo 8' },
  { id: 9,  src: '/Companies Logos/9.png',  alt: 'Company Logo 9' },
  { id: 10, src: '/Companies Logos/10.png', alt: 'Company Logo 10' },
];

const logosRow2 = [
  { id: 11, src: '/Companies Logos/11.png', alt: 'Company Logo 11' },
  { id: 12, src: '/Companies Logos/12.png', alt: 'Company Logo 12' },
  { id: 13, src: '/Companies Logos/13.png', alt: 'Company Logo 13' },
  { id: 14, src: '/Companies Logos/14.png', alt: 'Company Logo 14' },
  { id: 15, src: '/Companies Logos/15.png', alt: 'Company Logo 15' },
  { id: 16, src: '/Companies Logos/16.png', alt: 'Company Logo 16' },
  { id: 17, src: '/Companies Logos/17.png', alt: 'Company Logo 17' },
  { id: 18, src: '/Companies Logos/18.png', alt: 'Company Logo 18' },
  { id: 19, src: '/Companies Logos/19.png', alt: 'Company Logo 19' },
  { id: 20, src: '/Companies Logos/20.png', alt: 'Company Logo 20' },
];

// Repeating 2× within each track ensures the track length comfortably exceeds
// ultra-wide / 4K displays. Paired with an identical sibling track in flex layout,
// translating exactly 100% guarantees an infinite, mathematical seam-free loop.
const row1Track = [...logosRow1, ...logosRow1];
const row2Track = [...logosRow2, ...logosRow2];

export default function OurJourney() {
  return (
    <section className="bg-white text-[#111111] w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-24 pb-10 md:pb-14 relative overflow-hidden">
      {/* ── High-performance, GPU-accelerated marquee keyframes ── */}
      <style>{`
        @keyframes oj-scroll-right {
          0%   { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        @keyframes oj-scroll-left {
          0%   { transform: translate3d(0%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .oj-track-right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: oj-scroll-right 45s linear infinite;
        }
        .oj-track-left {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          animation: oj-scroll-left 45s linear infinite;
        }
        @media (max-width: 640px) {
          .oj-track-right,
          .oj-track-left {
            animation-duration: 32s;
          }
        }
      `}</style>

      <div className="max-w-[1400px] w-full mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <h2 className="font-jakarta font-bold text-[28px] sm:text-3xl md:text-[36px] leading-[1.3] tracking-tight text-[#171a22]">
            Our Journey of Innovation &amp; Impact
          </h2>
        </div>

        {/* 2-Row Marquee Container with subtle edge fades */}
        <div className="w-full relative overflow-hidden flex flex-col py-2 select-none">
          {/* Edge fade gradients for seamless disappearance/reappearance */}
          <div className="absolute inset-y-0 left-0 w-10 sm:w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Row 1 — moves RIGHT */}
          <div className="mb-6 md:mb-10 w-full overflow-hidden flex relative group">
            <div className="oj-track-right group-hover:[animation-play-state:paused]">
              {row1Track.map((logo, index) => (
                <div
                  key={`r1-a-${index}`}
                  className="flex items-center justify-center px-4 sm:px-8 md:px-12 shrink-0 h-12 sm:h-16 md:h-20"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    className="h-7 sm:h-10 md:h-14 w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
            <div className="oj-track-right group-hover:[animation-play-state:paused]" aria-hidden="true">
              {row1Track.map((logo, index) => (
                <div
                  key={`r1-b-${index}`}
                  className="flex items-center justify-center px-4 sm:px-8 md:px-12 shrink-0 h-12 sm:h-16 md:h-20"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    className="h-7 sm:h-10 md:h-14 w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — moves LEFT */}
          <div className="w-full overflow-hidden flex relative group">
            <div className="oj-track-left group-hover:[animation-play-state:paused]">
              {row2Track.map((logo, index) => (
                <div
                  key={`r2-a-${index}`}
                  className="flex items-center justify-center px-4 sm:px-8 md:px-12 shrink-0 h-12 sm:h-16 md:h-20"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    className="h-7 sm:h-10 md:h-14 w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
            <div className="oj-track-left group-hover:[animation-play-state:paused]" aria-hidden="true">
              {row2Track.map((logo, index) => (
                <div
                  key={`r2-b-${index}`}
                  className="flex items-center justify-center px-4 sm:px-8 md:px-12 shrink-0 h-12 sm:h-16 md:h-20"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="eager"
                    decoding="async"
                    className="h-7 sm:h-10 md:h-14 w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[180px] object-contain pointer-events-none"
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
