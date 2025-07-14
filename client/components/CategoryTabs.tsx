// src/components/CategoryTabs.tsx
import { useState, Fragment, PropsWithChildren } from "react";
import { Palette, Volume2, Shield, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

/* -------------------------------------------------------------------------- */
/*  1.  Types                                                                 */
/* -------------------------------------------------------------------------- */
interface Product {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  products: Product[];
  stats: { label: string; value: string }[];
}

/* -------------------------------------------------------------------------- */
/*  2.  Data                                                                  */
/* -------------------------------------------------------------------------- */
const CATEGORIES: Category[] = [
  {
    id: "wallpapers",
    name: "Luxury Wallpapers",
    icon: Palette,
    description: "Premium handcrafted wallpapers with exclusive designs.",
    products: [
      {
        title: "Silk Collection",
        description:
          "Hand-painted silk wallpapers with metallic accents and intricate patterns.",
        features: [
          "100% natural silk base",
          "Hand-painted designs",
          "Metallic gold accents",
          "Custom patterns available",
          "Professional installation",
        ],
        image: "/images/wallpapers/silk-collection/02.jpg",
      },
      {
        title: "Metallic Series",
        description:
          "Contemporary wallpapers with copper and bronze metallic finishes.",
        features: [
          "Copper & bronze tones",
          "Contemporary patterns",
          "Reflective finish",
          "Fade-resistant",
          "Easy maintenance",
        ],
        image: "/images/wallpapers/metallilc-series.jpg",
      },
      {
        title: "Seasonal Woods",
        description:
          "Seasonal woods wallpapers that create dramatic, nature-inspired statements.",
        features: [
          "Rich wood grain texture",
          "Sound absorption",
          "Luxury feel",
          "Durable construction",
          "Eco-friendly inks",
        ],
        image: "/images/wallpapers/03-4.webp",
      },
    ],
    stats: [
      { label: "Unique Patterns", value: "500+" },
      { label: "Premium Materials", value: "50+" },
      { label: "Design Support", value: "24/7" },
      { label: "Custom Options", value: "100%" },
    ],
  },
  {
    id: "acoustic",
    name: "Acoustic Panels",
    icon: Volume2,
    description: "Sound-absorbing panels that fuse function with style.",
    products: [
      {
        title: "Studio Pro Series",
        description:
          "Professional-grade acoustic panels for home studios & media rooms.",
        features: [
          "NRC 0.95 rating",
          "Class A fire rating",
          "Custom colours",
          "Easy installation",
          "Moisture-resistant",
        ],
        image:
          "/images/acoustic-panels/alphasorb-series-200-polyester-acoustic-panels-3.jpg",
      },
      {
        title: "Decorative Acoustic",
        description:
          "Stylish felt hexagon panels that enhance acoustics & décor.",
        features: [
          "Hexagon shapes",
          "25+ vibrant colours",
          "Excellent absorption",
          "Interior-design friendly",
          "Maintenance-free",
        ],
        image:
          "/images/acoustic-panels/alphasorb-designer-premium-acoustic-felt-hexagon-wall-panels.jpg",
      },
    ],
    stats: [
      { label: "Sound Absorption", value: "NRC 0.95" },
      { label: "Fire Rating", value: "Class A" },
      { label: "Colour Options", value: "25+" },
      { label: "Install Time", value: "Easy" },
    ],
  },
  {
    id: "carbon",
    name: "Carbon Rock Boards",
    icon: Shield,
    description: "Ultra-lightweight, durable panels with modern aesthetics.",
    products: [
      {
        title: "Carbon Elite",
        description:
          "Premium carbon-fibre panels with matte black finish for modern spaces.",
        features: [
          "Ultra-lightweight",
          "Scratch-resistant",
          "Weather-proof",
          "Matte finish",
          "Easy install",
        ],
        image: "/images/carbon-rock-boards/01.webp",
      },
      {
        title: "Rock Composite",
        description:
          "Natural rock texture reinforced with carbon for extreme durability.",
        features: [
          "Rock appearance",
          "Impact-resistant",
          "UV stable",
          "Sustainable materials",
          "Indoor / outdoor use",
        ],
        image: "/images/carbon-rock-boards/02.webp",
      },
    ],
    stats: [
      { label: "Weight", value: "Ultra-Light" },
      { label: "Weather Proof", value: "100%" },
      { label: "Scratch Guard", value: "Yes" },
      { label: "Eco Friendly", value: "✔︎" },
    ],
  },
  {
    id: "smart",
    name: "Smart Walls",
    icon: Zap,
    description: "Revolutionary wall systems with integrated technology.",
    products: [
      {
        title: "Smart Wall Pro",
        description:
          "Complete smart wall solution with TV, audio, lighting & control.",
        features: [
          "4K display",
          "Hidden audio",
          "LED lighting",
          "Smart-home ready",
          "Voice control",
        ],
        image: "/images/smart-walls/smart-wall-pro.jpg",
      },
      {
        title: "Modular Smart System",
        description:
          "Customisable smart-wall modules for any space configuration.",
        features: [
          "Modular design",
          "Expandable",
          "Wireless connectivity",
          "Multiple finishes",
          "Pro installation",
        ],
        image: "/images/smart-walls/modular-smart-wall.png",
      },
    ],
    stats: [
      { label: "Tech Modules", value: "8+" },
      { label: "Finish Options", value: "100+" },
      { label: "Installation Time", value: "3-4 Hours" },
      { label: "Smart-Home Ready", value: "✔︎" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  3.  Helper Components                                                     */
/* -------------------------------------------------------------------------- */
function TabButton({
  active,
  icon: Icon,
  children,
  ...rest
}: PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active: boolean;
    icon: React.ComponentType<{ className?: string }>;
  }
>) {
  return (
    <button
      {...rest}
      className={`relative flex items-center space-x-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-white text-gray-900 shadow"
          : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{children}</span>
      {active && (
        <span className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-accent rounded-full" />
      )}
    </button>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <p className="text-xs text-gray-400 tracking-wider uppercase">{label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  4.  Main Component                                                        */
/* -------------------------------------------------------------------------- */
export default function CategoryTabs() {
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const current = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section className="w-full overflow-x-hidden px-4"> {/* Added padding for mobile */}
  {/* Navigation */}
  <div className="flex justify-center mb-10 overflow-x-auto">
    <div className="flex flex-wrap backdrop-blur bg-white/40 rounded-full p-1 shadow-inner max-w-full">
      {CATEGORIES.map((cat) => (
        <TabButton
          key={cat.id}
          active={cat.id === active}
          onClick={() => setActive(cat.id)}
          icon={cat.icon}
        >
          {cat.name}
        </TabButton>
      ))}
    </div>
  </div>

  {/* Header */}
  <header className="text-center mb-12">
    <div className="inline-flex items-center gap-2 mb-4 flex-wrap justify-center">
      <current.icon className="w-8 h-8 text-accent drop-shadow" />
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{current.name}</h2> {/* Added smaller mobile font */}
    </div>
    <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2">
      {current.description}
    </p>
  </header>

  {/* Products */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {current.products.map((p, i) => (
      <ProductCard
        key={p.title}
        title={p.title}
        description={p.description}
        features={p.features}
        imagePlaceholder={p.image}
        featured={i === 0}
      />
    ))}
  </div>

  {/* Stats */}
  <div className="mt-16 bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white rounded-2xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 shadow-inner">
    {current.stats.map((s) => (
      <Stat key={s.label} {...s} />
    ))}
  </div>
</section>

  );
}
