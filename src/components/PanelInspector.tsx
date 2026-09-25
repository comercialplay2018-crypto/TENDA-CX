import React, { useRef } from 'react';
import { BoxPanel, FaceCustomization, FitMode } from '../types/box';
import { PAPER_PATTERNS, FESTIVE_PALETTES } from '../data/decorations';
import {
  Upload,
  Trash2,
  Copy,
  RotateCw,
  ZoomIn,
  Move,
  Layers,
  Sparkles,
  Maximize,
  Minimize,
  Grid,
  Check,
} from 'lucide-react';

interface PanelInspectorProps {
  panel: BoxPanel | null;
  allPanels: BoxPanel[];
  faceData: FaceCustomization | undefined;
  onSelectPanel: (panelId: string) => void;
  onUpdateFace: (panelId: string, updates: Partial<FaceCustomization>) => void;
  onApplyToAllFaces: (sourceFace: FaceCustomization) => void;
  onClearFace: (panelId: string) => void;
}

export const PanelInspector: React.FC<PanelInspectorProps> = ({
  panel,
  allPanels,
  faceData,
  onSelectPanel,
  onUpdateFace,
  onApplyToAllFaces,
  onClearFace,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!panel) {
    return (
      <div className="p-6 text-center text-slate-500">
        <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-slate-700 mb-1">Nenhum lado selecionado</h4>
        <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
          Clique em qualquer lado da caixinha no molde para personalizar com fotos, cores ou estampas.
        </p>
        <div className="space-y-1.5 text-left">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
            Ou escolha um lado:
          </span>
          {allPanels
            .filter((p) => p.isCustomizable)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPanel(p.id)}
                className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-pink-50 hover:text-pink-600 text-slate-700 border border-slate-200 transition-colors flex items-center justify-between"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-[10px] text-slate-400">{p.shortName}</span>
              </button>
            ))}
        </div>
      </div>
    );
  }

  const currentFace: FaceCustomization = faceData || {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    fitMode: 'cover',
    backgroundColor: '#ffffff',
    opacity: 1,
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      onUpdateFace(panel.id, {
        imageUrl: url,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        fitMode: 'cover',
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleApplyPattern = (dataUri: string) => {
    onUpdateFace(panel.id, {
      imageUrl: dataUri,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      fitMode: 'tile',
    });
  };

  const handleRotate = () => {
    const nextRotation = ((currentFace.rotation || 0) + 90) % 360;
    onUpdateFace(panel.id, { rotation: nextRotation });
  };

  return (
    <div className="space-y-5">
      {/* Panel Switcher Dropdown & Title */}
      <div className="bg-pink-50/70 border border-pink-100 rounded-xl p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700">
            Lado em Edição
          </span>
          <span className="text-[11px] bg-pink-200/80 text-pink-800 font-semibold px-2 py-0.5 rounded-full">
            {panel.type === 'main_face' ? 'Face Principal' : panel.type === 'roof' ? 'Telhado' : 'Aba / Base'}
          </span>
        </div>

        <select
          value={panel.id}
          onChange={(e) => onSelectPanel(e.target.value)}
          className="w-full bg-white border border-pink-200 rounded-lg py-1.5 px-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          {allPanels
            .filter((p) => p.isCustomizable)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>

        {panel.description && (
          <p className="text-[11px] text-slate-500 mt-2">{panel.description}</p>
        )}
      </div>

      {/* Upload Image Section */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
          <span>Foto / Imagem deste Lado</span>
          {currentFace.imageUrl && (
            <span className="text-[11px] font-normal text-emerald-600 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Imagem ativa
            </span>
          )}
        </label>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow transition-all"
          >
            <Upload className="w-4 h-4" />
            <span>{currentFace.imageUrl ? 'Trocar Foto / Imagem' : 'Carregar Foto do Computador'}</span>
          </button>

          {currentFace.imageUrl && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApplyToAllFaces(currentFace)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-colors"
                title="Aplica a mesma foto/estampa em todos os 4 lados da caixinha"
              >
                <Copy className="w-3.5 h-3.5 text-amber-600" />
                <span>Aplicar em TODOS os Lados</span>
              </button>

              <button
                onClick={() => onClearFace(panel.id)}
                className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                title="Remover imagem deste lado"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Adjustments (shown when an image is present) */}
      {currentFace.imageUrl && (
        <div className="space-y-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Ajustes do Enquadramento
            </span>
            <button
              onClick={handleRotate}
              className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2.5 py-1 rounded-md"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Girar {currentFace.rotation || 0}°</span>
            </button>
          </div>

          {/* Fit Mode Selector */}
          <div>
            <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
              Modo de Preenchimento:
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onUpdateFace(panel.id, { fitMode: 'cover' })}
                className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentFace.fitMode === 'cover'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>Preencher (Corte)</span>
              </button>

              <button
                onClick={() => onUpdateFace(panel.id, { fitMode: 'contain' })}
                className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentFace.fitMode === 'contain'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Minimize className="w-3.5 h-3.5" />
                <span>Ajustar Inteira</span>
              </button>

              <button
                onClick={() => onUpdateFace(panel.id, { fitMode: 'tile' })}
                className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentFace.fitMode === 'tile'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Repetir Estampa</span>
              </button>

              <button
                onClick={() => onUpdateFace(panel.id, { fitMode: 'stretch' })}
                className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  currentFace.fitMode === 'stretch'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Esticar</span>
              </button>
            </div>
          </div>

          {/* Zoom / Scale Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3.5 h-3.5" /> Zoom da Imagem
              </span>
              <span>{Math.round((currentFace.scale || 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.05"
              value={currentFace.scale || 1}
              onChange={(e) => onUpdateFace(panel.id, { scale: parseFloat(e.target.value) })}
              className="w-full accent-pink-600 cursor-pointer"
            />
          </div>

          {/* Offset X & Offset Y */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Posição Horizontal</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={currentFace.offsetX || 0}
                onChange={(e) => onUpdateFace(panel.id, { offsetX: parseInt(e.target.value) })}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Posição Vertical</span>
              </div>
              <input
                type="range"
                min="-150"
                max="150"
                step="2"
                value={currentFace.offsetY || 0}
                onChange={(e) => onUpdateFace(panel.id, { offsetY: parseInt(e.target.value) })}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Preset Digital Paper Patterns */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
          <span>Estampas & Papéis Digitais</span>
          <span className="text-[10px] text-slate-400 font-normal">Clique para aplicar</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {PAPER_PATTERNS.map((pattern) => (
            <button
              key={pattern.id}
              onClick={() => handleApplyPattern(pattern.svgDataUri)}
              className="group relative aspect-square rounded-lg border border-slate-200 overflow-hidden hover:border-pink-500 hover:ring-2 hover:ring-pink-300 transition-all shadow-xs"
              title={pattern.name}
            >
              <img
                src={pattern.svgDataUri}
                alt={pattern.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
              <span className="absolute bottom-0 inset-x-0 bg-slate-900/60 text-white text-[9px] font-medium py-0.5 px-1 truncate text-center">
                {pattern.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Face Background Color */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Cor de Fundo deste Lado
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={currentFace.backgroundColor || '#ffffff'}
            onChange={(e) => onUpdateFace(panel.id, { backgroundColor: e.target.value })}
            className="w-9 h-9 p-0.5 border border-slate-300 rounded-lg cursor-pointer bg-white"
          />
          <input
            type="text"
            value={currentFace.backgroundColor || '#ffffff'}
            onChange={(e) => onUpdateFace(panel.id, { backgroundColor: e.target.value })}
            className="flex-1 bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs font-mono text-slate-700 uppercase"
            placeholder="#FFFFFF"
          />
        </div>

        {/* Quick Pastels Palette */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['#ffffff', '#ffe5ec', '#fff0f5', '#e8f0fe', '#e6f4ea', '#fef7e0', '#f3e8fd', '#fff8e7', '#fdf2f8', '#1e293b'].map(
            (color) => (
              <button
                key={color}
                onClick={() => onUpdateFace(panel.id, { backgroundColor: color })}
                style={{ backgroundColor: color }}
                className="w-6 h-6 rounded-md border border-slate-300 shadow-xs hover:scale-110 transition-transform"
                title={color}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
