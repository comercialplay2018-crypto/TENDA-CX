import React from 'react';
import { TextElement } from '../types/box';
import { AVAILABLE_FONTS, TEXT_PRESETS } from '../data/decorations';
import {
  Type,
  Plus,
  Trash2,
  Copy,
  RotateCw,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sun,
  Sparkles,
} from 'lucide-react';

interface TextToolProps {
  texts: TextElement[];
  selectedTextId: string | null;
  onSelectText: (id: string | null) => void;
  onAddText: (preset?: Partial<TextElement>) => void;
  onUpdateText: (id: string, updates: Partial<TextElement>) => void;
  onDeleteText: (id: string) => void;
  onDuplicateText: (id: string) => void;
}

export const TextTool: React.FC<TextToolProps> = ({
  texts,
  selectedTextId,
  onSelectText,
  onAddText,
  onUpdateText,
  onDeleteText,
  onDuplicateText,
}) => {
  const selectedText = texts.find((t) => t.id === selectedTextId);

  return (
    <div className="space-y-5">
      {/* Add New Text Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Textos Personalizados</h4>
          <p className="text-[11px] text-slate-500">Nomes, idades, frases e agradecimentos</p>
        </div>
        <button
          onClick={() => onAddText()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Texto</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="p-3 bg-pink-50/60 border border-pink-100 rounded-xl space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-pink-500" /> Sugestões Prontas de Festa
        </span>
        <div className="grid grid-cols-1 gap-1.5">
          {TEXT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() =>
                onAddText({
                  text: preset.text,
                  fontFamily: preset.font,
                  color: preset.color,
                  strokeColor: preset.stroke,
                  strokeWidth: 4,
                  fontSize: 28,
                })
              }
              className="text-left px-2.5 py-1.5 bg-white border border-pink-200/70 hover:border-pink-400 rounded-lg text-xs transition-colors flex items-center justify-between group"
            >
              <span
                style={{ fontFamily: preset.font, color: preset.color }}
                className="font-bold text-sm truncate"
              >
                {preset.text}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-pink-600 font-medium">
                + Adicionar
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Texts List */}
      {texts.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Textos no Molde ({texts.length})
          </span>
          <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
            {texts.map((item) => {
              const isSelected = item.id === selectedTextId;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectText(item.id)}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer border transition-colors ${
                    isSelected
                      ? 'bg-pink-100/70 border-pink-400 text-pink-900 font-semibold'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className="truncate max-w-[180px]"
                    style={{ fontFamily: item.fontFamily }}
                  >
                    {item.text || 'Texto vazio'}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateText(item.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600"
                      title="Duplicar texto"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteText(item.id);
                      }}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      title="Excluir texto"
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

      {/* Editing Selected Text */}
      {selectedText ? (
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Editar Texto Selecionado
            </span>
            <button
              onClick={() => onSelectText(null)}
              className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
            >
              Desmarcar
            </button>
          </div>

          {/* Text Input */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Conteúdo do Texto:
            </label>
            <input
              type="text"
              value={selectedText.text}
              onChange={(e) => onUpdateText(selectedText.id, { text: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Digite seu texto..."
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Fonte / Estilo:
            </label>
            <select
              value={selectedText.fontFamily}
              onChange={(e) => onUpdateText(selectedText.id, { fontFamily: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2.5 text-xs font-medium text-slate-800"
            >
              {AVAILABLE_FONTS.map((font) => (
                <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size & Rotation */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Tamanho</span>
                <span>{selectedText.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="80"
                value={selectedText.fontSize}
                onChange={(e) =>
                  onUpdateText(selectedText.id, { fontSize: parseInt(e.target.value) })
                }
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>Rotação</span>
                <span>{selectedText.rotation || 0}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={selectedText.rotation || 0}
                onChange={(e) =>
                  onUpdateText(selectedText.id, { rotation: parseInt(e.target.value) })
                }
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Fill Color & Stroke (Contorno de Papelaria) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Cor da Letra:
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={selectedText.color}
                  onChange={(e) => onUpdateText(selectedText.id, { color: e.target.value })}
                  className="w-8 h-8 p-0.5 border border-slate-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedText.color}
                  onChange={(e) => onUpdateText(selectedText.id, { color: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] font-mono text-slate-700 uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                Borda / Contorno:
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={selectedText.strokeColor}
                  onChange={(e) => onUpdateText(selectedText.id, { strokeColor: e.target.value })}
                  className="w-8 h-8 p-0.5 border border-slate-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedText.strokeColor}
                  onChange={(e) => onUpdateText(selectedText.id, { strokeColor: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-1.5 py-1 text-[11px] font-mono text-slate-700 uppercase"
                />
              </div>
            </div>
          </div>

          {/* Stroke Width Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
              <span>Espessura do Contorno (Borda)</span>
              <span>{selectedText.strokeWidth || 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="16"
              value={selectedText.strokeWidth || 0}
              onChange={(e) =>
                onUpdateText(selectedText.id, { strokeWidth: parseInt(e.target.value) })
              }
              className="w-full accent-pink-600 cursor-pointer"
            />
          </div>

          {/* Style Toggles: Bold, Shadow, Alignment */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-200">
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onUpdateText(selectedText.id, {
                    fontWeight: selectedText.fontWeight === 'bold' ? 'normal' : 'bold',
                  })
                }
                className={`p-1.5 rounded border text-xs ${
                  selectedText.fontWeight === 'bold'
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
                title="Negrito"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() =>
                  onUpdateText(selectedText.id, {
                    shadow: !selectedText.shadow,
                  })
                }
                className={`p-1.5 rounded border text-xs flex items-center gap-1 ${
                  selectedText.shadow
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
                title="Sombra suave"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px]">Sombra</span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateText(selectedText.id, { align: 'left' })}
                className={`p-1.5 rounded border text-xs ${
                  selectedText.align === 'left' ? 'bg-pink-100 text-pink-700' : 'bg-white text-slate-500'
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onUpdateText(selectedText.id, { align: 'center' })}
                className={`p-1.5 rounded border text-xs ${
                  selectedText.align === 'center' ? 'bg-pink-100 text-pink-700' : 'bg-white text-slate-500'
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onUpdateText(selectedText.id, { align: 'right' })}
                className={`p-1.5 rounded border text-xs ${
                  selectedText.align === 'right' ? 'bg-pink-100 text-pink-700' : 'bg-white text-slate-500'
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
          Clique no texto no molde para arrastá-lo e editá-lo, ou adicione um novo texto acima.
        </div>
      )}
    </div>
  );
};
