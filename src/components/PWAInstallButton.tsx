import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Share, PlusSquare, CheckCircle, X } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ className = '' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running in standalone app mode
  if (isInstalled) {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-semibold ${className}`}>
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">Modo App Ativo</span>
      </div>
    );
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all ${className}`}
        title="Instalar na tela do celular como aplicativo"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Instalar App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-xs font-bold transition-all ${className}`}
          title="Como instalar no iPhone"
        >
          <Smartphone className="w-3.5 h-3.5 text-pink-600" />
          <span>Instalar no iPhone</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <img src="/icon.svg" alt="Tenda JL" className="w-8 h-8 rounded-lg shadow-xs" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight">Instalar no seu iPhone</h3>
                    <p className="text-[10px] text-pink-600 font-semibold">Tenda JL - Papelaria</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-xl">
                  <div className="p-1.5 bg-pink-100 text-pink-700 rounded-lg">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">1. Toque em Compartilhar</span>
                    <span>No rodapé do navegador Safari, toque no botão de compartilhar (ícone de quadrado com seta).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 bg-slate-50 rounded-xl">
                  <div className="p-1.5 bg-pink-100 text-pink-700 rounded-lg">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">2. "Adicionar à Tela de Início"</span>
                    <span>Role para baixo nas opções e selecione "Adicionar à Tela de Início".</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-2.5 bg-emerald-50 rounded-xl text-emerald-800">
                  <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold block">3. Pronto!</span>
                    <span>O ícone do Personalizador Tenda JL aparecerá direto na tela do seu celular como um app real.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all"
              >
                Entendi!
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback button on desktop / other browsers to guide user
  return (
    <button
      onClick={() => {
        alert('Para instalar este app:\n\n• No Google Chrome / Edge: clique no ícone de computador/instalação na barra de endereços no topo.\n• No celular Android: clique no menu ⋮ (três pontinhos) e em "Adicionar à tela inicial" ou "Instalar aplicativo".\n• No iPhone: toque em Compartilhar e "Adicionar à Tela de Início".');
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 rounded-xl text-xs font-bold transition-all ${className}`}
      title="Como instalar no celular"
    >
      <Smartphone className="w-3.5 h-3.5 text-pink-600" />
      <span>Instalar App</span>
    </button>
  );
};
