import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Master SVG with Box Icon and "TENDA JL" logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E11D48" />
      <stop offset="50%" stop-color="#BE185D" />
      <stop offset="100%" stop-color="#831843" />
    </linearGradient>
    <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB" />
      <stop offset="100%" stop-color="#FDE68A" />
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#E11D48" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Subtle festive sparkles -->
  <circle cx="90" cy="90" r="8" fill="#FDE047" opacity="0.6" />
  <circle cx="430" cy="110" r="10" fill="#FDE047" opacity="0.6" />
  <circle cx="80" cy="400" r="6" fill="#FDE047" opacity="0.5" />
  <circle cx="440" cy="380" r="7" fill="#FDE047" opacity="0.5" />

  <g filter="url(#dropShadow)" transform="translate(0, -10)">
    <!-- Box Body (Caixinha) -->
    <!-- Front Face -->
    <rect x="170" y="210" width="172" height="150" rx="16" fill="url(#boxGrad)" stroke="#B45309" stroke-width="4" />
    
    <!-- Vertical Ribbon -->
    <rect x="238" y="210" width="36" height="150" fill="url(#ribbonGrad)" />

    <!-- Box Lid / Top -->
    <rect x="150" y="170" width="212" height="46" rx="10" fill="#FEF3C7" stroke="#B45309" stroke-width="4" />
    <rect x="238" y="170" width="36" height="46" fill="url(#ribbonGrad)" />

    <!-- Ribbon Bow on Top -->
    <!-- Left Loop -->
    <path d="M 240 170 C 190 120, 195 90, 235 135 C 248 150, 252 165, 252 170 Z" fill="url(#ribbonGrad)" stroke="#9F1239" stroke-width="3" />
    <!-- Right Loop -->
    <path d="M 272 170 C 322 120, 317 90, 277 135 C 264 150, 260 165, 260 170 Z" fill="url(#ribbonGrad)" stroke="#9F1239" stroke-width="3" />
    <!-- Center Knot -->
    <circle cx="256" cy="168" r="14" fill="#FFE4E6" stroke="#9F1239" stroke-width="3" />

    <!-- Castle Turrets / Crown Accent on Box -->
    <path d="M 220 250 L 232 235 L 244 250 L 256 230 L 268 250 L 280 235 L 292 250 Z" fill="url(#goldGrad)" opacity="0.9" />
  </g>

  <!-- Commercial Logo / Store Branding: TENDA JL -->
  <!-- Background Badge for Branding -->
  <rect x="76" y="388" width="360" height="74" rx="20" fill="#FFFFFF" opacity="0.95" filter="url(#dropShadow)" />
  <rect x="80" y="392" width="352" height="66" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="3" />

  <text x="256" y="438" 
    font-family="'Montserrat', 'Poppins', 'Segoe UI', Arial, sans-serif" 
    font-size="34" 
    font-weight="900" 
    letter-spacing="2.5" 
    fill="#9F1239" 
    text-anchor="middle">
    TENDA JL
  </text>
  
  <text x="256" y="452" 
    font-family="'Poppins', sans-serif" 
    font-size="10" 
    font-weight="700" 
    letter-spacing="3" 
    fill="#D97706" 
    text-anchor="middle">
    PAPELARIA PERSONALIZADA
  </text>
</svg>`;

// Save SVG
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf-8');
console.log('Saved public/icon.svg');

// Generate PNGs using Sharp
async function buildPngs() {
  const svgBuffer = Buffer.from(svgContent);

  // 192x192 PNG (Standard PWA)
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Generated pwa-192x192.png');

  // 512x512 PNG (Standard PWA)
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Generated pwa-512x512.png');

  // 512x512 Maskable PNG with Safe Zone Padding (15% padding)
  const paddedSvg = svgContent.replace(
    '<rect width="512" height="512" rx="112" fill="url(#bgGrad)" />',
    '<rect width="512" height="512" fill="url(#bgGrad)" />'
  );
  const paddedBuffer = Buffer.from(paddedSvg);

  await sharp(paddedBuffer)
    .resize(410, 410)
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: '#831843',
    })
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
  console.log('Generated pwa-maskable-512x512.png');

  // 180x180 PNG (Apple Touch Icon)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 64x64 favicon.ico (as PNG favicon)
  await sharp(svgBuffer)
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Generated favicon.ico');
}

buildPngs()
  .then(() => console.log('All icons built successfully!'))
  .catch((err) => console.error('Error generating icons:', err));
