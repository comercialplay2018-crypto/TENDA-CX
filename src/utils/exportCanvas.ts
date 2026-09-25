/**
 * Utility to export an SVG element to a High-Resolution PNG (300 DPI ready for print)
 */

export interface ExportOptions {
  scale?: number; // 2 or 3 for ultra-crisp print quality
  includeGuidelines?: boolean;
  guidelineColor?: 'black' | 'light_gray' | 'hidden';
  includeLabels?: boolean;
  fileName?: string;
  dpi?: number;
}

export async function exportSvgToPng(
  svgElement: SVGSVGElement,
  options: ExportOptions = {}
): Promise<string> {
  const {
    scale = 3, // 3x standard resolution (equivalent to ~300 DPI on typical prints)
    includeGuidelines = true,
    guidelineColor = 'black',
    includeLabels = false,
    fileName = 'caixinha-personalizada.png',
  } = options;

  // Clone SVG node so we can manipulate without affecting UI
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  // Set guideline styles on cloned SVG
  const cutLines = clonedSvg.querySelectorAll<SVGPathElement>('.svg-cut-line');
  const creaseLines = clonedSvg.querySelectorAll<SVGPathElement>('.svg-crease-line');
  const labels = clonedSvg.querySelectorAll<SVGElement>('.svg-panel-label, .svg-selection-indicator');

  if (!includeLabels) {
    labels.forEach(el => el.remove());
  }

  if (!includeGuidelines || guidelineColor === 'hidden') {
    cutLines.forEach(el => (el.style.display = 'none'));
    creaseLines.forEach(el => (el.style.display = 'none'));
  } else if (guidelineColor === 'light_gray') {
    cutLines.forEach(el => {
      el.setAttribute('stroke', '#cbd5e1');
      el.setAttribute('stroke-width', '1');
    });
    creaseLines.forEach(el => {
      el.setAttribute('stroke', '#e2e8f0');
      el.setAttribute('stroke-width', '0.75');
    });
  }

  // Remove any active hover/selection classes
  const hoverBoxes = clonedSvg.querySelectorAll('.svg-interactive-hover');
  hoverBoxes.forEach(el => el.remove());

  // Get viewBox or dimensions
  const viewBox = svgElement.viewBox.baseVal;
  const width = (viewBox && viewBox.width > 0) ? viewBox.width : svgElement.clientWidth || 1000;
  const height = (viewBox && viewBox.height > 0) ? viewBox.height : svgElement.clientHeight || 750;

  clonedSvg.setAttribute('width', `${width * scale}px`);
  clonedSvg.setAttribute('height', `${height * scale}px`);

  // Serialize SVG to XML
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clonedSvg);
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(svgBlob);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(width * scale);
        canvas.height = Math.round(height * scale);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(blobUrl);
          reject(new Error('Canvas context could not be created'));
          return;
        }

        // Fill crisp white background (print paper)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Smooth rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(blobUrl);

        const pngUrl = canvas.toDataURL('image/png');

        // Trigger automatic download
        const link = document.createElement('a');
        link.download = fileName;
        link.href = pngUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        resolve(pngUrl);
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(blobUrl);
      reject(err);
    };

    img.src = blobUrl;
  });
}
