import React, { useCallback, useMemo } from "react";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaglineStrip from "./TaglineStrip";

interface Feature {
  label: string;
  bgClass: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    label: "Luxury Wallpapers",
    bgClass: "bg-gold-100",
    icon: <div className="w-8 h-8 bg-gold-400 rounded" aria-hidden />,
  },
  {
    label: "Acoustic Panels",
    bgClass: "bg-leather-100",
    icon: <div className="w-8 h-8 bg-leather-500 rounded" aria-hidden />,
  },
  {
    label: "Carbon Rock",
    bgClass: "bg-mocha-100",
    icon: <div className="w-8 h-8 bg-mocha-400 rounded" aria-hidden />,
  },
  {
    label: "Smart Technology",
    bgClass: "bg-gold-100",
    icon: <Play className="w-8 h-8 text-gold-600" aria-hidden />,
  },
];

const HeroSection: React.FC = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const randomVideo = useMemo(() => {
    const videos = [
      "/videos/smart-wall-1.mp4",
      "/videos/smart-wall-2.mp4",
      "/videos/smart-wall-3.mp4",
    ];
    return videos[Math.floor(Math.random() * videos.length)];
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#282828] to-[#1b1b1b] text-white"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          key={randomVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={randomVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
        <div className="mb-6">
          <TaglineStrip />
        </div>

        <div className="space-y-6 animate-fade-in">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
            <span className="gradient-text-luxury">Pre-Manufactured</span>
            <span className="block gradient-text-gold">Smart Walls</span>
            <span className="block gradient-text-platinum">Install in 2–4 Hours</span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-2xl text-white/80">
            Control TV, lighting, HORIZONTAL FIRE, soundbars, speakers, security & broadband -
            all from a single remote. Available in 100+ coverings (copper, marble, gloss).
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-slide-up">
          <Button
            onClick={() => scrollToSection("#smart-walls")}
            variant="luxury"
            size="lg"
            className="px-8 py-4 text-lg font-medium text-white flex items-center space-x-2"
          >
            <span>Explore Smart Walls</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            onClick={() => scrollToSection("#contact")}
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-black text-white hover:bg-neutral-800 transition-all duration-300 shadow-md"
          >
            Book Free Consultation
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 animate-slide-up">
          {FEATURES.map(({ label, bgClass, icon }, i) => (
            <div
              key={i}
              className="text-center group"
              role="region"
              aria-label={label}
            >
              <div
                className={`${bgClass} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-105`}
              >
                {icon}
              </div>
              <h3 className="font-semibold text-sm">{label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={() => scrollToSection("#smart-walls")}
        aria-label="Scroll to Smart Walls"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSection;