import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { ArrowRight, Play, ChevronDown, Pause, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaglineStrip from "./TaglineStrip";

interface Feature {
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}
const FEATURES: Feature[] = [
  {
    label: "Luxury Wallpapers",
    description: "Premium materials & finishes",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-amber-400 via-yellow-500 to-amber-600",
  },
  {
    label: "Acoustic Panels",
    description: "Superior sound control",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-orange-400 via-red-500 to-pink-600",
  },
  {
    label: "Carbon Rock",
    description: "Durable & sustainable",
    icon: <Shield className="w-6 h-6" />,
    gradient: "from-gray-400 via-gray-600 to-gray-800",
  },
  {
    label: "Smart Technology",
    description: "Integrated IoT systems",
    icon: <Cpu className="w-6 h-6" />,
    gradient: "from-blue-400 via-purple-500 to-indigo-600",
  },
];

const HeroSection: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#282828] to-[#1b1b1b] text-white"
    >
      
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoLoaded && (
          <img
            src="/images/smart-wall-technology.webp"
            alt="Fallback"
            className="w-full h-full object-cover absolute inset-0"
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
        >
          <source src={randomVideo} type="video/mp4" />
        </video>

       {/* Enhanced Multi-layered Gradient Overlay */}
     {/* Multi-layered Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/90 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-0" />


      </div>
         {/* Floating Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full animate-spin-slow"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-24 h-24 border border-amber-400/20 rounded-lg rotate-45 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) rotate(45deg)`,
          }}
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
        <div className="mb-6 animate-fade-in">
          <TaglineStrip />
        </div>
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            <span className="block gradient-text-luxury">Pre-Manufactured</span>
            <span className="block gradient-text-gold">Smart Walls</span>
            <span className="block gradient-text-platinum">
              Install in 2–4 Hours
            </span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-2xl text-white/90 font-light leading-relaxed">
            Control TV, lighting,{" "}
            <span className="text-gold-400 font-semibold">HORIZONTAL FIRE</span>
            , soundbars, speakers, security & broadband — all from a single
            remote. Available in 100+ coverings (copper, marble, gloss).
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 animate-slide-up-delayed">
          <Button
            onClick={() => scrollToSection("#smart-walls")}
            variant="luxury"
            size="lg"
            className="px-8 py-4 text-lg font-semibold text-white flex items-center space-x-2 rounded-2xl hover:scale-105 transition-transform duration-300"
          >
            <span>Explore Smart Walls</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => scrollToSection("#contact")}
            size="lg"
            className="px-8 py-4 text-lg font-medium bg-white/10 border border-white/20 text-white backdrop-blur-lg hover:bg-white/20 rounded-2xl transition-all duration-300"
          >
            Book Free Consultation
          </Button>
        </div>

        {/* Features */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 animate-slide-up-delayed-2">
          {FEATURES.map(({ label, description, icon, gradient }, i) => (
            <div
              key={i}
              className="group relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              style={{
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
              
              {/* Icon Container */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {label}
                </h3>
                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {description}
                </p>
              </div>

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} blur-xl opacity-20`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Video Control */}
      <button
        onClick={toggleVideoPlayback}
        className="absolute bottom-24 right-8 z-30 group p-4 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-black/50 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
        aria-label={isPaused ? "Play Video" : "Pause Video"}
      >
        {isPaused ? (
          <Play className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <Pause className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>


      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection("#smart-walls")}
        aria-label="Scroll Down"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce text-white z-20"
      >
        <ChevronDown className="h-6 w-6" />
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        .animate-slide-up-delayed-2 {
          animation: slide-up 0.8s ease-out 0.6s both;
        }
        .animate-ping-once {
          animation: ping 1s ease-out;
        }
        .animate-pulse-once {
          animation: pulse 2s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
