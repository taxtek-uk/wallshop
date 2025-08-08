import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEOHead from '../components/SEOHead';
import { smartControlPanelsSEO } from '../utils/seoData';
import { ArrowRight, Shield, Mic, Home, Star, CheckCircle, Phone, Mail } from 'lucide-react';

const SmartControlPanels: React.FC = () => {
  const controlPanels = [
    {
      id: 1,
      name: "MixPad M5",
      subtitle: "Smart Voice Control Panel",
      image: "/images/mixpad_m5.webp",
      price: "£299",
      features: ["Four-way high-power light control", "Smart infrared control", "Touch screen interaction", "400W high power load"],
      specs: { screen: "4.3\"", connectivity: "Zigbee, WiFi", power: "400W" }
    },
    {
      id: 2,
      name: "MixPad X",
      subtitle: "All-in-one Full Screen Smart Home Gateway",
      image: "/images/mixpad_x.webp",
      price: "£449",
      features: ["Full screen control", "Multi-protocol support", "Voice integration", "Whole house automation"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi, Matter", power: "600W" }
    },
    {
      id: 3,
      name: "MixPad 7 Ultra",
      subtitle: "All-in-one Multi-protocol Smart Gateway",
      image: "/images/mixpad_7_ultra.webp",
      price: "£399",
      features: ["Multi-protocol support", "Advanced automation", "Energy monitoring", "Security integration"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi, Matter, Thread", power: "500W" }
    },
    {
      id: 4,
      name: "MixPad 7",
      subtitle: "Multi-protocol Smart Home Gateway",
      image: "/images/mixpad_7.webp",
      price: "£349",
      features: ["Smart home control", "Scene management", "Voice control", "App integration"],
      specs: { screen: "7\"", connectivity: "Zigbee, WiFi", power: "400W" }
    },
    {
      id: 5,
      name: "MixPad Genie",
      subtitle: "Smart Panel Funny Life",
      image: "/images/mixpad_genie.webp",
      price: "£199",
      features: ["Compact design", "Essential controls", "Easy installation", "Smart scenes"],
      specs: { screen: "3.5\"", connectivity: "Zigbee, WiFi", power: "200W" }
    },
    {
      id: 6,
      name: "MixPad S",
      subtitle: "One panel all smart",
      image: "/images/mixpad_s.webp",
      price: "£149",
      features: ["Basic smart control", "Affordable solution", "Simple setup", "Core functionality"],
      specs: { screen: "2.8\"", connectivity: "WiFi", power: "150W" }
    },
    {
      id: 7,
      name: "ZigBee Mini Hub",
      subtitle: "Connect many smart devices to create smart scenes",
      image: "/images/zigbee_mini_hub.webp",
      price: "£79",
      features: ["Device connectivity", "Scene creation", "Compact size", "Easy setup"],
      specs: { screen: "N/A", connectivity: "Zigbee", power: "12V DC" }
    }
  ];

  const valueProps = [
    {
      icon: <Home className="w-8 h-8 text-[#D4AF37]" />,
      title: "Centralized Control",
      description: "Manage lighting, security, climate, and entertainment from one elegant panel"
    },
    {
      icon: <Mic className="w-8 h-8 text-[#D4AF37]" />,
      title: "Voice Integration",
      description: "Works with Alexa, Google Assistant, and Siri for hands-free control"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#D4AF37]" />,
      title: "Smart Wall Compatible",
      description: "Seamlessly integrates with The Wall Shop's pre-manufactured smart walls"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London",
      rating: 5,
      comment: "The MixPad X has transformed our home. Everything is so much easier to control now."
    },
    {
      name: "Michael Chen",
      location: "Manchester",
      rating: 5,
      comment: "Professional installation was seamless. The integration with our smart wall is perfect."
    },
    {
      name: "Emma Williams",
      location: "Birmingham",
      rating: 5,
      comment: "Voice control works flawlessly. The kids love using it too!"
    }
  ];

  return (
    <>
      <SEOHead
        title={smartControlPanelsSEO.title}
        description={smartControlPanelsSEO.description}
        keywords={smartControlPanelsSEO.keywords}
        canonicalUrl={smartControlPanelsSEO.canonicalUrl}
        ogImage={smartControlPanelsSEO.ogImage}
        structuredData={smartControlPanelsSEO.structuredData}
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
              <li>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </li>
              <li>
                <Link to="/smart-devices" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
                  Smart Devices
                </Link>
              </li>
              <li>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </li>
              <li>
                <span className="text-gray-400">Orvibo</span>
              </li>
              <li>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </li>
              <li>
                <span className="text-[#D4AF37]">Control Panels</span>
              </li>
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
                Orvibo Smart Control Panels
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-8">
                Command Your Entire Smart Home
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                From voice control to whole-house automation, discover the brain of your smart home system. 
                Experience the future of home control with Orvibo's revolutionary MixPad series.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#D4AF37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                  Explore Control Panels
                </button>
                <button className="border border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-all duration-300">
                  Book Free Consultation
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl p-8">
                <img 
                  src="/images/mixpad_hero.webp" 
                  alt="MixPad X integrated into luxury smart wall setup"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose Orvibo Control Panels?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the perfect blend of technology and luxury with our award-winning smart control solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div key={index} className="bg-black rounded-2xl p-8 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                <div className="mb-6">{prop.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{prop.title}</h3>
                <p className="text-gray-400 leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete Control Panel Collection</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From compact solutions to full-featured gateways, find the perfect control panel for your smart home.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {controlPanels.map((panel) => (
              <div key={panel.id} className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={panel.image} 
                    alt={panel.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-semibold">
                    {panel.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">{panel.name}</h3>
                  <p className="text-[#D4AF37] mb-4">{panel.subtitle}</p>
                  <div className="mb-4">
                    {panel.features.map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <CheckCircle className="w-4 h-4 text-[#D4AF37] mr-2" />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 mb-4">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Screen:</span>
                        <p className="text-white">{panel.specs.screen}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Connectivity:</span>
                        <p className="text-white text-xs">{panel.specs.connectivity}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Power:</span>
                        <p className="text-white">{panel.specs.power}</p>
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

      {/* Integration Showcase */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Seamless Smart Wall Integration</h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                See how Orvibo control panels transform traditional walls into intelligent command centers. 
                Our panels integrate perfectly with The Wall Shop's pre-manufactured smart wall systems.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">No rewiring required for most installations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Professional installation service available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] mr-3" />
                  <span className="text-gray-300">Compatible with existing smart wall configurations</span>
                </div>
              </div>
              <Link 
                to="/smart-wall-consultation" 
                className="inline-flex items-center bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Book Smart Wall Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="/images/traditional-wall.jpg" alt="Traditional wall setup" className="rounded-lg" />
                  <p className="text-center text-gray-400">Before: Traditional Setup</p>
                </div>
                <div className="space-y-4">
                  <img src="/images/smart-wall-setup.jpg" alt="Smart wall with control panel" className="rounded-lg" />
                  <p className="text-center text-[#D4AF37]">After: Smart Wall Integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Technical Specifications</h2>
            <p className="text-xl text-gray-400">Compare features to find the perfect control panel for your needs</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-900 rounded-2xl overflow-hidden">
              <thead className="bg-[#D4AF37] text-black">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Model</th>
                  <th className="px-6 py-4 text-left font-semibold">Screen Size</th>
                  <th className="px-6 py-4 text-left font-semibold">Protocols</th>
                  <th className="px-6 py-4 text-left font-semibold">Power</th>
                  <th className="px-6 py-4 text-left font-semibold">Voice Control</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {controlPanels.map((panel, index) => (
                  <tr key={panel.id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                    <td className="px-6 py-4 font-semibold">{panel.name}</td>
                    <td className="px-6 py-4">{panel.specs.screen}</td>
                    <td className="px-6 py-4">{panel.specs.connectivity}</td>
                    <td className="px-6 py-4">{panel.specs.power}</td>
                    <td className="px-6 py-4">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#D4AF37]">{panel.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">What Our Customers Say</h2>
            <p className="text-xl text-gray-400">Real experiences from UK homeowners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Complete Your Smart Home</h2>
            <p className="text-xl text-gray-400">Enhance your control panels with these compatible products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link to="/smart-devices/orvibo/switches" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors group">
              <img src="/images/smart-switches-thumb.jpg" alt="Smart Switches" className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">Smart Switches</h3>
              <p className="text-gray-400 text-sm">Intelligent wall switches</p>
            </Link>
            <Link to="/smart-devices/orvibo/lighting" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors group">
              <img src="/images/smart-lighting-thumb.jpg" alt="Smart Lighting" className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">Smart Lighting</h3>
              <p className="text-gray-400 text-sm">Intelligent illumination</p>
            </Link>
            <Link to="/smart-devices/orvibo/security-sensors" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors group">
              <img src="/images/security-sensors-thumb.jpg" alt="Security & Sensors" className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">Security & Sensors</h3>
              <p className="text-gray-400 text-sm">Advanced protection</p>
            </Link>
            <Link to="/smart-devices/orvibo/shading" className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors group">
              <img src="/images/smart-shading-thumb.jpg" alt="Smart Shading" className="w-full h-32 object-cover rounded-lg mb-4" />
              <h3 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">Smart Shading</h3>
              <p className="text-gray-400 text-sm">Automated curtains & blinds</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Ready to Transform Your Home?</h2>
          <p className="text-xl text-black/80 mb-8">
            Get a free consultation and discover how Orvibo control panels can revolutionize your living space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg">
              <Phone className="w-5 h-5 mr-2" />
              <span>0800 123 4567</span>
            </div>
            <div className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@thewallshop.co.uk</span>
            </div>
          </div>
          <button className="mt-6 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Book Free Consultation
          </button>
        </div>
      </section>
      </div>
    </>
  );
};

export default SmartControlPanels;

