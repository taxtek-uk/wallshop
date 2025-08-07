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
  Thermometer
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SPCWaterproofWallPanel = () => {
  const [selectedPattern, setSelectedPattern] = useState('wood-grain');

  const patterns = [
    {
      id: 'wood-grain',
      name: 'Classic Oak Wood Grain',
      description: 'Authentic wood grain patterns with waterproof performance',
      image: '/images/spc-waterproof-wall-panel-hero.png',
      category: 'Wood',
      applications: ['Bathrooms', 'Kitchens', 'Basements']
    },
    {
      id: 'stone-texture',
      name: 'Natural Stone Texture',
      description: 'Realistic stone textures with superior water resistance',
      image: '/images/spc-waterproof-wall-panel-detail.png',
      category: 'Stone',
      applications: ['Showers', 'Spas', 'Commercial Wet Areas']
    },
    {
      id: 'solid-color',
      name: 'Modern Solid Colors',
      description: 'Contemporary solid colors for minimalist waterproof design',
      image: '/images/spc-waterproof-wall-panel-hero.png',
      category: 'Solid',
      applications: ['Laundry Rooms', 'Utility Areas', 'Accent Walls']
    }
  ];

  const specifications = [
    { label: 'Core Technology', value: 'Stone Plastic Composite (SPC)' },
    { label: 'Waterproof Rating', value: '100% Waterproof' },
    { label: 'Thickness Options', value: '4mm / 5mm' },
    { label: 'Standard Size', value: '1200mm × 2400mm' },
    { label: 'Surface Finish', value: 'Matte / Glossy' },
    { label: 'Fire Rating', value: 'B1 (Low Flammability)' },
    { label: 'Environmental Rating', value: 'E0 (Zero Formaldehyde)' },
    { label: 'Warranty', value: '15 Years Waterproof Performance' }
  ];

  const features = [
    {
      icon: Droplets,
      title: '100% Waterproof',
      description: 'Engineered with a stone plastic composite core, these panels are completely impervious to water, making them ideal for high-moisture environments.',
      benefit: 'Perfect for bathrooms, kitchens, and basements'
    },
    {
      icon: Lock,
      title: 'Locking Splicing Mechanism',
      description: 'Innovative interlocking system ensures a tight, seamless fit, preventing water penetration and simplifying installation.',
      benefit: 'Easy and secure installation'
    },
    {
      icon: Shield,
      title: 'High Durability',
      description: 'The robust SPC core provides exceptional resistance to impacts, scratches, and daily wear and tear, ensuring long-lasting beauty.',
      benefit: 'Commercial-grade performance'
    },
    {
      icon: Sun,
      title: 'UV Resistant Layer',
      description: 'A protective UV layer prevents fading and discoloration from sunlight exposure, maintaining the panel’s vibrant appearance over time.',
      benefit: 'Long-lasting color and pattern integrity'
    },
    {
      icon: Thermometer,
      title: 'Temperature Stability',
      description: 'Designed to withstand significant temperature fluctuations without warping or expanding, ensuring stability in various climates.',
      benefit: 'Ideal for diverse environments'
    },
    {
      icon: Sparkles,
      title: 'Low Maintenance',
      description: 'The non-porous surface is easy to clean and resists mold, mildew, and stains, requiring minimal effort to maintain.',
      benefit: 'Hygienic and easy to care for'
    }
  ];

  const layerStructure = [
    {
      layer: 1,
      name: 'UV Layer',
      description: 'Protective coating that resists UV fading and enhances durability.',
      thickness: '0.1mm'
    },
    {
      layer: 2,
      name: 'Wear-Resistant Layer',
      description: 'Transparent layer providing superior resistance to scratches and abrasion.',
      thickness: '0.3mm'
    },
    {
      layer: 3,
      name: 'Ultra Clear Color Printing Layer',
      description: 'High-definition printed pattern (wood, stone, solid colors) with vibrant, realistic details.',
      thickness: '0.2mm'
    },
    {
      layer: 4,
      name: 'SPC Substrate Layer',
      description: 'Rigid stone plastic composite core providing waterproof performance and dimensional stability.',
      thickness: '4.4mm / 5.4mm'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Wall Preparation',
      description: 'Ensure wall surface is clean, dry, and smooth. Remove any debris or unevenness.',
      time: '30 minutes'
    },
    {
      step: 2,
      title: 'Panel Cutting',
      description: 'Measure and cut panels to fit, ensuring precise dimensions for a seamless look.',
      time: '20 minutes'
    },
    {
      step: 3,
      title: 'Locking Installation',
      description: 'Interlock panels using the integrated splicing mechanism, ensuring a tight, waterproof seal.',
      time: '45 minutes'
    },
    {
      step: 4,
      title: 'Finishing Touches',
      description: 'Install trim and seal edges with waterproof sealant for a complete and professional finish.',
      time: '15 minutes'
    }
  ];

  const applications = [
    {
      icon: Droplets,
      title: 'Bathrooms & Showers',
      description: 'Ideal for high-moisture areas, providing a luxurious and durable waterproof surface.',
      examples: ['Shower Walls', 'Bathroom Backsplashes', 'Wet Rooms']
    },
    {
      icon: Building,
      title: 'Commercial Wet Areas',
      description: 'Durable and hygienic solutions for commercial spaces exposed to moisture.',
      examples: ['Commercial Kitchens', 'Spa & Wellness Centers', 'Public Restrooms']
    },
    {
      icon: Home,
      title: 'Kitchens & Laundry Rooms',
      description: 'Practical and stylish wall solutions for residential areas prone to spills and humidity.',
      examples: ['Kitchen Backsplashes', 'Laundry Room Walls', 'Basement Finishing']
    }
  ];

  const patternCategories = [
    { name: 'Wood Grain Collection', count: 18, description: 'Authentic wood patterns' },
    { name: 'Stone Texture Series', count: 12, description: 'Realistic stone finishes' },
    { name: 'Solid Color Palette', count: 8, description: 'Modern solid colors' },
    { name: 'Abstract Designs', count: 5, description: 'Contemporary patterns' }
  ];

  const benefits = [
    '100% waterproof construction for ultimate moisture protection',
    'Innovative locking splicing mechanism for seamless and secure installation',
    'High durability and impact resistance for long-lasting performance',
    'UV resistant layer prevents fading and maintains vibrant colors',
    'Excellent temperature stability, preventing warping or expansion',
    'Low maintenance and easy to clean, resisting mold and mildew',
    'Zero formaldehyde emission for healthy indoor air quality',
    '15-year waterproof performance warranty for peace of mind'
  ];

  const technicalAdvantages = [
    {
      title: 'SPC Core Technology',
      description: 'Stone Plastic Composite core provides superior rigidity and waterproof properties.',
      specs: ['Density: 2.0-2.1 g/cm³', 'Water Absorption: 0%', 'Dimensional Stability: <0.05%']
    },
    {
      title: 'Locking Splicing System',
      description: 'Precision-engineered interlocking mechanism ensures a tight, seamless, and waterproof joint.',
      specs: ['Joint Strength: >1.5 kN/m', 'Installation Speed: 2x faster', 'Water Sealing: 100%']
    },
    {
      title: 'Advanced Surface Protection',
      description: 'Multi-layer surface with UV and wear-resistant coatings for enhanced durability and color retention.',
      specs: ['Wear Resistance: AC4 Rating', 'UV Stability: 1500+ hours', 'Scratch Resistance: 4H']
    }
  ];

  const performanceData = [
    { metric: 'Waterproof Rating', value: '100%', standard: 'ASTM D570' },
    { metric: 'Impact Resistance', value: '10+ kJ/m²', standard: 'ISO 179' },
    { metric: 'Fire Rating', value: 'B1', standard: 'EN 13501-1' },
    { metric: 'Formaldehyde Emission', value: 'E0', standard: 'EN 717-1' },
    { metric: 'Thermal Stability', value: '-20°C to 60°C', standard: 'ISO 75' },
    { metric: 'Wear Resistance', value: 'AC4', standard: 'EN 13329' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"></div>
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
                <span className="text-white">SPC Waterproof Wall Panel</span>
              </nav>
              
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                100% Waterproof Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                SPC Waterproof Wall Panel
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Experience ultimate moisture protection with our 100% waterproof SPC wall panels. 
                Perfect for bathrooms, kitchens, and high-humidity areas, combining durability with stunning aesthetics.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £38/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">100% Waterproof</Badge>
                <Badge className="bg-white/20 text-white border-white/30">15 Year Warranty</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Explore Waterproof Solutions <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Technical Brochure
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
                    src="/images/spc-waterproof-wall-panel-hero.png"
                    alt="SPC Waterproof Wall Panel"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">100% Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Locking System</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Shield className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">High Durability</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Award className="w-6 h-6 text-white mx-auto mb-2" />
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Waterproof Innovation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
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
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
                      <p className="text-2xl font-bold text-blue-600 mb-1">{data.value}</p>
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
                      <p className="text-2xl font-bold text-blue-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Waterproof Pattern Gallery</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {patterns.map((pattern) => (
                    <motion.div
                      key={pattern.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPattern === pattern.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-taupe-200 bg-white hover:border-blue-300'
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
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          {pattern.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-mocha-900">100% Waterproof</p>
                            <p className="text-lg font-bold text-blue-600">SPC Core</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {pattern.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
                        src="/images/spc-waterproof-wall-panel-detail.png"
                        alt="SPC Waterproof Construction"
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                              {layer.layer}
                            </div>
                            <span className="text-sm font-medium text-blue-600">{layer.thickness}</span>
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                        <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">Waterproof Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">100% Waterproof SPC Core</h4>
                      <p className="text-sm text-mocha-700">Completely impervious to water, ideal for high-moisture environments</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Locking Splicing Mechanism</h4>
                      <p className="text-sm text-mocha-700">Ensures a tight, seamless fit, preventing water penetration</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">UV and Wear Resistance</h4>
                      <p className="text-sm text-mocha-700">Protective layers prevent fading and resist scratches for long-lasting beauty</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-6">
              Waterproof Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              Our SPC Waterproof Wall Panels provide ultimate moisture protection and stunning aesthetics 
              for any high-humidity environment.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Secure Your Space with Waterproof Panels
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Protect your interiors from moisture while enhancing their beauty. 
              Request samples to experience the ultimate waterproof solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Waterproof Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Waterproof Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SPCWaterproofWallPanel;

