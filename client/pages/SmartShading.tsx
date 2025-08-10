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
  Zap,
  Shield,
  Star,
  Calculator,
  Play,
  Info,
  Home,
  Building,
  Sunrise,
  Activity,
  Smartphone,
  Wifi,
  Settings,
  Award,
  Layers,
  VolumeX,
  Battery,
  Mic,
  Cpu,
  RotateCcw,
  Wrench,
  ShoppingCart,
  Heart,
  Share2,
  PhoneCall,
  Sparkles,
  Wind,
  Signal
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
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
          newLight = 30 + Math.sin((hour - 6) / 12 * Math.PI) * 50 + Math.random() * 20;
        } else {
          newLight = 5 + Math.random() * 15;
        }
        setLightLevel(Math.max(0, Math.min(100, newLight)));
        
        const targetPosition = newLight > 70 ? 30 : newLight < 20 ? 90 : 60;
        setCurtainPosition(prev => {
          const diff = targetPosition - prev;
          return prev + diff * 0.1;
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

  // Updated product data based on Orvibo analysis
  const shadingProducts = [
    {
      id: 1,
      name: "Smart Curtain Motor Kit",
      category: "curtain",
      subtitle: "Rechargeable mini but powerful smart curtain motor with voice control",
      image: "/images/products/smart-curtain-motor-kit.jpg",
      price: "£199",
      originalPrice: "£249",
      features: [
        "Rechargeable 2200mAh Li-ion battery",
        "6 months battery life per charge",
        "Voice control (Alexa, Google Assistant)",
        "Ultra-quiet operation < 30dB",
        "Easy installation without wiring",
        "50kg maximum load capacity",
        "Soft touch start activation",
        "Automatic memorized limit function"
      ],
      specs: {
        model: "W50CZ",
        size: "250×35×35mm",
        power: "Rechargeable Li-ion 2200mAh",
        load: "Up to 50kg",
        noise: "< 30dB",
        control: "App, Voice, Remote, Touch",
        protocol: "ZigBee HA, RF 433MHz",
        warranty: "2 years"
      },
      rating: 4.8,
      reviews: 156,
      highlight: true,
      badge: "Best Seller",
      keyFeatures: [
        { icon: <Battery className="w-5 h-5" />, text: "6 months battery life" },
        { icon: <Mic className="w-5 h-5" />, text: "Voice control ready" },
        { icon: <VolumeX className="w-5 h-5" />, text: "Ultra-quiet < 30dB" },
        { icon: <Zap className="w-5 h-5" />, text: "No wiring required" }
      ]
    },
    {
      id: 2,
      name: "Smart Curtain Motor",
      category: "curtain",
      subtitle: "High-end smart curtain pioneer with unibody aluminum case",
      image: "/images/products/smart-curtain-motor.jpg",
      price: "£299",
      originalPrice: "£349",
      features: [
        "Unibody aluminum alloy case",
        "5-year warranty & service",
        "100m ZigBee signal coverage",
        "Strong 50kg bearing capacity",
        "Advanced DC motor with precision",
        "Voice control integration",
        "Tender touch start",
        "Smart obstruction detection"
      ],
      specs: {
        model: "W40CZ",
        size: "293×78×45mm",
        power: "AC 100-240V, 72W",
        load: "Up to 50kg",
        noise: "< 35dB",
        control: "App, Voice, Remote",
        protocol: "ZigBee 2.4G, 433.92MHz",
        warranty: "5 years"
      },
      rating: 4.9,
      reviews: 189,
      highlight: false,
      badge: "Premium",
      keyFeatures: [
        { icon: <Award className="w-5 h-5" />, text: "5-year warranty" },
        { icon: <Signal className="w-5 h-5" />, text: "100m coverage" },
        { icon: <Cpu className="w-5 h-5" />, text: "Aluminum unibody" },
        { icon: <Shield className="w-5 h-5" />, text: "Obstruction detection" }
      ]
    },
    {
      id: 3,
      name: "ZigBee Multi-functional Relay",
      category: "control",
      subtitle: "Transform existing motors into smart curtain systems",
      image: "/images/products/zigbee.jpg",
      price: "£79",
      originalPrice: "£99",
      features: [
        "Three working modes support",
        "ZigBee automatic networking",
        "Power off memory function",
        "Mesh networking capability",
        "Scene automation support",
        "Easy retrofit installation",
        "Multi-device control",
        "100m working distance"
      ],
      specs: {
        model: "CM10ZW",
        size: "70×70×23mm",
        power: "AC 100-240V, 50-60Hz",
        load: "1A per loop",
        noise: "Silent operation",
        control: "App, Voice, Automation",
        protocol: "ZigBee HA 2.4GHz",
        warranty: "2 years"
      },
      rating: 4.5,
      reviews: 98,
      highlight: false,
      badge: "Smart Upgrade",
      keyFeatures: [
        { icon: <RotateCcw className="w-5 h-5" />, text: "Retrofit existing motors" },
        { icon: <Wifi className="w-5 h-5" />, text: "Auto networking" },
        { icon: <Settings className="w-5 h-5" />, text: "Three working modes" },
        { icon: <Layers className="w-5 h-5" />, text: "Mesh networking" }
      ]
    }
  ];

  const lifestyleBenefits = [
    {
      id: 'energy',
      title: 'Energy Efficiency',
      description: 'Reduce heating and cooling costs by up to 30% with intelligent automation',
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
      id: 'convenience',
      title: 'Voice Control & Automation',
      description: 'Effortless control with Alexa, Google Assistant, and smart scheduling',
      icon: <Mic className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Voice control integration with Alexa and Google Assistant',
        'Smartphone app control from anywhere in the world',
        'Automated schedules based on sunrise/sunset',
        'Scene integration with lighting and music systems'
      ],
      savings: 'Ultimate convenience',
      color: "from-blue-400 to-cyan-500",
      stats: { control: "Global", voices: "2+", scenes: "Unlimited" }
    },
    {
      id: 'quiet',
      title: 'Ultra-Quiet Operation',
      description: 'Whisper-quiet motors under 30dB for peaceful living',
      icon: <VolumeX className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Advanced DC motors with precision engineering',
        'Operation noise below 30dB (library quiet)',
        'No disturbance during sleep or work',
        '15,000+ operation cycles tested for reliability'
      ],
      savings: 'Peaceful environment',
      color: "from-purple-400 to-pink-500",
      stats: { noise: "< 30dB", cycles: "15,000+", lifetime: "20 years" }
    },
    {
      id: 'installation',
      title: 'Easy Installation',
      description: 'No wiring, no damage - simple setup in minutes',
      icon: <Wrench className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Battery-powered operation eliminates wiring needs',
        'No damage to walls or existing curtain boxes',
        'Compatible with traditional curtain systems',
        'Professional installation available'
      ],
      savings: 'Hassle-free setup',
      color: "from-orange-400 to-red-500",
      stats: { wiring: "None", damage: "Zero", time: "< 1 hour" }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Sun className="w-5 h-5" />, count: shadingProducts.length },
    { id: 'curtain', name: 'Curtain Motors', icon: <Wind className="w-5 h-5" />, count: shadingProducts.filter(p => p.category === 'curtain').length },
    { id: 'control', name: 'Control Systems', icon: <Zap className="w-5 h-5" />, count: shadingProducts.filter(p => p.category === 'control').length }
  ];

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

  const handleQuoteRequest = (product: { name: string, price: string }) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
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
        <div className="bg-gradient-to-r from-[#231c14]/95 to-[#2a1f17]/95 py-4 pt-24 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link to="/" className="text-white/70 hover:text-[#b69777] transition-colors duration-300">
                    <Home className="w-4 h-4" />
                  </Link>
                </li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li>
                  <Link to="/smart-devices" className="text-white/70 hover:text-[#b69777] transition-colors duration-300">
                    Smart Devices
                  </Link>
                </li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li><span className="text-white/70">Orvibo</span></li>
                <li><ArrowRight className="w-4 h-4 text-white/50" /></li>
                <li><span className="text-[#b69777] font-medium">Smart Shading</span></li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
       <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/smart-curtain.jpg')" }}
        >
          {/* Existing overlays */}
          <div className="absolute inset-0 opacity-98">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/90"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#231c14]/80 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center py-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-6 py-3 rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Orvibo Smart Shading Collection</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Intelligent
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#b69777] to-[#907252]">
                    Curtain Control
                  </span>
                </h1>
                
                <p className="text-xl text-white/80 leading-relaxed max-w-2xl">
                  Transform your home with Orvibo's award-winning smart curtain motors. 
                  Experience whisper-quiet automation, voice control, and energy-saving intelligence 
                  that adapts to your lifestyle.
                </p>

                <div className="flex flex-wrap gap-6 text-white/70">
                  <div className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-[#b69777]" />
                    <span>Voice Control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VolumeX className="w-5 h-5 text-[#b69777]" />
                    <span>Ultra-Quiet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="w-5 h-5 text-[#b69777]" />
                    <span>6 Months Battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#b69777]" />
                    <span>5-Year Warranty</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Shop Collection
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    See Benefits
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b69777]/20 to-[#907252]/20 rounded-3xl"></div>
                  
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">Smart Control Demo</h3>
                      <div className="flex items-center gap-2 text-white/70">
                        {isAutoMode ? (
                          <><Activity className="w-4 h-4 text-green-400" /> Auto</>
                        ) : (
                          <><Settings className="w-4 h-4 text-blue-400" /> Manual</>
                        )}
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Light Level</span>
                        <span className="text-[#b69777] font-semibold">{Math.round(lightLevel)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                          style={{ width: `${lightLevel}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">Curtain Position</span>
                        <span className="text-[#b69777] font-semibold">{Math.round(curtainPosition)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-[#b69777] to-[#907252] h-2 rounded-full"
                          style={{ width: `${curtainPosition}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setIsAutoMode(!isAutoMode)}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          isAutoMode 
                            ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                            : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        <Activity className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">Auto Mode</span>
                      </button>
                      
                      <button className="p-4 rounded-xl bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 transition-all duration-300">
                        <Smartphone className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm">App Control</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
       <section id="benefits" className="py-28 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
  <div className="container mx-auto px-4 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-4xl lg:text-6xl font-extrabold text-[#231c14] mb-8 tracking-tight">
        Why Choose Orvibo Smart Shading?
      </h2>
      <p className="text-xl lg:text-2xl text-[#231c14]/75 max-w-4xl mx-auto leading-relaxed">
        Experience the perfect blend of innovation, convenience, and energy efficiency 
        with our award-winning smart curtain systems.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      {lifestyleBenefits.map((benefit, index) => (
        <motion.div
          key={benefit.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.15 }}
          viewport={{ once: true }}
          whileHover={{ y: -15, boxShadow: '0 20px 40px rgba(201, 193, 184, 0.25)' }}
          className="relative bg-white rounded-3xl p-10 shadow-lg border border-[#b69777]/20 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-8 shadow-md`}>
            {React.cloneElement(benefit.icon, { className: 'w-8 h-8 text-white' })}
          </div>
          
          <h3 className="text-2xl font-bold text-[#231c14] mb-5">{benefit.title}</h3>
          <p className="text-[#231c14]/80 mb-8 leading-relaxed max-w-[280px]">
            {benefit.description}
          </p>
          
          <div className="w-full space-y-4">
            {Object.entries(benefit.stats).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center border-t border-[#b69777]/10 pt-3 first:border-t-0">
                <span className="text-sm text-[#231c14]/60 font-medium capitalize tracking-wide">{key.replace(/_/g, ' ')}</span>
                <span className="font-semibold text-[#b69777] text-lg">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


        {/* Products Section */}
      
  <section id="products" className="py-24 bg-white">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-[#231c14] mb-6">
          Our Smart Shading Collection
        </h2>
        <p className="text-xl text-[#231c14]/70 max-w-3xl mx-auto">
          Discover the perfect smart curtain solution for your home. 
          From battery-powered convenience to premium aluminum motors.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white shadow-lg'
                : 'bg-[#f8f6f3] text-[#231c14] hover:bg-[#b69777]/10'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              selectedCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-[#b69777]/20 text-[#b69777]'
            }`}>
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="wait">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(182, 151, 119, 0.3)' }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-400 overflow-hidden border border-[#b69777]/20 group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-t-3xl aspect-[4/3] bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold tracking-wide shadow-md">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors duration-300"
                  >
                    <Heart className="w-5 h-5 text-[#231c14]" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5 text-[#231c14]" />
                  </motion.button>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-extrabold text-[#231c14] mb-3 leading-tight">{product.name}</h3>
                <p className="text-[#231c14]/80 mb-6 flex-grow">{product.subtitle}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[#231c14]/70 text-base">
                      <div className="text-[#b69777]">{feature.icon}</div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuoteRequest(product)}
                  className="mt-auto bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Calculator className="w-5 h-5" />
                  Get Quotation
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  </section>

        {/* Automation Scenarios */}
        <section className="py-24 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#231c14] mb-6">
                Smart Automation Scenarios
              </h2>
              <p className="text-xl text-[#231c14]/70 max-w-3xl mx-auto">
                Your curtains learn your routine and automatically adjust throughout the day 
                for optimal comfort, privacy, and energy efficiency.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {automationScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.scenario}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-[#b69777]/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#b69777]/20 to-[#907252]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {scenario.icon}
                  </div>
                  
                  <div className="text-2xl font-bold text-[#b69777] mb-2">{scenario.time}</div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-3">{scenario.scenario}</h3>
                  <p className="text-[#231c14]/70 mb-4">{scenario.description}</p>
                  <div className="text-sm text-[#b69777] font-medium">{scenario.action}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/30 to-[#907252]/30"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                Ready to Transform Your Home?
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Join thousands of satisfied customers who have upgraded to Orvibo smart shading. 
                Experience the perfect blend of convenience, energy savings, and modern luxury.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-10 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                >
                  <Calculator className="w-5 h-5" />
                  Get Free Quote
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                >
                  <PhoneCall className="w-5 h-5" />
                  Call Expert: +44 141 739 3377
                </motion.button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#b69777] mb-2">5,000+</div>
                  <div className="text-white/70">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#b69777] mb-2">99.8%</div>
                  <div className="text-white/70">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#b69777] mb-2">5 Years</div>
                  <div className="text-white/70">Warranty Coverage</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Quote Modal */}
        <QuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          selectedProduct={selectedProduct}
        />
      </div>
    </>
  );
};

export default SmartShading;
