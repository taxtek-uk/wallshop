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
  Wrench
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SPCStoneCrystalFlooring = () => {
  const [selectedPattern, setSelectedPattern] = useState('wood-grain');

  const patterns = [
    {
      id: 'wood-grain',
      name: 'Natural Wood Grain',
      description: 'Authentic wood grain patterns with crystal-clear finish',
      image: '/images/spc-stone-crystal-flooring-hero.png',
      category: 'Wood',
      applications: ['Living Rooms', 'Bedrooms', 'Offices']
    },
    {
      id: 'stone-texture',
      name: 'Stone Texture',
      description: 'Realistic stone textures with superior durability',
      image: '/images/spc-stone-crystal-flooring-detail.png',
      category: 'Stone',
      applications: ['Kitchens', 'Bathrooms', 'Commercial Spaces']
    },
    {
      id: 'marble-veining',
      name: 'Marble Veining',
      description: 'Elegant marble patterns with crystal clarity',
      image: '/images/spc-stone-crystal-flooring-hero.png',
      category: 'Marble',
      applications: ['Luxury Interiors', 'Hotels', 'Retail Spaces']
    }
  ];

  const specifications = [
    { label: 'Core Technology', value: 'Stone Plastic Composite (SPC)' },
    { label: 'Waterproof Rating', value: '100% Waterproof' },
    { label: 'Thickness', value: '5mm' },
    { label: 'Standard Size', value: '1200mm × 182mm' },
    { label: 'Surface Finish', value: 'Crystal Clear UV Layer' },
    { label: 'Fire Rating', value: 'Flame-Retardant' },
    { label: 'Environmental Rating', value: 'Pro-Environment' },
    { label: 'Warranty', value: '20 Years Performance' }
  ];

  const features = [
    {
      icon: Droplets,
      title: '100% Waterproof',
      description: 'Engineered with a stone plastic composite core that is completely impervious to water, making it ideal for any room including bathrooms and kitchens.',
      benefit: 'Perfect for all areas of your home'
    },
    {
      icon: Leaf,
      title: 'Pro-Environment',
      description: 'Made from eco-friendly materials with zero formaldehyde emission, contributing to healthier indoor air quality and environmental sustainability.',
      benefit: 'Healthy and sustainable choice'
    },
    {
      icon: Flame,
      title: 'Flame-Retardant',
      description: 'Advanced flame-retardant properties provide enhanced fire safety, meeting strict building codes and safety requirements.',
      benefit: 'Enhanced fire safety protection'
    },
    {
      icon: Wrench,
      title: 'Easy to Maintain',
      description: 'The non-porous surface resists stains, scratches, and daily wear, requiring minimal maintenance while retaining its beautiful appearance.',
      benefit: 'Low maintenance and long-lasting'
    },
    {
      icon: Mountain,
      title: 'Super Rigidity',
      description: 'The high-density SPC core provides exceptional dimensional stability and resistance to impacts, ensuring long-term performance.',
      benefit: 'Commercial-grade durability'
    },
    {
      icon: Lock,
      title: 'Locking Splicing',
      description: 'Precision-engineered locking mechanism ensures a tight, seamless fit that prevents moisture penetration and simplifies installation.',
      benefit: 'Professional installation results'
    }
  ];

  const layerStructure = [
    {
      layer: 1,
      name: 'UV Layer',
      description: 'Waterproof, non-slip and corrosion resistant protective coating.',
      thickness: '0.1mm'
    },
    {
      layer: 2,
      name: 'Wear-Resistant Layer',
      description: 'Scratch and abrasion resistant layer for enhanced durability.',
      thickness: '0.3mm'
    },
    {
      layer: 3,
      name: 'Ultra Clear Color Printing Layer',
      description: 'High-definition printed patterns that restore natural texture.',
      thickness: '0.2mm'
    },
    {
      layer: 4,
      name: 'SPC Substrate Layer',
      description: 'High density substrate with locking design for superior stability.',
      thickness: '4.4mm'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Floor Preparation',
      description: 'Ensure subfloor is clean, dry, level, and smooth. Remove any debris or irregularities.',
      time: '45 minutes'
    },
    {
      step: 2,
      title: 'Acclimatization',
      description: 'Allow flooring to acclimate to room temperature for optimal installation results.',
      time: '24 hours'
    },
    {
      step: 3,
      title: 'Locking Installation',
      description: 'Install planks using the precision locking mechanism, ensuring tight, seamless joints.',
      time: '60 minutes'
    },
    {
      step: 4,
      title: 'Finishing',
      description: 'Install trim and transitions for a complete, professional finish.',
      time: '30 minutes'
    }
  ];

  const applications = [
    {
      icon: Home,
      title: 'Residential Spaces',
      description: 'Perfect for all areas of the home, providing beauty, comfort, and durability.',
      examples: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms']
    },
    {
      icon: Building,
      title: 'Commercial Environments',
      description: 'Ideal for high-traffic commercial spaces requiring durability and easy maintenance.',
      examples: ['Offices', 'Retail Stores', 'Restaurants', 'Healthcare Facilities']
    },
    {
      icon: Hotel,
      title: 'Hospitality & Public Spaces',
      description: 'Suitable for demanding environments where performance and aesthetics are crucial.',
      examples: ['Hotels', 'Shopping Malls', 'Gyms', 'Educational Facilities']
    }
  ];

  const patternCategories = [
    { name: 'Wood Grain Collection', count: 24, description: 'Natural wood patterns' },
    { name: 'Stone Texture Series', count: 18, description: 'Realistic stone finishes' },
    { name: 'Marble Veining', count: 12, description: 'Elegant marble patterns' },
    { name: 'Contemporary Designs', count: 8, description: 'Modern abstract patterns' }
  ];

  const benefits = [
    '100% waterproof construction suitable for any room including wet areas',
    'Pro-environment materials with zero formaldehyde emission for healthy living',
    'Flame-retardant properties provide enhanced fire safety protection',
    'Easy to maintain surface resists stains, scratches, and daily wear',
    'Super rigidity from high-density SPC core ensures dimensional stability',
    'Locking splicing mechanism for secure, seamless installation',
    'Crystal clear UV layer provides superior surface protection',
    '20-year performance warranty for long-term confidence'
  ];

  const technicalAdvantages = [
    {
      title: 'SPC Core Technology',
      description: 'High-density stone plastic composite core provides superior rigidity and stability.',
      specs: ['Density: 2.0-2.1 g/cm³', 'Water Absorption: 0%', 'Dimensional Stability: <0.05%']
    },
    {
      title: 'Crystal Clear UV Protection',
      description: 'Advanced UV layer provides waterproof, non-slip, and corrosion resistant surface.',
      specs: ['UV Resistance: 1500+ hours', 'Non-slip Rating: R10', 'Corrosion Resistance: Class A']
    },
    {
      title: 'Precision Locking System',
      description: 'Engineered locking mechanism ensures tight, seamless joints for professional results.',
      specs: ['Joint Strength: >2.0 kN/m', 'Installation Speed: 3x faster', 'Moisture Sealing: 100%']
    }
  ];

  const performanceData = [
    { metric: 'Waterproof Rating', value: '100%', standard: 'ASTM D570' },
    { metric: 'Impact Resistance', value: '12+ kJ/m²', standard: 'ISO 179' },
    { metric: 'Fire Rating', value: 'Flame-Retardant', standard: 'EN 13501-1' },
    { metric: 'Formaldehyde Emission', value: 'E0', standard: 'EN 717-1' },
    { metric: 'Thermal Stability', value: '-30°C to 70°C', standard: 'ISO 75' },
    { metric: 'Wear Resistance', value: 'AC5', standard: 'EN 13329' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-gray-900 via-stone-800 to-slate-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-stone-500/20"></div>
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
                <span className="text-white">SPC Stone Crystal Flooring</span>
              </nav>
              
              <div className="bg-gradient-to-r from-gray-500 to-stone-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                Crystal Clear Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                SPC Stone Crystal Flooring
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience the perfect combination of beauty and performance with our SPC Stone Crystal Flooring. 
                Waterproof, eco-friendly, and flame-retardant with crystal-clear finish for ultimate durability.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £32/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">100% Waterproof</Badge>
                <Badge className="bg-white/20 text-white border-white/30">20 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-500 to-stone-600 text-white hover:from-stone-600 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Explore Crystal Flooring <ArrowRight className="ml-2 h-5 w-5" />
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
                    src="/images/spc-stone-crystal-flooring-hero.png"
                    alt="SPC Stone Crystal Flooring"
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
                    <Mountain className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Super Rigidity</p>
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
              <TabsTrigger value="construction">Construction</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Crystal Clear Innovation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-stone-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-full">
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
                            <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
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
                      <p className="text-2xl font-bold text-gray-600 mb-1">{data.value}</p>
                      <p className="text-xs text-mocha-600">{data.standard}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pattern Categories */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Pattern Collection</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patternCategories.map((category, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-taupe-200 text-center">
                      <h4 className="font-semibold text-mocha-900 mb-1">{category.name}</h4>
                      <p className="text-2xl font-bold text-gray-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Crystal Clear Pattern Gallery</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {patterns.map((pattern) => (
                    <motion.div
                      key={pattern.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPattern === pattern.id
                          ? 'border-gray-500 bg-gray-50'
                          : 'border-taupe-200 bg-white hover:border-gray-300'
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
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-mocha-900">{pattern.name}</h3>
                        <Badge variant="outline" className="text-gray-600 border-gray-300">
                          {pattern.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-mocha-900">Crystal Clear Finish</p>
                            <p className="text-lg font-bold text-gray-600">SPC Core</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {pattern.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">4-Layer SPC Construction</h2>
                <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src="/images/spc-stone-crystal-flooring-detail.png"
                        alt="SPC Stone Crystal Construction"
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-stone-500 flex items-center justify-center text-white font-bold text-lg">
                              {layer.layer}
                            </div>
                            <span className="text-sm font-medium text-gray-600">{layer.thickness}</span>
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-stone-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                        <div className="text-xs text-gray-600 font-medium bg-gray-50 px-3 py-1 rounded-full">
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Crystal Clear Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Crystal Clear UV Layer</h4>
                      <p className="text-sm text-mocha-700">Waterproof, non-slip and corrosion resistant surface protection</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">High-Density SPC Core</h4>
                      <p className="text-sm text-mocha-700">Superior rigidity and dimensional stability with locking design</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Pro-Environment Materials</h4>
                      <p className="text-sm text-mocha-700">Zero formaldehyde emission for healthy indoor environments</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-600 via-stone-600 to-slate-600 bg-clip-text text-transparent mb-6">
              Crystal Clear Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Our SPC Stone Crystal Flooring provides exceptional performance and beauty 
              for residential, commercial, and hospitality environments.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-gray-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-stone-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-stone-800 to-slate-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience Crystal Clear Quality
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform your space with the perfect combination of beauty, performance, and sustainability. 
              Request samples to experience the crystal clear difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-500 to-stone-600 text-white hover:from-stone-600 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Crystal Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Flooring Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SPCStoneCrystalFlooring;

