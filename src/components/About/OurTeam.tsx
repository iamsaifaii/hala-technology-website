'use client';

import { useState } from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'Taimoor Ali Warraich',
    role: 'Co-Founder & CEO',
    category: 'Management',
    image: '/team-pics/taimoor.jpg',
  },
  {
    id: 2,
    name: 'Saif Ali',
    role: 'UI/UX & Web Developer',
    category: 'Development',
    image: '/team-pics/saif-ali-new.jpg',
  },
  {
    id: 3,
    name: 'Rimza Habib',
    role: 'SEO Manager',
    category: 'Marketing',
    image: '/team-pics/rimza-new.jpg',
  },
  {
    id: 4,
    name: 'Hasnain Akbar',
    role: 'SEO Expert',
    category: 'Marketing',
    image: '/team-pics/husnain.jpg',
  },
  {
    id: 5,
    name: 'Abdur Rafay',
    role: 'Video Editor',
    category: 'Creative',
    image: '/team-pics/rafay.jpg',
  },
  {
    id: 6,
    name: 'Salman',
    role: 'Videographer',
    category: 'Creative',
    image: '/team-pics/salman.jpg',
  },
  {
    id: 7,
    name: 'Chaman Shafique',
    role: 'Content Writer',
    category: 'Creative',
    image: '/team-pics/chaman-shafiq.png',
  },
  {
    id: 8,
    name: 'Syeda Masoom Zahra',
    role: 'Graphic Design Intern',
    category: 'Creative',
    image: '/team-pics/syeda-masoom-zahra.png',
  },
];

export default function OurTeam() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="bg-white w-full py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-14 relative overflow-hidden select-none">
      <div className="max-w-[1300px] w-full mx-auto flex flex-col items-center relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 w-full max-w-3xl">
          <span className="font-jakarta text-[#007FFF] uppercase tracking-widest text-xs font-semibold mb-3 inline-block">
            Our World-Class Team
          </span>
          <h2 className="font-jakarta text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] tracking-tight text-[#111111] mb-5">
            Meet the minds behind the vision
          </h2>
          <p className="font-jakarta text-gray-600 text-base md:text-lg px-4 max-w-2xl mx-auto">
            A collective of innovative thinkers, creators, and builders pushing the boundaries of digital technology.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="w-full h-[75vh] min-h-[550px] md:h-[70vh] md:min-h-[500px] flex flex-col md:flex-row gap-2 md:gap-4 overflow-hidden rounded-[2rem]">
          {teamMembers.map((member) => {
            const isActive = activeId === member.id;
            return (
              <div
                key={member.id}
                onClick={() => setActiveId(member.id)}
                className={`
                  group relative cursor-pointer overflow-hidden transition-all duration-500 ease-in-out rounded-2xl
                  ${isActive ? 'flex-[7] md:flex-[4]' : 'flex-[1]'}
                `}
                style={{ 
                  minWidth: isActive ? 'auto' : '40px',
                  minHeight: isActive ? 'auto' : '40px'
                }}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full bg-[#1a1a1a]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`
                      object-cover object-top transition-all duration-500 ease-in-out
                      ${isActive ? 'grayscale-0 opacity-100' : 'grayscale-[90%] opacity-70 group-hover:opacity-100 group-hover:grayscale-[40%]'}
                    `}
                  />
                </div>

                {/* Gradient Overlay */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ease-in-out
                    ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}
                  `}
                />

                {/* Inactive Text */}
                <div className={`
                  absolute inset-0 flex
                  md:flex-col md:justify-end md:items-center md:pb-12
                  flex-row justify-start items-center pl-6
                  transition-opacity duration-500 delay-100
                  ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}>
                   <h3 className="text-white font-jakarta font-bold text-xs sm:text-sm whitespace-nowrap md:transform md:-rotate-90 origin-center tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
                     {member.name.split(' ')[0]}
                   </h3>
                </div>

                {/* Info Content (when active) */}
                <div 
                  className={`
                    absolute bottom-0 left-0 p-4 md:p-10 flex flex-col justify-end w-full
                    transition-all duration-500 ease-in-out transform
                    ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-12 opacity-0 pointer-events-none'}
                  `}
                >
                  <div className="w-full">
                    <span className="font-jakarta text-[10px] md:text-sm text-white uppercase tracking-widest font-bold block mb-1 md:mb-3 drop-shadow-md">
                      {member.role}
                    </span>
                    <h3 className="font-jakarta text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-white mb-0 md:mb-1 whitespace-nowrap drop-shadow-lg">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}