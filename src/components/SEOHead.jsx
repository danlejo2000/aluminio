import { useEffect } from 'react';

/**
 * Componente SEO dinámico para páginas específicas
 * Permite actualizar meta tags según la sección activa
 */
const SEOHead = ({ 
  title = "Aluminios OTTO | Ventanas y Puertas de Aluminio en Bogotá Colombia",
  description = "Líderes en perfilería de aluminio en Colombia. Sistemas de ventanas corredizas, oscilo-batientes, puertas plegables. +20 años de experiencia.",
  keywords = "aluminio bogota, ventanas aluminio, puertas aluminio, perfiles aluminio colombia",
  canonical = "https://www.aluminiosotto.com",
  ogImage = "https://www.aluminiosotto.com/assets/img/og-image.jpg",
  structuredData = null
}) => {
  
  useEffect(() => {
    // Actualizar título dinámicamente
    document.title = title;
    
    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Actualizar meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
    
    // Actualizar canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonical;
    
    // Actualizar OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    
    const ogImageTag = document.querySelector('meta[property="og:image"]');
    if (ogImageTag) ogImageTag.setAttribute('content', ogImage);
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonical);
    
    // Twitter Card
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description);
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', ogImage);
    
    // Structured Data JSON-LD dinámico
    if (structuredData) {
      let script = document.querySelector('script[data-dynamic-schema]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-dynamic-schema', 'true');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
    
  }, [title, description, keywords, canonical, ogImage, structuredData]);

  return null; // Este componente no renderiza nada visible
};

export default SEOHead;
