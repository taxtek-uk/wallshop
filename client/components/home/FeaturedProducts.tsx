import React, { useEffect, useRef, useState } from "react";
import { 
  Cpu, 
  MonitorSmartphone, 
  Palette, 
  Clock, 
  Wifi, 
  Shield, 
  Zap, 
  Home,
  Camera,
  Thermometer,
  Lock,
  Volume2,
  Tv,
  Lightbulb,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConsultationModal  from "@/components/ConsultationModal";

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  image?: string;
  delay: number;
}

interface SubFeature {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const MAIN_FEATURES: Feature[] = [
  {
    id: "smart-tech",
    title: "Smart Technology Integration",
    subtitle: "AI-Powered Home Automation",
    description: "Seamlessly integrated IoT systems with advanced AI control for the ultimate smart home experience. Control everything from lighting to security with intelligent automation.",
    icon: <Cpu className="w-8 h-8" />,
    gradient: "from-blue-400 via-purple-500 to-indigo-600",
    features: [
      "AI-powered automation and learning",
      "Voice control integration (Alexa, Google)",
      "Smart sensors for occupancy and lighting",
      "Automated climate and energy management",
      "Integration with existing smart devices"
    ],
    delay: 0,
  },
  {
    id: "central-control",
    title: "Central Control Unit",
    subtitle: "Unified Smart Home Command",
    description: "A sophisticated central hub that manages all your smart home features from a single, intuitive interface. Control curtains, climate, security, and more.",
    icon: <MonitorSmartphone className="w-8 h-8" />,
    gradient: "from-[#f9d382] via-[#e6b260] to-[#b89773]",
    features: [
      "Unified control panel with touch interface",
      "Remote access via smartphone app",
      "Customizable automation schedules",
      "Real-time monitoring and alerts",
      "Multi-zone control capabilities"
    ],
    delay: 0.2,
  },
  {
    id: "luxury-coatings",
    title: "Luxury Coatings",
    subtitle: "100+ Premium Finishes",
    description: "Choose from an extensive collection of luxurious finishes including marble, copper, gloss, wood grain, and custom textures to match your aesthetic vision.",
    icon: <Palette className="w-8 h-8" />,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    features: [
      "Premium marble and stone textures",
      "Metallic finishes (copper, gold, silver)",
      "High-gloss and matte options",
      "Wood grain and natural textures",
      "Custom color matching available"
    ],
    delay: 0.4,
  },
  {
    id: "quick-install",
    title: "Quick Installation",
    subtitle: "2-4 Hours Professional Setup",
    description: "Pre-manufactured and pre-wired smart walls delivered ready for installation. Our certified technicians complete the entire setup in just 2-4 hours.",
    icon: <Clock className="w-8 h-8" />,
    gradient: "from-green-400 via-teal-500 to-blue-500",
    features: [
      "Pre-manufactured and pre-wired modules",
      "Certified professional installation team",
      "Minimal disruption to your space",
      "Complete testing and configuration",
      "Comprehensive warranty coverage"
    ],
    delay: 0.6,
  },
];

const SMART_FEATURES: SubFeature[] = [
  { icon: <Tv className="w-5 h-5" />, label: "TV Integration", description: "Built-in TV mounting and cable management" },
  { icon: <Volume2 className="w-5 h-5" />, label: "Audio Systems", description: "Integrated speakers and soundbar support" },
  { icon: <Lightbulb className="w-5 h-5" />, label: "LED Lighting", description: "Dynamic RGB lighting with mood settings" },
  { icon: <Camera className="w-5 h-5" />, label: "Security Cameras", description: "Integrated security and monitoring systems" },
  { icon: <Thermometer className="w-5 h-5" />, label: "Climate Control", description: "Smart temperature and humidity management" },
  { icon: <Lock className="w-5 h-5" />, label: "Access Control", description: "Smart locks and entry management" },
  { icon: <Wifi className="w-5 h-5" />, label: "Network Boost", description: "Built-in WiFi amplification and coverage" },
  { icon: <Shield className="w-5 h-5" />, label: "Fire Safety", description: "Integrated fire detection and suppression" },
];

const SmartWallFeatures: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
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

  // Enhanced mouse tracking
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

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="smart-wall-features"
      className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] text-white overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#f9d382]/10 to-[#e6b260]/10 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.5s ease-out',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
            transition: 'transform 0.5s ease-out',
            animationDelay: '2s',
          }}
        />
        
        {/* Geometric patterns */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#f9d382]/20 rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Enhanced Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-6 py-3 bg-[#f9d382]/10 border border-[#f9d382]/20 rounded-full text-[#f9d382] text-sm font-medium mb-6 backdrop-blur-sm">
            <Home className="w-4 h-4 mr-2" />
            Smart Wall Features
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2">
              Revolutionary
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f9d382] to-[#e6b260] mb-2">
              Smart Wall
            </span>
            <span className="block text-white">
              Technology
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the future of home automation with our comprehensive smart wall solutions. 
            Each feature is designed to enhance your lifestyle while maintaining the highest standards of luxury and functionality.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {MAIN_FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${0.2 + feature.delay}s` }}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="relative p-8 lg:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-3 h-full">
                {/* Enhanced gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                {/* Feature header */}
                <div className="relative flex items-start gap-6 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#f9d382] font-medium mb-3">
                      {feature.subtitle}
                    </p>
                    <p className="text-white/80 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature list */}
                <div className="relative space-y-3 mb-6">
                  {feature.features.map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center text-white/70 group-hover:text-white/90 transition-all duration-300"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#f9d382] mr-3 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-20`} />
                </div>

                {/* Active indicator */}
                {activeFeature === feature.id && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-[#f9d382]/50 pointer-events-none animate-pulse-border" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Smart Features Showcase */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '0.8s' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Integrated Smart Features
            </h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Every smart wall comes equipped with these advanced features, seamlessly integrated for optimal performance and user experience.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {SMART_FEATURES.map((feature, index) => (
              <div
                key={index}
                className="group p-4 lg:p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#f9d382] to-[#e6b260] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-white transition-colors duration-300">
                  {feature.label}
                </h4>
                <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1s' }}>
          <div className="max-w-3xl mx-auto p-8 lg:p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Discover how our smart wall technology can revolutionize your home or office. 
              Schedule a free consultation with our experts today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsConsultationModalOpen(true)}
                className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#f9d382] to-[#e6b260] hover:from-[#f3c669] hover:to-[#e1aa49] text-black rounded-2xl shadow-xl hover:shadow-[#f9d382]/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-3">
                  <span>Schedule Consultation</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-medium bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ConsultationModal 
        isOpen={isConsultationModalOpen} 
        onClose={() => setIsConsultationModalOpen(false)}
        title="Schedule Consultation"
        subtitle="Let's discuss your smart wall project"
      />
      
      {/* Enhanced CSS Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes pulse-border {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse-slow,
          .animate-twinkle,
          .animate-pulse-border {
            animation: none;
          }
          
          .group:hover .group-hover\\:scale-110,
          .group:hover .group-hover\\:scale-105,
          .hover\\:scale-\\[1\\.02\\]:hover,
          .hover\\:scale-105:hover {
            transform: none;
          }
          
          .hover\\:-translate-y-3:hover,
          .hover\\:-translate-y-1:hover {
            transform: none;
          }
        }
        
        /* Enhanced focus states */
        .group:focus-within {
          outline: 2px solid #f9d382;
          outline-offset: 2px;
        }
        
        /* Improved responsive design */
        @media (max-width: 640px) {
          .animate-pulse-slow {
            animation-duration: 6s;
          }
        }
      `}</style>
    </section>
  );
};

export default SmartWallFeatures;