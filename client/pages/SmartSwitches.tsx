import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { smartSwitchesSEO } from '../utils/seoData';
import { ArrowRight, Zap, Palette, Smartphone, CheckCircle, Star, Filter, Grid, List } from 'lucide-react';

const SmartSwitches: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

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
      reviews: 124
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
      reviews: 89
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
      reviews: 156
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
      reviews: 67
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
      reviews: 92
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
      reviews: 143
    }
  ];

  const designGallery = [
    {
      room: "Living Room",
      image: "/images/living-room-switches.jpg",
      description: "Elegant control in luxury settings"
    },
    {
      room: "Kitchen",
      image: "/images/kitchen-switches.jpg",
      description: "Functional beauty for culinary spaces"
    },
    {
      room: "Bedroom",
      image: "/images/bedroom-switches.jpg",
      description: "Sophisticated ambiance control"
    },
    {
      room: "Bathroom",
      image: "/images/bathroom-switches.jpg",
      description: "Moisture-resistant luxury"
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
              <li><span className="text-[#D4AF37]">Switches</span></li>
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
                Orvibo Smart Switches
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Where Technology Meets Artistry
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Upgrade your walls with intelligent switches that blend seamlessly into luxury interiors. 
                Experience the perfect fusion of form and function with Orvibo's award-winning switch collection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Shop Smart Switches
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  See Installation Guide
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-2xl p-6">
                  <img src="/images/traditional-switch.jpg" alt="Traditional switch" className="w-full h-32 object-cover rounded-lg mb-4" />
                  <p className="text-gray-400 text-center">Traditional Switch</p>
                </div>
                <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl p-6">
                  <img src="/images/orvibo-smart-switch.jpg" alt="Orvibo smart switch" className="w-full h-32 object-cover rounded-lg mb-4" />
                  <p className="text-[#D4AF37] text-center font-semibold">Orvibo Smart Switch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Transform Any Room in Minutes</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Revolutionary installation process that requires no rewiring for most setups
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Remove Old Switch</h3>
              <p className="text-gray-400">Simply unscrew your existing switch</p>
            </div>
            <div className="text-center">
              <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Connect Wires</h3>
              <p className="text-gray-400">Use existing wiring - no rewiring needed</p>
            </div>
            <div className="text-center">
              <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Install Switch</h3>
              <p className="text-gray-400">Secure the new smart switch in place</p>
            </div>
            <div className="text-center">
              <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Connect & Control</h3>
              <p className="text-gray-400">Pair with app and start controlling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Switch Series</h2>
            <p className="text-xl text-gray-400">Discover our premium collections designed for every style and need</p>
          </div>
          
          {/* Series Filter and View Toggle */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
            <div className="flex flex-wrap gap-2">
              {series.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeries(s.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSeries === s.id
                      ? 'bg-[#D4AF37] text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {s.name} ({s.count})
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-gray-300'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#D4AF37] text-black' : 'bg-gray-800 text-gray-300'}`}
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
            {filteredSwitches.map((switchItem) => (
              <div key={switchItem.id} className={`bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group ${
                viewMode === 'list' ? 'flex' : ''
              }`}>
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                  <img 
                    src={switchItem.image} 
                    alt={switchItem.name}
                    className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                      viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                    }`}
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {switchItem.priceRange}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/70 rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-[#D4AF37] fill-current mr-1" />
                    <span className="text-white text-sm">{switchItem.rating}</span>
                    <span className="text-gray-300 text-sm ml-1">({switchItem.reviews})</span>
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">{switchItem.name}</h3>
                  <p className="text-[#D4AF37] mb-4">{switchItem.subtitle}</p>
                  
                  <div className="mb-4">
                    {switchItem.features.slice(0, viewMode === 'list' ? 5 : 3).map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Color Options */}
                  <div className="mb-4">
                    <p className="text-gray-500 text-sm mb-2">Available Colors:</p>
                    <div className="flex flex-wrap gap-2">
                      {switchItem.colors.map((color, index) => (
                        <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="border-t border-gray-700 pt-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Protocol:</span>
                          <p className="text-white">{switchItem.specs.protocol}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Power:</span>
                          <p className="text-white">{switchItem.specs.power}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Installation:</span>
                          <p className="text-white">{switchItem.specs.installation}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Finish:</span>
                          <p className="text-white">{switchItem.specs.finish}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#D4AF37] text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-3 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors">
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility Matrix */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Smart Wall Compatibility</h2>
            <p className="text-xl text-gray-400">See which switches work with different smart wall configurations</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-black rounded-2xl p-8">
              <Zap className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Protocol Compatibility</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Zigbee 3.0</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />WiFi 2.4GHz</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Matter Protocol</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />RF 433MHz</li>
              </ul>
            </div>
            <div className="bg-black rounded-2xl p-8">
              <Palette className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Design Integration</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Flush wall mounting</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Multiple finish options</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Custom color matching</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Seamless integration</li>
              </ul>
            </div>
            <div className="bg-black rounded-2xl p-8">
              <Smartphone className="w-12 h-12 text-[#D4AF37] mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Smart Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Voice control</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />App control</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Scene automation</li>
                <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />Energy monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Gallery */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Design Gallery</h2>
            <p className="text-xl text-gray-400">See our switches in beautiful room settings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designGallery.map((room, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={room.image} 
                  alt={room.room}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{room.room}</h3>
                  <p className="text-gray-300 text-sm">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation & Support */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Professional Installation & Support</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our certified technicians ensure perfect installation and provide comprehensive support for your smart switch upgrade.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Certified electrician installation</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Comprehensive setup and configuration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">24/7 technical support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">2-year warranty on all products</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Book Installation
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors">
                  DIY Installation Guide
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/professional-installation.jpg" 
                alt="Professional installation service"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Tool */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Orvibo?</h2>
            <p className="text-xl text-gray-400">See how we compare to traditional and competitor switches</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-2xl overflow-hidden">
              <thead className="bg-[#D4AF37] text-black">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">Traditional Switch</th>
                  <th className="px-6 py-4 text-center font-semibold">Competitor</th>
                  <th className="px-6 py-4 text-center font-semibold">Orvibo Switch</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="bg-gray-800">
                  <td className="px-6 py-4 font-semibold">Smart Control</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                  <td className="px-6 py-4 text-center text-yellow-400">Basic</td>
                  <td className="px-6 py-4 text-center text-[#D4AF37]">Advanced</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-6 py-4 font-semibold">Voice Control</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                  <td className="px-6 py-4 text-center text-yellow-400">Limited</td>
                  <td className="px-6 py-4 text-center text-[#D4AF37]">Full Support</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="px-6 py-4 font-semibold">Design Quality</td>
                  <td className="px-6 py-4 text-center text-yellow-400">Basic</td>
                  <td className="px-6 py-4 text-center text-yellow-400">Good</td>
                  <td className="px-6 py-4 text-center text-[#D4AF37]">Premium</td>
                </tr>
                <tr className="bg-gray-900">
                  <td className="px-6 py-4 font-semibold">Installation</td>
                  <td className="px-6 py-4 text-center text-yellow-400">Simple</td>
                  <td className="px-6 py-4 text-center text-red-400">Complex</td>
                  <td className="px-6 py-4 text-center text-[#D4AF37]">Easy</td>
                </tr>
                <tr className="bg-gray-800">
                  <td className="px-6 py-4 font-semibold">Energy Monitoring</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                  <td className="px-6 py-4 text-center text-red-400">✗</td>
                  <td className="px-6 py-4 text-center text-[#D4AF37]">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Ready to Upgrade Your Switches?</h2>
          <p className="text-xl text-black/80 mb-8">
            Transform your home with intelligent switches that combine luxury design with smart functionality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Shop All Switches
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Get Professional Quote
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default SmartSwitches;

