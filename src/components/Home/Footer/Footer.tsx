import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Phone, Mail } from 'lucide-react';

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Only keep Instagram, LinkedIn, and Facebook as requested
const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/halatechnology/',
    icon: InstagramIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hala-smart-technologies/',
    icon: LinkedinIcon,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/HalaSmartTechnology',
    icon: FacebookIcon,
  },
];

const footerColumns = [
  {
    header: 'HALA TECHNOLOGIES',
    links: [
      { name: 'Homepage', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Us', href: '/contact' },
    ]
  },
  {
    header: 'SERVICES',
    links: [
      { name: 'Branding', href: '/branding' },
      { name: 'Web Development', href: '/website-development' },
      { name: 'Digital Marketing', href: '/digital-marketing' },
      { name: 'AI Agent', href: '/ai-agent' },
    ]
  },
  {
    header: 'RESOURCES',
    links: [
      { name: 'FAQs', href: '/faqs' },
    ]
  },
];

export default function Footer() {
  return (
    <div className="pt-10">
      <style>{`
        .footer-bg {
          background-image: url('/123 PHONE VIEW.png');
        }
        @media (min-width: 768px) {
          .footer-bg {
            background-image: url('/website mockup images/123.png');
          }
        }
      `}</style>
      <footer className="footer-bg bg-[#111111] bg-cover bg-center font-jakarta text-white flex flex-col w-full px-6 pt-16 pb-8 md:px-16 md:pt-20 md:pb-10 relative rounded-t-[40px] md:rounded-t-[60px]">
        
        {/* TOP SECTION: Logo + Driving Digital Growth */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full border-b border-[#222222] pb-12 md:pb-16 mb-12 md:mb-16 gap-10 lg:gap-0 max-w-[1400px] mx-auto">
          <div className="hidden lg:flex items-center">
            {/* Logo matches Hala but inverted for dark background */}
            <Image 
              src="/hala-logo/halalogofooter.png" 
              alt="Hala Logo" 
              width={280} 
              height={90} 
              className="object-contain brightness-0 invert" 
              priority
            />
          </div>

          <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
            <div className="flex items-center gap-4 w-full lg:w-auto mb-2 opacity-80">
              <span className="font-jakarta text-xs sm:text-sm tracking-widest uppercase font-light">Dubai, UAE</span>
              <div className="flex-1 lg:w-[150px] h-px bg-[#333333]"></div>
              <span className="font-jakarta text-xs sm:text-sm tracking-widest uppercase font-light">Global Reach</span>
            </div>
            <h2 className="font-jakarta text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              Driving Digital Growth
            </h2>
          </div>
        </div>

        {/* MIDDLE SECTION: Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-[1400px] mx-auto">
          {footerColumns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-white font-semibold text-[11px] sm:text-xs tracking-[0.1em] mb-6 self-start uppercase opacity-60">
                {col.header}
              </h3>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center text-[14px] sm:text-[15px] font-jakarta text-white hover:text-white/80 transition-colors">
                      {link.name}
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Special 4th column for HEADQUARTERS & SOCIALS */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-[11px] sm:text-xs tracking-[0.1em] mb-6 self-start uppercase opacity-60">
              Headquarters
            </h3>
            <h4 className="font-jakarta font-light text-white text-[15px] mb-4 flex items-center group cursor-default">
              Dubai Office <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-70 group-hover:opacity-100 transition-all" />
            </h4>
            <ul className="space-y-4 text-[13px] sm:text-[14px] font-jakarta text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#007FFF]" />
                <span className="font-light">1803, Latifa Tower, Sheikh Zayed Road, Dubai, UAE.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-[#007FFF]" />
                <span className="font-light">+971 58 613 9007</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0 text-[#007FFF]" />
                <span className="font-light">Contact@halatechnology.ae</span>
              </li>
            </ul>

            {/* Social Media Links (High Visibility, Refined Balanced Sizing) */}
            <div className="mt-7 flex flex-col">
              <span className="text-white font-bold text-[11px] sm:text-xs tracking-[0.15em] mb-3 uppercase opacity-90 drop-shadow-sm">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5 sm:gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#007FFF] border border-white/35 hover:border-[#007FFF] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md shadow-black/25 hover:shadow-[0_0_18px_rgba(0,127,255,0.65)] group backdrop-blur-md"
                  >
                    <social.icon className="w-[18px] h-[18px] text-white drop-shadow transition-transform group-hover:scale-105" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Logo (Shown only on small screens below the email) */}
            <div className="flex lg:hidden mt-12 mb-4 items-center justify-center sm:justify-start w-full">
              <Image 
                src="/hala-logo/halalogofooter.png" 
                alt="Hala Logo" 
                width={260} 
                height={85} 
                className="object-contain brightness-0 invert" 
              />
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] sm:text-[12px] font-jakarta text-white/70 gap-6 md:gap-0 max-w-[1400px] mx-auto w-full">
          <div>
            © {new Date().getFullYear()} Hala Technologies | All rights reserved
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>

          <div className="flex items-center gap-1.5 opacity-90">
            site by <span className="text-white font-bold tracking-wider uppercase text-[10px] ml-0.5">HALA</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
