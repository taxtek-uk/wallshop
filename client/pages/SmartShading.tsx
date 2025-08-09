import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { smartShadingSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  Wind, 
  Thermometer, 
  Shield, 
  Zap, 
  CheckCircle, 
  Star, 
  Calculator, 
  Clock, 
  Play, 
  Info, 
  Home, 
  Building, 
  Palette, 
  Eye,
  Sunrise,
  Sunset,
  CloudSun,
  Activity,
  BarChart3,
  Timer,
  Gauge,
  Lightbulb,
  Smartphone,
  Wifi,
  Settings,
  Target,
  Award,
  TrendingUp,
  Users,
  Layers,
  Volume2,
  VolumeX,
  Battery,
  Bluetooth,
  Radio
} from 'lucide-react';

const SmartShading: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState('energy');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lightLevel, setLightLevel] = useState(75);
  const [curtainPosition, setCurtainPosition] = useState(60);
  const [activeRoom, setActiveRoom] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(true);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const lightInterval = setInterval(() => {
      if (isAutoMode) {
        const hour = new Date().getHours();
        let newLight;
        if (hour >= 6 && hour <= 18) {
          // Daytime: simulate sun movement
          newLight = 30 + Math.sin((hour - 6) / 12 * Math.PI) * 50 + Math.random() * 20;
        } else {
          // Nighttime: low light
          newLight = 5 + Math.random() * 15;
        }
        setLightLevel(Math.max(0, Math.min(100, newLight)));
        
        // Auto-adjust curtains based on light
        const targetPosition = newLight > 70 ? 30 : newLight < 20 ? 90 : 60;
        setCurtainPosition(prev => {
          const diff = targetPosition - prev;
          return prev + diff * 0.1; // Smooth transition
        });
      }
    }, 2000);

    const roomInterval = setInterval(() => {
      setActiveRoom(prev => (prev + 1) % 4);
    }, 4000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(lightInterval);
      clearInterval(roomInterval);
    };
  }, [isAutoMode]);

  const shadingProducts = [
    {
      id: 1,
      name: "Smart Curtain Motor Kit",
      category: "curtain",
      subtitle: "Rechargeable mini but powerful smart curtain motor",
      image: "/images/smart_curtain_motor_kit.webp",
      price: "£199",
      features: [
        "Rechargeable battery operation",
        "Compact and powerful motor",
        "Easy installation",
        "Wireless control",
        "Ultra-quiet operation"
      ],
      specs: {
        power: "Rechargeable Li-ion",
        load: "Up to 15kg",
        noise: "< 35dB",
        control: "App, Voice, Remote"
      },
      rating: 4.8,
      reviews: 156,
      highlight: true
    },
    {
      id: 2,
      name: "Smart Curtain Motor",
      category: "curtain",
      subtitle: "Easy to wirelessly open & close curtain in smart way",
      image: "/images/smart_curtain_motor.webp",
      price: "£149",
      features: [
        "Wireless operation",
        "Smart home integration",
        "Precise positioning",
        "Quiet operation",
        "Easy installation"
      ],
      specs: {
        power: "DC 12V",
        load: "Up to 12kg",
        noise: "< 40dB",
        control: "App, Remote"
      },
      rating: 4.6,
      reviews: 134,
      highlight: false
    },
    {
      id: 3,
      name: "Super Mute Smart Curtain ZigBee",
      category: "curtain",
      subtitle: "Industry innovation masterpiece, pioneer of high-end smart curtains",
      image: "/images/super-mute-curtain.jpg",
      price: "£299",
      features: [
        "Ultra-quiet design",
        "Magnesium-aluminum alloy",
        "Strong torque motor",
        "ZigBee connectivity",
        "Premium build quality"
      ],
      specs: {
        power: "DC 24V",
        load: "Up to 20kg",
        noise: "< 30dB",
        control: "App, Voice, Panel"
      },
      rating: 4.9,
      reviews: 189,
      highlight: false
    },
    {
      id: 4,
      name: "ZigBee Multi-functional Relay",
      category: "control",
      subtitle: "Transform normal curtain motors into smart ones",
      image: "/images/zigbee_multi_functional_relay.webp",
      price: "£79",
      features: [
        "Retrofit existing motors",
        "ZigBee connectivity",
        "Multi-device control",
        "Easy installation",
        "Smart automation"
      ],
      specs: {
        power: "AC 220V",
        load: "Up to 500W",
        noise: "Silent",
        control: "App, Voice, Panel"
      },
      rating: 4.5,
      reviews: 98,
      highlight: false
    },
    {
      id: 5,
      name: "Smart Blind Controller",
      category: "blinds",
      subtitle: "Intelligent control for venetian and roller blinds",
      image: "/images/smart-blind-controller.jpg",
      price: "£129",
      features: [
        "Precise angle control",
        "Solar tracking",
        "Weather integration",
        "Energy optimization",
        "Quiet operation"
      ],
      specs: {
        power: "Rechargeable",
        load: "Up to 8kg",
        noise: "< 35dB",
        control: "App, Voice, Auto"
      },
      rating: 4.7,
      reviews: 112,
      highlight: false
    },
    {
      id: 6,
      name: "Motorized Roller Shade",
      category: "blinds",
      subtitle: "Premium automated roller shades with smart controls",
      image: "/images/motorized-roller-shade.jpg",
      price: "£249",
      features: [
        "Custom fabric options",
        "Precise positioning",
        "Solar automation",
        "Quiet motor",
        "Professional installation"
      ],
      specs: {
        power: "DC 12V",
        load: "Up to 10kg",
        noise: "< 32dB",
        control: "App, Voice, Schedule"
      },
      rating: 4.8,
      reviews: 145,
      highlight: false
    }
  ];

  const lifestyleBenefits = [
    {
      id: 'energy',
      title: 'Energy Efficiency',
      description: 'Reduce heating and cooling costs by up to 30%',
      icon: <Zap className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Automatic solar tracking reduces heat gain by up to 40%',
        'Insulation properties maintain temperature ±2°C',
        'Smart scheduling optimizes energy usage patterns',
        'Integration with HVAC systems for maximum efficiency'
      ],
      savings: '£240/year average savings',
      color: "from-green-400 to-emerald-500",
      stats: { efficiency: "30%", reduction: "40%", savings: "£240" }
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Automated privacy control and security enhancement',
      icon: <Shield className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Scheduled privacy automation with custom time zones',
        'Away mode simulation with random patterns',
        'Instant privacy at the touch of a button',
        'Integration with security systems and cameras'
      ],
      savings: 'Enhanced home security',
      color: "from-blue-400 to-cyan-500",
      stats: { response: "< 1s", patterns: "50+", coverage: "100%" }
    },
    {
      id: 'convenience',
      title: 'Convenience & Luxury',
      description: 'Effortless control and premium experience',
      icon: <Sun className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Voice control integration with Alexa, Google, Siri',
        'Smartphone app control from anywhere in the world',
        'Automated schedules based on sunrise/sunset',
        'Scene integration with lighting and music systems'
      ],
      savings: 'Ultimate convenience',
      color: "from-yellow-400 to-orange-500",
      stats: { control: "Global", voices: "3+", scenes: "Unlimited" }
    },
    {
      id: 'health',
      title: 'Health & Wellbeing',
      description: 'Natural light management for better living',
      icon: <Moon className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Circadian rhythm support with automatic adjustments',
        'Glare reduction for screen work and reading',
        'UV protection preserves furniture and artwork',
        'Natural light optimization for mood enhancement'
      ],
      savings: 'Improved wellbeing',
      color: "from-purple-400 to-pink-500",
      stats: { protection: "99%", comfort: "95%", health: "Optimal" }
    }
  ];

  const roomApplications = [
    {
      room: 'Bedroom',
      image: '/images/bedroom-shading.jpg',
      solution: 'Blackout Solutions',
      description: 'Complete darkness for perfect sleep with automated wake-up lighting',
      products: ['Smart Curtain Motor Kit', 'Blackout Curtains'],
      price: 'From £299',
      icon: <Moon className="w-6 h-6" />,
      lightLevel: 5,
      temperature: 18,
      active: activeRoom === 0
    },
    {
      room: 'Living Room',
      image: '/images/living-room-shading.jpg',
      solution: 'Ambiance Control',
      description: 'Perfect lighting for entertainment and relaxation',
      products: ['Super Mute Curtain', 'Motorized Blinds'],
      price: 'From £399',
      icon: <Home className="w-6 h-6" />,
      lightLevel: 65,
      temperature: 22,
      active: activeRoom === 1
    },
    {
      room: 'Office',
      image: '/images/office-shading.jpg',
      solution: 'Glare Reduction',
      description: 'Optimal lighting for productivity and screen visibility',
      products: ['Smart Blind Controller', 'Anti-glare Blinds'],
      price: 'From £199',
      icon: <Building className="w-6 h-6" />,
      lightLevel: 45,
      temperature: 21,
      active: activeRoom === 2
    },
    {
      room: 'Whole House',
      image: '/images/whole-house-shading.jpg',
      solution: 'Coordinated Control',
      description: 'Synchronized shading throughout your entire home',
      products: ['Multiple Motors', 'Central Control'],
      price: 'From £999',
      icon: <Eye className="w-6 h-6" />,
      lightLevel: 55,
      temperature: 20,
      active: activeRoom === 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Sun className="w-5 h-5" /> },
    { id: 'curtain', name: 'Curtain Motors', icon: <Wind className="w-5 h-5" /> },
    { id: 'blinds', name: 'Blind Controllers', icon: <Palette className="w-5 h-5" /> },
    { id: 'control', name: 'Control Systems', icon: <Zap className="w-5 h-5" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = selectedCategory === 'all' 
    ? shadingProducts 
    : shadingProducts.filter(product => product.category === selectedCategory);

  const automationScenarios = [
    {
      scenario: "Morning Routine",
      time: "07:00",
      action: "Gradual opening with sunrise simulation",
      icon: <Sunrise className="w-6 h-6 text-[#b69777]" />,
      description: "Gentle wake-up with natural light progression"
    },
    {
      scenario: "Work Mode",
      time: "09:00",
      action: "Optimal positioning for screen work",
      icon: <Building className="w-6 h-6 text-[#b69777]" />,
      description: "Reduce glare while maintaining natural light"
    },
    {
      scenario: "Entertainment",
      time: "19:00",
      action: "Ambient lighting for movie watching",
      icon: <Play className="w-6 h-6 text-[#b69777]" />,
      description: "Perfect atmosphere for relaxation"
    },
    {
      scenario: "Sleep Time",
      time: "22:00",
      action: "Complete blackout for optimal rest",
      icon: <Moon className="w-6 h-6 text-[#b69777]" />,
      description: "Gradual dimming for natural sleep cycle"
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: "Window Assessment",
      description: "Professional measurement and compatibility check",
      icon: <Gauge className="w-8 h-8 text-[#b69777]" />,
      duration: "30 minutes"
    },
    {
      step: 2,
      title: "Custom Configuration",
      description: "Tailored system design for your specific needs",
      icon: <Settings className="w-8 h-8 text-[#b69777]" />,
      duration: "1-2 hours"
    },
    {
      step: 3,
      title: "Professional Installation",
      description: "Expert installation with minimal disruption",
      icon: <Users className="w-8 h-8 text-[#b69777]" />,
      duration: "2-4 hours"
    },
    {
      step: 4,
      title: "Smart Integration",
      description: "Setup and testing of all smart features",
      icon: <Smartphone className="w-8 h-8 text-[#b69777]" />,
      duration: "1 hour"
    }
  ];

  const getTimeBasedIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return <Sunrise className="w-6 h-6 text-yellow-400" />;
    if (hour >= 12 && hour < 18) return <Sun className="w-6 h-6 text-orange-400" />;
    if (hour >= 18 && hour < 22) return <Sunset className="w-6 h-6 text-orange-600" />;
    return <Moon className="w-6 h-6 text-blue-400" />;
  };

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    if (hour >= 18 && hour < 22) return "Good Evening";
    return "Good Night";
  };

  return (
    <>
      <SEOHead
        title={smartShadingSEO.title}
        description={smartShadingSEO.description}
        keywords={smartShadingSEO.keywords}
        canonicalUrl={smartShadingSEO.canonicalUrl}
        ogImage={smartShadingSEO.ogImage}
        structuredData={smartShadingSEO.structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
        {/* Navigation */}
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="bg-gradient-to-r from-[#231c14]/90 to-[#2a1f17]/90 py-4 pt-24">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/" className="text-white/70 hover:text-[#b69777] transition-colors">
                    Home
                  </Link>
                </li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li>
                  <Link to="/smart-devices" className="text-white/70 hover:text-[#b69777] transition-colors">
                    Smart Devices
                  </Link>
                </li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li><span className="text-white/70">Orvibo</span></li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li><span className="text-[#b69777]">Shading</span></li>
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
            <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                  Smart Shading Systems
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Effortless{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Light Control
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  AI-powered automated curtains and blinds that respond to your lifestyle and preferences. 
                  Experience the perfect balance of natural light, privacy, and energy efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Automate My Windows <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <button
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Calculate Savings <Calculator className="ml-2 h-5 w-5" />
                  </button>
                </div>

                {/* Live Time and Automation Status */}
                <div className="grid grid-cols-2 gap-4 mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className="flex items-center mb-2">
                      {getTimeBasedIcon()}
                      <span className="text-sm text-white/80 ml-2">{getTimeBasedGreeting()}</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/80">Auto Mode</span>
                      <button
                        onClick={() => setIsAutoMode(!isAutoMode)}
                        className={`w-8 h-4 rounded-full transition-colors ${
                          isAutoMode ? 'bg-[#b69777]' : 'bg-white/30'
                        }`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                          isAutoMode ? 'translate-x-4' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="text-lg font-bold text-[#b69777]">
                      {isAutoMode ? 'Active' : 'Manual'}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                  {/* Live Light Control Demo */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/80">Light Level</span>
                      <span className="text-[#b69777] font-bold">{Math.round(lightLevel)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                      <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
                        style={{ width: `${lightLevel}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-white/80">Curtain Position</span>
                      <span className="text-[#b69777] font-bold">{Math.round(curtainPosition)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-[#b69777] to-[#907252] h-3 rounded-full"
                        style={{ width: `${curtainPosition}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Room Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    {roomApplications.map((room, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: room.active ? 1.05 : 1,
                          backgroundColor: room.active ? 'rgba(182, 151, 119, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="p-4 rounded-xl border border-white/20 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          {room.icon}
                          <span className="text-xs text-white/70">{room.solution}</span>
                        </div>
                        <div className="text-sm font-medium text-white">{room.room}</div>
                        <div className="text-xs text-white/60 mb-2">{room.lightLevel}% light</div>
                        <div className="text-xs text-[#b69777] font-semibold">{room.price}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lifestyle Benefits */}
        <section id="benefits" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Transform Your Lifestyle
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Discover the benefits of intelligent window automation that adapts to your daily routine and enhances your living experience.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-4">
                  {lifestyleBenefits.map((benefit) => (
                    <motion.button
                      key={benefit.id}
                      onClick={() => setSelectedBenefit(benefit.id)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                        selectedBenefit === benefit.id
                          ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white shadow-xl'
                          : 'bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] text-[#231c14] hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        {benefit.icon}
                        <h3 className="text-xl font-bold ml-4">{benefit.title}</h3>
                      </div>
                      <p className={`mb-4 ${selectedBenefit === benefit.id ? 'text-white/90' : 'text-[#6b5c47]'}`}>
                        {benefit.description}
                      </p>
                      {selectedBenefit === benefit.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          {benefit.details.map((detail, i) => (
                            <div key={i} className="flex items-center text-white/80">
                              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                          <div className="mt-4 p-3 bg-white/10 rounded-lg">
                            <div className="text-sm font-semibold text-white mb-2">{benefit.savings}</div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              {Object.entries(benefit.stats).map(([key, value]) => (
                                <div key={key} className="text-center">
                                  <div className="font-bold text-[#b89773]">{value}</div>
                                  <div className="text-white/60 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-[#faf7f3] to-white rounded-3xl p-8 shadow-2xl border border-[#e2d5c4]">
                  <AnimatePresence mode="wait">
                    {lifestyleBenefits.map((benefit) => (
                      selectedBenefit === benefit.id && (
                        <motion.div
                          key={benefit.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`aspect-video bg-gradient-to-br ${benefit.color} rounded-2xl p-6 mb-6 text-white relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/20"></div>
                            <div className="relative z-10">
                              <div className="flex items-center mb-4">
                                {benefit.icon}
                                <h3 className="text-2xl font-bold ml-4">{benefit.title}</h3>
                              </div>
                              <p className="text-white/90 mb-6">{benefit.description}</p>
                              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-sm font-semibold mb-2">Key Benefit</div>
                                <div className="text-lg font-bold">{benefit.savings}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {benefit.details.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center p-3 bg-gradient-to-r from-[#faf7f3] to-[#f5f2ef] rounded-lg border border-[#e2d5c4]"
                              >
                                <CheckCircle className="w-5 h-5 text-[#b69777] mr-3 flex-shrink-0" />
                                <span className="text-[#231c14]">{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Automation Scenarios */}
        <section className="py-20 bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
                Daily{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Automation
                </span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Your shading system learns your routine and automatically adjusts throughout the day for optimal comfort.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {automationScenarios.map((scenario, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                >
                  <div className="mb-6">
                    {scenario.icon}
                  </div>
                  <div className="text-2xl font-bold text-[#b69777] mb-2">{scenario.time}</div>
                  <div className="text-lg font-semibold text-white mb-3">{scenario.scenario}</div>
                  <div className="text-sm text-white/80 mb-4">{scenario.action}</div>
                  <div className="text-xs text-white/60">{scenario.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">24-Hour Automation Timeline</h3>
                <p className="text-white/80">See how your shading system adapts throughout the day</p>
              </div>
              
              <div className="relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 rounded-full"></div>
                <div className="flex justify-between items-center relative">
                  {automationScenarios.map((scenario, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="bg-[#b69777] w-4 h-4 rounded-full border-4 border-white/20 cursor-pointer"
                      title={`${scenario.time} - ${scenario.scenario}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Categories */}
        <section id="products" className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Smart Shading Products
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Professional-grade automated window treatments designed for modern homes and businesses.
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white shadow-lg'
                      : 'bg-white text-[#231c14] border border-[#e2d5c4] hover:border-[#b69777] hover:shadow-md'
                  }`}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </motion.button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border ${
                    product.highlight ? 'border-[#b69777] ring-2 ring-[#b69777]/20' : 'border-[#e2d5c4]'
                  }`}
                >
                  {product.highlight && (
                    <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="aspect-video bg-gradient-to-br from-[#faf7f3] to-[#f5f2ef] relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-[#231c14]">
                      {product.price}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-semibold ml-1">{product.rating}</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold">
                        {product.reviews} reviews
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#231c14] mb-2">{product.name}</h3>
                    <p className="text-[#6b5c47] mb-4 text-sm">{product.subtitle}</p>

                    <div className="space-y-2 mb-6">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-[#6b5c47]">
                          <CheckCircle className="w-4 h-4 text-[#b69777] mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="bg-gradient-to-br from-[#faf7f3] to-[#f5f2ef] rounded-lg p-3 border border-[#e2d5c4]">
                          <div className="text-[#6b5c47] capitalize">{key}</div>
                          <div className="font-semibold text-[#231c14]">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 px-4 py-3 rounded-xl font-semibold text-sm"
                        onClick={() => {
                          setSelectedProduct({ name: product.name, price: product.price });
                          setIsQuoteModalOpen(true);
                        }}
                      >
                        Get Quote
                      </button>
                      <button className="px-4 py-3 border border-[#e2d5c4] text-[#231c14] hover:border-[#b69777] hover:text-[#b69777] transition-colors rounded-xl font-semibold text-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Room Applications */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Perfect for Every Room
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Tailored shading solutions designed for the unique needs of each space in your home.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roomApplications.map((room, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#faf7f3] to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#e2d5c4]"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#f5f2ef] to-[#faf7f3] relative overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.room}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center mb-2">
                        {room.icon}
                        <span className="ml-2 font-semibold">{room.room}</span>
                      </div>
                      <div className="text-sm opacity-90">{room.solution}</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-[#6b5c47] mb-4">{room.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      {room.products.map((product, j) => (
                        <div key={j} className="flex items-center text-sm text-[#6b5c47]">
                          <CheckCircle className="w-4 h-4 text-[#b69777] mr-2 flex-shrink-0" />
                          <span>{product}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-[#b69777]">{room.price}</div>
                      <button
                        className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 px-4 py-2 rounded-lg font-semibold text-sm"
                        onClick={() => setIsQuoteModalOpen(true)}
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Process */}
        <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Professional Installation
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Our certified technicians ensure seamless installation and optimal performance of your smart shading system.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {installationSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#e2d5c4] hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      {step.step}
                    </div>
                    
                    <div className="mb-6 items-center justify-center">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#231c14] mb-3">{step.title}</h3>
                    <p className="text-[#6b5c47] mb-4">{step.description}</p>
                    
                    <div className="bg-gradient-to-r from-[#b69777]/10 to-[#907252]/10 rounded-lg p-3">
                      <div className="text-sm font-semibold text-[#b69777]">Duration: {step.duration}</div>
                    </div>
                  </div>
                  
                  {i < installationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-[#b69777]/30" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <button
                className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Schedule Installation
              </button>
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

export default SmartShading;