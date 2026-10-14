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

// Fixed 4 video reel slots (9:16 aspect ratio)
const VIDEO_TESTIMONIALS = [
  {
    id: 1,
    client: 'Scalify',
    subtitle: 'Website & Growth Story',
    src: '',
    poster: '',
  },
  {
    id: 2,
    client: 'Fintech Scaleup',
    subtitle: 'Brand & Marketing Impact',
    src: '',
    poster: '',
  },
  {
    id: 3,
    client: 'E-commerce Brand',
    subtitle: 'Full-Funnel CRO & Ads',
    src: '',
    poster: '',
  },
  {
    id: 4,
    client: 'Global Logistics',
    subtitle: 'SEO & Organic Growth',
    src: '',
    poster: '',
  },
];

const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function VideoReelCard({ item }: { item: (typeof VIDEO_TESTIMONIALS)[0] }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current || !item.src) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <div
      onClick={togglePlay}
      className="group relative aspect-[9/16] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#111111] border border-[#E5E9F0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] select-none cursor-pointer"
    >
      {item.src ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          playsInline
          loop
          preload="none"
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f242c] via-[#111111] to-[#0a0a0a]" />
      )}

      {/* Play/Pause Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/30' : 'opacity-100 bg-black/20'
        }`}
      >
        <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white fill-white" />
          ) : (
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          )}
        </span>
      </div>

      {/* Bottom Info */}
      <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white">
        <p className="text-[13px] sm:text-[14px] font-semibold leading-tight">{item.client}</p>
        <p className="text-[11px] sm:text-[12px] text-white/70 mt-0.5">{item.subtitle}</p>
      </div>
    </div>
  );
}

function Testimonials() {
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

      {/* Video Testimonials — Fixed 4 Grid (No Marquee) */}
      <div className="max-w-[1100px] mx-auto mt-16 md:mt-20">
        <h3 className="text-center font-bold text-xl md:text-2xl tracking-tight mb-8">
          Hear it from our clients
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VIDEO_TESTIMONIALS.map((item) => (
            <VideoReelCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Testimonials);
