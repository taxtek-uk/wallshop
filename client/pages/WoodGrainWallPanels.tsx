import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TreePine, Layers, Zap, Award, Wrench, Puzzle, ArrowRight,
  CheckCircle, Download, Phone, Mail, Clock, Ruler, Settings,
  Home, Building, Hotel, X, User, MapPin, MessageSquare
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import QuoteModal from "@/components/QuoteModal";

const WoodGrainWallPanels = () => {
  const [selectedFinish, setSelectedFinish] = useState('oak');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const finishes = [
    { id: 'oak', name: 'Classic Oak', description: 'Traditional oak wood grain with rich, warm tones.', popularity: 'Most Popular' },
    { id: 'walnut', name: 'Premium Walnut', description: 'Luxurious walnut finish with deep chocolate hues.', popularity: 'Premium Choice' },
    { id: 'pine', name: 'Natural Pine', description: 'Light, airy pine grain perfect for modern spaces.', popularity: 'Contemporary' },
    { id: 'mahogany', name: 'Exotic Mahogany', description: 'Rich mahogany with distinctive grain patterns.', popularity: 'Luxury' }
  ];

  const specifications = [
    { label: 'Material', value: 'High-Definition Wood Grain PVC' },
    { label: 'Standard Sizes', value: '1200mm x 2400mm, 600mm x 2400mm' },
    { label: 'Thickness Options', value: '5mm, 8mm, 12mm' },
    { label: 'Fire Rating', value: 'Class B1 (DIN 4102)' },
    { label: 'Water Resistance', value: 'IP65 Waterproof' },
    { label: 'UV Resistance', value: 'Fade Resistant' },
    { label: 'Installation', value: 'Click-Lock System' },
    { label: 'Warranty', value: '15 Years Residential' }
  ];

  const features = [
    {
      icon: TreePine,
      title: 'Authentic Wood Appearance',
      description: 'Ultra-high-definition printing technology creates incredibly realistic wood grain textures and patterns.',
      benefit: 'Natural beauty without maintenance'
    },
    {
      icon: Layers,
      title: 'Multi-Layer Construction',
      description: 'Advanced 7-layer structure provides superior durability and dimensional stability.',
      benefit: 'Long-lasting performance'
    },
    {
      icon: Zap,
      title: 'Easy Installation',
      description: 'Innovative click-lock system allows for quick, glue-free installation on any smooth surface.',
      benefit: 'DIY-friendly setup'
    },
    {
      icon: Award,
      title: 'Eco-Friendly Alternative',
      description: 'Sustainable PVC construction reduces deforestation while providing the beauty of real wood.',
      benefit: 'Environmentally responsible'
    },
    {
      icon: Wrench,
      title: 'Low Maintenance',
      description: 'Scratch-resistant surface requires only simple cleaning with standard household products.',
      benefit: 'Saves time and money'
    },
    {
      icon: Puzzle,
      title: 'Versatile Applications',
      description: 'Perfect for accent walls, feature panels, commercial spaces, and residential interiors.',
      benefit: 'Unlimited design possibilities'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Preparation',
      description: 'Ensure walls are clean, dry, and level. Remove any existing wallpaper or loose paint.',
      time: '45 minutes'
    },
    {
      step: 2,
      title: 'Measurement & Planning',
      description: 'Measure wall dimensions and plan panel layout, starting from the center for best symmetry.',
      time: '30 minutes'
    },
    {
      step: 3,
      title: 'Panel Installation',
      description: 'Begin installation with the click-lock system, ensuring proper alignment and tight joints.',
      time: '2-4 hours'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Install trim pieces, corner moldings, and perform final quality inspection.',
      time: '45 minutes'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Interiors',
      description: 'Transform living rooms, bedrooms, and dining areas with warm wood aesthetics.',
      examples: ['Living Rooms', 'Bedrooms', 'Home Offices']
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Create welcoming environments in offices, retail stores, and hospitality venues.',
      examples: ['Offices', 'Retail Stores', 'Restaurants']
    },
    {
      icon: Hotel,
      title: 'Hospitality & Leisure',
      description: 'Enhance guest experiences with sophisticated wood grain finishes.',
      examples: ['Hotels', 'Spas', 'Reception Areas']
    }
  ];

  const benefits = [
    'Authentic wood appearance without the cost of real timber',
    'Waterproof and moisture-resistant for any room',
    'Fire-resistant properties for enhanced safety',
    'UV-stable colors that won\'t fade over time',
    'Easy to clean and maintain compared to real wood',
    'Quick installation saves time and labor costs',
    'Eco-friendly alternative to harvested wood',
    'Consistent grain patterns without natural defects'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-[#2d1810] via-[#3a1f14] to-[#1f1208]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/20 to-[#b8956f]/20"></div>
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
                <span className="text-white">Wood Grain Wall Panels</span>
              </nav>

              <div className="bg-gradient-to-r from-[#d4a574] to-[#b8956f] text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Ultra-High Definition Wood Grain
              </div>

              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Wood Grain Wall{" "}
                <span className="bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent">
                  Panels
                </span>
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience the natural beauty of authentic wood grain with our ultra-high-definition wall panels. All the warmth and character of real wood, without the maintenance.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Waterproof</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Easy Install</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-gradient-to-r from-[#d4a574] to-[#b8956f] text-white hover:from-[#b8956f] hover:to-[#d4a574] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Get Wood Grain Quote <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Wood Grain Catalog
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
                    src="/images/wood-grain-wall-panel.png"
                    alt="Wood Grain Wall Panel"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <TreePine className="w-6 h-6 text-[#d4a574] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Natural Look</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Zap className="w-6 h-6 text-[#d4a574] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Quick Install</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-[#d4a574] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Eco-Friendly</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Ruler className="w-6 h-6 text-[#d4a574] mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Custom Sizes</p>
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
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="finishes">Wood Finishes</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent mb-6 text-center"
                >
                  Key Features & Benefits
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Our wood grain wall panels combine the natural beauty of timber with modern technology and convenience.
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
                      <div className="p-6 h-full bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] hover:border-[#d4a574] transition-all duration-300 hover:shadow-xl rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956f] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="text-white w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-[#231c14] mb-3">{feature.title}</h3>
                        <p className="text-[#6b5c47] text-sm leading-relaxed mb-3">{feature.description}</p>
                        <div className="text-xs text-[#d4a574] font-medium bg-[#d4a574]/10 px-3 py-1 rounded-full">
                          {feature.benefit}
                        </div>
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
                <h3 className="text-3xl font-extrabold text-[#231c14] mb-8">Overall Benefits of Wood Grain Panels</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <CheckCircle className="w-6 h-6 text-[#d4a574] flex-shrink-0" />
                      <span className="text-[#231c14] font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="finishes" className="space-y-8">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent mb-6 text-center"
                >
                  Available Wood Finishes
                </motion.h2>
                <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                  Choose from our collection of authentic wood grain finishes, each carefully crafted to replicate natural timber.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {finishes.map((finish, i) => (
                    <motion.div
                      key={finish.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl ${
                        selectedFinish === finish.id
                          ? 'border-[#d4a574] bg-gradient-to-br from-[#faf7f3] to-white shadow-2xl'
                          : 'border-[#e2d5c4] bg-white hover:border-[#d4a574]'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div className="aspect-square bg-gradient-to-br from-[#f5f2ee] to-[#ede8e1] rounded-xl mb-4 flex items-center justify-center">
                        <TreePine className="w-12 h-12 text-[#d4a574]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#231c14] mb-2">{finish.name}</h3>
                      <p className="text-sm text-[#6b5c47] mb-3">{finish.description}</p>
                      <div className="text-xs text-[#d4a574] font-medium bg-[#d4a574]/10 px-3 py-1 rounded-full">
                        {finish.popularity}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent mb-6 text-center"
              >
                Installation Process
              </motion.h2>
              <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
                Our click-lock system makes installation quick and easy, perfect for DIY enthusiasts and professionals alike.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {installationSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956f] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-[#231c14] mb-3">{step.title}</h3>
                    <p className="text-[#6b5c47] text-sm leading-relaxed mb-3">{step.description}</p>
                    <div className="flex items-center justify-center text-xs text-[#d4a574] font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent mb-6 text-center"
              >
                Technical Specifications
              </motion.h2>
              <div className="bg-gradient-to-br from-[#faf7f3] to-white border border-[#e2d5c4] rounded-3xl p-12 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  {specifications.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex justify-between items-center py-3 border-b border-[#e2d5c4] last:border-b-0"
                    >
                      <span className="font-medium text-[#231c14]">{spec.label}</span>
                      <span className="text-[#6b5c47] text-right">{spec.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-[#faf7f3] to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#d4a574] via-[#c49d6f] to-[#b8956f] bg-clip-text text-transparent mb-6 text-center"
          >
            Perfect Applications
          </motion.h2>
          <p className="text-xl text-[#6b5c47] max-w-3xl mx-auto leading-relaxed text-center mb-16">
            Wood grain wall panels are versatile and suitable for a wide range of interior design applications.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="p-8 h-full bg-white border border-[#e2d5c4] hover:border-[#d4a574] transition-all duration-300 hover:shadow-xl rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a574] to-[#b8956f] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <app.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#231c14] mb-4">{app.title}</h3>
                  <p className="text-[#6b5c47] leading-relaxed mb-6">{app.description}</p>
                  <div className="space-y-2">
                    {app.examples.map((example, j) => (
                      <div key={j} className="flex items-center text-sm text-[#d4a574]">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2d1810] via-[#3a1f14] to-[#1f1208] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/20 to-[#b8956f]/20"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-6"
          >
            Ready to Transform Your Space?
          </motion.h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-12">
            Get a personalized quote for your wood grain wall panel project and discover how easy it is to bring natural beauty to your interior.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="bg-gradient-to-r from-[#d4a574] to-[#b8956f] text-white hover:from-[#b8956f] hover:to-[#d4a574] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Get Your Quote Now <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <Link
              to="/request-free-sample"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Request Free Sample
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </div>
  );
};

export default WoodGrainWallPanels;

