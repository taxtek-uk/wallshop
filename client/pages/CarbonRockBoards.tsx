import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { motion, useScroll, useTransform } from 'framer-motion';
import Footer from "@/components/Footer";
import CrbQuoteModal from "@/components/CrbQuoteModal";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Sparkles,
  Flame,
  Hammer,
  Globe,
  Ruler,
  Building,
  Home,
  Layers,
  Zap,
  ArrowRight,
  MessagesSquare,
  Users,
  Square,
  Warehouse,
  ChevronRight,
  TreePine,
  Gem
} from "lucide-react";




// Texture Categories Data
const textureCategories = [
  {
    id: 'fabric',
    name: "Cloth Pattern Series",
    desc: "Soft textile pattern with acoustic value.",
    icon: Layers,
    img: "/images/carbon-rock-boards/cloth.jpg",
    color: "from-leather-100 to-mocha-100",
    accent: "leather-600",
    panels: [
  { 
  id: "T6004", 
  name: "Stone Weave", 
  img: "/images/carbon-rock-boards/fabric/t6004.jpg", 
  desc: "Subtle woven texture with a natural stone-inspired fabric look, ideal for refined interiors.", 
  stock: 10 
},
{ 
  id: "T6104", 
  name: "Stone Bead", 
  img: "/images/carbon-rock-boards/fabric/t6104.jpg", 
  desc: "Delicate beaded weave with a tactile stone-like surface, offering a modern textile effect.", 
  stock: 10 
},
{ 
  id: "T6201", 
  name: "Pearl Shimmer", 
  img: "/images/carbon-rock-boards/fabric/t6201.jpg", 
  desc: "Elegant woven finish with a soft pearl shimmer, adding subtle radiance to interiors.", 
  stock: 10 
},
{ 
  id: "T6301", 
  name: "Chambray Grid", 
  img: "/images/carbon-rock-boards/fabric/t6301.jpg", 
  desc: "Classic chambray-style grid pattern with a balanced woven texture for modern spaces.", 
  stock: 10 
},
{ 
  id: "S6026", 
  name: "Mauve Weave", 
  img: "/images/carbon-rock-boards/fabric/s6026.jpg", 
  desc: "Textured weave in a soft mauve tone, blending warmth with subtle sophistication.", 
  stock: 10 
},
{ 
  id: "S6029",
  name: "Rice Grain Weave", 
  img: "/images/carbon-rock-boards/fabric/s6029.jpg", 
  desc: "Distinctive rice-grain weave resembling natural linen threads for an organic appeal.", 
  stock: 10 
},
{ 
  id: "T6102", 
  name: "Silver Mesh", 
  img: "/images/carbon-rock-boards/fabric/t6102.jpg", 
  desc: "Reflective mesh weave with a silver metallic effect, adding depth and dimension.", 
  stock: 10 
},
{ 
  id: "T6306", 
  name: "Alabaster Cotton", 
  img: "/images/carbon-rock-boards/fabric/t6306.jpg", 
  desc: "Smooth cotton-inspired surface in an alabaster tone, offering a clean and minimal look.", 
  stock: 10 
},
{ 
  id: "S6020", 
  name: "Soft Gauze", 
  img: "/images/carbon-rock-boards/fabric/t6020.jpg", 
  desc: "Lightweight gauze-like texture with a delicate, airy transparency.", 
  stock: 10 
}
]
  },
  {
    id: 'wood',
    name: "Wood Grain Series",
    desc: "Warm wood aesthetics with durable surface.",
    icon: TreePine,
    img: "/images/carbon-rock-boards/wood.jpg",
    color: "from-amber-100 to-orange-100",
    accent: "amber-600",
    panels: [
      { id: "T9016", name: "Ash Grey", img: "/images/carbon-rock-boards/wood/1.jpg", desc: "Soft ash grain with light grey overtone", stock: 10 },
      { id: "T9051", name: "Walnut Mist", img: "/images/carbon-rock-boards/wood/2.jpg", desc: "Mid-brown walnut tone with subtle striations", stock: 10 },
      { id: "T9222", name: "Smoked Ash", img: "/images/carbon-rock-boards/wood/3.jpg", desc: "Dark smoked ash grain with rich contrast", stock: 10 },
      { id: "T9012", name: "Rosewood Brown", img: "/images/carbon-rock-boards/wood/4.jpg", desc: "Warm reddish grain like tropical leatherwood", stock: 10 },
      { id: "T9015", name: "Weathered Storm", img: "/images/carbon-rock-boards/wood/5.jpg", desc: "Weathered wood texture with a stormy tone", stock: 10 },
      { id: "T9053", name: "Walnut Stream", img: "/images/carbon-rock-boards/wood/6.jpg", desc: "Strong walnut character with deep flowing grain", stock: 10 }
    ]
  },
  {
    id: 'solid',
    name: "Solid Color Series",
    desc: "Industrial elegance with raw, minimalist tones.",
    icon: Square,
    img: "/images/carbon-rock-boards/wpc.jpg",
    color: "from-slate-100 to-gray-100",
    accent: "slate-600",
    panels: [
      { id: "T8201", name: "Warm Blush", img: "/images/carbon-rock-boards/solid/1.jpg", desc: "A soft blush hue for cozy minimalism", stock: 10 },
      { id: "T8026", name: "Ash Silver", img: "/images/carbon-rock-boards/solid/2.jpg", desc: "Neutral silver-gray with a clean industrial look", stock: 10 },
      { id: "T8107", name: "Slate Blue", img: "/images/carbon-rock-boards/solid/3.jpg", desc: "Dark blue-grey with a sophisticated edge", stock: 10 },
      { id: "T8039", name: "Ivory", img: "/images/carbon-rock-boards/solid/4.jpg", desc: "Soft ivory tone perfect for elegant settings", stock: 10 },
      { id: "T8103", name: "Pearl Cream", img: "/images/carbon-rock-boards/solid/5.jpg", desc: "Soft pearl-beige tone for warm ambience", stock: 10 },
      { id: "T8036", name: "Desert Sand", img: "/images/carbon-rock-boards/solid/6.jpg", desc: "Warm tan reminiscent of natural sands", stock: 10 },
      { id: "T8008", name: "Obsidian", img: "/images/carbon-rock-boards/solid/7.jpg", desc: "Matte black with premium depth and richness", stock: 10 }
    ]
  },
  {
    id: 'stone',
    name: "Stone Grain Series",
    desc: "Classic stone surface with timeless elegance.",
    icon: Gem,
    img: "/images/carbon-rock-boards/stone.jpg",
    color: "from-stone-100 to-slate-100",
    accent: "stone-600",
    panels: [
      { id: "S3231", name: "White & Gold", img: "/images/carbon-rock-boards/stone/1.jpg", desc: "Stone texture White & Gold", stock: 10 },
      { id: "S3232", name: "Black & Blue", img: "/images/carbon-rock-boards/stone/s3232.jpg", desc: "Stone texture Black & Blue", stock: 10 },
      { id: "S3233", name: "Grey & Blue", img: "/images/carbon-rock-boards/stone/s3233.jpg", desc: "Stone texture Grey & Blue", stock: 10 },
      { id: "T3017", name: "Mid Grey & White", img: "/images/carbon-rock-boards/stone/4.jpg", desc: "Stone texture Mid Grey & White", stock: 10 },
      { id: "T3019", name: "Black & Brown", img: "/images/carbon-rock-boards/stone/t3019.jpg", desc: "Stone texture Black & Brown", stock: 10 },
      { id: "T3204", name: "Dark Grey & Black", img: "/images/carbon-rock-boards/stone/5.jpg", desc: "Stone texture Dark Grey & Black", stock: 10 }
    ]
  },
  {
    id: 'metallic',
    name: "Metal Series",
    desc: "Luxury feel with metallic luster and reflectivity.",
    icon: Layers,
    img: "/images/carbon-rock-boards/metal.jpg",
    color: "from-amber-100 to-yellow-100",
    accent: "amber-600",
    panels: [
  { 
    id: "LS-2A05", 
    name: "Antique Copper", 
    img: "/images/carbon-rock-boards/metal/ls-2a05.jpg", 
    desc: "Rich antique copper finish with timeless, rustic charm.", 
    stock: 10 
  },
  { 
    id: "LS-2A06", 
    name: "Urban Brass", 
    img: "/images/carbon-rock-boards/metal/ls-2a06.jpg", 
    desc: "Bold brass tone with an industrial, modern character.", 
    stock: 10 
  },
  { 
    id: "LS-2A08", 
    name: "Champagne Gold", 
    img: "/images/carbon-rock-boards/metal/ls-2a08.jpg", 
    desc: "Luxurious champagne gold with a refined, soft glow.", 
    stock: 10 
  },
  { 
    id: "LS-2A09", 
    name: "Brushed Bronze", 
    img: "/images/carbon-rock-boards/metal/ls-2a09.jpg", 
    desc: "Matte brushed bronze with warm, contemporary appeal.", 
    stock: 10 
  },
  { 
    id: "SZ-703", 
    name: "Brushed Silver", 
    img: "/images/carbon-rock-boards/metal/sz-703.jpg", 
    desc: "Sleek brushed silver offering a clean, modern look.", 
    stock: 10 
  },
  { 
    id: "SZ-705", 
    name: "Satin Titanium", 
    img: "/images/carbon-rock-boards/metal/sz-705.jpg", 
    desc: "Smooth satin titanium with a durable, futuristic finish.", 
    stock: 10 
  },
  { 
    id: "H-8301", 
    name: "Brushed Copper", 
    img: "/images/carbon-rock-boards/metal/h-8301.jpg", 
    desc: "Textured brushed copper with a warm metallic tone.", 
    stock: 10 
  },
  { 
  id: "SJ-2003", 
  name: "Cobalt Satin Metal", 
  img: "/images/carbon-rock-boards/metal/sj-2003.jpg", 
  desc: "Smooth satin finish with a cool cobalt blue metallic tone.", 
  stock: 10 
},
{ 
  id: "S-8026", 
  name: "Bronze Satin Metal", 
  img: "/images/carbon-rock-boards/metal/s-8026.jpg", 
  desc: "Elegant satin finish with a rich bronze metallic appearance.", 
  stock: 10 
},
{ 
  id: "S-8115", 
  name: "Steel Shine Mosaic", 
  img: "/images/carbon-rock-boards/metal/s8115.jpg", 
  desc: "The brushed texture gives it a modern, reflective, metallic look.", 
  stock: 10 
}
]
  },
  {
    id: 'mirror',
    name: "Mirror Series",
    desc: "Reflective brilliance with a sleek, high-gloss finish.",
    icon: Square,
    img: "/images/carbon-rock-boards/mirror.jpg",
    color: "from-leather-100 to-leather-100",
    accent: "stone-600",
    panels: [
  { 
    id: "MR2001", 
    name: "Mirror Bronze", 
    img: "/images/carbon-rock-boards/mirror/1.webp", 
    desc: "Elegant bronze mirror with a warm reflection.", 
    stock: 10 
  },
  { 
    id: "MR2002", 
    name: "Ripple Silver Mirror", 
    img: "/images/carbon-rock-boards/mirror/5.webp", 
    desc: "Elegant silver mirror with a subtle ripple texture for a modern reflective finish.", 
    stock: 10 
  },
  { 
    id: "MR2003", 
    name: "Mirror Black", 
    img: "/images/carbon-rock-boards/mirror/2.webp", 
    desc: "Bold black mirror with a dramatic reflection.", 
    stock: 10 
  },
  { 
    id: "MR2004", 
    name: "Ripple Gold Mirror", 
    img: "/images/carbon-rock-boards/mirror/4.webp", 
    desc: "Textured gold mirror with a radiant glow.", 
    stock: 10 
  },
  { 
    id: "MR2005", 
    name: "Mirror Silver", 
    img: "/images/carbon-rock-boards/mirror/3.webp", 
    desc: "Classic silver mirror with a clear finish.", 
    stock: 10 
  },
  { 
    id: "MR2006",
    name: "Mirror White", 
    img: "/images/carbon-rock-boards/mirror/jm03.jpg", 
    desc: "Clean white mirror with a bright reflection.", 
    stock: 10 
  }
]
  }
];

// AI Chatbot widget (basic floating bubble, triggers chat on click)
const AIChatWidget = () => (
  <>
    <div
      id="ai-chat-widget"
      className="fixed bottom-7 right-7 z-50"
      style={{ width: 74, height: 74 }}
    >
      <button
        className="w-full h-full rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] shadow-2xl flex flex-col items-center justify-center animate-bounce-slow hover:scale-105 transition"
        title="Ask AI"
        onClick={() => {
          // Replace this with your AI chat open logic
          alert("Launching The Wall Shop AI Chat Assistant...");
        }}
      >
        <Sparkles className="w-8 h-8 text-white mb-1" />
        <span className="text-xs font-bold text-white">Ask AI</span>
      </button>
    </div>
    <style>{`
      @keyframes bounce-slow {0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
      .animate-bounce-slow {animation:bounce-slow 2s infinite;}
    `}</style>
  </>
);

const CarbonRockBoards = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; price: string }>({ name: "", price: "" });
  const [selectedCategory, setSelectedCategory] = useState('fabric');
  // --- SEO and Schema ---
  useEffect(() => {
    document.title =
      "Carbon Rock Boards - Next-Gen Wall Panels | Fireproof, Durable, Acoustic | The Wall Shop UK";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover Carbon Rock Boards: advanced wall panels engineered for safety, soundproofing, and style. Fire-resistant, ultra-strong, and perfect for homes, offices, and commercial projects. The Wall Shop UK."
      );
    }
    // Inject JSON-LD schema (AI-SEO)
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Carbon Rock Board",
      "image": [
        "/images/carbon-rock-boards/01.webp",
        "/images/carbon-rock-boards/02.webp"
      ],
      "description":
        "Carbon Rock Boards are next-generation wall panels engineered for fire safety, acoustic performance, and modern design. Ideal for residential, office, hotel, and public spaces.",
      "brand": { "@type": "Brand", "name": "The Wall Shop" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "130"
      },
      "sku": "CRB-2025"
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // --- Features, Applications, Process Data ---
  const features = [
    {
      icon: Shield,
      title: "Fireproof & Safe",
      description: "Certified A1 fire rating. Ultimate fire resistance for residential & commercial safety.",
    },
    {
      icon: Flame,
      title: "Thermal & Acoustic",
      description: "Reduces heat transfer and blocks sound. Ideal for quiet, comfortable interiors.",
    },
    {
      icon: Hammer,
      title: "Ultra Durable",
      description: "Impact, scratch, and moisture resistant. Perfect for high-traffic zones.",
    },
    {
      icon: Sparkles,
      title: "Modern Finish",
      description: "Sleek, natural stone look. Available in custom sizes & textures.",
    },
  ];

  const applications = [
    {
      icon: Home,
      title: "Luxury Homes",
      description: "Safe and stylish for living rooms, bedrooms, kitchens, and feature walls.",
    },
    {
      icon: Building,
      title: "Offices & Workspaces",
      description: "Soundproof and fire-rated for productive, modern work environments.",
    },
    {
      icon: Warehouse,
      title: "Hotels & Hospitality",
      description: "Elegant lobbies, corridors, and guest rooms with lasting protection.",
    },
    {
      icon: Globe,
      title: "Public & Retail",
      description: "Shopping malls, airports, schools, and more – wherever safety and design matter.",
    },
  ];

  const processSteps = [
    {
      icon: Users,
      title: "Consultation",
      desc: "Share your project needs. Get expert advice and samples.",
    },
    {
      icon: Ruler,
      title: "Precision Measurement",
      desc: "Our team ensures a perfect fit on-site or via your drawings.",
    },
    {
      icon: Layers,
      title: "Custom Production",
      desc: "Panels cut to your size & spec. Choice of textures and edge profiles.",
    },
    {
      icon: Zap,
      title: "Delivery & Install",
      desc: "Fast, safe UK-wide shipping and certified installation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f3] flex flex-col">
      <Navigation />

      {/* Hero */}
<section
  className="pt-24 pb-16 relative"
  style={{
    backgroundImage: "url('/images/carbon-rock-boards/hero-img.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-black/60" />
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div>
        <span className="inline-block bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-4 py-2 rounded-full text-sm font-semibold shadow mb-6">
          Carbon Rock Boards
        </span>
        <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow">
          Next-Gen Decorative Wall Panels
        </h1>
        <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
          Stone | Wood | WPC | Mirror | Fluted | Acoustic
          <br />
          Reinvent your space with advanced stone, wood, WPC, and fabric finishes that blend safety and style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold shadow bg-gradient-to-br from-[#b69777] to-[#907252] text-white"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        
        </div>
      </div>

      {/* Right Image */}
      <div className="relative">
        <img
          src="/images/carbon-rock-boards/wpc.jpg"
          alt="Decorative Wall Panel Sample"
          className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-4 border-white"
          draggable={false}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-br from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Premium Finish
          </span>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section – Why Choose Carbon Rock Boards */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
        Why Choose Carbon Rock Boards?
      </h2>
      <p className="text-xl text-[#6b5c47] mt-4 max-w-2xl mx-auto">
        Engineered for performance. Designed for impact. Our panels combine fire resistance, sound insulation, and durable luxury for every space.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: Shield,
          title: "A1 Fire-Rated",
          description: "Certified fireproof technology for unbeatable protection in residential and commercial applications.",
        },
        {
          icon: Flame,
          title: "Thermal & Acoustic",
          description: "Excellent heat insulation and sound absorption for comfortable, quiet interiors.",
        },
        {
          icon: Hammer,
          title: "Ultra Durable",
          description: "Scratch-resistant, impact-proof, and moisture-tolerant—perfect for high-traffic zones.",
        },
        {
          icon: Sparkles,
          title: "Designer Finishes",
          description: "Choose from realistic wood, natural stone, metallics, and more to match any aesthetic.",
        },
      ].map((f, idx) => {
        const Icon = f.icon;
        return (
          <div
            key={idx}
            className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#f9f7f5] via-[#fcf9f5] to-[#ece2d2] shadow hover:scale-105 transition-all duration-300 border border-[#e2d5c4]"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-4 shadow-md">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-[#231c14] mb-1">{f.title}</h3>
            <p className="text-[#907252]">{f.description}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* NEW SECTION: Premium Texture Collection */}
      <section id="textures" className="py-20 bg-gradient-to-br from-[#f8f6f3] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
              Premium Materials
            </div>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="block text-gray-800">Premium Texture</span>
              <span className="block bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-4xl mx-auto leading-relaxed">
              Choose from our extensive collection of premium textures and finishes. Each series offers unique aesthetic qualities and functional benefits to perfectly complement your smart wall system.
            </p>
          </motion.div>

          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {textureCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white shadow-lg'
                    : 'bg-white border border-[#e2d5c4] text-[#6b5c47] hover:border-[#b69777] hover:shadow-md'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Selected Category Display */}
          {textureCategories.map((category) => (
            selectedCategory === category.id && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-8 h-8 text-[#6b5c47]" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-3xl font-bold text-[#231c14] mb-2">{category.name}</h3>
                      <p className="text-lg text-[#6b5c47]">{category.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Panels Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.panels.map((panel, i) => (
                    <motion.div
                      key={panel.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl shadow-lg border border-[#e2d5c4] overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={panel.img}
                            alt={panel.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0" />
                          {/* <div className="absolute top-3 right-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              panel.stock > 0 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {panel.stock > 0 ? `${panel.stock} In Stock` : 'Out of Stock'}
                            </div>
                          </div> */}
                          <div className="absolute bottom-3 left-3">
                            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                              {panel.id}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h4 className="text-xl font-bold text-[#231c14] mb-3">{panel.name}</h4>
                          <p className="text-[#6b5c47] text-sm leading-relaxed">{panel.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          ))}

          {/* Call to Action */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#b69777]/5 to-[#907252]/5 rounded-3xl p-8 border border-[#e2d5c4] text-center"
            >
              <h3 className="text-3xl font-bold text-[#231c14] mb-4">Need Help Choosing?</h3>
              
              <p className="text-xl text-[#6b5c47] mb-4 max-w-3xl mx-auto">
                Our design experts can help you select the perfect texture combination for your smart wall system. 
                Get personalised recommendations based on your space and style preferences.
              </p>

              {/* Animated extra line */}
              <motion.p
                initial={{ opacity: 0, y:     10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-[#907252] italic mb-8"
              >
                Many more options are available on request.
              </motion.p>

              <button
                className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center mx-auto"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Get Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>

        </div>
      </section>

      {/* Application Scenarios */}
      <section className="py-16 bg-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              Perfect Applications
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto">
              Carbon Rock Boards bring beauty and peace of mind to every space—where protection and design matter most.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((a, idx) => {
              const Icon = a.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white shadow hover:shadow-2xl transition-all duration-300 flex flex-col items-center border border-[#ece2d2]"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg text-[#231c14] mb-2">{a.title}</h4>
                  <p className="text-[#6b5c47] text-center">{a.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent text-center mb-14">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b69777] to-[#907252] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow">
                    {i + 1}
                  </div>
                  <Icon className="w-8 h-8 text-[#b69777] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#231c14] mb-2">{step.title}</h3>
                  <p className="text-[#6b5c47]">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg">
            Get a Quote or Free Sample
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            See the difference for yourself. Discover why architects and designers across the UK choose Carbon Rock Boards.
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
      </section> */}

      <Footer />
      
       <CrbQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productCategory="carbon-rock-boards"
      />

      {/* Soft fade animation */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.7s cubic-bezier(.35,.8,.44,1) both; }
      `}</style>
    </div>
  );
};

export default CarbonRockBoards;
