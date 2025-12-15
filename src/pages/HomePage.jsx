import { useState } from 'react';
import { productData } from '../data/products';
import { useShop } from '../context/ShopContext';
import CatalogFlipbook from '../components/CatalogFlipbook';

// ==========================================
// CONFIGURACIÓN DE GRUPOS DEL CATÁLOGO
// (Estos nombres coinciden EXACTAMENTE con tu productData.js)
// ==========================================
const PRODUCT_GROUPS = {
    'Perfilería y Estructural': [
        'Perfilería en Aluminio',
        'Ángulos de lados iguales',
        'Platinas',
        'Tubos Circulares',
        'Tubulares Cuadrados',
        'Tubulares Rectangulares'
    ],
    'Sistemas de Puertas y Ventanas': [
        'Puerta Corrediza 7038',
        'Puerta Batiente Sideral',
        'Ventana Corrediza VC-5020',
        'Ventana Proyectante'
    ],
    'Arquitectura y Especiales': [
        'Fachada Flotante',
        'Divisiones de Oficina',
        'Vitrinas Comerciales',
        'Cielorrasos'
    ]
};

const HomePage = () => {
  const { openCategory } = useShop();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Función para obtener la imagen de portada
  // Busca primero diagramImg, luego detailImg, y si falla, pone un fallback.
  const getCategoryCover = (catName) => {
      const products = productData[catName];
      
      if (products && products.length > 0) {
          // Priorizamos diagramImg que es donde pusimos las fotos principales
          if (products[0].diagramImg) return products[0].diagramImg;
          if (products[0].detailImg) return products[0].detailImg;
      }
      
      // Imagen de respaldo genérica (Metal/Aluminio) por si algo falla
      return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=60'; 
  };

  return (
    <>
      {/* Componente del Libro Interactivo */}
      <CatalogFlipbook isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
      
      {/* === HERO SECTION === */}
      <section id="inicio" className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-otto-dark">
         <div className="absolute inset-0 z-0">
            {/* Imagen de fondo Hero */}
            <img 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
               alt="Arquitectura Aluminio" 
               className="w-full h-full object-cover opacity-60" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-otto-dark via-otto-dark/80 to-transparent"></div>
         </div>

         <div className="container mx-auto px-6 z-10 relative text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-white leading-tight mb-6 animate-fade-in-down">
            <span className="text-otto-orange block">Aluminios OTTO</span>
            Innovación y Durabilidad.
            </h1>
             <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-3xl mx-auto animate-fade-in-up">
                Tu socio estratégico en soluciones de aluminio para arquitectura y construcción moderna.
             </p>
             <div className="flex justify-center gap-4 animate-scaleIn delay-400">
                <a href="#productos" className="px-10 py-4 bg-otto-orange text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:-translate-y-1">
                    Explora Nuestros Productos
                </a>
             </div>
         </div>
      </section>

      {/* === SECCIÓN NOSOTROS === */}
      <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold font-heading text-otto-dark mb-6">
                        Más de 20 años de <span className="text-otto-orange">Excelencia</span> en Aluminio.
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        En Aluminios OTTO, somos líderes en la distribución y comercialización de perfilería de aluminio de la más alta calidad en Colombia. Nos comprometemos a ofrecer soluciones innovadoras y duraderas para todo tipo de proyectos arquitectónicos.
                    </p>
                    <a href="#contacto" className="inline-block px-8 py-3 bg-otto-dark text-white rounded hover:bg-gray-800 transition">
                        Conoce más sobre nosotros
                    </a>
              </div>
              <div className="md:w-1/2 relative">
                  <div className="absolute -inset-4 bg-otto-orange/20 rounded-2xl transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                    alt="Equipo de trabajo Aluminios OTTO" 
                    className="relative rounded-2xl shadow-2xl w-full h-auto object-cover" 
                  />
              </div>
          </div>
      </section>

      {/* === CATÁLOGO ORGANIZADO === */}
      <section id="productos" className="py-24 bg-otto-dark relative">
          <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
                    Nuestro Catálogo de <span className="text-otto-orange">Soluciones</span>
                  </h2>
                  <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
                    Explora nuestra variada oferta de perfiles y sistemas de aluminio, diseñados para cumplir con los más altos estándares de calidad.
                  </p>
                  
                  {/* Botón Libro Interactivo */}
                  <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => setIsCatalogOpen(true)} 
                        className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-otto-orange border border-white/20 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-xl backdrop-blur-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>Ver Catálogo Interactivo (Libro)</span>
                    </button>
                  </div>
                </div>

                {/* Iteramos sobre los GRUPOS definidos */}
                {Object.entries(PRODUCT_GROUPS).map(([groupName, categories]) => (
                    <div key={groupName} className="mb-20">
                        {/* Título del Grupo con detalle naranja */}
                        <div className="flex items-center mb-8 border-b border-gray-700 pb-4">
                            <div className="w-1.5 h-8 bg-otto-orange mr-4 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">{groupName}</h3>
                        </div>
                        
                        {/* Grid de Tarjetas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((cat) => {
                                // Seguridad: Si la categoría no existe en productData, no renderizamos nada para evitar errores
                                if (!productData[cat]) return null;

                                return (
                                    <button 
                                        key={cat} 
                                        onClick={() => openCategory(cat)} 
                                        className="group relative h-64 w-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left bg-otto-panel border border-gray-700"
                                    >
                                        {/* Imagen de Fondo */}
                                        <div className="absolute inset-0 bg-gray-900">
                                            <img 
                                                src={getCategoryCover(cat)} 
                                                alt={cat} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                                                // Manejo de error si la imagen externa falla
                                                onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=60'}}
                                            />
                                            {/* Degradado oscuro para que el texto se lea bien */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                                        </div>

                                        {/* Contenido de la Tarjeta */}
                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <div className="w-10 h-10 mb-3 bg-otto-orange rounded-full flex items-center justify-center text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-1 group-hover:text-otto-orange transition-colors shadow-sm">{cat}</h4>
                                            <p className="text-sm text-gray-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                Ver productos disponibles
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
          </div>
      </section>

      {/* === SECCIÓN SERVICIOS === */}
      <section id="servicios" className="py-24 bg-gray-100"> 
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold font-heading text-otto-dark mb-12">Nuestros Servicios <span className="text-otto-orange">Complementarios</span></h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                      { 
                          title: 'Transporte Eficiente', 
                          icon: 'M13 10V3L4 14h7v7l9-11h-7z', 
                          desc: 'Garantizamos la entrega segura y puntual de tus pedidos a cualquier destino.' 
                      },
                      { 
                          title: 'Corte y Laminado', 
                          icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.828 2.828a2 2 0 11-2.828-2.828L19.828 4.172a2 2 0 012.828 2.828L14.121 14.121z', 
                          desc: 'Servicios de corte y doblado para adaptarnos a las especificaciones de tu proyecto.' 
                      },
                      { 
                          title: 'Asesoría Técnica', 
                          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 
                          desc: 'Expertos te guiarán en la elección de materiales y soluciones ideales.' 
                      }
                    ].map((srv, i) => (
                      <div key={i} className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
                          <div className="w-16 h-16 mx-auto mb-6 bg-otto-orange/10 text-otto-orange rounded-2xl flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={srv.icon} />
                              </svg>
                          </div>
                          <h3 className="text-2xl font-bold text-otto-dark mb-4">{srv.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{srv.desc}</p>
                      </div>
                    ))}
              </div>
          </div>
      </section>

      {/* === BANNER CTA === */}
      <section className="bg-otto-orange py-16 text-white text-center">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-heading">¿Listo para tu Próximo Proyecto?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                  En Aluminios OTTO, transformamos tus ideas en realidad con la fuerza y elegancia del aluminio.
              </p>
              <a href="#contacto" className="inline-block px-12 py-4 bg-otto-dark text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition duration-300 transform hover:-translate-y-1">
                  ¡Hablemos!
              </a>
          </div>
      </section>

      {/* === CONTACTO === */}
      <section id="contacto" className="py-24 bg-otto-dark">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div className="text-white">
                  <h2 className="text-4xl font-bold font-heading mb-6">
                    Conéctate con <span className="text-otto-orange">Aluminios OTTO</span>
                  </h2>
                  <p className="text-gray-400 mb-10 text-lg">
                      Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier consulta.
                  </p>

                  <div className="space-y-6">
                      <div className="flex items-start">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-otto-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Llámanos</h4>
                                <p className="text-gray-400">+57 (1) 123 4567</p>
                            </div>
                      </div>
                      <div className="flex items-start">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-otto-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /></svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Escríbenos</h4>
                                <p className="text-gray-400">contacto@aluminiosotto.com</p>
                            </div>
                      </div>
                  </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl">
                  <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado!"); }}>
                      <h3 className="text-2xl font-bold text-otto-dark mb-2">Envíanos un Mensaje</h3>
                      <input type="text" placeholder="Tu Nombre" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-otto-orange outline-none transition" required/>
                      <input type="email" placeholder="Tu Email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-otto-orange outline-none transition" required/>
                      <textarea placeholder="Tu mensaje..." rows="4" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-otto-orange outline-none transition" required></textarea>
                      <button type="submit" className="w-full py-4 bg-otto-dark text-white font-bold rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg">
                          Enviar Mensaje
                      </button>
                  </form>
              </div>
          </div>
      </section>
    </>
  );
};

export default HomePage;