import Image from 'next/image';
import Link from 'next/link';

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white px-4 md:px-8 lg:px-16 py-12 md:py-20">
      <div 
        className="w-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl mx-auto" 
        style={{ height: 'clamp(480px, 65vw, 780px)', maxWidth: '1400px' }}
      >
      {/* Full-width background image */}
      <Image
        src="/AIimage.png"
        alt="Hala Technology — AI Solutions"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* On mobile: full dark overlay so text on left is readable over the face */}
      {/* On desktop: gradient fades right, image stays visible on right */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            /* Mobile: strong dark left + cover center */
            'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.30) 100%)',
          ].join(''),
        }}
      />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center">
        {/* Constrain content to left half — max-w ensures no overflow */}
        <div
          className="px-6 sm:px-10 md:px-20 lg:px-28 w-full"
          style={{ maxWidth: 'min(560px, 90vw)' }}
        >
          {/* Eyebrow */}
          <span className="font-jakarta inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase text-white/60 mb-4 sm:mb-5">
            Why Choose Us
          </span>

          {/* Headline
              - Mobile: two natural lines, smaller font, wraps cleanly
              - Desktop: "the Best AI Solutions" stays on one line via md:whitespace-nowrap
          */}
          <h2 className="font-jakarta font-bold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6">
            <span
              className="block"
              style={{ fontSize: 'clamp(26px, 5vw, 62px)' }}
            >
              We Provide
            </span>
            <span
              className="block md:whitespace-nowrap"
              style={{ fontSize: 'clamp(26px, 5vw, 62px)' }}
            >
              the Best AI Solutions
            </span>
          </h2>

          {/* Sub-copy — constrained width so it never overflows */}
          <p
            className="font-jakarta text-white/70 leading-relaxed mb-8 sm:mb-10"
            style={{ fontSize: 'clamp(13px, 1.4vw, 17px)', maxWidth: '100%' }}
          >
            At Hala Technology, we combine strategy, creativity, and data-driven
            execution to help businesses grow with confidence — delivering real
            results and reliable support.
          </p>

          {/* CTA button */}
          <Link
            href="/services"
            className="font-jakarta inline-flex items-center gap-2 font-semibold text-sm md:text-base rounded-full bg-white text-[#111] hover:bg-white/20 hover:text-white border border-transparent hover:border-white/40 transition-all duration-200"
            style={{ padding: '12px 26px' }}
          >
            See more
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      </div>
    </section>
  );
}
