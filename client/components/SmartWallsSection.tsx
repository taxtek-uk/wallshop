import { useState } from "react";
import {
  Tv,
  Flame,
  Lightbulb,
  Volume2,
  Shield,
  Settings,
  Check,
  ArrowRight,
} from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SmartWallsSection = () => {
  const techModules = [
    {
      icon: Tv,
      title: "Integrated Display",
      description: "4K OLED displays seamlessly built into wall panels",
    },
    {
      icon: Flame,
      title: "Smart Fireplace",
      description: "Electric fireplace with remote temperature control",
    },
    {
      icon: Lightbulb,
      title: "Ambient Lighting",
      description: "Programmable LED lighting with 16M color options",
    },
    {
      icon: Volume2,
      title: "Audio System",
      description: "Invisible speakers with spatial audio technology",
    },
    {
      icon: Shield,
      title: "Security Hub",
      description: "Integrated cameras and access control systems",
    },
    {
      icon: Settings,
      title: "Smart Controls",
      description: "Centralized home automation and climate control",
    },
  ];

  const finishes = [
    {
      name: "Carrara Marble",
      model: "CM-102",
      description: "Classic white Italian marble with subtle grey veins.",
    },
    {
      name: "Brushed Copper",
      model: "BC-210",
      description: "Warm metallic tone with a contemporary brushed texture.",
    },
    {
      name: "Matte Black",
      model: "MB-001",
      description: "Sleek ultra-matte finish for bold, modern interiors.",
    },
    {
      name: "Natural Oak",
      model: "NO-350",
      description: "Warm and natural grain that suits rustic themes.",
    },
    {
      name: "Venetian Plaster",
      model: "VP-990",
      description: "Polished plaster with a soft, cloudy finish.",
    },
    {
      name: "Carbon Fiber",
      model: "CF-840",
      description: "Tech-inspired weave with high gloss durability.",
    },
    {
      name: "Rose Gold",
      model: "RG-728",
      description: "Luxurious blend of gold and blush tones.",
    },
    {
      name: "Travertine",
      model: "TV-115",
      description: "Earthy, natural stone texture with subtle pores.",
    },
  ];

  const variants = [
    {
      id: "copper",
      name: "Brushed Copper",
      description: "Premium metallic finish with warm undertones",
      gradient: "from-copper-300 to-copper-600",
      texture: "bg-gradient-to-br from-copper-200 via-copper-400 to-copper-600",
    },
    {
      id: "marble",
      name: "Carrara Marble",
      description: "Classic Italian marble with natural veining",
      gradient: "from-white via-gray-100 to-gray-300",
      texture: "bg-gradient-to-br from-white via-gray-50 to-gray-200",
    },
    {
      id: "gloss",
      name: "Piano Black",
      description: "High-gloss finish for modern aesthetics",
      gradient: "from-gray-800 to-black",
      texture: "bg-gradient-to-br from-gray-700 via-gray-900 to-black",
    },
    {
      id: "steel",
      name: "Stainless Steel",
      description: "Brushed steel with industrial appeal",
      gradient: "from-gray-400 to-gray-600",
      texture: "bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700",
    },
  ];

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <section
      id="smart-walls"
      className="py-12 lg:py-16 relative overflow-hidden z-30 bg-gradient-to-br from-luxgray-100 via-white to-luxgray-50 text-foreground"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
            <span className="gradient-text-platinum">Introducing</span>
            <span className="block gradient-text-luxury">Smart Walls</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            The future of wall design. Seamlessly integrate technology into your walls with our revolutionary smart wall systems that transform any space into an intelligent environment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Traditional Wall Card */}
          <div className="relative group">
            <div
              className="h-80 rounded-lg overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: "url('/images/traditional-wall.jpg')" }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <h3 className="font-semibold text-foreground">Traditional Wall</h3>
                <p className="text-sm text-muted-foreground">Static design, limited functionality</p>
              </div>
            </div>
          </div>

          {/* Smart Wall Card */}
          <div className="relative group">
            <div
              className="h-80 rounded-lg overflow-hidden relative bg-cover bg-center"
              style={{ backgroundImage: "url('/images/smart-wall-technology.webp')" }}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                <h3 className="font-semibold text-foreground">Smart Wall</h3>
                <p className="text-sm text-muted-foreground">Integrated technology, infinite possibilities</p>
              </div>
            </div>
          </div>
        </div>

         {/* Before/After Comparison */}
               
                <div className="container mx-auto px-4 lg:px-8">
                  <BeforeAfterSlider />
                </div>
               

        {/* Centered Button Below Cards */}
        <div className="flex justify-center mt-8 mb-24">
          <Link to="/smart-walls">
            <Button
              variant="luxury"
              size="lg"
              className="px-8 py-4 text-white inline-flex items-center space-x-2 group"
            >
              <span>Know More About Smart Walls</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SmartWallsSection;