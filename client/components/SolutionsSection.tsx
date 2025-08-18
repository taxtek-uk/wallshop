import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  Smartphone,
  LayoutGrid,
  ToggleRight,
  Sliders,
  Shield,
  Sun,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ConsultationModal from "./ConsultationModal";

const SOLUTIONS = [
  {
    title: "Home App",
    description:
      "All-in-one app to connect lighting, security & more. User-friendly controls, supports 15 languages and many users.",
    icon: Smartphone,
    gradient: "from-yellow-400 to-yellow-500",
  },
  {
    title: "MixPad Super Smart Panel",
    description:
      "Four-way high-power light control, IR appliance management, touchscreen & app interaction, 400W load.",
    icon: LayoutGrid,
    gradient: "from-[#b69777] to-[#907252]",
  },
  {
    title: "Smart Switch & Dimmer",
    description:
      "Scene & timer control, voice (Alexa/Google/Siri), remote & app control, vacation mode & group control.",
    icon: ToggleRight,
    gradient: "from-[#b89773] to-[#6b5c47]",
  },
  {
    title: "Smart Curtain",
    description:
      "One-touch, voice & app control; ultra-quiet motor; precise open/close; no rewiring, instant install.",
    icon: Sliders,
    gradient: "from-[#d1a574] to-[#b68c5a]",
  },
  {
    title: "Smart Security",
    description:
      "AI 3D face recognition, 4″ IPS HD screen, visual door viewer, full-house linkage & 3-year warranty.",
    icon: Shield,
    gradient: "from-[#907252] to-[#4d392a]",
  },
  {
    title: "Sky Dome Smart Light",
    description:
      "Four lighting modes, blue-light-free technology, patented quick-install, natural sky-light reproduction.",
    icon: Sun,
    gradient: "from-[#f9d382] to-[#e6b260]",
  },
];

const SolutionsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
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

  const scrollToSolutions = useCallback(() => {
    const el = document.querySelector("#solutions");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="relative py-24 text-white overflow-hidden bg-white"
    >
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className={`text-center max-w-4xl mx-auto mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
         <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-center">
  <span className="block text-gray-800">
    Seamless Smart Living.
  </span>
  <span className="block text-[#6b5c47] mt-2">
    Tailored Solutions for Modern Homes
  </span>
</h2>
          <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light">
            From intuitive app control to AI-powered security, explore our full suite
            of smart home solutions designed for effortless living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {SOLUTIONS.map(({ title, description, icon: Icon, gradient }, idx) => (
            <div
              key={idx}
              className={`group relative border border-neutral-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${0.2 + idx * 0.1}s`,
                animationFillMode: "both" 
              }}
            >
              <div className="w-16 h-16 mb-6 mx-auto flex items-center justify-center">
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md`}>
                  <Icon className="text-white w-8 h-8" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-neutral-800 mb-4 text-center group-hover:text-black transition-colors duration-300">
                {title}
              </h3>
              <p className="text-neutral-600 text-sm text-center leading-relaxed group-hover:text-neutral-800 transition-colors duration-300">
                {description}
              </p>

              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-10 blur-xl`} />
              </div>
            </div>
          ))}
        </div>
{/* 
        <div className={`flex justify-center mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '0.8s' }}>
          <Button
            onClick={scrollToSolutions}
            className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#b69777] to-[#e6b260] hover:from-[#b89773] hover:to-[#e6c191] text-black rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span>Explore All Solutions</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div> */}
      </div>

      {/* End images */}
       {/* Two-column image row */}
      {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 lg:px-8">
        <img
          src="/images/products/smart-device-1.webp"
          alt="Smart Living Showcase"
          width={1436}
          height={725}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
        <img
          src="/images/products/mixpadmini.jpg"
          alt="Smart Device Display"
          width={725}
          height={725}
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </div> */}

      <div className="mt-16 flex flex-col items-center">
        <img
          src="/images/devices-img.webp"
          alt="Smart Living Solutions"
          width={1275}
          height={199}
          className="rounded-xl shadow-lg mb-12"
        />
        
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '0.8s' }}>
          <Button
            onClick={() => setIsConsultationModalOpen(true)}
            className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#b69777] to-[#e6b260] hover:from-[#b89773] hover:to-[#e6c191] text-black rounded-2xl shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <Calendar className="w-5 h-5" />
              <span>Schedule Consultation</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
        
        {/* Consultation Modal */}
        <ConsultationModal 
          isOpen={isConsultationModalOpen} 
          onClose={() => setIsConsultationModalOpen(false)}
          title="Schedule Your Consultation"
          subtitle="Let's discuss your smart home solutions"
        />
      </div>

    </section>
  );
};

export default SolutionsSection;
