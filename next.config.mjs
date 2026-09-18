/** @type {import('next').NextConfig} */
import { withSentryConfig } from '@sentry/nextjs';

const isDev = process.env.NODE_ENV !== 'production';

// Content Security Policy — locks down what scripts/styles/fonts can load
// In development: uses 'unsafe-eval' (required by Next.js HMR) and is set as
// Content-Security-Policy-Report-Only so it never blocks dev workflow.
// In production: strict CSP is enforced with no unsafe-eval.
const CSP = [
  "default-src 'self'",
  // Scripts: self + inline (GTM/reCAPTCHA inject inline scripts) + Google services + LeadConnector / GoHighLevel + HubSpot
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.filesafe.space https://*.highlevelcontent.com https://js-na2.hs-scripts.com https://*.hs-scripts.com https://*.hubspot.com`,
  // Styles: self + Google Fonts (inline styles needed for styled-jsx / framer-motion) + LeadConnector / GoHighLevel
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.filesafe.space https://*.highlevelcontent.com",
  // Fonts: self + Google Fonts CDN + LeadConnector / GoHighLevel
  "font-src 'self' data: https://fonts.gstatic.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.filesafe.space https://*.highlevelcontent.com",
  // Images: self + Sanity CDN + Unsplash + Pravatar + data/blob URIs + LeadConnector / GoHighLevel (filesafe.space) + Google Storage + HubSpot
  "img-src 'self' data: blob: https://images.unsplash.com https://i.pravatar.cc https://ui-avatars.com https://*.unsplash.com https://cdn.sanity.io https://www.googletagmanager.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.filesafe.space https://assets.cdn.filesafe.space https://*.highlevelcontent.com https://storage.googleapis.com https://*.storage.googleapis.com https://*.hubspot.com https://*.hs-scripts.com https://*.hsforms.com",
  // Media: sounds/voice notes from LeadConnector / GoHighLevel
  "media-src 'self' data: blob: https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.filesafe.space https://assets.cdn.filesafe.space https://*.highlevelcontent.com https://*.msgsndr.com",
  // Frames: Google reCAPTCHA + LeadConnector / GoHighLevel + HubSpot
  "frame-src 'self' https://www.google.com https://recaptcha.google.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://*.msgsndr.com https://*.filesafe.space https://*.highlevelcontent.com https://*.hubspot.com",
  // Connections: self + Google services + Sanity API & WebSockets + GTM + LeadConnector / GoHighLevel + Sentry + HubSpot
  `connect-src 'self' https://www.google.com https://www.googleapis.com https://*.sanity.io wss://*.sanity.io https://www.googletagmanager.com https://analytics.google.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://services.leadconnectorhq.com wss://*.leadconnectorhq.com https://*.msgsndr.com wss://*.msgsndr.com https://*.filesafe.space https://assets.cdn.filesafe.space https://*.highlevelcontent.com https://*.hubspot.com https://*.hs-scripts.com https://*.hsforms.com https://*.sentry.io${isDev ? ' https://registry.npmjs.org' : ''}`,
  // Block object/embed/base hijacking
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join('; ');

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  // Disable source maps in production — prevents source code exposure & reduces bundle size
  productionBrowserSourceMaps: false,
  compiler: {
    // Remove console.log in production for maximum execution speed & clean bundle
    removeConsole: isDev ? false : { exclude: ['error', 'warn'] },
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@gsap/react', 'gsap'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.dynamicleo.ae',
      },
      {
        protocol: 'https',
        hostname: '*.filesafe.space',
      },
      {
        protocol: 'https',
        hostname: 'assets.cdn.filesafe.space',
      },
      {
        protocol: 'https',
        hostname: '*.highlevelcontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Security headers on all application routes
        source: '/:path*',
        headers: [
          // In dev: report-only so CSP issues surface in the console without blocking.
          // In prod: fully enforced.
          isDev
            ? { key: 'Content-Security-Policy-Report-Only', value: CSP }
            : { key: 'Content-Security-Policy', value: CSP },
          // HSTS: tell browsers to always use HTTPS (includeSubDomains + preload for HSTS preload list)
          { key: 'Strict-Transport-Security',        value: 'max-age=63072000; includeSubDomains; preload' },
          // Prevent clickjacking
          { key: 'X-Frame-Options',                  value: 'DENY' },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options',            value: 'nosniff' },
          // Control referrer information
          { key: 'Referrer-Policy',                   value: 'strict-origin-when-cross-origin' },
          // Restrict browser feature access
          { key: 'Permissions-Policy',                value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), interest-cohort=()' },
          // DNS prefetching
          { key: 'X-DNS-Prefetch-Control',            value: 'on' },
          // Disable legacy XSS auditor (modern browsers ignore it; CSP is the right tool)
          { key: 'X-XSS-Protection',                  value: '0' },
          // Isolate browsing context from other origins (protects against Spectre)
          { key: 'Cross-Origin-Opener-Policy',        value: 'same-origin-allow-popups' },
          // Prevent cross-origin resource embedding
          { key: 'Cross-Origin-Resource-Policy',      value: 'same-site' },
          // Opt out of FLoC / Topics API tracking — merged into the Permissions-Policy above
        ],
      },
      {
        // API routes: no caching, no indexing
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag',   value: 'noindex, nofollow' },
          { key: 'Cache-Control',  value: 'no-store, no-cache, must-revalidate, private' },
          { key: 'Pragma',         value: 'no-cache' },
        ],
      },
      {
        // Immutable cache control for static assets & images
        source: '/:path*\\.(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/our-team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/digital-marketing-services',
        permanent: true,
      },
      {
        source: '/marketing-services',
        destination: '/best-digital-marketing-services-in-dubai',
        permanent: true,
      },
      {
        source: '/marketing',
        destination: '/best-digital-marketing-services-in-dubai',
        permanent: true,
      },
      {
        source: '/services/:path+',
        destination: '/:path+',
        permanent: true,
      },
      // Redirect old internal paths to keyword-rich canonical slugs
      {
        source: '/branding',
        destination: '/branding-services',
        permanent: true,
      },
      {
        source: '/branding/graphic-design',
        destination: '/graphic-design-services-in-dubai',
        permanent: true,
      },
      {
        source: '/branding/video-editing',
        destination: '/video-editing-services-dubai',
        permanent: true,
      },
      {
        source: '/branding/content-creation',
        destination: '/content-creation-services',
        permanent: true,
      },
      {
        source: '/website-development',
        destination: '/web-development-services-in-dubai',
        permanent: true,
      },
      {
        source: '/digital-marketing',
        destination: '/best-digital-marketing-services-in-dubai',
        permanent: true,
      },
      {
        source: '/seo',
        destination: '/best-seo-services-in-dubai',
        permanent: true,
      },
      {
        source: '/smm',
        destination: '/social-media-marketing-services-in-dubai',
        permanent: true,
      },
      {
        source: '/ppc',
        destination: '/ppc-service-in-dubai',
        permanent: true,
      },
      {
        source: '/ai-agent',
        destination: '/ai-agent-services',
        permanent: true,
      },
      {
        source: '/whatsapp-automation',
        destination: '/whatsapp-automation-services',
        permanent: true,
      },
      // Legacy URL redirects to prevent 404s
      {
        source: '/whatsapp-business-automation',
        destination: '/whatsapp-automation-services',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/SEO%20Consulting%20Services',
        destination: '/blogs/seo-consulting-services',
        permanent: true,
      },
      {
        source: '/blogs/SEO Consulting Services',
        destination: '/blogs/seo-consulting-services',
        permanent: true,
      },
      {
        source: '/blogs/seo%20agency%20dubai',
        destination: '/blogs/seo-agency-dubai',
        permanent: true,
      },
      {
        source: '/blogs/seo agency dubai',
        destination: '/blogs/seo-agency-dubai',
        permanent: true,
      },
      {
        source: '/case-study',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/graphic-design-company-in-dubai',
        destination: '/graphic-design-services-in-dubai',
        permanent: true,
      },
      {
        source: '/video-editing-services',
        destination: '/video-editing-services-dubai',
        permanent: true,
      },
      {
        source: '/content-creation-marketing-agency',
        destination: '/content-creation-services',
        permanent: true,
      },
      {
        source: '/website-development-agency',
        destination: '/web-development-services-in-dubai',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/branding-services',
        destination: '/branding',
      },
      {
        source: '/graphic-design-services-in-dubai',
        destination: '/branding/graphic-design',
      },
      {
        source: '/video-editing-services-dubai',
        destination: '/branding/video-editing',
      },
      {
        source: '/content-creation-services',
        destination: '/branding/content-creation',
      },
      {
        source: '/web-development-services-in-dubai',
        destination: '/website-development',
      },
      {
        source: '/best-digital-marketing-services-in-dubai',
        destination: '/digital-marketing',
      },
      {
        source: '/best-seo-services-in-dubai',
        destination: '/seo',
      },
      {
        source: '/social-media-marketing-services-in-dubai',
        destination: '/smm',
      },
      {
        source: '/ppc-service-in-dubai',
        destination: '/ppc',
      },
      {
        source: '/digital-marketing-services',
        destination: '/digital-marketing',
      },
      {
        source: '/ai-agent-services',
        destination: '/ai-agent',
      },
      {
        source: '/whatsapp-automation-services',
        destination: '/whatsapp-automation',
      },
    ];
  },
};

export default withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: process.env.SENTRY_ORG || "hala-technologies",
    project: process.env.SENTRY_PROJECT || "hala-website",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);

