import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import LocalBusinessSchema from '@/components/SEO/LocalBusinessSchema';
import CookieBanner from '@/components/CookieBanner/CookieBanner';
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
  alternates: {
    canonical: BASE_URL,
  },
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
          src="//js-na2.hs-scripts.com/247325874.js"
          strategy="afterInteractive"
        />

        {/* GoHighLevel / LeadConnector External Tracking */}
        <Script
          id="leadconnector-tracking"
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_e6fce949eb71496dba81405198a3ca81"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
