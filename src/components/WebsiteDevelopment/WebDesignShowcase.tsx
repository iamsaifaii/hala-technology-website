'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Monitor, Globe } from 'lucide-react';

const showcaseProjects = [
  {
    id: '01',
    title: 'Rodeo Drive Dubai',
    category: 'Entertainment & Nightlife Venue',
    description: 'A dynamic, immersive web experience engineered for Dubai premier nightlife & dining destination with seamless booking and live event showcase.',
    url: 'https://www.rodeodrivedubai.com/',
    desktopImg: '/website mockup images/rodeo.jpeg',
    tabletImg: '/website mockup images/rodeo.jpeg',
    mobileImg: '/website mockup images/rodeo.jpeg',
    metrics: [
      { label: 'Speed Score', val: '98/100' },
      { label: 'Engagement', val: '+280%' },
      { label: 'Tech Stack', val: 'Next.js / React' }
    ]
  },
  {
    id: '02',
    title: 'Mado Abu Dhabi',
    category: 'Restaurant & Fine Dining',
    description: 'An elegant culinary web portal highlighting authentic Turkish heritage cuisine, digital menus, and reservation experiences.',
    url: 'https://www.mado.abudhabi/',
    desktopImg: '/website mockup images/mado.png',
    tabletImg: '/website mockup images/mado.png',
    mobileImg: '/website mockup images/mado.png',
    metrics: [
      { label: 'Speed Score', val: '99/100' },
      { label: 'Reservations', val: '+320%' },
      { label: 'Tech Stack', val: 'Next.js / Tailwind' }
    ]
  },
  {
    id: '03',
    title: 'Green Crystal',
    category: 'Corporate & Industrial Trading',
    description: 'A dynamic, immersive web experience engineered for seamless B2B networking and global industrial trade solutions.',
    url: 'https://greencrystal.ae/',
    desktopImg: '/website mockup images/greencrystal.png',
    tabletImg: '/website mockup images/greencrystal.png',
    mobileImg: '/website mockup images/greencrystal.png',
    metrics: [
      { label: 'Speed Score', val: '97/100' },
      { label: 'Engagement', val: '+195%' },
      { label: 'Tech Stack', val: 'Next.js / Node' }
    ]
  }
];

export default function WebDesignShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle Mouse Move for Custom Follow Cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const currentProject = showcaseProjects[activeProject];

  return (
    <div className="bg-white w-full">
      <section 
        ref={containerRef}
        className="relative w-full bg-[#111111] text-white py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden rounded-t-[40px] md:rounded-t-[60px] border-b border-[#222222]"
      >
        {/* Custom Follow Cursor */}
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-50 bg-[#007FFF] text-white text-xs font-bold px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-1.5 whitespace-nowrap"
            style={{
              left: cursorPos.x + 12,
              top: cursorPos.y + 12
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </motion.div>
        )}

        <div className="max-w-[1280px] mx-auto flex flex-col items-center">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-[#222222] border border-[#333333] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#007FFF]" />
              WEB DESIGN SHOWCASE
            </div>
            
            <h2 className="font-jakarta font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-5">
              A Glimpse of Our Work
            </h2>

            <p className="font-jakarta text-base sm:text-lg text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
              Interactive, high-converting digital platforms engineered with modern frameworks, pixel-perfect precision, and responsive performance.
            </p>
          </div>

          {/* Project Selector Bar */}
          <div className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 mb-8 md:mb-10 overflow-x-auto w-full pb-4 px-2 no-scrollbar snap-x snap-mandatory">
            {showcaseProjects.map((proj, idx) => {
              const isActive = idx === activeProject;
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveProject(idx)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] sm:text-sm font-bold transition-all duration-300 border shrink-0 snap-center ${
                    isActive
                      ? 'bg-[#007FFF] text-white border-[#007FFF]'
                      : 'bg-[#1A1A1A] text-white/70 border-[#333333] hover:text-white hover:border-[#555555]'
                  }`}
                >
                  <span className={`text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white text-[#007FFF]' : 'bg-[#222222] text-white'}`}>
                    {proj.id}
                  </span>
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Showcase Showcase Window */}
          <div 
            className="w-full relative rounded-[24px] sm:rounded-[32px] bg-[#161616] border border-[#2A2A2A] overflow-hidden p-4 sm:p-8 md:p-12 transition-all duration-300 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top Browser Bar Header */}
            <div className="w-full flex items-center justify-between pb-3 sm:pb-4 border-b border-[#2A2A2A] mb-4 sm:mb-8 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>

              {/* Address Bar */}
              <div className="bg-[#222222] border border-[#333333] px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-white/70 flex items-center gap-1.5 sm:gap-2 max-w-[200px] sm:max-w-md w-full justify-center truncate">
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#007FFF] shrink-0" />
                <span className="truncate">{currentProject.url}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-white/50 shrink-0">
                <span className="hidden sm:inline-block">RESPONSIVE VIEW</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#222222] border border-[#333333] flex items-center justify-center text-white">
                  <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#007FFF]" />
                </div>
              </div>
            </div>

            {/* Project Details & Multi-Device Layered Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Project Info */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#007FFF] uppercase">
                      FEATURED CASE STUDY
                    </span>
                  </div>

                  <h3 className="font-jakarta font-bold text-xl sm:text-4xl text-white mb-2 sm:mb-3 tracking-tight">
                    {currentProject.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-white/50 mb-3 sm:mb-4">
                    {currentProject.category}
                  </p>

                  <p className="font-jakarta text-xs sm:text-base text-white/80 leading-relaxed mb-5 sm:mb-6 font-medium">
                    {currentProject.description}
                  </p>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-[#2A2A2A] mb-5 sm:mb-6">
                  {currentProject.metrics.map((m, i) => (
                    <div key={i} className="flex flex-col bg-[#222222] p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#333333]">
                      <span className="text-[10px] sm:text-xs text-white/60 font-medium mb-0.5 sm:mb-1 truncate">{m.label}</span>
                      <span className="text-xs sm:text-base font-bold text-[#007FFF] truncate">{m.val}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#007FFF] hover:bg-[#0066CC] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-200 self-start w-full sm:w-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Live Interactive Demo</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </a>
              </div>

              {/* Right Column: Main Desktop Frame */}
              <div className="lg:col-span-7 relative flex items-center justify-center mt-2 lg:mt-0">
                
                {/* Main Desktop Browser Frame */}
                <motion.div 
                  key={`desktop-${currentProject.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full aspect-[16/10] bg-[#222222] rounded-xl sm:rounded-2xl overflow-hidden border border-[#333333] relative shadow-2xl"
                >
                  <Image
                    src={currentProject.desktopImg}
                    alt={currentProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top"
                    priority
                  />
                </motion.div>

              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
