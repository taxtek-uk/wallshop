import React, { useState, useMemo } from "react";
import {
  Mountain,
  Layers,
  Paintbrush2,
  Ruler,
  ArrowLeft,
  Eye,
  ChevronRight,
  Sparkles
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
        { id: 1, name: "Natural Oak", img: "/images/carbon-rock-boards/wood/1.jpg", desc: "Classic oak texture with soft grain pattern" },
        { id: 2, name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations" },
        { id: 3, name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast" },
        { id: 4, name: "Golden Maple", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm maple hue with straight grain" },
        { id: 5, name: "Weathered Cedar", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Textured cedar look with aged character" },
        { id: 6, name: "Rustic Pine", img: "/images/carbon-rock-boards/wood/6.jpg", desc: "Light pine tone with visible knots and streaks" },
        { id: 7, name: "Charcoal Oak", img: "/images/carbon-rock-boards/wood/7.jpg", desc: "Deep grey oak with modern finish" },
        { id: 8, name: "Amber Teak", img: "/images/carbon-rock-boards/wood/8.jpg", desc: "Teak-inspired golden tones and natural flow" },
        { id: 9, name: "Espresso Birch", img: "/images/carbon-rock-boards/wood/9.jpg", desc: "Bold espresso hue on tight birch grains" },
        { id: 10, name: "Sunbleached Timber", img: "/images/carbon-rock-boards/wood/10.jpg", desc: "Light grey-brown tone like weathered wood" },
        { id: 11, name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/11.jpg", desc: "Warm reddish grain like tropical rosewood" },
        { id: 12, name: "Whitewashed Oak", img: "/images/carbon-rock-boards/wood/12.jpg", desc: "Pale oak with a whitewashed soft grain" },
        { id: 13, name: "Hazel Beech", img: "/images/carbon-rock-boards/wood/13.jpg", desc: "Light beech finish with smooth texture" },
        { id: 14, name: "Dark Walnut", img: "/images/carbon-rock-boards/wood/14.jpg", desc: "Strong walnut character with deep tones" },
        { id: 15, name: "Bamboo Slate", img: "/images/carbon-rock-boards/wood/15.jpg", desc: "Neutral bamboo-inspired texture in muted finish" },
        { id: 16, name: "Ash Greywood", img: "/images/carbon-rock-boards/wood/16.jpg", desc: "Soft ash grain with light grey overtone" },
        { id: 17, name: "Ivory Elm", img: "/images/carbon-rock-boards/wood/17.jpg", desc: "Smooth ivory tone with linear elm grain" },
        { id: 18, name: "Toasted Mahogany", img: "/images/carbon-rock-boards/wood/18.jpg", desc: "Dark toasted tone with rich mahogany grain" },
        { id: 19, name: "Copperwood", img: "/images/carbon-rock-boards/wood/19.jpg", desc: "Copper-tinged finish with clean grain lines" },
        { id: 20, name: "Chestnut Brown", img: "/images/carbon-rock-boards/wood/20.jpg", desc: "Balanced brown chestnut-inspired finish" },
        { id: 21, name: "Graphite Oak", img: "/images/carbon-rock-boards/wood/21.jpg", desc: "Slate-grey grain for modern interiors" },
        { id: 22, name: "Almond Timber", img: "/images/carbon-rock-boards/wood/22.jpg", desc: "Soft beige almond tone with faint grain" },
        { id: 23, name: "Espresso Elm", img: "/images/carbon-rock-boards/wood/23.jpg", desc: "Dark espresso elm wood with deep tone" },
        { id: 24, name: "Vanilla Maple", img: "/images/carbon-rock-boards/wood/24.jpg", desc: "Creamy maple with calm grain profile" },
        { id: 25, name: "Antique Pine", img: "/images/carbon-rock-boards/wood/25.jpg", desc: "Vintage pine finish with natural age lines" },
        { id: 26, name: "Wenge Shadow", img: "/images/carbon-rock-boards/wood/26.jpg", desc: "Exotic wenge look with dark shadowy tones" },
        { id: 27, name: "Ironwood", img: "/images/carbon-rock-boards/wood/27.jpg", desc: "Heavy grained wood with metallic undertone" },
        { id: 28, name: "Smoky Timber", img: "/images/carbon-rock-boards/wood/28.jpg", desc: "Soft smoky finish with layered woodgrain" },
        { id: 29, name: "Cinnamon Oak", img: "/images/carbon-rock-boards/wood/29.jpg", desc: "Cinnamon-tinted oak grain with warm undertones" },
        { id: 30, name: "Grey Driftwood", img: "/images/carbon-rock-boards/wood/30.jpg", desc: "Weathered driftwood look in calming grey" },
        { id: 31, name: "Burnt Maple", img: "/images/carbon-rock-boards/wood/31.jpg", desc: "Darkened maple texture with bold personality" },
        { id: 32, name: "Soft Sandalwood", img: "/images/carbon-rock-boards/wood/32.jpg", desc: "Subtle sandalwood tone with organic waves" },
        { id: 33, name: "Molasses Walnut", img: "/images/carbon-rock-boards/wood/33.jpg", desc: "Deep walnut pattern with molasses hue" },
        { id: 34, name: "Pearl Beech", img: "/images/carbon-rock-boards/wood/34.jpg", desc: "Creamy pearl finish with smooth beech flow" },
        { id: 35, name: "Tundra Elm", img: "/images/carbon-rock-boards/wood/35.jpg", desc: "Frosty elm pattern perfect for minimal interiors" }
      ]
    },
    {
  id: 'solid',
  name: "Solid Color Series",
  desc: "Industrial elegance with raw, minimalist tones.",
  icon: Ruler,
  img: "/images/carbon-rock-boards/wpc.jpg",
  color: "from-slate-100 to-gray-100",
  accent: "slate-600",
  panels: [
    { id: 1, name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism" },
    { id: 2, name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look" },
    { id: 3, name: "Muted Graphite", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Balanced dark silver tone for sleek walls" },
    { id: 4, name: "Jet Black", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Deep black ideal for bold modern interiors" },
    { id: 5, name: "Rose Brick", img: "/images/carbon-rock-boards/solid/5.jpg", desc: "Warm reddish tone inspired by natural clay" },
    { id: 6, name: "Burnt Orange", img: "/images/carbon-rock-boards/solid/6.jpg", desc: "Bright terracotta with energetic character" },
    { id: 7, name: "Sky Blue", img: "/images/carbon-rock-boards/solid/7.jpg", desc: "A cool pastel blue evoking calm environments" },
    { id: 8, name: "Frost White", img: "/images/carbon-rock-boards/solid/8.jpg", desc: "Pure white with a crisp clean finish" },
    { id: 9, name: "Stone Clay", img: "/images/carbon-rock-boards/solid/9.jpg", desc: "Earthy stone shade with balanced neutrality" },
    { id: 10, name: "Slate Blue", img: "/images/carbon-rock-boards/solid/10.jpg", desc: "Dark blue-grey with a sophisticated edge" },
    { id: 11, name: "Ivory", img: "/images/carbon-rock-boards/solid/11.jpg", desc: "Soft ivory tone perfect for elegant settings" },
    { id: 12, name: "Desert Sand", img: "/images/carbon-rock-boards/solid/12.jpg", desc: "Warm tan reminiscent of natural sands" },
    { id: 13, name: "Steel Grey", img: "/images/carbon-rock-boards/solid/13.jpg", desc: "Robust mid-grey with urban vibes" },
    { id: 14, name: "Charcoal Navy", img: "/images/carbon-rock-boards/solid/14.jpg", desc: "Deep navy blend with a charcoal base" },
    { id: 15, name: "Obsidian", img: "/images/carbon-rock-boards/solid/15.jpg", desc: "Matte black with premium depth and richness" },
    { id: 16, name: "Fog Silver", img: "/images/carbon-rock-boards/solid/16.jpg", desc: "Light grey with misty undertones" },
    { id: 17, name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/17.jpg", desc: "Soft pearl-beige tone for warm ambience" },
    { id: 18, name: "Lavender Smoke", img: "/images/carbon-rock-boards/solid/18.jpg", desc: "Cool tone with purple-grey transitions" },
    { id: 19, name: "Silken Stone", img: "/images/carbon-rock-boards/solid/19.jpg", desc: "Light sandy grey with smooth finish" },
    { id: 20, name: "Deep Indigo", img: "/images/carbon-rock-boards/solid/20.jpg", desc: "Bold indigo hue ideal for rich feature walls" }
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
        { id: 1, name: "T3006", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture T3006" },
        { id: 2, name: "T3012", img: "/images/carbon-rock-boards/stone/2.jpg", desc: "Stone texture T3012" },
        { id: 3, name: "T3017", img: "/images/carbon-rock-boards/stone/3.jpg", desc: "Stone texture T3017" },
        { id: 4, name: "T3018", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture T3018" },
        { id: 5, name: "T3019", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture T3019" },
        { id: 6, name: "T3023", img: "/images/carbon-rock-boards/stone/6.jpg", desc: "Stone texture T3023" },
        { id: 7, name: "T3024", img: "/images/carbon-rock-boards/stone/7.jpg", desc: "Stone texture T3024" },
        { id: 8, name: "T3025", img: "/images/carbon-rock-boards/stone/8.jpg", desc: "Stone texture T3025" },
        { id: 9, name: "T3201", img: "/images/carbon-rock-boards/stone/9.jpg", desc: "Stone texture T3201" },
        { id: 10, name: "T3202", img: "/images/carbon-rock-boards/stone/10.jpg", desc: "Stone texture T3202" },
        { id: 11, name: "T3203", img: "/images/carbon-rock-boards/stone/11.jpg", desc: "Stone texture T3203" },
        { id: 12, name: "T3204", img: "/images/carbon-rock-boards/stone/12.jpg", desc: "Stone texture T3204" },
        { id: 13, name: "T3205", img: "/images/carbon-rock-boards/stone/13.jpg", desc: "Stone texture T3205" },
        { id: 14, name: "T3206", img: "/images/carbon-rock-boards/stone/14.jpg", desc: "Stone texture T3206" },
        { id: 15, name: "T3207", img: "/images/carbon-rock-boards/stone/15.jpg", desc: "Stone texture T3207" },
        { id: 16, name: "S239-2", img: "/images/carbon-rock-boards/stone/16.jpg", desc: "Stone texture S239-2" },
        { id: 17, name: "Z7030", img: "/images/carbon-rock-boards/stone/17.jpg", desc: "Stone texture Z7030" },
        { id: 18, name: "S240", img: "/images/carbon-rock-boards/stone/18.jpg", desc: "Stone texture S240" },
        { id: 19, name: "S3004", img: "/images/carbon-rock-boards/stone/19.jpg", desc: "Stone texture S3004" }
      ]
    },
    {
      id: 'fabric',
      name: "Cloth Pattern Series",
      desc: "Soft textile pattern with acoustic value.",
      icon: Paintbrush2,
      img: "/images/carbon-rock-boards/cloth.jpg",
      color: "from-neutral-100 to-stone-100",
      accent: "neutral-600",
      panels: [
        { id: 1, name: "Linen Weave", img: "/images/carbon-rock-boards/fabric/1.jpg", desc: "Linen Weave texture for contemporary interior walls" },
        { id: 2, name: "Denim Texture", img: "/images/carbon-rock-boards/fabric/2.jpg", desc: "Denim Texture texture for contemporary interior walls" },
        { id: 3, name: "Chambray Grid", img: "/images/carbon-rock-boards/fabric/3.jpg", desc: "Chambray Grid texture for contemporary interior walls" },
        { id: 4, name: "Ivory Cotton", img: "/images/carbon-rock-boards/fabric/4.jpg", desc: "Ivory Cotton texture for contemporary interior walls" },
        { id: 5, name: "Silver Mesh", img: "/images/carbon-rock-boards/fabric/5.jpg", desc: "Silver Mesh texture for contemporary interior walls" },
        { id: 6, name: "Soft Gauze", img: "/images/carbon-rock-boards/fabric/6.jpg", desc: "Soft Gauze texture for contemporary interior walls" },
        { id: 7, name: "Contrast Linen Panel", img: "/images/carbon-rock-boards/fabric/7.jpg", desc: "Contrast Linen Panel texture for contemporary interior walls" },
        { id: 8, name: "Beige Canvas", img: "/images/carbon-rock-boards/fabric/8.jpg", desc: "Beige Canvas texture for contemporary interior walls" },
        { id: 9, name: "Rice Grain Weave", img: "/images/carbon-rock-boards/fabric/9.jpg", desc: "Rice Grain Weave texture for contemporary interior walls" },
        { id: 10, name: "Crosshatch Blend", img: "/images/carbon-rock-boards/fabric/10.jpg", desc: "Crosshatch Blend texture for contemporary interior walls" },
        { id: 11, name: "Alabaster Cotton", img: "/images/carbon-rock-boards/fabric/11.jpg", desc: "Alabaster Cotton texture for contemporary interior walls" },
        { id: 12, name: "Khaki Hemp", img: "/images/carbon-rock-boards/fabric/12.jpg", desc: "Khaki Hemp texture for contemporary interior walls" },
        { id: 13, name: "Pebble Mesh", img: "/images/carbon-rock-boards/fabric/13.jpg", desc: "Pebble Mesh texture for contemporary interior walls" },
        { id: 14, name: "Cream Wool", img: "/images/carbon-rock-boards/fabric/14.jpg", desc: "Cream Wool texture for contemporary interior walls" },
      ]
    },
    {
      id: 'metallic',
      name: "Metal Series",
      desc: "Luxury feel with metallic luster and reflectivity.",
      icon: Paintbrush2,
      img: "/images/carbon-rock-boards/metal.jpg",
      color: "from-amber-100 to-yellow-100",
      accent: "amber-600",
      panels: [
        { id: 1, name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish" },
        { id: 2, name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character" },
        { id: 3, name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance" },
        { id: 4, name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth" },
        { id: 5, name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity" },
        { id: 6, name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture" }
      ]
    },
    {
      id: 'mirror',
      name: "Mirror Series",
      desc: "Reflective brilliance with a sleek, high-gloss finish.",
      icon: Paintbrush2,
      img: "/images/carbon-rock-boards/mirror.jpg",
      color: "from-blue-100 to-indigo-100",
      accent: "blue-600",
      panels: [
        { id: 1, name: "Bronze Mirror", img: "/images/carbon-rock-boards/mirror/1.jpg", desc: "Warm bronze-tinted mirror with elegant shine" },
        { id: 2, name: "Copper Reflection", img: "/images/carbon-rock-boards/mirror/2.jpg", desc: "Vintage copper tone with smooth mirrored surface" },
        { id: 3, name: "Golden Glow", img: "/images/carbon-rock-boards/mirror/3.jpg", desc: "Champagne gold mirror finish with rich sheen" },
        { id: 4, name: "Brass Luxe", img: "/images/carbon-rock-boards/mirror/4.jpg", desc: "Matte brass reflection with subtle warmth" },
        { id: 5, name: "Crystal Silver", img: "/images/carbon-rock-boards/mirror/5.jpg", desc: "Sleek silver mirror with crisp reflectivity" },
        { id: 6, name: "Titanium Gloss", img: "/images/carbon-rock-boards/mirror/6.jpg", desc: "Cool titanium mirror with polished finish" }
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
    {categories.map((category, index) => (
     <div className="group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden bg-white">

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-xl font-bold text-slate-900">{panel.name}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{panel.desc}</p>
                    {/* <button
                      onClick={() => setLightboxImage(panel.img)}
                      className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> View Detail
                    </button> */}
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
