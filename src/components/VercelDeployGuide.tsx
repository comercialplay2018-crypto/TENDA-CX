import React from 'react';
import { Globe, CheckCircle, ExternalLink, Terminal, Sparkles, X, ShieldCheck } from 'lucide-react';

interface VercelDeployGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployGuide: React.FC<VercelDeployGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-slate-950 rounded-xl flex items-center justify-center font-black shadow-md">
                ▲
              </div>
              <div>
                <h3 className="text-xl font-bold">Publicar no Vercel (App PWA)</h3>
                <p className="text-slate-300 text-xs mt-0.5">
                  Seu app Tenda JL pronto para rodar com HTTPS e instalar no celular
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs text-slate-600">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Tudo já está configurado para o Vercel!</span>
              <span>
                O Web App Manifest, Service Worker offline e os ícones com a logo <strong>TENDA JL</strong> já estão gerados no projeto.
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-xs">
              Passo a Passo para Publicar (Gratuito):
            </h4>

            <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                1
              </div>
              <div>
                <strong className="text-slate-900 block">Envie seu código para o GitHub</strong>
                <span>Crie um repositório no GitHub com os arquivos deste projeto.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                2
              </div>
              <div>
                <strong className="text-slate-900 block">Conecte no site da Vercel (vercel.com)</strong>
                <span>Acesse <strong>vercel.com</strong>, clique em <strong>"Add New..." → "Project"</strong> e selecione o repositório.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                3
              </div>
              <div>
                <strong className="text-slate-900 block">Configurações de Build (Já pré-preenchidas pela Vercel)</strong>
                <div className="mt-1 font-mono text-[11px] bg-white p-2 rounded border border-slate-200 text-slate-700 space-y-0.5">
                  <div>Framework Preset: <strong>Vite</strong></div>
                  <div>Build Command: <code className="text-pink-600 font-bold">npm run build</code></div>
                  <div>Output Directory: <code className="text-pink-600 font-bold">dist</code></div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                4
              </div>
              <div>
                <strong className="text-slate-900 block">Clique em "Deploy"</strong>
                <span>Em menos de 1 minuto seu aplicativo estará online com link HTTPS (ex: <code>tendajl.vercel.app</code>) ou com seu domínio próprio!</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-900">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-600" />
              Como vai funcionar no celular dos seus clientes:
            </span>
            <p className="mt-1">
              Assim que o cliente ou você acessar o link da Vercel no celular, aparecerá automaticamente o botão de <strong>"Instalar Aplicativo"</strong>. Ao aceitar, o ícone com a marca <strong>TENDA JL</strong> será fixado na tela do celular como se fosse baixado da Play Store ou App Store, abrindo em tela cheia sem barra de navegador!
            </p>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
          >
            Fechar Guia
          </button>
        </div>
      </div>
    </div>
  );
};
