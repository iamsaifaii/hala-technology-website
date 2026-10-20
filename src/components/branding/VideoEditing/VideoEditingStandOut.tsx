'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle, Clapperboard, Settings2 } from 'lucide-react';

const strengths = [
  'Story Driven Editing',
  'Seamless Cuts & Transitions',
  'Custom Thumbnail Design',
  'Color Grading & Enhancement',
  'Motion Graphics & Effects',
  'Quick Delivery No Compromise',
];

export default function VideoEditingStandOut() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const listItemsRef = useRef<HTMLUListElement>(null);
  // Direct refs for floating elements — no global class selectors
  const floatingUI1Ref = useRef<HTMLDivElement>(null);
  const floatingUI2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Register plugin inside the hook — safe for SSR
    gsap.registerPlugin(ScrollTrigger);

    // Parallax effect for the main image — smooth scrub interpolation with GPU force3D
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    // Staggered reveal for list items — scoped to listItemsRef children
    if (listItemsRef.current) {
      gsap.from(listItemsRef.current.children, {
        scrollTrigger: {
          trigger: listItemsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        force3D: true,
      });
    }

    // Floating UI animations — ref-targeted, no global selectors
    gsap.to(floatingUI1Ref.current, {
      y: -15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      force3D: true,
    });

    gsap.to(floatingUI2Ref.current, {
      y: 15,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      delay: 0.5,
      force3D: true,
    });

  }, { scope: containerRef });


  return (
    <section ref={containerRef} className="w-full bg-[#fcfcfc] text-[#111] py-16 md:py-24 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Parallax Showcase */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/4] rounded-3xl md:rounded-[2.5rem] bg-gray-100 mt-8 lg:mt-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border-[8px] border-white order-2 lg:order-1 group">
          <div ref={imageRef} className="absolute -inset-12 w-[120%] h-[120%] [will-change:transform]">
            <Image 
              src="/featureimage.jpg" 
              alt="Video Editing Workspace" 
              fill 
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Floating UI Element 1: Rendering Badge */}
          <div ref={floatingUI1Ref} className="absolute top-6 sm:top-10 md:top-12 left-6 sm:left-10 md:left-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/40 flex items-center gap-3 z-10 [will-change:transform]">
            <div className="w-10 h-10 rounded-full bg-[#007FFF]/10 flex items-center justify-center shrink-0">
              <Settings2 className="w-5 h-5 text-[#007FFF] animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Exporting 4K</p>
              <p className="text-sm font-bold text-[#111] leading-none">99% Complete</p>
            </div>
          </div>

          {/* Floating UI Element 2: Timeline Graphic */}
          <div ref={floatingUI2Ref} className="absolute bottom-6 sm:bottom-10 md:bottom-12 right-6 sm:right-10 md:right-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-5 shadow-2xl border border-white/40 flex items-center gap-4 z-10 [will-change:transform]">
            <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center shadow-lg shrink-0">
              <Clapperboard className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <div className="w-24 sm:w-32 md:w-36 h-2.5 rounded-full bg-gray-100 overflow-hidden shadow-inner">
                <div className="w-[80%] h-full bg-[#007FFF] rounded-full relative">
                  <div className="absolute top-0 right-0 w-2 h-full bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between w-full items-center">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">01:23:45</span>
                <span className="text-[10px] font-bold text-[#007FFF] bg-[#007FFF]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">PRO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Content & Hierarchy */}
        <div className="flex flex-col z-10 order-1 lg:order-2">
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <div className="w-10 h-[2px] bg-[#007FFF]"></div>
            <span className="font-jakarta text-[13px] md:text-sm font-semibold tracking-[0.2em] uppercase text-[#007FFF]">
              The Hala Difference
            </span>
          </div>

          <h2 className="font-jakarta text-4xl sm:text-5xl md:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-[#111] mb-8">
            Why Our Video Editing Services <br className="hidden xl:block" />
            <span className="font-jakarta text-[#007FFF] font-medium pr-2">Truly Deliver?</span>
          </h2>

          <p className="font-jakarta text-base md:text-lg lg:text-[19px] text-[#555] leading-[1.8] font-medium mb-10 md:mb-12 max-w-[600px]">
            At Hala Technology our video editing services in Dubai go far beyond simple cuts and transitions. We build stories that resonate with your audience blending creativity precision and modern editing tools to deliver videos that are visually striking emotionally engaging and built to perform.
          </p>

          <ul ref={listItemsRef} className="flex flex-col gap-4 md:gap-5">
            {strengths.map((strength, index) => (
              <li key={index} className="strength-item flex items-center gap-4 group cursor-default">
                <div className="w-7 h-7 rounded-full bg-[#007FFF]/10 border border-[#007FFF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#007FFF] group-hover:border-[#007FFF] transition-colors duration-300 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-[#007FFF] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="font-jakarta text-[17px] md:text-xl font-semibold text-[#111] group-hover:text-[#007FFF] transition-colors duration-300 tracking-tight">
                  {strength}
                </span>
              </li>
            ))}
          </ul>

        </div>

      </div>
    </section>
  );
}
