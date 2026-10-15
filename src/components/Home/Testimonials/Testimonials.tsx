'use client';

import { useState, useRef, memo } from 'react';
import { TrendingUp, Building2, Rocket, Play, Pause, type LucideIcon } from 'lucide-react';

type Testimonial = {
  company: string;
  Icon: LucideIcon;
  iconColor: string;
  quote: string;
  name: string;
  role: string;
  services?: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    company: 'Scalify',
    Icon: TrendingUp,
    iconColor: 'text-[#007FFF]',
    quote:
      '“Hala Technology built our website from the ground up and now runs our SEO, marketing, and graphic design. They feel like an extension of our own team — fast, reliable, and always focused on growth. Our online presence has never looked or performed better.”',
    name: 'Scalify Team',
    role: 'Founder, Scalify',
    services: ['Website', 'SEO', 'Marketing', 'Graphic Design'],
  },
  {
    company: 'XYZ Corp',
    Icon: Building2,
    iconColor: 'text-[#111111]',
    quote:
      '“Working with Hala has been transformative. They don’t just create content; they create experiences that resonate deeply with our audience and bring in real, measurable results.”',
    name: 'Michael Chen',
    role: 'Marketing Director',
  },
  {
    company: 'Startup Inc',
    Icon: Rocket,
    iconColor: 'text-[#0066CC]',
    quote:
      '“The attention to detail and strategic foresight they bring to the table is unmatched. From concept to launch, every campaign was executed with clarity and precision.”',
    name: 'Sarah Jenkins',
    role: 'Founder',
  },
];

// Single landscape (16:9) client testimonial video.
const VIDEO_TESTIMONIAL = {
  src: '/videos/client-testimonial-benjamin-sarah.mp4',
  poster: '',
  client: 'Benjamin & Sarah',
  subtitle: 'Honest words from people we’ve been building with',
};

const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function ClientVideo({ item }: { item: typeof VIDEO_TESTIMONIAL }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !item.src) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-[#111111] border border-[#E5E9F0] shadow-[0_4px_24px_rgba(0,0,0,0.08)] group">
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster || undefined}
        playsInline
        // 5.5 MB file — only fetch metadata (and the first frame) until the
        // visitor actually chooses to watch.
        preload="metadata"
        // Native controls once it is running, so a ~2 minute testimonial can be
        // scrubbed, paused and volume-adjusted properly.
        controls={hasStarted}
        controlsList="nodownload"
        onPlay={() => { setIsPlaying(true); setHasStarted(true); }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setHasStarted(false); }}
        className="w-full h-full object-cover"
      />

      {/* Click-to-play overlay — hidden once playback has begun so it never
          sits on top of the native controls. */}
      {!hasStarted && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Play video testimonial from ${item.client}`}
          className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
        >
          <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white fill-white" />
            ) : (
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            )}
          </span>
        </button>
      )}

      {/* Caption sits TOP-left on purpose: this video has burned-in subtitles
          along the bottom edge, and the native controls occupy that strip once
          playback starts. Top-right is taken by the in-video Hala watermark.
          Fades out during playback so nothing competes with the footage. */}
      <div
        className={`absolute inset-x-0 top-0 p-4 sm:p-5 pb-10 bg-gradient-to-b from-black/80 via-black/35 to-transparent text-white pointer-events-none transition-opacity duration-300 ${
          hasStarted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <p className="text-[15px] sm:text-[17px] font-semibold leading-tight drop-shadow-sm">
          {item.client}
        </p>
        <p className="text-[12px] sm:text-[14px] text-white/80 mt-1 max-w-[80%] leading-snug">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}

type TestimonialsProps = {
  /**
   * Render the "Hear it from our clients" video block.
   *
   * Defaults to FALSE on purpose. This section is reused on 13 pages
   * (services, branding, about, …) and the client video belongs only on the
   * home landing page. Opting in explicitly means adding Testimonials to a new
   * page can never surface the video by accident.
   */
  showVideo?: boolean;
};

function Testimonials({ showVideo = false }: TestimonialsProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 font-jakarta text-[#111111]">
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight">Loved by Brands Like Yours</h2>
        <p className="mt-3 text-[#555555] text-sm md:text-base">
          See how businesses are growing with Hala Technology.
        </p>
      </div>

      {/* Review Cards (3-column layout matching reference) */}
      <div className="max-w-[1100px] mx-auto grid md:grid-cols-3 bg-white border border-[#E5E9F0] rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] divide-y md:divide-y-0 md:divide-x divide-[#EEF1F5]">
        {TESTIMONIALS.map(({ company, Icon, iconColor, quote, name, role, services }) => (
          <article key={company} className="p-7 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-5">
              <Icon className={`w-4 h-4 ${iconColor}`} strokeWidth={2.5} />
              <h3 className="font-bold text-[15px]">{company}</h3>
            </div>

            {services && (
              <ul className="flex flex-wrap gap-1.5 mb-4">
                {services.map((s) => (
                  <li key={s} className="text-[11px] font-semibold text-[#0066CC] bg-[#EBF5FF] px-2.5 py-1 rounded-full">
                    {s}
                  </li>
                ))}
              </ul>
            )}

            <p className="text-[14px] leading-relaxed text-[#444444] mb-8">{quote}</p>

            <div className="mt-auto flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#F3F5F8] border border-[#E5E9F0] flex items-center justify-center text-[13px] font-semibold text-[#555555]">
                {initials(name)}
              </span>
              <div>
                <p className="text-[14px] font-semibold">{name}</p>
                <p className="text-[12px] text-[#888888]">{role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Client Video Testimonial — single landscape (16:9).
          Home landing page only; see the showVideo prop. */}
      {showVideo && (
        <div className="max-w-[900px] mx-auto mt-16 md:mt-20">
          <h3 className="text-center font-bold text-xl md:text-2xl tracking-tight mb-8">
            Hear it from our clients
          </h3>

          <ClientVideo item={VIDEO_TESTIMONIAL} />
        </div>
      )}
    </section>
  );
}

export default memo(Testimonials);
