import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import TextureSection from '@/components/TextureSection';
import Footer from '@/components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Lightbulb, 
  Film, 
  ThermometerSun, 
  ShieldCheck, 
  Volume2, 
  Layers, 
  Users, 
  Zap, 
  Ruler, 
  ArrowRight, 
  Home, 
  Building, 
  Warehouse, 
  Globe,
  Sparkles,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Menu,
  Paintbrush2,
  // Texture, // Removed because 'Texture' does not exist in 'lucide-react'
  X,
  Play,
  Palette,
  Shirt,
  Square,
  Mountain
} from 'lucide-react'
 

function SmartWalls() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Lightbulb,
      title: "Intelligent Lighting",
      description: "Create ambient scenes and control all lights with voice, app, or automated schedules.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Film,
      title: "Integrated AV",
      description: "Seamlessly control home cinemas, TVs, speakers, and multi-room media from one surface.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: ThermometerSun,
      title: "Smart Climate",
      description: "Zone-based heating & cooling with geolocation, sensors, and app control.",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: ShieldCheck,
      title: "Security & CCTV",
      description: "Invisible protection with cameras, sensors, alarms, and remote access built into walls.",
      color: "from-green-400 to-emerald-500"
    },
  ]

  const boardStyles = [
    { icon: Mountain, name: "Stone/Marble", description: "Natural elegance" },
    { icon: Shirt, name: "Mirror Style", description: "Reflective luxury" },
    { icon: Square, name: "Mirror Style", description: "Reflective luxury" },
    { icon: Square, name: "Solid Colour", description: "Clean minimalism" },
    { icon: Palette, name: "Metal Style", description: "Industrial chic" }
  ]

  const wallFeatures = [
    "Integrated TV Display",
    "Electric Fireplace",
    "Premium Soundbar",
    "Floating Shelving",
    "Dimmable LED Lighting",
    "Wireless Charging Zones",
    "Climate Control Panel",
    "Security Camera Hub"
  ]

  const processSteps = [
    {
      icon: Users,
      title: "1. Consultation & Selection",
      description: "Choose your rock board style (metal, mirror, cloth, solid colour, or stone/marble) and select features like TV, fire, soundbar, shelving, and dimmable lighting.",
      details: "Our experts help you visualize your perfect smart wall"
    },
    {
      icon: Ruler,
      title: "2. Measurement & Design",
      description: "Select wall or remote control options. We measure your wall dimensions and socket positions, or conduct a professional survey if needed.",
      details: "Precise CAD planning ensures perfect fit and functionality"
    },
    {
      icon: Layers,
      title: "3. Workshop Construction",
      description: "Your complete smart wall is built in our workshop with all electrics pre-installed. Modular sections are prepared for seamless delivery.",
      details: "Quality craftsmanship with hidden cabling and smart integration"
    },
    {
      icon: Zap,
      title: "4. Clean Installation",
      description: "Brackets are fixed to your existing wall, modules are mounted, and the pre-wired plug connects everything instantly. Complete smart wall ready to use.",
      details: "Professional installation with minimal disruption"
    },
  ]

  const applications = [
    { icon: Home, title: "Modern Homes", description: "Smart living reimagined for the future family." },
    { icon: Building, title: "Corporate Offices", description: "Automated lighting, AV, and security in boardrooms." },
    { icon: Warehouse, title: "Hospitality Spaces", description: "Enhance ambience in hotels and restaurants." },
    { icon: Globe, title: "Public Areas", description: "Future-ready infrastructure for malls and airports." },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}

    <section
      className="pt-24 pb-16 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/smart-wall-technology.webp')" }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/70 z-0" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
              Smart Wall Systems
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              The Future of Living is{" "}
              <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                Built In
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              Discover walls that think – control lighting, temperature, music,
              security, and ambiance with one integrated system. From
              consultation to installation, we make smart living effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                onClick={() =>
                  document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <a
                href="/smart-wall-construction"
                className="bg-black text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
              >
                Design Smart Wall <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>

          </motion.div>

          {/* Right Box with Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#e2d5c4]">
              {/* Image Slot */}
              <div className="aspect-video bg-white/60 rounded-2xl overflow-hidden mb-6 shadow-md">
                <img
                  src="/images/smart-wall-2.jpg"
                  alt="Smart Wall Feature"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.slice(0, 4).map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="text-center p-3 bg-white rounded-xl shadow-sm border border-[#e2d5c4]"
                  >
                    <feature.icon className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-[#6b5c47]">{feature.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              What Makes Our Smart Walls Brilliant?
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              A blend of beauty, brains, and bold innovation – experience automation that enhances architecture and transforms your living space.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="text-center p-8 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{feature.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Styles Section */}
     
      <TextureSection/>

      {/* Enhanced Inquiry Form Section */}
      <section id="inquiry" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b69777]/5 to-[#907252]/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6">
              Start Your Smart Wall Journey
            </h2>
            <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed">
              Get a personalized quote and consultation. Our experts will help you design the perfect smart wall for your space.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 bg-white/80 backdrop-blur-sm border border-[#e2d5c4] shadow-2xl rounded-2xl">
                <div className="text-center pb-6">
                  <h3 className="text-2xl font-bold text-[#231c14] mb-2">
                    Get Your Free Quote
                  </h3>
                  <p className="text-[#6b5c47]">
                    Tell us about your project and we'll provide a detailed estimate
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#231c14] mb-2">
                        First Name *
                      </label>
                      <input 
                        placeholder="John" 
                        className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#231c14] mb-2">
                        Last Name *
                      </label>
                      <input 
                        placeholder="Smith" 
                        className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+44 7XXX XXXXXX" 
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Preferred Board Style
                    </label>
                    <select className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors bg-white">
                      <option value="">Select a style...</option>
                      <option value="metal">Metal Style</option>
                      <option value="mirror">Mirror Style</option>
                      <option value="cloth">Cloth Style</option>
                      <option value="solid">Solid Colour</option>
                      <option value="stone">Stone/Marble</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Desired Features
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {wallFeatures.map((feature, i) => (
                        <label key={i} className="flex items-center space-x-2 text-sm">
                          <input type="checkbox" className="rounded border-[#e2d5c4] text-[#b69777] focus:ring-[#b69777]" />
                          <span className="text-[#6b5c47]">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Control Preference
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="control" value="wall" className="text-[#b69777] focus:ring-[#b69777]" />
                        <span className="text-[#6b5c47]">Wall Control</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="control" value="remote" className="text-[#b69777] focus:ring-[#b69777]" />
                        <span className="text-[#6b5c47]">Remote Control</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Wall Dimensions (if known)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <input placeholder="Width (m)" className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors" />
                      <input placeholder="Height (m)" className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors" />
                      <input placeholder="Depth (m)" className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#231c14] mb-2">
                      Project Details & Requirements
                    </label>
                    <textarea 
                      placeholder="Tell us about your space, timeline, and any specific requirements..."
                      rows={4}
                      className="w-full p-3 border border-[#e2d5c4] rounded-lg focus:border-[#b69777] focus:ring-2 focus:ring-[#b69777]/20 outline-none transition-colors resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-[#e2d5c4] text-[#b69777] focus:ring-[#b69777]" />
                    <span className="text-sm text-[#6b5c47]">
                      I need a professional survey for accurate measurements
                    </span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-lg font-semibold flex items-center justify-center">
                    Get My Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  
                  <p className="text-xs text-[#6b5c47] text-center">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="p-6 bg-white/80 backdrop-blur-sm border border-[#e2d5c4] rounded-2xl">
                <h3 className="text-xl font-bold text-[#231c14] mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    "Complete workshop construction with pre-installed electrics",
                    "Clean, seamless installation with minimal disruption",
                    "Professional measurement and CAD planning",
                    "Premium materials and cutting-edge technology",
                    "Comprehensive warranty and ongoing support"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#b69777] mt-0.5 flex-shrink-0" />
                      <span className="text-[#6b5c47]">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-white/80 backdrop-blur-sm border border-[#e2d5c4] rounded-2xl">
                <h3 className="text-xl font-bold text-[#231c14] mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">+44 141 739 3377</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">info@thewallshop.co.uk</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#b69777]" />
                    <span className="text-[#6b5c47]">Glasgow, United Kingdom</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-[#b69777] to-[#907252] text-white rounded-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="w-6 h-6 text-yellow-300" />
                  <span className="text-lg font-bold">4.8/5 Customer Rating</span>
                </div>
                <p className="text-white/90 mb-4">
                  "Exceptional service from consultation to installation. Our smart wall has transformed our living space completely."
                </p>
                <p className="text-sm text-white/80">- Sarah M., London</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
       
    </div>
  )
}

export default SmartWalls;