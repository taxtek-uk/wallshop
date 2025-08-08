import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { smartLightingSEO } from '../utils/seoData';
import { ArrowRight, Sun, Moon, Lightbulb, Palette, Clock, Zap, CheckCircle, Star, Play } from 'lucide-react';

const SmartLighting: React.FC = () => {
  const [selectedScene, setSelectedScene] = useState<string>('morning');

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
      reviews: 187
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
      reviews: 143
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
      reviews: 98
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
      reviews: 234
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
      reviews: 156
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
      reviews: 89
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
      mood: 'Energizing'
    },
    {
      id: 'evening',
      name: 'Evening Relax',
      description: 'Warm, dim lighting for relaxation',
      color: 'from-orange-400 to-yellow-300',
      temperature: '2700K',
      brightness: '30%',
      mood: 'Relaxing'
    },
    {
      id: 'entertainment',
      name: 'Entertainment Mode',
      description: 'Dynamic, colorful lighting for fun',
      color: 'from-purple-500 to-pink-500',
      temperature: 'RGB',
      brightness: '80%',
      mood: 'Dynamic'
    },
    {
      id: 'security',
      name: 'Security Mode',
      description: 'Automated lighting patterns for security',
      color: 'from-red-500 to-orange-500',
      temperature: '4000K',
      brightness: 'Variable',
      mood: 'Protective'
    }
  ];

  const roomSolutions = [
    {
      room: 'Living Room',
      image: '/images/living-room-lighting.jpg',
      products: ['Sky Dome Pro', 'SOPRO Decorative', 'MixDimmer'],
      description: 'Create the perfect ambiance for entertaining and relaxation',
      price: 'From £299'
    },
    {
      room: 'Bedroom',
      image: '/images/bedroom-lighting.jpg',
      products: ['Smart LED Lights', 'MixDimmer', 'RGB Relay'],
      description: 'Gentle lighting that supports your sleep cycle',
      price: 'From £149'
    },
    {
      room: 'Kitchen',
      image: '/images/kitchen-lighting.jpg',
      products: ['S Series Lights', 'Smart LED', 'MixDimmer'],
      description: 'Bright task lighting for cooking and food preparation',
      price: 'From £199'
    },
    {
      room: 'Bathroom',
      image: '/images/bathroom-lighting.jpg',
      products: ['Sky Dome Pro', 'Smart LED', 'MixDimmer'],
      description: 'Moisture-resistant lighting with perfect color rendering',
      price: 'From £179'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'ceiling', name: 'Ceiling Lights', icon: <Sun className="w-5 h-5" /> },
    { id: 'decorative', name: 'Decorative', icon: <Palette className="w-5 h-5" /> },
    { id: 'professional', name: 'Professional', icon: <Zap className="w-5 h-5" /> },
    { id: 'bulbs', name: 'Smart Bulbs', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'control', name: 'Controllers', icon: <Clock className="w-5 h-5" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = selectedCategory === 'all' 
    ? lightingProducts 
    : lightingProducts.filter(product => product.category === selectedCategory);

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
      <div className="min-h-screen bg-black text-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li><ArrowRight className="w-4 h-4 text-gray-400" /></li>
              <li>
                <Link to="/smart-devices" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  Smart Devices
                </Link>
              </li>
              <li><ArrowRight className="w-4 h-4 text-gray-400" /></li>
              <li><span className="text-gray-400">Orvibo</span></li>
              <li><ArrowRight className="w-4 h-4 text-gray-400" /></li>
              <li><span className="text-[#D4AF37]">Lighting</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section with Video Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            muted 
            loop 
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/dynamic-lighting.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent">
                Orvibo Smart Lighting
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Illuminate Your World Intelligently
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                From natural daylight simulation to mood-perfect ambiance, control every photon in your home. 
                Experience lighting that adapts to your lifestyle and enhances your wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Discover Lighting Solutions
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  Design My Lighting
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl p-8">
                <img 
                  src="/images/smart-lighting-hero.jpg" 
                  alt="Smart lighting showcase"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-2xl hover:bg-black/50 transition-colors group">
                  <Play className="w-16 h-16 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lighting Categories */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete Lighting Ecosystem</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From ceiling fixtures to smart bulbs, discover our comprehensive range of intelligent lighting solutions.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#D4AF37] text-black transform scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-black rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {product.price}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/70 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-current mr-1" />
                    <span className="text-white text-sm">{product.rating}</span>
                    <span className="text-gray-300 text-sm ml-1">({product.reviews})</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{product.name}</h3>
                  <p className="text-[#D4AF37] mb-4">{product.subtitle}</p>
                  <div className="mb-4">
                    {product.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Power:</span>
                        <p className="text-white">{product.specs.power}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Color Temp:</span>
                        <p className="text-white text-xs">{product.specs.colorTemp}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Brightness:</span>
                        <p className="text-white">{product.specs.brightness}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Control:</span>
                        <p className="text-white text-xs">{product.specs.control}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood & Scene Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Interactive Lighting Scenes</h2>
            <p className="text-xl text-gray-400">Experience how different lighting scenes transform your space</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                {lightingScenes.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      selectedScene === scene.id
                        ? 'bg-gradient-to-r ' + scene.color + ' text-black'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{scene.name}</h3>
                    <p className={`mb-4 ${selectedScene === scene.id ? 'text-black/80' : 'text-gray-400'}`}>
                      {scene.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className={selectedScene === scene.id ? 'text-black/60' : 'text-gray-500'}>Temperature:</span>
                        <p className="font-semibold">{scene.temperature}</p>
                      </div>
                      <div>
                        <span className={selectedScene === scene.id ? 'text-black/60' : 'text-gray-500'}>Brightness:</span>
                        <p className="font-semibold">{scene.brightness}</p>
                      </div>
                      <div>
                        <span className={selectedScene === scene.id ? 'text-black/60' : 'text-gray-500'}>Mood:</span>
                        <p className="font-semibold">{scene.mood}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className={`w-full h-96 rounded-3xl bg-gradient-to-br ${lightingScenes.find(s => s.id === selectedScene)?.color} p-8 transition-all duration-500`}>
                <div className="bg-black/20 rounded-2xl h-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-black mb-4">
                      {lightingScenes.find(s => s.id === selectedScene)?.name}
                    </h3>
                    <p className="text-black/80 text-lg">
                      {lightingScenes.find(s => s.id === selectedScene)?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Advanced Lighting Technology</h2>
            <p className="text-xl text-gray-400">Cutting-edge features that make our lighting truly intelligent</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Sun className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Circadian Rhythm</h3>
              <p className="text-gray-400">Automatically adjusts color temperature throughout the day to support your natural sleep cycle</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Palette className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">True Color Rendering</h3>
              <p className="text-gray-400">CRI 95+ ensures colors appear natural and vibrant under our lighting</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Zap className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Energy Efficiency</h3>
              <p className="text-gray-400">Up to 80% energy savings compared to traditional lighting with smart scheduling</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Clock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Smart Automation</h3>
              <p className="text-gray-400">Learns your patterns and automatically adjusts lighting based on occupancy and time</p>
            </div>
          </div>
          
          {/* Energy Savings Calculator */}
          <div className="mt-16 bg-black rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">Energy Savings Calculator</h3>
              <p className="text-gray-400">See how much you could save with smart lighting</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">£240</div>
                <p className="text-gray-400">Average Annual Savings</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">75%</div>
                <p className="text-gray-400">Energy Reduction</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">15 Years</div>
                <p className="text-gray-400">LED Lifespan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room-by-Room Solutions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Perfect Lighting for Every Room</h2>
            <p className="text-xl text-gray-400">Tailored solutions designed for specific spaces and activities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomSolutions.map((room, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.room}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {room.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{room.room}</h3>
                  <p className="text-gray-400 mb-4">{room.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Recommended Products:</p>
                    <div className="flex flex-wrap gap-2">
                      {room.products.map((product, idx) => (
                        <span key={idx} className="bg-gray-800 text-[#D4AF37] px-3 py-1 rounded-full text-sm">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                    Design {room.room} Lighting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Design Service */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Professional Lighting Design Service</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our certified lighting designers create custom lighting plans that perfectly complement your space and lifestyle.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Personalized lighting consultation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">3D visualization of your lighting design</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Professional installation service</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Ongoing support and optimization</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Book Design Consultation
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors">
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/lighting-design-1.jpg" alt="Lighting design example 1" className="rounded-lg" />
              <img src="/images/lighting-design-2.jpg" alt="Lighting design example 2" className="rounded-lg" />
              <img src="/images/lighting-design-3.jpg" alt="Lighting design example 3" className="rounded-lg" />
              <img src="/images/lighting-design-4.jpg" alt="Lighting design example 4" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Illuminate Your Future</h2>
          <p className="text-xl text-black/80 mb-8">
            Transform your home with intelligent lighting that adapts to your lifestyle and enhances your wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Explore All Lighting
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Get Lighting Design
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default SmartLighting;

