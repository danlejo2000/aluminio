import { productData } from '../data/products';
import { useShop } from '../context/ShopContext';

/**
 * Mapa del Sitio HTML - Versión amigable para usuarios
 * Complementa al sitemap.xml para bots
 */
const SitemapPage = () => {
  const { openCategory } = useShop();

  const siteStructure = {
    'Páginas Principales': [
      { name: 'Inicio', href: '#inicio', desc: 'Página principal de Aluminios OTTO' },
      { name: 'Productos', href: '#productos', desc: 'Catálogo completo de sistemas de aluminio' },
      { name: 'Nosotros', href: '#nosotros', desc: 'Más de 20 años de experiencia en aluminio' },
      { name: 'Contacto', href: '#contacto', desc: 'Contáctanos para cotizaciones' }
    ],
    'Sistemas de Ventanas': Object.keys(productData)
      .filter(cat => cat.includes('Ventana'))
      .map(cat => ({
        name: cat,
        onClick: () => openCategory(cat),
        desc: `Sistemas de ${cat.toLowerCase()} en aluminio`
      })),
    'Sistemas de Puertas': Object.keys(productData)
      .filter(cat => cat.includes('Puerta'))
      .map(cat => ({
        name: cat,
        onClick: () => openCategory(cat),
        desc: `Sistemas de ${cat.toLowerCase()} en aluminio`
      })),
    'Recursos': [
      { name: 'Catálogo Interactivo', href: '#productos', desc: 'Ver catálogo en formato libro digital' },
      { name: 'Solicitar Cotización', href: '#contacto', desc: 'Obtén un presupuesto personalizado' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-otto-dark mb-4">
            Mapa del <span className="text-otto-orange">Sitio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Navega por todos nuestros sistemas de aluminio, productos y servicios de forma organizada
          </p>
        </div>

        {/* Estructura del sitio */}
        <div className="space-y-12">
          {Object.entries(siteStructure).map(([section, items]) => (
            <div key={section} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="flex items-center mb-6 pb-4 border-b-2 border-otto-orange">
                <div className="w-2 h-8 bg-otto-orange rounded mr-4"></div>
                <h2 className="text-3xl font-bold text-otto-dark">{section}</h2>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, idx) => (
                  <li key={idx}>
                    {item.href ? (
                      <a 
                        href={item.href}
                        className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-otto-orange"
                      >
                        <div className="w-2 h-2 bg-otto-orange rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <h3 className="font-bold text-lg text-otto-dark group-hover:text-otto-orange transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </a>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="group flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-all border border-transparent hover:border-otto-orange w-full text-left"
                      >
                        <div className="w-2 h-2 bg-otto-orange rounded-full mt-2 group-hover:scale-150 transition-transform"></div>
                        <div>
                          <h3 className="font-bold text-lg text-otto-dark group-hover:text-otto-orange transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer del sitemap */}
        <div className="mt-16 text-center bg-otto-dark text-white rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contáctanos directamente y nuestro equipo te ayudará a encontrar el sistema de aluminio perfecto para tu proyecto
          </p>
          <a 
            href="#contacto" 
            className="inline-block px-8 py-4 bg-otto-orange text-white font-bold rounded-full hover:bg-orange-600 transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Contactar Ahora
          </a>
        </div>

        {/* Breadcrumb para SEO */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="/" className="hover:text-otto-orange">Inicio</a>
          <span className="mx-2">›</span>
          <span className="text-otto-orange font-semibold">Mapa del Sitio</span>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
