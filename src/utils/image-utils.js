/**
 * Utilidades para optimización de imágenes
 */

/**
 * Genera srcset para imágenes responsive
 */
export const generateSrcSet = (basePath, sizes = [400, 800, 1200]) => {
  return sizes.map(size => `${basePath}?w=${size} ${size}w`).join(', ');
};

/**
 * Obtiene dimensiones óptimas según el tipo de imagen
 */
export const getImageDimensions = (type) => {
  const dimensions = {
    hero: { width: 1920, height: 1080 },
    product: { width: 600, height: 600 },
    thumbnail: { width: 400, height: 400 },
    reference: { width: 300, height: 300 },
    og: { width: 1200, height: 630 },
    twitter: { width: 1200, height: 675 },
  };
  
  return dimensions[type] || { width: 800, height: 600 };
};

/**
 * Convierte formato JFIF a ruta optimizada
 */
export const optimizeImagePath = (path) => {
  // Asegurar que tenga /assets/ al inicio
  if (!path.startsWith('/assets/')) {
    path = '/assets/' + path.replace(/^assets\//, '');
  }
  return path;
};

/**
 * Precarga imágenes críticas
 */
export const preloadImage = (src) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Lazy load de imágenes con Intersection Observer
 */
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
  }
};

export default {
  generateSrcSet,
  getImageDimensions,
  optimizeImagePath,
  preloadImage,
  lazyLoadImages
};
