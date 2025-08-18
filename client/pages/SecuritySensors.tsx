import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import SEOHead from '../components/SEOHead';
import { securitySensorsSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Shield, 
  Camera, 
  Lock, 
  AlertTriangle, 
  Thermometer, 
  Eye, 
  Bell, 
  CheckCircle, 
  Star, 
  Phone, 
  Wifi,
  Play,
  Users,
  Layers,
  Zap,
  Home,
  Building2,
  ShieldCheck
} from 'lucide-react';

const SecuritySensors: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [activeLayer, setActiveLayer] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const securityProducts = [
  {
    id: 1,
    name: "Smart Lock V5 Face",
    category: "access",
    subtitle: "Fully Automatic Visual Smart Door Lock",
    image: "/images/products/security/smart-lock-v5-face.jpg",
    price: "£599",
    features: [
      "AI face recognition 3.0",
      "4-inch IPS HD internal screen",
      "Visual door viewer",
      "365 days battery life",
      "3 years replacement warranty"
    ],
    specs: {
      power: "Rechargeable Battery",
      connectivity: "WiFi, Bluetooth",
      installation: "Standard Door",
      security: "AI Recognition"
    },
    rating: 4.9,
    reviews: 234,
    highlight: true
  },
  {
    id: 2,
    name: "2K Wireless Smart IP Camera S2",
    category: "surveillance",
    subtitle: "Smart Security Linkage for the Full House",
    image: "/images/products/security/2k-wireless-smart-ip-camera.jpg",
    price: "£199",
    features: [
      "2K HD resolution",
      "360° pan and tilt",
      "Night vision",
      "Two-way audio",
      "Smart motion detection"
    ],
    specs: {
      power: "DC 12V / PoE",
      connectivity: "WiFi, Ethernet",
      installation: "Indoor/Outdoor",
      security: "Encryption"
    },
    rating: 4.7,
    reviews: 189,
    highlight: false
  },
  {
    id: 3,
    name: "Smart Door Lock S2",
    category: "access",
    subtitle: "More Safe And More Advanced",
    image: "/images/products/security/smart-door-lock-s2.jpg",
    price: "£399",
    features: [
      "Multiple unlock methods",
      "Fingerprint recognition",
      "PIN code access",
      "Mobile app control",
      "Emergency key backup"
    ],
    specs: {
      power: "AA Batteries",
      connectivity: "Zigbee, Bluetooth",
      installation: "Standard Door",
      security: "Biometric"
    },
    rating: 4.6,
    reviews: 156,
    highlight: false
  },
  {
    id: 4,
    name: "Smart Door Lock C1",
    category: "access",
    subtitle: "More Smart And Keep Your Home Safe",
    image: "/images/products/security/smart-door-lock-c1.jpg",
    price: "£299",
    features: [
      "Smart keypad entry",
      "Remote access control",
      "Auto-lock function",
      "Low battery alert",
      "Weather resistant"
    ],
    specs: {
      power: "AA Batteries",
      connectivity: "WiFi, Bluetooth",
      installation: "Standard Door",
      security: "PIN + App"
    },
    rating: 4.5,
    reviews: 143,
    highlight: false
  },
  {
    id: 5,
    name: "1080P IP Camera",
    category: "surveillance",
    subtitle: "HD camera monitor by 360° full-view navigation",
    image: "/images/products/security/1080p-ip-camera.jpg",
    price: "£129",
    features: [
      "1080P HD recording",
      "360° rotation",
      "Motion tracking",
      "Cloud storage",
      "Mobile alerts"
    ],
    specs: {
      power: "DC 12V",
      connectivity: "WiFi",
      installation: "Indoor",
      security: "WPA2"
    },
    rating: 4.4,
    reviews: 198,
    highlight: false
  },
  {
    id: 6,
    name: "Door Window Sensor",
    category: "environmental",
    subtitle: "Real-time monitor the door & window status",
    image: "/images/products/security/door-window-sensor.jpg",
    price: "£29",
    features: [
      "Instant notifications",
      "Long battery life",
      "Easy installation",
      "Smart home integration",
      "Tamper detection"
    ],
    specs: {
      power: "CR2032 Battery",
      connectivity: "Zigbee",
      installation: "Adhesive Mount",
      security: "Encrypted"
    },
    rating: 4.6,
    reviews: 267,
    highlight: false
  },
  {
    id: 7,
    name: "Temperature Humidity Sensor",
    category: "environmental",
    subtitle: "Real-time detect & adjust temperature & humidity",
    image: "/images/products/security/temprature-humidity-sensor.jpg",
    price: "£39",
    features: [
      "Precise measurements",
      "Historical data",
      "Smart automation",
      "Mobile notifications",
      "Compact design"
    ],
    specs: {
      power: "CR2032 Battery",
      connectivity: "Zigbee",
      installation: "Wall Mount",
      security: "Encrypted"
    },
    rating: 4.5,
    reviews: 178,
    highlight: false
  },
  {
    id: 8,
    name: "Zigbee Smoke Sensor",
    category: "emergency",
    subtitle: "Real-time monitor smoke to avoid potential risk",
    image: "/images/products/security/smoke-sensor.jpg",
    price: "£49",
    features: [
      "Early smoke detection",
      "Loud alarm",
      "Mobile alerts",
      "Self-testing",
      "10-year battery"
    ],
    specs: {
      power: "Lithium Battery",
      connectivity: "Zigbee",
      installation: "Ceiling Mount",
      security: "Certified"
    },
    rating: 4.8,
    reviews: 145,
    highlight: false
  },
  {
    id: 9,
    name: "Zigbee Water Leakage Sensor",
    category: "emergency",
    subtitle: "Real-time monitor water leakage",
    image: "/images/products/security/water-leakage-sensor.jpg",
    price: "£35",
    features: [
      "Water detection",
      "Instant alerts",
      "Flood prevention",
      "Easy placement",
      "Long battery life"
    ],
    specs: {
      power: "CR2032 Battery",
      connectivity: "Zigbee",
      installation: "Floor Placement",
      security: "IP67 Rated"
    },
    rating: 4.7,
    reviews: 123,
    highlight: false
  },
  {
    id: 10,
    name: "Zigbee Emergency Button",
    category: "emergency",
    subtitle: "One-key alarm trigger for SOS purpose",
    image: "/images/products/security/emergency-button.jpg",
    price: "£25",
    features: [
      "Panic button",
      "Instant alerts",
      "Portable design",
      "Easy activation",
      "Emergency contacts"
    ],
    specs: {
      power: "CR2032 Battery",
      connectivity: "Zigbee",
      installation: "Portable/Wall",
      security: "Priority Alert"
    },
    rating: 4.6,
    reviews: 89,
    highlight: false
  }
];

  const securityLayers = [
    {
      layer: "Perimeter Security",
      description: "First line of defense with door/window sensors and outdoor cameras",
      products: ["Door Window Sensor", "IP Camera S2"],
      icon: Shield,
      color: "from-[#b69777] to-[#907252]",
      active: activeLayer === 0
    },
    {
      layer: "Access Control",
      description: "Smart locks and biometric authentication for authorized entry",
      products: ["Smart Lock V5 Face", "Smart Door Lock S2"],
      icon: Lock,
      color: "from-blue-400 to-cyan-500",
      active: activeLayer === 1
    },
    {
      layer: "Interior Monitoring",
      description: "Indoor cameras and motion sensors for comprehensive coverage",
      products: ["1080P IP Camera", "Motion Sensors"],
      icon: Eye,
      color: "from-purple-400 to-pink-500",
      active: activeLayer === 2
    },
    {
      layer: "Environmental Safety",
      description: "Smoke, water, and gas sensors for hazard detection",
      products: ["Smoke Sensor", "Water Sensor", "Gas Sensor"],
      icon: AlertTriangle,
      color: "from-green-400 to-emerald-500",
      active: activeLayer === 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Shield },
    { id: 'access', name: 'Access Control', icon: Lock },
    { id: 'surveillance', name: 'Surveillance', icon: Camera },
    { id: 'environmental', name: 'Environmental', icon: Thermometer },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? securityProducts 
    : securityProducts.filter(product => product.category === selectedCategory);

  const monitoringPlans = [
    {
      name: "Basic Protection",
      price: "£9.99/month",
      features: [
        "24/7 monitoring",
        "Mobile app alerts",
        "Cloud storage (7 days)",
        "Email notifications",
        "Basic support"
      ],
      popular: false
    },
    {
      name: "Advanced Security",
      price: "£19.99/month",
      features: [
        "24/7 professional monitoring",
        "Police/Fire dispatch",
        "Cloud storage (30 days)",
        "SMS + Email alerts",
        "Priority support",
        "Video verification"
      ],
      popular: true
    },
    {
      name: "Premium Protection",
      price: "£29.99/month",
      features: [
        "24/7 professional monitoring",
        "Emergency response",
        "Unlimited cloud storage",
        "Multi-channel alerts",
        "Dedicated support",
        "AI threat detection",
        "Insurance discounts"
      ],
      popular: false
    }
  ];

  const installationSteps = [
    {
      icon: Users,
      title: "1. Security Assessment",
      description: "Professional evaluation of your home's security needs and vulnerabilities",
      detail: "Comprehensive security audit and recommendations"
    },
    {
      icon: Layers,
      title: "2. System Design",
      description: "Custom security system design tailored to your property layout",
      detail: "Strategic sensor and camera placement planning"
    },
    {
      icon: Zap,
      title: "3. Professional Installation",
      description: "Expert installation with minimal disruption to your daily routine",
      detail: "Certified technicians ensure optimal performance"
    },
    {
      icon: ShieldCheck,
      title: "4. System Activation",
      description: "Complete testing and activation with comprehensive training",
      detail: "24/7 monitoring begins immediately"
    }
  ];

  return (
    <>
      <SEOHead
        title={securitySensorsSEO.title}
        description={securitySensorsSEO.description}
        keywords={securitySensorsSEO.keywords}
        canonicalUrl={securitySensorsSEO.canonicalUrl}
        ogImage={securitySensorsSEO.ogImage}
        structuredData={securitySensorsSEO.structuredData}
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
                  <span className="text-[#b69777]">Security & Sensors</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="pt-14 pb-16 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1c0a00] via-[#361500] to-[#603601] backdrop-blur">
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
                  Orvibo Security Systems
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Protect What{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Matters Most
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  Advanced AI-powered security systems that integrate seamlessly with your smart walls. 
                  Experience comprehensive protection with intelligent monitoring and instant alerts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Secure My Home <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <button
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Security Plans <Play className="ml-2 h-5 w-5" />
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
                      src="/images/products/security.png"
                      alt="Smart security system with lock and camera"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {securityLayers.map((layer, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`text-center p-3 rounded-xl shadow-sm border transition-all duration-300 ${
                          layer.active 
                            ? 'bg-[#b69777]/20 border-[#b69777]/50' 
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <layer.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${
                          layer.active ? 'text-[#b69777]' : 'text-white/70'
                        }`} />
                        <p className="text-xs font-medium text-white/90">{layer.layer}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Security Layers Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Complete Security Ecosystem
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                From smart locks to environmental sensors, protect every aspect of your home with our integrated security solutions.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityLayers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group"
                >
                  <div className="text-center p-8 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${layer.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <layer.icon className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#231c14] mb-4">{layer.layer}</h3>
                    <p className="text-[#6b5c47] leading-relaxed mb-4">{layer.description}</p>
                    <div className="text-sm text-[#b69777] font-medium">
                      {layer.products.join(", ")}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section id="products" className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Security Product Collection
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Comprehensive security solutions designed to integrate seamlessly with your smart wall system.
              </p>
            </motion.div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white transform scale-105'
                      : 'bg-white border border-[#e2d5c4] text-[#6b5c47] hover:border-[#b69777]'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`group relative ${
                    product.highlight 
                      ? 'bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5 border-2 border-[#b69777]' 
                      : 'bg-white border border-[#e2d5c4]'
                  } rounded-2xl overflow-hidden hover:border-[#b69777] transition-all duration-300 hover:shadow-xl`}
                >
                  {product.highlight && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-74 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* <div className="absolute top-4 right-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.price}
                    </div> */}
                    {/* <div className="absolute bottom-4 left-4 flex items-center bg-black/70 rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-[#b69777] fill-current mr-1" />
                      <span className="text-white text-sm">{product.rating}</span>
                      <span className="text-white/70 text-sm ml-1">({product.reviews})</span>
                    </div> */}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-[#231c14]">{product.name}</h3>
                    <p className="text-[#b69777] mb-4 font-medium">{product.subtitle}</p>
                    
                    <div className="mb-4">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-[#b69777] mr-2 flex-shrink-0" />
                          <span className="text-[#6b5c47] text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-[#e2d5c4] pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-[#6b5c47]">Power:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.power}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Connectivity:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.connectivity}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Installation:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.installation}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Security:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.security}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 transform hover:scale-105"
                      onClick={() => {
                        setSelectedProduct({ name: product.name, price: product.price });
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
                Professional Installation Process
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                From security assessment to system activation, our expert team ensures comprehensive protection.
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

        {/* Monitoring Plans */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Professional Monitoring Plans
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Choose the level of protection that's right for your home and family.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {monitoringPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-[#b69777]/10 to-[#907252]/5 border-2 border-[#b69777] transform scale-105' 
                      : 'bg-white border border-[#e2d5c4]'
                  } rounded-2xl p-8 hover:border-[#b69777] transition-all duration-300 hover:shadow-xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#231c14] mb-4">{plan.name}</h3>
                    <div className="text-4xl font-extrabold text-[#b69777] mb-2">{plan.price}</div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#b69777] mr-3 flex-shrink-0" />
                        <span className="text-[#6b5c47]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777]'
                        : 'border border-[#b69777] text-[#b69777] hover:bg-[#b69777] hover:text-white'
                    }`}
                    onClick={() => {
                      setSelectedProduct({ name: plan.name, price: plan.price });
                      setIsQuoteModalOpen(true);
                    }}
                  >
                    Choose Plan
                  </button>
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
                Ready to Secure Your{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Smart Home?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get a free security assessment and professional installation for complete peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Security Assessment <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +44 141 739 3377
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
            productCategory="smart-devices"
            selectedProduct={selectedProduct}
          />
        )}
      </div>
    </>
  );
};

export default SecuritySensors;
