import React from 'react';
import { HelpCircle, Scissors, Image as ImageIcon, Type, Sparkles, Check } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6" />
            <h3 className="text-lg font-bold">Como Personalizar sua Caixinha</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 text-slate-700 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Selecione o Lado que Deseja Preencher</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Clique diretamente em qualquer face da caixinha no molde (ex: Frente, Lateral ou Face Triangular). O sistema abrirá o painel para você enviar a imagem.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Ajuste Automático & Perfeito</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                O aplicativo recorta e enquadra a foto com precisão no contorno daquele lado. Você pode ajustar zoom, posição ou aplicar a foto em todos os lados de uma vez só!
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Adicione Nome, Idade e Apliques</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Na aba "Textos", escreva o nome do aniversariante com contorno branco destacado (estilo scrapfesta) e posicione onde quiser no molde.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-pink-100 text-pink-700 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Impressão & Montagem</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Clique em <strong>"Salvar PNG"</strong> para baixar em 300 DPI. Imprima em papel fotográfico fosco ou brilhante (180g a 240g). Linhas sólidas são para cortar com tesoura e linhas pontilhadas são os vincos para dobrar!
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            Entendido, vamos criar!
          </button>
        </div>
      </div>
    </div>
  );
};
