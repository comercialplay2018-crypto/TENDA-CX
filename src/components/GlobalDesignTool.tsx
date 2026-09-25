import React from 'react';
import { FESTIVE_PALETTES, PAPER_PATTERNS } from '../data/decorations';
import { BoxPanel, FaceCustomization } from '../types/box';
import {
  Palette,
  Eye,
  EyeOff,
  Scissors,
  Sparkles,
  Layers,
  Settings2,
} from 'lucide-react';

interface GlobalDesignToolProps {
  globalBackgroundColor: string;
  onUpdateGlobalColor: (color: string) => void;
  onApplyGlobalPattern: (patternUri: string) => void;
  showCutLines: boolean;
  onToggleCutLines: () => void;
  showCreaseLines: boolean;
  onToggleCreaseLines: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  lineStyle: 'black' | 'light_gray' | 'hidden';
  onChangeLineStyle: (style: 'black' | 'light_gray' | 'hidden') => void;
  onClearAllImages: () => void;
}

export const GlobalDesignTool: React.FC<GlobalDesignToolProps> = ({
  globalBackgroundColor,
  onUpdateGlobalColor,
  onApplyGlobalPattern,
  showCutLines,
  onToggleCutLines,
  showCreaseLines,
  onToggleCreaseLines,
  showLabels,
  onToggleLabels,
  lineStyle,
  onChangeLineStyle,
  onClearAllImages,
}) => {
  return (
    <div className="space-y-6">
      {/* Global Background Color */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-pink-600" />
            <span>Cor de Fundo da Caixinha</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="color"
            value={globalBackgroundColor || '#ffffff'}
            onChange={(e) => onUpdateGlobalColor(e.target.value)}
            className="w-10 h-10 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
          />
          <input
            type="text"
            value={globalBackgroundColor || '#ffffff'}
            onChange={(e) => onUpdateGlobalColor(e.target.value)}
            className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono text-slate-700 uppercase font-semibold"
            placeholder="#FFFFFF"
          />
        </div>
      </div>

      {/* Thematic Palettes */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Paletas Temáticas de Festas
        </span>
        <div className="space-y-2">
          {FESTIVE_PALETTES.map((palette) => (
            <div
              key={palette.name}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
            >
              <span className="text-[11px] font-semibold text-slate-700 block">
                {palette.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {palette.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onUpdateGlobalColor(color)}
                    style={{ backgroundColor: color }}
                    className="w-7 h-7 rounded-lg border border-slate-300 shadow-xs hover:scale-115 transition-transform"
                    title={color}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Paper All Faces */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Estampar Todos os Lados
          </span>
          <span className="text-[10px] text-pink-600 font-semibold">1-Clique</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Aplica a mesma estampa ou textura decorativa em todos os lados personalizáveis da caixa.
        </p>
        <div className="grid grid-cols-4 gap-2 pt-1">
          {PAPER_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => onApplyGlobalPattern(pattern.svgDataUri)}
              className="group relative aspect-square rounded-lg border border-slate-200 overflow-hidden hover:border-pink-500 hover:ring-2 hover:ring-pink-300 transition-all shadow-xs"
              title={`Aplicar ${pattern.name} em todos os lados`}
            >
              <img
                src={pattern.svgDataUri}
                alt={pattern.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-900/60 text-white text-[8.5px] font-medium py-0.5 px-0.5 truncate text-center">
                {pattern.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cut & Crease Line Settings */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
          <Scissors className="w-4 h-4 text-slate-600" />
          <span>Linhas de Corte e Vinco (Gabarito)</span>
        </div>

        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
            <span className="font-medium text-slate-700">Linhas de Corte Externas (Sólidas)</span>
            <input
              type="checkbox"
              checked={showCutLines}
              onChange={onToggleCutLines}
              className="w-4 h-4 accent-pink-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
            <span className="font-medium text-slate-700">Linhas de Vinco/Dobra (Tracejadas)</span>
            <input
              type="checkbox"
              checked={showCreaseLines}
              onChange={onToggleCreaseLines}
              className="w-4 h-4 accent-pink-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 cursor-pointer">
            <span className="font-medium text-slate-700">Identificação dos Lados ("Frente", "Verso")</span>
            <input
              type="checkbox"
              checked={showLabels}
              onChange={onToggleLabels}
              className="w-4 h-4 accent-pink-600 rounded"
            />
          </label>
        </div>

        {/* Line Shade Selection */}
        <div>
          <span className="text-[11px] font-semibold text-slate-600 block mb-1">
            Tom das Linhas para Impressão:
          </span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => onChangeLineStyle('black')}
              className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                lineStyle === 'black'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Preto Nítido
            </button>
            <button
              onClick={() => onChangeLineStyle('light_gray')}
              className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                lineStyle === 'light_gray'
                  ? 'bg-slate-600 text-white border-slate-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Cinza Suave
            </button>
            <button
              onClick={() => onChangeLineStyle('hidden')}
              className={`py-1.5 px-2 rounded-lg font-medium border text-center transition-colors ${
                lineStyle === 'hidden'
                  ? 'bg-pink-600 text-white border-pink-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Invisíveis
            </button>
          </div>
        </div>
      </div>

      {/* Clear All Images */}
      <div className="pt-2">
        <button
          onClick={onClearAllImages}
          className="w-full py-2.5 px-3 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
        >
          Limpar Todas as Imagens da Caixinha
        </button>
      </div>
    </div>
  );
};
