import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
import ConsentGatedScripts from '@/components/Analytics/ConsentGatedScripts';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const BASE_URL = 'https://halatechnology.ae';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Digital Marketing Agency Dubai | Marketing Agency',
    template: '%s',
  },
  description:
    'Digital marketing that delivers. Real clicks. Real customers. Grow your brand. Dominate the market.',
  keywords: ['digital marketing', 'SEO', 'web development', 'branding', 'Dubai', 'UAE'],
  authors: [{ name: 'Hala Technologies' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: BASE_URL,
    siteName: 'Hala Technologies',
    title: 'Hala Technologies – Scale Your Brand, Dominate the Market',
    description:
      'Digital marketing that delivers. Real clicks. Real customers. Grow your brand. Dominate the market.',
    images: [
      {
        url: 'https://halatechnology.ae/og-image.png',
        secureUrl: 'https://halatechnology.ae/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Hala Technologies - Grow your brand. Dominate the market.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hala Technologies – Scale Your Brand, Dominate the Market',
    description:
      'Digital marketing that delivers. Real clicks. Real customers. Grow your brand. Dominate the market.',
    images: ['https://halatechnology.ae/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  // NOTE: no `alternates.canonical` here on purpose. A canonical set on the root
  // layout is inherited by every page that does not override it, which silently
  // made /faqs, /privacy-policy, /cookie-policy and /terms-and-conditions all
  // declare the homepage as their canonical. Each page declares its own.
  verification: {
    google: 'iqVtPQGgcUg2102iIvUj2QseZ2d6Y7GNkRnbqLxQ678',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable}`}>
      <head>
        {/*
          Consent Mode v2 defaults. This MUST run before GTM so that no tag can
          write storage before the visitor has chosen. CookieBanner flips these
          to "granted" on Accept via gtag('consent','update', …).
        */}
        <Script
          id="consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var stored=null;try{stored=localStorage.getItem('hala_cookie_consent');}catch(e){}
var g=stored==='accepted'?'granted':'denied';
gtag('consent','default',{ad_storage:g,ad_user_data:g,ad_personalization:g,analytics_storage:g,personalization_storage:g,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`,
          }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXXKH9SV');`,
          }}
        />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=3" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png?v=3" />
        <link rel="shortcut icon" href="/icon.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=3" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXXKH9SV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LocalBusinessSchema />
        <SmoothScroll />
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieBanner />

        {/* Marketing/analytics vendors — injected only after consent is granted */}
        <ConsentGatedScripts />

        {/*
          GoHighLevel / LeadConnector External Tracking — loaded for every
          visitor so all native <form> submissions reach the CRM. It reads
          fields by their `name` attribute, so every form input must have one.
        */}
        <Script
          id="leadconnector-tracking"
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_36f0e8fca7294e6db129686edff0422f"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
