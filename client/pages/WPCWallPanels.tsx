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
  Palette
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import QuoteModal from '@/components/QuoteModal';

const WPCWallPanels = () => {
  const [selectedFinish, setSelectedFinish] = useState('oak');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6f3] to-[#faf7f3]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#231c14]/90 to-[#231c14]/70"></div>
       
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/wall-panels" className="text-[#b69777] hover:text-[#907252] transition-colors">
              Wall Panels
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white">WPC Wall Panels</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-[#b69777]/20 text-[#b69777] border-[#b69777]/30">
                Premium WPC Collection
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC Wall <span className="text-[#b69777]">Panels</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Experience the perfect fusion of natural wood aesthetics and modern composite technology. Our WPC wall panels deliver exceptional durability, moisture resistance, and design versatility for any interior space.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  15 Year Warranty
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  Professional Installation
                </Badge>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  100% Waterproof
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  size="lg" 
                  className="bg-[#b69777] hover:bg-[#907252] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#231c14] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Brochure
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <img 
                  src="/images/walls/02.jpg" 
                  alt="WPC Wall Panel Detail" 
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <Droplets className="h-8 w-8 text-[#b69777] mx-auto mb-2" />
                    <p className="text-white font-semibold">100% Waterproof</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <Leaf className="h-8 w-8 text-[#b69777] mx-auto mb-2" />
                    <p className="text-white font-semibold">Eco-Friendly</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <Wrench className="h-8 w-8 text-[#b69777] mx-auto mb-2" />
                    <p className="text-white font-semibold">Easy Install</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <Award className="h-8 w-8 text-[#b69777] mx-auto mb-2" />
                    <p className="text-white font-semibold">15 Year Warranty</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-white/50 backdrop-blur-sm rounded-2xl p-2">
              <TabsTrigger value="overview" className="rounded-xl font-semibold">Overview</TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-xl font-semibold">Specifications</TabsTrigger>
              <TabsTrigger value="finishes" className="rounded-xl font-semibold">Finishes</TabsTrigger>
              <TabsTrigger value="installation" className="rounded-xl font-semibold">Installation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-16">
                {/* Key Features */}
                <div>
                  <h2 className="text-4xl font-bold text-[#231c14] mb-12 text-center">
                    Key Features & Benefits
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="h-full bg-white/70 backdrop-blur-sm border-[#e2d5c4] hover:shadow-lg transition-all duration-300 hover:scale-105">
                          <CardHeader className="text-center">
                            <feature.icon className="h-12 w-12 text-[#b69777] mx-auto mb-4" />
                            <CardTitle className="text-xl text-[#231c14]">{feature.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-[#6b5c47] text-center">{feature.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <h2 className="text-4xl font-bold text-[#231c14] mb-12 text-center">
                    Perfect Applications
                  </h2>
                  <div className="grid lg:grid-cols-3 gap-8">
                    {applications.map((app, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Card className="h-full bg-white/70 backdrop-blur-sm border-[#e2d5c4] hover:shadow-lg transition-all duration-300">
                          <CardHeader>
                            <app.icon className="h-12 w-12 text-[#b69777] mb-4" />
                            <CardTitle className="text-xl text-[#231c14]">{app.title}</CardTitle>
                            <CardDescription className="text-[#6b5c47]">{app.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {app.examples.map((example, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-[#6b5c47]">
                                  <CheckCircle className="h-4 w-4 text-[#b69777]" />
                                  {example}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits List */}
                <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-[#231c14] mb-8 text-center">
                    Why Choose WPC Wall Panels?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/50 transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 text-[#b69777] flex-shrink-0" />
                        <span className="text-[#6b5c47]">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-[#231c14] mb-12 text-center">
                  Technical Specifications
                </h2>
                <Card className="bg-white/70 backdrop-blur-sm border-[#e2d5c4]">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {specifications.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center p-4 rounded-xl bg-white/50">
                          <span className="font-semibold text-[#231c14]">{spec.label}</span>
                          <span className="text-[#6b5c47] font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="finishes">
              <div>
                <h2 className="text-4xl font-bold text-[#231c14] mb-12 text-center">
                  Available Finishes
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {finishes.map((finish) => (
                    <motion.div
                      key={finish.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                        selectedFinish === finish.id
                          ? 'border-[#b69777] bg-[#b69777]/10 shadow-lg'
                          : 'border-[#e2d5c4] bg-white/50 hover:border-[#b69777]/50'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div 
                        className="w-full h-32 rounded-xl mb-4 shadow-inner"
                        style={{ backgroundColor: finish.color }}
                      ></div>
                      <h3 className="text-lg font-semibold text-[#231c14] mb-2">{finish.name}</h3>
                      <p className="text-[#6b5c47] text-sm">{finish.description}</p>
                      {selectedFinish === finish.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-3 flex items-center gap-2 text-[#b69777]"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Selected</span>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation">
              <div>
                <h2 className="text-4xl font-bold text-[#231c14] mb-12 text-center">
                  Installation Process
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full bg-white/70 backdrop-blur-sm border-[#e2d5c4] hover:shadow-lg transition-all duration-300">
                        <CardHeader className="text-center">
                          <div className="w-12 h-12 bg-[#b69777] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                            {step.step}
                          </div>
                          <CardTitle className="text-lg text-[#231c14]">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-[#6b5c47] text-center text-sm">{step.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#231c14] to-[#3d3426]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get your free quote today and discover how WPC wall panels can elevate your interior design with unmatched durability and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setIsQuoteModalOpen(true)}
                size="lg" 
                className="bg-[#b69777] hover:bg-[#907252] text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Free Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#231c14] px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Today
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        productCategory="wall-panels"
      />
    </div>
  );
};

export default WPCWallPanels;

