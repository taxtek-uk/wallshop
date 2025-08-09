import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import SEOHead from '../components/SEOHead';
import { smartControlPanelsSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Shield, 
  Mic, 
  Home, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Zap,
  Smartphone,
  Wifi,
  Settings,
  Monitor,
  Volume2,
  Lightbulb,
  ThermometerSun,
  ShieldCheck,
  Users,
  Play,
  Building2,
  Layers
} from 'lucide-react';

const SmartControlPanels: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [activeFeature, setActiveFeature] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const controlPanels = [
    {
      id: 1,
      name: "MixPad M5",
      subtitle: "Smart Voice Control Panel",
      image: "/images/mixpad_m5.webp",
      price: "£299",
      features: ["Four-way high-power light control", "Smart infrared control", "Touch screen interaction", "400W high power load"],
      specs: { screen: "4.3\"", connectivity: "Zigbee, WiFi", power: "400W" },
      highlight: false
    },
    {
      id: 2,
      name: "MixPad X",
      subtitle: "All-in-one Full Screen Smart Home Gateway",
      image: "/images/mixpad_x.webp",
      price: "£449",
      features: ["Full screen control", "Multi-protocol support", "Voice integration", "Whole house automation"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi, Matter", power: "600W" },
      highlight: true
    },
    {
      id: 3,
      name: "MixPad 7 Ultra",
      subtitle: "All-in-one Multi-protocol Smart Gateway",
      image: "/images/mixpad_7_ultra.webp",
      price: "£399",
      features: ["Multi-protocol support", "Advanced automation", "Energy monitoring", "Security integration"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi, Matter, Thread", power: "500W" },
      highlight: false
    },
    {
      id: 4,
      name: "MixPad 7",
      subtitle: "Multi-protocol Smart Home Gateway",
      image: "/images/mixpad_7.webp",
      price: "£349",
      features: ["Smart home control", "Scene management", "Voice control", "App integration"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi", power: "400W" },
      highlight: false
    },
    {
      id: 5,
      name: "MixPad Genie",
      subtitle: "Smart Panel Funny Life",
      image: "/images/mixpad_genie.webp",
      price: "£199",
      features: ["Compact design", "Essential controls", "Easy installation", "Smart scenes"],
      specs: { screen: "3.5\"", connectivity: "Zigbee, WiFi", power: "200W" },
      highlight: false
    },
    {
      id: 6,
      name: "MixPad S",
      subtitle: "One panel all smart",
      image: "/images/mixpad_s.webp",
      price: "£149",
      features: ["Basic smart control", "Affordable solution", "Simple setup", "Core functionality"],
      specs: { screen: "2.8\"", connectivity: "WiFi", power: "150W" },
      highlight: false
    },
    {
      id: 7,
      name: "ZigBee Mini Hub",
      subtitle: "Connect many smart devices to create smart scenes",
      image: "/images/zigbee_mini_hub.webp",
      price: "£79",
      features: ["Device connectivity", "Scene creation", "Compact size", "Easy setup"],
      specs: { screen: "N/A", connectivity: "Zigbee", power: "12V DC" },
      highlight: false
    }
  ];

  const valueProps = [
    {
      icon: Home,
      title: "Centralized Control",
      description: "Manage lighting, security, climate, and entertainment from one elegant panel",
      color: "from-[#b69777] to-[#907252]"
    },
    {
      icon: Mic,
      title: "Voice Integration",
      description: "Works with Alexa, Google Assistant, and Siri for hands-free control",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Smart Wall Compatible",
      description: "Seamlessly integrates with The Wall Shop's pre-manufactured smart walls",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Instant Automation",
      description: "Create smart scenes and automate your entire home with one touch",
      color: "from-green-400 to-emerald-500"
    }
  ];

  const smartFeatures = [
    {
      icon: Lightbulb,
      title: "Intelligent Lighting",
      description: "Control all lights with voice, app, or automated schedules",
      active: activeFeature === 0
    },
    {
      icon: ThermometerSun,
      title: "Climate Control",
      description: "Zone-based heating & cooling with smart sensors",
      active: activeFeature === 1
    },
    {
      icon: ShieldCheck,
      title: "Security System",
      description: "Integrated cameras, sensors, and alarm management",
      active: activeFeature === 2
    },
    {
      icon: Volume2,
      title: "Audio Control",
      description: "Multi-room audio and entertainment system control",
      active: activeFeature === 3
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London",
      rating: 5,
      comment: "The MixPad X has transformed our home. Everything is so much easier to control now.",
      image: "/images/testimonial-1.jpg"
    },
    {
      name: "Michael Chen",
      location: "Manchester",
      rating: 5,
      comment: "Professional installation was seamless. The integration with our smart wall is perfect.",
      image: "/images/testimonial-2.jpg"
    },
    {
      name: "Emma Williams",
      location: "Birmingham",
      rating: 5,
      comment: "Voice control works flawlessly. The kids love using it too!",
      image: "/images/testimonial-3.jpg"
    }
  ];

  const installationSteps = [
    {
      icon: Users,
      title: "1. Consultation",
      description: "Expert consultation to determine the perfect control panel for your smart wall setup",
      detail: "Personalized recommendations based on your needs"
    },
    {
      icon: Settings,
      title: "2. Configuration",
      description: "Pre-configure your panel with all smart devices and automation scenes",
      detail: "Ready-to-use setup upon installation"
    },
    {
      icon: Layers,
      title: "3. Integration",
      description: "Seamless integration with your existing smart wall infrastructure",
      detail: "Professional mounting and wiring"
    },
    {
      icon: Zap,
      title: "4. Activation",
      description: "Instant activation with full smart home control at your fingertips",
      detail: "Complete system testing and training"
    }
  ];

  return (
    <>
      <SEOHead
        title={smartControlPanelsSEO.title}
        description={smartControlPanelsSEO.description}
        keywords={smartControlPanelsSEO.keywords}
        canonicalUrl={smartControlPanelsSEO.canonicalUrl}
        ogImage={smartControlPanelsSEO.ogImage}
        structuredData={smartControlPanelsSEO.structuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
        {/* Navigation */}
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="pt-24 pb-4 bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/" className="text-white/70 hover:text-[#b69777] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ArrowRight className="w-4 h-4 text-white/50" />
                </li>
                <li>
                  <Link to="/smart-devices" className="text-white/70 hover:text-[#b69777] transition-colors">
                    Smart Devices
                  </Link>
                </li>
                <li>
                  <ArrowRight className="w-4 h-4 text-white/50" />
                </li>
                <li>
                  <span className="text-white/70">Orvibo</span>
                </li>
                <li>
                  <ArrowRight className="w-4 h-4 text-white/50" />
                </li>
                <li>
                  <span className="text-[#b69777]">Control Panels</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pb-16 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
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
                  Orvibo Smart Control Systems
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Command Your{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Entire Smart Home
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  From voice control to whole-house automation, discover the brain of your smart home system. 
                  Experience the future of home control with Orvibo's revolutionary MixPad series.
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
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore Panels <Play className="ml-2 h-5 w-5" />
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
                      src="/images/mixpad_hero.webp"
                      alt="MixPad X integrated into luxury smart wall setup"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {smartFeatures.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`text-center p-3 rounded-xl shadow-sm border transition-all duration-300 ${
                          feature.active 
                            ? 'bg-[#b69777]/20 border-[#b69777]/50' 
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <feature.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${
                          feature.active ? 'text-[#b69777]' : 'text-white/70'
                        }`} />
                        <p className="text-xs font-medium text-white/90">{feature.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Why Choose Orvibo Control Panels?
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Experience the perfect blend of technology and luxury with our award-winning smart control solutions.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {valueProps.map((prop, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="text-center p-8 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${prop.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <prop.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#231c14] mb-4">{prop.title}</h3>
                    <p className="text-[#6b5c47] leading-relaxed">{prop.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section id="products" className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Complete Control Panel Collection
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                From compact solutions to full-featured gateways, find the perfect control panel for your smart home.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {controlPanels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group relative ${
                    panel.highlight 
                      ? 'bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5 border-2 border-[#b69777]' 
                      : 'bg-white border border-[#e2d5c4]'
                  } rounded-2xl overflow-hidden hover:border-[#b69777] transition-all duration-300 hover:shadow-xl`}
                >
                  {panel.highlight && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden">
                    <img 
                      src={panel.image} 
                      alt={panel.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {panel.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-[#231c14]">{panel.name}</h3>
                    <p className="text-[#b69777] mb-4 font-medium">{panel.subtitle}</p>
                    
                    <div className="mb-4">
                      {panel.features.map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-[#b69777] mr-2 flex-shrink-0" />
                          <span className="text-[#6b5c47] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-[#e2d5c4] pt-4 mb-4">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-[#6b5c47]">Screen:</span>
                          <p className="text-[#231c14] font-medium">{panel.specs.screen}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Connectivity:</span>
                          <p className="text-[#231c14] font-medium text-xs">{panel.specs.connectivity}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Power:</span>
                          <p className="text-[#231c14] font-medium">{panel.specs.power}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        setSelectedProduct({ name: panel.name, price: panel.price });
                        setIsQuoteModalOpen(true);
                      }}
                    >
                      Get Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Showcase */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                  Seamless Smart Wall Integration
                </h2>
                <p className="text-xl text-[#6b5c47] mb-8 leading-relaxed">
                  See how Orvibo control panels transform traditional walls into intelligent command centers. 
                  Our panels integrate perfectly with The Wall Shop's pre-manufactured smart wall systems.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#b69777] mr-3" />
                    <span className="text-[#6b5c47]">No rewiring required for most installations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#b69777] mr-3" />
                    <span className="text-[#6b5c47]">Professional installation service available</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#b69777] mr-3" />
                    <span className="text-[#6b5c47]">Compatible with existing smart wall configurations</span>
                  </div>
                </div>
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Book Smart Wall Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-lg p-4">
                      <img src="/images/traditional-wall.jpg" alt="Traditional wall setup" className="rounded-lg w-full h-32 object-cover" />
                      <p className="text-center text-[#6b5c47] mt-2 text-sm">Before: Traditional Setup</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5 border border-[#b69777] rounded-lg p-4">
                      <img src="/images/smart-wall-setup.jpg" alt="Smart wall with control panel" className="rounded-lg w-full h-32 object-cover" />
                      <p className="text-center text-[#b69777] mt-2 text-sm font-medium">After: Smart Wall Integration</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Professional Installation Process
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                From consultation to activation, our expert team ensures a seamless smart home transformation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {installationSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-gradient-to-br from-[#b69777] to-[#907252] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <step.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{step.title}</h3>
                  <p className="text-[#6b5c47] mb-2">{step.description}</p>
                  <p className="text-sm text-[#b69777] font-medium">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications Table */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Technical Specifications
              </h2>
              <p className="text-xl text-[#6b5c47]">Compare features to find the perfect control panel for your needs</p>
            </motion.div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Model</th>
                    <th className="px-6 py-4 text-left font-semibold">Screen Size</th>
                    <th className="px-6 py-4 text-left font-semibold">Protocols</th>
                    <th className="px-6 py-4 text-left font-semibold">Power</th>
                    <th className="px-6 py-4 text-left font-semibold">Voice Control</th>
                    <th className="px-6 py-4 text-left font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody className="text-[#231c14]">
                  {controlPanels.map((panel, index) => (
                    <tr key={panel.id} className={index % 2 === 0 ? 'bg-white/50' : 'bg-[#faf7f3]/50'}>
                      <td className="px-6 py-4 font-semibold">{panel.name}</td>
                      <td className="px-6 py-4">{panel.specs.screen}</td>
                      <td className="px-6 py-4">{panel.specs.connectivity}</td>
                      <td className="px-6 py-4">{panel.specs.power}</td>
                      <td className="px-6 py-4">
                        <CheckCircle className="w-5 h-5 text-[#b69777]" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#b69777]">{panel.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                What Our Customers Say
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Real experiences from homeowners who've transformed their living spaces with Orvibo control panels.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-[#e2d5c4] rounded-2xl p-6 hover:border-[#b69777] transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-[#231c14]">{testimonial.name}</h4>
                      <p className="text-[#6b5c47] text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#b69777] fill-current" />
                    ))}
                  </div>
                  <p className="text-[#6b5c47] italic">"{testimonial.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Smart Home?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get expert consultation and professional installation for your perfect smart control solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 0800 123 4567
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Quote Modal */}
        {isQuoteModalOpen && (
          <QuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            selectedProduct={selectedProduct}
          />
        )}
      </div>
    </>
  );
};

export default SmartControlPanels;
