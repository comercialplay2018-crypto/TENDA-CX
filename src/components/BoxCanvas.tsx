import React, { useRef, useState } from 'react';
import {
  BoxTemplate,
  BoxPanel,
  FaceCustomization,
  TextElement,
  StickerElement,
} from '../types/box';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Image as ImageIcon,
  RotateCcw,
  Eye,
  EyeOff,
  Move,
} from 'lucide-react';

interface BoxCanvasProps {
  template: BoxTemplate;
  globalBackgroundColor: string;
  faces: Record<string, FaceCustomization>;
  texts: TextElement[];
  stickers: StickerElement[];
  selectedPanelId: string | null;
  selectedTextId: string | null;
  selectedStickerId: string | null;
  showCutLines: boolean;
  showCreaseLines: boolean;
  showLabels: boolean;
  lineStyle: 'black' | 'light_gray' | 'hidden';
  onSelectPanel: (panelId: string) => void;
  onSelectText: (textId: string | null) => void;
  onSelectSticker: (stickerId: string | null) => void;
  onUpdateTextPosition: (id: string, x: number, y: number) => void;
  onUpdateStickerPosition: (id: string, x: number, y: number) => void;
  onImageDropOnPanel: (panelId: string, file: File) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

export const BoxCanvas: React.FC<BoxCanvasProps> = ({
  template,
  globalBackgroundColor,
  faces,
  texts,
  stickers,
  selectedPanelId,
  selectedTextId,
  selectedStickerId,
  showCutLines,
  showCreaseLines,
  showLabels,
  lineStyle,
  onSelectPanel,
  onSelectText,
  onSelectSticker,
  onUpdateTextPosition,
  onUpdateStickerPosition,
  onImageDropOnPanel,
  svgRef,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [dragOverPanelId, setDragOverPanelId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dragging states for text and stickers
  const [draggingItem, setDraggingItem] = useState<{
    type: 'text' | 'sticker';
    id: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.15, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.15, 0.4));
  const handleResetZoom = () => setZoom(1);

  // Convert client coordinates to SVG virtual coordinates
  const clientToSvgPoint = (clientX: number, clientY: number): { x: number; y: number } => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: Math.round(transformed.x), y: Math.round(transformed.y) };
  };

  // Mouse move handler for dragging text or stickers on SVG
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingItem) return;
    const currentPt = clientToSvgPoint(e.clientX, e.clientY);
    const deltaX = currentPt.x - draggingItem.startX;
    const deltaY = currentPt.y - draggingItem.startY;

    const newX = Math.round(draggingItem.initialX + deltaX);
    const newY = Math.round(draggingItem.initialY + deltaY);

    if (draggingItem.type === 'text') {
      onUpdateTextPosition(draggingItem.id, newX, newY);
    } else if (draggingItem.type === 'sticker') {
      onUpdateStickerPosition(draggingItem.id, newX, newY);
    }
  };

  const handleSvgMouseUp = () => {
    if (draggingItem) {
      setDraggingItem(null);
    }
  };

  // Line style colors
  const cutStrokeColor = lineStyle === 'light_gray' ? '#cbd5e1' : lineStyle === 'hidden' ? 'transparent' : '#1e293b';
  const creaseStrokeColor = lineStyle === 'light_gray' ? '#e2e8f0' : lineStyle === 'hidden' ? 'transparent' : '#475569';

  return (
    <div className="relative flex-1 flex flex-col bg-slate-100 overflow-hidden select-none">
      {/* Floating Canvas Action Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-slate-200 shadow-lg text-slate-700">
        <button
          onClick={handleZoomOut}
          title="Diminuir Zoom"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold px-1 text-slate-600 min-w-10 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          title="Aumentar Zoom"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          title="Ajustar 100%"
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>100%</span>
        </button>
      </div>

      {/* Floating Info Pill about Drag & Drop */}
      <div className="hidden sm:flex absolute bottom-4 left-4 z-20 items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-md text-xs text-slate-600">
        <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
        <span>
          <strong>Dica:</strong> Clique em qualquer lado para personalizar ou <strong>arraste uma foto diretamente</strong> sobre o molde!
        </span>
      </div>

      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex items-center justify-center p-6 sm:p-10"
        onClick={() => {
          // Click on background unselects text and stickers
          onSelectText(null);
          onSelectSticker(null);
        }}
      >
        {/* Printable Paper Card (White A4 representation with shadow) */}
        <div
          className="bg-white rounded-lg shadow-2xl transition-transform duration-100 ease-out border border-slate-300"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${template.canvasWidth} ${template.canvasHeight}`}
            width={template.canvasWidth}
            height={template.canvasHeight}
            className="w-auto h-auto max-w-none block"
            style={{ maxWidth: '100%', maxHeight: '82vh' }}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
          >
            <defs>
              {/* Drop shadow for text & cliparts */}
              <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
              </filter>
              <filter id="selectionGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ec4899" floodOpacity="0.6" />
              </filter>

              {/* ClipPaths for each panel */}
              {template.panels.map((panel) => {
                const pointsStr = panel.points.map(p => `${p.x},${p.y}`).join(' ');
                return (
                  <clipPath key={`clip-${panel.id}`} id={`clip-${panel.id}`}>
                    <polygon points={pointsStr} />
                  </clipPath>
                );
              })}

              {/* Pattern definitions for each panel if tile mode is enabled */}
              {template.panels.map((panel) => {
                const face = faces[panel.id];
                if (!face?.imageUrl || face.fitMode !== 'tile') return null;

                const tileScale = (face.scale || 1) * 80;
                return (
                  <pattern
                    key={`pattern-${panel.id}`}
                    id={`pattern-${panel.id}`}
                    patternUnits="userSpaceOnUse"
                    width={tileScale}
                    height={tileScale}
                  >
                    <image
                      href={face.imageUrl}
                      width={tileScale}
                      height={tileScale}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                );
              })}
            </defs>

            {/* Base Sheet Background (Pure White Print Cardstock) */}
            <rect
              width={template.canvasWidth}
              height={template.canvasHeight}
              fill="#ffffff"
            />

            {/* Render Each Panel */}
            {template.panels.map((panel) => {
              const face = faces[panel.id];
              const isSelected = selectedPanelId === panel.id;
              const isDragOver = dragOverPanelId === panel.id;
              const pointsStr = panel.points.map(p => `${p.x},${p.y}`).join(' ');
              const bb = panel.boundingBox;

              // Background color priority: face specific color -> global background color -> white/gray for glue tabs
              const panelBg =
                face?.backgroundColor ||
                (panel.type === 'glue_tab'
                  ? '#f8fafc'
                  : globalBackgroundColor || '#ffffff');

              return (
                <g
                  key={panel.id}
                  id={`panel-group-${panel.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPanel(panel.id);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverPanelId(panel.id);
                  }}
                  onDragLeave={() => {
                    setDragOverPanelId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverPanelId(null);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      onImageDropOnPanel(panel.id, e.dataTransfer.files[0]);
                    }
                  }}
                  className="cursor-pointer group"
                >
                  {/* Panel Background Fill (Clipped to Panel Polygon) */}
                  <polygon
                    points={pointsStr}
                    fill={panelBg}
                    className="transition-colors duration-150"
                  />

                  {/* Panel Image Fill (Clipped to exact panel polygon) */}
                  {face?.imageUrl && (
                    <g clipPath={`url(#clip-${panel.id})`}>
                      {face.fitMode === 'tile' ? (
                        <polygon
                          points={pointsStr}
                          fill={`url(#pattern-${panel.id})`}
                          opacity={face.opacity ?? 1}
                        />
                      ) : (
                        <g
                          transform={`
                            translate(${panel.center.x} ${panel.center.y})
                            rotate(${face.rotation || 0})
                            translate(${-panel.center.x} ${-panel.center.y})
                          `}
                        >
                          <image
                            href={face.imageUrl}
                            x={bb.minX + (face.offsetX || 0) - ((bb.width * (face.scale - 1)) / 2)}
                            y={bb.minY + (face.offsetY || 0) - ((bb.height * (face.scale - 1)) / 2)}
                            width={bb.width * (face.scale || 1)}
                            height={bb.height * (face.scale || 1)}
                            preserveAspectRatio={
                              face.fitMode === 'contain'
                                ? 'xMidYMid meet'
                                : face.fitMode === 'stretch'
                                ? 'none'
                                : 'xMidYMid slice' // cover default
                            }
                            opacity={face.opacity ?? 1}
                          />
                        </g>
                      )}
                    </g>
                  )}

                  {/* Empty Face State & Helper Text (shown only when no image & not glue tab) */}
                  {!face?.imageUrl && panel.isCustomizable && (
                    <g
                      className="transition-opacity duration-150"
                      opacity={isSelected ? 0.9 : 0.45}
                    >
                      {/* Subtle Camera / Photo icon in center */}
                      <circle
                        cx={panel.center.x}
                        cy={panel.center.y - 12}
                        r="18"
                        fill="#f1f5f9"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />
                      <g transform={`translate(${panel.center.x - 10}, ${panel.center.y - 22}) scale(0.85)`}>
                        <path
                          d="M4 8V6a2 2 0 0 1 2-2h2l1.5-2h5L16 4h2a2 2 0 0 1 2 2v2M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                          fill="none"
                          stroke="#64748b"
                          strokeWidth="2"
                        />
                      </g>

                      {/* Face Label on Canvas */}
                      <text
                        x={panel.center.x}
                        y={panel.center.y + 16}
                        textAnchor="middle"
                        fill="#475569"
                        fontSize="12"
                        fontWeight="600"
                        fontFamily="Poppins, sans-serif"
                        className="pointer-events-none"
                      >
                        {panel.shortName}
                      </text>
                      <text
                        x={panel.center.x}
                        y={panel.center.y + 30}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="9.5"
                        fontFamily="Poppins, sans-serif"
                        className="pointer-events-none"
                      >
                        Clique p/ foto
                      </text>
                    </g>
                  )}

                  {/* Glue Tab Notice Text */}
                  {panel.type === 'glue_tab' && (
                    <text
                      x={panel.center.x}
                      y={panel.center.y}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      fontWeight="500"
                      fontFamily="Poppins, sans-serif"
                      transform={`rotate(-90 ${panel.center.x} ${panel.center.y})`}
                      className="pointer-events-none select-none"
                    >
                      ABA DE COLAGEM
                    </text>
                  )}

                  {/* Interactive Hover Highlight */}
                  <polygon
                    points={pointsStr}
                    fill="#ec4899"
                    fillOpacity="0"
                    className="hover:fill-opacity-10 transition-colors pointer-events-none svg-interactive-hover"
                  />

                  {/* Active Selection Ring / Dash */}
                  {isSelected && (
                    <polygon
                      points={pointsStr}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3.5"
                      strokeDasharray="8 5"
                      className="svg-selection-indicator animate-pulse pointer-events-none"
                    />
                  )}

                  {/* Drag Over Highlight */}
                  {isDragOver && (
                    <polygon
                      points={pointsStr}
                      fill="#ec4899"
                      fillOpacity="0.25"
                      stroke="#db2777"
                      strokeWidth="4"
                      className="pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Die-Cut Solid Lines (Corte Externo) */}
            {showCutLines &&
              template.cutLines.map((line) => (
                <path
                  key={line.id}
                  d={line.d}
                  fill="none"
                  stroke={cutStrokeColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="svg-cut-line pointer-events-none"
                />
              ))}

            {/* Creasing Dashed Lines (Vincos e Dobras tracejadas como no gabarito enviado) */}
            {showCreaseLines &&
              template.creaseLines.map((line) => (
                <path
                  key={line.id}
                  d={line.d}
                  fill="none"
                  stroke={creaseStrokeColor}
                  strokeWidth="1.5"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="svg-crease-line pointer-events-none"
                />
              ))}

            {/* Special Markings (like Ribbon Holes) */}
            {template.specialMarkings?.map((mark, i) => {
              if (mark.type === 'circle' && mark.cx !== undefined && mark.cy !== undefined) {
                return (
                  <circle
                    key={`mark-${i}`}
                    cx={mark.cx}
                    cy={mark.cy}
                    r={mark.r || 4}
                    fill="#ffffff"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                    className="svg-cut-line pointer-events-none"
                  />
                );
              }
              return null;
            })}

            {/* Sticker Elements */}
            {stickers.map((sticker) => {
              const isSelected = selectedStickerId === sticker.id;
              const centerX = sticker.x + sticker.width / 2;
              const centerY = sticker.y + sticker.height / 2;

              return (
                <g
                  key={sticker.id}
                  id={`sticker-${sticker.id}`}
                  transform={`rotate(${sticker.rotation || 0} ${centerX} ${centerY})`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onSelectSticker(sticker.id);
                    onSelectText(null);
                    const pt = clientToSvgPoint(e.clientX, e.clientY);
                    setDraggingItem({
                      type: 'sticker',
                      id: sticker.id,
                      startX: pt.x,
                      startY: pt.y,
                      initialX: sticker.x,
                      initialY: sticker.y,
                    });
                  }}
                  className="cursor-move"
                >
                  <image
                    href={sticker.url}
                    x={sticker.x}
                    y={sticker.y}
                    width={sticker.width}
                    height={sticker.height}
                    opacity={sticker.opacity ?? 1}
                  />

                  {/* Selection Bounding Box */}
                  {isSelected && (
                    <rect
                      x={sticker.x - 4}
                      y={sticker.y - 4}
                      width={sticker.width + 8}
                      height={sticker.height + 8}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="svg-selection-indicator pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Custom Text Elements */}
            {texts.map((item) => {
              const isSelected = selectedTextId === item.id;

              return (
                <g
                  key={item.id}
                  id={`text-${item.id}`}
                  transform={`rotate(${item.rotation || 0} ${item.x} ${item.y})`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onSelectText(item.id);
                    onSelectSticker(null);
                    const pt = clientToSvgPoint(e.clientX, e.clientY);
                    setDraggingItem({
                      type: 'text',
                      id: item.id,
                      startX: pt.x,
                      startY: pt.y,
                      initialX: item.x,
                      initialY: item.y,
                    });
                  }}
                  className="cursor-move group"
                >
                  {/* Render with SVG Stroke / Contour (Efeito de contorno da papelaria) */}
                  <text
                    x={item.x}
                    y={item.y}
                    textAnchor={item.align === 'left' ? 'start' : item.align === 'right' ? 'end' : 'middle'}
                    fontSize={item.fontSize}
                    fontFamily={item.fontFamily}
                    fontWeight={item.fontWeight || 'normal'}
                    fontStyle={item.fontStyle || 'normal'}
                    fill={item.color}
                    stroke={item.strokeColor}
                    strokeWidth={item.strokeWidth || 0}
                    paintOrder="stroke fill"
                    strokeLinejoin="round"
                    filter={item.shadow ? 'url(#textGlow)' : undefined}
                    className="select-none"
                  >
                    {item.text}
                  </text>

                  {/* Selection Indicator for Text */}
                  {isSelected && (
                    <rect
                      x={item.x - (item.fontSize * item.text.length * 0.3)}
                      y={item.y - item.fontSize * 0.9}
                      width={item.fontSize * item.text.length * 0.6 + 16}
                      height={item.fontSize * 1.2}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      className="svg-selection-indicator pointer-events-none"
                    />
                  )}
                </g>
              );
            })}

            {/* Optional Face Labels (Can be toggled off for clean print preview) */}
            {showLabels &&
              template.panels.map((panel) => {
                if (!panel.isCustomizable) return null;
                const face = faces[panel.id];
                if (face?.imageUrl) {
                  // Subtle top badge when image is present
                  return (
                    <g
                      key={`badge-${panel.id}`}
                      className="svg-panel-label pointer-events-none"
                    >
                      <rect
                        x={panel.center.x - 36}
                        y={panel.boundingBox.minY + 8}
                        width="72"
                        height="18"
                        rx="9"
                        fill="rgba(0, 0, 0, 0.65)"
                      />
                      <text
                        x={panel.center.x}
                        y={panel.boundingBox.minY + 20}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="Poppins, sans-serif"
                      >
                        {panel.shortName}
                      </text>
                    </g>
                  );
                }
                return null;
              })}
          </svg>
        </div>
      </div>
    </div>
  );
};
