import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal';
import SEOHead from '../components/SEOHead';
import { smartLightingSEO } from '../utils/seoData';
import { 
  ArrowRight, 
  Sun, 
  Moon, 
  Lightbulb, 
  Palette, 
  Clock, 
  Zap, 
  CheckCircle, 
  Star, 
  Play,
  Users,
  Layers,
  Settings,
  Home,
  Building2,
  Bed,
  Bath,
  ChefHat,
  Sunrise,
  Sunset
} from 'lucide-react';

const SmartLighting: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<string>('morning');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string, price: string }>({ name: '', price: '' });
  const [activeRoom, setActiveRoom] = useState(0);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoom((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const lightingProducts = [
    {
      id: 1,
      name: "Sky Dome Pro Ceiling Light",
      category: "ceiling",
      subtitle: "Natural Lighting, Ultimate Aesthetics",
      image: "/images/sky_dome_pro_ceiling_light.webp",
      price: "£299",
      features: [
        "Four lighting modes",
        "Blue-sky optical technology",
        "RG0 grade no-blue light",
        "Quick installation patented technology",
        "Circadian rhythm support"
      ],
      specs: {
        power: "36W",
        colorTemp: "2700K-6500K",
        brightness: "3600lm",
        control: "App, Voice, Panel"
      },
      rating: 4.9,
      reviews: 187,
      highlight: true
    },
    {
      id: 2,
      name: "SOPRO Smart Decorative Lights",
      category: "decorative",
      subtitle: "Zigbee smart lights",
      image: "/images/sopro_smart_decorative_lights.webp",
      price: "£149",
      features: [
        "Multiple decorative styles",
        "RGB color changing",
        "Scene synchronization",
        "Energy efficient LED",
        "Easy installation"
      ],
      specs: {
        power: "12W",
        colorTemp: "RGB + Warm White",
        brightness: "1200lm",
        control: "App, Voice"
      },
      rating: 4.7,
      reviews: 143,
      highlight: false
    },
    {
      id: 3,
      name: "S Series Smart Lights",
      category: "professional",
      subtitle: "Professional smart home lighting",
      image: "/images/s_series_smart_lights.webp",
      price: "£89",
      features: [
        "Professional grade quality",
        "Tunable white technology",
        "Dimming capabilities",
        "Long lifespan",
        "Smart home integration"
      ],
      specs: {
        power: "9W",
        colorTemp: "2700K-5000K",
        brightness: "900lm",
        control: "App, Switch, Voice"
      },
      rating: 4.6,
      reviews: 98,
      highlight: false
    },
    {
      id: 4,
      name: "Smart LED Light",
      category: "bulbs",
      subtitle: "First choice for full house lighting, restore true colors",
      image: "/images/smart_led_light.webp",
      price: "£29",
      features: [
        "True color restoration",
        "Energy efficient",
        "Long lasting",
        "Easy replacement",
        "Multiple base types"
      ],
      specs: {
        power: "9W",
        colorTemp: "2700K-6500K",
        brightness: "800lm",
        control: "App, Voice"
      },
      rating: 4.5,
      reviews: 234,
      highlight: false
    },
    {
      id: 5,
      name: "MixDimmer",
      category: "control",
      subtitle: "ORVIBO Smart Dimmer Switch with Touchscreen",
      image: "/images/mixdimmer.jpg",
      price: "£119",
      features: [
        "Touchscreen control",
        "Smooth dimming",
        "Scene presets",
        "Voice control",
        "Energy monitoring"
      ],
      specs: {
        power: "300W Load",
        colorTemp: "Variable",
        brightness: "0-100%",
        control: "Touch, App, Voice"
      },
      rating: 4.8,
      reviews: 156,
      highlight: false
    },
    {
      id: 6,
      name: "ZigBee RGB Relay",
      category: "control",
      subtitle: "Change temperature and brightness of RGB lights with APP",
      image: "/images/zigbee-rgb-relay.jpg",
      price: "£79",
      features: [
        "RGB color control",
        "Brightness adjustment",
        "Temperature control",
        "App integration",
        "Scene automation"
      ],
      specs: {
        power: "144W Load",
        colorTemp: "RGB Full Spectrum",
        brightness: "0-100%",
        control: "App, Voice, Panel"
      },
      rating: 4.6,
      reviews: 89,
      highlight: false
    }
  ];

  const lightingScenes = [
    {
      id: 'morning',
      name: 'Morning Energize',
      description: 'Bright, cool lighting to start your day',
      color: 'from-blue-400 to-white',
      temperature: '6500K',
      brightness: '100%',
      mood: 'Energizing',
      icon: Sunrise
    },
    {
      id: 'evening',
      name: 'Evening Relax',
      description: 'Warm, dim lighting for relaxation',
      color: 'from-orange-400 to-yellow-300',
      temperature: '2700K',
      brightness: '30%',
      mood: 'Relaxing',
      icon: Sunset
    },
    {
      id: 'entertainment',
      name: 'Entertainment Mode',
      description: 'Dynamic, colorful lighting for fun',
      color: 'from-purple-500 to-pink-500',
      temperature: 'RGB',
      brightness: '80%',
      mood: 'Dynamic',
      icon: Palette
    },
    {
      id: 'security',
      name: 'Security Mode',
      description: 'Automated lighting patterns for security',
      color: 'from-red-500 to-orange-500',
      temperature: '4000K',
      brightness: 'Variable',
      mood: 'Protective',
      icon: Zap
    }
  ];

  const roomSolutions = [
    {
      room: 'Living Room',
      image: '/images/living-room-lighting.jpg',
      products: ['Sky Dome Pro', 'SOPRO Decorative', 'MixDimmer'],
      description: 'Create the perfect ambiance for entertaining and relaxation',
      price: 'From £299',
      icon: Home,
      active: activeRoom === 0
    },
    {
      room: 'Bedroom',
      image: '/images/bedroom-lighting.jpg',
      products: ['Smart LED Lights', 'MixDimmer', 'RGB Relay'],
      description: 'Gentle lighting that supports your sleep cycle',
      price: 'From £149',
      icon: Bed,
      active: activeRoom === 1
    },
    {
      room: 'Kitchen',
      image: '/images/kitchen-lighting.jpg',
      products: ['S Series Lights', 'Smart LED', 'MixDimmer'],
      description: 'Bright task lighting for cooking and food preparation',
      price: 'From £199',
      icon: ChefHat,
      active: activeRoom === 2
    },
    {
      room: 'Bathroom',
      image: '/images/bathroom-lighting.jpg',
      products: ['Sky Dome Pro', 'Smart LED', 'MixDimmer'],
      description: 'Moisture-resistant lighting with perfect color rendering',
      price: 'From £179',
      icon: Bath,
      active: activeRoom === 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: Lightbulb },
    { id: 'ceiling', name: 'Ceiling Lights', icon: Sun },
    { id: 'decorative', name: 'Decorative', icon: Palette },
    { id: 'professional', name: 'Professional', icon: Zap },
    { id: 'bulbs', name: 'Smart Bulbs', icon: Lightbulb },
    { id: 'control', name: 'Controllers', icon: Clock }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? lightingProducts 
    : lightingProducts.filter(product => product.category === selectedCategory);

  const installationSteps = [
    {
      icon: Users,
      title: "1. Lighting Consultation",
      description: "Expert assessment of your lighting needs and room layouts",
      detail: "Personalized lighting design recommendations"
    },
    {
      icon: Settings,
      title: "2. System Configuration",
      description: "Pre-configure lighting scenes and automation schedules",
      detail: "Custom scenes tailored to your lifestyle"
    },
    {
      icon: Layers,
      title: "3. Professional Installation",
      description: "Expert installation with seamless smart wall integration",
      detail: "Certified electricians ensure safety and performance"
    },
    {
      icon: Zap,
      title: "4. Scene Activation",
      description: "Complete testing and training on your new lighting system",
      detail: "Immediate smart lighting control"
    }
  ];

  return (
    <>
      <SEOHead
        title={smartLightingSEO.title}
        description={smartLightingSEO.description}
        keywords={smartLightingSEO.keywords}
        canonicalUrl={smartLightingSEO.canonicalUrl}
        ogImage={smartLightingSEO.ogImage}
        structuredData={smartLightingSEO.structuredData}
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
                  <span className="text-[#b69777]">Lighting</span>
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
                  Orvibo Smart Lighting
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Illuminate Your World{" "}
                  <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                    Intelligently
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                  From natural daylight simulation to mood-perfect ambiance, control every photon in your home. 
                  Experience lighting that adapts to your lifestyle and enhances your wellbeing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Discover Lighting Solutions <ArrowRight className="ml-2 h-5 w-5" />
                  </button>

                  <button
                    className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                    onClick={() =>
                      document.getElementById("scenes")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Design My Lighting <Play className="ml-2 h-5 w-5" />
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
                  <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-6 shadow-md relative">
                    <img
                      src="/images/smart-lighting-hero.jpg"
                      alt="Smart lighting showcase"
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl hover:bg-black/50 transition-colors group">
                      <Play className="w-16 h-16 text-[#b69777] group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {roomSolutions.map((room, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className={`text-center p-3 rounded-xl shadow-sm border transition-all duration-300 ${
                          room.active 
                            ? 'bg-[#b69777]/20 border-[#b69777]/50' 
                            : 'bg-white/10 border-white/20'
                        }`}
                      >
                        <room.icon className={`w-6 h-6 mx-auto mb-2 transition-colors duration-300 ${
                          room.active ? 'text-[#b69777]' : 'text-white/70'
                        }`} />
                        <p className="text-xs font-medium text-white/90">{room.room}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lighting Scenes Interactive Section */}
        <section id="scenes" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Interactive Lighting Scenes
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Experience how different lighting scenes transform your space throughout the day.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-4">
                  {lightingScenes.map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => setSelectedScene(scene.id)}
                      className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                        selectedScene === scene.id
                          ? 'bg-gradient-to-r ' + scene.color + ' text-white shadow-xl transform scale-105'
                          : 'bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] text-[#231c14] hover:border-[#b69777]'
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <scene.icon className={`w-8 h-8 mr-4 ${
                          selectedScene === scene.id ? 'text-white' : 'text-[#b69777]'
                        }`} />
                        <h3 className="text-xl font-bold">{scene.name}</h3>
                      </div>
                      <p className={`mb-4 ${
                        selectedScene === scene.id ? 'text-white/90' : 'text-[#6b5c47]'
                      }`}>
                        {scene.description}
                      </p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className={selectedScene === scene.id ? 'text-white/70' : 'text-[#6b5c47]'}>
                            Temperature:
                          </span>
                          <p className="font-semibold">{scene.temperature}</p>
                        </div>
                        <div>
                          <span className={selectedScene === scene.id ? 'text-white/70' : 'text-[#6b5c47]'}>
                            Brightness:
                          </span>
                          <p className="font-semibold">{scene.brightness}</p>
                        </div>
                        <div>
                          <span className={selectedScene === scene.id ? 'text-white/70' : 'text-[#6b5c47]'}>
                            Mood:
                          </span>
                          <p className="font-semibold">{scene.mood}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <motion.div
                key={selectedScene}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${lightingScenes.find(s => s.id === selectedScene)?.color} rounded-3xl p-8 shadow-2xl`}>
                  <img 
                    src={`/images/lighting-scene-${selectedScene}.jpg`}
                    alt={`${selectedScene} lighting scene`}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="mt-6 text-center">
                    <h4 className="text-2xl font-bold text-white mb-2">
                      {lightingScenes.find(s => s.id === selectedScene)?.name}
                    </h4>
                    <p className="text-white/90">
                      {lightingScenes.find(s => s.id === selectedScene)?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Complete Lighting Ecosystem
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                From ceiling fixtures to smart bulbs, discover our comprehensive range of intelligent lighting solutions.
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
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {product.price}
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center bg-black/70 rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-[#b69777] fill-current mr-1" />
                      <span className="text-white text-sm">{product.rating}</span>
                      <span className="text-white/70 text-sm ml-1">({product.reviews})</span>
                    </div>
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
                          <p className="text-[#231c14] font-medium">{product.specs.power}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Color Temp:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.colorTemp}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Brightness:</span>
                          <p className="text-[#231c14] font-medium">{product.specs.brightness}</p>
                        </div>
                        <div>
                          <span className="text-[#6b5c47]">Control:</span>
                          <p className="text-[#231c14] font-medium text-xs">{product.specs.control}</p>
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

        {/* Room Solutions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
                Room-by-Room Solutions
              </h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
                Tailored lighting packages designed for every space in your home.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {roomSolutions.map((room, index) => (
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
                        alt={`${room.room} lighting`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#b69777] to-[#907252] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {room.price}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <room.icon className="w-8 h-8 text-[#b69777] mr-3" />
                        <h3 className="text-xl font-bold text-[#231c14]">{room.room}</h3>
                      </div>
                      
                      <p className="text-[#6b5c47] mb-4 leading-relaxed">{room.description}</p>
                      
                      <div className="mb-4">
                        <span className="text-[#6b5c47] text-sm">Includes:</span>
                        <p className="text-[#b69777] font-medium text-sm">{room.products.join(", ")}</p>
                      </div>
                      
                      <button 
                        className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white py-3 rounded-lg font-semibold hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 transform hover:scale-105"
                        onClick={() => {
                          setSelectedProduct({ name: `${room.room} Lighting Package`, price: room.price });
                          setIsQuoteModalOpen(true);
                        }}
                      >
                        Design {room.room}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                From lighting consultation to scene activation, our expert team creates the perfect ambiance.
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
                  Lighting Experience?
                </span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Get expert lighting consultation and professional installation for the perfect ambiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Lighting Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
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

export default SmartLighting;
