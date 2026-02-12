/**
 * Componente OptimizedImage
 * Wrapper para imágenes con lazy loading, fallback y SEO automático
 */

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  width,
  height,
  priority = false,
  onError,
  ...props 
}) => {
  
  const handleError = (e) => {
    // Fallback genérico si la imagen no carga
    if (onError) {
      onError(e);
    } else {
      e.target.src = '/assets/img/placeholder.jpg';
    }
  };

  return (
    <img
      src={src}
      alt={alt || 'Aluminios OTTO - Sistemas de aluminio'}
      className={className}
      loading={priority ? 'eager' : loading}
      width={width}
      height={height}
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
