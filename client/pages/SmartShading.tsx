import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { smartShadingSEO } from '../utils/seoData';
import { ArrowRight, Sun, Moon, Wind, Thermometer, Shield, Zap, CheckCircle, Star, Calculator, Clock } from 'lucide-react';

const SmartShading: React.FC = () => {
  const [selectedBenefit, setSelectedBenefit] = useState('energy');

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
      reviews: 156
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
      reviews: 134
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
      reviews: 189
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
      reviews: 98
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
      reviews: 112
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
      reviews: 145
    }
  ];

  const lifestyleBenefits = [
    {
      id: 'energy',
      title: 'Energy Efficiency',
      description: 'Reduce heating and cooling costs by up to 30%',
      icon: <Zap className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Automatic solar tracking reduces heat gain',
        'Insulation properties maintain temperature',
        'Smart scheduling optimizes energy usage',
        'Integration with HVAC systems'
      ],
      savings: '£240/year average savings'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      description: 'Automated privacy control and security enhancement',
      icon: <Shield className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Scheduled privacy automation',
        'Away mode simulation',
        'Instant privacy at the touch of a button',
        'Integration with security systems'
      ],
      savings: 'Enhanced home security'
    },
    {
      id: 'convenience',
      title: 'Convenience & Luxury',
      description: 'Effortless control and premium experience',
      icon: <Sun className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Voice control integration',
        'Smartphone app control',
        'Automated schedules',
        'Scene integration'
      ],
      savings: 'Ultimate convenience'
    },
    {
      id: 'health',
      title: 'Health & Wellbeing',
      description: 'Natural light management for better living',
      icon: <Moon className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Circadian rhythm support',
        'Glare reduction',
        'UV protection',
        'Natural light optimization'
      ],
      savings: 'Improved wellbeing'
    }
  ];

  const roomApplications = [
    {
      room: 'Bedroom',
      image: '/images/bedroom-shading.jpg',
      solution: 'Blackout Solutions',
      description: 'Complete darkness for perfect sleep with automated wake-up lighting',
      products: ['Smart Curtain Motor Kit', 'Blackout Curtains'],
      price: 'From £299'
    },
    {
      room: 'Living Room',
      image: '/images/living-room-shading.jpg',
      solution: 'Ambiance Control',
      description: 'Perfect lighting for entertainment and relaxation',
      products: ['Super Mute Curtain', 'Motorized Blinds'],
      price: 'From £399'
    },
    {
      room: 'Office',
      image: '/images/office-shading.jpg',
      solution: 'Glare Reduction',
      description: 'Optimal lighting for productivity and screen visibility',
      products: ['Smart Blind Controller', 'Anti-glare Blinds'],
      price: 'From £199'
    },
    {
      room: 'Whole House',
      image: '/images/whole-house-shading.jpg',
      solution: 'Coordinated Control',
      description: 'Synchronized shading throughout your entire home',
      products: ['Multiple Motors', 'Central Control'],
      price: 'From £999'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'curtain', name: 'Curtain Motors' },
    { id: 'blinds', name: 'Blind Controllers' },
    { id: 'control', name: 'Control Systems' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const filteredProducts = selectedCategory === 'all' 
    ? shadingProducts 
    : shadingProducts.filter(product => product.category === selectedCategory);

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
              <li><span className="text-[#D4AF37]">Shading</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-yellow-300 bg-clip-text text-transparent">
                Orvibo Smart Shading
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Effortless Light Control
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Automated curtains and blinds that respond to your lifestyle and preferences. 
                Experience the perfect balance of natural light, privacy, and energy efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Automate My Windows
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  Calculate Savings
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl p-8">
                <img 
                  src="/images/smart-shading-hero.jpg" 
                  alt="Elegant curtain automation demonstration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shading Solutions */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete Shading Solutions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From curtain motors to blind controllers, discover our comprehensive range of automated window treatments.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#D4AF37] text-black transform scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
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
                        <p className="text-white text-xs">{product.specs.power}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Load:</span>
                        <p className="text-white text-xs">{product.specs.load}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Noise:</span>
                        <p className="text-white text-xs">{product.specs.noise}</p>
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

      {/* Lifestyle Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Transform Your Lifestyle</h2>
            <p className="text-xl text-gray-400">Discover the benefits of intelligent window automation</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                {lifestyleBenefits.map((benefit) => (
                  <button
                    key={benefit.id}
                    onClick={() => setSelectedBenefit(benefit.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      selectedBenefit === benefit.id
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      {benefit.icon}
                      <h3 className="text-2xl font-bold ml-4">{benefit.title}</h3>
                    </div>
                    <p className={`mb-4 ${selectedBenefit === benefit.id ? 'text-black/80' : 'text-gray-400'}`}>
                      {benefit.description}
                    </p>
                    <div className={`text-lg font-semibold ${selectedBenefit === benefit.id ? 'text-black' : 'text-[#D4AF37]'}`}>
                      {benefit.savings}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-white mb-6">
                  {lifestyleBenefits.find(b => b.id === selectedBenefit)?.title}
                </h3>
                <ul className="space-y-4">
                  {lifestyleBenefits.find(b => b.id === selectedBenefit)?.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] mr-3" />
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Technical Excellence</h2>
            <p className="text-xl text-gray-400">Advanced engineering for reliable and quiet operation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Wind className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Ultra-Quiet Operation</h3>
              <p className="text-gray-400">Advanced motor technology ensures whisper-quiet operation under 30dB</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Zap className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Powerful Motors</h3>
              <p className="text-gray-400">High-torque motors handle heavy curtains and blinds with ease</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Clock className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Precise Control</h3>
              <p className="text-gray-400">Accurate positioning and smooth operation for perfect light control</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Shield className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Reliable Design</h3>
              <p className="text-gray-400">Built to last with premium materials and rigorous testing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Applications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Perfect Solutions for Every Room</h2>
            <p className="text-xl text-gray-400">Tailored shading solutions designed for specific spaces and needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomApplications.map((room, index) => (
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
                  <h4 className="text-[#D4AF37] text-lg mb-4">{room.solution}</h4>
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
                    Design {room.room} Solution
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Savings Calculator */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Energy Savings Calculator</h2>
            <p className="text-xl text-gray-400">See how much you could save with smart shading</p>
          </div>
          <div className="bg-black rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
              <div>
                <Calculator className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">30%</div>
                <p className="text-gray-400">Energy Cost Reduction</p>
              </div>
              <div>
                <Thermometer className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">£240</div>
                <p className="text-gray-400">Average Annual Savings</p>
              </div>
              <div>
                <Zap className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">2 Years</div>
                <p className="text-gray-400">Payback Period</p>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Calculate My Savings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Installation & Maintenance */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Professional Installation & Support</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our certified technicians ensure perfect installation and provide comprehensive support for your smart shading system.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Professional measurement and consultation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Expert installation and setup</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Smart home integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Ongoing maintenance and support</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Book Installation
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/professional-shading-installation.jpg" 
                alt="Professional shading installation"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Automate Your Windows Today</h2>
          <p className="text-xl text-black/80 mb-8">
            Experience the perfect balance of natural light, privacy, and energy efficiency with our smart shading solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Get Free Consultation
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Calculate Savings
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default SmartShading;

