'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import { CLIENT_LOGOS } from '@/lib/client-logos';

const projects = [
  {
    id: 1,
    title: 'Marina Byblos Hotel',
    badge: 'HOTEL',
    image: '/website mockup images/marina.png',
    link: 'https://www.marinabybloshotel.com/',
  },
  {
    id: 2,
    title: 'Green Crystal',
    badge: 'CORPORATE',
    image: '/website mockup images/greencrystal.png',
    link: 'https://greencrystal.ae/',
  },
  {
    id: 3,
    title: 'Rodeo Drive Dubai',
    badge: 'ENTERTAINMENT',
    image: '/website mockup images/rodeo.jpeg',
    link: 'https://www.rodeodrivedubai.com/',
  },
  {
    id: 4,
    title: 'Royal Costa Cars',
    badge: 'LUXURY',
    image: '/website mockup images/royalcosta.png',
    link: 'https://royalcostacars.com/',
  },
  {
    id: 5,
    title: 'Mado Abu Dhabi',
    badge: 'DINING',
    image: '/website mockup images/mado.png',
    link: 'https://www.mado.abudhabi/',
  }
];

// This row intentionally shows a subset, not the full wall. It previously held
// assets 1-10; Cocomix (1), Farada (5), Mangrove (9) and Keen (10) were retired,
// so the same slice now yields six.
const clientLogos = CLIENT_LOGOS.filter((logo) => logo.id <= 10);

export default function FeaturedWork() {
  return (
    <section className="w-full bg-white text-[#111111] py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative">
      <div className="max-w-[1240px] mx-auto">

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          {/* Left Title Area */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-[#F4F4F5] text-[#111111] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[#E4E4E7]">
              <span className="w-2 h-2 rounded-full bg-[#007FFF] animate-pulse"></span>
              Work
            </div>
            <h2 className="font-jakarta font-bold text-4xl sm:text-5xl md:text-6xl text-[#111111] tracking-tight leading-tight">
              A Look at Our Best Work
            </h2>
          </div>

          {/* Right Text & Button Area */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
            <p className="text-[#555555] text-sm sm:text-base font-medium max-w-xs leading-relaxed">
              Interactive high performing websites built with modern frameworks, precise design and smooth responsiveness across every device.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#007FFF] hover:bg-[#0066CC] text-white px-7 py-3 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap self-start sm:self-auto hover:scale-105 active:scale-95 text-center"
            >
              See All
            </Link>
          </div>
        </div>

        {/* Uniform Grid — Centered last row using flex */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer block border border-[#E4E4E7]"
            >
              {/* Full image — completely visible, no dark overlay, no crop */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Very subtle top-only vignette so badge is readable */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

              {/* Badge — top left */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#111111] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-white/50 shadow-sm z-10">
                {project.badge}
              </div>

              {/* Redirect icon — bottom right corner only */}
              <div className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-xl bg-[#007FFF] text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Logo Bar: Worked With */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <span className="font-jakarta font-bold text-base sm:text-lg text-[#111111] whitespace-nowrap shrink-0">
            Worked With:
          </span>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 opacity-85 hover:opacity-100 transition-opacity">
            {clientLogos.map((client) => (
              <div key={client.id} className="flex items-center justify-center h-10 sm:h-12 px-2 cursor-pointer">
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain max-w-[120px] filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
