import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Diamond, 
  Layers, 
  Award, 
  Shield, 
  Droplets, 
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
  Hammer
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SPCBackgroundWall = () => {
  const [selectedStone, setSelectedStone] = useState('carrara');

  const stonePatterns = [
    {
      id: 'carrara',
      name: 'Carrara Marble',
      description: 'Classic white marble with elegant grey veining',
      image: '/public/images/spc-background-wall-hero.png',
      category: 'Marble',
      applications: ['Luxury Interiors', 'Feature Walls', 'Commercial Lobbies']
    },
    {
      id: 'emperador',
      name: 'Dark Emperador',
      description: 'Rich brown marble with golden veining',
      image: '/public/images/spc-background-wall-detail.png',
      category: 'Marble',
      applications: ['Executive Offices', 'Hotel Lobbies', 'Residential Features']
    },
    {
      id: 'travertine',
      name: 'Travertine Stone',
      description: 'Natural limestone with organic texture',
      image: '/public/images/spc-background-wall-hero.png',
      category: 'Stone',
      applications: ['Spa Environments', 'Natural Interiors', 'Wellness Centers']
    },
    {
      id: 'granite',
      name: 'Black Galaxy Granite',
      description: 'Deep black granite with metallic flecks',
      image: '/public/images/spc-background-wall-detail.png',
      category: 'Granite',
      applications: ['Modern Interiors', 'Commercial Spaces', 'Contemporary Design']
    }
  ];

  const specifications = [
    { label: 'Core Technology', value: 'Stone Plastic Composite (SPC)' },
    { label: 'Rigidity Rating', value: 'Super Rigid (Class A)' },
    { label: 'Thickness', value: '5.5mm Premium Grade' },
    { label: 'Standard Size', value: '1200mm × 3000mm' },
    { label: 'Surface Finish', value: 'Glossy / Matte Options' },
    { label: 'Fire Rating', value: 'B1 (Low Flammability)' },
    { label: 'Environmental Rating', value: 'E0 (Zero Formaldehyde)' },
    { label: 'Warranty', value: '20 Years Structural' }
  ];

  const features = [
    {
      icon: Diamond,
      title: 'Super Rigidity',
      description: 'Advanced SPC technology provides exceptional dimensional stability and resistance to warping or bending.',
      benefit: 'Long-term structural integrity'
    },
    {
      icon: Mountain,
      title: 'Authentic Stone Patterns',
      description: 'High-definition printing captures the natural beauty and texture of premium stone materials.',
      benefit: 'Luxury appearance at affordable cost'
    },
    {
      icon: Droplets,
      title: 'Complete Waterproof',
      description: 'SPC core construction provides 100% waterproof performance for any environment.',
      benefit: 'Suitable for wet areas'
    },
    {
      icon: Shield,
      title: 'Impact Resistance',
      description: 'Stone plastic composite construction offers superior impact resistance and durability.',
      benefit: 'Commercial-grade performance'
    },
    {
      icon: Zap,
      title: 'Easy Installation',
      description: 'Lightweight SPC construction enables faster installation compared to natural stone.',
      benefit: 'Reduced installation costs'
    },
    {
      icon: Sparkles,
      title: 'Low Maintenance',
      description: 'Non-porous surface requires minimal maintenance and resists staining.',
      benefit: 'Lifetime cost savings'
    }
  ];

  const layerStructure = [
    {
      layer: 1,
      name: 'PETG Layer',
      description: 'Premium protective layer providing scratch resistance and surface durability.',
      thickness: '0.3mm'
    },
    {
      layer: 2,
      name: 'Laser Inking Layer',
      description: 'High-definition printed stone pattern with permanent color stability.',
      thickness: '0.2mm'
    },
    {
      layer: 3,
      name: 'SPC Wall Panel Core',
      description: 'Stone plastic composite core providing super rigidity and dimensional stability.',
      thickness: '5.0mm'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Wall Preparation',
      description: 'Ensure wall surface is clean, dry, and level. Check for any structural issues.',
      time: '30 minutes'
    },
    {
      step: 2,
      title: 'Pattern Layout',
      description: 'Plan stone pattern layout to optimize visual flow and minimize waste.',
      time: '20 minutes'
    },
    {
      step: 3,
      title: 'Panel Cutting',
      description: 'Cut SPC panels to required dimensions using appropriate cutting tools.',
      time: '25 minutes'
    },
    {
      step: 4,
      title: 'Installation',
      description: 'Install panels using mechanical fixing or adhesive method as appropriate.',
      time: '60 minutes'
    }
  ];

  const applications = [
    {
      icon: Building,
      title: 'Commercial Architecture',
      description: 'Professional installations for corporate offices, retail spaces, and public buildings.',
      examples: ['Corporate Reception Areas', 'Retail Store Features', 'Public Building Lobbies']
    },
    {
      icon: Home,
      title: 'Luxury Residential',
      description: 'High-end home applications where natural stone appearance is desired.',
      examples: ['Living Room Feature Walls', 'Master Bedroom Accents', 'Home Theater Design']
    },
    {
      icon: Hotel,
      title: 'Hospitality Industry',
      description: 'Durable and beautiful solutions for hotels, restaurants, and entertainment venues.',
      examples: ['Hotel Lobby Features', 'Restaurant Interior Design', 'Spa Treatment Rooms']
    }
  ];

  const stoneCategories = [
    { name: 'Marble Collection', count: 18, description: 'Classic and exotic marble patterns' },
    { name: 'Granite Series', count: 12, description: 'Durable granite textures' },
    { name: 'Limestone & Travertine', count: 9, description: 'Natural limestone variations' },
    { name: 'Slate & Quartzite', count: 8, description: 'Contemporary stone finishes' },
    { name: 'Onyx & Precious Stone', count: 6, description: 'Luxury stone patterns' },
    { name: 'Concrete & Industrial', count: 4, description: 'Modern concrete effects' }
  ];

  const benefits = [
    'Super rigid SPC technology provides exceptional dimensional stability',
    'Authentic stone patterns with high-definition printing quality',
    'Complete waterproof construction suitable for any environment',
    'Superior impact resistance for commercial-grade applications',
    'Lightweight construction enables faster, easier installation',
    'Zero formaldehyde emission ensures healthy indoor air quality',
    'Non-porous surface resists staining and requires minimal maintenance',
    '20-year structural warranty provides long-term confidence'
  ];

  const technicalAdvantages = [
    {
      title: 'SPC Core Technology',
      description: 'Stone plastic composite provides superior rigidity and dimensional stability.',
      specs: ['Density: 2.0-2.1 g/cm³', 'Flexural Strength: >40 MPa', 'Thermal Expansion: <0.1%']
    },
    {
      title: 'PETG Protection',
      description: 'Premium PETG layer provides exceptional surface protection and clarity.',
      specs: ['Scratch Resistance: 4H+', 'Chemical Resistance: Class A', 'UV Stability: 1000+ hours']
    },
    {
      title: 'Laser Inking Process',
      description: 'Advanced laser printing ensures permanent pattern adhesion and color stability.',
      specs: ['Color Fastness: Grade 8', 'Pattern Resolution: Ultra HD', 'Fade Resistance: 25+ years']
    }
  ];

  const performanceData = [
    { metric: 'Flexural Strength', value: '40+ MPa', standard: 'ASTM D790' },
    { metric: 'Impact Resistance', value: '15+ kJ/m²', standard: 'ISO 179' },
    { metric: 'Water Absorption', value: '<0.1%', standard: 'ASTM D570' },
    { metric: 'Thermal Stability', value: '80°C', standard: 'ISO 75' },
    { metric: 'Fire Rating', value: 'B1', standard: 'EN 13501-1' },
    { metric: 'Formaldehyde Emission', value: 'E0', standard: 'EN 717-1' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-stone-900 via-slate-800 to-gray-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-500/20 to-slate-500/20"></div>
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
                <span className="text-white">SPC Background Wall</span>
              </nav>
              
              <div className="bg-gradient-to-r from-stone-500 to-slate-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Super Rigidity Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                SPC Background Wall
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Advanced Stone Plastic Composite technology delivers super rigidity and authentic stone 
                patterns. Experience the luxury of natural stone with superior performance and durability.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £42/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">Super Rigid SPC</Badge>
                <Badge className="bg-white/20 text-white border-white/30">20 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-stone-500 to-slate-600 text-white hover:from-slate-600 hover:to-stone-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Explore Stone Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Technical Data
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
                    src="/public/images/spc-background-wall-hero.png"
                    alt="SPC Background Wall"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Diamond className="w-6 h-6 text-stone-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Super Rigidity</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Mountain className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Stone Patterns</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">20 Year Warranty</p>
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
              <TabsTrigger value="stones">Stone Patterns</TabsTrigger>
              <TabsTrigger value="construction">Construction</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">SPC Technology Excellence</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-stone-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-400 to-slate-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-stone-600 font-medium bg-stone-50 px-3 py-1 rounded-full">
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
                            <CheckCircle className="w-4 h-4 text-stone-600 flex-shrink-0" />
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
                      <p className="text-2xl font-bold text-stone-600 mb-1">{data.value}</p>
                      <p className="text-xs text-mocha-600">{data.standard}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stone Categories */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Stone Collection</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stoneCategories.map((category, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-taupe-200 text-center">
                      <h4 className="font-semibold text-mocha-900 mb-1">{category.name}</h4>
                      <p className="text-2xl font-bold text-stone-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stones" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Premium Stone Collection</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {stonePatterns.map((stone) => (
                    <motion.div
                      key={stone.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedStone === stone.id
                          ? 'border-stone-500 bg-stone-50'
                          : 'border-taupe-200 bg-white hover:border-stone-300'
                      }`}
                      onClick={() => setSelectedStone(stone.id)}
                    >
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={stone.image}
                          alt={stone.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-mocha-900">{stone.name}</h3>
                        <Badge variant="outline" className="text-stone-600 border-stone-300">
                          {stone.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{stone.description}</p>
                      
                      {selectedStone === stone.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-stone-200">
                            <p className="text-sm font-medium text-mocha-900">SPC Technology</p>
                            <p className="text-lg font-bold text-stone-600">Super Rigid Core</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {stone.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-stone-600 flex-shrink-0" />
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">3-Layer SPC Construction</h2>
                <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src="/public/images/spc-background-wall-detail.png"
                        alt="SPC Construction"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-6">
                      {layerStructure.map((layer, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white p-6 rounded-xl border border-taupe-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-400 to-slate-500 flex items-center justify-center text-white font-bold text-lg">
                              {layer.layer}
                            </div>
                            <span className="text-sm font-medium text-stone-600">{layer.thickness}</span>
                          </div>
                          <h4 className="text-lg font-bold text-mocha-900 mb-2">{layer.name}</h4>
                          <p className="text-sm text-mocha-700">{layer.description}</p>
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-400 to-slate-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                        <div className="text-xs text-stone-600 font-medium bg-stone-50 px-3 py-1 rounded-full">
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">SPC Technology Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Stone Plastic Composite</h4>
                      <p className="text-sm text-mocha-700">Advanced composite technology provides superior rigidity and dimensional stability</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Laser Inking Process</h4>
                      <p className="text-sm text-mocha-700">High-definition stone patterns with permanent color stability and authenticity</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">PETG Protection</h4>
                      <p className="text-sm text-mocha-700">Premium protective layer ensures long-lasting beauty and performance</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-stone-600 via-slate-600 to-stone-600 bg-clip-text text-transparent mb-6">
              Architectural Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              SPC technology delivers the luxury appearance of natural stone with superior performance 
              and durability for any architectural application.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-stone-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-stone-400 to-slate-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-stone-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-stone-900 via-slate-800 to-gray-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience SPC Technology
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover the perfect combination of natural stone beauty and advanced composite performance. 
              Request samples to experience the SPC difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-stone-500 to-slate-600 text-white hover:from-slate-600 hover:to-stone-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Stone Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Technical Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SPCBackgroundWall;

