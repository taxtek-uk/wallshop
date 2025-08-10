import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  fallback?: string;
  aspectRatio?: string;
  blur?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  priority = false,
  sizes = '100vw',
  fallback = '/images/placeholder.jpg',
  aspectRatio,
  blur = true
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (!hasError && fallback) {
      setHasError(true);
      setCurrentSrc(fallback);
    }
  }, [hasError, fallback]);

  // Intersection Observer for lazy loading optimization
  useEffect(() => {
    if (!priority && imgRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '50px' }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority]);

  // Generate responsive and optimized sources
  const getOptimizedSources = (originalSrc: string) => {
    const isAlreadyOptimized = originalSrc.includes('.webp') || originalSrc.includes('.avif');
    if (isAlreadyOptimized) return [];

    const basePath = originalSrc.replace(/\.[^/.]+$/, '');
    const breakpoints = [480, 768, 1024, 1280, 1920];
    
    return [
      {
        srcSet: breakpoints.map(bp => `${basePath}-${bp}w.avif ${bp}w`).join(', '),
        type: 'image/avif'
      },
      {
        srcSet: breakpoints.map(bp => `${basePath}-${bp}w.webp ${bp}w`).join(', '),
        type: 'image/webp'
      }
    ];
  };

  const sources = getOptimizedSources(currentSrc);

  if (hasError && !fallback) {
    return (
      <div 
        className={cn(
          'bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center',
          aspectRatio && `aspect-[${aspectRatio}]`,
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        className
      )}
      style={{ width, height }}
    >
      {/* Loading placeholder with blur effect */}
      {!isLoaded && blur && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
      
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
          ref={imgRef}
          src={priority ? currentSrc : undefined}
          data-src={!priority ? currentSrc : undefined}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          sizes={sizes}
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;