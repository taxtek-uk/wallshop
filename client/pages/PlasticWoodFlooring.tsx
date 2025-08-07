import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Droplets,
  Layers,
  Award,
  Shield,
  Lock,
  ArrowRight,
  CheckCircle,
  Download,
  Phone,
  Mail,
  Clock,
  Zap,
  Building,
  Home,
  Hotel,
  Users,
  Palette,
  Mountain,
  Sparkles,
  Settings,
  Sun,
  Thermometer,
  Leaf,
  Flame,
  Wrench,
  TreePine,
  Waves,
  Scissors
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlasticWoodFlooring = () => {
  const [selectedStyle, setSelectedStyle] = useState('wood-grain');

  const styles = [
    {
      id: 'striped',
      name: 'Striped Style',
      description: 'Classic striped pattern with hollow core construction',
      image: '/images/plastic-wood-flooring-hero.png',
      category: 'Classic',
      applications: ['Outdoor Decking', 'Balconies', 'Terraces']
    },
    {
      id: 'wood-grain',
      name: 'Wood Grain Style',
      description: 'Natural wood grain texture with authentic appearance',
      image: '/images/plastic-wood-flooring-detail.png',
      category: 'Natural',
      applications: ['Residential Decking', 'Garden Paths', 'Pool Areas']
    },
    {
      id: 'coextruded',
      name: '2nd Generation Coextruded',
      description: 'Advanced coextruded technology for superior performance',
      image: '/images/plastic-wood-flooring-hero.png',
      category: 'Premium',
      applications: ['Commercial Decking', 'Marine Applications', 'High-Traffic Areas']
    }
  ];

  const specifications = [
    { label: 'Core Technology', value: 'Wood-Plastic Composite (WPC)' },
    { label: 'Waterproof Rating', value: '100% Waterproof' },
    { label: 'Construction', value: 'Hollow Core Design' },
    { label: 'Installation', value: 'Binding Strip & Screw System' },
    { label: 'Surface Finish', value: 'Natural Wood Grain' },
    { label: 'Fire Rating', value: 'Flame-Retardant' },
    { label: 'Environmental Rating', value: 'Pro-Environment' },
    { label: 'Warranty', value: '15 Years Performance' }
  ];

  const features = [
    {
      icon: Droplets,
      title: '100% Waterproof',
      description: 'Advanced waterproof and anticorrosive construction without deformation. The front flow film effectively prevents water infiltration, while the reverse grille increases evaporation at ground junction.',
      benefit: 'Perfect for outdoor and wet environments'
    },
    {
      icon: Leaf,
      title: 'Pro-Environment',
      description: 'Made from eco-friendly wood-plastic composite materials with zero formaldehyde emission, contributing to sustainable construction and healthier environments.',
      benefit: 'Sustainable and healthy choice'
    },
    {
      icon: Flame,
      title: 'Flame-Retardant',
      description: 'Excellent fire and flame retardant properties with good weather resistance. Provides effective heat insulation and aging resistance for long-term outdoor use.',
      benefit: 'Enhanced safety and durability'
    },
    {
      icon: Wrench,
      title: 'Easy to Maintain',
      description: 'High density construction provides superior wear resistance and pressure resistance. Made through high temperature extrusion for consistent quality and easy maintenance.',
      benefit: 'Low maintenance and long-lasting'
    },
    {
      icon: Scissors,
      title: 'Customizable Shapes',
      description: 'Can be cut into any shape you want and spliced into different configurations. Every section is complete, making design flexibility no longer difficult.',
      benefit: 'Unlimited design possibilities'
    },
    {
      icon: Settings,
      title: 'Easy Installation',
      description: 'Simple installation system with binding strip, clasp, keel, and screw components. Professional installation tools and methods ensure perfect results.',
      benefit: 'Quick and professional installation'
    }
  ];

  const constructionDetails = [
    {
      component: 'Hollow Core Design',
      description: 'Lightweight hollow chambers reduce weight while maintaining structural integrity.',
      benefits: ['40% lighter than solid boards', 'Better thermal insulation', 'Improved drainage']
    },
    {
      component: 'Binding Strip System',
      description: 'Precision-engineered binding strips ensure secure and seamless connections.',
      benefits: ['Secure fastening', 'Weather-tight seals', 'Professional appearance']
    },
    {
      component: 'Clasp Mechanism',
      description: 'Advanced clasp system provides additional security and stability.',
      benefits: ['Enhanced stability', 'Easy maintenance access', 'Secure connections']
    },
    {
      component: 'Keel Structure',
      description: 'Integrated keel design provides structural support and drainage.',
      benefits: ['Superior drainage', 'Structural integrity', 'Long-term stability']
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Preparation',
      description: 'Prepare the installation surface ensuring it is level, clean, and properly drained.',
      time: '60 minutes'
    },
    {
      step: 2,
      title: 'Keel Installation',
      description: 'Install the keel structure with proper spacing and alignment for optimal support.',
      time: '90 minutes'
    },
    {
      step: 3,
      title: 'Board Installation',
      description: 'Install boards using the binding strip and clasp system for secure connections.',
      time: '120 minutes'
    },
    {
      step: 4,
      title: 'Finishing',
      description: 'Complete installation with proper fastening and final quality inspection.',
      time: '45 minutes'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Outdoor Spaces',
      description: 'Perfect for residential decking, patios, and outdoor living areas requiring beauty and durability.',
      examples: ['Garden Decking', 'Balconies', 'Terraces', 'Pool Areas']
    },
    {
      icon: Building,
      title: 'Commercial Environments',
      description: 'Ideal for commercial outdoor spaces requiring high performance and low maintenance.',
      examples: ['Restaurant Patios', 'Office Terraces', 'Retail Outdoor Areas', 'Public Walkways']
    },
    {
      icon: Waves,
      title: 'Marine & Waterfront',
      description: 'Excellent for marine applications where waterproof performance is critical.',
      examples: ['Boat Decks', 'Waterfront Walkways', 'Pier Decking', 'Marina Facilities']
    }
  ];

  const styleCategories = [
    { name: 'Striped Collection', count: 8, description: 'Classic striped patterns' },
    { name: 'Wood Grain Series', count: 12, description: 'Natural wood textures' },
    { name: 'Coextruded Premium', count: 6, description: 'Advanced coextruded styles' }
  ];

  const benefits = [
    '100% waterproof construction suitable for all outdoor environments',
    'Pro-environment materials with zero formaldehyde emission for healthy living',
    'Flame-retardant properties provide enhanced fire safety protection',
    'Easy to maintain surface resists stains, scratches, and weather damage',
    'Customizable shapes allow unlimited design flexibility and creativity',
    'Easy installation system with professional binding strip and clasp mechanism',
    'Hollow core design provides lightweight construction with superior strength',
    '15-year performance warranty for long-term confidence'
  ];

  const technicalAdvantages = [
    {
      title: 'Hollow Core Technology',
      description: 'Lightweight hollow chambers reduce weight while maintaining structural integrity.',
      specs: ['Weight Reduction: 40%', 'Thermal Insulation: Enhanced', 'Drainage: Improved']
    },
    {
      title: 'Wood-Plastic Composite',
      description: 'Advanced WPC materials combine the beauty of wood with plastic durability.',
      specs: ['Wood Content: 60%', 'Plastic Content: 40%', 'Formaldehyde: Zero Emission']
    },
    {
      title: 'Professional Installation',
      description: 'Complete installation system with binding strips, clasps, and keel structure.',
      specs: ['Installation Speed: 3x faster', 'Connection Strength: Superior', 'Weather Sealing: 100%']
    }
  ];

  const performanceData = [
    { metric: 'Waterproof Rating', value: '100%', standard: 'ASTM D570' },
    { metric: 'Fire Resistance', value: 'Flame-Retardant', standard: 'ASTM E84' },
    { metric: 'Weather Resistance', value: 'Excellent', standard: 'ASTM G154' },
    { metric: 'Formaldehyde Emission', value: 'E0', standard: 'EN 717-1' },
    { metric: 'Temperature Range', value: '-40°C to 70°C', standard: 'ISO 75' },
    { metric: 'Slip Resistance', value: 'R11', standard: 'DIN 51130' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-red-700">
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
                <span className="text-white">Plastic Wood Flooring</span>
              </nav>
              
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Wood-Plastic Composite Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                Plastic Wood Flooring
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience the perfect combination of natural wood beauty and modern durability with our 
                Plastic Wood Flooring. Waterproof, eco-friendly, and flame-retardant for outdoor excellence.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £28/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">100% Waterproof</Badge>
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Explore Wood Flooring <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Product Catalog
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
                    src="/images/plastic-wood-flooring-hero.png"
                    alt="Plastic Wood Flooring"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Leaf className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Pro-Environment</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Flame className="w-6 h-6 text-red-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Flame-Retardant</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Wrench className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Easy to Maintain</p>
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
              <TabsTrigger value="styles">Styles</TabsTrigger>
              <TabsTrigger value="construction">Construction</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Wood-Plastic Innovation</h2>
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

              {/* Technical Advantages */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Technical Advantages</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {technicalAdvantages.map((advantage, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-taupe-200">
                      <h4 className="text-lg font-bold text-mocha-900 mb-3">{advantage.title}</h4>
                      <p className="text-mocha-700 text-sm mb-4">{advantage.description}</p>
                      <div className="space-y-2">
                        {advantage.specs.map((spec, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Data */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Performance Data</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {performanceData.map((data, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-taupe-200 text-center">
                      <h4 className="font-semibold text-mocha-900 mb-1">{data.metric}</h4>
                      <p className="text-2xl font-bold text-amber-600 mb-1">{data.value}</p>
                      <p className="text-xs text-mocha-600">{data.standard}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Style Categories */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Style Collection</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {styleCategories.map((category, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-taupe-200 text-center">
                      <h4 className="font-semibold text-mocha-900 mb-1">{category.name}</h4>
                      <p className="text-2xl font-bold text-amber-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="styles" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Three Different Styles</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  {styles.map((style) => (
                    <motion.div
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedStyle === style.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-taupe-200 bg-white hover:border-amber-300'
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={style.image}
                          alt={style.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-mocha-900">{style.name}</h3>
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          {style.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{style.description}</p>
                      
                      {selectedStyle === style.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                            <p className="text-sm font-medium text-mocha-900">Hollow Core Construction</p>
                            <p className="text-lg font-bold text-amber-600">WPC Technology</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {style.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                  <span className="text-sm text-mocha-700">{app}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="construction" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Hollow Core Construction</h2>
                <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src="/images/plastic-wood-flooring-detail.png"
                        alt="Plastic Wood Construction"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-6">
                      {constructionDetails.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white p-6 rounded-xl border border-taupe-200"
                        >
                          <h4 className="text-lg font-bold text-mocha-900 mb-3">{detail.component}</h4>
                          <p className="text-sm text-mocha-700 mb-4">{detail.description}</p>
                          <div className="space-y-2">
                            {detail.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <span className="text-sm text-mocha-700">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-8 bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl">
                  <h3 className="text-2xl font-bold text-mocha-900 mb-4">Installation Process</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {installationSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="text-center p-6 bg-white border border-taupe-200 rounded-xl"
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Wood-Plastic Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Hollow Core Technology</h4>
                      <p className="text-sm text-mocha-700">Lightweight construction with superior strength and drainage</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Wood-Plastic Composite</h4>
                      <p className="text-sm text-mocha-700">Natural wood beauty with plastic durability and performance</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Pro-Environment Materials</h4>
                      <p className="text-sm text-mocha-700">Zero formaldehyde emission for healthy outdoor environments</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
              Outdoor Excellence Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Our Plastic Wood Flooring provides exceptional performance and beauty 
              for residential, commercial, and marine outdoor environments.
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
      <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-red-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience Wood-Plastic Excellence
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform your outdoor space with the perfect combination of natural wood beauty and modern durability. 
              Request samples to experience the wood-plastic difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Wood Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Outdoor Flooring Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlasticWoodFlooring;

