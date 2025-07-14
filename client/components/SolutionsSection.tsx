import React, { useCallback } from "react";
import {
  Smartphone,
  LayoutGrid,
  ToggleRight,
  Sliders,
  Shield,
  Sun,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SOLUTIONS = [
  {
    title: "Home App",
    description:
      "All-in-one app to connect lighting, security & more. User-friendly controls, supports 15 languages and many users.",
    icon: Smartphone,
  },
  {
    title: "MixPad Super Smart Panel",
    description:
      "Four-way high-power light control, IR appliance management, touchscreen & app interaction, 400W load.",
    icon: LayoutGrid,
  },
  {
    title: "Smart Switch & Dimmer",
    description:
      "Scene & timer control, voice (Alexa/Google/Siri), remote & app control, vacation mode & group control.",
    icon: ToggleRight,
  },
  {
    title: "Smart Curtain",
    description:
      "One-touch, voice & app control; ultra-quiet motor; precise open/close; no rewiring, instant install.",
    icon: Sliders,
  },
  {
    title: "Smart Security",
    description:
      "AI 3D face recognition, 4″ IPS HD screen, visual door viewer, full-house linkage & 3-year warranty.",
    icon: Shield,
  },
  {
    title: "Sky Dome Smart Light",
    description:
      "Four lighting modes, blue-light-free technology, patented quick-install, natural sky-light reproduction.",
    icon: Sun,
  },
];

export default function SolutionsSection() {
  const scrollToSolutions = useCallback(() => {
    const el = document.querySelector("#solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      id="solutions"
      className="py-12 lg:py-16 bg-gradient-to-br from-white via-luxgray-50 to-luxgray-100 text-foreground"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-sm">
            <span className="gradient-text-platinum">Smart Home</span>
            <span className="block gradient-text-luxury">Solutions</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            From intuitive app control to AI-powered security, explore our full suite
            of smart home solutions designed for effortless living.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SOLUTIONS.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 group hover:border-accent/60 animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: "both" }}
            >
              <div className="w-16 h-16 mb-6 mx-auto flex items-center justify-center bg-accent/10 rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-1">
                <Icon className="text-accent w-8 h-8 group-hover:animate-bounce-slow" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered CTA Button */}
        <div className="flex justify-center mt-16">
          <Button
            onClick={scrollToSolutions}
            variant="luxury"
            size="lg"
            className="px-8 py-4 text-white inline-flex items-center space-x-2 group"
          >
            <span>Explore All Solutions</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out both;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
