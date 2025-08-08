import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { securitySensorsSEO } from '../utils/seoData';
import { ArrowRight, Shield, Camera, Lock, AlertTriangle, Thermometer, Eye, Bell, CheckCircle, Star, Phone, Wifi } from 'lucide-react';

const SecuritySensors: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const securityProducts = [
    {
      id: 1,
      name: "Smart Lock V5 Face",
      category: "access",
      subtitle: "Fully Automatic Visual Smart Door Lock",
      image: "/images/smart_lock_v5_face.webp",
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
      reviews: 234
    },
    {
      id: 2,
      name: "2K Wireless Smart IP Camera S2",
      category: "surveillance",
      subtitle: "Smart Security Linkage for the Full House",
      image: "/images/ip_camera_s2.webp",
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
      reviews: 189
    },
    {
      id: 3,
      name: "Smart Door Lock S2",
      category: "access",
      subtitle: "More Safe And More Advanced",
      image: "/images/smart-door-lock-s2.jpg",
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
      reviews: 156
    },
    {
      id: 4,
      name: "Smart Door Lock C1",
      category: "access",
      subtitle: "More Smart And Keep Your Home Safe",
      image: "/images/smart-door-lock-c1.jpg",
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
      reviews: 143
    },
    {
      id: 5,
      name: "1080P IP Camera",
      category: "surveillance",
      subtitle: "HD camera monitor by 360° full-view navigation",
      image: "/images/1080p-ip-camera.jpg",
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
      reviews: 198
    },
    {
      id: 6,
      name: "Door Window Sensor",
      category: "environmental",
      subtitle: "Real-time monitor the door & window status",
      image: "/images/door-window-sensor.jpg",
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
      reviews: 267
    },
    {
      id: 7,
      name: "Temperature Humidity Sensor",
      category: "environmental",
      subtitle: "Real-time detect & adjust temperature & humidity",
      image: "/images/temp-humidity-sensor.jpg",
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
      reviews: 178
    },
    {
      id: 8,
      name: "Zigbee Smoke Sensor",
      category: "emergency",
      subtitle: "Real-time monitor smoke to avoid potential risk",
      image: "/images/smoke-sensor.jpg",
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
      reviews: 145
    },
    {
      id: 9,
      name: "Zigbee Water Leakage Sensor",
      category: "emergency",
      subtitle: "Real-time monitor water leakage",
      image: "/images/water-sensor.jpg",
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
      reviews: 123
    },
    {
      id: 10,
      name: "Zigbee Emergency Button",
      category: "emergency",
      subtitle: "One-key alarm trigger for SOS purpose",
      image: "/images/emergency-button.jpg",
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
      reviews: 89
    }
  ];

  const securityLayers = [
    {
      layer: "Perimeter Security",
      description: "First line of defense with door/window sensors and outdoor cameras",
      products: ["Door Window Sensor", "IP Camera S2"],
      icon: <Shield className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      layer: "Access Control",
      description: "Smart locks and biometric authentication for authorized entry",
      products: ["Smart Lock V5 Face", "Smart Door Lock S2"],
      icon: <Lock className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      layer: "Interior Monitoring",
      description: "Indoor cameras and motion sensors for comprehensive coverage",
      products: ["1080P IP Camera", "Motion Sensors"],
      icon: <Eye className="w-8 h-8 text-[#D4AF37]" />
    },
    {
      layer: "Environmental Safety",
      description: "Smoke, water, and gas sensors for hazard detection",
      products: ["Smoke Sensor", "Water Sensor", "Gas Sensor"],
      icon: <AlertTriangle className="w-8 h-8 text-[#D4AF37]" />
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Shield className="w-5 h-5" /> },
    { id: 'access', name: 'Access Control', icon: <Lock className="w-5 h-5" /> },
    { id: 'surveillance', name: 'Surveillance', icon: <Camera className="w-5 h-5" /> },
    { id: 'environmental', name: 'Environmental', icon: <Thermometer className="w-5 h-5" /> },
    { id: 'emergency', name: 'Emergency', icon: <AlertTriangle className="w-5 h-5" /> }
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
      ]
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
      ]
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
      ]
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
              <li><span className="text-[#D4AF37]">Security & Sensors</span></li>
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
                Orvibo Security & Sensors
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Protect What Matters Most
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Advanced AI-powered security systems that integrate seamlessly with your smart walls. 
                Experience comprehensive protection with intelligent monitoring and instant alerts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Secure My Home
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  View Security Plans
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl p-8">
                <img 
                  src="/images/security-hero.jpg" 
                  alt="Smart security system with lock and camera"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Categories */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete Security Ecosystem</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From smart locks to environmental sensors, protect every aspect of your home with our integrated security solutions.
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
                        <p className="text-white text-xs">{product.specs.power}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Connectivity:</span>
                        <p className="text-white text-xs">{product.specs.connectivity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Installation:</span>
                        <p className="text-white text-xs">{product.specs.installation}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Security:</span>
                        <p className="text-white text-xs">{product.specs.security}</p>
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

      {/* Layered Security Approach */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Multi-Layer Security Protection</h2>
            <p className="text-xl text-gray-400">Comprehensive security through multiple integrated defense layers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityLayers.map((layer, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                <div className="mb-6">{layer.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{layer.layer}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{layer.description}</p>
                <div className="space-y-2">
                  {layer.products.map((product, idx) => (
                    <div key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />
                      <span className="text-gray-300 text-sm">{product}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Security Diagram */}
          <div className="mt-16 bg-gray-900 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-white">How Our Security Layers Work Together</h3>
              <p className="text-gray-400">Visual representation of integrated security coverage</p>
            </div>
            <div className="relative">
              <img 
                src="/images/security-layers-diagram.jpg" 
                alt="Security layers diagram"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Peace of Mind Features */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Advanced Security Features</h2>
            <p className="text-xl text-gray-400">Cutting-edge technology for ultimate peace of mind</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Bell className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">24/7 Monitoring</h3>
              <p className="text-gray-400">Professional monitoring service with instant emergency response</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Phone className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Mobile Alerts</h3>
              <p className="text-gray-400">Instant notifications on your smartphone for all security events</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center hover:bg-gray-800 transition-colors">
              <Wifi className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Cloud Storage</h3>
              <p className="text-gray-400">Secure cloud backup for all recordings and security data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Monitoring Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Professional Monitoring Plans</h2>
            <p className="text-xl text-gray-400">Choose the level of protection that's right for your home</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {monitoringPlans.map((plan, index) => (
              <div key={index} className={`rounded-2xl p-8 ${index === 1 ? 'bg-[#D4AF37] text-black' : 'bg-gray-900 text-white'} hover:scale-105 transition-all duration-300`}>
                <h3 className={`text-2xl font-bold mb-4 ${index === 1 ? 'text-black' : 'text-white'}`}>{plan.name}</h3>
                <div className={`text-4xl font-bold mb-6 ${index === 1 ? 'text-black' : 'text-[#D4AF37]'}`}>{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${index === 1 ? 'text-black' : 'text-[#D4AF37]'}`} />
                      <span className={index === 1 ? 'text-black' : 'text-gray-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  index === 1 
                    ? 'bg-black text-white hover:bg-gray-800' 
                    : 'bg-[#D4AF37] text-black hover:bg-yellow-400'
                }`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Compliance & Certifications</h2>
            <p className="text-xl text-gray-400">Meeting the highest security standards and regulations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black rounded-2xl p-8 text-center">
              <Shield className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">UK Security Standards</h3>
              <p className="text-gray-400">Fully compliant with British security regulations and standards</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Insurance Partnerships</h3>
              <p className="text-gray-400">Approved by major insurance companies for premium discounts</p>
            </div>
            <div className="bg-black rounded-2xl p-8 text-center">
              <Star className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4 text-white">Professional Certifications</h3>
              <p className="text-gray-400">Certified by leading security organizations and authorities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Secure Your Home Today</h2>
          <p className="text-xl text-black/80 mb-8">
            Don't wait for a security incident. Protect your family and property with our advanced security solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Get Security Assessment
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default SecuritySensors;

