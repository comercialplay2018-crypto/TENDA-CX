/**
 * Type definitions for Box Models, Faces, Text & Clipart Elements, and Export settings
 */

export type BoxModelId = 'milk' | 'piramide' | 'castelo' | 'sushi' | 'bala' | 'cubo' | 'bolsinha' | 'sacolinha';

export interface Point {
  x: number;
  y: number;
}

export type FitMode = 'cover' | 'contain' | 'stretch' | 'tile';

export interface FaceCustomization {
  imageUrl?: string;
  imageNaturalWidth?: number;
  imageNaturalHeight?: number;
  scale: number; // 1 = 100%
  offsetX: number; // in pixels or percentage
  offsetY: number;
  rotation: number; // 0, 90, 180, 270 or arbitrary
  fitMode: FitMode;
  backgroundColor: string;
  opacity: number;
}

export interface BoxPanel {
  id: string;
  name: string; // e.g., "Frente", "Lateral Direita", "Verso", "Lateral Esquerda", "Aba de Colagem", "Fundo"
  shortName: string;
  type: 'main_face' | 'roof' | 'flap' | 'bottom' | 'glue_tab';
  points: Point[]; // Polygon vertices in template coordinate space
  center: Point; // Center point for label and text alignment
  boundingBox: { minX: number; minY: number; maxX: number; maxY: number; width: number; height: number };
  description?: string;
  isCustomizable?: boolean; // Default true, false for glue tabs if user wants
}

export interface CutLine {
  id: string;
  d: string; // SVG path string
  type: 'cut' | 'crease' | 'bleed';
  label?: string;
}

export interface BoxTemplate {
  id: BoxModelId;
  name: string;
  subtitle: string;
  description: string;
  widthMm: number; // Physical real dimensions
  heightMm: number;
  depthMm: number;
  canvasWidth: number; // Virtual coordinate system (e.g. 1000)
  canvasHeight: number; // Virtual coordinate system (e.g. 750)
  sheetFormat: 'A4 Retrato' | 'A4 Paisagem';
  panels: BoxPanel[];
  cutLines: CutLine[];
  creaseLines: CutLine[];
  specialMarkings?: { type: 'circle' | 'line'; cx?: number; cy?: number; r?: number; d?: string }[];
  recommendedPaper: string;
}

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  strokeColor: string;
  strokeWidth: number;
  fontWeight: 'normal' | 'bold' | '800';
  fontStyle?: 'normal' | 'italic';
  rotation: number;
  letterSpacing?: number;
  align: 'left' | 'center' | 'right';
  shadow?: boolean;
}

export interface StickerElement {
  id: string;
  url: string; // Image URL or SVG data URI
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
}

export interface BoxProject {
  id: string;
  name: string;
  modelId: BoxModelId;
  globalBackgroundColor: string;
  faces: Record<string, FaceCustomization>; // panelId -> customization
  texts: TextElement[];
  stickers: StickerElement[];
  showCutLines: boolean;
  showCreaseLines: boolean;
  showLabels: boolean;
  lineStyle: 'black' | 'light_gray' | 'hidden';
  createdAt: number;
  updatedAt: number;
}
