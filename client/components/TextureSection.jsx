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
        { id: 1, name: "Oak Grain", img: "/images/carbon-rock-boards/wood-oak.jpg", desc: "Classic oak wood pattern" },
        { id: 2, name: "Walnut Grain", img: "/images/carbon-rock-boards/wood-walnut.jpg", desc: "Rich walnut wood texture" },
        { id: 3, name: "Pine Grain", img: "/images/carbon-rock-boards/wood-pine.jpg", desc: "Light pine wood finish" },
        { id: 4, name: "Cherry Wood", img: "/images/carbon-rock-boards/wood-cherry.jpg", desc: "Elegant cherry wood grain" },
        { id: 5, name: "Mahogany", img: "/images/carbon-rock-boards/wood-mahogany.jpg", desc: "Luxurious mahogany texture" },
        { id: 6, name: "Bamboo", img: "/images/carbon-rock-boards/wood-bamboo.jpg", desc: "Sustainable bamboo pattern" }
      ]
    },
    {
      id: 'fabric',
      name: "Fabric Look",
      desc: "Soft textile pattern with acoustic value.",
      icon: Paintbrush2,
      img: "/images/carbon-rock-boards/cloth.jpg",
      panels: [
        { id: 1, name: "Linen Weave", img: "/images/carbon-rock-boards/fabric-linen.jpg", desc: "Natural linen texture" },
        { id: 2, name: "Canvas Look", img: "/images/carbon-rock-boards/fabric-canvas.jpg", desc: "Durable canvas appearance" },
        { id: 3, name: "Tweed Pattern", img: "/images/carbon-rock-boards/fabric-tweed.jpg", desc: "Classic tweed design" },
        { id: 4, name: "Velvet Touch", img: "/images/carbon-rock-boards/fabric-velvet.jpg", desc: "Soft velvet-like finish" },
        { id: 5, name: "Burlap Texture", img: "/images/carbon-rock-boards/fabric-burlap.jpg", desc: "Rustic burlap pattern" },
        { id: 6, name: "Silk Finish", img: "/images/carbon-rock-boards/fabric-silk.jpg", desc: "Smooth silk appearance" }
      ]
    },
    {
      id: 'concrete',
      name: "Concrete Finish",
      desc: "Modern industrial vibe with raw finish.",
      icon: Ruler,
      img: "/images/carbon-rock-boards/wpc.jpg",
      panels: [
        { id: 1, name: "Raw Concrete", img: "/images/carbon-rock-boards/concrete-raw.jpg", desc: "Authentic concrete texture" },
        { id: 2, name: "Polished Concrete", img: "/images/carbon-rock-boards/concrete-polished.jpg", desc: "Smooth polished finish" },
        { id: 3, name: "Exposed Aggregate", img: "/images/carbon-rock-boards/concrete-aggregate.jpg", desc: "Textured aggregate surface" },
        { id: 4, name: "Stamped Concrete", img: "/images/carbon-rock-boards/concrete-stamped.jpg", desc: "Decorative stamped pattern" },
        { id: 5, name: "Weathered Concrete", img: "/images/carbon-rock-boards/concrete-weathered.jpg", desc: "Aged concrete appearance" },
        { id: 6, name: "Smooth Concrete", img: "/images/carbon-rock-boards/concrete-smooth.jpg", desc: "Ultra-smooth finish" }
      ]
    },
    {
      id: 'metallic',
      name: "Metallic Shine",
      desc: "Luxury feel with metallic luster and reflectivity.",
      icon: Paintbrush2,
      img: "/images/carbon-rock-boards/metal.jpg",
      panels: [
        { id: 1, name: "Brushed Steel", img: "/images/carbon-rock-boards/metal-steel.jpg", desc: "Industrial brushed steel" },
        { id: 2, name: "Copper Patina", img: "/images/carbon-rock-boards/metal-copper.jpg", desc: "Aged copper finish" },
        { id: 3, name: "Gold Leaf", img: "/images/carbon-rock-boards/metal-gold.jpg", desc: "Luxurious gold appearance" },
        { id: 4, name: "Silver Chrome", img: "/images/carbon-rock-boards/metal-chrome.jpg", desc: "Reflective chrome finish" },
        { id: 5, name: "Bronze Patina", img: "/images/carbon-rock-boards/metal-bronze.jpg", desc: "Classic bronze texture" },
        { id: 6, name: "Titanium", img: "/images/carbon-rock-boards/metal-titanium.jpg", desc: "Modern titanium finish" }
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
