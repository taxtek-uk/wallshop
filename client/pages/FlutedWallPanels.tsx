import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Waves, 
  Palette, 
  Award, 
  Ruler, 
  Volume2, 
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  Clock,
  Lightbulb,
  Settings,
  Home,
  Building,
  Hotel,
  Users,
  Eye,
  Layers
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FlutedWallPanels = () => {
  const [selectedPattern, setSelectedPattern] = useState('classic-vertical');

  const patterns = [
    {
      id: 'classic-vertical',
      name: 'Classic Vertical',
      description: 'Traditional vertical fluting with 20mm groove spacing',
      image: '/public/images/fluted-wall-panel-hero.png',
      spacing: '20mm',
      depth: '8mm'
    },
    {
      id: 'wide-channel',
      name: 'Wide Channel',
      description: 'Contemporary wide channels with 40mm spacing',
      image: '/public/images/fluted-wall-panel-detail.png',
      spacing: '40mm',
      depth: '12mm'
    },
    {
      id: 'narrow-groove',
      name: 'Narrow Groove',
      description: 'Fine detailed grooves with 10mm spacing',
      image: '/public/images/fluted-wall-panel-hero.png',
      spacing: '10mm',
      depth: '6mm'
    },
    {
      id: 'curved-flute',
      name: 'Curved Flute',
      description: 'Elegant curved fluting for sophisticated interiors',
      image: '/public/images/fluted-wall-panel-detail.png',
      spacing: '25mm',
      depth: '10mm'
    }
  ];

  const specifications = [
    { label: 'Thickness', value: '18mm / 25mm' },
    { label: 'Width', value: '600mm / 1200mm' },
    { label: 'Length', value: '2400mm / Custom' },
    { label: 'Material', value: 'MDF with Veneer Finish' },
    { label: 'Groove Depth', value: '6mm - 12mm' },
    { label: 'Groove Spacing', value: '10mm - 40mm' },
    { label: 'Finish Options', value: '12 Premium Finishes' },
    { label: 'Warranty', value: '10 Years Structural' }
  ];

  const features = [
    {
      icon: Waves,
      title: 'Architectural Fluting',
      description: 'Precision-engineered vertical grooves create stunning visual depth and architectural interest.',
      benefit: 'Sophisticated design impact'
    },
    {
      icon: Volume2,
      title: 'Acoustic Enhancement',
      description: 'Fluted surface pattern provides natural sound diffusion and acoustic improvement.',
      benefit: 'Better room acoustics'
    },
    {
      icon: Eye,
      title: 'Visual Depth',
      description: 'Three-dimensional surface creates dynamic light and shadow play throughout the day.',
      benefit: 'Enhanced interior ambiance'
    },
    {
      icon: Palette,
      title: 'Premium Finishes',
      description: 'Available in 12 sophisticated finishes from natural wood to contemporary colors.',
      benefit: 'Perfect design integration'
    },
    {
      icon: Lightbulb,
      title: 'Lighting Integration',
      description: 'Grooves accommodate LED strip lighting for dramatic backlighting effects.',
      benefit: 'Customizable lighting features'
    },
    {
      icon: Layers,
      title: 'Modular System',
      description: 'Interlocking panel system enables seamless installation and future modifications.',
      benefit: 'Flexible design solutions'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Design Planning',
      description: 'Create detailed layout plan considering pattern alignment and lighting integration.',
      time: '2-3 hours'
    },
    {
      step: 2,
      title: 'Wall Preparation',
      description: 'Ensure wall surface is perfectly level and smooth for optimal fluted panel alignment.',
      time: '3-4 hours'
    },
    {
      step: 3,
      title: 'Panel Installation',
      description: 'Install panels with precision alignment to maintain consistent groove patterns.',
      time: '6-8 hours'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Complete installation with edge trims and optional lighting integration.',
      time: '2-3 hours'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Luxury Residential',
      description: 'Create stunning feature walls in living rooms, bedrooms, and dining areas.',
      examples: ['Living Room Feature Walls', 'Master Bedroom Headboards', 'Dining Room Accents']
    },
    {
      icon: Hotel,
      title: 'Hospitality Design',
      description: 'Elevate hotel lobbies, restaurants, and guest rooms with architectural elegance.',
      examples: ['Hotel Reception Areas', 'Restaurant Interior Design', 'Boutique Hotel Rooms']
    },
    {
      icon: Building,
      title: 'Commercial Spaces',
      description: 'Professional environments benefit from sophisticated fluted wall treatments.',
      examples: ['Corporate Reception Areas', 'Executive Office Walls', 'Retail Store Interiors']
    }
  ];

  const finishes = [
    { name: 'Natural Oak', color: '#D4A574', description: 'Warm oak with natural grain' },
    { name: 'Walnut Brown', color: '#8B4513', description: 'Rich walnut with deep tones' },
    { name: 'Charcoal Black', color: '#36454F', description: 'Contemporary charcoal finish' },
    { name: 'Pure White', color: '#FFFFFF', description: 'Clean white for modern spaces' },
    { name: 'Sage Green', color: '#9CAF88', description: 'Sophisticated sage green' },
    { name: 'Warm Grey', color: '#8B8680', description: 'Neutral warm grey tone' }
  ];

  const benefits = [
    'Creates dramatic architectural interest and visual depth',
    'Provides natural acoustic enhancement and sound diffusion',
    'Available in multiple groove patterns and spacing options',
    'Premium finish options complement any design aesthetic',
    'Integrated lighting capabilities for enhanced ambiance',
    'Modular system allows for creative design configurations',
    'Professional installation ensures perfect pattern alignment',
    'Suitable for both residential and commercial applications'
  ];

  const designConsiderations = [
    {
      title: 'Pattern Selection',
      description: 'Choose groove spacing and depth based on room scale and desired visual impact.',
      tips: ['Wide channels for large spaces', 'Narrow grooves for intimate areas', 'Consider viewing distance']
    },
    {
      title: 'Lighting Integration',
      description: 'Plan for LED strip lighting within grooves for dramatic backlighting effects.',
      tips: ['Warm white for cozy ambiance', 'Cool white for modern look', 'RGB for color changing']
    },
    {
      title: 'Finish Coordination',
      description: 'Select finishes that complement existing interior elements and color schemes.',
      tips: ['Match wood tones to flooring', 'Contrast with wall colors', 'Consider maintenance requirements']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20"></div>
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
                <span className="text-white">Fluted Wall Panels</span>
              </nav>
              
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Architectural Design
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Fluted Wall Panels
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Sophisticated architectural fluting creates stunning visual depth and acoustic enhancement. 
                Transform any space with precision-engineered vertical grooves and premium finishes.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £65/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">12 Finishes</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Custom Patterns</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Design Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Pattern Catalog
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
                    src="/public/images/fluted-wall-panel-hero.png"
                    alt="Fluted Wall Panels"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Waves className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Architectural Fluting</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Volume2 className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Acoustic Enhancement</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Eye className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Visual Depth</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Lightbulb className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">LED Integration</p>
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
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Architectural Excellence</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-amber-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                        {feature.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Design Considerations */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Design Considerations</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {designConsiderations.map((consideration, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-taupe-200">
                      <h4 className="text-lg font-bold text-mocha-900 mb-3">{consideration.title}</h4>
                      <p className="text-mocha-700 text-sm mb-4">{consideration.description}</p>
                      <div className="space-y-2">
                        {consideration.tips.map((tip, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Finishes */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Premium Finish Options</h3>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {finishes.map((finish, i) => (
                    <div key={i} className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-taupe-200 shadow-sm"
                        style={{ backgroundColor: finish.color }}
                      ></div>
                      <h4 className="font-semibold text-mocha-900 text-sm mb-1">{finish.name}</h4>
                      <p className="text-xs text-mocha-600">{finish.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Fluting Patterns</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {patterns.map((pattern) => (
                    <motion.div
                      key={pattern.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPattern === pattern.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-taupe-200 bg-white hover:border-amber-300'
                      }`}
                      onClick={() => setSelectedPattern(pattern.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={pattern.image}
                          alt={pattern.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-mocha-900 mb-2">{pattern.name}</h3>
                      <p className="text-mocha-700 mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                            <p className="text-sm font-medium text-mocha-900">Spacing</p>
                            <p className="text-lg font-bold text-amber-600">{pattern.spacing}</p>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                            <p className="text-sm font-medium text-mocha-900">Depth</p>
                            <p className="text-lg font-bold text-amber-600">{pattern.depth}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Professional Installation Process</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {installationSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="text-center p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                      <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                      <div className="text-xs text-amber-600 font-medium bg-amber-50 px-3 py-1 rounded-full">
                        {step.time}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Precision Installation Service</h3>
                  <p className="text-mocha-700 mb-6 leading-relaxed">
                    Our certified installers specialize in fluted panel systems, ensuring perfect pattern alignment 
                    and professional results. We guarantee precise groove spacing and seamless panel integration.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-mocha-700">Full installation: 8-12 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-mocha-700">Certified fluted panel specialists</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-mocha-700">LED lighting integration available</span>
                    </div>
                  </div>
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Fluted Panel Features</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Precision Fluting</h4>
                      <p className="text-sm text-mocha-700">CNC-machined grooves ensure consistent depth and spacing across all panels</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Acoustic Properties</h4>
                      <p className="text-sm text-mocha-700">Fluted surface provides natural sound diffusion and acoustic enhancement</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Lighting Integration</h4>
                      <p className="text-sm text-mocha-700">Grooves accommodate LED strip lighting for dramatic backlighting effects</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
              Design Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Fluted wall panels create sophisticated architectural interest in residential, commercial, 
              and hospitality environments.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-amber-800">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Transform Your Space
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Create stunning architectural interest with our precision-engineered fluted wall panels. 
              Professional design consultation and installation available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Design Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Request Pattern Samples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlutedWallPanels;

