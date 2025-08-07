import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Droplets, 
  Leaf, 
  Wrench, 
  Award, 
  ArrowRight,
  CheckCircle,
  Star,
  Download,
  Phone,
  Mail,
  Ruler,
  Thermometer,
  Home,
  Building,
  Hotel,
  Zap,
  Clock,
  Palette,
  X,
  User,
  MapPin,
  MessageSquare
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const WPCWallPanels = () => {
  const [selectedFinish, setSelectedFinish] = useState('oak');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    projectType: '',
    roomSize: '',
    preferredFinish: '',
    message: ''
  });

  const finishes = [
    { id: 'oak', name: 'Natural Oak', color: '#D2B48C', description: 'Warm, classic wood grain' },
    { id: 'walnut', name: 'Rich Walnut', color: '#8B4513', description: 'Deep, sophisticated brown' },
    { id: 'pine', name: 'Light Pine', color: '#F5DEB3', description: 'Bright, contemporary finish' },
    { id: 'mahogany', name: 'Dark Mahogany', color: '#C04000', description: 'Luxurious, rich tone' },
    { id: 'bamboo', name: 'Bamboo', color: '#E6D690', description: 'Sustainable, modern look' },
    { id: 'teak', name: 'Teak', color: '#B8860B', description: 'Premium, durable finish' }
  ];

  const specifications = [
    { label: 'Thickness', value: '5mm / 8mm' },
    { label: 'Width', value: '1220mm' },
    { label: 'Length', value: '2440mm / Custom' },
    { label: 'Material', value: 'Wood Plastic Composite' },
    { label: 'Fire Rating', value: 'Class B1' },
    { label: 'Moisture Resistance', value: '100% Waterproof' },
    { label: 'Installation', value: 'Click-Lock System' },
    { label: 'Warranty', value: '15 Years' }
  ];

  const features = [
    {
      icon: Droplets,
      title: 'Moisture Resistant',
      description: 'Complete protection against water damage, perfect for bathrooms and kitchens.'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Made from recycled materials with sustainable manufacturing processes.'
    },
    {
      icon: Wrench,
      title: 'Easy Installation',
      description: 'Innovative click-lock system allows for quick, professional installation.'
    },
    {
      icon: Shield,
      title: 'Durable Construction',
      description: 'Scratch-resistant surface with exceptional impact resistance.'
    },
    {
      icon: Thermometer,
      title: 'Thermal Stability',
      description: 'Maintains dimensional stability across temperature variations.'
    },
    {
      icon: Palette,
      title: 'Design Versatility',
      description: 'Wide range of finishes to complement any interior design style.'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Interiors',
      description: 'Perfect for living rooms, bedrooms, and feature walls in modern homes.',
      examples: ['Living Room Feature Walls', 'Bedroom Accent Panels', 'Home Office Spaces']
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Professional-grade solution for offices, retail, and public buildings.',
      examples: ['Office Reception Areas', 'Retail Store Interiors', 'Conference Rooms']
    },
    {
      icon: Hotel,
      title: 'Hospitality Venues',
      description: 'Luxury finishes for hotels, restaurants, and entertainment venues.',
      examples: ['Hotel Lobbies', 'Restaurant Interiors', 'Bar & Lounge Areas']
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Preparation',
      description: 'Clean and level the wall surface, ensuring it\'s dry and free from debris.'
    },
    {
      step: 2,
      title: 'Bracket Installation',
      description: 'Mount the aluminum brackets using the provided fixings, ensuring level alignment.'
    },
    {
      step: 3,
      title: 'Panel Mounting',
      description: 'Click panels into the bracket system, starting from one corner and working across.'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Install edge trims and corner pieces for a professional, seamless finish.'
    }
  ];

  const benefits = [
    'Zero maintenance required after installation',
    'Resistant to scratches, dents, and impact damage',
    'Natural wood appearance without the drawbacks',
    'Suitable for high-moisture environments',
    'Fire-resistant properties for enhanced safety',
    'Quick installation reduces labor costs',
    'Environmentally sustainable choice',
    'Long-term cost savings over traditional materials'
  ];

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Quote form submitted:', quoteForm);
    setIsQuoteModalOpen(false);
    // Reset form
    setQuoteForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      projectType: '',
      roomSize: '',
      preferredFinish: '',
      message: ''
    });
  };

  const handleInputChange = (field, value) => {
    setQuoteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
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
              <nav className="text-white/70 mb-4">
                <Link to="/wall-panels" className="hover:text-white transition-colors">Wall Panels</Link>
                <span className="mx-2">/</span>
                <span className="text-white">WPC Wall Panels</span>
              </nav>
              
              <div className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Premium WPC Collection
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC Wall{" "}
                <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
                  Panels
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience the perfect fusion of natural wood aesthetics and modern composite technology. 
                Our WPC wall panels deliver exceptional durability, moisture resistance, and design versatility 
                for any interior space.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Professional Installation</Badge>
                <Badge className="bg-white/20 text-white border-white/30">100% Waterproof</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Brochure
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
                    src="/images/wpc-wall-panel-hero.png"
                    alt="WPC Wall Panels Installation"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">100% Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Leaf className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Eco-Friendly</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Wrench className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Easy Install</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-[#b69777] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">15 Year Warranty</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="finishes">Finishes</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12">
              {/* Features Grid */}
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
                >
                  Key Features & Benefits
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Experience the perfect blend of natural beauty and modern technology with our premium WPC wall panels.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-[#231c14] mb-4">{feature.title}</h3>
                        <p className="text-[#6b5c47] leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-3xl p-12 shadow-xl"
              >
                <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">Why Choose WPC Wall Panels?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#b69777] flex-shrink-0" />
                      <span className="text-[#231c14] font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-4xl font-extrabold text-[#231c14] mb-8">Technical Specifications</h2>
                  <div className="space-y-4">
                    {specifications.map((spec, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex justify-between items-center p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl"
                      >
                        <span className="font-semibold text-[#231c14]">{spec.label}</span>
                        <span className="font-bold text-[#b69777]">{spec.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">Material Composition</h3>
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Wood Fiber (60%)</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        High-quality wood fibers provide natural appearance and texture
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Plastic Polymer (35%)</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        Recycled plastic ensures durability and moisture resistance
                      </p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-lg rounded-xl">
                      <h4 className="font-bold text-[#231c14] mb-3">Additives (5%)</h4>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">
                        UV stabilizers, colorants, and performance enhancers
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="finishes" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center">
                  Available Finishes
                </h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Choose from our premium collection of wood-inspired finishes to match your design vision.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {finishes.map((finish, i) => (
                    <motion.div
                      key={finish.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-8 border-2 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl ${
                        selectedFinish === finish.id
                          ? 'border-[#b69777] bg-gradient-to-br from-[#faf7f3] to-white shadow-2xl'
                          : 'border-[#e2d5c4] bg-white hover:border-[#b69777]'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div 
                        className="w-full h-32 rounded-xl mb-6 shadow-inner border-2 border-[#e2d5c4]"
                        style={{ backgroundColor: finish.color }}
                      ></div>
                      <h3 className="text-xl font-bold text-[#231c14] mb-3">{finish.name}</h3>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">{finish.description}</p>
                      {selectedFinish === finish.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center text-[#b69777]"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          <span className="text-sm font-semibold">Selected</span>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center">
                  Installation Process
                </h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Professional installation in just a few simple steps for a perfect finish every time.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      className="text-center p-8 bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-300 hover:shadow-xl rounded-2xl"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mx-auto mb-6 text-white text-2xl font-extrabold shadow-lg">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-[#231c14] mb-4">{step.title}</h3>
                      <p className="text-sm text-[#6b5c47] leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent mb-6 text-center"
          >
            Perfect for Every Space
          </motion.h2>
          <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
            Transform any environment with our versatile WPC wall panels, designed for residential, commercial, and hospitality applications.
          </p>
          <div className="grid lg:grid-cols-3 gap-12">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-10 bg-white border border-[#e2d5c4] hover:border-[#b69777] transition-all duration-500 hover:shadow-2xl rounded-2xl"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#b69777] to-[#907252] flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <app.icon className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#231c14] mb-4">{app.title}</h3>
                <p className="text-[#6b5c47] mb-6 leading-relaxed">{app.description}</p>
                <ul className="space-y-3">
                  {app.examples.map((example, j) => (
                    <li key={j} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-[#b69777]"></div>
                      <span className="text-sm font-medium text-[#231c14]">{example}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#231c14] via-[#2a1f17] to-[#1a1410]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b69777]/20 to-[#907252]/20"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
          >
            Ready to Transform{" "}
            <span className="bg-gradient-to-r from-[#b69777] via-[#b89773] to-[#907252] bg-clip-text text-transparent">
              Your Space?
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Get a personalized quote for your WPC wall panel project. Our experts will help you choose 
            the perfect finish and provide professional installation services.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button
              className="bg-gradient-to-r from-[#b69777] to-[#907252] text-white hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-12 py-6 text-xl rounded-full font-semibold flex items-center justify-center"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get Your Free Quote <ArrowRight className="ml-3 h-6 w-6" />
            </button>
            <button
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-12 py-6 text-xl rounded-full font-semibold flex items-center justify-center"
            >
              <Phone className="mr-3 h-6 w-6" />
              Call Us Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e2d5c4]"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-extrabold text-[#231c14]">
                Get Your Free Quote
              </h3>
              <button
                onClick={() => setIsQuoteModalOpen(false)}
                className="rounded-full p-2 hover:bg-[#f8f6f3] transition-colors duration-200"
              >
                <X className="h-6 w-6 text-[#6b5c47]" />
              </button>
            </div>

            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={quoteForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Phone Number
                  </label>
                  <Input
                    value={quoteForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Project Type
                  </label>
                  <Select value={quoteForm.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                  Project Address
                </label>
                <Input
                  value={quoteForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                  placeholder="Enter project address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Room Size (approx.)
                  </label>
                  <Input
                    value={quoteForm.roomSize}
                    onChange={(e) => handleInputChange('roomSize', e.target.value)}
                    className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4"
                    placeholder="e.g., 4m x 3m"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                    Preferred Finish
                  </label>
                  <Select value={quoteForm.preferredFinish} onValueChange={(value) => handleInputChange('preferredFinish', value)}>
                    <SelectTrigger className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4">
                      <SelectValue placeholder="Select finish" />
                    </SelectTrigger>
                    <SelectContent>
                      {finishes.map((finish) => (
                        <SelectItem key={finish.id} value={finish.id}>
                          {finish.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-[#231c14]">
                  Additional Details
                </label>
                <Textarea
                  value={quoteForm.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="rounded-xl border-2 border-[#e2d5c4] focus:border-[#b69777] p-4 min-h-[120px]"
                  placeholder="Tell us more about your project requirements..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-[#b69777] to-[#907252] hover:from-[#907252] hover:to-[#b69777] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Submit Quote Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(false)}
                  className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-[#b69777] text-[#231c14] hover:bg-[#f8f6f3] transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default WPCWallPanels;

