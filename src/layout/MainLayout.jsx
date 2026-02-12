import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuoteDrawer from '../components/QuoteDrawer';
import CategoryModal from '../components/CategoryModal';
import { useShop } from '../context/ShopContext';

const MainLayout = ({ children }) => {
  const { 
    cart, 
    toggleDrawer, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    removeFromCart,
    selectedCategory,
    closeCategory,
    currentCategoryProducts,
    addToCart,
    productDetail,
    closeProductDetail
  } = useShop();

  // Estados para la interactividad del nuevo modal de detalle
  const [activeTab, setActiveTab] = useState('descripcion');
  const [zoomedImg, setZoomedImg] = useState(null);

  return (
    <div className="bg-gray-50 text-otto-dark font-sans scroll-smooth min-h-screen flex flex-col">
      {/* Navbar Conectado al Contexto */}
      <Navbar cartCount={cart.length} onOpenCart={toggleDrawer} />
      
      {/* Drawer del Carrito */}
      <QuoteDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        cart={cart}
        onRemoveItem={removeFromCart}
      />

      {/* Contenido de la Página */}
      <main className="flex-grow">
        {children}
      </main>

      <Footer />

      {/* --- MODALES GLOBALES --- */}
      
      {/* 1. Modal de Categoría */}
      <CategoryModal 
         isOpen={!!selectedCategory} 
         onClose={closeCategory}
         title={selectedCategory}
         products={currentCategoryProducts}
         onAddToCart={addToCart}
         onViewDetails={(prod) => {
            setActiveTab('descripcion'); // Resetear pestaña al abrir
            useShop().openProductDetail(prod);
         }}
      />

      {/* 2. Modal de Detalle de Producto Mejorado (Secciones y Pestañas) */}
      {productDetail && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleIn" onClick={e => e.stopPropagation()}>
               
               {/* Header del Modal */}
               <div className="p-5 bg-otto-dark text-white flex justify-between items-center border-b border-gray-700">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-heading uppercase tracking-wider">{productDetail.name}</h3>
                    <p className="text-otto-orange text-xs font-bold uppercase">Ficha Técnica Especializada</p>
                  </div>
                  <button onClick={closeProductDetail} className="p-2 hover:bg-white/20 rounded-full transition text-2xl">✕</button>
               </div>

               {/* Navegación por Pestañas (Requerimiento de Secciones) */}
               <div className="flex bg-gray-100 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                  {['descripcion', 'tipologias', 'referencias', 'accesorios', 'empaques'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab 
                        ? 'bg-white text-otto-orange border-b-4 border-otto-orange' 
                        : 'text-gray-400 hover:text-otto-dark hover:bg-gray-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
               </div>

               {/* Contenido de la Sección Activa */}
               <div className="flex-grow overflow-y-auto p-6 md:p-12 bg-white custom-scrollbar">
                  
                  {/* SECCIÓN: DESCRIPCIÓN */}
                  {activeTab === 'descripcion' && (
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative group cursor-zoom-in" onClick={() => setZoomedImg(productDetail.detailImg)}>
                            <img src={productDetail.detailImg} alt={productDetail.name} className="w-full rounded-2xl shadow-lg border border-gray-100 object-cover h-80 md:h-[450px]" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                                <span className="text-white font-bold bg-otto-dark/50 px-4 py-2 rounded-full text-sm">Click para ampliar</span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-3xl font-bold text-otto-dark border-l-4 border-otto-orange pl-4">Información General</h4>
                            <p className="text-gray-600 text-lg leading-relaxed italic">
                                {productDetail.sections?.descripcion || productDetail.desc}
                            </p>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h5 className="font-bold text-otto-orange uppercase text-sm mb-3">Especificaciones Base</h5>
                                <ul className="space-y-2">
                                    {JSON.parse(productDetail.detailSpecs || '[]').map((spec, i) => (
                                        <li key={i} className="flex items-center text-gray-700 text-sm">
                                            <span className="w-2 h-2 bg-otto-orange rounded-full mr-3"></span>
                                            {spec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                  )}

                  {/* SECCIÓN: TIPOLOGÍAS */}
                  {activeTab === 'tipologias' && (
                    <div className="max-w-4xl mx-auto text-center">
                        <h4 className="text-2xl font-bold text-otto-dark mb-6">Configuraciones de Apertura</h4>
                        <p className="text-gray-500 mb-10 text-lg italic">{productDetail.sections?.tipologias?.text}</p>
                        <div className="bg-gray-50 p-4 rounded-3xl border-2 border-dashed border-gray-200 cursor-zoom-in group relative" onClick={() => setZoomedImg(productDetail.sections?.tipologias?.img)}>
                            <img src={productDetail.sections?.tipologias?.img} className="mx-auto rounded-xl max-h-[500px] transition-transform group-hover:scale-[1.01]" />
                            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-lg shadow-sm">
                                <svg className="w-6 h-6 text-otto-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                    </div>
                  )}

                  {/* SECCIÓN: REFERENCIAS BÁSICAS (GRID CON ZOOM) */}
                  {activeTab === 'referencias' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {productDetail.sections?.referencias?.map((ref, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:border-otto-orange transition-all group cursor-zoom-in" onClick={() => setZoomedImg(ref.img)}>
                                <div className="h-48 w-full bg-gray-50 rounded-xl flex items-center justify-center mb-5 overflow-hidden">
                                    <img src={ref.img} className="max-h-full group-hover:scale-125 transition-transform duration-700" />
                                </div>
                                <div className="text-center">
                                    <h5 className="font-bold text-otto-dark leading-tight">{ref.label}</h5>
                                    <p className="text-otto-orange font-mono text-sm mt-1">REF: {ref.ref}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                  )}

                  {/* SECCIÓN: ACCESORIOS Y EMPAQUES */}
                  {(activeTab === 'accesorios' || activeTab === 'empaques') && (
                    <div className="max-w-2xl mx-auto py-16 text-center">
                        <div className="w-24 h-24 bg-otto-silver/30 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg className="w-12 h-12 text-otto-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.52a2 2 0 001.236 2.441l2.387.477a2 2 0 002.441-1.236l.722-2.52a2 2 0 00-.715-2.112z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h4 className="text-3xl font-bold text-otto-dark uppercase mb-6 tracking-widest">{activeTab}</h4>
                        <div className="p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-xl text-gray-500 italic leading-relaxed">
                                "{productDetail.sections?.[activeTab] || 'Consultar con asesor técnico para compatibilidad.'}"
                            </p>
                        </div>
                    </div>
                  )}
               </div>

               {/* Footer del Modal con Botón de Cotización */}
               <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
                  <p className="hidden md:block text-xs text-gray-400 font-medium">Aluminios OTTO - Línea Arquitectónica 2026</p>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={closeProductDetail} className="flex-1 md:flex-none px-8 py-3 bg-white text-gray-700 font-bold rounded-xl border border-gray-300 hover:bg-gray-100 transition">Cerrar</button>
                    <button 
                        onClick={() => {
                            addToCart({
                                id: productDetail.id,
                                nombre: productDetail.name,
                                acabado: 'Ver detalles',
                                medida: 'Estándar',
                                cantidad: 1
                            });
                            closeProductDetail();
                        }}
                        className="flex-1 md:flex-none px-8 py-3 bg-otto-orange text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 transition transform hover:-translate-y-1"
                    >
                        Agregar a Cotización
                    </button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* 3. Visualizador de Zoom (Imagen Única Grande) */}
      {zoomedImg && (
        <div 
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-fadeIn cursor-zoom-out"
            onClick={() => setZoomedImg(null)}
        >
            <button className="absolute top-8 right-8 text-white text-5xl hover:text-otto-orange transition">&times;</button>
            <img 
                src={zoomedImg} 
                className="max-w-full max-h-full object-contain rounded-lg animate-scaleIn" 
                alt="Zoom técnico" 
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white bg-black/50 px-6 py-2 rounded-full text-sm backdrop-blur-md">
                Click en cualquier lugar para volver
            </div>
        </div>
      )}

      {/* Botones Flotantes de Contacto */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a 
          href="https://wa.me/573167700403" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-4 bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20ba5a] transition transform hover:scale-110"
          aria-label="Contactar por WhatsApp"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default MainLayout;