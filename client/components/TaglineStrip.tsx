import { Sparkles, Star, Crown } from "lucide-react";

const TaglineStrip = () => {
  return (
    <div className="tagline-strip rounded-full px-6 py-3 mb-8 inline-flex items-center space-x-3 animate-fade-in">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-gold-400 icon-luxury-glow animate-icon-bounce" />
        <span className="gradient-text-gold text-sm font-medium tracking-wide">
          Inspired Luxury Walls
        </span>
        <Star className="w-4 h-4 text-gold-400 icon-luxury-glow" />
      </div>
      <div className="w-px h-4 bg-gradient-to-b from-transparent via-gold-400 to-transparent opacity-50" />
      <div className="flex items-center space-x-2">
        <Crown className="w-4 h-4 text-gold-400 icon-luxury-glow" />
        <span className="gradient-text-platinum text-sm font-medium tracking-wide">
          Premium Design
        </span>
      </div>
    </div>
  );
};

export default TaglineStrip;
