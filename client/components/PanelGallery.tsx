import { useState } from "react";
import { X, ArrowLeft, ArrowRight, Images, Eye } from "lucide-react";

const galleryData = {
  "Cloth Series": [
    "/images/carbon-rock-boards/gallery/cloth-series/001.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/01.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/detail-2.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/detail-3.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/detail-4.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/detail-5.jpg",
    "/images/carbon-rock-boards/gallery/cloth-series/detail.jpg"
  ],
  "Metal Series": [
    "/images/carbon-rock-boards/gallery/metal-series/001.jpg",
    "/images/carbon-rock-boards/gallery/metal-series/01.jpg",
    "/images/carbon-rock-boards/gallery/metal-series/detail-img-2.jpg",
    "/images/carbon-rock-boards/gallery/metal-series/detail-img-3.jpg",
    "/images/carbon-rock-boards/gallery/metal-series/detail-img-4.jpg",
    "/images/carbon-rock-boards/gallery/metal-series/detail-img.jpg"
  ],
  "Solid Color Series": [
    "/images/carbon-rock-boards/gallery/solid-color-series/001.jpg",
    "/images/carbon-rock-boards/gallery/solid-color-series/01.jpg",
    "/images/carbon-rock-boards/gallery/solid-color-series/detail-img-1.jpg",
    "/images/carbon-rock-boards/gallery/solid-color-series/detail-img-2.jpg"
  ],
  "Mirror Series": [
    "/images/carbon-rock-boards/gallery/mirror-series/01.jpg",
    "/images/carbon-rock-boards/gallery/mirror-series/detail-img-1.jpg",
    "/images/carbon-rock-boards/gallery/mirror-series/detail-img-2.jpg"
  ],
  "WPC Wall Panel": [
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/01.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-1.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-2.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-3.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-4.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-5.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-6.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-7.jpg",
    "/images/carbon-rock-boards/gallery/wpc-wall-panel/detail-img-8.jpg"
  ],
  "Wood Grain Series": [
    "/images/carbon-rock-boards/gallery/wood-grain-series/01.jpg",
    "/images/carbon-rock-boards/gallery/wood-grain-series/02.jpg",
    "/images/carbon-rock-boards/gallery/wood-grain-series/03.jpg",
    "/images/carbon-rock-boards/gallery/wood-grain-series/04.jpg",
    "/images/carbon-rock-boards/gallery/wood-grain-series/05.jpg",
    "/images/carbon-rock-boards/gallery/wood-grain-series/06.jpg"
  ],
  "Stone Series": [
    "/images/carbon-rock-boards/gallery/stone-series/01.jpg",
    "/images/carbon-rock-boards/gallery/stone-series/02.jpg",
    "/images/carbon-rock-boards/gallery/stone-series/03.jpg",
    "/images/carbon-rock-boards/gallery/stone-series/04.jpg"
  ],
  "WPC Splicing Board": [
    "/images/carbon-rock-boards/gallery/wpc-splicing-board/01.jpg",
    "/images/carbon-rock-boards/gallery/wpc-splicing-board/02.jpg",
    "/images/carbon-rock-boards/gallery/wpc-splicing-board/03.jpeg"
  ],
  "Custom Painting (SPC)": [
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/01.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/02.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/03.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/04.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/05.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/06.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/07.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/08.jpg",
    "/images/carbon-rock-boards/gallery/custom-painting-(spc)/09.jpg"
  ],
  "Fluted Bamboo Grille": [
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/01.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/02.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/03.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/04.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/05.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/06.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/07.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/08.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/09.jpg",
    "/images/carbon-rock-boards/gallery/fluted-bamboo-grille/10.jpg"
  ]
};


const PanelGallery = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (category) => {
    setActiveCategory(category);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveCategory(null);
    document.body.style.overflow = "auto";
  };

  const next = () =>
    setCurrentImageIndex((i) => (i + 1) % galleryData[activeCategory].length);

  const prev = () =>
    setCurrentImageIndex((i) => (i - 1 + galleryData[activeCategory].length) % galleryData[activeCategory].length);

  return (
    <section className="py-20 bg-[#f8f6f3]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
          Explore Our Panel Series
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Object.entries(galleryData).map(([category, images], idx) => (
            <div
              key={idx}
              className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition cursor-pointer bg-white"
            >
              <img
                src={images[0]}
                alt={category}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-semibold text-lg text-[#231c14]">{category}</h3>
                <p className="text-sm text-[#6b5c47]">High-performance decorative panels with premium finish and durability.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.slice(1, 5).map((thumb, i) => (
                    <img
                      key={i}
                      src={thumb}
                      alt={category + " thumb"}
                      className="w-12 h-12 object-cover rounded border hover:scale-105 transition"
                    />
                  ))}
                </div>
                <button
                  onClick={() => openModal(category)}
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[#b69777] hover:text-[#907252] font-semibold"
                >
                  <Eye className="w-4 h-4" /> View More
                </button>
              </div>
            </div>
          ))}
        </div>

        {activeCategory && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-3 right-4 z-50 text-white hover:text-red-500 transition"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={galleryData[activeCategory][currentImageIndex]}
                  alt={`${activeCategory} preview`}
                  className="max-h-[80vh] w-auto mx-auto rounded"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button onClick={prev} className="p-3 text-white hover:text-yellow-300">
                    <ArrowLeft className="w-8 h-8" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button onClick={next} className="p-3 text-white hover:text-yellow-300">
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </div>
              <div className="text-center text-white mt-4">
                <p className="text-lg font-semibold">{activeCategory}</p>
                <p className="text-sm opacity-70">
                  Image {currentImageIndex + 1} of {galleryData[activeCategory].length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PanelGallery;