import React, { useState } from 'react';
import { BoxTemplate, BoxProject } from '../types/box';
import { exportSvgToPng } from '../utils/exportCanvas';
import {
  Download,
  Printer,
  FileDown,
  FileUp,
  CheckCircle2,
  Sparkles,
  Scissors,
  Layers,
  Settings,
  AlertCircle,
  X,
  ArrowLeft,
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: BoxTemplate;
  svgRef: React.RefObject<SVGSVGElement | null>;
  currentProject: BoxProject;
  onImportProject: (project: BoxProject) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  template,
  svgRef,
  currentProject,
  onImportProject,
}) => {
  const [scaleFactor, setScaleFactor] = useState<number>(3); // 3x = ~300 DPI high resolution
  const [lineStyleForExport, setLineStyleForExport] = useState<'black' | 'light_gray' | 'hidden'>('light_gray');
  const [includeLabels, setIncludeLabels] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadPng = async () => {
    if (!svgRef.current) {
      setErrorMessage('Elemento SVG não encontrado para exportação.');
      return;
    }

    try {
      setIsExporting(true);
      setErrorMessage(null);
      setExportSuccess(false);

      const fileName = `molde-${template.id}-personalizada-${Date.now()}.png`;

      await exportSvgToPng(svgRef.current, {
        scale: scaleFactor,
        includeGuidelines: lineStyleForExport !== 'hidden',
        guidelineColor: lineStyleForExport,
        includeLabels: includeLabels,
        fileName: fileName,
      });

      setExportSuccess(true);
    } catch (err: any) {
      console.error('Export error:', err);
      setErrorMessage('Erro ao gerar PNG de alta resolução. Verifique as imagens e tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportProjectJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentProject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `projeto-${template.id}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportProjectJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.modelId && json.faces) {
          onImportProject(json);
          onClose();
        } else {
          setErrorMessage('Arquivo de projeto inválido.');
        }
      } catch (err) {
        setErrorMessage('Não foi possível ler o arquivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        // Closes when clicking backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92dvh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden my-auto">
        {/* Header - Fixed at Top */}
        <div className="shrink-0 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-white/20 backdrop-blur-md rounded-xl">
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-bold">Salvar Molde em Imagem PNG</h3>
                <p className="text-pink-100 text-xs mt-0.5 hidden xs:block sm:block">
                  Exportação nítida em alta definição pronta para imprimir no papel {template.sheetFormat}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
              title="Fechar e voltar para a personalização"
            >
              <X className="w-4 h-4" />
              <span>Fechar</span>
            </button>
          </div>
        </div>

        {/* Content - Scrollable on mobile & desktop */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4 sm:space-y-5 min-h-0">
          {/* Quality Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center justify-between">
              <span>Qualidade da Imagem (Resolução / DPI)</span>
              <span className="text-[11px] text-pink-600 font-semibold">
                {scaleFactor === 3 ? '300 DPI (Recomendado)' : scaleFactor === 4 ? 'Ultra HD' : '150 DPI'}
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setScaleFactor(1.5)}
                className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                  scaleFactor === 1.5
                    ? 'border-pink-500 bg-pink-50/50 text-pink-700 font-bold ring-2 ring-pink-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="block text-xs sm:text-sm">Padrão</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500">150 DPI (Web)</span>
              </button>

              <button
                type="button"
                onClick={() => setScaleFactor(3)}
                className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                  scaleFactor === 3
                    ? 'border-pink-500 bg-pink-50/50 text-pink-700 font-bold ring-2 ring-pink-500/20 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="block text-xs sm:text-sm">300 DPI</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500">Impressão Gráfica</span>
              </button>

              <button
                type="button"
                onClick={() => setScaleFactor(4)}
                className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all ${
                  scaleFactor === 4
                    ? 'border-pink-500 bg-pink-50/50 text-pink-700 font-bold ring-2 ring-pink-500/20'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="block text-xs sm:text-sm">Ultra HD</span>
                <span className="text-[9px] sm:text-[10px] text-slate-500">400 DPI Máxima</span>
              </button>
            </div>
          </div>

          {/* Guidelines Preferences */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wide">
              <Scissors className="w-4 h-4 text-slate-600" />
              <span>Opções de Corte e Vinco no Arquivo PNG</span>
            </div>

            {/* Line Shade for Printing */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Cor das Linhas de Corte e Vinco na Imagem:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLineStyleForExport('light_gray')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    lineStyleForExport === 'light_gray'
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  Cinza Claro (Discreto)
                </button>
                <button
                  type="button"
                  onClick={() => setLineStyleForExport('black')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    lineStyleForExport === 'black'
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  Preto Nítido (Fácil Corte)
                </button>
                <button
                  type="button"
                  onClick={() => setLineStyleForExport('hidden')}
                  className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-all ${
                    lineStyleForExport === 'hidden'
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-bold'
                      : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  Sem Linhas (Só Arte)
                </button>
              </div>
            </div>

            {/* Include Labels Toggle */}
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLabels}
                onChange={(e) => setIncludeLabels(e.target.checked)}
                className="w-4 h-4 text-pink-600 rounded-sm border-slate-300 focus:ring-pink-500"
              />
              <span className="text-xs text-slate-700 font-medium">
                Incluir nomes das faces (ex: Frente, Verso, Lateral)
              </span>
            </label>
          </div>

          {/* Recommended Paper Tip */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Papel Recomendado:</span> {template.recommendedPaper}. Configurado para impressão em folha <strong>{template.sheetFormat}</strong> sem margens ou em escala 100%.
            </div>
          </div>

          {/* Success Notification with direct Return Button */}
          {exportSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex flex-col sm:flex-row items-center justify-between gap-2.5 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="font-bold">Imagem PNG baixada com sucesso!</span>
              </div>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Voltar à Personalização</span>
                <span>→</span>
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              <span>{isExporting ? 'Gerando Imagem em Alta Resolução...' : 'Baixar Imagem PNG em Alta Qualidade'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Direto (A4)</span>
              </button>

              <button
                onClick={handleExportProjectJson}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Salva o arquivo de projeto para continuar editando depois"
              >
                <FileDown className="w-4 h-4" />
                <span>Salvar Projeto (.json)</span>
              </button>

              <label className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <FileUp className="w-4 h-4" />
                <span>Abrir Projeto</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportProjectJson}
                  className="hidden"
                />
              </label>
            </div>

            {/* Clear, Prominent Button to Return to Customization */}
            <div className="pt-2.5 border-t border-slate-200">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 font-bold rounded-xl text-sm border border-slate-300 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span>Voltar para a Personalização da Caixinha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
