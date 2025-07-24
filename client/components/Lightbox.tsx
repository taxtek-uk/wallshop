import { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Maximize2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    src: string;
    title: string;
    description?: string;
  }>;
  initialIndex: number;
}

const Lightbox = ({ isOpen, onClose, images, initialIndex }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
    setIsLoading(true);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("lightbox-open");
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "i":
        case "I":
          setShowInfo(!showInfo);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
      document.body.classList.remove("lightbox-open");
    };
  }, [isOpen, currentIndex, showInfo]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetImageState();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageState();
  };

  const resetImageState = () => {
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
    setIsLoading(true);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = `${currentImage.title}.jpg`;
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title,
          text: currentImage.description || currentImage.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      ref={containerRef}
      className="lightbox-overlay"
      style={{
        '--lightbox-zoom': zoom,
        '--lightbox-rotation': `${rotation}deg`,
        '--lightbox-translate-x': `${imagePosition.x}px`,
        '--lightbox-translate-y': `${imagePosition.y}px`,
      } as React.CSSProperties}
    >
      {/* Background */}
      <div className="lightbox-background" onClick={onClose} />
      
      {/* Loading Spinner */}
      {isLoading && (
        <div className="lightbox-loading">
          <div className="lightbox-spinner">
            <div className="lightbox-spinner-ring"></div>
            <div className="lightbox-spinner-ring"></div>
            <div className="lightbox-spinner-ring"></div>
          </div>
          <p className="lightbox-loading-text">Loading image...</p>
        </div>
      )}

      {/* Header Controls */}
      <div className="lightbox-header">
        <div className="lightbox-header-content">
          <div className="lightbox-image-info">
            <h3 className="lightbox-title">{currentImage.title}</h3>
            <div className="lightbox-meta">
              <span className="lightbox-counter">
                {currentIndex + 1} of {images.length}
              </span>
              {currentImage.description && (
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className={`lightbox-info-toggle ${showInfo ? 'active' : ''}`}
                >
                  <Info size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="lightbox-header-actions">
            <Button
              onClick={handleShare}
              variant="ghost"
              size="sm"
              className="lightbox-action-btn"
              title="Share (S)"
            >
              <Share2 size={18} />
            </Button>
            <Button
              onClick={handleDownload}
              variant="ghost"
              size="sm"
              className="lightbox-action-btn"
              title="Download (D)"
            >
              <Download size={18} />
            </Button>
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="sm"
              className="lightbox-action-btn"
              title="Fullscreen (F)"
            >
              <Maximize2 size={18} />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="lightbox-close-btn"
              title="Close (Esc)"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && currentImage.description && (
          <div className="lightbox-info-panel">
            <p className="lightbox-description">{currentImage.description}</p>
          </div>
        )}
      </div>

      {/* Main Image Container */}
      <div className="lightbox-main">
        <div 
          className="lightbox-image-container"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.title}
            className="lightbox-image"
            onLoad={handleImageLoad}
            draggable={false}
          />
          
          {/* Image Overlay Effects */}
          <div className="lightbox-image-overlay"></div>
        </div>
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="lg"
            className="lightbox-nav-btn lightbox-nav-prev"
            title="Previous (←)"
          >
            <ChevronLeft size={24} />
          </Button>

          <Button
            onClick={goToNext}
            variant="ghost"
            size="lg"
            className="lightbox-nav-btn lightbox-nav-next"
            title="Next (→)"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}

      {/* Bottom Controls */}
      <div className="lightbox-footer">
        <div className="lightbox-controls">
          <div className="lightbox-zoom-controls">
            <Button
              onClick={handleZoomOut}
              variant="ghost"
              size="sm"
              className="lightbox-control-btn"
              disabled={zoom <= 0.25}
              title="Zoom Out (-)"
            >
              <ZoomOut size={16} />
            </Button>

            <div className="lightbox-zoom-display">
              <span className="lightbox-zoom-value">{Math.round(zoom * 100)}%</span>
              <div className="lightbox-zoom-bar">
                <div 
                  className="lightbox-zoom-fill"
                  style={{ width: `${(zoom - 0.25) / 3.75 * 100}%` }}
                />
              </div>
            </div>

            <Button
              onClick={handleZoomIn}
              variant="ghost"
              size="sm"
              className="lightbox-control-btn"
              disabled={zoom >= 4}
              title="Zoom In (+)"
            >
              <ZoomIn size={16} />
            </Button>
          </div>

          <div className="lightbox-divider" />

          <Button
            onClick={handleRotate}
            variant="ghost"
            size="sm"
            className="lightbox-control-btn"
            title="Rotate (R)"
          >
            <RotateCw size={16} />
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            <div className="lightbox-thumbnails-track">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetImageState();
                  }}
                  className={`lightbox-thumbnail ${
                    index === currentIndex ? 'active' : ''
                  }`}
                  title={image.title}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="lightbox-thumbnail-image"
                  />
                  <div className="lightbox-thumbnail-overlay" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="lightbox-shortcuts">
        <div className="lightbox-shortcut">
          <kbd>←</kbd><kbd>→</kbd> Navigate
        </div>
        <div className="lightbox-shortcut">
          <kbd>Esc</kbd> Close
        </div>
        <div className="lightbox-shortcut">
          <kbd>F</kbd> Fullscreen
        </div>
      </div>

      <style>{`
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          animation: lightboxFadeIn 0.3s ease-out;
        }

        .lightbox-background {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        .lightbox-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          z-index: 10;
        }

        .lightbox-spinner {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .lightbox-spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 3px solid #d4af37;
          border-radius: 50%;
          animation: lightboxSpin 1s linear infinite;
        }

        .lightbox-spinner-ring:nth-child(2) {
          animation-delay: 0.1s;
          border-top-color: rgba(212, 175, 55, 0.7);
        }

        .lightbox-spinner-ring:nth-child(3) {
          animation-delay: 0.2s;
          border-top-color: rgba(212, 175, 55, 0.4);
        }

        .lightbox-loading-text {
          color: #d4af37;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .lightbox-header {
          position: relative;
          z-index: 10;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          padding: 1.5rem 2rem 1rem;
        }

        .lightbox-header-content {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .lightbox-image-info {
          flex: 1;
          min-width: 0;
        }

        .lightbox-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ffffff, #d4af37);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .lightbox-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lightbox-counter {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .lightbox-info-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lightbox-info-toggle:hover,
        .lightbox-info-toggle.active {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.4);
          color: #d4af37;
        }

        .lightbox-header-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .lightbox-action-btn,
        .lightbox-close-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .lightbox-action-btn:hover,
        .lightbox-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-1px);
        }

        .lightbox-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.4);
          color: #ef4444;
        }

        .lightbox-info-panel {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          animation: lightboxSlideDown 0.3s ease-out;
        }

        .lightbox-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }

        .lightbox-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .lightbox-image-container {
          position: relative;
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transform: 
            scale(var(--lightbox-zoom)) 
            rotate(var(--lightbox-rotation))
            translate(var(--lightbox-translate-x), var(--lightbox-translate-y));
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }

        .lightbox-image-overlay {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.1) 0%,
            transparent 50%,
            rgba(212, 175, 55, 0.05) 100%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lightbox-image-container:hover .lightbox-image-overlay {
          opacity: 1;
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .lightbox-nav-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.4);
          color: #d4af37;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav-prev {
          left: 2rem;
        }

        .lightbox-nav-next {
          right: 2rem;
        }

        .lightbox-footer {
          position: relative;
          z-index: 10;
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
          padding: 1rem 2rem 1.5rem;
        }

        .lightbox-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .lightbox-zoom-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .lightbox-control-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .lightbox-control-btn:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.4);
          color: #d4af37;
        }

        .lightbox-control-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .lightbox-zoom-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 80px;
        }

        .lightbox-zoom-value {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .lightbox-zoom-bar {
          width: 60px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
        }

        .lightbox-zoom-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4af37, #f4e4a6);
          border-radius: 2px;
          transition: width 0.2s ease;
        }

        .lightbox-divider {
          width: 1px;
          height: 24px;
          background: rgba(255, 255, 255, 0.2);
        }

        .lightbox-thumbnails {
          display: flex;
          justify-content: center;
          overflow-x: auto;
          padding: 0.5rem 0;
        }

        .lightbox-thumbnails-track {
          display: flex;
          gap: 0.75rem;
          padding: 0 1rem;
        }

        .lightbox-thumbnail {
          position: relative;
          width: 60px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
          flex-shrink: 0;
        }

        .lightbox-thumbnail:hover {
          transform: scale(1.1);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .lightbox-thumbnail.active {
          border-color: #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        }

        .lightbox-thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lightbox-thumbnail-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: opacity 0.2s ease;
        }

        .lightbox-thumbnail:hover .lightbox-thumbnail-overlay,
        .lightbox-thumbnail.active .lightbox-thumbnail-overlay {
          opacity: 0;
        }

        .lightbox-shortcuts {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          display: flex;
          gap: 1rem;
          opacity: 0.6;
          transition: opacity 0.2s ease;
        }

        .lightbox-shortcuts:hover {
          opacity: 1;
        }

        .lightbox-shortcut {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .lightbox-shortcut kbd {
          padding: 0.125rem 0.375rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          font-size: 0.625rem;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.9);
        }

        @keyframes lightboxFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(20px);
          }
        }

        @keyframes lightboxSlideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lightboxSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .lightbox-header {
            padding: 1rem;
          }

          .lightbox-main {
            padding: 1rem;
          }

          .lightbox-footer {
            padding: 1rem;
          }

          .lightbox-nav-btn {
            width: 50px;
            height: 50px;
          }

          .lightbox-nav-prev {
            left: 1rem;
          }

          .lightbox-nav-next {
            right: 1rem;
          }

          .lightbox-controls {
            gap: 1rem;
          }

          .lightbox-shortcuts {
            display: none;
          }
        }

        :global(.lightbox-open) {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
