/**
 * SEO HELPERS - Schema.org Structured Data Generators
 * Funciones helper para generar structured data dinámicamente
 */

/**
 * Generar Structured Data para productos
 */
export const generateProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.desc,
  "sku": product.id,
  "brand": {
    "@type": "Brand",
    "name": "Aluminios OTTO"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Aluminios OTTO SAS"
  },
  "image": [
    `https://www.aluminiosotto.com/${product.diagramImg}`,
    `https://www.aluminiosotto.com/${product.detailImg}`
  ],
  "offers": {
    "@type": "Offer",
    "url": `https://www.aluminiosotto.com/producto/${product.id}`,
    "priceCurrency": "COP",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Aluminios OTTO SAS"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "38"
  }
});

/**
 * Generar BreadcrumbList Schema
 */
export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

/**
 * Generar FAQPage Schema
 */
export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Generar Service Schema
 */
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.type,
  "provider": {
    "@type": "Organization",
    "name": "Aluminios OTTO SAS"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Colombia"
  },
  "description": service.description
});

export default {
  generateProductSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema
};
