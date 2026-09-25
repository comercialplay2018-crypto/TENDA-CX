export interface ColorPalette {
  name: string;
  colors: string[];
}

export const FESTIVE_PALETTES: ColorPalette[] = [
  {
    name: 'Candy Colors (Tons Pastéis)',
    colors: ['#FFE5EC', '#FFF0F5', '#E8F0FE', '#E6F4EA', '#FEF7E0', '#F3E8FD', '#FFF8E7'],
  },
  {
    name: 'Princesa & Realeza',
    colors: ['#FCE4EC', '#F8BBD0', '#E1BEE7', '#F3E5F5', '#FFF9C4', '#FFFDE7', '#F5EEF8'],
  },
  {
    name: 'Safari & Aventura',
    colors: ['#E8F5E9', '#C8E6C9', '#FFF3E0', '#FFE0B2', '#D7CCC8', '#EFEBE9', '#DCEDC8'],
  },
  {
    name: 'Astronauta & Espaço',
    colors: ['#E1F5FE', '#B3E5FC', '#D1C4E9', '#ECEFF1', '#CFD8DC', '#E0F7FA', '#FFF9C4'],
  },
  {
    name: 'Jardim Encantado',
    colors: ['#F3E5F5', '#E1BEE7', '#E8F5E9', '#FFF8E1', '#FCE4EC', '#E0F2F1', '#FFFDE7'],
  },
  {
    name: 'Circo Mágico',
    colors: ['#FFEBEE', '#FFCDD2', '#FFF8E1', '#FFECB3', '#E3F2FD', '#BBDEFB', '#FFFFFF'],
  },
  {
    name: 'Dourado & Luxo',
    colors: ['#FEF9E7', '#FCF3CF', '#F9E79F', '#F7DC6F', '#FFF8DC', '#FAF0E6', '#FFFFFF'],
  },
  {
    name: 'Básicos & Neutros',
    colors: ['#FFFFFF', '#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#000000', '#1E293B'],
  },
];

export interface PatternPreset {
  id: string;
  name: string;
  category: string;
  svgDataUri: string;
}

// Generate crisp SVG patterns as Data URIs for instant paper textures!
function makePatternUri(svgInner: string, width = 40, height = 40, bgColor = '#ffffff'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="${bgColor}"/>${svgInner}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PAPER_PATTERNS: PatternPreset[] = [
  {
    id: 'poa_pink',
    name: 'Poá Rosa',
    category: 'Poá (Bolinhas)',
    svgDataUri: makePatternUri('<circle cx="15" cy="15" r="4.5" fill="#f472b6" opacity="0.8"/><circle cx="35" cy="35" r="4.5" fill="#f472b6" opacity="0.8"/>', 40, 40, '#fdf2f8'),
  },
  {
    id: 'poa_blue',
    name: 'Poá Azul Bebê',
    category: 'Poá (Bolinhas)',
    svgDataUri: makePatternUri('<circle cx="15" cy="15" r="4.5" fill="#60a5fa" opacity="0.8"/><circle cx="35" cy="35" r="4.5" fill="#60a5fa" opacity="0.8"/>', 40, 40, '#eff6ff'),
  },
  {
    id: 'poa_gold',
    name: 'Poá Dourado / Amarelo',
    category: 'Poá (Bolinhas)',
    svgDataUri: makePatternUri('<circle cx="15" cy="15" r="4.5" fill="#fbbf24" opacity="0.85"/><circle cx="35" cy="35" r="4.5" fill="#fbbf24" opacity="0.85"/>', 40, 40, '#fffbeb'),
  },
  {
    id: 'poa_mint',
    name: 'Poá Verde Menta',
    category: 'Poá (Bolinhas)',
    svgDataUri: makePatternUri('<circle cx="15" cy="15" r="4.5" fill="#34d399" opacity="0.8"/><circle cx="35" cy="35" r="4.5" fill="#34d399" opacity="0.8"/>', 40, 40, '#ecfdf5'),
  },
  {
    id: 'stripes_pink',
    name: 'Listras Rosa Claro',
    category: 'Listras',
    svgDataUri: makePatternUri('<rect x="0" y="0" width="15" height="40" fill="#fbcfe8"/><rect x="15" y="0" width="15" height="40" fill="#fdf2f8"/>', 30, 40, '#fdf2f8'),
  },
  {
    id: 'stripes_blue',
    name: 'Listras Azul Bebê',
    category: 'Listras',
    svgDataUri: makePatternUri('<rect x="0" y="0" width="15" height="40" fill="#bfdbfe"/><rect x="15" y="0" width="15" height="40" fill="#eff6ff"/>', 30, 40, '#eff6ff'),
  },
  {
    id: 'stripes_gold',
    name: 'Listras Douradas',
    category: 'Listras',
    svgDataUri: makePatternUri('<rect x="0" y="0" width="14" height="40" fill="#fde68a"/><rect x="14" y="0" width="14" height="40" fill="#fffbeb"/>', 28, 40, '#fffbeb'),
  },
  {
    id: 'stars_gold',
    name: 'Estrelinhas Douradas',
    category: 'Formas',
    svgDataUri: makePatternUri(
      '<path d="M15 6 l2 5 h5 l-4 3 l1.5 5 l-4.5 -3.5 l-4.5 3.5 l1.5 -5 l-4 -3 h5 z" fill="#f59e0b" opacity="0.85"/>' +
      '<path d="M35 24 l1.5 4 h4 l-3 2.5 l1 4 l-3.5 -2.5 l-3.5 2.5 l1 -4 l-3 -2.5 h4 z" fill="#fbbf24" opacity="0.7"/>',
      40,
      40,
      '#fffbeb'
    ),
  },
  {
    id: 'hearts_pink',
    name: 'Coraçõezinhos',
    category: 'Formas',
    svgDataUri: makePatternUri(
      '<path d="M12 7 C10 4 6 5 6 9 C6 13 12 17 12 17 C12 17 18 13 18 9 C18 5 14 4 12 7 Z" fill="#ec4899" opacity="0.75"/>' +
      '<path d="M32 27 C30 24 26 25 26 29 C26 33 32 37 32 37 C32 37 38 33 38 29 C38 25 34 24 32 27 Z" fill="#f472b6" opacity="0.7"/>',
      40,
      40,
      '#fff1f2'
    ),
  },
  {
    id: 'clouds_sky',
    name: 'Nuvens Fofas',
    category: 'Infantil',
    svgDataUri: makePatternUri(
      '<path d="M10 20 a4 4 0 0 1 8 0 a5 5 0 0 1 8 0 a3 3 0 0 1 0 6 h-16 a3 3 0 0 1 0 -6 z" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>',
      50,
      40,
      '#e0f2fe'
    ),
  },
  {
    id: 'castle_bricks',
    name: 'Tijolinhos de Castelo',
    category: 'Castelo & Realeza',
    svgDataUri: makePatternUri(
      '<rect x="2" y="2" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="22" y="2" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="12" y="12" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="-8" y="12" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="32" y="12" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="2" y="22" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>' +
      '<rect x="22" y="22" width="16" height="8" rx="1.5" fill="#fbcfe8" stroke="#f472b6" stroke-width="1"/>',
      40,
      32,
      '#fdf2f8'
    ),
  },
];

export interface ClipartPreset {
  id: string;
  name: string;
  category: string;
  dataUri: string;
  defaultWidth: number;
  defaultHeight: number;
}

function makeClipartUri(svgInner: string, width = 120, height = 120, viewBox = '0 0 120 120'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">${svgInner}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CLIPARTS: ClipartPreset[] = [
  {
    id: 'crown_gold',
    name: 'Coroa da Princesa / Príncipe',
    category: 'Realeza',
    defaultWidth: 100,
    defaultHeight: 70,
    dataUri: makeClipartUri(`
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCE881" />
          <stop offset="50%" stop-color="#F5B041" />
          <stop offset="100%" stop-color="#D4AC0D" />
        </linearGradient>
      </defs>
      <path d="M 15 85 L 15 35 L 35 60 L 60 20 L 85 60 L 105 35 L 105 85 Z" fill="url(#goldGrad)" stroke="#B7950B" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="15" cy="30" r="5" fill="#E74C3C" stroke="#fff" stroke-width="1.5"/>
      <circle cx="60" cy="15" r="6" fill="#E74C3C" stroke="#fff" stroke-width="1.5"/>
      <circle cx="105" cy="30" r="5" fill="#E74C3C" stroke="#fff" stroke-width="1.5"/>
      <circle cx="35" cy="75" r="4" fill="#3498DB"/>
      <circle cx="60" cy="75" r="5" fill="#2ECC71"/>
      <circle cx="85" cy="75" r="4" fill="#9B59B6"/>
      <rect x="12" y="85" width="96" height="12" rx="4" fill="url(#goldGrad)" stroke="#B7950B" stroke-width="2"/>
    `),
  },
  {
    id: 'ribbon_bow',
    name: 'Laço Rosa Luxo',
    category: 'Laços',
    defaultWidth: 110,
    defaultHeight: 80,
    dataUri: makeClipartUri(`
      <defs>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F48FB1" />
          <stop offset="100%" stop-color="#C2185B" />
        </linearGradient>
      </defs>
      <path d="M 60 50 C 40 10, 10 20, 15 50 C 10 75, 40 70, 60 55 Z" fill="url(#pinkGrad)" stroke="#880E4F" stroke-width="2"/>
      <path d="M 60 50 C 80 10, 110 20, 105 50 C 110 75, 80 70, 60 55 Z" fill="url(#pinkGrad)" stroke="#880E4F" stroke-width="2"/>
      <path d="M 52 55 Q 40 85 25 105 Q 45 95 55 70 Z" fill="url(#pinkGrad)" stroke="#880E4F" stroke-width="1.5"/>
      <path d="M 68 55 Q 80 85 95 105 Q 75 95 65 70 Z" fill="url(#pinkGrad)" stroke="#880E4F" stroke-width="1.5"/>
      <ellipse cx="60" cy="52" rx="12" ry="10" fill="#FF80AB" stroke="#880E4F" stroke-width="2"/>
      <ellipse cx="60" cy="52" rx="6" ry="5" fill="#FCE4EC"/>
    `),
  },
  {
    id: 'balloons_trio',
    name: 'Balões Festivos',
    category: 'Festa',
    defaultWidth: 100,
    defaultHeight: 120,
    dataUri: makeClipartUri(`
      <path d="M 40 50 Q 55 80 50 115" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <path d="M 65 40 Q 60 75 50 115" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <path d="M 80 55 Q 65 85 50 115" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <!-- Balão 1 Rosa -->
      <ellipse cx="40" cy="45" rx="20" ry="25" fill="#F472B6" stroke="#DB2777" stroke-width="1.5"/>
      <polygon points="38,70 42,70 40,73" fill="#DB2777"/>
      <!-- Balão 2 Amarelo -->
      <ellipse cx="65" cy="35" rx="22" ry="27" fill="#FBBF24" stroke="#D97706" stroke-width="1.5"/>
      <polygon points="63,62 67,62 65,65" fill="#D97706"/>
      <!-- Balão 3 Azul -->
      <ellipse cx="80" cy="52" rx="18" ry="23" fill="#60A5FA" stroke="#2563EB" stroke-width="1.5"/>
      <polygon points="78,75 82,75 80,78" fill="#2563EB"/>
    `),
  },
  {
    id: 'frame_scallop',
    name: 'Moldura Escalopada / Tag',
    category: 'Molduras',
    defaultWidth: 120,
    defaultHeight: 120,
    dataUri: makeClipartUri(`
      <circle cx="60" cy="60" r="52" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3" stroke-dasharray="10 4"/>
      <circle cx="60" cy="60" r="44" fill="#FFFFFF" stroke="#F59E0B" stroke-width="1.5"/>
      <text x="60" y="65" font-family="Fredoka, sans-serif" font-size="12" font-weight="bold" fill="#D97706" text-anchor="middle">SUA ARTE</text>
    `),
  },
  {
    id: 'tag_obrigado',
    name: 'Selo "Obrigado pela Presença"',
    category: 'Tags',
    defaultWidth: 110,
    defaultHeight: 110,
    dataUri: makeClipartUri(`
      <circle cx="60" cy="60" r="54" fill="#FDF2F8" stroke="#EC4899" stroke-width="3"/>
      <circle cx="60" cy="60" r="46" fill="#FFFFFF" stroke="#F472B6" stroke-width="1" stroke-dasharray="3 3"/>
      <text x="60" y="52" font-family="Pacifico, cursive" font-size="14" fill="#DB2777" text-anchor="middle">Obrigado</text>
      <text x="60" y="68" font-family="Fredoka, sans-serif" font-size="10" font-weight="bold" fill="#9D174D" text-anchor="middle">PELA PRESENÇA!</text>
      <circle cx="60" cy="77" r="2.5" fill="#EC4899"/>
    `),
  },
  {
    id: 'butterfly_magic',
    name: 'Borboleta Delicada',
    category: 'Jardim',
    defaultWidth: 90,
    defaultHeight: 70,
    dataUri: makeClipartUri(`
      <ellipse cx="60" cy="60" rx="3" ry="18" fill="#5B21B6"/>
      <path d="M 58 50 C 35 15, 10 30, 20 60 C 30 75, 55 65, 58 55 Z" fill="#C084FC" stroke="#7E22CE" stroke-width="1.5"/>
      <path d="M 62 50 C 85 15, 110 30, 100 60 C 90 75, 65 65, 62 55 Z" fill="#C084FC" stroke="#7E22CE" stroke-width="1.5"/>
      <path d="M 58 60 C 40 70, 25 85, 35 98 C 45 105, 55 85, 58 65 Z" fill="#E879F9" stroke="#A21CAF" stroke-width="1.5"/>
      <path d="M 62 60 C 80 70, 95 85, 85 98 C 75 105, 65 85, 62 65 Z" fill="#E879F9" stroke="#A21CAF" stroke-width="1.5"/>
      <circle cx="56" cy="40" r="1.5" fill="#4C1D95"/>
      <circle cx="64" cy="40" r="1.5" fill="#4C1D95"/>
    `),
  },
  {
    id: 'floral_branch',
    name: 'Raminho de Folhas',
    category: 'Jardim',
    defaultWidth: 100,
    defaultHeight: 60,
    dataUri: makeClipartUri(`
      <path d="M 15 80 Q 55 50 105 30" stroke="#15803D" stroke-width="2.5" fill="none"/>
      <ellipse cx="35" cy="60" rx="10" ry="6" fill="#4ADE80" stroke="#16A34A" transform="rotate(-30 35 60)"/>
      <ellipse cx="55" cy="48" rx="12" ry="7" fill="#22C55E" stroke="#15803D" transform="rotate(35 55 48)"/>
      <ellipse cx="75" cy="38" rx="11" ry="6" fill="#4ADE80" stroke="#16A34A" transform="rotate(-25 75 38)"/>
      <ellipse cx="95" cy="30" rx="10" ry="5" fill="#86EFAC" stroke="#16A34A" transform="rotate(20 95 30)"/>
    `),
  },
  {
    id: 'castle_mini',
    name: 'Castelo Encantado',
    category: 'Castelo',
    defaultWidth: 110,
    defaultHeight: 110,
    dataUri: makeClipartUri(`
      <defs>
        <linearGradient id="cPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FCE7F3"/>
          <stop offset="100%" stop-color="#F472B6"/>
        </linearGradient>
        <linearGradient id="cRoof" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E879F9"/>
          <stop offset="100%" stop-color="#A21CAF"/>
        </linearGradient>
      </defs>
      <!-- Base wall -->
      <rect x="25" y="45" width="70" height="60" rx="4" fill="url(#cPink)" stroke="#DB2777" stroke-width="2"/>
      <!-- Battlements -->
      <rect x="25" y="38" width="14" height="10" fill="url(#cPink)" stroke="#DB2777" stroke-width="1.5"/>
      <rect x="53" y="38" width="14" height="10" fill="url(#cPink)" stroke="#DB2777" stroke-width="1.5"/>
      <rect x="81" y="38" width="14" height="10" fill="url(#cPink)" stroke="#DB2777" stroke-width="1.5"/>
      <!-- Left Tower Cone Roof -->
      <polygon points="15,45 35,45 25,12" fill="url(#cRoof)" stroke="#701A75" stroke-width="2"/>
      <!-- Right Tower Cone Roof -->
      <polygon points="85,45 105,45 95,12" fill="url(#cRoof)" stroke="#701A75" stroke-width="2"/>
      <!-- Center Grand Tower -->
      <polygon points="45,38 75,38 60,2" fill="url(#cRoof)" stroke="#701A75" stroke-width="2"/>
      <line x1="60" y1="2" x2="60" y2="-4" stroke="#F59E0B" stroke-width="2"/>
      <polygon points="60,-4 70,-1 60,2" fill="#F59E0B"/>
      <!-- Gate -->
      <path d="M 48 105 L 48 78 Q 60 66 72 78 L 72 105 Z" fill="#9D174D" stroke="#701A75" stroke-width="2"/>
      <circle cx="66" cy="92" r="2" fill="#FDE047"/>
    `),
  },
  {
    id: 'castle_gate_arch',
    name: 'Portal Real com Flores',
    category: 'Castelo',
    defaultWidth: 100,
    defaultHeight: 110,
    dataUri: makeClipartUri(`
      <path d="M 20 105 L 20 50 Q 60 10 100 50 L 100 105" fill="none" stroke="#F59E0B" stroke-width="5"/>
      <path d="M 26 105 L 26 53 Q 60 20 94 53 L 94 105" fill="none" stroke="#FDE68A" stroke-width="2" stroke-dasharray="4 3"/>
      <!-- Roses on arch -->
      <circle cx="20" cy="50" r="7" fill="#F43F5E"/>
      <circle cx="60" cy="18" r="8" fill="#F43F5E"/>
      <circle cx="100" cy="50" r="7" fill="#F43F5E"/>
      <circle cx="20" cy="50" r="3" fill="#FFE4E6"/>
      <circle cx="60" cy="18" r="3.5" fill="#FFE4E6"/>
      <circle cx="100" cy="50" r="3" fill="#FFE4E6"/>
    `),
  },
];

export const AVAILABLE_FONTS = [
  { name: 'Fredoka', label: 'Fredoka (Infantil & Arredondada)', category: 'Infantil' },
  { name: 'Pacifico', label: 'Pacifico (Cursiva Festiva)', category: 'Cursiva' },
  { name: 'Baloo 2', label: 'Baloo 2 (Fofa & Alegre)', category: 'Infantil' },
  { name: 'Chewy', label: 'Chewy (Divertida & Desenho)', category: 'Divertida' },
  { name: 'Dancing Script', label: 'Dancing Script (Elegante)', category: 'Caligrafia' },
  { name: 'Poppins', label: 'Poppins (Moderna & Clean)', category: 'Moderna' },
  { name: 'Montserrat', label: 'Montserrat (Marcante & Sofisticada)', category: 'Moderna' },
];

export const TEXT_PRESETS = [
  { text: 'Princesa Sophia', subtitle: 'Castelo Real • 1 Aninho', font: 'Pacifico', color: '#BE185D', stroke: '#FFFFFF' },
  { text: 'Maria Clara', subtitle: '5 Anos', font: 'Pacifico', color: '#DB2777', stroke: '#FFFFFF' },
  { text: 'Arthur', subtitle: '1 Aninho', font: 'Fredoka', color: '#2563EB', stroke: '#FFFFFF' },
  { text: 'Obrigado pela presença!', subtitle: 'Com carinho', font: 'Dancing Script', color: '#B45309', stroke: '#FEF3C7' },
  { text: 'Meu Chá de Bebê', subtitle: 'Bem-vindo!', font: 'Baloo 2', color: '#059669', stroke: '#ECFDF5' },
  { text: '15 Anos', subtitle: 'Uma noite inesquecível', font: 'Montserrat', color: '#C026D3', stroke: '#FDF4FF' },
];
