import React, { useState, useEffect, useRef } from "react";
import { MoveHorizontal, Box, PlugZap, Clock } from "lucide-react";

const modules = [
  { width: "400mm", depth: "120mm", info: "Compact size, perfect for small spaces" },
  { width: "600mm", depth: "150mm", info: "Standard option, versatile" },
  { width: "800mm", depth: "120mm", info: "Ideal balance of width and depth" },
  { width: "1000mm", depth: "180mm", info: "Deep profile for integrated tech" },
  { width: "1100mm", depth: "150mm", info: "Premium size for luxury setups" },
  { width: "1200mm", depth: "180mm", info: "Largest module for max tech" },
];

const ModularSmartWallsSection = () => {
  const [selected, setSelected] = useState(modules[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const widthToPx = (width) => {
    switch (width) {
      case "400mm": return 120;
      case "600mm": return 180;
      case "800mm": return 240;
      case "1000mm": return 300;
      case "1100mm": return 330;
      case "1200mm": return 360;
      default: return 180;
    }
  };

  const depthToPx = (depth) => {
    switch (depth) {
      case "120mm": return 80;
      case "150mm": return 100;
      case "180mm": return 120;
      default: return 100;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: "url('/images/smart-home.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 z-0" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 max-w-xl">
              <span className="block text-white mb-2 animate-fade-in-up">The Future of Walls:</span>
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up delay-150">
                Modular Smart Wall Systems
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-xl mb-8 leading-relaxed animate-fade-in-up delay-300">
              Engineered for fast installation and timeless luxury, our smart walls combine a steel frame with premium marble & stone-effect boards. Integrated technology supports TVs, shelves, dimmable lighting, speakers, fireplaces — all controlled via <strong className="text-amber-400">Smart home devices</strong>.
            </p>

            <ul className="space-y-6 max-w-md">
              <li className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MoveHorizontal className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">
                  Width options: 400mm, 600mm, 800mm, 1000mm, 1100mm, 1200mm
                </span>
              </li>
              <li className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">
                  Depths: 120mm, 150mm, 180mm — perfect for lights, speakers & shelves
                </span>
              </li>
              <li className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <PlugZap className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">
                  Seamless integration with our smart home systems
                </span>
              </li>
              <li className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium">
                  Professional installation in under 4 hours
                </span>
              </li>
            </ul>
          </div>

          <div className={`relative flex flex-col items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '0.2s' }}>
            <div className="w-full max-w-md bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 text-white">
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Selected Module
              </h3>
              <div className="relative h-40 mx-auto rounded-lg overflow-hidden bg-black/20 backdrop-blur-md border border-white/10">
                <div
                  className="absolute bottom-0 left-1/2 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-t-lg shadow-2xl transition-all duration-500 hover:shadow-amber-500/50"
                  style={{
                    width: widthToPx(selected.width),
                    height: depthToPx(selected.depth),
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
              <div className="text-center text-white/80 font-semibold mt-4">
                Width: <span className="text-amber-400">{selected.width}</span> | Depth: <span className="text-amber-400">{selected.depth}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md w-full">
              {modules.map((mod, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(mod)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 ${
                    selected === mod
                      ? "border-amber-400/50 bg-amber-500/10 backdrop-blur-md shadow-lg shadow-amber-500/25 scale-105"
                      : "border-white/20 bg-black/10 backdrop-blur-md hover:border-white/30 hover:bg-black/20 hover:scale-105"
                  } flex flex-col items-center cursor-pointer`}
                  aria-pressed={selected === mod}
                >
                  <div className={`font-bold mb-2 transition-colors duration-300 ${
                    selected === mod ? "text-amber-400" : "text-white"
                  }`}>
                    {mod.width}
                  </div>
                  <div className={`w-full h-12 rounded-md shadow-inner transition-all duration-300 ${
                    selected === mod 
                      ? "bg-gradient-to-br from-amber-400 to-yellow-600" 
                      : "bg-gradient-to-br from-gray-400 to-slate-600"
                  }`} />
                  <div className="mt-2 text-xs text-white/70">{`Depth: ${mod.depth}`}</div>

                  {hoveredIndex === i && (
                    <div className="absolute -top-12 z-20 bg-black/80 backdrop-blur-md text-white rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap pointer-events-none shadow-xl border border-white/20">
                      {mod.info}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm italic text-white/70 text-center max-w-sm">
              Click a module to see its size visualized above.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default ModularSmartWallsSection;
