const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildOgImage() {
  const width = 1200;
  const height = 630;

  // 1. Process background image
  const bg = await sharp('public/hero-images/herosectionhomepage.png')
    .resize(width, height, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Prepare Hala black hand logo for the white navbar
  const handLogoBuffer = await sharp('public/hala-logo/halalogo.png')
    .resize({ height: 32 })
    .toBuffer();
  const handLogoBase64 = 'data:image/png;base64,' + handLogoBuffer.toString('base64');

  // 3. Prepare client logos for the bottom trust row
  const clientLogos = [1, 2, 3, 4, 5, 6, 7, 8];
  let clientLogosSvg = '';
  const totalLogos = clientLogos.length;
  const itemWidth = 105;
  const startX = (width - (totalLogos * itemWidth)) / 2;

  for (let i = 0; i < totalLogos; i++) {
    const num = clientLogos[i];
    const clientPath = path.join('public', 'Companies Logos', `${num}.png`);
    if (fs.existsSync(clientPath)) {
      const clientBuf = await sharp(clientPath)
        .resize({ height: 26, width: 85, fit: 'inside' })
        .toBuffer();
      const b64 = 'data:image/png;base64,' + clientBuf.toString('base64');
      const posX = startX + i * itemWidth;
      clientLogosSvg += `<image href="${b64}" x="${posX}" y="556" height="24" filter="url(#whiteLogo)" />\n`;
    }
  }

  // 4. SVG overlay with pixel-perfect replica of home hero
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0082FB" />
          <stop offset="100%" stop-color="#0062D2" />
        </linearGradient>

        <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#007FFF" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#007FFF" stop-opacity="0.08" />
        </linearGradient>

        <filter id="whiteLogo">
          <feColorMatrix type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.65 0"/>
        </filter>

        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.75" />
        </filter>

        <filter id="navShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="#000000" flood-opacity="0.4" />
        </filter>

        <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
        </filter>

        <filter id="blueAmbient" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="35" result="blur" />
        </filter>
      </defs>

      <style>
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
      </style>

      <!-- Vignette and dark overlays matching site HeroSection -->
      <rect width="${width}" height="${height}" fill="#000000" fill-opacity="0.25" />

      <!-- Top Floating Navigation Pill (Exact match to site navbar) -->
      <g filter="url(#navShadow)" transform="translate(150, 32)">
        <rect width="900" height="66" rx="20" fill="#ffffff" fill-opacity="0.98" stroke="#eaeaea" stroke-width="1.2" />
        
        <!-- Logo Icon & Brand Text -->
        <image href="${handLogoBase64}" x="28" y="17" height="32" />
        <text x="68" y="39" class="font-jakarta" font-size="16.5" font-weight="700" fill="#111111" letter-spacing="-0.3">Hala Technology</text>

        <!-- Nav Links -->
        <text x="410" y="39" class="font-jakarta" font-size="14" font-weight="500" fill="#444444">Services ▾</text>
        <text x="515" y="39" class="font-jakarta" font-size="14" font-weight="500" fill="#444444">Case Studies</text>
        <text x="635" y="39" class="font-jakarta" font-size="14" font-weight="500" fill="#444444">About Us</text>
        <text x="730" y="39" class="font-jakarta" font-size="14" font-weight="500" fill="#444444">Resources ▾</text>

        <!-- Divider line -->
        <line x1="835" y1="20" x2="835" y2="46" stroke="#e0e0e0" stroke-width="1" />

        <!-- Lets Talk Button -->
        <g transform="translate(850, 14)">
          <rect width="105" height="38" rx="10" fill="url(#btnGrad)" />
          <text x="18" y="24" class="font-jakarta" font-size="13" font-weight="600" fill="#ffffff">Lets Talk ↗</text>
        </g>
      </g>

      <!-- Center Glow behind text -->
      <circle cx="600" cy="275" r="280" fill="#007FFF" opacity="0.12" filter="url(#blueAmbient)" />

      <!-- Dubai Agency Badge -->
      <g transform="translate(420, 138)">
        <rect width="360" height="32" rx="16" fill="url(#badgeGrad)" stroke="#007FFF" stroke-opacity="0.45" stroke-width="1" />
        <circle cx="20" cy="16" r="4.5" fill="#38bdf8" />
        <text x="36" y="21" class="font-jakarta" font-size="11.5" font-weight="700" fill="#38bdf8" letter-spacing="1.6">DUBAI'S LEADING MARKETING AGENCY</text>
      </g>

      <!-- Main Hero Headline (Exact match to site HeroSection) -->
      <g filter="url(#textShadow)">
        <text x="600" y="238" text-anchor="middle" class="font-jakarta" font-size="66" font-weight="800" fill="#ffffff" letter-spacing="-1.8">
          Grow your brand.
        </text>
        <text x="600" y="314" text-anchor="middle" class="font-jakarta" font-size="66" font-weight="800" fill="#ffffff" letter-spacing="-1.8">
          Dominate the market.
        </text>
      </g>

      <!-- Form CTA Bar (Exact match to site HeroSection email input) -->
      <g filter="url(#shadow)" transform="translate(355, 385)">
        <rect width="490" height="60" rx="16" fill="#000000" fill-opacity="0.65" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" />
        <text x="28" y="36" class="font-jakarta" font-size="14.5" font-weight="500" fill="#ffffff" fill-opacity="0.55">Enter your work email</text>
        
        <g transform="translate(325, 7)">
          <rect width="155" height="46" rx="12" fill="url(#btnGrad)" />
          <text x="22" y="28" class="font-jakarta" font-size="14" font-weight="700" fill="#ffffff">Request a Call →</text>
        </g>
      </g>

      <!-- Bottom Trust Header (Exact match to site HeroSection) -->
      <text x="600" y="522" text-anchor="middle" class="font-jakarta" font-size="11" font-weight="700" fill="#ffffff" fill-opacity="0.45" letter-spacing="2.8">
        TRUSTED BY LEADING BRANDS
      </text>

      <!-- Client Logos Row -->
      ${clientLogosSvg}
    </svg>
  `);

  const outputPath = path.join('public', 'og-home-hero.png');

  await sharp(bg)
    .composite([
      { input: svgOverlay, top: 0, left: 0 }
    ])
    .png({ quality: 95, compressionLevel: 7 })
    .toFile(outputPath);

  // Also copy to public/og-image.png and src/app/opengraph-image.png
  await sharp(outputPath).toFile(path.join('public', 'og-image.png'));
  await sharp(outputPath).toFile(path.join('src', 'app', 'opengraph-image.png'));

  console.log(`Successfully generated ${outputPath}, public/og-image.png, and src/app/opengraph-image.png`);
}

buildOgImage().catch(console.error);
