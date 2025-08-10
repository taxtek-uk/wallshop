import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  ShieldCheck, 
  ThermometerSun, 
  Tv, 
  Volume2, 
  Mic2, 
  Wind, 
  ScanFace, 
  RadioTower, 
  Waves, 
  Maximize2, 
  CirclePower, 
  ArrowRight, 
  Speaker, 
  SunDim, 
  Lock,
  Sparkles,
  Zap,
  Settings,
  Home,
  Building2,
  Smartphone,
  Wifi,
  Brain,
  Eye,
  Gauge,
  Sun,
  Moon,
  Shield,
  Camera,
  Thermometer,
  AlertTriangle,
  Play,
  CheckCircle,
  Star,
  Award,
  Users,
  Clock,
  Battery,
  VolumeX
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SmartShowcase from "@/components/smart-devices/SmartShowcase";
import Footer from "@/components/Footer";

export default function SmartDevices() {
  // Enhanced smart device categories with detailed information
  const deviceCategories = [
    {
      id: "control-panels",
      title: "Control Panels",
      subtitle: "Command Your Entire Smart Home",
      description: "From voice control to whole-house automation, discover the brain of your smart home system with Orvibo's revolutionary MixPad series.",
      icon: Settings,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      route: "/smart-devices/orvibo/control-panels",
      image: "/images/products/mix-pad-x.png",
      features: [
        "Voice Integration (Alexa, Google)",
        "Multi-protocol Support (Zigbee, WiFi, Matter)",
        "Full Screen Control Interface",
        "Whole House Automation"
      ],
      priceRange: "From £149",
      highlight: true,
      stats: { products: "7+", zones: "Up to 12", warranty: "5 years" }
    },
    {
      id: "switches",
      title: "Smart Switches",
      subtitle: "Where Technology Meets Artistry",
      description: "Upgrade your walls with intelligent switches that blend seamlessly into luxury interiors. Experience the perfect fusion of form and function.",
      icon: Zap,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      route: "/smart-devices/orvibo/switches",
      image: "/images/products/defy-series.png",
      features: [
        "Dual-screen Intelligent Display",
        "200 Keystrokes Professional Adjustment",
        "MixCtrl™ 2.0 Button Technology",
        "Multiple Premium Finishes"
      ],
      priceRange: "From £49",
      highlight: false,
      stats: { series: "6", colors: "12+", installation: "No rewiring" }
    },
    {
      id: "lighting",
      title: "Smart Lighting",
      subtitle: "Illuminate Your World Intelligently",
      description: "From natural daylight simulation to mood-perfect ambiance, control every photon in your home with lighting that adapts to your lifestyle.",
      icon: Lightbulb,
      gradient: "from-yellow-500 to-amber-600",
      bgGradient: "from-yellow-50 to-amber-50",
      route: "/smart-devices/orvibo/lighting",
      image: "/images/products/sky-dome.png",
      features: [
        "Natural Lighting & Blue-sky Technology",
        "Circadian Rhythm Support",
        "RGB Color Changing",
        "Energy Efficient LED"
      ],
      priceRange: "From £29",
      highlight: false,
      stats: { modes: "4+", colors: "16M+", lifespan: "50,000h" }
    },
    {
      id: "security-sensors",
      title: "Security & Sensors",
      subtitle: "Protect What Matters Most",
      description: "Advanced AI-powered security systems that integrate seamlessly with your smart walls. Experience comprehensive protection with intelligent monitoring.",
      icon: ShieldCheck,
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50",
      route: "/smart-devices/orvibo/security-sensors",
      image: "/images/products/security/smart-lock-v5-face.jpg",
      features: [
        "AI Face Recognition 3.0",
        "2K HD Resolution Cameras",
        "Real-time Environmental Monitoring",
        "Emergency Alert Systems"
      ],
      priceRange: "From £25",
      highlight: false,
      stats: { recognition: "AI 3.0", battery: "365 days", warranty: "3 years" }
    },
    {
      id: "shading",
      title: "Smart Shading",
      subtitle: "Intelligent Curtain Control",
      description: "Transform your home with Orvibo's award-winning smart curtain motors. Experience whisper-quiet automation and energy-saving intelligence.",
      icon: Wind,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      route: "/smart-devices/orvibo/shading",
      image: "/images/products/smart-curtain-motor-kit.jpg",
      features: [
        "Rechargeable 6-month Battery Life",
        "Ultra-quiet Operation < 30dB",
        "Voice Control Integration",
        "No Wiring Installation"
      ],
      priceRange: "From £79",
      highlight: false,
      stats: { battery: "6 months", noise: "< 30dB", load: "50kg" }
    },
    {
      id: "hvac",
      title: "Smart HVAC",
      subtitle: "Perfect Climate, Intelligent Control",
      description: "Advanced AI-powered climate control systems that learn your preferences and optimize energy usage for the perfect balance of comfort and efficiency.",
      icon: ThermometerSun,
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      route: "/smart-devices/orvibo/hvac",
      image: "/images/products/smart-hvac.jpg",
      features: [
        "AI Learning Algorithms",
        "Multi-zone Climate Control",
        "Energy Analytics & Insights",
        "Weather Integration"
      ],
      priceRange: "From £89",
      highlight: false,
      stats: { savings: "30%", zones: "12", payback: "2.5 years" }
    }
  ];

  // Enhanced smart features with more comprehensive information
  const smartFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      desc: "Advanced machine learning algorithms that adapt to your lifestyle, learning your preferences and optimizing your home automatically for maximum comfort and efficiency.",
      gradient: "from-purple-400 to-indigo-500",
      stats: "25% energy savings"
    },
    {
      icon: Smartphone,
      title: "Universal App Control",
      desc: "Control every aspect of your smart home from anywhere in the world with our intuitive mobile app, featuring real-time monitoring and instant notifications.",
      gradient: "from-blue-400 to-cyan-500",
      stats: "Global access"
    },
    {
      icon: Mic2,
      title: "Voice Assistant Integration",
      desc: "Seamlessly works with Alexa, Google Assistant, and Siri for hands-free control. Create custom voice commands and routines for ultimate convenience.",
      gradient: "from-green-400 to-emerald-500",
      stats: "3 voice platforms"
    },
    {
      icon: Wifi,
      title: "Multi-Protocol Connectivity",
      desc: "Advanced networking with Zigbee 3.0, WiFi 6, Matter, and Thread support ensures reliable communication and future-proof compatibility.",
      gradient: "from-orange-400 to-red-500",
      stats: "4+ protocols"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      desc: "Bank-level encryption and security protocols protect your privacy and data, with regular security updates and monitoring for peace of mind.",
      gradient: "from-red-400 to-pink-500",
      stats: "256-bit encryption"
    },
    {
      icon: Zap,
      title: "Instant Scene Automation",
      desc: "Create and customize unlimited scenes that control multiple devices simultaneously. From 'Good Morning' to 'Movie Night' - one touch does it all.",
      gradient: "from-yellow-400 to-amber-500",
      stats: "Unlimited scenes"
    },
    {
      icon: Clock,
      title: "Advanced Scheduling",
      desc: "Intelligent scheduling with weather integration, occupancy detection, and geofencing. Your home anticipates your needs before you even think of them.",
      gradient: "from-teal-400 to-cyan-500",
      stats: "Smart automation"
    },
    {
      icon: Award,
      title: "Professional Installation",
      desc: "Certified technicians ensure perfect installation and integration with your existing systems. Comprehensive training and ongoing support included.",
      gradient: "from-indigo-400 to-purple-500",
      stats: "Certified experts"
    }
  ];

  // System benefits with quantified value propositions
  const systemBenefits = [
    {
      icon: Home,
      title: "Whole Home Integration",
      description: "Seamlessly connect and control all your smart devices from a single, elegant interface",
      value: "Complete ecosystem",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Battery,
      title: "Energy Optimization",
      description: "Reduce energy consumption by up to 30% with intelligent automation and monitoring",
      value: "£450+ annual savings",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Family-Friendly Design",
      description: "Intuitive controls that everyone can use, from children to grandparents",
      value: "Universal usability",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Building2,
      title: "Property Value Increase",
      description: "Smart home technology can increase property value by up to 15%",
      value: "15% value boost",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background with enhanced gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/images/luxury-living-room.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full opacity-50"
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-40"
            animate={{
              y: [0, -25, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Enhanced badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-500/30 text-amber-100 px-6 py-3 rounded-full text-sm font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Orvibo Smart Ecosystem
                <Zap className="w-4 h-4" />
              </motion.div>

              {/* Enhanced heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-black text-white leading-tight"
              >
                Transform Your Home{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                    Into Intelligence
                  </span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </span>
              </motion.h1>

              {/* Enhanced description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl lg:text-2xl text-slate-200 leading-relaxed max-w-2xl"
              >
                Experience the future of living with Orvibo's comprehensive smart home ecosystem. From intelligent lighting and climate control to advanced security and automation - create a home that thinks, learns, and adapts to you.
              </motion.p>

              {/* Enhanced buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a 
                  href="#categories" 
                  className="group relative bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    Explore Smart Devices 
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                
                <motion.a 
                  href="#features" 
                  className="group relative bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 text-lg rounded-2xl font-bold flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Smart Features 
                  <Play className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </motion.div>

              {/* Quick stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-wrap gap-8 pt-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">50+</div>
                  <div className="text-sm text-slate-300">Smart Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">6</div>
                  <div className="text-sm text-slate-300">Device Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">30%</div>
                  <div className="text-sm text-slate-300">Energy Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">5 Years</div>
                  <div className="text-sm text-slate-300">Warranty</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced image section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.4 }} 
              className="relative"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <img 
                  src="/images/smart-panel.png" 
                  alt="Smart Control Panel" 
                  className="relative rounded-3xl shadow-2xl border border-white/20 backdrop-blur-sm" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Device Categories Section */}
      <section id="categories" className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-full text-sm font-medium mb-8"
            >
              <Home className="w-4 h-4" />
              Complete Smart Home Categories
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-8 leading-tight">
              Discover Your Perfect Smart Home Solution
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Explore our comprehensive range of intelligent devices designed to transform every aspect of your home into a connected, efficient, and secure living space.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deviceCategories.map((category, index) => (
              <motion.div 
                key={category.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={category.route}>
                  <motion.div 
                    className={`h-full bg-gradient-to-br ${category.bgGradient} border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden relative ${category.highlight ? 'ring-2 ring-amber-400 ring-opacity-50' : ''}`}
                    whileHover={{ y: -8 }}
                  >
                    {/* Highlight badge */}
                    {category.highlight && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                        Most Popular
                      </div>
                    )}

                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Product image */}
                    <div className="relative h-58 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="p-8">
                      {/* Icon with enhanced styling */}
                      <motion.div 
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <category.icon className="text-white w-8 h-8" />
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                      
                      <h3 className="relative text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="relative text-lg font-semibold text-slate-600 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                        {category.subtitle}
                      </p>
                      
                      <p className="relative text-slate-600 leading-relaxed mb-6 group-hover:text-slate-700 transition-colors duration-300">
                        {category.description}
                      </p>

                      {/* Key features */}
                      <div className="space-y-2 mb-6">
                        {category.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* Stats and price */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <div className="text-sm text-slate-500">
                          {Object.entries(category.stats).map(([key, value], idx) => (
                            <div key={key} className="inline-block mr-4">
                              <span className="font-semibold">{value}</span> {key}
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-800">{category.priceRange}</div>
                          <div className="flex items-center text-amber-500 text-sm font-medium">
                            Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-full text-sm font-medium mb-8"
            >
              <Zap className="w-4 h-4" />
              Advanced Smart Features
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-8 leading-tight">
              Intelligence That Adapts To You
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Experience cutting-edge technology that learns your preferences, anticipates your needs, and creates the perfect environment for every moment of your day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smartFeatures.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div 
                  className="h-full bg-white border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl rounded-3xl p-8 text-center relative overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with enhanced styling */}
                  <motion.div 
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className="text-white w-8 h-8" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {item.desc}
                  </p>
                  
                  {/* Stats badge */}
                  <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 text-slate-600 px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 text-amber-500" />
                    {item.stats}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 text-slate-600 px-6 py-3 rounded-full text-sm font-medium mb-8"
            >
              <Award className="w-4 h-4" />
              System Benefits
            </motion.div>
            
            <h2 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-8 leading-tight">
              Why Choose Orvibo Smart Home
            </h2>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Experience the tangible benefits of a truly integrated smart home system designed for modern living.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {systemBenefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div 
                  className="h-full bg-white border border-slate-200 hover:border-slate-300 transition-all duration-500 hover:shadow-2xl rounded-3xl p-8 text-center relative overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with enhanced styling */}
                  <motion.div 
                    className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <benefit.icon className="text-white w-8 h-8" />
                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  <h3 className="relative text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed mb-4 group-hover:text-slate-700 transition-colors duration-300">
                    {benefit.description}
                  </p>
                  
                  {/* Value badge */}
                  <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-bold">
                    <Sparkles className="w-4 h-4" />
                    {benefit.value}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}

