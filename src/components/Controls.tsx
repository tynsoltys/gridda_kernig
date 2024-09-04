import React from 'react';
import { GridSize, PaperSize, GridAlignment } from '../App';

interface ControlsProps {
  gridSize: GridSize;
  setGridSize: (size: GridSize) => void;
  paperSize: PaperSize;
  setPaperSize: (size: PaperSize) => void;
  gridColor: string;
  setGridColor: (color: string) => void;
  showBorder: boolean;
  setShowBorder: (show: boolean) => void;
  showExtraMargin: boolean;
  setShowExtraMargin: (show: boolean) => void;
  showPageNumberInGrid: boolean;
  setShowPageNumberInGrid: (show: boolean) => void;
  addPage: () => void;
  minimumMargin: number;
  setMinimumMargin: (margin: number) => void;
  includePageZero: boolean;
  setIncludePageZero: (include: boolean) => void;
  gridAlignment: GridAlignment;
  setGridAlignment: (alignment: GridAlignment) => void;
}

const Controls: React.FC<ControlsProps> = ({
  gridSize,
  setGridSize,
  paperSize,
  setPaperSize,
  gridColor,
  setGridColor,
  showBorder,
  setShowBorder,
  showExtraMargin,
  setShowExtraMargin,
  showPageNumberInGrid,
  setShowPageNumberInGrid,
  addPage,
  minimumMargin,
  setMinimumMargin,
  includePageZero,
  setIncludePageZero,
  gridAlignment,
  setGridAlignment,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="gridSize" className="block mb-1">Grid Size:</label>
        <select
          id="gridSize"
          value={gridSize}
          onChange={(e) => setGridSize(e.target.value as GridSize)}
          className="w-full border rounded p-1"
        >
          <option value="2mm">2mm</option>
          <option value="3mm">3mm</option>
          <option value="3.94mm">3.94mm</option>
          <option value="4mm">4mm</option>
          <option value="5mm">5mm</option>
        </select>
      </div>
      <div>
        <label htmlFor="paperSize" className="block mb-1">Paper Size:</label>
        <select
          id="paperSize"
          value={paperSize}
          onChange={(e) => setPaperSize(e.target.value as PaperSize)}
          className="w-full border rounded p-1"
        >
          <option value="a7">A7</option>
          <option value="a6">A6</option>
          <option value="a5">A5</option>
          <option value="b6">B6</option>
          <option value="b6-slim">B6 Slim</option>
          <option value="b5">B5</option>
          <option value="b5-slim">B5 Slim</option>
          <option value="fc-compact">Franklin Covey Compact</option>
          <option value="personal">Personal</option>
          <option value="personal-wide">Personal Wide</option>
          <option value="pocket">Pocket</option>
          <option value="pocket-plus">Pocket Plus</option>
          <option value="half-letter">Half Letter</option>
          <option value="tn-standard">Traveler's Notebook Standard</option>
          <option value="tns-plus">TNS Plus (TN Standard + 0.5cm width)</option>
          <option value="tn-passport">Traveler's Notebook Passport</option>
          <option value="hobonichi-weeks">Hobonichi Weeks</option>
        </select>
      </div>
      <div>
        <label htmlFor="gridColor" className="block mb-1">Grid Color:</label>
        <input
          type="color"
          id="gridColor"
          value={gridColor}
          onChange={(e) => setGridColor(e.target.value)}
          className="w-full border rounded p-1"
        />
      </div>
      <div>
        <label htmlFor="showBorder" className="flex items-center">
          <input
            type="checkbox"
            id="showBorder"
            checked={showBorder}
            onChange={(e) => setShowBorder(e.target.checked)}
            className="mr-2"
          />
          Show Border
        </label>
      </div>
      <div>
        <label htmlFor="showExtraMargin" className="flex items-center">
          <input
            type="checkbox"
            id="showExtraMargin"
            checked={showExtraMargin}
            onChange={(e) => setShowExtraMargin(e.target.checked)}
            className="mr-2"
          />
          Show Extra Margin
        </label>
      </div>
      <div>
        <label htmlFor="showPageNumberInGrid" className="flex items-center">
          <input
            type="checkbox"
            id="showPageNumberInGrid"
            checked={showPageNumberInGrid}
            onChange={(e) => setShowPageNumberInGrid(e.target.checked)}
            className="mr-2"
          />
          Show Page Number in Grid
        </label>
      </div>
      <div>
        <label htmlFor="minimumMargin" className="block mb-1">Minimum Margin (mm):</label>
        <input
          type="number"
          id="minimumMargin"
          value={minimumMargin}
          onChange={(e) => setMinimumMargin(Math.max(0, parseInt(e.target.value)))}
          min="0"
          className="w-full border rounded p-1"
        />
      </div>
      <div>
        <label htmlFor="includePageZero" className="flex items-center">
          <input
            type="checkbox"
            id="includePageZero"
            checked={includePageZero}
            onChange={(e) => setIncludePageZero(e.target.checked)}
            className="mr-2"
          />
          Include Page 0 (Right Side)
        </label>
      </div>
      <div>
        <label htmlFor="gridAlignment" className="block mb-1">Grid Alignment:</label>
        <select
          id="gridAlignment"
          value={gridAlignment}
          onChange={(e) => setGridAlignment(e.target.value as GridAlignment)}
          className="w-full border rounded p-1"
        >
          <option value="center">Center</option>
          <option value="float">Float to Edge</option>
        </select>
      </div>
      <div>
        <button
          onClick={addPage}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Page
        </button>
      </div>
    </div>
  );
};

export default Controls;
