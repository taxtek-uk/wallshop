import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Printer, 
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
  Eye,
  Sparkles,
  Settings
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WPCHDPrintingWallPanel = () => {
  const [selectedPattern, setSelectedPattern] = useState('marble');

  const patterns = [
    {
      id: 'marble',
      name: 'Carrara Marble',
      description: 'Luxurious white marble with natural veining',
      image: '/images/wpc-hd-printing-hero.png',
      category: 'Stone',
      applications: ['Luxury Interiors', 'Bathroom Walls', 'Feature Walls']
    },
    {
      id: 'wood',
      name: 'Natural Oak',
      description: 'Authentic wood grain with rich texture',
      image: '/images/wpc-hd-printing-detail.png',
      category: 'Wood',
      applications: ['Living Rooms', 'Bedrooms', 'Office Spaces']
    },
    {
      id: 'solid',
      name: 'Contemporary Colors',
      description: 'Modern solid colors for minimalist design',
      image: '/images/wpc-hd-printing-hero.png',
      category: 'Solid',
      applications: ['Modern Interiors', 'Commercial Spaces', 'Accent Walls']
    },
    {
      id: 'fabric',
      name: 'Textile Patterns',
      description: 'Sophisticated fabric textures and weaves',
      image: '/images/wpc-hd-printing-detail.png',
      category: 'Textile',
      applications: ['Hospitality', 'Retail Spaces', 'Residential']
    }
  ];

  const specifications = [
    { label: 'Printing Technology', value: 'High-Definition Laser Printing' },
    { label: 'Pattern Resolution', value: '4K Ultra HD (3840×2160)' },
    { label: 'Thickness Options', value: '5mm / 8mm' },
    { label: 'Standard Size', value: '1200mm × 3000mm' },
    { label: 'Surface Finish', value: 'Glossy / Matte' },
    { label: 'Fire Rating', value: 'B1 (Low Flammability)' },
    { label: 'Environmental Rating', value: 'E0 (Zero Formaldehyde)' },
    { label: 'Warranty', value: '15 Years Pattern Guarantee' }
  ];

  const features = [
    {
      icon: Printer,
      title: 'HD Printing Technology',
      description: '4K ultra-high-definition laser printing creates incredibly realistic patterns that perfectly mimic natural materials.',
      benefit: 'Authentic natural appearance'
    },
    {
      icon: Layers,
      title: 'Multi-Layer Construction',
      description: '7-layer engineered structure with PET scratch-resistant layer, laser membrane, and bamboo charcoal fiber core.',
      benefit: 'Superior durability and performance'
    },
    {
      icon: Droplets,
      title: 'Waterproof Performance',
      description: 'Complete waterproof construction suitable for high-moisture environments including bathrooms and kitchens.',
      benefit: 'Versatile application areas'
    },
    {
      icon: Shield,
      title: 'Scratch Resistance',
      description: 'Advanced PET protective layer provides exceptional resistance to scratches, stains, and daily wear.',
      benefit: 'Long-lasting beauty'
    },
    {
      icon: Sparkles,
      title: 'Bendable Design',
      description: 'Flexible construction allows for curved installations and creative architectural applications.',
      benefit: 'Design versatility'
    },
    {
      icon: Eye,
      title: 'Pattern Precision',
      description: 'Laser permeation technology ensures consistent pattern quality and color accuracy across all panels.',
      benefit: 'Professional installation results'
    }
  ];

  const layerStructure = [
    {
      layer: 1,
      name: 'PET Scratch & Stain Resistant Layer',
      description: 'Ultra-durable protective surface that resists scratches, stains, and UV damage.',
      thickness: '0.3mm'
    },
    {
      layer: 2,
      name: 'Laser Permeation Membrane Layer',
      description: 'High-definition printed pattern layer with 4K resolution and permanent color stability.',
      thickness: '0.2mm'
    },
    {
      layer: 3,
      name: 'Basic Bottom Film Layer',
      description: 'Stabilizing layer that ensures pattern adhesion and dimensional stability.',
      thickness: '0.1mm'
    },
    {
      layer: 4,
      name: 'Imported No Granular PUR Layer',
      description: 'Premium polyurethane layer providing flexibility and impact resistance.',
      thickness: '1.0mm'
    },
    {
      layer: 5,
      name: 'High Strength Crystal Coextruded Layer',
      description: 'Structural layer providing rigidity and dimensional stability.',
      thickness: '2.0mm'
    },
    {
      layer: 6,
      name: 'Bamboo Charcoal Fiber Layer',
      description: 'Eco-friendly core with natural antibacterial properties and moisture regulation.',
      thickness: '1.0mm'
    },
    {
      layer: 7,
      name: 'High Strength Crystal Coextruded Layer',
      description: 'Bottom structural layer ensuring panel integrity and installation stability.',
      thickness: '2.0mm'
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Surface Preparation',
      description: 'Ensure wall surface is clean, dry, and level. Remove any existing wallpaper or loose paint.',
      time: '30 minutes'
    },
    {
      step: 2,
      title: 'Pattern Planning',
      description: 'Plan panel layout to optimize pattern flow and minimize waste. Mark installation guidelines.',
      time: '20 minutes'
    },
    {
      step: 3,
      title: 'Adhesive Application',
      description: 'Apply recommended adhesive evenly to wall surface using appropriate spreading technique.',
      time: '15 minutes'
    },
    {
      step: 4,
      title: 'Panel Installation',
      description: 'Install panels following pattern alignment, ensuring seamless joints and proper adhesion.',
      time: '45 minutes'
    }
  ];

  const applications = [
    {
      icon: Building,
      title: 'Commercial Interiors',
      description: 'Professional installations for offices, retail spaces, and hospitality venues.',
      examples: ['Hotel Lobbies', 'Restaurant Feature Walls', 'Office Reception Areas']
    },
    {
      icon: Home,
      title: 'Luxury Residential',
      description: 'High-end home applications where authentic material appearance is desired.',
      examples: ['Master Bedroom Feature Walls', 'Living Room Accent Walls', 'Home Office Design']
    },
    {
      icon: Hotel,
      title: 'Hospitality Design',
      description: 'Durable and beautiful solutions for hotels, spas, and entertainment venues.',
      examples: ['Spa Treatment Rooms', 'Hotel Corridor Walls', 'Restaurant Interior Design']
    }
  ];

  const patternCategories = [
    { name: 'Marble & Stone', count: 24, description: 'Luxury natural stone patterns' },
    { name: 'Wood Grain', count: 18, description: 'Authentic wood textures' },
    { name: 'Solid Colors', count: 12, description: 'Contemporary color palette' },
    { name: 'Textile & Fabric', count: 15, description: 'Sophisticated fabric patterns' },
    { name: 'Abstract & Modern', count: 9, description: 'Contemporary artistic designs' },
    { name: 'Metallic Finishes', count: 6, description: 'Brushed and polished metal effects' }
  ];

  const benefits = [
    'Ultra-high-definition 4K printing technology for authentic natural appearance',
    'Multi-layer construction provides superior durability and performance',
    'Complete waterproof design suitable for bathrooms and kitchens',
    'Scratch and stain resistant surface maintains beauty over time',
    'Bendable design allows for curved installations and creative applications',
    'Zero formaldehyde emission ensures healthy indoor air quality',
    'Easy maintenance with simple cleaning requirements',
    '15-year pattern guarantee provides long-term peace of mind'
  ];

  const technicalAdvantages = [
    {
      title: 'Laser Permeation Technology',
      description: 'Advanced laser printing penetrates deep into the material for permanent pattern adhesion.',
      specs: ['4K Resolution: 3840×2160 pixels', 'Color Gamut: 95% NTSC', 'Pattern Depth: 0.2mm penetration']
    },
    {
      title: 'Bamboo Charcoal Core',
      description: 'Natural bamboo charcoal fiber provides antibacterial properties and moisture regulation.',
      specs: ['Antibacterial Rate: >99%', 'Moisture Absorption: 15%', 'Odor Elimination: Natural']
    },
    {
      title: 'PET Protection Layer',
      description: 'Premium PET film provides exceptional scratch and stain resistance.',
      specs: ['Scratch Resistance: 4H Hardness', 'Stain Resistance: Class 5', 'UV Stability: 500+ hours']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
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
                <span className="text-white">WPC HD Printing Wall Panel</span>
              </nav>
              
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                4K HD Printing Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                WPC HD Printing Wall Panel
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Revolutionary 4K ultra-high-definition printing technology creates incredibly realistic patterns 
                that perfectly mimic natural materials. Experience authentic marble, wood, and textile appearances 
                with superior durability.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £35/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">4K HD Printing</Badge>
                <Badge className="bg-white/20 text-white border-white/30">15 Year Guarantee</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-blue-600 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  View Pattern Gallery <ArrowRight className="ml-2 h-5 w-5" />
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
                    src="/images/wpc-hd-printing-hero.png"
                    alt="WPC HD Printing Wall Panel"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Printer className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">4K HD Printing</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Waterproof</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Layers className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">7-Layer Structure</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Sparkles className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Bendable Design</p>
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">HD Printing Innovation</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="p-6 bg-gradient-to-br from-clay-50 to-white border border-taupe-200 hover:border-purple-400 transition-all duration-300 hover:shadow-lg rounded-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mb-4">
                        <feature.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-mocha-900 mb-3">{feature.title}</h3>
                      <p className="text-mocha-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                      <div className="text-xs text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
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
                            <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <span className="text-sm text-mocha-700">{spec}</span>
                          </div>
                        ))}
                      </div>
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
                      <p className="text-2xl font-bold text-purple-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">HD Pattern Gallery</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {patterns.map((pattern) => (
                    <motion.div
                      key={pattern.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedPattern === pattern.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-taupe-200 bg-white hover:border-purple-300'
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
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          {pattern.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                            <p className="text-sm font-medium text-mocha-900">4K HD Resolution</p>
                            <p className="text-lg font-bold text-purple-600">3840×2160 pixels</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {pattern.applications.map((app, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
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
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">7-Layer Construction</h2>
                <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src="/images/wpc-hd-printing-detail.png"
                        alt="Layer Construction"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      {layerStructure.map((layer, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white p-4 rounded-xl border border-taupe-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                              {layer.layer}
                            </div>
                            <span className="text-sm font-medium text-purple-600">{layer.thickness}</span>
                          </div>
                          <h4 className="text-sm font-bold text-mocha-900 mb-1">{layer.name}</h4>
                          <p className="text-xs text-mocha-700">{layer.description}</p>
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
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-bold text-mocha-900 mb-3">{step.title}</h3>
                        <p className="text-sm text-mocha-700 leading-relaxed mb-3">{step.description}</p>
                        <div className="text-xs text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full">
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">HD Printing Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">4K Resolution Technology</h4>
                      <p className="text-sm text-mocha-700">Ultra-high-definition printing creates incredibly realistic textures and patterns</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Laser Permeation Process</h4>
                      <p className="text-sm text-mocha-700">Advanced laser technology ensures permanent pattern adhesion and color stability</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Eco-Friendly Materials</h4>
                      <p className="text-sm text-mocha-700">Zero formaldehyde emission and bamboo charcoal core for healthy indoor environments</p>
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
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Design Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              HD printing technology opens unlimited design possibilities, creating authentic natural material 
              appearances for any interior application.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {applications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white border border-taupe-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl rounded-2xl p-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center mb-6">
                  <app.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mocha-900 mb-4">{app.title}</h3>
                <p className="text-mocha-700 leading-relaxed mb-6">{app.description}</p>
                <div className="space-y-2">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience HD Printing Innovation
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform your space with incredibly realistic patterns that perfectly mimic natural materials. 
              Request samples to experience the HD printing difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-blue-600 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request HD Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Pattern Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WPCHDPrintingWallPanel;

