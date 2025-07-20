import React, { useEffect, useRef, useState } from "react";
import { MonitorSmartphone, Layers, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
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
      className="relative py-24 bg-white text-neutral-900 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-gray-800">
              Our Signature
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5c47] to-[#b68c5a] drop-shadow-lg mt-2">
              Solutions
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 max-w-3xl mx-auto leading-relaxed font-light">
            Whether you're upgrading your home, workspace or commercial venue, our most popular systems deliver beauty, functionality and speed.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.2s' }}>
            <div className="relative bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f9d382]/20 to-[#e6b260]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/smart-walls/smart-wall-pro.jpg"
                  alt="Smart Wall System"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/70 text-neutral-900 text-xs font-semibold rounded-full shadow-sm">
                  Smart Integration
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#f9d382] to-[#e6b260] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MonitorSmartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800">
                    Smart Wall
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6">
                  Pre-built, tech-loaded wall modules with integrated TV, sound, lighting, and control systems. Installed in 2–4 hours with no mess.
                </p>
                {/* <Button className="group/btn w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#f9d382] to-[#e6b260] hover:from-[#f3c669] hover:to-[#e1aa49] text-black rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-3">
                    <span>View Smart Walls</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button> */}
              </div>
            </div>
          </div>

          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.4s' }}>
            <div className="relative bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c7bfb4]/20 to-[#a8a29e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/images/carbon-rock-boards/bamboo.jpg"
                  alt="Carbon Rock Boards"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/70 text-neutral-900 text-xs font-semibold rounded-full shadow-sm">
                  High Performance Panels
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c7bfb4] to-[#a8a29e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-neutral-800">
                    Carbon Rock Boards
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6">
                  Class A1 fire-rated panels with acoustic & thermal insulation. Available in stone, wood, metal, cloth and textured finishes for any space.
                </p>
                {/* <Button className="group/btn w-full px-8 py-4 text-lg font-semibold bg-white border border-neutral-300 text-neutral-800 rounded-2xl shadow-md hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center justify-center space-x-3">
                    <span>View Rock Boards</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
