import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import SEOHead from '../components/SEOHead';
import { smartSwitchesSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Zap, 
  Palette, 
  Smartphone, 
  CheckCircle, 
  Star, 
  Filter, 
  Grid, 
  List,
  Play,
  Users,
  Layers,
  Settings,
  Home,
  Building2,
  Bed,
  Bath,
  ChefHat,
  Wrench,
  MousePointer,
  Plug
} from 'lucide-react';

const SmartSwitches: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const switches = [
    {
      id: 1,
      name: "Defy Series Smart Switch",
      series: "defy",
      subtitle: "Dual-screen intelligent switch",
      image: "/images/defy_series_smart_switch.webp",
      price: "£89",
      priceRange: "£89 - £149",
      features: [
        "Dual-screen intelligent display",
        "200 keystrokes professional adjustment",
        "Hand paint material spraying process",
        "MixCtrl™ 2.0 button technology",
        "Zigbee smart lighting control"
      ],
      specs: {
        protocol: "Zigbee 3.0",
        power: "200W",
        installation: "Standard UK box",
        finish: "Multiple premium finishes"
      },
      colors: ["Matte Black", "Champagne Gold", "Pearl White", "Graphite"],
      rating: 4.8,
      reviews: 124,
      highlight: true
    },
    {
      id: 2,
      name: "Bach Series Smart Switch",
      series: "bach",
      subtitle: "Zigbee light switch",
      image: "/images/bach_series_smart_switch.webp",
      price: "£69",
      priceRange: "£69 - £99",
      features: [
        "Elegant minimalist design",
        "Touch-sensitive controls",
        "Scene management",
        "Energy monitoring",
        "Voice control compatible"
      ],
      specs: {
        protocol: "Zigbee 3.0",
        power: "150W",
        installation: "Standard UK box",
        finish: "Premium materials"
      },
      colors: ["Classic White", "Warm Gold", "Cool Silver"],
      rating: 4.7,
      reviews: 89,
      highlight: false
    },
    {
      id: 3,
      name: "Super Smart Switch",
      series: "super",
      subtitle: "Technology and Aesthetics Wall Art Upgrade",
      image: "/images/super_smart_switch.webp",
      price: "£129",
      priceRange: "£129 - £199",
      features: [
        "Advanced wall art design",
        "Multi-touch interface",
        "Customizable LED indicators",
        "Premium build quality",
        "Smart home integration"
      ],
      specs: {
        protocol: "Zigbee 3.0, WiFi",
        power: "300W",
        installation: "Standard UK box",
        finish: "Luxury finishes"
      },
      colors: ["Midnight Black", "Rose Gold", "Titanium", "Copper"],
      rating: 4.9,
      reviews: 156,
      highlight: false
    },
    {
      id: 4,
      name: "Smart WiFi Switch A10",
      series: "wifi",
      subtitle: "Lights & scene control",
      image: "/images/wifi-switch-a10.jpg",
      price: "£49",
      priceRange: "£49 - £79",
      features: [
        "WiFi connectivity",
        "Timing & countdown functions",
        "Amazon Alexa & Google Assistant",
        "Voice, APP and button control",
        "Easy installation"
      ],
      specs: {
        protocol: "WiFi 2.4GHz",
        power: "100W",
        installation: "Standard UK box",
        finish: "Standard finishes"
      },
      colors: ["White", "Black"],
      rating: 4.5,
      reviews: 67,
      highlight: false
    },
    {
      id: 5,
      name: "Smart Dimmer Switch A11",
      series: "dimmer",
      subtitle: "Wireless remote control with LED indicators",
      image: "/images/dimmer-switch-a11.jpg",
      price: "£79",
      priceRange: "£79 - £109",
      features: [
        "Wireless remote control",
        "LED indicators for darkness",
        "Sunrise/sunset automation",
        "Timer and countdown",
        "Vacation mode"
      ],
      specs: {
        protocol: "RF 433MHz",
        power: "200W",
        installation: "Standard UK box",
        finish: "Premium finish"
      },
      colors: ["White", "Ivory", "Black"],
      rating: 4.6,
      reviews: 92,
      highlight: false
    },
    {
      id: 6,
      name: "MixPad D1 Voice Switch",
      series: "mixpad",
      subtitle: "Voice control touchscreen switch",
      image: "/images/mixpad-d1-switch.jpg",
      price: "£159",
      priceRange: "£159 - £229",
      features: [
        "Voice control & touchscreen",
        "Home talk intercom system",
        "Built-in light sensor",
        "Multiple control options",
        "Personalized scenes"
      ],
      specs: {
        protocol: "Zigbee 3.0, WiFi",
        power: "400W",
        installation: "Standard UK box",
        finish: "Premium touchscreen"
      },
      colors: ["Piano Black", "Pearl White"],
      rating: 4.8,
      reviews: 143,
      highlight: false
    }
  ];

  const designGallery = [
    {
      room: "Living Room",
      image: "/images/living-room-switches.jpg",
      description: "Elegant control in luxury settings",
      icon: Home
    },
    {
      room: "Kitchen",
      image: "/images/kitchen-switches.jpg",
      description: "Functional beauty for culinary spaces",
      icon: ChefHat
    },
    {
      room: "Bedroom",
      image: "/images/bedroom-switches.jpg",
      description: "Sophisticated ambiance control",
      icon: Bed
    },
    {
      room: "Bathroom",
      image: "/images/bathroom-switches.jpg",
      description: "Moisture-resistant luxury",
      icon: Bath
    }
  ];

  const filteredSwitches = selectedSeries === 'all' 
    ? switches 
    : switches.filter(sw => sw.series === selectedSeries);

  const series = [
    { id: 'all', name: 'All Series', count: switches.length },
    { id: 'defy', name: 'Defy Series', count: switches.filter(s => s.series === 'defy').length },
    { id: 'bach', name: 'Bach Series', count: switches.filter(s => s.series === 'bach').length },
    { id: 'super', name: 'Super Series', count: switches.filter(s => s.series === 'super').length },
    { id: 'wifi', name: 'WiFi Series', count: switches.filter(s => s.series === 'wifi').length },
    { id: 'dimmer', name: 'Dimmer Series', count: switches.filter(s => s.series === 'dimmer').length },
    { id: 'mixpad', name: 'MixPad Series', count: switches.filter(s => s.series === 'mixpad').length }
  ];

  const installationSteps = [
    {
      icon: Wrench,
      title: "1. Remove Old Switch",
      description: "Simply unscrew your existing switch - no special tools required",
      detail: "Standard screwdriver is all you need",
      active: activeStep === 0
    },
    {
      icon: MousePointer,
      title: "2. Connect Wires",
      description: "Use existing wiring - no rewiring needed for most installations",
      detail: "Clear instructions included with every switch",
      active: activeStep === 1
    },
    {
      icon: Plug,
      title: "3. Install Switch",
      description: "Secure the new smart switch in place using standard mounting",
      detail: "Fits standard UK electrical boxes",
      active: activeStep === 2
    },
    {
      icon: Zap,
      title: "4. Connect & Control",
      description: "Pair with app and start controlling your lights intelligently",
      detail: "Instant smart home integration",
      active: activeStep === 3
    }
  ];

  const professionalSteps = [
    {
      icon: Users,
      title: "1. Design Consultation",
      description: "Expert assessment of your switch placement and smart home needs",
      detail: "Personalized recommendations for optimal control"
    },
    {
      icon: Settings,
      title: "2. System Configuration",
      description: "Pre-configure switches with scenes and automation schedules",
      detail: "Custom setup tailored to your lifestyle"
    },
    {
      icon: Layers,
      title: "3. Professional Installation",
      description: "Certified electricians ensure safe and perfect installation",
      detail: "Seamless integration with smart wall systems"
    },
    {
      icon: Zap,
      title: "4. System Activation",
      description: "Complete testing and training on your new switch system",
      detail: "Immediate smart control functionality"
    }
  ];

  return (
    <>
      <SEOHead
        title={smartSwitchesSEO.title}
        description={smartSwitchesSEO.description}
        keywords={smartSwitchesSEO.keywords}
        canonicalUrl={smartSwitchesSEO.canonicalUrl}
        ogImage={smartSwitchesSEO.ogImage}
        structuredData={smartSwitchesSEO.structuredData}
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
                  <span className="text-[#b69777]">Switches</span>
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
                  Orvibo Smart Switches
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Where Technology{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Meets Artistry
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  Upgrade your walls with intelligent switches that blend seamlessly into luxury interiors. 
                  Experience the perfect fusion of form and function with Orvibo's award-winning switch collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Shop Smart Switches <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <button
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("installation")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    See Installation Guide <Play className="ml-2 h-5 w-5" />
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
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-2xl p-4 text-center">
                      <img src="/images/traditional-switch.jpg" alt="Traditional switch" className="w-full h-24 object-cover rounded-lg mb-2" />
                      <p className="text-white/70 text-sm">Traditional Switch</p>
                    </div>
                    <div className="bg-[#b69777]/20 rounded-2xl p-4 text-center border border-[#b69777]/50">
                      <img src="/images/orvibo-smart-switch.jpg" alt="Orvibo smart switch" className="w-full h-24 object-cover rounded-lg mb-2" />
                      <p className="text-[#b69777] text-sm font-semibold">Orvibo Smart Switch</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {installationSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`text-center p-3 rounded-xl shadow-sm border transition-all duration-300 ${
                          step.active 
                            ? 'bg-[#b69777]/20 border-[#b69777]/50' 
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <step.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${
                          step.active ? 'text-[#b69777]' : 'text-white/70'
                        }`} />
                        <p className="text-xs font-medium text-white/90">{step.title.split('. ')[1]}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Installation Process Section */}
        <section id="installation" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Transform Any Room in Minutes
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Revolutionary installation process that requires no rewiring for most setups.
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

        {/* Product Showcase */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Featured Switch Series
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Discover our premium collections designed for every style and need.
              </p>
            </motion.div>
            
            {/* Series Filter and View Toggle */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
              <div className="flex flex-wrap gap-2">
                {series.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSeries(s.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedSeries === s.id
                        ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white'
                        : 'bg-white border border-[#e2d5c4] text-[#6b5c47] hover:border-[#b69777]'
                    }`}
                  >
                    {s.name} ({s.count})
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white' 
                      : 'bg-white border border-[#e2d5c4] text-[#6b5c47]'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white' 
                      : 'bg-white border border-[#e2d5c4] text-[#6b5c47]'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-6"
            }>
              {filteredSwitches.map((switchItem, index) => (
                <motion.div
                  key={switchItem.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group relative ${
                    switchItem.highlight 
                      ? 'bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5 border-2 border-[#b69777]' 
                      : 'bg-white border border-[#e2d5c4]'
                  } rounded-2xl overflow-hidden hover:border-[#b69777] transition-all duration-300 hover:shadow-xl ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {switchItem.highlight && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                    <img 
                      src={switchItem.image} 
                      alt={switchItem.name}
                      className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                      }`}
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {switchItem.priceRange}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center bg-black/70 rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-[#b69777] fill-current mr-1" />
                      <span className="text-white text-sm">{switchItem.rating}</span>
                      <span className="text-white/70 text-sm ml-1">({switchItem.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-[#231c14]">{switchItem.name}</h3>
                    <p className="text-[#b69777] mb-4 font-medium">{switchItem.subtitle}</p>
                    
                    <div className="mb-4">
                      {switchItem.features.slice(0, viewMode === 'list' ? 5 : 3).map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-[#b69777] mr-2 flex-shrink-0" />
                          <span className="text-[#6b5c47] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-[#e2d5c4] pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-[#6b5c47]">Protocol:</span>
                          <p className="text-[#231c14] font-medium text-xs">{switchItem.specs.protocol}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Power:</span>
                          <p className="text-[#231c14] font-medium">{switchItem.specs.power}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Installation:</span>
                          <p className="text-[#231c14] font-medium text-xs">{switchItem.specs.installation}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Finish:</span>
                          <p className="text-[#231c14] font-medium text-xs">{switchItem.specs.finish}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-[#6b5c47] text-sm">Available Colors:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {switchItem.colors.map((color, i) => (
                          <span key={i} className="text-xs bg-[#b69777]/10 text-[#b69777] px-2 py-1 rounded">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        setSelectedProduct({ name: switchItem.name, price: switchItem.price });
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

        {/* Design Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Design Gallery
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                See how our smart switches enhance different room aesthetics.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {designGallery.map((room, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img 
                        src={room.image} 
                        alt={`${room.room} switches`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <room.icon className="w-8 h-8 text-[#b69777] mr-3" />
                        <h3 className="text-xl font-bold text-[#231c14]">{room.room}</h3>
                      </div>
                      <p className="text-[#6b5c47] leading-relaxed">{room.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Installation */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Professional Installation Service
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                For complex installations or complete smart wall integration, our certified professionals ensure perfect results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {professionalSteps.map((step, i) => (
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
                Ready to Upgrade Your{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Wall Controls?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your home with intelligent switches that combine luxury design with smart functionality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Design Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Installation Video
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

export default SmartSwitches;