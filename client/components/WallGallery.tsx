import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "panel-showroom-overview.jpg",
  "modern-wall-installation.jpg",
  "vertical-acoustic-panels.jpg",
  "textured-surface-closeup.jpg",
  "meeting-room-panel-setup.jpg",
  "hallway-decorative-wall.jpg",
  "angled-panel-display.jpg",
  "ceiling-wall-transition.jpg",
  "wall-detail-lighting-focus.jpg",
  "corridor-textured-panels.jpg",
  "showroom-corner-feature.jpg",
];

const WallGallery = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openModal = (index) => {
    setActiveIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const prev = () => setActiveIndex((activeIndex - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setActiveIndex((activeIndex + 1) % galleryImages.length);

  return (
    <section className="py-20 bg-[#f8f6f3]">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
          Decorative Wall Panel Showcase
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(i)}
            >
              <img
                src={`/images/carbon-rock-boards/gallery/showroom/${img}`}
                alt={img.replace(/[-.]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 z-50 text-white hover:text-red-500 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative">
                <img
                  src={`/images/carbon-rock-boards/gallery/showroom/${galleryImages[activeIndex]}`}
                  alt="Preview"
                  className="rounded-lg max-h-[80vh] mx-auto"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button onClick={prev} className="p-3 text-white hover:text-yellow-300">
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button onClick={next} className="p-3 text-white hover:text-yellow-300">
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </div>
              </div>
              <div className="text-center text-white mt-4">
                <p className="text-lg font-semibold">
                  {galleryImages[activeIndex].replace(/[-.]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
                <p className="text-sm opacity-70">
                  Image {activeIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WallGallery;