import { useState } from 'react';
import { productData } from '../data/products';

const CatalogFlipbook = ({ isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // 1. Preparar Hojas (Misma lógica de datos)
  const rawItems = Object.entries(productData).map(([category, items]) => ({
    category,
    image: items[0].detailImg || items[0].diagramImg,
    product: items[0],
    count: items.length
  }));

  const sheets = [];

  // Portada
  sheets.push({
    id: 'cover',
    front: { type: 'cover-front', title: 'CATÁLOGO 2025', subtitle: 'Aluminios OTTO' },
    back: { type: 'intro', text: 'Soluciones Arquitectónicas' }
  });

  // Contenido
  for (let i = 0; i < rawItems.length; i += 2) {
    sheets.push({
      id: `page-${i}`,
      front: { type: 'content', data: rawItems[i] },
      back: rawItems[i + 1] ? { type: 'content', data: rawItems[i + 1] } : { type: 'empty' }
    });
  }

  // Contraportada
  sheets.push({
    id: 'back-cover',
    front: { type: 'end', text: 'Fin del Catálogo' },
    back: { type: 'cover-back', text: 'Aluminios OTTO' }
  });

  const totalSheets = sheets.length;

  const handleNext = () => {
    if (currentPage < totalSheets) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      
      <button onClick={onClose} className="absolute top-5 right-5 z-50 text-white hover:text-otto-orange transition transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>

      {/* CONTENEDOR 3D */}
      <div className="relative w-[95%] max-w-[1000px] h-[500px] md:h-[600px] perspective-2000 flex justify-center items-center" onClick={e => e.stopPropagation()}>
        
        {/* LIBRO */}
        <div className="relative w-full h-full preserve-3d">
            
            {sheets.map((sheet, index) => {
                // LÓGICA DE APILAMIENTO CORREGIDA (Para evitar el efecto "al revés")
                // Las páginas a la derecha se apilan normalmente (0 arriba, 1 abajo...)
                // Las páginas a la izquierda se apilan invertidas (0 abajo, 1 arriba...)
                // PERO la página activa (la que se está moviendo) siempre tiene máxima prioridad.
                
                let zIndex;
                if (index === currentPage) {
                    zIndex = 100; // La página activa siempre arriba mientras se mueve
                } else if (index < currentPage) {
                    zIndex = index; // Páginas ya volteadas (izquierda)
                } else {
                    zIndex = totalSheets - index; // Páginas por voltear (derecha)
                }

                const isFlipped = index < currentPage;

                return (
                    <div 
                        key={sheet.id}
                        className={`absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-1000 ease-in-out origin-left preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                        style={{ zIndex: zIndex }}
                        onClick={() => isFlipped ? handlePrev() : handleNext()}
                    >
                        {/* === FRENTE (Cara Derecha) === */}
                        <div className="absolute inset-0 w-full h-full bg-white backface-hidden shadow-xl rounded-r-lg overflow-hidden border-l border-gray-200 spine-shadow">
                            
                            {/* Capa de iluminación para efecto "Ondear" al girar */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none transition-opacity duration-1000 ${isFlipped ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 50 }}></div>

                            {sheet.front.type === 'cover-front' ? (
                                <div className="w-full h-full bg-otto-dark flex flex-col items-center justify-center border-l-8 border-gray-800 p-8 relative">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay"></div>
                                    <div className="border-2 border-otto-orange/50 p-8 z-10 w-full h-full flex flex-col items-center justify-center">
                                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mb-4 drop-shadow-lg">{sheet.front.title}</h1>
                                        <p className="text-xl text-gray-300 tracking-[0.3em] uppercase">{sheet.front.subtitle}</p>
                                    </div>
                                </div>
                            ) : sheet.front.type === 'content' ? (
                                <div className="w-full h-full p-6 md:p-10 flex flex-col">
                                    <div className="flex justify-between items-center mb-6 border-b pb-2">
                                        <span className="text-xs font-bold text-otto-orange uppercase">Catálogo</span>
                                        <span className="text-xs text-gray-400 font-mono">{index * 2 + 1}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-otto-dark mb-4">{sheet.front.data.category}</h3>
                                    <div className="relative flex-grow rounded-lg overflow-hidden shadow-inner bg-gray-100 mb-4">
                                        <img src={sheet.front.data.image} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm text-gray-600 italic">{sheet.front.data.product.desc}</p>
                                </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                    <h3 className="text-2xl font-bold text-gray-400">Final</h3>
                                </div>
                            )}
                        </div>

                        {/* === REVERSO (Cara Izquierda) === */}
                        <div className="absolute inset-0 w-full h-full bg-white backface-hidden rotate-y-180 shadow-xl rounded-l-lg overflow-hidden border-r border-gray-200 spine-shadow">
                            
                            {/* Capa de iluminación inversa */}
                            <div className={`absolute inset-0 bg-gradient-to-l from-black/20 to-transparent pointer-events-none transition-opacity duration-1000 ${!isFlipped ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 50 }}></div>

                            {sheet.back?.type === 'cover-back' ? (
                                <div className="w-full h-full bg-otto-dark flex flex-col items-center justify-center p-8 border-r-8 border-gray-800">
                                    <h2 className="text-2xl text-white font-bold mb-4">Aluminios OTTO</h2>
                                    <p className="text-gray-400 text-sm">Calidad certificada.</p>
                                </div>
                            ) : sheet.back?.type === 'content' ? (
                                <div className="w-full h-full p-6 md:p-10 flex flex-col bg-gray-50">
                                    <div className="flex justify-between items-center mb-6 border-b pb-2">
                                        <span className="text-xs text-gray-400 font-mono">{index * 2 + 2}</span>
                                        <span className="text-xs font-bold text-otto-orange uppercase">Catálogo</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-otto-dark mb-4 text-right">{sheet.back.data.category}</h3>
                                    <div className="relative flex-grow rounded-lg overflow-hidden shadow-inner bg-white mb-4">
                                        <img src={sheet.back.data.image} className="w-full h-full object-cover" />
                                    </div>
                                    <p className="text-sm text-gray-600 italic text-right">{sheet.back.data.product.desc}</p>
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                                    <h3 className="text-2xl font-bold text-otto-dark mb-2">Introducción</h3>
                                    <p className="text-gray-500">Toque la esquina para comenzar.</p>
                                </div>
                            )}
                        </div>

                    </div>
                );
            })}
        </div>

        {/* CONTROLES EXTERNOS */}
        <div className="absolute -bottom-16 flex space-x-6 text-white">
            <button onClick={handlePrev} disabled={currentPage === 0} className="px-6 py-2 rounded-full border border-white/30 hover:bg-otto-orange hover:border-otto-orange transition disabled:opacity-30">◀ Anterior</button>
            <button onClick={handleNext} disabled={currentPage === totalSheets} className="px-6 py-2 rounded-full border border-white/30 hover:bg-otto-orange hover:border-otto-orange transition disabled:opacity-30">Siguiente ▶</button>
        </div>

      </div>
    </div>
  );
};

export default CatalogFlipbook;