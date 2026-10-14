'use client';

import { memo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Check, CheckCircle2, Briefcase, Users, BarChart3 } from 'lucide-react';

/* ─── Team & Specialist Avatars for the Workflow Grid ─── */
const CARD_1_AVATARS = [
  { name: 'Taimoor', src: '/team-pics/taimoor.jpg' },
  { name: 'Saif', src: '/team-pics/saif-ali-new.jpg' },
  { name: 'Rimza', src: '/team-pics/rimza-new.jpg' },
  { name: 'Hasnain', src: '/team-pics/husnain.jpg' },
  { name: 'Rafay', src: '/team-pics/rafay.jpg' },
  { name: 'Salman', src: '/team-pics/salman.jpg' },
  { name: 'Chaman', src: '/team-pics/chaman-shafiq.png' },
  { name: 'Masoom', src: '/team-pics/syeda-masoom-zahra.png' },
  { name: 'Sarah', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { name: 'David', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  { name: 'Elena', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80' },
  { name: 'Marcus', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  { name: 'Amira', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { name: 'Victoria', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80' },
  { name: 'Tariq', src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' },
  { name: 'Nadia', src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' },
  { name: 'Karim', src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80' },
  { name: 'Zaid', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80' },
];

const CARD_2_LEAD = {
  name: 'Lead Strategist',
  src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
};

const CARD_3_LEAD = {
  name: 'Operations Director',
  src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
};

/* ═══════════════════════════════════════════════════════════
   Workflow Section — Redesigned Clean & Human-Made Layout
   Matches the requested reference screenshot with website colors
═══════════════════════════════════════════════════════════ */
function MainWorkflowSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 text-[#111111] font-jakarta select-none">
      <div className="max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-bold text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] text-[#111111] tracking-tight">
            Our workflow
          </h2>
          <p className="mt-4 text-[#555555] text-base sm:text-lg md:text-[19px] font-normal leading-relaxed max-w-2xl mx-auto">
            A transparent, human-driven methodology designed to deliver exponential growth.
          </p>
        </div>

        {/* Top Timeline Bar (Desktop) */}
        <div className="relative mb-8 sm:mb-10 hidden lg:block">
          {/* Horizontal line running behind milestone badges */}
          <div className="absolute top-1/2 left-[16.6%] right-[16.6%] -translate-y-1/2 h-[2px] bg-[#D7E3EE]" />

          {/* Milestone Badges aligned directly above each card */}
          <div className="grid grid-cols-3 gap-6 lg:gap-7 relative z-10">
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-[#EBF5FF] text-[#0066CC] border border-[#CCE3FD] text-[13px] font-bold tracking-wide shadow-xs">
                Week 1
              </span>
            </div>
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-[#EBF5FF] text-[#0066CC] border border-[#CCE3FD] text-[13px] font-bold tracking-wide shadow-xs">
                Week 2
              </span>
            </div>
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center px-7 py-2 rounded-full bg-[#EBF5FF] text-[#0066CC] border border-[#CCE3FD] text-[13px] font-bold tracking-wide shadow-xs">
                Week 10
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          
          {/* ─── CARD 1: Hit the ground running ─── */}
          <div className="bg-white rounded-[26px] sm:rounded-[30px] border border-[#E5E9F0] p-6 sm:p-8 md:p-9 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300">
            <div>
              {/* Mobile Milestone Badge */}
              <div className="lg:hidden mb-5">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EBF5FF] text-[#0066CC] border border-[#CCE3FD] text-xs font-bold tracking-wide">
                  Week 1
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[22px] sm:text-[25px] md:text-[26px] text-[#111111] tracking-tight leading-snug mb-6 sm:mb-8">
                Hit the ground running
              </h3>

              {/* Bullets */}
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Audit existing marketing campaigns, SEO footprint, and digital workflows
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Meet your fixed dedicated senior growth strategist and specialized team
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Map urgent revenue pipelines, conversion dates, and growth priorities
                  </span>
                </li>
              </ul>
            </div>

            {/* Bottom Element: Divider + Avatar Grid */}
            <div className="mt-8 pt-7 border-t border-[#F0F3F7]">
              <div className="grid grid-cols-6 gap-2 sm:gap-2.5 items-center">
                {CARD_1_AVATARS.map((avatar, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/80 shadow-xs relative bg-slate-100"
                    title={avatar.name}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.name}
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── CARD 2: Implement together ─── */}
          <div className="bg-white rounded-[26px] sm:rounded-[30px] border border-[#E5E9F0] p-6 sm:p-8 md:p-9 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300">
            <div>
              {/* Mobile Milestone Badge */}
              <div className="lg:hidden mb-5">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#EBF5FF] text-[#0066CC] border border-[#CCE3FD] text-xs font-bold tracking-wide">
                  Week 2
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[22px] sm:text-[25px] md:text-[26px] text-[#111111] tracking-tight leading-snug mb-6 sm:mb-8">
                Implement together
              </h3>

              {/* Bullets */}
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Full operational deployment of custom web funnels, ad copy, and creatives
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Consolidate multi-touch attribution, GA4 tracking, and CRM automations
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#EBF5FF] text-[#007FFF] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-[#333333] text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Daily 5-day direct availability on Slack and WhatsApp for swift approvals
                  </span>
                </li>
              </ul>
            </div>

            {/* Bottom Element: Divider + Lead Avatar & 3 Circular Icon Badges */}
            <div className="mt-8 pt-7 border-t border-[#F0F3F7]">
              <div className="flex items-center gap-3">
                {/* Lead Avatar */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-xs relative shrink-0 bg-slate-100">
                  <Image
                    src={CARD_2_LEAD.src}
                    alt={CARD_2_LEAD.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>

                {/* Circular Icon 1: Strategy / Execution */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EBF5FF] text-[#007FFF] border border-[#DBEAFE] flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                  title="Strategy & Execution"
                >
                  <Briefcase className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.2]" />
                </div>

                {/* Circular Icon 2: Team Collaboration */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EBF5FF] text-[#007FFF] border border-[#DBEAFE] flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                  title="Dedicated Collaboration"
                >
                  <Users className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.2]" />
                </div>

                {/* Circular Icon 3: Performance & Analytics */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EBF5FF] text-[#007FFF] border border-[#DBEAFE] flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                  title="Growth Analytics"
                >
                  <BarChart3 className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.2]" />
                </div>
              </div>
            </div>
          </div>

          {/* ─── CARD 3: Launch with confidence (Dark Card) ─── */}
          <div className="bg-[#111111] rounded-[26px] sm:rounded-[30px] border border-[#242424] p-6 sm:p-8 md:p-9 flex flex-col justify-between text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-300">
            <div>
              {/* Mobile Milestone Badge */}
              <div className="lg:hidden mb-5">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#007FFF]/20 text-[#38BDF8] border border-[#007FFF]/40 text-xs font-bold tracking-wide">
                  Week 10
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-[22px] sm:text-[25px] md:text-[26px] text-white tracking-tight leading-snug mb-6 sm:mb-8">
                Launch with confidence
              </h3>

              {/* Bullets */}
              <ul className="space-y-4 sm:space-y-5">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-white/85 text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Seamless ongoing operations with zero founder administrative drag
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-white/85 text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Continuous A/B testing, bid refinement, and multi-channel scaling as you grow
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <span className="text-white/85 text-[14px] sm:text-[15px] font-normal leading-relaxed">
                    Always on-hand strategic sparring and executive growth advisory for leadership
                  </span>
                </li>
              </ul>
            </div>

            {/* Bottom Element: Divider + Avatar & Operations Stable Badge */}
            <div className="mt-8 pt-7 border-t border-white/10">
              <div className="flex items-center gap-3">
                {/* Operations Lead Avatar */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white/20 shadow-xs relative shrink-0 bg-slate-800">
                  <Image
                    src={CARD_3_LEAD.src}
                    alt={CARD_3_LEAD.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>

                {/* Operations Stable Pill Badge */}
                <div className="bg-white text-[#111111] px-4 py-2 sm:py-2.5 rounded-full flex items-center gap-2 font-semibold text-xs sm:text-[13.5px] shadow-xs select-none">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Operations stable</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Horizontal Image Carousel for Branding Showcase Pages
   (Preserved for branding/page.tsx & graphic-design/page.tsx)
═══════════════════════════════════════════════════════════ */
function BrandingImagesCarousel({ images }: { images: string[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const row = rowRef.current;
    if (!outer || !row) return;

    const totalScroll = images.length * 400;
    outer.style.height = `calc(100vh + ${totalScroll}px)`;

    const animate = () => {
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const maxScroll = outer.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrolled / maxScroll));
      const maxTranslate = Math.max(0, row.scrollWidth - window.innerWidth + 100);
      row.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    animate();
    window.addEventListener('scroll', animate, { passive: true });
    window.addEventListener('resize', animate);
    return () => {
      window.removeEventListener('scroll', animate);
      window.removeEventListener('resize', animate);
    };
  }, [images]);

  return (
    <div ref={outerRef} className="relative w-full" style={{ height: '100vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-white flex flex-col font-jakarta">
        <div className="flex-1 relative overflow-hidden flex items-center pl-6 md:pl-12">
          <div ref={rowRef} className="flex h-[80%] md:h-[500px]" style={{ willChange: 'transform' }}>
            {images.map((src, i) => (
              <div key={i} className="w-[85vw] md:w-[380px] shrink-0 h-full relative overflow-hidden">
                <Image src={src} alt={`Branding work ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Component Export
═══════════════════════════════════════════════════════════ */
export default memo(function HomeWorkflow({
  forceMobileView = false,
  images,
}: {
  forceMobileView?: boolean;
  images?: string[];
}) {
  if (images && images.length > 0) {
    return <BrandingImagesCarousel images={images} />;
  }

  return <MainWorkflowSection />;
});
