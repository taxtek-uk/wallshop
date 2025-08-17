import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // adjust import based on your setup
import Navigation from '@/components/Navigation';
import TextureSection from '@/components/TextureSection';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';

import { 
  Lightbulb, 
  Film, 
  ThermometerSun, 
  ShieldCheck, 
  Volume2, 
  Layers, 
  Users, 
  Zap, 
  Ruler, 
  ArrowRight, 
  Home, 
  Building, 
  Info,
  Warehouse, 
  Globe,
  BatteryCharging,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Building2,
  Hotel,
  Ticket,
  Play,
  Palette,
  Shirt,
  Square,
  Mountain,
  Gamepad2,
  Tv,
  Bed,
  Bath,
  Wrench,
  Plug,
  MousePointer,
  Hexagon
} from 'lucide-react';
//import '../smart-wall.css';

// Import images
import modularGamingWall from '/images/smart-gaming-wall-2.webp';
import smartLivingRoom from '/images/F0VIppXJ6ZQe.jpg';
import smartBedroom from '/images/luxury-living-room.webp';
import smartBathroom from '/images/78K7MJq6E50c.jpg';
import smartOffice from '/images/smart-office.webp';
import smartHotel from '/images/123.jpg';
import smartEvent from '/images/event-space.webp';

function SmartWalls() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Lightbulb,
      title: "Intelligent Lighting",
      description: "Create ambient scenes and control all lights with voice, app, or automated schedules.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Film,
      title: "Integrated AV",
      description: "Seamlessly control home cinemas, TVs, speakers, and multi-room media from one surface.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: ThermometerSun,
      title: "Smart Climate",
      description: "Zone-based heating & cooling with geolocation, sensors, and app control.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: ShieldCheck,
      title: "Security & CCTV",
      description: "Invisible protection with cameras, sensors, alarms, and remote access built into walls.",
      color: "from-green-400 to-emerald-500"
    },
  ];

  const gamingFeatures = [
    {
      icon: Tv,
      title: "Dual 1000mm TV Modules",
      description: "Two large screens for immersive gaming experiences"
    },
    {
      icon: Gamepad2,
      title: "Integrated Console Bays",
      description: "Discreet PlayStation, Xbox, or gaming PC Storage"
    },
    {
      icon: Hexagon,
      title: "Innovative LED Lighting",
      description: "Color-changing lights that pulse with game audio"
    },
    {
      icon: Volume2,
      title: "Integrated Speakers & Concealed Disc Storage",
      description: "Premium speakers for crystal-clear game sound"
    },
  {
    icon: BatteryCharging, // Suggested Lucide icon
    title: "Wall-Mounted Controller Charger",
    description: "Neatly docks and charges up to four gaming controllers"
  }
  ];

  const environments = [
  {
    icon: Home,
    title: "Living Room",
    description: "A central entertainment zone featuring integrated TV wall, subtle lighting, and minimal storage for a sleek modern look.",
    image: smartLivingRoom,
    features: ["Integrated TV Wall", "Ambient Lighting", "Minimalist Setup"]
  },
  {
    icon: Bed,
    title: "Bedroom",
    description: "Smart lighting and media controls built into the wall for the ultimate relaxed and tech-enhanced bedroom experience.",
    image: smartBedroom,
    features: ["Scene Lighting", "Media Control Panel", "Integrated Smart Wall"]
  },
  {
    icon: Bath,
    title: "Bathroom",
    description: "A luxurious mirror display with ambient glow and integrated media for a smart bathroom experience.",
    image: smartBathroom,
    features: ["Mirror Display", "Ambient Lighting", "Smart Media Integration"]
  },
  {
    icon: Building2,
    title: "Office Lounge",
    description: "A modular setup for professional spaces featuring acoustic wall panels, presentation-ready surfaces, and soft lighting.",
    image: smartOffice,
    features: ["Acoustic Walls", "Presentation Space", "Ambient Light Zones"]
  },
  {
    icon: Hotel,
    title: "Hotel Room",
    description: "Smart hospitality setup with custom lighting, elegant backdrop walls, and multimedia-ready features for guest comfort.",
    image: smartHotel,
    features: ["Smart Lighting", "Decorative Paneling", "Guest Media Control"]
  },
  {
    icon: Ticket,
    title: "Event Space",
    description: "High-end smart wall for event halls with AV panels, branding options, and modular layout capabilities.",
    image: smartEvent,
    features: ["AV Ready", "Custom Branding", "Modular Setup"]
  }
];



  const installationSteps = [
    {
      icon: Wrench,
      title: "Innovative Bracketry",
      description: "Heavy-duty fixings secure brackets to your existing wall in minutes",
      detail: "Professional-grade mounting system"
    },
    {
      icon: MousePointer,
      title: "Snap-Fit Modules",
      description: "Each panel clicks neatly into the bracket framework—no specialised tools required",
      detail: "Tool-free installation process"
    },
    {
      icon: Plug,
      title: "Simple Power Connection",
      description: "One end-panel houses a standard plug-and-play cable; just plug in and switch on",
      detail: "Single power connection point"
    },
    {
      icon: Zap,
      title: "Instant Activation",
      description: "All devices and lighting live the moment the socket is switched",
      detail: "Immediate smart functionality"
    }
  ];

  const boardStyles = [
    { icon: Mountain, name: "Stone/Marble", description: "Natural elegance" },
    { icon: Shirt, name: "Mirror Style", description: "Reflective luxury" },
    { icon: Square, name: "Solid Colour", description: "Clean minimalism" },
    { icon: Palette, name: "Metal Style", description: "Industrial chic" }
  ];

  const wallFeatures = [
    "Integrated TV Display",
    "Electric Fireplace",
    "Premium Soundbar",
    "Floating Shelving",
    "Dimmable LED Lighting",
    "Wireless Charging Zones",
    "Climate Control Panel",
    "Security Camera Hub"
  ];

  const processSteps = [
    {
      icon: Users,
      title: "1. Consultation & Selection",
      description: "Choose your rock board style (metal, mirror, cloth, solid colour, or stone/marble) and select features like TV, fire, soundbar, shelving, and dimmable lighting.",
      details: "Our experts help you visualize your perfect smart wall"
    },
    {
      icon: Ruler,
      title: "2. Measurement & Design",
      description: "Select wall or remote control options. We measure your wall dimensions and socket positions, or conduct a professional survey if needed.",
      details: "Precise CAD planning ensures perfect fit and functionality"
    },
    {
      icon: Layers,
      title: "3. Workshop Construction",
      description: "Your complete smart wall is built in our workshop with all electrics pre-installed. Modular sections are prepared for seamless delivery.",
      details: "Quality craftsmanship with hidden cabling and smart integration"
    },
    {
      icon: Zap,
      title: "4. Clean Installation",
      description: "Brackets are fixed to your existing wall, modules are mounted, and the pre-wired plug connects everything instantly. Complete smart wall ready to use.",
      details: "Professional installation with minimal disruption"
    },
  ];

  const applications = [
    { icon: Home, title: "Modern Homes", description: "Smart living reimagined for the future family." },
    { icon: Building, title: "Corporate Offices", description: "Automated lighting, AV, and security in boardrooms." },
    { icon: Warehouse, title: "Hospitality Spaces", description: "Enhance ambience in hotels and restaurants." },
    { icon: Globe, title: "Public Areas", description: "Future-ready infrastructure for malls and airports." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Smart Wall Systems
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                The Future of Living is{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Built In
                </span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Discover walls that think – control lighting, temperature, music,
                security, and ambiance with one integrated system. From
                consultation to installation, we make smart living effortless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>

                <button
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() =>
                    document.getElementById("gaming")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Gaming <Play className="ml-2 h-5 w-5" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <img
                    src="/images/smart-wall-2.jpg"
                    alt="Smart Wall Feature"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {features.slice(0, 4).map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20"
                    >
                      <feature.icon className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                      <p className="text-xs font-medium text-white/90">{feature.title}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              What Makes Our Smart Walls Brilliant?
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              A blend of beauty, brains, and bold innovation – experience automation that enhances architecture and transforms your living space.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="text-center p-8 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{feature.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION 1: The Ultimate Gaming Smart Wall */}
      <section
  id="gaming"
  className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]"
>
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src="/images/smart-gaming-wall-3.webp"
      alt="Gaming Smart Wall Background"
      className="w-full h-full object-cover object-center"
      draggable="false"
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
    {/* Gradient Accent Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-20"></div>
  </div>

  {/* Section Content */}
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
        Gaming Excellence
      </div>
      <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
        The Ultimate{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Gaming Smart Wall
        </span>
      </h2>
      <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
        Transform your gaming experience with our modular design featuring dual screens, integrated consoles, and immersive lighting that pulses with every victory and defeat.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={modularGamingWall}
            alt="Ultimate Gaming Smart Wall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {/* <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2">Modular Gaming Paradise</h3>
            <p className="text-white/80">Two 1000mm TV modules along 3 x 400mm side modules with integrated console storage</p>
          </div> */}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8"
      >
        {gamingFeatures.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
    >
      <div className="grid md:grid-cols-3 gap-8 text-center">
       <div>
          <h4 className="text-3xl font-bold text-white mb-2">Modular Gaming Wall</h4>
          <p className="text-white/70 flex items-start gap-2">
            Configurable layout using two 1000mm smart modules with a central 700mm gap for a TV bracket.
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-12 h-12 text-white/50 hover:text-white mt-1 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-sm text-white bg-[#2e2e2e] border border-white/10 shadow-lg p-3 rounded-md">
                  Optional extended layout available with 3 × 400mm and 2 × 1000mm modules — ideal for dual-screen setups.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </p>

        </div>

        <div>
          <h4 className="text-3xl font-bold text-white mb-2">Integrated Consoles</h4>
          <p className="text-white/70">Discreet PlayStation, Xbox or retro Atari bays beneath the screen</p>
        </div>
        <div>
          <h4 className="text-3xl font-bold text-white mb-2">Dynamic Effects</h4>
          <p className="text-white/70">Lighting pulses to game audio, elevating every victory and defeat</p>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* NEW SECTION 2: Versatile Smart Wall Environments */}
      <section id="environments" className="py-20 bg-gradient-to-br from-[#f8f6f3] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
              Versatile Solutions
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
            <span className="block text-gray-800">
              Smart Wall Environments.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6b5c47] to-[#b68c5a] mt-2 mb-2">
              For Residential & Commercial Spaces.
            </span>
          </h2>

           
          <p className="text-xl text-[#6b5c47] max-w-4xl mx-auto leading-relaxed">
            From cozy bedrooms and luxurious bathrooms to professional offices, hotels, and events — our modular smart walls are designed to adapt to both residential and commercial environments with seamless technology, functional elegance, and customized features.
          </p>

          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {environments.map((env, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-[#e2d5c4] overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={env.image}
                      alt={env.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center">
                        <env.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-[#231c14] mb-4">{env.title}</h3>
                    {/* <p className="text-[#6b5c47] mb-6 leading-relaxed">{env.description}</p>
                     */}
                    <div className="space-y-2">
                      {env.features.map((feature, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-[#b69777]" />
                          <span className="text-sm text-[#6b5c47]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#b69777]/5 to-[#907252]/5 rounded-3xl p-8 border border-[#e2d5c4]"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-[#231c14]">Endless Possibilities</h3>
              <p className="text-xl text-[#6b5c47] mb-8 max-w-3xl mx-auto">
                Each environment is fully customizable with your choice of features, finishes, and smart integrations. Create the perfect atmosphere for every room in your home.
              </p>
              {/* <button
                className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center mx-auto"
                onClick={() =>
                  document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Design Your Space <ArrowRight className="ml-2 h-5 w-5" />
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION 3: Effortless Installation & Power */}
      <section
  id="installation"
  className="py-20 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]"
>
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full z-0">
    <img
      src="/images/integrated-smart-modules.png"
      alt="Installation Background"
      className="w-full h-full object-cover object-center"
      draggable="false"
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
    {/* Gradient Accent Overlay (optional, can adjust or remove if you wish) */}
    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 opacity-20"></div>
  </div>

  {/* Section Content */}
  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
        Simple Installation
      </div>
      <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
        Effortless Installation{" "}
        <span className="bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
          & Power
        </span>
      </h2>
      <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed">
        Revolutionary installation system that transforms complex smart wall setup into a simple, clean process. Professional results in minutes, not hours.
      </p>
    </motion.div>

    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="/images/banners/banner-2.webp"
            alt="Installation Process"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-2xl font-bold text-white mb-2">Professional Installation</h3>
            <p className="text-white/80">Clean, efficient, and tool-free process</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-8"
      >
        {installationSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
              <p className="text-white/70 leading-relaxed mb-2">{step.description}</p>
              <p className="text-sm text-green-400 font-medium">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
    >
      <div className="grid md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Innovative Bracketry</h4>
          <p className="text-white/70 text-sm">
            snap-fit modules, single plug-and-play connection with all accessories pre-wired
          </p>
        </div>
        <div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <MousePointer className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Snap-Fit Modules</h4>
          <p className="text-white/70 text-sm">
            Each panel clicks neatly into the bracket framework—no specialised tools required
          </p>
        </div>
        <div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Plug className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Simple Power Connection</h4>
          <p className="text-white/70 text-sm">
            A standard Single plug-and-play connection with all accessories pre-wired
          </p>
        </div>
        <div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Instant Activation</h4>
          <p className="text-white/70 text-sm">
            All devices and lighting live the moment the socket is switched
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      {/* Board Styles Section */}
      <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">

        <TextureSection />
        {/* <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              Choose Your Perfect Style
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              Select from our premium collection of board styles to match your aesthetic vision and create the perfect smart wall for your space.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardStyles.map((style, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="text-center p-8 h-full bg-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <style.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{style.name}</h3>
                  <p className="text-[#6b5c47] leading-relaxed">{style.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}
      </section>

      {/* Process Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final installation, our streamlined process ensures your smart wall journey is smooth and professional.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-center p-8 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6">
                    <step.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{step.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed mb-4">{step.description}</p>
                  <p className="text-sm text-[#b69777] font-medium">{step.details}</p>
                </div>
                
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#b69777]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              Perfect for Every Space
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              Our smart wall systems adapt to any environment, bringing intelligence and elegance to homes, offices, and public spaces.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="text-center p-8 h-full bg-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <app.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{app.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed">{app.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Inquiry Form Section */}
      <section id="inquiry" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b69777]/5 to-[#907252]/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              Start Your Smart Wall Journey
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              Get a personalized quote and consultation. Our experts will help you design the perfect smart wall for your space.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 bg-white/80 backdrop-blur-sm border border-[#e2d5c4] shadow-2xl rounded-2xl">
                <div className="text-center pb-6">
                  <h3 className="text-2xl font-bold text-[#231c14] mb-2">
                    Get Your Free Quote
                  </h3>
                  <p className="text-[#6b5c47]">
                    Tell us about your project and we'll provide a detailed estimate
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#231c14] mb-2">
                        First Name *
                      </label>
                      <input 
                        placeholder="John" 
                        className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#231c14] mb-2">
                        Last Name *
                      </label>
                      <input 
                        placeholder="Smith" 
                        className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+44 7XXX XXXXXX" 
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Preferred Board Style
                    </label>
                    <select className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors bg-white">
                      <option value="">Select a style...</option>
                      <option value="metal">Metal Style</option>
                      <option value="mirror">Mirror Style</option>
                      <option value="solid">Solid Colour</option>
                      <option value="stone">Stone/Marble</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Desired Features
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {wallFeatures.map((feature, i) => (
                        <label key={i} className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded border-[#e2d5c4] text-[#b69777] focus:ring-[#b69777]" />
                          <span className="text-[#6b5c47]">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Project Details
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us about your space, requirements, and any specific features you're interested in..."
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors resize-none"
                    />
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-lg font-semibold">
                    Get Free Quote
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-8 bg-white border border-[#e2d5c4] shadow-lg rounded-2xl">
                <h3 className="text-2xl font-bold text-[#231c14] mb-6">Why Choose SmartWalls?</h3>
                <div className="space-y-4">
                  {[
                    "Free consultation and design service",
                    "Professional installation included",
                    "2-year warranty on all components",
                    "24/7 technical support",
                    "Customizable to any space",
                    "Energy-efficient smart technology"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#b69777] flex-shrink-0" />
                      <span className="text-[#6b5c47]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#b69777]/10 to-[#907252]/10 border border-[#e2d5c4] rounded-2xl">
                <h3 className="text-xl font-bold text-[#231c14] mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">+44 141 739 3377</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">info@thewallshop.co.uk</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">Glasgow, United Kingdom</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productCategory="smart-walls"
      />
    </div>
  );
}

export default SmartWalls;