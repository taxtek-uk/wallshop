import { useState } from "react";
import { Check } from "lucide-react";

interface Variant {
  id: string;
  name: string;
  description: string;
  gradient: string;
  texture: string;
}

interface VariantSwitcherProps {
  onVariantChange?: (variant: Variant) => void;
}

const VariantSwitcher = ({ onVariantChange }: VariantSwitcherProps) => {
  const variants: Variant[] = [
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

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    onVariantChange?.(variant);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Preview Panel */}
       

      {/* Variant Options */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleVariantSelect(variant)}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedVariant.id === variant.id
                ? "border-accent shadow-lg scale-105"
                : "border-border hover:border-accent/50"
            }`}
          >
            {/* Finish Sample */}
            <div
              className={`w-full h-20 rounded-lg mb-4 ${variant.texture} shadow-md`}
            >
              {selectedVariant.id === variant.id && (
                <div className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                </div>
              )}
            </div>

            {/* Variant Info */}
            <h4 className="font-semibold text-foreground mb-1">
              {variant.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {variant.description}
            </p>

            {/* Selected Indicator */}
            {selectedVariant.id === variant.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-accent-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Additional Options */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Want to see more finishes? We have 100+ premium options available.
        </p>
        <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
          View All Finishes
        </button>
      </div>
    </div>
  );
};

export default VariantSwitcher;
