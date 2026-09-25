import React, { useRef } from 'react';
import { StickerElement } from '../types/box';
import { CLIPARTS } from '../data/decorations';
import {
  Sparkles,
  Upload,
  Trash2,
  Copy,
  RotateCw,
  Maximize2,
  Smile,
} from 'lucide-react';

interface StickersToolProps {
  stickers: StickerElement[];
  selectedStickerId: string | null;
  onSelectSticker: (id: string | null) => void;
  onAddSticker: (url: string, name: string, width?: number, height?: number) => void;
  onUpdateSticker: (id: string, updates: Partial<StickerElement>) => void;
  onDeleteSticker: (id: string) => void;
  onDuplicateSticker: (id: string) => void;
}

export const StickersTool: React.FC<StickersToolProps> = ({
  stickers,
  selectedStickerId,
  onSelectSticker,
  onAddSticker,
  onUpdateSticker,
  onDeleteSticker,
  onDuplicateSticker,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedSticker = stickers.find((s) => s.id === selectedStickerId);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      onAddSticker(url, file.name || 'Adesivo Personalizado', 120, 120);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-5">
      {/* Header & Custom Upload */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Apliques & Adesivos</h4>
            <p className="text-[11px] text-slate-500">Elementos decorativos para sobrepor no molde</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCustomUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Enviar PNG</span>
          </button>
        </div>
      </div>

      {/* Preset Clipart Library */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Galeria de Apliques Festivos
        </span>
        <div className="grid grid-cols-3 gap-2.5">
          {CLIPARTS.map((item) => (
            <button
              key={item.id}
              onClick={() => onAddSticker(item.dataUri, item.name, item.defaultWidth, item.defaultHeight)}
              className="group p-2 bg-white hover:bg-pink-50 border border-slate-200 hover:border-pink-400 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs"
              title={`Adicionar ${item.name}`}
            >
              <img
                src={item.dataUri}
                alt={item.name}
                className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-semibold text-slate-600 text-center truncate max-w-full">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Stickers List */}
      {stickers.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Apliques Adicionados ({stickers.length})
          </span>
          <div className="max-h-32 overflow-y-auto space-y-1 pr-1">
            {stickers.map((item) => {
              const isSelected = item.id === selectedStickerId;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSticker(item.id)}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-colors ${
                    isSelected
                      ? 'bg-pink-100/70 border-pink-400 text-pink-900 font-semibold'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <img src={item.url} alt="" className="w-5 h-5 object-contain" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateSticker(item.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      title="Duplicar aplique"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSticker(item.id);
                      }}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      title="Excluir"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected Sticker Controls */}
      {selectedSticker ? (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Ajustar Aplique Selecionado
            </span>
            <button
              onClick={() => onSelectSticker(null)}
              className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
            >
              Desmarcar
            </button>
          </div>

          {/* Size Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Tamanho do Aplique</span>
              <span>{Math.round(selectedSticker.width)}px</span>
            </div>
            <input
              type="range"
              min="30"
              max="250"
              value={selectedSticker.width}
              onChange={(e) => {
                const newWidth = parseInt(e.target.value);
                const ratio = selectedSticker.height / selectedSticker.width;
                onUpdateSticker(selectedSticker.id, {
                  width: newWidth,
                  height: Math.round(newWidth * ratio),
                });
              }}
              className="w-full accent-pink-600 cursor-pointer"
            />
          </div>

          {/* Rotation Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Rotação</span>
              <span>{selectedSticker.rotation || 0}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="5"
              value={selectedSticker.rotation || 0}
              onChange={(e) =>
                onUpdateSticker(selectedSticker.id, { rotation: parseInt(e.target.value) })
              }
              className="w-full accent-pink-600 cursor-pointer"
            />
          </div>

          {/* Opacity Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Opacidade</span>
              <span>{Math.round((selectedSticker.opacity ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={selectedSticker.opacity ?? 1}
              onChange={(e) =>
                onUpdateSticker(selectedSticker.id, { opacity: parseFloat(e.target.value) })
              }
              className="w-full accent-pink-600 cursor-pointer"
            />
          </div>
        </div>
      ) : (
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
          Clique no aplique no molde para arrastar ou ajuste pelo painel acima.
        </div>
      )}
    </div>
  );
};
