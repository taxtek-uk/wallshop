import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

const images = [
  {
    src: "/images/0001.webp",
    alt: "Luxury Living Room with Full Smart Wall Display",
    caption:
      "Integrated smart wall featuring ambient lighting, modular shelving, and flush-fit TV unit with hidden cabling.",
  },
  {
    src: "/images/0002.webp",
    alt: "Ambient Wall Lighting with Minimalist Finish",
    caption:
      "Elegant vertical panels with concealed LED strip lighting for a warm, mood-enhancing glow.",
  },
  {
    src: "/images/0003.webp",
    alt: "TV Niche with Hidden Storage and Wood Accents",
    caption:
      "Premium wooden texture smart paneling, designed for media integration and functional aesthetics.",
  },
  {
    src: "/images/0004.webp",
    alt: "Symmetrical Smart Wall with Dual Panel Layers",
    caption:
      "Futuristic layered panels create depth and function - perfect for feature lighting and acoustic performance.",
  },
  {
    src: "/images/0005.webp",
    alt: "Close-Up: Wood Texture Meets Lighting Precision",
    caption:
      "Detail shot showing craftsmanship in materials - smart wood panels with embedded illumination.",
  },
];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const closeLightbox = () => setCurrentIndex(null);

  const showPrev = () =>
    setCurrentIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));

  const showNext = () =>
    setCurrentIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(1, Math.min(3, z + direction)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    dragStart.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStart.current = {
      x: touch.clientX - offset.x,
      y: touch.clientY - offset.y,
    };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.current!.x,
      y: touch.clientY - dragStart.current!.y,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-white text-neutral-900 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-5xl lg:text-6xl block text-gray-800 font-black mb-6 leading-tight">
            Smart Wall Inspiration Gallery
          </h2>
          <p className="text-lg lg:text-xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-light">
            Explore our bespoke smart wall designs — crafted with precision, styled for elegance, and powered by intelligent automation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className={`group relative border border-neutral-200 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="bg-white p-4 text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300 border-t border-neutral-200">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center transition-all duration-300"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 z-10"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>

          <button
            className="absolute left-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute right-4 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight size={24} />
          </button>

          <div
            className="max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-auto object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                cursor: zoom > 1 ? "grab" : "default",
              }}
            />
            <div className="absolute top-6 left-6 px-4 py-2 bg-white text-black text-sm rounded-full shadow-md">
              {currentIndex + 1} / {images.length}
            </div>

            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-all duration-300"
              >
                <Plus size={16} />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.2, 1))}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-neutral-200 transition-all duration-300"
              >
                <Minus size={16} />
              </button>
            </div>

            <p className="text-white text-center mt-4 text-base px-6 max-w-3xl mx-auto">
              {images[currentIndex].caption}
            </p>

            <div className="flex gap-2 mt-4 justify-center max-w-full overflow-x-auto px-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className={`h-16 w-24 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                    currentIndex === i
                      ? "border-amber-400 shadow-lg shadow-amber-400/25"
                      : "border-neutral-300 hover:border-neutral-500"
                  }`}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
