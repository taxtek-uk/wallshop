import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { smartHVACSEO } from '../utils/seoData';
import { ArrowRight, Thermometer, Wind, Snowflake, Sun, Zap, Leaf, Brain, CheckCircle, Star, TrendingDown, Calculator } from 'lucide-react';

const SmartHVAC: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('learning');

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
      reviews: 156
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
      reviews: 234
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
      reviews: 89
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
      reviews: 112
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
      reviews: 145
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
      reviews: 198
    }
  ];

  const smartFeatures = [
    {
      id: 'learning',
      title: 'Learning Algorithms',
      description: 'AI that learns your preferences and optimizes automatically',
      icon: <Brain className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Learns your daily routines and preferences',
        'Automatically adjusts for optimal comfort',
        'Predicts heating and cooling needs',
        'Continuously improves efficiency'
      ],
      benefit: 'Up to 25% energy savings'
    },
    {
      id: 'remote',
      title: 'Remote Control',
      description: 'Control your climate from anywhere in the world',
      icon: <Thermometer className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Smartphone app control',
        'Voice assistant integration',
        'Geofencing automation',
        'Real-time monitoring'
      ],
      benefit: 'Ultimate convenience'
    },
    {
      id: 'scheduling',
      title: 'Smart Scheduling',
      description: 'Advanced scheduling with weather integration',
      icon: <Sun className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Weather-based adjustments',
        'Occupancy detection',
        'Holiday mode',
        'Flexible time zones'
      ],
      benefit: 'Optimized comfort'
    },
    {
      id: 'analytics',
      title: 'Energy Analytics',
      description: 'Detailed insights into your energy usage patterns',
      icon: <TrendingDown className="w-8 h-8 text-[#D4AF37]" />,
      details: [
        'Real-time energy monitoring',
        'Historical usage reports',
        'Cost tracking',
        'Efficiency recommendations'
      ],
      benefit: 'Data-driven savings'
    }
  ];

  const efficiencyStats = [
    {
      metric: '30%',
      description: 'Average Energy Savings',
      icon: <Leaf className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      metric: '£450',
      description: 'Annual Cost Reduction',
      icon: <Calculator className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      metric: '2.5 Years',
      description: 'Average Payback Period',
      icon: <TrendingDown className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      metric: '15%',
      description: 'Home Value Increase',
      icon: <Star className="w-8 h-8 text-[#D4AF37]" />
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'control', name: 'Control Systems', icon: <Brain className="w-5 h-5" /> },
    { id: 'thermostat', name: 'Thermostats', icon: <Thermometer className="w-5 h-5" /> },
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
      savings: "Up to £5,000"
    },
    {
      program: "Renewable Heat Incentive",
      description: "Payments for renewable heating systems",
      eligibility: "Heat pump installations",
      savings: "£1,300/year"
    },
    {
      program: "Energy Company Obligation",
      description: "Free or subsidized heating improvements",
      eligibility: "Low income households",
      savings: "Up to £3,000"
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
              <li><span className="text-[#D4AF37]">HVAC</span></li>
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
                Orvibo Smart HVAC
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Perfect Climate, Intelligent Control
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Advanced climate control systems that learn your preferences and optimize energy usage. 
                Experience the perfect balance of comfort, efficiency, and intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Optimize My Climate
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  Energy Audit
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl p-8">
                <img 
                  src="/images/smart-hvac-hero.jpg" 
                  alt="Climate control visualization"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HVAC Solutions */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete HVAC Solutions</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From central air conditioning to individual room control, discover our comprehensive range of intelligent climate solutions.
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
                        <span className="text-gray-500">Compatibility:</span>
                        <p className="text-white text-xs">{product.specs.compatibility}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Connectivity:</span>
                        <p className="text-white text-xs">{product.specs.connectivity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Zones:</span>
                        <p className="text-white text-xs">{product.specs.zones}</p>
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

      {/* Smart Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Intelligent Climate Features</h2>
            <p className="text-xl text-gray-400">Advanced technology that makes your HVAC system truly smart</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-4">
                {smartFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                      selectedFeature === feature.id
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      {feature.icon}
                      <h3 className="text-2xl font-bold ml-4">{feature.title}</h3>
                    </div>
                    <p className={`mb-4 ${selectedFeature === feature.id ? 'text-black/80' : 'text-gray-400'}`}>
                      {feature.description}
                    </p>
                    <div className={`text-lg font-semibold ${selectedFeature === feature.id ? 'text-black' : 'text-[#D4AF37]'}`}>
                      {feature.benefit}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gray-900 rounded-3xl p-8">
                <h3 className="text-3xl font-bold text-white mb-6">
                  {smartFeatures.find(f => f.id === selectedFeature)?.title}
                </h3>
                <ul className="space-y-4">
                  {smartFeatures.find(f => f.id === selectedFeature)?.details.map((detail, index) => (
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

      {/* Efficiency & Savings */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Efficiency & Savings</h2>
            <p className="text-xl text-gray-400">Real results from smart HVAC optimization</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {efficiencyStats.map((stat, index) => (
              <div key={index} className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.metric}</div>
                <p className="text-gray-400">{stat.description}</p>
              </div>
            ))}
          </div>
          
          {/* Energy Cost Calculator */}
          <div className="bg-black rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">Energy Cost Calculator</h3>
              <p className="text-gray-400">Calculate your potential savings with smart HVAC</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-2">Current Annual Cost</div>
                <div className="text-4xl font-bold text-red-400 mb-4">£1,500</div>
                <p className="text-gray-400">Traditional HVAC system</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">With Smart HVAC</div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-4">£1,050</div>
                <p className="text-gray-400">Optimized smart system</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">Annual Savings</div>
                <div className="text-4xl font-bold text-green-400 mb-4">£450</div>
                <p className="text-gray-400">30% cost reduction</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Calculate My Savings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Government Incentives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Government Incentive Programs</h2>
            <p className="text-xl text-gray-400">Take advantage of available grants and incentives</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governmentIncentives.map((incentive, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-colors">
                <h3 className="text-2xl font-bold mb-4 text-white">{incentive.program}</h3>
                <p className="text-gray-400 mb-4">{incentive.description}</p>
                <div className="mb-4">
                  <span className="text-gray-500">Eligibility:</span>
                  <p className="text-white">{incentive.eligibility}</p>
                </div>
                <div className="text-2xl font-bold text-[#D4AF37]">{incentive.savings}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Professional HVAC Services</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Our certified HVAC technicians provide comprehensive assessment, installation, and ongoing optimization services.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Comprehensive HVAC assessment</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Professional installation and setup</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">System optimization and tuning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Ongoing maintenance and support</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Book Assessment
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors">
                  Get Quote
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/hvac-assessment.jpg" alt="HVAC assessment" className="rounded-lg" />
              <img src="/images/hvac-installation.jpg" alt="HVAC installation" className="rounded-lg" />
              <img src="/images/hvac-maintenance.jpg" alt="HVAC maintenance" className="rounded-lg" />
              <img src="/images/hvac-optimization.jpg" alt="HVAC optimization" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Return on Investment Timeline</h2>
            <p className="text-xl text-gray-400">See how smart HVAC pays for itself over time</p>
          </div>
          <div className="bg-gray-900 rounded-3xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-white mb-2">Year 0</div>
                <div className="text-lg text-red-400 mb-2">-£1,500</div>
                <p className="text-gray-400 text-sm">Initial Investment</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">Year 1</div>
                <div className="text-lg text-yellow-400 mb-2">-£1,050</div>
                <p className="text-gray-400 text-sm">£450 Savings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">Year 2</div>
                <div className="text-lg text-yellow-400 mb-2">-£600</div>
                <p className="text-gray-400 text-sm">£450 Savings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">Year 3</div>
                <div className="text-lg text-yellow-400 mb-2">-£150</div>
                <p className="text-gray-400 text-sm">£450 Savings</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-2">Year 4+</div>
                <div className="text-lg text-[#D4AF37] mb-2">+£300</div>
                <p className="text-gray-400 text-sm">Pure Profit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Optimize Your Climate Today</h2>
          <p className="text-xl text-black/80 mb-8">
            Start saving money and improving comfort with our intelligent HVAC solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Get Energy Audit
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Calculate ROI
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default SmartHVAC;

