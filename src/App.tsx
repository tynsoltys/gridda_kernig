import React, { useState, useCallback } from 'react';
import GridPaper from './components/GridPaper';
import Controls from './components/Controls';

export type GridSize = '2mm' | '3mm' | '3.94mm' | '4mm' | '5mm';
export type PaperSize = 
  'a7' | 'a6' | 'a5' | 'b6' | 'b6-slim' | 'b5' | 'b5-slim' | 
  'fc-compact' | 'personal' | 'personal-wide' | 'pocket' | 'pocket-plus' | 
  'half-letter' | 'tn-standard' | 'tn-passport' | 'hobonichi-weeks' | 'tns-plus';

export type GridAlignment = 'center' | 'float';

export interface Page {
  id: number;
  side: 'Left' | 'Right';
}

function App() {
  const [gridSize, setGridSize] = useState<GridSize>('5mm');
  const [paperSize, setPaperSize] = useState<PaperSize>('a5');
  const [gridColor, setGridColor] = useState<string>('#000000');
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [showExtraMargin, setShowExtraMargin] = useState<boolean>(false);
  const [showPageNumberInGrid, setShowPageNumberInGrid] = useState<boolean>(false);
  const [minimumMargin, setMinimumMargin] = useState<number>(4); // Default to 4mm
  const [includePageZero, setIncludePageZero] = useState<boolean>(false);
  const [pages, setPages] = useState<Page[]>([{ id: 1, side: 'Left' }]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const [gridAlignment, setGridAlignment] = useState<GridAlignment>('float');

  const handleBackgroundClick = useCallback(() => {
    setSelectedPages([]);
  }, []);

  const togglePageSelection = useCallback((pageId: number) => {
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId) 
        : [...prev, pageId]
    );
  }, []);

  const addPage = () => {
    const newPage: Page = {
      id: pages.length + (includePageZero ? 0 : 1),
      side: (pages.length + (includePageZero ? 1 : 0)) % 2 === 0 ? 'Left' : 'Right'
    };
    setPages([...pages, newPage]);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Gridda Kernig V2</h1>
        <Controls
          gridSize={gridSize}
          setGridSize={setGridSize}
          paperSize={paperSize}
          setPaperSize={setPaperSize}
          gridColor={gridColor}
          setGridColor={setGridColor}
          showBorder={showBorder}
          setShowBorder={setShowBorder}
          showExtraMargin={showExtraMargin}
          setShowExtraMargin={setShowExtraMargin}
          showPageNumberInGrid={showPageNumberInGrid}
          setShowPageNumberInGrid={setShowPageNumberInGrid}
          minimumMargin={minimumMargin}
          setMinimumMargin={setMinimumMargin}
          includePageZero={includePageZero}
          setIncludePageZero={setIncludePageZero}
          gridAlignment={gridAlignment}
          setGridAlignment={setGridAlignment}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
          pages={pages}
          addPage={addPage}
        />
      </aside>
      <main 
        className="flex-grow p-4 overflow-auto"
        onClick={handleBackgroundClick}
      >
        <div className="flex flex-wrap justify-center gap-4" onClick={(e) => e.stopPropagation()}>
          {includePageZero && (
            <GridPaper
              key={0}
              gridSize={gridSize}
              paperSize={paperSize}
              gridColor={gridColor}
              showBorder={showBorder}
              showExtraMargin={showExtraMargin}
              showPageNumberInGrid={showPageNumberInGrid}
              minimumMargin={minimumMargin}
              pageNumber={0}
              side="Right"
              gridAlignment={gridAlignment}
              isSelected={selectedPages.includes(0)}
              onSelect={() => togglePageSelection(0)}
            />
          )}
          {pages.map((page) => (
            <GridPaper
              key={page.id}
              gridSize={gridSize}
              paperSize={paperSize}
              gridColor={gridColor}
              showBorder={showBorder}
              showExtraMargin={showExtraMargin}
              showPageNumberInGrid={showPageNumberInGrid}
              minimumMargin={minimumMargin}
              pageNumber={page.id}
              side={page.side}
              gridAlignment={gridAlignment}
              isSelected={selectedPages.includes(page.id)}
              onSelect={() => togglePageSelection(page.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
