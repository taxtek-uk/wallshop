import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Infinity, 
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
  Settings,
  Grid,
  Maximize
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UHDContinuousPattern = () => {
  const [selectedPattern, setSelectedPattern] = useState('wood-flow');

  const continuousPatterns = [
    {
      id: 'wood-flow',
      name: 'Flowing Wood Grain',
      description: 'Natural wood grain that flows seamlessly across multiple panels',
      image: '/public/images/uhd-continuous-pattern-hero.png',
      category: 'Wood',
      applications: ['Large Feature Walls', 'Reception Areas', 'Executive Offices']
    },
    {
      id: 'marble-vein',
      name: 'Continuous Marble Veining',
      description: 'Elegant marble veins that continue uninterrupted across panels',
      image: '/public/images/uhd-continuous-pattern-detail.png',
      category: 'Marble',
      applications: ['Luxury Interiors', 'Hotel Lobbies', 'Residential Features']
    },
    {
      id: 'abstract-flow',
      name: 'Abstract Flow Patterns',
      description: 'Contemporary abstract designs with seamless continuity',
      image: '/public/images/uhd-continuous-pattern-hero.png',
      category: 'Abstract',
      applications: ['Modern Interiors', 'Commercial Spaces', 'Art Installations']
    },
    {
      id: 'textile-weave',
      name: 'Continuous Textile Weave',
      description: 'Sophisticated fabric patterns that flow across panel boundaries',
      image: '/public/images/uhd-continuous-pattern-detail.png',
      category: 'Textile',
      applications: ['Hospitality Design', 'Retail Spaces', 'Wellness Centers']
    }
  ];

  const specifications = [
    { label: 'Pattern Technology', value: 'Ultra-High-Definition Continuous' },
    { label: 'Pattern Resolution', value: '8K Ultra HD (7680×4320)' },
    { label: 'Seamless Length', value: 'Up to 12 meters continuous' },
    { label: 'Panel Thickness', value: '6mm Premium Grade' },
    { label: 'Standard Panel Size', value: '1200mm × 3000mm' },
    { label: 'Pattern Accuracy', value: '±0.1mm precision' },
    { label: 'Environmental Rating', value: 'E0 (Zero Formaldehyde)' },
    { label: 'Warranty', value: '25 Years Pattern Integrity' }
  ];

  const features = [
    {
      icon: Infinity,
      title: 'Seamless Continuity',
      description: 'Advanced pattern mapping technology ensures perfect alignment across multiple panels for uninterrupted visual flow.',
      benefit: 'Unlimited design possibilities'
    },
    {
      icon: Eye,
      title: '8K Ultra HD Resolution',
      description: 'Ultra-high-definition printing captures every detail with exceptional clarity and color accuracy.',
      benefit: 'Photorealistic appearance'
    },
    {
      icon: Grid,
      title: 'Precision Pattern Matching',
      description: 'Computer-controlled pattern alignment ensures perfect continuity with ±0.1mm precision.',
      benefit: 'Professional installation results'
    },
    {
      icon: Maximize,
      title: 'Large Format Capability',
      description: 'Create continuous patterns across walls up to 12 meters without visible interruptions.',
      benefit: 'Dramatic architectural impact'
    },
    {
      icon: Sparkles,
      title: 'Custom Pattern Creation',
      description: 'Bespoke pattern development service for unique architectural requirements.',
      benefit: 'Exclusive design solutions'
    },
    {
      icon: Shield,
      title: 'Pattern Stability',
      description: 'Advanced printing technology ensures pattern integrity and color stability over time.',
      benefit: '25-year pattern guarantee'
    }
  ];

  const technologyProcess = [
    {
      step: 1,
      title: 'Pattern Digitization',
      description: 'High-resolution scanning captures natural materials at 8K resolution with precise color mapping.',
      technology: '8K Digital Scanning'
    },
    {
      step: 2,
      title: 'Seamless Mapping',
      description: 'Advanced algorithms create continuous pattern flows that align perfectly across panel boundaries.',
      technology: 'AI Pattern Mapping'
    },
    {
      step: 3,
      title: 'Precision Printing',
      description: 'Ultra-high-definition printing with computer-controlled alignment ensures perfect pattern continuity.',
      technology: 'UHD Laser Printing'
    },
    {
      step: 4,
      title: 'Quality Verification',
      description: 'Each panel undergoes precision measurement to ensure ±0.1mm pattern alignment accuracy.',
      technology: 'Automated QC Systems'
    }
  ];

  const applications = [
    {
      icon: Building,
      title: 'Commercial Architecture',
      description: 'Create stunning feature walls in corporate environments with seamless pattern continuity.',
      examples: ['Corporate Reception Walls', 'Conference Room Features', 'Executive Office Design']
    },
    {
      icon: Home,
      title: 'Luxury Residential',
      description: 'Transform residential spaces with continuous patterns that create dramatic visual impact.',
      examples: ['Living Room Feature Walls', 'Master Suite Design', 'Home Theater Environments']
    },
    {
      icon: Hotel,
      title: 'Hospitality Design',
      description: 'Enhance guest experiences with seamless patterns that create memorable architectural moments.',
      examples: ['Hotel Lobby Features', 'Restaurant Design', 'Spa Treatment Rooms']
    }
  ];

  const patternCategories = [
    { name: 'Natural Wood Grains', count: 15, description: 'Flowing wood patterns' },
    { name: 'Marble & Stone Veining', count: 12, description: 'Continuous stone patterns' },
    { name: 'Abstract & Artistic', count: 8, description: 'Contemporary flow designs' },
    { name: 'Textile & Fabric', count: 6, description: 'Seamless weave patterns' },
    { name: 'Metallic Flows', count: 4, description: 'Brushed metal continuity' },
    { name: 'Custom Patterns', count: 'Unlimited', description: 'Bespoke design service' }
  ];

  const benefits = [
    'Ultra-high-definition 8K printing technology for exceptional detail and clarity',
    'Seamless pattern continuity across multiple panels up to 12 meters',
    'Precision pattern matching with ±0.1mm accuracy for perfect alignment',
    'Custom pattern creation service for unique architectural requirements',
    'Advanced color stability ensures long-term pattern integrity',
    'Zero formaldehyde emission for healthy indoor environments',
    'Professional installation support for perfect pattern alignment',
    '25-year pattern guarantee provides long-term confidence'
  ];

  const technicalAdvantages = [
    {
      title: '8K UHD Technology',
      description: 'Ultra-high-definition printing captures every detail with exceptional clarity.',
      specs: ['Resolution: 7680×4320 pixels', 'Color Depth: 16-bit per channel', 'Pattern Accuracy: ±0.1mm']
    },
    {
      title: 'AI Pattern Mapping',
      description: 'Advanced algorithms ensure perfect pattern continuity across panel boundaries.',
      specs: ['Seamless Length: Up to 12m', 'Pattern Alignment: Computer-controlled', 'Quality Assurance: Automated']
    },
    {
      title: 'Custom Design Service',
      description: 'Bespoke pattern creation for unique architectural and design requirements.',
      specs: ['Design Consultation: Included', 'Pattern Development: 2-3 weeks', 'Unlimited Revisions: Available']
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Pattern Planning',
      description: 'Detailed measurement and pattern layout planning to ensure perfect continuity.',
      time: '45 minutes'
    },
    {
      step: 2,
      title: 'Wall Preparation',
      description: 'Precise wall preparation with alignment guides for pattern accuracy.',
      time: '30 minutes'
    },
    {
      step: 3,
      title: 'Sequential Installation',
      description: 'Install panels in precise sequence following pattern alignment guides.',
      time: '90 minutes'
    },
    {
      step: 4,
      title: 'Pattern Verification',
      description: 'Final verification of pattern continuity and alignment accuracy.',
      time: '15 minutes'
    }
  ];

  const performanceData = [
    { metric: 'Pattern Resolution', value: '8K UHD', standard: '7680×4320 pixels' },
    { metric: 'Alignment Precision', value: '±0.1mm', standard: 'Computer-controlled' },
    { metric: 'Seamless Length', value: '12 meters', standard: 'Continuous flow' },
    { metric: 'Color Accuracy', value: '95% NTSC', standard: 'Professional grade' },
    { metric: 'Pattern Stability', value: '25 years', standard: 'Guaranteed' },
    { metric: 'Custom Patterns', value: 'Unlimited', standard: 'Bespoke service' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 to-taupe-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-700">
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
                <span className="text-white">UHD Continuous Pattern</span>
              </nav>
              
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white mb-6 text-sm px-4 py-2 rounded-full inline-block shadow-md">
                8K Ultra HD Technology
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                UHD Continuous Pattern
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                Revolutionary 8K ultra-high-definition technology creates seamless patterns that flow 
                continuously across multiple panels. Experience unlimited design possibilities with 
                perfect pattern alignment.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-white/20 text-white border-white/30">From £48/m²</Badge>
                <Badge className="bg-white/20 text-white border-white/30">8K UHD Resolution</Badge>
                <Badge className="bg-white/20 text-white border-white/30">25 Year Guarantee</Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  Explore Continuous Patterns <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Pattern Gallery
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
                    src="/public/images/uhd-continuous-pattern-hero.png"
                    alt="UHD Continuous Pattern"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Infinity className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">Seamless Flow</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Eye className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">8K Resolution</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Grid className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">±0.1mm Precision</p>
                  </div>
                  <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-sm border border-white/20">
                    <Maximize className="w-6 h-6 text-white mx-auto mb-2" />
                    <p className="text-xs font-medium text-white/90">12m Continuous</p>
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
              <TabsTrigger value="patterns">Continuous Patterns</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-12">
              {/* Features Grid */}
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Continuous Pattern Innovation</h2>
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
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Performance Specifications</h3>
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

              {/* Pattern Categories */}
              <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-mocha-900 mb-6">Pattern Collection</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patternCategories.map((category, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-taupe-200 text-center">
                      <h4 className="font-semibold text-mocha-900 mb-1">{category.name}</h4>
                      <p className="text-2xl font-bold text-amber-600 mb-1">{category.count}</p>
                      <p className="text-xs text-mocha-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="patterns" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">Continuous Pattern Gallery</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {continuousPatterns.map((pattern) => (
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
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-mocha-900">{pattern.name}</h3>
                        <Badge variant="outline" className="text-amber-600 border-amber-300">
                          {pattern.category}
                        </Badge>
                      </div>
                      <p className="text-mocha-700 mb-4">{pattern.description}</p>
                      
                      {selectedPattern === pattern.id && (
                        <div className="space-y-4">
                          <div className="text-center p-3 bg-white rounded-lg border border-amber-200">
                            <p className="text-sm font-medium text-mocha-900">Seamless Continuity</p>
                            <p className="text-lg font-bold text-amber-600">Up to 12 meters</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-mocha-900 mb-2">Ideal Applications:</p>
                            <div className="space-y-1">
                              {pattern.applications.map((app, idx) => (
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

            <TabsContent value="technology" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-mocha-900 mb-8 text-center">UHD Technology Process</h2>
                <div className="bg-gradient-to-br from-clay-50 to-taupe-50 rounded-2xl p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <img
                        src="/public/images/uhd-continuous-pattern-detail.png"
                        alt="UHD Technology"
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="space-y-6">
                      {technologyProcess.map((process, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white p-6 rounded-xl border border-taupe-200"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                              {process.step}
                            </div>
                            <span className="text-sm font-medium text-amber-600">{process.technology}</span>
                          </div>
                          <h4 className="text-lg font-bold text-mocha-900 mb-2">{process.title}</h4>
                          <p className="text-sm text-mocha-700">{process.description}</p>
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
                  <h3 className="text-2xl font-bold text-mocha-900 mb-6">UHD Technology Benefits</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">8K Ultra HD Resolution</h4>
                      <p className="text-sm text-mocha-700">Exceptional detail and clarity with 7680×4320 pixel resolution</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">AI Pattern Mapping</h4>
                      <p className="text-sm text-mocha-700">Advanced algorithms ensure perfect pattern continuity across panels</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-clay-50 to-white border border-taupe-200 rounded-lg">
                      <h4 className="font-semibold text-mocha-900 mb-2">Custom Design Service</h4>
                      <p className="text-sm text-mocha-700">Bespoke pattern creation for unique architectural requirements</p>
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
              Seamless Design Applications
            </h2>
            <p className="text-xl text-mocha-700 max-w-3xl mx-auto leading-relaxed">
              UHD continuous pattern technology creates unlimited design possibilities with seamless 
              pattern flow across large architectural surfaces.
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
      <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-yellow-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Experience Seamless Continuity
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Transform your space with continuous patterns that flow seamlessly across large surfaces. 
              Request samples to experience the UHD difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-orange-600 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Request Pattern Samples
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-4 text-lg rounded-full font-semibold"
              >
                <Mail className="mr-2 h-5 w-5" />
                Custom Pattern Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UHDContinuousPattern;

