import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEOHead from '../components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import { smartHVACSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Thermometer, 
  Wind, 
  Snowflake, 
  Sun, 
  Zap, 
  Leaf, 
  Brain, 
  CheckCircle, 
  Star, 
  TrendingDown, 
  Calculator, 
  Play, 
  Info,
  Home,
  Building,
  Users,
  Clock,
  Shield,
  Gauge,
  Settings,
  Wifi,
  Smartphone,
  CloudSnow,
  Flame,
  Activity,
  BarChart3,
  Timer,
  Target,
  Award,
  Lightbulb,
  Eye,
  Layers
} from 'lucide-react';

const SmartHVAC: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('learning');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [activeZone, setActiveZone] = useState(0);
  const [temperatureDemo, setTemperatureDemo] = useState(22);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveZone((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tempInterval = setInterval(() => {
      setTemperatureDemo((prev) => {
        const variation = Math.random() * 2 - 1; // -1 to 1
        const newTemp = prev + variation;
        return Math.max(18, Math.min(26, newTemp));
      });
    }, 2000);
    return () => clearInterval(tempInterval);
  }, []);

  const hvacProducts = [
    {
      id: 1,
      name: "Central A/C Control Panel",
      category: "control",
      subtitle: "Adjust temperature by remote control A/C",
      image: "/images/central_ac_control_panel.webp",
      price: "£299",
      features: [
        "Remote temperature control",
        "Smart scheduling",
        "Energy monitoring",
        "Multi-zone support",
        "Voice control integration"
      ],
      specs: {
        compatibility: "Most HVAC Systems",
        connectivity: "WiFi, Zigbee",
        zones: "Up to 8 zones",
        control: "App, Voice, Panel"
      },
      rating: 4.7,
      reviews: 156,
      highlight: true
    },
    {
      id: 2,
      name: "Smart Thermostat Pro",
      category: "thermostat",
      subtitle: "AI-powered climate control with learning algorithms",
      image: "/images/smart-thermostat-pro.jpg",
      price: "£249",
      features: [
        "AI learning algorithms",
        "Geofencing technology",
        "Weather integration",
        "Energy reports",
        "Smart home integration"
      ],
      specs: {
        compatibility: "Universal",
        connectivity: "WiFi, Bluetooth",
        zones: "Single zone",
        control: "App, Voice, Touch"
      },
      rating: 4.8,
      reviews: 234,
      highlight: false
    },
    {
      id: 3,
      name: "Multi-Zone Climate Controller",
      category: "control",
      subtitle: "Advanced multi-zone temperature management",
      image: "/images/multi-zone-controller.jpg",
      price: "£499",
      features: [
        "Independent zone control",
        "Advanced scheduling",
        "Energy optimization",
        "Remote monitoring",
        "Professional installation"
      ],
      specs: {
        compatibility: "Ducted Systems",
        connectivity: "WiFi, Zigbee",
        zones: "Up to 12 zones",
        control: "App, Panel, Voice"
      },
      rating: 4.9,
      reviews: 89,
      highlight: false
    },
    {
      id: 4,
      name: "Smart Ventilation System",
      category: "ventilation",
      subtitle: "Intelligent air quality and ventilation management",
      image: "/images/smart-ventilation.jpg",
      price: "£399",
      features: [
        "Air quality monitoring",
        "Automatic ventilation",
        "Filter monitoring",
        "Energy recovery",
        "Smart scheduling"
      ],
      specs: {
        compatibility: "Most Ventilation",
        connectivity: "WiFi",
        zones: "Whole house",
        control: "App, Auto, Manual"
      },
      rating: 4.6,
      reviews: 112,
      highlight: false
    },
    {
      id: 5,
      name: "Heat Pump Controller",
      category: "heating",
      subtitle: "Efficient heat pump management and optimization",
      image: "/images/heat-pump-controller.jpg",
      price: "£349",
      features: [
        "Heat pump optimization",
        "Defrost cycle management",
        "Backup heating control",
        "Energy monitoring",
        "Weather compensation"
      ],
      specs: {
        compatibility: "Heat Pumps",
        connectivity: "WiFi, Modbus",
        zones: "Up to 4 zones",
        control: "App, Schedule, Auto"
      },
      rating: 4.7,
      reviews: 145,
      highlight: false
    },
    {
      id: 6,
      name: "Smart Radiator Valves",
      category: "heating",
      subtitle: "Individual room temperature control",
      image: "/images/smart-radiator-valves.jpg",
      price: "£89",
      features: [
        "Individual room control",
        "Automatic balancing",
        "Open window detection",
        "Schedule programming",
        "Energy savings"
      ],
      specs: {
        compatibility: "Most Radiators",
        connectivity: "Zigbee",
        zones: "Per radiator",
        control: "App, Schedule"
      },
      rating: 4.5,
      reviews: 198,
      highlight: false
    }
  ];

  const smartFeatures = [
    {
      id: 'learning',
      title: 'AI Learning Algorithms',
      description: 'Advanced AI that learns your preferences and optimizes automatically',
      icon: <Brain className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Learns your daily routines and preferences',
        'Automatically adjusts for optimal comfort',
        'Predicts heating and cooling needs',
        'Continuously improves efficiency over time'
      ],
      benefit: 'Up to 25% energy savings',
      color: "from-blue-400 to-cyan-500",
      stats: { efficiency: "25%", comfort: "98%", savings: "£450" }
    },
    {
      id: 'remote',
      title: 'Remote Control & Monitoring',
      description: 'Control your climate from anywhere in the world',
      icon: <Smartphone className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Smartphone app control with real-time updates',
        'Voice assistant integration (Alexa, Google)',
        'Geofencing automation for arrival/departure',
        'Real-time monitoring and alerts'
      ],
      benefit: 'Ultimate convenience',
      color: "from-orange-400 to-red-500",
      stats: { response: "< 1s", uptime: "99.9%", range: "Global" }
    },
    {
      id: 'scheduling',
      title: 'Smart Scheduling & Automation',
      description: 'Advanced scheduling with weather integration and occupancy detection',
      icon: <Timer className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Weather-based automatic adjustments',
        'Occupancy detection and room-by-room control',
        'Holiday mode and vacation scheduling',
        'Flexible time zones and custom programs'
      ],
      benefit: 'Optimized comfort',
      color: "from-yellow-400 to-orange-500",
      stats: { zones: "12", programs: "50+", accuracy: "95%" }
    },
    {
      id: 'analytics',
      title: 'Energy Analytics & Insights',
      description: 'Detailed insights into your energy usage patterns and optimization',
      icon: <BarChart3 className="w-8 h-8 text-[#b69777]" />,
      details: [
        'Real-time energy monitoring and tracking',
        'Historical usage reports and trends',
        'Cost tracking and budget management',
        'Efficiency recommendations and tips'
      ],
      benefit: 'Data-driven savings',
      color: "from-green-400 to-emerald-500",
      stats: { tracking: "Real-time", reports: "Daily", insights: "AI-powered" }
    }
  ];

  const climateZones = [
    {
      zone: "Living Room",
      temperature: 22,
      humidity: 45,
      status: "Optimal",
      icon: <Home className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      active: activeZone === 0
    },
    {
      zone: "Bedroom",
      temperature: 20,
      humidity: 50,
      status: "Sleep Mode",
      icon: <CloudSnow className="w-6 h-6" />,
      color: "from-blue-400 to-cyan-500",
      active: activeZone === 1
    },
    {
      zone: "Kitchen",
      temperature: 24,
      humidity: 40,
      status: "Cooking",
      icon: <Flame className="w-6 h-6" />,
      color: "from-orange-400 to-red-500",
      active: activeZone === 2
    },
    {
      zone: "Office",
      temperature: 21,
      humidity: 42,
      status: "Work Mode",
      icon: <Building className="w-6 h-6" />,
      color: "from-purple-400 to-pink-500",
      active: activeZone === 3
    }
  ];

  const efficiencyStats = [
    {
      metric: '30%',
      description: 'Average Energy Savings',
      icon: <Leaf className="w-8 h-8 text-[#b69777]" />,
      detail: 'Compared to traditional systems'
    },
    {
      metric: '£450',
      description: 'Annual Cost Reduction',
      icon: <Calculator className="w-8 h-8 text-[#b69777]" />,
      detail: 'Based on average UK household'
    },
    {
      metric: '2.5 Years',
      description: 'Average Payback Period',
      icon: <TrendingDown className="w-8 h-8 text-[#b69777]" />,
      detail: 'Return on investment timeline'
    },
    {
      metric: '15%',
      description: 'Home Value Increase',
      icon: <Star className="w-8 h-8 text-[#b69777]" />,
      detail: 'Smart home technology premium'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'control', name: 'Control Systems', icon: <Brain className="w-5 h-5" /> },
    { id: 'thermostat', name: 'Thermostats', icon: <Gauge className="w-5 h-5" /> },
    { id: 'heating', name: 'Heating', icon: <Sun className="w-5 h-5" /> },
    { id: 'ventilation', name: 'Ventilation', icon: <Wind className="w-5 h-5" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = selectedCategory === 'all' 
    ? hvacProducts 
    : hvacProducts.filter(product => product.category === selectedCategory);

  const governmentIncentives = [
    {
      program: "Green Homes Grant",
      description: "Up to £5,000 for energy efficiency improvements",
      eligibility: "Homeowners and landlords",
      savings: "Up to £5,000",
      icon: <Award className="w-6 h-6 text-[#b69777]" />
    },
    {
      program: "Renewable Heat Incentive",
      description: "Payments for renewable heating systems",
      eligibility: "Heat pump installations",
      savings: "£1,300/year",
      icon: <Leaf className="w-6 h-6 text-[#b69777]" />
    },
    {
      program: "Energy Company Obligation",
      description: "Free or subsidized heating improvements",
      eligibility: "Low income households",
      savings: "Up to £3,000",
      icon: <Lightbulb className="w-6 h-6 text-[#b69777]" />
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: "Energy Assessment",
      description: "Professional evaluation of your home's heating and cooling needs",
      icon: <Activity className="w-8 h-8 text-[#b69777]" />,
      duration: "1-2 hours"
    },
    {
      step: 2,
      title: "System Design",
      description: "Custom HVAC system design tailored to your home's layout",
      icon: <Layers className="w-8 h-8 text-[#b69777]" />,
      duration: "2-3 days"
    },
    {
      step: 3,
      title: "Professional Installation",
      description: "Expert installation with minimal disruption to your routine",
      icon: <Settings className="w-8 h-8 text-[#b69777]" />,
      duration: "1-2 days"
    },
    {
      step: 4,
      title: "System Optimization",
      description: "Complete testing, calibration, and user training",
      icon: <Target className="w-8 h-8 text-[#b69777]" />,
      duration: "2-4 hours"
    }
  ];

  return (
    <>
      <SEOHead
        title={smartHVACSEO.title}
        description={smartHVACSEO.description}
        keywords={smartHVACSEO.keywords}
        canonicalUrl={smartHVACSEO.canonicalUrl}
        ogImage={smartHVACSEO.ogImage}
        structuredData={smartHVACSEO.structuredData}
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
                <li><span className="text-[#b69777]">HVAC</span></li>
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
                  Smart HVAC Systems
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Perfect Climate,{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Intelligent Control
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  Advanced AI-powered climate control systems that learn your preferences and optimize energy usage. 
                  Experience the perfect balance of comfort, efficiency, and intelligent automation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Optimize My Climate <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <button
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Energy Audit <Calculator className="ml-2 h-5 w-5" />
                  </button>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-4 mt-12">
                  {efficiencyStats.slice(0, 3).map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    >
                      <div className="text-2xl font-bold text-[#b69777] mb-1">{stat.metric}</div>
                      <div className="text-xs text-white/80">{stat.description}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                  {/* Live Temperature Display */}
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-white mb-2">
                      {temperatureDemo.toFixed(1)}°C
                    </div>
                    <div className="text-white/70">Current Temperature</div>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-4">
                      <motion.div
                        className="bg-gradient-to-r from-[#b69777] to-[#907252] h-2 rounded-full"
                        style={{ width: `${((temperatureDemo - 18) / 8) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Zone Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    {climateZones.map((zone, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ 
                          opacity: 1, 
                          scale: zone.active ? 1.05 : 1,
                          backgroundColor: zone.active ? 'rgba(182, 151, 119, 0.2)' : 'rgba(255, 255, 255, 0.1)'
                        }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="p-4 rounded-xl border border-white/20 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between mb-2">
                          {zone.icon}
                          <span className="text-xs text-white/70">{zone.status}</span>
                        </div>
                        <div className="text-sm font-medium text-white">{zone.zone}</div>
                        <div className="text-lg font-bold text-[#b69777]">{zone.temperature}°C</div>
                        <div className="text-xs text-white/60">{zone.humidity}% humidity</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Smart Features */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Intelligent Climate Features
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Advanced AI technology that makes your HVAC system truly smart, learning your preferences and optimizing for comfort and efficiency.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-4">
                  {smartFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => setSelectedFeature(feature.id)}
                      whileHover={{ scale: 1.02 }}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                        selectedFeature === feature.id
                          ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white shadow-xl'
                          : 'bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] text-[#231c14] hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        {feature.icon}
                        <h3 className="text-xl font-bold ml-4">{feature.title}</h3>
                      </div>
                      <p className={`mb-4 ${selectedFeature === feature.id ? 'text-white/90' : 'text-[#6b5c47]'}`}>
                        {feature.description}
                      </p>
                      {selectedFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          {feature.details.map((detail, i) => (
                            <div key={i} className="flex items-center text-white/80">
                              <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{detail}</span>
                            </div>
                          ))}
                          <div className="mt-4 p-3 bg-white/10 rounded-lg">
                            <div className="text-sm font-semibold text-white">{feature.benefit}</div>
                            <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                              {Object.entries(feature.stats).map(([key, value]) => (
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
                  {smartFeatures.map((feature) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedFeature === feature.id ? 1 : 0 }}
                      className={`${selectedFeature === feature.id ? 'block' : 'hidden'}`}
                    >
                      <div className={`aspect-video bg-gradient-to-br ${feature.color} rounded-2xl p-6 mb-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            {feature.icon}
                            <h3 className="text-2xl font-bold ml-4">{feature.title}</h3>
                          </div>
                          <p className="text-white/90 mb-6">{feature.description}</p>
                          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                            <div className="text-sm font-semibold mb-2">Key Benefit</div>
                            <div className="text-lg font-bold">{feature.benefit}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {feature.details.map((detail, i) => (
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
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Energy Efficiency Stats */}
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
                Proven Energy{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Efficiency
                </span>
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Real data from thousands of installations showing significant energy savings and improved comfort.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {efficiencyStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                >
                  <div className="mb-6">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.metric}</div>
                  <div className="text-lg font-semibold text-[#b69777] mb-2">{stat.description}</div>
                  <div className="text-sm text-white/70">{stat.detail}</div>
                </motion.div>
              ))}
            </div>

            {/* Interactive Energy Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Calculate Your Potential Savings</h3>
                <p className="text-white/80">See how much you could save with smart HVAC automation</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#b69777] mb-2">£1,200</div>
                  <div className="text-white/80">Current Annual Cost</div>
                </div>
                <div className="text-center">
                  <ArrowRight className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <div className="text-white/60">Smart Optimization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">£750</div>
                  <div className="text-white/80">Optimized Annual Cost</div>
                  <div className="text-sm text-green-400 mt-1">Save £450/year</div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Personalized Quote
                </button>
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
                Smart HVAC Products
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Professional-grade climate control systems designed for modern homes and businesses.
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
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#231c14]">{product.name}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-[#6b5c47] ml-1">{product.rating}</span>
                      </div>
                    </div>
                    
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

        {/* Installation Process */}
        <section className="py-20 bg-white">
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
                Our certified technicians ensure seamless installation and optimal performance of your smart HVAC system.
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
                  <div className="bg-gradient-to-br from-[#faf7f3] to-white rounded-2xl p-8 shadow-lg border border-[#e2d5c4] hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      {step.step}
                    </div>
                    
                    <div className="mb-6">
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
          </div>
        </section>

        {/* Government Incentives */}
        <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Government Incentives
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Take advantage of available grants and incentives to reduce the cost of your smart HVAC upgrade.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {governmentIncentives.map((incentive, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#e2d5c4]"
                >
                  <div className="flex items-center mb-6">
                    {incentive.icon}
                    <h3 className="text-xl font-bold text-[#231c14] ml-3">{incentive.program}</h3>
                  </div>
                  
                  <p className="text-[#6b5c47] mb-4">{incentive.description}</p>
                  
                  <div className="bg-gradient-to-br from-[#faf7f3] to-[#f5f2ef] rounded-lg p-4 mb-4 border border-[#e2d5c4]">
                    <div className="text-sm text-[#6b5c47] mb-1">Eligibility</div>
                    <div className="font-semibold text-[#231c14]">{incentive.eligibility}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#b69777] mb-1">{incentive.savings}</div>
                    <div className="text-sm text-[#6b5c47]">Potential Savings</div>
                  </div>
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
                Check My Eligibility
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

export default SmartHVAC;
