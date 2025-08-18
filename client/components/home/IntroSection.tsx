import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { Layers, MonitorSmartphone, ArrowRight, Clock, Award, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const STATS: StatItem[] = [
  {
    value: "2-4",
    label: "Hours Installation",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    value: "100+",
    label: "Coating Options",
    icon: <Award className="w-5 h-5" />,
  },
  {
    value: "A1",
    label: "Fire Resistance",
    icon: <Shield className="w-5 h-5" />,
  },
];

const IntroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
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

  // Enhanced mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: x - 0.5, y: y - 0.5 });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      return () => sectionElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="intro"
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-bl from-[#edd2f3] via-[#fffcdc] to-[#84dfff] text-neutral-900 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle geometric patterns */}
        <div 
          className="absolute top-1/4 right-1/4 w-64 h-64 border border-[#f9d382]/10 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-[#e6b260]/10 rounded-lg rotate-45"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(45deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        
        {/* Floating gradient orbs */}
        <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-gradient-to-br from-[#f9d382]/5 to-[#e6b260]/5 rounded-full blur-xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/6 w-24 h-24 bg-gradient-to-br from-[#b89773]/5 to-[#a8a29e]/5 rounded-full blur-xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 py-2 bg-[#f9d382]/10 border border-[#f9d382]/20 rounded-full text-[#b89773] text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Intelligent Design. Effortless Living.
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
            <span className="block text-gray-800 mb-2">
              Smart walls that come
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5c47] to-[#b68c5a] mb-2">
              pre‑assembled with
            </span>
            <span className="block text-gray-800">
              integrated tech
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-neutral-700 max-w-5xl mx-auto leading-relaxed font-light mb-8">
            At <span className="text-[#b89773] font-semibold">The Wall Shop</span>, we supply pre-manufactured smart walls with over 100 luxurious coatings of your choice, installed in just 2 to 4 hours. Each wall comes pre-assembled with integrated technology for TV, sound, gaming, security, fire control, and dynamic lighting.
          </p>

          <p className="text-lg sm:text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed font-light">
            A central control panel enables effortless smart home control — including curtain automation, climate regulation, door lock recognition, and external camera management — all accessible from a single screen and remote.
          </p>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '0.2s' }}>
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="group text-center p-6 bg-white/80 backdrop-blur-sm border border-neutral-200/50 rounded-2xl hover:bg-white hover:border-[#f9d382]/30 hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#f9d382] to-[#e6b260] rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Smart Wall Systems Card */}
          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.4s' }}>
            <div className="relative p-8 lg:p-10 bg-white/90 backdrop-blur-sm border border-neutral-200/50 rounded-3xl hover:bg-white hover:border-[#f9d382]/30 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-3 h-full flex flex-col">
              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f9d382]/5 to-[#e6b260]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

              {/* Enhanced header */}
              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f9d382] to-[#e6b260] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MonitorSmartphone className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-black transition-colors duration-300">
                    Smart Wall Systems
                  </h3>
                  <p className="text-sm text-[#b89773] font-medium">Plug & Play Technology</p>
                </div>
              </div>

              {/* Enhanced content */}
              <div className="relative flex-grow">
                <p className="text-lg text-neutral-700 group-hover:text-neutral-900 leading-relaxed mb-6 transition-colors duration-300">
                  Our plug-and-play smart wall modules are built in our facility and delivered fully wired. 
                  From TVs, sound systems, and LED lighting to gaming, security, and broadband boosters — 
                  everything is integrated and controlled via remote.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#f9d382] rounded-full mr-3"></div>
                    <span className="text-sm">Choose from 100+ luxurious panel finishes</span>
                  </div>
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#e6b260] rounded-full mr-3"></div>
                    <span className="text-sm">Optional lighting accents and smart controls</span>
                  </div>
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#b89773] rounded-full mr-3"></div>
                    <span className="text-sm">No mess, no noise - installed in under 4 hours</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="relative">
                <Button asChild className="group/btn w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#f9d382] to-[#e6b260] hover:from-[#f3c669] hover:to-[#e1aa49] text-black rounded-2xl shadow-xl hover:shadow-[#f9d382]/25 transition-all duration-300 transform hover:scale-105">
                  <Link to="/smart-walls">
                    <span className="flex items-center justify-center space-x-3">
                      <span>Explore Smart Walls</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#f9d382]/10 to-[#e6b260]/10 blur-xl" />
              </div>
            </div>
          </div>

          {/* Carbon Rock Boards Card */}
          <div className={`group relative transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`} style={{ transitionDelay: '0.6s' }}>
            <div className="relative p-8 lg:p-10 bg-white/90 backdrop-blur-sm border border-neutral-200/50 rounded-3xl hover:bg-white hover:border-[#a8a29e]/30 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-3 h-full flex flex-col">
              {/* Enhanced background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c7bfb4]/5 to-[#a8a29e]/5 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

              {/* Enhanced header */}
              <div className="relative flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c7bfb4] to-[#a8a29e] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 group-hover:text-black transition-colors duration-300">
                    Carbon Rock Boards
                  </h3>
                  <p className="text-sm text-[#a8a29e] font-medium">A1 Fire Resistant</p>
                </div>
              </div>

              {/* Enhanced content */}
              <div className="relative flex-grow">
                <p className="text-lg text-neutral-700 group-hover:text-neutral-900 leading-relaxed mb-6 transition-colors duration-300">
                  Our Carbon Rock Boards combine A1 fire-resistance with exceptional thermal and acoustic 
                  insulation. These ultra-durable panels are ideal for homes, offices, and commercial spaces.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#c7bfb4] rounded-full mr-3"></div>
                    <span className="text-sm">Impact, scratch, and moisture resistant</span>
                  </div>
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#a8a29e] rounded-full mr-3"></div>
                    <span className="text-sm">Available in wood, stone, WPC and fluted textures</span>
                  </div>
                  <div className="flex items-center text-neutral-600 group-hover:text-neutral-800 transition-colors duration-300">
                    <div className="w-2 h-2 bg-[#8a8680] rounded-full mr-3"></div>
                    <span className="text-sm">Clean modern finish with superior insulation</span>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA */}
              <div className="relative">
                <Link to="/carbon-rock-boards" className="w-full">
                  <Button className="group/btn w-full px-8 py-4 text-lg font-semibold bg-white border-2 border-[#c7bfb4] text-neutral-800 rounded-2xl shadow-md hover:bg-[#c7bfb4] hover:text-white hover:border-[#a8a29e] transition-all duration-300 transform hover:scale-105">
                    <span className="flex items-center justify-center space-x-3">
                      <span>Explore Rock Boards</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c7bfb4]/10 to-[#a8a29e]/10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        /* Improved responsive design */
        @media (max-width: 640px) {
          .animate-float-slow {
            animation-duration: 8s;
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow {
            animation: none;
          }
          
          .group:hover .group-hover\\:scale-110,
          .group:hover .group-hover\\:scale-105 {
            transform: none;
          }
          
          .hover\\:scale-\\[1\\.02\\]:hover,
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:-translate-y-3:hover,
          .hover\\:-translate-y-1:hover {
            transform: none;
          }
        }
        
        /* Enhanced focus states for accessibility */
        .group:focus-within {
          outline: 2px solid #f9d382;
          outline-offset: 2px;
        }
        
        /* Smooth scrolling for better UX */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default IntroSection;