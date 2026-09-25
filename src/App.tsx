import React, { useState, useRef, useEffect } from 'react';
import {
  BoxModelId,
  BoxTemplate,
  FaceCustomization,
  TextElement,
  StickerElement,
  BoxProject,
} from './types/box';
import { getTemplateById, ALL_BOX_TEMPLATES } from './data/boxTemplates';
import { Header } from './components/Header';
import { BoxCanvas } from './components/BoxCanvas';
import { PanelInspector } from './components/PanelInspector';
import { GlobalDesignTool } from './components/GlobalDesignTool';
import { TextTool } from './components/TextTool';
import { StickersTool } from './components/StickersTool';
import { TemplateSelector } from './components/TemplateSelector';
import { ExportModal } from './components/ExportModal';
import { HelpModal } from './components/HelpModal';
import { VercelDeployGuide } from './components/VercelDeployGuide';
import {
  Layers,
  Palette,
  Type,
  Smile,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface ProjectHistoryState {
  faces: Record<string, FaceCustomization>;
  texts: TextElement[];
  stickers: StickerElement[];
  globalBackgroundColor: string;
}

export default function App() {
  const [selectedModelId, setSelectedModelId] = useState<BoxModelId>('milk');
  const template = getTemplateById(selectedModelId);

  // Inspector Tabs
  const [activeTab, setActiveTab] = useState<'panel' | 'global' | 'text' | 'stickers'>('panel');

  // Selected Entities
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>('milk_face_front');
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

  // Project Design State
  const [globalBackgroundColor, setGlobalBackgroundColor] = useState<string>('#ffffff');
  const [faces, setFaces] = useState<Record<string, FaceCustomization>>({});
  const [texts, setTexts] = useState<TextElement[]>([
    {
      id: 'text-initial-1',
      text: 'Maria Clara',
      x: 400,
      y: 430,
      fontSize: 26,
      fontFamily: 'Pacifico',
      color: '#db2777',
      strokeColor: '#ffffff',
      strokeWidth: 4,
      fontWeight: 'bold',
      rotation: 0,
      align: 'center',
      shadow: true,
    },
    {
      id: 'text-initial-2',
      text: '5 ANOS',
      x: 400,
      y: 470,
      fontSize: 16,
      fontFamily: 'Fredoka',
      color: '#9d174d',
      strokeColor: '#ffffff',
      strokeWidth: 3,
      fontWeight: 'bold',
      rotation: 0,
      align: 'center',
      shadow: false,
    },
  ]);
  const [stickers, setStickers] = useState<StickerElement[]>([]);

  // Visual Guides
  const [showCutLines, setShowCutLines] = useState<boolean>(true);
  const [showCreaseLines, setShowCreaseLines] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [lineStyle, setLineStyle] = useState<'black' | 'light_gray' | 'hidden'>('black');

  // Modals
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState<boolean>(false);

  // Undo / Redo History
  const [history, setHistory] = useState<ProjectHistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const isUndoRedoAction = useRef<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Save state to undo history
  const pushHistory = (state: ProjectHistoryState) => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }
    setHistory((prev) => {
      const nextHistory = prev.slice(0, historyIndex + 1);
      return [...nextHistory, state].slice(-25); // keep last 25 steps
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 24));
  };

  // Initial history snapshot
  useEffect(() => {
    pushHistory({
      faces: {},
      texts: texts,
      stickers: [],
      globalBackgroundColor: '#ffffff',
    });
  }, []);

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const targetState = history[historyIndex - 1];
      setFaces(targetState.faces);
      setTexts(targetState.texts);
      setStickers(targetState.stickers);
      setGlobalBackgroundColor(targetState.globalBackgroundColor);
      setHistoryIndex((prev) => prev - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const targetState = history[historyIndex + 1];
      setFaces(targetState.faces);
      setTexts(targetState.texts);
      setStickers(targetState.stickers);
      setGlobalBackgroundColor(targetState.globalBackgroundColor);
      setHistoryIndex((prev) => prev + 1);
    }
  };

  // Switch Model
  const handleSelectModel = (modelId: BoxModelId) => {
    setSelectedModelId(modelId);
    const newTpl = getTemplateById(modelId);
    // Find primary front face of new model
    const primaryFace = newTpl.panels.find((p) => p.type === 'main_face')?.id || newTpl.panels[0].id;
    setSelectedPanelId(primaryFace);

    // Adjust sample text position for new template
    if (modelId === 'piramide') {
      setTexts([
        {
          id: 'text-initial-pyr',
          text: 'Maria Clara',
          x: 400,
          y: 560,
          fontSize: 26,
          fontFamily: 'Pacifico',
          color: '#db2777',
          strokeColor: '#ffffff',
          strokeWidth: 4,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: true,
        },
      ]);
    } else if (modelId === 'castelo') {
      setTexts([
        {
          id: 'text-initial-castelo-1',
          text: 'Princesa Sophia',
          x: 400,
          y: 360,
          fontSize: 26,
          fontFamily: 'Pacifico',
          color: '#be185d',
          strokeColor: '#ffffff',
          strokeWidth: 4,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: true,
        },
        {
          id: 'text-initial-castelo-2',
          text: '1 ANINHO',
          x: 400,
          y: 405,
          fontSize: 16,
          fontFamily: 'Fredoka',
          color: '#831843',
          strokeColor: '#ffffff',
          strokeWidth: 3,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: false,
        },
      ]);
    } else if (modelId === 'sushi') {
      setTexts([
        {
          id: 'text-initial-sushi-1',
          text: 'Meu Aniversário',
          x: 470,
          y: 340,
          fontSize: 22,
          fontFamily: 'Pacifico',
          color: '#be185d',
          strokeColor: '#ffffff',
          strokeWidth: 4,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: true,
        },
      ]);
    } else if (modelId === 'bolsinha') {
      setTexts([
        {
          id: 'text-initial-bolsinha-1',
          text: 'Com Carinho',
          x: 195,
          y: 360,
          fontSize: 24,
          fontFamily: 'Pacifico',
          color: '#be185d',
          strokeColor: '#ffffff',
          strokeWidth: 4,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: true,
        },
      ]);
    } else if (modelId === 'sacolinha') {
      setTexts([
        {
          id: 'text-initial-sacolinha-1',
          text: 'Obrigado pela Presença!',
          x: 195,
          y: 390,
          fontSize: 20,
          fontFamily: 'Fredoka',
          color: '#be185d',
          strokeColor: '#ffffff',
          strokeWidth: 3,
          fontWeight: 'bold',
          rotation: 0,
          align: 'center',
          shadow: true,
        },
      ]);
    }
  };

  // Face Customization
  const handleUpdateFace = (panelId: string, updates: Partial<FaceCustomization>) => {
    const nextFaces = {
      ...faces,
      [panelId]: {
        ...(faces[panelId] || {
          scale: 1,
          offsetX: 0,
          offsetY: 0,
          rotation: 0,
          fitMode: 'cover',
          backgroundColor: '#ffffff',
          opacity: 1,
        }),
        ...updates,
      },
    };
    setFaces(nextFaces);
    pushHistory({ faces: nextFaces, texts, stickers, globalBackgroundColor });
  };

  const handleApplyToAllFaces = (sourceFace: FaceCustomization) => {
    const nextFaces = { ...faces };
    template.panels
      .filter((p) => p.isCustomizable && (p.type === 'main_face' || p.type === 'roof'))
      .forEach((p) => {
        nextFaces[p.id] = { ...sourceFace };
      });
    setFaces(nextFaces);
    pushHistory({ faces: nextFaces, texts, stickers, globalBackgroundColor });
  };

  const handleApplyGlobalPattern = (patternUri: string) => {
    const nextFaces = { ...faces };
    template.panels
      .filter((p) => p.isCustomizable)
      .forEach((p) => {
        nextFaces[p.id] = {
          ...(faces[p.id] || { scale: 1, offsetX: 0, offsetY: 0, rotation: 0, backgroundColor: '#ffffff', opacity: 1 }),
          imageUrl: patternUri,
          fitMode: 'tile',
        };
      });
    setFaces(nextFaces);
    pushHistory({ faces: nextFaces, texts, stickers, globalBackgroundColor });
  };

  const handleClearFace = (panelId: string) => {
    const nextFaces = { ...faces };
    delete nextFaces[panelId];
    setFaces(nextFaces);
    pushHistory({ faces: nextFaces, texts, stickers, globalBackgroundColor });
  };

  const handleClearAllImages = () => {
    setFaces({});
    pushHistory({ faces: {}, texts, stickers, globalBackgroundColor });
  };

  // Drag & drop file directly on a panel
  const handleImageDropOnPanel = (panelId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      handleUpdateFace(panelId, {
        imageUrl: url,
        scale: 1,
        offsetX: 0,
        offsetY: 0,
        fitMode: 'cover',
      });
      setSelectedPanelId(panelId);
      setActiveTab('panel');
    };
    reader.readAsDataURL(file);
  };

  // Text Handlers
  const handleAddText = (preset?: Partial<TextElement>) => {
    const primaryPanel = template.panels.find((p) => p.id === selectedPanelId) || template.panels[1];
    const newText: TextElement = {
      id: `text-${Date.now()}`,
      text: preset?.text || 'Novo Texto',
      x: primaryPanel?.center.x || 400,
      y: primaryPanel?.center.y || 400,
      fontSize: preset?.fontSize || 26,
      fontFamily: preset?.fontFamily || 'Fredoka',
      color: preset?.color || '#db2777',
      strokeColor: preset?.strokeColor || '#ffffff',
      strokeWidth: preset?.strokeWidth ?? 4,
      fontWeight: preset?.fontWeight || 'bold',
      rotation: 0,
      align: preset?.align || 'center',
      shadow: true,
    };

    const nextTexts = [...texts, newText];
    setTexts(nextTexts);
    setSelectedTextId(newText.id);
    setActiveTab('text');
    pushHistory({ faces, texts: nextTexts, stickers, globalBackgroundColor });
  };

  const handleUpdateText = (id: string, updates: Partial<TextElement>) => {
    const nextTexts = texts.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTexts(nextTexts);
    pushHistory({ faces, texts: nextTexts, stickers, globalBackgroundColor });
  };

  const handleUpdateTextPosition = (id: string, x: number, y: number) => {
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, x, y } : t)));
  };

  const handleDeleteText = (id: string) => {
    const nextTexts = texts.filter((t) => t.id !== id);
    setTexts(nextTexts);
    if (selectedTextId === id) setSelectedTextId(null);
    pushHistory({ faces, texts: nextTexts, stickers, globalBackgroundColor });
  };

  const handleDuplicateText = (id: string) => {
    const item = texts.find((t) => t.id === id);
    if (!item) return;
    const duplicated: TextElement = {
      ...item,
      id: `text-${Date.now()}`,
      x: item.x + 20,
      y: item.y + 20,
    };
    const nextTexts = [...texts, duplicated];
    setTexts(nextTexts);
    setSelectedTextId(duplicated.id);
    pushHistory({ faces, texts: nextTexts, stickers, globalBackgroundColor });
  };

  // Sticker Handlers
  const handleAddSticker = (url: string, name: string, width = 100, height = 100) => {
    const primaryPanel = template.panels.find((p) => p.id === selectedPanelId) || template.panels[1];
    const newSticker: StickerElement = {
      id: `sticker-${Date.now()}`,
      url,
      name,
      x: (primaryPanel?.center.x || 400) - width / 2,
      y: (primaryPanel?.center.y || 400) - height / 2,
      width,
      height,
      rotation: 0,
      opacity: 1,
    };

    const nextStickers = [...stickers, newSticker];
    setStickers(nextStickers);
    setSelectedStickerId(newSticker.id);
    setActiveTab('stickers');
    pushHistory({ faces, texts, stickers: nextStickers, globalBackgroundColor });
  };

  const handleUpdateSticker = (id: string, updates: Partial<StickerElement>) => {
    const nextStickers = stickers.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStickers(nextStickers);
    pushHistory({ faces, texts, stickers: nextStickers, globalBackgroundColor });
  };

  const handleUpdateStickerPosition = (id: string, x: number, y: number) => {
    setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, x, y } : s)));
  };

  const handleDeleteSticker = (id: string) => {
    const nextStickers = stickers.filter((s) => s.id !== id);
    setStickers(nextStickers);
    if (selectedStickerId === id) setSelectedStickerId(null);
    pushHistory({ faces, texts, stickers: nextStickers, globalBackgroundColor });
  };

  const handleDuplicateSticker = (id: string) => {
    const item = stickers.find((s) => s.id === id);
    if (!item) return;
    const duplicated: StickerElement = {
      ...item,
      id: `sticker-${Date.now()}`,
      x: item.x + 20,
      y: item.y + 20,
    };
    const nextStickers = [...stickers, duplicated];
    setStickers(nextStickers);
    setSelectedStickerId(duplicated.id);
    pushHistory({ faces, texts, stickers: nextStickers, globalBackgroundColor });
  };

  const handleResetProject = () => {
    if (window.confirm('Deseja realmente limpar toda a personalização desta caixinha?')) {
      setFaces({});
      setTexts([]);
      setStickers([]);
      setGlobalBackgroundColor('#ffffff');
    }
  };

  const handleImportProject = (proj: BoxProject) => {
    if (proj.modelId && proj.modelId !== selectedModelId) {
      setSelectedModelId(proj.modelId);
    }
    setFaces(proj.faces || {});
    setTexts(proj.texts || []);
    setStickers(proj.stickers || []);
    setGlobalBackgroundColor(proj.globalBackgroundColor || '#ffffff');
  };

  const currentProject: BoxProject = {
    id: `project-${Date.now()}`,
    name: `Caixinha ${template.name}`,
    modelId: selectedModelId,
    globalBackgroundColor,
    faces,
    texts,
    stickers,
    showCutLines,
    showCreaseLines,
    showLabels,
    lineStyle,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const activePanelObj = template.panels.find((p) => p.id === selectedPanelId) || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      {/* Top Navigation Bar */}
      <Header
        currentTemplate={template}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenTemplateSelector={() => setIsTemplateSelectorOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onResetProject={handleResetProject}
      />

      {/* Mobile Quick Model Switcher (Horizontal scrollable bar so user can tap any model immediately on phone) */}
      <div className="md:hidden bg-white/95 backdrop-blur-xs border-b border-slate-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto touch-pan-x shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-0.5">
          Modelos:
        </span>
        {ALL_BOX_TEMPLATES.map((tpl) => {
          const isSelected = tpl.id === selectedModelId;
          return (
            <button
              key={tpl.id}
              onClick={() => handleSelectModel(tpl.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tpl.id === 'castelo' ? '🏰 ' : tpl.id === 'piramide' ? '🔺 ' : tpl.id === 'milk' ? '🥛 ' : tpl.id === 'sushi' ? '🍱 ' : tpl.id === 'bolsinha' ? '👜 ' : tpl.id === 'sacolinha' ? '🛍️ ' : tpl.id === 'bala' ? '🍬 ' : '📦 '}
              {tpl.name}
            </button>
          );
        })}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left / Center: Interactive SVG Box Canvas */}
        <BoxCanvas
          template={template}
          globalBackgroundColor={globalBackgroundColor}
          faces={faces}
          texts={texts}
          stickers={stickers}
          selectedPanelId={selectedPanelId}
          selectedTextId={selectedTextId}
          selectedStickerId={selectedStickerId}
          showCutLines={showCutLines}
          showCreaseLines={showCreaseLines}
          showLabels={showLabels}
          lineStyle={lineStyle}
          onSelectPanel={(panelId) => {
            setSelectedPanelId(panelId);
            setActiveTab('panel');
          }}
          onSelectText={(textId) => {
            setSelectedTextId(textId);
            if (textId) setActiveTab('text');
          }}
          onSelectSticker={(stickerId) => {
            setSelectedStickerId(stickerId);
            if (stickerId) setActiveTab('stickers');
          }}
          onUpdateTextPosition={handleUpdateTextPosition}
          onUpdateStickerPosition={handleUpdateStickerPosition}
          onImageDropOnPanel={handleImageDropOnPanel}
          svgRef={svgRef}
        />

        {/* Right Sidebar: Tools & Inspector */}
        <div className="w-full md:w-96 lg:w-[410px] bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col h-[48vh] md:h-auto shadow-lg z-20">
          {/* Tabs header */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveTab('panel')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'panel'
                  ? 'border-pink-600 text-pink-600 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lados ({template.panels.filter(p => p.isCustomizable).length})</span>
            </button>

            <button
              onClick={() => setActiveTab('global')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'global'
                  ? 'border-pink-600 text-pink-600 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Fundo & Cores</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'text'
                  ? 'border-pink-600 text-pink-600 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Textos {texts.length > 0 && `(${texts.length})`}</span>
            </button>

            <button
              onClick={() => setActiveTab('stickers')}
              className={`flex-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'stickers'
                  ? 'border-pink-600 text-pink-600 bg-white'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Smile className="w-4 h-4" />
              <span>Apliques</span>
            </button>
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {activeTab === 'panel' && (
              <PanelInspector
                panel={activePanelObj}
                allPanels={template.panels}
                faceData={selectedPanelId ? faces[selectedPanelId] : undefined}
                onSelectPanel={setSelectedPanelId}
                onUpdateFace={handleUpdateFace}
                onApplyToAllFaces={handleApplyToAllFaces}
                onClearFace={handleClearFace}
              />
            )}

            {activeTab === 'global' && (
              <GlobalDesignTool
                globalBackgroundColor={globalBackgroundColor}
                onUpdateGlobalColor={(color) => {
                  setGlobalBackgroundColor(color);
                  pushHistory({ faces, texts, stickers, globalBackgroundColor: color });
                }}
                onApplyGlobalPattern={handleApplyGlobalPattern}
                showCutLines={showCutLines}
                onToggleCutLines={() => setShowCutLines(!showCutLines)}
                showCreaseLines={showCreaseLines}
                onToggleCreaseLines={() => setShowCreaseLines(!showCreaseLines)}
                showLabels={showLabels}
                onToggleLabels={() => setShowLabels(!showLabels)}
                lineStyle={lineStyle}
                onChangeLineStyle={setLineStyle}
                onClearAllImages={handleClearAllImages}
              />
            )}

            {activeTab === 'text' && (
              <TextTool
                texts={texts}
                selectedTextId={selectedTextId}
                onSelectText={setSelectedTextId}
                onAddText={handleAddText}
                onUpdateText={handleUpdateText}
                onDeleteText={handleDeleteText}
                onDuplicateText={handleDuplicateText}
              />
            )}

            {activeTab === 'stickers' && (
              <StickersTool
                stickers={stickers}
                selectedStickerId={selectedStickerId}
                onSelectSticker={setSelectedStickerId}
                onAddSticker={handleAddSticker}
                onUpdateSticker={handleUpdateSticker}
                onDeleteSticker={handleDeleteSticker}
                onDuplicateSticker={handleDuplicateSticker}
              />
            )}
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      <TemplateSelector
        selectedModelId={selectedModelId}
        onSelectModel={handleSelectModel}
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
      />

      {/* High Quality PNG Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        template={template}
        svgRef={svgRef}
        currentProject={currentProject}
        onImportProject={handleImportProject}
      />

      {/* Instructions / Help Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Vercel Deployment & PWA Mobile Guide Modal */}
      <VercelDeployGuide
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />
    </div>
  );
}
