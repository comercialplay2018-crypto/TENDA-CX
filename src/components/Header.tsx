import React from 'react';
import { BoxModelId, BoxTemplate } from '../types/box';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Box,
  Download,
  Printer,
  Undo2,
  Redo2,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Palette,
  Type,
  Smile,
  Layers,
  Globe,
} from 'lucide-react';

interface HeaderProps {
  currentTemplate: BoxTemplate;
  activeTab: 'panel' | 'global' | 'text' | 'stickers';
  onChangeTab: (tab: 'panel' | 'global' | 'text' | 'stickers') => void;
  onOpenTemplateSelector: () => void;
  onOpenExportModal: () => void;
  onOpenHelpModal: () => void;
  onOpenVercelGuide: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onResetProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTemplate,
  activeTab,
  onChangeTab,
  onOpenTemplateSelector,
  onOpenExportModal,
  onOpenHelpModal,
  onOpenVercelGuide,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onResetProject,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand & Box Model Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Brand Logo with TENDA JL */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src="/icon.svg"
                alt="Tenda JL"
                className="w-10 h-10 rounded-xl shadow-xs object-cover border border-pink-200"
              />
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                  TENDA JL
                </span>
                <span className="hidden lg:inline text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md uppercase">
                  Papelaria
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-pink-600 font-semibold leading-none">
                Personalizador de Caixinhas
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1 hidden sm:block" />

          {/* Model Switcher Pill */}
          <button
            onClick={onOpenTemplateSelector}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-800 border border-pink-200 rounded-xl text-xs font-semibold transition-all group shadow-xs"
            title="Clique para escolher outro modelo de caixinha"
          >
            <span className="w-2 h-2 rounded-full bg-pink-500 group-hover:scale-125 transition-transform" />
            <span className="font-bold truncate max-w-[100px] sm:max-w-none">{currentTemplate.name}</span>
            <span className="text-[10px] text-pink-600 font-normal underline hidden sm:inline">
              (Trocar)
            </span>
          </button>
        </div>

        {/* Center: Tabs for Side Inspector on large screens */}
        <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <button
            onClick={() => onChangeTab('panel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'panel'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lados & Fotos</span>
          </button>

          <button
            onClick={() => onChangeTab('global')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'global'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Cores & Fundo</span>
          </button>

          <button
            onClick={() => onChangeTab('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'text'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Textos</span>
          </button>

          <button
            onClick={() => onChangeTab('stickers')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'stickers'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Apliques</span>
          </button>
        </div>

        {/* Right: PWA Install, Vercel Guide, Undo, Redo, Help, Export */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* PWA Install Button (Always visible / Prominent) */}
          <PWAInstallButton />

          {/* Vercel Deploy Guide Pill */}
          <button
            onClick={onOpenVercelGuide}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            title="Instruções para publicar no Vercel"
          >
            <span className="font-mono text-[10px]">▲</span>
            <span>Vercel</span>
          </button>

          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors rounded"
              title="Desfazer (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:text-slate-300 transition-colors rounded"
              title="Refazer (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={onOpenHelpModal}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block"
            title="Instruções de Personalização e Impressão"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Export PNG Button */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline sm:inline">Salvar PNG</span>
            <span className="inline xs:hidden sm:hidden">PNG</span>
          </button>
        </div>
      </div>
    </header>
  );
};
