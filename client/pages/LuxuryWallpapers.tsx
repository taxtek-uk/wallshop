import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Sparkles,
  Leaf,
  Award,
  Clock,
  Ruler,
  Eye,
  ArrowRight,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";

// --- Responsive, modern, luxury wallpapers page ---
const LuxuryWallpapers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    document.title =
      "Premium Wallpaper Designs UK - Designer Wallpapers Interior | The Wall Shop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Luxury designer wallpapers featuring silk textures, metallic accents, and premium materials. Custom patterns, eco-friendly options for interior design projects across the UK.",
      );
    }
  }, []);

  // --- Data ---
  const categories = [
    { id: "all", name: "All Collections" },
    { id: "silk", name: "Silk Collection" },
    { id: "metallic", name: "Metallic Series" },
    { id: "textured", name: "Textured Luxury" },
    { id: "natural", name: "Natural Materials" },
  ];

  const rooms = [
    { id: "all", name: "All Rooms" },
    { id: "living", name: "Living Room" },
    { id: "bedroom", name: "Bedroom" },
    { id: "dining", name: "Dining Room" },
    { id: "office", name: "Home Office" },
  ];

  const collections = [
  {
    id: 1,
    name: "Chic Taupe Lounge",
    category: "silk",
    room: "living",
    price: "£145/roll",
    coverage: "5.2m²",
    description: "Subtle modern taupe silk effect for sophisticated lounges and living rooms. Minimal yet warm.",
    features: [
      "Silk-texture finish",
      "Warm taupe tones",
      "Soft luxury feel",
      "Easy-clean surface"
    ],
    image: "/images/wallpapers/wallpaper-44.avif",
    badge: "Silk Effect"
  },
  {
    id: 2,
    name: "Golden Beige Silk",
    category: "silk",
    room: "living",
    price: "£149/roll",
    coverage: "5.2m²",
    description: "Light golden silk wallcovering, perfect for contemporary sitting areas or master suites.",
    features: [
      "Golden silk look",
      "Contemporary elegance",
      "Versatile for any space",
      "Premium finish"
    ],
    image: "/images/wallpapers/01.jpg",
    badge: "Signature Silk"
  },
  {
    id: 3,
    name: "Artisan Blue Silk",
    category: "silk",
    room: "bedroom",
    price: "£139/roll",
    coverage: "5.2m²",
    description: "Hand-dyed blue silk wallpaper, brings cool tranquility to bedrooms or accent walls.",
    features: [
      "Blue silk hue",
      "Hand-finished texture",
      "Restful ambiance",
      "Luxurious detail"
    ],
    image: "/images/wallpapers/wallpaper-silk.jpg",
    badge: "Artisan Silk"
  },
  {
    id: 4,
    name: "Deep Green Metallic",
    category: "metallic",
    room: "dining",
    price: "£169/roll",
    coverage: "5.2m²",
    description: "Rich metallic green wallpaper, dramatic for dining rooms and feature spaces.",
    features: [
      "Metallic sheen",
      "Emerald depth",
      "Sophisticated look",
      "Easy maintenance"
    ],
    image: "/images/wallpapers/metallilc-series.jpg",
    badge: "Metallic Series"
  },
  {
    id: 5,
    name: "Bamboo Blossom",
    category: "natural",
    room: "bedroom",
    price: "£159/roll",
    coverage: "5.2m²",
    description: "Hand-painted bamboo and blossom Chinoiserie, classic for bedrooms or elegant feature walls.",
    features: [
      "Chinoiserie art",
      "Nature-inspired design",
      "Soft pastel palette",
      "Artisan crafted"
    ],
    image: "/images/wallpapers/03.jpg",
    badge: "Chinoiserie"
  },
  {
    id: 6,
    name: "Victorian Birds & Flowers",
    category: "natural",
    room: "living",
    price: "£172/roll",
    coverage: "5.2m²",
    description: "Victorian-inspired mural with birds, floral branches, and elegant symmetry.",
    features: [
      "Victorian mural",
      "Hand-painted detail",
      "Timeless elegance",
      "Stunning centerpiece"
    ],
    image: "/images/wallpapers/03-4.jpg",
    badge: "Victorian Mural"
  },
  {
    id: 7,
    name: "Contemporary Gold Lounge",
    category: "metallic",
    room: "living",
    price: "£162/roll",
    coverage: "5.2m²",
    description: "Modern gold metallic finish, great for lounges or office accent walls.",
    features: [
      "Gold metallic effect",
      "Modern look",
      "Durable surface",
      "Light reflective"
    ],
    image: "/images/wallpapers/wallpaper-22.jpg",
    badge: "Luxury Gold"
  },
  {
    id: 8,
    name: "Sculpted Sandstone",
    category: "natural",
    room: "office",
    price: "£132/roll",
    coverage: "5.2m²",
    description: "Sandstone effect wallpaper with a warm earthy tone, perfect for home offices.",
    features: [
      "Sandstone look",
      "Textured surface",
      "Warm earthy color",
      "Professional finish"
    ],
    image: "/images/wallpapers/wallpaper-55.avif",
    badge: "Contemporary"
  },
  {
    id: 9,
    name: "Modern Graphite Panel",
    category: "textured",
    room: "office",
    price: "£135/roll",
    coverage: "5.2m²",
    description: "Large-scale graphite mural wallpaper for modern creative spaces and work areas.",
    features: [
      "Textured mural",
      "Graphite finish",
      "Modern statement",
      "Commercial grade"
    ],
    image: "/images/wallpapers/wallpaper-33.jpg",
    badge: "Modern Mural"
  }
];

  const filteredCollections = collections.filter((collection) => {
    const categoryMatch =
      selectedCategory === "all" || collection.category === selectedCategory;
    const roomMatch =
      selectedRoom === "all" || collection.room === selectedRoom;
    return categoryMatch && roomMatch;
  });

  const benefits = [
    {
      icon: Award,
      title: "Premium Materials",
      description: "Only the finest fabrics and papers",
    },
    {
      icon: Palette,
      title: "Custom Design",
      description: "Bespoke patterns and colors available",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Sustainable and non-toxic materials",
    },
    {
      icon: Clock,
      title: "Quick Install",
      description: "Professional installation service",
    },
  ];

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section
  className="pt-24 pb-16 relative"
  style={{
    backgroundImage: "url('/images/wallpapers/wallpaper-cover.avif')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/50" />
  {/* Subtle gold gradient overlay */}
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      background:
        "radial-gradient(ellipse at 80% 70%, rgba(182,151,119,0.18) 0%, transparent 60%)," +
        "linear-gradient(120deg, rgba(182,151,119,0.10) 0%, transparent 70%)",
    }}
  />
  {/* Black overlay for max text contrast */}
  <div className="absolute inset-0 bg-black/70 pointer-events-none z-0" />
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Hero Text */}
      <div>
        <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-6">
          🎨 Premium Designer Wallpapers
        </span>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow">
          Luxury Wallpapers
        </h1>
        <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
          Discover our exquisite collection of luxury wallpapers featuring silk textures, metallic accents, and premium natural materials. Each design is carefully crafted for the discerning homeowner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="luxury"
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow bg-gradient-to-br from-[#b69777] to-[#907252] text-white"
          >
            Browse Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
        </div>
      </div>

      {/* Silk Color Swatch Grid */}
      <div className="grid grid-cols-3 gap-5 animate-fadeIn">
        {[
          { name: "01", img: "/images/wallpapers/silk-colors/01.jpg" },
          { name: "02", img: "/images/wallpapers/silk-colors/10.jpg" },
          { name: "03", img: "/images/wallpapers/silk-colors/12.jpg" },
          { name: "04", img: "/images/wallpapers/silk-colors/07.jpg" },
          { name: "05", img: "/images/wallpapers/silk-colors/09.jpg" },
          { name: "06", img: "/images/wallpapers/silk-colors/06.avif" },
        ].map((swatch) => (
          <div
            key={swatch.name}
            className="relative h-32 rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 bg-white/60 border border-[#e7dbc9]"
          >
            <img
              src={swatch.img}
              alt={`Silk Sample ${swatch.name}`}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              draggable={false}
            />
            {/* Gold border highlight on hover */}
            <div className="absolute inset-0 rounded-2xl border-2 border-[#b69777] opacity-0 group-hover:opacity-90 pointer-events-none transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  </div>
  <style>{`
    .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(.33,1,.68,1) both;}
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;}}
  `}</style>
</section>




      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="text-center p-7 rounded-2xl bg-gradient-to-br from-[#f9f7f5] via-[#fcf9f5] to-[#ece2d2] shadow hover:scale-105 transition-all duration-300 border border-[#f0e4c3]"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#231c14] mb-1">{benefit.title}</h3>
                  <p className="text-[#907252]">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Collections Section */}
     <section className="py-16 bg-[#faf7f3]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
            Our Collections
          </h2>
          <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto">
            Explore our curated selection of luxury wallpapers, each designed to create stunning visual impact.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#b69777]" />
              <span className="text-[#b69777] font-semibold">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-[#b69777] rounded-lg px-3 py-2 text-[#231c14] focus:ring-2 focus:ring-[#b69777]"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#b69777] font-semibold">Room:</span>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="bg-white border border-[#b69777] rounded-lg px-3 py-2 text-[#231c14] focus:ring-2 focus:ring-[#b69777]"
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-[#b69777] font-semibold">View:</span>
            <div className="bg-white p-1 rounded-lg flex border border-[#b69777]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-br from-[#b69777] to-[#907252] text-white shadow"
                    : "text-[#b69777] hover:bg-[#f5eada]"
                }`}
                aria-label="Grid View"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-gradient-to-br from-[#b69777] to-[#907252] text-white shadow"
                    : "text-[#b69777] hover:bg-[#f5eada]"
                }`}
                aria-label="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            <span className="text-sm text-[#b69777]">
              {filteredCollections.length} results
            </span>
          </div>
        </div>

        {/* Cards */}
        <div
          className={`transition-all duration-400 ${
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}
        >
          {filteredCollections.map((collection) => (
            <div
              key={collection.id}
              className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[#f0e4c3] overflow-hidden group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              {/* Wallpaper image sample */}
              <div
                className={`relative ${
                  viewMode === "list" ? "w-48 flex-shrink-0" : "h-64"
                }`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                />
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {collection.badge}
                  </span>
                </div>
                {/* Price */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2">
                  <div className="font-bold text-[#231c14]">{collection.price}</div>
                  <div className="text-xs text-[#b69777]">{collection.coverage}</div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold text-[#231c14] mb-1">{collection.name}</h3>
                <p className="text-[#6b5c47] mb-3">{collection.description}</p>
                {/* Features */}
                <div className="space-y-2 mb-4">
                  {collection.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm">
                      <Sparkles className="w-4 h-4 text-[#b69777] mr-2" />
                      <span className="text-[#231c14]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent text-center mb-14">
            Our Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Discuss your vision and space requirements",
                icon: Palette,
              },
              {
                step: "2",
                title: "Sample Selection",
                description: "Choose from our premium wallpaper samples",
                icon: Eye,
              },
              {
                step: "3",
                title: "Measurement",
                description: "Precise room measurement for perfect fit",
                icon: Ruler,
              },
              {
                step: "4",
                title: "Installation",
                description: "Professional hanging by certified installers",
                icon: Clock,
              },
            ].map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b69777] to-[#907252] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow">
                    {step.step}
                  </div>
                  <IconComponent className="w-8 h-8 text-[#b69777] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#231c14] mb-2">{step.title}</h3>
                  <p className="text-[#6b5c47]">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Ready to Transform Your Walls?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Request free samples of your favorite wallpapers and see the quality difference for yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#b69777] hover:bg-[#faf7f3] px-8 py-4 text-lg font-bold shadow"
            >
              Request Free Samples
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[#b69777] px-8 py-4 text-lg font-bold"
            >
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
      <Footer />
      {/* Soft fade animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.35,.8,.44,1) both; }
      `}</style>
    </div>
  );
};

export default LuxuryWallpapers;