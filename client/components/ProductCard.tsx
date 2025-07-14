// src/components/ProductCard.tsx
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  imagePlaceholder: string;  // path or URL to real image
  className?: string;
  onViewMore?: () => void;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  features,
  imagePlaceholder,
  className = "",
  onViewMore,
  featured = false,
}) => {
  return (
    <div
      className={`group relative bg-card rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] ${
        featured ? "card-luxury-glow" : "border border-border"
      } ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        {/* Actual Image */}
        <img
          src={imagePlaceholder}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Dark overlay on hover for readability */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-foreground">
            Premium
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 bg-white">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm">
              <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        {/* <Button
          onClick={onViewMore}
          variant="ghost"
          className="w-full justify-between text-accent font-semibold border border-transparent hover:border-accent hover:text-white hover:bg-accent transition-all duration-300 group-hover:shadow-md group"
        >
          <span className="transition-colors duration-300">Explore Collection</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button> */}
      </div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default ProductCard;