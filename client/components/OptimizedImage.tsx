import { useState, useCallback } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes = '100vw'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Generate WebP and AVIF sources if the original is not already optimized
  const getOptimizedSources = (originalSrc: string) => {
    const isAlreadyOptimized = originalSrc.includes('.webp') || originalSrc.includes('.avif');
    if (isAlreadyOptimized) return [];

    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    return [
      { srcSet: `${basePath}.avif`, type: 'image/avif' },
      { srcSet: `${basePath}.webp`, type: 'image/webp' }
    ];
  };

  const sources = getOptimizedSources(src);

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <picture>
      {sources.map((source, index) => (
        <source
          key={index}
          srcSet={source.srcSet}
          type={source.type}
          sizes={sizes}
        />
      ))}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
        sizes={sizes}
      />
    </picture>
  );
};

export default OptimizedImage;