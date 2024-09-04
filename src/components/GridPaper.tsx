import React from 'react';
import { GridSize, PaperSize, GridAlignment } from '../App';

interface GridPaperProps {
  gridSize: GridSize;
  paperSize: PaperSize;
  gridColor: string;
  showBorder: boolean;
  showExtraMargin: boolean;
  showPageNumberInGrid: boolean;
  minimumMargin: number;
  pageNumber: number;
  side: 'Left' | 'Right';
  gridAlignment: GridAlignment;
}

const GridPaper: React.FC<GridPaperProps> = ({ 
  gridSize, 
  paperSize, 
  gridColor, 
  showBorder, 
  showExtraMargin,
  showPageNumberInGrid,
  minimumMargin,
  pageNumber, 
  side,
  gridAlignment
}) => {
  const getPaperDimensions = (size: PaperSize): { width: number; height: number } => {
    switch (size) {
      case 'a7': return { width: 74, height: 105 };
      case 'a6': return { width: 105, height: 148 };
      case 'a5': return { width: 148, height: 210 };
      case 'b6': return { width: 128, height: 182 };
      case 'b6-slim': return { width: 120, height: 170 };
      case 'b5': return { width: 176, height: 250 };
      case 'b5-slim': return { width: 182, height: 257 };
      case 'fc-compact': return { width: 108, height: 171 };
      case 'personal': return { width: 95, height: 171 };
      case 'personal-wide': return { width: 122, height: 171 };
      case 'pocket': return { width: 81, height: 120 };
      case 'pocket-plus': return { width: 89, height: 140 };
      case 'half-letter': return { width: 140, height: 216 };
      case 'tn-standard': return { width: 110, height: 210 };
      case 'tns-plus': return { width: 115, height: 210 }; // 0.5cm (5mm) wider than tn-standard
      case 'tn-passport': return { width: 90, height: 130 };
      case 'hobonichi-weeks': return { width: 95, height: 190 };
    }
  };

  const { width, height } = getPaperDimensions(paperSize);
  const gridSizeNum = parseFloat(gridSize);
  const margin = minimumMargin;
  const extraMargin = showExtraMargin ? 10 : 0; // 1cm extra margin if enabled

  // Calculate the number of rows and columns
  const columns = Math.floor((width - 2 * margin - extraMargin) / gridSizeNum);
  const rows = Math.floor((height - 2 * margin) / gridSizeNum);

  // Calculate the actual grid width and height
  const gridWidth = columns * gridSizeNum;
  const gridHeight = rows * gridSizeNum;

  // Calculate the starting position to align the grid
  const startX = (() => {
    if (gridAlignment === 'center') {
      return (width - gridWidth - extraMargin) / 2;
    } else { // 'float'
      return side === 'Left' 
        ? margin 
        : width - margin - gridWidth - extraMargin;
    }
  })();

  // Apply extra margin to the correct side
  const extraMarginOffset = side === 'Left' ? 0 : extraMargin;
  const adjustedStartX = startX + extraMarginOffset;

  const startY = (height - gridHeight) / 2;

  const createGridLines = () => {
    const lines = [];
    // Vertical lines
    for (let i = 0; i <= columns; i++) {
      const x = adjustedStartX + i * gridSizeNum;
      lines.push(<line key={`v${i}`} x1={`${x}mm`} y1={`${startY}mm`} x2={`${x}mm`} y2={`${startY + gridHeight}mm`} stroke={gridColor} strokeWidth="0.1" />);
    }
    // Horizontal lines
    for (let i = 0; i <= rows; i++) {
      const y = startY + i * gridSizeNum;
      lines.push(<line key={`h${i}`} x1={`${adjustedStartX}mm`} y1={`${y}mm`} x2={`${adjustedStartX + gridWidth}mm`} y2={`${y}mm`} stroke={gridColor} strokeWidth="0.1" />);
    }
    return lines;
  };

  const pageNumberX = side === 'Left' 
    ? adjustedStartX + gridSizeNum / 2 
    : adjustedStartX + gridWidth - gridSizeNum / 2;
  const pageNumberY = startY + gridHeight - gridSizeNum / 2;

  // Calculate wordmark position
  const wordmarkX = side === 'Left' 
    ? width - margin / 2 
    : margin / 2;
  const wordmarkY = height / 2;

  // Function to lighten the grid color
  const lightenColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  };

  return (
    <div className="relative" style={{ width: `${width}mm`, height: `${height}mm`, margin: '20px' }}>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white px-2 py-1 rounded shadow text-sm">
        Page {pageNumber} - {side}
      </div>
      <div className="border border-gray-300 print:border-0 w-full h-full">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {showBorder && (
            <rect 
              x={`${adjustedStartX}mm`} 
              y={`${startY}mm`} 
              width={`${gridWidth}mm`} 
              height={`${gridHeight}mm`} 
              fill="none" 
              stroke={gridColor} 
              strokeWidth="0.2" 
            />
          )}
          {createGridLines()}
          {showPageNumberInGrid && (
            <text
              x={`${pageNumberX}mm`}
              y={`${pageNumberY}mm`}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={`${gridSizeNum * 0.5}mm`}
              fill={lightenColor(gridColor, 100)}
              opacity="0.6"
            >
              {pageNumber}
            </text>
          )}
          {/* Wordmark */}
          <text
            x={`${wordmarkX}mm`}
            y={`${wordmarkY}mm`}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="6"
            fill={gridColor}
            opacity="1"
            transform={`rotate(90, ${wordmarkX}, ${wordmarkY})`}
          >
            @kooknhakn
          </text>
        </svg>
      </div>
    </div>
  );
};

export default GridPaper;
