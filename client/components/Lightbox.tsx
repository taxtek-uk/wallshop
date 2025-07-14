import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
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

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
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
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-lg font-semibold gradient-text-gold">
              {currentImage.title}
            </h3>
            {currentImage.description && (
              <p className="text-sm text-gray-300 mt-1">
                {currentImage.description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">
              {currentIndex + 1} / {images.length}
            </span>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex items-center justify-center h-full p-6 pt-24 pb-20">
        <div className="relative max-w-full max-h-full overflow-hidden">
          {/* Placeholder Image - In real implementation, this would be actual images */}
          <div
            className="bg-gradient-to-br from-luxgray-200 to-luxgray-400 rounded-lg shadow-2xl transition-all duration-300"
            style={{
              width: "800px",
              height: "600px",
              maxWidth: "90vw",
              maxHeight: "70vh",
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
            }}
          >
            {/* Placeholder content representing the image */}
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">
                  {currentImage.title}
                </div>
                <div className="text-sm opacity-70">
                  Premium Wall Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <Button
            onClick={goToPrevious}
            variant="ghost"
            size="lg"
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 btn-luxury-gold"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            onClick={goToNext}
            variant="ghost"
            size="lg"
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 btn-luxury-gold"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            onClick={handleZoomOut}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>

          <span className="text-white text-sm px-3">
            {Math.round(zoom * 100)}%
          </span>

          <Button
            onClick={handleZoomIn}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            disabled={zoom >= 3}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/30 mx-2" />

          <Button
            onClick={handleRotate}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(1);
                  setRotation(0);
                }}
                className={`flex-shrink-0 w-12 h-8 rounded transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-gold-400 opacity-100"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <div
                  className={`w-full h-full rounded bg-gradient-to-br ${
                    index % 3 === 0
                      ? "from-copper-200 to-copper-400"
                      : index % 2 === 0
                        ? "from-luxgray-200 to-luxgray-400"
                        : "from-gold-200 to-gold-400"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default Lightbox;
