import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// --- SOLUCIÓN RADICAL AL ERROR DE VERSIONES ---
// Forzamos la versión exacta 4.4.168 para que coincida con tu API
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const PDFPage = React.forwardRef((props, ref) => {
  const isPageTwo = props.number === 2;
  return (
    <div className="bg-white shadow-lg overflow-hidden h-full w-full" ref={ref}>
      <div style={{ 
          transform: isPageTwo ? 'scale(1.05) translateY(-2px)' : 'none', 
          transformOrigin: 'center center',
          width: '100%', height: '100%' 
      }}>
        <Page 
          pageNumber={props.number} 
          width={props.width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </div>
    </div>
  );
});

const CatalogFlipbook = ({ isOpen, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(500);
  const bookRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = Math.min(window.innerWidth * 0.42, 580);
      setPageWidth(width);
    };
    if (isOpen) {
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
    }
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isOpen]);

  const safeFlipNext = () => {
    if (bookRef.current?.pageFlip()) bookRef.current.pageFlip().flipNext();
  };

  const safeFlipPrev = () => {
    if (bookRef.current?.pageFlip()) bookRef.current.pageFlip().flipPrev();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-orange-500 p-2 transition-colors">
        <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      <div onClick={e => e.stopPropagation()} className="relative mt-4">
        <Document 
          file="/pdf/Colombia.pdf" 
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error("Error al cargar PDF:", err)}
        >
          {numPages && (
            <HTMLFlipBook 
              width={pageWidth} 
              height={Math.round(pageWidth * 1.41)} 
              size="fixed" 
              drawShadow={true} 
              ref={bookRef} 
              showCover={true}
              mobileScrollSupport={true}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`}><PDFPage number={index + 1} width={pageWidth} /></div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      <div className="flex items-center gap-8 mt-10 bg-zinc-900/90 px-10 py-5 rounded-2xl border border-white/10 shadow-2xl">
        <button onClick={safeFlipPrev} className="text-white hover:text-orange-500 active:scale-90 transition-all">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex flex-col items-center min-w-[140px]">
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-1">Catálogo Técnico</span>
          <span className="text-orange-500 font-black text-xl tracking-tighter uppercase">Colombia</span>
        </div>
        <button onClick={safeFlipNext} className="text-white hover:text-orange-500 active:scale-90 transition-all">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default CatalogFlipbook;