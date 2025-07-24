import React, { useState } from "react";
import Lightbox from "@/components/Lightbox";
import "./WallboardGallerySection.css";

const WallboardGallerySection = () => {
  const images = [
    { src: "/images/walls/01.jpg", title: "Smart Wall in Designer Lounge" },
    { src: "/images/walls/02.jpg", title: "Home Theatre Smart Wall Setup" },
    { src: "/images/walls/03.jpg", title: "Interactive Office Panel Wall" },
    { src: "/images/walls/04.jpg", title: "Boardroom with Integrated Controls" },
    { src: "/images/walls/05.jpg", title: "Smart Retail Display Wall" },
    { src: "/images/walls/06.jpg", title: "Smart Wall Control Zone" },
    { src: "/images/walls/07.jpg", title: "Hotel Reception Smart Wall" },
    { src: "/images/walls/08.jpg", title: "Showroom Smart Wall Display" },
    { src: "/images/walls/09.jpg", title: "Wall-Mounted Interface Panel" },
    { src: "/images/walls/10.jpg", title: "Luxury Showroom Wall Control Hub" },
    { src: "/images/walls/11.jpg", title: "Wall Showcase in Modern Café" },
    { src: "/images/walls/12.jpg", title: "Tech-integrated Meeting Lounge" },
    { src: "/images/walls/13.jpg", title: "Modular Smart Wall in Office" },
    { src: "/images/walls/14.jpg", title: "Wall Grid with Lighting Control" },
    { src: "/images/walls/15.jpg", title: "Smart Wall in Hospitality Suite" },
    { src: "/images/walls/16.jpg", title: "Integrated Smart Control Wall" },
    { src: "/images/walls/17.jpg", title: "Retail Wall with Smart Interface" },
    { src: "/images/walls/18.jpg", title: "Smart Home Control Wall Panel" },
    { src: "/images/walls/19.jpg", title: "Residential Lounge Wall Board" },
    { src: "/images/walls/20.jpg", title: "Ambient Wall with Touch Display" },
  ];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const rows = [
    images.slice(0, 7),
    images.slice(7, 14),
    images.slice(14, 20),
  ];

  return (
    <section className="gallery-section-bright">
      {/* Background Elements */}
      {/* <div className="gallery-bg-pattern-bright"></div>
      <div className="gallery-gradient-overlay-bright"></div> */}
      
      {/* Header Section */}
      <div className="gallery-header-bright">
        <div className="gallery-header-content-bright">
          {/* <div className="gallery-badge-bright">
            <span className="gallery-badge-text-bright">Gallery</span>
            <div className="gallery-badge-glow-bright"></div>
          </div> */}
          <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-gray-800">
              Real-Life Smart Wall
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5c47] to-[#b68c5a] mt-2 mb-2">
              Installations.
            </span>
          </h2>

 
         <p className="text-[#231c14] text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  See how Smart Wall systems come to life in luxury homes, corporate offices, retail spaces, and hospitality settings.
  Each image showcases the power of modern wall design integrated with technology, lighting, and function — giving you inspiration for your own smart environment.
</p>

          
          
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-container-bright">
        {rows.map((rowImages, rowIndex) => (
          <div key={rowIndex} className="gallery-row-bright">
            <div
              className={`gallery-scroll-track-bright ${
                rowIndex % 2 === 1 ? "scroll-right-bright" : "scroll-left-bright"
              }`}
            >
              {[
                ...rowImages,
                ...rowImages,
                ...(rowIndex === 1 ? [...rowImages, ...rowImages] : []),
              ].map((img, i) => (
                <div
                  key={`${rowIndex}-${i}`}
                  onClick={() => openLightbox(images.indexOf(img))}
                  className="gallery-card-bright"
                >
                  <div className="gallery-card-inner-bright">
                    <div className="gallery-card-image-container-bright">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="gallery-card-image-bright"
                        loading="lazy"
                      />
                      {/* <div className="gallery-card-overlay-bright"></div> */}
                      {/* <div className="gallery-card-shine-bright"></div> */}
                    </div>
                    
                    <div className="gallery-card-content-bright">
                      <h3 className="gallery-card-title-bright">{img.title}</h3>
                      {/* <div className="gallery-card-view-indicator-bright">
                        <span className="gallery-card-view-text-bright">View Details</span>
                        <div className="gallery-card-view-arrow-bright">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div> */}
                    </div>
                    
                    <div className="gallery-card-border-bright"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="gallery-fab-bright">
        <button className="gallery-fab-button-bright" onClick={() => openLightbox(0)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
            <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>View Gallery</span>
        </button>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={currentIndex}
      />
    </section>
  );
};

export default WallboardGallerySection;