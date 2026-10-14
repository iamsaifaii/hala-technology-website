
import Image from 'next/image';

interface BrandingShowcaseProps {
  mainImageDesktop?: string;
  mainImageMobile?: string;
  gridImage1?: string;
  gridImage2?: string;
  desktopObjectFit?: 'cover' | 'contain' | 'fill';
  mobileObjectFit?: 'cover' | 'contain' | 'fill';
}

export default function BrandingShowcase({
  mainImageDesktop = '/Branding Section Images/Bradningimagedesktopview.png',
  mainImageMobile = '/Branding Section Images/branding-image-phoneview.png',
  gridImage1 = '/Branding Section Images/2.png',
  gridImage2 = '/Branding Section Images/17.png',
  desktopObjectFit = 'cover',
  mobileObjectFit = 'contain',
}: BrandingShowcaseProps) {
  return (
    <section className="w-full relative z-30 bg-white text-[#111111] rounded-t-[40px] md:rounded-t-[60px] -mt-8 md:-mt-12 pt-24 pb-24 md:pb-32 px-4 md:px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Header removed as requested */}

        {/* Bento Grid */}
        <div className="w-full flex flex-col gap-4 md:gap-6">
          
          {/* Top Full-Width Item - Sticky Background Layer */}
          <div
            className="w-full relative h-[500px] md:h-[650px] sticky top-24 z-0 flex items-center justify-center"
          >
            {/* Desktop Image */}
            <div className="hidden md:flex w-full h-full relative items-center justify-center">
              {desktopObjectFit === 'contain' ? (
                <img 
                  src={mainImageDesktop} 
                  alt="Brand Identity Desktop" 
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full rounded-[2rem] md:rounded-[3rem] shadow-xl"
                />
              ) : (
                <Image 
                  src={mainImageDesktop} 
                  alt="Brand Identity Desktop" 
                  fill 
                  style={{ objectFit: desktopObjectFit, objectPosition: 'center' }}
                  className="rounded-[2rem] md:rounded-[3rem] shadow-xl"
                />
              )}
            </div>
            
            {/* Mobile Image */}
            <div className="flex md:hidden w-full h-full relative items-center justify-center">
              {mobileObjectFit === 'contain' ? (
                <img 
                  src={mainImageMobile} 
                  alt="Brand Identity Mobile" 
                  loading="lazy"
                  decoding="async"
                  className="max-w-full max-h-full rounded-[2rem] md:rounded-[3rem] shadow-xl"
                />
              ) : (
                <Image 
                  src={mainImageMobile} 
                  alt="Brand Identity Mobile" 
                  fill 
                  style={{ objectFit: mobileObjectFit, objectPosition: 'center' }}
                  className="rounded-[2rem] md:rounded-[3rem] shadow-xl"
                />
              )}
            </div>
          </div>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 relative z-10 mt-4 md:mt-6">
            
            {/* Grid Item 1 - Only Image */}
            <div
              className="relative h-[500px] md:h-[580px] rounded-t-[2rem] md:rounded-t-none md:rounded-l-[3rem] overflow-hidden shadow-xl"
            >
              <Image 
                src={gridImage1} 
                alt="Brand 2 Preview" 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Grid Item 2 - Only Image */}
            <div
              className="relative h-[500px] md:h-[580px] rounded-b-[2rem] md:rounded-b-none md:rounded-r-[3rem] overflow-hidden shadow-xl"
            >
              <Image 
                src={gridImage2} 
                alt="Brand 3 Preview" 
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
