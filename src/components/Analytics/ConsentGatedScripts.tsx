'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

import { CONSENT_EVENT, readConsent, type ConsentValue } from '@/lib/consent';

/**
 * Loads marketing/analytics third parties only after the visitor has accepted.
 *
 * Before this existed, GTM, HubSpot and the LeadConnector tracker all loaded on
 * first paint regardless of the banner, so "Decline" was purely decorative.
 *
 * GTM itself is loaded in the root layout with Consent Mode defaulting to
 * denied, which is the Google-sanctioned way to keep tag infrastructure present
 * while blocking storage. The vendor scripts below have no consent API, so they
 * are simply not injected until consent is granted.
 */
export default function ConsentGatedScripts() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentValue>).detail;
      if (detail === 'accepted' || detail === 'declined') setConsent(detail);
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== 'accepted') return null;

  return (
    <>
      {/* GoHighLevel Chat Widget */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a29d9d08eebf2dcc67d51e9"
        strategy="lazyOnload"
      />

      {/* HubSpot Embed Script */}
      <Script
        id="hs-script-loader"
        src="https://js-na2.hs-scripts.com/247325874.js"
        strategy="afterInteractive"
      />

      {/* GoHighLevel / LeadConnector External Tracking */}
      <Script
        id="leadconnector-tracking"
        src="https://link.msgsndr.com/js/external-tracking.js"
        data-tracking-id="tk_e6fce949eb71496dba81405198a3ca81"
        strategy="afterInteractive"
      />
    </>
  );
}
