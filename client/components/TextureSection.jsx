import React, { useState } from 'react';
import { Mountain, Layers, Paintbrush2, Ruler, ArrowLeft } from 'lucide-react';

const TextureSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailView, setIsDetailView] = useState(false);

// Main categories data
  const categories = [
    {
      id: 'stone',
      name: "Stone Texture",
      desc: "Classic stone surface with timeless elegance.",
      icon: Mountain,
      img: "/images/carbon-rock-boards/stone.jpg",
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
  id: 'wood',
  name: "Wood Grain",
  desc: "Warm wood aesthetics with durable surface.",
  icon: Layers,
  img: "/images/carbon-rock-boards/wood.jpg",
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
  id: 'fabric',
  name: "Fabric Look",
  desc: "Soft textile pattern with acoustic value.",
  icon: Paintbrush2,
  img: "/images/carbon-rock-boards/cloth.jpg",
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
  id: 'concrete',
  name: "Concrete Texture",
  desc: "Industrial elegance with raw, minimalist tones.",
  icon: Ruler,
  img: "/images/carbon-rock-boards/wpc.jpg",
  panels: [
    { id: 1, name: "Urban Taupe", img: "/images/carbon-rock-boards/concrete/1.jpg", desc: "Urban Taupe concrete surface with modern industrial feel" },
    { id: 2, name: "Mineral White", img: "/images/carbon-rock-boards/concrete/2.jpg", desc: "Mineral White concrete surface with modern industrial feel" },
    { id: 3, name: "Charcoal Sand", img: "/images/carbon-rock-boards/concrete/3.jpg", desc: "Charcoal Sand concrete surface with modern industrial feel" },
    { id: 4, name: "Muted Clay", img: "/images/carbon-rock-boards/concrete/4.jpg", desc: "Muted Clay concrete surface with modern industrial feel" },
    { id: 5, name: "Weathered Bronze", img: "/images/carbon-rock-boards/concrete/5.jpg", desc: "Weathered Bronze concrete surface with modern industrial feel" },
    { id: 6, name: "Burnt Terracotta", img: "/images/carbon-rock-boards/concrete/6.jpg", desc: "Burnt Terracotta concrete surface with modern industrial feel" },
    { id: 7, name: "Fog White", img: "/images/carbon-rock-boards/concrete/7.jpg", desc: "Fog White concrete surface with modern industrial feel" },
    { id: 8, name: "Ash Rose", img: "/images/carbon-rock-boards/concrete/8.jpg", desc: "Ash Rose concrete surface with modern industrial feel" },
    { id: 9, name: "Chalk Grey", img: "/images/carbon-rock-boards/concrete/9.jpg", desc: "Chalk Grey concrete surface with modern industrial feel" },
    { id: 10, name: "Bright Concrete", img: "/images/carbon-rock-boards/concrete/10.jpg", desc: "Bright Concrete surface with modern industrial feel" },
    { id: 11, name: "Stone Grey", img: "/images/carbon-rock-boards/concrete/11.jpg", desc: "Stone Grey concrete surface with modern industrial feel" }
  ]
},
    {
  id: 'metallic',
  name: "Metallic Shine",
  desc: "Luxury feel with metallic luster and reflectivity.",
  icon: Paintbrush2,
  img: "/images/carbon-rock-boards/metal.jpg",
  panels: [
    { id: 1, name: "Brushed Bronze", img: "/images/carbon-rock-boards/metal/1.jpg", desc: "Elegant bronze with a brushed satin finish" },
    { id: 2, name: "Antique Copper", img: "/images/carbon-rock-boards/metal/2.jpg", desc: "Warm copper tone with vintage character" },
    { id: 3, name: "Champagne Gold", img: "/images/carbon-rock-boards/metal/3.jpg", desc: "Subtle golden shimmer with soft elegance" },
    { id: 4, name: "Urban Brass", img: "/images/carbon-rock-boards/metal/4.jpg", desc: "Contemporary brass with matte warmth" },
    { id: 5, name: "Mirror Silver", img: "/images/carbon-rock-boards/metal/5.jpg", desc: "Sleek silver chrome for high reflectivity" },
    { id: 6, name: "Satin Titanium", img: "/images/carbon-rock-boards/metal/6.jpg", desc: "Modern titanium finish with silky texture" }
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
    <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-[#f8f6f3] min-h-screen">
      <div className="container mx-auto px-4 lg:px-8">
        {!isDetailView ? (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-6">
                Choose Your Perfect Style
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Select from our premium rock board options to match your aesthetic vision and interior design.
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCategoryClick(item)}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg bg-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300"
                >
                  <img
                    src={item.img}
                    alt={`${item.name} rock board`}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                  <div className="p-5 text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-3">
                      <item.icon className="text-white w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-[#231c14] mb-1">{item.name}</h4>
                    <p className="text-sm text-[#6b5c47]">{item.desc}</p>
                    <div className="mt-3 text-xs text-[#b69777] font-medium">
                      Click to view all options →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-12">
              <button
                onClick={handleBackClick}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md hover:shadow-lg border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 group"
              >
                <ArrowLeft className="w-5 h-5 text-[#b69777] group-hover:text-[#907252]" />
                <span className="text-[#231c14] font-medium">Back to Categories</span>
              </button>

              <div className="text-center flex-1">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
                  {selectedCategory?.name} Collection
                </h2>
                <p className="text-lg text-[#6b5c47]">
                  Explore all available {selectedCategory?.name.toLowerCase()} options
                </p>
              </div>

              <div className="w-24" />
            </div>

            {/* Panels Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {selectedCategory?.panels.map((panel) => (
                <div
                  key={panel.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300"
                >
                  <img
                    src={panel.img}
                    alt={panel.name}
                    className="w-full h-58 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-[#231c14] mb-1 text-base">{panel.name}</h4>
                    <p className="text-sm text-[#6b5c47]">{panel.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Section */}
            <div className="mt-16 bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-[#e2d5c4]">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#231c14] mb-4">
                  Why Choose {selectedCategory?.name}?
                </h3>
                <p className="text-[#6b5c47] max-w-2xl mx-auto leading-relaxed">
                  Our {selectedCategory?.name.toLowerCase()} collection offers exceptional durability,
                  aesthetic appeal, and versatility for any interior design project. Each panel is
                  crafted with precision and attention to detail.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 bg-[#b69777] text-black rounded-full text-sm font-medium">
                    Eco-Friendly
                  </span>
                  <span className="px-4 py-2 bg-[#b69777] text-black rounded-full text-sm font-medium">
                    Fire Resistant
                  </span>
                  <span className="px-4 py-2 bg-[#b69777] text-black rounded-full text-sm font-medium">
                    Easy Installation
                  </span>
                  <span className="px-4 py-2 bg-[#b69777] text-black rounded-full text-sm font-medium">
                    10 Year Warranty
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TextureSection;
