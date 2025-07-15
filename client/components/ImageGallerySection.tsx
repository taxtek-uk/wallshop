import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Search } from "lucide-react";

const images = [
  { src: "/images/integrated-smart-modules.png", alt: "Smart Wall 1" },
  { src: "/images/luxury-living-room.webp", alt: "Smart Wall 2" },
  { src: "/images/smart-home.png", alt: "Smart Wall 3" },
];

export default function ManualLightboxGallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);

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
    <section className="py-24 bg-[#f8f6f3]">
      <div className="container mx-auto px-6 lg:px-12">
        

        <div className="grid gap-8 md:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i)}
              className="rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-[1.02] transition duration-300"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover"
              />
               
            </div>
          ))}
        </div>
      </div>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Prev/Next Arrows */}
          <button
            className="absolute left-4 text-white"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
          >
            <ChevronLeft size={48} />
          </button>
          <button
            className="absolute right-4 text-white"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight size={48} />
          </button>

          {/* Image Viewer */}
          <div
            className="max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <img
              src={images[currentIndex].src}
              alt="Preview"
              className="w-full h-auto object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
                cursor: zoom > 1 ? "grab" : "default",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
