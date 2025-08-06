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

const WPCWallPanels = () => {
  const [selectedFinish, setSelectedFinish] = useState('oak');

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
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-mocha-950 via-leather-800 to-olive-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-clay-500/20 to-taupe-500/20"></div>
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
              
              <div className="bg-gradient-to-r from-clay-500 to-leather-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Premium WPC Collection
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC Wall Panels
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience the perfect fusion of natural wood aesthetics and modern composite technology. 
                Our WPC wall panels deliver exceptional durability, moisture resistance, and design versatility 
                for any interior space.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £45/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Professional Installation</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-clay-500 to-leather-600 text-white hover:from-leather-600 hover:to-clay-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
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
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="aspect-video bg-white/5 rounded-2xl overflow-hidden mb-6 shadow-md">
                  <img
                    src="/client/images/wpc-wall-panel-hero.png"
                    alt="WPC Wall Panels Installation"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-clay-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">100% Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Leaf className="w-6 h-6 text-clay-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Eco-Friendly</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Wrench className="w-6 h-6 text-clay-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Easy Install</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-clay-400 mx-auto mb-2" />
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Key Features & Benefits</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-clay-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay-400 to-leather-500 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Why Choose WPC Wall Panels?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-clay-600 flex-shrink-0" />
                      <span className="text-mocha-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-mocha-900 mb-8">Technical Specifications</h2>
                  <div className="space-y-4">
                    {specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                        <span className="font-medium text-mocha-900">{spec.label}</span>
                        <span className="text-mocha-700 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Material Composition</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Wood Fiber (60%)</h4>
                      <p className="text-sm text-mocha-700">High-quality wood fibers provide natural appearance and texture</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Plastic Polymer (35%)</h4>
                      <p className="text-sm text-mocha-700">Recycled plastic ensures durability and moisture resistance</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Additives (5%)</h4>
                      <p className="text-sm text-mocha-700">UV stabilizers, colorants, and performance enhancers</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="finishes" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Available Finishes</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {finishes.map((finish) => (
                    <motion.div
                      key={finish.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedFinish === finish.id
                          ? 'border-clay-500 bg-clay-50'
                          : 'border-taupe-200 bg-white hover:border-clay-300'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div 
                        className="w-full h-24 rounded-lg mb-4 shadow-inner"
                        style={{ backgroundColor: finish.color }}
                      ></div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-2">{finish.name}</h3>
                      <p className="text-sm text-mocha-700">{finish.description}</p>
                      {selectedFinish === finish.id && (
                        <div className="mt-3 flex items-center text-clay-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Installation Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay-400 to-leather-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-mocha-700 leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Professional Installation Service</h3>
                  <p className="text-mocha-700 mb-6 leading-relaxed">
                    Our certified installation team ensures perfect results with every project. We provide comprehensive 
                    installation services including site survey, preparation, and post-installation support.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-clay-600" />
                      <span className="text-sm text-mocha-700">Typical installation: 1-2 days</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-clay-600" />
                      <span className="text-sm text-mocha-700">Certified installers</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-clay-600" />
                      <span className="text-sm text-mocha-700">Installation warranty included</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-gradient-to-br from-clay-50 to-taupe-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-clay-600 via-taupe-600 to-leather-600 bg-clip-text text-transparent mb-6">
              Perfect Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              WPC wall panels excel in diverse environments, offering versatility and performance for any project.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-clay-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-clay-400 to-leather-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-clay-600 flex-shrink-0" />
                      <span className="text-sm text-mocha-700">{example}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-mocha-950 via-leather-800 to-olive-900">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Get expert consultation and professional installation for your WPC wall panel project. 
              Contact us today for a free quote and design consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-clay-500 to-leather-600 text-white hover:from-leather-600 hover:to-clay-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call for Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Enquiry
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WPCWallPanels;

