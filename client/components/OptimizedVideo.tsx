import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  priority?: boolean;
  aspectRatio?: string;
  fallbackImage?: string;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  poster,
  className,
  width,
  height,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  preload = 'metadata',
  priority = false,
  aspectRatio,
  fallbackImage
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!priority && videoRef.current && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '100px' }
      );

      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, [priority]);

  // Auto-pause when out of view for performance
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (autoPlay && video.paused) {
              video.play().catch(() => {
                // Ignore autoplay failures
              });
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [autoPlay]);

  if (hasError && fallbackImage) {
    return (
      <div 
        className={cn(
          'bg-cover bg-center bg-no-repeat',
          aspectRatio && `aspect-[${aspectRatio}]`,
          className
        )}
        style={{ 
          backgroundImage: `url(${fallbackImage})`,
          width, 
          height 
        }}
      />
    );
  }

  if (hasError) {
    return (
      <div 
        className={cn(
          'bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center',
          aspectRatio && `aspect-[${aspectRatio}]`,
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Video failed to load</span>
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
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}

      <video
        ref={videoRef}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        width={width}
        height={height}
        poster={poster}
        autoPlay={autoPlay && isInView}
        muted={muted}
        loop={loop}
        controls={controls}
        preload={isInView ? preload : 'none'}
        onLoadedData={handleLoadedData}
        onError={handleError}
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
      >
        {isInView && (
          <>
            <source src={src.replace(/\.[^/.]+$/, '.webm')} type="video/webm" />
            <source src={src} type="video/mp4" />
          </>
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default OptimizedVideo;