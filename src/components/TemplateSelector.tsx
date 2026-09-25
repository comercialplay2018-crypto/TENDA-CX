import React from 'react';
import { BoxModelId } from '../types/box';
import { ALL_BOX_TEMPLATES } from '../data/boxTemplates';
import { Box, Layers, Sparkles, Check, Info, X } from 'lucide-react';

interface TemplateSelectorProps {
  selectedModelId: BoxModelId;
  onSelectModel: (modelId: BoxModelId) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedModelId,
  onSelectModel,
  isOpen = true,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      {/* Modal Card with constrained max-height and internal scrolling for mobile */}
      <div className="relative w-full max-w-4xl max-h-[94dvh] sm:max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto">
        {/* Header - Fixed at Top */}
        <div className="shrink-0 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white shrink-0">
                <Box className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight leading-tight">
                  Escolha o Modelo da Caixinha
                </h2>
                <p className="text-pink-100 text-xs sm:text-sm mt-0.5 hidden xs:block sm:block">
                  Moldes profissionais prontos para corte, vinco e personalização com fotos
                </p>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Notice Banner - Fixed below Header */}
        <div className="shrink-0 mx-3 sm:mx-6 mt-3 sm:mt-4 p-2.5 sm:p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px] sm:text-xs leading-relaxed">
            <strong className="font-bold">Modelos reais atualizados:</strong> Selecione entre a <strong>Caixa Milk</strong>, a <strong>Caixa Pirâmide</strong> ou a <strong>Caixa Castelo</strong> (modeladas fielmente aos moldes enviados com ameias e vincos perfeitos!).
          </div>
        </div>

        {/* Scrollable Grid of Templates - Easily scrollable on ANY mobile device */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-6 min-h-0 touch-pan-y">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ALL_BOX_TEMPLATES.map((tpl) => {
              const isSelected = tpl.id === selectedModelId;

              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectModel(tpl.id);
                    if (onClose) onClose();
                  }}
                  className={`group relative rounded-xl border-2 p-3 sm:p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50/40 shadow-md ring-2 ring-pink-500/20'
                      : 'border-slate-200 hover:border-pink-300 hover:bg-slate-50/60 hover:shadow-sm'
                  }`}
                >
                  {/* Badges */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${
                        tpl.id === 'piramide'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : tpl.id === 'castelo'
                          ? 'bg-purple-100 text-purple-800 border border-purple-200 font-bold'
                          : tpl.id === 'milk'
                          ? 'bg-pink-100 text-pink-700 border border-pink-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {tpl.id === 'piramide'
                        ? '⭐ Modelo enviado (Foto 1)'
                        : tpl.id === 'castelo'
                        ? '🏰 Molde da sua foto (Castelo)'
                        : tpl.id === 'milk'
                        ? '💖 Mais pedido em festas'
                        : tpl.sheetFormat}
                    </span>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Ativo
                      </span>
                    )}
                  </div>

                  {/* SVG Schematic Preview */}
                  <div className="w-full h-28 sm:h-36 bg-white rounded-lg border border-slate-100 p-2 flex items-center justify-center overflow-hidden mb-2.5 sm:mb-3 group-hover:scale-102 transition-transform">
                    {tpl.id === 'piramide' && (
                      <svg viewBox="0 0 850 950" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        {/* 4 Isosceles Triangles meeting at apex (400, 70) */}
                        <polygon points="400,70 138,617 310,670" fill="#fdf2f8" strokeWidth="8" />
                        <polygon points="400,70 310,670 490,670" fill="#fdf2f8" strokeWidth="8" />
                        <polygon points="400,70 490,670 662,617" fill="#fdf2f8" strokeWidth="8" />
                        <polygon points="400,70 662,617 811,516" fill="#fdf2f8" strokeWidth="8" />
                        {/* Square base under Face 2 */}
                        <rect x="310" y="670" width="180" height="180" fill="#fae8ff" strokeWidth="6" />
                        {/* Creases */}
                        <line x1="400" y1="70" x2="310" y2="670" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="400" y1="70" x2="490" y2="670" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="400" y1="70" x2="662" y2="617" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="310" y1="670" x2="490" y2="670" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                      </svg>
                    )}
                    {tpl.id === 'milk' && (
                      <svg viewBox="0 0 1000 740" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        <rect x="100" y="90" width="800" height="440" fill="#fdf2f8" strokeWidth="10" />
                        <line x1="100" y1="260" x2="900" y2="260" stroke="#f43f5e" strokeWidth="8" strokeDasharray="16 16" />
                        <line x1="300" y1="90" x2="300" y2="530" stroke="#f43f5e" strokeWidth="8" strokeDasharray="16 16" />
                        <line x1="500" y1="90" x2="500" y2="530" stroke="#f43f5e" strokeWidth="8" strokeDasharray="16 16" />
                        <line x1="700" y1="90" x2="700" y2="530" stroke="#f43f5e" strokeWidth="8" strokeDasharray="16 16" />
                      </svg>
                    )}
                    {tpl.id === 'castelo' && (
                      <svg viewBox="0 0 1000 740" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        {/* 4 Main Upright Faces */}
                        <rect x="100" y="240" width="800" height="270" fill="#fdf4ff" strokeWidth="8" />
                        {/* Top continuous 8-point crown */}
                        <path d="M 100 100 L 150 40 L 200 100 L 250 40 L 300 100 L 350 40 L 400 100 L 450 40 L 500 100 L 550 40 L 600 100 L 650 40 L 700 100 L 750 40 L 800 100 L 850 40 L 900 100 Z" fill="#fae8ff" strokeWidth="6" />
                        {/* Diamond cutouts */}
                        <polygon points="300,100 360,170 300,240 240,170" fill="#ffffff" stroke="#c026d3" strokeWidth="5" />
                        <polygon points="500,100 560,170 500,240 440,170" fill="#ffffff" stroke="#c026d3" strokeWidth="5" />
                        <polygon points="700,100 760,170 700,240 640,170" fill="#ffffff" stroke="#c026d3" strokeWidth="5" />
                        {/* Bottom flaps */}
                        <rect x="100" y="510" width="200" height="140" fill="#fae8ff" strokeWidth="6" />
                        <polygon points="300,510 500,510 470,620 330,620" fill="#fae8ff" strokeWidth="6" />
                        <rect x="500" y="510" width="200" height="140" fill="#fae8ff" strokeWidth="6" />
                        <polygon points="700,510 900,510 870,620 730,620" fill="#fae8ff" strokeWidth="6" />
                        {/* Fold lines */}
                        <line x1="100" y1="240" x2="900" y2="240" stroke="#c026d3" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="100" y1="510" x2="900" y2="510" stroke="#c026d3" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="300" y1="240" x2="300" y2="510" stroke="#c026d3" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="500" y1="240" x2="500" y2="510" stroke="#c026d3" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="700" y1="240" x2="700" y2="510" stroke="#c026d3" strokeWidth="6" strokeDasharray="12 12" />
                      </svg>
                    )}
                    {tpl.id === 'sushi' && (
                      <svg viewBox="0 0 1000 740" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        {/* 4 Fan Trapezoid Panels */}
                        <polygon points="165,313 365,250 393,432 246,478" fill="#fdf2f8" strokeWidth="8" />
                        <polygon points="365,250 575,250 547,432 393,432" fill="#fce7f3" strokeWidth="8" />
                        <polygon points="575,250 775,313 694,478 547,432" fill="#fdf2f8" strokeWidth="8" />
                        <polygon points="775,313 947,434 820,567 694,478" fill="#fce7f3" strokeWidth="8" />
                        {/* Top Flap with Slit on Face 2 */}
                        <polygon points="365,250 385,140 555,140 575,250" fill="#fbcfe8" strokeWidth="6" />
                        <line x1="425" y1="165" x2="515" y2="165" stroke="#be185d" strokeWidth="8" />
                        {/* Top Flap with Loop on Face 4 */}
                        <polygon points="775,313 855,234 994,332 947,434" fill="#fbcfe8" strokeWidth="6" />
                        {/* Bottom square flap on Face 2 */}
                        <polygon points="393,432 393,586 415,621 525,621 547,586 547,432" fill="#fbcfe8" strokeWidth="6" />
                        {/* Creases */}
                        <line x1="365" y1="250" x2="393" y2="432" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="575" y1="250" x2="547" y2="432" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="775" y1="313" x2="694" y2="478" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                      </svg>
                    )}
                    {tpl.id === 'bolsinha' && (
                      <svg viewBox="0 0 950 740" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        {/* Body 4 panels */}
                        <rect x="80" y="240" width="230" height="270" fill="#fdf2f8" strokeWidth="8" />
                        <rect x="310" y="240" width="120" height="270" fill="#f8fafc" strokeWidth="6" />
                        <rect x="430" y="240" width="230" height="270" fill="#fdf2f8" strokeWidth="8" />
                        <rect x="660" y="240" width="120" height="270" fill="#f8fafc" strokeWidth="6" />
                        {/* Two Rounded Arch Handles */}
                        <path d="M 80 240 C 80 100, 130 90, 195 90 C 260 90, 310 100, 310 240 Z" fill="#fbcfe8" strokeWidth="8" />
                        <path d="M 430 240 C 430 100, 480 90, 545 90 C 610 90, 660 100, 660 240 Z" fill="#fbcfe8" strokeWidth="8" />
                        {/* Oval handle cutouts */}
                        <rect x="145" y="160" width="100" height="45" rx="20" fill="#ffffff" stroke="#db2777" strokeWidth="6" />
                        <rect x="495" y="160" width="100" height="45" rx="20" fill="#ffffff" stroke="#db2777" strokeWidth="6" />
                        {/* Fold lines */}
                        <line x1="80" y1="240" x2="310" y2="240" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="430" y1="240" x2="660" y2="240" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                        <line x1="370" y1="240" x2="370" y2="510" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8" />
                        <line x1="720" y1="240" x2="720" y2="510" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 8" />
                      </svg>
                    )}
                    {tpl.id === 'sacolinha' && (
                      <svg viewBox="0 0 950 740" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        {/* Body 4 panels */}
                        <rect x="80" y="250" width="230" height="270" fill="#fdf2f8" strokeWidth="8" />
                        <rect x="310" y="250" width="120" height="270" fill="#f8fafc" strokeWidth="6" />
                        <rect x="430" y="250" width="230" height="270" fill="#fdf2f8" strokeWidth="8" />
                        <rect x="660" y="250" width="120" height="270" fill="#f8fafc" strokeWidth="6" />
                        {/* Fold-over flap */}
                        <path d="M 80 250 C 80 110, 130 110, 195 110 C 260 110, 310 110, 310 250 Z" fill="#fbcfe8" strokeWidth="8" />
                        {/* Flap handle cutout */}
                        <rect x="145" y="150" width="100" height="40" rx="20" fill="#ffffff" stroke="#db2777" strokeWidth="6" />
                        {/* Front handle cutout */}
                        <rect x="145" y="295" width="100" height="40" rx="20" fill="#ffffff" stroke="#db2777" strokeWidth="6" />
                        {/* Back handle cutout */}
                        <rect x="495" y="295" width="100" height="40" rx="20" fill="#ffffff" stroke="#db2777" strokeWidth="6" />
                        {/* Fold lines */}
                        <line x1="80" y1="250" x2="310" y2="250" stroke="#f43f5e" strokeWidth="6" strokeDasharray="12 12" />
                      </svg>
                    )}
                    {tpl.id === 'bala' && (
                      <svg viewBox="0 0 950 650" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        <rect x="100" y="110" width="750" height="440" fill="#fdf2f8" strokeWidth="10" />
                      </svg>
                    )}
                    {tpl.id === 'cubo' && (
                      <svg viewBox="0 0 960 700" className="w-full h-full max-h-28 sm:max-h-32 object-contain stroke-slate-700">
                        <rect x="100" y="240" width="800" height="200" fill="#fdf2f8" strokeWidth="10" />
                        <rect x="300" y="40" width="200" height="200" fill="#fdf2f8" strokeWidth="10" />
                        <rect x="300" y="440" width="200" height="200" fill="#fdf2f8" strokeWidth="10" />
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-pink-600 transition-colors">
                      {tpl.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-2">{tpl.description}</p>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
                    <span>{tpl.panels.filter(p => p.type === 'main_face').length} lados personalizáveis</span>
                    <span className="font-medium text-slate-700">{tpl.sheetFormat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer - Fixed at Bottom */}
        <div className="shrink-0 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 text-center sm:text-left">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
            <span>Role para cima e para baixo para ver todos os modelos.</span>
          </div>
          <button
            onClick={() => {
              if (onClose) onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
          >
            Continuar com {ALL_BOX_TEMPLATES.find(t => t.id === selectedModelId)?.name || 'Modelo Selecionado'}
          </button>
        </div>
      </div>
    </div>
  );
};
