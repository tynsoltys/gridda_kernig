import React, { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install this package
import GridPaper from './components/GridPaper';
import Controls from './components/Controls';

export type GridSize = '2mm' | '3mm' | '3.94mm' | '4mm' | '5mm';
export type PaperSize = 
  'a7' | 'a6' | 'a5' | 'b6' | 'b6-slim' | 'b5' | 'b5-slim' | 
  'fc-compact' | 'personal' | 'personal-wide' | 'pocket' | 'pocket-plus' | 
  'half-letter' | 'tn-standard' | 'tn-passport' | 'hobonichi-weeks' | 'tns-plus';

export type GridAlignment = 'center' | 'float';

export interface Page {
  id: string;
  number: number;
  side: 'Left' | 'Right';
  title: string;
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
  const [pages, setPages] = useState<Page[]>([{ id: uuidv4(), number: 1, side: 'Left', title: '' }]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pageBackgroundColor, setPageBackgroundColor] = useState<string>('#ffffff');

  const [gridAlignment, setGridAlignment] = useState<GridAlignment>('float');
  const [gridLineThickness, setGridLineThickness] = useState<number>(0.1); // Default to 0.1mm

  const handleBackgroundClick = useCallback(() => {
    setSelectedPages([]);
  }, []);

  const togglePageSelection = useCallback((pageId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click from bubbling up to the main container
    setSelectedPages(prev => 
      prev.includes(pageId) 
        ? prev.filter(id => id !== pageId) 
        : [...prev, pageId]
    );
  }, []);

  const updatePageNumbers = useCallback(() => {
    setPages(prevPages => 
      prevPages.map((page, index) => ({
        ...page,
        number: includePageZero ? index : index + 1,
        side: (includePageZero ? index + 1 : index) % 2 === 0 ? 'Left' : 'Right'
      }))
    );
  }, [includePageZero]);

  const addPage = () => {
    const newPage: Page = {
      id: uuidv4(),
      number: pages.length + (includePageZero ? 0 : 1),
      side: (pages.length + (includePageZero ? 1 : 0)) % 2 === 0 ? 'Left' : 'Right',
      title: ''
    };
    setPages(prevPages => [...prevPages, newPage]);
  };

  useEffect(() => {
    updatePageNumbers();
  }, [includePageZero, updatePageNumbers]);

  const updatePageTitle = (id: string, title: string) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, title } : page
    ));
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
          setIncludePageZero={(value) => {
            setIncludePageZero(value);
            updatePageNumbers();
          }}
          gridAlignment={gridAlignment}
          setGridAlignment={setGridAlignment}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
          pages={pages}
          addPage={addPage}
          updatePageTitle={updatePageTitle}
          pageBackgroundColor={pageBackgroundColor}
          setPageBackgroundColor={setPageBackgroundColor}
          gridLineThickness={gridLineThickness}
          setGridLineThickness={setGridLineThickness}
        />
      </aside>
      <main 
        className="flex-grow p-4 overflow-auto bg-gray-200"
        onClick={handleBackgroundClick}
      >
        <div className="flex flex-wrap justify-center gap-4" onClick={(e) => e.stopPropagation()}>
          {includePageZero && (
            <GridPaper
              key="page-0"
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
              isSelected={selectedPages.includes("page-0")}
              onSelect={(event) => togglePageSelection("page-0", event)}
              title=""
              onTitleChange={(title) => updatePageTitle("page-0", title)}
              pageBackgroundColor={pageBackgroundColor}
              gridLineThickness={gridLineThickness}
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
              pageNumber={page.number}
              side={page.side}
              gridAlignment={gridAlignment}
              isSelected={selectedPages.includes(page.id)}
              onSelect={(event) => togglePageSelection(page.id, event)}
              title={page.title}
              onTitleChange={(title) => updatePageTitle(page.id, title)}
              pageBackgroundColor={pageBackgroundColor}
              gridLineThickness={gridLineThickness}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
