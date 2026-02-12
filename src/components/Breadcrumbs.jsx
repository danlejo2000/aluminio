import { useEffect } from 'react';

/**
 * Componente Breadcrumbs con Schema.org para SEO
 * Aparece en resultados de Google como navegación en migas de pan
 */
const Breadcrumbs = ({ items }) => {
  useEffect(() => {
    // Generar Schema.org BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `${window.location.origin}${item.href}` : undefined
      }))
    };

    // Insertar schema en el head
    const scriptId = 'breadcrumb-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(breadcrumbSchema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6 bg-gray-100 border-b border-gray-200">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 mx-2 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path 
                  fillRule="evenodd" 
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
            
            {item.href && index < items.length - 1 ? (
              <a 
                href={item.href} 
                className="hover:text-otto-orange transition-colors font-medium"
              >
                {item.label}
              </a>
            ) : (
              <span className={index === items.length - 1 ? "text-otto-orange font-semibold" : ""}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
