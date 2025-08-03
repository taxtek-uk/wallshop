import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { ArrowRight, Play, ChevronDown, Pause, Sparkles, Zap, Shield, Cpu, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaglineStrip from "./TaglineStrip";

interface Feature {
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const FEATURES: Feature[] = [
  {
    label: "Smart Technology",
    description: "Integrated IoT systems with AI control",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-blue-400 via-purple-500 to-indigo-600",
    delay: 0,
  },
  {
    label: "Carbon Rock Boards",
    description: "A1 fire-resistant & sustainable",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-gray-400 via-gray-600 to-gray-800",
    delay: 0.1,
  },
  {
    label: "Acoustic Excellence",
    description: "Superior sound control & isolation",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-orange-400 via-red-500 to-pink-600",
    delay: 0.2,
  },
  {
    label: "Luxury Finishes",
    description: "100+ premium coating options",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-[#f9d382] via-[#e6b260] to-[#b89773]",
    delay: 0.3,
  },
];

const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const randomVideo = useMemo(() => {
    const videos = ["/videos/smart-wall-1.mp4", "/videos/smart-wall-1.webm"];
    return videos[Math.floor(Math.random() * videos.length)];
  }, []);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isPaused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPaused(!isPaused);
  };

  // Enhanced mouse tracking with smooth interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: x - 0.5, y: y - 0.5 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Scroll-based parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#282828] to-[#1b1b1b] text-white"
    >
      {/* Enhanced Video Background with Parallax */}
      <div 
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0002})`,
        }}
      >
        {!videoLoaded && (
          <img
            src="/images/smart-wall-technology.webp"
            alt="Smart Wall Technology"
            className="w-full h-full object-cover absolute inset-0"
            loading="eager"
          />
        )}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover absolute inset-0"
          preload="metadata"
        >
          <source src={randomVideo} type="video/mp4" />
        </video>

        {/* Enhanced Multi-layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-black/90 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-0" />
      </div>

      {/* Enhanced Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated circles */}
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-spin-slow"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-24 h-24 border border-[#f9d382]/30 rounded-lg rotate-45 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px) rotate(45deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-16 h-16 border border-[#e6b260]/20 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#f9d382]/40 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        {/* Enhanced Tagline */}
        <div className={`mb-8 transition-all duration-1000 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <TaglineStrip />
        </div>

        {/* Enhanced Hero Text */}
        <div className={`space-y-6 mb-12 transition-all duration-1000 ${isInView ? 'animate-slide-up' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight tracking-tight">
            <span className="block gradient-text-luxury mb-2">Pre‑Manufactured</span>
            <span className="block gradient-text-gold mb-2">Smart Walls</span>
            <span className="block gradient-text-platinum text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
              with 100+ Luxurious Coatings
            </span>
          </h1>
          
          {/* Enhanced subtitle with better typography */}
          <div className="max-w-4xl">
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-light leading-relaxed mb-4">
              <span className="text-[#f9d382] font-semibold">Installed in just 2–4 hours.</span>
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/85 font-light leading-relaxed">
              Smart walls that come pre‑assembled with integrated tech for TV, security, sound, gaming, 
              <span className="text-[#f9d382] font-semibold"> fire control</span> and spectacular lighting. 
              A central control panel enables smart‑home features like automatic curtains, climate control, 
              door‑lock recognition and external camera access — all operated from a unified screen or remote.
            </p>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-1000 ${isInView ? 'animate-slide-up-delayed' : 'opacity-0 translate-y-8'}`}>
          <Button
            onClick={() => scrollToSection("#smart-walls")}
            variant="luxury"
            size="lg"
            className="group px-8 py-4 text-lg font-semibold text-black bg-gradient-to-r from-[#f9d382] to-[#e6b260] hover:from-[#f3c669] hover:to-[#e1aa49] flex items-center justify-center space-x-3 rounded-2xl shadow-xl hover:shadow-[#f9d382]/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span>Explore Smart Walls</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            size="lg"
            className="group px-8 py-4 text-lg font-medium bg-white/10 border border-white/30 text-white backdrop-blur-lg hover:bg-white/20 hover:border-white/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Book Free Consultation</span>
            </span>
          </Button>
        </div>

        {/* Enhanced Features Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${isInView ? 'animate-slide-up-delayed-2' : 'opacity-0 translate-y-8'}`}>
          {FEATURES.map(({ label, description, icon, gradient, delay }, i) => (
            <div
              key={i}
              className="group relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 will-change-transform"
              style={{
                animationDelay: `${0.6 + delay}s`,
              }}
            >
              {/* Enhanced Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 rounded-3xl transition-opacity duration-500`} />
              
              {/* Enhanced Icon Container */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <div className="text-white drop-shadow-sm">
                  {icon}
                </div>
              </div>
              
              {/* Enhanced Content */}
              <div className="relative">
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {label}
                </h3>
                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Enhanced Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} blur-xl opacity-25`} />
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Video Control */}
      <button
        onClick={toggleVideoPlayback}
        className="absolute bottom-24 right-4 sm:right-8 z-30 group p-4 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/50 hover:border-white/40 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#f9d382]/50"
        aria-label={isPaused ? "Play Video" : "Pause Video"}
      >
        {isPaused ? (
          <Play className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <Pause className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>

      {/* Enhanced Scroll Indicator */}
      <button
        onClick={() => scrollToSection("#intro")}
        aria-label="Scroll Down"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white z-20 group focus:outline-none focus:ring-2 focus:ring-[#f9d382]/50 rounded-full p-2"
      >
        <ChevronDown className="h-8 w-8 animate-bounce group-hover:animate-pulse transition-all duration-300" />
      </button>

      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s both;
        }
        .animate-slide-up-delayed {
          animation: slide-up 1s ease-out 0.4s both;
        }
        .animate-slide-up-delayed-2 {
          animation: slide-up 1s ease-out 0.6s both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .gradient-text-luxury {
          background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-gold {
          background: linear-gradient(135deg, #f9d382 0%, #e6b260 50%, #b89773 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text-platinum {
          background: linear-gradient(135deg, #f5f5f5 0%, #d0d0d0 50%, #a8a8a8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .will-change-transform {
          will-change: transform;
        }
        
        /* Responsive improvements */
        @media (max-width: 640px) {
          .animate-float {
            display: none;
          }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce,
          .animate-pulse,
          .animate-spin-slow,
          .animate-float {
            animation: none;
          }
          
          .group:hover .group-hover\\:scale-110 {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;