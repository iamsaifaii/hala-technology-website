'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

import { readConsent, writeConsent } from '@/lib/consent';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only prompt visitors who have not chosen yet.
    if (readConsent() === null) {
      // Small delay before showing the banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // writeConsent persists the choice, pushes a Consent Mode v2 update to GTM,
  // and fires the event ConsentGatedScripts listens to — so these buttons now
  // actually control whether third-party trackers load.
  const handleAccept = () => {
    writeConsent('accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    writeConsent('declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 pointer-events-none">
      <div className="mx-auto max-w-4xl bg-[#111111] border border-[#333333] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pointer-events-auto transition-all">
        
        <div className="flex-1 pr-4 md:pr-8 relative">
          <h3 className="text-white font-jakarta font-bold text-lg mb-2">
            We Value Your Privacy
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more in our <Link href="/privacy-policy" className="text-[#007FFF] font-medium hover:underline underline-offset-2 transition-all">Privacy Policy</Link>.
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 w-full md:w-auto mt-2 md:mt-0 justify-end">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-[#333333] text-white/80 hover:text-white hover:bg-[#222222] transition-colors text-sm font-semibold whitespace-nowrap"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-[#007FFF] text-white hover:bg-[#0066CC] transition-colors shadow-lg shadow-[#007FFF]/20 text-sm font-semibold whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
        
        <button 
          onClick={handleDecline} 
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors md:hidden"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
