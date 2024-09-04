import React from 'react';
import { GridSize, PaperSize } from '../App';

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
  minimumMargin: number;
  setMinimumMargin: (margin: number) => void;
  selectedPages: string[];
  setSelectedPages: React.Dispatch<React.SetStateAction<string[]>>;
  pages: { id: string; number: number; title: string }[];
  addPage: () => void;
  updatePageTitle: (id: string, title: string) => void;
  pageBackgroundColor: string;
  setPageBackgroundColor: (color: string) => void;
  gridLineThickness: number;
  setGridLineThickness: (thickness: number) => void;
  startAtZero: boolean;
  setStartAtZero: (start: boolean) => void;
  firstPageSide: 'Left' | 'Right';
  setFirstPageSide: (side: 'Left' | 'Right') => void;
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
  minimumMargin,
  setMinimumMargin,
  selectedPages,
  setSelectedPages,
  pages,
  addPage,
  updatePageTitle,
  pageBackgroundColor,
  setPageBackgroundColor,
  gridLineThickness,
  setGridLineThickness,
  startAtZero,
  setStartAtZero,
  firstPageSide,
  setFirstPageSide,
}) => {
  const handleSelectAll = () => {
    const allPageIds = pages.map(page => page.id);
    setSelectedPages(allPageIds);
  };

  const handleClearSelections = () => {
    setSelectedPages([]);
  };

  const handleGridLineThicknessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setGridLineThickness(Math.min(Math.max(value, 0.01), 1));
  };

  return (
    <div className="space-y-6">
      {/* Paper Settings */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Paper Settings</h2>
        <div className="space-y-2">
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
            <label htmlFor="pageBackgroundColor" className="block mb-1">Page Background Color:</label>
            <input
              type="color"
              id="pageBackgroundColor"
              value={pageBackgroundColor}
              onChange={(e) => setPageBackgroundColor(e.target.value)}
              className="w-full h-8 border rounded p-1"
            />
          </div>
        </div>
      </section>

      {/* Grid Settings */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Grid Settings</h2>
        <div className="space-y-2">
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
            <label htmlFor="gridColor" className="block mb-1">Grid Color:</label>
            <input
              type="color"
              id="gridColor"
              value={gridColor}
              onChange={(e) => setGridColor(e.target.value)}
              className="w-full h-8 border rounded p-1"
            />
          </div>
          <div>
            <label htmlFor="gridLineThickness" className="block mb-1">Grid Line Thickness (mm):</label>
            <input
              type="number"
              id="gridLineThickness"
              value={gridLineThickness}
              onChange={handleGridLineThicknessChange}
              step="0.01"
              min="0.01"
              max="1"
              className="w-full border rounded p-1"
            />
          </div>
        </div>
      </section>

      {/* Margin Settings */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Margin Settings</h2>
        <div className="space-y-2">
          <div>
            <label htmlFor="minimumMargin" className="block mb-1">Minimum Margin (mm):</label>
            <input
              type="number"
              id="minimumMargin"
              value={minimumMargin}
              onChange={(e) => setMinimumMargin(Number(e.target.value))}
              min="0"
              className="w-full border rounded p-1"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showExtraMargin"
              checked={showExtraMargin}
              onChange={(e) => setShowExtraMargin(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showExtraMargin">Show Extra Margin</label>
          </div>
        </div>
      </section>

      {/* Page Options */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Page Options</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPageNumberInGrid"
              checked={showPageNumberInGrid}
              onChange={(e) => setShowPageNumberInGrid(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showPageNumberInGrid">Show Page Number in Grid</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showBorder"
              checked={showBorder}
              onChange={(e) => setShowBorder(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="showBorder">Show Border</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="startAtZero"
              checked={startAtZero}
              onChange={(e) => setStartAtZero(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="startAtZero">Start page numbering at zero</label>
          </div>
          <div>
            <label htmlFor="firstPageSide" className="block mb-1">First page side:</label>
            <select
              id="firstPageSide"
              value={firstPageSide}
              onChange={(e) => setFirstPageSide(e.target.value as 'Left' | 'Right')}
              className="w-full border rounded p-1"
            >
              <option value="Left">Left</option>
              <option value="Right">Right</option>
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
          <div className="flex space-x-2">
            <button
              onClick={handleSelectAll}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Select All
            </button>
            <button
              onClick={handleClearSelections}
              className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Clear Selections
            </button>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold">Page Titles</h3>
            {pages.map((page) => (
              <div key={page.id} className="flex items-center">
                <span className="w-8">{page.number}:</span>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => updatePageTitle(page.id, e.target.value)}
                  className="flex-grow border rounded px-2 py-1"
                  placeholder={`Page ${page.number} Title`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Controls;
