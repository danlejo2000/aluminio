import { useState, useEffect } from 'react';
import { generateProductSchema } from '../utils/seo-helpers';
import Breadcrumbs from './Breadcrumbs';

// ============================================
// COMPONENTE DE ZOOM (LIGHTBOX)
// ============================================
const ImageZoom = ({ src, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full hover:bg-white/20 transition-all z-[110]"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img 
        src={src} 
        className="max-w-[90%] max-h-[90vh] object-contain shadow-2xl animate-scaleIn select-none"
        alt="Vista ampliada"
        onClick={(e) => e.stopPropagation()} // Evita que al hacer click en la foto se cierre
      />
      <p className="absolute bottom-10 text-white/50 text-sm font-light tracking-widest uppercase">
        Haz clic en cualquier lugar para cerrar
      </p>
    </div>
  );
};

// ============================================
// TARJETA INTERACTIVA CON CONTROLES DE CARRITO
// ============================================
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
    setCantidad(1);
    setMedida(6.0);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-otto-orange transition-all duration-300 group h-full">
      
      {/* Imagen del producto */}
      <div className="h-48 bg-gray-50 flex items-center justify-center p-6 border-b relative overflow-hidden">
        <img 
          src={product.diagramImg} 
          alt={`Diagrama técnico ${product.name} - Aluminios OTTO`} 
          className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {e.target.src = '/assets/img/default.jpg'}}
        />
        <span className="absolute top-3 right-3 bg-otto-dark text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
          {product.id}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-lg font-bold text-otto-dark mb-2 leading-tight">{product.name}</h4>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.desc}</p>
        
        {/* Controles de configuración */}
        <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          
          {/* Acabado */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Acabado:</label>
            <div className="relative">
              <select 
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm focus:border-otto-orange focus:ring-2 focus:ring-otto-orange/20 outline-none shadow-sm appearance-none cursor-pointer" 
                value={acabado} 
                onChange={(e) => setAcabado(e.target.value)}
              >
                {product.acabados.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Medida con slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Largo:</label>
              <span className="font-bold text-otto-orange text-sm bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                {parseFloat(medida).toFixed(1)} m
              </span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="6.0" 
              step="0.1" 
              value={medida} 
              onChange={(e) => setMedida(e.target.value)} 
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-otto-orange"
            />
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Cantidad:</label>
            <div className="flex items-center shadow-sm rounded-lg overflow-hidden">
              <button 
                onClick={() => setCantidad(c => Math.max(1, c - 1))} 
                className="px-4 py-2.5 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 active:bg-gray-400 transition"
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={cantidad} 
                onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))} 
                className="w-full text-center border-y border-gray-300 py-2.5 text-gray-900 font-bold bg-white focus:outline-none"
              />
              <button 
                onClick={() => setCantidad(c => c + 1)} 
                className="px-4 py-2.5 bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 active:bg-gray-400 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-auto flex gap-3">
          <button 
            onClick={() => onViewDetails(product)} 
            className="flex-1 py-3 px-3 bg-white text-gray-700 border-2 border-gray-300 font-bold text-sm rounded-xl hover:bg-gray-50 hover:border-otto-orange transition shadow-sm"
          >
            Ver Ficha
          </button>
          <button 
            onClick={handleAdd} 
            className="flex-[1.5] py-3 px-3 bg-otto-dark text-white font-bold text-sm rounded-xl shadow-md hover:bg-otto-orange transition flex items-center justify-center gap-2"
          >
            <span>Agregar</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MODAL PRINCIPAL CON DOS VISTAS Y ZOOM
// ============================================
const CategoryModal = ({ isOpen, onClose, title, products, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('tipologias');
  
  // ESTADO PARA EL ZOOM DE IMAGEN
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedProduct(null);
      setActiveTab('tipologias');
      setZoomImg(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);
  
  // Inyectar Schema.org cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      const schema = generateProductSchema(selectedProduct);
      let scriptTag = document.querySelector('script[data-product-schema]');
      
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.setAttribute('data-product-schema', 'true');
        document.head.appendChild(scriptTag);
      }
      
      scriptTag.textContent = JSON.stringify(schema);
    } else {
      // Remover schema cuando se cierra el producto
      const scriptTag = document.querySelector('script[data-product-schema]');
      if (scriptTag) scriptTag.remove();
    }
    
    return () => {
      const scriptTag = document.querySelector('script[data-product-schema]');
      if (scriptTag) scriptTag.remove();
    };
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setActiveTab('tipologias');
  };

  return (
    <>
      {/* Componente de Zoom (Se renderiza por encima de todo) */}
      <ImageZoom 
        src={zoomImg} 
        isOpen={!!zoomImg} 
        onClose={() => setZoomImg(null)} 
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <div className="bg-white w-full max-w-6xl h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-scaleIn border border-white/20">
          
          {/* ========== BREADCRUMBS SEO ========== */}
          {selectedProduct && (
            <Breadcrumbs 
              items={[
                { label: 'Inicio', href: '/' },
                { label: 'Productos', href: '#productos' },
                { label: categoryName },
                { label: selectedProduct.name }
              ]}
            />
          )}
          
          {/* ========== HEADER DINÁMICO ========== */}
          <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-4">
              {selectedProduct && (
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="p-3 bg-white border rounded-full hover:bg-gray-100 transition shadow-sm group"
                >
                  <svg className="w-5 h-5 text-otto-dark group-hover:text-otto-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div>
                <h2 className="text-2xl font-black text-otto-dark uppercase tracking-tight">
                  {selectedProduct ? selectedProduct.name : title}
                </h2>
                <p className="text-xs font-bold text-otto-orange uppercase tracking-widest mt-1">
                  {selectedProduct ? 'Especificaciones Técnicas' : 'Selecciona especificaciones y añade al carrito'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-gray-200/50 rounded-full text-gray-500 hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* ========== CONTENIDO PRINCIPAL ========== */}
          <div className="flex-grow overflow-y-auto bg-gray-50/50">
            {!selectedProduct ? (
              /* ========== VISTA 1: LISTADO DE PRODUCTOS ========== */
              <div className="p-8 lg:p-10">
                {products && products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(prod => (
                      <ProductCardInteractive 
                        key={prod.id} 
                        product={prod} 
                        onAddToCart={onAddToCart}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium">No hay productos disponibles en esta categoría</p>
                  </div>
                )}
              </div>
            ) : (
              /* ========== VISTA 2: FICHA TÉCNICA DETALLADA ========== */
              <div className="p-8 lg:p-12 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* Lateral Izquierdo: Resumen e Imagen de Detalle con Zoom */}
                  <div className="lg:col-span-4 space-y-8">
                    <div 
                      className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white cursor-zoom-in group"
                      onClick={() => setZoomImg(selectedProduct.detailImg)}
                    >
                      <img 
                        src={selectedProduct.detailImg} 
                        className="w-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700" 
                        alt={`Detalle ${selectedProduct.name} - Sistema de aluminio`}
                        loading="lazy"
                        onError={(e) => {e.target.src = '/assets/img/default.jpg'}}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-md p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                      <h4 className="text-otto-orange font-bold uppercase text-xs mb-4 tracking-widest">Descripción General</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">"{selectedProduct.sections.descripcion}"</p>
                      <div className="space-y-3">
                        {JSON.parse(selectedProduct.detailSpecs).map((s, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-xs font-semibold text-otto-dark border border-gray-100">
                            <div className="w-2 h-2 bg-otto-orange rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></div>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Lado Derecho: Pestañas Técnicas */}
                  <div className="lg:col-span-8">
                    <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto gap-2">
                      {['tipologias', 'referencias', 'accesorios'].map(tab => (
                        <button 
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`flex-1 py-4 px-6 rounded-xl font-bold uppercase text-xs tracking-widest transition-all whitespace-nowrap ${
                            activeTab === tab 
                              ? 'bg-otto-orange text-white shadow-lg' 
                              : 'text-gray-400 hover:text-otto-dark hover:bg-gray-50'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* ========== CONTENIDO DE PESTAÑAS ========== */}
                    <div className="min-h-[500px]">
                      
                      {/* Pestaña: Tipologías con Zoom */}
                      {activeTab === 'tipologias' && (
                        <div className="animate-fadeIn space-y-6">
                          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-center">
                            <p className="text-gray-500 mb-10 text-sm font-medium border-b pb-6">
                              {selectedProduct.sections.tipologias.text}
                            </p>
                            <img 
                              src={selectedProduct.sections.tipologias.img} 
                              className="max-w-full mx-auto rounded-xl hover:scale-105 transition-transform duration-500 cursor-zoom-in" 
                              alt={`Tipologías y configuraciones ${selectedProduct.name}`}
                              loading="lazy"
                              onClick={() => setZoomImg(selectedProduct.sections.tipologias.img)}
                              onError={(e) => {e.target.src = '/assets/img/default.jpg'}}
                            />
                          </div>
                        </div>
                      )}

                      {/* Pestaña: Referencias con Zoom Individual */}
                      {activeTab === 'referencias' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-fadeIn">
                          {selectedProduct.sections.referencias.map((ref, idx) => (
                            <div 
                              key={idx} 
                              className="group bg-white border border-gray-100 rounded-[2rem] p-6 text-center hover:border-otto-orange transition-all hover:shadow-xl shadow-sm cursor-zoom-in"
                              onClick={() => setZoomImg(ref.img)}
                            >
                              <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-2xl overflow-hidden p-4">
                                <img 
                                  src={ref.img} 
                                  className="max-h-full max-w-full object-contain group-hover:scale-125 transition-transform duration-700" 
                                  alt={`${ref.label} REF ${ref.ref} - Aluminio`}
                                  loading="lazy"
                                  onError={(e) => {e.target.src = '/assets/img/default.jpg'}}
                                />
                              </div>
                              <span className="inline-block px-3 py-1 bg-otto-orange/10 text-otto-orange rounded-full text-[10px] font-black mb-2 tracking-tighter">
                                REF: {ref.ref}
                              </span>
                              <p className="text-[11px] text-otto-dark font-bold uppercase leading-tight mb-1">
                                {ref.label}
                              </p>
                              {ref.dimensiones && (
                                <p className="text-[10px] text-gray-500">{ref.dimensiones}</p>
                              )}
                              {ref.peso && (
                                <p className="text-[10px] text-gray-400">{ref.peso}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Pestaña: Accesorios */}
                      {activeTab === 'accesorios' && (
                        <div className="space-y-4 animate-fadeIn">
                          {selectedProduct.sections.accesorios.map((acc, idx) => (
                            <div key={idx} className="flex items-center p-6 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition group">
                              <div className="w-16 h-16 bg-otto-dark rounded-2xl flex flex-col items-center justify-center mr-6 border-b-4 border-otto-orange group-hover:bg-otto-orange transition-colors flex-shrink-0">
                                <span className="text-[10px] text-gray-400 group-hover:text-white/80 font-bold uppercase">Código</span>
                                <span className="text-white font-black text-xs uppercase">{acc.ref}</span>
                              </div>
                              <div>
                                <h5 className="font-bold text-otto-dark text-base mb-1">{acc.nombre}</h5>
                                <p className="text-xs text-gray-400 font-medium">{acc.desc}</p>
                              </div>
                            </div>
                          ))}
                          
                          <div className="mt-10 p-8 bg-otto-dark rounded-[2rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-otto-orange/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            <h6 className="text-[10px] font-bold text-otto-orange uppercase tracking-[0.3em] mb-4">Sellado Especial</h6>
                            <p className="text-sm text-gray-300 relative z-10 leading-relaxed font-light">
                              {selectedProduct.sections.empaques}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryModal;