import { BoxTemplate, Point, BoxPanel, BoxModelId } from '../types/box';

function getBoundingBox(points: Point[]) {
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function computeCenter(points: Point[]): Point {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  return {
    x: Math.round(sum.x / points.length),
    y: Math.round(sum.y / points.length),
  };
}

function createPanel(
  id: string,
  name: string,
  shortName: string,
  type: BoxPanel['type'],
  points: Point[],
  description?: string,
  customCenter?: Point
): BoxPanel {
  return {
    id,
    name,
    shortName,
    type,
    points,
    center: customCenter || computeCenter(points),
    boundingBox: getBoundingBox(points),
    description,
    isCustomizable: type !== 'glue_tab',
  };
}

// ----------------------------------------------------
// 1. CAIXA MILK (A queridinha da papelaria personalizada!)
// ----------------------------------------------------
// Virtual Canvas: 1000 x 740 (A4 Paisagem proporção)
// 4 faces principais de 200px cada + aba lateral de 50px = 850px de largura
// Altura: Topo telhado (170px) + Corpo principal (270px) + Fundo (180px) = 620px
const milkPanels: BoxPanel[] = [
  // Aba de colagem lateral
  createPanel(
    'milk_glue_side',
    'Aba de Colagem Lateral',
    'Aba Colagem',
    'glue_tab',
    [
      { x: 50, y: 260 },
      { x: 100, y: 260 },
      { x: 100, y: 530 },
      { x: 50, y: 530 },
      { x: 40, y: 490 },
      { x: 40, y: 300 },
    ],
    'Aba interna para colar a lateral da caixinha'
  ),

  // Face 1: Lateral Esquerda
  createPanel(
    'milk_face_left',
    'Lateral Esquerda',
    'Lat. Esquerda',
    'main_face',
    [
      { x: 100, y: 260 },
      { x: 300, y: 260 },
      { x: 300, y: 530 },
      { x: 100, y: 530 },
    ],
    'Lado esquerdo da caixa milk (200 x 270 px)'
  ),

  // Face 2: Frente (Principal)
  createPanel(
    'milk_face_front',
    'Frente (Principal)',
    'Frente',
    'main_face',
    [
      { x: 300, y: 260 },
      { x: 500, y: 260 },
      { x: 500, y: 530 },
      { x: 300, y: 530 },
    ],
    'Face frontal da caixa milk - destaque para fotos e nomes'
  ),

  // Face 3: Lateral Direita
  createPanel(
    'milk_face_right',
    'Lateral Direita',
    'Lat. Direita',
    'main_face',
    [
      { x: 500, y: 260 },
      { x: 700, y: 260 },
      { x: 700, y: 530 },
      { x: 500, y: 530 },
    ],
    'Lado direito da caixa milk (200 x 270 px)'
  ),

  // Face 4: Verso / Costas
  createPanel(
    'milk_face_back',
    'Verso (Costas)',
    'Verso',
    'main_face',
    [
      { x: 700, y: 260 },
      { x: 900, y: 260 },
      { x: 900, y: 530 },
      { x: 700, y: 530 },
    ],
    'Parte traseira da caixa milk - ideal para agradecimentos e data'
  ),

  // Topos / Telhados
  createPanel(
    'milk_roof_left',
    'Telhado / Topo Esquerdo (Vinco)',
    'Topo Esq.',
    'roof',
    [
      { x: 100, y: 90 },
      { x: 300, y: 90 },
      { x: 300, y: 260 },
      { x: 100, y: 260 },
    ],
    'Parte superior dobrável com vinco triangular da caixinha milk'
  ),

  createPanel(
    'milk_roof_front',
    'Telhado / Topo Frente',
    'Topo Frente',
    'roof',
    [
      { x: 300, y: 90 },
      { x: 500, y: 90 },
      { x: 500, y: 260 },
      { x: 300, y: 260 },
    ],
    'Topo frontal onde fica o laço de cetim'
  ),

  createPanel(
    'milk_roof_right',
    'Telhado / Topo Direito (Vinco)',
    'Topo Dir.',
    'roof',
    [
      { x: 500, y: 90 },
      { x: 700, y: 90 },
      { x: 700, y: 260 },
      { x: 500, y: 260 },
    ],
    'Parte superior dobrável com vinco triangular da caixinha milk'
  ),

  createPanel(
    'milk_roof_back',
    'Telhado / Topo Verso',
    'Topo Verso',
    'roof',
    [
      { x: 700, y: 90 },
      { x: 900, y: 90 },
      { x: 900, y: 260 },
      { x: 700, y: 260 },
    ],
    'Topo traseiro da caixa milk'
  ),

  // Fundo (Abas inferiores)
  createPanel(
    'milk_bottom_1',
    'Aba Fundo 1 (Esq)',
    'Fundo 1',
    'bottom',
    [
      { x: 100, y: 530 },
      { x: 300, y: 530 },
      { x: 280, y: 650 },
      { x: 120, y: 650 },
    ],
    'Aba inferior esquerda do fundo de encaixe/colagem'
  ),

  createPanel(
    'milk_bottom_front',
    'Aba Fundo 2 (Frente)',
    'Fundo Frente',
    'bottom',
    [
      { x: 300, y: 530 },
      { x: 500, y: 530 },
      { x: 480, y: 660 },
      { x: 320, y: 660 },
    ],
    'Aba inferior frontal'
  ),

  createPanel(
    'milk_bottom_3',
    'Aba Fundo 3 (Dir)',
    'Fundo 3',
    'bottom',
    [
      { x: 500, y: 530 },
      { x: 700, y: 530 },
      { x: 680, y: 650 },
      { x: 520, y: 650 },
    ],
    'Aba inferior direita'
  ),

  createPanel(
    'milk_bottom_back',
    'Aba Fundo 4 (Verso)',
    'Fundo Verso',
    'bottom',
    [
      { x: 700, y: 530 },
      { x: 900, y: 530 },
      { x: 880, y: 660 },
      { x: 720, y: 660 },
    ],
    'Aba inferior traseira'
  ),
];

export const CAIXA_MILK_TEMPLATE: BoxTemplate = {
  id: 'milk',
  name: 'Caixa Milk',
  subtitle: 'O clássico mais amado da papelaria de festas',
  description: 'Molde completo com 4 faces principais, telhado com vincos para laço e abas de fechamento do fundo.',
  widthMm: 65,
  heightMm: 130,
  depthMm: 65,
  canvasWidth: 1000,
  canvasHeight: 740,
  sheetFormat: 'A4 Paisagem',
  recommendedPaper: 'Papel Fotográfico Matte ou Glossy 180g / 230g ou Offset 180g',
  panels: milkPanels,
  cutLines: [
    // Contorno externo total de corte
    {
      id: 'milk_cut_outer',
      type: 'cut',
      d: `
        M 100 90
        L 900 90
        L 900 260
        L 900 530
        L 880 660
        L 720 660
        L 700 530
        L 680 650
        L 520 650
        L 500 530
        L 480 660
        L 320 660
        L 300 530
        L 280 650
        L 120 650
        L 100 530
        L 50 530
        L 40 490
        L 40 300
        L 50 260
        L 100 260
        Z
      `,
    },
    // Fendas de corte entre as abas inferiores
    { id: 'milk_cut_bottom_slit_1', type: 'cut', d: 'M 300 530 L 300 560' },
    { id: 'milk_cut_bottom_slit_2', type: 'cut', d: 'M 500 530 L 500 560' },
    { id: 'milk_cut_bottom_slit_3', type: 'cut', d: 'M 700 530 L 700 560' },
  ],
  creaseLines: [
    // Linha de vinco horizontal superior (separa telhado do corpo)
    { id: 'crease_top', type: 'crease', d: 'M 100 260 L 900 260' },
    // Linha de vinco horizontal do fechamento superior do topo
    { id: 'crease_roof_lip', type: 'crease', d: 'M 100 150 L 900 150' },
    // Vincos triangulares da caixa milk nos lados 1 e 3 (laterais que dobram para dentro)
    { id: 'crease_triangle_left_1', type: 'crease', d: 'M 100 260 L 200 150' },
    { id: 'crease_triangle_left_2', type: 'crease', d: 'M 300 260 L 200 150' },
    { id: 'crease_triangle_left_center', type: 'crease', d: 'M 200 150 L 200 90' },
    { id: 'crease_triangle_right_1', type: 'crease', d: 'M 500 260 L 600 150' },
    { id: 'crease_triangle_right_2', type: 'crease', d: 'M 700 260 L 600 150' },
    { id: 'crease_triangle_right_center', type: 'crease', d: 'M 600 150 L 600 90' },
    // Linhas verticais entre as 4 faces
    { id: 'crease_v_glue', type: 'crease', d: 'M 100 260 L 100 530' },
    { id: 'crease_v1', type: 'crease', d: 'M 300 90 L 300 530' },
    { id: 'crease_v2', type: 'crease', d: 'M 500 90 L 500 530' },
    { id: 'crease_v3', type: 'crease', d: 'M 700 90 L 700 530' },
    // Linha horizontal inferior (separa corpo do fundo)
    { id: 'crease_bottom', type: 'crease', d: 'M 100 530 L 900 530' },
  ],
  specialMarkings: [
    // Furos para passar a fita/laço de cetim
    { type: 'circle', cx: 370, cy: 120, r: 4 },
    { type: 'circle', cx: 430, cy: 120, r: 4 },
    { type: 'circle', cx: 770, cy: 120, r: 4 },
    { type: 'circle', cx: 830, cy: 120, r: 4 },
  ],
};

// ----------------------------------------------------
// 2. CAIXA PIRÂMIDE / CONE (MOLDE PERFEITO: TRIÂNGULOS ISÓSCELES COM ÁPICE CENTRALIZADO NO MEIO DA BASE!)
// ----------------------------------------------------
// Cada face é um triângulo isósceles exato (lados iguais e ápice centralizado na direção do meio da base)
// Quando montada, a pirâmide fica 100% reta, alinhada e perfeitamente equilibrada!
// Virtual Canvas: 850 x 950 (A4 Retrato)
const piramidePanels: BoxPanel[] = [
  // Face 1 (Lateral Esquerda)
  createPanel(
    'pyr_face_1',
    'Face 1 (Lateral Esquerda)',
    'Face 1',
    'main_face',
    [
      { x: 400, y: 70 },
      { x: 138, y: 617 },
      { x: 310, y: 670 },
    ],
    'Primeira face triangular isósceles da pirâmide',
    { x: 283, y: 452 }
  ),

  // Face 2 (Frente Principal) - Base horizontal perfeita e ápice centralizado
  createPanel(
    'pyr_face_2',
    'Face 2 (Frente Principal)',
    'Frente (Face 2)',
    'main_face',
    [
      { x: 400, y: 70 },
      { x: 310, y: 670 },
      { x: 490, y: 670 },
    ],
    'Face frontal da pirâmide - perfeitamente centralizada e reta para fotos e nome',
    { x: 400, y: 470 }
  ),

  // Face 3 (Lateral Direita)
  createPanel(
    'pyr_face_3',
    'Face 3 (Lateral Direita)',
    'Face 3',
    'main_face',
    [
      { x: 400, y: 70 },
      { x: 490, y: 670 },
      { x: 662, y: 617 },
    ],
    'Terceira face triangular isósceles da pirâmide',
    { x: 517, y: 452 }
  ),

  // Face 4 (Verso / Costas)
  createPanel(
    'pyr_face_4',
    'Face 4 (Verso / Costas)',
    'Verso (Face 4)',
    'main_face',
    [
      { x: 400, y: 70 },
      { x: 662, y: 617 },
      { x: 811, y: 516 },
    ],
    'Quarta face triangular isósceles da pirâmide',
    { x: 624, y: 401 }
  ),

  // Aba lateral de colagem (ao longo da Face 1)
  createPanel(
    'pyr_glue_side',
    'Aba de Colagem Lateral',
    'Aba Colagem',
    'glue_tab',
    [
      { x: 400, y: 70 },
      { x: 354, y: 93 },
      { x: 102, y: 600 },
      { x: 138, y: 617 },
    ],
    'Aba lateral para colagem e fechamento da pirâmide'
  ),

  // Fundo Quadrado articulado (sob a Face 2)
  createPanel(
    'pyr_bottom_base',
    'Fundo (Base Quadrada)',
    'Base / Fundo',
    'bottom',
    [
      { x: 310, y: 670 },
      { x: 490, y: 670 },
      { x: 490, y: 850 },
      { x: 310, y: 850 },
    ],
    'Base quadrada perfeitamente reta (180 x 180 px)'
  ),

  // Aba de encaixe/trava do fundo
  createPanel(
    'pyr_bottom_flap',
    'Aba de Trava do Fundo',
    'Aba Trava',
    'flap',
    [
      { x: 310, y: 850 },
      { x: 340, y: 890 },
      { x: 460, y: 890 },
      { x: 490, y: 850 },
    ],
    'Aba de encaixe do fundo'
  ),

  // Aba de apoio inferior esquerda (sob a Face 1)
  createPanel(
    'pyr_bottom_wing_left',
    'Aba Inferior Esquerda',
    'Aba Esq',
    'flap',
    [
      { x: 138, y: 617 },
      { x: 142, y: 655 },
      { x: 285, y: 699 },
      { x: 310, y: 670 },
    ],
    'Aba de apoio da base'
  ),

  // Aba de apoio inferior direita (sob a Face 3)
  createPanel(
    'pyr_bottom_wing_right',
    'Aba Inferior Direita',
    'Aba Dir',
    'flap',
    [
      { x: 490, y: 670 },
      { x: 515, y: 699 },
      { x: 658, y: 655 },
      { x: 662, y: 617 },
    ],
    'Aba de apoio da base'
  ),

  // Aba de apoio inferior verso (sob a Face 4)
  createPanel(
    'pyr_bottom_wing_back',
    'Aba Inferior Verso',
    'Aba Verso',
    'flap',
    [
      { x: 662, y: 617 },
      { x: 694, y: 638 },
      { x: 818, y: 553 },
      { x: 811, y: 516 },
    ],
    'Aba de apoio da base verso'
  ),
];

export const CAIXA_PIRAMIDE_TEMPLATE: BoxTemplate = {
  id: 'piramide',
  name: 'Caixa Pirâmide (Cone)',
  subtitle: 'Ápice centralizado e faces perfeitamente retas',
  description: 'Molde em pirâmide reta de base quadrada com 4 triângulos isósceles idênticos, ápice perfeitamente centralizado no meio da base e abas de encaixe.',
  widthMm: 65,
  heightMm: 160,
  depthMm: 65,
  canvasWidth: 850,
  canvasHeight: 950,
  sheetFormat: 'A4 Retrato',
  recommendedPaper: 'Papel Fotográfico Matte ou Glossy 180g / 230g ou Offset 180g',
  panels: piramidePanels,
  cutLines: [
    // Contorno externo contínuo e perfeito de corte
    {
      id: 'pyr_cut_outer',
      type: 'cut',
      d: `
        M 400 70
        L 354 93
        L 102 600
        L 138 617
        L 142 655
        L 285 699
        L 310 670
        L 310 850
        L 340 890
        L 460 890
        L 490 850
        L 490 670
        L 515 699
        L 658 655
        L 662 617
        L 694 638
        L 818 553
        L 811 516
        L 400 70
        Z
      `,
    },
    // Fendas de corte entre as abas inferiores
    { id: 'pyr_cut_slit_1', type: 'cut', d: 'M 310 670 L 305 690' },
    { id: 'pyr_cut_slit_2', type: 'cut', d: 'M 490 670 L 495 690' },
    { id: 'pyr_cut_slit_3', type: 'cut', d: 'M 662 617 L 675 635' },
  ],
  creaseLines: [
    // Vincos entre as 4 faces triangulares saindo do ápice central
    { id: 'pyr_crease_glue', type: 'crease', d: 'M 400 70 L 138 617' },
    { id: 'pyr_crease_face1_face2', type: 'crease', d: 'M 400 70 L 310 670' },
    { id: 'pyr_crease_face2_face3', type: 'crease', d: 'M 400 70 L 490 670' },
    { id: 'pyr_crease_face3_face4', type: 'crease', d: 'M 400 70 L 662 617' },
    // Vincos das bases das faces
    { id: 'pyr_crease_base_face1', type: 'crease', d: 'M 138 617 L 310 670' },
    { id: 'pyr_crease_base_face2', type: 'crease', d: 'M 310 670 L 490 670' },
    { id: 'pyr_crease_base_face3', type: 'crease', d: 'M 490 670 L 662 617' },
    { id: 'pyr_crease_base_face4', type: 'crease', d: 'M 662 617 L 811 516' },
    // Vinco da aba de trava do fundo
    { id: 'pyr_crease_bottom_flap', type: 'crease', d: 'M 310 850 L 490 850' },
  ],
};

// ----------------------------------------------------
// 3. CAIXA SUSHI (Outro grande sucesso em festas infantis)
// ----------------------------------------------------
const sushiPanels: BoxPanel[] = [
  createPanel('sushi_glue', 'Aba Colagem', 'Aba', 'glue_tab', [
    { x: 70, y: 220 },
    { x: 120, y: 220 },
    { x: 140, y: 520 },
    { x: 90, y: 520 },
  ]),
  createPanel('sushi_face_1', 'Lateral Esquerda', 'Lat. Esq.', 'main_face', [
    { x: 120, y: 220 },
    { x: 300, y: 220 },
    { x: 280, y: 520 },
    { x: 140, y: 520 },
  ]),
  createPanel('sushi_face_front', 'Frente', 'Frente', 'main_face', [
    { x: 300, y: 220 },
    { x: 480, y: 220 },
    { x: 460, y: 520 },
    { x: 280, y: 520 },
  ]),
  createPanel('sushi_face_right', 'Lateral Direita', 'Lat. Dir.', 'main_face', [
    { x: 480, y: 220 },
    { x: 660, y: 220 },
    { x: 640, y: 520 },
    { x: 460, y: 520 },
  ]),
  createPanel('sushi_face_back', 'Verso', 'Verso', 'main_face', [
    { x: 660, y: 220 },
    { x: 840, y: 220 },
    { x: 820, y: 520 },
    { x: 640, y: 520 },
  ]),
  createPanel('sushi_top_front', 'Alça / Topo Frente', 'Topo Frente', 'roof', [
    { x: 300, y: 220 },
    { x: 480, y: 220 },
    { x: 450, y: 110 },
    { x: 330, y: 110 },
  ]),
  createPanel('sushi_top_back', 'Alça / Topo Verso', 'Topo Verso', 'roof', [
    { x: 660, y: 220 },
    { x: 840, y: 220 },
    { x: 810, y: 110 },
    { x: 690, y: 110 },
  ]),
  createPanel('sushi_bottom', 'Fundo Encaixe', 'Fundo', 'bottom', [
    { x: 280, y: 520 },
    { x: 460, y: 520 },
    { x: 440, y: 640 },
    { x: 300, y: 640 },
  ]),
];

export const CAIXA_SUSHI_TEMPLATE: BoxTemplate = {
  id: 'sushi',
  name: 'Caixa Sushi',
  subtitle: 'Design trapezoidal charmoso para docinhos e mimos',
  description: 'Caixa com base cônica invertida e abas superiores decorativas de encaixe.',
  widthMm: 70,
  heightMm: 75,
  depthMm: 60,
  canvasWidth: 950,
  canvasHeight: 700,
  sheetFormat: 'A4 Paisagem',
  recommendedPaper: 'Papel Fotográfico Matte ou Glossy 180g / 230g',
  panels: sushiPanels,
  cutLines: [
    {
      id: 'sushi_cut',
      type: 'cut',
      d: `
        M 120 220
        L 300 220
        L 330 110
        L 450 110
        L 480 220
        L 660 220
        L 690 110
        L 810 110
        L 840 220
        L 820 520
        L 640 520
        L 460 520
        L 440 640
        L 300 640
        L 280 520
        L 140 520
        L 90 520
        L 70 220
        Z
      `,
    },
  ],
  creaseLines: [
    { id: 'sushi_c_top', type: 'crease', d: 'M 120 220 L 840 220' },
    { id: 'sushi_c_bottom', type: 'crease', d: 'M 140 520 L 820 520' },
    { id: 'sushi_c_v1', type: 'crease', d: 'M 120 220 L 140 520' },
    { id: 'sushi_c_v2', type: 'crease', d: 'M 300 220 L 280 520' },
    { id: 'sushi_c_v3', type: 'crease', d: 'M 480 220 L 460 520' },
    { id: 'sushi_c_v4', type: 'crease', d: 'M 660 220 L 640 520' },
  ],
};

// ----------------------------------------------------
// 4. CAIXA BALA (Formato de bombom com lacinhos nas pontas)
// ----------------------------------------------------
const balaPanels: BoxPanel[] = [
  createPanel('bala_glue', 'Aba Colagem', 'Aba', 'glue_tab', [
    { x: 100, y: 70 },
    { x: 850, y: 70 },
    { x: 850, y: 110 },
    { x: 100, y: 110 },
  ]),
  createPanel('bala_face_1', 'Face 1 (Superior)', 'Face 1', 'main_face', [
    { x: 300, y: 110 },
    { x: 650, y: 110 },
    { x: 650, y: 220 },
    { x: 300, y: 220 },
  ]),
  createPanel('bala_face_2', 'Face 2 (Frente)', 'Frente', 'main_face', [
    { x: 300, y: 220 },
    { x: 650, y: 220 },
    { x: 650, y: 330 },
    { x: 300, y: 330 },
  ]),
  createPanel('bala_face_3', 'Face 3 (Inferior)', 'Face 3', 'main_face', [
    { x: 300, y: 330 },
    { x: 650, y: 330 },
    { x: 650, y: 440 },
    { x: 300, y: 440 },
  ]),
  createPanel('bala_face_4', 'Face 4 (Verso)', 'Verso', 'main_face', [
    { x: 300, y: 440 },
    { x: 650, y: 440 },
    { x: 650, y: 550 },
    { x: 300, y: 550 },
  ]),
  createPanel('bala_wing_left', 'Lateral com Amarração (Esq)', 'Ponta Esq', 'flap', [
    { x: 100, y: 110 },
    { x: 300, y: 110 },
    { x: 300, y: 550 },
    { x: 100, y: 550 },
  ]),
  createPanel('bala_wing_right', 'Lateral com Amarração (Dir)', 'Ponta Dir', 'flap', [
    { x: 650, y: 110 },
    { x: 850, y: 110 },
    { x: 850, y: 550 },
    { x: 650, y: 550 },
  ]),
];

export const CAIXA_BALA_TEMPLATE: BoxTemplate = {
  id: 'bala',
  name: 'Caixa Bala (Bombom)',
  subtitle: 'Formato clássico de bala com amarração de fitas nas pontas',
  description: 'Caixa horizontal com corpo central de 4 faces e extremidades com vincos de amarração.',
  widthMm: 140,
  heightMm: 50,
  depthMm: 50,
  canvasWidth: 950,
  canvasHeight: 650,
  sheetFormat: 'A4 Paisagem',
  recommendedPaper: 'Papel Fotográfico Matte ou Glossy 180g / 230g',
  panels: balaPanels,
  cutLines: [
    {
      id: 'bala_cut',
      type: 'cut',
      d: 'M 100 70 L 850 70 L 850 550 L 100 550 Z',
    },
    // Diamantes de vinco nas pontas para fechar o laço da bala
    { id: 'bala_diamond_l1', type: 'cut', d: 'M 220 165 L 250 145 L 280 165 L 250 185 Z' },
    { id: 'bala_diamond_l2', type: 'cut', d: 'M 220 275 L 250 255 L 280 275 L 250 295 Z' },
    { id: 'bala_diamond_l3', type: 'cut', d: 'M 220 385 L 250 365 L 280 385 L 250 405 Z' },
    { id: 'bala_diamond_l4', type: 'cut', d: 'M 220 495 L 250 475 L 280 495 L 250 515 Z' },
    { id: 'bala_diamond_r1', type: 'cut', d: 'M 670 165 L 700 145 L 730 165 L 700 185 Z' },
    { id: 'bala_diamond_r2', type: 'cut', d: 'M 670 275 L 700 255 L 730 275 L 700 295 Z' },
    { id: 'bala_diamond_r3', type: 'cut', d: 'M 670 385 L 700 365 L 730 385 L 700 405 Z' },
    { id: 'bala_diamond_r4', type: 'cut', d: 'M 670 495 L 700 475 L 730 495 L 700 515 Z' },
  ],
  creaseLines: [
    { id: 'bala_c1', type: 'crease', d: 'M 100 110 L 850 110' },
    { id: 'bala_c2', type: 'crease', d: 'M 100 220 L 850 220' },
    { id: 'bala_c3', type: 'crease', d: 'M 100 330 L 850 330' },
    { id: 'bala_c4', type: 'crease', d: 'M 100 440 L 850 440' },
    { id: 'bala_c_vl', type: 'crease', d: 'M 300 110 L 300 550' },
    { id: 'bala_c_vr', type: 'crease', d: 'M 650 110 L 650 550' },
  ],
};

// ----------------------------------------------------
// 5. CAIXA CUBO (Cubo com tampa ou alça)
// ----------------------------------------------------
const cuboPanels: BoxPanel[] = [
  createPanel('cubo_glue', 'Aba Colagem', 'Aba', 'glue_tab', [
    { x: 50, y: 240 },
    { x: 100, y: 240 },
    { x: 100, y: 440 },
    { x: 50, y: 440 },
  ]),
  createPanel('cubo_face_1', 'Lateral Esquerda', 'Lat. Esq.', 'main_face', [
    { x: 100, y: 240 },
    { x: 300, y: 240 },
    { x: 300, y: 440 },
    { x: 100, y: 440 },
  ]),
  createPanel('cubo_face_front', 'Frente (Principal)', 'Frente', 'main_face', [
    { x: 300, y: 240 },
    { x: 500, y: 240 },
    { x: 500, y: 440 },
    { x: 300, y: 440 },
  ]),
  createPanel('cubo_face_right', 'Lateral Direita', 'Lat. Dir.', 'main_face', [
    { x: 500, y: 240 },
    { x: 700, y: 240 },
    { x: 700, y: 440 },
    { x: 500, y: 440 },
  ]),
  createPanel('cubo_face_back', 'Verso', 'Verso', 'main_face', [
    { x: 700, y: 240 },
    { x: 900, y: 240 },
    { x: 900, y: 440 },
    { x: 700, y: 440 },
  ]),
  createPanel('cubo_top', 'Tampa Superior', 'Tampa', 'roof', [
    { x: 300, y: 40 },
    { x: 500, y: 40 },
    { x: 500, y: 240 },
    { x: 300, y: 240 },
  ]),
  createPanel('cubo_bottom', 'Fundo', 'Fundo', 'bottom', [
    { x: 300, y: 440 },
    { x: 500, y: 440 },
    { x: 500, y: 640 },
    { x: 300, y: 640 },
  ]),
];

export const CAIXA_CUBO_TEMPLATE: BoxTemplate = {
  id: 'cubo',
  name: 'Caixa Cubo / Quadrada',
  subtitle: 'Molde em formato de cubo perfeito',
  description: 'Caixa versátil para sabonetes, brownies, docinhos e lembrancinhas quadradas.',
  widthMm: 60,
  heightMm: 60,
  depthMm: 60,
  canvasWidth: 960,
  canvasHeight: 700,
  sheetFormat: 'A4 Paisagem',
  recommendedPaper: 'Papel Fotográfico Matte ou Offset 180g / 240g',
  panels: cuboPanels,
  cutLines: [
    {
      id: 'cubo_cut',
      type: 'cut',
      d: `
        M 100 240
        L 300 240
        L 300 40
        L 500 40
        L 500 240
        L 900 240
        L 900 440
        L 500 440
        L 500 640
        L 300 640
        L 300 440
        L 100 440
        L 50 440
        L 50 240
        Z
      `,
    },
  ],
  creaseLines: [
    { id: 'cubo_c_top', type: 'crease', d: 'M 100 240 L 900 240' },
    { id: 'cubo_c_bottom', type: 'crease', d: 'M 100 440 L 900 440' },
    { id: 'cubo_c_v1', type: 'crease', d: 'M 100 240 L 100 440' },
    { id: 'cubo_c_v2', type: 'crease', d: 'M 300 240 L 300 440' },
    { id: 'cubo_c_v3', type: 'crease', d: 'M 500 240 L 500 440' },
    { id: 'cubo_c_v4', type: 'crease', d: 'M 700 240 L 700 440' },
  ],
};

// ----------------------------------------------------
// 6. CAIXA CASTELO (Molde horizontal com coroa contínua de 8 pontas e faces em pé!)
// ----------------------------------------------------
// Virtual Canvas: 1000 x 740 (A4 Paisagem)
// A caixinha é exibida na HORIZONTAL com as 4 faces em pé (Upright)
// Topo: Coroa contínua de 8 pontas triangulares sem interrupção de um lado ao outro
// Centro: 4 faces principais onde as fotos e textos ficam na orientação correta em pé
// Base: Abas de fechamento do fundo
const casteloPanels: BoxPanel[] = [
  // Aba de colagem lateral da face
  createPanel(
    'castelo_glue_side',
    'Aba de Colagem Lateral',
    'Aba Colagem',
    'glue_tab',
    [
      { x: 50, y: 240 },
      { x: 100, y: 240 },
      { x: 100, y: 510 },
      { x: 50, y: 510 },
      { x: 40, y: 470 },
      { x: 40, y: 280 },
    ],
    'Aba lateral interna para colagem da estrutura do castelo'
  ),

  // Aba de colagem lateral da coroa
  createPanel(
    'castelo_glue_crown',
    'Aba Colagem da Coroa',
    'Aba Coroa',
    'glue_tab',
    [
      { x: 70, y: 50 },
      { x: 100, y: 40 },
      { x: 100, y: 100 },
      { x: 70, y: 100 },
    ],
    'Aba para fechar a coroa circular no topo'
  ),

  // Face 1: Lateral Esquerda (Torre 1)
  createPanel(
    'castelo_face_1',
    'Lateral Esquerda (Torre 1)',
    'Lat. Esq.',
    'main_face',
    [
      { x: 100, y: 240 },
      { x: 300, y: 240 },
      { x: 300, y: 510 },
      { x: 100, y: 510 },
    ],
    'Parede lateral esquerda do castelo em pé (200 x 270 px)',
    { x: 200, y: 375 }
  ),

  // Face 2: Frente Principal / Fachada do Castelo
  createPanel(
    'castelo_face_2',
    'Frente Principal (Fachada)',
    'Frente',
    'main_face',
    [
      { x: 300, y: 240 },
      { x: 500, y: 240 },
      { x: 500, y: 510 },
      { x: 300, y: 510 },
    ],
    'Fachada frontal do castelo - ideal para portal real, nome e fotos em pé',
    { x: 400, y: 375 }
  ),

  // Face 3: Lateral Direita (Torre 3)
  createPanel(
    'castelo_face_3',
    'Lateral Direita (Torre 3)',
    'Lat. Dir.',
    'main_face',
    [
      { x: 500, y: 240 },
      { x: 700, y: 240 },
      { x: 700, y: 510 },
      { x: 500, y: 510 },
    ],
    'Parede lateral direita do castelo em pé (200 x 270 px)',
    { x: 600, y: 375 }
  ),

  // Face 4: Verso / Costas do Castelo
  createPanel(
    'castelo_face_4',
    'Verso / Costas do Castelo',
    'Verso',
    'main_face',
    [
      { x: 700, y: 240 },
      { x: 900, y: 240 },
      { x: 900, y: 510 },
      { x: 700, y: 510 },
    ],
    'Muralha traseira do castelo em pé - ótimo para data e agradecimentos',
    { x: 800, y: 375 }
  ),

  // Topos com Coroa Contínua e Vincos em Losango
  createPanel(
    'castelo_top_1',
    'Coroa e Pescoço da Lateral Esq',
    'Coroa Esq.',
    'roof',
    [
      { x: 100, y: 100 },
      { x: 150, y: 40 },
      { x: 200, y: 100 },
      { x: 250, y: 40 },
      { x: 300, y: 100 },
      { x: 240, y: 170 },
      { x: 300, y: 240 },
      { x: 100, y: 240 },
      { x: 160, y: 170 },
    ],
    'Parte superior com 2 pontas da coroa e vinco do pescoço',
    { x: 200, y: 140 }
  ),

  createPanel(
    'castelo_top_2',
    'Coroa e Pescoço da Frente',
    'Coroa Frente',
    'roof',
    [
      { x: 300, y: 100 },
      { x: 350, y: 40 },
      { x: 400, y: 100 },
      { x: 450, y: 40 },
      { x: 500, y: 100 },
      { x: 440, y: 170 },
      { x: 500, y: 240 },
      { x: 300, y: 240 },
      { x: 360, y: 170 },
    ],
    'Parte superior com 2 pontas da coroa e vinco do pescoço frontal',
    { x: 400, y: 140 }
  ),

  createPanel(
    'castelo_top_3',
    'Coroa e Pescoço da Lateral Dir',
    'Coroa Dir.',
    'roof',
    [
      { x: 500, y: 100 },
      { x: 550, y: 40 },
      { x: 600, y: 100 },
      { x: 650, y: 40 },
      { x: 700, y: 100 },
      { x: 640, y: 170 },
      { x: 700, y: 240 },
      { x: 500, y: 240 },
      { x: 560, y: 170 },
    ],
    'Parte superior com 2 pontas da coroa e vinco do pescoço direito',
    { x: 600, y: 140 }
  ),

  createPanel(
    'castelo_top_4',
    'Coroa e Pescoço do Verso',
    'Coroa Verso',
    'roof',
    [
      { x: 700, y: 100 },
      { x: 750, y: 40 },
      { x: 800, y: 100 },
      { x: 850, y: 40 },
      { x: 900, y: 100 },
      { x: 840, y: 170 },
      { x: 900, y: 240 },
      { x: 700, y: 240 },
      { x: 760, y: 170 },
    ],
    'Parte superior com 2 pontas da coroa e vinco do pescoço traseiro',
    { x: 800, y: 140 }
  ),

  // Abas do Fundo (Base Inferior)
  createPanel(
    'castelo_bottom_1',
    'Aba Fundo 1 (Retangular)',
    'Fundo 1',
    'bottom',
    [
      { x: 100, y: 510 },
      { x: 300, y: 510 },
      { x: 300, y: 650 },
      { x: 100, y: 650 },
    ],
    'Aba retangular do fundo',
    { x: 200, y: 580 }
  ),

  createPanel(
    'castelo_bottom_2',
    'Aba Fundo 2 (Encaixe)',
    'Fundo Frente',
    'bottom',
    [
      { x: 300, y: 510 },
      { x: 500, y: 510 },
      { x: 470, y: 620 },
      { x: 330, y: 620 },
    ],
    'Aba trapezoidal de encaixe do fundo frontal',
    { x: 400, y: 565 }
  ),

  createPanel(
    'castelo_bottom_3',
    'Aba Fundo 3 (Retangular)',
    'Fundo 3',
    'bottom',
    [
      { x: 500, y: 510 },
      { x: 700, y: 510 },
      { x: 700, y: 650 },
      { x: 500, y: 650 },
    ],
    'Aba retangular do fundo direito',
    { x: 600, y: 580 }
  ),

  createPanel(
    'castelo_bottom_4',
    'Aba Fundo 4 (Encaixe)',
    'Fundo Verso',
    'bottom',
    [
      { x: 700, y: 510 },
      { x: 900, y: 510 },
      { x: 870, y: 620 },
      { x: 730, y: 620 },
    ],
    'Aba trapezoidal de encaixe do fundo verso',
    { x: 800, y: 565 }
  ),
];

export const CAIXA_CASTELO_TEMPLATE: BoxTemplate = {
  id: 'castelo',
  name: 'Caixa Castelo',
  subtitle: 'Orientação horizontal com coroa contínua de 8 pontas',
  description: 'Caixa com as 4 faces em pé (fotos retas), topo coroado por 8 pontas triangulares contínuas e vincos em losango.',
  widthMm: 65,
  heightMm: 150,
  depthMm: 65,
  canvasWidth: 1000,
  canvasHeight: 740,
  sheetFormat: 'A4 Paisagem',
  recommendedPaper: 'Papel Fotográfico Matte ou Glossy 180g / 240g ou Offset 180g',
  panels: casteloPanels,
  cutLines: [
    // Contorno externo total de corte com a COROA CONTÍNUA DE 8 PONTAS TRIANGULARES no topo!
    {
      id: 'castelo_cut_outer',
      type: 'cut',
      d: `
        M 70 50
        L 100 40
        L 150 40 L 200 100
        L 250 40 L 300 100
        L 350 40 L 400 100
        L 450 40 L 500 100
        L 550 40 L 600 100
        L 650 40 L 700 100
        L 750 40 L 800 100
        L 850 40 L 900 100
        L 840 170
        L 900 240
        L 900 510
        L 870 620 L 730 620 L 700 510
        L 700 650 L 500 650 L 500 510
        L 470 620 L 330 620 L 300 510
        L 300 650 L 100 650 L 100 510
        L 50 510
        L 40 470 L 40 280 L 50 240
        L 100 240
        L 160 170
        L 100 100
        L 70 100
        Z
      `,
    },
    // Recortes dos 3 losangos internos no pescoço da caixinha
    {
      id: 'castelo_cut_diamond_1',
      type: 'cut',
      d: 'M 300 100 L 360 170 L 300 240 L 240 170 Z',
    },
    {
      id: 'castelo_cut_diamond_2',
      type: 'cut',
      d: 'M 500 100 L 560 170 L 500 240 L 440 170 Z',
    },
    {
      id: 'castelo_cut_diamond_3',
      type: 'cut',
      d: 'M 700 100 L 760 170 L 700 240 L 640 170 Z',
    },
    // Fendas de separação entre abas do fundo
    { id: 'castelo_cut_slit_1', type: 'cut', d: 'M 300 510 L 300 540' },
    { id: 'castelo_cut_slit_2', type: 'cut', d: 'M 500 510 L 500 540' },
    { id: 'castelo_cut_slit_3', type: 'cut', d: 'M 700 510 L 700 540' },
  ],
  creaseLines: [
    // Vinco horizontal entre a coroa de dentes e o pescoço
    { id: 'castelo_c_top_teeth', type: 'crease', d: 'M 100 100 L 900 100' },
    // Vinco horizontal entre o pescoço e o corpo das 4 faces
    { id: 'castelo_c_top_body', type: 'crease', d: 'M 100 240 L 900 240' },
    // Vinco horizontal inferior entre o corpo e o fundo
    { id: 'castelo_c_bottom', type: 'crease', d: 'M 100 510 L 900 510' },
    // Vincos verticais entre as 4 faces
    { id: 'castelo_c_glue_side', type: 'crease', d: 'M 100 240 L 100 510' },
    { id: 'castelo_c_v1', type: 'crease', d: 'M 300 240 L 300 510' },
    { id: 'castelo_c_v2', type: 'crease', d: 'M 500 240 L 500 510' },
    { id: 'castelo_c_v3', type: 'crease', d: 'M 700 240 L 700 510' },
    // Vinco da aba de colagem da coroa
    { id: 'castelo_c_glue_crown', type: 'crease', d: 'M 100 40 L 100 100' },
  ],
};

export const ALL_BOX_TEMPLATES: BoxTemplate[] = [
  CAIXA_MILK_TEMPLATE,
  CAIXA_PIRAMIDE_TEMPLATE,
  CAIXA_CASTELO_TEMPLATE,
  CAIXA_SUSHI_TEMPLATE,
  CAIXA_BALA_TEMPLATE,
  CAIXA_CUBO_TEMPLATE,
];

export function getTemplateById(id: BoxModelId): BoxTemplate {
  return ALL_BOX_TEMPLATES.find(t => t.id === id) || CAIXA_MILK_TEMPLATE;
}
