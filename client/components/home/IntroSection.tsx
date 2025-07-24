import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { Layers, MonitorSmartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const IntroSection = () => {
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

  return (
    <section 
      ref={sectionRef}
      id="intro"
      className="relative py-24 bg-white text-neutral-900 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-gray-800">
              Intelligent Design.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5c47] to-[#b68c5a] mt-2 mb-2">
              Effortless Living.
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-neutral-700 max-w-4xl mx-auto leading-relaxed font-light">
            At <span className="text-[#b89773] font-semibold">The Wall Shop</span>, we specialize in crafting pre-engineered smart wall systems and ultra-durable carbon rock boards for modern living. Our smart walls are manufactured to exact specifications—preloaded with all electronics for plug-and-play setup in under 4 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.2s' }}>
            <div className="relative p-8 bg-white border border-neutral-200 rounded-3xl hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f9d382]/10 to-[#e6b260]/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f9d382] to-[#e6b260] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MonitorSmartphone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-black transition-colors duration-300">
                  Smart Wall Systems
                </h3>
              </div>

              <div className="relative flex-grow">
                <p className="text-lg text-neutral-700 group-hover:text-neutral-900 leading-relaxed mb-8 transition-colors duration-300">
                  Our plug-and-play smart wall modules are built in our facility and delivered fully wired. 
                  From TVs, sound systems, and LED lighting to gaming, security, and broadband boosters — 
                  everything is integrated and controlled via remote. Choose from 100+ luxurious panel finishes 
                  like marble, copper, gloss or stainless, with optional lighting accents. No mess. No noise. 
                  Fully installed in under 4 hours.
                </p>
              </div>

              <div className="relative">
               
                <Button asChild className="group/btn w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#f9d382] to-[#e6b260] hover:from-[#f3c669] hover:to-[#e1aa49] text-black rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
                  <Link to="/smart-walls">
                    <span className="flex items-center justify-center space-x-3">
                      <span>Explore Smart Walls</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                </Button>

              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f9d382]/20 to-[#e6b260]/20 blur-xl" />
              </div>
            </div>
          </div>

          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.4s' }}>
            <div className="relative p-8 bg-white border border-neutral-200 rounded-3xl hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 h-full flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7bfb4]/10 to-[#a8a29e]/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c7bfb4] to-[#a8a29e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-black transition-colors duration-300">
                  Carbon Rock Boards
                </h3>
              </div>

              <div className="relative flex-grow">
                <p className="text-lg text-neutral-700 group-hover:text-neutral-900 leading-relaxed mb-8 transition-colors duration-300">
                  Our Carbon Rock Boards combine A1 fire-resistance with exceptional thermal and acoustic 
                  insulation. These ultra-durable panels are ideal for homes, offices, and commercial spaces— 
                  offering a clean modern finish that's impact, scratch, and moisture resistant. Available in wood, 
                  stone, WPC and fluted textures.
                </p>
              </div>

              <div className="relative">
                <Link to="/carbon-rock-boards" className="w-full">
                  <Button className="group/btn w-full px-8 py-4 text-lg font-semibold bg-white border border-neutral-300 text-neutral-800 rounded-2xl shadow-md hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center space-x-3">
                      <span>Explore Rock Boards</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c7bfb4]/20 to-[#a8a29e]/20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;