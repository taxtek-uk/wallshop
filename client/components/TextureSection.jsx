import React, { useState, useMemo } from "react";
import {
  Mountain,
  Layers,
  Paintbrush2,
  Ruler,
  ArrowLeft,
  Eye,
  ChevronRight,
  Sparkles,
  Square,
  Palette,
  Layers2,
} from "lucide-react";

import Lightbox from "../../client/components/Lightbox";

const TextureSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Categories data
  const categories = [
    {
  id: 'wood',
  name: "Wood Grain Series",
  desc: "Warm wood aesthetics with durable surface.",
  icon: Layers,
  img: "/images/carbon-rock-boards/wood.jpg",
  color: "from-amber-100 to-orange-100",
  accent: "amber-600",
  panels: [
    { id: 'T9016', name: "Ash Grey", img: "/images/carbon-rock-boards/wood/16.jpg", desc: "Soft ash grain with light grey overtone" },
    { id: 'T9051', name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations" },
    { id: 'T9222', name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast" },
    { id: 'T9012', name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/11.jpg", desc: "Warm reddish grain like tropical rosewood" },
    { id: 'T9015', name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone" },
    { id: 'T9053', name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/14.jpg", desc: "Strong walnut character with deep flowing grain" },
  ]
},
   {
  id: 'solid',
  name: "Solid Color Series",
  desc: "Industrial elegance with raw, minimalist tones.",
  icon: Palette,
  img: "/images/carbon-rock-boards/wpc.jpg",
  color: "from-slate-100 to-gray-100",
  accent: "slate-600",
  panels: [
    { id: 'T8201', name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism" },
    { id: 'T8026', name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look" },
    { id: 'T8107', name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge" },
    { id: 'T8039', name: "Ivory", img: "/images/carbon-rock-boards/solid/11.jpg", desc: "Soft ivory tone perfect for elegant settings" },
    { id: 'T8103', name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/17.jpg", desc: "Soft pearl-beige tone for warm ambience" },
    { id: 'T8036', name: "Desert Sand", img: "/images/carbon-rock-boards/solid/12.jpg", desc: "Warm tan reminiscent of natural sands" },
    { id: 'T8008', name: "Obsidian", img: "/images/carbon-rock-boards/solid/15.jpg", desc: "Matte black with premium depth and richness" },
  ]
},
    {
  id: 'stone',
  name: "Stone Grain Series",
  desc: "Classic stone surface with timeless elegance.",
  icon: Mountain,
  img: "/images/carbon-rock-boards/stone.jpg",
  color: "from-stone-100 to-slate-100",
  accent: "stone-600",
  panels: [
    { id: 'S3231', name: "White & Gold", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture White & Gold" },
    { id: 'S3232', name: "Black & Blue", img: "/images/carbon-rock-boards/stone/2.jpg", desc: "Stone texture Black & Blue" },
    { id: 'S240', name: "S240", img: "/images/carbon-rock-boards/stone/3.jpg", desc: "Stone texture S240" },
    { id: 'T3205', name: "Mid Grey & Dark Grey", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & Dark Grey" },
    { id: 'T3017', name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Mid Grey & White" },
    { id: 'T3204', name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/6.jpg", desc: "Stone texture Dark Grey & Black" },
    { id: 'T3207', name: "T3207", img: "/images/carbon-rock-boards/stone/7.jpg", desc: "Stone texture T3207" },
    { id: 'T3024', name: "Dark Grey & White", img: "/images/carbon-rock-boards/stone/8.jpg", desc: "Stone texture Dark Grey & White" },
  ]
},
    {
  id: 'fabric',
  name: "Cloth Pattern Series",
  desc: "Soft textile pattern with acoustic value.",
  icon: Palette,
  img: "/images/carbon-rock-boards/cloth.jpg",
  color: "from-neutral-100 to-stone-100",
  accent: "neutral-600",
  panels: [
    { id: 'T6301', name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/3.jpg", desc: "Chambray Grid texture for contemporary interior walls" },
    { id: 'S6029', name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/9.jpg", desc: "Rice Grain Weave texture for contemporary interior walls" },
    { id: 'T6102', name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/5.jpg", desc: "Silver Mesh texture for contemporary interior walls" },
    { id: 'T6306', name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/11.jpg", desc: "Alabaster Cotton texture for contemporary interior walls" },
    { id: 'S6020', name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/6.jpg", desc: "Soft Gauze texture for contemporary interior walls" },
  ]
},
    {
  id: 'metallic',
  name: "Metal Series",
  desc: "Luxury feel with metallic luster and reflectivity.",
  icon: Layers2,
  img: "/images/carbon-rock-boards/metal.jpg",
  color: "from-amber-100 to-yellow-100",
  accent: "amber-600",
  panels: [
    { id: "M1001", name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish" },
    { id: "M1002", name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character" },
    { id: "M1003", name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance" },
    { id: "M1004", name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth" },
    { id: "M1005", name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity" },
    { id: "M1006", name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture" }
  ]
},

{
  id: 'mirror',
  name: "Mirror Series",
  desc: "Reflective brilliance with a sleek, high-gloss finish.",
  icon: Square,
  img: "/images/carbon-rock-boards/mirror.jpg",
  color: "from-blue-100 to-indigo-100",
  accent: "blue-600",
  panels: [
    { id: "MR2001", name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Warm bronze-tinted mirror with elegant shine" },
    { id: "MR2002", name: "Copper Reflection", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Vintage copper tone with smooth mirrored surface" },
    { id: "MR2003", name: "Golden Glow", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Champagne gold mirror finish with rich sheen" },
    { id: "MR2004", name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Matte brass reflection with subtle warmth" },
    { id: "MR2005", name: "Crystal Silver", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Sleek silver mirror with crisp reflectivity" },
    { id: "MR2006", name: "Titanium Gloss", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Cool titanium mirror with polished finish" }
  ]
}

  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsDetailView(true);
  };

  const handleBackClick = () => {
    setIsDetailView(false);
    setSelectedCategory(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {!isDetailView ? (
          // Main Category View
          <div className="space-y-16">
  {/* Hero Section */}
  <div className="text-center space-y-6 mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 text-sm font-medium">
      <Sparkles className="w-4 h-4" />
      Premium Collection
    </div>
   <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-gray-800">
      Choose Your Perfect Style
      </span>
    </h2>
    <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
      Discover our curated collection of premium textures and finishes. Each series offers unique characteristics 
      to transform your space with sophisticated design and exceptional quality.
    </p>
  </div>

  {/* Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {categories.map((category) => (
     <div key={category.id} className="group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white">

        {/* Top Image with clipped corners */}
        <div className="h-52 w-full overflow-hidden">
          <img
            src={category.img}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 bg-white">
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#b69777] to-[#907252]/80 flex items-center justify-center shadow-md">
            <category.icon className="w-7 h-7 text-white" />
          </div>

          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              {category.name}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {category.desc}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => handleCategoryClick(category)}
            className="w-full py-3 text-sm font-semibold rounded-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
          >
            Explore Collection
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Panel Thumbnails */}
          <div className="pt-5">
            <div className="flex flex-wrap gap-1 justify-center">
              {category.panels.slice(0, 8).map((panel) => (
                <div
                  key={panel.id}
                  className="w-7 h-7 rounded-lg overflow-hidden border border-white shadow"
                >
                  <img
                    src={panel.img}
                    alt={panel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {category.panels.length > 8 && (
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                  +{category.panels.length - 8}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        ) : (
          // Detail View
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBackClick}
                  className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-6 h-6 text-slate-700" />
                </button>
                <div>
                  <h2 className="text-4xl font-bold text-slate-900">{selectedCategory.name}</h2>
                  <p className="text-slate-600 mt-1">{selectedCategory.panels.length} options</p>
                </div>
              </div>
            </div>

            {/* Panels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {selectedCategory.panels.map((panel, index) => (
                <div
                  key={panel.id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={panel.img}
                      alt={panel.name}
                      className="w-full h-70 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Stock ID below image */}
                    <h5 className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 text-slate-800 text-sm font-semibold px-3 py-1 rounded-full shadow">
                      {panel.id}
                    </h5>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-xl font-bold text-slate-900">{panel.name}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{panel.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Lightbox */}
        {lightboxImage && (
          <Lightbox
            image={lightboxImage}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </div>
    </section>
  );
};

export default TextureSection;
