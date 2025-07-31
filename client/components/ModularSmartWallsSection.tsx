import React, { useState, useEffect, useRef } from "react";
import { MoveHorizontal, Box, PlugZap, Clock, Camera, Settings, ToggleRight, ToggleLeft, Lightbulb, Blinds, ExternalLink, Play, Pause, Maximize2, X, EyeOff } from "lucide-react";

const smartDevices = [
  { 
    name: "Smart Security Camera", 
    type: "camera", 
    description: "2K Ultra HD smart security camera with night vision",
    videoPath: "/videos/camera.mp4",
    imagePath: "/images/products/camera.png",
    productLink: "#",
    icon: Camera
  },
  { 
    name: "Smart Control Panel", 
    type: "control", 
    description: "Light control, built-in infrared remote control, easy to deal with all infrared home appliances control at home",
    videoPath: "/videos/control.mp4",
    imagePath: "/images/products/climate.png",
    productLink: "#",
    icon: Settings
  },
  { 
    name: "Smart Switches", 
    type: "switches", 
    description: "Adopting modular row design, buttons, middle frame and bottom box are all detachable, making it easier to install and replace",
    videoPath: "/videos/switches.mp4",
    imagePath: "/images/products/switches.png",
    productLink: "#",
    icon: ToggleRight
  },
  { 
    name: "Dimmer Switch", 
    type: "dimmer", 
    description: "Creative Way To Play With Switch, 1% High-Precision Dimming Without the Smartphone",
    videoPath: "/videos/dimmer.mp4",
    imagePath: "/images/products/dimmer.png",
    productLink: "#",
    icon: ToggleLeft
  },
  { 
    name: "Dimmable Lighting", 
    type: "lighting", 
    description: "Smart LED lighting with color temperature control",
    videoPath: "/videos/light.mp4",
    imagePath: "/images/products/light.png",
    productLink: "#",
    icon: Lightbulb
  },
  { 
    name: "Smart Curtains", 
    type: "curtains", 
    description: "Automated curtain system for privacy and ambiance",
    videoPath: "/videos/curtain.mp4",
    imagePath: "/images/products/curtain.png",
    productLink: "#",
    icon: Blinds
  },
];

const ModularSmartWallsSection = () => {
  const [selectedDevice, setSelectedDevice] = useState(smartDevices[0]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [backgroundVideo, setBackgroundVideo] = useState("/videos/camera.mp4");
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isLightboxPlaying, setIsLightboxPlaying] = useState(false);
  const [isBgVideoPlaying, setIsBgVideoPlaying] = useState(true);
  const [isContentHidden, setIsContentHidden] = useState(false);
  const sectionRef = useRef(null);
  const bgVideoRef = useRef(null);
  const lightboxVideoRef = useRef(null);

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

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setBackgroundVideo(device.videoPath);
  };

  // Lightbox controls
  const openLightbox = () => {
    setIsLightboxOpen(true);
    setIsLightboxPlaying(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setIsLightboxPlaying(false);
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
  };

  const toggleLightboxVideo = () => {
    if (lightboxVideoRef.current) {
      if (isLightboxPlaying) {
        lightboxVideoRef.current.pause();
      } else {
        lightboxVideoRef.current.play();
      }
      setIsLightboxPlaying(!isLightboxPlaying);
    }
  };

  // Background video controls
  const toggleBgVideo = () => {
    if (bgVideoRef.current) {
      if (isBgVideoPlaying) {
        bgVideoRef.current.pause();
      } else {
        bgVideoRef.current.play();
      }
      setIsBgVideoPlaying(!isBgVideoPlaying);
    }
  };

  // Content toggle
  const toggleContent = () => {
    setIsContentHidden(!isContentHidden);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 text-white overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={bgVideoRef}
        key={backgroundVideo}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/75 z-0" />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={lightboxVideoRef}
              src={selectedDevice.videoPath}
              className="w-full h-full object-cover"
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Lightbox Controls */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLightboxVideo();
                }}
                className="bg-black/50 backdrop-blur-md text-white p-4 rounded-full hover:bg-black/70 transition-all duration-300"
              >
                {isLightboxPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Video Control Buttons */}
      {/* Top Left - Lightbox Button */}
      <button
        onClick={openLightbox}
        className="absolute top-6 left-6 z-20 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group"
        title="Open video in lightbox"
      >
        <Maximize2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>

      {/* Top Right - Background Video Play/Pause */}
      <button
        onClick={toggleBgVideo}
        className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group"
        title={isBgVideoPlaying ? "Pause background video" : "Play background video"}
      >
        {isBgVideoPlaying ? (
          <Pause className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>

      {/* Bottom Left - Content Toggle */}
      <button
        onClick={toggleContent}
        className="absolute bottom-6 left-6 z-20 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group"
        title={isContentHidden ? "Show content" : "Hide content"}
      >
        <EyeOff className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      </button>

      <div className={`relative z-10 container mx-auto px-6 lg:px-12 transition-all duration-500 ${
        isContentHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] mb-8 max-w-xl">
              <span className="block text-white mb-3 animate-fade-in-up tracking-tight">The future of Integrated Technology</span>
              <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-2xl animate-fade-in-up delay-150 tracking-tight">
                within your walls
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-white/95 max-w-2xl mb-10 leading-relaxed animate-fade-in-up delay-300 font-light">
              Engineered for fast installation and timeless luxury, our smart walls combine a steel inner frame with premium marble, stone, mirror, and metal effect boards. The internal cable assembly supports the integration of smart home devices such as dimmable lighting, climate control and security systems as well as standard control of sound systems, TVs and horizontal fireplaces. The systems can even control electric curtain systems to provide a cinematic experience.
            </p>

            <ul className="space-y-8 max-w-lg">
              <li className="flex items-center gap-5 group hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all duration-300">
                  <MoveHorizontal className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium text-lg">
                  Width options: 400mm, 600mm, 800mm, 1000mm, 1100mm, 1200mm
                </span>
              </li>
              <li className="flex items-center gap-5 group hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <Box className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium text-lg">
                  Depths: 120mm, 150mm, 180mm — perfect for lights, speakers & shelves
                </span>
              </li>
              <li className="flex items-center gap-5 group hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300">
                  <PlugZap className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium text-lg">
                  Seamless integration with our smart home systems
                </span>
              </li>
              <li className="flex items-center gap-5 group hover:scale-105 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300 font-medium text-lg">
                  Professional installation in under 4 hours
                </span>
              </li>
            </ul>
          </div>

          <div className={`relative flex flex-col items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '0.2s' }}>
            <div className="w-full max-w-lg bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 mb-10 text-white shadow-2xl">
              <h3 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Featured Device
              </h3>
              <div className="relative h-48 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-black/30 to-black/10 backdrop-blur-md border border-white/20 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img 
                  src={selectedDevice.imagePath} 
                  alt={selectedDevice.name}
                  className="w-32 h-32 object-contain relative z-10 drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="text-center text-white/95 font-semibold mt-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-amber-400 text-2xl font-bold">{selectedDevice.name}</span>
                  <div className="relative">
                    <a
                      href={selectedDevice.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/20 hover:bg-amber-400/30 transition-all duration-300 group"
                      onMouseEnter={() => setShowLinkTooltip(true)}
                      onMouseLeave={() => setShowLinkTooltip(false)}
                    >
                      <ExternalLink className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                    </a>
                    {showLinkTooltip && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30 bg-black/90 backdrop-blur-md text-white rounded-lg px-3 py-2 text-xs font-semibold whitespace-nowrap pointer-events-none shadow-2xl border border-white/30 animate-fade-in">
                        See the product detail
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-base text-white/80 leading-relaxed">{selectedDevice.description}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5 max-w-lg w-full">
              {smartDevices.map((device, i) => {
                const IconComponent = device.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleDeviceClick(device)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative p-5 rounded-2xl border transition-all duration-300 transform ${
                      selectedDevice === device
                        ? "border-amber-400/60 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 backdrop-blur-md shadow-xl shadow-amber-500/30 scale-105 ring-2 ring-amber-400/30"
                        : "border-white/30 bg-black/20 backdrop-blur-md hover:border-amber-400/40 hover:bg-black/30 hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                    } flex flex-col items-center cursor-pointer group`}
                    aria-pressed={selectedDevice === device}
                  >
                    <div className={`transition-all duration-300 mb-3 ${
                      selectedDevice === device ? "text-amber-400 scale-110" : "text-white group-hover:text-amber-300 group-hover:scale-110"
                    }`}>
                      <IconComponent className="w-10 h-10 drop-shadow-lg" />
                    </div>
                    <div className={`font-bold text-xs text-center transition-colors duration-300 leading-tight ${
                      selectedDevice === device ? "text-amber-400" : "text-white group-hover:text-amber-300"
                    }`}>
                      {device.name}
                    </div>

                    {hoveredIndex === i && (
                      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20 bg-black/90 backdrop-blur-md text-white rounded-xl px-4 py-3 text-xs font-semibold whitespace-nowrap pointer-events-none shadow-2xl border border-white/30 animate-fade-in">
                        {device.description}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-8 text-base text-white/80 text-center max-w-md font-light leading-relaxed">
              Click a smart device to see it featured above and change the background video experience.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out both;
        }
        .delay-150 { animation-delay: 150ms; }
        .delay-300 { animation-delay: 300ms; }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ModularSmartWallsSection;