import { useState, useEffect } from 'react';

// Componente Interno para la tarjeta interactiva
const ProductCardInteractive = ({ product, onAddToCart, onViewDetails }) => {
  const [medida, setMedida] = useState(6.0);
  const [cantidad, setCantidad] = useState(1);
  const [acabado, setAcabado] = useState(product.acabados[0] || 'N/A');

  const handleAdd = () => {
    onAddToCart({
      id: product.id,
      nombre: product.name,
      acabado,
      medida: `${parseFloat(medida).toFixed(1)} m`,
      cantidad
    });
    setCantidad(1); // Reset
    setMedida(6.0); // Reset
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full">
      
      {/* Imagen con fondo gris suave para contraste */}
      <div className="bg-gray-100 h-48 flex items-center justify-center p-4 border-b border-gray-200 relative group">
        <img src={product.diagramImg} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
        <span className="absolute top-2 right-2 bg-otto-dark text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {product.id}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h4 className="text-lg font-bold font-heading text-gray-900 leading-tight mb-1">{product.name}</h4>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{product.desc}</p>
        
        {/* Controles con bordes visibles */}
        <div className="space-y-3 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
            {/* Acabado */}
            <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Acabado:</label>
                <div className="relative">
                  <select className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900 text-sm focus:border-otto-orange focus:ring-1 focus:ring-otto-orange outline-none shadow-sm appearance-none" value={acabado} onChange={(e) => setAcabado(e.target.value)}>
                      {product.acabados.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
            </div>
            
            {/* Medida */}
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase">Largo:</label>
                    <span className="font-bold text-otto-orange text-sm bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{parseFloat(medida).toFixed(1)} m</span>
                </div>
                <input type="range" min="0.5" max="6.0" step="0.1" value={medida} onChange={(e) => setMedida(e.target.value)} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-otto-orange"/>
            </div>

            {/* Cantidad */}
            <div>
                 <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Cantidad:</label>
                 <div className="flex items-center shadow-sm">
                    <button onClick={() => setCantidad(c => Math.max(1, c - 1))} className="px-3 py-1.5 bg-gray-200 text-gray-800 font-bold rounded-l border border-gray-300 hover:bg-gray-300 active:bg-gray-400 transition">-</button>
                    <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))} className="w-full text-center border-t border-b border-gray-300 py-1.5 text-gray-900 font-bold bg-white focus:outline-none"/>
                    <button onClick={() => setCantidad(c => c + 1)} className="px-3 py-1.5 bg-gray-200 text-gray-800 font-bold rounded-r border border-gray-300 hover:bg-gray-300 active:bg-gray-400 transition">+</button>
                 </div>
            </div>
        </div>

        <div className="mt-auto flex gap-3">
            <button onClick={() => onViewDetails(product)} className="flex-1 py-2.5 px-2 bg-white text-gray-700 border border-gray-300 font-bold text-sm rounded-lg hover:bg-gray-50 transition shadow-sm">
                Ver Ficha
            </button>
            <button onClick={handleAdd} className="flex-[1.5] py-2.5 px-2 bg-otto-dark text-white font-bold text-sm rounded-lg shadow-md hover:bg-gray-800 transition flex items-center justify-center gap-2">
                <span>Agregar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
};

const CategoryModal = ({ isOpen, onClose, title, products, onAddToCart, onViewDetails }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-sm transition-opacity animate-fadeIn" onClick={onClose}>
      <div className="relative bg-otto-silver w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn" onClick={e => e.stopPropagation()}>
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300 bg-white sticky top-0 z-10">
          <div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-otto-dark">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">Selecciona especificaciones y añade al carrito</p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-white hover:bg-red-500 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Grid de Productos */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-gray-100 custom-scrollbar">
             {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(prod => (
                        <ProductCardInteractive 
                            key={prod.id} 
                            product={prod} 
                            onAddToCart={onAddToCart}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría por el momento.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;