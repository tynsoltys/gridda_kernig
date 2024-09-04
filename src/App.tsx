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
  const [pages, setPages] = useState<Page[]>([
    { id: uuidv4(), number: 1, side: 'Right', title: '' }
  ]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [pageBackgroundColor, setPageBackgroundColor] = useState<string>('#ffffff');
  const [startAtZero, setStartAtZero] = useState(false);
  const [firstPageSide, setFirstPageSide] = useState<'Left' | 'Right'>('Right');

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

  const updatePageOrder = useCallback(() => {
    setPages(prevPages => 
      prevPages.map((page, index) => ({
        ...page,
        number: index + 1,
        side: (index + 1) % 2 === 0 ? 'Left' : 'Right'
      }))
    );
  }, []);

  const updatePageNumbers = useCallback(() => {
    setPages(prevPages => 
      prevPages.map((page, index) => ({
        ...page,
        number: startAtZero ? index : index + 1,
        side: startAtZero ? 
          (index % 2 === 0 ? 'Right' : 'Left') : 
          (index % 2 === 0 ? 'Left' : 'Right')
      }))
    );
  }, [startAtZero]);

  const updatePages = useCallback(() => {
    setPages(prevPages => 
      prevPages.map((page, index) => ({
        ...page,
        number: startAtZero ? index : index + 1,
        side: index % 2 === 0 ? firstPageSide : (firstPageSide === 'Left' ? 'Right' : 'Left')
      }))
    );
  }, [startAtZero, firstPageSide]);

  const addPage = useCallback(() => {
    setPages(prevPages => {
      const newPageNumber = startAtZero ? prevPages.length : prevPages.length + 1;
      const newPageSide = prevPages.length % 2 === 0 ? 
        (firstPageSide === 'Left' ? 'Right' : 'Left') : 
        firstPageSide;
      return [
        ...prevPages,
        {
          id: uuidv4(),
          number: newPageNumber,
          side: newPageSide,
          title: ''
        }
      ];
    });
  }, [startAtZero, firstPageSide]);

  useEffect(() => {
    updatePages();
  }, [startAtZero, firstPageSide, updatePages]);

  const updatePageTitle = (id: string, title: string) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, title } : page
    ));
  };

  useEffect(() => {
    updatePageNumbers();
  }, [startAtZero, updatePageNumbers]);

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
          addPage={addPage}
          updatePageTitle={updatePageTitle}
          pageBackgroundColor={pageBackgroundColor}
          setPageBackgroundColor={setPageBackgroundColor}
          gridLineThickness={gridLineThickness}
          setGridLineThickness={setGridLineThickness}
          selectedPages={selectedPages}
          setSelectedPages={setSelectedPages}
          pages={pages}
          startAtZero={startAtZero}
          setStartAtZero={setStartAtZero}
          firstPageSide={firstPageSide}
          setFirstPageSide={setFirstPageSide}
        />
      </aside>
      <main 
        className="flex-grow p-4 overflow-auto bg-gray-200"
        onClick={handleBackgroundClick}
      >
        <div className="flex flex-wrap justify-center gap-4" onClick={(e) => e.stopPropagation()}>
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
